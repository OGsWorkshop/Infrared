// json-loader.js - Handles loading and rendering games/apps from JSON files
localforage.setItem('e', 'e');

document.addEventListener('DOMContentLoaded', function() {
	var pathname = window.location.pathname;
	var lazyDisabled = localStorage.getItem('lazyLoadDisabled') === 'true';

	function createPlaceholder(name) {
		var div = document.createElement('div');
		div.className = 'bento-card-img bento-card-placeholder';
		div.textContent = name.replace(/^[!] /, '').charAt(0).toUpperCase();
		div.title = name.replace(/^[!] /, '');
		return div;
	}

	function createItemCard(item) {
		var card = document.createElement('a');
		card.href = '/&?q=' + encodeURIComponent(item.name);
		card.className = 'bento-card';
		if (item.featured) card.className += ' featured';

		var cleanName = item.name.replace(/^[!] /, '');
		var displayName = cleanName;

		var img = document.createElement('img');
		img.src = item.img || '/assets/default.png';
		img.alt = displayName;
		img.className = 'bento-card-img';
		img.loading = lazyDisabled ? 'eager' : 'lazy';
		img.onerror = function() {
			var placeholder = createPlaceholder(displayName);
			if (img.parentNode) img.parentNode.replaceChild(placeholder, img);
		};

		var label = document.createElement('div');
		label.className = 'bento-card-label';
		label.textContent = displayName;

		card.appendChild(img);
		card.appendChild(label);
		return card;
	}

	// Games page
	if (pathname === '/g') {
		fetch('/json/g.json')
			.then(function(r) { return r.json(); })
			.then(function(data) {
				var grid = document.querySelector('.gameContain');
				var catTabs = document.getElementById('gameCatTabs');
				var activeCat = 'all';

				data.sort(function(a, b) { return a.name.localeCompare(b.name); });

				function renderGames(filter) {
					grid.innerHTML = '';
					var filtered = data.filter(function(game) {
						if (filter === 'all') return true;
						return game.categories && game.categories.indexOf(filter) !== -1;
					});

					if (filtered.length === 0) {
						grid.innerHTML = '<div class="empty-state"><span class="material-symbols-outlined empty-state-icon">sports_esports</span><h3>No games found</h3><p>Try a different search or category</p></div>';
						return;
					}

					filtered.forEach(function(game) {
						grid.appendChild(createItemCard(game));
					});
				}

				renderGames('all');

				// Category tabs
				if (catTabs) {
					catTabs.querySelectorAll('.category-tab').forEach(function(tab) {
						tab.addEventListener('click', function() {
							catTabs.querySelectorAll('.category-tab').forEach(function(t) { t.classList.remove('active'); });
							this.classList.add('active');
							activeCat = this.getAttribute('data-cat');
							renderGames(activeCat);
						});
					});
				}

				// Search
				var searchInput = document.querySelector('.gameSearchInput');
				if (searchInput) {
					searchInput.addEventListener('input', function() {
						var query = this.value.toLowerCase().trim();
						if (query === '') { renderGames(activeCat); return; }
						var filtered = data.filter(function(game) {
							return game.name.toLowerCase().indexOf(query) !== -1;
						});
						grid.innerHTML = '';
						if (filtered.length === 0) {
							grid.innerHTML = '<div class="empty-state"><span class="material-symbols-outlined empty-state-icon">sports_esports</span><h3>No games match "' + query + '"</h3><p>Try different keywords</p></div>';
							return;
						}
						filtered.forEach(function(game) {
							grid.appendChild(createItemCard(game));
						});
					});
				}

				// Random button
				var randomBtn = document.querySelector('.random-btn');
				if (randomBtn) {
					randomBtn.addEventListener('click', function() {
						var visible = data.filter(function(g) { return activeCat === 'all' || (g.categories && g.categories.indexOf(activeCat)!==-1); });
						if (visible.length > 0) {
							var rand = visible[Math.floor(Math.random() * visible.length)];
							window.location.href = '/&?q=' + encodeURIComponent(rand.name);
						}
					});
				}
			})
			.catch(function(err) { console.error('Error loading games:', err); });

		// Scroll to top
		var scrollBtn = document.getElementById('scrollTopBtn');
		if (scrollBtn) {
			window.addEventListener('scroll', function() {
				scrollBtn.classList.toggle('visible', window.scrollY > 100);
			});
			scrollBtn.addEventListener('click', function() { window.scrollTo({top:0, behavior:'smooth'}); });
		}
	}

	// Apps page
	if (pathname === '/a') {
		fetch('/json/a.json')
			.then(function(r) { return r.json(); })
			.then(function(data) {
				var grid = document.querySelector('.appsContainer');
				var catTabs = document.getElementById('appCatTabs');
				var activeCat = 'all';

				data.sort(function(a, b) { return a.name.localeCompare(b.name); });

				function renderApps(filter) {
					grid.innerHTML = '';
					var filtered = data.filter(function(app) {
						if (filter === 'all') return true;
						return app.categories && app.categories.indexOf(filter) !== -1;
					});

					if (filtered.length === 0) {
						grid.innerHTML = '<div class="empty-state"><span class="material-symbols-outlined empty-state-icon">apps</span><h3>No apps found</h3><p>Try a different search or category</p></div>';
						return;
					}

					filtered.forEach(function(app) {
						grid.appendChild(createItemCard(app));
					});
				}

				renderApps('all');

				if (catTabs) {
					catTabs.querySelectorAll('.category-tab').forEach(function(tab) {
						tab.addEventListener('click', function() {
							catTabs.querySelectorAll('.category-tab').forEach(function(t) { t.classList.remove('active'); });
							this.classList.add('active');
							activeCat = this.getAttribute('data-cat');
							renderApps(activeCat);
						});
					});
				}

				var searchInput = document.querySelector('.appsSearchInput');
				if (searchInput) {
					searchInput.addEventListener('input', function() {
						var query = this.value.toLowerCase().trim();
						if (query === '') { renderApps(activeCat); return; }
						var filtered = data.filter(function(app) { return app.name.toLowerCase().indexOf(query) !== -1; });
						grid.innerHTML = '';
						if (filtered.length === 0) {
							grid.innerHTML = '<div class="empty-state"><span class="material-symbols-outlined empty-state-icon">apps</span><h3>No apps match "' + query + '"</h3><p>Try different keywords</p></div>';
							return;
						}
						filtered.forEach(function(app) {
							grid.appendChild(createItemCard(app));
						});
					});
				}
			})
			.catch(function(err) { console.error('Error loading apps:', err); });

		var scrollBtn = document.getElementById('scrollTopBtn');
		if (scrollBtn) {
			window.addEventListener('scroll', function() { scrollBtn.classList.toggle('visible', window.scrollY > 100); });
			scrollBtn.addEventListener('click', function() { window.scrollTo({top:0, behavior:'smooth'}); });
		}
	}

	// Browser shortcuts
	if (pathname === '/&') {
		if (localStorage.getItem('smallIcons') === 'true') {
			fetch('/json/s.json')
				.then(function(r) { return r.json(); })
				.then(function(data) {
					var container = document.querySelector('.shortcuts');
					if (!container) return;
					data.forEach(function(shortcut) {
						var link = document.createElement('a');
						link.href = shortcut.name.toLowerCase() === 'settings' ? '/~/#/proxy' : '/&?q=' + encodeURIComponent(shortcut.name);
						var div = document.createElement('div');
						div.className = 'browser-shortcut';
						if (shortcut.bg) div.style.backgroundColor = shortcut.bg;
						var img = document.createElement('img');
						img.src = shortcut.img;
						img.alt = shortcut.name;
						if (shortcut.style) img.style.cssText += shortcut.style;
						img.onerror = function() { this.src = '/assets/default.png'; };
						div.appendChild(img);
						link.appendChild(div);
						container.appendChild(link);
					});
				});
		} else {
			fetch('/json/sb.json')
				.then(function(r) { return r.json(); })
				.then(function(data) {
					var container = document.querySelector('.shortcutsBig');
					if (!container) return;
					container.style.display = 'flex';
					data.forEach(function(shortcut) {
						var link = document.createElement('a');
						link.href = shortcut.name.toLowerCase() === 'settings' ? '/~/#/proxy' : '/&?q=' + encodeURIComponent(shortcut.name);
						var div = document.createElement('div');
						div.className = 'browser-shortcut-big';
						if (shortcut.bg) div.style.backgroundColor = shortcut.bg;
						var img = document.createElement('img');
						img.src = shortcut.img;
						img.alt = shortcut.name;
						img.style.width = '160px';
						img.style.height = '88px';
						img.style.objectFit = 'cover';
						img.onerror = function() { this.src = '/assets/default.png'; };
						div.appendChild(img);
						link.appendChild(div);
						container.appendChild(link);
					});
				});
		}
	}
});
