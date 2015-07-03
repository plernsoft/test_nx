//============================================
var JSON;if(!JSON){JSON={};}
(function(){'use strict';function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());
 
//---------------------------------------------------------------------------
base64={};base64.PADCHAR="=";base64.ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";base64.getbyte64=function(c,b){var a=base64.ALPHA.indexOf(c.charAt(b));if(a==-1){throw"Cannot decode base64"}return a};base64.decode=function(d){d=""+d;var g=base64.getbyte64;var f,c,e;var b=d.length;if(b==0){return d}if(b%4!=0){throw"Cannot decode base64"}f=0;if(d.charAt(b-1)==base64.PADCHAR){f=1;if(d.charAt(b-2)==base64.PADCHAR){f=2}b-=4}var a=[];for(c=0;c<b;c+=4){e=(g(d,c)<<18)|(g(d,c+1)<<12)|(g(d,c+2)<<6)|g(d,c+3);a.push(String.fromCharCode(e>>16,(e>>8)&255,e&255))}switch(f){case 1:e=(g(d,c)<<18)|(g(d,c+1)<<12)|(g(d,c+2)<<6);a.push(String.fromCharCode(e>>16,(e>>8)&255));break;case 2:e=(g(d,c)<<18)|(g(d,c+1)<<12);a.push(String.fromCharCode(e>>16));break}return a.join("")};base64.getbyte=function(c,b){var a=c.charCodeAt(b);if(a>255){throw"INVALID_CHARACTER_ERR: DOM Exception 5"}return a};base64.encode=function(e){if(arguments.length!=1){throw"SyntaxError: Not enough arguments"}var b=base64.PADCHAR;var g=base64.ALPHA;var f=base64.getbyte;var d,h;var a=[];e=""+e;var c=e.length-e.length%3;if(e.length==0){return e}for(d=0;d<c;d+=3){h=(f(e,d)<<16)|(f(e,d+1)<<8)|f(e,d+2);a.push(g.charAt(h>>18));a.push(g.charAt((h>>12)&63));a.push(g.charAt((h>>6)&63));a.push(g.charAt(h&63))}switch(e.length-c){case 1:h=f(e,d)<<16;a.push(g.charAt(h>>18)+g.charAt((h>>12)&63)+b+b);break;case 2:h=(f(e,d)<<16)|(f(e,d+1)<<8);a.push(g.charAt(h>>18)+g.charAt((h>>12)&63)+g.charAt((h>>6)&63)+b);break}return a.join("")};
//--------------------------------------------------------------------------- 
 
