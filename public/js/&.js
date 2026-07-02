// &.js - Browser page functionality

var encodedUrl = '';
async function executeSearch(query) {
	if (!swConfigSettings) return;
	encodedUrl = swConfigSettings.prefix + (swConfigSettings.encodeUrl ? swConfigSettings.encodeUrl(search(query)) : search(query));
	localStorage.setItem('input', query);
	localStorage.setItem('output', encodedUrl);
	var spinner = document.getElementById('spinnerWrapper');
	if (spinner) spinner.style.display = 'block';
	var home = document.getElementById('browserHome');
	if (home) home.style.display = 'none';
	var iframe = document.getElementById('intoinfrared');
	await registerSW();
	iframe.src = encodedUrl;
	try { await registerSW(); } catch(e) {}
	iframe.style.display = 'block';
	if (spinner) spinner.style.display = 'none';
	document.querySelectorAll('input').forEach(function(input) { input.blur(); });
	iframe.addEventListener('load', function() {
		try {
			var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
			if (iframeDoc) {
				var errorList = iframeDoc.querySelectorAll('ul li');
				if (errorList && Array.from(errorList).some(function(li) { return li.textContent.trim() === 'Checking your internet connection'; })) {
					iframe.src = '/500';
				}
			}
		} catch(e) {}
		startURLMonitoring();
	});
}

var historyArray = JSON.parse(localStorage.getItem('historyArray')) || [];
var currentIndex = parseInt(localStorage.getItem('currentIndex')) || -1;
if (historyArray.length > 0) { currentIndex = historyArray.length; saveHistory(); }

function saveHistory() {
	localStorage.setItem('historyArray', JSON.stringify(historyArray));
	localStorage.setItem('currentIndex', currentIndex.toString());
}

function startURLMonitoring() {
	var iframe = document.getElementById('intoinfrared');
	var lastUrl = '';
	try { lastUrl = iframe.contentWindow.location.href; } catch(e) { return; }
	var checkIframeURL = function() {
		try {
			var currentUrl = iframe.contentWindow.location.href;
			if (currentUrl !== lastUrl) {
				lastUrl = currentUrl;
				if (historyArray[currentIndex] !== currentUrl) {
					historyArray = historyArray.slice(0, currentIndex + 1);
					historyArray.push(currentUrl);
					currentIndex++;
					saveHistory();
				}
				updateAddressBar(currentUrl);
				updateNavButtons();
			}
		} catch(e) {}
	};
	setInterval(checkIframeURL, 250);
}

function updateAddressBar(url) {
	var addr = document.getElementById('gointoinfrared2');
	if (!addr) return;
	var cleaned = '';
	if (swConfigSettings && swConfigSettings.decodeUrl) {
		try {
			var parts = url.split(swConfigSettings.prefix);
			cleaned = swConfigSettings.decodeUrl(parts.length > 1 ? parts[parts.length-1] : url);
		} catch(e) { cleaned = url; }
	} else {
		cleaned = url;
	}
	if (cleaned === 'a`owt8bnalk') { addr.value = 'Loading...'; }
	else { addr.value = cleaned.replace(/^https?:\/\//, ''); }
}

function updateNavButtons() {
	var backBtn = document.getElementById('backBtn');
	var fwdBtn = document.getElementById('fwdBtn');
	if (currentIndex > 0) { backBtn.disabled = false; backBtn.style.opacity = '1'; }
	else { backBtn.disabled = true; backBtn.style.opacity = '0.35'; }
	if (currentIndex < historyArray.length - 1) { fwdBtn.disabled = false; fwdBtn.style.opacity = '1'; }
	else { fwdBtn.disabled = true; fwdBtn.style.opacity = '0.35'; }
}

// Address bar click to edit
if (address2) {
	address2.addEventListener('click', function() {
		var val = this.value;
		if (!val.startsWith('http://') && !val.startsWith('https://') && val.indexOf('.') > -1 && val !== 'Loading...') {
			this.value = 'https://' + val;
		}
		this.select();
	});
	address2.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') { e.preventDefault(); executeSearch(this.value); }
	});
	address2.addEventListener('blur', function() {
		this.value = this.value.replace(/^https?:\/\//, '');
	});
}

// Search input on new tab page
if (address1) {
	address1.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') { e.preventDefault(); document.getElementById('browserHome').style.display = 'none'; executeSearch(this.value); }
	});
}

// Navigation buttons
var backBtn = document.getElementById('backBtn');
var fwdBtn = document.getElementById('fwdBtn');
var refreshBtn = document.getElementById('refreshBtn');
var homeBtn = document.getElementById('homeBtn');
var fullscreenBtn = document.getElementById('fullscreenBtn');
var iframe = document.getElementById('intoinfrared');

