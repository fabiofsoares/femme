
'use strict'
const mcache          = require('memory-cache'),
      time_cache      = 10;

let cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
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
    app.get("/", cache(time_cache), femme.showRoutes)

    // RECUPERER LES CODES DES PAYS
    app.get("/codes", user.checkCors, cache(time_cache), femme.getCountriesCode)

    // RECUPERER UNIQUEMENT LES SOURCES
    app.get("/sources", user.checkCors, cache(time_cache), femme.getSources)

    // RECUPERER DES DONNES
    app.get("/countries", user.checkCors, cache(time_cache), femme.getData)

    // ENREGISTRER UN UTILISATEUR
    app.post("/users", user.register)

    // SE CONNECTER
    app.post("/users/:email", user.login)

    // METTRE A JOUR SON MOT DE PASSE / NOM / DNS
    app.put("/users", user.checkAuth, user.update)

    // EFFACER SON COMPTE
    app.delete("/users", user.checkAuth, user.delete)


    // il faut mettre user.checkAuth
    app.get('/admin', cache(time_cache), femme.admin)

    app.post('/admin/add-gender', femme.addGender)

    app.post('/admin/add-general', femme.addGeneral)

    app.post('/admin/update-general', femme.updateGeneral)

    app.post('/admin/update-gender', femme.updateGender)
};