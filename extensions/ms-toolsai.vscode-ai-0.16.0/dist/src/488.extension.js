"use strict";exports.id=488,exports.ids=[488],exports.modules={71488:(e,n,t)=>{t.r(n),t.d(n,{BE_PROFILE:()=>y,NRT_PROFILE:()=>p,PostChannel:()=>oe,RT_PROFILE:()=>h});var i=t(27421),r=t(29141),a=t(81782),o=t(47954),u=t(87624),s=t(65705),c=t(24869),l=t(49251),f=t(28452),d=t(29339),v=t(87951),h="REAL_TIME",p="NEAR_REAL_TIME",y="BEST_EFFORT",m="POST",g="drop",b="send",S="requeue",T="rspFail",_="application/x-json-stream",x="cache-control",E="content-type",R="kill-duration",k="time-delta-millis",w="client-version",K="client-id",P="time-delta-to-apply-millis",O="upload-time",C="apikey",M="AuthMsaDeviceTicket",B="AuthXToken";function A(e){var n=(e.ext||{}).intweb;return n&&(0,s.Sn)(n.msfpc)?n.msfpc:null}function H(e){for(var n=null,t=0;null===n&&t<e.length;t++)n=A(e[t]);return n}var L=function(){function e(n,t){var i=t?[].concat(t):[],r=this,a=H(i);r.iKey=function(){return n},r.Msfpc=function(){return a||""},r.count=function(){return i.length},r.events=function(){return i},r.addEvent=function(e){return!!e&&(i.push(e),a||(a=A(e)),!0)},r.split=function(t,r){var o;if(t<i.length){var u=i.length-t;(0,c.le)(r)||(u=r<u?r:u),o=i.splice(t,u),a=H(i)}return new e(n,o)}}return e.create=function(n,t){return new e(n,t)},e}();const U=function(){function e(){var n=!0,t=!0,i=!0,a="use-collector-delta",o=!1;(0,r.Z)(e,this,(function(e){e.allowRequestSending=function(){return n},e.firstRequestSent=function(){i&&(i=!1,o||(n=!1))},e.shouldAddClockSkewHeaders=function(){return t},e.getClockSkewHeaderValue=function(){return a},e.setClockSkew=function(e){o||(e?(a=e,t=!0,o=!0):t=!1,n=!0)}}))}return e.__ieDyn=1,e}();const q=function(){function e(){var n={};(0,r.Z)(e,this,(function(e){e.setKillSwitchTenants=function(e,t){if(e&&t)try{var i=(o=e.split(","),u=[],o&&(0,c.tO)(o,(function(e){u.push((0,c.nd)(e))})),u);if("this-request-only"===t)return i;for(var r=1e3*parseInt(t,10),a=0;a<i.length;++a)n[i[a]]=(0,c.m6)()+r}catch(e){return[]}var o,u;return[]},e.isTenantKilled=function(e){var t=n,i=(0,c.nd)(e);return void 0!==t[i]&&t[i]>(0,c.m6)()||(delete t[i],!1)}}))}return e.__ieDyn=1,e}();var F=t(1550);function I(e){var n,t=Math.floor(1200*Math.random())+2400;return n=Math.pow(2,e)*t,Math.min(n,6e5)}var z,D=2e6,j=Math.min(D,65e3),N=/\./,X=function(){function e(n,t,i,o){var u="data",l="baseData",f=!!o,d=t,v={};(0,r.Z)(e,this,(function(e){function t(e,n,r,a,o,u,l){(0,c.rW)(e,(function(e,h){var p=null;if(h||(0,s.Sn)(h)){var y=r,m=e,g=o,b=n;if(f&&!a&&N.test(e)){var S=e.split("."),T=S.length;if(T>1){g&&(g=g.slice());for(var _=0;_<T-1;_++){var x=S[_];b=b[x]=b[x]||{},y+="."+x,g&&g.push(x)}m=S[T-1]}}var E=a&&function(e,n){var t=v[e];return void 0===t&&(e.length>=7&&(t=(0,c.xe)(e,"ext.metadata")||(0,c.xe)(e,"ext.web")),v[e]=t),t}(y);if(p=!E&&d&&d.handleField(y,m)?d.value(y,m,h,i):(0,s.yj)(m,h,i)){var R=p.value;if(b[m]=R,u&&u(g,m,p),l&&"object"==typeof R&&!(0,c.kJ)(R)){var k=g;k&&(k=k.slice()).push(m),t(h,R,y+"."+m,a,k,u,l)}}}}))}e.createPayload=function(e,n,t,i,r,a){return{apiKeys:[],payloadBlob:"",overflow:null,sizeExceed:[],failedEvts:[],batches:[],numEvents:0,retryCnt:e,isTeardown:n,isSync:t,isBeacon:i,sendType:a,sendReason:r}},e.appendPayload=function(t,i,r){var o=t&&i&&!t.overflow;return o&&(0,a.Lm)(n,(function(){return"Serializer:appendPayload"}),(function(){for(var n=i.events(),a=t.payloadBlob,o=t.numEvents,u=!1,s=[],l=[],f=t.isBeacon,d=f?65e3:3984588,v=f?j:D,h=0,p=0;h<n.length;){var y=n[h];if(y){if(o>=r){t.overflow=i.split(h);break}var m=e.getEventBlob(y);if(m&&m.length<=v){var g=m.length;if(a.length+g>d){t.overflow=i.split(h);break}a&&(a+="\n"),a+=m,++p>20&&(a.substr(0,1),p=0),u=!0,o++}else m?s.push(y):l.push(y),n.splice(h,1),h--}h++}if(s&&s.length>0&&t.sizeExceed.push(L.create(i.iKey(),s)),l&&l.length>0&&t.failedEvts.push(L.create(i.iKey(),l)),u){t.batches.push(i),t.payloadBlob=a,t.numEvents=o;var b=i.iKey();-1===(0,c.UA)(t.apiKeys,b)&&t.apiKeys.push(b)}}),(function(){return{payload:t,theBatch:{iKey:i.iKey(),evts:i.events()},max:r}})),o},e.getEventBlob=function(e){try{return(0,a.Lm)(n,(function(){return"Serializer.getEventBlob"}),(function(){var n={};n.name=e.name,n.time=e.time,n.ver=e.ver,n.iKey="o:"+(0,s.jM)(e.iKey);var i={},r=e.ext;r&&(n.ext=i,(0,c.rW)(r,(function(e,n){t(n,i[e]={},"ext."+e,!0,null,null,!0)})));var a=n.data={};a.baseType=e.baseType;var o=a.baseData={};return t(e.baseData,o,l,!1,[l],(function(e,n,t){J(i,e,n,t)}),true),t(e.data,a,u,!1,[],(function(e,n,t){J(i,e,n,t)}),true),JSON.stringify(n)}),(function(){return{item:e}}))}catch(e){return null}}}))}return e.__ieDyn=1,e}();function J(e,n,t,i){if(i&&e){var r=(0,s.Vv)(i.value,i.kind,i.propertyType);if(r>-1){var a=e.metadata;a||(a=e.metadata={f:{}});var o=a.f;if(o||(o=a.f={}),n)for(var u=0;u<n.length;u++){var l=n[u];o[l]||(o[l]={f:{}});var f=o[l].f;f||(f=o[l].f={}),o=f}o=o[t]={},(0,c.kJ)(i.value)?o.a={t:r}:o.t=r}}}var Q="&NoResponseBody=true",W=((z={})[1]=S,z[100]=S,z[200]="sent",z[8004]=g,z[8003]=g,z),V={},Z={};function Y(e,n,t){V[e]=n,!1!==t&&(Z[n]=e)}function $(e){try{return e.responseText}catch(e){}return""}function G(e,n){var t=!1;if(e&&n){var i=(0,c.FY)(e);if(i&&i.length>0)for(var r=n.toLowerCase(),a=0;a<i.length;a++){var o=i[a];if(o&&(0,c.nr)(n,o)&&o.toLowerCase()===r){t=!0;break}}}return t}function ee(e,n,t,i){n&&t&&t.length>0&&(i&&V[n]?(e.hdrs[V[n]]=t,e.useHdrs=!0):e.url+="&"+n+"="+t)}Y(M,M,!1),Y(w,w),Y(K,"Client-Id"),Y(C,C),Y(P,P),Y(O,O),Y(B,B);var ne=function(){function e(n,t,i,o,u){this._responseHandlers=[];var f,v,h,p,y,S,M,B="?cors=true&"+E.toLowerCase()+"="+_,A=new q,H=!1,L=new U,z=!1,D=0,j=!0,N=[],J={},V=[],Y=null,ne=!1,te=!1,ie=!1;(0,r.Z)(e,this,(function(e){var r=!0;function U(e,n){for(var t=0,i=null,r=0;null==i&&r<e.length;)1===(t=e[r])?(0,l.cp)()?i=q:(0,l.Z3)()&&(i=ae):2===t&&(0,l.JO)(n)?i=re:z&&3===t&&(0,l.MF)()&&(i=ue),r++;return i?{_transport:t,_isSync:n,sendPOST:i}:null}function q(e,n,t){var i=new XDomainRequest;i.open(m,e.urlString),e.timeout&&(i.timeout=e.timeout),i.onload=function(){var e=$(i);oe(n,200,{},e),be(e)},i.onerror=function(){oe(n,400,{})},i.ontimeout=function(){oe(n,500,{})},i.onprogress=function(){},t?i.send(e.data):u.set((function(){i.send(e.data)}),0)}function re(e,n,t){var i,a=e.urlString,o=!1,s=!1,l=((i={body:e.data,method:m}).Microsoft_ApplicationInsights_BypassAjaxInstrumentation=!0,i);t&&(l.keepalive=!0,2===e._sendReason&&(o=!0,a+=Q)),r&&(l.credentials="include"),e.headers&&(0,c.FY)(e.headers).length>0&&(l.headers=e.headers),fetch(a,l).then((function(e){var t={},i="",r=e.headers;r&&r.forEach((function(e,n){t[n]=e})),e.body&&e.text().then((function(e){i=e})),s||(s=!0,oe(n,e.status,t,i),be(i))})).catch((function(e){s||(s=!0,oe(n,0,{}))})),o&&!s&&(s=!0,oe(n,200,{})),!s&&e.timeout>0&&u.set((function(){s||(s=!0,oe(n,500,{}))}),e.timeout)}function ae(e,n,t){var i=e.urlString;function a(e,n,t){if(!e[t]&&n&&n.getResponseHeader){var i=n.getResponseHeader(t);i&&(e[t]=(0,c.nd)(i))}return e}function o(e){var n={};return e.getAllResponseHeaders?n=function(e){var n={};if((0,c.HD)(e)){var t=(0,c.nd)(e).split(/[\r\n]+/);(0,c.tO)(t,(function(e){if(e){var t=e.indexOf(": ");if(-1!==t){var i=(0,c.nd)(e.substring(0,t)).toLowerCase(),r=(0,c.nd)(e.substring(t+1));n[i]=r}else n[(0,c.nd)(e)]=1}}))}return n}(e.getAllResponseHeaders()):(n=a(n,e,k),n=a(n,e,R),n=a(n,e,"kill-duration-seconds")),n}function u(e,t){oe(n,e.status,o(e),t)}t&&e.disableXhrSync&&(t=!1);var l=(0,s.ot)(m,i,r,!0,t,e.timeout);(0,c.rW)(e.headers,(function(e,n){l.setRequestHeader(e,n)})),l.onload=function(){var e=$(l);u(l,e),be(e)},l.onerror=function(){u(l)},l.ontimeout=function(){u(l)},l.send(e.data)}function oe(e,n,t,i){try{e(n,t,i)}catch(e){(0,d.kP)(v,2,518,(0,l.eU)(e))}}function ue(e,n,t){var i=200,r=e._thePayload,a=e.urlString+Q;try{var o=(0,l.jW)();if(!o.sendBeacon(a,e.data))if(r){var u=[];(0,c.tO)(r.batches,(function(e){if(u&&e&&e.count()>0){for(var n=e.events(),t=0;t<n.length;t++)if(!o.sendBeacon(a,Y.getEventBlob(n[t]))){u.push(e.split(t));break}}else u.push(e.split(0))})),Se(u,8003,r.sendType,!0)}else i=0}catch(e){(0,d.jV)(v,"Failed to send telemetry using sendBeacon API. Ex:"+(0,l.eU)(e)),i=0}finally{oe(n,i,{},"")}}function se(e){return 2===e||3===e}function ce(e){return te&&se(e)&&(e=2),e}function le(){return!H&&D<t}function fe(){var e=V;return V=[],e}function de(e,n,t){var i=!1;return e&&e.length>0&&!H&&h[n]&&Y&&(i=0!==n||le()&&(t>0||L.allowRequestSending())),i}function ve(e){var n={};return e&&(0,c.tO)(e,(function(e,t){n[t]={iKey:e.iKey(),evts:e.events()}})),n}function he(e,t,i,r,o){if(e&&0!==e.length)if(H)Se(e,1,r);else{r=ce(r);try{var u=e,c=0!==r;(0,a.Lm)(p,(function(){return"HttpManager:_sendBatches"}),(function(a){a&&(e=e.slice(0));for(var u=[],f=null,d=(0,s.hK)(),v=h[r]||(c?h[1]:h[0]),p=(te||se(r)||v&&3===v._transport)&&!j&&z&&(0,l.MF)();de(e,r,t);){var y=e.shift();y&&y.count()>0&&(A.isTenantKilled(y.iKey())?u.push(y):(f=f||Y.createPayload(t,i,c,p,o,r),Y.appendPayload(f,y,n)?null!==f.overflow&&(e=[f.overflow].concat(e),f.overflow=null,me(f,d,(0,s.hK)(),o),d=(0,s.hK)(),f=null):(me(f,d,(0,s.hK)(),o),d=(0,s.hK)(),e=[y].concat(e),f=null)))}f&&me(f,d,(0,s.hK)(),o),e.length>0&&(V=e.concat(V)),Se(u,8004,r)}),(function(){return{batches:ve(u),retryCount:t,isTeardown:i,isSynchronous:c,sendReason:o,useSendBeacon:se(r),sendType:r}}),!c)}catch(e){(0,d.kP)(v,2,48,"Unexpected Exception sending batch: "+(0,l.eU)(e))}}}function pe(e,n){var t={url:B,hdrs:{},useHdrs:!1};n?(t.hdrs=(0,s.l7)(t.hdrs,J),t.useHdrs=(0,c.FY)(t.hdrs).length>0):(0,c.rW)(J,(function(e,n){Z[e]?ee(t,Z[e],n,!1):(t.hdrs[e]=n,t.useHdrs=!0)})),ee(t,K,"NO_AUTH",n),ee(t,w,s.vs,n);var i="";(0,c.tO)(e.apiKeys,(function(e){i.length>0&&(i+=","),i+=e})),ee(t,C,i,n),ee(t,O,(0,c.m6)().toString(),n);var r=function(e){for(var n=0;n<e.batches.length;n++){var t=e.batches[n].Msfpc();if(t)return encodeURIComponent(t)}return""}(e);if((0,s.Sn)(r)&&(t.url+="&ext.intweb.msfpc="+r),L.shouldAddClockSkewHeaders()&&ee(t,P,L.getClockSkewHeaderValue(),n),p.getWParam){var a=p.getWParam();a>=0&&(t.url+="&w="+a)}for(var o=0;o<N.length;o++)t.url+="&"+N[o].name+"="+N[o].value;return t}function ye(e,n,t){e[n]=e[n]||{},e[n][f.identifier]=t}function me(n,t,r,o){if(n&&n.payloadBlob&&n.payloadBlob.length>0){var u=!!e.sendHook,y=h[n.sendType];!se(n.sendType)&&n.isBeacon&&2===n.sendReason&&(y=h[2]||h[3]||y);var m=ie;(n.isBeacon||3===y._transport)&&(m=!1);var g=pe(n,m);m=m||g.useHdrs;var b=(0,s.hK)();(0,a.Lm)(p,(function(){return"HttpManager:_doPayloadSend"}),(function(){for(var h=0;h<n.batches.length;h++)for(var T=n.batches[h].events(),R=0;R<T.length;R++){var k=T[R];if(ne){var w=k.timings=k.timings||{};ye(w,"sendEventStart",b),ye(w,"serializationStart",t),ye(w,"serializationCompleted",r)}k.sendAttempt>0?k.sendAttempt++:k.sendAttempt=1}Se(n.batches,1e3+(o||0),n.sendType,!0);var K={data:n.payloadBlob,urlString:g.url,headers:g.hdrs,_thePayload:n,_sendReason:o,timeout:S};(0,c.o8)(M)||(K.disableXhrSync=!!M),m&&(G(K.headers,x)||(K.headers["cache-control"]="no-cache, no-store"),G(K.headers,E)||(K.headers["content-type"]=_));var P=null;y&&(P=function(t){L.firstRequestSent();var r=function(t,r){!function(n,t,r,a){var o=9e3,u=null,l=!1,d=!1;try{var v=!0;if(typeof n!==F.jA){if(t){L.setClockSkew(t["time-delta-millis"]);var h=t["kill-duration"]||t["kill-duration-seconds"];(0,c.tO)(A.setKillSwitchTenants(t["kill-tokens"],h),(function(e){(0,c.tO)(r.batches,(function(n){if(n.iKey()===e){u=u||[];var t=n.split(0);r.numEvents-=t.count(),u.push(t)}}))}))}if(200==n||204==n)return void(o=200);((y=n)>=300&&y<500&&408!=y&&429!=y||501==y||505==y||r.numEvents<=0)&&(v=!1),o=9e3+n%1e3}if(v){o=100;var p=r.retryCnt;0===r.sendType&&(p<i?(l=!0,ge((function(){0===r.sendType&&D--,he(r.batches,p+1,r.isTeardown,te?2:r.sendType,5)}),te,I(p))):(d=!0,te&&(o=8001)))}}finally{l||(L.setClockSkew(),function(n,t,i,r){try{r&&f._backOffTransmission(),200===t&&(r||n.isSync||f._clearBackOff(),function(e){if(ne){var n=(0,s.hK)();(0,c.tO)(e,(function(e){e&&e.count()>0&&function(e,n){ne&&(0,c.tO)(e,(function(e){ye(e.timings=e.timings||{},"sendEventCompleted",n)}))}(e.events(),n)}))}}(n.batches)),Se(n.batches,t,n.sendType,!0)}finally{0===n.sendType&&(D--,5!==i&&e.sendQueuedRequests(n.sendType,i))}}(r,o,a,d)),Se(u,8004,r.sendType)}var y}(t,r,n,o)},a=n.isTeardown||n.isSync;try{y.sendPOST(t,r,a),e.sendListener&&e.sendListener(K,t,a,n.isBeacon)}catch(e){(0,d.jV)(v,"Unexpected exception sending payload. Ex:"+(0,l.eU)(e)),oe(r,0,{})}}),(0,a.Lm)(p,(function(){return"HttpManager:_doPayloadSend.sender"}),(function(){if(P)if(0===n.sendType&&D++,u&&!n.isBeacon&&3!==y._transport){var t={data:K.data,urlString:K.urlString,headers:(0,s.l7)({},K.headers),timeout:K.timeout,disableXhrSync:K.disableXhrSync},i=!1;(0,a.Lm)(p,(function(){return"HttpManager:_doPayloadSend.sendHook"}),(function(){try{e.sendHook(t,(function(e){i=!0,j||e._thePayload||(e._thePayload=e._thePayload||K._thePayload,e._sendReason=e._sendReason||K._sendReason),P(e)}),n.isSync||n.isTeardown)}catch(e){i||P(K)}}))}else P(K)}))}),(function(){return{thePayload:n,serializationStart:t,serializationCompleted:r,sendReason:o}}),n.isSync)}n.sizeExceed&&n.sizeExceed.length>0&&Se(n.sizeExceed,8003,n.sendType),n.failedEvts&&n.failedEvts.length>0&&Se(n.failedEvts,8002,n.sendType)}function ge(e,n,t){n?e():u.set(e,t)}function be(n){var t=e._responseHandlers;try{for(var i=0;i<t.length;i++)try{t[i](n)}catch(e){(0,d.kP)(v,1,519,"Response handler failed: "+e)}if(n){var r=JSON.parse(n);(0,s.Sn)(r.webResult)&&(0,s.Sn)(r.webResult.msfpc)&&y.set("MSFPC",r.webResult.msfpc,31536e3)}}catch(e){}}function Se(e,n,t,i){if(e&&e.length>0&&o){var r=o[function(e){var n=W[e];(0,s.Sn)(n)||(n="oth",e>=9e3&&e<=9999?n=T:e>=8e3&&e<=8999?n=g:e>=1e3&&e<=1999&&(n=b));return n}(n)];if(r){var u=0!==t;(0,a.Lm)(p,(function(){return"HttpManager:_sendBatchesNotification"}),(function(){ge((function(){try{r.call(o,e,n,u,t)}catch(e){(0,d.kP)(v,1,74,"send request notification failed: "+e)}}),i||u,0)}),(function(){return{batches:ve(e),reason:n,isSync:u,sendSync:i,sendType:t}}),!u)}}}e.initialize=function(e,n,t,i,a){var o;a||(a={}),B=e+B,ie=!!(0,c.o8)(a.avoidOptions)||!a.avoidOptions,p=n,y=n.getCookieMgr(),ne=!p.config.disableEventTimings;var u=!!p.config.enableCompoundKey;v=(f=t).diagLog();var s=a.valueSanitizer,m=a.stringifyObjects;(0,c.o8)(a.enableCompoundKey)||(u=!!a.enableCompoundKey),S=a.xhrTimeout,M=a.disableXhrSync,z=!(0,l.b$)(),Y=new X(p,s,m,u);var g=i,b=a.alwaysUseXhrOverride?i:null,T=a.alwaysUseXhrOverride?i:null;if(!i){j=!1;var _=(0,l.k$)();_&&_.protocol&&"file:"===_.protocol.toLowerCase()&&(r=!1);var x=[];x=(0,l.b$)()?[2,1]:[1,2,3];var E=a.transports;E&&((0,c.hj)(E)?x=[E].concat(x):(0,c.kJ)(E)&&(x=E.concat(x))),i=U(x,!1),g=U(x,!0),i||(0,d.jV)(v,"No available transport to send events")}(o={})[0]=i,o[1]=g||U([1,2,3],!0),o[2]=b||U([3,2],!0)||g||U([1],!0),o[3]=T||U([2,3],!0)||g||U([1],!0),h=o},e._getDbgPlgTargets=function(){return[h[0],A,Y,h]},e.addQueryStringParameter=function(e,n){for(var t=0;t<N.length;t++)if(N[t].name===e)return void(N[t].value=n);N.push({name:e,value:n})},e.addHeader=function(e,n){J[e]=n},e.canSendRequest=function(){return le()&&L.allowRequestSending()},e.sendQueuedRequests=function(e,n){(0,c.o8)(e)&&(e=0),te&&(e=ce(e),n=2),de(V,e,0)&&he(fe(),0,!1,e,n||0)},e.isCompletelyIdle=function(){return!H&&0===D&&0===V.length},e.setUnloading=function(e){te=e},e.addBatch=function(e){if(e&&e.count()>0){if(A.isTenantKilled(e.iKey()))return!1;V.push(e)}return!0},e.teardown=function(){V.length>0&&he(fe(),0,!0,2,2)},e.pause=function(){H=!0},e.resume=function(){H=!1,e.sendQueuedRequests(0,4)},e.sendSynchronousBatch=function(e,n,t){e&&e.count()>0&&((0,c.le)(n)&&(n=1),te&&(n=ce(n),t=2),he([e],0,!1,n,t||0))}}))}return e.__ieDyn=1,e}();function te(e,n){for(var t=[],i=2;i<arguments.length;i++)t[i-2]=arguments[i];return setTimeout(e,n,t)}function ie(e){clearTimeout(e)}function re(e,n){return{set:e||te,clear:n||ie}}var ae="eventsDiscarded";const oe=function(e){function n(){var t,i=e.call(this)||this;i.identifier="PostChannel",i.priority=1011,i.version="3.2.4";var v,m,g,b,S,T,_,x=!1,E=[],R=null,k=!1,w=0,K=500,P=0,O=1e4,C={},B=h,A=null,H=null,U=0,q=0,F={},z=-1,D=!0,j=!1,N=6,X=2;return(0,r.Z)(n,i,(function(e,n){function i(e){"beforeunload"!==(e||(0,l.Jj)().event).type&&(j=!0,m.setUnloading(j)),G(2,2)}function r(e){j=!1,m.setUnloading(j)}function J(e,n){if(e.sendAttempt||(e.sendAttempt=0),e.latency||(e.latency=1),e.ext&&e.ext.trace&&delete e.ext.trace,e.ext&&e.ext.user&&e.ext.user.id&&delete e.ext.user.id,D&&(s.if,e.ext=(0,c.Ax)(e.ext),e.baseData&&(e.baseData=(0,c.Ax)(e.baseData)),e.data&&(e.data=(0,c.Ax)(e.data))),e.sync)if(U||k)e.latency=3,e.sync=!1;else if(m)return D&&(e=(0,c.Ax)(e)),void m.sendSynchronousBatch(L.create(e.iKey,[e]),!0===e.sync?1:e.sync,3);var t=e.latency,i=P,r=O;4===t&&(i=w,r=K);var a=!1;if(i<r)a=!ie(e,n);else{var o=1,u=20;4===t&&(o=4,u=1),a=!0,function(e,n,t,i){for(;t<=n;){var r=ee(e,n,!0);if(r&&r.count()>0){var a=r.split(0,i),o=a.count();if(o>0)return 4===t?w-=o:P-=o,he(ae,[a],f.h.QueueFull),!0}t++}return oe(),!1}(e.iKey,e.latency,o,u)&&(a=!ie(e,n))}a&&ve(ae,[e],f.h.QueueFull)}function Q(e,n,t){var i=ue(e,n,t);return m.sendQueuedRequests(n,t),i}function W(){return P>0}function V(){if(z>=0&&ue(z,0,S)&&m.sendQueuedRequests(0,S),w>0&&!H&&!k){var e=C[B][2];e>=0&&(H=Y((function(){H=null,Q(4,0,1),V()}),e))}var n=C[B][1];!A&&!R&&n>=0&&!k&&(W()?A=Y((function(){A=null,Q(0===q?3:1,0,1),q++,q%=2,V()}),n):q=0)}function Z(){t=null,x=!1,E=[],R=null,k=!1,w=0,K=500,P=0,O=1e4,C={},B=h,A=null,H=null,U=0,q=0,v=null,F={},g=void 0,b=0,z=-1,S=null,D=!0,j=!1,N=6,X=2,T=null,_=re(),m=new ne(500,2,1,{requeue:fe,send:pe,sent:ye,drop:me,rspFail:ge,oth:be},_),le(),F[4]={batches:[],iKeyMap:{}},F[3]={batches:[],iKeyMap:{}},F[2]={batches:[],iKeyMap:{}},F[1]={batches:[],iKeyMap:{}},Se()}function Y(e,n){0===n&&U&&(n=1);var t=1e3;return U&&(t=I(U-1)),_.set(e,n*t)}function $(){return null!==A&&(_.clear(A),A=null,q=0,!0)}function G(e,n){$(),R&&(_.clear(R),R=null),k||Q(1,e,n)}function ee(e,n,t){var i=F[n];i||(i=F[n=1]);var r=i.iKeyMap[e];return!r&&t&&(r=L.create(e),i.batches.push(r),i.iKeyMap[e]=r),r}function te(n,t){m.canSendRequest()&&!U&&(g>0&&P>g&&(t=!0),t&&null==R&&e.flush(n,null,20))}function ie(e,n){D&&(e=(0,c.Ax)(e));var t=e.latency,i=ee(e.iKey,t,!0);return!!i.addEvent(e)&&(4!==t?(P++,n&&0===e.sendAttempt&&te(!e.sync,b>0&&i.count()>=b)):w++,!0)}function oe(){for(var e=0,n=0,t=function(t){var i=F[t];i&&i.batches&&(0,c.tO)(i.batches,(function(i){4===t?e+=i.count():n+=i.count()}))},i=1;i<=4;i++)t(i);P=n,w=e}function ue(n,t,i){var r=!1,o=0===t;return!o||m.canSendRequest()?(0,a.Lm)(e.core,(function(){return"PostChannel._queueBatches"}),(function(){for(var e=[],t=4;t>=n;){var i=F[t];i&&i.batches&&i.batches.length>0&&((0,c.tO)(i.batches,(function(n){m.addBatch(n)?r=r||n&&n.count()>0:e=e.concat(n.events()),4===t?w-=n.count():P-=n.count()})),i.batches=[],i.iKeyMap={}),t--}e.length>0&&ve(ae,e,f.h.KillSwitch),r&&z>=n&&(z=-1,S=0)}),(function(){return{latency:n,sendType:t,sendReason:i}}),!o):(z=z>=0?Math.min(z,n):n,S=Math.max(S,i)),r}function se(e,n){Q(1,0,n),oe(),ce((function(){e&&e(),E.length>0?R=Y((function(){R=null,se(E.shift(),n)}),0):(R=null,V())}))}function ce(e){m.isCompletelyIdle()?e():R=Y((function(){R=null,ce(e)}),.25)}function le(){(C={})[h]=[2,1,0],C[p]=[6,3,0],C[y]=[18,9,0]}function fe(n,t){var i=[],r=N;j&&(r=X),(0,c.tO)(n,(function(n){n&&n.count()>0&&(0,c.tO)(n.events(),(function(n){n&&(n.sync&&(n.latency=4,n.sync=!1),n.sendAttempt<r?((0,s.if)(n,e.identifier),J(n,!1)):i.push(n))}))})),i.length>0&&ve(ae,i,f.h.NonRetryableStatus),j&&G(2,2)}function de(n,t){var i=e._notificationManager||{},r=i[n];if(r)try{r.apply(i,t)}catch(t){(0,d.kP)(e.diagLog(),1,74,n+" notification failed: "+t)}}function ve(e,n){for(var t=[],i=2;i<arguments.length;i++)t[i-2]=arguments[i];n&&n.length>0&&de(e,[n].concat(t))}function he(e,n){for(var t=[],i=2;i<arguments.length;i++)t[i-2]=arguments[i];n&&n.length>0&&(0,c.tO)(n,(function(n){n&&n.count()>0&&de(e,[n.events()].concat(t))}))}function pe(e,n,t){e&&e.length>0&&de("eventsSendRequest",[n>=1e3&&n<=1999?n-1e3:0,!0!==t])}function ye(e,n){he("eventsSent",e,n),V()}function me(e,n){he(ae,e,n>=8e3&&n<=8999?n-8e3:f.h.Unknown)}function ge(e){he(ae,e,f.h.NonRetryableStatus),V()}function be(e,n){he(ae,e,f.h.Unknown),V()}function Se(){b=t&&t.disableAutoBatchFlushLimit?0:Math.max(1500,O/6)}Z(),e._getDbgPlgTargets=function(){return[m]},e.initialize=function(l,f,d){(0,a.Lm)(f,(function(){return"PostChannel:initialize"}),(function(){var a=f;n.initialize(l,f,d);try{f.addUnloadCb;T=(0,o.jU)((0,u.J)(e.identifier),f.evtNamespace&&f.evtNamespace());var h=e._getTelCtx();l.extensionConfig[e.identifier]=l.extensionConfig[e.identifier]||{},t=h.getExtCfg(e.identifier),_=re(t.setTimeoutOverride,t.clearTimeoutOverride),D=!t.disableOptimizeObj&&(0,s.mJ)(),function(e){var n=e.getWParam;e.getWParam=function(){var e=0;return t.ignoreMc1Ms0CookieProcessing&&(e|=2),e|n()}}(a),t.eventsLimitInMem>0&&(O=t.eventsLimitInMem),t.immediateEventLimit>0&&(K=t.immediateEventLimit),t.autoFlushEventsLimit>0&&(g=t.autoFlushEventsLimit),(0,c.hj)(t.maxEventRetryAttempts)&&(N=t.maxEventRetryAttempts),(0,c.hj)(t.maxUnloadEventRetryAttempts)&&(X=t.maxUnloadEventRetryAttempts),Se(),t.httpXHROverride&&t.httpXHROverride.sendPOST&&(v=t.httpXHROverride),(0,s.Sn)(l.anonCookieName)&&m.addQueryStringParameter("anoncknm",l.anonCookieName),m.sendHook=t.payloadPreprocessor,m.sendListener=t.payloadListener;var p=t.overrideEndpointUrl?t.overrideEndpointUrl:l.endpointUrl;e._notificationManager=l.extensionConfig.NotificationManager,m.initialize(p,e.core,e,v,t);var y=l.disablePageUnloadEvents||[];(0,o.c9)(i,y,T),(0,o.TJ)(i,y,T),(0,o.nD)(r,l.disablePageShowEvents,T)}catch(n){throw e.setInitialized(!1),n}}),(function(){return{coreConfig:l,core:f,extensions:d}}))},e.processTelemetry=function(n,i){(0,s.if)(n,e.identifier);var r=(i=e._getTelCtx(i)).getExtCfg(e.identifier),a=!!t.disableTelemetry;r&&(a=a||!!r.disableTelemetry);var o=n;a||x||(t.overrideInstrumentationKey&&(o.iKey=t.overrideInstrumentationKey),r&&r.overrideInstrumentationKey&&(o.iKey=r.overrideInstrumentationKey),J(o,!0),j?G(2,2):V()),e.processNext(o,i)},e._doTeardown=function(e,n){G(2,2),x=!0,m.teardown(),(0,o.JA)(null,T),(0,o.C9)(null,T),(0,o.Yl)(null,T),Z()},e.setEventQueueLimits=function(e,n){O=e>0?e:1e4,g=n>0?n:0,Se();var t=P>e;if(!t&&b>0)for(var i=1;!t&&i<=3;i++){var r=F[i];r&&r.batches&&(0,c.tO)(r.batches,(function(e){e&&e.count()>=b&&(t=!0)}))}te(!0,t)},e.pause=function(){$(),k=!0,m.pause()},e.resume=function(){k=!1,m.resume(),V()},e.addResponseHandler=function(e){m._responseHandlers.push(e)},e._loadTransmitProfiles=function(e){$(),le(),B=h,V(),(0,c.rW)(e,(function(e,n){var t=n.length;if(t>=2){var i=t>2?n[2]:0;if(n.splice(0,t-2),n[1]<0&&(n[0]=-1),n[1]>0&&n[0]>0){var r=n[0]/n[1];n[0]=Math.ceil(r)*n[1]}i>=0&&n[1]>=0&&i>n[1]&&(i=n[1]),n.push(i),C[e]=n}}))},e.flush=function(e,n,t){if(void 0===e&&(e=!0),!k)if(t=t||1,e)null==R?($(),ue(1,0,t),R=Y((function(){R=null,se(n,t)}),0)):E.push(n);else{var i=$();Q(1,1,t),null!=n&&n(),i&&V()}},e.setMsaAuthTicket=function(e){m.addHeader(M,e)},e.hasEvents=W,e._setTransmitProfile=function(e){B!==e&&void 0!==C[e]&&($(),B=e,V())},e._backOffTransmission=function(){U<4&&(U++,$(),V())},e._clearBackOff=function(){U&&(U=0,$(),V())},(0,c.l_)(e,"_setTimeoutOverride",(function(){return _.set}),(function(e){_=re(e,_.clear)})),(0,c.l_)(e,"_clearTimeoutOverride",(function(){return _.clear}),(function(e){_=re(_.set,e)}))})),i}return(0,i.ne)(n,e),n.__ieDyn=1,n}(v.i)}};
//# sourceMappingURL=488.extension.js.map