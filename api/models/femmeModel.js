'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Generator = require('generate-schema')
const json = require('../../bd-json/countries/fr.json')

const schemaGenerated = Generator.json('Countrie', json)
const CountrieSchema = new Schema(schemaGenerated.properties)

module.exports = mongoose.model('Countries', CountrieSchema)


