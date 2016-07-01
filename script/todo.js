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

	/* 获取当前计划，并存储在数据库中 */
	var submit = document.querySelector(".submit"),
	    planContent = document.querySelector(".plan");
	submit.onclick = function () {
		var plan = planContent.value;
		if(!plan) {
			showMessage("未输入当前计划！");
			return ;
		}
		else {
			planContent.value = "";
			/* 调用函数发送Ajax请求 */
			var isSuccess = sendMsg('storage.php', plan);
		}
	};

	/* 完成计划或者删除计划 */
	var wrapper = document.querySelector(".wrapper");
	var donePlan = wrapper.getElementsByTagName('a');
	for(var i = 0; i < donePlan.length; i++) {
		donePlan[i].onclick = function() {
			//confirmInfo();
			var re = /^(.*)\<a.*\>.+\<\/a\>$/g;
			var myArr = re.exec(this.parentNode.innerHTML);
			sendMsg('delPlan.php', myArr[1]);
		};
	}
};

function showMessage(msg) {
	var msgBox = document.querySelector(".showMsg");
	msgBox.innerHTML = msg;
	msgBox.style.opacity = "1";
	setTimeout(function() {
		msgBox.style.opacity = "0";
	}, 2000);
}

function sendMsg(url, data) {
	var http_request;
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
					showPlan(data);
				}
				else {
					delPlan(data);
				}
			}
			else {
				showMessage("服务器响应失败！");
			}
		}
	};
	http_request.open('POST', url, true);
	http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
	http_request.send('plan=' + data);
}

function showPlan(plan) {
	var parent = document.querySelector(".wrapper"),
	    newElem = document.createElement("p");
	    
	newElem.innerHTML = plan + '<a href="javascript:;">done</a>';
	parent.appendChild(newElem);
	newElem.getElementsByTagName('a')[0].onclick = function() {
		//confirmInfo();
		var re = /^(.*)\<a.*\>.+\<\/a\>$/g;
		var myArr = re.exec(this.parentNode.innerHTML);
		sendMsg('delPlan.php', myArr[1]);
	};
}

function delPlan(plan) {
	var parent = document.querySelector(".wrapper");
	var planElems = parent.getElementsByTagName("p");
	var re;
	var myArr;
	for(var i = 0; i < planElems.length; i++) {
		re = /^(.*)\<a.*\>.+\<\/a\>$/g;
		myArr = re.exec(planElems[i].innerHTML);
		if(myArr[1] == plan) {
			parent.removeChild(planElems[i]);
			break;
		}
	}
}