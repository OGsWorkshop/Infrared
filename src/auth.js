import crypto from 'node:crypto';

const COOKIE_NAME = 'infrared_session';
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

function secret() {
	return process.env.INFRARED_AUTH_SECRET || 'change-this-infrared-secret';
}

function sign(value) {
	return crypto.createHmac('sha256', secret()).update(value).digest('base64url');
}

export function createSession(username) {
	const payload = Buffer.from(JSON.stringify({ username, exp: Date.now() + SESSION_TTL })).toString('base64url');
	return `${payload}.${sign(payload)}`;
}

export function readSession(req) {
	const cookies = (req.headers.cookie || '').split(';').reduce((all, item) => {
		const [key, ...value] = item.trim().split('=');
		if (key) all[key] = value.join('=');
		return all;
	}, {});
	const token = cookies[COOKIE_NAME];
	if (!token) return null;
	const [payload, signature] = token.split('.');
	const expectedSignature = sign(payload);
	if (!payload || !signature || signature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) return null;
	try {
		const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
		return data.exp > Date.now() ? data : null;
	} catch {
		return null;
	}
}

export function setSession(res, username) {
	res.setHeader('Set-Cookie', `${COOKIE_NAME}=${createSession(username)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL / 1000}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
}

export function clearSession(res) {
	res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
}

export function credentialsMatch(username, password) {
	const expectedUser = process.env.INFRARED_AUTH_USER || 'admin';
	const expectedPassword = process.env.INFRARED_AUTH_PASSWORD;
	if (!expectedPassword || username !== expectedUser) return false;
	const actual = Buffer.from(password);
	const expected = Buffer.from(expectedPassword);
	return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

export { COOKIE_NAME };
