const express = require('express');
const app = express();
const request = require('request');


app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/categories', function(req, res, next) {
	request(`https://en.wikipedia.org/w/api.php?action=query&generator=allcategories&format=json&gaclimit=10&gacprefix=${req.query.gacprefix}`, (error, response, body) => {
		  if (!error && response.statusCode === 200) {
		  	let data = JSON.parse(body),
		  			category = data.query.pages;
		  			categoryTitles = [];
		  	for (var key in category) {
		  		categoryTitles.push(category[key]['title'].split(':')[1]);
		  	}
		  	res.send(categoryTitles);
		  }
	})
});

app.listen(3001, function() {
	console.log('Listening on port 3001.')
})