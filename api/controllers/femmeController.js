'use strict'
const   mongoose    = require('mongoose'),
        Countries   = mongoose.model('Countries'),
        domaine     = 'https://safe-hamlet-93581.herokuapp.com',
        escape      = require('mongo-escape').escape



// A REMPLIR A CHAQUE NOUVELLE ROUTE
exports.showRoutes = function( req, res ) {

    let routes = {}

    routes.get_countries_code = {
        "method": "GET",
        "url": domaine + "/codes"
    }

    routes.get_sources = {
        "method": "GET",
        "url": domaine + "/sources?{countries}{years}{category}",
        "query" : {
            "countries" : "international country code coma separated values",
            "years" : "yyyy",
            "category" : "gender or general",
        }
    }

    routes.get_data_countries = {
        "method": "GET",
        "url": domaine + "/countries?{countries}/{years}/{general}/{gender}/{sex}/{operator}",
        "query" : {
            "countries" : "international country code coma separated values",
            "years" : "yyyy",
            "category" : "gender or general",
            "general" : "none or coma separated values",
            "gender" : "none or coma separated values",
            "sex" : "f or m",
            "operator" : "> or >= or < or <= or ="
        }
    }

    routes.user_register = {
        "method" : "POST",
        "url": domaine + "/users",
        "params" : {
            "email": "unique and valid format",
            "password": "of your choice",
            "name": "if you want"
        }
    }

    routes.user_login = {
        "method" : "POST",
        "url": domaine + "/users/{email}",
        "query" : {
            "email": "of your registration"
        },
        "params" : {
            "values": "password"
        }
    }

    routes.user_update = {
        "method" : "PUT",
        "url": domaine + "/users",
        "headers": {
            "Autorization": "token"
        },
        "params" : {
            "name": "name",
            "password": "password",
            "dns": "list of origin - coma separated value"
        }
    }


    routes.user_delete = {
        "method" : "DELETE",
        "url": domaine + "/users",
        "headers": {
            "Autorization": "token"
        }
    }
    
    routes.admin_view = {
        "method": "GET",
        "url": domaine + "/admin"
    }

    routes.admin_add_gender = {
        "method" : "POST",
        "url": domaine + "/admin/add-gender",
        "params" : {
            "code": "international country code coma separated values",
            "year": "yyyy",
            "source_life_expectancy": "source of life expectancy dates",
            "dataM_life_expectancy" : "male date of life expectancy",
            "dataF_life_expectancy" : "female date of life expectancy",
            "source_victimization": "source of victimization dates",
            "dataM_victimization" : "male date of victimization",
            "dataF_victimization" : "female date of victimization",
            "source_health_care": "source of health care dates",
            "dataM_health_care" : "male date of health care",
            "dataF_health_care" : "female date of health care",
            "source_primary_school": "source of primary school dates",
            "dataM_primary_school" : "male date of primary school",
            "dataF_primary_school" : "female date of primary school",
            "source_secondary_school": "source of secondary school dates",
            "dataM_secondary_school" : "male date of secondary school",
            "dataF_secondary_school" : "female date of secondary school",
            "source_higher_education": "source of higher education dates",
            "dataM_higher_education" : "male date of higher education ",
            "dataF_higher_education" : "female date of higher education",
            "source_salary": "source of salary dates",
            "dataM_salary" : "male date of salary (by MONTH/EUROS)",
            "dataF_salary" : "female date of salary (by MONTH/EUROS)",
            "source_unemployment": "source of unemployment dates",
            "dataM_unemployment" : "male date of unemployment",
            "dataF_unemployment" : "female date of unemployment",
            "source_work_time": "source of work time dates",
            "dataM_work_time" : "male date of work time (by HOUR/DAY)",
            "dataF_work_time" : "female date of work time (by HOUR/DAY)",
            "source_occupational_integration": "source of occupational integration dates",
            "dataM_occupational_integration" : "male date of occupational integration",
            "dataF_occupational_integration" : "female date of occupational integration",
            "source_poverty": "source of poverty dates",
            "dataM_poverty" : "male date of poverty",
            "dataF_poverty" : "female date of poverty",
            "source_population_percent": "source of population percent dates",
            "dataM_population_percent" : "male date of population percent",
            "dataF_population_percent" : "female date of population percent",
            "source_politic": "source of politic dates",
            "dataM_politic" : "male date of politic",
            "dataF_politic" : "female date of politic"
        }
    }

    routes.admin_update_gender = {
        "method" : "POST",
        "url": domaine + "/admin/update-gender",
        "params" : {
            "code": "international country code coma separated values",
            "year": "yyyy",
            "source_victimization": "source of victimization dates",
            "dataM_victimization" : "male date of victimization",
            "dataF_victimization" : "female date of victimization",
            "source_health_care": "source of health care dates",
            "dataM_health_care" : "male date of health care",
            "dataF_health_care" : "female date of health care",
            "source_primary_school": "source of primary school dates",
            "dataM_primary_school" : "male date of primary school",
            "dataF_primary_school" : "female date of primary school",
            "source_secondary_school": "source of secondary school dates",
            "dataM_secondary_school" : "male date of secondary school",
            "dataF_secondary_school" : "female date of secondary school",
            "source_higher_education": "source of higher education dates",
            "dataM_higher_education" : "male date of higher education ",
            "dataF_higher_education" : "female date of higher education",
            "source_salary": "source of salary dates",
            "dataM_salary" : "male date of salary",
            "dataF_salary" : "female date of salary",
            "source_unemployment": "source of unemployment dates",
            "dataM_unemployment" : "male date of unemployment",
            "dataF_unemployment" : "female date of unemployment",
            "source_work_time": "source of work time dates",
            "dataM_work_time" : "male date of work time",
            "dataF_work_time" : "female date of work time",
            "source_occupational_integration": "source of occupational integration dates",
            "dataM_occupational_integration" : "male date of occupational integration",
            "dataF_occupational_integration" : "female date of occupational integration",
            "source_poverty": "source of poverty dates",
            "dataM_poverty" : "male date of poverty",
            "dataF_poverty" : "female date of poverty",
            "source_population_percent": "source of population percent dates",
            "dataM_population_percent" : "male date of population percent",
            "dataF_population_percent" : "female date of population percent",
            "source_politic": "source of politic dates",
            "dataM_politic" : "male date of politic (%)",
            "dataF_politic" : "female date of politic (%)"
        }
    }

    routes.admin_add_general = {
        "method" : "POST",
        "url": domaine + "/admin/add-general",
        "params" : {
            "code": "international country code coma separated values",
            "year": "yyyy",
            "area": "area of the country",
            "population": "number of the population of the country",
            "pib": "number of the  PIB of the country",
            "ppa": "number of the  PPA of the country",
            "idh": "number of the  IDH of the country",
            "country_unemployment": "number of the  country unemployment of the country"
            
        }
    }

    routes.admin_update_general = {
        "method" : "POST",
        "url": domaine + "/admin/update-general",
        "params" : {
            "code": "international country code coma separated values",
            "year": "yyyy",
            "area": "area of the country",
            "population": "number of the population of the country",
            "pib": "number of the  PIB of the country",
            "ppa": "number of the  PPA of the country",
            "idh": "number of the  IDH of the country",
            "country_unemployment": "number of the  country unemployment of the country"
            
        }
    }

    routes.use = {
        "1": "create a account",
        "2": "login and get your token",
        "3": "add your domaine name",
        "4": "allowed to use api"
    }

    res.header('Cache-Control', 'public, max-age=31557600')
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.json( routes )
}


