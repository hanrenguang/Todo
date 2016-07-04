<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ToDo</title>
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<header>
		<nav>
			<ul class="clearfix">
				<?php
				if(array_key_exists('username', $_COOKIE)) {
				 if($_COOKIE['username'] != null && $_COOKIE['password']!= null) {
				 		$username = $_COOKIE['username'];
				 		$password = $_COOKIE['password'];
						$cont = new mysqli("localhost", "root", "coderhan", "login");
						mysqli_set_charset($cont, 'utf8');
						$sql_cookie = "SELECT * FROM user WHERE `username` = '$username'";
						$res_cookie = $cont->query($sql_cookie);
						$row_cookie = $res_cookie->fetch_assoc();
						if($res_cookie->num_rows > 0 && $row_cookie['password'] == $password) {
					 ?>
				<li class="first" style="display: none;"><a href="javascript:;">登录</a></li>
				<li class="first" style="display: none;"><a href="javascript:;">注册</a></li>
				<li class="first"><a href="javascript:;" id="user"><?php echo $_COOKIE['username'] ?></a>
					<ul>
						<li class="second"><a href="javascript:;">退出登录</a></li>
					</ul>
				</li>
				<?php } else {?>
				<li class="first"><a href="javascript:;">登录</a></li>
				<li class="first"><a href="javascript:;">注册</a></li>
				<li class="first" style="display: none;"><a href="javascript:;" id="user"></a>
					<ul>
						<li class="second"><a href="javascript:;">退出登录</a></li>
					</ul>
				</li>
				<?php }}} else { ?>
				<li class="first"><a href="javascript:;">登录</a></li>
				<li class="first"><a href="javascript:;">注册</a></li>
				<li class="first" style="display: none;"><a href="javascript:;" id="user"></a>
					<ul>
						<li class="second"><a href="javascript:;">退出登录</a></li>
					</ul>
				</li>
				<?php } ?>
			</ul>
		</nav>
	</header>

	<div class="cover"></div>
	<div class="sign-in">  <!-- 登录框 -->
		<p>登录到ToDo<i class="cancel">X</i></p>
		<form>
			<label>
				用户名：<input type="text" class="user" name="username" >
			</label>
			<label>
				密&nbsp;&nbsp;&nbsp;码：<input type="password" class="pw" name="password" >
			</label>
			<input type="button" class="sign-in-sub" value="确 定">
		</form>
	</div>

	<div class="sign-up">  <!-- 注册框 -->
		<p>注册ToDo账号<i class="cancel_up">X</i></p>
		<form>
			<label>
				用户名：<input type="text" class="user_up" name="username" >
			</label>
			<label>
				密&nbsp;&nbsp;&nbsp;码：<input type="password" class="pw_up" name="password" >
			</label>
			<input type="button" class="sign-up-sub" value="确 定">
		</form>
	</div>

	<div class="write">
		记录假期安排：<input type="text" class="plan" placeholder="简要地写下一条计划">
		<input type="button" class="submit" value="提交">
	</div>
	
	<p class="show">假期计划列表：</p>
	<div class="wrapper">
		<div class="date"></div>
		<?php 
			header("Content-type:text/html; charset-utf-8");
			if(array_key_exists('username', $_COOKIE)) {
				$user = $_COOKIE['username'];
				$conn = new mysqli("localhost", "root", "coderhan", "MyPLAN");
				//mysql_select_db("MyPLAN", $conn);
				mysqli_set_charset($conn, 'utf8');
				$sql = "SELECT * FROM myplans";
				$result = $conn->query($sql);
				/*if($result) {
					// 输出每行数据
					while($row = mysql_fetch_array($result)) {
						$plan = mb_convert_encoding($row["plan"], "UTF-8", "gbk");
					    echo "<p>".$plan.'<a href="javascript:;">done</a></p>';
					}
				}*/
				if ($result->num_rows > 0) {
				    // 输出每行数据
				    while($row = $result->fetch_assoc()) {
				    	if($row["username"] == $user) {
					        echo "<p>".$row["plan"].'<a href="javascript:;">done</a></p>';
					    }
				    }
				}
				
				$conn->close();
			}
		 ?>
	</div>

	<div class="showMsg"></div>
	<script type="text/javascript" src="script/todo.js"></script>
</body>
</html>