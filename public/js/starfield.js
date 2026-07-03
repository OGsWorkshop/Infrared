// starfield.js - Lightweight Canvas starfield with parallax drift and theme-aware tint
(function() {
	var canvas = document.getElementById('starfield');
	if (!canvas) return;

	var ctx = canvas.getContext('2d');
	var stars = [];
	var maxStars = 180;
	var width, height;
	var rafId = null;
	var lastTime = 0;
	var driftX = 0.08;
	var driftY = -0.03;
	var hidden = false;

	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;
	}

	var cachedColor = null;
	function getColor() {
		if (cachedColor) return cachedColor;
		try {
			cachedColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-particle-color').trim() || 'rgba(255,255,255,0.5)';
			return cachedColor;
		} catch(e) {
			return 'rgba(255,255,255,0.5)';
		}
	}
	function clearColorCache() { cachedColor = null; }

	function parseColor(color) {
		// Accept rgba(r,g,b,a) or hex
		var rgba = color.match(/rgba?\(([^)]+)\)/);
		if (rgba) {
			var parts = rgba[1].split(',').map(function(s){ return parseFloat(s.trim()); });
			return { r: parts[0]||255, g: parts[1]||255, b: parts[2]||255, a: parts[3]!==undefined?parts[3]:0.5 };
		}
		if (color.charAt(0)==='#') {
			var hex = color.substring(1);
			if (hex.length===3) hex = hex.split('').map(function(c){return c+c;}).join('');
			return { r: parseInt(hex.substring(0,2),16)||255, g: parseInt(hex.substring(2,4),16)||255, b: parseInt(hex.substring(4,6),16)||255, a: 0.5 };
		}
		return { r:255, g:255, b:255, a:0.5 };
	}

	function createStars() {
		stars = [];
		for (var i=0; i<maxStars; i++) {
			stars.push({
				x: Math.random() * width,
				y: Math.random() * height,
				size: Math.random() * 1.8 + 0.4,
				opacity: Math.random() * 0.6 + 0.2,
				parallax: Math.random() * 0.6 + 0.2,
				phase: Math.random() * Math.PI * 2
			});
		}
	}

	function draw(time) {
		if (hidden) {
			ctx.clearRect(0, 0, width, height);
			return;
		}

		var dt = time - lastTime;
		lastTime = time;

		ctx.clearRect(0, 0, width, height);

		var color = parseColor(getColor());
		var pulseBase = Math.sin(time * 0.0008);

		for (var i=0; i<stars.length; i++) {
			var s = stars[i];
			s.x += driftX * s.parallax;
			s.y += driftY * s.parallax;

			if (s.x > width) s.x = 0;
			if (s.x < 0) s.x = width;
			if (s.y > height) s.y = 0;
			if (s.y < 0) s.y = height;

			var pulse = 0.92 + Math.sin(time * 0.001 + s.phase) * 0.08;
			var alpha = s.opacity * pulse;

			ctx.beginPath();
			ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + alpha + ')';
			ctx.fill();

			// subtle glow for larger stars
			if (s.size > 1.4) {
				ctx.beginPath();
				ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
				ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + alpha * 0.15 + ')';
				ctx.fill();
			}
		}

		rafId = requestAnimationFrame(draw);
	}

	function start() {
		resize();
		createStars();
		if (rafId) cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(draw);
	}

	function stop() {
		if (rafId) cancelAnimationFrame(rafId);
		rafId = null;
	}

	function updateVisibility() {
		try {
			hidden = localStorage.getItem('particlesHidden') === 'true';
			if (hidden) {
				canvas.style.display = 'none';
				stop();
			} else {
				canvas.style.display = '';
				if (!rafId) rafId = requestAnimationFrame(draw);
			}
		} catch(e) {}
	}

	window.addEventListener('resize', function() {
		resize();
		createStars();
	});

	// visibility API - pause when tab hidden
	document.addEventListener('visibilitychange', function() {
		if (document.hidden) stop();
		else if (!hidden) rafId = requestAnimationFrame(draw);
	});

	// listen for theme changes
	window.addEventListener('infrared-theme-change', function() {
		clearColorCache();
	});

	// listen for particles toggle
	window.addEventListener('storage', function(e) {
		if (e.key === 'particlesHidden') updateVisibility();
	});

	window.Starfield = { start: start, stop: stop, updateVisibility: updateVisibility };

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function() {
			updateVisibility();
			start();
		});
	} else {
		updateVisibility();
		start();
	}
})();