// GET DATA
exports.getCountriesCode = function( req, res ) {

    let getCountriesNameResponse = {}

    Countries.
    find( {} ).
    select( "code" ).
    exec( function( err, datas ) {

        if (err) {

            getCountriesNameResponse.status     = "error"
            getCountriesNameResponse.message    = err

            res.status(500)
            res.json( getCountriesNameResponse )
        }

        else {

            let codes = []

            for (let data of datas) {
                codes.push(data.code)
            }

            getCountriesNameResponse.status     = "success"
            getCountriesNameResponse.data       = codes

            res.json( getCountriesNameResponse )
        }
    })
}

exports.getSources = function( req, res ) {

    let getSourcesResponse = {}
    let filters = [{}]
    let select = " -_id code"

    // récupération des filtres
    let filterCountries     = req.query.countries   ? req.query.countries.split(",")    : false
    let filterYears         = req.query.years       ? req.query.years.split(",")        : false
    let filterCategory      = req.query.category    ? req.query.category                : false


    // convertir les année en nombre
    for (let indexYears in filterYears) {

        // GESTION ERREUR : si année pas encore finie / passée et pas au format yyyy
        if ( filterYears[indexYears] >= ( new Date() ).getFullYear() || filterYears[indexYears].length !== 4 ) {

            getSourcesResponse.status       = "error"
            getSourcesResponse.message      = "You must enter a previous year and respecting the format : yyyy "

            res.status(400)
            res.json(getSourcesResponse)
            return null
        }

        let escapeValue = escape(filterYears[indexYears])
        filterYears[indexYears] = Number(escapeValue)
    }


    // 1 - si filtre par catégories
    if ( filterCategory ) {

        if ( filterCategory !== "general" && filterCategory !== "gender") {

            getSourcesResponse.status       = "error"
            getSourcesResponse.message      = "Filter category must be equals to gender or general"

            res.status(400)
            res.json(getSourcesResponse)
            return null
        }

        else {
            select += " " + filterCategory
        }
    }
    else {

        select += " general gender"
    }


    // 2 - si filtre par pays
    if ( filterCountries ) {

        if (filterCountries) {
            for (let i=0; i < filterCountries.length; i++) {

                filterCountries[i] = escape(filterCountries[i])
            }
        }

        filters.push( {code: { $in: filterCountries }} )
    }


    // récupère nos données
    Countries.
    find( {} ).
    and( filters ).
    select( select ).
    sort( "code" ).
    exec( function( err, datas ) {

        if (err) {

            getSourcesResponse.status       = "error"
            getSourcesResponse.message      = err

            res.status(400)
            res.json( getSourcesResponse )
            return null

        }

        else {

            let datasResponse = datas
            let sources= []


            for ( let indexCountry = 0; indexCountry < datasResponse.length; indexCountry++ ) {

                // on enlève les données non comprises dans l'années
                if ( filterYears ) {

                    let generalData = datasResponse[indexCountry].general
                    let genderData = datasResponse[indexCountry].gender

                    // general
                    if ( !filterCategory || filterCategory === 'general' ) {

                        for ( let indexGeneral = 0; indexGeneral <  generalData.length; indexGeneral++) {

                            let countryYear =  datasResponse[indexCountry].general[indexGeneral].year

                            if ( filterYears.indexOf( countryYear ) < 0 ) {

                                datasResponse[indexCountry].general.splice(indexGeneral, 1)
                                indexGeneral--
                            }
                        }
                    }


                    // gender
                    if ( !filterCategory || filterCategory === 'gender' ) {

                        for ( let indexGender = 0; indexGender <  genderData.length; indexGender++) {

                            let countryYear =  datasResponse[indexCountry].gender[indexGender].year

                            if ( filterYears.indexOf( countryYear ) < 0 ) {

                                datasResponse[indexCountry].gender.splice(indexGender, 1)
                                indexGender--
                            }
                        }
                    }
                }



                // on récupère les sources
                for (let property in datasResponse[indexCountry] ) {

                    if ( property === "gender" && datasResponse[indexCountry].gender !== undefined ) {

                        let genderData = datasResponse[indexCountry].gender

                        for (let indexYear = 0; indexYear < genderData.length; indexYear++ ) {

                            for ( let indexType = 0; indexType < genderData[indexYear].data.length; indexType++ ) {

                                sources.push(datasResponse[indexCountry].gender[indexYear].data[indexType].source)
                            }
                        }
                    }

                    else if ( property === "general" && datasResponse[indexCountry].general !== undefined ) {

                        let generalData = datasResponse[indexCountry].general

                        for (let indexYear = 0; indexYear < generalData.length; indexYear++ ) {

                            sources.push(datasResponse[indexCountry].general[indexYear].source)
                        }
                    }
                }
            }



            // vérifie si l'on renvoie bien des données
            if ( sources.length > 0 ) {

                getSourcesResponse.status   = "success"

                // on trie notre tableau en enlevant les doublons
                getSourcesResponse.data     =

                    sources.sort().filter( function ( item, pos, array ) {
                        return !pos || item !== array[pos - 1]
                    })
            }

            else {

                // renvoie un message d'erreur
                getSourcesResponse.status   = "error"
                getSourcesResponse.message  = "Empty result please remove some filters to get better results"

                res.status(404)
                res.json( getSourcesResponse )
                return null
            }
        }

        res.json( getSourcesResponse )
    })
}

