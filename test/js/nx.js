//plernsoft
//---------------------------------------------------------------------------
function NxPortal()
{
	
	//=================================
	function CreateXMLHttpRequest() {
		if (window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHttp");
		} else if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
	}	
 
	//=================================
	 
	this.post= function (mainurl,methodname,jsonObjectData,completeHdl){	 		 
		jQuery.ajax({
			  url:mainurl,
			  type:"POST",
			  data: JSON.stringify({method:methodname,params:jsonObjectData}),
			  contentType:"text; charset=utf-8",
			  dataType:"json",
			  complete:completeHdl
		});   
	}; 
	this.post_async= function (mainurl,dataobject,completeHdl){	 		 
		jQuery.ajax({
			  url:mainurl,
			  type:"POST",
			  data:JSON.stringify({data:dataobject}),
			  contentType:"text; charset=utf-8",
			  dataType:"json",
			  complete:completeHdl
		});   
	};  	
	this.get_async=function(target_url,successHandler){
		var xmlHttp = CreateXMLHttpRequest();
		xmlHttp.onreadystatechange = function () { 
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {		
					successHandler(xmlHttp);                 
				}
			}
		}
		xmlHttp.open("GET", target_url, true);
		xmlHttp.send(null);
	}	
	this.parseInt= function(strInt){
		return parseInt(strInt,10);	
	};
	this.viewportWidth= function(){
		return $(window).width();
	};	
	this.viewportHeight= function(){
		return $(window).height();
	};	
	this.navigate= function(url){
		return window.location.href=url;
	};
	
	this.strLen =  function(str){
		return str.length;
	};
	this.charAt = function(str,index){
		return str.charAt(index);
	};
	this.substr1 = function(str,index){
		return str.substr(index,str.length-index);
	};
	this.parseInt2= function(strInt, radix){
		return parseInt(strInt,radix);	
	};
	this.strToLowerCase= function(str){
		return str.toLowerCase();
	};
	this.alert= function(str){
		return alert(str);
	};
	this.strLocaleCompare =function(str1,str2){
		return str1.localeCompare(str2);
	};
	this.strSplit =function(str1,splitter){
		return str1.split(splitter);
	};
	this.createNewDateTime =function(y,m,d){
		return new Date(y,m,d);
	};
	this.dateDiffYear =function(d1,d2){
		return d2.getFullYear()-d1.getFullYear();
	};
	this.now =function(){
		return new Date();
	};
	this.base64encode =function(input){
		return base64.encode(input);
	};
	this.base64decode=function(input){
		return base64.decode(input);
	};
	this.isTouchDevice=function(){
		return "ontouchstart" in document;
	};
	this.containsKey=function(jsobject,key){
		return ( typeof(jsobject[key]) != 'undefined')
	};
	this.toUpperCase=function(str){
		return str.toUpperCase();
	};
	this.is_undefined=function(value){
		return (typeof value === 'undefined');
	};	
	
}  
var console = console;
if(typeof(console)==='undefined'){
   
   function MyConsoleImpl(){
	this.log=function(info){};
   }	   
   console = new MyConsoleImpl();
}
//--------------------------------------------------------------------------- 



