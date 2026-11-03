const form = document.getElementById('loginForm');
const error = document.getElementById('error');
const button = document.getElementById('submitButton');

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	error.textContent = '';
	button.disabled = true;
	try {
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: form.username.value, password: form.password.value }),
		});
		const data = await response.json();
		if (!response.ok) throw new Error(data.error || 'Unable to sign in');
		window.location.assign('/');
	} catch (err) {
		error.textContent = err.message;
		button.disabled = false;
	}
});
