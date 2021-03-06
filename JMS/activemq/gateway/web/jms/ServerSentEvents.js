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
var XDRHttpDirect=(function(){
var id=0;
function XDRHttpDirect(_de){
this.outer=_de;
};
var _df=XDRHttpDirect.prototype;
_df.open=function(_e0,_e1){
var _e2=this;
var xhr=this.outer;
xhr.responseText="";
var _e4=2;
var _e5=0;
var _e6=0;
this._method=_e0;
this._location=_e1;
if(_e1.indexOf("?")==-1){
_e1+="?.kac=ex&.kct=application/x-message-http";
}else{
_e1+="&.kac=ex&.kct=application/x-message-http";
}
this.location=_e1;
var xdr=this.xdr=new XDomainRequest();
var _e8=function(e){
try{
var _ea=xdr.responseText;
if(_e4<=2){
var _eb=_ea.indexOf("\r\n\r\n");
if(_eb==-1){
return;
}
var _ec=_ea.indexOf("\r\n");
var _ed=_ea.substring(0,_ec);
var _ee=_ed.match(/HTTP\/1\.\d\s(\d+)\s([^\r\n]+)/);
xhr.status=parseInt(_ee[1]);
xhr.statusText=_ee[2];
var _ef=_ec+2;
_e6=_eb+4;
var _f0=_ea.substring(_ef,_eb).split("\r\n");
xhr._responseHeaders={};
for(var i=0;i<_f0.length;i++){
var _f2=_f0[i].split(":");
if(_f2.length>1){
xhr._responseHeaders[_f2[0].replace(/^\s+|\s+$/g,"")]=_f2[1].replace(/^\s+|\s+$/g,"");
}
}
_e5=_e6;
_e4=xhr.readyState=3;
if(typeof (_e2.onreadystatechange)=="function"){
_e2.onreadystatechange(xhr);
}
}
var _f3=xdr.responseText.length;
if(_f3>_e5){
xhr.responseText=_ea.slice(_e6);
_e5=_f3;
if(typeof (_e2.onprogress)=="function"){
_e2.onprogress(xhr);
}
}else{
}
}
catch(e1){
_e2.onload(xhr);
}
};
xdr.onprogress=_e8;
xdr.onerror=function(e){
xhr.readyState=0;
if(typeof (xhr.onerror)=="function"){
xhr.onerror(xhr);
}
};
xdr.onload=function(e){
if(_e4<=3){
_e8(e);
}
reayState=xhr.readyState=4;
if(typeof (xhr.onreadystatechange)=="function"){
xhr.onreadystatechange(xhr);
}
if(typeof (xhr.onload)=="function"){
xhr.onload(xhr);
}
};
xdr.ontimeout=function(e){
if(typeof (xhr.ontimeout)=="function"){
xhr.ontimeout(xhr);
}
};
xdr.open("POST",_e1);
xdr.timeout=30000;
};
_df.send=function(_f7){
var _f8=this._method+" "+this.location.substring(this.location.indexOf("/",9),this.location.indexOf("&.kct"))+" HTTP/1.1\r\n";
for(var i=0;i<this.outer._requestHeaders.length;i++){
_f8+=this.outer._requestHeaders[i][0]+": "+this.outer._requestHeaders[i][1]+"\r\n";
}
var _fa=_f7||"";
if(_fa.length>0||this._method.toUpperCase()==="POST"){
var len=0;
for(var i=0;i<_fa.length;i++){
len++;
if(_fa.charCodeAt(i)>=128){
len++;
}
}
_f8+="Content-Length: "+len+"\r\n";
}
_f8+="\r\n";
_f8+=_fa;
this.xdr.send(_f8);
};
_df.abort=function(){
this.xdr.abort();
};
return XDRHttpDirect;
})();
var XMLHttpBridge=(function(){
var _fc={"http":80,"https":443};
var _fd=location.protocol.replace(":","");
var _fe=location.port;
if(_fe==null){
_fe=_fc[_fd];
}
var _ff=_fd+"://"+location.hostname+":"+_fe;
var _100={};
var _101={};
var _102=0;
function XMLHttpBridge(_103){
this.outer=_103;
};
var _104=XMLHttpBridge.prototype;
_104.open=function(_105,_106){
var id=register(this);
var pipe=supplyPipe(this,_106);
pipe.attach(id);
this._pipe=pipe;
this._method=_105;
this._location=_106;
this.outer.readyState=1;
this.outer.status=0;
this.outer.statusText="";
this.outer.responseText="";
var _109=this;
setTimeout(function(){
_109.outer.readyState=1;
onreadystatechange(_109);
},0);
};
_104.send=function(_10a){
doSend(this,_10a);
};
_104.abort=function(){
var pipe=this._pipe;
if(pipe!==undefined){
pipe.post(["a",this._id].join(""));
pipe.detach(this._id);
}
};
function onreadystatechange(_10c){
if(typeof (_10c.onreadystatechange)!=="undefined"){
_10c.onreadystatechange(_10c.outer);
}
switch(_10c.outer.readyState){
case 3:
if(typeof (_10c.onprogress)!=="undefined"){
_10c.onprogress(_10c.outer);
}
break;
case 4:
if(_10c.outer.status<100||_10c.outer.status>=500){
if(typeof (_10c.onerror)!=="undefined"){
_10c.onerror(_10c.outer);
}
}else{
if(typeof (_10c.onprogress)!=="undefined"){
_10c.onprogress(_10c.outer);
}
if(typeof (_10c.onload)!=="undefined"){
_10c.onload(_10c.outer);
}
}
break;
}
};
function fromHex(_10d){
return parseInt(_10d,16);
};
function toPaddedHex(_10e,_10f){
var hex=_10e.toString(16);
var _111=[];
_10f-=hex.length;
while(_10f-->0){
_111.push("0");
}
_111.push(hex);
return _111.join("");
};
function register(_112){
var id=toPaddedHex(_102++,8);
_101[id]=_112;
_112._id=id;
return id;
};
function doSend(_114,_115){
if(typeof (_115)!=="string"){
_115="";
}
var _116=_114._method.substring(0,10);
var _117=_114._location;
var _118=_114.outer._requestHeaders;
var _119=toPaddedHex(_114.outer.timeout,4);
var _11a=(_114.outer.onprogress!==undefined)?"t":"f";
var _11b=["s",_114._id,_116.length,_116,toPaddedHex(_117.length,4),_117,toPaddedHex(_118.length,4)];
for(var i=0;i<_118.length;i++){
var _11d=_118[i];
_11b.push(toPaddedHex(_11d[0].length,4));
_11b.push(_11d[0]);
_11b.push(toPaddedHex(_11d[1].length,4));
_11b.push(_11d[1]);
}
_11b.push(toPaddedHex(_115.length,8),_115,toPaddedHex(_119,4),_11a);
_114._pipe.post(_11b.join(""));
};
function supplyPipe(_11e,_11f){
var uri=new URI(_11f);
var _121=(uri.scheme!=null&&uri.authority!=null);
var _122=_121?uri.scheme:_fd;
var _123=_121?uri.authority:_ff;
if(_123!=null&&uri.port==null){
_123=uri.host+":"+_fc[_122];
}
var _124=_122+"://"+_123;
var pipe=_100[_124];
if(pipe!==undefined){
if(!("iframe" in pipe&&"contentWindow" in pipe.iframe&&typeof pipe.iframe.contentWindow=="object")){
pipe=_100[_124]=undefined;
}
}
if(pipe===undefined){
var _126=document.createElement("iframe");
_126.style.position="absolute";
_126.style.left="-10px";
_126.style.top="10px";
_126.style.visibility="hidden";
_126.style.width="0px";
_126.style.height="0px";
var _127=new URI(_124);
_127.query=".kr=xs";
_127.path="/";
_126.src=_127.toString();
function post(_128){
this.buffer.push(_128);
};
function attach(id){
var _12a=this.attached[id];
if(_12a===undefined){
_12a={};
this.attached[id]=_12a;
}
if(_12a.timerID!==undefined){
clearTimeout(_12a.timerID);
delete _12a.timerID;
}
};
function detach(id){
var _12c=this.attached[id];
if(_12c!==undefined&&_12c.timerID===undefined){
var _12d=this;
_12c.timerID=setTimeout(function(){
delete _12d.attached[id];
var xhr=_101[id];
if(xhr._pipe==pipe){
delete _101[id];
delete xhr._id;
delete xhr._pipe;
}
postMessage0(pipe.iframe.contentWindow,["d",id].join(""),pipe.targetOrigin);
},0);
}
};
pipe={"targetOrigin":_124,"iframe":_126,"buffer":[],"post":post,"attach":attach,"detach":detach,"attached":{count:0}};
_100[_124]=pipe;
function sendInitWhenReady(){
var _12f=_126.contentWindow;
if(!_12f){
setTimeout(sendInitWhenReady,20);
}else{
postMessage0(_12f,"I",_124);
}
};
pipe.handshakeID=setTimeout(function(){
_100[_124]=undefined;
pipe.post=function(_130){
_11e.readyState=4;
_11e.status=0;
onreadystatechange(_11e);
};
if(pipe.buffer.length>0){
pipe.post();
}
},30000);
document.body.appendChild(_126);
if(typeof (postMessage)==="undefined"){
sendInitWhenReady();
}
}
return pipe;
};
function onmessage(_131){
var _132=_131.origin;
var _133={"http":":80","https":":443"};
var _134=_132.split(":");
if(_134.length===2){
_132+=_133[_134[0]];
}
var pipe=_100[_132];
if(pipe!==undefined&&pipe.iframe!==undefined&&_131.source==pipe.iframe.contentWindow){
if(_131.data=="I"){
clearTimeout(pipe.handshakeID);
var _136;
while((_136=pipe.buffer.shift())!==undefined){
postMessage0(pipe.iframe.contentWindow,_136,pipe.targetOrigin);
}
pipe.post=function(_137){
postMessage0(pipe.iframe.contentWindow,_137,pipe.targetOrigin);
};
}else{
var _136=_131.data;
if(_136.length>=9){
var _138=0;
var type=_136.substring(_138,_138+=1);
var id=_136.substring(_138,_138+=8);
var _13b=_101[id];
if(_13b!==undefined){
switch(type){
case "r":
var _13c={};
var _13d=fromHex(_136.substring(_138,_138+=2));
for(var i=0;i<_13d;i++){
var _13f=fromHex(_136.substring(_138,_138+=4));
var _140=_136.substring(_138,_138+=_13f);
var _141=fromHex(_136.substring(_138,_138+=4));
var _142=_136.substring(_138,_138+=_141);
_13c[_140]=_142;
}
var _143=fromHex(_136.substring(_138,_138+=4));
var _144=fromHex(_136.substring(_138,_138+=2));
var _145=_136.substring(_138,_138+=_144);
switch(_143){
case 301:
case 302:
case 307:
var _146=_13c["Location"];
var _147=_131.origin;
if(typeof (_13b.outer.onredirectallowed)==="function"){
if(!_13b.outer.onredirectallowed(_147,_146)){
return;
}
}
var id=register(_13b);
var pipe=supplyPipe(_13b,_146);
pipe.attach(id);
_13b._pipe=pipe;
_13b._method="GET";
_13b._location=_146;
_13b._redirect=true;
break;
case 403:
_13b.outer.status=_143;
onreadystatechange(_13b);
break;
default:
_13b.outer._responseHeaders=_13c;
_13b.outer.status=_143;
_13b.outer.statusText=_145;
break;
}
break;
case "p":
var _148=parseInt(_136.substring(_138,_138+=1));
if(_13b._id===id){
_13b.outer.readyState=_148;
var _149=fromHex(_136.substring(_138,_138+=8));
var _14a=_136.substring(_138,_138+=_149);
if(_14a.length>0){
_13b.outer.responseText+=_14a;
}
onreadystatechange(_13b);
}else{
if(_13b._redirect){
_13b._redirect=false;
doSend(_13b,"");
}
}
if(_148==4){
pipe.detach(id);
}
break;
case "e":
if(_13b._id===id){
_13b.outer.status=0;
_13b.outer.statusText="";
_13b.outer.readyState=4;
onreadystatechange(_13b);
}
pipe.detach(id);
break;
case "t":
if(_13b._id===id){
_13b.outer.status=0;
_13b.outer.statusText="";
_13b.outer.readyState=4;
if(typeof (_13b.ontimeout)!=="undefined"){
_13b.ontimeout();
}
}
pipe.detach(id);
break;
}
}
}
}
}else{
}
};
window.addEventListener("message",onmessage,false);
return XMLHttpBridge;
})();
var XMLHttpRequest0=(function(){
var _14b=location.protocol.replace(":","");
var _14c={"http":80,"https":443};
var _14d=location.port;
if(_14d==null){
_14d=_14c[_14b];
}
var _14e=location.hostname+":"+_14d;
function onreadystatechange(_14f){
if(typeof (_14f.onreadystatechange)!=="undefined"){
_14f.onreadystatechange();
}
};
function onprogress(_150){
if(typeof (_150.onprogress)!=="undefined"){
_150.onprogress();
}
};
function onerror(_151){
if(typeof (_151.onerror)!=="undefined"){
_151.onerror();
}
};
function onload(_152){
if(typeof (_152.onload)!=="undefined"){
_152.onload();
}
};
function XMLHttpRequest0(){
this._requestHeaders=[];
this.responseHeaders={};
this.withCredentials=false;
};
var _153=XMLHttpRequest0.prototype;
_153.readyState=0;
_153.responseText="";
_153.status=0;
_153.statusText="";
_153.timeout=0;
_153.onreadystatechange;
_153.onerror;
_153.onload;
_153.onprogress;
_153.onredirectallowed;
_153.open=function(_154,_155,_156){
if(!_156){
throw new Error("Asynchronous is required for cross-origin XMLHttpRequest emulation");
}
switch(this.readyState){
case 0:
case 4:
break;
default:
throw new Error("Invalid ready state");
}
var _157=this;
this._method=_154;
this._location=_155;
this.readyState=1;
this.status=0;
this.statusText="";
this.responseText="";
var xhr;
var _159=new URI(_155);
if(_159.port==null){
_159.port=_14c[_159.scheme];
_159.authority=_159.host+":"+_159.port;
}
if(browser=="ie"&&typeof (XDomainRequest)!=="undefined"&&_159.scheme==_14b&&!this.withCredentials){
xhr=new XDRHttpDirect(this);
}else{
if(_159.scheme==_14b&&_159.authority==_14e){
try{
xhr=new XMLHttpBridge(this);
}
catch(e){
xhr=new XMLHttpBridge(this);
}
}else{
xhr=new XMLHttpBridge(this);
}
}
xhr.onload=onload;
xhr.onprogress=onprogress;
xhr.onreadystatechange=onreadystatechange;
xhr.onerror=onerror;
xhr.open(_154,_155);
this.xhr=xhr;
setTimeout(function(){
if(_157.readyState>1){
return;
}
if(_157.readyState<1){
_157.readyState=1;
}
onreadystatechange(_157);
},0);
};
_153.setRequestHeader=function(_15a,_15b){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
this._requestHeaders.push([_15a,_15b]);
};
_153.send=function(_15c){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
var _15d=this;
setTimeout(function(){
if(_15d.readyState>2){
return;
}
if(_15d.readyState<2){
_15d.readyState=2;
}
onreadystatechange(_15d);
},0);
this.xhr.send(_15c);
};
_153.abort=function(){
this.xhr.abort();
};
_153.getResponseHeader=function(_15e){
if(this.status==0){
throw new Error("Invalid ready state");
}
var _15f=this._responseHeaders;
return _15f[_15e];
};
_153.getAllResponseHeaders=function(){
if(this.status==0){
throw new Error("Invalid ready state");
}
return this._responseHeaders;
};
return XMLHttpRequest0;
})();
var coverNativeSSE=true;
if(coverNativeSSE||typeof (window.EventSource)==="undefined"){
var EventSource=(function(){
function EventSource(_160){
this.lastEventId=null;
this.immediate=false;
this.retry=3000;
var _161=new URI(_160);
var _162={"http":80,"https":443};
if(_161.port==null){
_161.port=_162[_161.scheme];
_161.authority=_161.host+":"+_161.port;
}
this.origin=_161.scheme+"://"+_161.authority;
this.location=_160;
this.lineQueue=[];
this.xhr=null;
this.reconnectTimer=null;
var _163=this;
setTimeout(function(){
_connect(_163,false);
},0);
};
var _164=EventSource.prototype;
_164.readyState=0;
_164.onopen=function(){
};
_164.onmessage=function(_165){
};
_164.onerror=function(){
};
_164.disconnect=function(){
if(this.readyState!==2){
_disconnect(this);
}
};
function _connect(_166,_167,_168){
if(_166.reconnectTimer!==null){
_166.reconnectTimer=null;
}
var _169=new URI(_166.location);
if(_168===undefined){
_168=[];
}
if(_166.lastEventId!==null){
_168.push(".ka="+this.lastEventId);
}
if(_166.location.indexOf("&.kb=")===-1&&_166.location.indexOf("?.kb=")===-1){
_168.push(".kb=512");
}
switch(browser){
case "ie":
case "safari":
_168.push(".kp=256");
break;
case "firefox":
_168.push(".kp=1025");
_168.push(String(Math.random()).substring(2));
break;
case "android":
_168.push(".kp=4096");
_168.push(".kbp=4096");
break;
}
if(_168.length>0){
if(_169.query===undefined){
_169.query=_168.join("&");
}else{
_169.query+="&"+_168.join("&");
}
}
var xhr=_166.xhr=new XMLHttpRequest0();
var _16b={"xhr":xhr,"position":0};
if(_166.location.indexOf(".ki=p")==-1||_166.location.indexOf("https://")==0){
xhr.onprogress=function(){
setTimeout(function(){
_process(_166,_16b);
},0);
};
}
xhr.onload=function(){
_process(_166,_16b);
if(_166.xhr==_16b.xhr&&_166.readyState!=2){
_reconnect(_166);
}
};
xhr.onerror=function(){
if(_166.readyState!=2){
_disconnect(_166);
_error(_166);
}
};
xhr.ontimeout=function(){
if(_166.readyState!=2){
_disconnect(_166);
_error(_166);
}
};
xhr.onreadystatechange=function(){
if(!_167){
if(xhr.readyState>=3){
_166.readyState=1;
if(typeof (_166.onopen)==="function"){
_166.onopen();
}
xhr.onreadystatechange=function(){
};
}
}
};
xhr.open("GET",_169.toString(),true);
xhr.send(null);
if(_166.location.indexOf(".ki=p")==-1){
setTimeout(function(){
if(xhr.readyState<3&&_166.readyState<2){
_connect(_166,false,new Array(".ki=p"));
}
},3000);
}
};
function _disconnect(_16c){
if(_16c.reconnectTimer!==null){
clearTimeout(_16c.reconnectTimer);
_16c.reconnectTimer=null;
}
_16c.lineQueue=[];
_16c.lastEventId=null;
_16c.location=null;
_16c.readyState=2;
if(_16c.xhr!==null){
_16c.xhr.onprogress=function(){
};
_16c.xhr.onload=function(){
};
_16c.xhr.onerror=function(){
};
_16c.xhr.onreadystatechange=function(){
};
_16c.xhr.abort();
}
};
function _reconnect(_16d){
_16d.readyState=0;
if(_16d.location!==null){
var _16e=_16d.retry;
var _16f=_16d.immediate;
if(_16f){
_16d.immediate=false;
_16e=0;
}else{
_error(_16d);
}
if(_16d.readyState==0){
_16d.reconnectTimer=setTimeout(function(){
_connect(_16d,_16f);
},_16e);
}
}
};
var _170=/[^\r\n]+|\r\n|\r|\n/g;
function _process(_171,_172){
var _173=_172.xhr.responseText;
var _174=_173.slice(_172.position);
var _175=_174.match(_170)||[];
var _176=_171.lineQueue;
var _177="";
while(_175.length>0){
var _178=_175.shift();
switch(_178.charAt(0)){
case "\r":
case "\n":
_172.position+=_177.length+_178.length;
if(_177===""){
_dispatch(_171);
}else{
_176.push(_177);
_177="";
}
break;
default:
_177=_178;
break;
}
}
};
function _dispatch(_179){
var data="";
var name="message";
var _17c=_179.lineQueue;
while(_17c.length>0){
var line=_17c.shift();
var _17e=null;
var _17f="";
var _180=line.indexOf(":");
if(_180==-1){
_17e=line;
_17f="";
}else{
if(_180===0){
continue;
}else{
_17e=line.slice(0,_180);
var _181=_180+1;
if(line.charAt(_181)==" "){
_181++;
}
_17f=line.slice(_181);
}
}
switch(_17e){
case "event":
name=_17f;
break;
case "id":
_179.lastEventId=_17f;
break;
case "retry":
_17f=parseInt(_17f,10);
if(!isNaN(_17f)){
_179.retry=_17f;
}
break;
case "data":
if(data.length>0){
data+="\n";
}
data+=_17f;
break;
case "location":
if(_17f!=""){
_179.location=_17f;
}
break;
case "reconnect":
_179.immediate=true;
break;
default:
break;
}
}
if(data.length>0||(name.length>0&&name!="message")){
var e=document.createEvent("Events");
e.initEvent(name,true,true);
e.lastEventId=_179.lastEventId;
e.data=data;
e.origin=_179.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_179.onmessage)==="function"){
_179.onmessage(e);
}
}
};
function _error(_183){
var e=document.createEvent("Events");
e.initEvent("error",true,true);
if(typeof (_183.onerror)==="function"){
_183.onerror(e);
}
};
return EventSource;
})();
}else{
window.EventSource=(function(){
var _185={};
var _186={};
var _187=0;
function EventSource(_188){
this.readyState=0;
var id=register(this);
var pipe=supplyPipe(this,_188);
pipe.attach(id);
var _18b=["c",id,toPaddedHex(_188.length,4),_188].join("");
pipe.post(_18b);
this._id=id;
this._pipe=pipe;
};
var _18c=EventSource.prototype;
_18c.disconnect=function(){
var pipe=this._pipe;
if(pipe!==undefined){
pipe.post(["a",this._id].join(""));
pipe.detach(this._id);
}
this.readyState=2;
};
function register(_18e){
var id=toPaddedHex(_187++,8);
_186[id]=_18e;
_18e._id=id;
return id;
};
function supplyPipe(_190,_191){
var uri=new URI(_191);
var _193=(uri.scheme!=null&&uri.authority!=null);
var _194=_193?uri.scheme:locationURI.scheme;
var _195=_193?uri.authority:locationURI.authority;
if(_195!=null&&uri.port==null){
_195=uri.host+":"+defaultPorts[_194];
}
var _196=_194+"://"+_195;
var pipe=_185[_196];
if(pipe===undefined){
var _198=document.createElement("iframe");
_198.style.position="absolute";
_198.style.left="-10px";
_198.style.top="10px";
_198.style.visibility="hidden";
_198.style.width="0px";
_198.style.height="0px";
var _199=new URI(_196);
_199.query=".kr=xse&.kv=10.05";
_199.path="/";
_198.src=_199.toString();
function post(_19a){
this.buffer.push(_19a);
};
function attach(id){
var _19c=this.attached[id];
if(_19c===undefined){
_19c={};
this.attached[id]=_19c;
}
if(_19c.timerID!==undefined){
clearTimeout(_19c.timerID);
delete _19c.timerID;
}
};
function detach(id){
var _19e=this.attached[id];
if(_19e!==undefined&&_19e.timerID===undefined){
var _19f=this;
_19e.timerID=setTimeout(function(){
delete _19f.attached[id];
postMessage0(pipe.iframe.contentWindow,["d",id].join(""),pipe.targetOrigin);
},10000);
}
};
pipe={"targetOrigin":_196,"iframe":_198,"buffer":[],"post":post,"attach":attach,"detach":detach,"attached":{count:0}};
_185[_196]=pipe;
function sendInitWhenReady(){
var _1a0=_198.contentWindow;
if(!_1a0){
setTimeout(sendInitWhenReady,20);
}else{
postMessage0(_1a0,"I",_196);
}
};
pipe.handshakeID=setTimeout(function(){
_185[_196]=undefined;
pipe.post=function(_1a1){
_190.readyState=4;
_190.status=0;
onreadystatechange(_190);
};
if(pipe.buffer.length>0){
pipe.post();
}
},30000);
document.body.appendChild(_198);
sendInitWhenReady();
}
return pipe;
};
function onmessage(_1a2){
var _1a3=_1a2.origin;
var _1a4={"http":":80","https":":443"};
var _1a5=_1a3.split(":");
if(_1a5.length===2){
_1a3+=_1a4[_1a5[0]];
}
var pipe=_185[_1a3];
if(pipe!==undefined&&pipe.iframe!==undefined&&_1a2.source==pipe.iframe.contentWindow){
if(_1a2.data=="I"){
clearTimeout(pipe.handshakeID);
var _1a7;
while((_1a7=pipe.buffer.shift())!==undefined){
postMessage0(pipe.iframe.contentWindow,_1a7,pipe.targetOrigin);
}
pipe.post=function(_1a8){
postMessage0(pipe.iframe.contentWindow,_1a8,pipe.targetOrigin);
};
}else{
var _1a7=_1a2.data;
if(_1a7.length>=9){
var _1a9=0;
var type=_1a7.substring(_1a9,_1a9+=1);
var id=_1a7.substring(_1a9,_1a9+=8);
var _1ac=_186[id];
if(_1ac!==undefined){
switch(type){
case "D":
var _1ad=fromHex(_1a7.substring(_1a9,_1a9+=4));
var name=_1a7.substring(_1a9,_1a9+=_1ad);
var _1af=fromHex(_1a7.substring(_1a9,_1a9+=4));
var data=_1a7.substring(_1a9,_1a9+=_1af);
if(data.length>0||(name.length>0&&name!="message")){
var e=document.createEvent("Events");
e.initEvent(name,true,true);
e.lastEventId=_1ac.lastEventId;
e.data=data;
e.origin=_1ac.origin;
if(typeof (_1ac.onmessage)==="function"){
_1ac.onmessage(e);
}
}
break;
case "O":
_1ac.readyState=1;
_1ac.onopen();
break;
case "E":
if(_1ac._id===id){
_1ac.onerror();
}
break;
}
}
}
}
}else{
}
};
function fromHex(_1b2){
return parseInt(_1b2,16);
};
function toPaddedHex(_1b3,_1b4){
var hex=_1b3.toString(16);
var _1b6=[];
_1b4-=hex.length;
while(_1b4-->0){
_1b6.push("0");
}
_1b6.push(hex);
return _1b6.join("");
};
window.addEventListener("message",onmessage,false);
return EventSource;
})();
}
