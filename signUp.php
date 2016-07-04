<?php 
	$username = trim($_POST['username']);
	$password = trim($_POST['password']);
	$con = new mysqli("localhost", "root", "coderhan", "login");
	mysqli_set_charset($con, 'utf8');
	$sql_user = "INSERT INTO user (username, password) VALUES ('".$username."','".$password."')";
	$res = $con->query($sql_user);
	//清除之前设置的COOKIE
	setcookie("username", "", time()-3600);
	setcookie("password", "", time()-3600);
	//设置cookie把用户名和密码保存在客户端
	setcookie('username', $username, time()+60*60*24);
	setcookie('password', $password, time()+60*60*24);

	$con->close();
 ?>