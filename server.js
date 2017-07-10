const express = require('express');
const app = express();
const request = require('request');


app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.get('/categories', function(req, res, next) {
	request(`https://en.wikipedia.org/w/api.php?action=query&generator=allcategories&format=json&gaclimit=10&gacprefix=${req.query.gacprefix}`, (error, response, body) => {
		if (error) {
			res.send({status: response.statusCode, message: 'There was an error with your request.'});
		} 
  	let data = JSON.parse(body),
  			categories = [];

  	if (data.query && data.query.pages) { 
  		let category = data.query.pages 
	  	for (var key in category) {
	  		categories.push({ 
	  			pageid: category[key]['pageid'],
	  			title:category[key]['title'].split(':')[1]
	  		});
	  	}
  	}
  	res.send(categories);
	})
});

app.get('/pages', function(req, res, next) {
	request(`https://en.wikipedia.org/w/api.php?action=query&format=json&generator=categorymembers&gcmlimit=10&gcmpageid=${req.query.categoryId}&prop=info&inprop=url`, (error, response, body) => {
		if (error) {
			res.send({status: response.statusCode, message: 'There was an error with your request.'});
		} 
		let data = JSON.parse(body),
				pages = [];
		if (data.query && data.query.pages) {
			let page = data.query.pages;
      for (var key in page) {
	  		pages.push({ 
	  			pageid: page[key]['pageid'],
	  			fullurl: page[key]['fullurl'],
	  			title: page[key]['title']
	  		});
		  }
		}
    res.send(pages);
	})
})

app.listen(3001, function() {
	console.log('Listening on port 3001.') 
})