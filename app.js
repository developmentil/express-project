var _ = require('underscore');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var expressValidator = require('express-validator');
//var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);

var app = express();
var config = require('./config/' + app.get('env'));

//mongoose.connect(config.mongodb);

// Add all your routers names here:
var routes = [
	'index'
];

app.set('config', config);
app.locals.siteName = config.name;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger(config.logger.format, config.logger));

// domain redirection
app.use(function(req, res, next) {
	if(req.host === config.local.domain)
		return next();
	
	res.redirect(req.protocol + '://' + config.local.domain + req.originalUrl);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressValidator());

app.use(cookieParser(config.secret, config.cookie));
//app.use(session(_.extend({
//	cookie: config.cookie,
//	secret: config.secret,
//	
//	store: new MongoStore(_.extend({
//		mongooseConnection: mongoose.connection
//	}, config.session.storeOptions))
//}, config.session)));

app.use(express.static(path.join(__dirname, 'public')));

// add routes
routes.forEach(function(route) {
	route = require('./routes/' + route);
	
	app.use(route.prefix, route);
	route.app = app;
	route.config = config;
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		if(!err.status)
			err.status = 500;

		res.status(err.status);
		res.render('error', {
			message: err.message,
			status: err.status,
			method: req.method,
			url: req.url,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	if(!err.status)
		err.status = 500;
	  
    
	res.status(err.status);
	res.render('error', {
		message: err.message,
		status: err.status,
		method: req.method,
		url: req.url,
		error: {}
	});
});


module.exports = app;