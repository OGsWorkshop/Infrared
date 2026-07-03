// Global configuration - loaded on every page
localforage.setItem('e', 'e');

// Cloaking
function isInLocalStorage(key) { return localStorage.getItem(key) !== null; }

	var currentLocation = window.location.href;
	function isCloakedFrame() {
		try {
			return currentLocation === 'about:blank' || currentLocation.includes('blob:') || window.parent.location.href === 'about:blank';
		} catch(e) {
			return false;
		}
	}
	document.addEventListener('DOMContentLoaded', function() {
		if (!isCloakedFrame()) {
		var launchType = localStorage.getItem('launchType');
		if (launchType === 'blob' && window === window.top) {
			var currentSiteUrl = currentLocation + '?redirect=true';
			var htmlContent = '<html><head><title>Infrared</title><style>body,html{margin:0;padding:0;width:100%;height:100%;overflow:hidden}iframe{position:fixed;top:0;left:0;width:100%;height:100%;border:none}</style></head><body><iframe src="'+currentSiteUrl+'"></iframe></body></html>';
			var blob = new Blob([htmlContent], {type:'text/html'});
			var blobUrl = URL.createObjectURL(blob);
			var newWindow = window.open(blobUrl);
		var tabCloak = localStorage.getItem('dropdown-selected-text-tabCloakDropdown') || 'None (Default)';
		var redirectMap = {'Google Classroom':'https://classroom.google.com','Schoology':'https://app.schoology.com/home','Desmos':'https://www.desmos.com/calculator','Google Drive':'https://drive.google.com','Khan Academy':'https://www.khanacademy.org/','Quizlet':'https://quizlet.com/'};
		window.location.href = redirectMap[tabCloak] || 'https://google.com';
		} else if (launchType === 'aboutBlank' && window === window.top) {
			var win = window.open();
			var url = currentLocation;
			var iframe = win.document.createElement('iframe');
			iframe.style.cssText = 'position:absolute;left:0;top:0;width:100vw;height:100vh;border:none;margin:0;padding:0';
			iframe.src = url;
			win.document.body.appendChild(iframe);
			win.document.body.style.overflow = 'hidden';
			window.close();
			var selectedTab = localStorage.getItem('dropdown-selected-text-tabCloakDropdown') || 'None (Default)';
			var urlMap = {'Google Classroom':'https://classroom.google.com','Schoology':'https://app.schoology.com/home','Desmos':'https://www.desmos.com/calculator','Google Drive':'https://drive.google.com','Khan Academy':'https://www.khanacademy.org/','Quizlet':'https://quizlet.com/'};
			window.location.href = urlMap[selectedTab] || 'https://google.com';
		}
	}

	// Tab Cloaking
	var cloaks = {
		'None (Default)': {title:'Infrared',favicon:'/assets/favicon.ico'},
		'Google Classroom': {title:'Google Classroom',favicon:'https://www.gstatic.com/classroom/favicon.png'},
		'Schoology': {title:'Schoology',favicon:'https://www.powerschool.com/favicon.ico'},
		'Desmos': {title:'Desmos',favicon:'https://www.desmos.com/assets/img/apps/graphing/favicon.ico'},
		'Google Drive': {title:'Google Drive',favicon:'https://ssl.gstatic.com/images/branding/product/2x/hh_drive_36dp.png'},
		'Khan Academy': {title:'Khan Academy',favicon:'https://www.khanacademy.org/favicon.ico'},
		'Quizlet': {title:'Quizlet',favicon:'https://quizlet.com/_next/static/media/q-twilight.e27821d9.png'}
	};

	function setCloak(cloak) {
		if (cloaks[cloak]) {
			document.title = cloaks[cloak].title;
			var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
			link.type = 'image/x-icon';
			link.rel = 'shortcut icon';
			link.href = cloaks[cloak].favicon;
			document.getElementsByTagName('head')[0].appendChild(link);
		}
	}

	function checkCloakTab() {
		var cloakTab = localStorage.getItem('dropdown-selected-text-tabCloakDropdown');
		if (!cloakTab) {
			cloakTab = 'None (Default)';
			localStorage.setItem('dropdown-selected-text-tabCloakDropdown', cloakTab);
		}
		if (cloaks[cloakTab]) setCloak(cloakTab);
	}
	checkCloakTab();
	window.addEventListener('storage', function(e) { if (e.key === 'dropdown-selected-text-tabCloakDropdown') checkCloakTab(); });
	setTimeout(checkCloakTab, 500);

	// Panic Key
	if (!localStorage.getItem('panicKeyBind')) localStorage.setItem('panicKeyBind', '`');
	function handlePanicKey(event) {
		var keys = (localStorage.getItem('panicKeyBind')||'`').split(',');
		if (keys.includes(event.key) && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
			var selectedText = localStorage.getItem('dropdown-selected-text-tabCloakDropdown') || 'None (Default)';
			var urlMap = {'Google Classroom':'https://classroom.google.com','Schoology':'https://app.schoology.com/home','Desmos':'https://www.desmos.com/calculator','Google Drive':'https://drive.google.com','Khan Academy':'https://www.khanacademy.org/','Quizlet':'https://quizlet.com/'};
			window.location.href = urlMap[selectedText] || 'https://google.com';
		}
	}
	document.addEventListener('keydown', handlePanicKey);

	// Password Protection Keybind
	if (!localStorage.getItem('passwordKeyBind')) localStorage.setItem('passwordKeyBind', '~');
	function handlePasswordKey(event) {
		var keys = (localStorage.getItem('passwordKeyBind')||'~').split(',');
		if (keys.includes(event.key) && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA' && localStorage.getItem('passwordOff') === 'false' && localStorage.getItem('pPassword')) {
			applyPasswordProtection();
		}
	}
	document.addEventListener('keydown', handlePasswordKey);
	if (!localStorage.getItem('isPasswordScreenOpen')) localStorage.setItem('isPasswordScreenOpen', 'false');
	if (localStorage.getItem('isPasswordScreenOpen') !== 'false') setTimeout(applyPasswordProtection, 500);

	// Password Protection Overlay
	function base64Encode(str) { return btoa(str); }
	function xorEncode(str, key) { var result = ''; for (var i=0; i<str.length; i++) result += String.fromCharCode(str.charCodeAt(i)^key); return result; }
	function checkPassword(inputPassword, storedPassword) { return xorEncode(base64Encode(inputPassword), 42) === storedPassword; }

	function applyPasswordProtection() {
		if (localStorage.getItem('passwordOff')==='false' && !document.querySelector('.password-overlay')) {
			document.body.style.pointerEvents = 'none';
			var overlay = document.createElement('div');
			overlay.className = 'password-overlay';
			overlay.style.cssText = 'position:fixed!important;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:999999!important;display:flex;align-items:center;justify-content:center';
			var dialog = document.createElement('div');
			dialog.className = 'password-dialog';
			dialog.innerHTML = '<h2>Password</h2><input type="password" id="pwInput" placeholder="Enter password" style="width:100%;padding:12px 16px;background:rgba(10,10,10,0.8);border:1px solid rgba(255,255,255,0.1);border-radius:14px;color:#fff;font-size:14px;outline:none;margin-bottom:12px;font-family:inherit" />';
			overlay.appendChild(dialog);
			document.body.prepend(overlay);
			localStorage.setItem('isPasswordScreenOpen', 'true');
			setTimeout(function() { document.getElementById('pwInput').focus(); }, 100);
			document.getElementById('pwInput').addEventListener('keydown', function(e) {
				if (e.key === 'Enter') {
					if (checkPassword(this.value, localStorage.getItem('pPassword'))) {
						overlay.style.opacity = '0';
						overlay.style.transition = 'opacity 0.3s';
						setTimeout(function(){ overlay.remove(); }, 300);
						document.body.style.pointerEvents = '';
						localStorage.setItem('isPasswordScreenOpen', 'false');
					} else {
						var toast = document.getElementById('failtoast');
						if (toast) { toast.querySelector('.text-1').textContent = 'Wrong Password'; toast.querySelector('.text-2').textContent = 'Incorrect password. Try again.'; toast.classList.add('active'); toast.querySelector('.failtoast-progress').classList.add('active'); }
					}
				}
			});
		}
	}

	// Background effects toggle
	function updateEffectsDisplay() {
		var hidden = localStorage.getItem('particlesHidden') === 'true';
		document.querySelectorAll('.bg-orb, .bg-grid, .bg-glow, #starfield').forEach(function(el) { el.style.display = hidden ? 'none' : ''; });
		if (window.Starfield && typeof window.Starfield.updateVisibility === 'function') window.Starfield.updateVisibility();
	}
	if (localStorage.getItem('particlesHidden') === null) localStorage.setItem('particlesHidden', 'false');
	updateEffectsDisplay();

	// Toast helpers
	window.showToast = function(type) {
		var el = document.getElementById(type === 'success' ? 'toast' : 'failtoast');
		if (!el) return;
		el.classList.add('active');
		var prog = el.querySelector(type==='success'?'.toast-progress':'.failtoast-progress');
		if (prog) prog.classList.add('active');
		setTimeout(function(){ el.classList.remove('active'); if(prog) prog.classList.remove('active'); }, 5000);
	};
});
