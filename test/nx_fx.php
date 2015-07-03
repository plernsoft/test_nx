<?php   
function nx_fx($methodname,$params)
{     
	$thisdir=dirname(__FILE__);
	require_once($thisdir."/lib/nx.core3.php"); //core 3 for json 
	//====================================
	//policy table -- avaliable method 
	$funcs=array( 
		"login2"=>1, 
	); 	 
	$pfx = $thisdir."/lib/";
	if(array_key_exists($methodname,$funcs))//if desired function is in a policy table
	{ 	
		include_once($pfx.$methodname.".php");	 
		return call_user_func($methodname,&$params); 
	}
	else
	{	return null;
	}
} 
?>