if (backBtn) backBtn.addEventListener('click', function() {
	if (currentIndex > 0) {
		currentIndex--;
		iframe.src = historyArray[currentIndex];
		iframe.style.display = 'block';
		document.getElementById('browserHome').style.display = 'none';
		updateNavButtons();
		saveHistory();
	}
});

if (fwdBtn) fwdBtn.addEventListener('click', function() {
	if (currentIndex < historyArray.length - 1) {
		currentIndex++;
		iframe.src = historyArray[currentIndex];
		iframe.style.display = 'block';
		document.getElementById('browserHome').style.display = 'none';
		updateNavButtons();
		saveHistory();
	}
});

if (refreshBtn) refreshBtn.addEventListener('click', function() {
	try { iframe.contentWindow.location.reload(); } catch(e) { iframe.src = iframe.src; }
});

if (homeBtn) homeBtn.addEventListener('click', function() {
	iframe.style.display = 'none';
	iframe.src = 'about:blank';
	document.getElementById('browserHome').style.display = '';
});

if (fullscreenBtn) fullscreenBtn.addEventListener('click', function() {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		var el = iframe.src && iframe.src !== 'about:blank' ? iframe : document.documentElement;
		(el.requestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullscreen || el.msRequestFullscreen).call(el);
	}
});

document.addEventListener('fullscreenchange', function() {
	if (fullscreenBtn) fullscreenBtn.querySelector('.material-symbols-outlined').textContent = document.fullscreenElement ? 'fullscreen_exit' : 'fullscreen';
});

// URL query param handling
document.addEventListener('DOMContentLoaded', function() {
	var urlParams = new URLSearchParams(window.location.search);
	var queryParam = urlParams.get('q');
	if (queryParam) {
		Promise.all([
			fetch('/json/g.json').then(function(r){return r.json()}).catch(function(){return []}),
			fetch('/json/a.json').then(function(r){return r.json()}).catch(function(){return []}),
			fetch('/json/s.json').then(function(r){return r.json()}).catch(function(){return []})
		]).then(function(results) {
			var allData = [].concat(results[0], results[1], results[2]);
			var item = allData.find(function(d) { return d.name && d.name.toLowerCase() === queryParam.toLowerCase(); });
			if (item) {
				document.getElementById('browserHome').style.display = 'none';
				executeSearch(item.url || item.name);
			} else {
				document.getElementById('browserHome').style.display = 'none';
				executeSearch(queryParam);
			}
		});
	} else {
		if (localStorage.getItem('utilBarHidden') === 'true') {
			var utilBar = document.querySelector('.utilityBar');
			if (utilBar) utilBar.style.display = 'none';
		}
	}
	updateNavButtons();
});

// Eruda dev tools injection
var devToggle = false;
var erudaScriptLoaded = false;
var erudaScriptInjecting = false;

function injectErudaScript(iframeDocument) {
	return new Promise(function(resolve, reject) {
		if (erudaScriptLoaded) { resolve(); return; }
		if (erudaScriptInjecting) { resolve(); return; }
		erudaScriptInjecting = true;
		var script = iframeDocument.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/eruda';
		script.onload = function() { erudaScriptLoaded = true; erudaScriptInjecting = false; resolve(); };
		script.onerror = function() { erudaScriptInjecting = false; reject(new Error('Eruda load failed')); };
		try { iframeDocument.body.appendChild(script); } catch(e) { erudaScriptInjecting = false; reject(e); }
	});
}

function injectErudaShow(iframeDocument) {
	var script = iframeDocument.createElement('script');
	script.textContent = 'eruda.init({defaults:{displaySize:50,transparency:0.9,theme:"Material Palenight"}});eruda.show();document.currentScript.remove();';
	try { iframeDocument.body.appendChild(script); } catch(e) {}
}

function injectErudaHide(iframeDocument) {
	var script = iframeDocument.createElement('script');
	script.textContent = 'eruda.hide();document.currentScript.remove();';
	try { iframeDocument.body.appendChild(script); } catch(e) {}
}

function inspectelement() {
	var iframe = document.getElementById('intoinfrared');
	if (!iframe || !iframe.contentWindow) return;
	var forbidden = ['about:blank', null, 'a%60owt8bnalk', 'a`owt8bnalk'];
	if (!iframe.contentWindow.location.href) return;
	if (forbidden.some(function(f) { return !f ? false : iframe.contentWindow.location.href.includes(f); })) return;
	var iframeDocument = iframe.contentWindow.document;
	if (!iframeDocument || iframeDocument.readyState === 'loading') return;
	injectErudaScript(iframeDocument).then(function() {
		if (!devToggle) injectErudaShow(iframeDocument);
		else injectErudaHide(iframeDocument);
		devToggle = !devToggle;
	}).catch(function(e) { console.warn('Eruda:', e); });
	iframe.contentWindow.addEventListener('unload', function() {
		devToggle = false; erudaScriptLoaded = false; erudaScriptInjecting = false;
	});
}
