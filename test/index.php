<html>
<head>
	<script type='text/javascript' src='js/jquery-1.7.2.min.js'></script> 
	<script type='text/javascript' src='js/json2.js'></script>
	<script type='text/javascript' src='js/nx.js'></script>  
</head>
<body>
	<input type="text"" name="a1" id="a1"></input>
	<input type="text"" name="b1" id="b1"></input>
	<button onmousedown="testSendData()">SendData</button>
	<div id="server_msg">
		Server Msg
	</div>
</body>
<script>
		function testSendData(){
		    var mynx= new NxPortal();
			console.log($("#a1").val());
			console.log($("#b1").val());
			
		    var parameters={method:"login2",params:{"a1":$("#a1").val(),"b1":$("#b1").val()}};
			
			mynx.post_async("main.php",parameters,function(resp){
				$("#server_msg").html(resp.responseText);		 
			});  
		}	 
	</script>
</html>