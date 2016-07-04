<?php 
	if ($_POST['username'] != null && $_POST['password'] != null) {
		$username = $_POST['username'];
		$password = $_POST['password'];
		$con = new mysqli("localhost", "root", "coderhan", "login");
		mysqli_set_charset($con, 'utf8');
		$sql_user = "SELECT * FROM user WHERE `username` = '$username'";
		$res = $con->query($sql_user);
		if($res->num_rows > 0) {
			$row_user = $res->fetch_assoc();
			if($row_user['password'] == $password) {
				//清除之前设置的COOKIE
				setcookie("username", "", time()-3600);
				setcookie("password", "", time()-3600);
				//设置cookie把用户名和密码保存在客户端
				setcookie('username', $username, time()+60*60*24);
				setcookie('password', $password, time()+60*60*24);
			}
			else {
				echo "failed";
			}
		}
		else {
			echo "username not found";
		}
		
		$con->close();
	}
 ?>