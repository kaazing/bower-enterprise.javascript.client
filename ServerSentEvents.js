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
var XDRHttpDirect=(function(){
var id=0;
function XDRHttpDirect(_e0){
this.outer=_e0;
};
var _e1=XDRHttpDirect.prototype;
_e1.open=function(_e2,_e3){
var _e4=this;
var xhr=this.outer;
xhr.responseText="";
var _e6=2;
var _e7=0;
var _e8=0;
this._method=_e2;
this._location=_e3;
if(_e3.indexOf("?")==-1){
_e3+="?.kac=ex&.kct=application/x-message-http";
}else{
_e3+="&.kac=ex&.kct=application/x-message-http";
}
this.location=_e3;
var xdr=this.xdr=new XDomainRequest();
var _ea=function(e){
try{
var _ec=xdr.responseText;
if(_e6<=2){
var _ed=_ec.indexOf("\r\n\r\n");
if(_ed==-1){
return;
}
var _ee=_ec.indexOf("\r\n");
var _ef=_ec.substring(0,_ee);
var _f0=_ef.match(/HTTP\/1\.\d\s(\d+)\s([^\r\n]+)/);
xhr.status=parseInt(_f0[1]);
xhr.statusText=_f0[2];
var _f1=_ee+2;
_e8=_ed+4;
var _f2=_ec.substring(_f1,_ed).split("\r\n");
xhr._responseHeaders={};
for(var i=0;i<_f2.length;i++){
var _f4=_f2[i].split(":");
if(_f4.length>1){
var _f5=_f4[0].replace(/^\s+|\s+$/g,"");
var _f6=_f4[1].replace(/^\s+|\s+$/g,"");
var _f7=xhr._responseHeaders[_f5];
var _f8=_f6;
if(_f7&&(_f6.replace(/^\s+|\s+$/g,"").length>0)){
_f8=_f7.concat(",").concat(_f6);
}
xhr._responseHeaders[_f5]=_f8;
}
}
_e7=_e8;
_e6=xhr.readyState=3;
if(typeof (_e4.onreadystatechange)=="function"){
_e4.onreadystatechange(xhr);
}
}
var _f9=xdr.responseText.length;
if(_f9>_e7){
xhr.responseText=_ec.slice(_e8);
_e7=_f9;
if(typeof (_e4.onprogress)=="function"){
_e4.onprogress(xhr);
}
}else{
}
}
catch(e1){
_e4.onload(xhr);
}
};
xdr.onprogress=_ea;
xdr.onerror=function(e){
xhr.readyState=0;
if(typeof (xhr.onerror)=="function"){
xhr.onerror(xhr);
}
};
xdr.onload=function(e){
if(_e6<=3){
_ea(e);
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
xdr.open("POST",_e3);
xdr.timeout=30000;
};
_e1.send=function(_fd){
var _fe=this._method+" "+this.location.substring(this.location.indexOf("/",9),this.location.indexOf("&.kct"))+" HTTP/1.1\r\n";
for(var i=0;i<this.outer._requestHeaders.length;i++){
_fe+=this.outer._requestHeaders[i][0]+": "+this.outer._requestHeaders[i][1]+"\r\n";
}
var _100=_fd||"";
if(_100.length>0||this._method.toUpperCase()==="POST"){
var len=0;
for(var i=0;i<_100.length;i++){
len++;
if(_100.charCodeAt(i)>=128){
len++;
}
}
_fe+="Content-Length: "+len+"\r\n";
}
_fe+="\r\n";
_fe+=_100;
this.xdr.send(_fe);
};
_e1.abort=function(){
this.xdr.abort();
};
return XDRHttpDirect;
})();
var XMLHttpBridge=(function(){
var _102={"http":80,"https":443};
var _103=location.protocol.replace(":","");
var _104=location.port;
if(_104==null){
_104=_102[_103];
}
var _105=_103+"://"+location.hostname+":"+_104;
var _106={};
var _107={};
var _108=0;
function XMLHttpBridge(_109){
this.outer=_109;
};
var _10a=XMLHttpBridge.prototype;
_10a.open=function(_10b,_10c){
var id=register(this);
var pipe=supplyPipe(this,_10c);
pipe.attach(id);
this._pipe=pipe;
this._method=_10b;
this._location=_10c;
this.outer.readyState=1;
this.outer.status=0;
this.outer.statusText="";
this.outer.responseText="";
var _10f=this;
setTimeout(function(){
_10f.outer.readyState=1;
onreadystatechange(_10f);
},0);
};
_10a.send=function(_110){
doSend(this,_110);
};
_10a.abort=function(){
var pipe=this._pipe;
if(pipe!==undefined){
pipe.post(["a",this._id].join(""));
pipe.detach(this._id);
}
};
function onreadystatechange(_112){
if(typeof (_112.onreadystatechange)!=="undefined"){
_112.onreadystatechange(_112.outer);
}
switch(_112.outer.readyState){
case 3:
if(typeof (_112.onprogress)!=="undefined"){
_112.onprogress(_112.outer);
}
break;
case 4:
if(_112.outer.status<100||_112.outer.status>=500){
if(typeof (_112.onerror)!=="undefined"){
_112.onerror(_112.outer);
}
}else{
if(typeof (_112.onprogress)!=="undefined"){
_112.onprogress(_112.outer);
}
if(typeof (_112.onload)!=="undefined"){
_112.onload(_112.outer);
}
}
break;
}
};
function onerror(_113){
if(typeof (_113.outer.onerror)!=="undefined"){
_113.outer.onerror();
}
};
function fromHex(_114){
return parseInt(_114,16);
};
function toPaddedHex(_115,_116){
var hex=_115.toString(16);
var _118=[];
_116-=hex.length;
while(_116-->0){
_118.push("0");
}
_118.push(hex);
return _118.join("");
};
function register(_119){
var id=toPaddedHex(_108++,8);
_107[id]=_119;
_119._id=id;
return id;
};
function doSend(_11b,_11c){
if(typeof (_11c)!=="string"){
_11c="";
}
var _11d=_11b._method.substring(0,10);
var _11e=_11b._location;
var _11f=_11b.outer._requestHeaders;
var _120=toPaddedHex(_11b.outer.timeout,4);
var _121=(_11b.outer.onprogress!==undefined)?"t":"f";
var _122=["s",_11b._id,_11d.length,_11d,toPaddedHex(_11e.length,4),_11e,toPaddedHex(_11f.length,4)];
for(var i=0;i<_11f.length;i++){
var _124=_11f[i];
_122.push(toPaddedHex(_124[0].length,4));
_122.push(_124[0]);
_122.push(toPaddedHex(_124[1].length,4));
_122.push(_124[1]);
}
_122.push(toPaddedHex(_11c.length,8),_11c,toPaddedHex(_120,4),_121);
_11b._pipe.post(_122.join(""));
};
function supplyPipe(_125,_126){
var uri=new URI(_126);
var _128=(uri.scheme!=null&&uri.authority!=null);
var _129=_128?uri.scheme:_103;
var _12a=_128?uri.authority:_105;
if(_12a!=null&&uri.port==null){
_12a=uri.host+":"+_102[_129];
}
var _12b=_129+"://"+_12a;
var pipe=_106[_12b];
if(pipe!==undefined){
if(!("iframe" in pipe&&"contentWindow" in pipe.iframe&&typeof pipe.iframe.contentWindow=="object")){
pipe=_106[_12b]=undefined;
}
}
if(pipe===undefined){
var _12d=document.createElement("iframe");
_12d.style.position="absolute";
_12d.style.left="-10px";
_12d.style.top="10px";
_12d.style.visibility="hidden";
_12d.style.width="0px";
_12d.style.height="0px";
var _12e=new URI(_12b);
_12e.query=".kr=xs";
_12e.path="/";
_12d.src=_12e.toString();
function post(_12f){
this.buffer.push(_12f);
};
function attach(id){
var _131=this.attached[id];
if(_131===undefined){
_131={};
this.attached[id]=_131;
}
if(_131.timerID!==undefined){
clearTimeout(_131.timerID);
delete _131.timerID;
}
};
function detach(id){
var _133=this.attached[id];
if(_133!==undefined&&_133.timerID===undefined){
var _134=this;
_133.timerID=setTimeout(function(){
delete _134.attached[id];
var xhr=_107[id];
if(xhr._pipe==pipe){
delete _107[id];
delete xhr._id;
delete xhr._pipe;
}
postMessage0(pipe.iframe.contentWindow,["d",id].join(""),pipe.targetOrigin);
},0);
}
};
pipe={"targetOrigin":_12b,"iframe":_12d,"buffer":[],"post":post,"attach":attach,"detach":detach,"attached":{count:0}};
_106[_12b]=pipe;
function sendInitWhenReady(){
var _136=_12d.contentWindow;
if(!_136){
setTimeout(sendInitWhenReady,20);
}else{
postMessage0(_136,"I",_12b);
}
};
pipe.handshakeID=setTimeout(function(){
_106[_12b]=undefined;
pipe.post=function(_137){
_125.readyState=4;
_125.status=0;
onreadystatechange(_125);
};
if(pipe.buffer.length>0){
pipe.post();
}
},30000);
document.body.appendChild(_12d);
if(typeof (postMessage)==="undefined"){
sendInitWhenReady();
}
}
return pipe;
};
function onmessage(_138){
var _139=_138.origin;
var _13a={"http":":80","https":":443"};
var _13b=_139.split(":");
if(_13b.length===2){
_139+=_13a[_13b[0]];
}
var pipe=_106[_139];
if(pipe!==undefined&&pipe.iframe!==undefined&&_138.source==pipe.iframe.contentWindow){
if(_138.data=="I"){
clearTimeout(pipe.handshakeID);
var _13d;
while((_13d=pipe.buffer.shift())!==undefined){
postMessage0(pipe.iframe.contentWindow,_13d,pipe.targetOrigin);
}
pipe.post=function(_13e){
postMessage0(pipe.iframe.contentWindow,_13e,pipe.targetOrigin);
};
}else{
var _13d=_138.data;
if(_13d.length>=9){
var _13f=0;
var type=_13d.substring(_13f,_13f+=1);
var id=_13d.substring(_13f,_13f+=8);
var _142=_107[id];
if(_142!==undefined){
switch(type){
case "r":
var _143={};
var _144=fromHex(_13d.substring(_13f,_13f+=2));
for(var i=0;i<_144;i++){
var _146=fromHex(_13d.substring(_13f,_13f+=4));
var _147=_13d.substring(_13f,_13f+=_146);
var _148=fromHex(_13d.substring(_13f,_13f+=4));
var _149=_13d.substring(_13f,_13f+=_148);
_143[_147]=_149;
}
var _14a=fromHex(_13d.substring(_13f,_13f+=4));
var _14b=fromHex(_13d.substring(_13f,_13f+=2));
var _14c=_13d.substring(_13f,_13f+=_14b);
switch(_14a){
case 301:
case 302:
case 307:
var _14d=_143["Location"];
var _14e=_138.origin;
if(typeof (_142.outer.onredirectallowed)==="function"){
if(!_142.outer.onredirectallowed(_14e,_14d)){
return;
}
}
var id=register(_142);
var pipe=supplyPipe(_142,_14d);
pipe.attach(id);
_142._pipe=pipe;
_142._method="GET";
_142._location=_14d;
_142._redirect=true;
break;
case 403:
_142.outer.status=_14a;
onreadystatechange(_142);
break;
case 404:
_142.outer.status=_14a;
_142.outer.statusText=_14c;
onerror(_142);
break;
default:
_142.outer._responseHeaders=_143;
_142.outer.status=_14a;
_142.outer.statusText=_14c;
break;
}
break;
case "p":
var _14f=parseInt(_13d.substring(_13f,_13f+=1));
if(_142._id===id){
_142.outer.readyState=_14f;
var _150=fromHex(_13d.substring(_13f,_13f+=8));
var _151=_13d.substring(_13f,_13f+=_150);
if(_151.length>0){
_142.outer.responseText+=_151;
}
onreadystatechange(_142);
}else{
if(_142._redirect){
_142._redirect=false;
doSend(_142,"");
}
}
if(_14f==4){
pipe.detach(id);
}
break;
case "e":
if(_142._id===id){
_142.outer.status=0;
_142.outer.statusText="";
_142.outer.readyState=4;
onreadystatechange(_142);
}
pipe.detach(id);
break;
case "t":
if(_142._id===id){
_142.outer.status=0;
_142.outer.statusText="";
_142.outer.readyState=4;
if(typeof (_142.ontimeout)!=="undefined"){
_142.ontimeout();
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
var _152=location.protocol.replace(":","");
var _153={"http":80,"https":443};
var _154=location.port;
if(_154==null){
_154=_153[_152];
}
var _155=location.hostname+":"+_154;
function onreadystatechange(_156){
if(typeof (_156.onreadystatechange)!=="undefined"){
_156.onreadystatechange();
}
};
function onprogress(_157){
if(typeof (_157.onprogress)!=="undefined"){
_157.onprogress();
}
};
function onerror(_158){
if(typeof (_158.onerror)!=="undefined"){
_158.onerror();
}
};
function onload(_159){
if(typeof (_159.onload)!=="undefined"){
_159.onload();
}
};
function XMLHttpRequest0(){
this._requestHeaders=[];
this.responseHeaders={};
this.withCredentials=false;
};
var _15a=XMLHttpRequest0.prototype;
_15a.readyState=0;
_15a.responseText="";
_15a.status=0;
_15a.statusText="";
_15a.timeout=0;
_15a.onreadystatechange;
_15a.onerror;
_15a.onload;
_15a.onprogress;
_15a.onredirectallowed;
_15a.open=function(_15b,_15c,_15d){
if(!_15d){
throw new Error("Asynchronous is required for cross-origin XMLHttpRequest emulation");
}
switch(this.readyState){
case 0:
case 4:
break;
default:
throw new Error("Invalid ready state");
}
var _15e=this;
this._method=_15b;
this._location=_15c;
this.readyState=1;
this.status=0;
this.statusText="";
this.responseText="";
var xhr;
var _160=new URI(_15c);
if(_160.port==null){
_160.port=_153[_160.scheme];
_160.authority=_160.host+":"+_160.port;
}
if(browser=="ie"&&typeof (XDomainRequest)!=="undefined"&&_160.scheme==_152&&!this.withCredentials){
xhr=new XDRHttpDirect(this);
}else{
if(_160.scheme==_152&&_160.authority==_155){
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
xhr.open(_15b,_15c);
this.xhr=xhr;
setTimeout(function(){
if(_15e.readyState>1){
return;
}
if(_15e.readyState<1){
_15e.readyState=1;
}
onreadystatechange(_15e);
},0);
};
_15a.setRequestHeader=function(_161,_162){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
this._requestHeaders.push([_161,_162]);
};
_15a.send=function(_163){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
var _164=this;
setTimeout(function(){
if(_164.readyState>2){
return;
}
if(_164.readyState<2){
_164.readyState=2;
}
onreadystatechange(_164);
},0);
this.xhr.send(_163);
};
_15a.abort=function(){
this.xhr.abort();
};
_15a.getResponseHeader=function(_165){
if(this.status==0){
throw new Error("Invalid ready state");
}
var _166=this._responseHeaders;
return _166[_165];
};
_15a.getAllResponseHeaders=function(){
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
function EventSource(_167){
this.lastEventId=null;
this.immediate=false;
this.retry=3000;
var _168=new URI(_167);
var _169={"http":80,"https":443};
if(_168.port==null){
_168.port=_169[_168.scheme];
_168.authority=_168.host+":"+_168.port;
}
this.origin=_168.scheme+"://"+_168.authority;
this.location=_167;
this.lineQueue=[];
this.xhr=null;
this.reconnectTimer=null;
var _16a=this;
setTimeout(function(){
_connect(_16a,false);
},0);
};
var _16b=EventSource.prototype;
_16b.readyState=0;
_16b.onopen=function(){
};
_16b.onmessage=function(_16c){
};
_16b.onerror=function(){
};
_16b.disconnect=function(){
if(this.readyState!==2){
_disconnect(this);
}
};
function _connect(_16d,_16e,_16f){
if(_16d.reconnectTimer!==null){
_16d.reconnectTimer=null;
}
var _170=new URI(_16d.location);
if(_16f===undefined){
_16f=[];
}
if(_16d.lastEventId!==null){
_16f.push(".ka="+this.lastEventId);
}
if(_16d.location.indexOf("&.kb=")===-1&&_16d.location.indexOf("?.kb=")===-1){
_16f.push(".kb=512");
}
switch(browser){
case "ie":
case "safari":
_16f.push(".kp=256");
break;
case "firefox":
_16f.push(".kp=1025");
_16f.push(String(Math.random()).substring(2));
break;
case "android":
_16f.push(".kp=4096");
_16f.push(".kbp=4096");
break;
}
if(_16f.length>0){
if(_170.query===undefined){
_170.query=_16f.join("&");
}else{
_170.query+="&"+_16f.join("&");
}
}
var xhr=_16d.xhr=new XMLHttpRequest0();
var _172={"xhr":xhr,"position":0};
if(_16d.location.indexOf(".ki=p")==-1||_16d.location.indexOf("https://")==0){
xhr.onprogress=function(){
setTimeout(function(){
_process(_16d,_172);
},0);
};
}
xhr.onload=function(){
_process(_16d,_172);
if(_16d.xhr==_172.xhr&&_16d.readyState!=2){
_reconnect(_16d);
}
};
xhr.onerror=function(){
if(_16d.readyState!=2){
_disconnect(_16d);
_error(_16d);
}
};
xhr.ontimeout=function(){
if(_16d.readyState!=2){
_disconnect(_16d);
_error(_16d);
}
};
xhr.onreadystatechange=function(){
if(!_16e){
if(xhr.readyState>=3){
_16d.readyState=1;
if(typeof (_16d.onopen)==="function"){
_16d.onopen();
}
xhr.onreadystatechange=function(){
};
}
}
};
xhr.open("GET",_170.toString(),true);
xhr.send(null);
if(_16d.location.indexOf(".ki=p")==-1){
setTimeout(function(){
if(xhr.readyState<3&&_16d.readyState<2){
_connect(_16d,false,new Array(".ki=p"));
}
},3000);
}
};
function _disconnect(_173){
if(_173.reconnectTimer!==null){
clearTimeout(_173.reconnectTimer);
_173.reconnectTimer=null;
}
_173.lineQueue=[];
_173.lastEventId=null;
_173.location=null;
_173.readyState=2;
if(_173.xhr!==null){
_173.xhr.onprogress=function(){
};
_173.xhr.onload=function(){
};
_173.xhr.onerror=function(){
};
_173.xhr.onreadystatechange=function(){
};
_173.xhr.abort();
}
};
function _reconnect(_174){
_174.readyState=0;
if(_174.location!==null){
var _175=_174.retry;
var _176=_174.immediate;
if(_176){
_174.immediate=false;
_175=0;
}else{
_error(_174);
}
if(_174.readyState==0){
_174.reconnectTimer=setTimeout(function(){
_connect(_174,_176);
},_175);
}
}
};
var _177=/[^\r\n]+|\r\n|\r|\n/g;
function _process(_178,_179){
var _17a=_179.xhr.responseText;
var _17b=_17a.slice(_179.position);
var _17c=_17b.match(_177)||[];
var _17d=_178.lineQueue;
var _17e="";
while(_17c.length>0){
var _17f=_17c.shift();
switch(_17f.charAt(0)){
case "\r":
case "\n":
_179.position+=_17e.length+_17f.length;
if(_17e===""){
_dispatch(_178);
}else{
_17d.push(_17e);
_17e="";
}
break;
default:
_17e=_17f;
break;
}
}
};
function _dispatch(_180){
var data="";
var name="message";
var _183=_180.lineQueue;
while(_183.length>0){
var line=_183.shift();
var _185=null;
var _186="";
var _187=line.indexOf(":");
if(_187==-1){
_185=line;
_186="";
}else{
if(_187===0){
continue;
}else{
_185=line.slice(0,_187);
var _188=_187+1;
if(line.charAt(_188)==" "){
_188++;
}
_186=line.slice(_188);
}
}
switch(_185){
case "event":
name=_186;
break;
case "id":
_180.lastEventId=_186;
break;
case "retry":
_186=parseInt(_186,10);
if(!isNaN(_186)){
_180.retry=_186;
}
break;
case "data":
if(data.length>0){
data+="\n";
}
data+=_186;
break;
case "location":
if(_186!=""){
_180.location=_186;
}
break;
case "reconnect":
_180.immediate=true;
break;
default:
break;
}
}
if(data.length>0||(name.length>0&&name!="message")){
var e=document.createEvent("Events");
e.initEvent(name,true,true);
e.lastEventId=_180.lastEventId;
e.data=data;
e.origin=_180.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_180.onmessage)==="function"){
_180.onmessage(e);
}
}
};
function _error(_18a){
var e=document.createEvent("Events");
e.initEvent("error",true,true);
if(typeof (_18a.onerror)==="function"){
_18a.onerror(e);
}
};
return EventSource;
})();
}else{
window.EventSource=(function(){
var _18c={};
var _18d={};
var _18e=0;
function EventSource(_18f){
this.readyState=0;
var id=register(this);
var pipe=supplyPipe(this,_18f);
pipe.attach(id);
var _192=["c",id,toPaddedHex(_18f.length,4),_18f].join("");
pipe.post(_192);
this._id=id;
this._pipe=pipe;
};
var _193=EventSource.prototype;
_193.disconnect=function(){
var pipe=this._pipe;
if(pipe!==undefined){
pipe.post(["a",this._id].join(""));
pipe.detach(this._id);
}
this.readyState=2;
};
function register(_195){
var id=toPaddedHex(_18e++,8);
_18d[id]=_195;
_195._id=id;
return id;
};
function supplyPipe(_197,_198){
var uri=new URI(_198);
var _19a=(uri.scheme!=null&&uri.authority!=null);
var _19b=_19a?uri.scheme:locationURI.scheme;
var _19c=_19a?uri.authority:locationURI.authority;
if(_19c!=null&&uri.port==null){
_19c=uri.host+":"+defaultPorts[_19b];
}
var _19d=_19b+"://"+_19c;
var pipe=_18c[_19d];
if(pipe===undefined){
var _19f=document.createElement("iframe");
_19f.style.position="absolute";
_19f.style.left="-10px";
_19f.style.top="10px";
_19f.style.visibility="hidden";
_19f.style.width="0px";
_19f.style.height="0px";
var _1a0=new URI(_19d);
_1a0.query=".kr=xse&.kv=10.05";
_1a0.path="/";
_19f.src=_1a0.toString();
function post(_1a1){
this.buffer.push(_1a1);
};
function attach(id){
var _1a3=this.attached[id];
if(_1a3===undefined){
_1a3={};
this.attached[id]=_1a3;
}
if(_1a3.timerID!==undefined){
clearTimeout(_1a3.timerID);
delete _1a3.timerID;
}
};
function detach(id){
var _1a5=this.attached[id];
if(_1a5!==undefined&&_1a5.timerID===undefined){
var _1a6=this;
_1a5.timerID=setTimeout(function(){
delete _1a6.attached[id];
postMessage0(pipe.iframe.contentWindow,["d",id].join(""),pipe.targetOrigin);
},10000);
}
};
pipe={"targetOrigin":_19d,"iframe":_19f,"buffer":[],"post":post,"attach":attach,"detach":detach,"attached":{count:0}};
_18c[_19d]=pipe;
function sendInitWhenReady(){
var _1a7=_19f.contentWindow;
if(!_1a7){
setTimeout(sendInitWhenReady,20);
}else{
postMessage0(_1a7,"I",_19d);
}
};
pipe.handshakeID=setTimeout(function(){
_18c[_19d]=undefined;
pipe.post=function(_1a8){
_197.readyState=4;
_197.status=0;
onreadystatechange(_197);
};
if(pipe.buffer.length>0){
pipe.post();
}
},30000);
document.body.appendChild(_19f);
sendInitWhenReady();
}
return pipe;
};
function onmessage(_1a9){
var _1aa=_1a9.origin;
var _1ab={"http":":80","https":":443"};
var _1ac=_1aa.split(":");
if(_1ac.length===2){
_1aa+=_1ab[_1ac[0]];
}
var pipe=_18c[_1aa];
if(pipe!==undefined&&pipe.iframe!==undefined&&_1a9.source==pipe.iframe.contentWindow){
if(_1a9.data=="I"){
clearTimeout(pipe.handshakeID);
var _1ae;
while((_1ae=pipe.buffer.shift())!==undefined){
postMessage0(pipe.iframe.contentWindow,_1ae,pipe.targetOrigin);
}
pipe.post=function(_1af){
postMessage0(pipe.iframe.contentWindow,_1af,pipe.targetOrigin);
};
}else{
var _1ae=_1a9.data;
if(_1ae.length>=9){
var _1b0=0;
var type=_1ae.substring(_1b0,_1b0+=1);
var id=_1ae.substring(_1b0,_1b0+=8);
var _1b3=_18d[id];
if(_1b3!==undefined){
switch(type){
case "D":
var _1b4=fromHex(_1ae.substring(_1b0,_1b0+=4));
var name=_1ae.substring(_1b0,_1b0+=_1b4);
var _1b6=fromHex(_1ae.substring(_1b0,_1b0+=4));
var data=_1ae.substring(_1b0,_1b0+=_1b6);
if(data.length>0||(name.length>0&&name!="message")){
var e=document.createEvent("Events");
e.initEvent(name,true,true);
e.lastEventId=_1b3.lastEventId;
e.data=data;
e.origin=_1b3.origin;
if(typeof (_1b3.onmessage)==="function"){
_1b3.onmessage(e);
}
}
break;
case "O":
_1b3.readyState=1;
_1b3.onopen();
break;
case "E":
if(_1b3._id===id){
_1b3.onerror();
}
break;
}
}
}
}
}else{
}
};
function fromHex(_1b9){
return parseInt(_1b9,16);
};
function toPaddedHex(_1ba,_1bb){
var hex=_1ba.toString(16);
var _1bd=[];
_1bb-=hex.length;
while(_1bb-->0){
_1bd.push("0");
}
_1bd.push(hex);
return _1bd.join("");
};
window.addEventListener("message",onmessage,false);
return EventSource;
})();
}
