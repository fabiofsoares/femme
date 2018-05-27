'use strict'
const   mongoose    = require('mongoose'),
        Countries   = mongoose.model('Countries'),
        domaine     = 'http://127.0.0.1:3000'


// A REMPLIR A CHAQUE NOUVELLE ROUTE
exports.showRoutes = function( req, res ) {

    let routes = {}

    routes.codes        = domaine + "/codes"
    routes.sources      = domaine + "/sources/{country_code}/{year}/{cateogory}"
    routes.countries    = domaine + "/countries/{country_code}/{year}/{general_filter}/{gender_filter}/{gender_compare_sex}/{gender_compare_oparator}"

    routes.values = {
        "country_code" : "international code",
        "year" : "yyyy",
        "cateogory" : "gender or general",
        "general_filters" : "all or none or coma separated values",
        "gender_filters" : "all or none or coma separated values",
        "gender_compare_sex" : "f or m",
        "gender_compare_operator" : "> or >= or < or <= or ="
    }

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

            res.status(400)
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
    let filterCountries     = req.params.countries      === 'all'   || !req.params.countries    ? false : req.params.countries.split(",")
    let filterYears         = req.params.years          === 'all'   || !req.params.years        ? false : req.params.years.split(",")
    let filterCategories    = req.params.categories     === 'all'   || !req.params.categories   ? false : req.params.categories.split(",")



    // convertir les année en nombre
    for (let indexYears in filterYears) {


        // GESTION ERREUR : si année pas encore finie / passée et pas au format yyyy
        if ( filterYears[indexYears] >= ( new Date() ).getFullYear() || filterYears[indexYears].length < 4 ) {

            getSourcesResponse.status       = "error"
            getSourcesResponse.message      = "You must enter a previous year and respecting the format : yyyy "

            res.status(400)
            res.json(getSourcesResponse)
            return null
        }

        filterYears[indexYears] = Number(filterYears[indexYears])
    }


    // 1 - si filtre par catégories
    if ( filterCategories ) {

        for ( let category of filterCategories) {

            select += " " + category
        }
    }

    else {

        select += " general gender"
    }


    // 2 - si filtre par pays
    if ( filterCountries ) {

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
                    if ( !filterCategories || filterCategories.indexOf('general') > 0 ) {

                        for ( let indexGeneral = 0; indexGeneral <  generalData.length; indexGeneral++) {

                            let countryYear =  datasResponse[indexCountry].general[indexGeneral].year

                            if ( filterYears.indexOf( countryYear ) < 0 ) {

                                datasResponse[indexCountry].general.splice(indexGeneral, 1)
                                indexGeneral--
                            }
                        }
                    }


                    // gender
                    if ( !filterCategories || filterCategories.indexOf('gender') > 0 ) {

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

                res.status(400)
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
    let filterCountries = req.params.countries  === 'all' || !req.params.countries ? false : req.params.countries.split(",")

    if ( filterCountries ) {

        filters.push( {code: { $in: filterCountries }} )
    }



    // 2 - années
    let filterYears = req.params.years === 'all' || !req.params.years ? false : req.params.years.split(",")

    for (let indexYears in filterYears) {

        // GESTION ERREUR : si année pas encore finie / passée et pas au format yyyy
        if ( filterYears[indexYears] >= ( new Date() ).getFullYear() || filterYears[indexYears].length < 4 ) {

            getDataResponse.status      = "error"
            getDataResponse.message     = "You must enter a previous year and respecting the format : yyyy "

            res.status(400)
            res.json( getDataResponse )
            return null
        }


        filterYears[indexYears] = Number(filterYears[indexYears])
    }




    // 3 - données : GENERAL
    let showGeneral = true
    let generalFilters = []

    if ( req.params.general ) {

        if ( req.params.general === "none" ) {

            showGeneral = false
        }

        else if ( req.params.general !== "all" ) {

            generalFilters = req.params.general.split(",")
        }
    }



    // 4 - données : GENRE
    let showGender = true
    let genderFilters = []

    if ( req.params.gender ) {

        if ( req.params.gender === "none" ) {

            showGender = false
        }

        else if ( req.params.gender !== "all" ) {

            genderFilters = req.params.gender.split(",")
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
    let sex = req.params.sex ? req.params.sex : false
    let operator = req.params.operator ? req.params.operator : false
    operator = operator === "=" ? "===" : operator

    let allowedOperator = ["<", "<=", ">", ">=", "="]

    // GESTION DES ERREURS :

    // si uniquement un paramètres fournis pour comparaison des sexes
    if ( sex && !operator || !sex && operator ) {

        getDataResponse.status       = "error"
        getDataResponse.message      = "If who want to filter with gender compare you must give sex parameter and operator parameter"

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
    else if ( sex && ( sex === "f" || sex !== "m" ) ) {
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

            res.status(400)
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
            }

            // TODO : vérifie si l'on renvoie bien des données
            res.json( datasResponse )
        }
    })
}



// ADMIN
exports.admin = function(req, res) {
    res.sendFile('views/admin.html', { root: 'api'})
}

exports.addGender = function(req, res){
    let id = req.body.id,
    item = {
        year: parseInt(req.body.year),
        data: [
            {
                type: 'victimization',
                source: req.body.source_0,
                data:{
                        m: parseFloat(req.body.dataM_0),
                        f: parseFloat(req.body.dataF_0)
                    }
            },
            {
                type: 'health_care',
                source: req.body.source_1,
                data:{
                        m: parseFloat(req.body.dataM_1),
                        f: parseFloat(req.body.dataF_1)
                    }
            },
            {
                type: 'primary_school',
                source: req.body.source_2,
                data:{
                        m: parseFloat(req.body.dataM_2),
                        f: parseFloat(req.body.dataF_2)
                    }
            },
            {
                type: 'secondary_school',
                source: req.body.source_3,
                data:{
                        m: parseFloat(req.body.dataM_3),
                        f: parseFloat(req.body.dataF_3)
                    }
            },
            {
                type: 'higher_education',
                source: req.body.source_4,
                data:{
                        m: parseFloat(req.body.dataM_4),
                        f: parseFloat(req.body.dataF_4)
                    }
            },
            {
                type: 'salary',
                source: req.body.source_5,
                data:{
                        m: parseFloat(req.body.dataM_5),
                        f: parseFloat(req.body.dataF_5)
                    }
            },
            {
                type: 'unemployment',
                source: req.body.source_6,
                data:{
                        m: parseFloat(req.body.dataM_6),
                        f: parseFloat(req.body.dataF_6)
                    }
            },
            {
                type: 'work_time',
                source: req.body.source_7,
                data:{
                        m: parseFloat(req.body.dataM_7),
                        f: parseFloat(req.body.dataF_7)
                    }
            },
            {
                type: 'occupational_integration',
                source: req.body.source_8,
                data:{
                        m: parseFloat(req.body.dataM_8),
                        f: parseFloat(req.body.dataF_8)
                    }
            },
            {
                type: 'poverty',
                source: req.body.source_9,
                data:{
                        m: parseFloat(req.body.dataM_9),
                        f: parseFloat(req.body.dataF_9)
                    }
            },
            {
                type: 'population_percent',
                source: req.body.source_10,
                data:{
                        m: parseFloat(req.body.dataM_10),
                        f: parseFloat(req.body.dataF_10)
                    }
            },
            {
                type: 'politic',
                source: req.body.source_11,
                data:{
                        m: parseFloat(req.body.dataM_11),
                        f: parseFloat(req.body.dataF_11)
                    }
            }
        ]
    };
    Countries.findById(id, function(err, country){
        if(err){
            console.error('error, country not found !');
        }
        country.gender.push(item);
        country.save();
        res.redirect('/admin');
    })
}

exports.addGeneral = function(req, res){
    let id = req.body.id;
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
    Countries.findById(id, function(err, country){
        if(err){
            console.error('error, country not found !');
        }
        country.general.push(item);
        country.save();
        res.json(country)
        //res.redirect('/admin', country);
    })
}

// Update donnes Gender
exports.updateGender = function(req, res){
    Countries.update({_id : req.body.id},{"$pull":{"gender":{year: parseInt(req.body.year)}}}, function (err, country){
        if(country != null){
            exports.addGender(req, res);
        }
    })   
}

// Update donnes General
exports.updateGeneral = function(req, res){    
    Countries.updateOne(
        { _id : req.body.id , general : { $elemMatch: { year : parseInt(req.body.year) }} }, 
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
            if (err) { 
            throw err;
        }
        else {
            res.json(country)            
            //res.redirect('/admin');
        }
    })   
}