exports.getData = function( req, res ) {

    let getDataResponse = {}
    let filters = [{}]
    let select = " -_id code"


    // gestion des filtres

    // 1 - pays
    let filterCountries = req.query.countries ? req.query.countries.split(",") : false

    if ( filterCountries ) {

        if (filterCountries) {
            for (let i=0; i < filterCountries.length; i++) {

                filterCountries[i] = escape(filterCountries[i])
            }
        }

        filters.push( {code: { $in: filterCountries }} )
    }


    // 2 - années
    let filterYears = req.query.years ? req.query.years.split(",") : false

    for (let indexYears in filterYears) {

        // GESTION ERREUR : si année pas encore finie / passée et pas au format yyyy
        if ( filterYears[indexYears] >= ( new Date() ).getFullYear() || filterYears[indexYears].length !== 4 ) {

            getDataResponse.status      = "error"
            getDataResponse.message     = "You must enter a previous year and respecting the format : yyyy "

            res.status(400)
            res.json( getDataResponse )
            return null
        }

        let escapeValue = escape(filterYears[indexYears])
        filterYears[indexYears] = Number(escapeValue)
    }



    // 3 - données : GENERAL
    let showGeneral = true
    let generalFilters = []

    if ( req.query.general ) {

        if ( req.query.general === "none" ) {

            showGeneral = false
        }

        else {

            generalFilters = req.query.general.split(",")

            for (let i=0; i < generalFilters.length; i++) {

                generalFilters[i] = escape(generalFilters[i])
            }
        }
    }



    // 4 - données : GENRE
    let showGender = true
    let genderFilters = []

    if ( req.query.gender ) {

        if ( req.query.gender === "none" ) {

            showGender = false
        }

        else {
            genderFilters = req.query.gender.split(",")

            for (let i=0; i < genderFilters.length; i++) {

                genderFilters[i] = escape(genderFilters[i])
            }
        }
    }

    if ( showGeneral ) select += " general"
    if ( showGender ) select += " gender"

    // GESTION ERREUR : si pas de données à afficher
    if ( !showGeneral && !showGender) {

        getDataResponse.status       = "error"
        getDataResponse.message      = "You must select at least gender or general to get"

        res.status(400)
        res.json( getDataResponse )
        return null
    }



    // 5 - Comparaison des sexes
    let isGenderCompare = false

    let sex         = req.query.sex         ? req.query.sex : false
    let operator    = req.query.operator    ? req.query.operator : false

    let allowedOperator = ["<", "<=", ">", ">=", "="]



    // GESTION DES ERREURS :

    // si uniquement un paramètres fournis pour comparaison des sexes
    if ( sex && !operator || !sex && operator ) {

        getDataResponse.status       = "error"
        getDataResponse.message      = "If you want to filter with gender compare you must give sex parameter and operator parameter"

        res.status(400)
        res.json( getDataResponse )
        return null
    }

    // si pas d'affichage des genres
    else if ( sex && operator && !showGender) {

        getDataResponse.status       = "error"
        getDataResponse.message      = "If who want to filter with gender compare you must allowed gender"

        res.status(400)
        res.json( getDataResponse )
        return null
    }

    // si mauvais genre fournis
    else if ( sex && ( sex !== "f" && sex !== "m" ) ) {

        getDataResponse.status       = "error"
        getDataResponse.message      = "Sex value can only be f or m"

        res.status(400)
        res.json( getDataResponse )
        return null
    }

    // si mauvais operateur fournis
    else if ( operator && ( allowedOperator.indexOf(operator) < 0 ) ) {

        getDataResponse.status       = "error"
        getDataResponse.message      = "Operator value can only be : " + allowedOperator.toString()

        res.status(400)
        res.json( getDataResponse )
        return null
    }

    else if ( sex && showGender && operator ) {

        isGenderCompare = true
        operator = operator === "=" ? "===" : operator
    }


    Countries.
    find( {} ).
    and( filters ).
    select( select ).
    sort( "code" ).
    exec( function(err, datas) {

        if (err) {

            getDataResponse.status       = "error"
            getDataResponse.message      = err

            res.status(500)
            res.json( getDataResponse )
            return null
        }

        else {

            let datasResponse = datas

            for ( let indexCountry = 0; indexCountry < datasResponse.length; indexCountry++ ) {


                // filtre années
                if ( filterYears ) {

                    // 1 - general
                    if ( showGeneral ) {

                        let generalData = datasResponse[indexCountry].general

                        for ( let indexGeneral = 0; indexGeneral <  generalData.length; indexGeneral++) {

                            let countryYear =  generalData[indexGeneral].year

                            if ( filterYears.indexOf( countryYear ) < 0 ) {

                                datasResponse[indexCountry].general.splice(indexGeneral, 1)
                                indexGeneral--
                            }
                        }
                    }

                    // 2 - genres
                    if ( showGender ) {

                        let genderData = datasResponse[indexCountry].gender

                        for ( let indexGender = 0; indexGender <  genderData.length; indexGender++) {

                            let countryYear =  datasResponse[indexCountry].gender[indexGender].year

                            if ( filterYears.indexOf( countryYear ) < 0 ) {

                                datasResponse[indexCountry].gender.splice(indexGender, 1)
                                indexGender--
                            }
                        }
                    }

                    // enlève si vide
                    if ( showGeneral && datasResponse[indexCountry].general.length === 0) {
                        datasResponse[indexCountry].general = undefined
                    }

                    if ( showGender && datasResponse[indexCountry].gender.length === 0 ) {
                        datasResponse[indexCountry].gender = undefined
                    }
                }



                // filtre general
                if ( generalFilters.length > 0 && showGeneral && datasResponse[indexCountry].general ) {

                    for ( let indexGeneral = 0; indexGeneral < datasResponse[indexCountry].general.length; indexGeneral++ ) {

                        for (let type in datasResponse[indexCountry].general[indexGeneral].data ) {

                            if ( generalFilters.indexOf(type) < 0 ) {

                                datasResponse[indexCountry].general[indexGeneral].data[type] = undefined
                            }
                        }
                    }
                }



                // filtre gender
                if ( genderFilters.length > 0 && showGender && datasResponse[indexCountry].gender ) {

                    for ( let indexGender = 0; indexGender < datasResponse[indexCountry].gender.length; indexGender++ ) {

                        for (let indexData = 0; indexData < datasResponse[indexCountry].gender[indexGender].data.length; indexData++ ) {

                            if ( genderFilters.indexOf(datasResponse[indexCountry].gender[indexGender].data[indexData].type) < 0 ) {

                                datasResponse[indexCountry].gender[indexGender].data.splice( indexData, 1)
                                indexData--
                            }
                        }
                    }
                }


                // filtre par comparaison genres
                if ( isGenderCompare && showGender ) {

                    for ( let indexGender = 0; indexGender < datasResponse[indexCountry].gender.length; indexGender++ ) {

                        for (let indexData = 0; indexData < datasResponse[indexCountry].gender[indexGender].data.length; indexData++ ) {


                            let f = datasResponse[indexCountry].gender[indexGender].data[indexData].data.f
                            let m = datasResponse[indexCountry].gender[indexGender].data[indexData].data.m


                            let second = sex === "f" ? "m" : "f"
                            let query = sex + ' ' + operator + ' ' + second


                            if ( !eval(query) ) {

                                datasResponse[indexCountry].gender[indexGender].data.splice( indexData, 1)
                                indexData--
                            }
                        }
                    }
                }


                // verification si vide
                if ( showGender && datasResponse[indexCountry].gender !== undefined) {

                    for( let indexData = 0; indexData < datasResponse[indexCountry].gender.length; indexData++ ) {

                        if ( datasResponse[indexCountry].gender[indexData].data.length === 0 ) {

                            datasResponse[indexCountry].gender.splice(indexData, 1)
                            indexData--
                        }
                    }

                    if ( datasResponse[indexCountry].gender.length === 0 ) {

                        datasResponse[indexCountry].gender = undefined
                    }
                }

                if ( showGeneral && datasResponse[indexCountry].general !== undefined ) {

                    for( let indexData = 0; indexData < datasResponse[indexCountry].general.length; indexData++ ) {

                        let hasValue = false

                        for (let values in datasResponse[indexCountry].general[indexData].data ) {

                            if (hasValue) {

                                break
                            }

                            if ( datasResponse[indexCountry].general[indexData].data[values] !== undefined && datasResponse[indexCountry].general[indexData].data[values] ) {

                                hasValue = true
                            }
                        }

                        if ( !hasValue ) {

                            datasResponse[indexCountry].general.splice(indexData, 1)
                            indexData--
                        }
                    }

                    if ( datasResponse[indexCountry].general.length === 0 ) {

                        datasResponse[indexCountry].general = undefined
                    }
                }

                if (
                    ( datasResponse[indexCountry].gender === undefined || datasResponse[indexCountry].gender.length === 0 ) &&
                    ( datasResponse[indexCountry].general === undefined || datasResponse[indexCountry].general.length === 0 ) ) {

                    datasResponse.splice(indexCountry, 1)
                    indexCountry--
                }
            }


            if ( datasResponse.length === 0 ) {

                getDataResponse.status   = "error"
                getDataResponse.message  = "Empty result please remove some filters to get better results"

                res.status(404)
                res.json( getDataResponse )
                return null
            }
            else {

                getDataResponse.status      = "success"
                getDataResponse.data        = datasResponse

                res.json( getDataResponse )
            }
        }
    })
}



