// error-terrain.js — low-poly connected-line mountain landscape for error pages
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
	var accentHover = parseColor(cssVar('--theme-accent-hover', '#ff5050'));

	var theme = {
		skyTop: '#030303',
		skyHorizon: '#' + accent.getHexString(),
		fogColor: '#020202',
		terrainLine: '#' + accent.getHexString(),
		terrainGlow: '#' + accentGlow.getHexString(),
		nodeColor: '#' + accentHover.getHexString(),
		mountainColor: '#' + bg.clone().multiplyScalar(0.6).getHexString(),
		mountainGlow: '#' + accentGlow.clone().multiplyScalar(0.5).getHexString(),
		bloomStrength: 0.75,
		bloomRadius: 0.4,
		bloomThreshold: 0.15
	};

	var scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(theme.fogColor, 0.055);

	var camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 1.4, 7.0);
	camera.lookAt(0, 2.8, -18);

	var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x000000, 0);

	// === Sky dome ===
	var skyGeo = new THREE.SphereGeometry(400, 32, 32);
	var skyMat = new THREE.ShaderMaterial({
		side: THREE.BackSide,
		uniforms: {
			topColor: { value: parseColor(theme.skyTop) },
			horizonColor: { value: parseColor(theme.skyHorizon).clone().multiplyScalar(0.55) },
			height: { value: 0.35 }
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
			'uniform float height;',
			'varying vec3 vWorldPosition;',
			'void main() {',
			'  float h = normalize(vWorldPosition + vec3(0.0, height * 50.0, 0.0)).y;',
			'  float t = max(0.0, h * 0.5 + 0.5);',
			'  vec3 color = mix(horizonColor, topColor, pow(t, 0.55));',
			'  gl_FragColor = vec4(color, 1.0);',
			'}'
		].join('\n')
	});
	scene.add(new THREE.Mesh(skyGeo, skyMat));

	// === Clouds ===
	function createCloudTexture() {
		var c = document.createElement('canvas');
		c.width = 256;
		c.height = 128;
		var ctx = c.getContext('2d');
		var grd = ctx.createRadialGradient(128, 64, 10, 128, 64, 110);
		grd.addColorStop(0, 'rgba(255,60,60,0.28)');
		grd.addColorStop(0.5, 'rgba(120,30,30,0.08)');
		grd.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, 256, 128);
		return new THREE.CanvasTexture(c);
	}
	var cloudTex = createCloudTexture();
	for (var i = 0; i < 12; i++) {
		var cloud = new THREE.Sprite(new THREE.SpriteMaterial({
			map: cloudTex,
			transparent: true,
			opacity: 0.18 + Math.random() * 0.18,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			color: parseColor(theme.skyHorizon).clone().multiplyScalar(0.7)
		}));
		cloud.position.set(
			(Math.random() - 0.5) * 140,
			20 + Math.random() * 16,
			-50 - Math.random() * 70
		);
		cloud.scale.set(35 + Math.random() * 45, 14 + Math.random() * 18, 1);
		scene.add(cloud);
	}

	// === Terrain point generation ===
	var simplex = new SimplexNoise();
	var points = [];
	var pointCount = 360;
	var terrainWidth = 50;
	var terrainDepth = 55;
	var terrainOffsetZ = -8;

	function terrainNoise(x, z, time) {
		var h = simplex.noise2D(x * 0.055 + time * 0.012, z * 0.045 + time * 0.008) * 2.6;
		h += simplex.noise2D(x * 0.12 - time * 0.02, z * 0.10 + time * 0.015) * 1.1;
		h += simplex.noise2D(x * 0.25, z * 0.22) * 0.35;
		return h;
	}

	function mountainShape(x, z) {
		var nx = x / (terrainWidth * 0.5);
		var nz = 1.0 - (z - terrainOffsetZ + terrainDepth * 0.5) / terrainDepth;
		var center = Math.exp(-nx * nx * 1.8);
		var horizon = smoothstep(0.15, 0.85, nz);
		return center * horizon;
	}

	function smoothstep(min, max, value) {
		var x = Math.max(0, Math.min(1, (value - min) / (max - min)));
		return x * x * (3 - 2 * x);
	}

	// Add boundary points first so edges don't collapse
	for (var i = 0; i <= 10; i++) {
		var t = i / 10;
		points.push({ x: (t - 0.5) * terrainWidth, y: -4, z: terrainOffsetZ + terrainDepth * 0.5, boundary: true });
		points.push({ x: (t - 0.5) * terrainWidth, y: -4, z: terrainOffsetZ - terrainDepth * 0.5, boundary: true });
		points.push({ x: -terrainWidth * 0.5, y: -4, z: terrainOffsetZ + terrainDepth * 0.5 - t * terrainDepth, boundary: true });
		points.push({ x: terrainWidth * 0.5, y: -4, z: terrainOffsetZ + terrainDepth * 0.5 - t * terrainDepth, boundary: true });
	}

	for (var i = 0; i < pointCount; i++) {
		var r = Math.pow(Math.random(), 0.7);
		var angle = (Math.random() - 0.5) * Math.PI * 0.85;
		var dist = r * terrainWidth * 0.52;
		var x = Math.sin(angle) * dist;
		var zRaw = Math.random();
		var zBias = Math.pow(zRaw, 0.75);
		var z = terrainOffsetZ + terrainDepth * 0.5 - zBias * terrainDepth;
		var shape = mountainShape(x, z);
		var h = terrainNoise(x, z, 0) * (0.6 + shape * 2.8);
		h += shape * 4.5;
		h -= 1.2;
		points.push({ x: x, y: h, z: z, shape: shape, boundary: false });
	}

	// === Delaunay triangulation on x/z ===
	var coords = [];
	for (var i = 0; i < points.length; i++) {
		coords.push(points[i].x, points[i].z);
	}
	var delaunay = Delaunator.from(coords);
	var triangles = delaunay.triangles;

	// === Line mesh from triangle edges ===
	var edgeSet = new Set();
	var linePositions = [];
	var lineColors = [];
	var color = parseColor(theme.terrainLine);

	function addEdge(a, b) {
		var key = a < b ? a + ':' + b : b + ':' + a;
		if (edgeSet.has(key)) return;
		edgeSet.add(key);
		var pa = points[a];
		var pb = points[b];
		var avgShape = ((pa.shape || 0) + (pb.shape || 0)) * 0.5;
		var peak = Math.max(pa.shape || 0, pb.shape || 0);
		var alpha = 0.12 + peak * 0.82;
		if (pa.boundary || pb.boundary) alpha *= 0.25;
		linePositions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
		lineColors.push(color.r * alpha, color.g * alpha, color.b * alpha);
		lineColors.push(color.r * alpha, color.g * alpha, color.b * alpha);
	}

	for (var i = 0; i < triangles.length; i += 3) {
		addEdge(triangles[i], triangles[i + 1]);
		addEdge(triangles[i + 1], triangles[i + 2]);
		addEdge(triangles[i + 2], triangles[i]);
	}

	var lineGeo = new THREE.BufferGeometry();
	lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
	lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

	var lineMat = new THREE.LineBasicMaterial({
		vertexColors: true,
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});
	var lineMesh = new THREE.LineSegments(lineGeo, lineMat);
	scene.add(lineMesh);

	// === Glowing nodes ===
	var nodePositions = [];
	var nodePhases = [];
	var nodeSizes = [];
	var nodeAlphas = [];
	for (var i = 0; i < points.length; i++) {
		if (points[i].boundary) continue;
		nodePositions.push(points[i].x, points[i].y, points[i].z);
		nodePhases.push(Math.random() * Math.PI * 2);
		nodeSizes.push(0.5 + Math.random() * 0.7);
		var peak = points[i].shape || 0;
		nodeAlphas.push(0.35 + peak * 0.65);
	}
	var nodeGeo = new THREE.BufferGeometry();
	nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
	nodeGeo.setAttribute('phase', new THREE.Float32BufferAttribute(nodePhases, 1));
	nodeGeo.setAttribute('size', new THREE.Float32BufferAttribute(nodeSizes, 1));
	nodeGeo.setAttribute('alpha', new THREE.Float32BufferAttribute(nodeAlphas, 1));

	var nodeMat = new THREE.ShaderMaterial({
		uniforms: {
			color: { value: parseColor(theme.nodeColor) },
			pixelRatio: { value: renderer.getPixelRatio() }
		},
		vertexShader: [
			'attribute float phase;',
			'attribute float size;',
			'attribute float alpha;',
			'varying float vAlpha;',
			'uniform float pixelRatio;',
			'void main() {',
			'  vAlpha = alpha * 0.65;',
			'  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
			'  gl_PointSize = size * 5.5 * pixelRatio * (120.0 / -mvPosition.z);',
			'  gl_Position = projectionMatrix * mvPosition;',
			'}'
		].join('\n'),
		fragmentShader: [
			'uniform vec3 color;',
			'varying float vAlpha;',
			'void main() {',
			'  float d = length(gl_PointCoord - vec2(0.5));',
			'  if (d > 0.5) discard;',
			'  float glow = 1.0 - smoothstep(0.0, 0.5, d);',
			'  gl_FragColor = vec4(color, vAlpha * glow);',
			'}'
		].join('\n'),
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});
	var nodes = new THREE.Points(nodeGeo, nodeMat);
	scene.add(nodes);

	// === Distant mountain fill ===
	function createMountainLayer(zOffset, scale, opacity) {
		var mGeo = new THREE.PlaneGeometry(180, 50, 80, 24);
		mGeo.rotateX(-Math.PI / 2);
		var mPos = mGeo.attributes.position.array;
		for (var i = 0; i < mPos.length; i += 3) {
			var x = mPos[i];
			var z = mPos[i + 2];
			var h = simplex.noise2D(x * 0.04 * scale, z * 0.025 * scale) * 9 * scale;
			h += simplex.noise2D(x * 0.10 * scale + 30.0, z * 0.06 * scale) * 3.5 * scale;
			h += simplex.noise2D(x * 0.22 * scale, z * 0.14 * scale) * 1.2 * scale;
			h *= Math.max(0.0, 1.0 - Math.abs(x) / 80.0);
			mPos[i + 1] = Math.max(0.0, h);
		}
		mGeo.computeVertexNormals();
		var mMat = new THREE.MeshBasicMaterial({
			color: parseColor(theme.mountainColor),
			transparent: true,
			opacity: opacity,
			side: THREE.DoubleSide
		});
		var mesh = new THREE.Mesh(mGeo, mMat);
		mesh.position.set(0, -1.8, zOffset);
		return mesh;
	}

	var mountainsFar = createMountainLayer(-42, 1.3, 0.55);
	mountainsFar.material.color = parseColor(theme.mountainColor).clone().lerp(parseColor(theme.skyHorizon), 0.1);
	scene.add(mountainsFar);

	var mountainsMid = createMountainLayer(-30, 1.0, 0.75);
	mountainsMid.material.color = parseColor(theme.mountainColor);
	scene.add(mountainsMid);

	var mountainsNear = createMountainLayer(-18, 0.75, 0.9);
	mountainsNear.material.color = parseColor(theme.mountainColor).clone().multiplyScalar(0.85);
	scene.add(mountainsNear);

	// === Horizon glow ===
	function createGlowTexture() {
		var c = document.createElement('canvas');
		c.width = 512;
		c.height = 128;
		var ctx = c.getContext('2d');
		var grd = ctx.createRadialGradient(256, 64, 0, 256, 64, 200);
		grd.addColorStop(0, 'rgba(255,60,60,0.55)');
		grd.addColorStop(0.5, 'rgba(160,40,40,0.18)');
		grd.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, 512, 128);
		return new THREE.CanvasTexture(c);
	}
	var horizonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
		map: createGlowTexture(),
		transparent: true,
		opacity: 0.28,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		color: parseColor(theme.skyHorizon)
	}));
	horizonGlow.position.set(0, 4, -55);
	horizonGlow.scale.set(100, 16, 1);
	scene.add(horizonGlow);

	// === Ambient light ===
	scene.add(new THREE.AmbientLight(parseColor(theme.skyHorizon), 0.15));

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
			'offset': { value: 0.9 },
			'darkness': { value: 2.6 }
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

	var grainShader = {
		uniforms: {
			'tDiffuse': { value: null },
			'time': { value: 0 },
			'intensity': { value: 0.03 }
		},
		vertexShader: [
			'varying vec2 vUv;',
			'void main() {',
			'  vUv = uv;',
			'  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
			'}'
		].join('\n'),
		fragmentShader: [
			'uniform sampler2D tDiffuse;',
			'uniform float time;',
			'uniform float intensity;',
			'varying vec2 vUv;',
			'float rand(vec2 co) { return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453); }',
			'void main() {',
			'  vec4 texel = texture2D(tDiffuse, vUv);',
			'  float g = rand(vUv * time) * intensity;',
			'  gl_FragColor = vec4(texel.rgb + vec3(g), texel.a);',
			'}'
		].join('\n')
	};
	// === Fog drift ===
	function createDriftTexture() {
		var c = document.createElement('canvas');
		c.width = 256;
		c.height = 64;
		var ctx = c.getContext('2d');
		var grd = ctx.createRadialGradient(128, 32, 0, 128, 32, 100);
		grd.addColorStop(0, 'rgba(255,50,50,0.18)');
		grd.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, 256, 64);
		return new THREE.CanvasTexture(c);
	}
	var driftTex = createDriftTexture();
	var drifts = [];
	for (var i = 0; i < 4; i++) {
		var drift = new THREE.Sprite(new THREE.SpriteMaterial({
			map: driftTex,
			transparent: true,
			opacity: 0.12 + Math.random() * 0.1,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			color: parseColor(theme.skyHorizon)
		}));
		drift.position.set((Math.random() - 0.5) * 50, -1.2 + Math.random() * 1.0, -4 - Math.random() * 12);
		drift.scale.set(20 + Math.random() * 16, 4 + Math.random() * 3, 1);
		drift.userData = { speed: 0.2 + Math.random() * 0.3 };
		scene.add(drift);
		drifts.push(drift);
	}

	// === Resize ===
	window.addEventListener('resize', function () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		composer.setSize(window.innerWidth, window.innerHeight);
		nodeMat.uniforms.pixelRatio.value = renderer.getPixelRatio();
	});

	// === Animation ===
	function animate() {
		requestAnimationFrame(animate);

		for (var i = 0; i < drifts.length; i++) {
			drifts[i].position.x += drifts[i].userData.speed * 0.015;
			if (drifts[i].position.x > 30) drifts[i].position.x = -30;
		}

		composer.render();
	}
	animate();
})();
