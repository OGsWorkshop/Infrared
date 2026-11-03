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
	appendCookie(res, `${COOKIE_NAME}=${createSession(username)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL / 1000}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
}

export function clearSession(res) {
	appendCookie(res, `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
}

function appendCookie(res, value) {
	const existing = res.getHeader('Set-Cookie');
	res.setHeader('Set-Cookie', existing ? [...(Array.isArray(existing) ? existing : [existing]), value] : value);
}

export function googleConfigured() {
	return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK_URL);
}

export function createOAuthState() {
	return crypto.randomBytes(32).toString('base64url');
}

export function setOAuthState(res, state) {
	appendCookie(res, `infrared_oauth_state=${state}; Path=/api/auth; HttpOnly; SameSite=Lax; Max-Age=600${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
}

export function readOAuthState(req) {
	const cookies = (req.headers.cookie || '').split(';').reduce((all, item) => {
		const [key, ...value] = item.trim().split('=');
		if (key) all[key] = value.join('=');
		return all;
	}, {});
	return cookies.infrared_oauth_state || null;
}

export function clearOAuthState(res) {
	appendCookie(res, `infrared_oauth_state=; Path=/api/auth; HttpOnly; SameSite=Lax; Max-Age=0${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
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
