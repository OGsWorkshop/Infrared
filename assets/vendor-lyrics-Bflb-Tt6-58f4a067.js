function e(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var t=globalThis,n=t.ShadowRoot&&(t.ShadyCSS===void 0||t.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap,a=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(n&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=i.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&i.set(t,e))}return e}toString(){return this.cssText}},o=e=>new a(typeof e==`string`?e:e+``,void 0,r),s=(e,...t)=>new a(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,r),c=(e,r)=>{if(n)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of r){let r=document.createElement(`style`),i=t.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=n.cssText,e.appendChild(r)}},l=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return o(t)})(e):e,{is:u,defineProperty:d,getOwnPropertyDescriptor:f,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:h}=Object,g=globalThis,_=g.trustedTypes,v=_?_.emptyScript:``,y=g.reactiveElementPolyfillSupport,b=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},S=(e,t)=>!u(e,t),C={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:S};Symbol.metadata??=Symbol(`metadata`),g.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=C){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=f(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??C}static _$Ei(){if(this.hasOwnProperty(b(`elementProperties`)))return;let e=h(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b(`properties`))){let e=this.properties,t=[...p(e),...m(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(l(e))}else e!==void 0&&t.push(l(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return c(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?x:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?x:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??S)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:`open`},w[b(`elementProperties`)]=new Map,w[b(`finalized`)]=new Map,y?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push(`2.1.2`);var T=globalThis,E=e=>e,D=T.trustedTypes,O=D?D.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,k=`$lit$`,A=`lit$${Math.random().toFixed(9).slice(2)}$`,ee=`?`+A,te=`<${ee}>`,j=document,M=()=>j.createComment(``),N=e=>e===null||typeof e!=`object`&&typeof e!=`function`,ne=Array.isArray,re=e=>ne(e)||typeof e?.[Symbol.iterator]==`function`,P=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ie=/-->/g,ae=/>/g,I=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),oe=/'/g,se=/"/g,ce=/^(?:script|style|textarea|title)$/i,le=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),L=le(1),ue=le(2),R=Symbol.for(`lit-noChange`),z=Symbol.for(`lit-nothing`),de=new WeakMap,B=j.createTreeWalker(j,129);function fe(e,t){if(!ne(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return O===void 0?t:O.createHTML(t)}var pe=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=F;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===F?c[1]===`!--`?o=ie:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=I):(ce.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=I):o=ae:o===I?c[0]===`>`?(o=i??F,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?I:c[3]===`"`?se:oe):o===se||o===oe?o=I:o===ie||o===ae?o=F:(o=I,i=void 0);let d=o===I&&e[t+1].startsWith(`/>`)?` `:``;a+=o===F?n+te:l>=0?(r.push(s),n.slice(0,l)+k+n.slice(l)+A+d):n+A+(l===-2?t:d)}return[fe(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},V=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=pe(t,n);if(this.el=e.createElement(l,r),B.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=B.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(k)){let t=u[o++],n=i.getAttribute(e).split(A),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?he:r[1]===`?`?ge:r[1]===`@`?_e:W}),i.removeAttribute(e)}else e.startsWith(A)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(ce.test(i.tagName)){let e=i.textContent.split(A),t=e.length-1;if(t>0){i.textContent=D?D.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],M()),B.nextNode(),c.push({type:2,index:++a});i.append(e[t],M())}}}else if(i.nodeType===8)if(i.data===ee)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(A,e+1))!==-1;)c.push({type:7,index:a}),e+=A.length-1}a++}}static createElement(e,t){let n=j.createElement(`template`);return n.innerHTML=e,n}};function H(e,t,n=e,r){if(t===R)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=N(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=H(e,i._$AS(e,t.values),i,r)),t}var me=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??j).importNode(t,!0);B.currentNode=r;let i=B.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new U(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ve(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=B.nextNode(),a++)}return B.currentNode=j,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},U=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=H(this,e,t),N(e)?e===z||e==null||e===``?(this._$AH!==z&&this._$AR(),this._$AH=z):e!==this._$AH&&e!==R&&this._(e):e._$litType$===void 0?e.nodeType===void 0?re(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==z&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(j.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=V.createElement(fe(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new me(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=de.get(e.strings);return t===void 0&&de.set(e.strings,t=new V(e)),t}k(t){ne(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(M()),this.O(M()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=E(e).nextSibling;E(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},W=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=z}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=H(this,e,t,0),a=!N(e)||e!==this._$AH&&e!==R,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=H(this,r[n+o],t,o),s===R&&(s=this._$AH[o]),a||=!N(s)||s!==this._$AH[o],s===z?e=z:e!==z&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},he=class extends W{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===z?void 0:e}},ge=class extends W{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==z)}},_e=class extends W{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=H(this,e,t,0)??z)===R)return;let n=this._$AH,r=e===z&&n!==z||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==z&&(n===z||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ve=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){H(this,e)}},ye=T.litHtmlPolyfillSupport;ye?.(V,U),(T.litHtmlVersions??=[]).push(`3.3.2`);var be=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new U(t.insertBefore(M(),e),e,void 0,n??{})}return i._$AI(e),i},xe=globalThis,G=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=be(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};G._$litElement$=!0,G.finalized=!0,xe.litElementHydrateSupport?.({LitElement:G});var Se=xe.litElementPolyfillSupport;Se?.({LitElement:G}),(xe.litElementVersions??=[]).push(`4.2.2`);var Ce={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:S},we=(e=Ce,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function K(e){return(t,n)=>typeof n==`object`?we(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function q(e){return K({...e,state:!0,attribute:!1})}var Te=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function Ee(e,t){return(t,n,r)=>{let i=t=>t.renderRoot?.querySelector(e)??null;return Te(t,n,{get(){return i(this)}})}}var J={GOOGLE:{MAX_RETRIES:3,RETRY_DELAY_MS:1e3,FETCH_TIMEOUT_MS:6e3}},De=class e{static delay(e){return new Promise(t=>{setTimeout(t,e)})}static fetchWithTimeout(e,t=J.GOOGLE.FETCH_TIMEOUT_MS){let n=new AbortController,r=setTimeout(()=>n.abort(),t);return fetch(e,{signal:n.signal}).finally(()=>clearTimeout(r))}static isPurelyLatinScript(e){return/^[\u0000-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F]*$/.test(e)}static async translate(t,n){if(!t||Array.isArray(t)&&t.length===0)return Array.isArray(t)?[]:``;let r=Array.isArray(t),i=r?t:[t],a=[],o=[];if(i.forEach((e,t)=>{e&&e.trim()&&(a.push(t),o.push(e))}),o.length===0)return r?i:i[0];let s=Array(o.length).fill(``),c=[],l=[],u=0,d=async(t,r)=>{if(t.length===0)return;let i=t.join(`
`),a=0,o=!1;for(;a<J.GOOGLE.MAX_RETRIES&&!o;)try{let a=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${n}&dt=t&q=${encodeURIComponent(i)}`,c=await e.fetchWithTimeout(a);if(!c.ok)throw Error(`Status ${c.status}`);let l=((await c.json())?.[0]?.map(e=>e?.[0]).join(``)||``).split(`
`);r.forEach((e,n)=>{n<l.length?s[e]=l[n]:s[e]=t[n]}),o=!0}catch{a+=1,a<J.GOOGLE.MAX_RETRIES?await e.delay(J.GOOGLE.RETRY_DELAY_MS*2**(a-1)):r.forEach((e,n)=>{s[e]=t[n]})}};for(let e=0;e<o.length;e+=1){let t=o[e];u+t.length>1500&&(await d(c,l),c=[],l=[],u=0),c.push(t),l.push(e),u+=t.length}c.length>0&&await d(c,l);let f=[...i];return a.forEach((e,t)=>{f[e]=s[t]}),r?f:f[0]}static async romanize(e){let t=Array.isArray(e)?e:e.data||e.content||[];return!t||t.length===0?Array.isArray(e)?e:[]:t.some(e=>e.isWordSynced!==!1&&Array.isArray(e.text)&&e.text.length>1)?this.romanizeWordSynced(t):this.romanizeLineSynced(t)}static async romanizeWordSynced(e){return Promise.all(e.map(async e=>{if(!e.text||!Array.isArray(e.text)||e.text.length===0||e.romanizedText)return e;let t=e.text.map(e=>e.text).join(``),[n]=await this.romanizeTexts([t]),r=e.text.map(e=>({...e,romanizedText:e.romanizedText}));return{...e,text:r,romanizedText:n||``}}))}static async romanizeLineSynced(e){let t=e.map(e=>e.romanizedText?``:Array.isArray(e.text)&&e.text.length>0?e.text.map(e=>e.text).join(``):``),n=await this.romanizeTexts(t);return e.map((e,t)=>({...e,romanizedText:n[t]||``}))}static async romanizeTexts(t){let n=t.join(` `);if(e.isPurelyLatinScript(n))return t;let r=[];for(let n of t)if(!n||e.isPurelyLatinScript(n))r.push(n);else{let t=0,i=!1;for(;t<J.GOOGLE.MAX_RETRIES&&!i;)try{let t=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=rm&q=${encodeURIComponent(n)}`,a=(await(await e.fetchWithTimeout(t)).json())?.[0]?.[0]?.[3]||n;r.push(a),i=!0}catch{t+=1,t<J.GOOGLE.MAX_RETRIES&&await e.delay(J.GOOGLE.RETRY_DELAY_MS*2**(t-1))}i||r.push(n)}return r}},Oe=`1.5.4`,Y=7e3,ke=8e3,Ae=500,je=350,Me=4e3,X=Me*2,Z=600,Ne=.85;function Q(e,t={},n=ke){let r=new AbortController,i=setTimeout(()=>r.abort(),n);return fetch(e,{...t,signal:r.signal}).finally(()=>clearTimeout(i))}var Pe=[`https://lyricsplus.binimum.org`,`https://lyricsplus-seven.vercel.app`,`https://lyricsplus.prjktla.workers.dev`,`https://lyrics-plus-backend.vercel.app`],Fe=`apple,lyricsplus,musixmatch,spotify,qq,deezer,musixmatch-word`,Ie=`https://fetch-genius.samidy.workers.dev/`,$=class e extends G{constructor(){super(...arguments),this.downloadFormat=`auto`,this.highlightColor=`#ffffff`,this.autoScroll=!0,this.interpolate=!0,this.showRomanization=!1,this.showTranslation=!1,this._currentTime=0,this.isLoading=!1,this.activeLineIndices=[],this.activeMainWordIndices=new Map,this.activeBackgroundWordIndices=new Map,this.mainWordProgress=new Map,this.backgroundWordProgress=new Map,this.lyricsSource=null,this.availableSources=[],this.currentSourceIndex=0,this.isFetchingAlternatives=!1,this.hasFetchedAllProviders=!1,this.mainWordAnimations=new Map,this.backgroundWordAnimations=new Map,this.lastInstrumentalIndex=null,this.isUserScrolling=!1,this.isProgrammaticScroll=!1,this.isClickSeeking=!1,this.cachedLyricsLines=[],this.cachedLineArray=[],this.lineElementCache=new Map,this.gapElementCache=new Map,this.cachedAllGaps=[],this.cachedIsUnsynced=!1,this.cachedLineData=null,this.activeLineIds=new Set,this.currentPrimaryActiveLine=null,this.lastPrimaryActiveLine=null,this.scrollAnimationState=null,this.currentScrollOffset=0,this.animatingLines=[],this.lastActiveIndex=0,this.visibleLineIds=new Set,this.cachedScrollPaddingTop=null,this.preActiveLineElements=[],this.positionedLineElements=[],this.activeGapLineElements=[],this._boundHandleUserScroll=this.handleUserScroll.bind(this),this._boundAnimateProgress=this.animateProgress.bind(this)}async toggleRomanization(){this.showRomanization=!this.showRomanization,await this.applyRomanization()}async applyRomanization(){if(this.showRomanization&&this.lyrics&&this.lyrics.some(e=>!e.romanizedText&&(!e.text||!e.text.some(e=>e.romanizedText)))){this.isLoading=!0;try{this.lyrics=await De.romanize(this.lyrics)}catch{}finally{this.isLoading=!1}}}async toggleTranslation(){this.showTranslation=!this.showTranslation,await this.applyTranslation()}async applyTranslation(){if(this.showTranslation&&this.lyrics&&this.lyrics.some(e=>!e.translation)){this.isLoading=!0;try{let e=this.lyrics.map(e=>e.translation?``:e.text.map(e=>e.text).join(``));if(e.every(e=>!e)){this.isLoading=!1;return}let t=await De.translate(e,`en`),n=Array.isArray(t)?t:[t];this.lyrics=this.lyrics.map((e,t)=>e.translation?e:{...e,translation:n[t]||void 0})}catch{}finally{this.isLoading=!1}}}set currentTime(t){let n=this._currentTime;t<n&&n-t>1e3&&this.lyrics&&(this.activeLineIndices=[],this.activeMainWordIndices.clear(),this.activeBackgroundWordIndices.clear(),this.mainWordProgress.clear(),this.backgroundWordProgress.clear(),this.mainWordAnimations.clear(),this.backgroundWordAnimations.clear(),this.preActiveLineElements=[],this.positionedLineElements=[],this.activeGapLineElements=[],this.lyricsContainer&&(this.lyricsContainer.querySelectorAll(`.lyrics-line.active, .lyrics-line.pre-active, .lyrics-line.bg-expanded`).forEach(t=>{t.classList.remove(`active`,`pre-active`,`bg-expanded`),e.resetSyllables(t)}),this.lyricsContainer.querySelectorAll(`.lyrics-gap.active, .lyrics-gap.gap-exiting`).forEach(e=>e.classList.remove(`active`,`gap-exiting`)),this.gapElementCache.clear())),this._currentTime=t,n!==t&&this.lyrics&&this._onTimeChanged(n,t)}get currentTime(){return this._currentTime}_updateFooter(){let e=this.shadowRoot?.querySelector(`.lyrics-footer`);if(!e)return;let t=e.querySelector(`.source-switch-btn`),n=e.querySelector(`.source-switch-svg`),r=e.querySelector(`.source-switch-label`);t&&(t.disabled=this.isFetchingAlternatives),n&&n.setAttribute(`style`,`margin-right: 4px; ${this.isFetchingAlternatives?`animation: spin 1s linear infinite;`:``}`),r&&(r.textContent=this.isFetchingAlternatives?`Switching...`:`Switch`)}connectedCallback(){super.connectedCallback(),this.fetchLyrics()}disconnectedCallback(){super.disconnectedCallback(),this.animationFrameId&&=(cancelAnimationFrame(this.animationFrameId),void 0),this.userScrollTimeoutId&&=(clearTimeout(this.userScrollTimeoutId),void 0),this.clickSeekTimeout&&=(clearTimeout(this.clickSeekTimeout),void 0),this.scrollAnimationTimeout&&=(clearTimeout(this.scrollAnimationTimeout),void 0),this.scrollUnlockTimeout&&=(clearTimeout(this.scrollUnlockTimeout),void 0),this.fetchAbortController?.abort(),this.fetchAbortController=void 0,this.lyricsContainer&&(this.lyricsContainer.removeEventListener(`wheel`,this._boundHandleUserScroll),this.lyricsContainer.removeEventListener(`touchmove`,this._boundHandleUserScroll)),this.preActiveLineElements=[],this.positionedLineElements=[],this.activeGapLineElements=[],this.visibilityObserver?.disconnect(),this.visibilityObserver=void 0}async fetchLyrics(){this.fetchAbortController?.abort();let t=new AbortController;this.fetchAbortController=t,this.isLoading=!0,this.lyrics=void 0,this.lyricsSource=null,this.availableSources=[],this.currentSourceIndex=0,this.isFetchingAlternatives=!1,this.hasFetchedAllProviders=!1,this._updateFooter();try{if(this.ttml){let t=e.parseTTML(this.ttml);if(t&&t.lines.length>0){this.lyrics=t.lines,this.lyricsSource=`Local`,t.songwriters&&(this.songwriters=t.songwriters),this.availableSources=[{lines:this.lyrics,source:`Local`,songwriters:this.songwriters}],this.currentSourceIndex=0,this.hasFetchedAllProviders=!0,this._updateFooter(),await this.onLyricsLoaded();return}}let n=await this.resolveSongMetadata();if(t.signal.aborted)return;let r=!!this.musicId&&!this.songTitle&&!this.songArtist&&!this.query&&!this.isrc,i=[];if(n?.metadata&&!r){let t=n.metadata.title?.trim()||``,r=n.metadata.artist?.trim()||``,a=await e.fetchLyricsFromBiniLyrics(t,r,n.catalogIsrc,n.metadata);a&&a.lines.length>0&&i.push(a);let o=e=>e.some(e=>e.lines.some(e=>e.isWordSynced||e.text&&e.text.length>1));if(i.length===0||!o(i)){let t=await e.fetchLyricsFromUnison(n.metadata);t&&t.lines.length>0&&i.push(t)}if(i.length===0||!o(i)){let a=await e.fetchLyricsFromYouLyPlus(t,r,n.catalogIsrc,n.metadata,!0);a&&a.length>0&&i.push(...a)}}if((i.length===0||!(e=>e.some(e=>e.lines.some(e=>e.timestamp>0||e.endtime>0)))(i))&&n?.metadata){let t=await e.fetchLyricsFromLrclib(n.metadata);t&&t.lines.length>0&&i.push({lines:t.lines,source:`LRCLIB`})}if(i.length===0&&n?.metadata){let t=await e.fetchLyricsFromGenius(n.metadata);t&&t.lines.length>0&&i.push({lines:t.lines,source:`Genius`})}if(this.hasFetchedAllProviders=i.length===0||i.some(e=>e.source===`LRCLIB`||e.source===`Genius`),this._updateFooter(),i.length>0){this.availableSources=e.mergeAndSortSources(i),this.currentSourceIndex=0;let t=this.availableSources[0];this.lyrics=t.lines,this.lyricsSource=t.source,t.songwriters&&(this.songwriters=t.songwriters),await this.onLyricsLoaded();return}this.lyrics=void 0,this.lyricsSource=null}finally{t.signal.aborted||(this.isLoading=!1)}}async onLyricsLoaded(){this.activeLineIndices=[],this.activeMainWordIndices.clear(),this.activeBackgroundWordIndices.clear(),this.mainWordProgress.clear(),this.backgroundWordProgress.clear(),this.mainWordAnimations.clear(),this.backgroundWordAnimations.clear(),this.preActiveLineElements=[],this.positionedLineElements=[],this.activeGapLineElements=[],this.lyricsContainer&&(this.isProgrammaticScroll=!0,this.lyricsContainer.scrollTop=0,window.setTimeout(()=>{this.isProgrammaticScroll=!1},100)),await this.autoProcessLyrics()}async autoProcessLyrics(){this.showRomanization&&await this.applyRomanization(),this.showTranslation&&await this.applyTranslation()}static getRankForCollected(e,t){let n=e.toLowerCase(),r=t.some(e=>e.text&&Array.isArray(e.text)&&e.text.length>1),i=t.length>0&&t.every(e=>e.timestamp===0&&e.endtime===0),a=n.includes(`qq`)||n.includes(`lyricsplus`);return n.includes(`apple`)&&r?1:n.includes(`bini`)&&r?2:n.includes(`unison`)&&r?3:a&&r?4:n.includes(`musixmatch`)&&r?5:n.includes(`lrclib`)&&r?6:r?7:n.includes(`apple`)&&!r&&!i?8:n.includes(`bini`)&&!r&&!i?9:n.includes(`unison`)&&!r&&!i?10:a&&!r&&!i?11:n.includes(`musixmatch`)&&!r&&!i?12:n.includes(`lrclib`)&&!r&&!i?13:!r&&!i?14:n.includes(`apple`)&&i?15:n.includes(`bini`)&&i?16:n.includes(`unison`)&&i?17:a&&i?18:n.includes(`musixmatch`)&&i?19:n.includes(`lrclib`)&&i?20:n.includes(`genius`)?21:30}static mergeAndSortSources(t){let n=new Map;for(let e of t){let t=e.source.toLowerCase().includes(`lyricsplus`)?`QQ`:e.source;n.has(t)||n.set(t,{...e,source:t})}return Array.from(n.values()).sort((t,n)=>e.getRankForCollected(t.source,t.lines)-e.getRankForCollected(n.source,n.lines))}async switchSource(){if(!this.isFetchingAlternatives){if(!this.hasFetchedAllProviders){this.isFetchingAlternatives=!0,this._updateFooter();try{let t=await this.resolveSongMetadata();if(t?.metadata){let n=[];if(!this.availableSources.some(e=>e.source.toLowerCase().includes(`unison`))){let r=await e.fetchLyricsFromUnison(t.metadata);r&&r.lines.length>0&&n.push(r)}if(!this.availableSources.some(e=>e.source.toLowerCase().includes(`apple`)||e.source.toLowerCase().includes(`qq`))){let r=t.metadata.title?.trim()||``,i=t.metadata.artist?.trim()||``,a=await e.fetchLyricsFromYouLyPlus(r,i,t.catalogIsrc,t.metadata,!0);a&&a.length>0&&n.push(...a)}if(!this.availableSources.some(e=>e.source.toLowerCase().includes(`lrclib`))){let r=await e.fetchLyricsFromLrclib(t.metadata);r&&r.lines.length>0&&n.push({lines:r.lines,source:`LRCLIB`})}if(!this.availableSources.some(e=>e.source.toLowerCase().includes(`genius`))){let r=await e.fetchLyricsFromGenius(t.metadata);r&&r.lines.length>0&&n.push({lines:r.lines,source:`Genius`})}n.length>0&&(this.availableSources=e.mergeAndSortSources([...this.availableSources,...n]),this.currentSourceIndex=this.availableSources.findIndex(e=>e.source===this.lyricsSource),this.currentSourceIndex===-1&&(this.currentSourceIndex=0))}}finally{this.hasFetchedAllProviders=!0,this.isFetchingAlternatives=!1,this._updateFooter()}}if(this.availableSources.length>1){this.currentSourceIndex=(this.currentSourceIndex+1)%this.availableSources.length;let e=this.availableSources[this.currentSourceIndex];this.lyrics=e.lines,this.lyricsSource=e.source,e.songwriters&&(this.songwriters=e.songwriters),await this.onLyricsLoaded()}}}async resolveSongMetadata(){let t={title:this.songTitle?.trim()??``,artist:this.songArtist?.trim()??``,album:this.songAlbum?.trim()||void 0,songwriters:this.songwriters?.trim()||void 0,durationMs:void 0};typeof this.songDurationMs==`number`&&this.songDurationMs>0?t.durationMs=this.songDurationMs:typeof this.duration==`number`&&this.duration>0&&(t.durationMs=this.duration);let n=this.musicId,r=this.isrc;if(this.query&&(!t.title||!t.artist||!t.album)){let n=e.parseQueryMetadata(this.query);n&&(!t.title&&n.title&&(t.title=n.title),!t.artist&&n.artist&&(t.artist=n.artist),!t.album&&n.album&&(t.album=n.album))}let i=null;this.query&&(!t.title||!t.artist)&&(i=await e.searchLyricsPlusCatalog(this.query),i&&(!t.title&&i.title&&(t.title=i.title),!t.artist&&i.artist&&(t.artist=i.artist),!t.album&&i.album&&(t.album=i.album),!t.songwriters&&i.songwriters&&(t.songwriters=i.songwriters),t.durationMs==null&&typeof i.durationMs==`number`&&i.durationMs>0&&(t.durationMs=i.durationMs),!n&&i.id?.appleMusic&&(n=i.id.appleMusic),!r&&i.isrc&&(r=i.isrc)));let a=t.title?.trim()??``,o=t.artist?.trim()??``,s=t.album?.trim(),c=typeof t.durationMs==`number`&&Number.isFinite(t.durationMs)&&t.durationMs>0?Math.round(t.durationMs):void 0;return{metadata:a&&o?{title:a,artist:o,album:s||void 0,durationMs:c}:void 0,appleId:n,appleSong:null,catalogIsrc:r}}static parseQueryMetadata(e){let t=e?.trim();if(!t)return null;let n={},r=t.split(/\s[-–—]\s/);if(r.length>=2){let[e,...t]=r,i=t.join(` - `),a=e.trim(),o=i.trim();if(a&&o)return n.title=a,n.artist=o,n}let i=t.split(/\s+[bB]y\s+/);if(i.length===2){let[e,t]=i.map(e=>e.trim());if(e&&t)return n.title=e,n.artist=t,n}return null}static async searchLyricsPlusCatalog(e){let t=e?.trim();if(!t)return null;for(let e of Pe){let n=`${e.endsWith(`/`)?e.slice(0,-1):e}/v1/songlist/search?q=${encodeURIComponent(t)}`;try{let e=await Q(n);if(e.ok){let t=await e.json(),n=[],r=t;if(Array.isArray(r?.results)?n=r.results:Array.isArray(t)&&(n=t),n.length>0)return n.find(e=>e?.id&&e.id.appleMusic)??n[0]}}catch{}}return null}static async fetchLyricsFromBiniLyrics(t,n,r,i={}){if((!t||!n)&&!r)return null;try{let a=null;if(r)try{let e=await Q(`https://lyrics-api.binimum.org/?isrc=${encodeURIComponent(r)}`);if(e.ok){let t=await e.json();t.results&&t.results.length>0&&(a=t)}}catch{}if(!a&&t&&n){let e=new URLSearchParams({track:t,artist:n});i.album&&e.append(`album`,i.album),i.durationMs&&i.durationMs>0&&e.append(`duration`,Math.round(i.durationMs/1e3).toString());let r=await Q(`https://lyrics-api.binimum.org/?${e.toString()}`);r.ok&&(a=await r.json())}if(a&&a.results&&a.results.length>0){let t=a.results[0];if(t.lyricsUrl){let n=await Q(t.lyricsUrl);if(n.ok){let t=await n.text(),r=e.parseTTML(t);if(r&&r.lines.length>0)return{lines:r.lines,source:`BiniLyrics`,songwriters:r.songwriters}}}}}catch{}return null}static async fetchLyricsFromYouLyPlus(t,n,r,i={},a=!1){if((!t||!n)&&!r)return[];let o=new URLSearchParams;t&&o.append(`title`,t),n&&o.append(`artist`,n),r&&o.append(`isrc`,r),i.album&&o.append(`album`,i.album),i.durationMs&&i.durationMs>0&&o.append(`duration`,Math.round(i.durationMs/1e3).toString()),Fe.includes(`apple`)||o.append(`source`,Fe);let s=(e,t)=>{let n=e.toLowerCase(),r=t.some(e=>e.text&&Array.isArray(e.text)&&e.text.length>1),i=t.length>0&&t.every(e=>e.timestamp===0&&e.endtime===0),a=n.includes(`qq`)||n.includes(`lyricsplus`);return n.includes(`apple`)&&r?1:n.includes(`bini`)&&r?2:n.includes(`unison`)&&r?3:a&&r?4:n.includes(`musixmatch`)&&r?5:r?6:n.includes(`apple`)&&!r&&!i?7:n.includes(`bini`)&&!r&&!i?8:n.includes(`unison`)&&!r&&!i?9:a&&!r&&!i?10:n.includes(`musixmatch`)&&!r&&!i?11:!r&&!i?12:n.includes(`apple`)&&i?13:n.includes(`bini`)&&i?14:n.includes(`unison`)&&i?15:a&&i?16:n.includes(`musixmatch`)&&i?17:30},c=[];if(!a){let a=await e.fetchLyricsFromBiniLyrics(t,n,r,i);if(a)return c.push(a),c}let l=[...Pe].sort(()=>Math.random()-.5).slice(0,3);for(let t of l){let n=`${t.endsWith(`/`)?t.slice(0,-1):t}/v2/lyrics/get?${o.toString()}`,r=null;try{let e=await Q(n);e.ok&&(r=await e.json())}catch{r=null}if(r){let t=e.convertKPoeLyrics(r);if(t&&t.length>0){let e=r?.metadata?.source||r?.metadata?.provider||`LyricsPlus (KPoe)`,n=s(e,t),i={lines:t,source:e};if(c.push(i),n===1)break}}}if(!c.some(e=>s(e.source,e.lines)<=2))try{let t=await Q(`https://lyricsplus.binimum.org/v2/lyrics/get?${new URLSearchParams(o).toString()}`);if(t.ok){let n=await t.json();if(n){let t=e.convertKPoeLyrics(n),r=n?.metadata?.source||n?.metadata?.provider||`LyricsPlus (KPoe)`,i=t?.some(e=>e.text&&Array.isArray(e.text)&&e.text.length>1);t&&t.length>0&&i&&c.push({lines:t,source:r})}}}catch{}return c}static parseLrcSubtitles(e){if(!e||typeof e!=`string`)return[];let t=[],n=e.split(`
`),r=[];for(let e of n){let t=e.match(/^\[(\d{1,3}):(\d{2})\.(\d{2,3})\]\s?(.*)$/);if(!t)continue;let n=parseInt(t[1],10),i=parseInt(t[2],10),a=parseInt(t[3],10);t[3].length===3&&(a=Math.round(a/10));let o=(n*60+i)*1e3+a*10,s=t[4]||``;r.push({timestamp:o,text:s})}for(let e=0;e<r.length;e+=1){let{timestamp:n,text:i}=r[e],a=e+1<r.length?r[e+1].timestamp:n+5e3;if(!i.trim())continue;let o={text:i,part:!1,timestamp:n,endtime:a,lineSynced:!0};t.push({text:[o],background:!1,backgroundText:[],oppositeTurn:!1,timestamp:n,endtime:a,isWordSynced:!1})}return t}static async fetchLyricsFromLrclib(t){let n=t.title?.trim(),r=t.artist?.trim();if(!n||!r)return null;try{let t=`${r} ${n}`,i=await Q(`https://lrclib.net/api/search?${new URLSearchParams({q:t}).toString()}`,{headers:{"User-Agent":`apple-music-web-components/${Oe}`}});if(!i.ok)return null;let a=await i.json();if(!Array.isArray(a)||a.length===0)return null;let o=a.find(e=>e.syncedLyrics&&typeof e.syncedLyrics==`string`)||a[0];if(o.syncedLyrics){let t=e.parseLrcSubtitles(o.syncedLyrics);if(t.length>0)return{lines:t,source:`LRCLIB`}}if(o.plainLyrics&&typeof o.plainLyrics==`string`){let e=o.plainLyrics.split(`
`).filter(e=>e.trim());if(e.length>0)return{lines:e.map(e=>({text:[{text:e,part:!1,timestamp:0,endtime:0}],background:!1,backgroundText:[],oppositeTurn:!1,timestamp:0,endtime:0,isWordSynced:!1})),source:`LRCLIB (unsynced)`}}}catch{}return null}static async fetchLyricsFromGenius(e){let t=e.title?.trim(),n=e.artist?.trim();if(!t||!n)return null;try{let e=await Q(`${Ie}?${new URLSearchParams({title:t,artist:n}).toString()}`);if(!e.ok)return null;let r=await e.json();if(r.lyrics){let e=r.lyrics.split(`
`).map(e=>e.trim()).filter(e=>e&&!e.startsWith(`[`));if(e.length>0)return{lines:e.map(e=>({text:[{text:e,part:!1,timestamp:0,endtime:0}],background:!1,backgroundText:[],oppositeTurn:!1,timestamp:0,endtime:0,isWordSynced:!1})),source:`Genius`}}}catch{}return null}static async fetchLyricsFromUnison(t){let n=t.title?.trim(),r=t.artist?.trim();if(!n||!r)return null;let i=new URLSearchParams;i.append(`song`,n),i.append(`artist`,r),t.album&&i.append(`album`,t.album),t.durationMs&&t.durationMs>0&&i.append(`duration`,Math.round(t.durationMs/1e3).toString());try{let t=await Q(`https://unison.boidu.dev/lyrics?${i.toString()}`);if(!t.ok)return null;let n=await t.json();if(!n.success||!n.data?.lyrics)return null;let r=n.data,a=r.format||`lrc`,o=r.syncType||`linesync`,s=r.lyrics;if(a===`ttml`){let t=e.parseTTML(s);if(t&&t.lines.length>0)return{lines:t.lines,source:`Unison`,songwriters:t.songwriters}}if(a===`lrc`)if(o===`plain`){let e=s.split(`
`).map(e=>e.trim()).filter(e=>e);if(e.length>0)return{lines:e.map(e=>({text:[{text:e,part:!1,timestamp:0,endtime:0}],background:!1,backgroundText:[],oppositeTurn:!1,timestamp:0,endtime:0,isWordSynced:!1})),source:`Unison (unsynced)`}}else{let t=e.parseLrcSubtitles(s);if(t.length>0)return{lines:t,source:`Unison`}}}catch{}return null}static calculateLineAlignments(e,t){let n=Array(e.length).fill(void 0),r=!0,i=null,a=0,o=0;if(e.forEach((e,s)=>{let c;if(e){let n=t[e];n||=e===`v1000`?`group`:e===`v2000`?`other`:`person`,n===`group`?c=`start`:(i===null?r=n!==`other`:e!==i&&(r=!r),c=r?`start`:`end`,i=e)}c&&(o+=1,c===`end`&&(a+=1)),n[s]=c}),o>0&&Math.round(a/o*100)>=85){let e=e=>e===`start`?`end`:e===`end`?`start`:e;for(let t=0;t<n.length;t+=1)n[t]=e(n[t])}return n}static parseTTML(t){try{let n=new DOMParser().parseFromString(t,`text/xml`),r={},i={},a={},o=n.getElementsByTagName(`ttm:agent`);for(let e=0;e<o.length;e+=1){let t=o[e],n=t.getAttribute(`xml:id`),r=t.getAttribute(`type`);n&&r&&(a[n]=r)}let s,c=n.getElementsByTagName(`songwriter`);if(c.length>0){let e=[];for(let t=0;t<c.length;t+=1)c[t].textContent&&e.push(c[t].textContent);e.length>0&&(s=e.join(`, `))}let l=n.getElementsByTagName(`translation`);for(let e=0;e<l.length;e+=1){let t=l[e].getElementsByTagName(`text`);for(let e=0;e<t.length;e+=1){let n=t[e],i=n.getAttribute(`for`);i&&n.textContent&&(r[i]=n.textContent)}}let u=e=>{if(!e)return 0;let t=e.split(`:`),n=0;return n=t.length===2?parseInt(t[0],10)*60+parseFloat(t[1]):t.length===3?parseInt(t[0],10)*3600+parseInt(t[1],10)*60+parseFloat(t[2]):parseFloat(t[0]),Math.round(n*1e3)},d=n.getElementsByTagName(`transliteration`);for(let e=0;e<d.length;e+=1){let t=d[e].getElementsByTagName(`text`);for(let e=0;e<t.length;e+=1){let n=t[e],r=n.getAttribute(`for`);if(!r)continue;let a=Array.from(n.getElementsByTagName(`span`)).filter(e=>e.getAttribute(`begin`));if(a.length>0){let e=[],t=``;for(let n=0;n<a.length;n+=1){let r=a[n],i=r.getAttribute(`begin`),o=r.getAttribute(`end`),s=r.textContent||``,c=r.nextSibling;c&&c.nodeType===3&&/^\s/.test(c.textContent||``)&&!s.endsWith(` `)&&(s+=` `),s.trim()!==``&&(e.push({time:u(i),duration:u(o)-u(i),text:s}),t+=s)}i[r]={text:t.trim(),syllabus:e}}else n.textContent&&(i[r]={text:n.textContent.trim().replace(/\s+/g,` `)})}}let f=[],p=n.getElementsByTagName(`p`),m=[];for(let e=0;e<p.length;e+=1)m.push(p[e].getAttribute(`ttm:agent`)||void 0);let h=e.calculateLineAlignments(m,a);for(let e=0;e<p.length;e+=1){let t=p[e],n=t.getAttribute(`itunes:key`),a=u(t.getAttribute(`begin`)),o=u(t.getAttribute(`end`)),s;t.parentNode&&t.parentNode.tagName===`div`&&(s=t.parentNode.getAttribute(`itunes:songPart`)||void 0);let c=[],l=[],d=t.getElementsByTagName(`span`);if(d.length>0)for(let e=0;e<d.length;e+=1){let t=d[e];if(t.getAttribute(`ttm:role`)===`x-bg`){let e=t.getElementsByTagName(`span`);for(let t=0;t<e.length;t+=1){let n=e[t],r=n.textContent||``,i=n.nextSibling;i&&i.nodeType===3&&/^\s/.test(i.textContent||``)&&!r.endsWith(` `)&&(r+=` `),l.push({text:r,timestamp:u(n.getAttribute(`begin`)),endtime:u(n.getAttribute(`end`)),part:!/\s$/.test(r)})}continue}if(t.parentNode&&t.parentNode.getAttribute?.(`ttm:role`)===`x-bg`)continue;let n=t.textContent||``,r=t.nextSibling;r&&r.nodeType===3&&/^\s/.test(r.textContent||``)&&!n.endsWith(` `)&&(n+=` `),c.push({text:n,timestamp:u(t.getAttribute(`begin`)),endtime:u(t.getAttribute(`end`)),part:!/\s$/.test(n)})}else c.push({text:t.textContent?.trim()||``,timestamp:a,endtime:o,part:!1,lineSynced:!0});let m=h[e],g=n?i[n]:void 0;if(g&&c.length>1&&d.length>0)if(g.syllabus&&g.syllabus.length===c.length)c.forEach((e,t)=>{e.romanizedText=g.syllabus[t].text});else{let e=g.text.split(/\s+/).filter(Boolean),t=[];for(let e=0;e<c.length;e+=1)c[e].part&&t.length>0?t[t.length-1].push(e):t.push([e]);let n=/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/.test(c.map(e=>e.text).join(``));if(e.length===t.length)t.forEach((t,n)=>{c[t[0]].romanizedText=e[n]});else if(e.length===c.length)c.forEach((t,n)=>{t.romanizedText=e[n]});else if(n){let n=0;for(let r of t){let t=c[r[0]],i=(r.map(e=>c[e].text).join(``).match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7afA-Za-z0-9]/g)||[]).length;i>0&&n<e.length&&(t.romanizedText=e.slice(n,n+i).join(` `),n+=i)}}}f.push({text:c,background:l.length>0,backgroundText:l,timestamp:a,endtime:o,isWordSynced:d.length>0,alignment:m,songPart:s,translation:n?r[n]:void 0,romanizedText:g?.text,oppositeTurn:m===`end`})}return{lines:f,songwriters:s}}catch{return null}}static convertKPoeLyrics(t){if(!t)return null;let n=null;if(Array.isArray(t?.lyrics)?n=t.lyrics:Array.isArray(t?.data?.lyrics)?n=t.data.lyrics:Array.isArray(t?.data)&&(n=t.data),!n||n.length===0)return null;let r=n.filter(e=>!!e),i=[],a=t.type===`Line`||t.type===`line`,o={};t.metadata?.agents&&Object.entries(t.metadata.agents).forEach(([e,t])=>{let n=t.alias||e;o[n]=t.type});let s=r.map(e=>e.element?.singer),c=e.calculateLineAlignments(s,o);for(let t=0;t<r.length;t+=1){let n=r[t],o=e.toMilliseconds(n.time),s=e.toMilliseconds(n.duration),l=c[t],u=typeof n.text==`string`?n.text:``,d=e.toMilliseconds(n.time),f=e.toMilliseconds(n.duration),p=e.toMilliseconds(n.endTime)||d+(f||0),m=[];Array.isArray(n.syllabus)?m=n.syllabus.filter(e=>!!e):Array.isArray(n.words)&&(m=n.words.filter(e=>!!e));let h=[],g=[];if(!a&&m.length>0)for(let t of m){let n=e.toMilliseconds(t.time,d),r=e.toMilliseconds(t.duration),i=r===0&&m.length===1?p:n+r,a={text:typeof t.text==`string`?t.text:``,part:!!t.part,timestamp:n,endtime:i};t.isBackground?g.push(a):h.push(a)}h.length===0&&u&&h.push({text:u,part:!1,timestamp:d,endtime:p||d,lineSynced:a});let _=h.length>0||g.length>0,{transliteration:v}=n,y;v&&(y=v.text,Array.isArray(v.syllabus)&&v.syllabus.length===h.length&&v.syllabus.forEach((e,t)=>{h[t].romanizedText=e.text}));let b=n.translation?.text,x={text:h,background:g.length>0,backgroundText:g,oppositeTurn:l===`end`||(Array.isArray(n.element)?n.element.includes(`opposite`)||n.element.includes(`right`):!1),timestamp:d,endtime:o+s,isWordSynced:a?!1:_,alignment:l,songPart:n.element?.songPart,romanizedText:y,translation:b};i.push(x)}return i}static toMilliseconds(e,t=0){let n=Number(e);return!Number.isFinite(n)||Number.isNaN(n)?t:Number.isInteger(n)?Math.max(0,Math.round(n)):Math.round(n*1e3)}firstUpdated(){this.lyricsContainer&&(this.lyricsContainer.addEventListener(`wheel`,this._boundHandleUserScroll,{passive:!0}),this.lyricsContainer.addEventListener(`touchmove`,this._boundHandleUserScroll,{passive:!0}))}_onTimeChanged(t,n){let r=Math.abs(n-t)>Ae,i=this.findActiveLineIndices(n),a=this.activeLineIndices;if(!e.arraysEqual(i,a)||r){if(this.lyricsContainer){for(let t of a)if(!i.includes(t)){let i=this._getLineElement(t);if(i){r||this.isUserScrolling?e.unfinishSyllables(i):e.finishSyllablesUpToTime(i,n),i.classList.remove(`active`,`bg-expanded`),i.classList.contains(`pre-active`)&&i.classList.remove(`pre-active`);let t=this.preActiveLineElements.indexOf(i);t!==-1&&this.preActiveLineElements.splice(t,1)}}for(let e of i)if(!a.includes(e)){let t=this._getLineElement(e);if(t){t.classList.add(`active`,`bg-expanded`),t.classList.remove(`pre-active`);let e=this.preActiveLineElements.indexOf(t);e!==-1&&this.preActiveLineElements.splice(e,1)}}for(let t of this.preActiveLineElements){let n=e.getLineIndexFromElement(t);(n===null||!i.includes(n)&&t!==this.currentPrimaryActiveLine)&&t.classList.remove(`pre-active`)}this.preActiveLineElements=this.preActiveLineElements.filter(e=>e.classList.contains(`pre-active`))}this.startAnimationFromTime(n)}if(this._handleActiveLineScroll(a,r),this.clearPastLineHighlights(),this.lyricsContainer){for(let t of this.activeLineIndices){let r=this._getLineElement(t);r&&e.updateSyllablesForLine(r,n)}for(let t of this.activeGapLineElements)e.updateSyllablesForLine(t,n);if(this.gapElementCache.size>0)for(let[,t]of this.gapElementCache){let i=t._cachedStartTime??parseFloat(t.getAttribute(`data-start-time`)||`0`),a=t._cachedEndTime??parseFloat(t.getAttribute(`data-end-time`)||`0`),o=n>=i&&n<a,s=t.classList.contains(`active`),c=t.classList.contains(`gap-exiting`),l=Z,u=s&&!c&&n>=a-l;if(o&&(!s||r)&&!c){t.classList.remove(`gap-exiting`),r&&s&&(t.classList.remove(`active`),t.offsetWidth);let o=a-i,c=e.getGapLoopDelay(o)+(n-i);t.style.setProperty(`--gap-loop-delay`,`-${c}ms`),t.classList.add(`active`),this.activeGapLineElements.includes(t)||this.activeGapLineElements.push(t),t.querySelectorAll(`.lyrics-syllable`).forEach(t=>{let r=parseFloat(t.getAttribute(`data-start-time`)||`0`),i=parseFloat(t.getAttribute(`data-end-time`)||`0`);n>i?(t.classList.add(`finished`),t.classList.contains(`highlight`)||e.updateSyllableAnimation(t,n-r)):n>=r&&n<=i&&e.updateSyllableAnimation(t,n-r)})}else if(u){t.classList.remove(`active`),t.offsetWidth,t.classList.add(`gap-exiting`);let e=this.activeGapLineElements.indexOf(t);e!==-1&&this.activeGapLineElements.splice(e,1),setTimeout(()=>{t.classList.remove(`gap-exiting`)},Z)}else if(!o&&(s||c)){t.classList.remove(`active`),t.classList.remove(`gap-exiting`);let e=this.activeGapLineElements.indexOf(t);e!==-1&&this.activeGapLineElements.splice(e,1)}else c&&n<a-l&&t.classList.remove(`gap-exiting`)}else this.lyricsContainer&&this.lyricsContainer.querySelectorAll(`.lyrics-gap`).forEach(t=>{let i=parseFloat(t.getAttribute(`data-start-time`)||`0`),a=parseFloat(t.getAttribute(`data-end-time`)||`0`),o=n>=i&&n<a,s=t.classList.contains(`active`),c=t.classList.contains(`gap-exiting`),l=Z,u=s&&!c&&n>=a-l;if(o&&(!s||r)&&!c){t.classList.remove(`gap-exiting`),r&&s&&(t.classList.remove(`active`),t.offsetWidth);let o=a-i,c=e.getGapLoopDelay(o)+(n-i);t.style.setProperty(`--gap-loop-delay`,`-${c}ms`),t.classList.add(`active`),this.activeGapLineElements.includes(t)||this.activeGapLineElements.push(t)}else if(u){t.classList.remove(`active`),t.offsetWidth,t.classList.add(`gap-exiting`);let e=this.activeGapLineElements.indexOf(t);e!==-1&&this.activeGapLineElements.splice(e,1),setTimeout(()=>{t.classList.remove(`gap-exiting`)},Z)}else if(!o&&(s||c)){t.classList.remove(`active`),t.classList.remove(`gap-exiting`);let e=this.activeGapLineElements.indexOf(t);e!==-1&&this.activeGapLineElements.splice(e,1)}else c&&n<a-l&&t.classList.remove(`gap-exiting`)});let t=this.findInstrumentalGapAt(n);if(t){if(this.lastInstrumentalIndex=t.insertBeforeIndex,t.insertBeforeIndex>0){let n=this._getLineElement(t.insertBeforeIndex-1);n&&n.classList.contains(`persist-highlight`)&&!n.classList.contains(`active`)&&e.unfinishSyllables(n)}}else this.lastInstrumentalIndex!==null&&(this.lastInstrumentalIndex=null);let i=this.lyrics&&this.lyrics.length>0?this.lyrics[this.lyrics.length-1]:null,a=this.lyricsContainer.querySelector(`.lyrics-footer`);if(a&&i&&i.endtime>0){let e=n>i.endtime+200;if(e&&!a.classList.contains(`active`)){a.classList.add(`active`);let e=this.lyricsContainer.querySelector(`.lyrics-line:last-of-type`);if(e){e.classList.remove(`pre-active`);let t=this.preActiveLineElements.indexOf(e);t!==-1&&this.preActiveLineElements.splice(t,1)}this.autoScroll&&!this.isUserScrolling&&!this.isClickSeeking&&this.focusLine(a)}else !e&&a.classList.contains(`active`)&&a.classList.remove(`active`)}}}updated(e){if(e.has(`lyrics`)&&(this._invalidateCaches(),this._ensureLineDataCache(),this._updateCachedIsUnsynced(),this._updateCharTimingData(),this.lyricsContainer&&this.lyrics)){let e=this.findActiveLineIndices(this.currentTime);for(let t of e){let e=this._getLineElement(t);e&&e.classList.add(`active`,`bg-expanded`)}if(this._onTimeChanged(0,this.currentTime),this.positionedLineElements.length===0){let e=this.lyricsContainer.querySelector(`.lyrics-line`);e&&this.updatePositionClasses(e)}this.visibilityObserver?.disconnect(),this.visibilityObserver=new IntersectionObserver(e=>{e.forEach(e=>{e.target.classList.toggle(`far-line`,!e.isIntersecting)})},{root:this.lyricsContainer,rootMargin:`200px`,threshold:0}),this.lyricsContainer.querySelectorAll(`.lyrics-line`).forEach(e=>this.visibilityObserver.observe(e))}if(e.has(`duration`)&&this.duration===-1){this.currentTime=0,this.activeLineIndices=[],this.activeMainWordIndices.clear(),this.activeBackgroundWordIndices.clear(),this.mainWordProgress.clear(),this.backgroundWordProgress.clear(),this.mainWordAnimations.clear(),this.backgroundWordAnimations.clear(),this.preActiveLineElements=[],this.positionedLineElements=[],this.activeGapLineElements=[],this.setUserScrolling(!1),this.animationFrameId&&=(cancelAnimationFrame(this.animationFrameId),void 0),this.userScrollTimeoutId&&=(clearTimeout(this.userScrollTimeoutId),void 0),this.scrollUnlockTimeout&&=(clearTimeout(this.scrollUnlockTimeout),void 0),this.scrollAnimationTimeout&&=(clearTimeout(this.scrollAnimationTimeout),void 0),this.lyricsContainer&&(this.lyricsContainer.scrollTop=0);return}(e.has(`query`)||e.has(`musicId`)||e.has(`isrc`)||e.has(`ttml`)||e.has(`songTitle`)||e.has(`songArtist`)||e.has(`songAlbum`)||e.has(`songDurationMs`))&&!e.has(`currentTime`)&&this.fetchLyrics(),e.has(`currentTime`)&&this.lyrics}_handleActiveLineScroll(e,t=!1){if(!this.lyricsContainer||!this.lyrics||this.lyrics.length===0||this.lyricsContainer.querySelector(`.lyrics-footer`)?.classList.contains(`active`))return;let n=350,r=-1;for(let e=0;e<this.lyrics.length;e+=1)if(this.lyrics[e].timestamp>this.currentTime){r=e-1;break}if(r===-1&&this.lyrics.length>0&&this.currentTime>=this.lyrics[this.lyrics.length-1].timestamp&&(r=this.lyrics.length-1),r!==-1&&r+1<this.lyrics.length){let e=this.lyrics[r],t=this.lyrics[r+1].timestamp-e.endtime;n=Math.min(500,Math.max(350,t))}let i=this.currentTime+n,a=this.findActiveLineIndices(i),o=null;if(a.length>0){let e=this.getPrimaryScrollLineIndex(a,i);e!==null&&e!==-1&&(o=this._getLineElement(e))}if(!o){let e=this.getLineIndexAtTime(i,0);e!==null&&e!==-1&&(o=this._getLineElement(e))}if(!o)return;o.classList.contains(`active`)||(o.classList.add(`pre-active`),this.preActiveLineElements.includes(o)||this.preActiveLineElements.push(o));let s=n;this.focusLine(o,t,s)}_getTextWidth(e,t){return this._textWidthCanvas||(this._textWidthCanvas=document.createElement(`canvas`),this._textWidthCtx=this._textWidthCanvas.getContext(`2d`,{willReadFrequently:!0})),this._textWidthCtx?(this._textWidthCtx.font=t,this._textWidthCtx.measureText(e).width):0}_rebuildDomCache(){if(!this.lyricsContainer||(this.lineElementCache.clear(),this.gapElementCache.clear(),this.cachedLineArray=[],!this.lyrics))return;for(let e=0;e<this.lyrics.length;e+=1){let t=this.lyricsContainer.querySelector(`#lyrics-line-${e}`);t&&this.lineElementCache.set(e,t);let n=this.lyricsContainer.querySelector(`#gap-${e}`);n&&(n._cachedStartTime=parseFloat(n.getAttribute(`data-start-time`)||`0`),n._cachedEndTime=parseFloat(n.getAttribute(`data-end-time`)||`0`),this.gapElementCache.set(e,n))}let e=this.lyricsContainer.querySelectorAll(`.lyrics-line`);this.cachedLineArray=Array.from(e)}_getLineElement(e){let t=this.lineElementCache.get(e);if(t)return t;if(!this.lyricsContainer)return null;let n=this.lyricsContainer.querySelector(`#lyrics-line-${e}`);return n&&this.lineElementCache.set(e,n),n}_getGapElement(e){let t=this.gapElementCache.get(e);if(t)return t;if(!this.lyricsContainer)return null;let n=this.lyricsContainer.querySelector(`#gap-${e}`);return n&&this.gapElementCache.set(e,n),n}_invalidateCaches(){this.cachedAllGaps=[],this.cachedIsUnsynced=!1,this.cachedLineData=null,this.lineElementCache.clear(),this.gapElementCache.clear(),this.cachedLineArray=[],this.cachedScrollPaddingTop=null,this.preActiveLineElements=[],this.positionedLineElements=[],this.activeGapLineElements=[],this.visibilityObserver?.disconnect(),this.visibilityObserver=void 0}_updateCachedIsUnsynced(){this.cachedIsUnsynced=this.lyrics&&this.lyrics.length>0?this.lyrics.every(e=>e.timestamp===0&&e.endtime===0):!1}_ensureLineDataCache(){this.cachedLineData||!this.lyrics||(this.cachedLineData=this.lyrics.map(e=>{let t=[],n=[];e.text.forEach((r,i)=>{n.push(r);let a=e.text[i+1];(!a||r.part===!1||/\s$/.test(r.text)||a&&r.isBackground!==a.isBackground)&&(t.push(n),n=[])}),n.length>0&&t.push(n);let r=Array(t.length).fill(!1),i=Array(t.length).fill(!1),a=Array(t.length).fill(!1),o=Array(t.length).fill(``),s=Array(t.length).fill(0),c=Array(t.length).fill(0),l=Array(t.length).fill(0),u=Array(t.length).fill(0),d=!1,f=0;for(;f<t.length;){let n=f;for(;n<t.length-1;){let e=t[n],r=e[e.length-1].text;if(/\s$/.test(r))break;n+=1}let p=t.slice(f,n+1).flatMap(e=>e.map(e=>e.text)).join(``).trim(),m=t[f][0].timestamp,h=t[n],g=h[h.length-1].endtime,_=g-m,v=/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/.test(p),y=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0590-\u05FF]/.test(p);y&&(d=!0);let b=p.includes(`-`),x=p.length,S=!v&&!y&&!b&&x>0,C=e.isWordSynced===!1||e.text.some(e=>e.lineSynced),w=S&&x>0&&x<=7;w&&=x<3?_>=1050&&_>=x*525:_>=850&&_>=x*190;let T=_>=Math.max(700,x*85),E=x>=4&&_>=Math.max(1300,x*260),D=S&&!C&&!w&&(x>=8&&T||x<8&&E),O=w&&!C,k=0;for(let e=f;e<=n;e+=1){r[e]=w,i[e]=O,a[e]=D,o[e]=p,s[e]=_,c[e]=k,l[e]=m,u[e]=g;let n=t[e].map(e=>e.text).join(``);k+=n.replace(/\s/g,``).length}f=n+1}return{wordGroups:t,groupGrowable:r,groupGlowing:i,groupCharRise:a,vwFullText:o,vwFullDuration:s,vwCharOffset:c,vwStartMs:l,vwEndMs:u,lineIsRTL:d}}))}_updateCharTimingData(){if(!this.shadowRoot)return;this._rebuildDomCache();let e=this.shadowRoot.querySelector(`.lyrics-syllable`);if(!e)return;let t=getComputedStyle(e),{font:n}=t,r=parseFloat(t.fontSize),i=this.shadowRoot.querySelectorAll(`.lyrics-word.growable, .lyrics-word.char-rise`);i&&i.forEach(e=>{let t=e.querySelectorAll(`.lyrics-syllable-wrap`),i=[];t.forEach(e=>{let t=e.querySelector(`.lyrics-syllable`);t&&i.push(t)}),i.forEach(e=>{let t=e.querySelectorAll(`.char`);if(t.length===0)return;let i=Array.from(t).map(e=>e.textContent||``).map(e=>this._getTextWidth(e,n)),a=i.reduce((e,t)=>e+t,0),o=parseFloat(e.dataset.duration||`0`),s=o>0?a/o:0,c=.375*r,l=s>0?c/s:100,u=0;t.forEach((e,t)=>{let n=i[t],r=e;if(a>0){let e=u/a,t=n/a;r.dataset.wipeStart=e.toFixed(4),r.dataset.wipeDuration=t.toFixed(4),r.dataset.preWipeArrival=(o*e).toFixed(2),r.dataset.preWipeDuration=l.toFixed(2)}u+=n})})})}static arraysEqual(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}static getLineIndexFromElement(e){if(!e)return null;let t=e.id.match(/^lyrics-line-(\d+)$/);return t?parseInt(t[1],10):null}static getGapLoopDelay(e){return((Me-((e-Z)%X+X)%X)%X+X)%X}clearPreActiveClasses(t=null){if(!this.lyricsContainer)return;let n=[];for(let r of this.preActiveLineElements)e.getLineIndexFromElement(r)===t?n.push(r):r.classList.remove(`pre-active`);this.preActiveLineElements=n}getPrimaryActiveLineIndex(t){if(t.length===0)return null;let n=t[0],r=t[t.length-1],i=Math.max(n,r-2),a=e.getLineIndexFromElement(this.currentPrimaryActiveLine);return a!==null&&t.includes(a)&&(t.length<=3||i<a)&&(i=a),i}getPrimaryScrollLineIndex(t,n){if(!this.lyrics||this.lyrics.length===0)return null;let r=this.getLineIndexAtTime(n,this.lastActiveIndex);if(r===-1)return null;let i=e.getLineIndexFromElement(this.currentPrimaryActiveLine);return i!==null&&r>i&&this.lyrics[i]&&this.lyrics[r]&&this.lyrics[i].endtime===this.lyrics[r].endtime&&this.findActiveLineIndices(n).length<=3?i:r}getOverlapClusterForActiveIndices(e,t){if(!this.lyrics||e.length===0)return null;let n=e[0];for(;n>0&&this.lyrics[n-1].endtime>=this.lyrics[n].timestamp;)--n;let r=n,i=this.lyrics[n].endtime;for(;r+1<this.lyrics.length&&this.lyrics[r+1].timestamp<=i;)r+=1,i=Math.max(i,this.lyrics[r].endtime);let a=n,o=this.lyrics[n].endtime;for(let e=n;e<=r&&this.lyrics[e].timestamp<=t;e+=1)a=e,o=Math.max(o,this.lyrics[e].endtime);return{start:n,end:r,startedEnd:a,startedEndTime:o}}focusLine(t,n=!1,r=void 0,i=!1,a=!1){let o=t!==this.currentPrimaryActiveLine;if(o&&!a){this.lastPrimaryActiveLine=this.currentPrimaryActiveLine,this.currentPrimaryActiveLine=t;let n=e.getLineIndexFromElement(t);n!==null&&(this.lastActiveIndex=n)}(o||n)&&this.updatePositionClasses(t),!i&&(n||o||a)&&this.autoScroll&&!this.isUserScrolling&&!this.isClickSeeking&&this.scrollToActiveLineYouLy(t,n,r)}setUserScrolling(e){this.isUserScrolling=e,e?this.lyricsContainer?.classList.add(`user-scrolling`):this.lyricsContainer?.classList.remove(`user-scrolling`)}handleUserScroll(){this.isProgrammaticScroll||this.isClickSeeking||(this.setUserScrolling(!0),this.clearPastLineHighlights(),this.userScrollTimeoutId&&clearTimeout(this.userScrollTimeoutId),this.userScrollTimeoutId=window.setTimeout(()=>{this.setUserScrolling(!1),this.userScrollTimeoutId=void 0,this.activeLineIndices.length>0&&this._handleActiveLineScroll([],!1)},2e3))}clearPastLineHighlights(){if(!this.lyricsContainer)return;let t=this.cachedLineArray.length?this.cachedLineArray:Array.from(this.lyricsContainer.querySelectorAll(`.lyrics-line:not(.lyrics-gap)`)),n=this.lyricsContainer.getBoundingClientRect().top+this.getScrollPaddingTop();for(let r=0;r<t.length;r+=1){let i=t[r],a=i.classList.contains(`active`),o=i.getBoundingClientRect().bottom<n-2;!a&&o&&e.unfinishSyllables(i)}}getLineIndexAtTime(e,t=0){if(!this.lyrics||this.lyrics.length===0)return-1;let n=this.lyrics.length,r=Math.max(0,Math.min(t,n-1));for(let t=r;t<n;t+=1){let n=this.lyrics[t];if(n.timestamp>e)break;if(e>=n.timestamp&&e<n.endtime)return t}for(let t=r-1;t>=0;--t){let n=this.lyrics[t];if(e>=n.timestamp&&e<n.endtime)return t;if(n.endtime<e)break}for(let t=0;t<n;t+=1){let n=this.lyrics[t];if(n.timestamp>e)break;if(e>=n.timestamp&&e<n.endtime)return t}return-1}findActiveLineIndices(e){if(!this.lyrics||this.lyrics.length===0)return[];let t=[];for(let n=0;n<this.lyrics.length;n+=1){let r=this.lyrics[n];if(r.timestamp>e)break;e>=r.timestamp&&e<r.endtime&&t.push(n)}return t}findInstrumentalGapAt(e){if(!this.lyrics||this.lyrics.length===0)return null;let t=this.lyrics[0];if(e>=0&&e<t.timestamp){let e=t.timestamp;return e-0>=Y?{insertBeforeIndex:0,gapStart:0,gapEnd:e}:null}for(let t=0;t<this.lyrics.length-1;t+=1){let n=this.lyrics[t],r=this.lyrics[t+1],i=n.endtime,a=r.timestamp;if(e>i&&e<a)return a-i>=Y?{insertBeforeIndex:t+1,gapStart:i,gapEnd:a}:null}return null}findAllInstrumentalGaps(){if(this.cachedAllGaps.length>0)return this.cachedAllGaps;if(!this.lyrics||this.lyrics.length===0)return[];let e=[],t=this.lyrics[0];t.timestamp>=Y&&e.push({insertBeforeIndex:0,gapStart:0,gapEnd:t.timestamp});for(let t=0;t<this.lyrics.length-1;t+=1){let n=this.lyrics[t],r=this.lyrics[t+1],i=n.endtime,a=r.timestamp;a-i>=Y&&e.push({insertBeforeIndex:t+1,gapStart:i,gapEnd:a})}return this.cachedAllGaps=e,e}startAnimationFromTime(t){if(this.animationFrameId&&=(cancelAnimationFrame(this.animationFrameId),void 0),!this.lyrics)return;let n=this.findActiveLineIndices(t);if(e.arraysEqual(n,this.activeLineIndices)||(this.activeLineIndices=n),this.activeMainWordIndices.clear(),this.activeBackgroundWordIndices.clear(),this.mainWordAnimations.clear(),this.backgroundWordAnimations.clear(),this.mainWordProgress.clear(),this.backgroundWordProgress.clear(),n.length!==0){for(let e of n){let n=this.lyrics[e],r=-1;for(let e=0;e<n.text.length;e+=1)if(t>=n.text[e].timestamp&&t<=n.text[e].endtime){r=e;break}this.activeMainWordIndices.set(e,r);let i=-1;if(n.backgroundText){for(let e=0;e<n.backgroundText.length;e+=1)if(t>=n.backgroundText[e].timestamp&&t<=n.backgroundText[e].endtime){i=e;break}}this.activeBackgroundWordIndices.set(e,i)}this.setupAnimations(),this.interpolate&&this.animateProgress()}}updateActiveLineAndWords(){if(!this.lyrics)return;let t=this.findActiveLineIndices(this.currentTime);e.arraysEqual(t,this.activeLineIndices)||(this.activeLineIndices=t),this.activeMainWordIndices.clear(),this.activeBackgroundWordIndices.clear();for(let e of t){let t=this.lyrics[e],n=-1;for(let e=0;e<t.text.length;e+=1)if(this.currentTime>=t.text[e].timestamp&&this.currentTime<=t.text[e].endtime){n=e;break}this.activeMainWordIndices.set(e,n);let r=-1;if(t.backgroundText){for(let e=0;e<t.backgroundText.length;e+=1)if(this.currentTime>=t.backgroundText[e].timestamp&&this.currentTime<=t.backgroundText[e].endtime){r=e;break}}this.activeBackgroundWordIndices.set(e,r)}}setupAnimations(){if(this.activeLineIndices.length===0||!this.lyrics){this.mainWordAnimations.clear(),this.backgroundWordAnimations.clear();return}for(let e of this.activeLineIndices){let t=this.lyrics[e],n=this.activeMainWordIndices.get(e)??-1,r=this.activeBackgroundWordIndices.get(e)??-1;if(n!==-1){let r=t.text[n],i=r.endtime-r.timestamp,a=this.currentTime-r.timestamp;this.mainWordAnimations.set(e,{startTime:performance.now()-a,duration:i})}else this.mainWordAnimations.set(e,{startTime:0,duration:0});if(r!==-1&&t.backgroundText){let n=t.backgroundText[r],i=n.endtime-n.timestamp,a=this.currentTime-n.timestamp;this.backgroundWordAnimations.set(e,{startTime:performance.now()-a,duration:i})}else this.backgroundWordAnimations.set(e,{startTime:0,duration:0})}}handleLineClick(t){this.lyricsContainer&&(this.lyricsContainer.querySelectorAll(`.lyrics-line`).forEach(t=>{e.resetSyllables(t),t.classList.remove(`scroll-animate`),t.style.removeProperty(`--scroll-delta`),t.style.removeProperty(`--lyrics-line-delay`)}),this.lyricsContainer.classList.remove(`wheel-scrolling`)),this.scrollAnimationState&&(this.scrollAnimationState.isAnimating=!1,this.scrollAnimationState.pendingUpdate=null),this.scrollAnimationTimeout&&=(clearTimeout(this.scrollAnimationTimeout),void 0),this.userScrollTimeoutId&&=(clearTimeout(this.userScrollTimeoutId),void 0),this.setUserScrolling(!1),this.currentPrimaryActiveLine=null,this.lastPrimaryActiveLine=null,this.activeLineIds.clear(),this.animatingLines=[];let n=this.lyricsContainer?.querySelector(`.lyrics-line[data-start-time="${t.text[0]?.timestamp||0}"]`);n&&this.lyricsContainer&&(this.currentPrimaryActiveLine=n,this.currentScrollOffset=-this.lyricsContainer.scrollTop,this.isClickSeeking=!0,this.clickSeekTimeout&&clearTimeout(this.clickSeekTimeout),this.clickSeekTimeout=setTimeout(()=>{this.isClickSeeking=!1},800),this.scrollToActiveLineYouLy(n,!0));let r=new CustomEvent(`line-click`,{detail:{timestamp:t.timestamp},bubbles:!0,composed:!0});this.dispatchEvent(r)}static getBackgroundTextPlacement(e){if(!e.backgroundText||e.backgroundText.length===0||e.text.length===0)return`after`;let t=e.text[0].timestamp;return e.backgroundText[0].timestamp<t?`before`:`after`}scrollToActiveLine(){if(!this.lyricsContainer||this.activeLineIndices.length===0)return;let e=Math.min(...this.activeLineIndices),t=this.lyricsContainer.querySelector(`.lyrics-line:nth-child(${e+1})`);if(t){let e=this.lyricsContainer.clientHeight,n=t.offsetTop,r=t.clientHeight,i=t.querySelector(`.background-text.before`),a=0;i&&(a=i.clientHeight/2);let o=n-e/2+r/2-a;requestAnimationFrame(()=>{this.isProgrammaticScroll=!0,this.lyricsContainer?.scrollTo({top:o,behavior:`smooth`}),setTimeout(()=>{this.isProgrammaticScroll=!1},100)})}}scrollToInstrumental(e){if(!this.lyricsContainer)return;let t=this.lyricsContainer.querySelector(`#gap-${e}`);if(t){let e=this.getScrollPaddingTop()-t.offsetTop;this.isProgrammaticScroll=!0,this.clearPastLineHighlights(),this.animateScrollYouLy(e,!1),setTimeout(()=>{this.isProgrammaticScroll=!1},250)}}getScrollPaddingTop(){if(this.cachedScrollPaddingTop!==null)return this.cachedScrollPaddingTop;if(!this.lyricsContainer)return 0;let e=getComputedStyle(this).getPropertyValue(`--lyrics-scroll-padding-top`)||`25%`,t;return t=e.includes(`%`)?this.lyricsContainer.clientHeight*(parseFloat(e)/100):parseFloat(e)||0,this.cachedScrollPaddingTop=t,t}animateScrollYouLy(e,t=!1,n=void 0){if(!this.lyricsContainer)return;let r=this.lyricsContainer,i=Math.max(0,-e);this.scrollAnimationState||(this.scrollAnimationState={isAnimating:!1,pendingUpdate:null},this.animatingLines=[]);let a=this.scrollAnimationState;if(a.isAnimating&&!t){let t=a.pendingUpdate===null?null:Math.max(0,-a.pendingUpdate);if(Math.abs(r.scrollTop-i)<2||t!==null&&Math.abs(t-i)<2)return;a.pendingUpdate=e;return}this.scrollAnimationTimeout&&=(clearTimeout(this.scrollAnimationTimeout),void 0),this.scrollUnlockTimeout&&=(clearTimeout(this.scrollUnlockTimeout),void 0);let{animatingLines:o}=this,s=-i,c=-r.scrollTop-s;if(this.currentScrollOffset=s,Math.abs(r.scrollTop-i)<1&&Math.abs(c)<1){a.isAnimating=!1,a.pendingUpdate=null;return}if(t){for(let e of o)e.classList.remove(`scroll-animate`),e.style.removeProperty(`--scroll-delta`),e.style.removeProperty(`--lyrics-line-delay`),e.style.removeProperty(`--scroll-duration`);o.length=0,r.scrollTo({top:i,behavior:`smooth`}),a.isAnimating=!1,a.pendingUpdate=null;return}for(let e of o)e.classList.remove(`scroll-animate`),e.style.removeProperty(`--scroll-delta`),e.style.removeProperty(`--lyrics-line-delay`),e.style.removeProperty(`--scroll-duration`);if(o.length=0,this.cachedLineArray.length===0){let e=this.lyricsContainer.querySelectorAll(`.lyrics-line`);this.cachedLineArray=Array.from(e)}let l=this.cachedLineArray,u=this.currentPrimaryActiveLine||this.lastPrimaryActiveLine||l[0];if(!u)return;let d=l.indexOf(u);if(d===-1)return;let f=Math.min(450,n??je),p=f*.1,m=l.length,h=Math.max(0,d-20),g=Math.min(m,d+20),_=0,v=[];if(c>=0){let e=0;for(let t=h;t<g;t+=1){let n=l[t],r=t>=d?e*p:0;t>=d&&!n.classList.contains(`lyrics-gap`)&&(e+=1),n.style.setProperty(`--scroll-delta`,`${c}px`),n.style.setProperty(`--lyrics-line-delay`,`${r}ms`),n.style.setProperty(`--scroll-duration`,`${f+100}ms`),v.push(n);let i=f+r;i>_&&(_=i)}}else{let e=0;for(let t=g-1;t>=h;--t){let n=l[t],r=t<=d?e*p:0;t<=d&&!n.classList.contains(`lyrics-gap`)&&(e+=1),n.style.setProperty(`--scroll-delta`,`${c}px`),n.style.setProperty(`--lyrics-line-delay`,`${r}ms`),n.style.setProperty(`--scroll-duration`,`${f+100}ms`),v.push(n);let i=f+r;i>_&&(_=i)}}r.offsetHeight;for(let e of v)e.classList.add(`scroll-animate`),o.push(e);a.isAnimating=!0,this.scrollUnlockTimeout=setTimeout(()=>{if(a.isAnimating=!1,a.pendingUpdate!==null){let e=a.pendingUpdate;a.pendingUpdate=null,this.animateScrollYouLy(e,!1,n)}},400),this.scrollAnimationTimeout=setTimeout(()=>{for(let e=0;e<o.length;e+=1){let t=o[e];t.classList.remove(`scroll-animate`),t.style.removeProperty(`--scroll-delta`),t.style.removeProperty(`--lyrics-line-delay`),t.style.removeProperty(`--scroll-duration`)}o.length=0,this.scrollAnimationTimeout=void 0},_+50),r.scrollTo({top:i,behavior:`instant`})}updatePositionClasses(e){if(!this.lyricsContainer)return;let t=[`lyrics-activest`,`post-active-line`,`next-active-line`,`prev-1`,`prev-2`,`prev-3`,`prev-4`,`next-1`,`next-2`,`next-3`,`next-4`];for(let e of this.positionedLineElements)e.classList.remove(...t);this.positionedLineElements=[],e.classList.add(`lyrics-activest`),this.positionedLineElements.push(e),this.cachedLineArray.length===0&&(this.cachedLineArray=Array.from(this.lyricsContainer.querySelectorAll(`.lyrics-line`)));let n=this.cachedLineArray,r=n.indexOf(e);if(r!==-1)for(let e=Math.max(0,r-4);e<=Math.min(n.length-1,r+4);e+=1){let t=e-r;if(t!==0){let r=n[e];t===-1?r.classList.add(`post-active-line`):t===1?r.classList.add(`next-active-line`):t<0?r.classList.add(`prev-${Math.abs(t)}`):r.classList.add(`next-${t}`),this.positionedLineElements.push(r)}}}scrollToActiveLineYouLy(e,t=!1,n=void 0){if(!e||!this.lyricsContainer)return;let r=this.getScrollPaddingTop(),i=r-e.offsetTop,a=this.lyricsContainer.getBoundingClientRect().top;if(!(!t&&Math.abs(e.getBoundingClientRect().top-a-r)<1)){if(!t&&!e.classList.contains(`lyrics-footer`)){let t=this.lyricsContainer,n=t.scrollTop+t.clientHeight>=t.scrollHeight-50,i=Math.max(0,-(r-e.offsetTop));if(n&&i>t.scrollTop-50)return}this.lyricsContainer.classList.remove(`not-focused`,`user-scrolling`),this.isProgrammaticScroll=!0,this.setUserScrolling(!1),this.userScrollTimeoutId&&=(clearTimeout(this.userScrollTimeoutId),void 0),this.clearPastLineHighlights(),setTimeout(()=>{this.isProgrammaticScroll=!1},(n??je)+160),this.animateScrollYouLy(i,t,n)}}static updateSyllableAnimation(e,t=0){if(e.classList.contains(`highlight`))return;let{classList:n}=e,r=n.contains(`rtl-text`),i=Array.from(e.querySelectorAll(`span.char`)),a=e.parentElement?.parentElement,o=a?.dataset.virtualWordId,s=[];o&&a?.parentElement?s=Array.from(a.parentElement.querySelectorAll(`.lyrics-word`)).filter(e=>e.dataset.virtualWordId===o):a&&(s=[a]);let c=s.flatMap(e=>Array.from(e.querySelectorAll(`span.char`))),l=a?.classList.contains(`growable`),u=a?.classList.contains(`char-rise`),d=e.getAttribute(`data-syllable-index`)===`0`,f=parseFloat(e.getAttribute(`data-start-time`)||`0`),p=parseFloat(a?.dataset.virtualWordStart||``),m=d&&(!Number.isFinite(p)||Math.abs(f-p)<.5),h=d,g=e.closest(`.lyrics-gap`)!==null,_=parseFloat(e.getAttribute(`data-duration`)||`0`)||300,v=parseFloat(e.getAttribute(`data-word-duration`)||e.getAttribute(`data-duration`)||`0`)||_,y=new Map,b=[];if(l&&m&&c.length>0){let e=v,t=e*.09,n=e*1.5;c.forEach(e=>{let r=e.dataset.matrixScale||`1.1`,i=e.dataset.charOffsetX||`0`,a=e.dataset.shadowIntensity||`0.6`,o=e.dataset.translateYPeak||`-2`,s=t*parseFloat(e.dataset.syllableCharIndex||`0`);y.set(e,`grow-dynamic ${n}ms ease-in-out ${s}ms forwards`),b.push({element:e,property:`--matrix-scale`,value:r}),b.push({element:e,property:`--char-offset-x`,value:`${i}px`}),b.push({element:e,property:`--shadow-intensity`,value:a}),b.push({element:e,property:`--translate-y-peak`,value:`${o}px`})})}if(u&&m&&c.length>0){let e=Math.max(v,_),t=e*.09,n=e*1.5;c.forEach(e=>{let r=t*parseFloat(e.dataset.syllableCharIndex||`0`);y.set(e,`rise-char ${n}ms ease-in-out ${r}ms forwards`)})}if(i.length>0)i.forEach((e,n)=>{let i=parseFloat(e.dataset.wipeStart||`0`),a=parseFloat(e.dataset.wipeDuration||`0`),o=_*i-t,s=_*a,c=h&&n===0,l=`wipe`;l=c?r?`start-wipe-rtl`:`start-wipe`:r?`wipe-rtl`:`wipe`;let u=y.get(e)||e.style.animation||``,d=[];if(u&&(u.includes(`grow-dynamic`)||u.includes(`rise-char`))&&d.push(u.split(`,`)[0].trim()),n>0&&o>0&&s>0){let n=(e.dataset.preWipeArrival?parseFloat(e.dataset.preWipeArrival):_*i)-t,r=parseFloat(e.dataset.preWipeDuration||`100`),a=Math.min(r,s*.9,_*.08,n),o=n-a;a>=16&&d.push(`pre-wipe-char ${a}ms linear ${o}ms none`)}s>0&&d.push(`${l} ${s}ms linear ${o}ms forwards`),d.length>0&&y.set(e,d.join(`, `))});else{let n=_*parseFloat(e.getAttribute(`data-wipe-ratio`)||`1`),i=`wipe`;if(i=h?r?`start-wipe-rtl`:`start-wipe`:r?`wipe-rtl`:`wipe`,e.classList.contains(`line-synced`))return;let a=g?`fade-gap`:i;e.style.animation=`${a} ${n}ms ${g?`ease-out`:`linear`} ${-t}ms forwards`}n.remove(`pre-highlight`),n.add(`highlight`);for(let[e,t]of y.entries())e.style.willChange=`transform`,e.style.animation=t;for(let e of b)e.element.style.setProperty(e.property,e.value)}static resetSyllable(e){if(!e)return;e.style.animation=``,e.style.removeProperty(`--pre-wipe-duration`),e.style.removeProperty(`--pre-wipe-delay`),e.style.transition=`none`,e.style.backgroundColor=`var(--lyplus-text-secondary)`;let t=e.querySelectorAll(`span.char`);for(let e=0;e<t.length;e+=1){let n=t[e];n.style.animation=``,n.style.transition=`none`,n.style.backgroundColor=`var(--lyplus-text-secondary)`}e.classList.remove(`highlight`,`finished`,`pre-highlight`,`cleanup`)}static resetSyllables(t){if(!t)return;t.classList.remove(`persist-highlight`),t._cachedSyllableElements=null;let n=t.getElementsByClassName(`lyrics-syllable`);for(let t=0;t<n.length;t+=1)e.resetSyllable(n[t]);requestAnimationFrame(()=>{for(let e=0;e<n.length;e+=1){let t=n[e];t.style.removeProperty(`background-color`),t.style.removeProperty(`transition`);let r=t.querySelectorAll(`span.char`);for(let e=0;e<r.length;e+=1){let t=r[e];t.style.removeProperty(`background-color`),t.style.removeProperty(`transition`),t.style.removeProperty(`will-change`)}}})}static unfinishSyllables(e){if(!e)return;e.classList.remove(`persist-highlight`);let t=e.getElementsByClassName(`lyrics-syllable`);for(let e=0;e<t.length;e+=1){let n=t[e];n.classList.remove(`highlight`,`finished`,`pre-highlight`,`cleanup`),n.style.animation=``,n.style.removeProperty(`--pre-wipe-duration`),n.style.removeProperty(`--pre-wipe-delay`),n.style.removeProperty(`background-color`),n.style.removeProperty(`transition`);let r=n.querySelectorAll(`span.char`);for(let e=0;e<r.length;e+=1){let t=r[e];t.style.animation=``,t.style.removeProperty(`will-change`),t.style.removeProperty(`background-color`),t.style.removeProperty(`transition`),t.style.removeProperty(`filter`)}}}static finishSyllablesUpToTime(t,n){if(!t)return;let r=!1,i=t._cachedSyllableElements;if(!i){i=Array.from(t.querySelectorAll(`.lyrics-syllable`));for(let e=0;e<i.length;e+=1){let t=i[e];t._cachedStartTime=parseFloat(t.getAttribute(`data-start-time`)||`0`),t._cachedEndTime=parseFloat(t.getAttribute(`data-end-time`)||`0`)}t._cachedSyllableElements=i}for(let t=0;t<i.length;t+=1){let a=i[t],o=a._cachedStartTime;if(Number.isFinite(o)&&n>=o){let{classList:t}=a;t.contains(`finished`)||(t.contains(`highlight`)||e.updateSyllableAnimation(a,Math.max(0,n-o)),t.add(`finished`)),r=!0,t.remove(`highlight`),t.remove(`pre-highlight`),t.add(`cleanup`),a.style.animation=``,a.style.removeProperty(`--pre-wipe-duration`),a.style.removeProperty(`--pre-wipe-delay`);let i=a.querySelectorAll(`span.char`);for(let e=0;e<i.length;e+=1){let t=i[e],n=t.style.animation||``;if(n.includes(`grow-dynamic`)||n.includes(`rise-char`)){let e=n.split(`,`).map(e=>e.trim()).find(e=>e.includes(`grow-dynamic`)||e.includes(`rise-char`));t.style.animation=e||``}else t.style.animation=``}}}r?t.classList.add(`persist-highlight`):t.classList.remove(`persist-highlight`)}static updateSyllablesForLine(t,n){let r=t._cachedSyllableElements;if(!r){r=Array.from(t.querySelectorAll(`.lyrics-syllable`));for(let e=0;e<r.length;e+=1){let t=r[e];t._cachedStartTime=parseFloat(t.getAttribute(`data-start-time`)||`0`),t._cachedEndTime=parseFloat(t.getAttribute(`data-end-time`)||`0`)}t._cachedSyllableElements=r}for(let t=0;t<r.length;t+=1){let i=r[t],a=i._cachedStartTime,o=i._cachedEndTime;if(Number.isFinite(a)&&Number.isFinite(o)){let{classList:s}=i,c=s.contains(`highlight`),l=s.contains(`finished`),u=s.contains(`pre-highlight`),d=c||l||u;if(!(n<a-1e3&&!d)){let d=!1;u&&t>0&&(r[t-1].classList.contains(`highlight`)||(s.remove(`pre-highlight`),i.style.removeProperty(`--pre-wipe-duration`),i.style.removeProperty(`--pre-wipe-delay`),i.style.animation=``,d=!0)),d||(n>=a&&n<=o?(c||e.updateSyllableAnimation(i,n-a),l&&s.remove(`finished`)):n>o?l||(c||e.updateSyllableAnimation(i,n-a),s.add(`finished`)):(c||l)&&e.resetSyllable(i))}}}}animateProgress(){let e=performance.now(),t=!1;if(!this.lyrics||this.activeLineIndices.length===0){this.animationFrameId&&=(cancelAnimationFrame(this.animationFrameId),void 0);return}for(let n of this.activeLineIndices){let r=this.lyrics[n],i=this.mainWordAnimations.get(n);if(i&&i.duration>0){let a=e-i.startTime;if(a>=0){let e=Math.min(1,a/i.duration);if(this.mainWordProgress.set(n,e),e<1)t=!0;else{let e=this.activeMainWordIndices.get(n)??-1,i=e+1;if(e!==-1&&i<r.text.length){let a=r.text[e],o=r.text[i];this.activeMainWordIndices.set(n,i);let s=o.timestamp-a.endtime,c=o.endtime-o.timestamp;this.mainWordAnimations.set(n,{startTime:performance.now()+s,duration:c}),t=!0}else this.mainWordAnimations.set(n,{startTime:0,duration:0})}}else this.mainWordProgress.set(n,0),t=!0}let a=this.backgroundWordAnimations.get(n);if(a&&a.duration>0){let i=e-a.startTime;if(i>=0){let e=Math.min(1,i/a.duration);if(this.backgroundWordProgress.set(n,e),e<1)t=!0;else{let e=this.activeBackgroundWordIndices.get(n)??-1;if(r.backgroundText&&e!==-1&&e<r.backgroundText.length-1){let i=e+1,a=r.backgroundText[e],o=r.backgroundText[i];this.activeBackgroundWordIndices.set(n,i);let s=o.timestamp-a.endtime,c=o.endtime-o.timestamp;this.backgroundWordAnimations.set(n,{startTime:performance.now()+s,duration:c}),t=!0}else this.backgroundWordAnimations.set(n,{startTime:0,duration:0})}}else this.backgroundWordProgress.set(n,0),t=!0}}t?this.animationFrameId=requestAnimationFrame(this._boundAnimateProgress):this.animationFrameId&&=(cancelAnimationFrame(this.animationFrameId),void 0)}generateLRC(){if(!this.lyrics)return``;let t=``;this.songTitle&&(t+=`[ti:${this.songTitle}]\n`),this.songArtist&&(t+=`[ar:${this.songArtist}]\n`),this.songAlbum&&(t+=`[al:${this.songAlbum}]\n`),this.lyricsSource&&(t+=`[re:${this.lyricsSource}]\n`);for(let n of this.lyrics)if(n.text&&n.text.length>0){let r=e.formatTimestampLRC(n.timestamp),i=n.text.map(e=>e.text).join(``).trim();t+=`[${r}]${i}\n`}return t}generateTTML(){if(!this.lyrics)return``;let t=`<?xml version="1.0" encoding="UTF-8"?>
`;t+=`<tt xmlns="http://www.w3.org/ns/ttml" xmlns:itunes="http://music.apple.com/lyrics">
`,t+=`  <body>
`;let n;for(let r=0;r<this.lyrics.length;r+=1){let i=this.lyrics[r],a=i.songPart;(a!==n||r===0)&&(r>0&&(t+=`    </div>
`),n=a,n?t+=`    <div itunes:song-part="${n}">\n`:t+=`    <div>
`);let o=e.formatTimestampTTML(i.timestamp),s=e.formatTimestampTTML(i.endtime);t+=`      <p begin="${o}" end="${s}">\n`;for(let n of i.text){let r=e.formatTimestampTTML(n.timestamp),i=e.formatTimestampTTML(n.endtime),a=n.text.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`);t+=`        <span begin="${r}" end="${i}">${a}</span>\n`}t+=`      </p>
`}return this.lyrics.length>0&&(t+=`    </div>
`),t+=`  </body>
`,t+=`</tt>`,t}static formatTimestampLRC(e){let t=e/1e3,n=Math.floor(t/60),r=Math.floor(t%60),i=Math.floor(e%1e3/10),a=e=>e.toString().padStart(2,`0`);return`${a(n)}:${a(r)}.${a(i)}`}static formatTimestampTTML(e){let t=e/1e3,n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=Math.floor(t%60),a=Math.floor(e%1e3),o=(e,t=2)=>e.toString().padStart(t,`0`);return`${o(n)}:${o(r)}:${o(i)}.${o(a,3)}`}downloadLyrics(){if(!this.lyrics||this.lyrics.length===0)return;let e=this.lyrics.some(e=>e.isWordSynced!==!1),t=``,n=this.downloadFormat;n===`auto`&&(n=e?`ttml`:`lrc`);let r=``;if(n===`ttml`?(t=this.generateTTML(),r=`application/xml`):(t=this.generateLRC(),r=`text/plain`),!t)return;let i=new Blob([t],{type:r}),a=URL.createObjectURL(i),o=document.createElement(`a`);o.href=a,o.download=this.songTitle?`${this.songTitle}${this.songArtist?` - ${this.songArtist}`:``}.${n}`:`lyrics.${n}`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(a)}render(){this.fontFamily&&(this.style.fontFamily=this.fontFamily),this.style.setProperty(`--highlight-color`,this.highlightColor);let t=this.lyricsSource??`Unavailable`;return L`
      <div
        class="lyrics-container ${this.cachedIsUnsynced?`is-unsynced`:`blur-inactive-enabled`}"
      >
        ${!this.isLoading&&this.lyrics&&this.lyrics.length>0?L`
              <div class="lyrics-header">
                <div class="header-controls">
                  <button
                    class="download-button ${this.showRomanization?`active`:``}"
                    @click=${this.toggleRomanization}
                    title="Toggle Romanization"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-speech-icon lucide-speech"
                    >
                      <path
                        d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"
                      />
                      <path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" />
                      <path d="M17 15a3.5 3.5 0 0 0-.025-4.975" />
                    </svg>
                  </button>
                  <button
                    class="download-button ${this.showTranslation?`active`:``}"
                    @click=${this.toggleTranslation}
                    title="Toggle Translation"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-languages-icon lucide-languages"
                    >
                      <path d="m5 8 6 6" />
                      <path d="m4 14 6-6 2-3" />
                      <path d="M2 5h12" />
                      <path d="M7 2h1" />
                      <path d="m22 22-5-10-5 10" />
                      <path d="M14 18h6" />
                    </svg>
                  </button>
                </div>
                <div class="download-controls">
                  <select
                    class="format-select"
                    @change=${e=>{this.downloadFormat=e.target.value}}
                    .value=${this.downloadFormat}
                    @click=${e=>e.stopPropagation()}
                  >
                    <option value="auto">Auto</option>
                    <option value="lrc">LRC</option>
                    <option value="ttml">TTML</option>
                  </select>
                  <button
                    class="download-button"
                    @click=${this.downloadLyrics}
                    title="Download Lyrics"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-download-icon lucide-download"
                    >
                      <path d="M12 15V3" />
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <path d="m7 10 5 5 5-5" />
                    </svg>
                  </button>
                </div>
              </div>
            `:``}
        ${(()=>{if(this.isLoading)return L`
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        `;if(!this.lyrics||this.lyrics.length===0)return L`<div class="no-lyrics">No lyrics found.</div>`;let t=this.findAllInstrumentalGaps(),n=new Map(t.map(e=>[e.insertBeforeIndex,e]));return this.lyrics.map((t,r)=>{let i=`lyrics-line-${r}`,a=t.text[0]?.timestamp||0,o=t.text[t.text.length-1]?.endtime||0,s=t.backgroundText&&t.backgroundText.length>0,c=s?L`<p class="background-vocal-container">
              <span class="background-vocal-wrap">
                ${t.backgroundText.map((e,t)=>{let n=e.timestamp,r=e.endtime,i=r-n,a=this.showRomanization&&e.romanizedText&&e.romanizedText.trim()!==e.text.trim()?L`<span
                          class="lyrics-syllable transliteration no-chars ${e.lineSynced?`line-synced`:``}"
                          data-start-time="${n}"
                          data-end-time="${r}"
                          data-duration="${i}"
                          data-syllable-index="0"
                          data-wipe-ratio="1"
                          >${e.romanizedText}</span
                        >`:``;return L`<span class="lyrics-word"
                    ><span
                      class="lyrics-syllable-wrap${a?` has-transliteration`:``}"
                      ><span
                        class="lyrics-syllable no-chars${e.lineSynced?` line-synced`:``}"
                        data-start-time="${n}"
                        data-end-time="${r}"
                        data-duration="${i}"
                        data-syllable-index="${t}"
                        data-wipe-ratio="1"
                        >${e.text}</span
                      >${a}</span
                    ></span
                  >`})}
              </span>
            </p>`:``,l=s?e.getBackgroundTextPlacement(t):`after`,u=this.cachedLineData?.[r],d=u?.wordGroups??[],f=u?.groupGrowable??[],p=u?.groupGlowing??[],m=u?.groupCharRise??[],h=u?.vwFullText??[],g=u?.vwFullDuration??[],_=u?.vwCharOffset??[],v=u?.vwStartMs??[],y=u?.vwEndMs??[],b=u?.lineIsRTL??!1,x=L`<p
          class="main-vocal-container ${b?`rtl-text`:``}"
        >
          ${d.map((e,t)=>{let n=f[t],i=p[t],a=m[t],o=n||a,s=e.some(e=>e.lineSynced),c=o?h[t]:``,l=o?g[t]:0,u=c.length,d=o?_[t]:0,b=o?`${r}:${v[t]}:${y[t]}`:``,x=o?v[t]:``,S=o?y[t]:``,C=0,w=e.map(e=>e.text).join(``),T=w.trim().length>=16||/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/.test(w),E=e[0].timestamp,D=e[e.length-1].endtime-E,O=Math.max(1.2,Math.min(2.5,1.2+D/1e3*.6));return L`<span
              class="lyrics-word${n?` growable`:``}${a?` char-rise`:``}${i?` glowing`:``}${T?` allow-break`:``}"
              data-virtual-word-id="${b}"
              data-virtual-word-start="${x}"
              data-virtual-word-end="${S}"
              style="--rise-duration: ${O}s"
              >${e.map((e,t)=>{let n=e.timestamp,r=e.endtime,a=r-n,c=e.text||``,f=this.showRomanization&&e.romanizedText&&e.romanizedText.trim()!==e.text.trim()?L`<span
                        class="lyrics-syllable transliteration no-chars ${s?`line-synced`:``}"
                        data-start-time="${n}"
                        data-end-time="${r}"
                        data-duration="${a}"
                        data-syllable-index="0"
                        data-wipe-ratio="1"
                        >${e.romanizedText}</span
                      >`:``,p=c;if(o){let e=0,t=c.replace(/\s/g,``).length||1;p=L`${c.split(``).map(n=>{if(n===` `)return` `;let r=d+C,o=e/t;C+=1,e+=1;let s=Math.min(1,Math.max(0,(l-400)/2600))**3,c=u>5,f=l<1200,p=0;if(c||f){let e=0;c&&(e+=Math.min((u-5)/5,1)*.4),f&&u>3?e+=Math.max(0,1-(l-800)/400)*.3:f&&u<=3&&(e+=Math.max(0,1-(l-800)/400)*.1),p=Math.min(e,.7)}let m=s*(1-(u>1?r/(u-1):0)*p),h=1+(u<=3?.05:.04)+m*.08,g=Math.min(1.1,l/1500),_=1;u<=3?_=.85:u>=6&&(_=1.1);let v=g*_,y=i?(.35+m*.45)*v:0,b=(h-1)/.1,x=(l+a*2)/3,S=Math.min(1,Math.max(.3,x/2e3)),w=-b*(2*S),T=((r+.5)/u-.5)*2*((h-1)*25);return L`<span
                      class="char"
                      data-char-index="${r}"
                      data-syllable-char-index="${r}"
                      data-wipe-start="${o.toFixed(4)}"
                      data-wipe-duration="${(1/t).toFixed(4)}"
                      data-horizontal-offset="${T.toFixed(2)}"
                      data-max-scale="${h.toFixed(3)}"
                      data-matrix-scale="${(h*.98).toFixed(3)}"
                      data-char-offset-x="${(T*.98).toFixed(2)}"
                      data-shadow-intensity="${y.toFixed(3)}"
                      data-translate-y-peak="${w.toFixed(3)}"
                      >${n}</span
                    >`})}`}return L`<span
                  class="lyrics-syllable-wrap${f?` has-transliteration`:``}"
                  ><span
                    class="lyrics-syllable${s?` line-synced`:``}${o?` has-chars`:` no-chars`}"
                    data-start-time="${n}"
                    data-end-time="${r}"
                    data-duration="${a}"
                    data-word-duration="${l}"
                    data-syllable-index="${t}"
                    data-wipe-ratio="1"
                    >${p}</span
                  >${f}</span
                >`})}</span
            >`})}
        </p>`,S=t.text.map(e=>e.text).join(``).trim(),C=this.showTranslation&&t.translation&&t.translation.trim()!==S?L`<div class="lyrics-translation-container">
                ${t.translation}
              </div>`:``,w=this.showRomanization&&t.romanizedText&&!t.text.some(e=>e.romanizedText)&&t.romanizedText.trim()!==S?L`<div
                class="lyrics-romanization-container ${b?`rtl-text`:``}"
              >
                ${t.romanizedText}
              </div>`:``,T=null,E=n.get(r);if(E){let t=E.gapEnd-E.gapStart,n=t/3,i=e.getGapLoopDelay(t);T=L`<div
            id="gap-${r}"
            class="lyrics-line lyrics-gap"
            data-start-time="${E.gapStart}"
            data-end-time="${E.gapEnd}"
            style="--gap-pulse-duration: ${Me}ms; --gap-loop-delay: -${i}ms; --gap-exit-duration: ${Z}ms; --gap-exit-scale: ${Ne};"
          >
            <p class="main-vocal-container">
              <span class="lyrics-word"
                ><span class="lyrics-syllable-wrap"
                  ><span
                    class="lyrics-syllable"
                    data-start-time="${E.gapStart}"
                    data-end-time="${E.gapStart+n}"
                    data-duration="${n}"
                    data-wipe-ratio="1"
                    data-syllable-index="0"
                  ></span></span
                ><span class="lyrics-syllable-wrap"
                  ><span
                    class="lyrics-syllable"
                    data-start-time="${E.gapStart+n}"
                    data-end-time="${E.gapStart+n*2}"
                    data-duration="${n}"
                    data-wipe-ratio="1"
                    data-syllable-index="1"
                  ></span></span
                ><span class="lyrics-syllable-wrap"
                  ><span
                    class="lyrics-syllable"
                    data-start-time="${E.gapStart+n*2}"
                    data-end-time="${E.gapEnd}"
                    data-duration="${n}"
                    data-wipe-ratio="1"
                    data-syllable-index="2"
                  ></span></span
              ></span>
            </p>
          </div>`}return L`
          ${T}
          <div
            id="${i}"
            class="lyrics-line ${t.alignment===`end`?`singer-right`:`singer-left`} ${b?`rtl-text`:``}"
            data-start-time="${a}"
            data-end-time="${o}"
            @click=${()=>this.handleLineClick(t)}
            tabindex="0"
            @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&this.handleLineClick(t)}}
          >
            <div class="lyrics-line-container ${b?`rtl-text`:``}">
              ${l===`before`?c:``}
              ${x}
              ${l===`after`?c:``}
              ${w} ${C}
            </div>
          </div>
        `})})()}
        ${this.isLoading?``:L`
              <footer class="lyrics-footer lyrics-line">
                <div class="footer-content">
                  <span
                    class="source-info"
                    style="display: flex; align-items: center; gap: 8px;"
                  >
                    <b style="font-weight: 750;">Source</b> ${t}
                    ${this.availableSources&&this.availableSources.length>1||!this.hasFetchedAllProviders?L`
                          <button
                            class="download-button source-switch-btn"
                            title="Switch Lyrics Source"
                            style="font-family: inherit; font-size: 11px; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.2); background: transparent; cursor: pointer; color: #aaa; display: inline-flex; align-items: center;"
                            @click=${this.switchSource}
                            ?disabled=${this.isFetchingAlternatives}
                          >
                            <svg
                              class="source-switch-svg lucide lucide-arrow-down-up-icon lucide-arrow-down-up"
                              style="margin-right: 4px;"
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              ${this.isFetchingAlternatives?ue`<path
                                    d="M21 12a9 9 0 1 1-6.219-8.56"
                                  ></path>`:ue`<path d="m3 16 4 4 4-4"></path
                                    ><path d="M7 20V4"></path
                                    ><path d="m21 8-4-4-4 4"></path
                                    ><path d="M17 4v16"></path>`}
                            </svg>
                            <span class="source-switch-label"
                              >${this.isFetchingAlternatives?`Switching...`:`Switch`}</span
                            >
                          </button>
                        `:``}
                  </span>
                  ${this.songwriters?L`<span
                        class="songwriters-info"
                        style="margin-top: 4px; font-weight: normal; font-size: 0.9em;"
                      >
                        <b style="font-weight: 750;">Songwriters</b> ${this.songwriters}
                      </span>`:``}
                  <span class="version-info" style="margin-top: 8px;">
                    <b style="font-weight: 750;">am-lyrics</b> v${Oe} •

                    <a
                      href="https://github.com/uimaxbai/apple-music-web-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="display: inline-flex; align-items: center; gap: 4px;"
                      >Star me on GitHub
                    </a>
                  </span>
                </div>
              </footer>
            `}
      </div>
    `}};$.styles=s`
    /* ==========================================================================
       YOULYPLUS-INSPIRED STYLING - Design Tokens & Variables
       ========================================================================== */
    :host {
      --lyplus-lyrics-palette: var(
        --am-lyrics-highlight-color,
        var(--highlight-color, #ffffff)
      );
      --lyplus-text-primary: var(--lyplus-lyrics-palette);
      /* Use color-mix with the text color rather than just opacity so it adapts */
      --lyplus-text-secondary: color-mix(
        in srgb,
        var(--lyplus-lyrics-palette),
        transparent 45%
      );

      --lyplus-padding-base: 1em;
      --lyplus-padding-line: 10px;
      --lyplus-padding-gap: 0.3em;
      --lyplus-border-radius-base: 0.6em;
      --lyplus-gap-dot-size: 0.4em;
      --lyplus-gap-dot-margin: 0.08em;

      --lyplus-font-size-base: 32px;
      --lyplus-font-size-base-grow: 24.5;
      --lyplus-font-size-subtext: 0.6em;
      --char-rise-y: calc(-0.035 * var(--lyplus-font-size-base));

      --lyplus-blur-amount: 0.07em;
      --lyplus-blur-amount-near: 0.035em;
      --lyplus-fade-gap-timing-function: ease-out;

      --lyrics-scroll-padding-top: 25%;

      display: block;
      font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
        Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background: transparent;
      height: 100%;
      overflow: hidden;
      font-weight: bold;
      color: var(--lyplus-text-primary);
    }

    /* ==========================================================================
       CONTAINER & SCROLL BEHAVIOR
       ========================================================================== */
    .lyrics-container {
      padding: 20px;
      padding-top: 80px;
      border-radius: 8px;
      background-color: transparent;
      width: 100%;
      height: 100%;
      max-height: 100vh;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      scrollbar-width: none;
      overflow-anchor: none;
    }

    .lyrics-container::-webkit-scrollbar {
      display: none;
    }

    /* Disable transitions during touch-scrolling for 1:1 feedback */
    .lyrics-container.touch-scrolling .lyrics-line,
    .lyrics-container.touch-scrolling .lyrics-plus-metadata {
      transition: none !important;
      filter: none !important;
    }

    /* Apply smooth gliding transition for mouse-wheel scrolling */
    .lyrics-container.wheel-scrolling .lyrics-line {
      transition: transform 0.3s ease-out !important;
      filter: none !important;
    }

    .lyrics-line.scroll-animate {
      /* Preserve the graceful fade duration; the keyframe handles the
         transform, so we only need to keep opacity/filter transitions
         alive without !important overriding the base rule. */
      transition:
        opacity 0.7s ease,
        filter 0.7s ease,
        transform 0.4s cubic-bezier(0.41, 0, 0.12, 0.99)
          var(--lyrics-line-delay, 0ms);
      animation-name: lyrics-scroll;
      animation-duration: var(--scroll-duration, 400ms);
      animation-timing-function: cubic-bezier(0.41, 0, 0.12, 0.99);
      animation-fill-mode: both;
      animation-delay: var(--lyrics-line-delay, 0ms);
    }

    .lyrics-container.user-scrolling .lyrics-line {
      --lyrics-line-delay: 0ms !important;
      transition-delay: 0ms !important;
    }

    /* ==========================================================================
       LYRICS LINE BASE STYLES
       ========================================================================== */
    .lyrics-line {
      padding: var(--lyplus-padding-line);
      opacity: 0.8;
      color: var(--lyplus-text-secondary);
      font-size: var(--lyplus-font-size-base);
      cursor: pointer;
      transform-origin: left;
      /* Graceful 0.7 s fade so the line stays mostly bright while the
         0.4 s scroll animation runs, then settles into the inactive state. */
      transition:
        opacity 0.7s ease,
        transform 0.4s cubic-bezier(0.41, 0, 0.12, 0.99)
          var(--lyrics-line-delay, 0ms),
        filter 0.7s ease;
      content-visibility: auto;
      contain: layout style;
      text-rendering: optimizeLegibility;
    }

    .lyrics-line:not(.scroll-animate) {
      animation: none;
    }

    /* --- Line Container & Vocal Containers --- */
    .lyrics-line-container {
      overflow-wrap: break-word;
      transform-origin: left;
      transform: translateZ(0);
      transition:
        transform 0.7s ease,
        background-color 0.7s,
        color 0.7s;
    }

    .lyrics-line.active .lyrics-line-container,
    .lyrics-line.pre-active .lyrics-line-container {
      transform: translateZ(0);
      transition:
        transform 0.5s ease,
        background-color 0.18s,
        color 0.18s;
    }

    .main-vocal-container {
      transform-origin: 5% 50%;
      margin: 0;
    }

    .background-vocal-container {
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      font-size: var(--lyplus-font-size-subtext);
      line-height: 1.15;
      color: color-mix(in srgb, var(--lyplus-text-secondary) 80%, transparent);
      transition:
        max-height var(--scroll-duration, 400ms)
          cubic-bezier(0.41, 0, 0.12, 0.99),
        opacity var(--scroll-duration, 400ms) cubic-bezier(0.41, 0, 0.12, 0.99);
      margin: 0;
      pointer-events: none;
    }

    .background-vocal-wrap {
      display: block;
      padding-top: 0;
      padding-bottom: 0;
      transition: padding-top var(--scroll-duration, 400ms)
        cubic-bezier(0.41, 0, 0.12, 0.99);
    }

    .lyrics-line.singer-right .background-vocal-container,
    .lyrics-line.rtl-text .background-vocal-container {
      margin-left: auto;
      margin-right: 0;
    }

    /* Background vocals expand only when .bg-expanded is present.
       This is separate from .active so bg vocals can collapse immediately
       while .active stays to keep text white until the scroll passes. */
    .lyrics-line.bg-expanded .background-vocal-container {
      max-height: 4em;
      opacity: 1;
      will-change: max-height, opacity;
    }

    .lyrics-line.bg-expanded .background-vocal-wrap {
      padding-top: 0.26em;
    }

    /* --- Line States & Modifiers --- */
    .lyrics-line.active {
      opacity: 1;
      color: var(--lyplus-text-primary);
    }

    .lyrics-line.pre-active {
      opacity: 1;
    }

    .lyrics-line.persist-highlight {
      filter: none !important;
      opacity: 1;
    }

    .lyrics-line.persist-highlight .lyrics-syllable.finished,
    .lyrics-line.persist-highlight .lyrics-syllable.finished span.char {
      transition: none !important;
    }

    .lyrics-line.singer-right {
      text-align: end;
    }

    .lyrics-line.singer-right .lyrics-line-container,
    .lyrics-line.singer-right .main-vocal-container {
      transform-origin: right;
    }

    .lyrics-line.rtl-text {
      direction: rtl;
      text-align: right !important;
      transform-origin: right;
    }

    .lyrics-line.rtl-text .lyrics-line-container,
    .lyrics-line.rtl-text .main-vocal-container {
      transform-origin: right;
    }

    .lyrics-line.rtl-text .lyrics-romanization-container,
    .lyrics-line.rtl-text .lyrics-translation-container {
      text-align: right;
    }

    /* --- Unsynced (Plain Text) Lyrics Overrides --- */
    .lyrics-container.is-unsynced .lyrics-line {
      opacity: 1 !important;
      color: var(--lyplus-text-primary) !important;
      filter: none !important;
      transform: none !important;
      cursor: default;
    }

    .lyrics-container.is-unsynced .lyrics-line-container {
      transform: none !important;
      background-color: transparent !important;
    }

    .lyrics-container.is-unsynced .lyrics-syllable {
      color: var(--lyplus-text-primary) !important;
      background-color: transparent !important;
      -webkit-background-clip: unset !important;
      background-clip: unset !important;
      -webkit-text-fill-color: unset !important;
      text-fill-color: unset !important;
      text-shadow: none !important;
      filter: none !important;
      opacity: 1 !important;
      transform: none !important;
    }

    @media (hover: hover) and (pointer: fine) {
      .lyrics-line:hover {
        filter: none !important;
        opacity: 1 !important;
      }
      .lyrics-container.is-unsynced .lyrics-line:hover {
        background: transparent !important;
      }
    }

    /* --- Blur Effect for Inactive Lines --- */
    .lyrics-container.blur-inactive-enabled:not(.not-focused)
      .lyrics-line:not(.active):not(.pre-active):not(.lyrics-gap):not(
        .persist-highlight
      ) {
      filter: blur(var(--lyplus-blur-amount));
    }

    /* Viewport Virtualization: Strip expensive filters and animations from
       offscreen lines.  IntersectionObserver toggles this class. */
    .lyrics-line.far-line {
      filter: none !important;
      will-change: auto !important;
      animation: none !important;
    }

    .lyrics-container.blur-inactive-enabled:not(.not-focused)
      .lyrics-line.post-active-line:not(.lyrics-gap):not(.active):not(
        .pre-active
      ):not(.persist-highlight),
    .lyrics-container.blur-inactive-enabled:not(.not-focused)
      .lyrics-line.next-active-line:not(.lyrics-gap):not(.active):not(
        .pre-active
      ):not(.persist-highlight),
    .lyrics-container.blur-inactive-enabled:not(.not-focused)
      .lyrics-line.lyrics-activest:not(.active):not(.lyrics-gap):not(
        .pre-active
      ):not(.persist-highlight) {
      filter: blur(var(--lyplus-blur-amount-near));
    }

    /* Unblur all lines when user is scrolling */
    .lyrics-container.user-scrolling .lyrics-line {
      transition: none !important;
      filter: none !important;
      opacity: 0.8 !important;
    }

    /* Unblur early for pre-active lines */
    .lyrics-container.blur-inactive-enabled .lyrics-line.pre-active {
      filter: blur(0px) !important;
      opacity: 1;
    }

    /* ==========================================================================
       WORD & SYLLABLE STYLES
       ========================================================================== */
    .lyrics-word:not(.allow-break) {
      display: inline-block;
      vertical-align: baseline;
      white-space: nowrap;
    }

    .lyrics-word.allow-break {
      display: inline;
    }

    .lyrics-word.char-rise {
      display: inline-block;
      vertical-align: baseline;
      white-space: nowrap;
    }

    .lyrics-word.char-rise.allow-break {
      display: inline;
      white-space: normal;
    }

    .lyrics-syllable-wrap {
      display: inline;
    }

    .lyrics-syllable-wrap.has-transliteration {
      display: inline-flex;
      flex-direction: column;
      align-items: start;
    }

    .lyrics-syllable {
      display: inline-block;
      vertical-align: baseline;
      color: transparent;
      background-color: var(--lyplus-text-secondary);
      white-space: pre-wrap;
      font-variant-ligatures: none;
      font-feature-settings: 'liga' 0;
      background-clip: text;
      -webkit-background-clip: text;
      transition:
        color 0.7s,
        background-color 0.7s,
        transform 0.7s ease;
    }

    /* --- Syllable States --- */
    .lyrics-syllable.finished {
      background-color: var(--lyplus-text-primary);
      /* Unified transition: transform keeps its 1s glow decay, while
         background-color and color fade at 0.7s so everything dims
         together when the line becomes inactive. */
      transition:
        transform 1s ease,
        background-color 0.7s ease,
        color 0.7s ease;
    }

    .lyrics-syllable.finished.has-chars {
      background-color: transparent;
    }

    .lyrics-line.active:not(.lyrics-gap) .lyrics-syllable {
      transition:
        transform 1s ease,
        background-color 0.5s,
        color 0.5s;
    }

    /* --- Wipe Highlight Effect --- */
    .lyrics-line.active:not(.lyrics-gap) .lyrics-syllable.highlight.no-chars,
    .lyrics-line.active:not(.lyrics-gap)
      .lyrics-syllable.pre-highlight.no-chars {
      background-repeat: no-repeat;
      background-image:
        linear-gradient(
          90deg,
          #ffffff00 0%,
          var(--lyplus-text-primary, #fff) 50%,
          #0000 100%
        ),
        linear-gradient(
          90deg,
          var(--lyplus-text-primary, #fff) 100%,
          #0000 100%
        );
      background-size:
        0.5em 100%,
        0% 100%;
      background-position:
        -0.5em 0%,
        -0.25em 0%;
    }

    .lyrics-line.active:not(.lyrics-gap) .lyrics-syllable.highlight.rtl-text,
    .lyrics-line.active:not(.lyrics-gap)
      .lyrics-syllable.pre-highlight.rtl-text {
      direction: rtl;
      background-image:
        linear-gradient(
          -90deg,
          var(--lyplus-text-primary) 0%,
          transparent 100%
        ),
        linear-gradient(
          -90deg,
          var(--lyplus-text-primary) 100%,
          transparent 100%
        );
      background-position:
        calc(100% + 0.5em) 0%,
        right 0%;
    }

    /* Background vocals: muted gray wipe instead of white.
       Must match specificity of the main .active .highlight rule (0,3,1). */
    .lyrics-line.active
      .background-vocal-container
      .lyrics-syllable.highlight.no-chars,
    .lyrics-line.active
      .background-vocal-container
      .lyrics-syllable.pre-highlight.no-chars,
    .lyrics-line.pre-active
      .background-vocal-container
      .lyrics-syllable.highlight.no-chars,
    .lyrics-line.pre-active
      .background-vocal-container
      .lyrics-syllable.pre-highlight.no-chars {
      background-image:
        linear-gradient(
          90deg,
          #ffffff00 0%,
          color-mix(in srgb, var(--lyplus-text-primary, #fff) 50%, #888888) 50%,
          #0000 100%
        ),
        linear-gradient(
          90deg,
          color-mix(in srgb, var(--lyplus-text-primary, #fff) 50%, #888888) 100%,
          #0000 100%
        );
    }

    .lyrics-line.active
      .background-vocal-container
      .lyrics-syllable.highlight.rtl-text,
    .lyrics-line.active
      .background-vocal-container
      .lyrics-syllable.pre-highlight.rtl-text,
    .lyrics-line.pre-active
      .background-vocal-container
      .lyrics-syllable.highlight.rtl-text,
    .lyrics-line.pre-active
      .background-vocal-container
      .lyrics-syllable.pre-highlight.rtl-text {
      background-image:
        linear-gradient(
          -90deg,
          color-mix(in srgb, var(--lyplus-text-primary) 50%, #888888) 0%,
          transparent 100%
        ),
        linear-gradient(
          -90deg,
          color-mix(in srgb, var(--lyplus-text-primary) 50%, #888888) 100%,
          transparent 100%
        );
    }

    /* Non-growable words float up with a gentle curve */
    .lyrics-line.active:not(.lyrics-gap)
      .lyrics-word:not(.growable)
      .lyrics-syllable.highlight {
      transform: translate3d(0, var(--char-rise-y, -1.12px), 0);
    }

    .lyrics-line.persist-highlight:not(.lyrics-gap)
      .lyrics-word:not(.growable)
      .lyrics-syllable.finished {
      transform: translate3d(0, var(--char-rise-y, -1.12px), 0);
    }

    .lyrics-word.growable .lyrics-syllable.cleanup .char {
      transform: translate3d(0, var(--char-rise-y, -1.12px), 0);
    }

    .lyrics-word.char-rise .lyrics-syllable.cleanup .char {
      transform: translate3d(0, var(--char-rise-y, -1.12px), 0);
    }

    .lyrics-line.persist-highlight
      .lyrics-word.growable
      .lyrics-syllable.finished
      .char,
    .lyrics-line.persist-highlight
      .lyrics-word.char-rise
      .lyrics-syllable.finished
      .char {
      transform: translate3d(0, var(--char-rise-y, -1.12px), 0);
    }

    /* Background vocal overrides — placed AFTER main rules so they win
       on equal specificity. */
    .background-vocal-container .lyrics-syllable {
      background-color: color-mix(
        in srgb,
        var(--lyplus-text-secondary) 50%,
        #888888
      );
    }

    .lyrics-line.active:not(.lyrics-gap)
      .background-vocal-container
      .lyrics-syllable.finished,
    .lyrics-line.pre-active
      .background-vocal-container
      .lyrics-syllable.finished {
      background-color: color-mix(
        in srgb,
        var(--lyplus-text-primary) 50%,
        #888888
      );
    }

    .background-vocal-container .lyrics-syllable.line-synced {
      color: color-mix(
        in srgb,
        var(--lyplus-text-secondary) 50%,
        #888888
      ) !important;
    }

    .lyrics-line.active:not(.lyrics-gap)
      .background-vocal-container
      .lyrics-syllable.line-synced,
    .lyrics-line.pre-active
      .background-vocal-container
      .lyrics-syllable.line-synced {
      color: color-mix(
        in srgb,
        var(--lyplus-text-primary) 50%,
        #888888
      ) !important;
    }

    .lyrics-line.active:not(.lyrics-gap)
      .background-vocal-container
      .lyrics-syllable.line-synced.finished,
    .lyrics-line.pre-active
      .background-vocal-container
      .lyrics-syllable.line-synced.finished {
      color: color-mix(
        in srgb,
        var(--lyplus-text-primary) 50%,
        #888888
      ) !important;
    }

    .lyrics-syllable.pre-highlight {
      animation-name: pre-wipe-universal;
      animation-duration: var(--pre-wipe-duration);
      animation-delay: var(--pre-wipe-delay);
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }

    .lyrics-syllable.pre-highlight.rtl-text {
      animation-name: pre-wipe-universal-rtl;
    }

    .lyrics-syllable.transliteration {
      font-size: var(--lyplus-font-size-subtext);
      white-space: pre-wrap;
      pointer-events: none;
      user-select: none;
    }

    /* Syllable with chars: make syllable transparent, chars handle color */
    .lyrics-line .lyrics-syllable.has-chars:not(.finished) {
      background-color: transparent;
      color: transparent;
    }

    .lyrics-syllable span.char {
      display: inline-block;
      background-color: var(--lyplus-text-secondary);
      white-space: break-spaces;
      font-variant-ligatures: none;
      font-feature-settings: 'liga' 0;
      background-clip: text;
      -webkit-background-clip: text;
      backface-visibility: hidden;
      transform-origin: 50% 80%;
      transition:
        color 0.7s,
        background-color 0.7s,
        transform 0.7s ease;
    }

    .lyrics-syllable.finished span.char {
      background-color: var(--lyplus-text-primary);
      transition:
        color 0.7s,
        background-color 0.7s,
        transform 0.7s ease;
    }

    /* Active char spans: structural only, wipe animation sets gradient */
    .lyrics-line.active .lyrics-syllable span.char {
      background-clip: text;
      -webkit-background-clip: text;
      background-repeat: no-repeat;
      background-image:
        linear-gradient(
          90deg,
          #ffffff00 0%,
          var(--lyplus-text-primary, #fff) 50%,
          #0000 100%
        ),
        linear-gradient(
          90deg,
          var(--lyplus-text-primary, #fff) 100%,
          #0000 100%
        );
      background-size:
        0.5em 100%,
        0% 100%;
      background-position:
        -0.5em 0%,
        -0.25em 0%;
      transition:
        transform 0.7s ease,
        color 0.18s;
    }

    .lyrics-line.active .lyrics-syllable span.char.highlight {
      background-image:
        linear-gradient(
          -90deg,
          var(--lyplus-text-primary, #fff) 0%,
          #0000 100%
        ),
        linear-gradient(
          -90deg,
          var(--lyplus-text-primary, #fff) 100%,
          #0000 100%
        );
      background-position:
        calc(100% + 0.5em) 0%,
        calc(100% + 0.25em) 0%;
    }

    .lyrics-line.active .lyrics-syllable.pre-highlight span.char {
      background-image:
        linear-gradient(
          90deg,
          #ffffff00 0%,
          var(--lyplus-text-primary, #fff) 50%,
          #0000 100%
        ),
        linear-gradient(
          90deg,
          var(--lyplus-text-primary, #fff) 100%,
          #0000 100%
        );
      background-size:
        0.75em 100%,
        0% 100%;
      background-position:
        -0.85em 0%,
        -0.25em 0%;
    }

    /* ==========================================================================
       INSTRUMENTAL GAP STYLES
       ========================================================================== */
    .lyrics-gap {
      max-height: 1.6em;
      padding: var(--lyplus-padding-gap);
      overflow: visible;
      opacity: 0;
      box-sizing: content-box;
      background-clip: unset;
      transform-origin: top;
      content-visibility: visible !important;
      contain: none !important;
      transition:
        opacity 160ms ease-out,
        transform var(--scroll-duration, 280ms) var(--lyrics-line-delay, 0ms);
    }

    .lyrics-gap.active {
      opacity: 1;
      transition:
        opacity 160ms ease-out,
        transform var(--scroll-duration, 280ms);
    }

    /* Exiting state: quickly collapse width and height so dots don't distort page, or remove max-height transition */
    .lyrics-gap.gap-exiting {
      opacity: 1;
    }

    .lyrics-gap .main-vocal-container {
      transform: translateY(-25%) scale(1);
      transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .lyrics-gap:not(.active):not(.gap-exiting) .main-vocal-container {
      transform: translateY(-25%) scale(0);
    }

    /* Pulse — must come BEFORE .gap-exiting so exiting wins via specificity+order */
    .lyrics-gap.active .main-vocal-container {
      animation: gap-loop var(--gap-pulse-duration, 4000ms) ease-in-out infinite
        alternate;
      animation-delay: var(--gap-loop-delay, 0ms);
    }

    /* Jump animation plays during exit — disable transition so animation wins.
       Placed AFTER .active so it wins when both classes are present briefly. */
    .lyrics-gap.gap-exiting .main-vocal-container {
      animation: gap-ended var(--gap-exit-duration, 360ms)
        cubic-bezier(0.33, 1, 0.68, 1) forwards;
      transition: none !important;
    }

    .lyrics-gap .lyrics-syllable {
      display: inline-block;
      width: var(--lyplus-gap-dot-size);
      height: var(--lyplus-gap-dot-size);
      background-color: var(--lyplus-text-primary);
      border-radius: 50%;
      margin: 0 var(--lyplus-gap-dot-margin);
    }

    /* Line-synced lyrics should fade in instantly/quickly instead of wiping */
    .lyrics-syllable.line-synced {
      background: transparent !important;
      color: var(--lyplus-text-secondary) !important;
    }

    .lyrics-line.active .lyrics-syllable.line-synced {
      animation: fade-in-line 0.2s ease-out forwards !important;
      color: var(--lyplus-text-primary) !important;
    }

    .lyrics-line.pre-active .lyrics-syllable.line-synced {
      animation: fade-in-line 0.14s ease-out forwards !important;
      color: var(--lyplus-text-primary) !important;
    }

    .lyrics-line.active .lyrics-syllable.line-synced span.char,
    .lyrics-line.pre-active .lyrics-syllable.line-synced span.char {
      background-image: none !important;
      background-color: var(--lyplus-text-primary) !important;
      transition: background-color 120ms ease-out !important;
    }

    @keyframes fade-in-line {
      from {
        opacity: 0.5;
        color: var(--lyplus-text-secondary);
      }
      to {
        opacity: 1;
        color: var(--lyplus-lyrics-palette);
      }
    }

    .lyrics-gap .lyrics-syllable {
      background-color: var(--lyplus-text-secondary);
      background-clip: unset;
    }

    .lyrics-gap.active .lyrics-syllable.finished,
    .lyrics-gap.gap-exiting .lyrics-syllable.finished,
    .lyrics-gap:not(.active):not(.gap-exiting).post-active-line
      .lyrics-syllable,
    .lyrics-gap:not(.active):not(.gap-exiting).lyrics-activest
      .lyrics-syllable {
      background-color: var(--lyplus-text-primary);
      animation: none !important;
      opacity: 1;
    }

    /* ==========================================================================
       METADATA & FOOTER STYLES
       ========================================================================== */
    .lyrics-plus-metadata {
      display: block;
      position: relative;
      box-sizing: border-box;
      font-weight: normal;
      transform: translateY(var(--lyrics-scroll-offset, 0px));
      transition:
        opacity 0.3s ease,
        transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)
          var(--lyrics-line-delay, 0ms),
        filter 0.3s ease;
    }

    .lyrics-plus-empty {
      display: block;
      height: 100vh;
      transform: translateY(var(--lyrics-scroll-offset, 0px));
    }

    .lyrics-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      text-align: left;
      font-size: calc(var(--lyplus-font-size-base) * 0.5);
      color: var(--lyplus-text-secondary);
      padding: 20px 0 50vh 0;
      margin-top: 10px;
      font-weight: 400;
      opacity: 0.8;
      transition:
        opacity 0.3s ease,
        transform 0.5s cubic-bezier(0.41, 0, 0.12, 0.99),
        filter 0.3s ease;
      transform-origin: left;
    }

    .lyrics-footer.lyrics-line {
      font-size: calc(var(--lyplus-font-size-base) * 0.5);
      padding: 20px var(--lyplus-padding-line) 50vh var(--lyplus-padding-line);
      margin-top: 0;
    }

    .lyrics-footer.active {
      opacity: 1;
      color: rgba(255, 255, 255, 0.5); /* Grey instead of primary */
    }

    .lyrics-footer.scroll-animate {
      transition: none !important;
      animation-name: lyrics-scroll;
      animation-duration: var(--scroll-duration, 280ms);
      animation-timing-function: cubic-bezier(0.41, 0, 0.12, 0.99);
      animation-fill-mode: both;
      animation-delay: var(--lyrics-line-delay, 0ms);
    }

    .lyrics-container.blur-inactive-enabled:not(.not-focused)
      .lyrics-footer:not(.active) {
      filter: blur(var(--lyplus-blur-amount));
      opacity: 0.5;
    }

    .lyrics-container.user-scrolling .lyrics-footer {
      transition: none !important;
      filter: none !important;
      opacity: 0.8 !important;
    }

    .lyrics-footer p {
      margin: 5px 0;
    }

    .lyrics-footer a {
      color: var(--lyplus-text-primary); /* Stand out using primary color */
      text-underline-offset: 2px;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .lyrics-footer a:hover {
      opacity: 1;
    }

    .footer-content {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 8px;
    }

    .footer-controls {
      display: flex;
      align-items: center;
    }

    /* ==========================================================================
       HEADER & CONTROLS
       ========================================================================== */
    .lyrics-header {
      display: flex;
      padding: 10px 0;
      margin-bottom: 10px;
      gap: 10px;
      justify-content: space-between;
      align-items: center;
    }

    .lyrics-header .download-button {
      background: none;
      border: none;
      cursor: pointer;
      color: #aaa;
      padding: 0;
      margin-left: 10px;
      vertical-align: middle;
      display: inline-flex;
      align-items: center;
      font-family: inherit;
    }

    .lyrics-header .download-button:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    .header-controls {
      display: flex;
      gap: 8px;
    }

    .download-controls {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .control-button {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      padding: 2px 8px;
      font-size: 0.8em;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      transition: all 0.2s;
      font-weight: normal;
    }

    .control-button:hover {
      color: rgba(255, 255, 255, 0.9);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .control-button.active {
      background-color: var(--lyplus-text-primary);
      border-color: var(--lyplus-text-primary);
      color: #000;
    }

    .format-select {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.8em;
      margin-left: 10px;
      padding: 2px 5px;
      cursor: pointer;
      font-weight: normal;
      font-family: inherit;
    }

    .format-select:hover {
      color: rgba(255, 255, 255, 0.9);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .format-select option {
      background: #1a1a1a;
      color: #fff;
    }

    /* ==========================================================================
       TRANSLATION & ROMANIZATION
       ========================================================================== */
    .lyrics-translation-container,
    .lyrics-romanization-container {
      padding-top: 0.2em;
      opacity: 0.8;
      font-size: var(--lyplus-font-size-subtext);
      overflow-wrap: break-word;
      pointer-events: none;
      user-select: none;
      transition:
        opacity 0.3s ease,
        color 0.3s;
      font-weight: normal;
    }

    .lyrics-romanization-container {
      direction: ltr !important;
    }

    .lyrics-romanization-container.rtl-text {
      direction: rtl !important;
      text-align: right;
    }

    .lyrics-romanization-container .lyrics-syllable {
      white-space: pre-wrap;
    }

    .lyrics-translation-container {
      opacity: 0.5;
    }

    .main-line-wrapper.small {
      font-size: 0.5em;
      opacity: 0.8;
      display: block;
      margin-bottom: 0px;
    }

    .translation-line {
      font-size: 1em;
      font-weight: bold;
      display: block;
      margin-top: 0px;
      line-height: 1.1;
    }

    .romanized-line {
      font-size: 0.5em;
      color: rgba(255, 255, 255, 0.5);
      display: block;
      margin-top: 2px;
      font-weight: normal;
    }

    /* ==========================================================================
       SKELETON LOADING
       ========================================================================== */
    @keyframes skeleton-loading {
      0% {
        background-color: rgba(255, 255, 255, 0.1);
      }
      100% {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }

    .skeleton-line {
      height: 2.5em;
      margin: 20px 0;
      border-radius: 8px;
      animation: skeleton-loading 1s linear infinite alternate;
      opacity: 0.7;
      width: 60%;
    }

    .skeleton-line:nth-child(even) {
      width: 80%;
    }
    .skeleton-line:nth-child(3n) {
      width: 50%;
    }
    .skeleton-line:nth-child(5n) {
      width: 70%;
    }

    .no-lyrics {
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.2em;
      text-align: center;
      padding: 2em;
      font-weight: normal;
    }

    /* ==========================================================================
       KEYFRAME ANIMATIONS
       ========================================================================== */

    /* Wipe animation for syllables */
    @keyframes wipe {
      from {
        background-size:
          0.75em 100%,
          0% 100%;
        background-position:
          -0.375em 0%,
          left;
      }
      to {
        background-size:
          0.75em 100%,
          100% 100%;
        background-position:
          calc(100% + 0.375em) 0%,
          left;
      }
    }

    @keyframes start-wipe {
      0% {
        background-size:
          0.75em 100%,
          0% 100%;
        background-position:
          -0.75em 0%,
          -0.375em 0%;
      }
      100% {
        background-size:
          0.75em 100%,
          100% 100%;
        background-position:
          calc(100% + 0.375em) 0%,
          left;
      }
    }

    @keyframes wipe-rtl {
      from {
        background-size:
          0.75em 100%,
          0% 100%;
        background-position:
          calc(100% + 0.375em) 0%,
          calc(100% + 0.36em) 0%;
      }
      to {
        background-size:
          0.75em 100%,
          100% 100%;
        background-position:
          -0.75em 0%,
          right 0%;
      }
    }

    @keyframes start-wipe-rtl {
      0% {
        background-size:
          0.75em 100%,
          0% 100%;
        background-position:
          calc(100% + 0.75em) 0%,
          calc(100% + 0.5em) 0%;
      }
      100% {
        background-size:
          0.75em 100%,
          100% 100%;
        background-position:
          -0.75em 0%,
          right 0%;
      }
    }

    @keyframes pre-wipe-universal {
      from {
        background-size:
          0.75em 100%,
          0% 100%;
        background-position:
          -0.75em 0%,
          left;
      }
      to {
        background-size:
          0.75em 100%,
          0% 100%;
        background-position:
          -0.375em 0%,
          left;
      }
    }

    @keyframes pre-wipe-universal-rtl {
      from {
        background-size:
          0.75em 100%,
          0% 100%;
        background-position:
          calc(100% + 0.75em) 0%,
          right 0%;
      }
      to {
        background-size:
          0.75em 100%,
          0% 100%;
        background-position:
          calc(100% + 0.375em) 0%,
          right 0%;
      }
    }

    @keyframes pre-wipe-char {
      from {
        background-size:
          0.75em 100%,
          0% 100%;
        background-position:
          -0.75em 0%,
          left;
      }
      to {
        background-size:
          0.75em 100%,
          0% 100%;
        background-position:
          -0.375em 0%,
          left;
      }
    }

    /* Gap dot animations */
    @keyframes gap-loop {
      from {
        transform: translateY(-25%) scale(1.12);
      }
      to {
        transform: translateY(-25%) scale(var(--gap-exit-scale, 0.85));
      }
    }

    @keyframes gap-ended {
      0% {
        transform: translateY(-25%) scale(var(--gap-exit-scale, 0.85));
      }
      35% {
        transform: translateY(-25%) scale(1.2);
      }
      100% {
        transform: translateY(-25%) scale(0);
      }
    }

    @keyframes fade-gap {
      from {
        background-color: var(--lyplus-text-secondary);
      }
      to {
        background-color: var(--lyplus-text-primary);
      }
    }

    /* Scroll animation — class is removed and re-added (with a forced
       reflow in between) to reliably restart the animation each time */
    @keyframes lyrics-scroll {
      from {
        transform: translate3d(0, var(--scroll-delta), 0);
      }
      to {
        transform: translate3d(0, 0, 0);
      }
    }

    /* Character grow animation — translate3d+scale3d for smooth transform,
       drop-shadow for glow */
    @keyframes grow-dynamic {
      0% {
        transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
        filter: drop-shadow(
          0 0 0
            color-mix(in srgb, var(--lyplus-lyrics-palette), transparent 100%)
        );
      }
      25%,
      30% {
        transform: translate3d(
            var(--char-offset-x, 0px),
            var(--translate-y-peak, -2px),
            0
          )
          scale3d(var(--matrix-scale, 1.1), var(--matrix-scale, 1.1), 1);
        filter: drop-shadow(
          0 0 0.1em
            color-mix(
              in srgb,
              var(--lyplus-lyrics-palette),
              transparent calc((1 - var(--shadow-intensity, 1)) * 100%)
            )
        );
      }
      75%,
      100% {
        transform: translate3d(0, var(--char-rise-y, -1.12px), 0)
          scale3d(1, 1, 1);
        filter: drop-shadow(
          0 0 0
            color-mix(in srgb, var(--lyplus-lyrics-palette), transparent 100%)
        );
      }
    }

    @keyframes rise-char {
      0% {
        transform: translate3d(0, 0, 0);
      }
      65%,
      100% {
        transform: translate3d(0, var(--char-rise-y, -1.12px), 0);
      }
    }

    @keyframes grow-static {
      0%,
      100% {
        transform: scale3d(1.01, 1.01, 1.1) translateY(-0.05%);
        text-shadow: 0 0 0
          color-mix(in srgb, var(--lyplus-lyrics-palette), transparent 100%);
      }
      30%,
      40% {
        transform: scale3d(1.1, 1.1, 1.1) translateY(-0.05%);
        text-shadow: 0 0 0.3em
          color-mix(in srgb, var(--lyplus-lyrics-palette), transparent 50%);
      }
    }

    /* Fade in animation */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 0.7;
        transform: translateY(0);
      }
    }

    /* Legacy support */
    .opposite-turn {
      text-align: right;
    }

    .singer-right {
      text-align: right;
      justify-content: flex-end;
    }

    .singer-left {
      text-align: left;
      justify-content: flex-start;
    }

    /* Legacy progress-text for backward compatibility */
    .progress-text {
      position: relative;
      display: inline-block;
      background: linear-gradient(
        to right,
        var(--lyplus-text-primary) 0%,
        var(--lyplus-text-primary) var(--line-progress, 0%),
        var(--lyplus-text-secondary) var(--line-progress, 0%),
        var(--lyplus-text-secondary) 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: var(--lyplus-text-secondary);
      transform: translate3d(0, 0, 0);
      will-change: background-size;
    }

    .progress-text::before {
      display: none;
    }

    .active-line {
      font-weight: bold;
    }

    .background-text {
      display: block;
      color: var(--lyplus-text-secondary);
      font-size: 0.8em;
      font-style: normal;
      margin: 0;
      flex-shrink: 0;
      line-height: 1.1;
    }

    .background-text.before {
      order: -1;
    }

    .background-text.after {
      order: 1;
    }

    .instrumental-line {
      display: inline-flex;
      align-items: baseline;
      gap: 8px;
      color: var(--lyplus-text-secondary);
      font-size: 0.9em;
      padding: 4px 10px;
      animation: fadeInUp 220ms ease;
      font-weight: normal;
    }

    .instrumental-duration {
      color: var(--lyplus-text-secondary);
      font-size: 0.8em;
    }
  `,e([K({type:String})],$.prototype,`query`,void 0),e([K({type:String})],$.prototype,`musicId`,void 0),e([K({type:String})],$.prototype,`isrc`,void 0),e([K({type:String})],$.prototype,`ttml`,void 0),e([K({type:String,attribute:`song-title`})],$.prototype,`songTitle`,void 0),e([q()],$.prototype,`downloadFormat`,void 0),e([K({type:String,attribute:`song-artist`})],$.prototype,`songArtist`,void 0),e([K({type:String,attribute:`song-album`})],$.prototype,`songAlbum`,void 0),e([K({type:String,attribute:`songwriters`})],$.prototype,`songwriters`,void 0),e([K({type:Number,attribute:`song-duration`})],$.prototype,`songDurationMs`,void 0),e([K({type:String,attribute:`highlight-color`})],$.prototype,`highlightColor`,void 0),e([K({type:String,attribute:`font-family`})],$.prototype,`fontFamily`,void 0),e([K({type:Boolean})],$.prototype,`autoScroll`,void 0),e([K({type:Boolean})],$.prototype,`interpolate`,void 0),e([q()],$.prototype,`showRomanization`,void 0),e([q()],$.prototype,`showTranslation`,void 0),e([K({type:Number})],$.prototype,`duration`,void 0),e([K({type:Number,attribute:`currenttime`,hasChanged:()=>!1})],$.prototype,`currentTime`,null),e([q()],$.prototype,`isLoading`,void 0),e([q()],$.prototype,`lyrics`,void 0),e([q()],$.prototype,`lyricsSource`,void 0),e([q()],$.prototype,`availableSources`,void 0),e([q()],$.prototype,`currentSourceIndex`,void 0),e([Ee(`.lyrics-container`)],$.prototype,`lyricsContainer`,void 0),window.customElements.define(`am-lyrics`,$);