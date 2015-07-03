<?php  
//2009-2015, plernsoft
function login2($params)
{		
	if($params["a1"]==1 && $params["b1"]==2){
		return array("result_msg"=>"OK!","code"=>0);
		//return "OK1!";
	}else{
		return array("result_msg"=>"FAIL!","code"=>1);
		//return "FAIL!";
	}	 
} 
?>