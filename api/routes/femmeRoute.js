'use strict';

module.exports = function(app) {

    let femme = require('../controllers/femmeController');
   
    app.route('/').get(femme.getAll)    
    
    app.route('/countries')
        .get(femme.getCountriesCurientYear)
        .post(femme.createCountry)
    
    app.route('/:country')
        .get(femme.getCountry)
        .put(femme.updateCountry)        
    
    app.route('/:country/:type?/:year?')
        .get(femme.getCountryType)
    
    app.route('/:country/:type?/:year?/:donne?')
        .get(femme.getCountryType2)
    
    
};