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
if(navigator.userAgent.indexOf("Edge")!=-1){
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
var _49=location.protocol.replace(":","");
var _4a={"http":80,"https":443};
var _4b=location.port;
if(_4b==null){
_4b=_4a[_49];
}
var _4c=location.hostname+":"+_4b;
var _4d=_49+"://"+_4c;
var _4e="/.kr";
if(typeof (postMessage)!=="undefined"){
return function(_4f,_50,_51){
if(typeof (_50)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
if(_51==="null"){
_51="*";
}
switch(browser){
case "ie":
case "opera":
case "firefox":
setTimeout(function(){
_4f.postMessage(_50,_51);
},0);
break;
default:
_4f.postMessage(_50,_51);
break;
}
};
}else{
function MessagePipe(_52){
this.sourceToken=toPaddedHex(Math.floor(Math.random()*(Math.pow(2,32)-1)),8);
this.iframe=_52;
this.bridged=false;
this.lastWrite=0;
this.lastRead=0;
this.lastReadIndex=2;
this.lastSyn=0;
this.lastAck=0;
this.queue=[];
this.escapedFragments=[];
};
var _53=MessagePipe.prototype;
_53.attach=function(_54,_55,_56,_57,_58,_59){
this.target=_54;
this.targetOrigin=_55;
this.targetToken=_56;
this.reader=_57;
this.writer=_58;
this.writerURL=_59;
try{
this._lastHash=_57.location.hash;
this.poll=pollLocationHash;
}
catch(permissionDenied){
this._lastDocumentURL=_57.document.URL;
this.poll=pollDocumentURL;
}
if(_54==parent){
dequeue(this,true);
}
};
_53.detach=function(){
this.poll=function(){
};
delete this.target;
delete this.targetOrigin;
delete this.reader;
delete this.lastFragment;
delete this.writer;
delete this.writerURL;
};
_53.poll=function(){
};
function pollLocationHash(){
var _5a=this.reader.location.hash;
if(this._lastHash!=_5a){
process(this,_5a.substring(1));
this._lastHash=_5a;
}
};
function pollDocumentURL(){
var _5b=this.reader.document.URL;
if(this._lastDocumentURL!=_5b){
var _5c=_5b.indexOf("#");
if(_5c!=-1){
process(this,_5b.substring(_5c+1));
this._lastDocumentURL=_5b;
}
}
};
_53.post=function(_5d,_5e,_5f){
bridgeIfNecessary(this,_5d);
var _60=1000;
var _61=escape(_5e);
var _62=[];
while(_61.length>_60){
var _63=_61.substring(0,_60);
_61=_61.substring(_60);
_62.push(_63);
}
_62.push(_61);
this.queue.push([_5f,_62]);
if(this.writer!=null&&this.lastAck>=this.lastSyn){
dequeue(this,false);
}
};
function bridgeIfNecessary(_64,_65){
if(_64.lastWrite<1&&!_64.bridged){
if(_65.parent==window){
var src=_64.iframe.src;
var _67=src.split("#");
var _68=null;
var _69=document.getElementsByTagName("meta");
for(var i=0;i<_69.length;i++){
if(_69[i].name=="kaazing:resources"){
alert("kaazing:resources is no longer supported. Please refer to the Administrator's Guide section entitled \"Configuring a Web Server to Integrate with Kaazing Gateway\"");
}
}
var _6b=_4d;
var _6c=_6b.toString()+_4e+"?.kr=xsp&.kv=10.05";
if(_68){
var _6d=new URI(_6b.toString());
var _67=_68.split(":");
_6d.host=_67.shift();
if(_67.length){
_6d.port=_67.shift();
}
_6c=_6d.toString()+_4e+"?.kr=xsp&.kv=10.05";
}
for(var i=0;i<_69.length;i++){
if(_69[i].name=="kaazing:postMessageBridgeURL"){
var _6e=_69[i].content;
var _6f=new URI(_6e);
var _70=new URI(location.toString());
if(!_6f.authority){
_6f.host=_70.host;
_6f.port=_70.port;
_6f.scheme=_70.scheme;
if(_6e.indexOf("/")!=0){
var _71=_70.path.split("/");
_71.pop();
_71.push(_6e);
_6f.path=_71.join("/");
}
}
postMessage0.BridgeURL=_6f.toString();
}
}
if(postMessage0.BridgeURL){
_6c=postMessage0.BridgeURL;
}
var _72=["I",_6b,_64.sourceToken,escape(_6c)];
if(_67.length>1){
var _73=_67[1];
_72.push(escape(_73));
}
_67[1]=_72.join("!");
setTimeout(function(){
_65.location.replace(_67.join("#"));
},200);
_64.bridged=true;
}
}
};
function flush(_74,_75){
var _76=_74.writerURL+"#"+_75;
_74.writer.location.replace(_76);
};
function fromHex(_77){
return parseInt(_77,16);
};
function toPaddedHex(_78,_79){
var hex=_78.toString(16);
var _7b=[];
_79-=hex.length;
while(_79-->0){
_7b.push("0");
}
_7b.push(hex);
return _7b.join("");
};
function dequeue(_7c,_7d){
var _7e=_7c.queue;
var _7f=_7c.lastRead;
if((_7e.length>0||_7d)&&_7c.lastSyn>_7c.lastAck){
var _80=_7c.lastFrames;
var _81=_7c.lastReadIndex;
if(fromHex(_80[_81])!=_7f){
_80[_81]=toPaddedHex(_7f,8);
flush(_7c,_80.join(""));
}
}else{
if(_7e.length>0){
var _82=_7e.shift();
var _83=_82[0];
if(_83=="*"||_83==_7c.targetOrigin){
_7c.lastWrite++;
var _84=_82[1];
var _85=_84.shift();
var _86=3;
var _80=[_7c.targetToken,toPaddedHex(_7c.lastWrite,8),toPaddedHex(_7f,8),"F",toPaddedHex(_85.length,4),_85];
var _81=2;
if(_84.length>0){
_80[_86]="f";
_7c.queue.unshift(_82);
}
if(_7c.resendAck){
var _87=[_7c.targetToken,toPaddedHex(_7c.lastWrite-1,8),toPaddedHex(_7f,8),"a"];
_80=_87.concat(_80);
_81+=_87.length;
}
flush(_7c,_80.join(""));
_7c.lastFrames=_80;
_7c.lastReadIndex=_81;
_7c.lastSyn=_7c.lastWrite;
_7c.resendAck=false;
}
}else{
if(_7d){
_7c.lastWrite++;
var _80=[_7c.targetToken,toPaddedHex(_7c.lastWrite,8),toPaddedHex(_7f,8),"a"];
var _81=2;
if(_7c.resendAck){
var _87=[_7c.targetToken,toPaddedHex(_7c.lastWrite-1,8),toPaddedHex(_7f,8),"a"];
_80=_87.concat(_80);
_81+=_87.length;
}
flush(_7c,_80.join(""));
_7c.lastFrames=_80;
_7c.lastReadIndex=_81;
_7c.resendAck=true;
}
}
}
};
function process(_88,_89){
var _8a=_89.substring(0,8);
var _8b=fromHex(_89.substring(8,16));
var _8c=fromHex(_89.substring(16,24));
var _8d=_89.charAt(24);
if(_8a!=_88.sourceToken){
throw new Error("postMessage emulation tampering detected");
}
var _8e=_88.lastRead;
var _8f=_8e+1;
if(_8b==_8f){
_88.lastRead=_8f;
}
if(_8b==_8f||_8b==_8e){
_88.lastAck=_8c;
}
if(_8b==_8f||(_8b==_8e&&_8d=="a")){
switch(_8d){
case "f":
var _90=_89.substr(29,fromHex(_89.substring(25,29)));
_88.escapedFragments.push(_90);
dequeue(_88,true);
break;
case "F":
var _91=_89.substr(29,fromHex(_89.substring(25,29)));
if(_88.escapedFragments!==undefined){
_88.escapedFragments.push(_91);
_91=_88.escapedFragments.join("");
_88.escapedFragments=[];
}
var _92=unescape(_91);
dispatch(_92,_88.target,_88.targetOrigin);
dequeue(_88,true);
break;
case "a":
if(_89.length>25){
process(_88,_89.substring(25));
}else{
dequeue(_88,false);
}
break;
default:
throw new Error("unknown postMessage emulation payload type: "+_8d);
}
}
};
function dispatch(_93,_94,_95){
var _96=document.createEvent("Events");
_96.initEvent("message",false,true);
_96.data=_93;
_96.origin=_95;
_96.source=_94;
dispatchEvent(_96);
};
var _97={};
var _98=[];
function pollReaders(){
for(var i=0,len=_98.length;i<len;i++){
var _9b=_98[i];
_9b.poll();
}
setTimeout(pollReaders,20);
};
function findMessagePipe(_9c){
if(_9c==parent){
return _97["parent"];
}else{
if(_9c.parent==window){
var _9d=document.getElementsByTagName("iframe");
for(var i=0;i<_9d.length;i++){
var _9f=_9d[i];
if(_9c==_9f.contentWindow){
return supplyIFrameMessagePipe(_9f);
}
}
}else{
throw new Error("Generic peer postMessage not yet implemented");
}
}
};
function supplyIFrameMessagePipe(_a0){
var _a1=_a0._name;
if(_a1===undefined){
_a1="iframe$"+String(Math.random()).substring(2);
_a0._name=_a1;
}
var _a2=_97[_a1];
if(_a2===undefined){
_a2=new MessagePipe(_a0);
_97[_a1]=_a2;
}
return _a2;
};
function postMessage0(_a3,_a4,_a5){
if(typeof (_a4)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
if(_a3==window){
if(_a5=="*"||_a5==_4d){
dispatch(_a4,window,_4d);
}
}else{
var _a6=findMessagePipe(_a3);
_a6.post(_a3,_a4,_a5);
}
};
postMessage0.attach=function(_a7,_a8,_a9,_aa,_ab,_ac){
var _ad=findMessagePipe(_a7);
_ad.attach(_a7,_a8,_a9,_aa,_ab,_ac);
_98.push(_ad);
};
var _ae=function(_af){
var _b0=new URI((browser=="ie")?document.URL:location.href);
var _b1;
var _b2={"http":80,"https":443};
if(_b0.port==null){
_b0.port=_b2[_b0.scheme];
_b0.authority=_b0.host+":"+_b0.port;
}
var _b3=unescape(_b0.fragment||"");
if(_b3.length>0){
var _b4=_b3.split(",");
var _b5=_b4.shift();
var _b6=_b4.shift();
var _b7=_b4.shift();
var _b8=_b0.scheme+"://"+document.domain+":"+_b0.port;
var _b9=_b0.scheme+"://"+_b0.authority;
var _ba=_b5+"/.kr?.kr=xsc&.kv=10.05";
var _bb=document.location.toString().split("#")[0];
var _bc=_ba+"#"+escape([_b8,_b6,escape(_bb)].join(","));
if(typeof (ActiveXObject)!="undefined"){
_b1=new ActiveXObject("htmlfile");
_b1.open();
try{
_b1.parentWindow.opener=window;
}
catch(domainError){
if(_af){
_b1.domain=_af;
}
_b1.parentWindow.opener=window;
}
_b1.write("<html>");
_b1.write("<body>");
if(_af){
_b1.write("<script>CollectGarbage();document.domain='"+_af+"';</"+"script>");
}
_b1.write("<iframe src=\""+_ba+"\"></iframe>");
_b1.write("</body>");
_b1.write("</html>");
_b1.close();
var _bd=_b1.body.lastChild;
var _be=_b1.parentWindow;
var _bf=parent;
var _c0=_bf.parent.postMessage0;
if(typeof (_c0)!="undefined"){
_bd.onload=function(){
var _c1=_bd.contentWindow;
_c1.location.replace(_bc);
_c0.attach(_bf,_b5,_b7,_be,_c1,_ba);
};
}
}else{
var _bd=document.createElement("iframe");
_bd.src=_bc;
document.body.appendChild(_bd);
var _be=window;
var _c2=_bd.contentWindow;
var _bf=parent;
var _c0=_bf.parent.postMessage0;
if(typeof (_c0)!="undefined"){
_c0.attach(_bf,_b5,_b7,_be,_c2,_ba);
}
}
}
window.onunload=function(){
try{
var _c3=window.parent.parent.postMessage0;
if(typeof (_c3)!="undefined"){
_c3.detach(_bf);
}
}
catch(permissionDenied){
}
if(typeof (_b1)!=="undefined"){
_b1.parentWindow.opener=null;
_b1.open();
_b1.close();
_b1=null;
CollectGarbage();
}
};
};
postMessage0.__init__=function(_c4,_c5){
var _c6=_ae.toString();
_c4.URI=URI;
_c4.browser=browser;
if(!_c5){
_c5="";
}
_c4.setTimeout("("+_c6+")('"+_c5+"')",0);
};
postMessage0.bridgeURL=false;
postMessage0.detach=function(_c7){
var _c8=findMessagePipe(_c7);
for(var i=0;i<_98.length;i++){
if(_98[i]==_c8){
_98.splice(i,1);
}
}
_c8.detach();
};
if(window!=top){
_97["parent"]=new MessagePipe();
function initializeAsTargetIfNecessary(){
var _ca=new URI((browser=="ie")?document.URL:location.href);
var _cb=_ca.fragment||"";
if(document.body!=null&&_cb.length>0&&_cb.charAt(0)=="I"){
var _cc=unescape(_cb);
var _cd=_cc.split("!");
if(_cd.shift()=="I"){
var _ce=_cd.shift();
var _cf=_cd.shift();
var _d0=unescape(_cd.shift());
var _d1=_4d;
if(_ce==_d1){
try{
parent.location.hash;
}
catch(permissionDenied){
document.domain=document.domain;
}
}
var _d2=_cd.shift()||"";
location.replace([location.href.split("#")[0],_d2].join("#"));
var _d3=findMessagePipe(parent);
_d3.targetToken=_cf;
var _d4=_d3.sourceToken;
var _d5=_d0+"#"+escape([_d1,_cf,_d4].join(","));
var _d6;
_d6=document.createElement("iframe");
_d6.src=_d5;
_d6.style.position="absolute";
_d6.style.left="-10px";
_d6.style.top="10px";
_d6.style.visibility="hidden";
_d6.style.width="0px";
_d6.style.height="0px";
document.body.appendChild(_d6);
return;
}
}
setTimeout(initializeAsTargetIfNecessary,20);
};
initializeAsTargetIfNecessary();
}
var _d7=document.getElementsByTagName("meta");
for(var i=0;i<_d7.length;i++){
if(_d7[i].name==="kaazing:postMessage"){
if("immediate"==_d7[i].content){
var _d9=function(){
var _da=document.getElementsByTagName("iframe");
for(var i=0;i<_da.length;i++){
var _dc=_da[i];
if(_dc.style["KaaPostMessage"]=="immediate"){
_dc.style["KaaPostMessage"]="none";
var _dd=supplyIFrameMessagePipe(_dc);
bridgeIfNecessary(_dd,_dc.contentWindow);
}
}
setTimeout(_d9,20);
};
setTimeout(_d9,20);
}
break;
}
}
for(var i=0;i<_d7.length;i++){
if(_d7[i].name==="kaazing:postMessagePrefix"){
var _de=_d7[i].content;
if(_de!=null&&_de.length>0){
if(_de.charAt(0)!="/"){
_de="/"+_de;
}
_4e=_de;
}
}
}
setTimeout(pollReaders,20);
return postMessage0;
}
})();
