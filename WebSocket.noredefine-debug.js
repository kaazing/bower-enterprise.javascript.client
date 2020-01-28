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
(function(){
Base64={};
Base64.encode=function(_49){
var _4a=[];
var _4b;
var _4c;
var _4d;
while(_49.length){
switch(_49.length){
case 1:
_4b=_49.shift();
_4a.push(_4e[(_4b>>2)&63]);
_4a.push(_4e[((_4b<<4)&48)]);
_4a.push("=");
_4a.push("=");
break;
case 2:
_4b=_49.shift();
_4c=_49.shift();
_4a.push(_4e[(_4b>>2)&63]);
_4a.push(_4e[((_4b<<4)&48)|((_4c>>4)&15)]);
_4a.push(_4e[(_4c<<2)&60]);
_4a.push("=");
break;
default:
_4b=_49.shift();
_4c=_49.shift();
_4d=_49.shift();
_4a.push(_4e[(_4b>>2)&63]);
_4a.push(_4e[((_4b<<4)&48)|((_4c>>4)&15)]);
_4a.push(_4e[((_4c<<2)&60)|((_4d>>6)&3)]);
_4a.push(_4e[_4d&63]);
break;
}
}
return _4a.join("");
};
Base64.decode=function(_4f){
if(_4f.length===0){
return [];
}
if(_4f.length%4!==0){
throw new Error("Invalid base64 string (must be quads)");
}
var _50=[];
for(var i=0;i<_4f.length;i+=4){
var _52=_4f.charAt(i);
var _53=_4f.charAt(i+1);
var _54=_4f.charAt(i+2);
var _55=_4f.charAt(i+3);
var _56=_57[_52];
var _58=_57[_53];
var _59=_57[_54];
var _5a=_57[_55];
_50.push(((_56<<2)&252)|((_58>>4)&3));
if(_54!="="){
_50.push(((_58<<4)&240)|((_59>>2)&15));
if(_55!="="){
_50.push(((_59<<6)&192)|(_5a&63));
}
}
}
return _50;
};
var _4e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
var _57={"=":0};
for(var i=0;i<_4e.length;i++){
_57[_4e[i]]=i;
}
if(typeof (window.btoa)==="undefined"){
window.btoa=function(s){
var _5d=s.split("");
for(var i=0;i<_5d.length;i++){
_5d[i]=(_5d[i]).charCodeAt();
}
return Base64.encode(_5d);
};
window.atob=function(_5f){
var _60=Base64.decode(_5f);
for(var i=0;i<_60.length;i++){
_60[i]=String.fromCharCode(_60[i]);
}
return _60.join("");
};
}
})();
var postMessage0=(function(){
var _62=location.protocol.replace(":","");
var _63={"http":80,"https":443};
var _64=location.port;
if(_64==null){
_64=_63[_62];
}
var _65=location.hostname+":"+_64;
var _66=_62+"://"+_65;
var _67="/.kr";
if(typeof (postMessage)!=="undefined"){
return function(_68,_69,_6a){
if(typeof (_69)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
if(_6a==="null"){
_6a="*";
}
switch(browser){
case "ie":
case "opera":
case "firefox":
setTimeout(function(){
_68.postMessage(_69,_6a);
},0);
break;
default:
_68.postMessage(_69,_6a);
break;
}
};
}else{
function MessagePipe(_6b){
this.sourceToken=toPaddedHex(Math.floor(Math.random()*(Math.pow(2,32)-1)),8);
this.iframe=_6b;
this.bridged=false;
this.lastWrite=0;
this.lastRead=0;
this.lastReadIndex=2;
this.lastSyn=0;
this.lastAck=0;
this.queue=[];
this.escapedFragments=[];
};
var _6c=MessagePipe.prototype;
_6c.attach=function(_6d,_6e,_6f,_70,_71,_72){
this.target=_6d;
this.targetOrigin=_6e;
this.targetToken=_6f;
this.reader=_70;
this.writer=_71;
this.writerURL=_72;
try{
this._lastHash=_70.location.hash;
this.poll=pollLocationHash;
}
catch(permissionDenied){
this._lastDocumentURL=_70.document.URL;
this.poll=pollDocumentURL;
}
if(_6d==parent){
dequeue(this,true);
}
};
_6c.detach=function(){
this.poll=function(){
};
delete this.target;
delete this.targetOrigin;
delete this.reader;
delete this.lastFragment;
delete this.writer;
delete this.writerURL;
};
_6c.poll=function(){
};
function pollLocationHash(){
var _73=this.reader.location.hash;
if(this._lastHash!=_73){
process(this,_73.substring(1));
this._lastHash=_73;
}
};
function pollDocumentURL(){
var _74=this.reader.document.URL;
if(this._lastDocumentURL!=_74){
var _75=_74.indexOf("#");
if(_75!=-1){
process(this,_74.substring(_75+1));
this._lastDocumentURL=_74;
}
}
};
_6c.post=function(_76,_77,_78){
bridgeIfNecessary(this,_76);
var _79=1000;
var _7a=escape(_77);
var _7b=[];
while(_7a.length>_79){
var _7c=_7a.substring(0,_79);
_7a=_7a.substring(_79);
_7b.push(_7c);
}
_7b.push(_7a);
this.queue.push([_78,_7b]);
if(this.writer!=null&&this.lastAck>=this.lastSyn){
dequeue(this,false);
}
};
function bridgeIfNecessary(_7d,_7e){
if(_7d.lastWrite<1&&!_7d.bridged){
if(_7e.parent==window){
var src=_7d.iframe.src;
var _80=src.split("#");
var _81=null;
var _82=document.getElementsByTagName("meta");
for(var i=0;i<_82.length;i++){
if(_82[i].name=="kaazing:resources"){
alert("kaazing:resources is no longer supported. Please refer to the Administrator's Guide section entitled \"Configuring a Web Server to Integrate with Kaazing Gateway\"");
}
}
var _84=_66;
var _85=_84.toString()+_67+"?.kr=xsp&.kv=10.05";
if(_81){
var _86=new URI(_84.toString());
var _80=_81.split(":");
_86.host=_80.shift();
if(_80.length){
_86.port=_80.shift();
}
_85=_86.toString()+_67+"?.kr=xsp&.kv=10.05";
}
for(var i=0;i<_82.length;i++){
if(_82[i].name=="kaazing:postMessageBridgeURL"){
var _87=_82[i].content;
var _88=new URI(_87);
var _89=new URI(location.toString());
if(!_88.authority){
_88.host=_89.host;
_88.port=_89.port;
_88.scheme=_89.scheme;
if(_87.indexOf("/")!=0){
var _8a=_89.path.split("/");
_8a.pop();
_8a.push(_87);
_88.path=_8a.join("/");
}
}
postMessage0.BridgeURL=_88.toString();
}
}
if(postMessage0.BridgeURL){
_85=postMessage0.BridgeURL;
}
var _8b=["I",_84,_7d.sourceToken,escape(_85)];
if(_80.length>1){
var _8c=_80[1];
_8b.push(escape(_8c));
}
_80[1]=_8b.join("!");
setTimeout(function(){
_7e.location.replace(_80.join("#"));
},200);
_7d.bridged=true;
}
}
};
function flush(_8d,_8e){
var _8f=_8d.writerURL+"#"+_8e;
_8d.writer.location.replace(_8f);
};
function fromHex(_90){
return parseInt(_90,16);
};
function toPaddedHex(_91,_92){
var hex=_91.toString(16);
var _94=[];
_92-=hex.length;
while(_92-->0){
_94.push("0");
}
_94.push(hex);
return _94.join("");
};
function dequeue(_95,_96){
var _97=_95.queue;
var _98=_95.lastRead;
if((_97.length>0||_96)&&_95.lastSyn>_95.lastAck){
var _99=_95.lastFrames;
var _9a=_95.lastReadIndex;
if(fromHex(_99[_9a])!=_98){
_99[_9a]=toPaddedHex(_98,8);
flush(_95,_99.join(""));
}
}else{
if(_97.length>0){
var _9b=_97.shift();
var _9c=_9b[0];
if(_9c=="*"||_9c==_95.targetOrigin){
_95.lastWrite++;
var _9d=_9b[1];
var _9e=_9d.shift();
var _9f=3;
var _99=[_95.targetToken,toPaddedHex(_95.lastWrite,8),toPaddedHex(_98,8),"F",toPaddedHex(_9e.length,4),_9e];
var _9a=2;
if(_9d.length>0){
_99[_9f]="f";
_95.queue.unshift(_9b);
}
if(_95.resendAck){
var _a0=[_95.targetToken,toPaddedHex(_95.lastWrite-1,8),toPaddedHex(_98,8),"a"];
_99=_a0.concat(_99);
_9a+=_a0.length;
}
flush(_95,_99.join(""));
_95.lastFrames=_99;
_95.lastReadIndex=_9a;
_95.lastSyn=_95.lastWrite;
_95.resendAck=false;
}
}else{
if(_96){
_95.lastWrite++;
var _99=[_95.targetToken,toPaddedHex(_95.lastWrite,8),toPaddedHex(_98,8),"a"];
var _9a=2;
if(_95.resendAck){
var _a0=[_95.targetToken,toPaddedHex(_95.lastWrite-1,8),toPaddedHex(_98,8),"a"];
_99=_a0.concat(_99);
_9a+=_a0.length;
}
flush(_95,_99.join(""));
_95.lastFrames=_99;
_95.lastReadIndex=_9a;
_95.resendAck=true;
}
}
}
};
function process(_a1,_a2){
var _a3=_a2.substring(0,8);
var _a4=fromHex(_a2.substring(8,16));
var _a5=fromHex(_a2.substring(16,24));
var _a6=_a2.charAt(24);
if(_a3!=_a1.sourceToken){
throw new Error("postMessage emulation tampering detected");
}
var _a7=_a1.lastRead;
var _a8=_a7+1;
if(_a4==_a8){
_a1.lastRead=_a8;
}
if(_a4==_a8||_a4==_a7){
_a1.lastAck=_a5;
}
if(_a4==_a8||(_a4==_a7&&_a6=="a")){
switch(_a6){
case "f":
var _a9=_a2.substr(29,fromHex(_a2.substring(25,29)));
_a1.escapedFragments.push(_a9);
dequeue(_a1,true);
break;
case "F":
var _aa=_a2.substr(29,fromHex(_a2.substring(25,29)));
if(_a1.escapedFragments!==undefined){
_a1.escapedFragments.push(_aa);
_aa=_a1.escapedFragments.join("");
_a1.escapedFragments=[];
}
var _ab=unescape(_aa);
dispatch(_ab,_a1.target,_a1.targetOrigin);
dequeue(_a1,true);
break;
case "a":
if(_a2.length>25){
process(_a1,_a2.substring(25));
}else{
dequeue(_a1,false);
}
break;
default:
throw new Error("unknown postMessage emulation payload type: "+_a6);
}
}
};
function dispatch(_ac,_ad,_ae){
var _af=document.createEvent("Events");
_af.initEvent("message",false,true);
_af.data=_ac;
_af.origin=_ae;
_af.source=_ad;
dispatchEvent(_af);
};
var _b0={};
var _b1=[];
function pollReaders(){
for(var i=0,len=_b1.length;i<len;i++){
var _b4=_b1[i];
_b4.poll();
}
setTimeout(pollReaders,20);
};
function findMessagePipe(_b5){
if(_b5==parent){
return _b0["parent"];
}else{
if(_b5.parent==window){
var _b6=document.getElementsByTagName("iframe");
for(var i=0;i<_b6.length;i++){
var _b8=_b6[i];
if(_b5==_b8.contentWindow){
return supplyIFrameMessagePipe(_b8);
}
}
}else{
throw new Error("Generic peer postMessage not yet implemented");
}
}
};
function supplyIFrameMessagePipe(_b9){
var _ba=_b9._name;
if(_ba===undefined){
_ba="iframe$"+String(Math.random()).substring(2);
_b9._name=_ba;
}
var _bb=_b0[_ba];
if(_bb===undefined){
_bb=new MessagePipe(_b9);
_b0[_ba]=_bb;
}
return _bb;
};
function postMessage0(_bc,_bd,_be){
if(typeof (_bd)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
if(_bc==window){
if(_be=="*"||_be==_66){
dispatch(_bd,window,_66);
}
}else{
var _bf=findMessagePipe(_bc);
_bf.post(_bc,_bd,_be);
}
};
postMessage0.attach=function(_c0,_c1,_c2,_c3,_c4,_c5){
var _c6=findMessagePipe(_c0);
_c6.attach(_c0,_c1,_c2,_c3,_c4,_c5);
_b1.push(_c6);
};
var _c7=function(_c8){
var _c9=new URI((browser=="ie")?document.URL:location.href);
var _ca;
var _cb={"http":80,"https":443};
if(_c9.port==null){
_c9.port=_cb[_c9.scheme];
_c9.authority=_c9.host+":"+_c9.port;
}
var _cc=unescape(_c9.fragment||"");
if(_cc.length>0){
var _cd=_cc.split(",");
var _ce=_cd.shift();
var _cf=_cd.shift();
var _d0=_cd.shift();
var _d1=_c9.scheme+"://"+document.domain+":"+_c9.port;
var _d2=_c9.scheme+"://"+_c9.authority;
var _d3=_ce+"/.kr?.kr=xsc&.kv=10.05";
var _d4=document.location.toString().split("#")[0];
var _d5=_d3+"#"+escape([_d1,_cf,escape(_d4)].join(","));
if(typeof (ActiveXObject)!="undefined"){
_ca=new ActiveXObject("htmlfile");
_ca.open();
try{
_ca.parentWindow.opener=window;
}
catch(domainError){
if(_c8){
_ca.domain=_c8;
}
_ca.parentWindow.opener=window;
}
_ca.write("<html>");
_ca.write("<body>");
if(_c8){
_ca.write("<script>CollectGarbage();document.domain='"+_c8+"';</"+"script>");
}
_ca.write("<iframe src=\""+_d3+"\"></iframe>");
_ca.write("</body>");
_ca.write("</html>");
_ca.close();
var _d6=_ca.body.lastChild;
var _d7=_ca.parentWindow;
var _d8=parent;
var _d9=_d8.parent.postMessage0;
if(typeof (_d9)!="undefined"){
_d6.onload=function(){
var _da=_d6.contentWindow;
_da.location.replace(_d5);
_d9.attach(_d8,_ce,_d0,_d7,_da,_d3);
};
}
}else{
var _d6=document.createElement("iframe");
_d6.src=_d5;
document.body.appendChild(_d6);
var _d7=window;
var _db=_d6.contentWindow;
var _d8=parent;
var _d9=_d8.parent.postMessage0;
if(typeof (_d9)!="undefined"){
_d9.attach(_d8,_ce,_d0,_d7,_db,_d3);
}
}
}
window.onunload=function(){
try{
var _dc=window.parent.parent.postMessage0;
if(typeof (_dc)!="undefined"){
_dc.detach(_d8);
}
}
catch(permissionDenied){
}
if(typeof (_ca)!=="undefined"){
_ca.parentWindow.opener=null;
_ca.open();
_ca.close();
_ca=null;
CollectGarbage();
}
};
};
postMessage0.__init__=function(_dd,_de){
var _df=_c7.toString();
_dd.URI=URI;
_dd.browser=browser;
if(!_de){
_de="";
}
_dd.setTimeout("("+_df+")('"+_de+"')",0);
};
postMessage0.bridgeURL=false;
postMessage0.detach=function(_e0){
var _e1=findMessagePipe(_e0);
for(var i=0;i<_b1.length;i++){
if(_b1[i]==_e1){
_b1.splice(i,1);
}
}
_e1.detach();
};
if(window!=top){
_b0["parent"]=new MessagePipe();
function initializeAsTargetIfNecessary(){
var _e3=new URI((browser=="ie")?document.URL:location.href);
var _e4=_e3.fragment||"";
if(document.body!=null&&_e4.length>0&&_e4.charAt(0)=="I"){
var _e5=unescape(_e4);
var _e6=_e5.split("!");
if(_e6.shift()=="I"){
var _e7=_e6.shift();
var _e8=_e6.shift();
var _e9=unescape(_e6.shift());
var _ea=_66;
if(_e7==_ea){
try{
parent.location.hash;
}
catch(permissionDenied){
document.domain=document.domain;
}
}
var _eb=_e6.shift()||"";
location.replace([location.href.split("#")[0],_eb].join("#"));
var _ec=findMessagePipe(parent);
_ec.targetToken=_e8;
var _ed=_ec.sourceToken;
var _ee=_e9+"#"+escape([_ea,_e8,_ed].join(","));
var _ef;
_ef=document.createElement("iframe");
_ef.src=_ee;
_ef.style.position="absolute";
_ef.style.left="-10px";
_ef.style.top="10px";
_ef.style.visibility="hidden";
_ef.style.width="0px";
_ef.style.height="0px";
document.body.appendChild(_ef);
return;
}
}
setTimeout(initializeAsTargetIfNecessary,20);
};
initializeAsTargetIfNecessary();
}
var _f0=document.getElementsByTagName("meta");
for(var i=0;i<_f0.length;i++){
if(_f0[i].name==="kaazing:postMessage"){
if("immediate"==_f0[i].content){
var _f2=function(){
var _f3=document.getElementsByTagName("iframe");
for(var i=0;i<_f3.length;i++){
var _f5=_f3[i];
if(_f5.style["KaaPostMessage"]=="immediate"){
_f5.style["KaaPostMessage"]="none";
var _f6=supplyIFrameMessagePipe(_f5);
bridgeIfNecessary(_f6,_f5.contentWindow);
}
}
setTimeout(_f2,20);
};
setTimeout(_f2,20);
}
break;
}
}
for(var i=0;i<_f0.length;i++){
if(_f0[i].name==="kaazing:postMessagePrefix"){
var _f7=_f0[i].content;
if(_f7!=null&&_f7.length>0){
if(_f7.charAt(0)!="/"){
_f7="/"+_f7;
}
_67=_f7;
}
}
}
setTimeout(pollReaders,20);
return postMessage0;
}
})();
var XDRHttpDirect=(function(){
var id=0;
function XDRHttpDirect(_f9){
this.outer=_f9;
};
var _fa=XDRHttpDirect.prototype;
_fa.open=function(_fb,_fc){
var _fd=this;
var xhr=this.outer;
xhr.responseText="";
var _ff=2;
var _100=0;
var _101=0;
this._method=_fb;
this._location=_fc;
if(_fc.indexOf("?")==-1){
_fc+="?.kac=ex&.kct=application/x-message-http";
}else{
_fc+="&.kac=ex&.kct=application/x-message-http";
}
this.location=_fc;
var xdr=this.xdr=new XDomainRequest();
var _103=function(e){
try{
var _105=xdr.responseText;
if(_ff<=2){
var _106=_105.indexOf("\r\n\r\n");
if(_106==-1){
return;
}
var _107=_105.indexOf("\r\n");
var _108=_105.substring(0,_107);
var _109=_108.match(/HTTP\/1\.\d\s(\d+)\s([^\r\n]+)/);
xhr.status=parseInt(_109[1]);
xhr.statusText=_109[2];
var _10a=_107+2;
_101=_106+4;
var _10b=_105.substring(_10a,_106).split("\r\n");
xhr._responseHeaders={};
for(var i=0;i<_10b.length;i++){
var _10d=_10b[i].split(":");
if(_10d.length>1){
var _10e=_10d[0].replace(/^\s+|\s+$/g,"");
var _10f=_10d[1].replace(/^\s+|\s+$/g,"");
var _110=xhr._responseHeaders[_10e];
var _111=_10f;
if(_110&&(_10f.replace(/^\s+|\s+$/g,"").length>0)){
_111=_110.concat(",").concat(_10f);
}
xhr._responseHeaders[_10e]=_111;
}
}
_100=_101;
_ff=xhr.readyState=3;
if(typeof (_fd.onreadystatechange)=="function"){
_fd.onreadystatechange(xhr);
}
}
var _112=xdr.responseText.length;
if(_112>_100){
xhr.responseText=_105.slice(_101);
_100=_112;
if(typeof (_fd.onprogress)=="function"){
_fd.onprogress(xhr);
}
}else{
}
}
catch(e1){
_fd.onload(xhr);
}
};
xdr.onprogress=_103;
xdr.onerror=function(e){
xhr.readyState=0;
if(typeof (xhr.onerror)=="function"){
xhr.onerror(xhr);
}
};
xdr.onload=function(e){
if(_ff<=3){
_103(e);
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
xdr.open("POST",_fc);
xdr.timeout=30000;
};
_fa.send=function(_116){
var _117=this._method+" "+this.location.substring(this.location.indexOf("/",9),this.location.indexOf("&.kct"))+" HTTP/1.1\r\n";
for(var i=0;i<this.outer._requestHeaders.length;i++){
_117+=this.outer._requestHeaders[i][0]+": "+this.outer._requestHeaders[i][1]+"\r\n";
}
var _119=_116||"";
if(_119.length>0||this._method.toUpperCase()==="POST"){
var len=0;
for(var i=0;i<_119.length;i++){
len++;
if(_119.charCodeAt(i)>=128){
len++;
}
}
_117+="Content-Length: "+len+"\r\n";
}
_117+="\r\n";
_117+=_119;
this.xdr.send(_117);
};
_fa.abort=function(){
this.xdr.abort();
};
return XDRHttpDirect;
})();
var XMLHttpBridge=(function(){
var _11b={"http":80,"https":443};
var _11c=location.protocol.replace(":","");
var _11d=location.port;
if(_11d==null){
_11d=_11b[_11c];
}
var _11e=_11c+"://"+location.hostname+":"+_11d;
var _11f={};
var _120={};
var _121=0;
function XMLHttpBridge(_122){
this.outer=_122;
};
var _123=XMLHttpBridge.prototype;
_123.open=function(_124,_125){
var id=register(this);
var pipe=supplyPipe(this,_125);
pipe.attach(id);
this._pipe=pipe;
this._method=_124;
this._location=_125;
this.outer.readyState=1;
this.outer.status=0;
this.outer.statusText="";
this.outer.responseText="";
var _128=this;
setTimeout(function(){
_128.outer.readyState=1;
onreadystatechange(_128);
},0);
};
_123.send=function(_129){
doSend(this,_129);
};
_123.abort=function(){
var pipe=this._pipe;
if(pipe!==undefined){
pipe.post(["a",this._id].join(""));
pipe.detach(this._id);
}
};
function onreadystatechange(_12b){
if(typeof (_12b.onreadystatechange)!=="undefined"){
_12b.onreadystatechange(_12b.outer);
}
switch(_12b.outer.readyState){
case 3:
if(typeof (_12b.onprogress)!=="undefined"){
_12b.onprogress(_12b.outer);
}
break;
case 4:
if(_12b.outer.status<100||_12b.outer.status>=500){
if(typeof (_12b.onerror)!=="undefined"){
_12b.onerror(_12b.outer);
}
}else{
if(typeof (_12b.onprogress)!=="undefined"){
_12b.onprogress(_12b.outer);
}
if(typeof (_12b.onload)!=="undefined"){
_12b.onload(_12b.outer);
}
}
break;
}
};
function onerror(_12c){
if(typeof (_12c.outer.onerror)!=="undefined"){
_12c.outer.onerror();
}
};
function fromHex(_12d){
return parseInt(_12d,16);
};
function toPaddedHex(_12e,_12f){
var hex=_12e.toString(16);
var _131=[];
_12f-=hex.length;
while(_12f-->0){
_131.push("0");
}
_131.push(hex);
return _131.join("");
};
function register(_132){
var id=toPaddedHex(_121++,8);
_120[id]=_132;
_132._id=id;
return id;
};
function doSend(_134,_135){
if(typeof (_135)!=="string"){
_135="";
}
var _136=_134._method.substring(0,10);
var _137=_134._location;
var _138=_134.outer._requestHeaders;
var _139=toPaddedHex(_134.outer.timeout,4);
var _13a=(_134.outer.onprogress!==undefined)?"t":"f";
var _13b=["s",_134._id,_136.length,_136,toPaddedHex(_137.length,4),_137,toPaddedHex(_138.length,4)];
for(var i=0;i<_138.length;i++){
var _13d=_138[i];
_13b.push(toPaddedHex(_13d[0].length,4));
_13b.push(_13d[0]);
_13b.push(toPaddedHex(_13d[1].length,4));
_13b.push(_13d[1]);
}
_13b.push(toPaddedHex(_135.length,8),_135,toPaddedHex(_139,4),_13a);
_134._pipe.post(_13b.join(""));
};
function supplyPipe(_13e,_13f){
var uri=new URI(_13f);
var _141=(uri.scheme!=null&&uri.authority!=null);
var _142=_141?uri.scheme:_11c;
var _143=_141?uri.authority:_11e;
if(_143!=null&&uri.port==null){
_143=uri.host+":"+_11b[_142];
}
var _144=_142+"://"+_143;
var pipe=_11f[_144];
if(pipe!==undefined){
if(!("iframe" in pipe&&"contentWindow" in pipe.iframe&&typeof pipe.iframe.contentWindow=="object")){
pipe=_11f[_144]=undefined;
}
}
if(pipe===undefined){
var _146=document.createElement("iframe");
_146.style.position="absolute";
_146.style.left="-10px";
_146.style.top="10px";
_146.style.visibility="hidden";
_146.style.width="0px";
_146.style.height="0px";
var _147=new URI(_144);
_147.query=".kr=xs";
_147.path="/";
_146.src=_147.toString();
function post(_148){
this.buffer.push(_148);
};
function attach(id){
var _14a=this.attached[id];
if(_14a===undefined){
_14a={};
this.attached[id]=_14a;
}
if(_14a.timerID!==undefined){
clearTimeout(_14a.timerID);
delete _14a.timerID;
}
};
function detach(id){
var _14c=this.attached[id];
if(_14c!==undefined&&_14c.timerID===undefined){
var _14d=this;
_14c.timerID=setTimeout(function(){
delete _14d.attached[id];
var xhr=_120[id];
if(xhr._pipe==pipe){
delete _120[id];
delete xhr._id;
delete xhr._pipe;
}
postMessage0(pipe.iframe.contentWindow,["d",id].join(""),pipe.targetOrigin);
},0);
}
};
pipe={"targetOrigin":_144,"iframe":_146,"buffer":[],"post":post,"attach":attach,"detach":detach,"attached":{count:0}};
_11f[_144]=pipe;
function sendInitWhenReady(){
var _14f=_146.contentWindow;
if(!_14f){
setTimeout(sendInitWhenReady,20);
}else{
postMessage0(_14f,"I",_144);
}
};
pipe.handshakeID=setTimeout(function(){
_11f[_144]=undefined;
pipe.post=function(_150){
_13e.readyState=4;
_13e.status=0;
onreadystatechange(_13e);
};
if(pipe.buffer.length>0){
pipe.post();
}
},30000);
document.body.appendChild(_146);
if(typeof (postMessage)==="undefined"){
sendInitWhenReady();
}
}
return pipe;
};
function onmessage(_151){
var _152=_151.origin;
var _153={"http":":80","https":":443"};
var _154=_152.split(":");
if(_154.length===2){
_152+=_153[_154[0]];
}
var pipe=_11f[_152];
if(pipe!==undefined&&pipe.iframe!==undefined&&_151.source==pipe.iframe.contentWindow){
if(_151.data=="I"){
clearTimeout(pipe.handshakeID);
var _156;
while((_156=pipe.buffer.shift())!==undefined){
postMessage0(pipe.iframe.contentWindow,_156,pipe.targetOrigin);
}
pipe.post=function(_157){
postMessage0(pipe.iframe.contentWindow,_157,pipe.targetOrigin);
};
}else{
var _156=_151.data;
if(_156.length>=9){
var _158=0;
var type=_156.substring(_158,_158+=1);
var id=_156.substring(_158,_158+=8);
var _15b=_120[id];
if(_15b!==undefined){
switch(type){
case "r":
var _15c={};
var _15d=fromHex(_156.substring(_158,_158+=2));
for(var i=0;i<_15d;i++){
var _15f=fromHex(_156.substring(_158,_158+=4));
var _160=_156.substring(_158,_158+=_15f);
var _161=fromHex(_156.substring(_158,_158+=4));
var _162=_156.substring(_158,_158+=_161);
_15c[_160]=_162;
}
var _163=fromHex(_156.substring(_158,_158+=4));
var _164=fromHex(_156.substring(_158,_158+=2));
var _165=_156.substring(_158,_158+=_164);
switch(_163){
case 301:
case 302:
case 307:
var _166=_15c["Location"];
var _167=_151.origin;
if(typeof (_15b.outer.onredirectallowed)==="function"){
if(!_15b.outer.onredirectallowed(_167,_166)){
return;
}
}
var id=register(_15b);
var pipe=supplyPipe(_15b,_166);
pipe.attach(id);
_15b._pipe=pipe;
_15b._method="GET";
_15b._location=_166;
_15b._redirect=true;
break;
case 403:
_15b.outer.status=_163;
onreadystatechange(_15b);
break;
case 404:
_15b.outer.status=_163;
_15b.outer.statusText=_165;
onerror(_15b);
break;
default:
_15b.outer._responseHeaders=_15c;
_15b.outer.status=_163;
_15b.outer.statusText=_165;
break;
}
break;
case "p":
var _168=parseInt(_156.substring(_158,_158+=1));
if(_15b._id===id){
_15b.outer.readyState=_168;
var _169=fromHex(_156.substring(_158,_158+=8));
var _16a=_156.substring(_158,_158+=_169);
if(_16a.length>0){
_15b.outer.responseText+=_16a;
}
onreadystatechange(_15b);
}else{
if(_15b._redirect){
_15b._redirect=false;
doSend(_15b,"");
}
}
if(_168==4){
pipe.detach(id);
}
break;
case "e":
if(_15b._id===id){
_15b.outer.status=0;
_15b.outer.statusText="";
_15b.outer.readyState=4;
onreadystatechange(_15b);
}
pipe.detach(id);
break;
case "t":
if(_15b._id===id){
_15b.outer.status=0;
_15b.outer.statusText="";
_15b.outer.readyState=4;
if(typeof (_15b.ontimeout)!=="undefined"){
_15b.ontimeout();
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
var _16b=location.protocol.replace(":","");
var _16c={"http":80,"https":443};
var _16d=location.port;
if(_16d==null){
_16d=_16c[_16b];
}
var _16e=location.hostname+":"+_16d;
function onreadystatechange(_16f){
if(typeof (_16f.onreadystatechange)!=="undefined"){
_16f.onreadystatechange();
}
};
function onprogress(_170){
if(typeof (_170.onprogress)!=="undefined"){
_170.onprogress();
}
};
function onerror(_171){
if(typeof (_171.onerror)!=="undefined"){
_171.onerror();
}
};
function onload(_172){
if(typeof (_172.onload)!=="undefined"){
_172.onload();
}
};
function XMLHttpRequest0(){
this._requestHeaders=[];
this.responseHeaders={};
this.withCredentials=false;
};
var _173=XMLHttpRequest0.prototype;
_173.readyState=0;
_173.responseText="";
_173.status=0;
_173.statusText="";
_173.timeout=0;
_173.onreadystatechange;
_173.onerror;
_173.onload;
_173.onprogress;
_173.onredirectallowed;
_173.open=function(_174,_175,_176){
if(!_176){
throw new Error("Asynchronous is required for cross-origin XMLHttpRequest emulation");
}
switch(this.readyState){
case 0:
case 4:
break;
default:
throw new Error("Invalid ready state");
}
var _177=this;
this._method=_174;
this._location=_175;
this.readyState=1;
this.status=0;
this.statusText="";
this.responseText="";
var xhr;
var _179=new URI(_175);
if(_179.port==null){
_179.port=_16c[_179.scheme];
_179.authority=_179.host+":"+_179.port;
}
if(browser=="ie"&&typeof (XDomainRequest)!=="undefined"&&_179.scheme==_16b&&!this.withCredentials){
xhr=new XDRHttpDirect(this);
}else{
if(_179.scheme==_16b&&_179.authority==_16e){
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
xhr.open(_174,_175);
this.xhr=xhr;
setTimeout(function(){
if(_177.readyState>1){
return;
}
if(_177.readyState<1){
_177.readyState=1;
}
onreadystatechange(_177);
},0);
};
_173.setRequestHeader=function(_17a,_17b){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
this._requestHeaders.push([_17a,_17b]);
};
_173.send=function(_17c){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
var _17d=this;
setTimeout(function(){
if(_17d.readyState>2){
return;
}
if(_17d.readyState<2){
_17d.readyState=2;
}
onreadystatechange(_17d);
},0);
this.xhr.send(_17c);
};
_173.abort=function(){
this.xhr.abort();
};
_173.getResponseHeader=function(_17e){
if(this.status==0){
throw new Error("Invalid ready state");
}
var _17f=this._responseHeaders;
return _17f[_17e];
};
_173.getAllResponseHeaders=function(){
if(this.status==0){
throw new Error("Invalid ready state");
}
return this._responseHeaders;
};
return XMLHttpRequest0;
})();
ByteOrder=function(){
};
(function(){
var _180=ByteOrder.prototype;
_180.toString=function(){
throw new Error("Abstract");
};
var _181=function(v){
return (v&255);
};
var _183=function(_184){
return (_184&128)?(_184|-256):_184;
};
var _185=function(v){
return [((v>>8)&255),(v&255)];
};
var _187=function(_188,_189){
return (_183(_188)<<8)|(_189&255);
};
var _18a=function(_18b,_18c){
return ((_18b&255)<<8)|(_18c&255);
};
var _18d=function(_18e,_18f,_190){
return ((_18e&255)<<16)|((_18f&255)<<8)|(_190&255);
};
var _191=function(v){
return [((v>>16)&255),((v>>8)&255),(v&255)];
};
var _193=function(_194,_195,_196){
return ((_194&255)<<16)|((_195&255)<<8)|(_196&255);
};
var _197=function(v){
return [((v>>24)&255),((v>>16)&255),((v>>8)&255),(v&255)];
};
var _199=function(_19a,_19b,_19c,_19d){
return (_183(_19a)<<24)|((_19b&255)<<16)|((_19c&255)<<8)|(_19d&255);
};
var _19e=function(_19f,_1a0,_1a1,_1a2){
var _1a3=_18a(_19f,_1a0);
var _1a4=_18a(_1a1,_1a2);
return (_1a3*65536+_1a4);
};
ByteOrder.BIG_ENDIAN=(function(){
var _1a5=function(){
};
_1a5.prototype=new ByteOrder();
var _1a6=_1a5.prototype;
_1a6._toUnsignedByte=_181;
_1a6._toByte=_183;
_1a6._fromShort=_185;
_1a6._toShort=_187;
_1a6._toUnsignedShort=_18a;
_1a6._toUnsignedMediumInt=_18d;
_1a6._fromMediumInt=_191;
_1a6._toMediumInt=_193;
_1a6._fromInt=_197;
_1a6._toInt=_199;
_1a6._toUnsignedInt=_19e;
_1a6.toString=function(){
return "<ByteOrder.BIG_ENDIAN>";
};
return new _1a5();
})();
ByteOrder.LITTLE_ENDIAN=(function(){
var _1a7=function(){
};
_1a7.prototype=new ByteOrder();
var _1a8=_1a7.prototype;
_1a8._toByte=_183;
_1a8._toUnsignedByte=_181;
_1a8._fromShort=function(v){
return _185(v).reverse();
};
_1a8._toShort=function(_1aa,_1ab){
return _187(_1ab,_1aa);
};
_1a8._toUnsignedShort=function(_1ac,_1ad){
return _18a(_1ad,_1ac);
};
_1a8._toUnsignedMediumInt=function(_1ae,_1af,_1b0){
return _18d(_1b0,_1af,_1ae);
};
_1a8._fromMediumInt=function(v){
return _191(v).reverse();
};
_1a8._toMediumInt=function(_1b2,_1b3,_1b4,_1b5,_1b6,_1b7){
return _193(_1b7,_1b6,_1b5,_1b4,_1b3,_1b2);
};
_1a8._fromInt=function(v){
return _197(v).reverse();
};
_1a8._toInt=function(_1b9,_1ba,_1bb,_1bc){
return _199(_1bc,_1bb,_1ba,_1b9);
};
_1a8._toUnsignedInt=function(_1bd,_1be,_1bf,_1c0){
return _19e(_1c0,_1bf,_1be,_1bd);
};
_1a8.toString=function(){
return "<ByteOrder.LITTLE_ENDIAN>";
};
return new _1a7();
})();
})();
function ByteBuffer(_1c1){
this.array=_1c1||[];
this._mark=-1;
this.limit=this.capacity=this.array.length;
this.order=ByteOrder.BIG_ENDIAN;
};
(function(){
ByteBuffer.allocate=function(_1c2){
var buf=new ByteBuffer();
buf.capacity=_1c2;
buf.limit=_1c2;
return buf;
};
ByteBuffer.wrap=function(_1c4){
return new ByteBuffer(_1c4);
};
var _1c5=ByteBuffer.prototype;
_1c5.autoExpand=true;
_1c5.capacity=0;
_1c5.position=0;
_1c5.limit=0;
_1c5.order=ByteOrder.BIG_ENDIAN;
_1c5.array=[];
_1c5.mark=function(){
this._mark=this.position;
return this;
};
_1c5.reset=function(){
var m=this._mark;
if(m<0){
throw new Error("Invalid mark");
}
this.position=m;
return this;
};
_1c5.compact=function(){
this.array.splice(0,this.position);
this.limit-=this.position;
this.position=0;
return this;
};
_1c5.duplicate=function(){
var buf=new ByteBuffer(this.array);
buf.position=this.position;
buf.limit=this.limit;
buf.capacity=this.capacity;
return buf;
};
_1c5.fill=function(size){
_autoExpand(this,size);
while(size-->0){
this.put(0);
}
return this;
};
_1c5.fillWith=function(b,size){
_autoExpand(this,size);
while(size-->0){
this.put(b);
}
return this;
};
_1c5.indexOf=function(b){
var _1cc=this.limit;
var _1cd=this.array;
for(var i=this.position;i<_1cc;i++){
if(_1cd[i]==b){
return i;
}
}
return -1;
};
_1c5.put=function(v){
_autoExpand(this,1);
this.array[this.position++]=v&255;
return this;
};
_1c5.putAt=function(_1d0,v){
_checkForWriteAt(this,_1d0,1);
this.array[_1d0]=v&255;
return this;
};
_1c5.putUnsigned=function(v){
_autoExpand(this,1);
this.array[this.position++]=v&255;
return this;
};
_1c5.putUnsignedAt=function(_1d3,v){
_checkForWriteAt(this,_1d3,1);
this.array[_1d3]=v&255;
return this;
};
_1c5.putShort=function(v){
_autoExpand(this,2);
_putBytesInternal(this,this.position,this.order._fromShort(v));
this.position+=2;
return this;
};
_1c5.putShortAt=function(_1d6,v){
_checkForWriteAt(this,_1d6,2);
_putBytesInternal(this,_1d6,this.order._fromShort(v));
return this;
};
_1c5.putUnsignedShort=function(v){
_autoExpand(this,2);
_putBytesInternal(this,this.position,this.order._fromShort(v&65535));
this.position+=2;
return this;
};
_1c5.putUnsignedShortAt=function(_1d9,v){
_checkForWriteAt(this,_1d9,2);
_putBytesInternal(this,_1d9,this.order._fromShort(v&65535));
return this;
};
_1c5.putMediumInt=function(v){
_autoExpand(this,3);
this.putMediumIntAt(this.position,v);
this.position+=3;
return this;
};
_1c5.putMediumIntAt=function(_1dc,v){
this.putBytesAt(_1dc,this.order._fromMediumInt(v));
return this;
};
_1c5.putInt=function(v){
_autoExpand(this,4);
_putBytesInternal(this,this.position,this.order._fromInt(v));
this.position+=4;
return this;
};
_1c5.putIntAt=function(_1df,v){
_checkForWriteAt(this,_1df,4);
_putBytesInternal(this,_1df,this.order._fromInt(v));
return this;
};
_1c5.putUnsignedInt=function(v){
_autoExpand(this,4);
this.putUnsignedIntAt(this.position,v&4294967295);
this.position+=4;
return this;
};
_1c5.putUnsignedIntAt=function(_1e2,v){
_checkForWriteAt(this,_1e2,4);
this.putIntAt(_1e2,v&4294967295);
return this;
};
_1c5.putString=function(v,cs){
cs.encode(v,this);
return this;
};
_1c5.putPrefixedString=function(_1e6,v,cs){
if(typeof (cs)==="undefined"||typeof (cs.encode)==="undefined"){
throw new Error("ByteBuffer.putPrefixedString: character set parameter missing");
}
if(_1e6===0){
return this;
}
_autoExpand(this,_1e6);
var len=v.length;
switch(_1e6){
case 1:
this.put(len);
break;
case 2:
this.putShort(len);
break;
case 4:
this.putInt(len);
break;
}
cs.encode(v,this);
return this;
};
function _putBytesInternal(_1ea,_1eb,v){
var _1ed=_1ea.array;
for(var i=0;i<v.length;i++){
_1ed[i+_1eb]=v[i]&255;
}
};
_1c5.putBytes=function(v){
_autoExpand(this,v.length);
_putBytesInternal(this,this.position,v);
this.position+=v.length;
return this;
};
_1c5.putBytesAt=function(_1f0,v){
_checkForWriteAt(this,_1f0,v.length);
_putBytesInternal(this,_1f0,v);
return this;
};
_1c5.putByteArray=function(v){
_autoExpand(this,v.byteLength);
var u=new Uint8Array(v);
for(var i=0;i<u.byteLength;i++){
this.putAt(this.position+i,u[i]&255);
}
this.position+=v.byteLength;
return this;
};
_1c5.putBuffer=function(v){
var len=v.remaining();
_autoExpand(this,len);
var _1f7=v.array;
var _1f8=v.position;
var _1f9=this.position;
for(var i=0;i<len;i++){
this.array[i+_1f9]=_1f7[i+_1f8];
}
this.position+=len;
return this;
};
_1c5.putBufferAt=function(_1fb,v){
var len=v.remaining();
_autoExpand(this,len);
var _1fe=v.array;
var _1ff=v.position;
var _200=this.position;
for(var i=0;i<len;i++){
this.array[i+_200]=_1fe[i+_1ff];
}
return this;
};
_1c5.get=function(){
_checkForRead(this,1);
return this.order._toByte(this.array[this.position++]);
};
_1c5.getAt=function(_202){
_checkForReadAt(this,_202,1);
return this.order._toByte(this.array[_202]);
};
_1c5.getUnsigned=function(){
_checkForRead(this,1);
var val=this.order._toUnsignedByte(this.array[this.position++]);
return val;
};
_1c5.getUnsignedAt=function(_204){
_checkForReadAt(this,_204,1);
return this.order._toUnsignedByte(this.array[_204]);
};
_1c5.getBytes=function(size){
_checkForRead(this,size);
var _206=new Array();
for(var i=0;i<size;i++){
_206.push(this.order._toByte(this.array[i+this.position]));
}
this.position+=size;
return _206;
};
_1c5.getBytesAt=function(_208,size){
_checkForReadAt(this,_208,size);
var _20a=new Array();
var _20b=this.array;
for(var i=0;i<size;i++){
_20a.push(_20b[i+_208]);
}
return _20a;
};
_1c5.getBlob=function(size){
var _20e=this.array.slice(this.position,size);
this.position+=size;
return BlobUtils.fromNumberArray(_20e);
};
_1c5.getBlobAt=function(_20f,size){
var _211=this.getBytesAt(_20f,size);
return BlobUtils.fromNumberArray(_211);
};
_1c5.getArrayBuffer=function(size){
var u=new Uint8Array(size);
u.set(this.array.slice(this.position,size));
this.position+=size;
return u.buffer;
};
_1c5.getShort=function(){
_checkForRead(this,2);
var val=this.getShortAt(this.position);
this.position+=2;
return val;
};
_1c5.getShortAt=function(_215){
_checkForReadAt(this,_215,2);
var _216=this.array;
return this.order._toShort(_216[_215++],_216[_215++]);
};
_1c5.getUnsignedShort=function(){
_checkForRead(this,2);
var val=this.getUnsignedShortAt(this.position);
this.position+=2;
return val;
};
_1c5.getUnsignedShortAt=function(_218){
_checkForReadAt(this,_218,2);
var _219=this.array;
return this.order._toUnsignedShort(_219[_218++],_219[_218++]);
};
_1c5.getUnsignedMediumInt=function(){
var _21a=this.array;
return this.order._toUnsignedMediumInt(_21a[this.position++],_21a[this.position++],_21a[this.position++]);
};
_1c5.getMediumInt=function(){
var val=this.getMediumIntAt(this.position);
this.position+=3;
return val;
};
_1c5.getMediumIntAt=function(i){
var _21d=this.array;
return this.order._toMediumInt(_21d[i++],_21d[i++],_21d[i++]);
};
_1c5.getInt=function(){
_checkForRead(this,4);
var val=this.getIntAt(this.position);
this.position+=4;
return val;
};
_1c5.getIntAt=function(_21f){
_checkForReadAt(this,_21f,4);
var _220=this.array;
return this.order._toInt(_220[_21f++],_220[_21f++],_220[_21f++],_220[_21f++]);
};
_1c5.getUnsignedInt=function(){
_checkForRead(this,4);
var val=this.getUnsignedIntAt(this.position);
this.position+=4;
return val;
};
_1c5.getUnsignedIntAt=function(_222){
_checkForReadAt(this,_222,4);
var _223=this.array;
return this.order._toUnsignedInt(_223[_222++],_223[_222++],_223[_222++],_223[_222++]);
return val;
};
_1c5.getPrefixedString=function(_224,cs){
var len=0;
switch(_224||2){
case 1:
len=this.getUnsigned();
break;
case 2:
len=this.getUnsignedShort();
break;
case 4:
len=this.getInt();
break;
}
if(len===0){
return "";
}
var _227=this.limit;
try{
this.limit=this.position+len;
return cs.decode(this);
}
finally{
this.limit=_227;
}
};
_1c5.getString=function(cs){
try{
return cs.decode(this);
}
finally{
this.position=this.limit;
}
};
_1c5.slice=function(){
return new ByteBuffer(this.array.slice(this.position,this.limit));
};
_1c5.flip=function(){
this.limit=this.position;
this.position=0;
this._mark=-1;
return this;
};
_1c5.rewind=function(){
this.position=0;
this._mark=-1;
return this;
};
_1c5.clear=function(){
this.position=0;
this.limit=this.capacity;
this._mark=-1;
return this;
};
_1c5.remaining=function(){
return (this.limit-this.position);
};
_1c5.hasRemaining=function(){
return (this.limit>this.position);
};
_1c5.skip=function(size){
this.position+=size;
return this;
};
_1c5.getHexDump=function(){
var _22a=this.array;
var pos=this.position;
var _22c=this.limit;
if(pos==_22c){
return "empty";
}
var _22d=[];
for(var i=pos;i<_22c;i++){
var hex=(_22a[i]||0).toString(16);
if(hex.length==1){
hex="0"+hex;
}
_22d.push(hex);
}
return _22d.join(" ");
};
_1c5.toString=_1c5.getHexDump;
_1c5.expand=function(_230){
return this.expandAt(this.position,_230);
};
_1c5.expandAt=function(i,_232){
var end=i+_232;
if(end>this.capacity){
this.capacity=end;
}
if(end>this.limit){
this.limit=end;
}
return this;
};
function _autoExpand(_234,_235){
if(_234.autoExpand){
_234.expand(_235);
}
return _234;
};
function _checkForRead(_236,_237){
var end=_236.position+_237;
if(end>_236.limit){
throw new Error("Buffer underflow");
}
return _236;
};
function _checkForReadAt(_239,_23a,_23b){
var end=_23a+_23b;
if(_23a<0||end>_239.limit){
throw new Error("Index out of bounds");
}
return _239;
};
function _checkForWriteAt(_23d,_23e,_23f){
var end=_23e+_23f;
if(_23e<0||end>_23d.limit){
throw new Error("Index out of bounds");
}
return _23d;
};
})();
function Charset(){
};
(function(){
var _241=Charset.prototype;
_241.decode=function(buf){
};
_241.encode=function(str,buf){
};
Charset.UTF8=(function(){
function UTF8(){
};
UTF8.prototype=new Charset();
var _245=UTF8.prototype;
_245.decode=function(buf){
var _247=buf.remaining();
var _248=_247<10000;
var _249=[];
var _24a=buf.array;
var _24b=buf.position;
var _24c=_24b+_247;
var _24d,_24e,_24f,_250;
for(var i=_24b;i<_24c;i++){
_24d=(_24a[i]&255);
var _252=charByteCount(_24d);
var _253=_24c-i;
if(_253<_252){
break;
}
var _254=null;
switch(_252){
case 1:
_254=_24d;
break;
case 2:
i++;
_24e=(_24a[i]&255);
_254=((_24d&31)<<6)|(_24e&63);
break;
case 3:
i++;
_24e=(_24a[i]&255);
i++;
_24f=(_24a[i]&255);
_254=((_24d&15)<<12)|((_24e&63)<<6)|(_24f&63);
break;
case 4:
i++;
_24e=(_24a[i]&255);
i++;
_24f=(_24a[i]&255);
i++;
_250=(_24a[i]&255);
_254=((_24d&7)<<18)|((_24e&63)<<12)|((_24f&63)<<6)|(_250&63);
break;
}
if(_248){
_249.push(_254);
}else{
_249.push(String.fromCharCode(_254));
}
}
if(_248){
return String.fromCharCode.apply(null,_249);
}else{
return _249.join("");
}
};
_245.encode=function(str,buf){
var _257=buf.position;
var mark=_257;
var _259=buf.array;
for(var i=0;i<str.length;i++){
var _25b=str.charCodeAt(i);
if(_25b<128){
_259[_257++]=_25b;
}else{
if(_25b<2048){
_259[_257++]=(_25b>>6)|192;
_259[_257++]=(_25b&63)|128;
}else{
if(_25b<65536){
_259[_257++]=(_25b>>12)|224;
_259[_257++]=((_25b>>6)&63)|128;
_259[_257++]=(_25b&63)|128;
}else{
if(_25b<1114112){
_259[_257++]=(_25b>>18)|240;
_259[_257++]=((_25b>>12)&63)|128;
_259[_257++]=((_25b>>6)&63)|128;
_259[_257++]=(_25b&63)|128;
}else{
throw new Error("Invalid UTF-8 string");
}
}
}
}
}
buf.position=_257;
buf.expandAt(_257,_257-mark);
};
_245.encodeAsByteArray=function(str){
var _25d=new Array();
for(var i=0;i<str.length;i++){
var _25f=str.charCodeAt(i);
if(_25f<128){
_25d.push(_25f);
}else{
if(_25f<2048){
_25d.push((_25f>>6)|192);
_25d.push((_25f&63)|128);
}else{
if(_25f<65536){
_25d.push((_25f>>12)|224);
_25d.push(((_25f>>6)&63)|128);
_25d.push((_25f&63)|128);
}else{
if(_25f<1114112){
_25d.push((_25f>>18)|240);
_25d.push(((_25f>>12)&63)|128);
_25d.push(((_25f>>6)&63)|128);
_25d.push((_25f&63)|128);
}else{
throw new Error("Invalid UTF-8 string");
}
}
}
}
}
return _25d;
};
_245.encodeByteArray=function(_260){
var _261=_260.length;
var _262=[];
for(var i=0;i<_261;i++){
var _264=_260[i];
if(_264<128){
_262.push(_264);
}else{
if(_264<2048){
_262.push((_264>>6)|192);
_262.push((_264&63)|128);
}else{
if(_264<65536){
_262.push((_264>>12)|224);
_262.push(((_264>>6)&63)|128);
_262.push((_264&63)|128);
}else{
if(_264<1114112){
_262.push((_264>>18)|240);
_262.push(((_264>>12)&63)|128);
_262.push(((_264>>6)&63)|128);
_262.push((_264&63)|128);
}else{
throw new Error("Invalid UTF-8 string");
}
}
}
}
}
return String.fromCharCode.apply(null,_262);
};
_245.encodeArrayBuffer=function(_265){
var buf=new Uint8Array(_265);
var _267=buf.length;
var _268=[];
for(var i=0;i<_267;i++){
var _26a=buf[i];
if(_26a<128){
_268.push(_26a);
}else{
if(_26a<2048){
_268.push((_26a>>6)|192);
_268.push((_26a&63)|128);
}else{
if(_26a<65536){
_268.push((_26a>>12)|224);
_268.push(((_26a>>6)&63)|128);
_268.push((_26a&63)|128);
}else{
if(_26a<1114112){
_268.push((_26a>>18)|240);
_268.push(((_26a>>12)&63)|128);
_268.push(((_26a>>6)&63)|128);
_268.push((_26a&63)|128);
}else{
throw new Error("Invalid UTF-8 string");
}
}
}
}
}
return String.fromCharCode.apply(null,_268);
};
_245.toByteArray=function(str){
var _26c=[];
var _26d,_26e,_26f,_270;
var _271=str.length;
for(var i=0;i<_271;i++){
_26d=(str.charCodeAt(i)&255);
var _273=charByteCount(_26d);
var _274=null;
if(_273+i>_271){
break;
}
switch(_273){
case 1:
_274=_26d;
break;
case 2:
i++;
_26e=(str.charCodeAt(i)&255);
_274=((_26d&31)<<6)|(_26e&63);
break;
case 3:
i++;
_26e=(str.charCodeAt(i)&255);
i++;
_26f=(str.charCodeAt(i)&255);
_274=((_26d&15)<<12)|((_26e&63)<<6)|(_26f&63);
break;
case 4:
i++;
_26e=(str.charCodeAt(i)&255);
i++;
_26f=(str.charCodeAt(i)&255);
i++;
_270=(str.charCodeAt(i)&255);
_274=((_26d&7)<<18)|((_26e&63)<<12)|((_26f&63)<<6)|(_270&63);
break;
}
_26c.push(_274&255);
}
return _26c;
};
function charByteCount(b){
if((b&128)===0){
return 1;
}
if((b&32)===0){
return 2;
}
if((b&16)===0){
return 3;
}
if((b&8)===0){
return 4;
}
throw new Error("Invalid UTF-8 bytes");
};
return new UTF8();
})();
})();
(function(){
var _276="WebSocket";
var _277=function(name){
this._name=name;
this._level=_277.Level.INFO;
};
(function(){
_277.Level={OFF:8,SEVERE:7,WARNING:6,INFO:5,CONFIG:4,FINE:3,FINER:2,FINEST:1,ALL:0};
var _279;
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name==="kaazing:logging"){
_279=tags[i].content;
break;
}
}
_277._logConf={};
if(_279){
var _27c=_279.split(",");
for(var i=0;i<_27c.length;i++){
var _27d=_27c[i].split("=");
_277._logConf[_27d[0]]=_27d[1];
}
}
var _27e={};
_277.getLogger=function(name){
var _280=_27e[name];
if(_280===undefined){
_280=new _277(name);
_27e[name]=_280;
}
return _280;
};
var _281=_277.prototype;
_281.setLevel=function(_282){
if(_282&&_282>=_277.Level.ALL&&_282<=_277.Level.OFF){
this._level=_282;
}
};
_281.isLoggable=function(_283){
for(var _284 in _277._logConf){
if(_277._logConf.hasOwnProperty(_284)){
if(this._name.match(_284)){
var _285=_277._logConf[_284];
if(_285){
return (_277.Level[_285]<=_283);
}
}
}
}
return (this._level<=_283);
};
var noop=function(){
};
var _287={};
_287[_277.Level.OFF]=noop;
_287[_277.Level.SEVERE]=(window.console)?(console.error||console.log||noop):noop;
_287[_277.Level.WARNING]=(window.console)?(console.warn||console.log||noop):noop;
_287[_277.Level.INFO]=(window.console)?(console.info||console.log||noop):noop;
_287[_277.Level.CONFIG]=(window.console)?(console.info||console.log||noop):noop;
_287[_277.Level.FINE]=(window.console)?(console.debug||console.log||noop):noop;
_287[_277.Level.FINER]=(window.console)?(console.debug||console.log||noop):noop;
_287[_277.Level.FINEST]=(window.console)?(console.debug||console.log||noop):noop;
_287[_277.Level.ALL]=(window.console)?(console.log||noop):noop;
_281.config=function(_288,_289){
this.log(_277.Level.CONFIG,_288,_289);
};
_281.entering=function(_28a,name,_28c){
if(this.isLoggable(_277.Level.FINER)){
if(browser=="chrome"||browser=="safari"){
_28a=console;
}
var _28d=_287[_277.Level.FINER];
if(_28c){
if(typeof (_28d)=="object"){
_28d("ENTRY "+name,_28c);
}else{
_28d.call(_28a,"ENTRY "+name,_28c);
}
}else{
if(typeof (_28d)=="object"){
_28d("ENTRY "+name);
}else{
_28d.call(_28a,"ENTRY "+name);
}
}
}
};
_281.exiting=function(_28e,name,_290){
if(this.isLoggable(_277.Level.FINER)){
var _291=_287[_277.Level.FINER];
if(browser=="chrome"||browser=="safari"){
_28e=console;
}
if(_290){
if(typeof (_291)=="object"){
_291("RETURN "+name,_290);
}else{
_291.call(_28e,"RETURN "+name,_290);
}
}else{
if(typeof (_291)=="object"){
_291("RETURN "+name);
}else{
_291.call(_28e,"RETURN "+name);
}
}
}
};
_281.fine=function(_292,_293){
this.log(_277.Level.FINE,_292,_293);
};
_281.finer=function(_294,_295){
this.log(_277.Level.FINER,_294,_295);
};
_281.finest=function(_296,_297){
this.log(_277.Level.FINEST,_296,_297);
};
_281.info=function(_298,_299){
this.log(_277.Level.INFO,_298,_299);
};
_281.log=function(_29a,_29b,_29c){
if(this.isLoggable(_29a)){
var _29d=_287[_29a];
if(browser=="chrome"||browser=="safari"){
_29b=console;
}
if(typeof (_29d)=="object"){
_29d(_29c);
}else{
_29d.call(_29b,_29c);
}
}
};
_281.severe=function(_29e,_29f){
this.log(_277.Level.SEVERE,_29e,_29f);
};
_281.warning=function(_2a0,_2a1){
this.log(_277.Level.WARNING,_2a0,_2a1);
};
})();
var ULOG=_277.getLogger("com.kaazing.gateway.client.loader.Utils");
var _2a3=function(key){
ULOG.entering(this,"Utils.getMetaValue",key);
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name===key){
var v=tags[i].content;
ULOG.exiting(this,"Utils.getMetaValue",v);
return v;
}
}
ULOG.exiting(this,"Utils.getMetaValue");
};
var _2a8=function(_2a9){
ULOG.entering(this,"Utils.arrayCopy",_2a9);
var _2aa=[];
for(var i=0;i<_2a9.length;i++){
_2aa.push(_2a9[i]);
}
return _2aa;
};
var _2ac=function(_2ad,_2ae){
ULOG.entering(this,"Utils.arrayFilter",{"array":_2ad,"callback":_2ae});
var _2af=[];
for(var i=0;i<_2ad.length;i++){
var elt=_2ad[i];
if(_2ae(elt)){
_2af.push(_2ad[i]);
}
}
return _2af;
};
var _2b2=function(_2b3,_2b4){
ULOG.entering(this,"Utils.indexOf",{"array":_2b3,"searchElement":_2b4});
for(var i=0;i<_2b3.length;i++){
if(_2b3[i]==_2b4){
ULOG.exiting(this,"Utils.indexOf",i);
return i;
}
}
ULOG.exiting(this,"Utils.indexOf",-1);
return -1;
};
var _2b6=function(s){
ULOG.entering(this,"Utils.decodeByteString",s);
var a=[];
for(var i=0;i<s.length;i++){
a.push(s.charCodeAt(i)&255);
}
var buf=new ByteBuffer(a);
var v=_2bc(buf,Charset.UTF8);
ULOG.exiting(this,"Utils.decodeByteString",v);
return v;
};
var _2bd=function(_2be){
ULOG.entering(this,"Utils.decodeArrayBuffer",_2be);
var buf=new Uint8Array(_2be);
var a=[];
for(var i=0;i<buf.length;i++){
a.push(buf[i]);
}
var buf=new ByteBuffer(a);
var s=_2bc(buf,Charset.UTF8);
ULOG.exiting(this,"Utils.decodeArrayBuffer",s);
return s;
};
var _2c3=function(_2c4){
ULOG.entering(this,"Utils.decodeArrayBuffer2ByteBuffer");
var buf=new Uint8Array(_2c4);
var a=[];
for(var i=0;i<buf.length;i++){
a.push(buf[i]);
}
ULOG.exiting(this,"Utils.decodeArrayBuffer2ByteBuffer");
return new ByteBuffer(a);
};
var _2c8=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _2ca="\n";
var _2cb=function(buf){
ULOG.entering(this,"Utils.encodeEscapedByte",buf);
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(n);
switch(chr){
case _2c8:
a.push(_2c8);
a.push(_2c8);
break;
case NULL:
a.push(_2c8);
a.push("0");
break;
case _2ca:
a.push(_2c8);
a.push("n");
break;
default:
a.push(chr);
}
}
var v=a.join("");
ULOG.exiting(this,"Utils.encodeEscapedBytes",v);
return v;
};
var _2d1=function(buf,_2d3){
ULOG.entering(this,"Utils.encodeByteString",{"buf":buf,"requiresEscaping":_2d3});
if(_2d3){
return _2cb(buf);
}else{
var _2d4=buf.array;
var _2d5=(buf.position==0&&buf.limit==_2d4.length)?_2d4:buf.getBytes(buf.remaining());
var _2d6=!(XMLHttpRequest.prototype.sendAsBinary);
for(var i=_2d5.length-1;i>=0;i--){
var _2d8=_2d5[i];
if(_2d8==0&&_2d6){
_2d5[i]=256;
}else{
if(_2d8<0){
_2d5[i]=_2d8&255;
}
}
}
var _2d9=0;
var _2da=[];
do{
var _2db=Math.min(_2d5.length-_2d9,10000);
partOfBytes=_2d5.slice(_2d9,_2d9+_2db);
_2d9+=_2db;
_2da.push(String.fromCharCode.apply(null,partOfBytes));
}while(_2d9<_2d5.length);
var _2dc=_2da.join("");
if(_2d5===_2d4){
for(var i=_2d5.length-1;i>=0;i--){
var _2d8=_2d5[i];
if(_2d8==256){
_2d5[i]=0;
}
}
}
ULOG.exiting(this,"Utils.encodeByteString",_2dc);
return _2dc;
}
};
var _2bc=function(buf,cs){
var _2df=buf.position;
var _2e0=buf.limit;
var _2e1=buf.array;
while(_2df<_2e0){
_2df++;
}
try{
buf.limit=_2df;
return cs.decode(buf);
}
finally{
if(_2df!=_2e0){
buf.limit=_2e0;
buf.position=_2df+1;
}
}
};
var _2e2=window.WebSocket;
var _2e3=(function(){
var _2e4=_277.getLogger("WebSocketNativeProxy");
var _2e5=function(){
this.parent;
this._listener;
this.code=1005;
this.reason="";
};
var _2e6=(browser=="safari"&&typeof (_2e2.CLOSING)=="undefined");
var _2e7=(browser=="android");
var _2e8=_2e5.prototype;
_2e8.connect=function(_2e9,_2ea){
_2e4.entering(this,"WebSocketNativeProxy.<init>",{"location":_2e9,"protocol":_2ea});
if((typeof (_2e2)==="undefined")||_2e7){
doError(this);
return;
}
if(_2e9.indexOf("javascript:")==0){
_2e9=_2e9.substr("javascript:".length);
}
var _2eb=_2e9.indexOf("?");
if(_2eb!=-1){
if(!/[\?&]\.kl=Y/.test(_2e9.substring(_2eb))){
_2e9+="&.kl=Y";
}
}else{
_2e9+="?.kl=Y";
}
this._sendQueue=[];
try{
if(_2ea){
this._requestedProtocol=_2ea;
this._delegate=new _2e2(_2e9,_2ea);
}else{
this._delegate=new _2e2(_2e9);
}
this._delegate.binaryType="arraybuffer";
}
catch(e){
_2e4.severe(this,"WebSocketNativeProxy.<init> "+e);
doError(this);
return;
}
bindHandlers(this);
};
_2e8.onerror=function(){
};
_2e8.onmessage=function(){
};
_2e8.onopen=function(){
};
_2e8.onclose=function(){
};
_2e8.close=function(code,_2ed){
_2e4.entering(this,"WebSocketNativeProxy.close");
if(code){
if(_2e6){
doCloseDraft76Compat(this,code,_2ed);
}else{
this._delegate.close(code,_2ed);
}
}else{
this._delegate.close();
}
};
function doCloseDraft76Compat(_2ee,code,_2f0){
_2ee.code=code|1005;
_2ee.reason=_2f0|"";
_2ee._delegate.close();
};
_2e8.send=function(_2f1){
_2e4.entering(this,"WebSocketNativeProxy.send",_2f1);
doSend(this,_2f1);
return;
};
_2e8.setListener=function(_2f2){
this._listener=_2f2;
};
_2e8.setIdleTimeout=function(_2f3){
_2e4.entering(this,"WebSocketNativeProxy.setIdleTimeout",_2f3);
this.lastMessageTimestamp=new Date().getTime();
this.idleTimeout=_2f3;
startIdleTimer(this,_2f3);
return;
};
function doSend(_2f4,_2f5){
_2e4.entering(this,"WebSocketNativeProxy.doSend",_2f5);
if(typeof (_2f5)=="string"){
_2f4._delegate.send(_2f5);
}else{
if(_2f5.byteLength||_2f5.size){
_2f4._delegate.send(_2f5);
}else{
if(_2f5.constructor==ByteBuffer){
_2f4._delegate.send(_2f5.getArrayBuffer(_2f5.remaining()));
}else{
_2e4.severe(this,"WebSocketNativeProxy.doSend called with unkown type "+typeof (_2f5));
throw new Error("Cannot call send() with that type");
}
}
}
};
function doError(_2f6,e){
_2e4.entering(this,"WebSocketNativeProxy.doError",e);
setTimeout(function(){
_2f6._listener.connectionFailed(_2f6.parent);
},0);
};
function encodeMessageData(_2f8,e){
var buf;
if(typeof e.data.byteLength!=="undefined"){
buf=_2c3(e.data);
}else{
buf=ByteBuffer.allocate(e.data.length);
if(_2f8.parent._isBinary&&_2f8.parent._balanced>1){
for(var i=0;i<e.data.length;i++){
buf.put(e.data.charCodeAt(i));
}
}else{
buf.putString(e.data,Charset.UTF8);
}
buf.flip();
}
return buf;
};
function messageHandler(_2fc,e){
_2e4.entering(this,"WebSocketNativeProxy.messageHandler",e);
_2fc.lastMessageTimestamp=new Date().getTime();
if(typeof (e.data)==="string"){
_2fc._listener.textMessageReceived(_2fc.parent,e.data);
}else{
_2fc._listener.binaryMessageReceived(_2fc.parent,e.data);
}
};
function closeHandler(_2fe,e){
_2e4.entering(this,"WebSocketNativeProxy.closeHandler",e);
unbindHandlers(_2fe);
if(_2e6){
_2fe._listener.connectionClosed(_2fe.parent,true,_2fe.code,_2fe.reason);
}else{
_2fe._listener.connectionClosed(_2fe.parent,e.wasClean,e.code,e.reason);
}
};
function errorHandler(_300,e){
_2e4.entering(this,"WebSocketNativeProxy.errorHandler",e);
_300._listener.connectionError(_300.parent,e);
};
function openHandler(_302,e){
_2e4.entering(this,"WebSocketNativeProxy.openHandler",e);
if(_2e6){
_302._delegate.protocol=_302._requestedProtocol;
}
_302._listener.connectionOpened(_302.parent,_302._delegate.protocol);
};
function bindHandlers(_304){
_2e4.entering(this,"WebSocketNativeProxy.bindHandlers");
var _305=_304._delegate;
_305.onopen=function(e){
openHandler(_304,e);
};
_305.onmessage=function(e){
messageHandler(_304,e);
};
_305.onclose=function(e){
closeHandler(_304,e);
};
_305.onerror=function(e){
errorHandler(_304,e);
};
_304.readyState=function(){
return _305.readyState;
};
};
function unbindHandlers(_30a){
_2e4.entering(this,"WebSocketNativeProxy.unbindHandlers");
var _30b=_30a._delegate;
_30b.onmessage=undefined;
_30b.onclose=undefined;
_30b.onopen=undefined;
_30b.onerror=undefined;
_30a.readyState=WebSocket.CLOSED;
};
function startIdleTimer(_30c,_30d){
stopIdleTimer(_30c);
_30c.idleTimer=setTimeout(function(){
idleTimerHandler(_30c);
},_30d);
};
function idleTimerHandler(_30e){
var _30f=new Date().getTime();
var _310=_30f-_30e.lastMessageTimestamp;
var _311=_30e.idleTimeout;
if(_310>_311){
try{
var _312=_30e._delegate;
if(_312){
unbindHandlers(_30e);
_312.close();
}
}
finally{
_30e._listener.connectionClosed(_30e.parent,false,1006,"");
}
}else{
startIdleTimer(_30e,_311-_310);
}
};
function stopIdleTimer(_313){
if(_313.idleTimer!=null){
clearTimeout(_313.idleTimer);
_313.IdleTimer=null;
}
};
return _2e5;
})();
var _314=(function(){
var _315=_277.getLogger("WebSocketEmulatedFlashProxy");
var _316=function(){
this.parent;
this._listener;
};
var _317=_316.prototype;
_317.connect=function(_318,_319){
_315.entering(this,"WebSocketEmulatedFlashProxy.<init>",_318);
this.URL=_318;
try{
_31a(this,_318,_319);
}
catch(e){
_315.severe(this,"WebSocketEmulatedFlashProxy.<init> "+e);
doError(this,e);
}
this.constructor=_316;
_315.exiting(this,"WebSocketEmulatedFlashProxy.<init>");
};
_317.setListener=function(_31b){
this._listener=_31b;
};
_316._flashBridge={};
_316._flashBridge.readyWaitQueue=[];
_316._flashBridge.failWaitQueue=[];
_316._flashBridge.flashHasLoaded=false;
_316._flashBridge.flashHasFailed=false;
_317.URL="";
_317.readyState=0;
_317.bufferedAmount=0;
_317.connectionOpened=function(_31c,_31d){
var _31d=_31d.split("\n");
for(var i=0;i<_31d.length;i++){
var _31f=_31d[i].split(":");
_31c.responseHeaders[_31f[0]]=_31f[1];
}
this._listener.connectionOpened(_31c,"");
};
_317.connectionClosed=function(_320,_321,code,_323){
this._listener.connectionClosed(_320,_321,code,_323);
};
_317.connectionFailed=function(_324){
this._listener.connectionFailed(_324);
};
_317.binaryMessageReceived=function(_325,data){
this._listener.binaryMessageReceived(_325,data);
};
_317.textMessageReceived=function(_327,s){
this._listener.textMessageReceived(_327,s);
};
_317.redirected=function(_329,_32a){
this._listener.redirected(_329,_32a);
};
_317.authenticationRequested=function(_32b,_32c,_32d){
this._listener.authenticationRequested(_32b,_32c,_32d);
};
_317.send=function(data){
_315.entering(this,"WebSocketEmulatedFlashProxy.send",data);
switch(this.readyState){
case 0:
_315.severe(this,"WebSocketEmulatedFlashProxy.send: readyState is 0");
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
_315.severe(this,"WebSocketEmulatedFlashProxy.send: Data is null");
throw new Error("data is null");
}
if(typeof (data)=="string"){
_316._flashBridge.sendText(this._instanceId,data);
}else{
if(data.constructor==ByteBuffer){
var _32f;
var a=[];
while(data.remaining()){
a.push(String.fromCharCode(data.get()));
}
var _32f=a.join("");
_316._flashBridge.sendByteString(this._instanceId,_32f);
}else{
if(data.byteLength){
var _32f;
var a=[];
var _331=new DataView(data);
for(var i=0;i<data.byteLength;i++){
a.push(String.fromCharCode(_331.getUint8(i)));
}
var _32f=a.join("");
_316._flashBridge.sendByteString(this._instanceId,_32f);
}else{
if(data.size){
var _333=this;
var cb=function(_335){
_316._flashBridge.sendByteString(_333._instanceId,_335);
};
BlobUtils.asBinaryString(cb,data);
return;
}else{
_315.severe(this,"WebSocketEmulatedFlashProxy.send: Data is on invalid type "+typeof (data));
throw new Error("Invalid type");
}
}
}
}
_336(this);
return true;
break;
case 2:
return false;
break;
default:
_315.severe(this,"WebSocketEmulatedFlashProxy.send: Invalid readyState "+this.readyState);
throw new Error("INVALID_STATE_ERR");
}
};
_317.close=function(code,_338){
_315.entering(this,"WebSocketEmulatedFlashProxy.close");
switch(this.readyState){
case 0:
case 1:
_316._flashBridge.disconnect(this._instanceId,code,_338);
break;
}
};
_317.disconnect=_317.close;
var _336=function(_339){
_315.entering(this,"WebSocketEmulatedFlashProxy.updateBufferedAmount");
_339.bufferedAmount=_316._flashBridge.getBufferedAmount(_339._instanceId);
if(_339.bufferedAmount!=0){
setTimeout(function(){
_336(_339);
},1000);
}
};
var _31a=function(_33a,_33b,_33c){
_315.entering(this,"WebSocketEmulatedFlashProxy.registerWebSocket",_33b);
var _33d=function(key,_33f){
_33f[key]=_33a;
_33a._instanceId=key;
};
var _340=function(){
doError(_33a);
};
var _341=[];
if(_33a.parent.requestHeaders&&_33a.parent.requestHeaders.length>0){
for(var i=0;i<_33a.parent.requestHeaders.length;i++){
_341.push(_33a.parent.requestHeaders[i].label+":"+_33a.parent.requestHeaders[i].value);
}
}
_316._flashBridge.registerWebSocketEmulated(_33b,_341.join("\n"),_33d,_340);
};
function doError(_343,e){
_315.entering(this,"WebSocketEmulatedFlashProxy.doError",e);
setTimeout(function(){
_343._listener.connectionFailed(_343.parent);
},0);
};
return _316;
})();
var _345=(function(){
var _346=_277.getLogger("WebSocketRtmpFlashProxy");
var _347=function(){
this.parent;
this._listener;
};
var _348=_347.prototype;
_348.connect=function(_349,_34a){
_346.entering(this,"WebSocketRtmpFlashProxy.<init>",_349);
this.URL=_349;
try{
_34b(this,_349,_34a);
}
catch(e){
_346.severe(this,"WebSocketRtmpFlashProxy.<init> "+e);
doError(this,e);
}
this.constructor=_347;
_346.exiting(this,"WebSocketRtmpFlashProxy.<init>");
};
_348.setListener=function(_34c){
this._listener=_34c;
};
_314._flashBridge={};
_314._flashBridge.readyWaitQueue=[];
_314._flashBridge.failWaitQueue=[];
_314._flashBridge.flashHasLoaded=false;
_314._flashBridge.flashHasFailed=false;
_348.URL="";
_348.readyState=0;
_348.bufferedAmount=0;
_348.connectionOpened=function(_34d,_34e){
var _34e=_34e.split("\n");
for(var i=0;i<_34e.length;i++){
var _350=_34e[i].split(":");
_34d.responseHeaders[_350[0]]=_350[1];
}
this._listener.connectionOpened(_34d,"");
};
_348.connectionClosed=function(_351,_352,code,_354){
this._listener.connectionClosed(_351,_352,code,_354);
};
_348.connectionFailed=function(_355){
this._listener.connectionFailed(_355);
};
_348.binaryMessageReceived=function(_356,data){
this._listener.binaryMessageReceived(_356,data);
};
_348.textMessageReceived=function(_358,s){
this._listener.textMessageReceived(_358,s);
};
_348.redirected=function(_35a,_35b){
this._listener.redirected(_35a,_35b);
};
_348.authenticationRequested=function(_35c,_35d,_35e){
this._listener.authenticationRequested(_35c,_35d,_35e);
};
_348.send=function(data){
_346.entering(this,"WebSocketRtmpFlashProxy.send",data);
switch(this.readyState){
case 0:
_346.severe(this,"WebSocketRtmpFlashProxy.send: readyState is 0");
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
_346.severe(this,"WebSocketRtmpFlashProxy.send: Data is null");
throw new Error("data is null");
}
if(typeof (data)=="string"){
_314._flashBridge.sendText(this._instanceId,data);
}else{
if(typeof (data.array)=="object"){
var _360;
var a=[];
var b;
while(data.remaining()){
b=data.get();
a.push(String.fromCharCode(b));
}
var _360=a.join("");
_314._flashBridge.sendByteString(this._instanceId,_360);
return;
}else{
_346.severe(this,"WebSocketRtmpFlashProxy.send: Data is on invalid type "+typeof (data));
throw new Error("Invalid type");
}
}
_363(this);
return true;
break;
case 2:
return false;
break;
default:
_346.severe(this,"WebSocketRtmpFlashProxy.send: Invalid readyState "+this.readyState);
throw new Error("INVALID_STATE_ERR");
}
};
_348.close=function(code,_365){
_346.entering(this,"WebSocketRtmpFlashProxy.close");
switch(this.readyState){
case 1:
case 2:
_314._flashBridge.disconnect(this._instanceId,code,_365);
break;
}
};
_348.disconnect=_348.close;
var _363=function(_366){
_346.entering(this,"WebSocketRtmpFlashProxy.updateBufferedAmount");
_366.bufferedAmount=_314._flashBridge.getBufferedAmount(_366._instanceId);
if(_366.bufferedAmount!=0){
setTimeout(function(){
_363(_366);
},1000);
}
};
var _34b=function(_367,_368,_369){
_346.entering(this,"WebSocketRtmpFlashProxy.registerWebSocket",_368);
var _36a=function(key,_36c){
_36c[key]=_367;
_367._instanceId=key;
};
var _36d=function(){
doError(_367);
};
var _36e=[];
if(_367.parent.requestHeaders&&_367.parent.requestHeaders.length>0){
for(var i=0;i<_367.parent.requestHeaders.length;i++){
_36e.push(_367.parent.requestHeaders[i].label+":"+_367.parent.requestHeaders[i].value);
}
}
_314._flashBridge.registerWebSocketRtmp(_368,_36e.join("\n"),_36a,_36d);
};
function doError(_370,e){
_346.entering(this,"WebSocketRtmpFlashProxy.doError",e);
setTimeout(function(){
_370._listener.connectionFailed(_370.parent);
},0);
};
return _347;
})();
(function(){
var _372=_277.getLogger("com.kaazing.gateway.client.loader.FlashBridge");
var _373={};
_314._flashBridge.registerWebSocketEmulated=function(_374,_375,_376,_377){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated",{"location":_374,"callback":_376,"errback":_377});
var _378=function(){
var key=_314._flashBridge.doRegisterWebSocketEmulated(_374,_375);
_376(key,_373);
};
if(_314._flashBridge.flashHasLoaded){
if(_314._flashBridge.flashHasFailed){
_377();
}else{
_378();
}
}else{
this.readyWaitQueue.push(_378);
this.failWaitQueue.push(_377);
}
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated");
};
_314._flashBridge.doRegisterWebSocketEmulated=function(_37a,_37b){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketEmulated",{"location":_37a,"headers":_37b});
var key=_314._flashBridge.elt.registerWebSocketEmulated(_37a,_37b);
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketEmulated",key);
return key;
};
_314._flashBridge.registerWebSocketRtmp=function(_37d,_37e,_37f,_380){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketRtmp",{"location":_37d,"callback":_37f,"errback":_380});
var _381=function(){
var key=_314._flashBridge.doRegisterWebSocketRtmp(_37d,_37e);
_37f(key,_373);
};
if(_314._flashBridge.flashHasLoaded){
if(_314._flashBridge.flashHasFailed){
_380();
}else{
_381();
}
}else{
this.readyWaitQueue.push(_381);
this.failWaitQueue.push(_380);
}
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated");
};
_314._flashBridge.doRegisterWebSocketRtmp=function(_383,_384){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketRtmp",{"location":_383,"protocol":_384});
var key=_314._flashBridge.elt.registerWebSocketRtmp(_383,_384);
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketRtmp",key);
return key;
};
_314._flashBridge.onready=function(){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.onready");
var _386=_314._flashBridge.readyWaitQueue;
for(var i=0;i<_386.length;i++){
var _388=_386[i];
_388();
}
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.onready");
};
_314._flashBridge.onfail=function(){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.onfail");
var _389=_314._flashBridge.failWaitQueue;
for(var i=0;i<_389.length;i++){
var _38b=_389[i];
_38b();
}
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.onfail");
};
_314._flashBridge.connectionOpened=function(key,_38d){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionOpened",key);
_373[key].readyState=1;
_373[key].connectionOpened(_373[key].parent,_38d);
_38e();
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionOpened");
};
_314._flashBridge.connectionClosed=function(key,_390,code,_392){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionClosed",key);
_373[key].readyState=2;
_373[key].connectionClosed(_373[key].parent,_390,code,_392);
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionClosed");
};
_314._flashBridge.connectionFailed=function(key){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionFailed",key);
_373[key].connectionFailed(_373[key].parent);
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionFailed");
};
_314._flashBridge.binaryMessageReceived=function(key,data){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.binaryMessageReceived",{"key":key,"data":data});
var _396=_373[key];
if(_396.readyState==1){
var buf=ByteBuffer.allocate(data.length);
for(var i=0;i<data.length;i++){
buf.put(data[i]);
}
buf.flip();
_396.binaryMessageReceived(_396.parent,buf);
}
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.binaryMessageReceived");
};
_314._flashBridge.textMessageReceived=function(key,data){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.textMessageReceived",{"key":key,"data":data});
var _39b=_373[key];
if(_39b.readyState==1){
_39b.textMessageReceived(_39b.parent,unescape(data));
}
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.textMessageReceived");
};
_314._flashBridge.redirected=function(key,_39d){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.redirected",{"key":key,"data":_39d});
var _39e=_373[key];
_39e.redirected(_39e.parent,_39d);
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.redirected");
};
_314._flashBridge.authenticationRequested=function(key,_3a0,_3a1){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.authenticationRequested",{"key":key,"data":_3a0});
var _3a2=_373[key];
_3a2.authenticationRequested(_3a2.parent,_3a0,_3a1);
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.authenticationRequested");
};
var _38e=function(){
_372.entering(this,"WebSocketEmulatedFlashProxy.killLoadingBar");
if(browser==="firefox"){
var e=document.createElement("iframe");
e.style.display="none";
document.body.appendChild(e);
document.body.removeChild(e);
}
};
_314._flashBridge.sendText=function(key,_3a5){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.sendText",{"key":key,"message":_3a5});
this.elt.processTextMessage(key,escape(_3a5));
setTimeout(_38e,200);
};
_314._flashBridge.sendByteString=function(key,_3a7){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.sendByteString",{"key":key,"message":_3a7});
this.elt.processBinaryMessage(key,escape(_3a7));
setTimeout(_38e,200);
};
_314._flashBridge.disconnect=function(key,code,_3aa){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.disconnect",key);
this.elt.processClose(key,code,_3aa);
};
_314._flashBridge.getBufferedAmount=function(key){
_372.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.getBufferedAmount",key);
var v=this.elt.getBufferedAmount(key);
_372.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.getBufferedAmount",v);
return v;
};
})();
(function(){
var _3ad=function(_3ae){
var self=this;
var _3b0=3000;
var ID="Loader";
var ie=false;
var _3b3=-1;
self.elt=null;
var _3b4=function(){
var exp=new RegExp(".*"+_3ae+".*.js$");
var _3b6=document.getElementsByTagName("script");
for(var i=0;i<_3b6.length;i++){
if(_3b6[i].src){
var name=(_3b6[i].src).match(exp);
if(name){
name=name.pop();
var _3b9=name.split("/");
_3b9.pop();
if(_3b9.length>0){
return _3b9.join("/")+"/";
}else{
return "";
}
}
}
}
};
var _3ba=_3b4();
var _3bb=_3ba+"Loader.swf";
self.loader=function(){
var _3bc="flash";
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name==="kaazing:upgrade"){
_3bc=tags[i].content;
}
}
if(_3bc!="flash"||!_3bf([9,0,115])){
_3c0();
}else{
_3b3=setTimeout(_3c0,_3b0);
_3c1();
}
};
self.clearFlashTimer=function(){
clearTimeout(_3b3);
_3b3="cleared";
setTimeout(function(){
_3c2(self.elt.handshake(_3ae));
},0);
};
var _3c2=function(_3c3){
if(_3c3){
_314._flashBridge.flashHasLoaded=true;
_314._flashBridge.elt=self.elt;
_314._flashBridge.onready();
}else{
_3c0();
}
window.___Loader=undefined;
};
var _3c0=function(){
_314._flashBridge.flashHasLoaded=true;
_314._flashBridge.flashHasFailed=true;
_314._flashBridge.onfail();
};
var _3c4=function(){
var _3c5=null;
if(typeof (ActiveXObject)!="undefined"){
try{
ie=true;
var swf=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
var _3c7=swf.GetVariable("$version");
var _3c8=_3c7.split(" ")[1].split(",");
_3c5=[];
for(var i=0;i<_3c8.length;i++){
_3c5[i]=parseInt(_3c8[i]);
}
}
catch(e){
ie=false;
}
}
if(typeof navigator.plugins!="undefined"){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _3c7=navigator.plugins["Shockwave Flash"].description;
_3c7=_3c7.replace(/\s*r/g,".");
var _3c8=_3c7.split(" ")[2].split(".");
_3c5=[];
for(var i=0;i<_3c8.length;i++){
_3c5[i]=parseInt(_3c8[i]);
}
}
}
var _3ca=navigator.userAgent;
if(_3c5!==null&&_3c5[0]===10&&_3c5[1]===0&&_3ca.indexOf("Windows NT 6.0")!==-1){
_3c5=null;
}
if(_3ca.indexOf("MSIE 6.0")==-1&&_3ca.indexOf("MSIE 7.0")==-1){
if(_3ca.indexOf("MSIE 8.0")>0||_3ca.indexOf("MSIE 9.0")>0){
if(typeof (XDomainRequest)!=="undefined"){
_3c5=null;
}
}else{
_3c5=null;
}
}
return _3c5;
};
var _3bf=function(_3cb){
var _3cc=_3c4();
if(_3cc==null){
return false;
}
for(var i=0;i<Math.max(_3cc.length,_3cb.length);i++){
var _3ce=_3cc[i]-_3cb[i];
if(_3ce!=0){
return (_3ce>0)?true:false;
}
}
return true;
};
var _3c1=function(){
if(ie){
var elt=document.createElement("div");
document.body.appendChild(elt);
elt.outerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" height=\"0\" width=\"0\" id=\""+ID+"\"><param name=\"movie\" value=\""+_3bb+"\"></param></object>";
self.elt=document.getElementById(ID);
}else{
var elt=document.createElement("object");
elt.setAttribute("type","application/x-shockwave-flash");
elt.setAttribute("width",0);
elt.setAttribute("height",0);
elt.setAttribute("id",ID);
elt.setAttribute("data",_3bb);
document.body.appendChild(elt);
self.elt=elt;
}
};
self.attachToOnload=function(_3d0){
if(window.addEventListener){
window.addEventListener("load",_3d0,true);
}else{
if(window.attachEvent){
window.attachEvent("onload",_3d0);
}else{
onload=_3d0;
}
}
};
if(document.readyState==="complete"){
self.loader();
}else{
self.attachToOnload(self.loader);
}
};
var _3d1=(function(){
var _3d2=function(_3d3){
this.HOST=new _3d2(0);
this.USERINFO=new _3d2(1);
this.PORT=new _3d2(2);
this.PATH=new _3d2(3);
this.ordinal=_3d3;
};
return _3d2;
})();
var _3d4=(function(){
var _3d5=function(){
};
_3d5.getRealm=function(_3d6){
var _3d7=_3d6.authenticationParameters;
if(_3d7==null){
return null;
}
var _3d8=/realm=(\"(.*)\")/i;
var _3d9=_3d8.exec(_3d7);
return (_3d9!=null&&_3d9.length>=3)?_3d9[2]:null;
};
return _3d5;
})();
function Dictionary(){
this.Keys=new Array();
};
var _3da=(function(){
var _3db=function(_3dc){
this.weakKeys=_3dc;
this.elements=[];
this.dictionary=new Dictionary();
};
var _3dd=_3db.prototype;
_3dd.getlength=function(){
return this.elements.length;
};
_3dd.getItemAt=function(_3de){
return this.dictionary[this.elements[_3de]];
};
_3dd.get=function(key){
var _3e0=this.dictionary[key];
if(_3e0==undefined){
_3e0=null;
}
return _3e0;
};
_3dd.remove=function(key){
for(var i=0;i<this.elements.length;i++){
var _3e3=(this.weakKeys&&(this.elements[i]==key));
var _3e4=(!this.weakKeys&&(this.elements[i]===key));
if(_3e3||_3e4){
this.elements.remove(i);
this.dictionary[this.elements[i]]=undefined;
break;
}
}
};
_3dd.put=function(key,_3e6){
this.remove(key);
this.elements.push(key);
this.dictionary[key]=_3e6;
};
_3dd.isEmpty=function(){
return this.length==0;
};
_3dd.containsKey=function(key){
for(var i=0;i<this.elements.length;i++){
var _3e9=(this.weakKeys&&(this.elements[i]==key));
var _3ea=(!this.weakKeys&&(this.elements[i]===key));
if(_3e9||_3ea){
return true;
}
}
return false;
};
_3dd.keySet=function(){
return this.elements;
};
_3dd.getvalues=function(){
var _3eb=[];
for(var i=0;i<this.elements.length;i++){
_3eb.push(this.dictionary[this.elements[i]]);
}
return _3eb;
};
return _3db;
})();
var Node=(function(){
var Node=function(){
this.name="";
this.kind="";
this.values=[];
this.children=new _3da();
};
var _3ef=Node.prototype;
_3ef.getWildcardChar=function(){
return "*";
};
_3ef.addChild=function(name,kind){
if(name==null||name.length==0){
throw new ArgumentError("A node may not have a null name.");
}
var _3f2=Node.createNode(name,this,kind);
this.children.put(name,_3f2);
return _3f2;
};
_3ef.hasChild=function(name,kind){
return null!=this.getChild(name)&&kind==this.getChild(name).kind;
};
_3ef.getChild=function(name){
return this.children.get(name);
};
_3ef.getDistanceFromRoot=function(){
var _3f6=0;
var _3f7=this;
while(!_3f7.isRootNode()){
_3f6++;
_3f7=_3f7.parent;
}
return _3f6;
};
_3ef.appendValues=function(){
if(this.isRootNode()){
throw new ArgumentError("Cannot set a values on the root node.");
}
if(this.values!=null){
for(var k=0;k<arguments.length;k++){
var _3f9=arguments[k];
this.values.push(_3f9);
}
}
};
_3ef.removeValue=function(_3fa){
if(this.isRootNode()){
return;
}
for(var i=0;i<this.values.length;i++){
if(this.values[i]==_3fa){
this.values.splice(i,1);
}
}
};
_3ef.getValues=function(){
return this.values;
};
_3ef.hasValues=function(){
return this.values!=null&&this.values.length>0;
};
_3ef.isRootNode=function(){
return this.parent==null;
};
_3ef.hasChildren=function(){
return this.children!=null&&this.children.getlength()>0;
};
_3ef.isWildcard=function(){
return this.name!=null&&this.name==this.getWildcardChar();
};
_3ef.hasWildcardChild=function(){
return this.hasChildren()&&this.children.containsKey(this.getWildcardChar());
};
_3ef.getFullyQualifiedName=function(){
var b=new String();
var name=[];
var _3fe=this;
while(!_3fe.isRootNode()){
name.push(_3fe.name);
_3fe=_3fe.parent;
}
name=name.reverse();
for(var k=0;k<name.length;k++){
b+=name[k];
b+=".";
}
if(b.length>=1&&b.charAt(b.length-1)=="."){
b=b.slice(0,b.length-1);
}
return b.toString();
};
_3ef.getChildrenAsList=function(){
return this.children.getvalues();
};
_3ef.findBestMatchingNode=function(_400,_401){
var _402=this.findAllMatchingNodes(_400,_401);
var _403=null;
var _404=0;
for(var i=0;i<_402.length;i++){
var node=_402[i];
if(node.getDistanceFromRoot()>_404){
_404=node.getDistanceFromRoot();
_403=node;
}
}
return _403;
};
_3ef.findAllMatchingNodes=function(_407,_408){
var _409=[];
var _40a=this.getChildrenAsList();
for(var i=0;i<_40a.length;i++){
var node=_40a[i];
var _40d=node.matches(_407,_408);
if(_40d<0){
continue;
}
if(_40d>=_407.length){
do{
if(node.hasValues()){
_409.push(node);
}
if(node.hasWildcardChild()){
var _40e=node.getChild(this.getWildcardChar());
if(_40e.kind!=this.kind){
node=null;
}else{
node=_40e;
}
}else{
node=null;
}
}while(node!=null);
}else{
var _40f=node.findAllMatchingNodes(_407,_40d);
for(var j=0;j<_40f.length;j++){
_409.push(_40f[j]);
}
}
}
return _409;
};
_3ef.matches=function(_411,_412){
if(_412<0||_412>=_411.length){
return -1;
}
if(this.matchesToken(_411[_412])){
return _412+1;
}
if(!this.isWildcard()){
return -1;
}else{
if(this.kind!=_411[_412].kind){
return -1;
}
do{
_412++;
}while(_412<_411.length&&this.kind==_411[_412].kind);
return _412;
}
};
_3ef.matchesToken=function(_413){
return this.name==_413.name&&this.kind==_413.kind;
};
Node.createNode=function(name,_415,kind){
var node=new Node();
node.name=name;
node.parent=_415;
node.kind=kind;
return node;
};
return Node;
})();
var _418=(function(){
var _419=function(name,kind){
this.kind=kind;
this.name=name;
};
return _419;
})();
window.Oid=(function(){
var Oid=function(data){
this.rep=data;
};
var _41e=Oid.prototype;
_41e.asArray=function(){
return this.rep;
};
_41e.asString=function(){
var s="";
for(var i=0;i<this.rep.length;i++){
s+=(this.rep[i].toString());
s+=".";
}
if(s.length>0&&s.charAt(s.length-1)=="."){
s=s.slice(0,s.length-1);
}
return s;
};
Oid.create=function(data){
return new Oid(data.split("."));
};
return Oid;
})();
var _422=(function(){
var _423=function(){
};
_423.create=function(_424,_425,_426){
var _427=_424+":"+_425;
var _428=[];
for(var i=0;i<_427.length;++i){
_428.push(_427.charCodeAt(i));
}
var _42a="Basic "+Base64.encode(_428);
return new ChallengeResponse(_42a,_426);
};
return _423;
})();
function InternalDefaultChallengeHandler(){
this.canHandle=function(_42b){
return false;
};
this.handle=function(_42c,_42d){
_42d(null);
};
};
window.PasswordAuthentication=(function(){
function PasswordAuthentication(_42e,_42f){
this.username=_42e;
this.password=_42f;
};
PasswordAuthentication.prototype.clear=function(){
this.username=null;
this.password=null;
};
return PasswordAuthentication;
})();
window.ChallengeRequest=(function(){
var _430=function(_431,_432){
if(_431==null){
throw new Error("location is not defined.");
}
if(_432==null){
return;
}
var _433="Application ";
if(_432.indexOf(_433)==0){
_432=_432.substring(_433.length);
}
this.location=_431;
this.authenticationParameters=null;
var _434=_432.indexOf(" ");
if(_434==-1){
this.authenticationScheme=_432;
}else{
this.authenticationScheme=_432.substring(0,_434);
if(_432.length>_434+1){
this.authenticationParameters=_432.substring(_434+1);
}
}
};
return _430;
})();
window.ChallengeResponse=(function(){
var _435=function(_436,_437){
this.credentials=_436;
this.nextChallengeHandler=_437;
};
var _438=_435.prototype;
_438.clearCredentials=function(){
if(this.credentials!=null){
this.credentials=null;
}
};
return _435;
})();
window.BasicChallengeHandler=(function(){
var _439=function(){
this.loginHandler=undefined;
this.loginHandlersByRealm={};
};
var _43a=_439.prototype;
_43a.setRealmLoginHandler=function(_43b,_43c){
if(_43b==null){
throw new ArgumentError("null realm");
}
if(_43c==null){
throw new ArgumentError("null loginHandler");
}
this.loginHandlersByRealm[_43b]=_43c;
return this;
};
_43a.canHandle=function(_43d){
return _43d!=null&&"Basic"==_43d.authenticationScheme;
};
_43a.handle=function(_43e,_43f){
if(_43e.location!=null){
var _440=this.loginHandler;
var _441=_3d4.getRealm(_43e);
if(_441!=null&&this.loginHandlersByRealm[_441]!=null){
_440=this.loginHandlersByRealm[_441];
}
var _442=this;
if(_440!=null){
_440(function(_443){
if(_443!=null&&_443.username!=null){
_43f(_422.create(_443.username,_443.password,_442));
}else{
_43f(null);
}
});
return;
}
}
_43f(null);
};
_43a.loginHandler=function(_444){
_444(null);
};
return _439;
})();
window.DispatchChallengeHandler=(function(){
var _445=function(){
this.rootNode=new Node();
var _446="^(.*)://(.*)";
this.SCHEME_URI_PATTERN=new RegExp(_446);
};
function delChallengeHandlerAtLocation(_447,_448,_449){
var _44a=tokenize(_448);
var _44b=_447;
for(var i=0;i<_44a.length;i++){
var _44d=_44a[i];
if(!_44b.hasChild(_44d.name,_44d.kind)){
return;
}else{
_44b=_44b.getChild(_44d.name);
}
}
_44b.removeValue(_449);
};
function addChallengeHandlerAtLocation(_44e,_44f,_450){
var _451=tokenize(_44f);
var _452=_44e;
for(var i=0;i<_451.length;i++){
var _454=_451[i];
if(!_452.hasChild(_454.name,_454.kind)){
_452=_452.addChild(_454.name,_454.kind);
}else{
_452=_452.getChild(_454.name);
}
}
_452.appendValues(_450);
};
function lookupByLocation(_455,_456){
var _457=new Array();
if(_456!=null){
var _458=findBestMatchingNode(_455,_456);
if(_458!=null){
return _458.values;
}
}
return _457;
};
function lookupByRequest(_459,_45a){
var _45b=null;
var _45c=_45a.location;
if(_45c!=null){
var _45d=findBestMatchingNode(_459,_45c);
if(_45d!=null){
var _45e=_45d.getValues();
if(_45e!=null){
for(var i=0;i<_45e.length;i++){
var _460=_45e[i];
if(_460.canHandle(_45a)){
_45b=_460;
break;
}
}
}
}
}
return _45b;
};
function findBestMatchingNode(_461,_462){
var _463=tokenize(_462);
var _464=0;
return _461.findBestMatchingNode(_463,_464);
};
function tokenize(uri){
var _466=new Array();
if(uri==null||uri.length==0){
return _466;
}
var _467=new RegExp("^(([^:/?#]+):(//))?([^/?#]*)?([^?#]*)(\\?([^#]*))?(#(.*))?");
var _468=_467.exec(uri);
if(_468==null){
return _466;
}
var _469=_468[2]||"http";
var _46a=_468[4];
var path=_468[5];
var _46c=null;
var _46d=null;
var _46e=null;
var _46f=null;
if(_46a!=null){
var host=_46a;
var _471=host.indexOf("@");
if(_471>=0){
_46d=host.substring(0,_471);
host=host.substring(_471+1);
var _472=_46d.indexOf(":");
if(_472>=0){
_46e=_46d.substring(0,_472);
_46f=_46d.substring(_472+1);
}
}
var _473=host.indexOf(":");
if(_473>=0){
_46c=host.substring(_473+1);
host=host.substring(0,_473);
}
}else{
throw new ArgumentError("Hostname is required.");
}
var _474=host.split(/\./);
_474.reverse();
for(var k=0;k<_474.length;k++){
_466.push(new _418(_474[k],_3d1.HOST));
}
if(_46c!=null){
_466.push(new _418(_46c,_3d1.PORT));
}else{
if(getDefaultPort(_469)>0){
_466.push(new _418(getDefaultPort(_469).toString(),_3d1.PORT));
}
}
if(_46d!=null){
if(_46e!=null){
_466.push(new _418(_46e,_3d1.USERINFO));
}
if(_46f!=null){
_466.push(new _418(_46f,_3d1.USERINFO));
}
if(_46e==null&&_46f==null){
_466.push(new _418(_46d,_3d1.USERINFO));
}
}
if(isNotBlank(path)){
if(path.charAt(0)=="/"){
path=path.substring(1);
}
if(isNotBlank(path)){
var _476=path.split("/");
for(var p=0;p<_476.length;p++){
var _478=_476[p];
_466.push(new _418(_478,_3d1.PATH));
}
}
}
return _466;
};
function getDefaultPort(_479){
if(defaultPortsByScheme[_479.toLowerCase()]!=null){
return defaultPortsByScheme[_479];
}else{
return -1;
}
};
function defaultPortsByScheme(){
http=80;
ws=80;
wss=443;
https=443;
};
function isNotBlank(s){
return s!=null&&s.length>0;
};
var _47b=_445.prototype;
_47b.clear=function(){
this.rootNode=new Node();
};
_47b.canHandle=function(_47c){
return lookupByRequest(this.rootNode,_47c)!=null;
};
_47b.handle=function(_47d,_47e){
var _47f=lookupByRequest(this.rootNode,_47d);
if(_47f==null){
return null;
}
return _47f.handle(_47d,_47e);
};
_47b.register=function(_480,_481){
if(_480==null||_480.length==0){
throw new Error("Must specify a location to handle challenges upon.");
}
if(_481==null){
throw new Error("Must specify a handler to handle challenges.");
}
addChallengeHandlerAtLocation(this.rootNode,_480,_481);
return this;
};
_47b.unregister=function(_482,_483){
if(_482==null||_482.length==0){
throw new Error("Must specify a location to un-register challenge handlers upon.");
}
if(_483==null){
throw new Error("Must specify a handler to un-register.");
}
delChallengeHandlerAtLocation(this.rootNode,_482,_483);
return this;
};
return _445;
})();
window.NegotiableChallengeHandler=(function(){
var _484=function(){
this.candidateChallengeHandlers=new Array();
};
var _485=function(_486){
var oids=new Array();
for(var i=0;i<_486.length;i++){
oids.push(Oid.create(_486[i]).asArray());
}
var _489=GssUtils.sizeOfSpnegoInitialContextTokenWithOids(null,oids);
var _48a=ByteBuffer.allocate(_489);
_48a.skip(_489);
GssUtils.encodeSpnegoInitialContextTokenWithOids(null,oids,_48a);
return ByteArrayUtils.arrayToByteArray(Base64Util.encodeBuffer(_48a));
};
var _48b=_484.prototype;
_48b.register=function(_48c){
if(_48c==null){
throw new Error("handler is null");
}
for(var i=0;i<this.candidateChallengeHandlers.length;i++){
if(_48c===this.candidateChallengeHandlers[i]){
return this;
}
}
this.candidateChallengeHandlers.push(_48c);
return this;
};
_48b.canHandle=function(_48e){
return _48e!=null&&_48e.authenticationScheme=="Negotiate"&&_48e.authenticationParameters==null;
};
_48b.handle=function(_48f,_490){
if(_48f==null){
throw Error(new ArgumentError("challengeRequest is null"));
}
var _491=new _3da();
for(var i=0;i<this.candidateChallengeHandlers.length;i++){
var _493=this.candidateChallengeHandlers[i];
if(_493.canHandle(_48f)){
try{
var _494=_493.getSupportedOids();
for(var j=0;j<_494.length;j++){
var oid=new Oid(_494[j]).asString();
if(!_491.containsKey(oid)){
_491.put(oid,_493);
}
}
}
catch(e){
}
}
}
if(_491.isEmpty()){
_490(null);
return;
}
};
return _484;
})();
window.NegotiableChallengeHandler=(function(){
var _497=function(){
this.loginHandler=undefined;
};
_497.prototype.getSupportedOids=function(){
return new Array();
};
return _497;
})();
window.NegotiableChallengeHandler=(function(){
var _498=function(){
this.loginHandler=undefined;
};
_498.prototype.getSupportedOids=function(){
return new Array();
};
return _498;
})();
var _499={};
(function(){
var _49a=_277.getLogger("com.kaazing.gateway.client.html5.Windows1252");
var _49b={8364:128,129:129,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,141:141,381:142,143:143,144:144,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,157:157,382:158,376:159};
var _49c={128:8364,129:129,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,141:141,142:381,143:143,144:144,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,157:157,158:382,159:376};
_499.toCharCode=function(n){
if(n<128||(n>159&&n<256)){
return n;
}else{
var _49e=_49c[n];
if(typeof (_49e)=="undefined"){
_49a.severe(this,"Windows1252.toCharCode: Error: Could not find "+n);
throw new Error("Windows1252.toCharCode could not find: "+n);
}
return _49e;
}
};
_499.fromCharCode=function(code){
if(code<256){
return code;
}else{
var _4a0=_49b[code];
if(typeof (_4a0)=="undefined"){
_49a.severe(this,"Windows1252.fromCharCode: Error: Could not find "+code);
throw new Error("Windows1252.fromCharCode could not find: "+code);
}
return _4a0;
}
};
var _4a1=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _4a3="\n";
var _4a4=function(s){
_49a.entering(this,"Windows1252.escapedToArray",s);
var a=[];
for(var i=0;i<s.length;i++){
var code=_499.fromCharCode(s.charCodeAt(i));
if(code==127){
i++;
if(i==s.length){
a.hasRemainder=true;
break;
}
var _4a9=_499.fromCharCode(s.charCodeAt(i));
switch(_4a9){
case 127:
a.push(127);
break;
case 48:
a.push(0);
break;
case 110:
a.push(10);
break;
case 114:
a.push(13);
break;
default:
_49a.severe(this,"Windows1252.escapedToArray: Error: Escaping format error");
throw new Error("Escaping format error");
}
}else{
a.push(code);
}
}
return a;
};
var _4aa=function(buf){
_49a.entering(this,"Windows1252.toEscapedByteString",buf);
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(_499.toCharCode(n));
switch(chr){
case _4a1:
a.push(_4a1);
a.push(_4a1);
break;
case NULL:
a.push(_4a1);
a.push("0");
break;
case _4a3:
a.push(_4a1);
a.push("n");
break;
default:
a.push(chr);
}
}
return a.join("");
};
_499.toArray=function(s,_4b0){
_49a.entering(this,"Windows1252.toArray",{"s":s,"escaped":_4b0});
if(_4b0){
return _4a4(s);
}else{
var a=[];
for(var i=0;i<s.length;i++){
a.push(_499.fromCharCode(s.charCodeAt(i)));
}
return a;
}
};
_499.toByteString=function(buf,_4b4){
_49a.entering(this,"Windows1252.toByteString",{"buf":buf,"escaped":_4b4});
if(_4b4){
return _4aa(buf);
}else{
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
a.push(String.fromCharCode(_499.toCharCode(n)));
}
return a.join("");
}
};
})();
function CloseEvent(_4b7,_4b8,_4b9,_4ba){
this.reason=_4ba;
this.code=_4b9;
this.wasClean=_4b8;
this.type="close";
this.bubbles=true;
this.cancelable=true;
this.target=_4b7;
};
function MessageEvent(_4bb,_4bc,_4bd){
return {target:_4bb,data:_4bc,origin:_4bd,bubbles:true,cancelable:true,type:"message",lastEventId:""};
};
(function(){
if(window.KAAZING_INTERNAL_DISABLE_BLOB){
return;
}
if(typeof (Blob)!=="undefined"){
try{
var temp=new Blob(["Blob"]);
return;
}
catch(e){
}
}
var _4bf=function(_4c0,_4c1){
var _4c2=_4c1||{};
if(window.WebKitBlobBuilder){
var _4c3=new window.WebKitBlobBuilder();
for(var i=0;i<_4c0.length;i++){
var part=_4c0[i];
if(_4c2.endings){
_4c3.append(part,_4c2.endings);
}else{
_4c3.append(part);
}
}
var blob;
if(_4c2.type){
blob=_4c3.getBlob(type);
}else{
blob=_4c3.getBlob();
}
blob.slice=blob.webkitSlice||blob.slice;
return blob;
}else{
if(window.MozBlobBuilder){
var _4c3=new window.MozBlobBuilder();
for(var i=0;i<_4c0.length;i++){
var part=_4c0[i];
if(_4c2.endings){
_4c3.append(part,_4c2.endings);
}else{
_4c3.append(part);
}
}
var blob;
if(_4c2.type){
blob=_4c3.getBlob(type);
}else{
blob=_4c3.getBlob();
}
blob.slice=blob.mozSlice||blob.slice;
return blob;
}else{
var _4c7=[];
for(var i=0;i<_4c0.length;i++){
var part=_4c0[i];
if(typeof part==="string"){
var b=BlobUtils.fromString(part,_4c2.endings);
_4c7.push(b);
}else{
if(part.byteLength){
var _4c9=new Uint8Array(part);
for(var i=0;i<part.byteLength;i++){
_4c7.push(_4c9[i]);
}
}else{
if(part.length){
_4c7.push(part);
}else{
if(part._array){
_4c7.push(part._array);
}else{
throw new Error("invalid type in Blob constructor");
}
}
}
}
}
var blob=concatMemoryBlobs(_4c7);
blob.type=_4c2.type;
return blob;
}
}
};
function MemoryBlob(_4ca,_4cb){
return {_array:_4ca,size:_4ca.length,type:_4cb||"",slice:function(_4cc,end,_4ce){
var a=this._array.slice(_4cc,end);
return MemoryBlob(a,_4ce);
},toString:function(){
return "MemoryBlob: "+_4ca.toString();
}};
};
function concatMemoryBlobs(_4d0){
var a=Array.prototype.concat.apply([],_4d0);
return new MemoryBlob(a);
};
window.Blob=_4bf;
})();
(function(_4d2){
_4d2.BlobUtils={};
BlobUtils.asString=function asString(blob,_4d4,end){
if(blob._array){
}else{
if(FileReader){
var _4d6=new FileReader();
_4d6.readAsText(blob);
_4d6.onload=function(){
cb(_4d6.result);
};
_4d6.onerror=function(e){
console.log(e,_4d6);
};
}
}
};
BlobUtils.asNumberArray=(function(){
var _4d8=[];
var _4d9=function(){
if(_4d8.length>0){
try{
var _4da=_4d8.shift();
_4da.cb(_4da.blob._array);
}
finally{
if(_4d8.length>0){
setTimeout(function(){
_4d9();
},0);
}
}
}
};
var _4db=function(cb,blob){
if(blob._array){
_4d8.push({cb:cb,blob:blob});
if(_4d8.length==1){
setTimeout(function(){
_4d9();
},0);
}
}else{
if(FileReader){
var _4de=new FileReader();
_4de.readAsArrayBuffer(blob);
_4de.onload=function(){
var _4df=new DataView(_4de.result);
var a=[];
for(var i=0;i<_4de.result.byteLength;i++){
a.push(_4df.getUint8(i));
}
cb(a);
};
}else{
throw new Error("Cannot convert Blob to binary string");
}
}
};
return _4db;
})();
BlobUtils.asBinaryString=function asBinaryString(cb,blob){
if(blob._array){
var _4e4=blob._array;
var a=[];
for(var i=0;i<_4e4.length;i++){
a.push(String.fromCharCode(_4e4[i]));
}
setTimeout(function(){
cb(a.join(""));
},0);
}else{
if(FileReader){
var _4e7=new FileReader();
if(_4e7.readAsBinaryString){
_4e7.readAsBinaryString(blob);
_4e7.onload=function(){
cb(_4e7.result);
};
}else{
_4e7.readAsArrayBuffer(blob);
_4e7.onload=function(){
var _4e8=new DataView(_4e7.result);
var a=[];
for(var i=0;i<_4e7.result.byteLength;i++){
a.push(String.fromCharCode(_4e8.getUint8(i)));
}
cb(a.join(""));
};
}
}else{
throw new Error("Cannot convert Blob to binary string");
}
}
};
BlobUtils.fromBinaryString=function fromByteString(s){
var _4ec=[];
for(var i=0;i<s.length;i++){
_4ec.push(s.charCodeAt(i));
}
return BlobUtils.fromNumberArray(_4ec);
};
BlobUtils.fromNumberArray=function fromNumberArray(a){
if(typeof (Uint8Array)!=="undefined"){
return new Blob([new Uint8Array(a)]);
}else{
return new Blob([a]);
}
};
BlobUtils.fromString=function fromString(s,_4f0){
if(_4f0&&_4f0==="native"){
if(navigator.userAgent.indexOf("Windows")!=-1){
s=s.replace("\r\n","\n","g").replace("\n","\r\n","g");
}
}
var buf=new ByteBuffer();
Charset.UTF8.encode(s,buf);
var a=buf.array;
return BlobUtils.fromNumberArray(a);
};
})(window);
var _4f3=function(){
this._queue=[];
this._count=0;
this.completion;
};
_4f3.prototype.enqueue=function(cb){
var _4f5=this;
var _4f6={};
_4f6.cb=cb;
_4f6.id=this._count++;
this._queue.push(_4f6);
var func=function(){
_4f5.processQueue(_4f6.id,cb,arguments);
};
return func;
};
_4f3.prototype.processQueue=function(id,cb,args){
for(var i=0;i<this._queue.length;i++){
if(this._queue[i].id==id){
this._queue[i].args=args;
break;
}
}
while(this._queue.length&&this._queue[0].args!==undefined){
var _4fc=this._queue.shift();
_4fc.cb.apply(null,_4fc.args);
}
};
var _4fd=(function(){
var _4fe=function(_4ff,_500){
this.label=_4ff;
this.value=_500;
};
return _4fe;
})();
var _501=(function(){
var _502=function(_503){
var uri=new URI(_503);
if(isValidScheme(uri.scheme)){
this._uri=uri;
}else{
throw new Error("HttpURI - invalid scheme: "+_503);
}
};
function isValidScheme(_505){
return "http"==_505||"https"==_505;
};
var _506=_502.prototype;
_506.getURI=function(){
return this._uri;
};
_506.duplicate=function(uri){
try{
return new _502(uri);
}
catch(e){
throw e;
}
return null;
};
_506.isSecure=function(){
return ("https"==this._uri.scheme);
};
_506.toString=function(){
return this._uri.toString();
};
_502.replaceScheme=function(_508,_509){
var uri=URI.replaceProtocol(_508,_509);
return new _502(uri);
};
return _502;
})();
var _50b=(function(){
var _50c=function(_50d){
var uri=new URI(_50d);
if(isValidScheme(uri.scheme)){
this._uri=uri;
if(uri.port==undefined){
this._uri=new URI(_50c.addDefaultPort(_50d));
}
}else{
throw new Error("WSURI - invalid scheme: "+_50d);
}
};
function isValidScheme(_50f){
return "ws"==_50f||"wss"==_50f;
};
function duplicate(uri){
try{
return new _50c(uri);
}
catch(e){
throw e;
}
return null;
};
var _511=_50c.prototype;
_511.getAuthority=function(){
return this._uri.authority;
};
_511.isSecure=function(){
return "wss"==this._uri.scheme;
};
_511.getHttpEquivalentScheme=function(){
return this.isSecure()?"https":"http";
};
_511.toString=function(){
return this._uri.toString();
};
var _512=80;
var _513=443;
_50c.setDefaultPort=function(uri){
if(uri.port==0){
if(uri.scheme=="ws"){
uri.port=_512;
}else{
if(uri.scheme=="wss"){
uri.port=_513;
}else{
if(uri.scheme=="http"){
uri.port=80;
}else{
if(uri.schemel=="https"){
uri.port=443;
}else{
throw new Error("Unknown protocol: "+uri.scheme);
}
}
}
}
uri.authority=uri.host+":"+uri.port;
}
};
_50c.addDefaultPort=function(_515){
var uri=new URI(_515);
if(uri.port==undefined){
_50c.setDefaultPort(uri);
}
return uri.toString();
};
_50c.replaceScheme=function(_517,_518){
var uri=URI.replaceProtocol(_517,_518);
return new _50c(uri);
};
return _50c;
})();
var _51a=(function(){
var _51b={};
_51b["ws"]="ws";
_51b["wss"]="wss";
_51b["javascript:wse"]="ws";
_51b["javascript:wse+ssl"]="wss";
_51b["javascript:ws"]="ws";
_51b["javascript:wss"]="wss";
_51b["flash:wsr"]="ws";
_51b["flash:wsr+ssl"]="wss";
_51b["flash:wse"]="ws";
_51b["flash:wse+ssl"]="wss";
var _51c=function(_51d){
var _51e=getProtocol(_51d);
if(isValidScheme(_51e)){
this._uri=new URI(URI.replaceProtocol(_51d,_51b[_51e]));
this._compositeScheme=_51e;
this._location=_51d;
}else{
throw new SyntaxError("WSCompositeURI - invalid composite scheme: "+getProtocol(_51d));
}
};
function getProtocol(_51f){
var indx=_51f.indexOf("://");
if(indx>0){
return _51f.substr(0,indx);
}else{
return "";
}
};
function isValidScheme(_521){
return _51b[_521]!=null;
};
function duplicate(uri){
try{
return new _51c(uri);
}
catch(e){
throw e;
}
return null;
};
var _523=_51c.prototype;
_523.isSecure=function(){
var _524=this._uri.scheme;
return "wss"==_51b[_524];
};
_523.getWSEquivalent=function(){
try{
var _525=_51b[this._compositeScheme];
return _50b.replaceScheme(this._location,_525);
}
catch(e){
throw e;
}
return null;
};
_523.getPlatformPrefix=function(){
if(this._compositeScheme.indexOf("javascript:")===0){
return "javascript";
}else{
if(this._compositeScheme.indexOf("flash:")===0){
return "flash";
}else{
return "";
}
}
};
_523.toString=function(){
return this._location;
};
return _51c;
})();
var _526=(function(){
var _527=function(_528,_529,_52a){
if(arguments.length<3){
var s="ResumableTimer: Please specify the required parameters 'callback', 'delay', and 'updateDelayWhenPaused'.";
throw Error(s);
}
if((typeof (_528)=="undefined")||(_528==null)){
var s="ResumableTimer: Please specify required parameter 'callback'.";
throw Error(s);
}else{
if(typeof (_528)!="function"){
var s="ResumableTimer: Required parameter 'callback' must be a function.";
throw Error(s);
}
}
if(typeof (_529)=="undefined"){
var s="ResumableTimer: Please specify required parameter 'delay' of type integer.";
throw Error(s);
}else{
if((typeof (_529)!="number")||(_529<=0)){
var s="ResumableTimer: Required parameter 'delay' should be a positive integer.";
throw Error(s);
}
}
if(typeof (_52a)=="undefined"){
var s="ResumableTimer: Please specify required boolean parameter 'updateDelayWhenPaused'.";
throw Error(s);
}else{
if(typeof (_52a)!="boolean"){
var s="ResumableTimer: Required parameter 'updateDelayWhenPaused' is a boolean.";
throw Error(s);
}
}
this._delay=_529;
this._updateDelayWhenPaused=_52a;
this._callback=_528;
this._timeoutId=-1;
this._startTime=-1;
};
var _52c=_527.prototype;
_52c.cancel=function(){
if(this._timeoutId!=-1){
window.clearTimeout(this._timeoutId);
this._timeoutId=-1;
}
this._delay=-1;
this._callback=null;
};
_52c.pause=function(){
if(this._timeoutId==-1){
return;
}
window.clearTimeout(this._timeoutId);
var _52d=new Date().getTime();
var _52e=_52d-this._startTime;
this._timeoutId=-1;
if(this._updateDelayWhenPaused){
this._delay=this._delay-_52e;
}
};
_52c.resume=function(){
if(this._timeoutId!=-1){
return;
}
if(this._callback==null){
var s="Timer cannot be resumed as it has been canceled.";
throw new Error(s);
}
this.start();
};
_52c.start=function(){
if(this._delay<0){
var s="Timer delay cannot be negative";
}
this._timeoutId=window.setTimeout(this._callback,this._delay);
this._startTime=new Date().getTime();
};
return _527;
})();
var _531=(function(){
var _532=function(){
this._parent=null;
this._challengeResponse=new ChallengeResponse(null,null);
};
_532.prototype.toString=function(){
return "[Channel]";
};
return _532;
})();
var _533=(function(){
var _534=function(_535,_536,_537){
_531.apply(this,arguments);
this._location=_535;
this._protocol=_536;
this._extensions=[];
this._controlFrames={};
this._controlFramesBinary={};
this._escapeSequences={};
this._handshakePayload="";
this._isEscape=false;
this._bufferedAmount=0;
};
var _538=_534.prototype=new _531();
_538.getBufferedAmount=function(){
return this._bufferedAmount;
};
_538.toString=function(){
return "[WebSocketChannel "+_location+" "+_protocol!=null?_protocol:"-"+"]";
};
return _534;
})();
var _539=(function(){
var _53a=function(){
this._nextHandler;
this._listener;
};
var _53b=_53a.prototype;
_53b.processConnect=function(_53c,_53d,_53e){
this._nextHandler.processConnect(_53c,_53d,_53e);
};
_53b.processAuthorize=function(_53f,_540){
this._nextHandler.processAuthorize(_53f,_540);
};
_53b.processTextMessage=function(_541,text){
this._nextHandler.processTextMessage(_541,text);
};
_53b.processBinaryMessage=function(_543,_544){
this._nextHandler.processBinaryMessage(_543,_544);
};
_53b.processClose=function(_545,code,_547){
this._nextHandler.processClose(_545,code,_547);
};
_53b.setIdleTimeout=function(_548,_549){
this._nextHandler.setIdleTimeout(_548,_549);
};
_53b.setListener=function(_54a){
this._listener=_54a;
};
_53b.setNextHandler=function(_54b){
this._nextHandler=_54b;
};
return _53a;
})();
var _54c=function(_54d){
this.connectionOpened=function(_54e,_54f){
_54d._listener.connectionOpened(_54e,_54f);
};
this.textMessageReceived=function(_550,s){
_54d._listener.textMessageReceived(_550,s);
};
this.binaryMessageReceived=function(_552,obj){
_54d._listener.binaryMessageReceived(_552,obj);
};
this.connectionClosed=function(_554,_555,code,_557){
_54d._listener.connectionClosed(_554,_555,code,_557);
};
this.connectionError=function(_558,e){
_54d._listener.connectionError(_558,e);
};
this.connectionFailed=function(_55a){
_54d._listener.connectionFailed(_55a);
};
this.authenticationRequested=function(_55b,_55c,_55d){
_54d._listener.authenticationRequested(_55b,_55c,_55d);
};
this.redirected=function(_55e,_55f){
_54d._listener.redirected(_55e,_55f);
};
this.onBufferedAmountChange=function(_560,n){
_54d._listener.onBufferedAmountChange(_560,n);
};
};
var _562=(function(){
var _563=function(){
var _564="";
var _565="";
};
_563.KAAZING_EXTENDED_HANDSHAKE="x-kaazing-handshake";
_563.KAAZING_SEC_EXTENSION_REVALIDATE="x-kaazing-http-revalidate";
_563.HEADER_SEC_PROTOCOL="X-WebSocket-Protocol";
_563.HEADER_SEC_EXTENSIONS="X-WebSocket-Extensions";
_563.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT="x-kaazing-idle-timeout";
_563.KAAZING_SEC_EXTENSION_PING_PONG="x-kaazing-ping-pong";
return _563;
})();
var _566=(function(){
var _567=function(_568,_569){
_533.apply(this,arguments);
this.requestHeaders=[];
this.responseHeaders={};
this.readyState=WebSocket.CONNECTING;
this.authenticationReceived=false;
this.wasCleanClose=false;
this.closeCode=1006;
this.closeReason="";
this.preventFallback=false;
};
return _567;
})();
var _56a=(function(){
var _56b=function(){
};
var _56c=_56b.prototype;
_56c.createChannel=function(_56d,_56e,_56f){
var _570=new _566(_56d,_56e,_56f);
return _570;
};
return _56b;
})();
var _571=(function(){
var _572=function(){
};
var _573=_572.prototype;
_573.createChannel=function(_574,_575){
var _576=new _566(_574,_575);
return _576;
};
return _572;
})();
var _577=(function(){
var _578=function(_579,_57a){
this._location=_579.getWSEquivalent();
this._protocol=_57a;
this._webSocket;
this._compositeScheme=_579._compositeScheme;
this._connectionStrategies=[];
this._selectedChannel;
this.readyState=0;
this._closing=false;
this._negotiatedExtensions={};
this._compositeScheme=_579._compositeScheme;
};
var _57b=_578.prototype=new _533();
_57b.getReadyState=function(){
return this.readyState;
};
_57b.getWebSocket=function(){
return this._webSocket;
};
_57b.getCompositeScheme=function(){
return this._compositeScheme;
};
_57b.getNextStrategy=function(){
if(this._connectionStrategies.length<=0){
return null;
}else{
return this._connectionStrategies.shift();
}
};
_57b.getRedirectPolicy=function(){
return this.getWebSocket().getRedirectPolicy();
};
return _578;
})();
var _57c=(function(){
var _57d="WebSocketControlFrameHandler";
var LOG=_277.getLogger(_57d);
var _57f=function(){
LOG.finest(_57d,"<init>");
};
var _580=function(_581,_582){
var _583=0;
for(var i=_582;i<_582+4;i++){
_583=(_583<<8)+_581.getAt(i);
}
return _583;
};
var _585=function(_586){
if(_586.byteLength>3){
var _587=new DataView(_586);
return _587.getInt32(0);
}
return 0;
};
var _588=function(_589){
var _58a=0;
for(var i=0;i<4;i++){
_58a=(_58a<<8)+_589.charCodeAt(i);
}
return _58a;
};
var ping=[9,0];
var pong=[10,0];
var _58e={};
var _58f=function(_590){
if(typeof _58e.escape==="undefined"){
var _591=[];
var i=4;
do{
_591[--i]=_590&(255);
_590=_590>>8;
}while(i);
_58e.escape=String.fromCharCode.apply(null,_591.concat(pong));
}
return _58e.escape;
};
var _593=function(_594,_595,_596,_597){
if(_562.KAAZING_SEC_EXTENSION_REVALIDATE==_595._controlFrames[_597]){
var url=_596.substr(5);
if(_595._redirectUri!=null){
if(typeof (_595._redirectUri)=="string"){
var _599=new URI(_595._redirectUri);
url=_599.scheme+"://"+_599.authority+url;
}else{
url=_595._redirectUri.getHttpEquivalentScheme()+"://"+_595._redirectUri.getAuthority()+url;
}
}else{
url=_595._location.getHttpEquivalentScheme()+"://"+_595._location.getAuthority()+url;
}
_594._listener.authenticationRequested(_595,url,_562.KAAZING_SEC_EXTENSION_REVALIDATE);
}else{
if(_562.KAAZING_SEC_EXTENSION_PING_PONG==_595._controlFrames[_597]){
if(_596.charCodeAt(4)==ping[0]){
var pong=_58f(_597);
_594._nextHandler.processTextMessage(_595,pong);
}
}
}
};
var _59b=_57f.prototype=new _539();
_59b.handleConnectionOpened=function(_59c,_59d){
LOG.finest(_57d,"handleConnectionOpened");
var _59e=_59c.responseHeaders;
if(_59e[_562.HEADER_SEC_EXTENSIONS]!=null){
var _59f=_59e[_562.HEADER_SEC_EXTENSIONS];
if(_59f!=null&&_59f.length>0){
var _5a0=_59f.split(",");
for(var j=0;j<_5a0.length;j++){
var tmp=_5a0[j].split(";");
var ext=tmp[0].replace(/^\s+|\s+$/g,"");
var _5a4=new WebSocketExtension(ext);
_5a4.enabled=true;
_5a4.negotiated=true;
if(tmp.length>1){
var _5a5=tmp[1].replace(/^\s+|\s+$/g,"");
if(_5a5.length==8){
try{
var _5a6=parseInt(_5a5,16);
_59c._controlFrames[_5a6]=ext;
if(_562.KAAZING_SEC_EXTENSION_REVALIDATE===ext){
_59c._controlFramesBinary[_5a6]=ext;
}
_5a4.escape=_5a5;
}
catch(e){
LOG.finest(_57d,"parse control frame bytes error");
}
}
}
_59c.parent._negotiatedExtensions[ext]=_5a4;
}
}
}
this._listener.connectionOpened(_59c,_59d);
};
_59b.handleTextMessageReceived=function(_5a7,_5a8){
LOG.finest(_57d,"handleMessageReceived",_5a8);
if(_5a7._isEscape){
_5a7._isEscape=false;
this._listener.textMessageReceived(_5a7,_5a8);
return;
}
if(_5a8==null||_5a8.length<4){
this._listener.textMessageReceived(_5a7,_5a8);
return;
}
var _5a9=_588(_5a8);
if(_5a7._controlFrames[_5a9]!=null){
if(_5a8.length==4){
_5a7._isEscape=true;
return;
}else{
_593(this,_5a7,_5a8,_5a9);
}
}else{
this._listener.textMessageReceived(_5a7,_5a8);
}
};
_59b.handleMessageReceived=function(_5aa,_5ab){
LOG.finest(_57d,"handleMessageReceived",_5ab);
if(_5aa._isEscape){
_5aa._isEscape=false;
this._listener.binaryMessageReceived(_5aa,_5ab);
return;
}
if(typeof (_5ab.byteLength)!="undefined"){
var _5ac=_585(_5ab);
if(_5aa._controlFramesBinary[_5ac]!=null){
if(_5ab.byteLength==4){
_5aa._isEscape=true;
return;
}else{
_593(this,_5aa,String.fromCharCode.apply(null,new Uint8Array(_5ab,0)),_5ac);
}
}else{
this._listener.binaryMessageReceived(_5aa,_5ab);
}
}else{
if(_5ab.constructor==ByteBuffer){
if(_5ab==null||_5ab.limit<4){
this._listener.binaryMessageReceived(_5aa,_5ab);
return;
}
var _5ac=_580(_5ab,_5ab.position);
if(_5aa._controlFramesBinary[_5ac]!=null){
if(_5ab.limit==4){
_5aa._isEscape=true;
return;
}else{
_593(this,_5aa,_5ab.getString(Charset.UTF8),_5ac);
}
}else{
this._listener.binaryMessageReceived(_5aa,_5ab);
}
}
}
};
_59b.processTextMessage=function(_5ad,_5ae){
if(_5ae.length>=4){
var _5af=_588(_5ae);
if(_5ad._escapeSequences[_5af]!=null){
var _5b0=_5ae.slice(0,4);
this._nextHandler.processTextMessage(_5ad,_5b0);
}
}
this._nextHandler.processTextMessage(_5ad,_5ae);
};
_59b.setNextHandler=function(_5b1){
var _5b2=this;
this._nextHandler=_5b1;
var _5b3=new _54c(this);
_5b3.connectionOpened=function(_5b4,_5b5){
_5b2.handleConnectionOpened(_5b4,_5b5);
};
_5b3.textMessageReceived=function(_5b6,buf){
_5b2.handleTextMessageReceived(_5b6,buf);
};
_5b3.binaryMessageReceived=function(_5b8,buf){
_5b2.handleMessageReceived(_5b8,buf);
};
_5b1.setListener(_5b3);
};
_59b.setListener=function(_5ba){
this._listener=_5ba;
};
return _57f;
})();
var _5bb=(function(){
var LOG=_277.getLogger("RevalidateHandler");
var _5bd=function(_5be){
LOG.finest("ENTRY Revalidate.<init>");
this.channel=_5be;
};
var _5bf=function(_5c0){
var _5c1=_5c0.parent;
if(_5c1){
return (_5c1.readyState>=2);
}
return false;
};
var _5c2=_5bd.prototype;
_5c2.connect=function(_5c3){
LOG.finest("ENTRY Revalidate.connect with {0}",_5c3);
if(_5bf(this.channel)){
return;
}
var _5c4=this;
var _5c5=new XMLHttpRequest0();
_5c5.withCredentials=true;
_5c5.open("GET",_5c3+"&.krn="+Math.random(),true);
if(_5c4.channel._challengeResponse!=null&&_5c4.channel._challengeResponse.credentials!=null){
_5c5.setRequestHeader("Authorization",_5c4.channel._challengeResponse.credentials);
this.clearAuthenticationData(_5c4.channel);
}
_5c5.onreadystatechange=function(){
switch(_5c5.readyState){
case 2:
if(_5c5.status==403){
_5c5.abort();
}
break;
case 4:
if(_5c5.status==401){
_5c4.handle401(_5c4.channel,_5c3,_5c5.getResponseHeader("WWW-Authenticate"));
return;
}
break;
}
};
_5c5.send(null);
};
_5c2.clearAuthenticationData=function(_5c6){
if(_5c6._challengeResponse!=null){
_5c6._challengeResponse.clearCredentials();
}
};
_5c2.handle401=function(_5c7,_5c8,_5c9){
if(_5bf(_5c7)){
return;
}
var _5ca=this;
var _5cb=_5c8;
if(_5cb.indexOf("/;a/")>0){
_5cb=_5cb.substring(0,_5cb.indexOf("/;a/"));
}else{
if(_5cb.indexOf("/;ae/")>0){
_5cb=_5cb.substring(0,_5cb.indexOf("/;ae/"));
}else{
if(_5cb.indexOf("/;ar/")>0){
_5cb=_5cb.substring(0,_5cb.indexOf("/;ar/"));
}
}
}
var _5cc=new ChallengeRequest(_5cb,_5c9);
var _5cd;
if(this.channel._challengeResponse.nextChallengeHandler!=null){
_5cd=this.channel._challengeResponse.nextChallengeHandler;
}else{
_5cd=_5c7.challengeHandler;
}
if(_5cd!=null&&_5cd.canHandle(_5cc)){
_5cd.handle(_5cc,function(_5ce){
try{
if(_5ce!=null&&_5ce.credentials!=null){
_5ca.channel._challengeResponse=_5ce;
_5ca.connect(_5c8);
}
}
catch(e){
}
});
}
};
return _5bd;
})();
var _5cf=(function(){
var _5d0="WebSocketNativeDelegateHandler";
var LOG=_277.getLogger(_5d0);
var _5d2=function(){
LOG.finest(_5d0,"<init>");
};
var _5d3=_5d2.prototype=new _539();
_5d3.processConnect=function(_5d4,uri,_5d6){
LOG.finest(_5d0,"connect",_5d4);
if(_5d4.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
if(_5d4._delegate==null){
var _5d7=new _2e3();
_5d7.parent=_5d4;
_5d4._delegate=_5d7;
_5d8(_5d7,this);
}
_5d4._delegate.connect(uri.toString(),_5d6);
};
_5d3.processTextMessage=function(_5d9,text){
LOG.finest(_5d0,"processTextMessage",_5d9);
if(_5d9._delegate.readyState()==WebSocket.OPEN){
_5d9._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_5d3.processBinaryMessage=function(_5db,obj){
LOG.finest(_5d0,"processBinaryMessage",_5db);
if(_5db._delegate.readyState()==WebSocket.OPEN){
_5db._delegate.send(obj);
}else{
throw new Error("WebSocket is already closed");
}
};
_5d3.processClose=function(_5dd,code,_5df){
LOG.finest(_5d0,"close",_5dd);
try{
_5dd._delegate.close(code,_5df);
}
catch(e){
LOG.finest(_5d0,"processClose exception: ",e);
}
};
_5d3.setIdleTimeout=function(_5e0,_5e1){
LOG.finest(_5d0,"idleTimeout",_5e0);
try{
_5e0._delegate.setIdleTimeout(_5e1);
}
catch(e){
LOG.finest(_5d0,"setIdleTimeout exception: ",e);
}
};
var _5d8=function(_5e2,_5e3){
var _5e4=new _54c(_5e3);
_5e2.setListener(_5e4);
};
return _5d2;
})();
var _5e5=(function(){
var _5e6="WebSocketNativeBalancingHandler";
var LOG=_277.getLogger(_5e6);
var _5e8=function(){
LOG.finest(_5e6,"<init>");
};
var _5e9=function(_5ea,_5eb,_5ec){
_5eb._redirecting=true;
_5eb._redirectUri=_5ec;
_5ea._nextHandler.processClose(_5eb);
};
var _5ed=_5e8.prototype=new _539();
_5ed.processConnect=function(_5ee,uri,_5f0){
_5ee._balanced=0;
this._nextHandler.processConnect(_5ee,uri,_5f0);
};
_5ed.handleConnectionClosed=function(_5f1,_5f2,code,_5f4){
if(_5f1._redirecting==true){
_5f1._redirecting=false;
var _5f5=_5f1._redirectUri;
var _5f6=_5f1._location;
var _5f7=_5f1.parent;
var _5f8=_5f7.getRedirectPolicy();
if(_5f8 instanceof HttpRedirectPolicy){
if(!_5f8.isRedirectionAllowed(_5f6.toString(),_5f5.toString())){
_5f1.preventFallback=true;
var s=_5f8.toString()+": Cannot redirect from "+_5f6.toString()+" to "+_5f5.toString();
this._listener.connectionClosed(_5f1,false,1006,s);
return;
}
}
_5f1._redirected=true;
_5f1.handshakePayload="";
var _5fa=[_562.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_5f1._protocol.length;i++){
_5fa.push(_5f1._protocol[i]);
}
this.processConnect(_5f1,_5f1._redirectUri,_5fa);
}else{
this._listener.connectionClosed(_5f1,_5f2,code,_5f4);
}
};
_5ed.handleMessageReceived=function(_5fc,obj){
LOG.finest(_5e6,"handleMessageReceived",obj);
if(_5fc._balanced>1){
this._listener.binaryMessageReceived(_5fc,obj);
return;
}
var _5fe=_2bd(obj);
if(_5fe.charCodeAt(0)==61695){
if(_5fe.match("N$")){
_5fc._balanced++;
if(_5fc._balanced==1){
this._listener.connectionOpened(_5fc,_562.KAAZING_EXTENDED_HANDSHAKE);
}else{
this._listener.connectionOpened(_5fc,_5fc._acceptedProtocol||"");
}
}else{
if(_5fe.indexOf("R")==1){
var _5ff=new _50b(_5fe.substring(2));
_5e9(this,_5fc,_5ff);
}else{
LOG.warning(_5e6,"Invalidate balancing message: "+target);
}
}
return;
}else{
this._listener.binaryMessageReceived(_5fc,obj);
}
};
_5ed.setNextHandler=function(_600){
this._nextHandler=_600;
var _601=new _54c(this);
var _602=this;
_601.connectionOpened=function(_603,_604){
if(_562.KAAZING_EXTENDED_HANDSHAKE!=_604){
_603._balanced=2;
_602._listener.connectionOpened(_603,_604);
}
};
_601.textMessageReceived=function(_605,_606){
LOG.finest(_5e6,"textMessageReceived",_606);
if(_605._balanced>1){
_602._listener.textMessageReceived(_605,_606);
return;
}
if(_606.charCodeAt(0)==61695){
if(_606.match("N$")){
_605._balanced++;
if(_605._balanced==1){
_602._listener.connectionOpened(_605,_562.KAAZING_EXTENDED_HANDSHAKE);
}else{
_602._listener.connectionOpened(_605,"");
}
}else{
if(_606.indexOf("R")==1){
var _607=new _50b(_606.substring(2));
_5e9(_602,_605,_607);
}else{
LOG.warning(_5e6,"Invalidate balancing message: "+target);
}
}
return;
}else{
_602._listener.textMessageReceived(_605,_606);
}
};
_601.binaryMessageReceived=function(_608,obj){
_602.handleMessageReceived(_608,obj);
};
_601.connectionClosed=function(_60a,_60b,code,_60d){
_602.handleConnectionClosed(_60a,_60b,code,_60d);
};
_600.setListener(_601);
};
_5ed.setListener=function(_60e){
this._listener=_60e;
};
return _5e8;
})();
var _60f=(function(){
var _610="WebSocketNativeHandshakeHandler";
var LOG=_277.getLogger(_610);
var _612="Sec-WebSocket-Protocol";
var _613="Sec-WebSocket-Extensions";
var _614="Authorization";
var _615="WWW-Authenticate";
var _616="Set-Cookie";
var _617="GET";
var _618="HTTP/1.1";
var _619=":";
var _61a=" ";
var _61b="\r\n";
var _61c=function(){
LOG.finest(_610,"<init>");
};
var _61d=function(_61e,_61f){
LOG.finest(_610,"sendCookieRequest with {0}",_61f);
var _620=new XMLHttpRequest0();
var path=_61e._location.getHttpEquivalentScheme()+"://"+_61e._location.getAuthority()+(_61e._location._uri.path||"");
path=path.replace(/[\/]?$/,"/;api/set-cookies");
_620.open("POST",path,true);
_620.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_620.send(_61f);
};
var _622=function(_623,_624,_625){
var _626=[];
var _627=[];
_626.push("WebSocket-Protocol");
_627.push("");
_626.push(_612);
_627.push(_624._protocol.join(","));
var _628=[_562.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT,_562.KAAZING_SEC_EXTENSION_PING_PONG];
var ext=_624._extensions;
if(ext.length>0){
_628.push(ext);
}
_626.push(_613);
_627.push(_628.join(","));
_626.push(_614);
_627.push(_625);
var _62a=_62b(_624._location,_626,_627);
_623._nextHandler.processTextMessage(_624,_62a);
};
var _62b=function(_62c,_62d,_62e){
LOG.entering(_610,"encodeGetRequest");
var _62f=[];
_62f.push(_617);
_62f.push(_61a);
var path=[];
if(_62c._uri.path!=undefined){
path.push(_62c._uri.path);
}
if(_62c._uri.query!=undefined){
path.push("?");
path.push(_62c._uri.query);
}
_62f.push(path.join(""));
_62f.push(_61a);
_62f.push(_618);
_62f.push(_61b);
for(var i=0;i<_62d.length;i++){
var _632=_62d[i];
var _633=_62e[i];
if(_632!=null&&_633!=null){
_62f.push(_632);
_62f.push(_619);
_62f.push(_61a);
_62f.push(_633);
_62f.push(_61b);
}
}
_62f.push(_61b);
var _634=_62f.join("");
return _634;
};
var _635=function(_636,_637,s){
if(s.length>0){
_637.handshakePayload+=s;
return;
}
var _639=_637.handshakePayload.split("\n");
_637.handshakePayload="";
var _63a="";
for(var i=_639.length-1;i>=0;i--){
if(_639[i].indexOf("HTTP/1.1")==0){
var temp=_639[i].split(" ");
_63a=temp[1];
break;
}
}
if("101"==_63a){
var _63d=[];
var _63e="";
for(var i=0;i<_639.length;i++){
var line=_639[i];
if(line!=null&&line.indexOf(_613)==0){
_63d.push(line.substring(_613.length+2));
}else{
if(line!=null&&line.indexOf(_612)==0){
_63e=line.substring(_612.length+2);
}else{
if(line!=null&&line.indexOf(_616)==0){
_61d(_637,line.substring(_616.length+2));
}
}
}
}
_637._acceptedProtocol=_63e;
if(_63d.length>0){
var _640=[];
var _641=_63d.join(", ").split(", ");
for(var j=0;j<_641.length;j++){
var tmp=_641[j].split(";");
var ext=tmp[0].replace(/^\s+|\s+$/g,"");
var _645=new WebSocketExtension(ext);
if(_562.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT===ext){
var _646=tmp[1].match(/\d+/)[0];
if(_646>0){
_636._nextHandler.setIdleTimeout(_637,_646);
}
continue;
}else{
if(_562.KAAZING_SEC_EXTENSION_PING_PONG===ext){
try{
var _647=tmp[1].replace(/^\s+|\s+$/g,"");
var _648=parseInt(_647,16);
_637._controlFrames[_648]=ext;
_637._escapeSequences[_648]=ext;
continue;
}
catch(e){
throw new Error("failed to parse escape key for x-kaazing-ping-pong extension");
}
}else{
if(tmp.length>1){
var _647=tmp[1].replace(/^\s+|\s+$/g,"");
if(_647.length==8){
try{
var _648=parseInt(_647,16);
_637._controlFrames[_648]=ext;
if(_562.KAAZING_SEC_EXTENSION_REVALIDATE===ext){
_637._controlFramesBinary[_648]=ext;
}
_645.escape=_647;
}
catch(e){
LOG.finest(_610,"parse control frame bytes error");
}
}
}
}
}
_645.enabled=true;
_645.negotiated=true;
_640.push(_641[j]);
}
if(_640.length>0){
_637.parent._negotiatedExtensions[ext]=_640.join(",");
}
}
return;
}else{
if("401"==_63a){
_637.handshakestatus=2;
var _649="";
for(var i=0;i<_639.length;i++){
if(_639[i].indexOf(_615)==0){
_649=_639[i].substring(_615.length+2);
break;
}
}
_636._listener.authenticationRequested(_637,_637._location.toString(),_649);
}else{
_636._listener.connectionFailed(_637);
}
}
};
var _64a=function(_64b,_64c){
try{
_64c.handshakestatus=3;
_64b._nextHandler.processClose(_64c);
}
finally{
_64b._listener.connectionFailed(_64c);
}
};
var _64d=_61c.prototype=new _539();
_64d.processConnect=function(_64e,uri,_650){
_64e.handshakePayload="";
var _651=[_562.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_650.length;i++){
_651.push(_650[i]);
}
this._nextHandler.processConnect(_64e,uri,_651);
if((typeof (_64e.parent.connectTimer)=="undefined")||(_64e.parent.connectTimer==null)){
_64e.handshakestatus=0;
var _653=this;
setTimeout(function(){
if(_64e.handshakestatus==0){
_64a(_653,_64e);
}
},5000);
}
};
_64d.processAuthorize=function(_654,_655){
_622(this,_654,_655);
};
_64d.handleConnectionOpened=function(_656,_657){
LOG.finest(_610,"handleConnectionOpened");
if(_562.KAAZING_EXTENDED_HANDSHAKE==_657){
_622(this,_656,null);
_656.handshakestatus=1;
if((typeof (_656.parent.connectTimer)=="undefined")||(_656.parent.connectTimer==null)){
var _658=this;
setTimeout(function(){
if(_656.handshakestatus<2){
_64a(_658,_656);
}
},5000);
}
}else{
_656.handshakestatus=2;
this._listener.connectionOpened(_656,_657);
}
};
_64d.handleMessageReceived=function(_659,_65a){
LOG.finest(_610,"handleMessageReceived",_65a);
if(_659.readyState==WebSocket.OPEN){
_659._isEscape=false;
this._listener.textMessageReceived(_659,_65a);
}else{
_635(this,_659,_65a);
}
};
_64d.handleBinaryMessageReceived=function(_65b,_65c){
LOG.finest(_610,"handleMessageReceived",_65c);
if(_65b.readyState==WebSocket.OPEN){
_65b._isEscape=false;
this._listener.binaryMessageReceived(_65b,_65c);
}else{
_635(this,_65b,String.fromCharCode.apply(null,new Uint8Array(_65c)));
}
};
_64d.setNextHandler=function(_65d){
this._nextHandler=_65d;
var _65e=this;
var _65f=new _54c(this);
_65f.connectionOpened=function(_660,_661){
_65e.handleConnectionOpened(_660,_661);
};
_65f.textMessageReceived=function(_662,buf){
_65e.handleMessageReceived(_662,buf);
};
_65f.binaryMessageReceived=function(_664,buf){
_65e.handleBinaryMessageReceived(_664,buf);
};
_65f.connectionClosed=function(_666,_667,code,_669){
if(_666.handshakestatus<3){
_666.handshakestatus=3;
}
_65e._listener.connectionClosed(_666,_667,code,_669);
};
_65f.connectionFailed=function(_66a){
if(_66a.handshakestatus<3){
_66a.handshakestatus=3;
}
_65e._listener.connectionFailed(_66a);
};
_65d.setListener(_65f);
};
_64d.setListener=function(_66b){
this._listener=_66b;
};
return _61c;
})();
var _66c=(function(){
var _66d="WebSocketNativeAuthenticationHandler";
var LOG=_277.getLogger(_66d);
var _66f=function(){
LOG.finest(_66d,"<init>");
};
var _670=_66f.prototype=new _539();
_670.handleClearAuthenticationData=function(_671){
if(_671._challengeResponse!=null){
_671._challengeResponse.clearCredentials();
}
};
_670.handleRemoveAuthenticationData=function(_672){
this.handleClearAuthenticationData(_672);
_672._challengeResponse=new ChallengeResponse(null,null);
};
_670.doError=function(_673){
this._nextHandler.processClose(_673);
this.handleClearAuthenticationData(_673);
this._listener.connectionFailed(_673);
};
_670.handle401=function(_674,_675,_676){
var _677=this;
var _678=_674._location;
var _679=null;
if(typeof (_674.parent.connectTimer)!="undefined"){
_679=_674.parent.connectTimer;
if(_679!=null){
_679.pause();
}
}
if(_674.redirectUri!=null){
_678=_674._redirectUri;
}
if(_562.KAAZING_SEC_EXTENSION_REVALIDATE==_676){
var ch=new _566(_678,_674._protocol,_674._isBinary);
ch.challengeHandler=_674.parent.challengeHandler;
ch.parent=_674.parent;
var _67b=new _5bb(ch);
_67b.connect(_675);
}else{
var _67c=new ChallengeRequest(_678.toString(),_676);
var _67d;
if(_674._challengeResponse.nextChallengeHandler!=null){
_67d=_674._challengeResponse.nextChallengeHandler;
}else{
_67d=_674.parent.challengeHandler;
}
if(_67d!=null&&_67d.canHandle(_67c)){
_67d.handle(_67c,function(_67e){
try{
if(_67e==null||_67e.credentials==null){
_677.doError(_674);
}else{
if(_679!=null){
_679.resume();
}
_674._challengeResponse=_67e;
_677._nextHandler.processAuthorize(_674,_67e.credentials);
}
}
catch(e){
_677.doError(_674);
}
});
}else{
this.doError(_674);
}
}
};
_670.handleAuthenticate=function(_67f,_680,_681){
_67f.authenticationReceived=true;
this.handle401(_67f,_680,_681);
};
_670.setNextHandler=function(_682){
this._nextHandler=_682;
var _683=this;
var _684=new _54c(this);
_684.authenticationRequested=function(_685,_686,_687){
_683.handleAuthenticate(_685,_686,_687);
};
_682.setListener(_684);
};
_670.setListener=function(_688){
this._listener=_688;
};
return _66f;
})();
var _689=(function(){
var _68a="WebSocketHixie76FrameCodecHandler";
var LOG=_277.getLogger(_68a);
var _68c=function(){
LOG.finest(_68a,"<init>");
};
var _68d=_68c.prototype=new _539();
_68d.processConnect=function(_68e,uri,_690){
this._nextHandler.processConnect(_68e,uri,_690);
};
_68d.processBinaryMessage=function(_691,data){
if(data.constructor==ByteBuffer){
var _693=data.array.slice(data.position,data.limit);
this._nextHandler.processTextMessage(_691,Charset.UTF8.encodeByteArray(_693));
}else{
if(data.byteLength){
this._nextHandler.processTextMessage(_691,Charset.UTF8.encodeArrayBuffer(data));
}else{
if(data.size){
var _694=this;
var cb=function(_696){
_694._nextHandler.processBinaryMessage(_691,Charset.UTF8.encodeByteArray(_696));
};
BlobUtils.asNumberArray(cb,data);
}else{
throw new Error("Invalid type for send");
}
}
}
};
_68d.setNextHandler=function(_697){
this._nextHandler=_697;
var _698=this;
var _699=new _54c(this);
_699.textMessageReceived=function(_69a,text){
_698._listener.binaryMessageReceived(_69a,ByteBuffer.wrap(Charset.UTF8.toByteArray(text)));
};
_699.binaryMessageReceived=function(_69c,buf){
throw new Error("draft76 won't receive binary frame");
};
_697.setListener(_699);
};
_68d.setListener=function(_69e){
this._listener=_69e;
};
return _68c;
})();
var _69f=(function(){
var _6a0="WebSocketNativeHandler";
var LOG=_277.getLogger(_6a0);
var _6a2=function(){
var _6a3=new _66c();
return _6a3;
};
var _6a4=function(){
var _6a5=new _60f();
return _6a5;
};
var _6a6=function(){
var _6a7=new _57c();
return _6a7;
};
var _6a8=function(){
var _6a9=new _5e5();
return _6a9;
};
var _6aa=function(){
var _6ab=new _5cf();
return _6ab;
};
var _6ac=function(){
var _6ad=new _689();
return _6ad;
};
var _6ae=(browser=="safari"&&typeof (WebSocket.CLOSING)=="undefined");
var _6af=_6a2();
var _6b0=_6a4();
var _6b1=_6a6();
var _6b2=_6a8();
var _6b3=_6aa();
var _6b4=_6ac();
var _6b5=function(){
LOG.finest(_6a0,"<init>");
if(_6ae){
this.setNextHandler(_6b4);
_6b4.setNextHandler(_6af);
}else{
this.setNextHandler(_6af);
}
_6af.setNextHandler(_6b0);
_6b0.setNextHandler(_6b1);
_6b1.setNextHandler(_6b2);
_6b2.setNextHandler(_6b3);
};
var _6b6=function(_6b7,_6b8){
LOG.finest(_6a0,"<init>");
};
var _6b9=_6b5.prototype=new _539();
_6b9.setNextHandler=function(_6ba){
this._nextHandler=_6ba;
var _6bb=new _54c(this);
_6ba.setListener(_6bb);
};
_6b9.setListener=function(_6bc){
this._listener=_6bc;
};
return _6b5;
})();
var _6bd=(function(){
var _6be=_277.getLogger("com.kaazing.gateway.client.html5.WebSocketEmulatedProxyDownstream");
var _6bf=512*1024;
var _6c0=1;
var _6c1=function(_6c2,_6c3,_6c4){
_6be.entering(this,"WebSocketEmulatedProxyDownstream.<init>",_6c2);
this.sequence=_6c3;
this.retry=3000;
if(_6c2.indexOf("/;e/dtem/")>0){
this.requiresEscaping=true;
}
var _6c5=new URI(_6c2);
var _6c6={"http":80,"https":443};
if(_6c5.port==undefined){
_6c5.port=_6c6[_6c5.scheme];
_6c5.authority=_6c5.host+":"+_6c5.port;
}
this.origin=_6c5.scheme+"://"+_6c5.authority;
this.location=_6c2;
this.activeXhr=null;
this.reconnectTimer=null;
this.idleTimer=null;
this.idleTimeout=null;
this.lastMessageTimestamp=null;
this.buf=new ByteBuffer();
this.connectTimer=null;
this.connectionTimeout=_6c4;
var _6c7=this;
setTimeout(function(){
connect(_6c7,true);
_6c7.activeXhr=_6c7.mostRecentXhr;
startProxyDetectionTimer(_6c7,_6c7.mostRecentXhr);
},0);
_6be.exiting(this,"WebSocketEmulatedProxyDownstream.<init>");
};
var _6c8=_6c1.prototype;
var _6c9=0;
var _6ca=255;
var _6cb=1;
var _6cc=128;
var _6cd=129;
var _6ce=127;
var _6cf=137;
var _6d0=3000;
_6c8.readyState=0;
function connect(_6d1,_6d2){
_6be.entering(this,"WebSocketEmulatedProxyDownstream.connect");
if(_6d1.reconnectTimer!==null){
_6d1.reconnectTimer=null;
}
stopIdleTimer(_6d1);
startConnectTimer(_6d1,_6d1.connectionTimeout);
var _6d3=new URI(_6d1.location);
var _6d4=[];
var _6d5=_6d1.sequence++;
_6d4.push(".ksn="+_6d5);
switch(browser){
case "ie":
_6d4.push(".kns=1");
_6d4.push(".kf=200&.kp=2048");
break;
case "safari":
_6d4.push(".kp=256");
break;
case "firefox":
_6d4.push(".kp=1025");
break;
case "android":
_6d4.push(".kp=4096");
_6d4.push(".kbp=4096");
break;
}
if(browser=="android"||browser.ios){
_6d4.push(".kkt=20");
}
_6d4.push(".kc=text/plain;charset=windows-1252");
_6d4.push(".kb=4096");
_6d4.push(".kid="+String(Math.random()).substring(2));
if(_6d4.length>0){
if(_6d3.query===undefined){
_6d3.query=_6d4.join("&");
}else{
_6d3.query+="&"+_6d4.join("&");
}
}
var xhr=new XMLHttpRequest0();
xhr.id=_6c0++;
xhr.position=0;
xhr.opened=false;
xhr.reconnect=false;
xhr.requestClosing=false;
xhr.onreadystatechange=function(){
if(xhr.readyState==3){
stopConnectTimer(_6d1);
if(_6d1.idleTimer==null){
var _6d7=xhr.getResponseHeader("X-Idle-Timeout");
if(_6d7){
if(!_6d7.match(/^[\d]+$/)){
doError(_6d1);
throw "Invalid response of header X-Idle-Timeout";
}
var _6d8=parseInt(_6d7);
if(_6d8>0){
_6d8=_6d8*1000;
_6d1.idleTimeout=_6d8;
_6d1.lastMessageTimestamp=new Date().getTime();
startIdleTimer(_6d1,_6d8);
}
}
}
}
};
xhr.onprogress=function(){
if(xhr==_6d1.activeXhr&&_6d1.readyState!=2){
_process(_6d1);
}
};
xhr.onload=function(){
if(xhr==_6d1.activeXhr&&_6d1.readyState!=2){
_process(_6d1);
xhr.onerror=function(){
};
xhr.ontimeout=function(){
};
xhr.onreadystatechange=function(){
};
if(!xhr.reconnect){
doError(_6d1);
}else{
if(xhr.requestClosing){
doClose(_6d1);
}else{
if(_6d1.activeXhr==_6d1.mostRecentXhr){
connect(_6d1);
_6d1.activeXhr=_6d1.mostRecentXhr;
startProxyDetectionTimer(_6d1,_6d1.activeXhr);
}else{
var _6d9=_6d1.mostRecentXhr;
_6d1.activeXhr=_6d9;
switch(_6d9.readyState){
case 1:
case 2:
startProxyDetectionTimer(_6d1,_6d9);
break;
case 3:
_process(_6d1);
break;
case 4:
_6d1.activeXhr.onload();
break;
default:
}
}
}
}
}
};
xhr.ontimeout=function(){
_6be.entering(this,"WebSocketEmulatedProxyDownstream.connect.xhr.ontimeout");
doError(_6d1);
};
xhr.onerror=function(){
_6be.entering(this,"WebSocketEmulatedProxyDownstream.connect.xhr.onerror");
doError(_6d1);
};
xhr.open("GET",_6d3.toString(),true);
xhr.send("");
_6d1.mostRecentXhr=xhr;
};
function startProxyDetectionTimer(_6da,xhr){
if(_6da.location.indexOf(".ki=p")==-1){
setTimeout(function(){
if(xhr&&xhr.readyState<3&&_6da.readyState<2){
if(_6da.location.indexOf("?")==-1){
_6da.location+="?.ki=p";
}else{
_6da.location+="&.ki=p";
}
connect(_6da,false);
}
},_6d0);
}
};
_6c8.disconnect=function(){
_6be.entering(this,"WebSocketEmulatedProxyDownstream.disconnect");
if(this.readyState!==2){
_disconnect(this);
}
};
function _disconnect(_6dc){
_6be.entering(this,"WebSocketEmulatedProxyDownstream._disconnect");
if(_6dc.reconnectTimer!==null){
clearTimeout(_6dc.reconnectTimer);
_6dc.reconnectTimer=null;
}
stopIdleTimer(_6dc);
if(_6dc.mostRecentXhr!==null){
_6dc.mostRecentXhr.onprogress=function(){
};
_6dc.mostRecentXhr.onload=function(){
};
_6dc.mostRecentXhr.onerror=function(){
};
_6dc.mostRecentXhr.abort();
}
if(_6dc.activeXhr!=_6dc.mostRecentXhr&&_6dc.activeXhr!==null){
_6dc.activeXhr.onprogress=function(){
};
_6dc.activeXhr.onload=function(){
};
_6dc.activeXhr.onerror=function(){
};
_6dc.activeXhr.abort();
}
_6dc.lineQueue=[];
_6dc.lastEventId=null;
_6dc.location=null;
_6dc.readyState=2;
};
function _process(_6dd){
_6dd.lastMessageTimestamp=new Date().getTime();
var xhr=_6dd.activeXhr;
var _6df=xhr.responseText;
if(_6df.length>=_6bf){
if(_6dd.activeXhr==_6dd.mostRecentXhr){
connect(_6dd,false);
}
}
var _6e0=_6df.slice(xhr.position);
xhr.position=_6df.length;
var buf=_6dd.buf;
var _6e2=_499.toArray(_6e0,_6dd.requiresEscaping);
if(_6e2.hasRemainder){
xhr.position--;
}
buf.position=buf.limit;
buf.putBytes(_6e2);
buf.position=0;
buf.mark();
parse:
while(true){
if(!buf.hasRemaining()){
break;
}
var type=buf.getUnsigned();
switch(type&128){
case _6c9:
var _6e4=buf.indexOf(_6ca);
if(_6e4==-1){
break parse;
}
var _6e5=buf.array.slice(buf.position,_6e4);
var data=new ByteBuffer(_6e5);
var _6e7=_6e4-buf.position;
buf.skip(_6e7+1);
buf.mark();
if(type==_6cb){
handleCommandFrame(_6dd,data);
}else{
dispatchText(_6dd,data.getString(Charset.UTF8));
}
break;
case _6cc:
case _6cd:
var _6e8=0;
var _6e9=false;
while(buf.hasRemaining()){
var b=buf.getUnsigned();
_6e8=_6e8<<7;
_6e8|=(b&127);
if((b&128)!=128){
_6e9=true;
break;
}
}
if(!_6e9){
break parse;
}
if(buf.remaining()<_6e8){
break parse;
}
var _6eb=buf.array.slice(buf.position,buf.position+_6e8);
var _6ec=new ByteBuffer(_6eb);
buf.skip(_6e8);
buf.mark();
if(type==_6cc){
dispatchBytes(_6dd,_6ec);
}else{
if(type==_6cf){
dispatchPingReceived(_6dd);
}else{
dispatchText(_6dd,_6ec.getString(Charset.UTF8));
}
}
break;
default:
throw new Error("Emulation protocol error. Unknown frame type: "+type);
}
}
buf.reset();
buf.compact();
};
function handleCommandFrame(_6ed,data){
while(data.remaining()){
var _6ef=String.fromCharCode(data.getUnsigned());
switch(_6ef){
case "0":
break;
case "1":
_6ed.activeXhr.reconnect=true;
break;
case "2":
_6ed.activeXhr.requestClosing=true;
break;
default:
throw new Error("Protocol decode error. Unknown command: "+_6ef);
}
}
};
function dispatchBytes(_6f0,buf){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=_6f0.lastEventId;
e.data=buf;
e.decoder=_2b6;
e.origin=_6f0.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_6f0.onmessage)==="function"){
_6f0.onmessage(e);
}
};
function dispatchText(_6f3,data){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=_6f3.lastEventId;
e.text=data;
e.origin=_6f3.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_6f3.onmessage)==="function"){
_6f3.onmessage(e);
}
};
function dispatchPingReceived(_6f6){
if(typeof (_6f6.onping)==="function"){
_6f6.onping();
}
};
function doClose(_6f7){
doError(_6f7);
};
function doError(_6f8){
if(_6f8.readyState!=2){
_6f8.disconnect();
fireError(_6f8);
}
};
function fireError(_6f9){
var e=document.createEvent("Events");
e.initEvent("error",true,true);
if(typeof (_6f9.onerror)==="function"){
_6f9.onerror(e);
}
};
function startIdleTimer(_6fb,_6fc){
stopIdleTimer(_6fb);
_6fb.idleTimer=setTimeout(function(){
idleTimerHandler(_6fb);
},_6fc);
};
function idleTimerHandler(_6fd){
var _6fe=new Date().getTime();
var _6ff=_6fe-_6fd.lastMessageTimestamp;
var _700=_6fd.idleTimeout;
if(_6ff>_700){
doError(_6fd);
}else{
startIdleTimer(_6fd,_700-_6ff);
}
};
function stopIdleTimer(_701){
if(_701.idleTimer!=null){
clearTimeout(_701.idleTimer);
_701.idleTimer=null;
}
};
function startConnectTimer(_702,_703){
stopConnectTimer(_702);
_702.connectTimer=setTimeout(function(){
connectTimerHandler(_702);
},_703);
};
function connectTimerHandler(_704){
doError(_704);
};
function stopConnectTimer(_705){
if(_705.connectTimer!=null){
clearTimeout(_705.connectTimer);
_705.connectTimer=null;
}
};
return _6c1;
})();
var _706=(function(){
var _707=_277.getLogger("WebSocketEmulatedProxy");
var _708=function(){
this.parent;
this._listener;
this.closeCode=1005;
this.closeReason="";
this.sequence=0;
};
var _709=_708.prototype;
_709.connect=function(_70a,_70b){
_707.entering(this,"WebSocketEmulatedProxy.connect",{"location":_70a,"subprotocol":_70b});
this.URL=_70a.replace("ws","http");
this.protocol=_70b;
this._prepareQueue=new _4f3();
this._sendQueue=[];
_70c(this);
_707.exiting(this,"WebSocketEmulatedProxy.<init>");
};
_709.readyState=0;
_709.bufferedAmount=0;
_709.URL="";
_709.onopen=function(){
};
_709.onerror=function(){
};
_709.onmessage=function(_70d){
};
_709.onclose=function(){
};
var _70e=128;
var _70f=129;
var _710=0;
var _711=255;
var _712=1;
var _713=138;
var _714=[_712,48,49,_711];
var _715=[_712,48,50,_711];
var _716=function(buf,_718){
_707.entering(this,"WebSocketEmulatedProxy.encodeLength",{"buf":buf,"length":_718});
var _719=0;
var _71a=0;
do{
_71a<<=8;
_71a|=(_718&127);
_718>>=7;
_719++;
}while(_718>0);
do{
var _71b=_71a&255;
_71a>>=8;
if(_719!=1){
_71b|=128;
}
buf.put(_71b);
}while(--_719>0);
};
_709.send=function(data){
var _71d=this;
_707.entering(this,"WebSocketEmulatedProxy.send",{"data":data});
switch(this.readyState){
case 0:
_707.severe(this,"WebSocketEmulatedProxy.send: Error: readyState is 0");
throw new Error("INVALID_STATE_ERR");
case 1:
if(data===null){
_707.severe(this,"WebSocketEmulatedProxy.send: Error: data is null");
throw new Error("data is null");
}
var buf=new ByteBuffer();
if(typeof data=="string"){
_707.finest(this,"WebSocketEmulatedProxy.send: Data is string");
var _71f=new ByteBuffer();
_71f.putString(data,Charset.UTF8);
buf.put(_70f);
_716(buf,_71f.position);
buf.putBytes(_71f.array);
}else{
if(data.constructor==ByteBuffer){
_707.finest(this,"WebSocketEmulatedProxy.send: Data is ByteBuffer");
buf.put(_70e);
_716(buf,data.remaining());
buf.putBuffer(data);
}else{
if(data.byteLength){
_707.finest(this,"WebSocketEmulatedProxy.send: Data is ByteArray");
buf.put(_70e);
_716(buf,data.byteLength);
buf.putByteArray(data);
}else{
if(data.size){
_707.finest(this,"WebSocketEmulatedProxy.send: Data is Blob");
var cb=this._prepareQueue.enqueue(function(_721){
var b=new ByteBuffer();
b.put(_70e);
_716(b,_721.length);
b.putBytes(_721);
b.flip();
doSend(_71d,b);
});
BlobUtils.asNumberArray(cb,data);
return true;
}else{
_707.severe(this,"WebSocketEmulatedProxy.send: Error: Invalid type for send");
throw new Error("Invalid type for send");
}
}
}
}
buf.flip();
this._prepareQueue.enqueue(function(_723){
doSend(_71d,buf);
})();
return true;
case 2:
return false;
default:
_707.severe(this,"WebSocketEmulatedProxy.send: Error: invalid readyState");
throw new Error("INVALID_STATE_ERR");
}
_707.exiting(this,"WebSocketEmulatedProxy.send");
};
_709.close=function(code,_725){
_707.entering(this,"WebSocketEmulatedProxy.close");
switch(this.readyState){
case 0:
_726(this);
break;
case 1:
if(code!=null&&code!=0){
this.closeCode=code;
this.closeReason=_725;
}
doSend(this,new ByteBuffer(_715));
break;
}
};
_709.setListener=function(_727){
this._listener=_727;
};
function openUpstream(_728){
if(_728.readyState!=1){
return;
}
var xdr=new XMLHttpRequest0();
xdr.onreadystatechange=function(){
if(xdr.readyState==4){
switch(xdr.status){
case 200:
setTimeout(function(){
doFlush(_728);
},0);
break;
}
}
};
xdr.onload=function(){
openUpstream(_728);
};
xdr.ontimeout=function(){
if(_728.upstreamXHR!=null){
_728.upstreamXHR.abort();
}
openUpstream(_728);
};
xdr.onerror=function(){
if(_728._downstream){
_728._downstream.disconnect();
}
_726(_728);
};
var url=appendRandomNumberQueryString(_728._upstream);
xdr.open("POST",url,true);
_728.upstreamXHR=xdr;
};
function doSend(_72b,buf){
_707.entering(this,"WebSocketEmulatedProxy.doSend",buf);
_72b.bufferedAmount+=buf.remaining();
_72b._sendQueue.push(buf);
_72d(_72b);
if(!_72b._writeSuspended){
doFlush(_72b);
}
};
function appendRandomNumberQueryString(url){
var _72f=".krn="+Math.random();
url+=((url.indexOf("?")==-1)?"?":"&")+_72f;
return url;
};
function doFlush(_730){
_707.entering(this,"WebSocketEmulatedProxy.doFlush");
var _731=_730._sendQueue;
var _732=_731.length;
_730._writeSuspended=(_732>0);
if(_732>0){
var _733=_730.sequence++;
if(_730.useXDR){
if(_730.upstreamXHR==null){
openUpstream(_730);
}
var out=new ByteBuffer();
while(_731.length){
out.putBuffer(_731.shift());
}
out.putBytes(_714);
out.flip();
_730.upstreamXHR.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_730.upstreamXHR.setRequestHeader("X-Sequence-No",_733.toString());
_730.upstreamXHR.send(_2d1(out,_730.requiresEscaping));
}else{
var xhr=new XMLHttpRequest0();
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
_707.finest(this,"WebSocketEmulatedProxy.doFlush: xhr.status="+xhr.status);
switch(xhr.status){
case 200:
setTimeout(function(){
doFlush(_730);
},0);
break;
default:
_726(_730);
break;
}
}
};
xhr.onerror=function(){
_707.finest(this,"WebSocketEmulatedProxy.doFlush: xhr.onerror status = "+xhr.status);
if(_730._downstream){
_730._downstream.disconnect();
}
_726(_730);
};
var url=appendRandomNumberQueryString(_730._upstream);
xhr.open("POST",url,true);
var out=new ByteBuffer();
while(_731.length){
out.putBuffer(_731.shift());
}
out.putBytes(_714);
out.flip();
xhr.setRequestHeader("X-Sequence-No",_733.toString());
if(browser=="firefox"){
if(xhr.sendAsBinary){
_707.finest(this,"WebSocketEmulatedProxy.doFlush: xhr.sendAsBinary");
xhr.setRequestHeader("Content-Type","application/octet-stream");
xhr.sendAsBinary(_2d1(out));
}else{
xhr.send(_2d1(out));
}
}else{
xhr.setRequestHeader("Content-Type","text/plain; charset=utf-8");
xhr.send(_2d1(out,_730.requiresEscaping));
}
}
}
_730.bufferedAmount=0;
_72d(_730);
};
var _70c=function(_737){
_707.entering(this,"WebSocketEmulatedProxy.connect");
var url=new URI(_737.URL);
url.scheme=url.scheme.replace("ws","http");
if(browser=="ie"&&typeof (XDomainRequest)!=="undefined"&&location.protocol.replace(":","")==url.scheme){
_737.useXDR=true;
}
switch(browser){
case "opera":
_737.requiresEscaping=true;
break;
case "ie":
if(!_737.useXDR){
_737.requiresEscaping=true;
}else{
if((typeof (Object.defineProperties)==="undefined")&&(navigator.userAgent.indexOf("MSIE 8")>0)){
_737.requiresEscaping=true;
}else{
_737.requiresEscaping=false;
}
}
break;
default:
_737.requiresEscaping=false;
break;
}
var _739=_737.requiresEscaping?"/;e/ctem":"/;e/ctm";
url.path=url.path.replace(/[\/]?$/,_739);
var _73a=url.toString();
var _73b=_73a.indexOf("?");
if(_73b==-1){
_73a+="?";
}else{
_73a+="&";
}
_73a+=".kn="+String(Math.random()).substring(2);
_707.finest(this,"WebSocketEmulatedProxy.connect: Connecting to "+_73a);
var _73c=new XMLHttpRequest0();
var _73d=false;
_73c.withCredentials=true;
_73c.open("GET",_73a,true);
_73c.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_73c.setRequestHeader("X-WebSocket-Version","wseb-1.0");
_73c.setRequestHeader("X-Accept-Commands","ping");
var _73e=_737.sequence++;
_73c.setRequestHeader("X-Sequence-No",_73e.toString());
if(_737.protocol.length){
var _73f=_737.protocol.join(",");
_73c.setRequestHeader("X-WebSocket-Protocol",_73f);
}
for(var i=0;i<_737.parent.requestHeaders.length;i++){
var _741=_737.parent.requestHeaders[i];
_73c.setRequestHeader(_741.label,_741.value);
}
_73c.onerror=function(){
_707.info(this,"WebSocketEmulatedProxy.onerror",{"status":_73c.status});
doError(_737);
};
_73c.onredirectallowed=function(_742,_743){
var _744=_737.parent.parent;
var _745=_744.getRedirectPolicy();
if((typeof (_745)!="undefined")&&(_745!=null)){
if(!_745.isRedirectionAllowed(_742,_743)){
_73c.statusText=_745.toString()+": Cannot redirect from "+_742+" to "+_743;
_737.closeCode=1006;
_737.closeReason=_73c.statusText;
_737.parent.closeCode=_737.closeCode;
_737.parent.closeReason=_737.closeReason;
_737.parent.preventFallback=true;
doError(_737);
return false;
}
}
return true;
};
_73c.onreadystatechange=function(){
switch(_73c.readyState){
case 2:
if(_73c.status==403){
doError(_737);
}else{
var _746=_737.parent.parent._webSocket.connectTimeout;
if(_746==0){
_746=5000;
}
timer=setTimeout(function(){
if(!_73d){
doError(_737);
}
},_746);
}
break;
case 3:
break;
case 4:
_73d=true;
if(_73c.status==401){
_737._listener.authenticationRequested(_737.parent,_73c.xhr._location,_73c.getResponseHeader("WWW-Authenticate"));
return;
}
if(_737.readyState<1){
if(_73c.status==201){
_737.parent.responseHeaders[_562.HEADER_SEC_PROTOCOL]=_73c.getResponseHeader(_562.HEADER_SEC_PROTOCOL);
_737.parent.responseHeaders[_562.HEADER_SEC_EXTENSIONS]=_73c.getResponseHeader(_562.HEADER_SEC_EXTENSIONS);
var _747=10*1000;
var _748=_73c.getResponseHeader(_562.HEADER_SEC_EXTENSIONS);
if(_748){
var _749=_748.split(",");
for(var j=0;j<_749.length;j++){
var _74b=_749[j].split(";");
var _74c=_74b[0].replace(/^\s+|\s+$/g,"");
if(_562.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT===_74c){
_747=_74b[1].match(/\d+/)[0];
_707.info(this,"WebSocketEmulatedProxy.onreadystatechange",{"timeout":_747});
break;
}
}
}
var _74d=_73c.responseText.split("\n");
var _74e=_74d[0];
var _74f=_74d[1];
var _750=new URI(_73c.xhr._location);
var _751=new URI(_74e);
var _752=new URI(_74f);
if(_750.host.toLowerCase()!=_751.host.toLowerCase()){
throw new Error("Hostname in original URI does not match with the hostname in the upstream URI.");
}
if(_750.host.toLowerCase()!=_752.host.toLowerCase()){
throw new Error("Hostname in original URI does not match with the hostname in the downstream URI.");
}
_737._upstream=_750.scheme+"://"+_750.authority+_751.path;
_737._downstream=new _6bd(_74f,_737.sequence,_747);
var _753=_74f.substring(0,_74f.indexOf("/;e/"));
if(_753!=_737.parent._location.toString().replace("ws","http")){
_737.parent._redirectUri=_753;
}
_754(_737,_737._downstream);
_755(_737);
}else{
doError(_737);
}
}
break;
}
};
_73c.send(null);
_707.exiting(this,"WebSocketEmulatedProxy.connect");
};
var _755=function(_756){
_707.entering(this,"WebSocketEmulatedProxy.doOpen");
_756.readyState=1;
var _757=_756.parent;
_757._acceptedProtocol=_757.responseHeaders["X-WebSocket-Protocol"]||"";
if(_756.useXDR){
this.upstreamXHR=null;
openUpstream(_756);
}
_756._listener.connectionOpened(_756.parent,_757._acceptedProtocol);
};
function doError(_758){
if(_758.readyState<2){
_707.entering(this,"WebSocketEmulatedProxy.doError");
_758.readyState=2;
if(_758.upstreamXHR!=null){
_758.upstreamXHR.abort();
}
if(_758.onerror!=null){
_758._listener.connectionFailed(_758.parent);
}
}
};
var _726=function(_759,_75a,code,_75c){
_707.entering(this,"WebSocketEmulatedProxy.doClose");
switch(_759.readyState){
case 2:
break;
case 0:
case 1:
_759.readyState=WebSocket.CLOSED;
if(_759.upstreamXHR!=null){
_759.upstreamXHR.abort();
}
if(typeof _75a==="undefined"){
_759._listener.connectionClosed(_759.parent,true,1005,"");
}else{
_759._listener.connectionClosed(_759.parent,_75a,code,_75c);
}
break;
default:
}
};
var _72d=function(_75d){
};
var _75e=function(_75f,_760){
_707.finest("WebSocket.handleMessage: A WebSocket frame received on a WebSocket");
if(_760.text){
_75f._listener.textMessageReceived(_75f.parent,_760.text);
}else{
if(_760.data){
_75f._listener.binaryMessageReceived(_75f.parent,_760.data);
}
}
};
var _761=function(_762){
var _763=ByteBuffer.allocate(2);
_763.put(_713);
_763.put(0);
_763.flip();
doSend(_762,_763);
};
var _754=function(_764,_765){
_707.entering(this,"WebSocketEmulatedProxy.bindHandlers");
_765.onmessage=function(_766){
switch(_766.type){
case "message":
if(_764.readyState==1){
_75e(_764,_766);
}
break;
}
};
_765.onping=function(){
if(_764.readyState==1){
_761(_764);
}
};
_765.onerror=function(){
try{
_765.disconnect();
}
finally{
_726(_764,true,_764.closeCode,_764.closeReason);
}
};
_765.onclose=function(_767){
try{
_765.disconnect();
}
finally{
_726(_764,true,this.closeCode,this.closeReason);
}
};
};
return _708;
})();
var _768=(function(){
var _769="WebSocketEmulatedDelegateHandler";
var LOG=_277.getLogger(_769);
var _76b=function(){
LOG.finest(_769,"<init>");
};
var _76c=_76b.prototype=new _539();
_76c.processConnect=function(_76d,uri,_76f){
LOG.finest(_769,"connect",_76d);
if(_76d.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
var _770=!!window.MockWseTransport?new MockWseTransport():new _706();
_770.parent=_76d;
_76d._delegate=_770;
_771(_770,this);
_770.connect(uri.toString(),_76f);
};
_76c.processTextMessage=function(_772,text){
LOG.finest(_769,"connect",_772);
if(_772.readyState==WebSocket.OPEN){
_772._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_76c.processBinaryMessage=function(_774,obj){
LOG.finest(_769,"processBinaryMessage",_774);
if(_774.readyState==WebSocket.OPEN){
_774._delegate.send(obj);
}else{
throw new Error("WebSocket is already closed");
}
};
_76c.processClose=function(_776,code,_778){
LOG.finest(_769,"close",_776);
try{
_776._delegate.close(code,_778);
}
catch(e){
listener.connectionClosed(_776);
}
};
var _771=function(_779,_77a){
var _77b=new _54c(_77a);
_779.setListener(_77b);
};
return _76b;
})();
var _77c=(function(){
var _77d="WebSocketEmulatedAuthenticationHandler";
var LOG=_277.getLogger(_77d);
var _77f=function(){
LOG.finest(_77d,"<init>");
};
var _780=_77f.prototype=new _539();
_780.handleClearAuthenticationData=function(_781){
if(_781._challengeResponse!=null){
_781._challengeResponse.clearCredentials();
}
};
_780.handleRemoveAuthenticationData=function(_782){
this.handleClearAuthenticationData(_782);
_782._challengeResponse=new ChallengeResponse(null,null);
};
_780.handle401=function(_783,_784,_785){
var _786=this;
var _787=null;
if(typeof (_783.parent.connectTimer)!="undefined"){
_787=_783.parent.connectTimer;
if(_787!=null){
_787.pause();
}
}
if(_562.KAAZING_SEC_EXTENSION_REVALIDATE==_785){
var _788=new _5bb(_783);
_783.challengeHandler=_783.parent.challengeHandler;
_788.connect(_784);
}else{
var _789=_784;
if(_789.indexOf("/;e/")>0){
_789=_789.substring(0,_789.indexOf("/;e/"));
}
var _78a=new _50b(_789.replace("http","ws"));
var _78b=new ChallengeRequest(_789,_785);
var _78c;
if(_783._challengeResponse.nextChallengeHandler!=null){
_78c=_783._challengeResponse.nextChallengeHandler;
}else{
_78c=_783.parent.challengeHandler;
}
if(_78c!=null&&_78c.canHandle(_78b)){
_78c.handle(_78b,function(_78d){
try{
if(_78d==null||_78d.credentials==null){
_786.handleClearAuthenticationData(_783);
_786._listener.connectionFailed(_783);
}else{
if(_787!=null){
_787.resume();
}
_783._challengeResponse=_78d;
_786.processConnect(_783,_78a,_783._protocol);
}
}
catch(e){
_786.handleClearAuthenticationData(_783);
_786._listener.connectionFailed(_783);
}
});
}else{
this.handleClearAuthenticationData(_783);
this._listener.connectionFailed(_783);
}
}
};
_780.processConnect=function(_78e,_78f,_790){
if(_78e._challengeResponse!=null&&_78e._challengeResponse.credentials!=null){
var _791=_78e._challengeResponse.credentials.toString();
for(var i=_78e.requestHeaders.length-1;i>=0;i--){
if(_78e.requestHeaders[i].label==="Authorization"){
_78e.requestHeaders.splice(i,1);
}
}
var _793=new _4fd("Authorization",_791);
for(var i=_78e.requestHeaders.length-1;i>=0;i--){
if(_78e.requestHeaders[i].label==="Authorization"){
_78e.requestHeaders.splice(i,1);
}
}
_78e.requestHeaders.push(_793);
this.handleClearAuthenticationData(_78e);
}
this._nextHandler.processConnect(_78e,_78f,_790);
};
_780.handleAuthenticate=function(_794,_795,_796){
_794.authenticationReceived=true;
this.handle401(_794,_795,_796);
};
_780.setNextHandler=function(_797){
this._nextHandler=_797;
var _798=new _54c(this);
var _799=this;
_798.authenticationRequested=function(_79a,_79b,_79c){
_799.handleAuthenticate(_79a,_79b,_79c);
};
_797.setListener(_798);
};
_780.setListener=function(_79d){
this._listener=_79d;
};
return _77f;
})();
var _79e=(function(){
var _79f="WebSocketEmulatedHandler";
var LOG=_277.getLogger(_79f);
var _7a1=new _77c();
var _7a2=new _57c();
var _7a3=new _768();
var _7a4=function(){
LOG.finest(_79f,"<init>");
this.setNextHandler(_7a1);
_7a1.setNextHandler(_7a2);
_7a2.setNextHandler(_7a3);
};
var _7a5=_7a4.prototype=new _539();
_7a5.processConnect=function(_7a6,_7a7,_7a8){
var _7a9=[];
for(var i=0;i<_7a8.length;i++){
_7a9.push(_7a8[i]);
}
var _7ab=[];
_7ab.push(_7a6._extensions);
_7ab.push(_562.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT);
_7a6.requestHeaders.push(new _4fd(_562.HEADER_SEC_EXTENSIONS,_7ab.join(",")));
this._nextHandler.processConnect(_7a6,_7a7,_7a9);
};
_7a5.setNextHandler=function(_7ac){
this._nextHandler=_7ac;
var _7ad=this;
var _7ae=new _54c(this);
_7ae.commandMessageReceived=function(_7af,_7b0){
if(_7b0=="CloseCommandMessage"&&_7af.readyState==1){
}
_7ad._listener.commandMessageReceived(_7af,_7b0);
};
_7ac.setListener(_7ae);
};
_7a5.setListener=function(_7b1){
this._listener=_7b1;
};
return _7a4;
})();
var _7b2=(function(){
var _7b3="WebSocketFlashEmulatedDelegateHandler";
var LOG=_277.getLogger(_7b3);
var _7b5=function(){
LOG.finest(_7b3,"<init>");
};
var _7b6=_7b5.prototype=new _539();
_7b6.processConnect=function(_7b7,uri,_7b9){
LOG.finest(_7b3,"connect",_7b7);
if(_7b7.readyState==2){
throw new Error("WebSocket is already closed");
}
var _7ba=new _314();
_7ba.parent=_7b7;
_7b7._delegate=_7ba;
_7bb(_7ba,this);
_7ba.connect(uri.toString(),_7b9);
};
_7b6.processTextMessage=function(_7bc,text){
LOG.finest(_7b3,"connect",_7bc);
if(_7bc.readyState==1){
_7bc._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_7b6.processBinaryMessage=function(_7be,_7bf){
LOG.finest(_7b3,"connect",_7be);
if(_7be.readyState==1){
_7be._delegate.send(_7bf);
}else{
throw new Error("WebSocket is already closed");
}
};
_7b6.processClose=function(_7c0,code,_7c2){
LOG.finest(_7b3,"close",_7c0);
_7c0._delegate.close(code,_7c2);
};
var _7bb=function(_7c3,_7c4){
var _7c5=new _54c(_7c4);
_7c3.setListener(_7c5);
_7c5.redirected=function(_7c6,_7c7){
_7c6._redirectUri=_7c7;
};
};
return _7b5;
})();
var _7c8=(function(){
var _7c9="WebSocketFlashEmulatedHandler";
var LOG=_277.getLogger(_7c9);
var _7cb=function(){
var _7cc=new _77c();
return _7cc;
};
var _7cd=function(){
var _7ce=new _57c();
return _7ce;
};
var _7cf=function(){
var _7d0=new _7b2();
return _7d0;
};
var _7d1=_7cb();
var _7d2=_7cd();
var _7d3=_7cf();
var _7d4=function(){
LOG.finest(_7c9,"<init>");
this.setNextHandler(_7d1);
_7d1.setNextHandler(_7d2);
_7d2.setNextHandler(_7d3);
};
var _7d5=_7d4.prototype=new _539();
_7d5.processConnect=function(_7d6,_7d7,_7d8){
var _7d9=[_562.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_7d8.length;i++){
_7d9.push(_7d8[i]);
}
var _7db=_7d6._extensions;
if(_7db.length>0){
_7d6.requestHeaders.push(new _4fd(_562.HEADER_SEC_EXTENSIONS,_7db.join(";")));
}
this._nextHandler.processConnect(_7d6,_7d7,_7d9);
};
_7d5.setNextHandler=function(_7dc){
this._nextHandler=_7dc;
var _7dd=new _54c(this);
_7dc.setListener(_7dd);
};
_7d5.setListener=function(_7de){
this._listener=_7de;
};
return _7d4;
})();
var _7df=(function(){
var _7e0="WebSocketFlashRtmpDelegateHandler";
var LOG=_277.getLogger(_7e0);
var _7e2;
var _7e3=function(){
LOG.finest(_7e0,"<init>");
_7e2=this;
};
var _7e4=_7e3.prototype=new _539();
_7e4.processConnect=function(_7e5,uri,_7e7){
LOG.finest(_7e0,"connect",_7e5);
if(_7e5.readyState==2){
throw new Error("WebSocket is already closed");
}
var _7e8=new _345();
_7e8.parent=_7e5;
_7e5._delegate=_7e8;
_7e9(_7e8,this);
_7e8.connect(uri.toString(),_7e7);
};
_7e4.processTextMessage=function(_7ea,text){
LOG.finest(_7e0,"connect",_7ea);
if(_7ea.readyState==1){
_7ea._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_7e4.processBinaryMessage=function(_7ec,_7ed){
LOG.finest(_7e0,"connect",_7ec);
if(_7ec.readyState==1){
_7ec._delegate.send(_7ed);
}else{
throw new Error("WebSocket is already closed");
}
};
_7e4.processClose=function(_7ee,code,_7f0){
LOG.finest(_7e0,"close",_7ee);
_7ee._delegate.close(code,_7f0);
};
var _7e9=function(_7f1,_7f2){
var _7f3=new _54c(_7f2);
_7f3.redirected=function(_7f4,_7f5){
_7f4._redirectUri=_7f5;
};
_7f1.setListener(_7f3);
};
return _7e3;
})();
var _7f6=(function(){
var _7f7="WebSocketFlashRtmpHandler";
var LOG=_277.getLogger(_7f7);
var _7f9=function(){
var _7fa=new _77c();
return _7fa;
};
var _7fb=function(){
var _7fc=new _57c();
return _7fc;
};
var _7fd=function(){
var _7fe=new _7df();
return _7fe;
};
var _7ff=_7f9();
var _800=_7fb();
var _801=_7fd();
var _802=function(){
LOG.finest(_7f7,"<init>");
this.setNextHandler(_7ff);
_7ff.setNextHandler(_800);
_800.setNextHandler(_801);
};
var _803=function(_804,_805){
LOG.finest(_7f7,"<init>");
};
var _806=_802.prototype=new _539();
_806.setNextHandler=function(_807){
this._nextHandler=_807;
var _808=new _54c(this);
_807.setListener(_808);
};
_806.setListener=function(_809){
this._listener=_809;
};
return _802;
})();
var _80a=(function(){
var _80b="WebSocketSelectedHandler";
var _LOG=_277.getLogger(_80b);
var _80d=function(){
_LOG.fine(_80b,"<init>");
};
var _80e=_80d.prototype=new _539();
_80e.processConnect=function(_80f,uri,_811){
_LOG.fine(_80b,"connect",_80f);
if(_80f.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
this._nextHandler.processConnect(_80f,uri,_811);
};
_80e.handleConnectionOpened=function(_812,_813){
_LOG.fine(_80b,"handleConnectionOpened");
var _814=_812;
if(_814.readyState==WebSocket.CONNECTING){
_814.readyState=WebSocket.OPEN;
this._listener.connectionOpened(_812,_813);
}
};
_80e.handleMessageReceived=function(_815,_816){
_LOG.fine(_80b,"handleMessageReceived",_816);
if(_815.readyState!=WebSocket.OPEN){
return;
}
this._listener.textMessageReceived(_815,_816);
};
_80e.handleBinaryMessageReceived=function(_817,_818){
_LOG.fine(_80b,"handleBinaryMessageReceived",_818);
if(_817.readyState!=WebSocket.OPEN){
return;
}
this._listener.binaryMessageReceived(_817,_818);
};
_80e.handleConnectionClosed=function(_819,_81a,code,_81c){
_LOG.fine(_80b,"handleConnectionClosed");
var _81d=_819;
if(_81d.readyState!=WebSocket.CLOSED){
_81d.readyState=WebSocket.CLOSED;
this._listener.connectionClosed(_819,_81a,code,_81c);
}
};
_80e.handleConnectionFailed=function(_81e){
_LOG.fine(_80b,"connectionFailed");
if(_81e.readyState!=WebSocket.CLOSED){
_81e.readyState=WebSocket.CLOSED;
this._listener.connectionFailed(_81e);
}
};
_80e.handleConnectionError=function(_81f,e){
_LOG.fine(_80b,"connectionError");
this._listener.connectionError(_81f,e);
};
_80e.setNextHandler=function(_821){
this._nextHandler=_821;
var _822={};
var _823=this;
_822.connectionOpened=function(_824,_825){
_823.handleConnectionOpened(_824,_825);
};
_822.redirected=function(_826,_827){
throw new Error("invalid event received");
};
_822.authenticationRequested=function(_828,_829,_82a){
throw new Error("invalid event received");
};
_822.textMessageReceived=function(_82b,buf){
_823.handleMessageReceived(_82b,buf);
};
_822.binaryMessageReceived=function(_82d,buf){
_823.handleBinaryMessageReceived(_82d,buf);
};
_822.connectionClosed=function(_82f,_830,code,_832){
_823.handleConnectionClosed(_82f,_830,code,_832);
};
_822.connectionFailed=function(_833){
_823.handleConnectionFailed(_833);
};
_822.connectionError=function(_834,e){
_823.handleConnectionError(_834,e);
};
_821.setListener(_822);
};
_80e.setListener=function(_836){
this._listener=_836;
};
return _80d;
})();
var _837=(function(){
var _838=function(_839,_83a,_83b){
this._nativeEquivalent=_839;
this._handler=_83a;
this._channelFactory=_83b;
};
return _838;
})();
var _83c=(function(){
var _83d="WebSocketCompositeHandler";
var _LOG=_277.getLogger(_83d);
var _83f="javascript:ws";
var _840="javascript:wss";
var _841="javascript:wse";
var _842="javascript:wse+ssl";
var _843="flash:wse";
var _844="flash:wse+ssl";
var _845="flash:wsr";
var _846="flash:wsr+ssl";
var _847={};
var _848={};
var _849=new _571();
var _84a=new _56a();
var _84b=true;
var _84c={};
if(Object.defineProperty){
try{
Object.defineProperty(_84c,"prop",{get:function(){
return true;
}});
_84b=false;
}
catch(e){
}
}
var _84d=function(){
this._handlerListener=createListener(this);
this._nativeHandler=createNativeHandler(this);
this._emulatedHandler=createEmulatedHandler(this);
this._emulatedFlashHandler=createFlashEmulatedHandler(this);
this._rtmpFlashHandler=createFlashRtmpHandler(this);
_LOG.finest(_83d,"<init>");
pickStrategies();
_847[_83f]=new _837("ws",this._nativeHandler,_849);
_847[_840]=new _837("wss",this._nativeHandler,_849);
_847[_841]=new _837("ws",this._emulatedHandler,_84a);
_847[_842]=new _837("wss",this._emulatedHandler,_84a);
_847[_843]=new _837("ws",this._emulatedFlashHandler,_84a);
_847[_844]=new _837("wss",this._emulatedFlashHandler,_84a);
_847[_845]=new _837("ws",this._rtmpFlashHandler,_84a);
_847[_846]=new _837("wss",this._rtmpFlashHandler,_84a);
};
function isIE6orIE7(){
if(browser!="ie"){
return false;
}
var _84e=navigator.appVersion;
return (_84e.indexOf("MSIE 6.0")>=0||_84e.indexOf("MSIE 7.0")>=0);
};
function isXdrDisabledonIE8IE9(){
if(browser!="ie"){
return false;
}
var _84f=navigator.appVersion;
return ((_84f.indexOf("MSIE 8.0")>=0||_84f.indexOf("MSIE 9.0")>=0)&&typeof (XDomainRequest)==="undefined");
};
function pickStrategies(){
if(isIE6orIE7()||isXdrDisabledonIE8IE9()){
_848["ws"]=new Array(_83f,_843,_841);
_848["wss"]=new Array(_840,_844,_842);
}else{
_848["ws"]=new Array(_83f,_841);
_848["wss"]=new Array(_840,_842);
}
};
function createListener(_850){
var _851={};
_851.connectionOpened=function(_852,_853){
_850.handleConnectionOpened(_852,_853);
};
_851.binaryMessageReceived=function(_854,buf){
_850.handleMessageReceived(_854,buf);
};
_851.textMessageReceived=function(_856,text){
var _858=_856.parent;
_858._webSocketChannelListener.handleMessage(_858._webSocket,text);
};
_851.connectionClosed=function(_859,_85a,code,_85c){
_850.handleConnectionClosed(_859,_85a,code,_85c);
};
_851.connectionFailed=function(_85d){
_850.handleConnectionFailed(_85d);
};
_851.connectionError=function(_85e,e){
_850.handleConnectionError(_85e,e);
};
_851.authenticationRequested=function(_860,_861,_862){
};
_851.redirected=function(_863,_864){
};
_851.onBufferedAmountChange=function(_865,n){
_850.handleBufferedAmountChange(_865,n);
};
return _851;
};
function createNativeHandler(_867){
var _868=new _80a();
var _869=new _69f();
_868.setListener(_867._handlerListener);
_868.setNextHandler(_869);
return _868;
};
function createEmulatedHandler(_86a){
var _86b=new _80a();
var _86c=new _79e();
_86b.setListener(_86a._handlerListener);
_86b.setNextHandler(_86c);
return _86b;
};
function createFlashEmulatedHandler(_86d){
var _86e=new _80a();
var _86f=new _7c8();
_86e.setListener(_86d._handlerListener);
_86e.setNextHandler(_86f);
return _86e;
};
function createFlashRtmpHandler(_870){
var _871=new _80a();
var _872=new _7f6();
_871.setListener(_870._handlerListener);
_871.setNextHandler(_872);
return _871;
};
var _873=function(_874,_875){
var _876=_847[_875];
var _877=_876._channelFactory;
var _878=_874._location;
var _879=_877.createChannel(_878,_874._protocol);
_874._selectedChannel=_879;
_879.parent=_874;
_879._extensions=_874._extensions;
_879._handler=_876._handler;
_879._handler.processConnect(_874._selectedChannel,_878,_874._protocol);
};
var _87a=_84d.prototype;
_87a.fallbackNext=function(_87b){
_LOG.finest(_83d,"fallbackNext");
var _87c=_87b.getNextStrategy();
if(_87c==null){
this.doClose(_87b,false,1006,"");
}else{
_873(_87b,_87c);
}
};
_87a.doOpen=function(_87d,_87e){
if(_87d._lastErrorEvent!==undefined){
delete _87d._lastErrorEvent;
}
if(_87d.readyState===WebSocket.CONNECTING){
_87d.readyState=WebSocket.OPEN;
if(_84b){
_87d._webSocket.readyState=WebSocket.OPEN;
}
_87d._webSocketChannelListener.handleOpen(_87d._webSocket,_87e);
}
};
_87a.doClose=function(_87f,_880,code,_882){
if(_87f._lastErrorEvent!==undefined){
_87f._webSocketChannelListener.handleError(_87f._webSocket,_87f._lastErrorEvent);
delete _87f._lastErrorEvent;
}
if(_87f.readyState===WebSocket.CONNECTING||_87f.readyState===WebSocket.OPEN||_87f.readyState===WebSocket.CLOSING){
_87f.readyState=WebSocket.CLOSED;
if(_84b){
_87f._webSocket.readyState=WebSocket.CLOSED;
}
_87f._webSocketChannelListener.handleClose(_87f._webSocket,_880,code,_882);
}
};
_87a.doBufferedAmountChange=function(_883,n){
_883._webSocketChannelListener.handleBufferdAmountChange(_883._webSocket,n);
};
_87a.processConnect=function(_885,_886,_887){
_LOG.finest(_83d,"connect",_885);
var _888=_885;
_LOG.finest("Current ready state = "+_888.readyState);
if(_888.readyState===WebSocket.OPEN){
_LOG.fine("Attempt to reconnect an existing open WebSocket to a different location");
throw new Error("Attempt to reconnect an existing open WebSocket to a different location");
}
var _889=_888._compositeScheme;
if(_889!="ws"&&_889!="wss"){
var _88a=_847[_889];
if(_88a==null){
throw new Error("Invalid connection scheme: "+_889);
}
_LOG.finest("Turning off fallback since the URL is prefixed with java:");
_888._connectionStrategies.push(_889);
}else{
var _88b=_848[_889];
if(_88b!=null){
for(var i=0;i<_88b.length;i++){
_888._connectionStrategies.push(_88b[i]);
}
}else{
throw new Error("Invalid connection scheme: "+_889);
}
}
this.fallbackNext(_888);
};
_87a.processTextMessage=function(_88d,_88e){
_LOG.finest(_83d,"send",_88e);
var _88f=_88d;
if(_88f.readyState!=WebSocket.OPEN){
_LOG.fine("Attempt to post message on unopened or closed web socket");
throw new Error("Attempt to post message on unopened or closed web socket");
}
var _890=_88f._selectedChannel;
_890._handler.processTextMessage(_890,_88e);
};
_87a.processBinaryMessage=function(_891,_892){
_LOG.finest(_83d,"send",_892);
var _893=_891;
if(_893.readyState!=WebSocket.OPEN){
_LOG.fine("Attempt to post message on unopened or closed web socket");
throw new Error("Attempt to post message on unopened or closed web socket");
}
var _894=_893._selectedChannel;
_894._handler.processBinaryMessage(_894,_892);
};
_87a.processClose=function(_895,code,_897){
_LOG.finest(_83d,"close");
var _898=_895;
if(_895.readyState===WebSocket.CONNECTING||_895.readyState===WebSocket.OPEN){
_895.readyState=WebSocket.CLOSING;
if(_84b){
_895._webSocket.readyState=WebSocket.CLOSING;
}
}
var _899=_898._selectedChannel;
_899._handler.processClose(_899,code,_897);
};
_87a.setListener=function(_89a){
this._listener=_89a;
};
_87a.handleConnectionOpened=function(_89b,_89c){
var _89d=_89b.parent;
this.doOpen(_89d,_89c);
};
_87a.handleMessageReceived=function(_89e,obj){
var _8a0=_89e.parent;
switch(_8a0.readyState){
case WebSocket.OPEN:
if(_8a0._webSocket.binaryType==="blob"&&obj.constructor==ByteBuffer){
obj=obj.getBlob(obj.remaining());
}else{
if(_8a0._webSocket.binaryType==="arraybuffer"&&obj.constructor==ByteBuffer){
obj=obj.getArrayBuffer(obj.remaining());
}else{
if(_8a0._webSocket.binaryType==="blob"&&obj.byteLength){
obj=new Blob([new Uint8Array(obj)]);
}else{
if(_8a0._webSocket.binaryType==="bytebuffer"&&obj.byteLength){
var u=new Uint8Array(obj);
var _8a2=[];
for(var i=0;i<u.byteLength;i++){
_8a2.push(u[i]);
}
obj=new ByteBuffer(_8a2);
}else{
if(_8a0._webSocket.binaryType==="bytebuffer"&&obj.size){
var cb=function(_8a5){
var b=new ByteBuffer();
b.putBytes(_8a5);
b.flip();
_8a0._webSocketChannelListener.handleMessage(_8a0._webSocket,b);
};
BlobUtils.asNumberArray(cb,data);
return;
}
}
}
}
}
_8a0._webSocketChannelListener.handleMessage(_8a0._webSocket,obj);
break;
case WebSocket.CONNECTING:
case WebSocket.CLOSING:
case WebSocket.CLOSED:
break;
default:
throw new Error("Socket has invalid readyState: "+$this.readyState);
}
};
_87a.handleConnectionClosed=function(_8a7,_8a8,code,_8aa){
var _8ab=_8a7.parent;
if(_8ab.readyState===WebSocket.CONNECTING&&!_8a7.authenticationReceived&&!_8a7.preventFallback){
this.fallbackNext(_8ab);
}else{
this.doClose(_8ab,_8a8,code,_8aa);
}
};
_87a.handleConnectionFailed=function(_8ac){
var _8ad=_8ac.parent;
var _8ae=1006;
var _8af="";
if(_8ac.closeReason.length>0){
_8ae=_8ac.closeCode;
_8af=_8ac.closeReason;
}
if(_8ad.readyState===WebSocket.CONNECTING&&!_8ac.authenticationReceived&&!_8ac.preventFallback){
this.fallbackNext(_8ad);
}else{
this.doClose(_8ad,false,_8ae,_8af);
}
};
_87a.handleConnectionError=function(_8b0,e){
_8b0.parent._lastErrorEvent=e;
};
return _84d;
})();
(function(){
var _8b2="HttpRedirectPolicy";
var LOG=_277.getLogger(_8b2);
window.HttpRedirectPolicy=function(name){
if(arguments.length<1){
var s="HttpRedirectPolicy: Please specify the policy name.";
throw Error(s);
}
if(typeof (name)=="undefined"){
var s="HttpRedirectPolicy: Please specify required 'name' parameter.";
throw Error(s);
}else{
if(typeof (name)!="string"){
var s="HttpRedirectPolicy: Required parameter 'name' is a string.";
throw Error(s);
}
}
this.name=name;
};
var _8b6=HttpRedirectPolicy.prototype;
_8b6.toString=function(){
return "HttpRedirectPolicy."+this.name;
};
_8b6.isRedirectionAllowed=function(_8b7,_8b8){
if(arguments.length<2){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify both the 'originalLoc' and the 'redirectLoc' parameters.";
throw Error(s);
}
if(typeof (_8b7)=="undefined"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify required 'originalLoc' parameter.";
throw Error(s);
}else{
if(typeof (_8b7)!="string"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Required parameter 'originalLoc' is a string.";
throw Error(s);
}
}
if(typeof (_8b8)=="undefined"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify required 'redirectLoc' parameter.";
throw Error(s);
}else{
if(typeof (_8b8)!="string"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Required parameter 'redirectLoc' is a string.";
throw Error(s);
}
}
var _8ba=false;
var _8bb=new URI(_8b7.toLowerCase().replace("http","ws"));
var _8bc=new URI(_8b8.toLowerCase().replace("http","ws"));
switch(this.name){
case "ALWAYS":
_8ba=true;
break;
case "NEVER":
_8ba=false;
break;
case "PEER_DOMAIN":
_8ba=isPeerDomain(_8bb,_8bc);
break;
case "SAME_DOMAIN":
_8ba=isSameDomain(_8bb,_8bc);
break;
case "SAME_ORIGIN":
_8ba=isSameOrigin(_8bb,_8bc);
break;
case "SUB_DOMAIN":
_8ba=isSubDomain(_8bb,_8bc);
break;
default:
var s="HttpRedirectPolicy.isRedirectionAllowed(): Invalid policy: "+this.name;
throw new Error(s);
}
return _8ba;
};
function isPeerDomain(_8bd,_8be){
if(isSameDomain(_8bd,_8be)){
return true;
}
var _8bf=_8bd.scheme.toLowerCase();
var _8c0=_8be.scheme.toLowerCase();
if(_8c0.indexOf(_8bf)==-1){
return false;
}
var _8c1=_8bd.host;
var _8c2=_8be.host;
var _8c3=getBaseDomain(_8c1);
var _8c4=getBaseDomain(_8c2);
if(_8c2.indexOf(_8c3,(_8c2.length-_8c3.length))==-1){
return false;
}
if(_8c1.indexOf(_8c4,(_8c1.length-_8c4.length))==-1){
return false;
}
return true;
};
function isSameDomain(_8c5,_8c6){
if(isSameOrigin(_8c5,_8c6)){
return true;
}
var _8c7=_8c5.scheme.toLowerCase();
var _8c8=_8c6.scheme.toLowerCase();
if(_8c8.indexOf(_8c7)==-1){
return false;
}
var _8c9=_8c5.host.toLowerCase();
var _8ca=_8c6.host.toLowerCase();
if(_8c9==_8ca){
return true;
}
return false;
};
function isSameOrigin(_8cb,_8cc){
var _8cd=_8cb.scheme.toLowerCase();
var _8ce=_8cc.scheme.toLowerCase();
var _8cf=_8cb.authority.toLowerCase();
var _8d0=_8cc.authority.toLowerCase();
if((_8cd==_8ce)&&(_8cf==_8d0)){
return true;
}
return false;
};
function isSubDomain(_8d1,_8d2){
if(isSameDomain(_8d1,_8d2)){
return true;
}
var _8d3=_8d1.scheme.toLowerCase();
var _8d4=_8d2.scheme.toLowerCase();
if(_8d4.indexOf(_8d3)==-1){
return false;
}
var _8d5=_8d1.host.toLowerCase();
var _8d6=_8d2.host.toLowerCase();
if(_8d6.length<_8d5.length){
return false;
}
var s="."+_8d5;
if(_8d6.indexOf(s,(_8d6.length-s.length))==-1){
return false;
}
return true;
};
function getBaseDomain(host){
var _8d9=host.split(".");
var len=_8d9.length;
if(len<=2){
return host;
}
var _8db="";
for(var i=1;i<len;i++){
_8db+="."+_8d9[i];
}
return _8db;
};
HttpRedirectPolicy.ALWAYS=new HttpRedirectPolicy("ALWAYS");
HttpRedirectPolicy.NEVER=new HttpRedirectPolicy("NEVER");
HttpRedirectPolicy.PEER_DOMAIN=new HttpRedirectPolicy("PEER_DOMAIN");
HttpRedirectPolicy.SAME_DOMAIN=new HttpRedirectPolicy("SAME_DOMAIN");
HttpRedirectPolicy.SAME_ORIGIN=new HttpRedirectPolicy("SAME_ORIGIN");
HttpRedirectPolicy.SUB_DOMAIN=new HttpRedirectPolicy("SUB_DOMAIN");
return HttpRedirectPolicy;
})();
(function(){
var _8dd=new _83c();
window.WebSocketEx=(function(){
var _8de="WebSocket";
var LOG=_277.getLogger(_8de);
var _8e0={};
var _8e1=function(url,_8e3,_8e4,_8e5,_8e6,_8e7){
LOG.entering(this,"WebSocket.<init>",{"url":url,"protocol":_8e3});
this.url=url;
this.protocol=_8e3;
this.extensions=_8e4||[];
this.connectTimeout=0;
this._challengeHandler=_8e5;
this._redirectPolicy=HttpRedirectPolicy.ALWAYS;
if(typeof (_8e6)!="undefined"){
_8e8(_8e6);
this.connectTimeout=_8e6;
}
if(typeof (_8e7)!="undefined"){
_8e9(_8e7);
this._redirectPolicy=_8e7;
}
this._queue=[];
this._origin="";
this._eventListeners={};
setProperties(this);
_8ea(this,this.url,this.protocol,this.extensions,this._challengeHandler,this.connectTimeout);
};
var _8eb=function(s){
if(s.length==0){
return false;
}
var _8ed="()<>@,;:\\<>/[]?={}\t \n";
for(var i=0;i<s.length;i++){
var c=s.substr(i,1);
if(_8ed.indexOf(c)!=-1){
return false;
}
var code=s.charCodeAt(i);
if(code<33||code>126){
return false;
}
}
return true;
};
var _8f1=function(_8f2){
if(typeof (_8f2)==="undefined"){
return true;
}else{
if(typeof (_8f2)==="string"){
return _8eb(_8f2);
}else{
for(var i=0;i<_8f2.length;i++){
if(!_8eb(_8f2[i])){
return false;
}
}
return true;
}
}
};
var _8ea=function(_8f4,_8f5,_8f6,_8f7,_8f8,_8f9){
if(!_8f1(_8f6)){
throw new Error("SyntaxError: invalid protocol: "+_8f6);
}
var uri=new _51a(_8f5);
if(!uri.isSecure()&&document.location.protocol==="https:"){
throw new Error("SecurityException: non-secure connection attempted from secure origin");
}
var _8fb=[];
if(typeof (_8f6)!="undefined"){
if(typeof _8f6=="string"&&_8f6.length){
_8fb=[_8f6];
}else{
if(_8f6.length){
_8fb=_8f6;
}
}
}
_8f4._channel=new _577(uri,_8fb);
_8f4._channel._webSocket=_8f4;
_8f4._channel._webSocketChannelListener=_8e0;
_8f4._channel._extensions=_8f7;
if(typeof (_8f8)!="undefined"){
_8f4._channel.challengeHandler=_8f8;
}
if((typeof (_8f9)!="undefined")&&(_8f9>0)){
var _8fc=_8f4._channel;
var _8fd=new _526(function(){
if(_8fc.readyState==_8e1.CONNECTING){
_8dd.doClose(_8fc,false,1006,"Connection timeout");
_8dd.processClose(_8fc,0,"Connection timeout");
_8fc.connectTimer=null;
}
},_8f9,false);
_8f4._channel.connectTimer=_8fd;
_8fd.start();
}
_8dd.processConnect(_8f4._channel,uri.getWSEquivalent());
};
function setProperties(_8fe){
_8fe.onmessage=null;
_8fe.onopen=null;
_8fe.onclose=null;
_8fe.onerror=null;
if(Object.defineProperty){
try{
Object.defineProperty(_8fe,"readyState",{get:function(){
if(_8fe._channel){
return _8fe._channel.readyState;
}else{
return _8e1.CLOSED;
}
},set:function(){
throw new Error("Cannot set read only property readyState");
}});
var _8ff="blob";
Object.defineProperty(_8fe,"binaryType",{enumerable:true,configurable:true,get:function(){
return _8ff;
},set:function(val){
if(val==="blob"||val==="arraybuffer"||val==="bytebuffer"){
_8ff=val;
}else{
throw new SyntaxError("Invalid binaryType. Valid values are 'blob', 'arraybuffer' and 'bytebuffer'");
}
}});
Object.defineProperty(_8fe,"bufferedAmount",{get:function(){
return _8fe._channel.getBufferedAmount();
},set:function(){
throw new Error("Cannot set read only property bufferedAmount");
}});
}
catch(ex){
_8fe.readyState=_8e1.CONNECTING;
_8fe.binaryType="blob";
_8fe.bufferedAmount=0;
}
}else{
_8fe.readyState=_8e1.CONNECTING;
_8fe.binaryType="blob";
_8fe.bufferedAmount=0;
}
};
var _901=_8e1.prototype;
_901.send=function(data){
switch(this.readyState){
case 0:
LOG.error("WebSocket.send: Error: Attempt to send message on unopened or closed WebSocket");
throw new Error("Attempt to send message on unopened or closed WebSocket");
case 1:
if(typeof (data)==="string"){
_8dd.processTextMessage(this._channel,data);
}else{
_8dd.processBinaryMessage(this._channel,data);
}
break;
case 2:
case 3:
break;
default:
LOG.error("WebSocket.send: Illegal state error");
throw new Error("Illegal state error");
}
};
_901.close=function(code,_904){
if(typeof code!="undefined"){
if(code!=1000&&(code<3000||code>4999)){
var _905=new Error("code must equal to 1000 or in range 3000 to 4999");
_905.name="InvalidAccessError";
throw _905;
}
}
if(typeof _904!="undefined"&&_904.length>0){
var buf=new ByteBuffer();
buf.putString(_904,Charset.UTF8);
buf.flip();
if(buf.remaining()>123){
throw new SyntaxError("SyntaxError: reason is longer than 123 bytes");
}
}
switch(this.readyState){
case 0:
case 1:
_8dd.processClose(this._channel,code,_904);
break;
case 2:
case 3:
break;
default:
LOG.error("WebSocket.close: Illegal state error");
throw new Error("Illegal state error");
}
};
_901.getChallengeHandler=function(){
return this._challengeHandler||null;
};
_901.setChallengeHandler=function(_907){
if(typeof (_907)=="undefined"){
var s="WebSocket.setChallengeHandler(): Parameter 'challengeHandler' is required";
throw new Error(s);
}
this._challengeHandler=_907;
this._channel.challengeHandler=_907;
};
_901.getRedirectPolicy=function(){
return this._redirectPolicy;
};
_901.setRedirectPolicy=function(_909){
_8e9(_909);
this._redirectPolicy=_909;
};
var _8e8=function(_90a){
if(typeof (_90a)=="undefined"){
var s="WebSocket.setConnectTimeout(): int parameter 'connectTimeout' is required";
throw new Error(s);
}
if(typeof (_90a)!="number"){
var s="WebSocket.setConnectTimeout(): connectTimeout should be an integer";
throw new Error(s);
}
if(_90a<0){
var s="WebSocket.setConnectTimeout(): Connect timeout cannot be negative";
throw new Error(s);
}
return;
};
var _8e9=function(_90c){
if(typeof (_90c)=="undefined"){
var s="WebSocket.validateHttpRedirectPolicy(): Parameter 'redirectPolicy' is required";
throw new Error(s);
}
if(!(_90c instanceof HttpRedirectPolicy)){
var s="WebSocket.validateHttpRedirectPolicy(): Parameter 'redirectPolicy' must be of type HttpRedirectPolicy";
throw new Error(s);
}
};
var _90e=function(_90f,data){
var _911=new MessageEvent(_90f,data,_90f._origin);
_90f.dispatchEvent(_911);
};
var _912=function(_913){
var _914=new Date().getTime();
var _915=_914+50;
while(_913._queue.length>0){
if(new Date().getTime()>_915){
setTimeout(function(){
_912(_913);
},0);
return;
}
var buf=_913._queue.shift();
var ok=false;
try{
if(_913.readyState==_8e1.OPEN){
_90e(_913,buf);
ok=true;
}else{
_913._queue=[];
return;
}
}
finally{
if(!ok){
if(_913._queue.length==0){
_913._delivering=false;
}else{
setTimeout(function(){
_912(_913);
},0);
}
}
}
}
_913._delivering=false;
};
var _918=function(_919,_91a,code,_91c){
LOG.entering(_919,"WebSocket.doClose");
delete _919._channel;
setTimeout(function(){
var _91d=new CloseEvent(_919,_91a,code,_91c);
_919.dispatchEvent(_91d);
},0);
};
_8e0.handleOpen=function(_91e,_91f){
_91e.protocol=_91f;
var _920={type:"open",bubbles:true,cancelable:true,target:_91e};
_91e.dispatchEvent(_920);
};
_8e0.handleMessage=function(_921,obj){
if(!Object.defineProperty&&!(typeof (obj)==="string")){
var _923=_921.binaryType;
if(!(_923==="blob"||_923==="arraybuffer"||_923==="bytebuffer")){
var _924={type:"error",bubbles:true,cancelable:true,target:_921,message:"Invalid binaryType. Valid values are 'blob', 'arraybuffer' and 'bytebuffer'"};
_921.dispatchEvent(_924);
return;
}
}
_921._queue.push(obj);
if(!_921._delivering){
_921._delivering=true;
_912(_921);
}
};
_8e0.handleClose=function(_925,_926,code,_928){
_918(_925,_926,code,_928);
};
_8e0.handleError=function(_929,_92a){
LOG.entering(_929,"WebSocket.handleError"+_92a);
setTimeout(function(){
_929.dispatchEvent(_92a);
},0);
};
_8e0.handleBufferdAmountChange=function(_92b,n){
_92b.bufferedAmount=n;
};
_901.addEventListener=function(type,_92e,_92f){
this._eventListeners[type]=this._eventListeners[type]||[];
this._eventListeners[type].push(_92e);
};
_901.removeEventListener=function(type,_931,_932){
var _933=this._eventListeners[type];
if(_933){
for(var i=0;i<_933.length;i++){
if(_933[i]==_931){
_933.splice(i,1);
return;
}
}
}
};
_901.dispatchEvent=function(e){
var type=e.type;
if(!type){
throw new Error("Cannot dispatch invalid event "+e);
}
try{
var _937=this["on"+type];
if(typeof _937==="function"){
_937(e);
}
}
catch(e){
LOG.severe(this,type+" event handler: Error thrown from application");
}
var _938=this._eventListeners[type];
if(_938){
for(var i=0;i<_938.length;i++){
try{
_938[i](e);
}
catch(e2){
LOG.severe(this,type+" event handler: Error thrown from application");
}
}
}
};
_8e1.CONNECTING=_901.CONNECTING=0;
_8e1.OPEN=_901.OPEN=1;
_8e1.CLOSING=_901.CLOSING=2;
_8e1.CLOSED=_901.CLOSED=3;
return _8e1;
})();
window.WebSocket.__impls__={};
window.WebSocket.__impls__["flash:wse"]=_314;
}());
(function(){
window.WebSocketExtension=(function(){
var _93a="WebSocketExtension";
var LOG=_277.getLogger(_93a);
var _93c=function(name){
this.name=name;
this.parameters={};
this.enabled=false;
this.negotiated=false;
};
var _93e=_93c.prototype;
_93e.getParameter=function(_93f){
return this.parameters[_93f];
};
_93e.setParameter=function(_940,_941){
this.parameters[_940]=_941;
};
_93e.getParameters=function(){
var arr=[];
for(var name in this.parameters){
if(this.parameters.hasOwnProperty(name)){
arr.push(name);
}
}
return arr;
};
_93e.parse=function(str){
var arr=str.split(";");
if(arr[0]!=this.name){
throw new Error("Error: name not match");
}
this.parameters={};
for(var i=1;i<arr.length;i++){
var _947=arr[i].indexOf("=");
this.parameters[arr[i].subString(0,_947)]=arr[i].substring(_947+1);
}
};
_93e.toString=function(){
var arr=[this.name];
for(var p in this.parameters){
if(this.parameters.hasOwnProperty(p)){
arr.push(p.name+"="+this.parameters[p]);
}
}
return arr.join(";");
};
return _93c;
})();
})();
(function(){
window.WebSocketRevalidateExtension=(function(){
var _94a=function(){
};
var _94b=_94a.prototype=new WebSocketExtension(_562.KAAZING_SEC_EXTENSION_REVALIDATE);
return _94a;
})();
})();
(function(){
window.WebSocketFactory=(function(){
var _94c="WebSocketFactory";
var LOG=_277.getLogger(_94c);
var _94e=function(){
this.extensions={};
var _94f=new WebSocketRevalidateExtension();
this.extensions[_94f.name]=_94f;
this.redirectPolicy=HttpRedirectPolicy.ALWAYS;
};
var _950=_94e.prototype;
_950.getExtension=function(name){
return this.extensions[name];
};
_950.setExtension=function(_952){
this.extensions[_952.name]=_952;
};
_950.setChallengeHandler=function(_953){
if(typeof (_953)=="undefined"){
var s="WebSocketFactory.setChallengeHandler(): Parameter 'challengeHandler' is required";
throw new Error(s);
}
this.challengeHandler=_953;
var _955=this.extensions[_562.KAAZING_SEC_EXTENSION_REVALIDATE];
_955.enabled=(_953!=null);
};
_950.getChallengeHandler=function(){
return this.challengeHandler||null;
};
_950.createWebSocket=function(url,_957){
var ext=[];
for(var key in this.extensions){
if(this.extensions.hasOwnProperty(key)&&this.extensions[key].enabled){
ext.push(this.extensions[key].toString());
}
}
var _95a=this.getChallengeHandler();
var _95b=this.getDefaultConnectTimeout();
var _95c=this.getDefaultRedirectPolicy();
var ws=new WebSocketEx(url,_957,ext,_95a,_95b,_95c);
return ws;
};
_950.setDefaultConnectTimeout=function(_95e){
if(typeof (_95e)=="undefined"){
var s="WebSocketFactory.setDefaultConnectTimeout(): int parameter 'connectTimeout' is required";
throw new Error(s);
}
if(typeof (_95e)!="number"){
var s="WebSocketFactory.setDefaultConnectTimeout(): connectTimeout should be an integer";
throw new Error(s);
}
if(_95e<0){
var s="WebSocketFactory.setDefaultConnectTimeout(): Connect timeout cannot be negative";
throw new Error(s);
}
this.connectTimeout=_95e;
};
_950.getDefaultConnectTimeout=function(){
return this.connectTimeout||0;
};
_950.setDefaultRedirectPolicy=function(_960){
if(typeof (_960)=="undefined"){
var s="WebSocketFactory.setDefaultRedirectPolicy(): int parameter 'redirectPolicy' is required";
throw new Error(s);
}
if(!(_960 instanceof HttpRedirectPolicy)){
var s="WebSocketFactory.setDefaultRedirectPolicy(): redirectPolicy should be an instance of HttpRedirectPolicy";
throw new Error(s);
}
this.redirectPolicy=_960;
};
_950.getDefaultRedirectPolicy=function(){
return this.redirectPolicy;
};
return _94e;
})();
})();
window.___Loader=new _3ad(_276);
})();
})();
