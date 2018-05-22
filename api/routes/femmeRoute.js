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

    app.put("/users/:email/:password/:name?/", user.register)

    app.delete("/users/:email", user.checkAuth, user.delete)


    // TODO : changer mdp
    // TODO : authentification puis token

    //

    // app.route('/users/token').get(user.testToken)

    // app.route('/countries').get(femme.getData)

    // app.route('/countries').get(femme.getAll)

    // app.route('/countries').get(femme.getAll)

    // app.route('/countries/sources/year/:year?').get(femme.getSources)

    // app.route('/filter/').get(femme.c_data)


    // app.route('/countries')
    //     .get(femme.getCountriesCurientYear)
    //     .post(femme.createCountry)



    // // TODO : erreur
    // app.route('/country/:country')
    //     .get(femme.getCountry)
    //     .put(femme.updateCountry)



    // app.route('/country/:country/:type?/:year?')
    //     .get(femme.getCountryType)

    /* app.route('/:country/:type?/:year?/:donne?')
        .get(femme.getCountryType2) */


    // app.route('/:country/:type?/:year?')
    //     .get(femme.getCountryType)
}