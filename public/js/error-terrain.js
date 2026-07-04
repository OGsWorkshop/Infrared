// error-terrain.js — animated WebGL mountain + wireframe terrain for error pages
(function () {
	var canvas = document.getElementById('errorTerrain');
	if (!canvas) return;

	var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	if (!gl) {
		canvas.style.display = 'none';
		return;
	}

	function resize() {
		var dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = Math.floor(window.innerWidth * dpr);
		canvas.height = Math.floor(window.innerHeight * dpr);
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		gl.viewport(0, 0, canvas.width, canvas.height);
	}
	window.addEventListener('resize', resize);
	resize();

	function parseColor(css) {
		css = css.trim();
		if (css.startsWith('#')) {
			var hex = css.replace('#', '');
			if (hex.length === 3) hex = hex.split('').map(function (c) { return c + c; }).join('');
			var num = parseInt(hex, 16);
			return { r: ((num >> 16) & 255) / 255, g: ((num >> 8) & 255) / 255, b: (num & 255) / 255 };
		}
		var rgb = css.match(/[\d.]+/g);
		if (rgb && rgb.length >= 3) {
			return { r: parseFloat(rgb[0]) / 255, g: parseFloat(rgb[1]) / 255, b: parseFloat(rgb[2]) / 255 };
		}
		return { r: 0.91, g: 0, b: 0 };
	}

	function getThemeColor(name) {
		return parseColor(getComputedStyle(document.documentElement).getPropertyValue(name) || '#e80000');
	}

	var vsSource =
		'attribute vec3 aPosition;\n' +
		'uniform mat4 uMatrix;\n' +
		'uniform float uTime;\n' +
		'uniform float uZBias;\n' +
		'varying float vHeight;\n' +
		'varying float vDist;\n' +
		'varying float vMountain;\n' +
		'varying float vFlicker;\n' +
		'float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }\n' +
		'void main() {\n' +
		'  vec3 pos = aPosition;\n' +
		'  float mountainFactor = smoothstep(0.05, 0.62, pos.y);\n' +
		'  float m1 = sin(pos.x * 1.6 + 0.8) * cos(pos.y * 1.1 + 0.4);\n' +
		'  float m2 = sin(pos.x * 3.3 + 2.2) * 0.55;\n' +
		'  float m3 = sin(pos.x * 6.0 + pos.y * 2.0) * 0.18;\n' +
		'  float mountains = (m1 + m2 + m3) * 0.42;\n' +
		'  float t1 = sin(pos.x * 4.5 + uTime * 0.35) * cos(pos.y * 3.2 + uTime * 0.28);\n' +
		'  float t2 = sin(pos.x * 9.0 - uTime * 0.55) * sin(pos.y * 6.5 + uTime * 0.42) * 0.35;\n' +
		'  float t3 = sin(pos.x * 14.0 + uTime * 0.2) * 0.12;\n' +
		'  float terrain = t1 * 0.09 + t2 * 0.035 + t3 * 0.015;\n' +
		'  pos.z = mountains * mountainFactor + terrain * (1.0 - mountainFactor * 0.35);\n' +
		'  pos.z += uZBias;\n' +
		'  vHeight = pos.z;\n' +
		'  vMountain = mountainFactor;\n' +
		'  vDist = length(pos.xy);\n' +
		'  vFlicker = hash(pos.xy * 40.0);\n' +
		'  gl_Position = uMatrix * vec4(pos, 1.0);\n' +
		'  gl_PointSize = (2.4 + 1.6 * vFlicker) * (1.0 + 0.5 * sin(uTime * 3.0 + vFlicker * 25.0));\n' +
		'}';

	var fsSource =
		'precision mediump float;\n' +
		'varying float vHeight;\n' +
		'varying float vDist;\n' +
		'varying float vMountain;\n' +
		'varying float vFlicker;\n' +
		'uniform vec3 uColor;\n' +
		'uniform vec3 uGlowColor;\n' +
		'uniform vec3 uBgColor;\n' +
		'uniform float uTime;\n' +
		'uniform float uMode;\n' +
		'void main() {\n' +
		'  float horizon = smoothstep(0.0, 0.55, vDist);\n' +
		'  float fade = 1.0 - horizon * 0.95;\n' +
		'  float pulse = 0.6 + 0.4 * sin(uTime * (2.2 + vFlicker * 4.5) + vFlicker * 35.0);\n' +
		'  if (uMode < 0.5) {\n' +
		'    float lit = clamp(vHeight * 2.5 + 0.2, 0.0, 1.0);\n' +
		'    vec3 surface = mix(uBgColor * 0.35, uGlowColor * 0.6, lit * vMountain);\n' +
		'    surface = mix(surface, uColor, lit * 0.25 * vMountain);\n' +
		'    float alpha = (0.85 + 0.15 * vHeight) * fade;\n' +
		'    gl_FragColor = vec4(surface, alpha);\n' +
		'  } else {\n' +
		'    vec3 final = mix(uColor, uGlowColor, clamp(vHeight * 3.0 + 0.3, 0.0, 1.0));\n' +
		'    final *= pulse;\n' +
		'    float alpha = (0.35 + 0.65 * abs(vHeight)) * fade;\n' +
		'    gl_FragColor = vec4(final, alpha);\n' +
		'  }\n' +
		'}';

	function createShader(type, source) {
		var shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error('terrain shader error:', gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}
		return shader;
	}

	var vs = createShader(gl.VERTEX_SHADER, vsSource);
	var fs = createShader(gl.FRAGMENT_SHADER, fsSource);
	if (!vs || !fs) return;

	var program = gl.createProgram();
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('terrain program error:', gl.getProgramInfoLog(program));
		return;
	}
	gl.useProgram(program);

	var cols = 130;
	var rows = 80;
	var vertices = [];
	var indicesTriangles = [];
	var indicesLines = [];

	for (var y = 0; y <= rows; y++) {
		for (var x = 0; x <= cols; x++) {
			var px = (x / cols) * 3.0 - 1.5;
			var py = (y / rows) * 1.7 - 0.05;
			vertices.push(px, py, 0);
		}
	}

	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < cols; x++) {
			var i = y * (cols + 1) + x;
			var a = i, b = i + 1, c = i + cols + 1, d = i + cols + 2;
			indicesTriangles.push(a, b, c, b, d, c);
			indicesLines.push(a, b, b, d, d, c, c, a);
		}
	}

	var positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var triangleBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesTriangles), gl.STATIC_DRAW);

	var lineBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesLines), gl.STATIC_DRAW);

	var aPosition = gl.getAttribLocation(program, 'aPosition');
	gl.enableVertexAttribArray(aPosition);
	gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

	var uMatrix = gl.getUniformLocation(program, 'uMatrix');
	var uTime = gl.getUniformLocation(program, 'uTime');
	var uZBias = gl.getUniformLocation(program, 'uZBias');
	var uColor = gl.getUniformLocation(program, 'uColor');
	var uGlowColor = gl.getUniformLocation(program, 'uGlowColor');
	var uBgColor = gl.getUniformLocation(program, 'uBgColor');
	var uMode = gl.getUniformLocation(program, 'uMode');

	function perspective(fov, aspect, near, far) {
		var f = 1.0 / Math.tan(fov / 2);
		var nf = 1 / (near - far);
		return new Float32Array([
			f / aspect, 0, 0, 0,
			0, f, 0, 0,
			0, 0, (far + near) * nf, -1,
			0, 0, 2 * far * near * nf, 0
		]);
	}

	function multiply(a, b) {
		var out = new Float32Array(16);
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				var sum = 0;
				for (var k = 0; k < 4; k++) sum += a[i * 4 + k] * b[k * 4 + j];
				out[i * 4 + j] = sum;
			}
		}
		return out;
	}

	function translate(x, y, z) {
		var out = new Float32Array(16);
		out[0] = 1; out[5] = 1; out[10] = 1; out[15] = 1;
		out[12] = x; out[13] = y; out[14] = z;
		return out;
	}

	function rotateX(angle) {
		var c = Math.cos(angle), s = Math.sin(angle);
		var out = new Float32Array(16);
		out[0] = 1; out[15] = 1;
		out[5] = c; out[6] = s; out[9] = -s; out[10] = c;
		return out;
	}

	var startTime = Date.now();

	function render() {
		var time = (Date.now() - startTime) / 1000;

		var color = getThemeColor('--theme-accent');
		var glow = getThemeColor('--theme-accent-glow');
		var bg = getThemeColor('--theme-bg');

		var aspect = canvas.width / canvas.height;
		var proj = perspective(Math.PI / 3.4, aspect, 0.1, 10);
		var view = multiply(translate(0, -0.46, -1.08), rotateX(-0.5));
		var matrix = multiply(proj, view);

		gl.uniformMatrix4fv(uMatrix, false, matrix);
		gl.uniform1f(uTime, time);
		gl.uniform3f(uColor, color.r, color.g, color.b);
		gl.uniform3f(uGlowColor, glow.r, glow.g, glow.b);
		gl.uniform3f(uBgColor, bg.r, bg.g, bg.b);

		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);

		// Filled mountain faces
		gl.uniform1f(uZBias, 0.0);
		gl.uniform1f(uMode, 0.0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
		gl.drawElements(gl.TRIANGLES, indicesTriangles.length, gl.UNSIGNED_SHORT, 0);

		// Wireframe overlay
		gl.uniform1f(uZBias, 0.002);
		gl.uniform1f(uMode, 1.0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineBuffer);
		gl.drawElements(gl.LINES, indicesLines.length, gl.UNSIGNED_SHORT, 0);

		// Glowing nodes
		gl.uniform1f(uZBias, 0.003);
		gl.uniform1f(uMode, 1.0);
		gl.drawArrays(gl.POINTS, 0, vertices.length / 3);

		requestAnimationFrame(render);
	}

	render();
})();
