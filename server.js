const   express         = require('express'),
        mongoose        = require('mongoose'),
        bodyParser      = require('body-parser'),
        app             = express(),
        port            = process.env.PORT || 3000,
        host            = '127.0.0.1',
        levenshtein     = require('fast-levenshtein'),
        jwt             = require('jsonwebtoken'),
        bcrypt          = require('bcryptjs'),
        routes          = require('./api/routes/femmeRoute'),
        Countries       = require('./api/models/femmeModel'),
        Users           = require('./api/models/userModel'),
        femme           = require('./api/controllers/femmeController')


mongoose.Promise = global.Promise
mongoose.connect("mongodb://127.0.0.1:27017/ecv-api")
        
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )

routes(app);




app.use(function(req, res) {

    let notFoundResponse = {
        "status": "error",
        "url" : req.originalUrl,
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


    // trouve la plus proche : max 4
    let closest = { "distance" : -Infinity }

    for (let route of routes ) {

        if ( route.distance <= 4 && route.distance > closest.distance ) {

            closest = route
        }
    }

    // si suggestiont rouvée on la met dans le message
    if ( closest.distance !== -Infinity) {

        notFoundResponse.suggestion = "Did you mean /" + closest.name + " ?"
    }

    res.status(404)
    res.send( notFoundResponse )
});




function authChecker(req, res, next) {

    let secret = "charline"

    let testTokenResponse = {}

    let tokenFull = req.headers.authorization
    let tokenSpaceIndex = tokenFull.indexOf(' ')
    let token = tokenFull.slice(tokenSpaceIndex + 1, tokenFull.length )

    jwt.verify(token, secret, function(err, decoded) {

        if (err) {
            testTokenResponse.status     = "error"
            testTokenResponse.message    = err

            res.status(400)
            res.json( testTokenResponse )
        }

        else {

            next()
        }
    })
}



app.listen(port, host, function () {
    console.log('Femme app listening on : ' + host + ':' + port)
})
