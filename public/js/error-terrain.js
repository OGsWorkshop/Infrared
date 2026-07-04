// error-terrain.js — cinematic Three.js mountain landscape for error pages
(function () {
	var canvas = document.getElementById('errorTerrain');
	if (!canvas || typeof THREE === 'undefined' || typeof SimplexNoise === 'undefined') {
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

	var theme = {
		skyTop: '#050506',
		skyHorizon: cssVar('--theme-accent', '#ff2d2d'),
		fogColor: '#070000',
		terrainLine: cssVar('--theme-accent', '#ff2d2d'),
		terrainGlow: cssVar('--theme-accent-glow', 'rgba(255,45,45,0.5)'),
		nodeColor: cssVar('--theme-accent-hover', '#ff5050'),
		mountainColor: cssVar('--theme-bg', '#150404'),
		mountainGlow: cssVar('--theme-accent-glow', 'rgba(255,45,45,0.35)'),
		bloomStrength: 1.3,
		bloomRadius: 0.55,
		bloomThreshold: 0.08
	};

	var scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(theme.fogColor, 0.045);

	var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 1.6, 6.5);
	camera.lookAt(0, 2.2, -20);

	var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x000000, 0);

	// === Sky dome ===
	var skyGeo = new THREE.SphereGeometry(300, 32, 32);
	var skyMat = new THREE.ShaderMaterial({
		side: THREE.BackSide,
		uniforms: {
			topColor: { value: parseColor(theme.skyTop) },
			horizonColor: { value: parseColor(theme.skyHorizon) },
			height: { value: 0.45 }
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
			'  vec3 color = mix(horizonColor, topColor, pow(t, 0.65));',
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
		grd.addColorStop(0, 'rgba(255,60,60,0.35)');
		grd.addColorStop(0.5, 'rgba(180,30,30,0.12)');
		grd.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, 256, 128);
		return new THREE.CanvasTexture(c);
	}
	var cloudTex = createCloudTexture();
	var cloudMat = new THREE.SpriteMaterial({ map: cloudTex, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
	for (var i = 0; i < 14; i++) {
		var cloud = new THREE.Sprite(cloudMat.clone());
		cloud.material.opacity = 0.25 + Math.random() * 0.35;
		cloud.position.set(
			(Math.random() - 0.5) * 120,
			18 + Math.random() * 14,
			-40 - Math.random() * 60
		);
		cloud.scale.set(30 + Math.random() * 40, 12 + Math.random() * 16, 1);
		scene.add(cloud);
	}

	// === Terrain ===
	var simplex = new SimplexNoise();
	var terrainWidth = 80;
	var terrainDepth = 80;
	var segW = 130;
	var segD = 130;
	var terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainDepth, segW, segD);
	terrainGeo.rotateX(-Math.PI / 2);

	function terrainHeight(x, z, time) {
		var scale1 = 0.045;
		var scale2 = 0.11;
		var scale3 = 0.24;
		var h = simplex.noise2D(x * scale1 + time * 0.015, z * scale1) * 2.2;
		h += simplex.noise2D(x * scale2 - time * 0.025, z * scale2 + time * 0.02) * 0.85;
		h += simplex.noise2D(x * scale3 + time * 0.04, z * scale3) * 0.25;
		var ridge = simplex.noise2D(x * 0.08 + 50.0, z * 0.08) * 0.5 + 0.5;
		h += Math.pow(ridge, 2.5) * 1.1;
		return h;
	}

	var positions = terrainGeo.attributes.position.array;
	for (var i = 0; i < positions.length; i += 3) {
		positions[i + 1] = terrainHeight(positions[i], positions[i + 2], 0);
	}
	terrainGeo.computeVertexNormals();

	var terrainMat = new THREE.MeshBasicMaterial({
		color: parseColor(theme.terrainLine),
		wireframe: true,
		transparent: true,
		opacity: 0.42,
		blending: THREE.AdditiveBlending
	});
	var terrain = new THREE.Mesh(terrainGeo, terrainMat);
	terrain.position.set(0, -2.2, -8);
	scene.add(terrain);

	// === Mountains ===
	function createMountainLayer(zOffset, scale, opacity, blur) {
		var mGeo = new THREE.PlaneGeometry(160, 45, 90, 24);
		mGeo.rotateX(-Math.PI / 2);
		var mPos = mGeo.attributes.position.array;
		for (var i = 0; i < mPos.length; i += 3) {
			var x = mPos[i];
			var z = mPos[i + 2];
			var h = 0;
			h += simplex.noise2D(x * 0.035 * scale, z * 0.02 * scale) * 10 * scale;
			h += simplex.noise2D(x * 0.09 * scale + 30.0, z * 0.05 * scale) * 4 * scale;
			h += simplex.noise2D(x * 0.22 * scale, z * 0.12 * scale) * 1.5 * scale;
			h *= Math.max(0.0, 1.0 - Math.abs(x) / 70.0);
			mPos[i + 1] = Math.max(0.0, h);
		}
		mGeo.computeVertexNormals();
		var mMat = new THREE.MeshBasicMaterial({
			color: parseColor(theme.mountainColor),
			transparent: true,
			opacity: opacity,
			side: THREE.DoubleSide,
			blending: THREE.NormalBlending
		});
		var mesh = new THREE.Mesh(mGeo, mMat);
		mesh.position.set(0, -1.5, zOffset);
		if (blur) mesh.scale.set(1, 1, 1);
		return mesh;
	}

	var mountainsFar = createMountainLayer(-45, 1.4, 0.75, true);
	mountainsFar.material.color = parseColor(theme.mountainColor).clone().lerp(parseColor(theme.skyHorizon), 0.15);
	mountainsFar.material.opacity = 0.45;
	scene.add(mountainsFar);

	var mountainsMid = createMountainLayer(-32, 1.1, 0.85, false);
	mountainsMid.material.color = parseColor(theme.mountainColor).clone().lerp(parseColor(theme.skyHorizon), 0.08);
	mountainsMid.material.opacity = 0.7;
	scene.add(mountainsMid);

	var mountainsNear = createMountainLayer(-20, 0.85, 1.0, false);
	mountainsNear.material.color = parseColor(theme.mountainColor);
	mountainsNear.material.opacity = 0.9;
	scene.add(mountainsNear);

	// === Glowing nodes ===
	var nodeCount = 420;
	var nodePositions = [];
	var nodePhases = [];
	var nodeSizes = [];
	for (var i = 0; i < nodeCount; i++) {
		var nx = (Math.random() - 0.5) * terrainWidth * 0.92;
		var nz = (Math.random() - 0.5) * terrainDepth * 0.92;
		var ny = terrainHeight(nx, nz, 0);
		nodePositions.push(nx, ny, nz);
		nodePhases.push(Math.random() * Math.PI * 2);
		nodeSizes.push(0.5 + Math.random() * 0.8);
	}
	var nodeGeo = new THREE.BufferGeometry();
	nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
	nodeGeo.setAttribute('phase', new THREE.Float32BufferAttribute(nodePhases, 1));
	nodeGeo.setAttribute('size', new THREE.Float32BufferAttribute(nodeSizes, 1));

	var nodeMat = new THREE.ShaderMaterial({
		uniforms: {
			color: { value: parseColor(theme.nodeColor) },
			time: { value: 0 },
			pixelRatio: { value: renderer.getPixelRatio() }
		},
		vertexShader: [
			'attribute float phase;',
			'attribute float size;',
			'varying float vAlpha;',
			'uniform float time;',
			'uniform float pixelRatio;',
			'void main() {',
			'  float pulse = 0.5 + 0.5 * sin(time * (1.8 + phase * 3.0) + phase * 20.0);',
			'  vAlpha = 0.35 + 0.65 * pulse;',
			'  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
			'  gl_PointSize = size * (6.0 + 5.0 * pulse) * pixelRatio * (120.0 / -mvPosition.z);',
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
	nodes.position.copy(terrain.position);
	scene.add(nodes);

	// === Ambient glow light ===
	var ambient = new THREE.AmbientLight(parseColor(theme.skyHorizon), 0.35);
	scene.add(ambient);

	// === Horizon glow sprite ===
	function createGlowTexture() {
		var c = document.createElement('canvas');
		c.width = 512;
		c.height = 128;
		var ctx = c.getContext('2d');
		var grd = ctx.createRadialGradient(256, 64, 0, 256, 64, 200);
		grd.addColorStop(0, 'rgba(255,60,60,0.9)');
		grd.addColorStop(0.4, 'rgba(200,40,40,0.4)');
		grd.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, 512, 128);
		return new THREE.CanvasTexture(c);
	}
	var horizonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
		map: createGlowTexture(),
		transparent: true,
		opacity: 0.7,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		color: parseColor(theme.skyHorizon)
	}));
	horizonGlow.position.set(0, 6, -55);
	horizonGlow.scale.set(140, 25, 1);
	scene.add(horizonGlow);

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
			'offset': { value: 0.85 },
			'darkness': { value: 2.2 }
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
			'intensity': { value: 0.035 }
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
	var grainPass = new THREE.ShaderPass(grainShader);
	composer.addPass(grainPass);

	// === Fog drift layer ===
	var driftTex = createCloudTexture();
	var driftMat = new THREE.SpriteMaterial({ map: driftTex, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, color: parseColor(theme.skyHorizon) });
	var drifts = [];
	for (var i = 0; i < 5; i++) {
		var drift = new THREE.Sprite(driftMat.clone());
		drift.position.set((Math.random() - 0.5) * 60, -1.5 + Math.random() * 1.5, -5 - Math.random() * 15);
		drift.scale.set(25 + Math.random() * 20, 6 + Math.random() * 5, 1);
		drift.userData = { speed: 0.3 + Math.random() * 0.4 };
		scene.add(drift);
		drifts.push(drift);
	}

	// === Resize handling ===
	window.addEventListener('resize', function () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		composer.setSize(window.innerWidth, window.innerHeight);
		nodeMat.uniforms.pixelRatio.value = renderer.getPixelRatio();
	});

	// === Animation loop ===
	var clock = new THREE.Clock();
	function animate() {
		requestAnimationFrame(animate);
		var time = clock.getElapsedTime();

		var pos = terrainGeo.attributes.position.array;
		for (var i = 0; i < pos.length; i += 3) {
			pos[i + 1] = terrainHeight(pos[i], pos[i + 2], time);
		}
		terrainGeo.attributes.position.needsUpdate = true;

		nodeMat.uniforms.time.value = time;

		for (var i = 0; i < drifts.length; i++) {
			drifts[i].position.x += drifts[i].userData.speed * 0.02;
			if (drifts[i].position.x > 35) drifts[i].position.x = -35;
		}

		grainPass.uniforms.time.value = time;
		composer.render();
	}
	animate();
})();
