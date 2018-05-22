'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Generator = require('generate-schema')
let json = require('../../bd-json/countries/fr.json')

let schemaGenerated = Generator.json('Countrie', json)
let CountrieSchema = new Schema(schemaGenerated.properties)

module.exports = mongoose.model('Countries', CountrieSchema);
