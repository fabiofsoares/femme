const   express         = require('express'),
        mongoose        = require('mongoose'),
        bodyParser      = require('body-parser'),
        app             = express(),
        PORT            = process.env.PORT || 3000,
        host            = 'safe-hamlet-93581.herokuapp.com',
        levenshtein     = require('fast-levenshtein'),
        jwt             = require('jsonwebtoken'),
        bcrypt          = require('bcryptjs'),
        routes          = require('./api/routes/femmeRoute'),
        Countries       = require('./api/models/femmeModel'),
        Users           = require('./api/models/userModel'),
        femme           = require('./api/controllers/femmeController'),
        cors            = require('cors')



mongoose.Promise = global.Promise
// mongoose.connect("mongodb://127.0.0.1:27017/ecv-api")
mongoose.connect("mongodb://femme:femme@ds137600.mlab.com:37600/ecv-api")


app.use( bodyParser.urlencoded({ extended: true }) )

app.use( bodyParser.json() )

routes(app)

app.use(function(req, res) {

    let notFoundResponse = {
        "status": "error",
        "url" : req.originalUrl + " not found",
    }

    const routes = [
        {
            'name': 'sources',
            'distance': Infinity
        },
        {
            'name': 'countries',
            'distance': Infinity
        },
        {
            'name': 'codes',
            'distance': Infinity
        },
        {
            'name': 'users',
            'distance': Infinity
        }
    ]


    // calcule les distance
    for (let route of routes ) {

        route.distance = levenshtein.get( req.originalUrl, route.name)
    }


    // trouve la plus proche : max 5
    let closest = { "distance" : Infinity }

    for (let route of routes ) {

        if ( route.distance <= 5 && route.distance < closest.distance ) {

            closest = route
        }
    }

    // si suggestiont rouvée on la met dans le message
    if ( closest.distance !== Infinity) {

        notFoundResponse.suggestion = "Did you mean http://"+ host + ':' + PORT +"/" + closest.name + " ?"
    }

    res.status(404)
    res.send( notFoundResponse )
})



app.listen(PORT, function () {

    // update les cors
    let cors = require('./api/controllers/corsController')
    cors.loadAllowedOrigins()

    // message d'accueil
    console.log('Femme app listening on : ' + host + ':' + PORT)
})
