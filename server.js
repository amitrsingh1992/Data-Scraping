var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.use(morgan('dev'));

app.post('/syncTopPackagesCategories', function(req, res) {
//console.log("entered scrape section by GET call");
    url = 'http://www.imdb.com/title/tt1229340/';

    request(url, function(error, response, html) {
      console.log("requesting data from url");
        if (!error) {

            var $ = cheerio.load(html);
            console.log("data loaded using cheerio");
            var title, release, rating;
            var json = {
                title: "",
                release: "",
                rating: ""
            };

            $('.ratingValue').filter(function() {
              console.log("enter for getting rating data");
                var data = $(this);
                console.log(data.toString());
                rating = data.children().text();
                json.rating = rating;
                console.log("Rating=" + rating);

            })

            $('.title_wrapper').filter(function() {
              console.log("enter for getting title data");
                var data = $(this);
                console.log(data.toString());
                title = data.children().first().text();
                json.title = title;
                console.log("Title=" + title);

            })
            $('.subtext').filter(function() {
              console.log("enter for getting release data");
                var data = $(this);
                console.log(data.toString());
                release = data.children().last().text();
                release = release.replace(/(\r\n|\n|\r)/gm,"");
                json.release = release;
                console.log("Release=" + release);

            })
        }
        console.log("done");

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {

            console.log('File successfully written! - Check your project directory for the output.json file');

        });

        res.send('check ur console');
    });
});

app.listen('8081')
console.log('Magic happens on port 8081');
module.exports = app;
