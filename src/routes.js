import express from 'express';
import path from 'path';
import { clearOAuthState, clearSession, createOAuthState, credentialsMatch, googleConfigured, readOAuthState, readSession, setOAuthState, setSession } from './auth.js';
const router = express.Router();

let __dirname = process.cwd();

router.get('/login', (_req, res) => {
	res.sendFile(path.join(__dirname, 'public/login.html'));
});

router.post('/api/auth/login', (req, res) => {
	const { username = '', password = '' } = req.body || {};
	if (!credentialsMatch(String(username).trim(), String(password))) {
		return res.status(401).json({ error: 'Invalid username or password' });
	}
	setSession(res, String(username).trim());
	return res.json({ authenticated: true, username: String(username).trim() });
});

router.get('/api/auth/providers', (_req, res) => {
	res.json({ google: googleConfigured(), password: Boolean(process.env.INFRARED_AUTH_PASSWORD) });
});

router.get('/api/auth/google', (_req, res) => {
	if (!googleConfigured()) return res.status(503).send('Google login is not configured');
	const state = createOAuthState();
	setOAuthState(res, state);
	const params = new URLSearchParams({
		client_id: process.env.GOOGLE_CLIENT_ID,
		redirect_uri: process.env.GOOGLE_CALLBACK_URL,
		response_type: 'code',
		scope: 'openid email profile',
		state,
		access_type: 'offline',
		prompt: 'select_account',
	});
	return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

router.get('/api/auth/google/callback', async (req, res) => {
	const { code, state, error } = req.query;
	if (error) return res.redirect('/login?error=google_cancelled');
	if (!googleConfigured() || typeof code !== 'string' || typeof state !== 'string' || state !== readOAuthState(req)) {
		return res.redirect('/login?error=google_invalid_state');
	}
	try {
		const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				code,
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: process.env.GOOGLE_CALLBACK_URL,
				grant_type: 'authorization_code',
			}),
		});
		const tokens = await tokenResponse.json();
		if (!tokenResponse.ok || !tokens.access_token) throw new Error('Google token exchange failed');
		const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
			headers: { Authorization: `Bearer ${tokens.access_token}` },
		});
		const profile = await profileResponse.json();
		if (!profileResponse.ok || !profile.email || profile.email_verified === false) throw new Error('Google account is not verified');
		clearOAuthState(res);
		setSession(res, profile.email);
		return res.redirect('/');
	} catch (err) {
		console.error('Google OAuth error:', err);
		return res.redirect('/login?error=google_failed');
	}
});

router.get('/api/auth/me', (req, res) => {
	const session = readSession(req);
	res.json(session ? { authenticated: true, username: session.username } : { authenticated: false });
});

router.post('/api/auth/logout', (_req, res) => {
	clearSession(res);
	res.json({ authenticated: false });
});

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.get('/&', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/&.html'));
});

router.get('/~', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/~.html'));
});

router.get('/g', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/g.html'));
});

router.get('/a', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/a.html'));
});

router.get('/err', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/err.html'));
});

router.get('/500', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/500.html'));
});

router.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, 'public/err.html'));
});

export default router;
