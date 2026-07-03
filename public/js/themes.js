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

	function storageGet(key, fallback) {
		try {
			var v = localStorage.getItem(key);
			return v !== null ? v : fallback;
		} catch(e) {}
		return fallback;
	}

	function storageSet(key, value) {
		try {
			localStorage.setItem(key, value);
			if (typeof localforage !== 'undefined') {
				try { localforage.setItem(key, value); } catch(e) {}
			}
		} catch(e) {}
	}

	window.InfraredThemes = {
		themes: themes,
		get: function() {
			return storageGet(THEME_KEY, 'infrared');
		},
		set: function(themeId) {
			storageSet(THEME_KEY, themeId);
			this.apply(themeId);
		},
		apply: function(themeId) {
			document.documentElement.setAttribute('data-theme', themeId);
			var theme = themes.find(function(t) { return t.id === themeId; });

			['spectrum-bg', 'flux-bg', 'prism-bg'].forEach(function(cls) {
				document.documentElement.classList.remove(cls);
			});

			if (theme) {
				if (theme.id === 'spectrum') document.documentElement.classList.add('spectrum-bg');
				if (theme.id === 'flux') document.documentElement.classList.add('flux-bg');
				if (theme.id === 'prism') document.documentElement.classList.add('prism-bg');
			}

			window.dispatchEvent(new CustomEvent('infrared-theme-change', { detail: { theme: themeId } }));
		},
		init: function() {
			var saved = this.get();
			this.apply(saved);
		}
	};

	InfraredThemes.init();
})();
