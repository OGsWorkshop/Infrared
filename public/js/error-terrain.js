// error-terrain.js — cinematic animated mountain landscape for error pages
(function () {
	var canvas = document.getElementById('errorTerrain');
	if (!canvas || typeof THREE === 'undefined' || typeof SimplexNoise === 'undefined' || typeof Delaunator === 'undefined') {
		if (canvas) canvas.style.display = 'none';
		return;
	}

	function parseColor(css) {
		css = (css || '').trim();
		if (css.startsWith('#')) {
			var hex = css.replace('#', '');
			if (hex.length === 3) hex = hex.split('').map(function (c) { return c + c; }).join('');
			var num = parseInt(hex, 16);
			return new THREE.Color(((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255);
		}
		var rgb = css.match(/[\d.]+/g);
		if (rgb && rgb.length >= 3) {
			return new THREE.Color(parseFloat(rgb[0]) / 255, parseFloat(rgb[1]) / 255, parseFloat(rgb[2]) / 255);
		}
		return new THREE.Color(1, 0, 0);
	}

	function cssVar(name, fallback) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
	}

	var accent = parseColor(cssVar('--theme-accent', '#ff2d2d'));
	var accentGlow = parseColor(cssVar('--theme-accent-glow', 'rgba(255,45,45,0.5)'));
	var bg = parseColor(cssVar('--theme-bg', '#050505'));

	var theme = {
		skyTop: '#020202',
		skyHorizon: '#' + accent.clone().multiplyScalar(0.5).getHexString(),
		fogColor: '#010101',
		lineColor: '#' + accent.getHexString(),
		lineGlow: '#' + accentGlow.getHexString(),
		mountainColor: '#' + bg.clone().multiplyScalar(0.35).getHexString(),
		bloomStrength: 0.9,
		bloomRadius: 0.45,
		bloomThreshold: 0.1
	};

	var scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(theme.fogColor, 0.065);

	var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 1.3, 7.5);
	camera.lookAt(0, 2.6, -20);

	var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x000000, 0);

	// === Sky ===
	var skyGeo = new THREE.SphereGeometry(400, 32, 32);
	var skyMat = new THREE.ShaderMaterial({
		side: THREE.BackSide,
		uniforms: {
			topColor: { value: parseColor(theme.skyTop) },
			horizonColor: { value: parseColor(theme.skyHorizon) }
		},
		vertexShader: [
			'varying vec3 vWorldPosition;',
			'void main() {',
			'  vec4 worldPosition = modelMatrix * vec4(position, 1.0);',
			'  vWorldPosition = worldPosition.xyz;',
			'  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
			'}'
		].join('\n'),
		fragmentShader: [
			'uniform vec3 topColor;',
			'uniform vec3 horizonColor;',
			'varying vec3 vWorldPosition;',
			'void main() {',
			'  float h = normalize(vWorldPosition + vec3(0.0, 25.0, 0.0)).y;',
			'  float t = max(0.0, h * 0.5 + 0.5);',
			'  vec3 color = mix(horizonColor, topColor, pow(t, 0.5));',
			'  gl_FragColor = vec4(color, 1.0);',
			'}'
		].join('\n')
	});
	scene.add(new THREE.Mesh(skyGeo, skyMat));

	// === Noise ===
	var simplex = new SimplexNoise();

	function mountainNoise(x, z, time) {
		var h = simplex.noise2D(x * 0.035 + time * 0.008, z * 0.028 + time * 0.005) * 3.0;
		h += simplex.noise2D(x * 0.09 - time * 0.012, z * 0.075) * 1.2;
		h += simplex.noise2D(x * 0.22, z * 0.18 + time * 0.01) * 0.4;
		return h;
	}

	function terrainNoise(x, z, time) {
		var h = simplex.noise2D(x * 0.08 + time * 0.03, z * 0.07 + time * 0.02) * 0.7;
		h += simplex.noise2D(x * 0.18 - time * 0.04, z * 0.15 + time * 0.03) * 0.25;
		h += simplex.noise2D(x * 0.35, z * 0.3) * 0.08;
		return h;
	}

	// === Distant mountain layers ===
	function createMountainLayer(zOffset, scale, opacity, blur) {
		var geo = new THREE.PlaneGeometry(200, 55, 90, 24);
		geo.rotateX(-Math.PI / 2);
		var pos = geo.attributes.position.array;
		for (var i = 0; i < pos.length; i += 3) {
			var x = pos[i];
			var z = pos[i + 2];
			var h = mountainNoise(x * scale, (z - zOffset) * scale, 0);
			h += simplex.noise2D(x * 0.06 * scale + 50.0, z * 0.04 * scale) * 2.0 * scale;
			h *= Math.max(0.0, 1.0 - Math.abs(x) / 85.0);
			pos[i + 1] = Math.max(-0.5, h);
		}
		geo.computeVertexNormals();
		var mat = new THREE.MeshBasicMaterial({
			color: parseColor(theme.mountainColor),
			transparent: true,
			opacity: opacity,
			side: THREE.DoubleSide
		});
		var mesh = new THREE.Mesh(geo, mat);
		mesh.position.set(0, -2.0, zOffset);
		return mesh;
	}

	var mtFar = createMountainLayer(-48, 1.2, 0.5);
	mtFar.material.color = parseColor(theme.mountainColor).clone().lerp(parseColor(theme.skyHorizon), 0.08);
	scene.add(mtFar);

	var mtMid = createMountainLayer(-34, 0.95, 0.72);
	mtMid.material.color = parseColor(theme.mountainColor);
	scene.add(mtMid);

	var mtNear = createMountainLayer(-20, 0.72, 0.88);
	mtNear.material.color = parseColor(theme.mountainColor).clone().multiplyScalar(0.8);
	scene.add(mtNear);

	// === Low-poly mountain mesh ===
	var points = [];
	var pointCount = 280;
	var meshWidth = 42;
	var meshDepth = 38;
	var meshZ = -10;

	function smoothstep(min, max, v) {
		var x = Math.max(0, Math.min(1, (v - min) / (max - min)));
		return x * x * (3 - 2 * x);
	}

	function silhouette(x, z) {
		var nx = x / (meshWidth * 0.45);
		var nz = 1.0 - (z - meshZ + meshDepth * 0.5) / meshDepth;
		var center = Math.exp(-nx * nx * 2.2);
		var horizon = smoothstep(0.1, 0.85, nz);
		return center * horizon;
	}

	for (var i = 0; i < pointCount; i++) {
		var r = Math.pow(Math.random(), 0.75);
		var angle = (Math.random() - 0.5) * Math.PI * 0.9;
		var x = Math.sin(angle) * r * meshWidth * 0.55;
		var zRaw = Math.pow(Math.random(), 0.8);
		var z = meshZ + meshDepth * 0.5 - zRaw * meshDepth;
		var shape = silhouette(x, z);
		var h = mountainNoise(x, z, 0) * (0.5 + shape * 2.2);
		h += shape * 5.5;
		h -= 0.8;
		points.push({ x: x, y: h, z: z, shape: shape, index: i });
	}

	var coords = [];
	for (var i = 0; i < points.length; i++) coords.push(points[i].x, points[i].z);
	var delaunay = Delaunator.from(coords);
	var triangles = delaunay.triangles;

	var edgeSet = new Set();
	var linePositions = [];
	var lineColors = [];
	var lineAlphas = [];
	var color = parseColor(theme.lineColor);

	function addEdge(a, b) {
		var key = a < b ? a + ':' + b : b + ':' + a;
		if (edgeSet.has(key)) return;
		edgeSet.add(key);
		var pa = points[a];
		var pb = points[b];
		var peak = Math.max(pa.shape, pb.shape);
		var alpha = 0.08 + peak * 0.9;
		linePositions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
		lineColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
		lineAlphas.push(alpha, alpha);
	}

	for (var i = 0; i < triangles.length; i += 3) {
		addEdge(triangles[i], triangles[i + 1]);
		addEdge(triangles[i + 1], triangles[i + 2]);
		addEdge(triangles[i + 2], triangles[i]);
	}

	var lineGeo = new THREE.BufferGeometry();
	lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
	lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
	lineGeo.setAttribute('alpha', new THREE.Float32BufferAttribute(lineAlphas, 1));

	var lineMat = new THREE.ShaderMaterial({
		uniforms: {
			color: { value: parseColor(theme.lineColor) },
			accent: { value: parseColor(theme.lineGlow) },
			time: { value: 0 }
		},
		vertexShader: [
			'attribute vec3 color;',
			'attribute float alpha;',
			'varying vec3 vColor;',
			'varying float vAlpha;',
			'void main() {',
			'  vColor = color;',
			'  vAlpha = alpha;',
			'  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
			'}'
		].join('\n'),
		fragmentShader: [
			'uniform vec3 accent;',
			'varying vec3 vColor;',
			'varying float vAlpha;',
			'void main() {',
			'  vec3 final = mix(vColor, accent, vAlpha * 0.35);',
			'  gl_FragColor = vec4(final, vAlpha * 0.9);',
			'}'
		].join('\n'),
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});
	var lineMesh = new THREE.LineSegments(lineGeo, lineMat);
	scene.add(lineMesh);

	// === Foreground rolling terrain grid ===
	var gridGeo = new THREE.PlaneGeometry(70, 50, 100, 70);
	gridGeo.rotateX(-Math.PI / 2);
	var gridPos = gridGeo.attributes.position.array;
	for (var i = 0; i < gridPos.length; i += 3) {
		var x = gridPos[i];
		var z = gridPos[i + 2];
		gridPos[i + 1] = terrainNoise(x, z, 0);
	}
	gridGeo.computeVertexNormals();

	var gridMat = new THREE.MeshBasicMaterial({
		color: parseColor(theme.lineColor),
		wireframe: true,
		transparent: true,
		opacity: 0.18,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});
	var gridMesh = new THREE.Mesh(gridGeo, gridMat);
	gridMesh.position.set(0, -2.6, -5);
	scene.add(gridMesh);

	// === Horizon glow ===
	function glowTexture() {
		var c = document.createElement('canvas');
		c.width = 512;
		c.height = 96;
		var ctx = c.getContext('2d');
		var g = ctx.createRadialGradient(256, 48, 0, 256, 48, 180);
		g.addColorStop(0, 'rgba(255,60,60,0.45)');
		g.addColorStop(0.5, 'rgba(160,40,40,0.12)');
		g.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 512, 96);
		return new THREE.CanvasTexture(c);
	}
	var horizonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
		map: glowTexture(),
		transparent: true,
		opacity: 0.22,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		color: parseColor(theme.skyHorizon)
	}));
	horizonGlow.position.set(0, 3, -58);
	horizonGlow.scale.set(110, 14, 1);
	scene.add(horizonGlow);

	// === Ambient light ===
	scene.add(new THREE.AmbientLight(parseColor(theme.skyHorizon), 0.12));

	// === Post-processing ===
	var composer = new THREE.EffectComposer(renderer);
	composer.addPass(new THREE.RenderPass(scene, camera));

	var bloomPass = new THREE.UnrealBloomPass(
		new THREE.Vector2(window.innerWidth, window.innerHeight),
		theme.bloomStrength,
		theme.bloomRadius,
		theme.bloomThreshold
	);
	composer.addPass(bloomPass);

	var vignetteShader = {
		uniforms: {
			'tDiffuse': { value: null },
			'offset': { value: 0.95 },
			'darkness': { value: 2.8 }
		},
		vertexShader: [
			'varying vec2 vUv;',
			'void main() {',
			'  vUv = uv;',
			'  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
			'}'
		].join('\n'),
		fragmentShader: [
			'uniform float offset;',
			'uniform float darkness;',
			'uniform sampler2D tDiffuse;',
			'varying vec2 vUv;',
			'void main() {',
			'  vec4 texel = texture2D(tDiffuse, vUv);',
			'  vec2 uv = (vUv - vec2(0.5)) * vec2(offset);',
			'  gl_FragColor = vec4(mix(texel.rgb, vec3(0.0), dot(uv, uv) * darkness), texel.a);',
			'}'
		].join('\n')
	};
	composer.addPass(new THREE.ShaderPass(vignetteShader));

	// === Fog drift ===
	function cloudTexture() {
		var c = document.createElement('canvas');
		c.width = 256;
		c.height = 64;
		var ctx = c.getContext('2d');
		var g = ctx.createRadialGradient(128, 32, 0, 128, 32, 100);
		g.addColorStop(0, 'rgba(255,50,50,0.14)');
		g.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 256, 64);
		return new THREE.CanvasTexture(c);
	}
	var driftTex = cloudTexture();
	var drifts = [];
	for (var i = 0; i < 5; i++) {
		var drift = new THREE.Sprite(new THREE.SpriteMaterial({
			map: driftTex,
			transparent: true,
			opacity: 0.08 + Math.random() * 0.08,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			color: parseColor(theme.skyHorizon)
		}));
		drift.position.set((Math.random() - 0.5) * 60, -1.0 + Math.random() * 0.8, -6 - Math.random() * 14);
		drift.scale.set(22 + Math.random() * 16, 4 + Math.random() * 3, 1);
		drift.userData = { speed: 0.15 + Math.random() * 0.25 };
		scene.add(drift);
		drifts.push(drift);
	}

	// === Resize ===
	window.addEventListener('resize', function () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		composer.setSize(window.innerWidth, window.innerHeight);
	});

	// === Animation ===
	var clock = new THREE.Clock();
	function animate() {
		requestAnimationFrame(animate);
		var time = clock.getElapsedTime();

		// Animate low-poly mountain mesh
		var pos = lineGeo.attributes.position.array;
		for (var i = 0, idx = 0; i < points.length; i++) {
			var p = points[i];
			var h = mountainNoise(p.x, p.z, time) * (0.5 + p.shape * 2.2);
			h += p.shape * 5.5;
			h -= 0.8;
			var baseY = h;
			// Update all edges connected to this point
			for (var e = 0; e < pos.length; e += 6) {
				if (Math.abs(pos[e] - p.x) < 0.001 && Math.abs(pos[e + 2] - p.z) < 0.001) {
					pos[e + 1] = baseY;
				}
				if (Math.abs(pos[e + 3] - p.x) < 0.001 && Math.abs(pos[e + 5] - p.z) < 0.001) {
					pos[e + 4] = baseY;
				}
			}
		}
		lineGeo.attributes.position.needsUpdate = true;

		// Animate foreground grid
		var gPos = gridGeo.attributes.position.array;
		for (var i = 0; i < gPos.length; i += 3) {
			var x = gPos[i];
			var z = gPos[i + 2];
			gPos[i + 1] = terrainNoise(x, z, time);
		}
		gridGeo.attributes.position.needsUpdate = true;

		// Drift fog
		for (var i = 0; i < drifts.length; i++) {
			drifts[i].position.x += drifts[i].userData.speed * 0.012;
			if (drifts[i].position.x > 32) drifts[i].position.x = -32;
		}

		composer.render();
	}
	animate();
})();
