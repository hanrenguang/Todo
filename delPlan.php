<?php 
	$plan = $_POST['plan'];
	$user = $_POST['username'];
	
	//连接数据库
	$conn = mysqli_connect("localhost", "root", "coderhan", "MyPLAN");
	mysqli_set_charset($conn, 'utf8');
	if(!$conn) {
		die("数据库连接错误：".mysqli_connect_error());
	}

	$sql = "DELETE FROM myplans WHERE `username`='$user' AND `plan`='$plan'";
	mysqli_query($conn, $sql);

	mysqli_close($conn);
 ?>