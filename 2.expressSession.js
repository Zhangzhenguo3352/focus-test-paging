var express = require('express');
//1, 使用
var expressSession = require('express-session');
var app = express();
app.listen(3001)
	// 使用
	app.use(expressSession({
		secret:'abc', //加密，名字
		resave:true, // 每次请求结束都要重新保存，不管有没有修改 true
		saveUninitialized:true, // true 一个session创建出来，访问是否保存
		cookie:{maxAge:20*60*1000} // 20秒后失效

	}))
	app.get('/',function(req,res){
		//var isLogin = req.session.aaa
		if(req.session.aaa){
			res.send('老朋友')
		}else{
			req.session.aaa = '1'
			res.send('新朋友')
		}
	})

// 为了解决 服务器重启 不认识当前用户了，因为是放在缓存中的，应该放在数据库中