// ADMIN
exports.admin = function(req, res) {
    //Retour a la page admin
    res.sendFile('views/admin.html', { root: 'api'})
}

exports.addGender = function(req, res){

    let getDataResponse = {};
    //Recupère le code du pays
    let code = req.body.code,
    
    //Prepare l'objet avec les parametres envoyés
    item = {
        year: parseInt(req.body.year),
        data: [
            {
                type: 'life_expectancy',
                source: req.body.life_expectancy,
                data:{
                        m: parseFloat(req.body.dataM_life_expectancy),
                        f: parseFloat(req.body.dataF_life_expectancy)
                    }
            },
            {
                type: 'victimization',
                source: req.body.source_victimization,
                data:{
                        m: parseFloat(req.body.dataM_victimization),
                        f: parseFloat(req.body.dataF_victimization)
                    }
            },
            {
                type: 'health_care',
                source: req.body.source_health_care,
                data:{
                        m: parseFloat(req.body.dataM_health_care),
                        f: parseFloat(req.body.dataF_health_care)
                    }
            },
            {
                type: 'primary_school',
                source: req.body.source_primary_school,
                data:{
                        m: parseFloat(req.body.dataM_primary_school),
                        f: parseFloat(req.body.dataF_primary_school)
                    }
            },
            {
                type: 'secondary_school',
                source: req.body.source_secondary_school,
                data:{
                        m: parseFloat(req.body.dataM_secondary_school),
                        f: parseFloat(req.body.dataF_secondary_school)
                    }
            },
            {
                type: 'higher_education',
                source: req.body.source_higher_education,
                data:{
                        m: parseFloat(req.body.dataM_higher_education),
                        f: parseFloat(req.body.dataF_higher_education)
                    }
            },
            {
                type: 'salary',
                source: req.body.source_salary,
                data:{
                        m: parseFloat(req.body.dataM_salary),
                        f: parseFloat(req.body.dataF_salary)
                    }
            },
            {
                type: 'unemployment',
                source: req.body.source_unemployment,
                data:{
                        m: parseFloat(req.body.dataM_unemployment),
                        f: parseFloat(req.body.dataF_unemployment)
                    }
            },
            {
                type: 'work_time',
                source: req.body.source_work_time,
                data:{
                        m: parseFloat(req.body.dataM_work_time),
                        f: parseFloat(req.body.dataF_work_time)
                    }
            },
            {
                type: 'occupational_integration',
                source: req.body.source_occupational_integration,
                data:{
                        m: parseFloat(req.body.dataM_occupational_integration),
                        f: parseFloat(req.body.dataF_occupational_integration)
                    }
            },
            {
                type: 'poverty',
                source: req.body.source_poverty,
                data:{
                        m: parseFloat(req.body.dataM_poverty),
                        f: parseFloat(req.body.dataF_poverty)
                    }
            },
            {
                type: 'population_percent',
                source: req.body.source_population_percent,
                data:{
                        m: parseFloat(req.body.dataM_population_percent),
                        f: parseFloat(req.body.dataF_population_percent)
                    }
            },
            {
                type: 'politic',
                source: req.body.source_politic,
                data:{
                        m: parseFloat(req.body.dataM_politic),
                        f: parseFloat(req.body.dataF_politic)
                    }
            }
        ]
    };

    //Cherche le pays avec le code envoyé
    Countries.findOne({code: code}, function(err, country){
        
        //Gestion d'erreur
        if (err) {
            getDataResponse.status      = "error"
            getDataResponse.message     = err

            res.status(500)
            res.json( getDataResponse )
            return null
        }
        else {
            // rajoute l'item sur le pays trouvé
            country.gender.push(item);
            country.save();

            //envoye json du pays 
            getDataResponse.status     = "success"
            getDataResponse.data       = country
            res.json(  getDataResponse )
        }
    })
}

