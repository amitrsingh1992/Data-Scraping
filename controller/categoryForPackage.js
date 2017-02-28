var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs");
var user = require('../model/gpSchema');

router.post("/", function(req, res) {
var url = 'https://play.google.com/store/apps/details?id=' + req.body.url;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
user.findOne({
    packageName: req.body.url
}, function(err, data) {
    if (data !== null)
        res.send(data)
    else {
        request(url, function(error, response, html) {
            if (!error) {

                var $ = cheerio.load(html);
                var title, categoryName;
                var json = {
                    title: "",
                    packageName: req.body.url,
                    categoryName: ""
                };

                $('.id-app-title').filter(function() {
                    var data = $(this);
                    title = data.text();
                    json.title = title;
                })

                $('a.category').filter(function() {
                    var data = $(this);
                    categoryName = data.text();
                    json.categoryName = categoryName;
                })
                try {
                    var data = new user({
                        packageTitle: title,
                        packageName: req.body.url,
                        packageCategory: categoryName
                    });
                    data.save(function(err, result) {
                        if (err) throw err;
                        res.send(result);
                    })
                } catch (e) {
                    res.status(304).send("Team Data Entry failed");
                }
            }
            // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            //     console.log('File successfully written! - Check your project directory for the output.json file');
            // });
        });
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
module.exports = router;
