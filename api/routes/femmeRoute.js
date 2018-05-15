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


    // app.route('/:country/:type?/:year?')
    //     .get(femme.getCountryType)

    app.route('/c_hello').get(femme.c_hello)

    app.route('/c_all').get(femme.c_all)

    app.route('/c_countries_name').get(femme.c_countries_name)

    app.route('/c_sources').get(femme.c_sources)

    app.route('/c_data').get(femme.c_data)


};