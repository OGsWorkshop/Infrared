import express from 'express';
import path from 'path';
import { clearSession, credentialsMatch, readSession, setSession } from './auth.js';
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
