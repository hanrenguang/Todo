<?php
	header("Content-type:text/html; charset=utf-8");

	$plan = $_POST['plan'];

	$servername = "localhost";
	$username = "root";
	$password = "coderhan";
	$db = "MyPLAN";

	//创建连接
	$conn = new mysqli($servername, $username, $password, $db);
	mysqli_set_charset($conn, 'utf8');
	//检查连接是否成功
	if($conn->connect_error) {
		die("Connection failed: ".$conn->connect_error);
	}

	//设置字符集
	$conn->query("SET NAMES utf8"); 
	//向表中写入数据
	$sql_insert = "INSERT INTO myplans (".'plan'.") VALUES ("."'".$plan."'".")";
	if($conn->query($sql_insert) === TRUE) {
		//do something
	}
	else {
		echo "Error: ".$sql_insert."<br>".$conn->error;
	}

	//关闭与数据库的连接
	$conn->close();
 ?>