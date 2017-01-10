var cx = process.env.CX;
var APIKey = process.env.API_KEY;
var dbUri = process.env.MONGOLAB_URI;

//  url, snippet, thumbnail, context

var express = require('express');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var path = require('path');
var request = require('request');
var pretty = require('express-prettify');
var searchSchema = require('./searchSchema')

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect(dbUri);

var Search = mongoose.model('Search',searchSchema);

app.use(pretty({ query: 'pretty' }));

app.get('/api/imagesearch/:uri', function(req, res) {
	var searchString = decodeURIComponent(req.params.uri);
	var offset = req.query.offset;

	var googleQueryString = 'https://www.googleapis.com/customsearch/v1?q='+encodeURIComponent(searchString)+'&cx='+cx+'&num='+offset+'&searchType=image&key='+APIKey;
	console.log(googleQueryString);
	request(googleQueryString, function (error, response, body) {
		if (error) {
			console.log(error);
		}
		var obj = JSON.parse(body);
		var items = obj.items;
		items = items.map(function(obj){
			return {
				url: obj.link,
				snippet: obj.snippet,
				thumbnail: obj.image.thumbnailLink,
				context: obj.displayLink
			}
		});

		var item = new Search({term: searchString, when: new Date()}).save(function(err, doc){
			if (err)
				console.log(err);
			console.log('Entry inserted');
		})

		res.send(items);
	}) 	
})

app.get('/api/latest/imagesearch',function(req, res){
	Search.find({}, function(err, docs){
		if (err)
			console.log(err);
		docs = docs.map(function(obj){
			return {
				term: obj.term,
				when: obj.when
			}
		})
		res.send(docs)

	})
})

// Change this to process.env.PORT before deploying
app.listen(process.env.PORT || 3000);
console.log('Server running at port 3000');

// For best results use JSON formatter plugin in chrome