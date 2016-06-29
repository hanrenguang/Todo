/* 计划制定 */
window.onload = function() {
	/* 获取日期并显示在页面上 */
	var date = new Date();
	var year = date.getFullYear(),
	    month = date.getMonth() + 1,
	    day = date.getDate();
	var dateElem = document.querySelector(".date");
	dateElem.innerHTML = year + '年' + month + '月' + day + '日';

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
			var isSuccess = sendMsg(plan);
		}
	};
};

function showMessage(msg) {
	var msgBox = document.querySelector(".showMsg");
	msgBox.innerHTML = msg;
	msgBox.style.opacity = "1";
	setTimeout(function() {
		msgBox.style.opacity = "0";
	}, 2000);
}

function sendMsg(plan) {
	
}