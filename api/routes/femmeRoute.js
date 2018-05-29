'use strict'

const mcache          = require('memory-cache')

var cache = (duration) => {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url
      let cachedBody = mcache.get(key)
      if (cachedBody) {
        res.send(cachedBody)
        return
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          res.sendResponse(body)
        }
        next()
      }
    }
  }

module.exports = function(app) {

    const femme     = require('../controllers/femmeController')
    const user      = require('../controllers/userController')

    // ROUTE ACCUEIL
    app.get("/", user.checkCors, femme.showRoutes)

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

    // PAGE ADMIN
    app.get('/admin', femme.admin)

    // RAJOUTER DONNES GENDER
    app.post('/admin/add-gender',femme.addGender)

    // RAJOUTER DONNES GENERAL
    app.post('/admin/add-general',femme.addGeneral)

    // METTRE A JOUR DES DONNES GENDER
    app.post('/admin/update-general',femme.updateGeneral)

    // METTRE A JOUR DES DONNES GENDER
    app.post('/admin/update-gender',femme.updateGender)
};