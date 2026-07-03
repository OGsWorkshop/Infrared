// starfield.js - Reactive Canvas starfield with drifting click dots and theme-aware tint
(function() {
	var canvas = document.getElementById('starfield');
	if (!canvas) return;

	var ctx = canvas.getContext('2d');
	var stars = [];
	var clickStars = [];
	var maxStars = 200;
	var width, height;
	var rafId = null;
	var lastTime = 0;
	var driftX = 0.12;
	var driftY = -0.05;
	var hidden = false;
	var mouse = { x: -1000, y: -1000 };

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
				parallax: Math.random() * 0.8 + 0.2,
				phase: Math.random() * Math.PI * 2
			});
		}
	}

	function spawnClickDot(x, y) {
		clickStars.push({
			x: x,
			y: y,
			size: Math.random() * 1.8 + 1.2,
			opacity: 1,
			parallax: Math.random() * 0.5 + 0.8,
			phase: Math.random() * Math.PI * 2,
			life: 1,
			decay: Math.random() * 0.008 + 0.004
		});
	}

	function draw(time) {
		if (hidden) {
			ctx.clearRect(0, 0, width, height);
			return;
		}

		lastTime = time;
		ctx.clearRect(0, 0, width, height);

		var color = parseColor(getColor());

		// mouse parallax influence
		var mx = (mouse.x - width/2) / width;
		var my = (mouse.y - height/2) / height;

		function moveStar(s) {
			s.x += (driftX + mx * 0.08) * s.parallax;
			s.y += (driftY + my * 0.08) * s.parallax;
			if (s.x > width) s.x = 0;
			if (s.x < 0) s.x = width;
			if (s.y > height) s.y = 0;
			if (s.y < 0) s.y = height;
		}

		// draw background stars
		for (var i=0; i<stars.length; i++) {
			var s = stars[i];
			moveStar(s);
			var pulse = 0.9 + Math.sin(time * 0.0012 + s.phase) * 0.1;
			var alpha = s.opacity * pulse;
			ctx.beginPath();
			ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + alpha + ')';
			ctx.fill();
		}

		// draw click-spawned drifting dots
		for (var j=clickStars.length-1; j>=0; j--) {
			var c = clickStars[j];
			moveStar(c);
			c.life -= c.decay;
			if (c.life <= 0) {
				clickStars.splice(j, 1);
				continue;
			}
			var cpulse = 0.9 + Math.sin(time * 0.002 + c.phase) * 0.1;
			ctx.beginPath();
			ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + c.opacity * c.life * cpulse + ')';
			ctx.fill();
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

	document.addEventListener('mousemove', function(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	document.addEventListener('click', function(e) {
		if (hidden) return;
		var tag = e.target.tagName;
		if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'A' || tag === 'SELECT') return;
		spawnClickDot(e.clientX, e.clientY);
	});

	document.addEventListener('visibilitychange', function() {
		if (document.hidden) stop();
		else if (!hidden) rafId = requestAnimationFrame(draw);
	});

	window.addEventListener('infrared-theme-change', function() {
		clearColorCache();
	});

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
