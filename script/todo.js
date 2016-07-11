/* 计划制定 */
window.onload = function() {
	/* 获取日期并显示在页面上 */
	var date = new Date(),
		closingDate = new Date(),
		year = date.getFullYear(),
	    month = date.getMonth() + 1,
	    day = date.getDate();
	var dateElem = document.querySelector(".date");

	closingDate.setFullYear(2016, 7, 29);
	var differ = closingDate.getTime() - date.getTime();
	differ = Math.floor(differ / (24*60*60*1000));
	dateElem.innerHTML = '现在的日期是：' + year + '年' + month + '月' + day + '日' + '&nbsp;&nbsp;&nbsp;&nbsp;距放假结束还有：' + differ + '天';


	/* 退出登录的显示和隐藏 */
	var user = document.querySelectorAll(".first")[2];
	var signOut = document.querySelector(".second");
	user.onmouseover = function() {
		signOut.style.display = "block";
	};
	user.onmouseout = function() {
		signOut.style.display = "none";
	};

	//退出登录
	signOut.onclick = function() {
		sendMsg('signOut.php', {}, "sign_out");
	};

	/* 登录框的显示和隐藏 */
	var signIn = document.querySelectorAll(".first")[0];
	var signInBox = document.querySelector(".sign-in");
	var signInX = document.querySelector(".cancel");
	signIn.onclick = function() {
		signDiv(signInBox, "block");
	};
	signInX.onclick = function() {
		signDiv(signInBox, "none");
	};

	//登录
	var user_in = document.querySelector(".user");
	var pw_in = document.querySelector(".pw");
	var sub_in = document.querySelector(".sign-in-sub");
	sub_in.onclick = function(e) {
		e = e || window.event;
		try {  //阻止表单提交默认行为
			e.preventDefault();
		} catch(err) {
			window.event.returnValue = false;
		}
		
		var username = user_in.value;
		var password = pw_in.value;
		//前端验证用户和密码
		var isOk = testData(username, password);
		if(!isOk) {
			return ; 
		}
		sendMsg('signIn.php', {'username': username, 'password': password}, "sign_in");
	};


	/* 注册框的显示和隐藏 */
	var signUp = document.querySelectorAll(".first")[1];
	var signUpBox = document.querySelector(".sign-up");
	var signUpX = document.querySelector(".cancel_up");
	signUp.onclick = function() {
		signDiv(signUpBox, "block");
	};
	signUpX.onclick = function() {
		signDiv(signUpBox, "none");
	};

	//注册
	var user_up = document.querySelector(".user_up");
	var pw_up = document.querySelector(".pw_up");
	var sub_up = document.querySelector(".sign-up-sub");
	sub_up.onclick = function(e) {
		e = e || window.event;
		try {  //阻止表单提交默认行为
			e.preventDefault();
		} catch(err) {
			window.event.returnValue = false;
		}

		var username = user_up.value;
		var password = pw_up.value;
		//前端验证用户和密码
		var isOk = testData(username, password);
		if(!isOk) {
			return ; 
		}
		signDiv(signUpBox, "none");
		sendMsg('signUp.php', {'username': username, 'password': password}, "sign_up");
	};

	/* 获取当前计划，并存储在数据库中 */
	var submit = document.querySelector(".submit"),
	    planContent = document.querySelector(".plan");
	submit.onclick = function () {
		var plan = planContent.value;
		var user = document.getElementById("user");
		if(!user) {
			showMessage("请登录后重试！");
			return ;
		}
		else if(!plan) {
			showMessage("未输入当前计划！");
			return ;
		}
		else {
			var username = user.innerHTML;
			planContent.value = "";
			/* 调用函数发送Ajax请求 */
			sendMsg('storage.php', {'username': username, 'plan': plan}, 'plan');
		}
	};

	/* 完成计划或者删除计划 */
	var wrapper = document.querySelector(".wrapper");
	var donePlan = wrapper.getElementsByTagName('a');
	for(var i = 0; i < donePlan.length; i++) {
		donePlan[i].onclick = function() {
			//confirmInfo();
			var user = document.getElementById("user").innerHTML;
			var plan = getPlan(this.parentNode.innerHTML);
			sendMsg('delPlan.php', {'username': user, 'plan': plan}, 'plan');
		};
	}
};

