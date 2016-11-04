var fs = require('fs');
var path = require('path');
var loader = require('../');
var assert = require('chai').assert;


describe('模板文件', function() {
	var context = {
		query: '?type=html&root=' + __dirname,
		resourcePath: path.resolve(__dirname, './modules/test/index.html')
	};

	var content = fs.readFileSync(context.resourcePath, 'utf-8');

	it('html', function() {
		var result = loader.call(context, content);
		console.log(result);
	});
});


describe('css文件', function() {
	var context = {
		query: '?type=css&root=' + __dirname,
		resourcePath: path.resolve(__dirname, './modules/test/index.css')
	};

	var content = fs.readFileSync(context.resourcePath, 'utf-8');
	
	it('css', function() {
		var result = loader.call(context, content);
		console.log(result);
	});
});

describe('其他文件', function() {
	var context = {
		query: '?type=js&root=' + __dirname,
		resourcePath: path.resolve(__dirname, './modules/test/index.js')
	};

	var content = fs.readFileSync(context.resourcePath, 'utf-8');
	
	it('其他文件', function() {
		var result = loader.call(context, content);
		console.log(result);
	});
});




