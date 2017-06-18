var express = require('express');
var router = express.Router();
var Handlebars = require('handlebars');
/*
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});
*/
router.get('/', function(req, res){
	res.render('welcome');
});


var scripts = [
								{script: '../../bower_components/modernizr/bin/modernizr'},
								{script: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC7V_S7S7iFLGfvxeOrnGqP9SdcZJSAK00'},
								{script: '../../bower_components/angular/angular.js'},
								{script: '../../bower_components/angular-route/angular-route.js'},
								{	script: '../../bower_components/jquery/dist/jquery.js'},
								{script: '../../bower_components/angularjs-geolocation/dist/angularjs-geolocation.min.js'},
								{script: '../../js/app.js'},
								{script: '../../js/addCtrl.js'},
								{script: '../../js/gservice.js'},
								{script: '../../js/queryCtrl.js'},
								{script: '../../js/listCtrl.js'}
							];




router.get('/map',ensureAuthenticated, function(req, res){
	res.render('map', {scripts: scripts} );
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/welcome');
	}
}

router.get('/admin',ensureAdmin, function(req, res){
	res.render('admin', {scripts: scripts} );
});

function ensureAdmin(req, res, next){
	if(req.user.tipo=='admin'){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/map');
	}
}

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = router;
