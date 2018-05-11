'use strict';
let mongoose = require('mongoose'),
    Countries = mongoose.model('Countries');

exports.hello = function(req, res) {
    res.send('Hello World!') 
};

exports.allCountries = function(req, res) {
    Countries.find({}, function(err, countrie) {
        if (err){
            res.send(err);
        }            
        res.json(countrie);
    }); 
};