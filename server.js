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
    cors            = require('cors'),
    RateLimit       = require('express-rate-limit'),
    helmet          = require('helmet')



let limiter = new RateLimit({
    windowMs: 1000,
    max: 1,
    delayMs: 0,
    headers: true,
    handler: function (req, res) {

        let delay = this.windowMs / 1000

        let limiterResponse = {
            "status": "error",
            "message": "Too many request from this IP, please try again after " + delay + "s"
        }

        if (this.headers) {
            res.header('Retry-After', delay)
        }

        res.status(429)
        res.json(limiterResponse)
    }
})


mongoose.Promise = global.Promise
// mongoose.connect("mongodb://127.0.0.1:27017/ecv-api")
mongoose.connect("mongodb://femme:femme@ds137600.mlab.com:37600/ecv-api")

app.enable('trust proxy')

app.use( limiter )

app.use( bodyParser.urlencoded({ extended: true }) )

app.use( bodyParser.json() )

app.use( helmet({
    noCache: false
}) )


routes( app )

app.use(function(req, res, next) {
    
    res.contentType('application/json; charset=utf-8');
    next();

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
        },
        {
            'name': 'admin',
            'distance': Infinity
        },
        {
            'name': 'admin/add-gender',
            'distance': Infinity
        },
        {
            'name': 'admin/add-general',
            'distance': Infinity
        },
        {
            'name': 'admin/update-gender',
            'distance': Infinity
        },
        {
            'name': 'admin/update-general',
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

    // si suggestion trouvée on la met dans le message
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
