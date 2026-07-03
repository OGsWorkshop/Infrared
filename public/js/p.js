// p.js - Proxy config, SW registration, transport setup

var address1 = document.getElementById('gointoinfrared');
var address2 = document.getElementById('gointoinfrared2');
var urlPattern = new RegExp('^(https?:\\/\\/)?'+'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ '((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+'(\\?[;&a-z\\d%_.~+=-]*)?'+'(\\#[-a-z\\d_]*)?$','i');

var proxySetting = localStorage.getItem('dropdown-selected-text-proxyDropdown') || 'Ultraviolet';

var swConfig = {
	'Ultraviolet': { file:'/@/sw.js', config: typeof __uv$config !== 'undefined' ? __uv$config : null },
	'Scramjet': { file:'/scram/sw.js', config: typeof __scramjet$config !== 'undefined' ? __scramjet$config : null }
};

var swEntry = swConfig[proxySetting] || swConfig['Ultraviolet'];
var swFile = swEntry.file;
var swConfigSettings = swEntry.config;
if (!swConfigSettings) swConfigSettings = { prefix:'/@/infrared/', encodeUrl:function(u){return u}, decodeUrl:function(u){return u} };

var connection = typeof BareMux !== 'undefined' ? new BareMux.BareMuxConnection('/baremux/worker.js') : null;

var defWisp = (location.protocol === 'https:' ? 'wss' : 'ws') + '://' + location.host + '/wisp/';
var wispUrl = localStorage.getItem('wisp') || defWisp;

async function setTransports() {
	if (!connection) return;
	var transports = localStorage.getItem('dropdown-selected-text-transportDropdown') || 'Libcurl';
	try {
		if (transports === 'Libcurl') { await connection.setTransport('/libcurl/index.mjs', [{wisp:wispUrl}]); }
		else if (transports === 'Epoxy') { await connection.setTransport('/epoxy/index.mjs', [{wisp:wispUrl}]); }
		else { await connection.setTransport('/libcurl/index.mjs', [{wisp:wispUrl}]); }
	} catch(e) { console.warn('Transport error:', e); }
}

function search(input) {
	input = input.trim();
	var tpl;
	switch (localStorage.getItem('dropdown-selected-text-searchEngineDropdown')) {
		case 'Bing': tpl = 'https://bing.com/search?q=%s'; break;
		case 'Google': tpl = 'https://google.com/search?q=%s'; break;
		case 'Yahoo!': tpl = 'https://search.yahoo.com/search?p=%s'; break;
		default: tpl = 'https://duckduckgo.com/?q=%s';
	}
	if (urlPattern.test(input)) {
		var url = new URL(input.includes('://') ? input : 'http://' + input);
		return url.toString();
	}
	return tpl.replace('%s', encodeURIComponent(input));
}

async function registerServiceWorker() {
	if (!('serviceWorker' in navigator)) return;
	try {
		await setTransports();
		await navigator.serviceWorker.register(swFile, {scope: swConfigSettings.prefix});
		await navigator.serviceWorker.ready;
	} catch(e) { console.error('SW error:', e); }
}

// registerSW alias for &.js compatibility
async function registerSW() { return registerServiceWorker(); }

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', registerServiceWorker); }
else { registerServiceWorker(); }
