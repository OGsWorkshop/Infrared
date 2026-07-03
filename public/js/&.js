// &.js - Browser page functionality

var encodedUrl = '';
var isSearching = false;

function encodeForProxy(url) {
	if (!swConfigSettings) return url;
	if (typeof swConfigSettings.encodeUrl === 'function') {
		return swConfigSettings.encodeUrl(url);
	}
	if (swConfigSettings.codec && typeof swConfigSettings.codec.encode === 'function') {
		return swConfigSettings.codec.encode(url);
	}
	return url;
}

function decodeFromProxy(url) {
	if (!swConfigSettings) return url;
	if (typeof swConfigSettings.decodeUrl === 'function') {
		return swConfigSettings.decodeUrl(url);
	}
	if (swConfigSettings.codec && typeof swConfigSettings.codec.decode === 'function') {
		return swConfigSettings.codec.decode(url);
	}
	return url;
}

async function executeSearch(query) {
	if (isSearching) return;
	isSearching = true;
	encodedUrl = swConfigSettings.prefix + encodeForProxy(search(query));
	localStorage.setItem('input', query);
	localStorage.setItem('output', encodedUrl);
	var spinner = document.getElementById('spinnerWrapper');
	if (spinner) spinner.style.display = 'block';
	var home = document.getElementById('browserHome');
	if (home) home.style.display = 'none';
	var iframe = document.getElementById('intoinfrared');
	try {
		await registerSW();
		iframe.src = encodedUrl;
		iframe.style.display = 'block';
	} catch(e) {
		console.error('executeSearch failed:', e);
	}
	if (spinner) spinner.style.display = 'none';
	document.querySelectorAll('input').forEach(function(i) { i.blur(); });
	var onLoad = function() {
		try {
			var doc = iframe.contentDocument || iframe.contentWindow.document;
			if (doc) {
				var errors = doc.querySelectorAll('ul li');
				if (errors && Array.from(errors).some(function(li) { return li.textContent.trim() === 'Checking your internet connection'; })) {
					iframe.src = '/500?error=connection';
				}
			}
		} catch(e) {}
		startURLMonitoring();
	};
	iframe.removeEventListener('load', onLoad);
	iframe.addEventListener('load', onLoad);
	isSearching = false;
}

var historyArray = JSON.parse(localStorage.getItem('historyArray')) || [];
var currentIndex = parseInt(localStorage.getItem('currentIndex')) || -1;
if (historyArray.length > 0) { currentIndex = historyArray.length; saveHistory(); }

function saveHistory() { localStorage.setItem('historyArray', JSON.stringify(historyArray)); localStorage.setItem('currentIndex', currentIndex.toString()); }

function startURLMonitoring() {
	var iframe = document.getElementById('intoinfrared');
	var lastUrl = '';
	try { lastUrl = iframe.contentWindow.location.href; } catch(e) { return; }
	setInterval(function() {
		try {
			var currentUrl = iframe.contentWindow.location.href;
			if (currentUrl !== lastUrl) {
				lastUrl = currentUrl;
				if (historyArray[currentIndex] !== currentUrl) { historyArray = historyArray.slice(0,currentIndex+1); historyArray.push(currentUrl); currentIndex++; saveHistory(); }
				updateAddressBar(currentUrl);
				updateNavButtons();
			}
		} catch(e) {}
	}, 250);
}

