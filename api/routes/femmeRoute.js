'use strict'

module.exports = function(app) {

    let femme = require('../controllers/femmeController')
    let user = require('../controllers/userController')

    app.get("/", femme.showRoutes)
    app.post("/", femme.showRoutes)

    app.get("/codes", user.checkAuth, femme.getCountriesCode)
    app.post("/codes", user.checkAuth, femme.getCountriesCode)


    // TODO : revoir trop de paramètres optionnels
    app.get("/sources/:countries?/:years?/:categories?", user.checkAuth, femme.getSources)
    app.post("/sources/:countries?/:years?/:categories?", user.checkAuth, femme.getSources)

    app.get("/countries/:countries?/:years?/:general?/:gender?/:sex?/:operator?", user.checkAuth, femme.getData)
    app.post("/countries/:countries?/:years?/:general?/:gender?/:sex?/:operator?", user.checkAuth, femme.getData)


    // TODO : authentification puis token
    // TODO : changer mdp
    app.put("/users/:email/:password/:name?/", user.register)

    app.delete("/users/:email", user.checkAuth, user.delete)


    app.route('/admin').get(femme.admin)

    app.route('/admin/new-country').post(femme.newCountry)

    app.route('/admin/add-gender').post(femme.addGender)

    app.route('/admin/add-general').post(femme.addGeneral)

    app.route('/admin/update-general').post(femme.updateGeneral)

    app.route('/admin/delete-country').post(femme.deleteCountry)
};