/* 获取计划内容 */
function getPlan(str) {
	var re = /^(.*)\<a.*\>.+\<\/a\>$/g;
	var myArr = re.exec(str);
	return myArr[1];
}

/* 显示提示信息 */
function showMessage(msg) {
	var msgBox = document.querySelector(".showMsg");
	msgBox.innerHTML = msg;
	msgBox.style.display = "block";
	setTimeout(function() {
		msgBox.style.display = "none";
	}, 2300);
}

/* 发送Ajax请求 */
function sendMsg(url, data, db) {
	var http_request = null;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new XMLHttpRequest();
        } 
    else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
	//服务器返回后的回调
	http_request.onreadystatechange = function() {
		if(http_request.readyState == 4) {
			if(http_request.status == 200) {
				if(url == 'storage.php') {
					/* 返回成功后将计划显示在页面上 */
					showPlan(data['plan']);
				}
				else if(url == 'delPlan.php') {
					delPlan(data['plan']);
				}
				else if(url == 'signIn.php') {
					var signInBox = document.querySelector(".sign-in");
					var responseData = http_request.response['status'];

					if(responseData == "failed") {
						showMessage("密码错误！");
						resetForm();
						return ;
					}
					else if(responseData == "username not found") {
						showMessage("该用户不存在！");
						resetForm();
						return ;
					}
					else {
						signDiv(signInBox, "none");
						window.location.href = '../Todo';
					}
				}
				else {
					window.location.href = '../Todo';
				}
			}
			else {
				showMessage("服务器响应失败！");
			}
		}
	};
	http_request.responseType = "json";  //设置接收的数据类型为json
	http_request.open('POST', url, true);
	http_request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	//http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
	if(db == 'plan') {
		var sendData = JSON.stringify(data);
		http_request.send(sendData);
		//http_request.send('username=' + data['username'] + '&plan=' + data['plan']);
	}
	else if(db == "sign_out") {
		http_request.send();
	}
	else {
		var signInData = JSON.stringify(data);
		http_request.send(signInData);
		//http_request.send('username=' + data['username'] + '&password=' + data['password']);
	}
}

/* 增加计划 */
function showPlan(plan) {
	var parent = document.querySelector(".wrapper"),
	    newElem = document.createElement("p");
	    
	newElem.innerHTML = plan + '<a href="javascript:;">done</a>';
	parent.appendChild(newElem);
	newElem.getElementsByTagName('a')[0].onclick = function() {
		//confirmInfo();
		var user = document.getElementById("user").innerHTML;
		var myPlan = getPlan(this.parentNode.innerHTML);
		sendMsg('delPlan.php', {'username': user, 'plan': myPlan}, 'plan');
	};
}

/* 删除计划 */
function delPlan(plan) {
	var parent = document.querySelector(".wrapper");
	var planElems = parent.getElementsByTagName("p");
	var re;
	var myArr;
	for(var i = 0; i < planElems.length; i++) {
		myPlan = getPlan(planElems[i].innerHTML);
		if(myPlan == plan) {
			parent.removeChild(planElems[i]);
			break;
		}
	}
}

//显示和隐藏浮层
function signDiv(sign, dis) {
	var cover = document.querySelector(".cover");
	cover.style.display = dis;
	sign.style.display = dis;
}

//前端验证username和password
function testData(user, pw) {
	if(!user) {
		showMessage("用户名不能为空！");
		return false;
	}
	else if(!pw) {
		showMessage("密码不能为空！");
		return false;
	}
	else if(user.length > 10) {
		showMessage("用户名不能超过10个字符！");
		return false;
	}
	else if(pw.length > 12) {
		showMessage("密码不能超过12个字符！");
		return false;
	}
	else {
		return true;
	}
}

//重置表单的值
function resetForm() {
	var user_in = document.querySelector(".user");
	var pw_in = document.querySelector(".pw");
	user_in.value = "";
	pw_in.value = "";
}