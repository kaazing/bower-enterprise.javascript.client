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
var _2a2=function(key){
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name===key){
var v=tags[i].content;
return v;
}
}
};
var _2a7=function(_2a8){
var _2a9=[];
for(var i=0;i<_2a8.length;i++){
_2a9.push(_2a8[i]);
}
return _2a9;
};
var _2ab=function(_2ac,_2ad){
var _2ae=[];
for(var i=0;i<_2ac.length;i++){
var elt=_2ac[i];
if(_2ad(elt)){
_2ae.push(_2ac[i]);
}
}
return _2ae;
};
var _2b1=function(_2b2,_2b3){
for(var i=0;i<_2b2.length;i++){
if(_2b2[i]==_2b3){
return i;
}
}
return -1;
};
var _2b5=function(s){
var a=[];
for(var i=0;i<s.length;i++){
a.push(s.charCodeAt(i)&255);
}
var buf=new ByteBuffer(a);
var v=_2bb(buf,Charset.UTF8);
return v;
};
var _2bc=function(_2bd){
var buf=new Uint8Array(_2bd);
var a=[];
for(var i=0;i<buf.length;i++){
a.push(buf[i]);
}
var buf=new ByteBuffer(a);
var s=_2bb(buf,Charset.UTF8);
return s;
};
var _2c2=function(_2c3){
var buf=new Uint8Array(_2c3);
var a=[];
for(var i=0;i<buf.length;i++){
a.push(buf[i]);
}
return new ByteBuffer(a);
};
var _2c7=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _2c9="\n";
var _2ca=function(buf){
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(n);
switch(chr){
case _2c7:
a.push(_2c7);
a.push(_2c7);
break;
case NULL:
a.push(_2c7);
a.push("0");
break;
case _2c9:
a.push(_2c7);
a.push("n");
break;
default:
a.push(chr);
}
}
var v=a.join("");
return v;
};
var _2d0=function(buf,_2d2){
if(_2d2){
return _2ca(buf);
}else{
var _2d3=buf.array;
var _2d4=(buf.position==0&&buf.limit==_2d3.length)?_2d3:buf.getBytes(buf.remaining());
var _2d5=!(XMLHttpRequest.prototype.sendAsBinary);
for(var i=_2d4.length-1;i>=0;i--){
var _2d7=_2d4[i];
if(_2d7==0&&_2d5){
_2d4[i]=256;
}else{
if(_2d7<0){
_2d4[i]=_2d7&255;
}
}
}
var _2d8=0;
var _2d9=[];
do{
var _2da=Math.min(_2d4.length-_2d8,10000);
partOfBytes=_2d4.slice(_2d8,_2d8+_2da);
_2d8+=_2da;
_2d9.push(String.fromCharCode.apply(null,partOfBytes));
}while(_2d8<_2d4.length);
var _2db=_2d9.join("");
if(_2d4===_2d3){
for(var i=_2d4.length-1;i>=0;i--){
var _2d7=_2d4[i];
if(_2d7==256){
_2d4[i]=0;
}
}
}
return _2db;
}
};
var _2bb=function(buf,cs){
var _2de=buf.position;
var _2df=buf.limit;
var _2e0=buf.array;
while(_2de<_2df){
_2de++;
}
try{
buf.limit=_2de;
return cs.decode(buf);
}
finally{
if(_2de!=_2df){
buf.limit=_2df;
buf.position=_2de+1;
}
}
};
var _2e1=window.WebSocket;
var _2e2=(function(){
var _2e3=function(){
this.parent;
this._listener;
this.code=1005;
this.reason="";
};
var _2e4=(browser=="safari"&&typeof (_2e1.CLOSING)=="undefined");
var _2e5=(browser=="android");
var _2e6=_2e3.prototype;
_2e6.connect=function(_2e7,_2e8){
if((typeof (_2e1)==="undefined")||_2e5){
doError(this);
return;
}
if(_2e7.indexOf("javascript:")==0){
_2e7=_2e7.substr("javascript:".length);
}
var _2e9=_2e7.indexOf("?");
if(_2e9!=-1){
if(!/[\?&]\.kl=Y/.test(_2e7.substring(_2e9))){
_2e7+="&.kl=Y";
}
}else{
_2e7+="?.kl=Y";
}
this._sendQueue=[];
try{
if(_2e8){
this._requestedProtocol=_2e8;
this._delegate=new _2e1(_2e7,_2e8);
}else{
this._delegate=new _2e1(_2e7);
}
this._delegate.binaryType="arraybuffer";
}
catch(e){
doError(this);
return;
}
bindHandlers(this);
};
_2e6.onerror=function(){
};
_2e6.onmessage=function(){
};
_2e6.onopen=function(){
};
_2e6.onclose=function(){
};
_2e6.close=function(code,_2eb){
if(code){
if(_2e4){
doCloseDraft76Compat(this,code,_2eb);
}else{
this._delegate.close(code,_2eb);
}
}else{
this._delegate.close();
}
};
function doCloseDraft76Compat(_2ec,code,_2ee){
_2ec.code=code|1005;
_2ec.reason=_2ee|"";
_2ec._delegate.close();
};
_2e6.send=function(_2ef){
doSend(this,_2ef);
return;
};
_2e6.setListener=function(_2f0){
this._listener=_2f0;
};
_2e6.setIdleTimeout=function(_2f1){
this.lastMessageTimestamp=new Date().getTime();
this.idleTimeout=_2f1;
startIdleTimer(this,_2f1);
return;
};
function doSend(_2f2,_2f3){
if(typeof (_2f3)=="string"){
_2f2._delegate.send(_2f3);
}else{
if(_2f3.byteLength||_2f3.size){
_2f2._delegate.send(_2f3);
}else{
if(_2f3.constructor==ByteBuffer){
_2f2._delegate.send(_2f3.getArrayBuffer(_2f3.remaining()));
}else{
throw new Error("Cannot call send() with that type");
}
}
}
};
function doError(_2f4,e){
setTimeout(function(){
_2f4._listener.connectionFailed(_2f4.parent);
},0);
};
function encodeMessageData(_2f6,e){
var buf;
if(typeof e.data.byteLength!=="undefined"){
buf=_2c2(e.data);
}else{
buf=ByteBuffer.allocate(e.data.length);
if(_2f6.parent._isBinary&&_2f6.parent._balanced>1){
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
function messageHandler(_2fa,e){
_2fa.lastMessageTimestamp=new Date().getTime();
if(typeof (e.data)==="string"){
_2fa._listener.textMessageReceived(_2fa.parent,e.data);
}else{
_2fa._listener.binaryMessageReceived(_2fa.parent,e.data);
}
};
function closeHandler(_2fc,e){
unbindHandlers(_2fc);
if(_2e4){
_2fc._listener.connectionClosed(_2fc.parent,true,_2fc.code,_2fc.reason);
}else{
_2fc._listener.connectionClosed(_2fc.parent,e.wasClean,e.code,e.reason);
}
};
function errorHandler(_2fe,e){
_2fe._listener.connectionError(_2fe.parent,e);
};
function openHandler(_300,e){
if(_2e4){
_300._delegate.protocol=_300._requestedProtocol;
}
_300._listener.connectionOpened(_300.parent,_300._delegate.protocol);
};
function bindHandlers(_302){
var _303=_302._delegate;
_303.onopen=function(e){
openHandler(_302,e);
};
_303.onmessage=function(e){
messageHandler(_302,e);
};
_303.onclose=function(e){
closeHandler(_302,e);
};
_303.onerror=function(e){
errorHandler(_302,e);
};
_302.readyState=function(){
return _303.readyState;
};
};
function unbindHandlers(_308){
var _309=_308._delegate;
_309.onmessage=undefined;
_309.onclose=undefined;
_309.onopen=undefined;
_309.onerror=undefined;
_308.readyState=WebSocket.CLOSED;
};
function startIdleTimer(_30a,_30b){
stopIdleTimer(_30a);
_30a.idleTimer=setTimeout(function(){
idleTimerHandler(_30a);
},_30b);
};
function idleTimerHandler(_30c){
var _30d=new Date().getTime();
var _30e=_30d-_30c.lastMessageTimestamp;
var _30f=_30c.idleTimeout;
if(_30e>_30f){
try{
var _310=_30c._delegate;
if(_310){
unbindHandlers(_30c);
_310.close();
}
}
finally{
_30c._listener.connectionClosed(_30c.parent,false,1006,"");
}
}else{
startIdleTimer(_30c,_30f-_30e);
}
};
function stopIdleTimer(_311){
if(_311.idleTimer!=null){
clearTimeout(_311.idleTimer);
_311.IdleTimer=null;
}
};
return _2e3;
})();
var _312=(function(){
var _313=function(){
this.parent;
this._listener;
};
var _314=_313.prototype;
_314.connect=function(_315,_316){
this.URL=_315;
try{
_317(this,_315,_316);
}
catch(e){
doError(this,e);
}
this.constructor=_313;
};
_314.setListener=function(_318){
this._listener=_318;
};
_313._flashBridge={};
_313._flashBridge.readyWaitQueue=[];
_313._flashBridge.failWaitQueue=[];
_313._flashBridge.flashHasLoaded=false;
_313._flashBridge.flashHasFailed=false;
_314.URL="";
_314.readyState=0;
_314.bufferedAmount=0;
_314.connectionOpened=function(_319,_31a){
var _31a=_31a.split("\n");
for(var i=0;i<_31a.length;i++){
var _31c=_31a[i].split(":");
_319.responseHeaders[_31c[0]]=_31c[1];
}
this._listener.connectionOpened(_319,"");
};
_314.connectionClosed=function(_31d,_31e,code,_320){
this._listener.connectionClosed(_31d,_31e,code,_320);
};
_314.connectionFailed=function(_321){
this._listener.connectionFailed(_321);
};
_314.binaryMessageReceived=function(_322,data){
this._listener.binaryMessageReceived(_322,data);
};
_314.textMessageReceived=function(_324,s){
this._listener.textMessageReceived(_324,s);
};
_314.redirected=function(_326,_327){
this._listener.redirected(_326,_327);
};
_314.authenticationRequested=function(_328,_329,_32a){
this._listener.authenticationRequested(_328,_329,_32a);
};
_314.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
throw new Error("data is null");
}
if(typeof (data)=="string"){
_313._flashBridge.sendText(this._instanceId,data);
}else{
if(data.constructor==ByteBuffer){
var _32c;
var a=[];
while(data.remaining()){
a.push(String.fromCharCode(data.get()));
}
var _32c=a.join("");
_313._flashBridge.sendByteString(this._instanceId,_32c);
}else{
if(data.byteLength){
var _32c;
var a=[];
var _32e=new DataView(data);
for(var i=0;i<data.byteLength;i++){
a.push(String.fromCharCode(_32e.getUint8(i)));
}
var _32c=a.join("");
_313._flashBridge.sendByteString(this._instanceId,_32c);
}else{
if(data.size){
var _330=this;
var cb=function(_332){
_313._flashBridge.sendByteString(_330._instanceId,_332);
};
BlobUtils.asBinaryString(cb,data);
return;
}else{
throw new Error("Invalid type");
}
}
}
}
_333(this);
return true;
break;
case 2:
return false;
break;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_314.close=function(code,_335){
switch(this.readyState){
case 0:
case 1:
_313._flashBridge.disconnect(this._instanceId,code,_335);
break;
}
};
_314.disconnect=_314.close;
var _333=function(_336){
_336.bufferedAmount=_313._flashBridge.getBufferedAmount(_336._instanceId);
if(_336.bufferedAmount!=0){
setTimeout(function(){
_333(_336);
},1000);
}
};
var _317=function(_337,_338,_339){
var _33a=function(key,_33c){
_33c[key]=_337;
_337._instanceId=key;
};
var _33d=function(){
doError(_337);
};
var _33e=[];
if(_337.parent.requestHeaders&&_337.parent.requestHeaders.length>0){
for(var i=0;i<_337.parent.requestHeaders.length;i++){
_33e.push(_337.parent.requestHeaders[i].label+":"+_337.parent.requestHeaders[i].value);
}
}
_313._flashBridge.registerWebSocketEmulated(_338,_33e.join("\n"),_33a,_33d);
};
function doError(_340,e){
setTimeout(function(){
_340._listener.connectionFailed(_340.parent);
},0);
};
return _313;
})();
var _342=(function(){
var _343=function(){
this.parent;
this._listener;
};
var _344=_343.prototype;
_344.connect=function(_345,_346){
this.URL=_345;
try{
_347(this,_345,_346);
}
catch(e){
doError(this,e);
}
this.constructor=_343;
};
_344.setListener=function(_348){
this._listener=_348;
};
_312._flashBridge={};
_312._flashBridge.readyWaitQueue=[];
_312._flashBridge.failWaitQueue=[];
_312._flashBridge.flashHasLoaded=false;
_312._flashBridge.flashHasFailed=false;
_344.URL="";
_344.readyState=0;
_344.bufferedAmount=0;
_344.connectionOpened=function(_349,_34a){
var _34a=_34a.split("\n");
for(var i=0;i<_34a.length;i++){
var _34c=_34a[i].split(":");
_349.responseHeaders[_34c[0]]=_34c[1];
}
this._listener.connectionOpened(_349,"");
};
_344.connectionClosed=function(_34d,_34e,code,_350){
this._listener.connectionClosed(_34d,_34e,code,_350);
};
_344.connectionFailed=function(_351){
this._listener.connectionFailed(_351);
};
_344.binaryMessageReceived=function(_352,data){
this._listener.binaryMessageReceived(_352,data);
};
_344.textMessageReceived=function(_354,s){
this._listener.textMessageReceived(_354,s);
};
_344.redirected=function(_356,_357){
this._listener.redirected(_356,_357);
};
_344.authenticationRequested=function(_358,_359,_35a){
this._listener.authenticationRequested(_358,_359,_35a);
};
_344.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
throw new Error("data is null");
}
if(typeof (data)=="string"){
_312._flashBridge.sendText(this._instanceId,data);
}else{
if(typeof (data.array)=="object"){
var _35c;
var a=[];
var b;
while(data.remaining()){
b=data.get();
a.push(String.fromCharCode(b));
}
var _35c=a.join("");
_312._flashBridge.sendByteString(this._instanceId,_35c);
return;
}else{
throw new Error("Invalid type");
}
}
_35f(this);
return true;
break;
case 2:
return false;
break;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_344.close=function(code,_361){
switch(this.readyState){
case 1:
case 2:
_312._flashBridge.disconnect(this._instanceId,code,_361);
break;
}
};
_344.disconnect=_344.close;
var _35f=function(_362){
_362.bufferedAmount=_312._flashBridge.getBufferedAmount(_362._instanceId);
if(_362.bufferedAmount!=0){
setTimeout(function(){
_35f(_362);
},1000);
}
};
var _347=function(_363,_364,_365){
var _366=function(key,_368){
_368[key]=_363;
_363._instanceId=key;
};
var _369=function(){
doError(_363);
};
var _36a=[];
if(_363.parent.requestHeaders&&_363.parent.requestHeaders.length>0){
for(var i=0;i<_363.parent.requestHeaders.length;i++){
_36a.push(_363.parent.requestHeaders[i].label+":"+_363.parent.requestHeaders[i].value);
}
}
_312._flashBridge.registerWebSocketRtmp(_364,_36a.join("\n"),_366,_369);
};
function doError(_36c,e){
setTimeout(function(){
_36c._listener.connectionFailed(_36c.parent);
},0);
};
return _343;
})();
(function(){
var _36e={};
_312._flashBridge.registerWebSocketEmulated=function(_36f,_370,_371,_372){
var _373=function(){
var key=_312._flashBridge.doRegisterWebSocketEmulated(_36f,_370);
_371(key,_36e);
};
if(_312._flashBridge.flashHasLoaded){
if(_312._flashBridge.flashHasFailed){
_372();
}else{
_373();
}
}else{
this.readyWaitQueue.push(_373);
this.failWaitQueue.push(_372);
}
};
_312._flashBridge.doRegisterWebSocketEmulated=function(_375,_376){
var key=_312._flashBridge.elt.registerWebSocketEmulated(_375,_376);
return key;
};
_312._flashBridge.registerWebSocketRtmp=function(_378,_379,_37a,_37b){
var _37c=function(){
var key=_312._flashBridge.doRegisterWebSocketRtmp(_378,_379);
_37a(key,_36e);
};
if(_312._flashBridge.flashHasLoaded){
if(_312._flashBridge.flashHasFailed){
_37b();
}else{
_37c();
}
}else{
this.readyWaitQueue.push(_37c);
this.failWaitQueue.push(_37b);
}
};
_312._flashBridge.doRegisterWebSocketRtmp=function(_37e,_37f){
var key=_312._flashBridge.elt.registerWebSocketRtmp(_37e,_37f);
return key;
};
_312._flashBridge.onready=function(){
var _381=_312._flashBridge.readyWaitQueue;
for(var i=0;i<_381.length;i++){
var _383=_381[i];
_383();
}
};
_312._flashBridge.onfail=function(){
var _384=_312._flashBridge.failWaitQueue;
for(var i=0;i<_384.length;i++){
var _386=_384[i];
_386();
}
};
_312._flashBridge.connectionOpened=function(key,_388){
_36e[key].readyState=1;
_36e[key].connectionOpened(_36e[key].parent,_388);
_389();
};
_312._flashBridge.connectionClosed=function(key,_38b,code,_38d){
_36e[key].readyState=2;
_36e[key].connectionClosed(_36e[key].parent,_38b,code,_38d);
};
_312._flashBridge.connectionFailed=function(key){
_36e[key].connectionFailed(_36e[key].parent);
};
_312._flashBridge.binaryMessageReceived=function(key,data){
var _391=_36e[key];
if(_391.readyState==1){
var buf=ByteBuffer.allocate(data.length);
for(var i=0;i<data.length;i++){
buf.put(data[i]);
}
buf.flip();
_391.binaryMessageReceived(_391.parent,buf);
}
};
_312._flashBridge.textMessageReceived=function(key,data){
var _396=_36e[key];
if(_396.readyState==1){
_396.textMessageReceived(_396.parent,unescape(data));
}
};
_312._flashBridge.redirected=function(key,_398){
var _399=_36e[key];
_399.redirected(_399.parent,_398);
};
_312._flashBridge.authenticationRequested=function(key,_39b,_39c){
var _39d=_36e[key];
_39d.authenticationRequested(_39d.parent,_39b,_39c);
};
var _389=function(){
if(browser==="firefox"){
var e=document.createElement("iframe");
e.style.display="none";
document.body.appendChild(e);
document.body.removeChild(e);
}
};
_312._flashBridge.sendText=function(key,_3a0){
this.elt.processTextMessage(key,escape(_3a0));
setTimeout(_389,200);
};
_312._flashBridge.sendByteString=function(key,_3a2){
this.elt.processBinaryMessage(key,escape(_3a2));
setTimeout(_389,200);
};
_312._flashBridge.disconnect=function(key,code,_3a5){
this.elt.processClose(key,code,_3a5);
};
_312._flashBridge.getBufferedAmount=function(key){
var v=this.elt.getBufferedAmount(key);
return v;
};
})();
(function(){
var _3a8=function(_3a9){
var self=this;
var _3ab=3000;
var ID="Loader";
var ie=false;
var _3ae=-1;
self.elt=null;
var _3af=function(){
var exp=new RegExp(".*"+_3a9+".*.js$");
var _3b1=document.getElementsByTagName("script");
for(var i=0;i<_3b1.length;i++){
if(_3b1[i].src){
var name=(_3b1[i].src).match(exp);
if(name){
name=name.pop();
var _3b4=name.split("/");
_3b4.pop();
if(_3b4.length>0){
return _3b4.join("/")+"/";
}else{
return "";
}
}
}
}
};
var _3b5=_3af();
var _3b6=_3b5+"Loader.swf";
self.loader=function(){
var _3b7="flash";
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name==="kaazing:upgrade"){
_3b7=tags[i].content;
}
}
if(_3b7!="flash"||!_3ba([9,0,115])){
_3bb();
}else{
_3ae=setTimeout(_3bb,_3ab);
_3bc();
}
};
self.clearFlashTimer=function(){
clearTimeout(_3ae);
_3ae="cleared";
setTimeout(function(){
_3bd(self.elt.handshake(_3a9));
},0);
};
var _3bd=function(_3be){
if(_3be){
_312._flashBridge.flashHasLoaded=true;
_312._flashBridge.elt=self.elt;
_312._flashBridge.onready();
}else{
_3bb();
}
window.___Loader=undefined;
};
var _3bb=function(){
_312._flashBridge.flashHasLoaded=true;
_312._flashBridge.flashHasFailed=true;
_312._flashBridge.onfail();
};
var _3bf=function(){
var _3c0=null;
if(typeof (ActiveXObject)!="undefined"){
try{
ie=true;
var swf=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
var _3c2=swf.GetVariable("$version");
var _3c3=_3c2.split(" ")[1].split(",");
_3c0=[];
for(var i=0;i<_3c3.length;i++){
_3c0[i]=parseInt(_3c3[i]);
}
}
catch(e){
ie=false;
}
}
if(typeof navigator.plugins!="undefined"){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _3c2=navigator.plugins["Shockwave Flash"].description;
_3c2=_3c2.replace(/\s*r/g,".");
var _3c3=_3c2.split(" ")[2].split(".");
_3c0=[];
for(var i=0;i<_3c3.length;i++){
_3c0[i]=parseInt(_3c3[i]);
}
}
}
var _3c5=navigator.userAgent;
if(_3c0!==null&&_3c0[0]===10&&_3c0[1]===0&&_3c5.indexOf("Windows NT 6.0")!==-1){
_3c0=null;
}
if(_3c5.indexOf("MSIE 6.0")==-1&&_3c5.indexOf("MSIE 7.0")==-1){
if(_3c5.indexOf("MSIE 8.0")>0||_3c5.indexOf("MSIE 9.0")>0){
if(typeof (XDomainRequest)!=="undefined"){
_3c0=null;
}
}else{
_3c0=null;
}
}
return _3c0;
};
var _3ba=function(_3c6){
var _3c7=_3bf();
if(_3c7==null){
return false;
}
for(var i=0;i<Math.max(_3c7.length,_3c6.length);i++){
var _3c9=_3c7[i]-_3c6[i];
if(_3c9!=0){
return (_3c9>0)?true:false;
}
}
return true;
};
var _3bc=function(){
if(ie){
var elt=document.createElement("div");
document.body.appendChild(elt);
elt.outerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" height=\"0\" width=\"0\" id=\""+ID+"\"><param name=\"movie\" value=\""+_3b6+"\"></param></object>";
self.elt=document.getElementById(ID);
}else{
var elt=document.createElement("object");
elt.setAttribute("type","application/x-shockwave-flash");
elt.setAttribute("width",0);
elt.setAttribute("height",0);
elt.setAttribute("id",ID);
elt.setAttribute("data",_3b6);
document.body.appendChild(elt);
self.elt=elt;
}
};
self.attachToOnload=function(_3cb){
if(window.addEventListener){
window.addEventListener("load",_3cb,true);
}else{
if(window.attachEvent){
window.attachEvent("onload",_3cb);
}else{
onload=_3cb;
}
}
};
if(document.readyState==="complete"){
self.loader();
}else{
self.attachToOnload(self.loader);
}
};
var _3cc=(function(){
var _3cd=function(_3ce){
this.HOST=new _3cd(0);
this.USERINFO=new _3cd(1);
this.PORT=new _3cd(2);
this.PATH=new _3cd(3);
this.ordinal=_3ce;
};
return _3cd;
})();
var _3cf=(function(){
var _3d0=function(){
};
_3d0.getRealm=function(_3d1){
var _3d2=_3d1.authenticationParameters;
if(_3d2==null){
return null;
}
var _3d3=/realm=(\"(.*)\")/i;
var _3d4=_3d3.exec(_3d2);
return (_3d4!=null&&_3d4.length>=3)?_3d4[2]:null;
};
return _3d0;
})();
function Dictionary(){
this.Keys=new Array();
};
var _3d5=(function(){
var _3d6=function(_3d7){
this.weakKeys=_3d7;
this.elements=[];
this.dictionary=new Dictionary();
};
var _3d8=_3d6.prototype;
_3d8.getlength=function(){
return this.elements.length;
};
_3d8.getItemAt=function(_3d9){
return this.dictionary[this.elements[_3d9]];
};
_3d8.get=function(key){
var _3db=this.dictionary[key];
if(_3db==undefined){
_3db=null;
}
return _3db;
};
_3d8.remove=function(key){
for(var i=0;i<this.elements.length;i++){
var _3de=(this.weakKeys&&(this.elements[i]==key));
var _3df=(!this.weakKeys&&(this.elements[i]===key));
if(_3de||_3df){
this.elements.remove(i);
this.dictionary[this.elements[i]]=undefined;
break;
}
}
};
_3d8.put=function(key,_3e1){
this.remove(key);
this.elements.push(key);
this.dictionary[key]=_3e1;
};
_3d8.isEmpty=function(){
return this.length==0;
};
_3d8.containsKey=function(key){
for(var i=0;i<this.elements.length;i++){
var _3e4=(this.weakKeys&&(this.elements[i]==key));
var _3e5=(!this.weakKeys&&(this.elements[i]===key));
if(_3e4||_3e5){
return true;
}
}
return false;
};
_3d8.keySet=function(){
return this.elements;
};
_3d8.getvalues=function(){
var _3e6=[];
for(var i=0;i<this.elements.length;i++){
_3e6.push(this.dictionary[this.elements[i]]);
}
return _3e6;
};
return _3d6;
})();
var Node=(function(){
var Node=function(){
this.name="";
this.kind="";
this.values=[];
this.children=new _3d5();
};
var _3ea=Node.prototype;
_3ea.getWildcardChar=function(){
return "*";
};
_3ea.addChild=function(name,kind){
if(name==null||name.length==0){
throw new ArgumentError("A node may not have a null name.");
}
var _3ed=Node.createNode(name,this,kind);
this.children.put(name,_3ed);
return _3ed;
};
_3ea.hasChild=function(name,kind){
return null!=this.getChild(name)&&kind==this.getChild(name).kind;
};
_3ea.getChild=function(name){
return this.children.get(name);
};
_3ea.getDistanceFromRoot=function(){
var _3f1=0;
var _3f2=this;
while(!_3f2.isRootNode()){
_3f1++;
_3f2=_3f2.parent;
}
return _3f1;
};
_3ea.appendValues=function(){
if(this.isRootNode()){
throw new ArgumentError("Cannot set a values on the root node.");
}
if(this.values!=null){
for(var k=0;k<arguments.length;k++){
var _3f4=arguments[k];
this.values.push(_3f4);
}
}
};
_3ea.removeValue=function(_3f5){
if(this.isRootNode()){
return;
}
for(var i=0;i<this.values.length;i++){
if(this.values[i]==_3f5){
this.values.splice(i,1);
}
}
};
_3ea.getValues=function(){
return this.values;
};
_3ea.hasValues=function(){
return this.values!=null&&this.values.length>0;
};
_3ea.isRootNode=function(){
return this.parent==null;
};
_3ea.hasChildren=function(){
return this.children!=null&&this.children.getlength()>0;
};
_3ea.isWildcard=function(){
return this.name!=null&&this.name==this.getWildcardChar();
};
_3ea.hasWildcardChild=function(){
return this.hasChildren()&&this.children.containsKey(this.getWildcardChar());
};
_3ea.getFullyQualifiedName=function(){
var b=new String();
var name=[];
var _3f9=this;
while(!_3f9.isRootNode()){
name.push(_3f9.name);
_3f9=_3f9.parent;
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
_3ea.getChildrenAsList=function(){
return this.children.getvalues();
};
_3ea.findBestMatchingNode=function(_3fb,_3fc){
var _3fd=this.findAllMatchingNodes(_3fb,_3fc);
var _3fe=null;
var _3ff=0;
for(var i=0;i<_3fd.length;i++){
var node=_3fd[i];
if(node.getDistanceFromRoot()>_3ff){
_3ff=node.getDistanceFromRoot();
_3fe=node;
}
}
return _3fe;
};
_3ea.findAllMatchingNodes=function(_402,_403){
var _404=[];
var _405=this.getChildrenAsList();
for(var i=0;i<_405.length;i++){
var node=_405[i];
var _408=node.matches(_402,_403);
if(_408<0){
continue;
}
if(_408>=_402.length){
do{
if(node.hasValues()){
_404.push(node);
}
if(node.hasWildcardChild()){
var _409=node.getChild(this.getWildcardChar());
if(_409.kind!=this.kind){
node=null;
}else{
node=_409;
}
}else{
node=null;
}
}while(node!=null);
}else{
var _40a=node.findAllMatchingNodes(_402,_408);
for(var j=0;j<_40a.length;j++){
_404.push(_40a[j]);
}
}
}
return _404;
};
_3ea.matches=function(_40c,_40d){
if(_40d<0||_40d>=_40c.length){
return -1;
}
if(this.matchesToken(_40c[_40d])){
return _40d+1;
}
if(!this.isWildcard()){
return -1;
}else{
if(this.kind!=_40c[_40d].kind){
return -1;
}
do{
_40d++;
}while(_40d<_40c.length&&this.kind==_40c[_40d].kind);
return _40d;
}
};
_3ea.matchesToken=function(_40e){
return this.name==_40e.name&&this.kind==_40e.kind;
};
Node.createNode=function(name,_410,kind){
var node=new Node();
node.name=name;
node.parent=_410;
node.kind=kind;
return node;
};
return Node;
})();
var _413=(function(){
var _414=function(name,kind){
this.kind=kind;
this.name=name;
};
return _414;
})();
window.Oid=(function(){
var Oid=function(data){
this.rep=data;
};
var _419=Oid.prototype;
_419.asArray=function(){
return this.rep;
};
_419.asString=function(){
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
var _41d=(function(){
var _41e=function(){
};
_41e.create=function(_41f,_420,_421){
var _422=_41f+":"+_420;
var _423=[];
for(var i=0;i<_422.length;++i){
_423.push(_422.charCodeAt(i));
}
var _425="Basic "+Base64.encode(_423);
return new ChallengeResponse(_425,_421);
};
return _41e;
})();
function InternalDefaultChallengeHandler(){
this.canHandle=function(_426){
return false;
};
this.handle=function(_427,_428){
_428(null);
};
};
window.PasswordAuthentication=(function(){
function PasswordAuthentication(_429,_42a){
this.username=_429;
this.password=_42a;
};
PasswordAuthentication.prototype.clear=function(){
this.username=null;
this.password=null;
};
return PasswordAuthentication;
})();
window.ChallengeRequest=(function(){
var _42b=function(_42c,_42d){
if(_42c==null){
throw new Error("location is not defined.");
}
if(_42d==null){
return;
}
var _42e="Application ";
if(_42d.indexOf(_42e)==0){
_42d=_42d.substring(_42e.length);
}
this.location=_42c;
this.authenticationParameters=null;
var _42f=_42d.indexOf(" ");
if(_42f==-1){
this.authenticationScheme=_42d;
}else{
this.authenticationScheme=_42d.substring(0,_42f);
if(_42d.length>_42f+1){
this.authenticationParameters=_42d.substring(_42f+1);
}
}
};
return _42b;
})();
window.ChallengeResponse=(function(){
var _430=function(_431,_432){
this.credentials=_431;
this.nextChallengeHandler=_432;
};
var _433=_430.prototype;
_433.clearCredentials=function(){
if(this.credentials!=null){
this.credentials=null;
}
};
return _430;
})();
window.BasicChallengeHandler=(function(){
var _434=function(){
this.loginHandler=undefined;
this.loginHandlersByRealm={};
};
var _435=_434.prototype;
_435.setRealmLoginHandler=function(_436,_437){
if(_436==null){
throw new ArgumentError("null realm");
}
if(_437==null){
throw new ArgumentError("null loginHandler");
}
this.loginHandlersByRealm[_436]=_437;
return this;
};
_435.canHandle=function(_438){
return _438!=null&&"Basic"==_438.authenticationScheme;
};
_435.handle=function(_439,_43a){
if(_439.location!=null){
var _43b=this.loginHandler;
var _43c=_3cf.getRealm(_439);
if(_43c!=null&&this.loginHandlersByRealm[_43c]!=null){
_43b=this.loginHandlersByRealm[_43c];
}
var _43d=this;
if(_43b!=null){
_43b(function(_43e){
if(_43e!=null&&_43e.username!=null){
_43a(_41d.create(_43e.username,_43e.password,_43d));
}else{
_43a(null);
}
});
return;
}
}
_43a(null);
};
_435.loginHandler=function(_43f){
_43f(null);
};
return _434;
})();
window.DispatchChallengeHandler=(function(){
var _440=function(){
this.rootNode=new Node();
var _441="^(.*)://(.*)";
this.SCHEME_URI_PATTERN=new RegExp(_441);
};
function delChallengeHandlerAtLocation(_442,_443,_444){
var _445=tokenize(_443);
var _446=_442;
for(var i=0;i<_445.length;i++){
var _448=_445[i];
if(!_446.hasChild(_448.name,_448.kind)){
return;
}else{
_446=_446.getChild(_448.name);
}
}
_446.removeValue(_444);
};
function addChallengeHandlerAtLocation(_449,_44a,_44b){
var _44c=tokenize(_44a);
var _44d=_449;
for(var i=0;i<_44c.length;i++){
var _44f=_44c[i];
if(!_44d.hasChild(_44f.name,_44f.kind)){
_44d=_44d.addChild(_44f.name,_44f.kind);
}else{
_44d=_44d.getChild(_44f.name);
}
}
_44d.appendValues(_44b);
};
function lookupByLocation(_450,_451){
var _452=new Array();
if(_451!=null){
var _453=findBestMatchingNode(_450,_451);
if(_453!=null){
return _453.values;
}
}
return _452;
};
function lookupByRequest(_454,_455){
var _456=null;
var _457=_455.location;
if(_457!=null){
var _458=findBestMatchingNode(_454,_457);
if(_458!=null){
var _459=_458.getValues();
if(_459!=null){
for(var i=0;i<_459.length;i++){
var _45b=_459[i];
if(_45b.canHandle(_455)){
_456=_45b;
break;
}
}
}
}
}
return _456;
};
function findBestMatchingNode(_45c,_45d){
var _45e=tokenize(_45d);
var _45f=0;
return _45c.findBestMatchingNode(_45e,_45f);
};
function tokenize(uri){
var _461=new Array();
if(uri==null||uri.length==0){
return _461;
}
var _462=new RegExp("^(([^:/?#]+):(//))?([^/?#]*)?([^?#]*)(\\?([^#]*))?(#(.*))?");
var _463=_462.exec(uri);
if(_463==null){
return _461;
}
var _464=_463[2]||"http";
var _465=_463[4];
var path=_463[5];
var _467=null;
var _468=null;
var _469=null;
var _46a=null;
if(_465!=null){
var host=_465;
var _46c=host.indexOf("@");
if(_46c>=0){
_468=host.substring(0,_46c);
host=host.substring(_46c+1);
var _46d=_468.indexOf(":");
if(_46d>=0){
_469=_468.substring(0,_46d);
_46a=_468.substring(_46d+1);
}
}
var _46e=host.indexOf(":");
if(_46e>=0){
_467=host.substring(_46e+1);
host=host.substring(0,_46e);
}
}else{
throw new ArgumentError("Hostname is required.");
}
var _46f=host.split(/\./);
_46f.reverse();
for(var k=0;k<_46f.length;k++){
_461.push(new _413(_46f[k],_3cc.HOST));
}
if(_467!=null){
_461.push(new _413(_467,_3cc.PORT));
}else{
if(getDefaultPort(_464)>0){
_461.push(new _413(getDefaultPort(_464).toString(),_3cc.PORT));
}
}
if(_468!=null){
if(_469!=null){
_461.push(new _413(_469,_3cc.USERINFO));
}
if(_46a!=null){
_461.push(new _413(_46a,_3cc.USERINFO));
}
if(_469==null&&_46a==null){
_461.push(new _413(_468,_3cc.USERINFO));
}
}
if(isNotBlank(path)){
if(path.charAt(0)=="/"){
path=path.substring(1);
}
if(isNotBlank(path)){
var _471=path.split("/");
for(var p=0;p<_471.length;p++){
var _473=_471[p];
_461.push(new _413(_473,_3cc.PATH));
}
}
}
return _461;
};
function getDefaultPort(_474){
if(defaultPortsByScheme[_474.toLowerCase()]!=null){
return defaultPortsByScheme[_474];
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
var _476=_440.prototype;
_476.clear=function(){
this.rootNode=new Node();
};
_476.canHandle=function(_477){
return lookupByRequest(this.rootNode,_477)!=null;
};
_476.handle=function(_478,_479){
var _47a=lookupByRequest(this.rootNode,_478);
if(_47a==null){
return null;
}
return _47a.handle(_478,_479);
};
_476.register=function(_47b,_47c){
if(_47b==null||_47b.length==0){
throw new Error("Must specify a location to handle challenges upon.");
}
if(_47c==null){
throw new Error("Must specify a handler to handle challenges.");
}
addChallengeHandlerAtLocation(this.rootNode,_47b,_47c);
return this;
};
_476.unregister=function(_47d,_47e){
if(_47d==null||_47d.length==0){
throw new Error("Must specify a location to un-register challenge handlers upon.");
}
if(_47e==null){
throw new Error("Must specify a handler to un-register.");
}
delChallengeHandlerAtLocation(this.rootNode,_47d,_47e);
return this;
};
return _440;
})();
window.NegotiableChallengeHandler=(function(){
var _47f=function(){
this.candidateChallengeHandlers=new Array();
};
var _480=function(_481){
var oids=new Array();
for(var i=0;i<_481.length;i++){
oids.push(Oid.create(_481[i]).asArray());
}
var _484=GssUtils.sizeOfSpnegoInitialContextTokenWithOids(null,oids);
var _485=ByteBuffer.allocate(_484);
_485.skip(_484);
GssUtils.encodeSpnegoInitialContextTokenWithOids(null,oids,_485);
return ByteArrayUtils.arrayToByteArray(Base64Util.encodeBuffer(_485));
};
var _486=_47f.prototype;
_486.register=function(_487){
if(_487==null){
throw new Error("handler is null");
}
for(var i=0;i<this.candidateChallengeHandlers.length;i++){
if(_487===this.candidateChallengeHandlers[i]){
return this;
}
}
this.candidateChallengeHandlers.push(_487);
return this;
};
_486.canHandle=function(_489){
return _489!=null&&_489.authenticationScheme=="Negotiate"&&_489.authenticationParameters==null;
};
_486.handle=function(_48a,_48b){
if(_48a==null){
throw Error(new ArgumentError("challengeRequest is null"));
}
var _48c=new _3d5();
for(var i=0;i<this.candidateChallengeHandlers.length;i++){
var _48e=this.candidateChallengeHandlers[i];
if(_48e.canHandle(_48a)){
try{
var _48f=_48e.getSupportedOids();
for(var j=0;j<_48f.length;j++){
var oid=new Oid(_48f[j]).asString();
if(!_48c.containsKey(oid)){
_48c.put(oid,_48e);
}
}
}
catch(e){
}
}
}
if(_48c.isEmpty()){
_48b(null);
return;
}
};
return _47f;
})();
window.NegotiableChallengeHandler=(function(){
var _492=function(){
this.loginHandler=undefined;
};
_492.prototype.getSupportedOids=function(){
return new Array();
};
return _492;
})();
window.NegotiableChallengeHandler=(function(){
var _493=function(){
this.loginHandler=undefined;
};
_493.prototype.getSupportedOids=function(){
return new Array();
};
return _493;
})();
var _494={};
(function(){
var _495={8364:128,129:129,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,141:141,381:142,143:143,144:144,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,157:157,382:158,376:159};
var _496={128:8364,129:129,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,141:141,142:381,143:143,144:144,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,157:157,158:382,159:376};
_494.toCharCode=function(n){
if(n<128||(n>159&&n<256)){
return n;
}else{
var _498=_496[n];
if(typeof (_498)=="undefined"){
throw new Error("Windows1252.toCharCode could not find: "+n);
}
return _498;
}
};
_494.fromCharCode=function(code){
if(code<256){
return code;
}else{
var _49a=_495[code];
if(typeof (_49a)=="undefined"){
throw new Error("Windows1252.fromCharCode could not find: "+code);
}
return _49a;
}
};
var _49b=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _49d="\n";
var _49e=function(s){
var a=[];
for(var i=0;i<s.length;i++){
var code=_494.fromCharCode(s.charCodeAt(i));
if(code==127){
i++;
if(i==s.length){
a.hasRemainder=true;
break;
}
var _4a3=_494.fromCharCode(s.charCodeAt(i));
switch(_4a3){
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
throw new Error("Escaping format error");
}
}else{
a.push(code);
}
}
return a;
};
var _4a4=function(buf){
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(_494.toCharCode(n));
switch(chr){
case _49b:
a.push(_49b);
a.push(_49b);
break;
case NULL:
a.push(_49b);
a.push("0");
break;
case _49d:
a.push(_49b);
a.push("n");
break;
default:
a.push(chr);
}
}
return a.join("");
};
_494.toArray=function(s,_4aa){
if(_4aa){
return _49e(s);
}else{
var a=[];
for(var i=0;i<s.length;i++){
a.push(_494.fromCharCode(s.charCodeAt(i)));
}
return a;
}
};
_494.toByteString=function(buf,_4ae){
if(_4ae){
return _4a4(buf);
}else{
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
a.push(String.fromCharCode(_494.toCharCode(n)));
}
return a.join("");
}
};
})();
function CloseEvent(_4b1,_4b2,_4b3,_4b4){
this.reason=_4b4;
this.code=_4b3;
this.wasClean=_4b2;
this.type="close";
this.bubbles=true;
this.cancelable=true;
this.target=_4b1;
};
function MessageEvent(_4b5,_4b6,_4b7){
return {target:_4b5,data:_4b6,origin:_4b7,bubbles:true,cancelable:true,type:"message",lastEventId:""};
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
var _4b9=function(_4ba,_4bb){
var _4bc=_4bb||{};
if(window.WebKitBlobBuilder){
var _4bd=new window.WebKitBlobBuilder();
for(var i=0;i<_4ba.length;i++){
var part=_4ba[i];
if(_4bc.endings){
_4bd.append(part,_4bc.endings);
}else{
_4bd.append(part);
}
}
var blob;
if(_4bc.type){
blob=_4bd.getBlob(type);
}else{
blob=_4bd.getBlob();
}
blob.slice=blob.webkitSlice||blob.slice;
return blob;
}else{
if(window.MozBlobBuilder){
var _4bd=new window.MozBlobBuilder();
for(var i=0;i<_4ba.length;i++){
var part=_4ba[i];
if(_4bc.endings){
_4bd.append(part,_4bc.endings);
}else{
_4bd.append(part);
}
}
var blob;
if(_4bc.type){
blob=_4bd.getBlob(type);
}else{
blob=_4bd.getBlob();
}
blob.slice=blob.mozSlice||blob.slice;
return blob;
}else{
var _4c1=[];
for(var i=0;i<_4ba.length;i++){
var part=_4ba[i];
if(typeof part==="string"){
var b=BlobUtils.fromString(part,_4bc.endings);
_4c1.push(b);
}else{
if(part.byteLength){
var _4c3=new Uint8Array(part);
for(var i=0;i<part.byteLength;i++){
_4c1.push(_4c3[i]);
}
}else{
if(part.length){
_4c1.push(part);
}else{
if(part._array){
_4c1.push(part._array);
}else{
throw new Error("invalid type in Blob constructor");
}
}
}
}
}
var blob=concatMemoryBlobs(_4c1);
blob.type=_4bc.type;
return blob;
}
}
};
function MemoryBlob(_4c4,_4c5){
return {_array:_4c4,size:_4c4.length,type:_4c5||"",slice:function(_4c6,end,_4c8){
var a=this._array.slice(_4c6,end);
return MemoryBlob(a,_4c8);
},toString:function(){
return "MemoryBlob: "+_4c4.toString();
}};
};
function concatMemoryBlobs(_4ca){
var a=Array.prototype.concat.apply([],_4ca);
return new MemoryBlob(a);
};
window.Blob=_4b9;
})();
(function(_4cc){
_4cc.BlobUtils={};
BlobUtils.asString=function asString(blob,_4ce,end){
if(blob._array){
}else{
if(FileReader){
var _4d0=new FileReader();
_4d0.readAsText(blob);
_4d0.onload=function(){
cb(_4d0.result);
};
_4d0.onerror=function(e){
console.log(e,_4d0);
};
}
}
};
BlobUtils.asNumberArray=(function(){
var _4d2=[];
var _4d3=function(){
if(_4d2.length>0){
try{
var _4d4=_4d2.shift();
_4d4.cb(_4d4.blob._array);
}
finally{
if(_4d2.length>0){
setTimeout(function(){
_4d3();
},0);
}
}
}
};
var _4d5=function(cb,blob){
if(blob._array){
_4d2.push({cb:cb,blob:blob});
if(_4d2.length==1){
setTimeout(function(){
_4d3();
},0);
}
}else{
if(FileReader){
var _4d8=new FileReader();
_4d8.readAsArrayBuffer(blob);
_4d8.onload=function(){
var _4d9=new DataView(_4d8.result);
var a=[];
for(var i=0;i<_4d8.result.byteLength;i++){
a.push(_4d9.getUint8(i));
}
cb(a);
};
}else{
throw new Error("Cannot convert Blob to binary string");
}
}
};
return _4d5;
})();
BlobUtils.asBinaryString=function asBinaryString(cb,blob){
if(blob._array){
var _4de=blob._array;
var a=[];
for(var i=0;i<_4de.length;i++){
a.push(String.fromCharCode(_4de[i]));
}
setTimeout(function(){
cb(a.join(""));
},0);
}else{
if(FileReader){
var _4e1=new FileReader();
if(_4e1.readAsBinaryString){
_4e1.readAsBinaryString(blob);
_4e1.onload=function(){
cb(_4e1.result);
};
}else{
_4e1.readAsArrayBuffer(blob);
_4e1.onload=function(){
var _4e2=new DataView(_4e1.result);
var a=[];
for(var i=0;i<_4e1.result.byteLength;i++){
a.push(String.fromCharCode(_4e2.getUint8(i)));
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
var _4e6=[];
for(var i=0;i<s.length;i++){
_4e6.push(s.charCodeAt(i));
}
return BlobUtils.fromNumberArray(_4e6);
};
BlobUtils.fromNumberArray=function fromNumberArray(a){
if(typeof (Uint8Array)!=="undefined"){
return new Blob([new Uint8Array(a)]);
}else{
return new Blob([a]);
}
};
BlobUtils.fromString=function fromString(s,_4ea){
if(_4ea&&_4ea==="native"){
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
var _4ed=function(){
this._queue=[];
this._count=0;
this.completion;
};
_4ed.prototype.enqueue=function(cb){
var _4ef=this;
var _4f0={};
_4f0.cb=cb;
_4f0.id=this._count++;
this._queue.push(_4f0);
var func=function(){
_4ef.processQueue(_4f0.id,cb,arguments);
};
return func;
};
_4ed.prototype.processQueue=function(id,cb,args){
for(var i=0;i<this._queue.length;i++){
if(this._queue[i].id==id){
this._queue[i].args=args;
break;
}
}
while(this._queue.length&&this._queue[0].args!==undefined){
var _4f6=this._queue.shift();
_4f6.cb.apply(null,_4f6.args);
}
};
var _4f7=(function(){
var _4f8=function(_4f9,_4fa){
this.label=_4f9;
this.value=_4fa;
};
return _4f8;
})();
var _4fb=(function(){
var _4fc=function(_4fd){
var uri=new URI(_4fd);
if(isValidScheme(uri.scheme)){
this._uri=uri;
}else{
throw new Error("HttpURI - invalid scheme: "+_4fd);
}
};
function isValidScheme(_4ff){
return "http"==_4ff||"https"==_4ff;
};
var _500=_4fc.prototype;
_500.getURI=function(){
return this._uri;
};
_500.duplicate=function(uri){
try{
return new _4fc(uri);
}
catch(e){
throw e;
}
return null;
};
_500.isSecure=function(){
return ("https"==this._uri.scheme);
};
_500.toString=function(){
return this._uri.toString();
};
_4fc.replaceScheme=function(_502,_503){
var uri=URI.replaceProtocol(_502,_503);
return new _4fc(uri);
};
return _4fc;
})();
var _505=(function(){
var _506=function(_507){
var uri=new URI(_507);
if(isValidScheme(uri.scheme)){
this._uri=uri;
if(uri.port==undefined){
this._uri=new URI(_506.addDefaultPort(_507));
}
}else{
throw new Error("WSURI - invalid scheme: "+_507);
}
};
function isValidScheme(_509){
return "ws"==_509||"wss"==_509;
};
function duplicate(uri){
try{
return new _506(uri);
}
catch(e){
throw e;
}
return null;
};
var _50b=_506.prototype;
_50b.getAuthority=function(){
return this._uri.authority;
};
_50b.isSecure=function(){
return "wss"==this._uri.scheme;
};
_50b.getHttpEquivalentScheme=function(){
return this.isSecure()?"https":"http";
};
_50b.toString=function(){
return this._uri.toString();
};
var _50c=80;
var _50d=443;
_506.setDefaultPort=function(uri){
if(uri.port==0){
if(uri.scheme=="ws"){
uri.port=_50c;
}else{
if(uri.scheme=="wss"){
uri.port=_50d;
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
_506.addDefaultPort=function(_50f){
var uri=new URI(_50f);
if(uri.port==undefined){
_506.setDefaultPort(uri);
}
return uri.toString();
};
_506.replaceScheme=function(_511,_512){
var uri=URI.replaceProtocol(_511,_512);
return new _506(uri);
};
return _506;
})();
var _514=(function(){
var _515={};
_515["ws"]="ws";
_515["wss"]="wss";
_515["javascript:wse"]="ws";
_515["javascript:wse+ssl"]="wss";
_515["javascript:ws"]="ws";
_515["javascript:wss"]="wss";
_515["flash:wsr"]="ws";
_515["flash:wsr+ssl"]="wss";
_515["flash:wse"]="ws";
_515["flash:wse+ssl"]="wss";
var _516=function(_517){
var _518=getProtocol(_517);
if(isValidScheme(_518)){
this._uri=new URI(URI.replaceProtocol(_517,_515[_518]));
this._compositeScheme=_518;
this._location=_517;
}else{
throw new SyntaxError("WSCompositeURI - invalid composite scheme: "+getProtocol(_517));
}
};
function getProtocol(_519){
var indx=_519.indexOf("://");
if(indx>0){
return _519.substr(0,indx);
}else{
return "";
}
};
function isValidScheme(_51b){
return _515[_51b]!=null;
};
function duplicate(uri){
try{
return new _516(uri);
}
catch(e){
throw e;
}
return null;
};
var _51d=_516.prototype;
_51d.isSecure=function(){
var _51e=this._uri.scheme;
return "wss"==_515[_51e];
};
_51d.getWSEquivalent=function(){
try{
var _51f=_515[this._compositeScheme];
return _505.replaceScheme(this._location,_51f);
}
catch(e){
throw e;
}
return null;
};
_51d.getPlatformPrefix=function(){
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
_51d.toString=function(){
return this._location;
};
return _516;
})();
var _520=(function(){
var _521=function(_522,_523,_524){
if(arguments.length<3){
var s="ResumableTimer: Please specify the required parameters 'callback', 'delay', and 'updateDelayWhenPaused'.";
throw Error(s);
}
if((typeof (_522)=="undefined")||(_522==null)){
var s="ResumableTimer: Please specify required parameter 'callback'.";
throw Error(s);
}else{
if(typeof (_522)!="function"){
var s="ResumableTimer: Required parameter 'callback' must be a function.";
throw Error(s);
}
}
if(typeof (_523)=="undefined"){
var s="ResumableTimer: Please specify required parameter 'delay' of type integer.";
throw Error(s);
}else{
if((typeof (_523)!="number")||(_523<=0)){
var s="ResumableTimer: Required parameter 'delay' should be a positive integer.";
throw Error(s);
}
}
if(typeof (_524)=="undefined"){
var s="ResumableTimer: Please specify required boolean parameter 'updateDelayWhenPaused'.";
throw Error(s);
}else{
if(typeof (_524)!="boolean"){
var s="ResumableTimer: Required parameter 'updateDelayWhenPaused' is a boolean.";
throw Error(s);
}
}
this._delay=_523;
this._updateDelayWhenPaused=_524;
this._callback=_522;
this._timeoutId=-1;
this._startTime=-1;
};
var _526=_521.prototype;
_526.cancel=function(){
if(this._timeoutId!=-1){
window.clearTimeout(this._timeoutId);
this._timeoutId=-1;
}
this._delay=-1;
this._callback=null;
};
_526.pause=function(){
if(this._timeoutId==-1){
return;
}
window.clearTimeout(this._timeoutId);
var _527=new Date().getTime();
var _528=_527-this._startTime;
this._timeoutId=-1;
if(this._updateDelayWhenPaused){
this._delay=this._delay-_528;
}
};
_526.resume=function(){
if(this._timeoutId!=-1){
return;
}
if(this._callback==null){
var s="Timer cannot be resumed as it has been canceled.";
throw new Error(s);
}
this.start();
};
_526.start=function(){
if(this._delay<0){
var s="Timer delay cannot be negative";
}
this._timeoutId=window.setTimeout(this._callback,this._delay);
this._startTime=new Date().getTime();
};
return _521;
})();
var _52b=(function(){
var _52c=function(){
this._parent=null;
this._challengeResponse=new ChallengeResponse(null,null);
};
_52c.prototype.toString=function(){
return "[Channel]";
};
return _52c;
})();
var _52d=(function(){
var _52e=function(_52f,_530,_531){
_52b.apply(this,arguments);
this._location=_52f;
this._protocol=_530;
this._extensions=[];
this._controlFrames={};
this._controlFramesBinary={};
this._escapeSequences={};
this._handshakePayload="";
this._isEscape=false;
this._bufferedAmount=0;
};
var _532=_52e.prototype=new _52b();
_532.getBufferedAmount=function(){
return this._bufferedAmount;
};
_532.toString=function(){
return "[WebSocketChannel "+_location+" "+_protocol!=null?_protocol:"-"+"]";
};
return _52e;
})();
var _533=(function(){
var _534=function(){
this._nextHandler;
this._listener;
};
var _535=_534.prototype;
_535.processConnect=function(_536,_537,_538){
this._nextHandler.processConnect(_536,_537,_538);
};
_535.processAuthorize=function(_539,_53a){
this._nextHandler.processAuthorize(_539,_53a);
};
_535.processTextMessage=function(_53b,text){
this._nextHandler.processTextMessage(_53b,text);
};
_535.processBinaryMessage=function(_53d,_53e){
this._nextHandler.processBinaryMessage(_53d,_53e);
};
_535.processClose=function(_53f,code,_541){
this._nextHandler.processClose(_53f,code,_541);
};
_535.setIdleTimeout=function(_542,_543){
this._nextHandler.setIdleTimeout(_542,_543);
};
_535.setListener=function(_544){
this._listener=_544;
};
_535.setNextHandler=function(_545){
this._nextHandler=_545;
};
return _534;
})();
var _546=function(_547){
this.connectionOpened=function(_548,_549){
_547._listener.connectionOpened(_548,_549);
};
this.textMessageReceived=function(_54a,s){
_547._listener.textMessageReceived(_54a,s);
};
this.binaryMessageReceived=function(_54c,obj){
_547._listener.binaryMessageReceived(_54c,obj);
};
this.connectionClosed=function(_54e,_54f,code,_551){
_547._listener.connectionClosed(_54e,_54f,code,_551);
};
this.connectionError=function(_552,e){
_547._listener.connectionError(_552,e);
};
this.connectionFailed=function(_554){
_547._listener.connectionFailed(_554);
};
this.authenticationRequested=function(_555,_556,_557){
_547._listener.authenticationRequested(_555,_556,_557);
};
this.redirected=function(_558,_559){
_547._listener.redirected(_558,_559);
};
this.onBufferedAmountChange=function(_55a,n){
_547._listener.onBufferedAmountChange(_55a,n);
};
};
var _55c=(function(){
var _55d=function(){
var _55e="";
var _55f="";
};
_55d.KAAZING_EXTENDED_HANDSHAKE="x-kaazing-handshake";
_55d.KAAZING_SEC_EXTENSION_REVALIDATE="x-kaazing-http-revalidate";
_55d.HEADER_SEC_PROTOCOL="X-WebSocket-Protocol";
_55d.HEADER_SEC_EXTENSIONS="X-WebSocket-Extensions";
_55d.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT="x-kaazing-idle-timeout";
_55d.KAAZING_SEC_EXTENSION_PING_PONG="x-kaazing-ping-pong";
return _55d;
})();
var _560=(function(){
var _561=function(_562,_563){
_52d.apply(this,arguments);
this.requestHeaders=[];
this.responseHeaders={};
this.readyState=WebSocket.CONNECTING;
this.authenticationReceived=false;
this.wasCleanClose=false;
this.closeCode=1006;
this.closeReason="";
this.preventFallback=false;
};
return _561;
})();
var _564=(function(){
var _565=function(){
};
var _566=_565.prototype;
_566.createChannel=function(_567,_568,_569){
var _56a=new _560(_567,_568,_569);
return _56a;
};
return _565;
})();
var _56b=(function(){
var _56c=function(){
};
var _56d=_56c.prototype;
_56d.createChannel=function(_56e,_56f){
var _570=new _560(_56e,_56f);
return _570;
};
return _56c;
})();
var _571=(function(){
var _572=function(_573,_574){
this._location=_573.getWSEquivalent();
this._protocol=_574;
this._webSocket;
this._compositeScheme=_573._compositeScheme;
this._connectionStrategies=[];
this._selectedChannel;
this.readyState=0;
this._closing=false;
this._negotiatedExtensions={};
this._compositeScheme=_573._compositeScheme;
};
var _575=_572.prototype=new _52d();
_575.getReadyState=function(){
return this.readyState;
};
_575.getWebSocket=function(){
return this._webSocket;
};
_575.getCompositeScheme=function(){
return this._compositeScheme;
};
_575.getNextStrategy=function(){
if(this._connectionStrategies.length<=0){
return null;
}else{
return this._connectionStrategies.shift();
}
};
_575.getRedirectPolicy=function(){
return this.getWebSocket().getRedirectPolicy();
};
return _572;
})();
var _576=(function(){
var _577=function(){
};
var _578=function(_579,_57a){
var _57b=0;
for(var i=_57a;i<_57a+4;i++){
_57b=(_57b<<8)+_579.getAt(i);
}
return _57b;
};
var _57d=function(_57e){
if(_57e.byteLength>3){
var _57f=new DataView(_57e);
return _57f.getInt32(0);
}
return 0;
};
var _580=function(_581){
var _582=0;
for(var i=0;i<4;i++){
_582=(_582<<8)+_581.charCodeAt(i);
}
return _582;
};
var ping=[9,0];
var pong=[10,0];
var _586={};
var _587=function(_588){
if(typeof _586.escape==="undefined"){
var _589=[];
var i=4;
do{
_589[--i]=_588&(255);
_588=_588>>8;
}while(i);
_586.escape=String.fromCharCode.apply(null,_589.concat(pong));
}
return _586.escape;
};
var _58b=function(_58c,_58d,_58e,_58f){
if(_55c.KAAZING_SEC_EXTENSION_REVALIDATE==_58d._controlFrames[_58f]){
var url=_58e.substr(5);
if(_58d._redirectUri!=null){
if(typeof (_58d._redirectUri)=="string"){
var _591=new URI(_58d._redirectUri);
url=_591.scheme+"://"+_591.authority+url;
}else{
url=_58d._redirectUri.getHttpEquivalentScheme()+"://"+_58d._redirectUri.getAuthority()+url;
}
}else{
url=_58d._location.getHttpEquivalentScheme()+"://"+_58d._location.getAuthority()+url;
}
_58c._listener.authenticationRequested(_58d,url,_55c.KAAZING_SEC_EXTENSION_REVALIDATE);
}else{
if(_55c.KAAZING_SEC_EXTENSION_PING_PONG==_58d._controlFrames[_58f]){
if(_58e.charCodeAt(4)==ping[0]){
var pong=_587(_58f);
_58c._nextHandler.processTextMessage(_58d,pong);
}
}
}
};
var _593=_577.prototype=new _533();
_593.handleConnectionOpened=function(_594,_595){
var _596=_594.responseHeaders;
if(_596[_55c.HEADER_SEC_EXTENSIONS]!=null){
var _597=_596[_55c.HEADER_SEC_EXTENSIONS];
if(_597!=null&&_597.length>0){
var _598=_597.split(",");
for(var j=0;j<_598.length;j++){
var tmp=_598[j].split(";");
var ext=tmp[0].replace(/^\s+|\s+$/g,"");
var _59c=new WebSocketExtension(ext);
_59c.enabled=true;
_59c.negotiated=true;
if(tmp.length>1){
var _59d=tmp[1].replace(/^\s+|\s+$/g,"");
if(_59d.length==8){
try{
var _59e=parseInt(_59d,16);
_594._controlFrames[_59e]=ext;
if(_55c.KAAZING_SEC_EXTENSION_REVALIDATE===ext){
_594._controlFramesBinary[_59e]=ext;
}
_59c.escape=_59d;
}
catch(e){
}
}
}
_594.parent._negotiatedExtensions[ext]=_59c;
}
}
}
this._listener.connectionOpened(_594,_595);
};
_593.handleTextMessageReceived=function(_59f,_5a0){
if(_59f._isEscape){
_59f._isEscape=false;
this._listener.textMessageReceived(_59f,_5a0);
return;
}
if(_5a0==null||_5a0.length<4){
this._listener.textMessageReceived(_59f,_5a0);
return;
}
var _5a1=_580(_5a0);
if(_59f._controlFrames[_5a1]!=null){
if(_5a0.length==4){
_59f._isEscape=true;
return;
}else{
_58b(this,_59f,_5a0,_5a1);
}
}else{
this._listener.textMessageReceived(_59f,_5a0);
}
};
_593.handleMessageReceived=function(_5a2,_5a3){
if(_5a2._isEscape){
_5a2._isEscape=false;
this._listener.binaryMessageReceived(_5a2,_5a3);
return;
}
if(typeof (_5a3.byteLength)!="undefined"){
var _5a4=_57d(_5a3);
if(_5a2._controlFramesBinary[_5a4]!=null){
if(_5a3.byteLength==4){
_5a2._isEscape=true;
return;
}else{
_58b(this,_5a2,String.fromCharCode.apply(null,new Uint8Array(_5a3,0)),_5a4);
}
}else{
this._listener.binaryMessageReceived(_5a2,_5a3);
}
}else{
if(_5a3.constructor==ByteBuffer){
if(_5a3==null||_5a3.limit<4){
this._listener.binaryMessageReceived(_5a2,_5a3);
return;
}
var _5a4=_578(_5a3,_5a3.position);
if(_5a2._controlFramesBinary[_5a4]!=null){
if(_5a3.limit==4){
_5a2._isEscape=true;
return;
}else{
_58b(this,_5a2,_5a3.getString(Charset.UTF8),_5a4);
}
}else{
this._listener.binaryMessageReceived(_5a2,_5a3);
}
}
}
};
_593.processTextMessage=function(_5a5,_5a6){
if(_5a6.length>=4){
var _5a7=_580(_5a6);
if(_5a5._escapeSequences[_5a7]!=null){
var _5a8=_5a6.slice(0,4);
this._nextHandler.processTextMessage(_5a5,_5a8);
}
}
this._nextHandler.processTextMessage(_5a5,_5a6);
};
_593.setNextHandler=function(_5a9){
var _5aa=this;
this._nextHandler=_5a9;
var _5ab=new _546(this);
_5ab.connectionOpened=function(_5ac,_5ad){
_5aa.handleConnectionOpened(_5ac,_5ad);
};
_5ab.textMessageReceived=function(_5ae,buf){
_5aa.handleTextMessageReceived(_5ae,buf);
};
_5ab.binaryMessageReceived=function(_5b0,buf){
_5aa.handleMessageReceived(_5b0,buf);
};
_5a9.setListener(_5ab);
};
_593.setListener=function(_5b2){
this._listener=_5b2;
};
return _577;
})();
var _5b3=(function(){
var _5b4=function(_5b5){
this.channel=_5b5;
};
var _5b6=function(_5b7){
var _5b8=_5b7.parent;
if(_5b8){
return (_5b8.readyState>=2);
}
return false;
};
var _5b9=_5b4.prototype;
_5b9.connect=function(_5ba){
if(_5b6(this.channel)){
return;
}
var _5bb=this;
var _5bc=new XMLHttpRequest0();
_5bc.withCredentials=true;
_5bc.open("GET",_5ba+"&.krn="+Math.random(),true);
if(_5bb.channel._challengeResponse!=null&&_5bb.channel._challengeResponse.credentials!=null){
_5bc.setRequestHeader("Authorization",_5bb.channel._challengeResponse.credentials);
this.clearAuthenticationData(_5bb.channel);
}
_5bc.onreadystatechange=function(){
switch(_5bc.readyState){
case 2:
if(_5bc.status==403){
_5bc.abort();
}
break;
case 4:
if(_5bc.status==401){
_5bb.handle401(_5bb.channel,_5ba,_5bc.getResponseHeader("WWW-Authenticate"));
return;
}
break;
}
};
_5bc.send(null);
};
_5b9.clearAuthenticationData=function(_5bd){
if(_5bd._challengeResponse!=null){
_5bd._challengeResponse.clearCredentials();
}
};
_5b9.handle401=function(_5be,_5bf,_5c0){
if(_5b6(_5be)){
return;
}
var _5c1=this;
var _5c2=_5bf;
if(_5c2.indexOf("/;a/")>0){
_5c2=_5c2.substring(0,_5c2.indexOf("/;a/"));
}else{
if(_5c2.indexOf("/;ae/")>0){
_5c2=_5c2.substring(0,_5c2.indexOf("/;ae/"));
}else{
if(_5c2.indexOf("/;ar/")>0){
_5c2=_5c2.substring(0,_5c2.indexOf("/;ar/"));
}
}
}
var _5c3=new ChallengeRequest(_5c2,_5c0);
var _5c4;
if(this.channel._challengeResponse.nextChallengeHandler!=null){
_5c4=this.channel._challengeResponse.nextChallengeHandler;
}else{
_5c4=_5be.challengeHandler;
}
if(_5c4!=null&&_5c4.canHandle(_5c3)){
_5c4.handle(_5c3,function(_5c5){
try{
if(_5c5!=null&&_5c5.credentials!=null){
_5c1.channel._challengeResponse=_5c5;
_5c1.connect(_5bf);
}
}
catch(e){
}
});
}
};
return _5b4;
})();
var _5c6=(function(){
var _5c7=function(){
};
var _5c8=_5c7.prototype=new _533();
_5c8.processConnect=function(_5c9,uri,_5cb){
if(_5c9.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
if(_5c9._delegate==null){
var _5cc=new _2e2();
_5cc.parent=_5c9;
_5c9._delegate=_5cc;
_5cd(_5cc,this);
}
_5c9._delegate.connect(uri.toString(),_5cb);
};
_5c8.processTextMessage=function(_5ce,text){
if(_5ce._delegate.readyState()==WebSocket.OPEN){
_5ce._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_5c8.processBinaryMessage=function(_5d0,obj){
if(_5d0._delegate.readyState()==WebSocket.OPEN){
_5d0._delegate.send(obj);
}else{
throw new Error("WebSocket is already closed");
}
};
_5c8.processClose=function(_5d2,code,_5d4){
try{
_5d2._delegate.close(code,_5d4);
}
catch(e){
}
};
_5c8.setIdleTimeout=function(_5d5,_5d6){
try{
_5d5._delegate.setIdleTimeout(_5d6);
}
catch(e){
}
};
var _5cd=function(_5d7,_5d8){
var _5d9=new _546(_5d8);
_5d7.setListener(_5d9);
};
return _5c7;
})();
var _5da=(function(){
var _5db=function(){
};
var _5dc=function(_5dd,_5de,_5df){
_5de._redirecting=true;
_5de._redirectUri=_5df;
_5dd._nextHandler.processClose(_5de);
};
var _5e0=_5db.prototype=new _533();
_5e0.processConnect=function(_5e1,uri,_5e3){
_5e1._balanced=0;
this._nextHandler.processConnect(_5e1,uri,_5e3);
};
_5e0.handleConnectionClosed=function(_5e4,_5e5,code,_5e7){
if(_5e4._redirecting==true){
_5e4._redirecting=false;
var _5e8=_5e4._redirectUri;
var _5e9=_5e4._location;
var _5ea=_5e4.parent;
var _5eb=_5ea.getRedirectPolicy();
if(_5eb instanceof HttpRedirectPolicy){
if(!_5eb.isRedirectionAllowed(_5e9.toString(),_5e8.toString())){
_5e4.preventFallback=true;
var s=_5eb.toString()+": Cannot redirect from "+_5e9.toString()+" to "+_5e8.toString();
this._listener.connectionClosed(_5e4,false,1006,s);
return;
}
}
_5e4._redirected=true;
_5e4.handshakePayload="";
var _5ed=[_55c.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_5e4._protocol.length;i++){
_5ed.push(_5e4._protocol[i]);
}
this.processConnect(_5e4,_5e4._redirectUri,_5ed);
}else{
this._listener.connectionClosed(_5e4,_5e5,code,_5e7);
}
};
_5e0.handleMessageReceived=function(_5ef,obj){
if(_5ef._balanced>1){
this._listener.binaryMessageReceived(_5ef,obj);
return;
}
var _5f1=_2bc(obj);
if(_5f1.charCodeAt(0)==61695){
if(_5f1.match("N$")){
_5ef._balanced++;
if(_5ef._balanced==1){
this._listener.connectionOpened(_5ef,_55c.KAAZING_EXTENDED_HANDSHAKE);
}else{
this._listener.connectionOpened(_5ef,_5ef._acceptedProtocol||"");
}
}else{
if(_5f1.indexOf("R")==1){
var _5f2=new _505(_5f1.substring(2));
_5dc(this,_5ef,_5f2);
}else{
}
}
return;
}else{
this._listener.binaryMessageReceived(_5ef,obj);
}
};
_5e0.setNextHandler=function(_5f3){
this._nextHandler=_5f3;
var _5f4=new _546(this);
var _5f5=this;
_5f4.connectionOpened=function(_5f6,_5f7){
if(_55c.KAAZING_EXTENDED_HANDSHAKE!=_5f7){
_5f6._balanced=2;
_5f5._listener.connectionOpened(_5f6,_5f7);
}
};
_5f4.textMessageReceived=function(_5f8,_5f9){
if(_5f8._balanced>1){
_5f5._listener.textMessageReceived(_5f8,_5f9);
return;
}
if(_5f9.charCodeAt(0)==61695){
if(_5f9.match("N$")){
_5f8._balanced++;
if(_5f8._balanced==1){
_5f5._listener.connectionOpened(_5f8,_55c.KAAZING_EXTENDED_HANDSHAKE);
}else{
_5f5._listener.connectionOpened(_5f8,"");
}
}else{
if(_5f9.indexOf("R")==1){
var _5fa=new _505(_5f9.substring(2));
_5dc(_5f5,_5f8,_5fa);
}else{
}
}
return;
}else{
_5f5._listener.textMessageReceived(_5f8,_5f9);
}
};
_5f4.binaryMessageReceived=function(_5fb,obj){
_5f5.handleMessageReceived(_5fb,obj);
};
_5f4.connectionClosed=function(_5fd,_5fe,code,_600){
_5f5.handleConnectionClosed(_5fd,_5fe,code,_600);
};
_5f3.setListener(_5f4);
};
_5e0.setListener=function(_601){
this._listener=_601;
};
return _5db;
})();
var _602=(function(){
var _603="Sec-WebSocket-Protocol";
var _604="Sec-WebSocket-Extensions";
var _605="Authorization";
var _606="WWW-Authenticate";
var _607="Set-Cookie";
var _608="GET";
var _609="HTTP/1.1";
var _60a=":";
var _60b=" ";
var _60c="\r\n";
var _60d=function(){
};
var _60e=function(_60f,_610){
var _611=new XMLHttpRequest0();
var path=_60f._location.getHttpEquivalentScheme()+"://"+_60f._location.getAuthority()+(_60f._location._uri.path||"");
path=path.replace(/[\/]?$/,"/;api/set-cookies");
_611.open("POST",path,true);
_611.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_611.send(_610);
};
var _613=function(_614,_615,_616){
var _617=[];
var _618=[];
_617.push("WebSocket-Protocol");
_618.push("");
_617.push(_603);
_618.push(_615._protocol.join(","));
var _619=[_55c.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT,_55c.KAAZING_SEC_EXTENSION_PING_PONG];
var ext=_615._extensions;
if(ext.length>0){
_619.push(ext);
}
_617.push(_604);
_618.push(_619.join(","));
_617.push(_605);
_618.push(_616);
var _61b=_61c(_615._location,_617,_618);
_614._nextHandler.processTextMessage(_615,_61b);
};
var _61c=function(_61d,_61e,_61f){
var _620=[];
_620.push(_608);
_620.push(_60b);
var path=[];
if(_61d._uri.path!=undefined){
path.push(_61d._uri.path);
}
if(_61d._uri.query!=undefined){
path.push("?");
path.push(_61d._uri.query);
}
_620.push(path.join(""));
_620.push(_60b);
_620.push(_609);
_620.push(_60c);
for(var i=0;i<_61e.length;i++){
var _623=_61e[i];
var _624=_61f[i];
if(_623!=null&&_624!=null){
_620.push(_623);
_620.push(_60a);
_620.push(_60b);
_620.push(_624);
_620.push(_60c);
}
}
_620.push(_60c);
var _625=_620.join("");
return _625;
};
var _626=function(_627,_628,s){
if(s.length>0){
_628.handshakePayload+=s;
return;
}
var _62a=_628.handshakePayload.split("\n");
_628.handshakePayload="";
var _62b="";
for(var i=_62a.length-1;i>=0;i--){
if(_62a[i].indexOf("HTTP/1.1")==0){
var temp=_62a[i].split(" ");
_62b=temp[1];
break;
}
}
if("101"==_62b){
var _62e=[];
var _62f="";
for(var i=0;i<_62a.length;i++){
var line=_62a[i];
if(line!=null&&line.indexOf(_604)==0){
_62e.push(line.substring(_604.length+2));
}else{
if(line!=null&&line.indexOf(_603)==0){
_62f=line.substring(_603.length+2);
}else{
if(line!=null&&line.indexOf(_607)==0){
_60e(_628,line.substring(_607.length+2));
}
}
}
}
_628._acceptedProtocol=_62f;
if(_62e.length>0){
var _631=[];
var _632=_62e.join(", ").split(", ");
for(var j=0;j<_632.length;j++){
var tmp=_632[j].split(";");
var ext=tmp[0].replace(/^\s+|\s+$/g,"");
var _636=new WebSocketExtension(ext);
if(_55c.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT===ext){
var _637=tmp[1].match(/\d+/)[0];
if(_637>0){
_627._nextHandler.setIdleTimeout(_628,_637);
}
continue;
}else{
if(_55c.KAAZING_SEC_EXTENSION_PING_PONG===ext){
try{
var _638=tmp[1].replace(/^\s+|\s+$/g,"");
var _639=parseInt(_638,16);
_628._controlFrames[_639]=ext;
_628._escapeSequences[_639]=ext;
continue;
}
catch(e){
throw new Error("failed to parse escape key for x-kaazing-ping-pong extension");
}
}else{
if(tmp.length>1){
var _638=tmp[1].replace(/^\s+|\s+$/g,"");
if(_638.length==8){
try{
var _639=parseInt(_638,16);
_628._controlFrames[_639]=ext;
if(_55c.KAAZING_SEC_EXTENSION_REVALIDATE===ext){
_628._controlFramesBinary[_639]=ext;
}
_636.escape=_638;
}
catch(e){
}
}
}
}
}
_636.enabled=true;
_636.negotiated=true;
_631.push(_632[j]);
}
if(_631.length>0){
_628.parent._negotiatedExtensions[ext]=_631.join(",");
}
}
return;
}else{
if("401"==_62b){
_628.handshakestatus=2;
var _63a="";
for(var i=0;i<_62a.length;i++){
if(_62a[i].indexOf(_606)==0){
_63a=_62a[i].substring(_606.length+2);
break;
}
}
_627._listener.authenticationRequested(_628,_628._location.toString(),_63a);
}else{
_627._listener.connectionFailed(_628);
}
}
};
var _63b=function(_63c,_63d){
try{
_63d.handshakestatus=3;
_63c._nextHandler.processClose(_63d);
}
finally{
_63c._listener.connectionFailed(_63d);
}
};
var _63e=_60d.prototype=new _533();
_63e.processConnect=function(_63f,uri,_641){
_63f.handshakePayload="";
var _642=[_55c.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_641.length;i++){
_642.push(_641[i]);
}
this._nextHandler.processConnect(_63f,uri,_642);
if((typeof (_63f.parent.connectTimer)=="undefined")||(_63f.parent.connectTimer==null)){
_63f.handshakestatus=0;
var _644=this;
setTimeout(function(){
if(_63f.handshakestatus==0){
_63b(_644,_63f);
}
},5000);
}
};
_63e.processAuthorize=function(_645,_646){
_613(this,_645,_646);
};
_63e.handleConnectionOpened=function(_647,_648){
if(_55c.KAAZING_EXTENDED_HANDSHAKE==_648){
_613(this,_647,null);
_647.handshakestatus=1;
if((typeof (_647.parent.connectTimer)=="undefined")||(_647.parent.connectTimer==null)){
var _649=this;
setTimeout(function(){
if(_647.handshakestatus<2){
_63b(_649,_647);
}
},5000);
}
}else{
_647.handshakestatus=2;
this._listener.connectionOpened(_647,_648);
}
};
_63e.handleMessageReceived=function(_64a,_64b){
if(_64a.readyState==WebSocket.OPEN){
_64a._isEscape=false;
this._listener.textMessageReceived(_64a,_64b);
}else{
_626(this,_64a,_64b);
}
};
_63e.handleBinaryMessageReceived=function(_64c,_64d){
if(_64c.readyState==WebSocket.OPEN){
_64c._isEscape=false;
this._listener.binaryMessageReceived(_64c,_64d);
}else{
_626(this,_64c,String.fromCharCode.apply(null,new Uint8Array(_64d)));
}
};
_63e.setNextHandler=function(_64e){
this._nextHandler=_64e;
var _64f=this;
var _650=new _546(this);
_650.connectionOpened=function(_651,_652){
_64f.handleConnectionOpened(_651,_652);
};
_650.textMessageReceived=function(_653,buf){
_64f.handleMessageReceived(_653,buf);
};
_650.binaryMessageReceived=function(_655,buf){
_64f.handleBinaryMessageReceived(_655,buf);
};
_650.connectionClosed=function(_657,_658,code,_65a){
if(_657.handshakestatus<3){
_657.handshakestatus=3;
}
_64f._listener.connectionClosed(_657,_658,code,_65a);
};
_650.connectionFailed=function(_65b){
if(_65b.handshakestatus<3){
_65b.handshakestatus=3;
}
_64f._listener.connectionFailed(_65b);
};
_64e.setListener(_650);
};
_63e.setListener=function(_65c){
this._listener=_65c;
};
return _60d;
})();
var _65d=(function(){
var _65e=function(){
};
var _65f=_65e.prototype=new _533();
_65f.handleClearAuthenticationData=function(_660){
if(_660._challengeResponse!=null){
_660._challengeResponse.clearCredentials();
}
};
_65f.handleRemoveAuthenticationData=function(_661){
this.handleClearAuthenticationData(_661);
_661._challengeResponse=new ChallengeResponse(null,null);
};
_65f.doError=function(_662){
this._nextHandler.processClose(_662);
this.handleClearAuthenticationData(_662);
this._listener.connectionFailed(_662);
};
_65f.handle401=function(_663,_664,_665){
var _666=this;
var _667=_663._location;
var _668=null;
if(typeof (_663.parent.connectTimer)!="undefined"){
_668=_663.parent.connectTimer;
if(_668!=null){
_668.pause();
}
}
if(_663.redirectUri!=null){
_667=_663._redirectUri;
}
if(_55c.KAAZING_SEC_EXTENSION_REVALIDATE==_665){
var ch=new _560(_667,_663._protocol,_663._isBinary);
ch.challengeHandler=_663.parent.challengeHandler;
ch.parent=_663.parent;
var _66a=new _5b3(ch);
_66a.connect(_664);
}else{
var _66b=new ChallengeRequest(_667.toString(),_665);
var _66c;
if(_663._challengeResponse.nextChallengeHandler!=null){
_66c=_663._challengeResponse.nextChallengeHandler;
}else{
_66c=_663.parent.challengeHandler;
}
if(_66c!=null&&_66c.canHandle(_66b)){
_66c.handle(_66b,function(_66d){
try{
if(_66d==null||_66d.credentials==null){
_666.doError(_663);
}else{
if(_668!=null){
_668.resume();
}
_663._challengeResponse=_66d;
_666._nextHandler.processAuthorize(_663,_66d.credentials);
}
}
catch(e){
_666.doError(_663);
}
});
}else{
this.doError(_663);
}
}
};
_65f.handleAuthenticate=function(_66e,_66f,_670){
_66e.authenticationReceived=true;
this.handle401(_66e,_66f,_670);
};
_65f.setNextHandler=function(_671){
this._nextHandler=_671;
var _672=this;
var _673=new _546(this);
_673.authenticationRequested=function(_674,_675,_676){
_672.handleAuthenticate(_674,_675,_676);
};
_671.setListener(_673);
};
_65f.setListener=function(_677){
this._listener=_677;
};
return _65e;
})();
var _678=(function(){
var _679=function(){
};
var _67a=_679.prototype=new _533();
_67a.processConnect=function(_67b,uri,_67d){
this._nextHandler.processConnect(_67b,uri,_67d);
};
_67a.processBinaryMessage=function(_67e,data){
if(data.constructor==ByteBuffer){
var _680=data.array.slice(data.position,data.limit);
this._nextHandler.processTextMessage(_67e,Charset.UTF8.encodeByteArray(_680));
}else{
if(data.byteLength){
this._nextHandler.processTextMessage(_67e,Charset.UTF8.encodeArrayBuffer(data));
}else{
if(data.size){
var _681=this;
var cb=function(_683){
_681._nextHandler.processBinaryMessage(_67e,Charset.UTF8.encodeByteArray(_683));
};
BlobUtils.asNumberArray(cb,data);
}else{
throw new Error("Invalid type for send");
}
}
}
};
_67a.setNextHandler=function(_684){
this._nextHandler=_684;
var _685=this;
var _686=new _546(this);
_686.textMessageReceived=function(_687,text){
_685._listener.binaryMessageReceived(_687,ByteBuffer.wrap(Charset.UTF8.toByteArray(text)));
};
_686.binaryMessageReceived=function(_689,buf){
throw new Error("draft76 won't receive binary frame");
};
_684.setListener(_686);
};
_67a.setListener=function(_68b){
this._listener=_68b;
};
return _679;
})();
var _68c=(function(){
var _68d=function(){
var _68e=new _65d();
return _68e;
};
var _68f=function(){
var _690=new _602();
return _690;
};
var _691=function(){
var _692=new _576();
return _692;
};
var _693=function(){
var _694=new _5da();
return _694;
};
var _695=function(){
var _696=new _5c6();
return _696;
};
var _697=function(){
var _698=new _678();
return _698;
};
var _699=(browser=="safari"&&typeof (WebSocket.CLOSING)=="undefined");
var _69a=_68d();
var _69b=_68f();
var _69c=_691();
var _69d=_693();
var _69e=_695();
var _69f=_697();
var _6a0=function(){
if(_699){
this.setNextHandler(_69f);
_69f.setNextHandler(_69a);
}else{
this.setNextHandler(_69a);
}
_69a.setNextHandler(_69b);
_69b.setNextHandler(_69c);
_69c.setNextHandler(_69d);
_69d.setNextHandler(_69e);
};
var _6a1=function(_6a2,_6a3){
};
var _6a4=_6a0.prototype=new _533();
_6a4.setNextHandler=function(_6a5){
this._nextHandler=_6a5;
var _6a6=new _546(this);
_6a5.setListener(_6a6);
};
_6a4.setListener=function(_6a7){
this._listener=_6a7;
};
return _6a0;
})();
var _6a8=(function(){
var _6a9=512*1024;
var _6aa=1;
var _6ab=function(_6ac,_6ad,_6ae){
this.sequence=_6ad;
this.retry=3000;
if(_6ac.indexOf("/;e/dtem/")>0){
this.requiresEscaping=true;
}
var _6af=new URI(_6ac);
var _6b0={"http":80,"https":443};
if(_6af.port==undefined){
_6af.port=_6b0[_6af.scheme];
_6af.authority=_6af.host+":"+_6af.port;
}
this.origin=_6af.scheme+"://"+_6af.authority;
this.location=_6ac;
this.activeXhr=null;
this.reconnectTimer=null;
this.idleTimer=null;
this.idleTimeout=null;
this.lastMessageTimestamp=null;
this.buf=new ByteBuffer();
this.connectTimer=null;
this.connectionTimeout=_6ae;
var _6b1=this;
setTimeout(function(){
connect(_6b1,true);
_6b1.activeXhr=_6b1.mostRecentXhr;
startProxyDetectionTimer(_6b1,_6b1.mostRecentXhr);
},0);
};
var _6b2=_6ab.prototype;
var _6b3=0;
var _6b4=255;
var _6b5=1;
var _6b6=128;
var _6b7=129;
var _6b8=127;
var _6b9=137;
var _6ba=3000;
_6b2.readyState=0;
function connect(_6bb,_6bc){
if(_6bb.reconnectTimer!==null){
_6bb.reconnectTimer=null;
}
stopIdleTimer(_6bb);
startConnectTimer(_6bb,_6bb.connectionTimeout);
var _6bd=new URI(_6bb.location);
var _6be=[];
var _6bf=_6bb.sequence++;
_6be.push(".ksn="+_6bf);
switch(browser){
case "ie":
_6be.push(".kns=1");
_6be.push(".kf=200&.kp=2048");
break;
case "safari":
_6be.push(".kp=256");
break;
case "firefox":
_6be.push(".kp=1025");
break;
case "android":
_6be.push(".kp=4096");
_6be.push(".kbp=4096");
break;
}
if(browser=="android"||browser.ios){
_6be.push(".kkt=20");
}
_6be.push(".kc=text/plain;charset=windows-1252");
_6be.push(".kb=4096");
_6be.push(".kid="+String(Math.random()).substring(2));
if(_6be.length>0){
if(_6bd.query===undefined){
_6bd.query=_6be.join("&");
}else{
_6bd.query+="&"+_6be.join("&");
}
}
var xhr=new XMLHttpRequest0();
xhr.id=_6aa++;
xhr.position=0;
xhr.opened=false;
xhr.reconnect=false;
xhr.requestClosing=false;
xhr.onreadystatechange=function(){
if(xhr.readyState==3){
stopConnectTimer(_6bb);
if(_6bb.idleTimer==null){
var _6c1=xhr.getResponseHeader("X-Idle-Timeout");
if(_6c1){
if(!_6c1.match(/^[\d]+$/)){
doError(_6bb);
throw "Invalid response of header X-Idle-Timeout";
}
var _6c2=parseInt(_6c1);
if(_6c2>0){
_6c2=_6c2*1000;
_6bb.idleTimeout=_6c2;
_6bb.lastMessageTimestamp=new Date().getTime();
startIdleTimer(_6bb,_6c2);
}
}
}
}
};
xhr.onprogress=function(){
if(xhr==_6bb.activeXhr&&_6bb.readyState!=2){
_process(_6bb);
}
};
xhr.onload=function(){
if(xhr==_6bb.activeXhr&&_6bb.readyState!=2){
_process(_6bb);
xhr.onerror=function(){
};
xhr.ontimeout=function(){
};
xhr.onreadystatechange=function(){
};
if(!xhr.reconnect){
doError(_6bb);
}else{
if(xhr.requestClosing){
doClose(_6bb);
}else{
if(_6bb.activeXhr==_6bb.mostRecentXhr){
connect(_6bb);
_6bb.activeXhr=_6bb.mostRecentXhr;
startProxyDetectionTimer(_6bb,_6bb.activeXhr);
}else{
var _6c3=_6bb.mostRecentXhr;
_6bb.activeXhr=_6c3;
switch(_6c3.readyState){
case 1:
case 2:
startProxyDetectionTimer(_6bb,_6c3);
break;
case 3:
_process(_6bb);
break;
case 4:
_6bb.activeXhr.onload();
break;
default:
}
}
}
}
}
};
xhr.ontimeout=function(){
doError(_6bb);
};
xhr.onerror=function(){
doError(_6bb);
};
xhr.open("GET",_6bd.toString(),true);
xhr.send("");
_6bb.mostRecentXhr=xhr;
};
function startProxyDetectionTimer(_6c4,xhr){
if(_6c4.location.indexOf(".ki=p")==-1){
setTimeout(function(){
if(xhr&&xhr.readyState<3&&_6c4.readyState<2){
if(_6c4.location.indexOf("?")==-1){
_6c4.location+="?.ki=p";
}else{
_6c4.location+="&.ki=p";
}
connect(_6c4,false);
}
},_6ba);
}
};
_6b2.disconnect=function(){
if(this.readyState!==2){
_disconnect(this);
}
};
function _disconnect(_6c6){
if(_6c6.reconnectTimer!==null){
clearTimeout(_6c6.reconnectTimer);
_6c6.reconnectTimer=null;
}
stopIdleTimer(_6c6);
if(_6c6.mostRecentXhr!==null){
_6c6.mostRecentXhr.onprogress=function(){
};
_6c6.mostRecentXhr.onload=function(){
};
_6c6.mostRecentXhr.onerror=function(){
};
_6c6.mostRecentXhr.abort();
}
if(_6c6.activeXhr!=_6c6.mostRecentXhr&&_6c6.activeXhr!==null){
_6c6.activeXhr.onprogress=function(){
};
_6c6.activeXhr.onload=function(){
};
_6c6.activeXhr.onerror=function(){
};
_6c6.activeXhr.abort();
}
_6c6.lineQueue=[];
_6c6.lastEventId=null;
_6c6.location=null;
_6c6.readyState=2;
};
function _process(_6c7){
_6c7.lastMessageTimestamp=new Date().getTime();
var xhr=_6c7.activeXhr;
var _6c9=xhr.responseText;
if(_6c9.length>=_6a9){
if(_6c7.activeXhr==_6c7.mostRecentXhr){
connect(_6c7,false);
}
}
var _6ca=_6c9.slice(xhr.position);
xhr.position=_6c9.length;
var buf=_6c7.buf;
var _6cc=_494.toArray(_6ca,_6c7.requiresEscaping);
if(_6cc.hasRemainder){
xhr.position--;
}
buf.position=buf.limit;
buf.putBytes(_6cc);
buf.position=0;
buf.mark();
parse:
while(true){
if(!buf.hasRemaining()){
break;
}
var type=buf.getUnsigned();
switch(type&128){
case _6b3:
var _6ce=buf.indexOf(_6b4);
if(_6ce==-1){
break parse;
}
var _6cf=buf.array.slice(buf.position,_6ce);
var data=new ByteBuffer(_6cf);
var _6d1=_6ce-buf.position;
buf.skip(_6d1+1);
buf.mark();
if(type==_6b5){
handleCommandFrame(_6c7,data);
}else{
dispatchText(_6c7,data.getString(Charset.UTF8));
}
break;
case _6b6:
case _6b7:
var _6d2=0;
var _6d3=false;
while(buf.hasRemaining()){
var b=buf.getUnsigned();
_6d2=_6d2<<7;
_6d2|=(b&127);
if((b&128)!=128){
_6d3=true;
break;
}
}
if(!_6d3){
break parse;
}
if(buf.remaining()<_6d2){
break parse;
}
var _6d5=buf.array.slice(buf.position,buf.position+_6d2);
var _6d6=new ByteBuffer(_6d5);
buf.skip(_6d2);
buf.mark();
if(type==_6b6){
dispatchBytes(_6c7,_6d6);
}else{
if(type==_6b9){
dispatchPingReceived(_6c7);
}else{
dispatchText(_6c7,_6d6.getString(Charset.UTF8));
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
function handleCommandFrame(_6d7,data){
while(data.remaining()){
var _6d9=String.fromCharCode(data.getUnsigned());
switch(_6d9){
case "0":
break;
case "1":
_6d7.activeXhr.reconnect=true;
break;
case "2":
_6d7.activeXhr.requestClosing=true;
break;
default:
throw new Error("Protocol decode error. Unknown command: "+_6d9);
}
}
};
function dispatchBytes(_6da,buf){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=_6da.lastEventId;
e.data=buf;
e.decoder=_2b5;
e.origin=_6da.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_6da.onmessage)==="function"){
_6da.onmessage(e);
}
};
function dispatchText(_6dd,data){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=_6dd.lastEventId;
e.text=data;
e.origin=_6dd.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_6dd.onmessage)==="function"){
_6dd.onmessage(e);
}
};
function dispatchPingReceived(_6e0){
if(typeof (_6e0.onping)==="function"){
_6e0.onping();
}
};
function doClose(_6e1){
doError(_6e1);
};
function doError(_6e2){
if(_6e2.readyState!=2){
_6e2.disconnect();
fireError(_6e2);
}
};
function fireError(_6e3){
var e=document.createEvent("Events");
e.initEvent("error",true,true);
if(typeof (_6e3.onerror)==="function"){
_6e3.onerror(e);
}
};
function startIdleTimer(_6e5,_6e6){
stopIdleTimer(_6e5);
_6e5.idleTimer=setTimeout(function(){
idleTimerHandler(_6e5);
},_6e6);
};
function idleTimerHandler(_6e7){
var _6e8=new Date().getTime();
var _6e9=_6e8-_6e7.lastMessageTimestamp;
var _6ea=_6e7.idleTimeout;
if(_6e9>_6ea){
doError(_6e7);
}else{
startIdleTimer(_6e7,_6ea-_6e9);
}
};
function stopIdleTimer(_6eb){
if(_6eb.idleTimer!=null){
clearTimeout(_6eb.idleTimer);
_6eb.idleTimer=null;
}
};
function startConnectTimer(_6ec,_6ed){
stopConnectTimer(_6ec);
_6ec.connectTimer=setTimeout(function(){
connectTimerHandler(_6ec);
},_6ed);
};
function connectTimerHandler(_6ee){
doError(_6ee);
};
function stopConnectTimer(_6ef){
if(_6ef.connectTimer!=null){
clearTimeout(_6ef.connectTimer);
_6ef.connectTimer=null;
}
};
return _6ab;
})();
var _6f0=(function(){
var _6f1=function(){
this.parent;
this._listener;
this.closeCode=1005;
this.closeReason="";
this.sequence=0;
};
var _6f2=_6f1.prototype;
_6f2.connect=function(_6f3,_6f4){
this.URL=_6f3.replace("ws","http");
this.protocol=_6f4;
this._prepareQueue=new _4ed();
this._sendQueue=[];
_6f5(this);
};
_6f2.readyState=0;
_6f2.bufferedAmount=0;
_6f2.URL="";
_6f2.onopen=function(){
};
_6f2.onerror=function(){
};
_6f2.onmessage=function(_6f6){
};
_6f2.onclose=function(){
};
var _6f7=128;
var _6f8=129;
var _6f9=0;
var _6fa=255;
var _6fb=1;
var _6fc=138;
var _6fd=[_6fb,48,49,_6fa];
var _6fe=[_6fb,48,50,_6fa];
var _6ff=function(buf,_701){
var _702=0;
var _703=0;
do{
_703<<=8;
_703|=(_701&127);
_701>>=7;
_702++;
}while(_701>0);
do{
var _704=_703&255;
_703>>=8;
if(_702!=1){
_704|=128;
}
buf.put(_704);
}while(--_702>0);
};
_6f2.send=function(data){
var _706=this;
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
case 1:
if(data===null){
throw new Error("data is null");
}
var buf=new ByteBuffer();
if(typeof data=="string"){
var _708=new ByteBuffer();
_708.putString(data,Charset.UTF8);
buf.put(_6f8);
_6ff(buf,_708.position);
buf.putBytes(_708.array);
}else{
if(data.constructor==ByteBuffer){
buf.put(_6f7);
_6ff(buf,data.remaining());
buf.putBuffer(data);
}else{
if(data.byteLength){
buf.put(_6f7);
_6ff(buf,data.byteLength);
buf.putByteArray(data);
}else{
if(data.size){
var cb=this._prepareQueue.enqueue(function(_70a){
var b=new ByteBuffer();
b.put(_6f7);
_6ff(b,_70a.length);
b.putBytes(_70a);
b.flip();
doSend(_706,b);
});
BlobUtils.asNumberArray(cb,data);
return true;
}else{
throw new Error("Invalid type for send");
}
}
}
}
buf.flip();
this._prepareQueue.enqueue(function(_70c){
doSend(_706,buf);
})();
return true;
case 2:
return false;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_6f2.close=function(code,_70e){
switch(this.readyState){
case 0:
_70f(this);
break;
case 1:
if(code!=null&&code!=0){
this.closeCode=code;
this.closeReason=_70e;
}
doSend(this,new ByteBuffer(_6fe));
break;
}
};
_6f2.setListener=function(_710){
this._listener=_710;
};
function openUpstream(_711){
if(_711.readyState!=1){
return;
}
var xdr=new XMLHttpRequest0();
xdr.onreadystatechange=function(){
if(xdr.readyState==4){
switch(xdr.status){
case 200:
setTimeout(function(){
doFlush(_711);
},0);
break;
}
}
};
xdr.onload=function(){
openUpstream(_711);
};
xdr.ontimeout=function(){
if(_711.upstreamXHR!=null){
_711.upstreamXHR.abort();
}
openUpstream(_711);
};
xdr.onerror=function(){
if(_711._downstream){
_711._downstream.disconnect();
}
_70f(_711);
};
var url=appendRandomNumberQueryString(_711._upstream);
xdr.open("POST",url,true);
_711.upstreamXHR=xdr;
};
function doSend(_714,buf){
_714.bufferedAmount+=buf.remaining();
_714._sendQueue.push(buf);
_716(_714);
if(!_714._writeSuspended){
doFlush(_714);
}
};
function appendRandomNumberQueryString(url){
var _718=".krn="+Math.random();
url+=((url.indexOf("?")==-1)?"?":"&")+_718;
return url;
};
function doFlush(_719){
var _71a=_719._sendQueue;
var _71b=_71a.length;
_719._writeSuspended=(_71b>0);
if(_71b>0){
var _71c=_719.sequence++;
if(_719.useXDR){
if(_719.upstreamXHR==null){
openUpstream(_719);
}
var out=new ByteBuffer();
while(_71a.length){
out.putBuffer(_71a.shift());
}
out.putBytes(_6fd);
out.flip();
_719.upstreamXHR.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_719.upstreamXHR.setRequestHeader("X-Sequence-No",_71c.toString());
_719.upstreamXHR.send(_2d0(out,_719.requiresEscaping));
}else{
var xhr=new XMLHttpRequest0();
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
switch(xhr.status){
case 200:
setTimeout(function(){
doFlush(_719);
},0);
break;
default:
_70f(_719);
break;
}
}
};
xhr.onerror=function(){
if(_719._downstream){
_719._downstream.disconnect();
}
_70f(_719);
};
var url=appendRandomNumberQueryString(_719._upstream);
xhr.open("POST",url,true);
var out=new ByteBuffer();
while(_71a.length){
out.putBuffer(_71a.shift());
}
out.putBytes(_6fd);
out.flip();
xhr.setRequestHeader("X-Sequence-No",_71c.toString());
if(browser=="firefox"){
if(xhr.sendAsBinary){
xhr.setRequestHeader("Content-Type","application/octet-stream");
xhr.sendAsBinary(_2d0(out));
}else{
xhr.send(_2d0(out));
}
}else{
xhr.setRequestHeader("Content-Type","text/plain; charset=utf-8");
xhr.send(_2d0(out,_719.requiresEscaping));
}
}
}
_719.bufferedAmount=0;
_716(_719);
};
var _6f5=function(_720){
var url=new URI(_720.URL);
url.scheme=url.scheme.replace("ws","http");
if(browser=="ie"&&typeof (XDomainRequest)!=="undefined"&&location.protocol.replace(":","")==url.scheme){
_720.useXDR=true;
}
switch(browser){
case "opera":
_720.requiresEscaping=true;
break;
case "ie":
if(!_720.useXDR){
_720.requiresEscaping=true;
}else{
if((typeof (Object.defineProperties)==="undefined")&&(navigator.userAgent.indexOf("MSIE 8")>0)){
_720.requiresEscaping=true;
}else{
_720.requiresEscaping=false;
}
}
break;
default:
_720.requiresEscaping=false;
break;
}
var _722=_720.requiresEscaping?"/;e/ctem":"/;e/ctm";
url.path=url.path.replace(/[\/]?$/,_722);
var _723=url.toString();
var _724=_723.indexOf("?");
if(_724==-1){
_723+="?";
}else{
_723+="&";
}
_723+=".kn="+String(Math.random()).substring(2);
var _725=new XMLHttpRequest0();
var _726=false;
_725.withCredentials=true;
_725.open("GET",_723,true);
_725.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_725.setRequestHeader("X-WebSocket-Version","wseb-1.0");
_725.setRequestHeader("X-Accept-Commands","ping");
var _727=_720.sequence++;
_725.setRequestHeader("X-Sequence-No",_727.toString());
if(_720.protocol.length){
var _728=_720.protocol.join(",");
_725.setRequestHeader("X-WebSocket-Protocol",_728);
}
for(var i=0;i<_720.parent.requestHeaders.length;i++){
var _72a=_720.parent.requestHeaders[i];
_725.setRequestHeader(_72a.label,_72a.value);
}
_725.onerror=function(){
doError(_720);
};
_725.onredirectallowed=function(_72b,_72c){
var _72d=_720.parent.parent;
var _72e=_72d.getRedirectPolicy();
if((typeof (_72e)!="undefined")&&(_72e!=null)){
if(!_72e.isRedirectionAllowed(_72b,_72c)){
_725.statusText=_72e.toString()+": Cannot redirect from "+_72b+" to "+_72c;
_720.closeCode=1006;
_720.closeReason=_725.statusText;
_720.parent.closeCode=_720.closeCode;
_720.parent.closeReason=_720.closeReason;
_720.parent.preventFallback=true;
doError(_720);
return false;
}
}
return true;
};
_725.onreadystatechange=function(){
switch(_725.readyState){
case 2:
if(_725.status==403){
doError(_720);
}else{
var _72f=_720.parent.parent._webSocket.connectTimeout;
if(_72f==0){
_72f=5000;
}
timer=setTimeout(function(){
if(!_726){
doError(_720);
}
},_72f);
}
break;
case 3:
break;
case 4:
_726=true;
if(_725.status==401){
_720._listener.authenticationRequested(_720.parent,_725.xhr._location,_725.getResponseHeader("WWW-Authenticate"));
return;
}
if(_720.readyState<1){
if(_725.status==201){
_720.parent.responseHeaders[_55c.HEADER_SEC_PROTOCOL]=_725.getResponseHeader(_55c.HEADER_SEC_PROTOCOL);
_720.parent.responseHeaders[_55c.HEADER_SEC_EXTENSIONS]=_725.getResponseHeader(_55c.HEADER_SEC_EXTENSIONS);
var _730=10*1000;
var _731=_725.getResponseHeader(_55c.HEADER_SEC_EXTENSIONS);
if(_731){
var _732=_731.split(",");
for(var j=0;j<_732.length;j++){
var _734=_732[j].split(";");
var _735=_734[0].replace(/^\s+|\s+$/g,"");
if(_55c.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT===_735){
_730=_734[1].match(/\d+/)[0];
break;
}
}
}
var _736=_725.responseText.split("\n");
var _737=_736[0];
var _738=_736[1];
var _739=new URI(_725.xhr._location);
var _73a=new URI(_737);
var _73b=new URI(_738);
if(_739.host.toLowerCase()!=_73a.host.toLowerCase()){
throw new Error("Hostname in original URI does not match with the hostname in the upstream URI.");
}
if(_739.host.toLowerCase()!=_73b.host.toLowerCase()){
throw new Error("Hostname in original URI does not match with the hostname in the downstream URI.");
}
_720._upstream=_739.scheme+"://"+_739.authority+_73a.path;
_720._downstream=new _6a8(_738,_720.sequence,_730);
var _73c=_738.substring(0,_738.indexOf("/;e/"));
if(_73c!=_720.parent._location.toString().replace("ws","http")){
_720.parent._redirectUri=_73c;
}
_73d(_720,_720._downstream);
_73e(_720);
}else{
doError(_720);
}
}
break;
}
};
_725.send(null);
};
var _73e=function(_73f){
_73f.readyState=1;
var _740=_73f.parent;
_740._acceptedProtocol=_740.responseHeaders["X-WebSocket-Protocol"]||"";
if(_73f.useXDR){
this.upstreamXHR=null;
openUpstream(_73f);
}
_73f._listener.connectionOpened(_73f.parent,_740._acceptedProtocol);
};
function doError(_741){
if(_741.readyState<2){
_741.readyState=2;
if(_741.upstreamXHR!=null){
_741.upstreamXHR.abort();
}
if(_741.onerror!=null){
_741._listener.connectionFailed(_741.parent);
}
}
};
var _70f=function(_742,_743,code,_745){
switch(_742.readyState){
case 2:
break;
case 0:
case 1:
_742.readyState=WebSocket.CLOSED;
if(_742.upstreamXHR!=null){
_742.upstreamXHR.abort();
}
if(typeof _743==="undefined"){
_742._listener.connectionClosed(_742.parent,true,1005,"");
}else{
_742._listener.connectionClosed(_742.parent,_743,code,_745);
}
break;
default:
}
};
var _716=function(_746){
};
var _747=function(_748,_749){
if(_749.text){
_748._listener.textMessageReceived(_748.parent,_749.text);
}else{
if(_749.data){
_748._listener.binaryMessageReceived(_748.parent,_749.data);
}
}
};
var _74a=function(_74b){
var _74c=ByteBuffer.allocate(2);
_74c.put(_6fc);
_74c.put(0);
_74c.flip();
doSend(_74b,_74c);
};
var _73d=function(_74d,_74e){
_74e.onmessage=function(_74f){
switch(_74f.type){
case "message":
if(_74d.readyState==1){
_747(_74d,_74f);
}
break;
}
};
_74e.onping=function(){
if(_74d.readyState==1){
_74a(_74d);
}
};
_74e.onerror=function(){
try{
_74e.disconnect();
}
finally{
_70f(_74d,true,_74d.closeCode,_74d.closeReason);
}
};
_74e.onclose=function(_750){
try{
_74e.disconnect();
}
finally{
_70f(_74d,true,this.closeCode,this.closeReason);
}
};
};
return _6f1;
})();
var _751=(function(){
var _752=function(){
};
var _753=_752.prototype=new _533();
_753.processConnect=function(_754,uri,_756){
if(_754.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
var _757=!!window.MockWseTransport?new MockWseTransport():new _6f0();
_757.parent=_754;
_754._delegate=_757;
_758(_757,this);
_757.connect(uri.toString(),_756);
};
_753.processTextMessage=function(_759,text){
if(_759.readyState==WebSocket.OPEN){
_759._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_753.processBinaryMessage=function(_75b,obj){
if(_75b.readyState==WebSocket.OPEN){
_75b._delegate.send(obj);
}else{
throw new Error("WebSocket is already closed");
}
};
_753.processClose=function(_75d,code,_75f){
try{
_75d._delegate.close(code,_75f);
}
catch(e){
listener.connectionClosed(_75d);
}
};
var _758=function(_760,_761){
var _762=new _546(_761);
_760.setListener(_762);
};
return _752;
})();
var _763=(function(){
var _764=function(){
};
var _765=_764.prototype=new _533();
_765.handleClearAuthenticationData=function(_766){
if(_766._challengeResponse!=null){
_766._challengeResponse.clearCredentials();
}
};
_765.handleRemoveAuthenticationData=function(_767){
this.handleClearAuthenticationData(_767);
_767._challengeResponse=new ChallengeResponse(null,null);
};
_765.handle401=function(_768,_769,_76a){
var _76b=this;
var _76c=null;
if(typeof (_768.parent.connectTimer)!="undefined"){
_76c=_768.parent.connectTimer;
if(_76c!=null){
_76c.pause();
}
}
if(_55c.KAAZING_SEC_EXTENSION_REVALIDATE==_76a){
var _76d=new _5b3(_768);
_768.challengeHandler=_768.parent.challengeHandler;
_76d.connect(_769);
}else{
var _76e=_769;
if(_76e.indexOf("/;e/")>0){
_76e=_76e.substring(0,_76e.indexOf("/;e/"));
}
var _76f=new _505(_76e.replace("http","ws"));
var _770=new ChallengeRequest(_76e,_76a);
var _771;
if(_768._challengeResponse.nextChallengeHandler!=null){
_771=_768._challengeResponse.nextChallengeHandler;
}else{
_771=_768.parent.challengeHandler;
}
if(_771!=null&&_771.canHandle(_770)){
_771.handle(_770,function(_772){
try{
if(_772==null||_772.credentials==null){
_76b.handleClearAuthenticationData(_768);
_76b._listener.connectionFailed(_768);
}else{
if(_76c!=null){
_76c.resume();
}
_768._challengeResponse=_772;
_76b.processConnect(_768,_76f,_768._protocol);
}
}
catch(e){
_76b.handleClearAuthenticationData(_768);
_76b._listener.connectionFailed(_768);
}
});
}else{
this.handleClearAuthenticationData(_768);
this._listener.connectionFailed(_768);
}
}
};
_765.processConnect=function(_773,_774,_775){
if(_773._challengeResponse!=null&&_773._challengeResponse.credentials!=null){
var _776=_773._challengeResponse.credentials.toString();
for(var i=_773.requestHeaders.length-1;i>=0;i--){
if(_773.requestHeaders[i].label==="Authorization"){
_773.requestHeaders.splice(i,1);
}
}
var _778=new _4f7("Authorization",_776);
for(var i=_773.requestHeaders.length-1;i>=0;i--){
if(_773.requestHeaders[i].label==="Authorization"){
_773.requestHeaders.splice(i,1);
}
}
_773.requestHeaders.push(_778);
this.handleClearAuthenticationData(_773);
}
this._nextHandler.processConnect(_773,_774,_775);
};
_765.handleAuthenticate=function(_779,_77a,_77b){
_779.authenticationReceived=true;
this.handle401(_779,_77a,_77b);
};
_765.setNextHandler=function(_77c){
this._nextHandler=_77c;
var _77d=new _546(this);
var _77e=this;
_77d.authenticationRequested=function(_77f,_780,_781){
_77e.handleAuthenticate(_77f,_780,_781);
};
_77c.setListener(_77d);
};
_765.setListener=function(_782){
this._listener=_782;
};
return _764;
})();
var _783=(function(){
var _784=new _763();
var _785=new _576();
var _786=new _751();
var _787=function(){
this.setNextHandler(_784);
_784.setNextHandler(_785);
_785.setNextHandler(_786);
};
var _788=_787.prototype=new _533();
_788.processConnect=function(_789,_78a,_78b){
var _78c=[];
for(var i=0;i<_78b.length;i++){
_78c.push(_78b[i]);
}
var _78e=[];
_78e.push(_789._extensions);
_78e.push(_55c.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT);
_789.requestHeaders.push(new _4f7(_55c.HEADER_SEC_EXTENSIONS,_78e.join(",")));
this._nextHandler.processConnect(_789,_78a,_78c);
};
_788.setNextHandler=function(_78f){
this._nextHandler=_78f;
var _790=this;
var _791=new _546(this);
_791.commandMessageReceived=function(_792,_793){
if(_793=="CloseCommandMessage"&&_792.readyState==1){
}
_790._listener.commandMessageReceived(_792,_793);
};
_78f.setListener(_791);
};
_788.setListener=function(_794){
this._listener=_794;
};
return _787;
})();
var _795=(function(){
var _796=function(){
};
var _797=_796.prototype=new _533();
_797.processConnect=function(_798,uri,_79a){
if(_798.readyState==2){
throw new Error("WebSocket is already closed");
}
var _79b=new _312();
_79b.parent=_798;
_798._delegate=_79b;
_79c(_79b,this);
_79b.connect(uri.toString(),_79a);
};
_797.processTextMessage=function(_79d,text){
if(_79d.readyState==1){
_79d._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_797.processBinaryMessage=function(_79f,_7a0){
if(_79f.readyState==1){
_79f._delegate.send(_7a0);
}else{
throw new Error("WebSocket is already closed");
}
};
_797.processClose=function(_7a1,code,_7a3){
_7a1._delegate.close(code,_7a3);
};
var _79c=function(_7a4,_7a5){
var _7a6=new _546(_7a5);
_7a4.setListener(_7a6);
_7a6.redirected=function(_7a7,_7a8){
_7a7._redirectUri=_7a8;
};
};
return _796;
})();
var _7a9=(function(){
var _7aa=function(){
var _7ab=new _763();
return _7ab;
};
var _7ac=function(){
var _7ad=new _576();
return _7ad;
};
var _7ae=function(){
var _7af=new _795();
return _7af;
};
var _7b0=_7aa();
var _7b1=_7ac();
var _7b2=_7ae();
var _7b3=function(){
this.setNextHandler(_7b0);
_7b0.setNextHandler(_7b1);
_7b1.setNextHandler(_7b2);
};
var _7b4=_7b3.prototype=new _533();
_7b4.processConnect=function(_7b5,_7b6,_7b7){
var _7b8=[_55c.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_7b7.length;i++){
_7b8.push(_7b7[i]);
}
var _7ba=_7b5._extensions;
if(_7ba.length>0){
_7b5.requestHeaders.push(new _4f7(_55c.HEADER_SEC_EXTENSIONS,_7ba.join(";")));
}
this._nextHandler.processConnect(_7b5,_7b6,_7b8);
};
_7b4.setNextHandler=function(_7bb){
this._nextHandler=_7bb;
var _7bc=new _546(this);
_7bb.setListener(_7bc);
};
_7b4.setListener=function(_7bd){
this._listener=_7bd;
};
return _7b3;
})();
var _7be=(function(){
var _7bf;
var _7c0=function(){
_7bf=this;
};
var _7c1=_7c0.prototype=new _533();
_7c1.processConnect=function(_7c2,uri,_7c4){
if(_7c2.readyState==2){
throw new Error("WebSocket is already closed");
}
var _7c5=new _342();
_7c5.parent=_7c2;
_7c2._delegate=_7c5;
_7c6(_7c5,this);
_7c5.connect(uri.toString(),_7c4);
};
_7c1.processTextMessage=function(_7c7,text){
if(_7c7.readyState==1){
_7c7._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_7c1.processBinaryMessage=function(_7c9,_7ca){
if(_7c9.readyState==1){
_7c9._delegate.send(_7ca);
}else{
throw new Error("WebSocket is already closed");
}
};
_7c1.processClose=function(_7cb,code,_7cd){
_7cb._delegate.close(code,_7cd);
};
var _7c6=function(_7ce,_7cf){
var _7d0=new _546(_7cf);
_7d0.redirected=function(_7d1,_7d2){
_7d1._redirectUri=_7d2;
};
_7ce.setListener(_7d0);
};
return _7c0;
})();
var _7d3=(function(){
var _7d4=function(){
var _7d5=new _763();
return _7d5;
};
var _7d6=function(){
var _7d7=new _576();
return _7d7;
};
var _7d8=function(){
var _7d9=new _7be();
return _7d9;
};
var _7da=_7d4();
var _7db=_7d6();
var _7dc=_7d8();
var _7dd=function(){
this.setNextHandler(_7da);
_7da.setNextHandler(_7db);
_7db.setNextHandler(_7dc);
};
var _7de=function(_7df,_7e0){
};
var _7e1=_7dd.prototype=new _533();
_7e1.setNextHandler=function(_7e2){
this._nextHandler=_7e2;
var _7e3=new _546(this);
_7e2.setListener(_7e3);
};
_7e1.setListener=function(_7e4){
this._listener=_7e4;
};
return _7dd;
})();
var _7e5=(function(){
var _7e6=function(){
};
var _7e7=_7e6.prototype=new _533();
_7e7.processConnect=function(_7e8,uri,_7ea){
if(_7e8.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
this._nextHandler.processConnect(_7e8,uri,_7ea);
};
_7e7.handleConnectionOpened=function(_7eb,_7ec){
var _7ed=_7eb;
if(_7ed.readyState==WebSocket.CONNECTING){
_7ed.readyState=WebSocket.OPEN;
this._listener.connectionOpened(_7eb,_7ec);
}
};
_7e7.handleMessageReceived=function(_7ee,_7ef){
if(_7ee.readyState!=WebSocket.OPEN){
return;
}
this._listener.textMessageReceived(_7ee,_7ef);
};
_7e7.handleBinaryMessageReceived=function(_7f0,_7f1){
if(_7f0.readyState!=WebSocket.OPEN){
return;
}
this._listener.binaryMessageReceived(_7f0,_7f1);
};
_7e7.handleConnectionClosed=function(_7f2,_7f3,code,_7f5){
var _7f6=_7f2;
if(_7f6.readyState!=WebSocket.CLOSED){
_7f6.readyState=WebSocket.CLOSED;
this._listener.connectionClosed(_7f2,_7f3,code,_7f5);
}
};
_7e7.handleConnectionFailed=function(_7f7){
if(_7f7.readyState!=WebSocket.CLOSED){
_7f7.readyState=WebSocket.CLOSED;
this._listener.connectionFailed(_7f7);
}
};
_7e7.handleConnectionError=function(_7f8,e){
this._listener.connectionError(_7f8,e);
};
_7e7.setNextHandler=function(_7fa){
this._nextHandler=_7fa;
var _7fb={};
var _7fc=this;
_7fb.connectionOpened=function(_7fd,_7fe){
_7fc.handleConnectionOpened(_7fd,_7fe);
};
_7fb.redirected=function(_7ff,_800){
throw new Error("invalid event received");
};
_7fb.authenticationRequested=function(_801,_802,_803){
throw new Error("invalid event received");
};
_7fb.textMessageReceived=function(_804,buf){
_7fc.handleMessageReceived(_804,buf);
};
_7fb.binaryMessageReceived=function(_806,buf){
_7fc.handleBinaryMessageReceived(_806,buf);
};
_7fb.connectionClosed=function(_808,_809,code,_80b){
_7fc.handleConnectionClosed(_808,_809,code,_80b);
};
_7fb.connectionFailed=function(_80c){
_7fc.handleConnectionFailed(_80c);
};
_7fb.connectionError=function(_80d,e){
_7fc.handleConnectionError(_80d,e);
};
_7fa.setListener(_7fb);
};
_7e7.setListener=function(_80f){
this._listener=_80f;
};
return _7e6;
})();
var _810=(function(){
var _811=function(_812,_813,_814){
this._nativeEquivalent=_812;
this._handler=_813;
this._channelFactory=_814;
};
return _811;
})();
var _815=(function(){
var _816="javascript:ws";
var _817="javascript:wss";
var _818="javascript:wse";
var _819="javascript:wse+ssl";
var _81a="flash:wse";
var _81b="flash:wse+ssl";
var _81c="flash:wsr";
var _81d="flash:wsr+ssl";
var _81e={};
var _81f={};
var _820=new _56b();
var _821=new _564();
var _822=true;
var _823={};
if(Object.defineProperty){
try{
Object.defineProperty(_823,"prop",{get:function(){
return true;
}});
_822=false;
}
catch(e){
}
}
var _824=function(){
this._handlerListener=createListener(this);
this._nativeHandler=createNativeHandler(this);
this._emulatedHandler=createEmulatedHandler(this);
this._emulatedFlashHandler=createFlashEmulatedHandler(this);
this._rtmpFlashHandler=createFlashRtmpHandler(this);
pickStrategies();
_81e[_816]=new _810("ws",this._nativeHandler,_820);
_81e[_817]=new _810("wss",this._nativeHandler,_820);
_81e[_818]=new _810("ws",this._emulatedHandler,_821);
_81e[_819]=new _810("wss",this._emulatedHandler,_821);
_81e[_81a]=new _810("ws",this._emulatedFlashHandler,_821);
_81e[_81b]=new _810("wss",this._emulatedFlashHandler,_821);
_81e[_81c]=new _810("ws",this._rtmpFlashHandler,_821);
_81e[_81d]=new _810("wss",this._rtmpFlashHandler,_821);
};
function isIE6orIE7(){
if(browser!="ie"){
return false;
}
var _825=navigator.appVersion;
return (_825.indexOf("MSIE 6.0")>=0||_825.indexOf("MSIE 7.0")>=0);
};
function isXdrDisabledonIE8IE9(){
if(browser!="ie"){
return false;
}
var _826=navigator.appVersion;
return ((_826.indexOf("MSIE 8.0")>=0||_826.indexOf("MSIE 9.0")>=0)&&typeof (XDomainRequest)==="undefined");
};
function pickStrategies(){
if(isIE6orIE7()||isXdrDisabledonIE8IE9()){
_81f["ws"]=new Array(_816,_81a,_818);
_81f["wss"]=new Array(_817,_81b,_819);
}else{
_81f["ws"]=new Array(_816,_818);
_81f["wss"]=new Array(_817,_819);
}
};
function createListener(_827){
var _828={};
_828.connectionOpened=function(_829,_82a){
_827.handleConnectionOpened(_829,_82a);
};
_828.binaryMessageReceived=function(_82b,buf){
_827.handleMessageReceived(_82b,buf);
};
_828.textMessageReceived=function(_82d,text){
var _82f=_82d.parent;
_82f._webSocketChannelListener.handleMessage(_82f._webSocket,text);
};
_828.connectionClosed=function(_830,_831,code,_833){
_827.handleConnectionClosed(_830,_831,code,_833);
};
_828.connectionFailed=function(_834){
_827.handleConnectionFailed(_834);
};
_828.connectionError=function(_835,e){
_827.handleConnectionError(_835,e);
};
_828.authenticationRequested=function(_837,_838,_839){
};
_828.redirected=function(_83a,_83b){
};
_828.onBufferedAmountChange=function(_83c,n){
_827.handleBufferedAmountChange(_83c,n);
};
return _828;
};
function createNativeHandler(_83e){
var _83f=new _7e5();
var _840=new _68c();
_83f.setListener(_83e._handlerListener);
_83f.setNextHandler(_840);
return _83f;
};
function createEmulatedHandler(_841){
var _842=new _7e5();
var _843=new _783();
_842.setListener(_841._handlerListener);
_842.setNextHandler(_843);
return _842;
};
function createFlashEmulatedHandler(_844){
var _845=new _7e5();
var _846=new _7a9();
_845.setListener(_844._handlerListener);
_845.setNextHandler(_846);
return _845;
};
function createFlashRtmpHandler(_847){
var _848=new _7e5();
var _849=new _7d3();
_848.setListener(_847._handlerListener);
_848.setNextHandler(_849);
return _848;
};
var _84a=function(_84b,_84c){
var _84d=_81e[_84c];
var _84e=_84d._channelFactory;
var _84f=_84b._location;
var _850=_84e.createChannel(_84f,_84b._protocol);
_84b._selectedChannel=_850;
_850.parent=_84b;
_850._extensions=_84b._extensions;
_850._handler=_84d._handler;
_850._handler.processConnect(_84b._selectedChannel,_84f,_84b._protocol);
};
var _851=_824.prototype;
_851.fallbackNext=function(_852){
var _853=_852.getNextStrategy();
if(_853==null){
this.doClose(_852,false,1006,"");
}else{
_84a(_852,_853);
}
};
_851.doOpen=function(_854,_855){
if(_854._lastErrorEvent!==undefined){
delete _854._lastErrorEvent;
}
if(_854.readyState===WebSocket.CONNECTING){
_854.readyState=WebSocket.OPEN;
if(_822){
_854._webSocket.readyState=WebSocket.OPEN;
}
_854._webSocketChannelListener.handleOpen(_854._webSocket,_855);
}
};
_851.doClose=function(_856,_857,code,_859){
if(_856._lastErrorEvent!==undefined){
_856._webSocketChannelListener.handleError(_856._webSocket,_856._lastErrorEvent);
delete _856._lastErrorEvent;
}
if(_856.readyState===WebSocket.CONNECTING||_856.readyState===WebSocket.OPEN||_856.readyState===WebSocket.CLOSING){
_856.readyState=WebSocket.CLOSED;
if(_822){
_856._webSocket.readyState=WebSocket.CLOSED;
}
_856._webSocketChannelListener.handleClose(_856._webSocket,_857,code,_859);
}
};
_851.doBufferedAmountChange=function(_85a,n){
_85a._webSocketChannelListener.handleBufferdAmountChange(_85a._webSocket,n);
};
_851.processConnect=function(_85c,_85d,_85e){
var _85f=_85c;
if(_85f.readyState===WebSocket.OPEN){
throw new Error("Attempt to reconnect an existing open WebSocket to a different location");
}
var _860=_85f._compositeScheme;
if(_860!="ws"&&_860!="wss"){
var _861=_81e[_860];
if(_861==null){
throw new Error("Invalid connection scheme: "+_860);
}
_85f._connectionStrategies.push(_860);
}else{
var _862=_81f[_860];
if(_862!=null){
for(var i=0;i<_862.length;i++){
_85f._connectionStrategies.push(_862[i]);
}
}else{
throw new Error("Invalid connection scheme: "+_860);
}
}
this.fallbackNext(_85f);
};
_851.processTextMessage=function(_864,_865){
var _866=_864;
if(_866.readyState!=WebSocket.OPEN){
throw new Error("Attempt to post message on unopened or closed web socket");
}
var _867=_866._selectedChannel;
_867._handler.processTextMessage(_867,_865);
};
_851.processBinaryMessage=function(_868,_869){
var _86a=_868;
if(_86a.readyState!=WebSocket.OPEN){
throw new Error("Attempt to post message on unopened or closed web socket");
}
var _86b=_86a._selectedChannel;
_86b._handler.processBinaryMessage(_86b,_869);
};
_851.processClose=function(_86c,code,_86e){
var _86f=_86c;
if(_86c.readyState===WebSocket.CONNECTING||_86c.readyState===WebSocket.OPEN){
_86c.readyState=WebSocket.CLOSING;
if(_822){
_86c._webSocket.readyState=WebSocket.CLOSING;
}
}
var _870=_86f._selectedChannel;
_870._handler.processClose(_870,code,_86e);
};
_851.setListener=function(_871){
this._listener=_871;
};
_851.handleConnectionOpened=function(_872,_873){
var _874=_872.parent;
this.doOpen(_874,_873);
};
_851.handleMessageReceived=function(_875,obj){
var _877=_875.parent;
switch(_877.readyState){
case WebSocket.OPEN:
if(_877._webSocket.binaryType==="blob"&&obj.constructor==ByteBuffer){
obj=obj.getBlob(obj.remaining());
}else{
if(_877._webSocket.binaryType==="arraybuffer"&&obj.constructor==ByteBuffer){
obj=obj.getArrayBuffer(obj.remaining());
}else{
if(_877._webSocket.binaryType==="blob"&&obj.byteLength){
obj=new Blob([new Uint8Array(obj)]);
}else{
if(_877._webSocket.binaryType==="bytebuffer"&&obj.byteLength){
var u=new Uint8Array(obj);
var _879=[];
for(var i=0;i<u.byteLength;i++){
_879.push(u[i]);
}
obj=new ByteBuffer(_879);
}else{
if(_877._webSocket.binaryType==="bytebuffer"&&obj.size){
var cb=function(_87c){
var b=new ByteBuffer();
b.putBytes(_87c);
b.flip();
_877._webSocketChannelListener.handleMessage(_877._webSocket,b);
};
BlobUtils.asNumberArray(cb,data);
return;
}
}
}
}
}
_877._webSocketChannelListener.handleMessage(_877._webSocket,obj);
break;
case WebSocket.CONNECTING:
case WebSocket.CLOSING:
case WebSocket.CLOSED:
break;
default:
throw new Error("Socket has invalid readyState: "+$this.readyState);
}
};
_851.handleConnectionClosed=function(_87e,_87f,code,_881){
var _882=_87e.parent;
if(_882.readyState===WebSocket.CONNECTING&&!_87e.authenticationReceived&&!_87e.preventFallback){
this.fallbackNext(_882);
}else{
this.doClose(_882,_87f,code,_881);
}
};
_851.handleConnectionFailed=function(_883){
var _884=_883.parent;
var _885=1006;
var _886="";
if(_883.closeReason.length>0){
_885=_883.closeCode;
_886=_883.closeReason;
}
if(_884.readyState===WebSocket.CONNECTING&&!_883.authenticationReceived&&!_883.preventFallback){
this.fallbackNext(_884);
}else{
this.doClose(_884,false,_885,_886);
}
};
_851.handleConnectionError=function(_887,e){
_887.parent._lastErrorEvent=e;
};
return _824;
})();
(function(){
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
var _88b=HttpRedirectPolicy.prototype;
_88b.toString=function(){
return "HttpRedirectPolicy."+this.name;
};
_88b.isRedirectionAllowed=function(_88c,_88d){
if(arguments.length<2){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify both the 'originalLoc' and the 'redirectLoc' parameters.";
throw Error(s);
}
if(typeof (_88c)=="undefined"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify required 'originalLoc' parameter.";
throw Error(s);
}else{
if(typeof (_88c)!="string"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Required parameter 'originalLoc' is a string.";
throw Error(s);
}
}
if(typeof (_88d)=="undefined"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify required 'redirectLoc' parameter.";
throw Error(s);
}else{
if(typeof (_88d)!="string"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Required parameter 'redirectLoc' is a string.";
throw Error(s);
}
}
var _88f=false;
var _890=new URI(_88c.toLowerCase().replace("http","ws"));
var _891=new URI(_88d.toLowerCase().replace("http","ws"));
switch(this.name){
case "ALWAYS":
_88f=true;
break;
case "NEVER":
_88f=false;
break;
case "PEER_DOMAIN":
_88f=isPeerDomain(_890,_891);
break;
case "SAME_DOMAIN":
_88f=isSameDomain(_890,_891);
break;
case "SAME_ORIGIN":
_88f=isSameOrigin(_890,_891);
break;
case "SUB_DOMAIN":
_88f=isSubDomain(_890,_891);
break;
default:
var s="HttpRedirectPolicy.isRedirectionAllowed(): Invalid policy: "+this.name;
throw new Error(s);
}
return _88f;
};
function isPeerDomain(_892,_893){
if(isSameDomain(_892,_893)){
return true;
}
var _894=_892.scheme.toLowerCase();
var _895=_893.scheme.toLowerCase();
if(_895.indexOf(_894)==-1){
return false;
}
var _896=_892.host;
var _897=_893.host;
var _898=getBaseDomain(_896);
var _899=getBaseDomain(_897);
if(_897.indexOf(_898,(_897.length-_898.length))==-1){
return false;
}
if(_896.indexOf(_899,(_896.length-_899.length))==-1){
return false;
}
return true;
};
function isSameDomain(_89a,_89b){
if(isSameOrigin(_89a,_89b)){
return true;
}
var _89c=_89a.scheme.toLowerCase();
var _89d=_89b.scheme.toLowerCase();
if(_89d.indexOf(_89c)==-1){
return false;
}
var _89e=_89a.host.toLowerCase();
var _89f=_89b.host.toLowerCase();
if(_89e==_89f){
return true;
}
return false;
};
function isSameOrigin(_8a0,_8a1){
var _8a2=_8a0.scheme.toLowerCase();
var _8a3=_8a1.scheme.toLowerCase();
var _8a4=_8a0.authority.toLowerCase();
var _8a5=_8a1.authority.toLowerCase();
if((_8a2==_8a3)&&(_8a4==_8a5)){
return true;
}
return false;
};
function isSubDomain(_8a6,_8a7){
if(isSameDomain(_8a6,_8a7)){
return true;
}
var _8a8=_8a6.scheme.toLowerCase();
var _8a9=_8a7.scheme.toLowerCase();
if(_8a9.indexOf(_8a8)==-1){
return false;
}
var _8aa=_8a6.host.toLowerCase();
var _8ab=_8a7.host.toLowerCase();
if(_8ab.length<_8aa.length){
return false;
}
var s="."+_8aa;
if(_8ab.indexOf(s,(_8ab.length-s.length))==-1){
return false;
}
return true;
};
function getBaseDomain(host){
var _8ae=host.split(".");
var len=_8ae.length;
if(len<=2){
return host;
}
var _8b0="";
for(var i=1;i<len;i++){
_8b0+="."+_8ae[i];
}
return _8b0;
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
var _8b2=new _815();
window.WebSocketEx=(function(){
var _8b3={};
var _8b4=function(url,_8b6,_8b7,_8b8,_8b9,_8ba){
this.url=url;
this.protocol=_8b6;
this.extensions=_8b7||[];
this.connectTimeout=0;
this._challengeHandler=_8b8;
this._redirectPolicy=HttpRedirectPolicy.ALWAYS;
if(typeof (_8b9)!="undefined"){
_8bb(_8b9);
this.connectTimeout=_8b9;
}
if(typeof (_8ba)!="undefined"){
_8bc(_8ba);
this._redirectPolicy=_8ba;
}
this._queue=[];
this._origin="";
this._eventListeners={};
setProperties(this);
_8bd(this,this.url,this.protocol,this.extensions,this._challengeHandler,this.connectTimeout);
};
var _8be=function(s){
if(s.length==0){
return false;
}
var _8c0="()<>@,;:\\<>/[]?={}\t \n";
for(var i=0;i<s.length;i++){
var c=s.substr(i,1);
if(_8c0.indexOf(c)!=-1){
return false;
}
var code=s.charCodeAt(i);
if(code<33||code>126){
return false;
}
}
return true;
};
var _8c4=function(_8c5){
if(typeof (_8c5)==="undefined"){
return true;
}else{
if(typeof (_8c5)==="string"){
return _8be(_8c5);
}else{
for(var i=0;i<_8c5.length;i++){
if(!_8be(_8c5[i])){
return false;
}
}
return true;
}
}
};
var _8bd=function(_8c7,_8c8,_8c9,_8ca,_8cb,_8cc){
if(!_8c4(_8c9)){
throw new Error("SyntaxError: invalid protocol: "+_8c9);
}
var uri=new _514(_8c8);
if(!uri.isSecure()&&document.location.protocol==="https:"){
throw new Error("SecurityException: non-secure connection attempted from secure origin");
}
var _8ce=[];
if(typeof (_8c9)!="undefined"){
if(typeof _8c9=="string"&&_8c9.length){
_8ce=[_8c9];
}else{
if(_8c9.length){
_8ce=_8c9;
}
}
}
_8c7._channel=new _571(uri,_8ce);
_8c7._channel._webSocket=_8c7;
_8c7._channel._webSocketChannelListener=_8b3;
_8c7._channel._extensions=_8ca;
if(typeof (_8cb)!="undefined"){
_8c7._channel.challengeHandler=_8cb;
}
if((typeof (_8cc)!="undefined")&&(_8cc>0)){
var _8cf=_8c7._channel;
var _8d0=new _520(function(){
if(_8cf.readyState==_8b4.CONNECTING){
_8b2.doClose(_8cf,false,1006,"Connection timeout");
_8b2.processClose(_8cf,0,"Connection timeout");
_8cf.connectTimer=null;
}
},_8cc,false);
_8c7._channel.connectTimer=_8d0;
_8d0.start();
}
_8b2.processConnect(_8c7._channel,uri.getWSEquivalent());
};
function setProperties(_8d1){
_8d1.onmessage=null;
_8d1.onopen=null;
_8d1.onclose=null;
_8d1.onerror=null;
if(Object.defineProperty){
try{
Object.defineProperty(_8d1,"readyState",{get:function(){
if(_8d1._channel){
return _8d1._channel.readyState;
}else{
return _8b4.CLOSED;
}
},set:function(){
throw new Error("Cannot set read only property readyState");
}});
var _8d2="blob";
Object.defineProperty(_8d1,"binaryType",{enumerable:true,configurable:true,get:function(){
return _8d2;
},set:function(val){
if(val==="blob"||val==="arraybuffer"||val==="bytebuffer"){
_8d2=val;
}else{
throw new SyntaxError("Invalid binaryType. Valid values are 'blob', 'arraybuffer' and 'bytebuffer'");
}
}});
Object.defineProperty(_8d1,"bufferedAmount",{get:function(){
return _8d1._channel.getBufferedAmount();
},set:function(){
throw new Error("Cannot set read only property bufferedAmount");
}});
}
catch(ex){
_8d1.readyState=_8b4.CONNECTING;
_8d1.binaryType="blob";
_8d1.bufferedAmount=0;
}
}else{
_8d1.readyState=_8b4.CONNECTING;
_8d1.binaryType="blob";
_8d1.bufferedAmount=0;
}
};
var _8d4=_8b4.prototype;
_8d4.send=function(data){
switch(this.readyState){
case 0:
throw new Error("Attempt to send message on unopened or closed WebSocket");
case 1:
if(typeof (data)==="string"){
_8b2.processTextMessage(this._channel,data);
}else{
_8b2.processBinaryMessage(this._channel,data);
}
break;
case 2:
case 3:
break;
default:
throw new Error("Illegal state error");
}
};
_8d4.close=function(code,_8d7){
if(typeof code!="undefined"){
if(code!=1000&&(code<3000||code>4999)){
var _8d8=new Error("code must equal to 1000 or in range 3000 to 4999");
_8d8.name="InvalidAccessError";
throw _8d8;
}
}
if(typeof _8d7!="undefined"&&_8d7.length>0){
var buf=new ByteBuffer();
buf.putString(_8d7,Charset.UTF8);
buf.flip();
if(buf.remaining()>123){
throw new SyntaxError("SyntaxError: reason is longer than 123 bytes");
}
}
switch(this.readyState){
case 0:
case 1:
_8b2.processClose(this._channel,code,_8d7);
break;
case 2:
case 3:
break;
default:
throw new Error("Illegal state error");
}
};
_8d4.getChallengeHandler=function(){
return this._challengeHandler||null;
};
_8d4.setChallengeHandler=function(_8da){
if(typeof (_8da)=="undefined"){
var s="WebSocket.setChallengeHandler(): Parameter 'challengeHandler' is required";
throw new Error(s);
}
this._challengeHandler=_8da;
this._channel.challengeHandler=_8da;
};
_8d4.getRedirectPolicy=function(){
return this._redirectPolicy;
};
_8d4.setRedirectPolicy=function(_8dc){
_8bc(_8dc);
this._redirectPolicy=_8dc;
};
var _8bb=function(_8dd){
if(typeof (_8dd)=="undefined"){
var s="WebSocket.setConnectTimeout(): int parameter 'connectTimeout' is required";
throw new Error(s);
}
if(typeof (_8dd)!="number"){
var s="WebSocket.setConnectTimeout(): connectTimeout should be an integer";
throw new Error(s);
}
if(_8dd<0){
var s="WebSocket.setConnectTimeout(): Connect timeout cannot be negative";
throw new Error(s);
}
return;
};
var _8bc=function(_8df){
if(typeof (_8df)=="undefined"){
var s="WebSocket.validateHttpRedirectPolicy(): Parameter 'redirectPolicy' is required";
throw new Error(s);
}
if(!(_8df instanceof HttpRedirectPolicy)){
var s="WebSocket.validateHttpRedirectPolicy(): Parameter 'redirectPolicy' must be of type HttpRedirectPolicy";
throw new Error(s);
}
};
var _8e1=function(_8e2,data){
var _8e4=new MessageEvent(_8e2,data,_8e2._origin);
_8e2.dispatchEvent(_8e4);
};
var _8e5=function(_8e6){
var _8e7=new Date().getTime();
var _8e8=_8e7+50;
while(_8e6._queue.length>0){
if(new Date().getTime()>_8e8){
setTimeout(function(){
_8e5(_8e6);
},0);
return;
}
var buf=_8e6._queue.shift();
var ok=false;
try{
if(_8e6.readyState==_8b4.OPEN){
_8e1(_8e6,buf);
ok=true;
}else{
_8e6._queue=[];
return;
}
}
finally{
if(!ok){
if(_8e6._queue.length==0){
_8e6._delivering=false;
}else{
setTimeout(function(){
_8e5(_8e6);
},0);
}
}
}
}
_8e6._delivering=false;
};
var _8eb=function(_8ec,_8ed,code,_8ef){
delete _8ec._channel;
setTimeout(function(){
var _8f0=new CloseEvent(_8ec,_8ed,code,_8ef);
_8ec.dispatchEvent(_8f0);
},0);
};
_8b3.handleOpen=function(_8f1,_8f2){
_8f1.protocol=_8f2;
var _8f3={type:"open",bubbles:true,cancelable:true,target:_8f1};
_8f1.dispatchEvent(_8f3);
};
_8b3.handleMessage=function(_8f4,obj){
if(!Object.defineProperty&&!(typeof (obj)==="string")){
var _8f6=_8f4.binaryType;
if(!(_8f6==="blob"||_8f6==="arraybuffer"||_8f6==="bytebuffer")){
var _8f7={type:"error",bubbles:true,cancelable:true,target:_8f4,message:"Invalid binaryType. Valid values are 'blob', 'arraybuffer' and 'bytebuffer'"};
_8f4.dispatchEvent(_8f7);
return;
}
}
_8f4._queue.push(obj);
if(!_8f4._delivering){
_8f4._delivering=true;
_8e5(_8f4);
}
};
_8b3.handleClose=function(_8f8,_8f9,code,_8fb){
_8eb(_8f8,_8f9,code,_8fb);
};
_8b3.handleError=function(_8fc,_8fd){
setTimeout(function(){
_8fc.dispatchEvent(_8fd);
},0);
};
_8b3.handleBufferdAmountChange=function(_8fe,n){
_8fe.bufferedAmount=n;
};
_8d4.addEventListener=function(type,_901,_902){
this._eventListeners[type]=this._eventListeners[type]||[];
this._eventListeners[type].push(_901);
};
_8d4.removeEventListener=function(type,_904,_905){
var _906=this._eventListeners[type];
if(_906){
for(var i=0;i<_906.length;i++){
if(_906[i]==_904){
_906.splice(i,1);
return;
}
}
}
};
_8d4.dispatchEvent=function(e){
var type=e.type;
if(!type){
throw new Error("Cannot dispatch invalid event "+e);
}
try{
var _90a=this["on"+type];
if(typeof _90a==="function"){
_90a(e);
}
}
catch(e){
}
var _90b=this._eventListeners[type];
if(_90b){
for(var i=0;i<_90b.length;i++){
try{
_90b[i](e);
}
catch(e2){
}
}
}
};
_8b4.CONNECTING=_8d4.CONNECTING=0;
_8b4.OPEN=_8d4.OPEN=1;
_8b4.CLOSING=_8d4.CLOSING=2;
_8b4.CLOSED=_8d4.CLOSED=3;
return _8b4;
})();
window.WebSocket.__impls__={};
window.WebSocket.__impls__["flash:wse"]=_312;
}());
(function(){
window.WebSocketExtension=(function(){
var _90d=function(name){
this.name=name;
this.parameters={};
this.enabled=false;
this.negotiated=false;
};
var _90f=_90d.prototype;
_90f.getParameter=function(_910){
return this.parameters[_910];
};
_90f.setParameter=function(_911,_912){
this.parameters[_911]=_912;
};
_90f.getParameters=function(){
var arr=[];
for(var name in this.parameters){
if(this.parameters.hasOwnProperty(name)){
arr.push(name);
}
}
return arr;
};
_90f.parse=function(str){
var arr=str.split(";");
if(arr[0]!=this.name){
throw new Error("Error: name not match");
}
this.parameters={};
for(var i=1;i<arr.length;i++){
var _918=arr[i].indexOf("=");
this.parameters[arr[i].subString(0,_918)]=arr[i].substring(_918+1);
}
};
_90f.toString=function(){
var arr=[this.name];
for(var p in this.parameters){
if(this.parameters.hasOwnProperty(p)){
arr.push(p.name+"="+this.parameters[p]);
}
}
return arr.join(";");
};
return _90d;
})();
})();
(function(){
window.WebSocketRevalidateExtension=(function(){
var _91b=function(){
};
var _91c=_91b.prototype=new WebSocketExtension(_55c.KAAZING_SEC_EXTENSION_REVALIDATE);
return _91b;
})();
})();
(function(){
window.WebSocketFactory=(function(){
var _91d=function(){
this.extensions={};
var _91e=new WebSocketRevalidateExtension();
this.extensions[_91e.name]=_91e;
this.redirectPolicy=HttpRedirectPolicy.ALWAYS;
};
var _91f=_91d.prototype;
_91f.getExtension=function(name){
return this.extensions[name];
};
_91f.setExtension=function(_921){
this.extensions[_921.name]=_921;
};
_91f.setChallengeHandler=function(_922){
if(typeof (_922)=="undefined"){
var s="WebSocketFactory.setChallengeHandler(): Parameter 'challengeHandler' is required";
throw new Error(s);
}
this.challengeHandler=_922;
var _924=this.extensions[_55c.KAAZING_SEC_EXTENSION_REVALIDATE];
_924.enabled=(_922!=null);
};
_91f.getChallengeHandler=function(){
return this.challengeHandler||null;
};
_91f.createWebSocket=function(url,_926){
var ext=[];
for(var key in this.extensions){
if(this.extensions.hasOwnProperty(key)&&this.extensions[key].enabled){
ext.push(this.extensions[key].toString());
}
}
var _929=this.getChallengeHandler();
var _92a=this.getDefaultConnectTimeout();
var _92b=this.getDefaultRedirectPolicy();
var ws=new WebSocketEx(url,_926,ext,_929,_92a,_92b);
return ws;
};
_91f.setDefaultConnectTimeout=function(_92d){
if(typeof (_92d)=="undefined"){
var s="WebSocketFactory.setDefaultConnectTimeout(): int parameter 'connectTimeout' is required";
throw new Error(s);
}
if(typeof (_92d)!="number"){
var s="WebSocketFactory.setDefaultConnectTimeout(): connectTimeout should be an integer";
throw new Error(s);
}
if(_92d<0){
var s="WebSocketFactory.setDefaultConnectTimeout(): Connect timeout cannot be negative";
throw new Error(s);
}
this.connectTimeout=_92d;
};
_91f.getDefaultConnectTimeout=function(){
return this.connectTimeout||0;
};
_91f.setDefaultRedirectPolicy=function(_92f){
if(typeof (_92f)=="undefined"){
var s="WebSocketFactory.setDefaultRedirectPolicy(): int parameter 'redirectPolicy' is required";
throw new Error(s);
}
if(!(_92f instanceof HttpRedirectPolicy)){
var s="WebSocketFactory.setDefaultRedirectPolicy(): redirectPolicy should be an instance of HttpRedirectPolicy";
throw new Error(s);
}
this.redirectPolicy=_92f;
};
_91f.getDefaultRedirectPolicy=function(){
return this.redirectPolicy;
};
return _91d;
})();
})();
window.___Loader=new _3a8(_276);
})();
})();
