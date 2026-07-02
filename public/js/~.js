// ~.js - Settings page

localforage.setItem('e', 'e');

// Settings navigation
document.addEventListener('DOMContentLoaded', function() {
	var sidebarItems = document.querySelectorAll('.settings-sidebar-item');
	var sections = document.querySelectorAll('.settings-section');

	function switchSection(sectionId) {
		sections.forEach(function(s) { s.classList.remove('active'); });
		sidebarItems.forEach(function(i) { i.classList.remove('active'); });
		var target = document.querySelector('#section-' + sectionId);
		var targetBtn = document.querySelector('.settings-sidebar-item[data-section="' + sectionId + '"]');
		if (target) target.classList.add('active');
		if (targetBtn) targetBtn.classList.add('active');
		if (sectionId === 'themes') renderThemeGrid();
		// Close all dropdowns
		document.querySelectorAll('.settings-select-dropdown').forEach(function(d) { d.classList.remove('open'); });
	}

	sidebarItems.forEach(function(item) {
		item.addEventListener('click', function(e) {
			e.preventDefault();
			switchSection(this.getAttribute('data-section'));
			try { window.location.hash = this.getAttribute('data-section'); } catch(e) {}
		});
	});

	// Hash-based navigation
	function handleHash() {
		var hash = window.location.hash.replace('#', '');
		if (hash) switchSection(hash);
	}
	window.addEventListener('hashchange', handleHash);
	handleHash();

	// Theme grid
	window.renderThemeGrid = function() {
		if (!window.InfraredThemes) return;
		var grid = document.getElementById('themeGrid');
		if (!grid) return;
		var currentTheme = InfraredThemes.get();
		grid.innerHTML = '';
		InfraredThemes.themes.forEach(function(theme) {
			var card = document.createElement('div');
			card.className = 'theme-card' + (theme.id === currentTheme ? ' selected' : '');
			card.style.setProperty('--bg1', theme.bg1);
			card.style.setProperty('--bg2', theme.bg2);
			card.innerHTML = '<div class="theme-card-preview" style="background:linear-gradient(135deg,'+theme.bg1+','+theme.bg2+')"></div><div class="theme-card-name">'+theme.name+'</div><div class="theme-card-desc">'+theme.desc+'</div><div class="theme-card-check"><span class="material-symbols-outlined" style="font-size:14px">check</span></div>';
			card.addEventListener('click', function() {
				InfraredThemes.set(theme.id);
				renderThemeGrid();
				showToast('success');
			});
			grid.appendChild(card);
		});
	};

	// Global dropdowns (close on outside click)
	document.addEventListener('click', function(e) {
		document.querySelectorAll('.settings-select-dropdown').forEach(function(dd) {
			if (!dd.parentElement.contains(e.target)) dd.classList.remove('open');
		});
	});

	// Select dropdown items
	document.querySelectorAll('.settings-select-dropdown li').forEach(function(li) {
		li.addEventListener('click', function() {
			var dropdown = this.closest('.settings-select');
			var btn = dropdown.querySelector('.settings-select-btn');
			var selected = btn.querySelector('.dropdown-selected') || btn.querySelector('span');
			var text = this.textContent.trim();
			selected.textContent = text;
			dropdown.querySelector('.settings-select-dropdown').classList.remove('open');

			// Mark as selected
			dropdown.querySelectorAll('li').forEach(function(l) { l.classList.remove('selected'); });
			this.classList.add('selected');

			// Persist if named dropdown
			if (dropdown.id) {
				localStorage.setItem('dropdown-selected-text-' + dropdown.id, text);
				var isProxy = (dropdown.id === 'proxyDropdown' || dropdown.id === 'transportDropdown' || dropdown.id === 'searchEngineDropdown');
				if (isProxy) {
					setTimeout(function() { location.reload(); }, 200);
				}
			}
		});
	});

	// Restore dropdown selections
	function restoreDropdowns() {
		document.querySelectorAll('.settings-select[id]').forEach(function(dd) {
			var saved = localStorage.getItem('dropdown-selected-text-' + dd.id);
			if (saved) {
				var btn = dd.querySelector('.settings-select-btn');
				var span = btn.querySelector('.dropdown-selected') || btn.querySelector('span');
				span.textContent = saved;
				dd.querySelectorAll('li').forEach(function(li) {
					if (li.textContent.trim() === saved) li.classList.add('selected');
				});
			}
		});
	}
	restoreDropdowns();

	// Toast
	window.showToast = function(type) {
		var el = document.getElementById(type === 'success' ? 'toast' : 'failtoast');
		if (!el) return;
		el.classList.add('active');
		var prog = el.querySelector(type==='success'?'.toast-progress':'.failtoast-progress');
		if (prog) prog.classList.add('active');
		setTimeout(function(){ el.classList.remove('active'); if(prog) prog.classList.remove('active'); }, 5000);
	};

	// Checkbox auto-launch
	function setCheckboxState() {
		var launchType = localStorage.getItem('launchType');
		var autoBlob = document.querySelector('.autoLaunchBlob');
		var autoBlank = document.querySelector('.autoLaunchAboutBlank');
		if (launchType === 'blob' && autoBlob) autoBlob.checked = true;
		else if (launchType === 'aboutBlank' && autoBlank) autoBlank.checked = true;
	}
	setCheckboxState();

	function handleCheckboxChange() {
		document.querySelectorAll('.checkbox-blob-aboutBlank').forEach(function(cb) {
			cb.addEventListener('change', function() {
				if (this.checked) {
					document.querySelectorAll('.checkbox-blob-aboutBlank').forEach(function(other) { if (other !== cb) other.checked = false; });
					if (this.classList.contains('autoLaunchBlob')) {
						localStorage.setItem('launchType', 'blob');
						launchBlob();
					} else {
						localStorage.setItem('launchType', 'aboutBlank');
						launchAboutBlank();
					}
				} else {
					localStorage.removeItem('launchType');
				}
			});
		});
	}
	handleCheckboxChange();

	// Cloaking launches
	window.launchBlob = function() {
		var url = window.location.href + '?redirect=true';
		var html = '<html><head><title>Infrared</title><style>body,html{margin:0;padding:0;width:100%;height:100%;overflow:hidden}iframe{position:fixed;top:0;left:0;width:100%;height:100%;border:none}</style></head><body><iframe src="'+url+'"></iframe></body></html>';
		var blob = new Blob([html], {type:'text/html'});
		var blobUrl = URL.createObjectURL(blob);
		window.open(blobUrl);
	};

	window.launchAboutBlank = function() {
		var win = window.open();
		var iframe = win.document.createElement('iframe');
		iframe.style.cssText = 'position:absolute;left:0;top:0;width:100vw;height:100vh;border:none;margin:0;padding:0';
		iframe.src = '/';
		win.document.body.appendChild(iframe);
		win.document.body.style.overflow = 'hidden';
	};

	// Panic key
	var panicKeyInput = document.querySelector('.panicKey');
	var saveBtn = document.querySelector('.panicKeySave');
	var validKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`.~!@#$%^&*()-_=+[{]}|;:,<.>/?';
	if (localStorage.getItem('panicKeyBind') && panicKeyInput) panicKeyInput.value = localStorage.getItem('panicKeyBind');

	if (saveBtn) saveBtn.addEventListener('click', function() {
		var keys = (panicKeyInput.value || '`').split(',').map(function(k) { return k.trim(); });
		var allValid = keys.every(function(k) { return validKeys.includes(k) && k.length === 1; });
		if (allValid || keys.every(function(k) { return k === ''; })) {
			localStorage.setItem('panicKeyBind', keys.join(',') || '`');
			showToast('success');
		} else {
			showToast('error');
		}
	});

	// Password
	var pwdInput = document.querySelector('.pPasswordInput');
	var pwdSave = document.querySelector('.pPasswordSave');
	var pwdKeyInput = document.querySelector('.passwordHotkeyInput');
	var pwdKeySave = document.querySelector('.pPasswordKeybind');

	if (pwdSave) pwdSave.addEventListener('click', function() {
		var pwd = pwdInput.value;
		if (pwd) {
			function xorEncode(str,k){var r='';for(var i=0;i<str.length;i++)r+=String.fromCharCode(str.charCodeAt(i)^k);return r;}
			localStorage.setItem('pPassword', xorEncode(btoa(pwd), 42));
			localStorage.setItem('passwordProtected', 'true');
			showToast('success');
			pwdInput.value = '';
		} else {
			showToast('error');
		}
	});

	if (localStorage.getItem('passwordKeyBind') && pwdKeyInput) pwdKeyInput.value = localStorage.getItem('passwordKeyBind');

	if (pwdKeySave) pwdKeySave.addEventListener('click', function() {
		var keys = pwdKeyInput.value.split(',').map(function(k) { return k.trim(); }).filter(function(k) { return k.length > 0; });
		localStorage.setItem('passwordKeyBind', keys.join(',') || '~');
		showToast('success');
	});

	// Checkboxes
	function checkboxToggle(className, storageKey, defaultChecked) {
		var cb = document.querySelector('.' + className);
		if (!cb) return;
		if (localStorage.getItem(storageKey) === null) localStorage.setItem(storageKey, defaultChecked ? 'false' : 'true');
		cb.checked = !(localStorage.getItem(storageKey) === 'true');
		cb.addEventListener('change', function() {
			localStorage.setItem(storageKey, this.checked ? 'false' : 'true');
			if (storageKey === 'particlesHidden') {
				var hidden = !this.checked;
				document.querySelectorAll('.bg-orb, .bg-grid').forEach(function(el) { el.style.display = hidden ? 'none' : ''; });
			}
		});
	}

	checkboxToggle('utilBarYesNo', 'utilBarHidden', true);
	checkboxToggle('particlesYesNo', 'particlesHidden', true);
	checkboxToggle('smallIconsYesNo', 'smallIcons', true);
	checkboxToggle('passwordYesNo', 'passwordOff', false);

	// Data export/import
	document.getElementById('importData').addEventListener('click', function() { document.getElementById('dataInput').click(); });
	document.getElementById('exportData').addEventListener('click', function() { exportData(); });

	window.exportData = function() {
		function b6xorEncrypt(text) {
			var o='';
			for(var i=0;i<text.length;i++){o+=String.fromCharCode(text.charCodeAt(i)^2)}
			return btoa(encodeURIComponent(o));
		}
		var data = { localStorageData: JSON.stringify(localStorage) };
		var blob = new Blob([b6xorEncrypt(JSON.stringify(data))], {type:'application/octet-stream'});
		var a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'data.infrared';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		alert('Data exported successfully!');
	};

	window.importData = function() {
		var file = document.getElementById('dataInput').files[0];
		if (!file) return;
		var reader = new FileReader();
		reader.onload = function(e) {
			try {
				function b6xorDecrypt(enc) {
					var d = decodeURIComponent(atob(enc));
					var o='';
					for(var i=0;i<d.length;i++){o+=String.fromCharCode(d.charCodeAt(i)^2)}
					return o;
				}
				var decrypted = JSON.parse(b6xorDecrypt(e.target.result));
				var lsData = JSON.parse(decrypted.localStorageData);
				for (var key in lsData) { try { localStorage.setItem(key, lsData[key]); } catch(ee) {} }
				alert('Data imported successfully! Reloading...');
				location.reload();
			} catch(err) { alert('Invalid data file.'); }
		};
		reader.readAsText(file);
	};

	// Reset button
	document.getElementById('resetButton').addEventListener('click', function() {
		if (!confirm('This will delete ALL your data. Continue?')) return;
		localStorage.clear();
		sessionStorage.clear();
		try { indexedDB.databases().then(function(dbs){dbs.forEach(function(db){indexedDB.deleteDatabase(db.name)})}); } catch(e) {}
		try { caches.keys().then(function(keys){keys.forEach(function(k){caches.delete(k)})}); } catch(e) {}
		setTimeout(function(){ location.href = '/'; }, 500);
	});

	// Wisp
	var wispVal = document.querySelector('.input.wisp');
	var wispSave = document.querySelector('.wispSave');
	var wispReset = document.querySelector('.wispReset');
	if (wispVal) wispVal.value = localStorage.getItem('wisp') || ((location.protocol==='https:'?'wss':'ws')+'://'+location.host+'/wisp/');
	if (wispSave) wispSave.addEventListener('click', function() { localStorage.setItem('wisp', wispVal.value); showToast('success'); });
	if (wispReset) wispReset.addEventListener('click', function() { localStorage.removeItem('wisp'); wispVal.value = ((location.protocol==='https:'?'wss':'ws')+'://'+location.host+'/wisp/'); showToast('success'); });
	if (wispVal) wispVal.addEventListener('keydown', function(e) { if (e.key === 'Enter') { localStorage.setItem('wisp', this.value); showToast('success'); }});

	// Fetch last commit date
	fetch('https://api.github.com/repos/nightproxy/infrared/commits').then(function(r){return r.json()}).then(function(commits){
		if (commits.length > 0) {
			var d = new Date(commits[0].commit.committer.date);
			document.getElementById('last-updated').textContent = d.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
		}
	}).catch(function(){});
});
