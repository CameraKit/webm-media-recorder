!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.OpusMediaRecorder=t():e.OpusMediaRecorder=t()}("undefined"!=typeof self?self:this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){(function(t){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var s,a=e[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var u,l=n(2),p=l.EventTarget,f=l.defineEventAttribute,d=t.AudioContext||t.webkitAudioContext,h=4096,y=function(e){function n(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var i=r.mimeType,c=r.audioBitsPerSecond,u=(r.videoBitsPerSecond,r.bitsPerSecond),l=o.encoderWorkerFactory,p=o.OggOpusEncoderWasmPath,f=o.WebMOpusEncoderWasmPath;if((t=s(this,a(n).call(this)))._stream=e,t._state="inactive",t._mimeType=i||"",t._audioBitsPerSecond=c||u,t.workerState="inactive",!n.isTypeSupported(t._mimeType))throw new TypeError("invalid arguments, a MIME Type is not supported");switch(n._parseType(t._mimeType).subtype){case"wave":case"wav":t._mimeType="audio/wave",t._wasmPath="";break;case"webm":t._mimeType="audio/webm",t._wasmPath=f||"";break;case"ogg":default:t._mimeType="audio/ogg",t._wasmPath=p||""}var y="";document.currentScript?y=document.currentScript.src:self.location&&(y=self.location.href),y=y.substr(0,y.lastIndexOf("/"))+"/encoderWorker.umd.js","function"==typeof n.encoderWorker&&(y=URL.createObjectURL(new Blob(["(".concat(n.encoderWorker,")()")]))),t._workerFactory="function"==typeof l?l:function(e){return new Worker(y)},t._spawnWorker(),t.context=new d;var v=t.stream.getAudioTracks();if(!v[0])throw new Error("DOMException: UnkownError, media track not found.");return t.channelCount=v[0].getSettings().channelCount||1,t.sampleRate=t.context.sampleRate,t.source=t.context.createMediaStreamSource(t.stream),t.processor=t.context.createScriptProcessor(h,t.channelCount,t.channelCount),t}var r,u,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(n,p),r=n,l=[{key:"isTypeSupported",value:function(e){if("string"==typeof e&&!e)return!0;try{var t=n._parseType(e),r=t.type,o=t.subtype,i=t.codec}catch(e){return!1}if("audio"!==r||"ogg"!==o&&"webm"!==o&&"wave"!==o&&"wav"!==o)return!1;switch(o){case"ogg":case"webm":if("opus"!==i&&i)return!1;break;case"wave":case"wav":if(i)return!1}return!0}},{key:"_parseType",value:function(e){try{var t=o(e.match(/^(\w+)\/(\w+)(;\s*codecs=(\w+))?$/),5),n=t[1],r=t[2],i=t[4]}catch(t){return"string"!=typeof e||e?null:{type:"",subtype:"",codec:""}}return{type:n,subtype:r,codec:i}}}],(u=[{key:"_spawnWorker",value:function(){var e=this;this.worker=this._workerFactory(),this.worker.onmessage=function(t){return e._onmessageFromWorker(t)},this.worker.onerror=function(t){return e._onerrorFromWorker(t)},this._postMessageToWorker("loadEncoder",{mimeType:this._mimeType,wasmPath:this._wasmPath})}},{key:"_postMessageToWorker",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(e){case"loadEncoder":var r=n.mimeType,o=n.wasmPath;this.worker.postMessage({command:e,mimeType:r,wasmPath:o});break;case"init":var i=n.sampleRate,s=n.channelCount,a=n.bitsPerSecond;this.worker.postMessage({command:e,sampleRate:i,channelCount:s,bitsPerSecond:a}),this.workerState="encoding",this.source.connect(this.processor),this.processor.connect(this.context.destination);var c=new t.Event("start");this.dispatchEvent(c);break;case"pushInputData":var u=n.channelBuffers,l=n.length,p=n.duration;this.worker.postMessage({command:e,channelBuffers:u,length:l,duration:p},u.map(function(e){return e.buffer}));break;case"getEncodedData":case"done":this.worker.postMessage({command:e});break;default:throw new Error("Internal Error: Incorrect postMessage requested.")}}},{key:"_onmessageFromWorker",value:function(e){var n,r=e.data,o=r.command,i=r.buffers;switch(o){case"readyToInit":var s=this.sampleRate,a=this.channelCount;this.workerState="readyToInit","recording"===this.state&&this._postMessageToWorker("init",{sampleRate:s,channelCount:a,bitsPerSecond:this.audioBitsPerSecond});break;case"encodedData":case"lastEncodedData":var c=new Blob(i,{type:this._mimeType});(n=new t.Event("dataavailable")).data=c,this.dispatchEvent(n),"lastEncodedData"===o&&(n=new t.Event("stop"),this.dispatchEvent(n),this.workerState="closed")}}},{key:"_onerrorFromWorker",value:function(e){this.source.disconnect(),this.processor.disconnect(),this.worker.terminate(),this.workerState="closed";var n=["FileName: "+e.filename,"LineNumber: "+e.lineno,"Message: "+e.message].join(" - "),r=new t.Event("error");r.name="UnknownError",r.message=n,this.dispatchEvent(r)}},{key:"_enableAudioProcessCallback",value:function(e){var t=this,n=0;this.processor.onaudioprocess=function(r){for(var o=r.inputBuffer,i=(r.playbackTime,o.sampleRate,o.length),s=o.duration,a=o.numberOfChannels,c=new Array(a),u=0;u<a;u++)c[u]=o.getChannelData(u);var l={channelBuffers:c,length:i,duration:s};t._postMessageToWorker("pushInputData",l),(n+=s)>=e&&(t._postMessageToWorker("getEncodedData"),n=0)}}},{key:"start",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Number.MAX_SAFE_INTEGER;if("inactive"!==this.state)throw new Error("DOMException: INVALID_STATE_ERR, state must be inactive.");if(e<0)throw new TypeError("invalid arguments, timeslice should be 0 or higher.");if(e/=1e3,"closed"===this.workerState&&this._spawnWorker(),this._state="recording",this._enableAudioProcessCallback(e),"readyToInit"===this.workerState){var t=this.sampleRate,n=this.channelCount;this._postMessageToWorker("init",{sampleRate:t,channelCount:n,bitsPerSecond:this.audioBitsPerSecond})}}},{key:"stop",value:function(){if("inactive"===this.state)throw new Error("DOMException: INVALID_STATE_ERR, state must NOT be inactive.");this.source.disconnect(),this.processor.disconnect(),this._postMessageToWorker("done"),this._state="inactive"}},{key:"pause",value:function(){if("inactive"===this.state)throw new Error("DOMException: INVALID_STATE_ERR, state must NOT be inactive.");this.source.disconnect(),this.processor.disconnect();var e=new t.Event("pause");this.dispatchEvent(e),this._state="paused"}},{key:"resume",value:function(){if("inactive"===this.state)throw new Error("DOMException: INVALID_STATE_ERR, state must NOT be inactive.");this.source.connect(this.processor),this.processor.connect(this.context.destination);var e=new t.Event("resume");this.dispatchEvent(e),this._state="recording"}},{key:"requestData",value:function(){if("inactive"===this.state)throw new Error("DOMException: INVALID_STATE_ERR, state must NOT be inactive.");this._postMessageToWorker("getEncodedData")}},{key:"stream",get:function(){return this._stream}},{key:"mimeType",get:function(){return this._mimeType}},{key:"state",get:function(){return this._state}},{key:"videoBitsPerSecond",get:function(){}},{key:"audioBitsPerSecond",get:function(){return this._audioBitsPerSecond}}])&&i(r.prototype,u),l&&i(r,l),n}();["start","stop","dataavailable","pause","resume","error"].forEach(function(e){return f(y.prototype,e)}),/Edge/.test(navigator.userAgent)&&(u=Worker.prototype.postMessage,Worker.prototype.postMessage=function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1],u.apply(this,[e])}),e.exports={default:y}}).call(this,n(1))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";n.r(t),n.d(t,"defineEventAttribute",function(){return v}),n.d(t,"EventTarget",function(){return g});const r=new WeakMap,o=new WeakMap;function i(e){const t=r.get(e);return console.assert(null!=t,"'this' is expected an Event object, but got",e),t}function s(e,t){r.set(this,{eventTarget:e,event:t,eventPhase:2,currentTarget:e,canceled:!1,stopped:!1,passiveListener:null,timeStamp:t.timeStamp||Date.now()}),Object.defineProperty(this,"isTrusted",{value:!1,enumerable:!0});const n=Object.keys(t);for(let e=0;e<n.length;++e){const t=n[e];t in this||Object.defineProperty(this,t,a(t))}}function a(e){return{get(){return i(this).event[e]},set(t){i(this).event[e]=t},configurable:!0,enumerable:!0}}function c(e){return{value(){const t=i(this).event;return t[e].apply(t,arguments)},configurable:!0,enumerable:!0}}function u(e){if(null==e||e===Object.prototype)return s;let t=o.get(e);return null==t&&(t=function(e,t){const n=Object.keys(t);if(0===n.length)return e;function r(t,n){e.call(this,t,n)}r.prototype=Object.create(e.prototype,{constructor:{value:r,configurable:!0,writable:!0}});for(let o=0;o<n.length;++o){const i=n[o];if(!(i in e.prototype)){const e="function"==typeof Object.getOwnPropertyDescriptor(t,i).value;Object.defineProperty(r.prototype,i,e?c(i):a(i))}}return r}(u(Object.getPrototypeOf(e)),e),o.set(e,t)),t}function l(e){return i(e).stopped}function p(e,t){i(e).passiveListener=t}s.prototype={get type(){return i(this).event.type},get target(){return i(this).eventTarget},get currentTarget(){return i(this).currentTarget},composedPath(){const e=i(this).currentTarget;return null==e?[]:[e]},get NONE(){return 0},get CAPTURING_PHASE(){return 1},get AT_TARGET(){return 2},get BUBBLING_PHASE(){return 3},get eventPhase(){return i(this).eventPhase},stopPropagation(){const e=i(this);"function"==typeof e.event.stopPropagation&&e.event.stopPropagation()},stopImmediatePropagation(){const e=i(this);e.stopped=!0,"function"==typeof e.event.stopImmediatePropagation&&e.event.stopImmediatePropagation()},get bubbles(){return Boolean(i(this).event.bubbles)},get cancelable(){return Boolean(i(this).event.cancelable)},preventDefault(){const e=i(this);null==e.passiveListener?e.event.cancelable&&(e.canceled=!0,"function"==typeof e.event.preventDefault&&e.event.preventDefault()):console.warn("Event#preventDefault() was called from a passive listener:",e.passiveListener)},get defaultPrevented(){return i(this).canceled},get composed(){return Boolean(i(this).event.composed)},get timeStamp(){return i(this).timeStamp}},Object.defineProperty(s.prototype,"constructor",{value:s,configurable:!0,writable:!0}),"undefined"!=typeof window&&void 0!==window.Event&&(Object.setPrototypeOf(s.prototype,window.Event.prototype),o.set(window.Event.prototype,s));const f=new WeakMap,d=3;function h(e){return null!==e&&"object"==typeof e}function y(e){const t=f.get(e);if(null==t)throw new TypeError("'this' is expected an EventTarget object, but got another value.");return t}function v(e,t){Object.defineProperty(e,`on${t}`,function(e){return{get(){let t=y(this).get(e);for(;null!=t;){if(t.listenerType===d)return t.listener;t=t.next}return null},set(t){"function"==typeof t||h(t)||(t=null);const n=y(this);let r=null,o=n.get(e);for(;null!=o;)o.listenerType===d?null!==r?r.next=o.next:null!==o.next?n.set(e,o.next):n.delete(e):r=o,o=o.next;if(null!==t){const o={listener:t,listenerType:d,passive:!1,once:!1,next:null};null===r?n.set(e,o):r.next=o}},configurable:!0,enumerable:!0}}(t))}function m(e){function t(){g.call(this)}t.prototype=Object.create(g.prototype,{constructor:{value:t,configurable:!0,writable:!0}});for(let n=0;n<e.length;++n)v(t.prototype,e[n]);return t}function g(){if(!(this instanceof g)){if(1===arguments.length&&Array.isArray(arguments[0]))return m(arguments[0]);if(arguments.length>0){const e=new Array(arguments.length);for(let t=0;t<arguments.length;++t)e[t]=arguments[t];return m(e)}throw new TypeError("Cannot call a class as a function")}f.set(this,new Map)}g.prototype={addEventListener(e,t,n){if(null==t)return!1;if("function"!=typeof t&&!h(t))throw new TypeError("'listener' should be a function or an object.");const r=y(this),o=h(n),i=(o?Boolean(n.capture):Boolean(n))?1:2,s={listener:t,listenerType:i,passive:o&&Boolean(n.passive),once:o&&Boolean(n.once),next:null};let a=r.get(e);if(void 0===a)return r.set(e,s),!0;let c=null;for(;null!=a;){if(a.listener===t&&a.listenerType===i)return!1;c=a,a=a.next}return c.next=s,!0},removeEventListener(e,t,n){if(null==t)return!1;const r=y(this),o=(h(n)?Boolean(n.capture):Boolean(n))?1:2;let i=null,s=r.get(e);for(;null!=s;){if(s.listener===t&&s.listenerType===o)return null!==i?i.next=s.next:null!==s.next?r.set(e,s.next):r.delete(e),!0;i=s,s=s.next}return!1},dispatchEvent(e){if(null==e||"string"!=typeof e.type)throw new TypeError('"event.type" should be a string.');const t=y(this),n=e.type;let r=t.get(n);if(null==r)return!0;const o=function(e,t){return new(u(Object.getPrototypeOf(t)))(e,t)}(this,e);let s=null;for(;null!=r;){if(r.once?null!==s?s.next=r.next:null!==r.next?t.set(n,r.next):t.delete(n):s=r,p(o,r.passive?r.listener:null),"function"==typeof r.listener)try{r.listener.call(this,o)}catch(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e)}else r.listenerType!==d&&"function"==typeof r.listener.handleEvent&&r.listener.handleEvent(o);if(l(o))break;r=r.next}return p(o,null),function(e,t){i(e).eventPhase=t}(o,0),function(e,t){i(e).currentTarget=t}(o,null),!o.defaultPrevented}},Object.defineProperty(g.prototype,"constructor",{value:g,configurable:!0,writable:!0}),"undefined"!=typeof window&&void 0!==window.EventTarget&&Object.setPrototypeOf(g.prototype,window.EventTarget.prototype),t.default=g}]).default});