exports.addGeneral = function(req, res){
    let getDataResponse = {};
     //Recupère le code du pays
    let code = req.body.code;
    //Prepare l'objet general avec les paremetres envoyes
    let item = {
        year: parseInt(req.body.year),
        source : req.body.source,
        data : {
            area : parseFloat(req.body.area),
            population : parseFloat(req.body.population),
            pib : parseFloat(req.body.pib),
            ppa : parseFloat(req.body.ppa),
            idh : parseFloat(req.body.idh),
            country_unemployment : parseFloat(req.body.country_unemployment)
        }
    };
     //Cherche le pays avec le code envoyé
    Countries.findOne({code: code}, function(err, country){
        //Gestion d'erreur
        if (err) {
            getDataResponse.status      = "error"
            getDataResponse.message     = err

            res.status(500)
            res.json( getDataResponse )

            return null
        }
        else {
             // rajoute l'item sur le pays trouvé
            country.general.push(item);
            country.save();

             //envoye json du pays 
            getDataResponse.status     = "success"
            getDataResponse.data       = country

            res.json(  getDataResponse )
        }       
    })
}

// Update donnes Gender
exports.updateGender = function(req, res){
    let getDataResponse = {};
    //Cherche l'item GENDER du pays et le supprime
    Countries.update({code : req.body.code},{"$pull":{"gender":{year: parseInt(req.body.year)}}}, function (err, country){
         //Gestion d'erreur
        if (err) {
            getDataResponse.status      = "error"
            getDataResponse.message     = err

            res.status(500)
            res.json( getDataResponse )
            return null
        }
        else {
            //Rajoute un nouveau item GENDER
            if(country != null){
                exports.addGender(req, res);
            }
        }        
    })
}

// Update donnes General
exports.updateGeneral = function(req, res){
    let getDataResponse = {};
    //Mettre a jour les donnes general
    Countries.updateOne(
        { code : req.body.code , general : { $elemMatch: { year : parseInt(req.body.year) }} },
        { $set: { "general.$.source" : parseFloat(req.body.source),
                  "general.$.data.area" : parseFloat(req.body.area),
                  "general.$.data.population" : parseFloat(req.body.population),
                  "general.$.data.pib" : parseFloat(req.body.pib),
                  "general.$.data.ppa" : parseFloat(req.body.ppa),
                  "general.$.data.idh" : parseFloat(req.body.idh),
                  "general.$.data.country_unemployment" : parseFloat(req.body.country_unemployment)
                }
        },
        function(err, country){
             //Gestion d'erreur
            if (err) {
                getDataResponse.status      = "error"
                getDataResponse.message     = err
    
                res.status(500)
                res.json( getDataResponse )
                return null
            }
            else {
                 //envoye json du pays 
                getDataResponse.status     = "success"
                getDataResponse.data       = country
                res.json(  getDataResponse )
            }
        }
    )
}
