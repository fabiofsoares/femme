'use strict';

module.exports = function(app) {

    let femme = require('../controllers/femmeController');
   
    app.route('/').get(femme.hello)    
    
    app.route('/countries')
        .get(femme.getAllCountries)
        .post(femme.createCountry)
    
    app.route('/:country')
        .get(femme.getCountry)
        .put(femme.updateCountry)        
    
    app.route('/:country/:type?/:year?')
        .get(femme.getCountryType)
    
    
};