function updateAddressBar(url) {
	var addr = document.getElementById('gointoinfrared2');
	if (!addr) return;
	var cleaned = decodeFromProxy(url.split(swConfigSettings.prefix).pop());
	if (cleaned === 'a`owt8bnalk') { addr.value = 'Loading...'; }
	else { addr.value = cleaned.replace(/^https?:\/\//,''); }
}

function updateNavButtons() {
	var backBtn = document.getElementById('backBtn');
	var fwdBtn = document.getElementById('fwdBtn');
	if (backBtn) { backBtn.disabled = currentIndex <= 0; backBtn.style.opacity = currentIndex > 0 ? '1' : '0.35'; }
	if (fwdBtn) { fwdBtn.disabled = currentIndex >= historyArray.length-1; fwdBtn.style.opacity = currentIndex < historyArray.length-1 ? '1' : '0.35'; }
}

if (address2) {
	address2.addEventListener('click', function() {
		var v = this.value;
		if (!v.startsWith('http://') && !v.startsWith('https://') && v.indexOf('.')>-1 && v !== 'Loading...') this.value = 'https://'+v;
		this.select();
	});
	address2.addEventListener('keydown', function(e) { if (e.key==='Enter') { e.preventDefault(); executeSearch(this.value); } });
}

if (address1) {
	address1.addEventListener('keydown', function(e) { if (e.key==='Enter') { e.preventDefault(); executeSearch(this.value); } });
}

var backBtn = document.getElementById('backBtn');
var fwdBtn = document.getElementById('fwdBtn');
var refreshBtn = document.getElementById('refreshBtn');
var homeBtn = document.getElementById('homeBtn');
var fullscreenBtn = document.getElementById('fullscreenBtn');
var iframe = document.getElementById('intoinfrared');

if (backBtn) backBtn.addEventListener('click', function() {
	if (currentIndex > 0) { currentIndex--; iframe.src = historyArray[currentIndex]; iframe.style.display='block'; updateNavButtons(); saveHistory(); }
});
if (fwdBtn) fwdBtn.addEventListener('click', function() {
	if (currentIndex < historyArray.length-1) { currentIndex++; iframe.src = historyArray[currentIndex]; iframe.style.display='block'; updateNavButtons(); saveHistory(); }
});
if (refreshBtn) refreshBtn.addEventListener('click', function() { try { iframe.contentWindow.location.reload(); } catch(e) { iframe.src = iframe.src; } });
if (homeBtn) homeBtn.addEventListener('click', function() { iframe.style.display='none'; iframe.src='about:blank'; document.getElementById('browserHome').style.display=''; });
if (fullscreenBtn) fullscreenBtn.addEventListener('click', function() {
	if (document.fullscreenElement) document.exitFullscreen();
	else { var el = iframe.src && iframe.src !== 'about:blank' ? iframe : document.documentElement; (el.requestFullscreen||el.webkitRequestFullscreen||el.msRequestFullscreen).call(el); }
});

document.addEventListener('fullscreenchange', function() {
	if (fullscreenBtn) fullscreenBtn.querySelector('.material-symbols-outlined').textContent = document.fullscreenElement ? 'fullscreen_exit' : 'fullscreen';
});

document.addEventListener('DOMContentLoaded', function() {
	var q = new URLSearchParams(window.location.search).get('q');
	if (q && !isSearching) {
		Promise.all([
			fetch('/json/g.json').then(function(r){return r.json()}).catch(function(){return[]}),
			fetch('/json/a.json').then(function(r){return r.json()}).catch(function(){return[]}),
			fetch('/json/s.json').then(function(r){return r.json()}).catch(function(){return[]})
		]).then(function(r) {
			var all = [].concat(r[0],r[1],r[2]);
			var item = all.find(function(d) { return d.name && d.name.toLowerCase() === q.toLowerCase(); });
			document.getElementById('browserHome').style.display = 'none';
			if (item) executeSearch(item.url || item.name);
			else executeSearch(q);
		});
	} else {
		if (localStorage.getItem('utilBarHidden') === 'true') document.querySelector('.utilityBar').style.display='none';
	}
	updateNavButtons();
});

var devToggle = false, eloaded = false, einjecting = false;
function injectEruda(doc) { return new Promise(function(res,rej) { if(eloaded||einjecting){res();return} einjecting=true; var s=doc.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/eruda'; s.onload=function(){eloaded=true;einjecting=false;res()}; s.onerror=function(){einjecting=false;rej(new Error('eruda failed'))}; try{doc.body.appendChild(s)}catch(e){einjecting=false;rej(e)} }); }
function erudaShow(doc) { var s=doc.createElement('script'); s.textContent='eruda.init({defaults:{displaySize:50,transparency:0.9,theme:"Material Palenight"}});eruda.show();document.currentScript.remove();'; try{doc.body.appendChild(s)}catch(e){} }
function erudaHide(doc) { var s=doc.createElement('script'); s.textContent='eruda.hide();document.currentScript.remove();'; try{doc.body.appendChild(s)}catch(e){} }
function inspectelement() {
	var f = document.getElementById('intoinfrared');
	if (!f||!f.contentWindow||!f.contentWindow.location.href) return;
	if (['about:blank','a%60owt8bnalk','a`owt8bnalk'].some(function(b){return f.contentWindow.location.href.includes(b)})) return;
	var d = f.contentWindow.document;
	if (!d||d.readyState==='loading') return;
	injectEruda(d).then(function() { if(!devToggle) erudaShow(d); else erudaHide(d); devToggle=!devToggle; }).catch(function(e){console.warn('Eruda:',e)});
	f.contentWindow.addEventListener('unload',function(){devToggle=false;eloaded=false;einjecting=false});
}
