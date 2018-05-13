'use strict';
let mongoose = require('mongoose'),
    Countries = mongoose.model('Countries');

exports.hello = function(req, res) {
    res.send('Hello World!') 
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
exports.updateCountry = function(req, res) {    
    Countries.findOneAndUpdate({country: req.params.country}, req.body, {new: true}, function(err, country) {
        if (err){
            res.send(err);
        }          
        res.json(country);
    });
};

exports.getCountryType = function(req, res) {
    let query;
    
    if(req.params.type == 'general'){
        query = Countries.find(
            { country : req.params.country },           
            { general : { $elemMatch: { year : req.params.year }}}        
        )         
    }else{
        query = Countries.find(
            { country : req.params.country },
            { statistical : { $elemMatch: { year : req.params.year }}}
        )      
         
    } 
    query.exec(function (err,country) { 
        if (err){
            res.send(err);
        }        
        res.json(country);    
    }); 
};