'use strict'
const   mongoose    = require('mongoose'),
        Users       = mongoose.model('Users'),
        validator   = require('validator'),
        jwt         = require('jsonwebtoken'),
        bcrypt      = require('bcryptjs'),
        cors        = require('../controllers/corsController')



let secret = "charline"

exports.register = function(req, res) {

    let name = req.body.name ? req.body.name : 'the girl has no name'
    let email = validator.isEmail(req.body.email) ? req.body.email : false
    let password = req.body.password

    let registerResponse = {}

    // si manque des elements
    if ( !email || !password ) {
        registerResponse.status     = "error"
        registerResponse.message    = "You must give 3 valid paramaters : email + name + password"

        res.status(400)
        res.json( registerResponse )
        return null
    }

    Users.
        find( {} ).
        select( "email" ).
        exec( function( err, datas ) {

            if (err) {

                registerResponse.status     = "error"
                registerResponse.message    = err

                res.status(400)
                res.json( registerResponse )
                return null
            }


            else {

                // vérifie que l'utilisateur n'existe pas déja
                let doesExist = false

                for (let user of datas ) {

                    if ( user.email ===  email ){

                        doesExist = true
                    }
                }

                if ( doesExist ){

                    registerResponse.status     = "error"
                    registerResponse.message    = "A user is already register with this email"

                    res.status(400)
                    res.json( registerResponse )
                    return null
                }

                else {

                    let hashedPassword = bcrypt.hashSync(password, 8)

                    // ajoute l'utilisateur
                    Users.create({
                            name : name,
                            email : email,
                            password : hashedPassword,
                            dns: []
                        },
                        function (err, user) {

                            if (err) {

                                registerResponse.status     = "error"
                                registerResponse.message    = "There was a problem during the registration, please come back later"

                                res.status(400)
                                res.json( registerResponse )
                            }

                            else {

                                registerResponse.status     = "success"
                                registerResponse.message    = "Congatulations " + user.name + " you have your account !"

                                res.json( registerResponse )
                            }
                        }
                    )
                }
            }
        })
}

exports.login = function(req, res) {

    let loginResponse = {}

    let email = validator.isEmail(req.params.email) ? req.params.email : false
    let password = req.body.password

    let resExpress = res

    if (!email) {

        loginResponse.status     = "error"
        loginResponse.message    = "Please enter a valid email"

        resExpress.status(400)
        resExpress.json(loginResponse)
        return null
    }

    Users.
    findOne({}).
    and( [ {email: email} ]).
    exec( function ( err, user ) {

        if (err) {

            loginResponse.status     = "error"
            loginResponse.message    = err

            resExpress.status(400)
            resExpress.json(loginResponse)
        }

        else if ( !user ) {

            loginResponse.status     = "error"
            loginResponse.message    = "No user has been found for the email " + email

            resExpress.status(400)
            resExpress.json(loginResponse)
        }

        else {

            bcrypt.compare(password, user.password, function(err, res) {

                if (res) {

                    let token = jwt.sign(
                        { id: user._id },
                        secret,
                        {expiresIn: 86400})

                    loginResponse.status    = "success"
                    loginResponse.message   = user.name + " your are connected !"
                    loginResponse.token     = token

                    resExpress.json(loginResponse)
                }

                else {

                    loginResponse.status     = "error"
                    loginResponse.message    = "Identifiants invalid"

                    resExpress.status(400)
                    resExpress.json(loginResponse)
                }

            })
        }
    })
}

exports.update = function(req, res) {

    let updateResponse = {}

    let password    = req.body.password     ? req.body.password         : false
    let name        = req.body.name         ? req.body.name             : false
    let dns         = req.body.dns          ? req.body.dns.split(',')   : false
    let decoded     = req.decoded


    Users.findById(decoded.id, function (err, user) {

        if (err) {

            updateResponse.status     = "error"
            updateResponse.message    = err

            res.status(400)
            res.json(updateResponse)
        }

        else if (!user) {

            updateResponse.status     = "error"
            updateResponse.message    = "No user has been found with this token "

            res.status(400)
            res.json(updateResponse)
        }

        else {

            if (password) user.password = bcrypt.hashSync(password, 8)
            if (name) user.name = name
            if (dns) {

                user.dns.push(dns)
                cors.updateAllowedOrigins(dns)
            }



            user.save(function (err, updateUser) {

                if (err) {

                    updateResponse.status = "error"
                    updateResponse.message = err

                    res.status(400)
                    res.json(updateResponse)
                    return null
                }

                else {

                    updateResponse.status = "success"
                    updateResponse.message = user.email

                    if (password) updateResponse.message += " your password has been updated"
                    if (name) updateResponse.message += " your name has been updated"
                    if (dns) updateResponse.message += " your dns have been updated"

                    res.json(updateResponse)
                }
            })
        }
    })
}

// TODO : refaire une seconde sécurité avec demande de mot de passe ?
exports.delete = function(req, res) {

    let deleteResponse = {}
    let token = req.decoded

    Users.
        remove({_id: token.id}).
        exec( function (err, data) {

            if (err) {

                deleteResponse.status     = "error"
                deleteResponse.message    = err

                res.status(400)
                res.json( deleteResponse )
            }

            else {

                deleteResponse.status     = "succes"
                deleteResponse.message    = "Your account has been deleted, so sad to see you leaving :("
                res.json( deleteResponse )
            }
        })
}

exports.checkAuth = function(req, res, next) {

    let testTokenResponse = {}

    let token = req.headers.authorization ? getToken( req.headers.authorization ) : false

    if (!token) {

        testTokenResponse.status     = "error"
        testTokenResponse.message    = "Please send a token"

        res.status(400)
        res.json(testTokenResponse)
        return null
    }

    jwt.verify(token, secret, function(err, decoded) {

        if (err) {

            testTokenResponse.status     = "error"
            testTokenResponse.message    = err

            res.status(400)
            res.json( testTokenResponse )
        }

        else {

            req.decoded = decoded
            next()
        }
    })
}

exports.checkCors = function(req, res, next) {

    let allowedOrigins = cors.allowedOrigins

    let origin = req.headers.origin

    if( allowedOrigins.indexOf( origin ) > -1 ){
        res.header( "Access-Control-Allow-Origin", origin )
    }
    else {
        res.header( "Access-Control-Allow-Origin", "adress of your account" )
    }

    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, UPDATE")
    res.header("Access-Control-Allow-Credentials", true)

    next()
}


// TOOLS :
function getToken(tokenFull) {

    let tokenSpaceIndex = tokenFull.indexOf(' ')

    return tokenFull.slice(tokenSpaceIndex + 1, tokenFull.length )
}
