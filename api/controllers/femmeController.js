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

exports.getAllCountries = function(req, res) {
    Countries.find({}, function(err, countries) {
        if (err){
            res.send(err);
        }            
        res.json(countries);
    }); 
};

exports.createCountry = function(req, res) {
    var newCountry = new Countries(req.body);
    newCountry.save(function(err, country) {
      if (err){
        res.send(err);
      }        
      res.json(country);
    });
};

exports.getCountry = function(req, res) {
    Countries.findOne({country: req.params.country}, function(err,country) { 
        if (err){
            res.send(err);
        }        
        res.json(country);    
    });
  };