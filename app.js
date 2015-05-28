var Express = require('express');
var app = Express();

var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

nunjucks.configure(__dirname + '/pages', {
  autoescape: true,
  express   : app
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(Express.static(__dirname + "/public"));

app.get('/', function(req, res){
	res.render('index.html', {title: 'Base-app Title'});
});

app.listen(4000, function(){
	console.log('Listening on 4000');
});