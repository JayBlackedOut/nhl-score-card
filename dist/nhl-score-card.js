/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(i,t,s)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const a=window,d=a.trustedTypes,h=d?d.emptyScript:"",c=a.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p},$="finalized";let _=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty($))return!1;this[$]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var s;const i=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{e?s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):i.forEach(e=>{const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,s.appendChild(i)})})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=v){var i;const o=this.constructor._$Ep(t,s);if(void 0!==o&&!0===s.reflect){const n=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:u).toAttribute(e,s.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=i.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:u;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;_[$]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:_}),(null!==(l=a.reactiveElementVersions)&&void 0!==l?l:a.reactiveElementVersions=[]).push("1.6.3");const f=window,g=f.trustedTypes,A=g?g.createPolicy("lit-html",{createHTML:t=>t}):void 0,y="$lit$",b=`lit$${(Math.random()+"").slice(9)}$`,E="?"+b,S=`<${E}>`,w=document,x=()=>w.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,H="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,N=/>/g,R=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,k=/"/g,M=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),z=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),I=new WeakMap,D=w.createTreeWalker(w,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const V=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":"",r=O;for(let e=0;e<s;e++){const s=t[e];let l,a,d=-1,h=0;for(;h<s.length&&(r.lastIndex=h,a=r.exec(s),null!==a);)h=r.lastIndex,r===O?"!--"===a[1]?r=P:void 0!==a[1]?r=N:void 0!==a[2]?(M.test(a[2])&&(o=RegExp("</"+a[2],"g")),r=R):void 0!==a[3]&&(r=R):r===R?">"===a[0]?(r=null!=o?o:O,d=-1):void 0===a[1]?d=-2:(d=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?R:'"'===a[3]?k:T):r===k||r===T?r=R:r===P||r===N?r=O:(r=R,o=void 0);const c=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===O?s+S:d>=0?(i.push(l),s.slice(0,d)+y+s.slice(d)+b+c):s+b+(-2===d?(i.push(void 0),e):c)}return[B(t,n+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class W{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,l=this.parts,[a,d]=V(t,e);if(this.el=W.createElement(a,s),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=D.nextNode())&&l.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(y)||e.startsWith(b)){const s=d[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+y).split(b),e=/([.?@])?(.*)/.exec(s);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?K:"?"===e[1]?Z:"@"===e[1]?Q:J})}else l.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(M.test(i.tagName)){const t=i.textContent.split(b),e=t.length-1;if(e>0){i.textContent=g?g.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],x()),D.nextNode(),l.push({type:2,index:++o});i.append(t[e],x())}}}else if(8===i.nodeType)if(i.data===E)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(b,t+1));)l.push({type:7,index:o}),t+=b.length-1}o++}}static createElement(t,e){const s=w.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){var o,n,r,l;if(e===z)return e;let a=void 0!==i?null===(o=s._$Co)||void 0===o?void 0:o[i]:s._$Cl;const d=C(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(n=null==a?void 0:a._$AO)||void 0===n||n.call(a,!1),void 0===d?a=void 0:(a=new d(t),a._$AT(t,s,i)),void 0!==i?(null!==(r=(l=s)._$Co)&&void 0!==r?r:l._$Co=[])[i]=a:s._$Cl=a),void 0!==a&&(e=G(t,a._$AS(t,e.values),a,i)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:w).importNode(s,!0);D.currentNode=o;let n=D.nextNode(),r=0,l=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new X(n,this,t)),this._$AV.push(e),a=i[++l]}r!==(null==a?void 0:a.index)&&(n=D.nextNode(),r++)}return D.currentNode=w,o}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class q{constructor(t,e,s,i){var o;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),C(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>U(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==L&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(w.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=W.createElement(B(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(s);else{const t=new F(o,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new W(t)),e}T(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new q(this.k(x()),this.k(x()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,s,i,o){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=G(this,t,e,0),n=!C(t)||t!==this._$AH&&t!==z,n&&(this._$AH=t);else{const i=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=G(this,i[s+r],e,r),l===z&&(l=this._$AH[r]),n||(n=!C(l)||l!==this._$AH[r]),l===L?t=L:t!==L&&(t+=(null!=l?l:"")+o[r+1]),this._$AH[r]=l}n&&!i&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class K extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}const Y=g?g.emptyScript:"";class Z extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==L?this.element.setAttribute(this.name,Y):this.element.removeAttribute(this.name)}}class Q extends J{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=G(this,t,e,0))&&void 0!==s?s:L)===z)return;const i=this._$AH,o=t===L&&i!==L||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==L&&(i===L||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class X{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const tt=f.litHtmlPolyfillSupport;null==tt||tt(W,q),(null!==(m=f.litHtmlVersions)&&void 0!==m?m:f.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et,st;class it extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,o;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new q(e.insertBefore(x(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return z}}it.finalized=!0,it._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:it});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:it}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");customElements.define("nhl-score-card",class extends it{static get properties(){return{hass:{type:Object},config:{type:Object}}}setConfig(t){if(!t||!t.entity)throw new Error("You must define an entity.");this.config=t}getCardSize(){return 3}render(){if(!this.hass||!this.config)return j``;const t=this.config.entity,e=this.hass.states[t];if(!e)return j`<ha-card>Unknown entity: ${t}</ha-card>`;const s=String(e.state||"").toUpperCase(),i=e.attributes||{},o=this.hass.themes?.darkMode,n=i.away_name||"Away",r=o?i.away_logo_dark||i.away_logo:i.away_logo||null,l=i.away_score??"-",a=i.away_sog??"-",d=i.away_record||"",h=i.home_name||"Home",c=o?i.home_logo_dark||i.home_logo:i.home_logo||null,u=i.home_score??"-",p=i.home_sog??"-",v=i.home_record||"",$=[].concat(i.away_broadcasts||[]).concat(i.home_broadcasts||[]).concat(i.national_broadcasts||[]).filter(Boolean),_="LIVE"===s||"CRIT"===s,m="FINAL"===s||"OFF"===s||"OVER"===s,f=!_&&!m;if(_)return j`
        <ha-card class="card live">
          <div class="status-label ${i.is_intermission?"intermission-label":"live-label"}">
            ${i.current_period?1===i.current_period?"1ST":2===i.current_period?"2ND":3===i.current_period?"3RD":i.current_period_type:""} 
            ${i.is_intermission?" INT":""} 
            ${i.time_remaining?`• ${i.time_remaining}`:""}
          </div>

          <div class="teams">
            <!-- AWAY row -->
            <div class="team-row">
              <div class="left">
                ${r?j`<img class="logo" src="${r}" alt="${n} logo" />`:j`<div class="logo placeholder"></div>`}
                <div class="meta-left">
                  <div class="team-name">${n}</div>
                  <div class="team-sub">SOG: ${a}</div>
                </div>
              </div>
              <div class="score">${l}</div>
            </div>

            <!-- HOME row -->
            <div class="team-row">
              <div class="left">
                ${c?j`<img class="logo" src="${c}" alt="${h} logo" />`:j`<div class="logo placeholder"></div>`}
                <div class="meta-left">
                  <div class="team-name">${h}</div>
                  <div class="team-sub">SOG: ${p}</div>
                </div>
              </div>
              <div class="score">${u}</div>
            </div>
          </div>

          <div class="bottom">
            ${$.length?j`<div class="broadcasts">${$.join(" • ")}</div>`:""}
          </div>
        </ha-card>
      `;if(m)return j`
        <ha-card class="card final">
          <div class="status-label final-label">FINAL${"REG"===i.current_period_type?"":`"/"${i.current_period_type}`}</div>

          <div class="teams">
            <div class="team-row">
              <div class="left">
                ${r?j`<img class="logo" src="${r}" alt="${n} logo" />`:j``}
                <div class="meta-left">
                  <div class="team-name">${n}</div>
                  <div class="team-sub">SOG: ${a}</div>
                </div>
              </div>
              <div class="score">${l}</div>
            </div>

            <div class="team-row">
              <div class="left">
                ${c?j`<img class="logo" src="${c}" alt="${h} logo" />`:j``}
                <div class="meta-left">
                  <div class="team-name">${h}</div>
                  <div class="team-sub">SOG: ${p}</div>
                </div>
              </div>
              <div class="score">${u}</div>
            </div>
          </div>
        </ha-card>
      `;if(f){return j`
      <ha-card class="card scheduled">
        <div class="status-label final-label">${s||"NO GAME SCHEDULED"}</div>
          <div class="teams">
            <div class="team-row">
              <div class="left">
                ${r?j`<img class="logo" src="${r}" alt="${n} logo" />`:j``}
                <div class="meta-left">
                  <div class="team-name">${n}</div>
                  <div class="team-sub">(${d})</div>
                </div>
              </div>
            </div>

            <div class="team-row">
              <div class="left">
                ${c?j`<img class="logo" src="${c}" alt="${h} logo" />`:j``}
                <div class="meta-left">
                  <div class="team-name">${h}</div>
                  <div class="team-sub">(${v})</div>
                </div>
              </div>
            </div>
          </div>
        ${$.length?j`<div class="bottom">${$.join(" • ")}</div>`:""}
      </ha-card>
    `}}static get styles(){return n`
      :host { display: block; }
      ha-card.card {
        padding: 10px 14px;
        box-sizing: border-box;
        text-align: left;
        font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
        position: relative;
      }

      .status-label {
        position: absolute;
        top: 6px;
        left: 10px;
        font-size: 12px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 4px;
        color: white;
      }
      .live-label { background: #118010; }
      .intermission-label { background: #aa5500; }
      .final-label { background: #555; }

      .teams { 
        display: flex; 
        flex-direction: column;
        gap: 2px;
        margin-top: 20px;
      }

      .team-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2px 2px;
      }

      .left {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }

      .logo {
        width: 48px;
        height: 48px;
        object-fit: contain;
      }

      .meta-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .team-name {
        font-size: 14px;
        font-weight: 400;
      }

      .team-sub {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
      }

      .score {
        font-size: 36px;
        font-weight: 700;
        line-height: 1;
        color: var(--primary-text-color, #111);
        width: 70px;
        text-align: right;
      }

      .bottom {
        margin-top: 4px;
        text-align: center;
        font-size: 10px;
        color: var(--secondary-text-color, #666);
      }
    `}});
