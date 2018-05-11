'use strict';

module.exports = function(app) {

    let femme = require('../controllers/femmeController');
   
    app.route('/').get(femme.hello)

    app.route('/all').get(femme.allCountries)
};