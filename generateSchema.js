let GenerateSchema = require('generate-schema')


let json = require('./bd-json/charline.json')
let schema = GenerateSchema.json('Countrie', json)

console.log('fini')
console.log(schema)
