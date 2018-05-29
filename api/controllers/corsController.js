'use strict'

const   mongoose    = require('mongoose'),
        Users       = mongoose.model('Users')

exports.allowedOrigins = ["http://starglider.outofpluto.com","https://starglider.outofpluto.com"]

exports.updateAllowedOrigins = function(dns){

    for (let domaine of dns) {
        exports.allowedOrigins.push(domaine)
    }
}


exports.loadAllowedOrigins = function(){

    Users.
        find({}).
        select('dns').
        exec(function(err, users){

            for (let user of users) {

                for ( let i = 0; i< user.dns.length; i++) {

                    exports.allowedOrigins.push(user.dns[i])
                }
            }

            console.log(exports.allowedOrigins)
        })
}