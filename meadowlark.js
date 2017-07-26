var express = require('express');

var app = express();

var fortunes = [
  "Conquer your fears or they will conquer you.", 
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.", "Whenever possible, keep it simple.",
]; 

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars')
            .create({ defaultLayout:'main' });
/*有可能报 Cannot find module 'glob'   需要安装 glob 包  之后会报找不到handlebars   同样需要安装 handlebars 包*/
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); 


//process为全局变量  env为包含用户环境信息的对象 PORT是自添加的属性
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){ 
           res.render('home');
});
app.get('/about', function(req, res){
            var randomFortune =
          fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune });
});

// 404 catch-all处理器（中间件）
app.use(function(req, res, next){ 
    res.status(404);
    res.render('404');
});

// 500错误处理器（中间件）
app.use(function(err, req, res, next){ 
    console.error(err.stack);
    res.status(500);
    res.render('500');
}); 

app.listen(app.get('port'), function(){
     console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
}); 

console.log(process.env)