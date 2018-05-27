
'use strict'

module.exports = function(app) {

    const femme     = require('../controllers/femmeController')
    const user      = require('../controllers/userController')

    // ROUTE ACCUEIL
    app.get("/", femme.showRoutes)

    // RECUPERER LES CODES DES PAYS
    app.get("/codes", user.checkCors, femme.getCountriesCode)

    // RECUPERER UNIQUEMENT LES SOURCES
    app.get("/sources", user.checkCors, femme.getSources)

    // RECUPERER DES DONNES
    app.get("/countries", user.checkCors, femme.getData)

    // ENREGISTRER UN UTILISATEUR
    app.post("/users", user.register)

    // SE CONNECTER
    app.post("/users/:email", user.login)

    // METTRE A JOUR SON MOT DE PASSE / NOM / DNS
    app.put("/users", user.checkAuth, user.update)

    // EFFACER SON COMPTE
    app.delete("/users", user.checkAuth, user.delete)



    app.route('/admin').get(femme.admin)

    app.route('/admin/new-country').post(femme.newCountry)

    app.route('/admin/add-gender').post(femme.addGender)

    app.route('/admin/add-general').post(femme.addGeneral)

    app.route('/admin/update-general').post(femme.updateGeneral)

    app.route('/admin/delete-country').post(femme.deleteCountry)
};