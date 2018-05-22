'use strict'
const   mongoose    = require('mongoose'),
        Users       = mongoose.model('Users'),
        validator   = require('validator'),
        jwt         = require('jsonwebtoken'),
        bcrypt      = require('bcryptjs')



// TOKEN TEST :
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMDM0OWU1M2MyMDFiNjUwNDA2MjhkMyIsImlhdCI6MTUyNjk0MjE4MSwiZXhwIjoxNTI3MDI4NTgxfQ.HP0Lg8hozp1ZgFfa50wfo9EJODJTl326sCUCXz0MRJ4

// TODO : protéger la variable
let secret = "charline"

exports.checkAuth = function(req, res, next) {

    let testTokenResponse = {}

    let token = exports.getToken( req.headers.authorization )

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

exports.register = function(req, res) {

    let name = req.params.name ? req.params.name : 'the girl has no name'
    let email = validator.isEmail(req.params.email) ? req.params.email : false
    let password = req.params.password

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

                                let token = jwt.sign(
                                    { id: user._id },
                                    secret,
                                    {expiresIn: 86400})

                                registerResponse.status     = "success"
                                registerResponse.message    = "Congatulations " + user.name + " you have your account !"
                                registerResponse.token      = token

                                res.json( registerResponse )
                            }
                        }
                    )
                }
            }
        })
}



exports.delete = function(req, res) {

    let deleteResponse = {}

    let token = req.decoded

    let email = validator.isEmail(req.params.email) ? req.params.email : false



    if ( !email ) {

        deleteResponse.status     = "error"
        deleteResponse.message    = "Please give a valid email"

        res.status(400)
        res.json( deleteResponse )
        return null
    }



    Users.
        findOne( {} ).
        and( [{ _id: token.id }] ).
        exec( function ( err, data ) {

            // si err
            if ( err ) {

                deleteResponse.status     = "error"
                deleteResponse.message    = "There was a problem during the deletion, please try again later"

                res.status(400)
                res.json( deleteResponse )
            }

            // si pas de user
            else if ( !data ) {
                deleteResponse.status     = "error"
                deleteResponse.message    = "No user has been found for the email " + email

                res.status(400)
                res.json( deleteResponse )
            }

            // si pas le meme mot de passe
            else if ( email !== data.email ) {
                deleteResponse.status     = "error"
                deleteResponse.message    = "Wrong token and user"

                res.status(400)
                res.json( deleteResponse )
            }

            // efface le user
            else {

                Users.
                    remove({_id: token.id}).
                    exec( function (err, data) {

                        deleteResponse.status     = "succes"
                        deleteResponse.message    = "Your account has been deleted, so sad to see you leaving :("
                        res.json( deleteResponse )
                })
            }
        })
}


exports.getToken = function(tokenFull) {

    let tokenSpaceIndex = tokenFull.indexOf(' ')

    return tokenFull.slice(tokenSpaceIndex + 1, tokenFull.length )
}


