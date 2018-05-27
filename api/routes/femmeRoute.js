'use strict'
const mcache          = require('memory-cache'),
      time_cache      = 10;  

let cache = (duration) => {
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

    let femme = require('../controllers/femmeController')
    let user = require('../controllers/userController')

    //app.get("/", cache(10), femme.showRoutes)
    app.get("/", cache(time_cache), femme.showRoutes)
    app.post("/", femme.showRoutes)

    app.get("/codes", cache(time_cache), user.checkAuth, femme.getCountriesCode)
    app.post("/codes", user.checkAuth, femme.getCountriesCode)


    // TODO : revoir trop de paramètres optionnels
    app.get("/sources/:countries?/:years?/:categories?", cache(time_cache), user.checkAuth, femme.getSources)
    app.post("/sources/:countries?/:years?/:categories?", user.checkAuth, femme.getSources)

    app.get("/countries/:countries?/:years?/:general?/:gender?/:sex?/:operator?", cache(time_cache), user.checkAuth, femme.getData)
    app.post("/countries/:countries?/:years?/:general?/:gender?/:sex?/:operator?", user.checkAuth, femme.getData)


    // TODO : authentification puis token
    // TODO : changer mdp
    app.put("/users/:email/:password/:name?/", user.register)

    app.delete("/users/:email", user.checkAuth, user.delete)

    // il faut mettre user.checkAuth
    app.get('/admin', cache(time_cache), femme.admin)    

    app.post('/admin/add-gender',femme.addGender)

    app.post('/admin/add-general',femme.addGeneral)

    app.post('/admin/update-general',femme.updateGeneral)

    app.post('/admin/update-gender',femme.updateGender)    
};