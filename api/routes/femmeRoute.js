'use strict';

module.exports = function(app) {

    let femme = require('../controllers/femmeController');
   
    app.route('/').get(femme.hello)

    app.route('/all').get(femme.allCountries)
    
    app.route('/countries')
        .get(femme.getAllCountries)
        .post(femme.createCountry)
    
    app.route('/:country')
        .get(femme.getCountry)
        /*.put(femme.updateCountry)
        .delete(todoList.deleteCountry); */
};