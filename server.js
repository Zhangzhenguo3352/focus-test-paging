var express = require('express');
var fs = require('fs');
var app = express();
app.listen(3001)

	app.use('/users',function(req,res){
		var keyword = req.query.keyword
		var sortBy = req.query.sortBy
		var pageNum = parseInt(req.query.pageNum)
		var pageSize = parseInt(req.query.pageSize)
		var start = (pageNum-1)*pageSize   // 开始的页数
		var end =  pageNum*pageSize // 结束的页数
		var type = req.query.type // 正/ 倒 顺序
		// console.log(keyword)
		var json = require('./1.json')
		//1，过滤,
		var users = json.filter(function(user){
			return user.name.indexOf(keyword) !=-1  // 过滤完成
		}).sort(function(a,b){ // sort 排序
			//倒序判断
			if(type == 'desc'){
				return b[sortBy] - a[sortBy]
			}else{
				return a[sortBy] - b[sortBy]
			}
		}).slice(start,end)
		
		res.send(users)
	})

//按照：
/*
	1，过滤  1234
	2，排序  43 21
	3，分页	 21
*/


// 访问路径是
// http://localhost:3001/users?pageNum=2&pageSize=2&keyword=zhang&sortBy=age&type=desc

// http://localhost:3001/users?pageNum=1&pageSize=2&keyword=zhang&sortBy=age&type=desc
/*
pageNum=2   	返回第2页
pageSize=2		每页2条
keyword=zhang	关键字，用户里面包含 zhang 的	
sortBy=age		安装 age 的值进行排序	
type=desc/asc	倒序排列/正序排列

*/

// 描述：每页2条，查第2页，名字里包含zhang, 按age排序，倒序排列