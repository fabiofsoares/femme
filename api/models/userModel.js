'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Generator = require('generate-schema')
const json = require('../../bd-json/user/user.json')

const schemaGenerated = Generator.json('User', json)
const UserSchema = new Schema(schemaGenerated.properties)


module.exports = mongoose.model('Users', UserSchema)


