<?php
// 2006-2010,plernsoft
$input=file_get_contents("php://input");
$req= json_decode($input,true);//convert to associative array  
//=============================
 $user_req=$req["data"];  
 $method=$user_req["method"];
 include_once("nx_fx.php");   
 $result = nx_fx($method, $user_req["params"]); 
 
 var_dump($req); 
 
 if($result != null)
 {
	NxJson::PrintEnv("1",$result);
 }
 else
 {
	NxJson::PrintEnv("1",array("info"=>"error"));
 } 
?>
