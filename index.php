<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ToDo</title>
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<div class="write">
		记录假期安排：<input type="text" class="plan" placeholder="简要地写下一条计划">
		<input type="button" class="submit" value="提交">
	</div>
	
	<p class="show">假期计划列表：</p>
	<div class="wrapper">
		<div class="date"></div>
		<?php 
			header("Content-type:text/html; charset-utf-8");
			$conn = new mysqli("localhost", "root", "coderhan", "MyPLAN");
			//mysql_select_db("MyPLAN", $conn);
			mysqli_set_charset($conn, 'utf8');
			$sql = "SELECT plan FROM myplans";
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
			        echo "<p>".$row["plan"].'<a href="javascript:;">done</a></p>';
			    }
			}
			
			$conn->close();
		 ?>
	</div>

	<div class="showMsg"></div>
	<script type="text/javascript" src="script/todo.js"></script>
</body>
</html>