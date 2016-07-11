<?php 
	/*$username = $_POST['username'];
	$password = $_POST['password'];*/

	$json_data = json_decode( file_get_contents('php://input') );

	$username = $json_data->username;
	$password = $json_data->password;

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
			echo json_encode(Array('status'=>'success'));
		}
		else {
			echo json_encode(Array('status'=>'failed'));
		}
	}
	else {
		echo json_encode(Array('status'=>'username not found'));
	}
		
	$con->close();
 ?>