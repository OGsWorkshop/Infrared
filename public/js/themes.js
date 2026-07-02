// Theme Manager - Handles instant theme switching without page reload
(function() {
	const THEME_KEY = 'infrared_theme';
	const themes = [
		{ id: 'infrared', name: 'Infrared', desc: 'Classic red on black', accent: '#e80000', bg1: '#000000', bg2: '#e80000' },
		{ id: 'spectrum', name: 'Spectrum', desc: 'Shifting rainbow gradient', accent: '#b050ff', bg1: '#0a0a0a', bg2: '#7c3aed' },
		{ id: 'radiant', name: 'Radiant', desc: 'Soft warm gold tones', accent: '#d4af37', bg1: '#0d0d0d', bg2: '#d4af37' },
		{ id: 'rift', name: 'Rift', desc: 'Dark purple + electric blue', accent: '#00b4ff', bg1: '#0a0714', bg2: '#00b4ff' },
		{ id: 'redshift', name: 'Redshift', desc: 'Deep cosmic red', accent: '#8b0000', bg1: '#0a0303', bg2: '#8b0000' },
		{ id: 'echo', name: 'Echo', desc: 'Dim blue, low saturation', accent: '#5b7ca0', bg1: '#0d1117', bg2: '#5b7ca0' },
		{ id: 'flux', name: 'Flux', desc: 'Cyan to violet animated', accent: '#00c8c8', bg1: '#0a0d14', bg2: '#00b8d4' },
		{ id: 'prism', name: 'Prism', desc: 'Glass-like multicolor', accent: '#c896ff', bg1: '#0a0a0f', bg2: '#a060e0' },
		{ id: 'vector', name: 'Vector', desc: 'Neon green cyberpunk', accent: '#00ff41', bg1: '#000000', bg2: '#00ff41' }
	];

	window.InfraredThemes = {
		themes: themes,
		get: function() {
			return localStorage.getItem(THEME_KEY) || 'infrared';
		},
		set: function(themeId) {
			localStorage.setItem(THEME_KEY, themeId);
			this.apply(themeId);
		},
		apply: function(themeId) {
			document.documentElement.setAttribute('data-theme', themeId);
			var theme = themes.find(function(t) { return t.id === themeId; });
			if (theme && theme.id === 'spectrum') {
				document.documentElement.classList.add('spectrum-bg');
			} else {
				document.documentElement.classList.remove('spectrum-bg');
			}
			if (theme && theme.id === 'flux') {
				document.documentElement.classList.add('flux-bg');
			} else {
				document.documentElement.classList.remove('flux-bg');
			}
			if (theme && theme.id === 'prism') {
				document.documentElement.classList.add('prism-bg');
			} else {
				document.documentElement.classList.remove('prism-bg');
			}
			this.updateParticleColor(themeId);
		},
		updateParticleColor: function(themeId) {
			if (typeof particlesJS !== 'undefined' && window.particleColor) {
				var pjs = document.querySelector('#particles-js');
				if (pjs && pjs.__particlesJS) {
					try {
						var color = getComputedStyle(document.documentElement).getPropertyValue('--theme-particle-color').trim();
						pjs.__particlesJS.pJS.particles.color.value = color;
						pjs.__particlesJS.pJS.fn.particlesRefresh();
					} catch(e) {}
				}
			}
		},
		init: function() {
			var saved = this.get();
			this.apply(saved);
		}
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function() {
			InfraredThemes.init();
		});
	} else {
		InfraredThemes.init();
	}
})();
