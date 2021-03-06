/**
 * Copyright (c) 2007-2015, Kaazing Corporation. All rights reserved.
 */

var browser=null;
if(typeof (ActiveXObject)!="undefined"){
if(navigator.userAgent.indexOf("MSIE 10")!=-1){
browser="chrome";
}else{
browser="ie";
}
}else{
if(navigator.userAgent.indexOf("Trident/7")!=-1&&navigator.userAgent.indexOf("rv:11")!=-1){
browser="chrome";
}else{
if(Object.prototype.toString.call(window.opera)=="[object Opera]"){
browser="opera";
}else{
if(navigator.vendor.indexOf("Apple")!=-1){
browser="safari";
if(navigator.userAgent.indexOf("iPad")!=-1||navigator.userAgent.indexOf("iPhone")!=-1){
browser.ios=true;
}
}else{
if(navigator.vendor.indexOf("Google")!=-1){
if((navigator.userAgent.indexOf("Android")!=-1)&&(navigator.userAgent.indexOf("Chrome")==-1)){
browser="android";
}else{
browser="chrome";
}
}else{
if(navigator.product=="Gecko"&&window.find&&!navigator.savePreferences){
browser="firefox";
}else{
throw new Error("couldn't detect browser");
}
}
}
}
}
}
switch(browser){
case "ie":
(function(){
if(document.createEvent===undefined){
var _1=function(){
};
_1.prototype.initEvent=function(_2,_3,_4){
this.type=_2;
this.bubbles=_3;
this.cancelable=_4;
};
document.createEvent=function(_5){
if(_5!="Events"){
throw new Error("Unsupported event name: "+_5);
}
return new _1();
};
}
document._w_3_c_d_o_m_e_v_e_n_t_s_createElement=document.createElement;
document.createElement=function(_6){
var _7=this._w_3_c_d_o_m_e_v_e_n_t_s_createElement(_6);
if(_7.addEventListener===undefined){
var _8={};
_7.addEventListener=function(_9,_a,_b){
_7.attachEvent("on"+_9,_a);
return addEventListener(_8,_9,_a,_b);
};
_7.removeEventListener=function(_c,_d,_e){
return removeEventListener(_8,_c,_d,_e);
};
_7.dispatchEvent=function(_f){
return dispatchEvent(_8,_f);
};
}
return _7;
};
if(window.addEventListener===undefined){
var _10=document.createElement("div");
var _11=(typeof (postMessage)==="undefined");
window.addEventListener=function(_12,_13,_14){
if(_11&&_12=="message"){
_10.addEventListener(_12,_13,_14);
}else{
window.attachEvent("on"+_12,_13);
}
};
window.removeEventListener=function(_15,_16,_17){
if(_11&&_15=="message"){
_10.removeEventListener(_15,_16,_17);
}else{
window.detachEvent("on"+_15,_16);
}
};
window.dispatchEvent=function(_18){
if(_11&&_18.type=="message"){
_10.dispatchEvent(_18);
}else{
window.fireEvent("on"+_18.type,_18);
}
};
}
function addEventListener(_19,_1a,_1b,_1c){
if(_1c){
throw new Error("Not implemented");
}
var _1d=_19[_1a]||{};
_19[_1a]=_1d;
_1d[_1b]=_1b;
};
function removeEventListener(_1e,_1f,_20,_21){
if(_21){
throw new Error("Not implemented");
}
var _22=_1e[_1f]||{};
delete _22[_20];
};
function dispatchEvent(_23,_24){
var _25=_24.type;
var _26=_23[_25]||{};
for(var key in _26){
if(_26.hasOwnProperty(key)&&typeof (_26[key])=="function"){
try{
_26[key](_24);
}
catch(e){
}
}
}
};
})();
break;
case "chrome":
case "android":
case "safari":
if(typeof (window.postMessage)==="undefined"&&typeof (window.dispatchEvent)==="undefined"&&typeof (document.dispatchEvent)==="function"){
window.dispatchEvent=function(_28){
document.dispatchEvent(_28);
};
var addEventListener0=window.addEventListener;
window.addEventListener=function(_29,_2a,_2b){
if(_29==="message"){
document.addEventListener(_29,_2a,_2b);
}else{
addEventListener0.call(window,_29,_2a,_2b);
}
};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(_2c,_2d,_2e){
if(_2c==="message"){
document.removeEventListener(_2c,_2d,_2e);
}else{
removeEventListener0.call(window,_2c,_2d,_2e);
}
};
}
break;
case "opera":
var addEventListener0=window.addEventListener;
window.addEventListener=function(_2f,_30,_31){
var _32=_30;
if(_2f==="message"){
_32=function(_33){
if(_33.origin===undefined&&_33.uri!==undefined){
var uri=new URI(_33.uri);
delete uri.path;
delete uri.query;
delete uri.fragment;
_33.origin=uri.toString();
}
return _30(_33);
};
_30._$=_32;
}
addEventListener0.call(window,_2f,_32,_31);
};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(_35,_36,_37){
var _38=_36;
if(_35==="message"){
_38=_36._$;
}
removeEventListener0.call(window,_35,_38,_37);
};
break;
}
function URI(str){
str=str||"";
var _3a=0;
var _3b=str.indexOf("://");
if(_3b!=-1){
this.scheme=str.slice(0,_3b);
_3a=_3b+3;
var _3c=str.indexOf("/",_3a);
if(_3c==-1){
_3c=str.length;
str+="/";
}
var _3d=str.slice(_3a,_3c);
this.authority=_3d;
_3a=_3c;
this.host=_3d;
var _3e=_3d.indexOf(":");
if(_3e!=-1){
this.host=_3d.slice(0,_3e);
this.port=parseInt(_3d.slice(_3e+1),10);
if(isNaN(this.port)){
throw new Error("Invalid URI syntax");
}
}
}
var _3f=str.indexOf("?",_3a);
if(_3f!=-1){
this.path=str.slice(_3a,_3f);
_3a=_3f+1;
}
var _40=str.indexOf("#",_3a);
if(_40!=-1){
if(_3f!=-1){
this.query=str.slice(_3a,_40);
}else{
this.path=str.slice(_3a,_40);
}
_3a=_40+1;
this.fragment=str.slice(_3a);
}else{
if(_3f!=-1){
this.query=str.slice(_3a);
}else{
this.path=str.slice(_3a);
}
}
};
(function(){
var _41=URI.prototype;
_41.toString=function(){
var sb=[];
var _43=this.scheme;
if(_43!==undefined){
sb.push(_43);
sb.push("://");
sb.push(this.host);
var _44=this.port;
if(_44!==undefined){
sb.push(":");
sb.push(_44.toString());
}
}
if(this.path!==undefined){
sb.push(this.path);
}
if(this.query!==undefined){
sb.push("?");
sb.push(this.query);
}
if(this.fragment!==undefined){
sb.push("#");
sb.push(this.fragment);
}
return sb.join("");
};
var _45={"http":80,"ws":80,"https":443,"wss":443};
URI.replaceProtocol=function(_46,_47){
var _48=_46.indexOf("://");
if(_48>0){
return _47+_46.substr(_48);
}else{
return "";
}
};
})();
var postMessage0=(function(){
var _49=new URI((browser=="ie")?document.URL:location.href);
var _4a={"http":80,"https":443};
if(_49.port==null){
_49.port=_4a[_49.scheme];
_49.authority=_49.host+":"+_49.port;
}
var _4b=_49.scheme+"://"+_49.authority;
var _4c="/.kr";
if(typeof (postMessage)!=="undefined"){
return function(_4d,_4e,_4f){
if(typeof (_4e)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
if(_4f==="null"){
_4f="*";
}
switch(browser){
case "ie":
case "opera":
case "firefox":
setTimeout(function(){
_4d.postMessage(_4e,_4f);
},0);
break;
default:
_4d.postMessage(_4e,_4f);
break;
}
};
}else{
function MessagePipe(_50){
this.sourceToken=toPaddedHex(Math.floor(Math.random()*(Math.pow(2,32)-1)),8);
this.iframe=_50;
this.bridged=false;
this.lastWrite=0;
this.lastRead=0;
this.lastReadIndex=2;
this.lastSyn=0;
this.lastAck=0;
this.queue=[];
this.escapedFragments=[];
};
var _51=MessagePipe.prototype;
_51.attach=function(_52,_53,_54,_55,_56,_57){
this.target=_52;
this.targetOrigin=_53;
this.targetToken=_54;
this.reader=_55;
this.writer=_56;
this.writerURL=_57;
try{
this._lastHash=_55.location.hash;
this.poll=pollLocationHash;
}
catch(permissionDenied){
this._lastDocumentURL=_55.document.URL;
this.poll=pollDocumentURL;
}
if(_52==parent){
dequeue(this,true);
}
};
_51.detach=function(){
this.poll=function(){
};
delete this.target;
delete this.targetOrigin;
delete this.reader;
delete this.lastFragment;
delete this.writer;
delete this.writerURL;
};
_51.poll=function(){
};
function pollLocationHash(){
var _58=this.reader.location.hash;
if(this._lastHash!=_58){
process(this,_58.substring(1));
this._lastHash=_58;
}
};
function pollDocumentURL(){
var _59=this.reader.document.URL;
if(this._lastDocumentURL!=_59){
var _5a=_59.indexOf("#");
if(_5a!=-1){
process(this,_59.substring(_5a+1));
this._lastDocumentURL=_59;
}
}
};
_51.post=function(_5b,_5c,_5d){
bridgeIfNecessary(this,_5b);
var _5e=1000;
var _5f=escape(_5c);
var _60=[];
while(_5f.length>_5e){
var _61=_5f.substring(0,_5e);
_5f=_5f.substring(_5e);
_60.push(_61);
}
_60.push(_5f);
this.queue.push([_5d,_60]);
if(this.writer!=null&&this.lastAck>=this.lastSyn){
dequeue(this,false);
}
};
function bridgeIfNecessary(_62,_63){
if(_62.lastWrite<1&&!_62.bridged){
if(_63.parent==window){
var src=_62.iframe.src;
var _65=src.split("#");
var _66=null;
var _67=document.getElementsByTagName("meta");
for(var i=0;i<_67.length;i++){
if(_67[i].name=="kaazing:resources"){
alert("kaazing:resources is no longer supported. Please refer to the Administrator's Guide section entitled \"Configuring a Web Server to Integrate with Kaazing Gateway\"");
}
}
var _69=_4b;
var _6a=_69.toString()+_4c+"?.kr=xsp&.kv=10.05";
if(_66){
var _6b=new URI(_69.toString());
var _65=_66.split(":");
_6b.host=_65.shift();
if(_65.length){
_6b.port=_65.shift();
}
_6a=_6b.toString()+_4c+"?.kr=xsp&.kv=10.05";
}
for(var i=0;i<_67.length;i++){
if(_67[i].name=="kaazing:postMessageBridgeURL"){
var _6c=_67[i].content;
var _6d=new URI(_6c);
var _6e=new URI(location.toString());
if(!_6d.authority){
_6d.host=_6e.host;
_6d.port=_6e.port;
_6d.scheme=_6e.scheme;
if(_6c.indexOf("/")!=0){
var _6f=_6e.path.split("/");
_6f.pop();
_6f.push(_6c);
_6d.path=_6f.join("/");
}
}
postMessage0.BridgeURL=_6d.toString();
}
}
if(postMessage0.BridgeURL){
_6a=postMessage0.BridgeURL;
}
var _70=["I",_69,_62.sourceToken,escape(_6a)];
if(_65.length>1){
var _71=_65[1];
_70.push(escape(_71));
}
_65[1]=_70.join("!");
setTimeout(function(){
_63.location.replace(_65.join("#"));
},200);
_62.bridged=true;
}
}
};
function flush(_72,_73){
var _74=_72.writerURL+"#"+_73;
_72.writer.location.replace(_74);
};
function fromHex(_75){
return parseInt(_75,16);
};
function toPaddedHex(_76,_77){
var hex=_76.toString(16);
var _79=[];
_77-=hex.length;
while(_77-->0){
_79.push("0");
}
_79.push(hex);
return _79.join("");
};
function dequeue(_7a,_7b){
var _7c=_7a.queue;
var _7d=_7a.lastRead;
if((_7c.length>0||_7b)&&_7a.lastSyn>_7a.lastAck){
var _7e=_7a.lastFrames;
var _7f=_7a.lastReadIndex;
if(fromHex(_7e[_7f])!=_7d){
_7e[_7f]=toPaddedHex(_7d,8);
flush(_7a,_7e.join(""));
}
}else{
if(_7c.length>0){
var _80=_7c.shift();
var _81=_80[0];
if(_81=="*"||_81==_7a.targetOrigin){
_7a.lastWrite++;
var _82=_80[1];
var _83=_82.shift();
var _84=3;
var _7e=[_7a.targetToken,toPaddedHex(_7a.lastWrite,8),toPaddedHex(_7d,8),"F",toPaddedHex(_83.length,4),_83];
var _7f=2;
if(_82.length>0){
_7e[_84]="f";
_7a.queue.unshift(_80);
}
if(_7a.resendAck){
var _85=[_7a.targetToken,toPaddedHex(_7a.lastWrite-1,8),toPaddedHex(_7d,8),"a"];
_7e=_85.concat(_7e);
_7f+=_85.length;
}
flush(_7a,_7e.join(""));
_7a.lastFrames=_7e;
_7a.lastReadIndex=_7f;
_7a.lastSyn=_7a.lastWrite;
_7a.resendAck=false;
}
}else{
if(_7b){
_7a.lastWrite++;
var _7e=[_7a.targetToken,toPaddedHex(_7a.lastWrite,8),toPaddedHex(_7d,8),"a"];
var _7f=2;
if(_7a.resendAck){
var _85=[_7a.targetToken,toPaddedHex(_7a.lastWrite-1,8),toPaddedHex(_7d,8),"a"];
_7e=_85.concat(_7e);
_7f+=_85.length;
}
flush(_7a,_7e.join(""));
_7a.lastFrames=_7e;
_7a.lastReadIndex=_7f;
_7a.resendAck=true;
}
}
}
};
function process(_86,_87){
var _88=_87.substring(0,8);
var _89=fromHex(_87.substring(8,16));
var _8a=fromHex(_87.substring(16,24));
var _8b=_87.charAt(24);
if(_88!=_86.sourceToken){
throw new Error("postMessage emulation tampering detected");
}
var _8c=_86.lastRead;
var _8d=_8c+1;
if(_89==_8d){
_86.lastRead=_8d;
}
if(_89==_8d||_89==_8c){
_86.lastAck=_8a;
}
if(_89==_8d||(_89==_8c&&_8b=="a")){
switch(_8b){
case "f":
var _8e=_87.substr(29,fromHex(_87.substring(25,29)));
_86.escapedFragments.push(_8e);
dequeue(_86,true);
break;
case "F":
var _8f=_87.substr(29,fromHex(_87.substring(25,29)));
if(_86.escapedFragments!==undefined){
_86.escapedFragments.push(_8f);
_8f=_86.escapedFragments.join("");
_86.escapedFragments=[];
}
var _90=unescape(_8f);
dispatch(_90,_86.target,_86.targetOrigin);
dequeue(_86,true);
break;
case "a":
if(_87.length>25){
process(_86,_87.substring(25));
}else{
dequeue(_86,false);
}
break;
default:
throw new Error("unknown postMessage emulation payload type: "+_8b);
}
}
};
function dispatch(_91,_92,_93){
var _94=document.createEvent("Events");
_94.initEvent("message",false,true);
_94.data=_91;
_94.origin=_93;
_94.source=_92;
dispatchEvent(_94);
};
var _95={};
var _96=[];
function pollReaders(){
for(var i=0,len=_96.length;i<len;i++){
var _99=_96[i];
_99.poll();
}
setTimeout(pollReaders,20);
};
function findMessagePipe(_9a){
if(_9a==parent){
return _95["parent"];
}else{
if(_9a.parent==window){
var _9b=document.getElementsByTagName("iframe");
for(var i=0;i<_9b.length;i++){
var _9d=_9b[i];
if(_9a==_9d.contentWindow){
return supplyIFrameMessagePipe(_9d);
}
}
}else{
throw new Error("Generic peer postMessage not yet implemented");
}
}
};
function supplyIFrameMessagePipe(_9e){
var _9f=_9e._name;
if(_9f===undefined){
_9f="iframe$"+String(Math.random()).substring(2);
_9e._name=_9f;
}
var _a0=_95[_9f];
if(_a0===undefined){
_a0=new MessagePipe(_9e);
_95[_9f]=_a0;
}
return _a0;
};
function postMessage0(_a1,_a2,_a3){
if(typeof (_a2)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
if(_a1==window){
if(_a3=="*"||_a3==_4b){
dispatch(_a2,window,_4b);
}
}else{
var _a4=findMessagePipe(_a1);
_a4.post(_a1,_a2,_a3);
}
};
postMessage0.attach=function(_a5,_a6,_a7,_a8,_a9,_aa){
var _ab=findMessagePipe(_a5);
_ab.attach(_a5,_a6,_a7,_a8,_a9,_aa);
_96.push(_ab);
};
var _ac=function(_ad){
var _ae=new URI((browser=="ie")?document.URL:location.href);
var _af;
var _b0={"http":80,"https":443};
if(_ae.port==null){
_ae.port=_b0[_ae.scheme];
_ae.authority=_ae.host+":"+_ae.port;
}
var _b1=unescape(_ae.fragment||"");
if(_b1.length>0){
var _b2=_b1.split(",");
var _b3=_b2.shift();
var _b4=_b2.shift();
var _b5=_b2.shift();
var _b6=_ae.scheme+"://"+document.domain+":"+_ae.port;
var _b7=_ae.scheme+"://"+_ae.authority;
var _b8=_b3+"/.kr?.kr=xsc&.kv=10.05";
var _b9=document.location.toString().split("#")[0];
var _ba=_b8+"#"+escape([_b6,_b4,escape(_b9)].join(","));
if(typeof (ActiveXObject)!="undefined"){
_af=new ActiveXObject("htmlfile");
_af.open();
try{
_af.parentWindow.opener=window;
}
catch(domainError){
if(_ad){
_af.domain=_ad;
}
_af.parentWindow.opener=window;
}
_af.write("<html>");
_af.write("<body>");
if(_ad){
_af.write("<script>CollectGarbage();document.domain='"+_ad+"';</"+"script>");
}
_af.write("<iframe src=\""+_b8+"\"></iframe>");
_af.write("</body>");
_af.write("</html>");
_af.close();
var _bb=_af.body.lastChild;
var _bc=_af.parentWindow;
var _bd=parent;
var _be=_bd.parent.postMessage0;
if(typeof (_be)!="undefined"){
_bb.onload=function(){
var _bf=_bb.contentWindow;
_bf.location.replace(_ba);
_be.attach(_bd,_b3,_b5,_bc,_bf,_b8);
};
}
}else{
var _bb=document.createElement("iframe");
_bb.src=_ba;
document.body.appendChild(_bb);
var _bc=window;
var _c0=_bb.contentWindow;
var _bd=parent;
var _be=_bd.parent.postMessage0;
if(typeof (_be)!="undefined"){
_be.attach(_bd,_b3,_b5,_bc,_c0,_b8);
}
}
}
window.onunload=function(){
try{
var _c1=window.parent.parent.postMessage0;
if(typeof (_c1)!="undefined"){
_c1.detach(_bd);
}
}
catch(permissionDenied){
}
if(typeof (_af)!=="undefined"){
_af.parentWindow.opener=null;
_af.open();
_af.close();
_af=null;
CollectGarbage();
}
};
};
postMessage0.__init__=function(_c2,_c3){
var _c4=_ac.toString();
_c2.URI=URI;
_c2.browser=browser;
if(!_c3){
_c3="";
}
_c2.setTimeout("("+_c4+")('"+_c3+"')",0);
};
postMessage0.bridgeURL=false;
postMessage0.detach=function(_c5){
var _c6=findMessagePipe(_c5);
for(var i=0;i<_96.length;i++){
if(_96[i]==_c6){
_96.splice(i,1);
}
}
_c6.detach();
};
if(window!=top){
_95["parent"]=new MessagePipe();
function initializeAsTargetIfNecessary(){
var _c8=new URI((browser=="ie")?document.URL:location.href);
var _c9=_c8.fragment||"";
if(document.body!=null&&_c9.length>0&&_c9.charAt(0)=="I"){
var _ca=unescape(_c9);
var _cb=_ca.split("!");
if(_cb.shift()=="I"){
var _cc=_cb.shift();
var _cd=_cb.shift();
var _ce=unescape(_cb.shift());
var _cf=_4b;
if(_cc==_cf){
try{
parent.location.hash;
}
catch(permissionDenied){
document.domain=document.domain;
}
}
var _d0=_cb.shift()||"";
switch(browser){
case "firefox":
location.replace([location.href.split("#")[0],_d0].join("#"));
break;
default:
location.hash=_d0;
break;
}
var _d1=findMessagePipe(parent);
_d1.targetToken=_cd;
var _d2=_d1.sourceToken;
var _d3=_ce+"#"+escape([_cf,_cd,_d2].join(","));
var _d4;
_d4=document.createElement("iframe");
_d4.src=_d3;
_d4.style.position="absolute";
_d4.style.left="-10px";
_d4.style.top="10px";
_d4.style.visibility="hidden";
_d4.style.width="0px";
_d4.style.height="0px";
document.body.appendChild(_d4);
return;
}
}
setTimeout(initializeAsTargetIfNecessary,20);
};
initializeAsTargetIfNecessary();
}
var _d5=document.getElementsByTagName("meta");
for(var i=0;i<_d5.length;i++){
if(_d5[i].name==="kaazing:postMessage"){
if("immediate"==_d5[i].content){
var _d7=function(){
var _d8=document.getElementsByTagName("iframe");
for(var i=0;i<_d8.length;i++){
var _da=_d8[i];
if(_da.style["KaaPostMessage"]=="immediate"){
_da.style["KaaPostMessage"]="none";
var _db=supplyIFrameMessagePipe(_da);
bridgeIfNecessary(_db,_da.contentWindow);
}
}
setTimeout(_d7,20);
};
setTimeout(_d7,20);
}
break;
}
}
for(var i=0;i<_d5.length;i++){
if(_d5[i].name==="kaazing:postMessagePrefix"){
var _dc=_d5[i].content;
if(_dc!=null&&_dc.length>0){
if(_dc.charAt(0)!="/"){
_dc="/"+_dc;
}
_4c=_dc;
}
}
}
setTimeout(pollReaders,20);
return postMessage0;
}
})();
