'use strict';
let mongoose = require('mongoose'),
    Countries = mongoose.model('Countries');

exports.hello = function(req, res) {
    res.send('Hello World!') 
};

exports.getAll = function(req, res) {
    Countries.find({}, function(err, countries) {
        if (err){
            res.send(err);
        }            
        res.json(countries);
    }); 
};

exports.getCountriesCurientYear = function(req, res) {
    query = Countries.find({
        $and : [           
            { general : { $elemMatch: { year : '2018' }} },        
            { statistical : { $elemMatch: { year : '2018' }}}   
        ]     
    })
    query.exec(function (err,country) { 
        if (err){
            res.send(err);
        }        
        res.json(country);    
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
            { general : { $elemMatch: { year : req.params.year }},  country : req.params.country }        
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

exports.getCountryType2 = function(req, res) {
    console.log('donne', req.params.donne)
    let query;
    
    if(req.params.type == 'general'){
        query = Countries.find(
            {  },           
            { general : { $elemMatch: { year : req.params.year }},  country : req.params.country }        
        )        
    }else{
        query = Countries.find(           
            { country : req.params.country },
            { statistical : { $elemMatch: { year : req.params.year,  }},  country : req.params.country }  
            
        )      
         
    } 
    query.exec(function (err,country) { 
        if (err){
            res.send(err);
        }        
        res.json(country);    
    }); 
};