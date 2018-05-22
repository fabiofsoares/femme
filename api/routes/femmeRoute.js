'use strict';

module.exports = function(app) {

    let femme = require('../controllers/femmeController');
   
    app.route('/').get(femme.getAll)

    app.route('/c_hello').get(femme.c_hello)

    app.route('/c_all').get(femme.c_all)

    app.route('/c_countries_name').get(femme.c_countries_name)

    app.route('/c_sources').get(femme.c_sources)

    app.route('/c_data').get(femme.c_data)    
    
    app.route('/country/:country').get(femme.getCountry)  

    app.route('/country/:country/:type?/:year?').get(femme.getCountryType)
    
    //Page Admin
    app.route('/admin').get(femme.admin)

    app.route('/admin/new-country').post(femme.newCountry)    
    
    app.route('/admin/add-gender').post(femme.addGender)
    
    app.route('/admin/add-general').post(femme.addGeneral)

    app.route('/admin/update-general').post(femme.updateGeneral)

    app.route('/admin/delete-country').post(femme.deleteCountry)

};