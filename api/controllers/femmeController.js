'use strict';
let mongoose = require('mongoose'),
    Countries = mongoose.model('Countries');


exports.hello = function(req, res) {
    res.send('Hello World!') 
};

exports.getAll = function(req, res) {
    Countries.find({}, function(err, countries) {
        if (err){
            res.send(err);
        }            
        res.json(countries);
    }); 
};

exports.getCountriesCurientYear = function(req, res) {
    query = Countries.find({
        $and : [
            { general : { $elemMatch: { year : '2018' }} },
            { statistical : { $elemMatch: { year : '2018' }}}
        ]
    })
    query.exec(function (err,country) {
        if (err){
            res.send(err);
        }
        res.json(country);
    }); 
};

exports.createCountry = function(req, res) {
    let newCountry = new Countries(req.body);
    newCountry.save(function(err, country) {
      if (err){
        res.send(err);
      }        
      res.json(country);
    });
};

exports.getCountry = function(req, res) {    
    Countries.findOne({country: req.params.country}, function(err,country) { 
        if (err){
            res.send(err);
        }        
        res.json(country);    
    });
};

exports.updateCountry = function(req, res) {
    Countries.findOneAndUpdate({country: req.params.country}, req.body, {new: true}, function(err, country) {
        if (err){
            res.send(err);
        }
        res.json(country);
    });
};

exports.getCountryType = function(req, res) {
    let query;
    
    if(req.params.type === 'general'){
        query = Countries.find(
            { country : req.params.country },           
            { general : { $elemMatch: { year : req.params.year }},  country : req.params.country }
        )
    }else{
        query = Countries.find(
            { country : req.params.country },
            { statistical : { $elemMatch: { year : req.params.year }}}
        )      
         
    } 
    query.exec(function (err,country) {
        if (err){
            res.send(err);
        }
        res.json(country);
    });
};

exports.getCountryType2 = function(req, res) {
    console.log('donne', req.params.donne)
    let query;

    if(req.params.type === 'general'){
        query = Countries.find(
            {  },
            { general : { $elemMatch: { year : req.params.year }},  country : req.params.country }
        )
    }else{
        query = Countries.find(
            { country : req.params.country },
            { statistical : { $elemMatch: { year : req.params.year,  }},  country : req.params.country }

        )

    }
    query.exec(function (err,country) {
        if (err){
            res.send(err);
        }
        res.json(country);
    });
};




exports.c_hello = function(req, res) {
    res.sendFile('views/form.html', { root: 'api'})
}

exports.c_all = function(req, res) {

    Countries.
        find({}).
        exec( function(err, datas) {

            if (err) res.send(err)

            res.json(datas)

        })
}



// récupère uniquement les noms des pays
exports.c_countries_name = function(req, res) {

    Countries.
        find({}).
        select('name').
        exec( function(err, datas) {

            if (err) res.send(err)

            let names = []

            for (let data of datas) names.push(data.name)

            let namesJSON = JSON.stringify({data: names})

            res.json(namesJSON)

        })
}


// récupérer toutes les sources
// TODO : - trier sources directement dans la requete
exports.c_sources = function(req, res) {

    // tableau à renvoyer une fois trier
    let sources= []


    // récupère nos données
    Countries.
        find({}).
        select( ['gender', 'general'] ).
        exec( function(err, datas) {


            // sépare nos données en deux catégories
            let generalData = []
            let genderData = []

            for (let data of datas) {
                generalData.push(data.general)
                genderData.push(data.gender)
            }


            // récupére les sources dans nos deux tableaux
            for (let general of generalData)
                for (let i = 0; i < general.length; i++)
                    sources.push(general[i].source)

            for (let gender of genderData)
                for (let genderYear of gender)
                    for (let type of genderYear.data)
                        sources.push(type.source)


            // on trie notre tableau en effaçant les doublons
            let sourcesOrdered =
                sources.sort().filter(function (item, pos, array) {
                    return !pos || item !== array[pos - 1];
                })

            let sourcesJSON = JSON.stringify({data: sourcesOrdered})

            res.json(sourcesJSON)

        })
}


exports.c_data = function(req, res) {

    // paramètres de base
    let select = ['general', 'gender', 'name']

    let year_array = null

    // Todo : automatiser pour avoir tous les pays + catégories général et gender
    let country_array = [
        'en',
        'fr'
    ]

    let gender_array = [
        'life_expectancy',
        'victimization',
        'health_care',
        'primary_school',
        'secondary_school',
        'higher_education',
        'salary',
        'unemployment',
        'work_time',
        'occupational_integration',
        'poverty',
        'population_percent',
        'politic'
    ]

    let general_array = [
        'area',
        'population',
        'pib',
        'ppa',
        'idh',
        'country_unemployment'
    ]

    let gender_array_length_all = gender_array.length
    let general_array_length_all = general_array.length




    // récupère les paramètres de filtre de catégorie
    let isFilterYear = req.query.year
    let isFilterCountry = req.query.country
    let showGender = req.query.gender
    let showGeneral = req.query.general
    let isGenderCompare = req.query.genderCompare




    // on ajuste les données en fonctiondes paramètres envoyés

    // 1 - ce que l'on va sélectionner pour renvoyer
    if ( showGeneral === 'false' ) select.splice( select.indexOf('general'), 1)
    if ( showGender === 'false' ) select.splice( select.indexOf('gender'), 1)

    // si pas de filtres renvoie réponse vide
    // TODO : renvoyer un message d'erreur
    if ( showGeneral === 'false' && showGender === 'false' ) return res.json(null)


    // 2 - les tableaux de filtres
    if ( isFilterYear === 'true' && req.query.year_array !== undefined ) year_array = req.query.year_array
    if ( isFilterCountry === 'true' && req.query.country_array !== undefined ) country_array = req.query.country_array
    if ( showGender === 'true' && req.query.gender_array !== undefined ) gender_array = req.query.gender_array
    if ( showGeneral === 'true' && req.query.general_array !== undefined ) general_array = req.query.general_array


    let compareSexe = isGenderCompare ? req.query.genderCompareSexe : null
    let compareOperation = isGenderCompare ? req.query.genderCompareOperation : null


    Countries.
        find({}).
        select( select ).
        in('name', country_array).
        exec( function(err, datas) {


            let datasFiltered = datas



            for (let indexCountry = 0; indexCountry < datasFiltered.length; indexCountry++ ) {


                // years general + gender
                if ( year_array !== null ) {

                    // for general
                    if ( showGeneral === "true") {

                        for ( let indexGeneral = 0; indexGeneral < datasFiltered[indexCountry].general.length; indexGeneral++ ) {

                            if ( year_array.indexOf(datasFiltered[indexCountry].general[indexGeneral].year) < 0 ) {

                                datasFiltered[indexCountry].general.splice(indexGeneral, 1)
                                indexGeneral--
                            }
                        }
                    }


                    // for gender
                    if ( showGender === "true") {

                        for ( let indexGender = 0; indexGender < datasFiltered[indexCountry].gender.length; indexGender++ ) {

                            if ( year_array.indexOf(datasFiltered[indexCountry].gender[indexGender].year) < 0 ) {

                                datasFiltered[indexCountry].gender.splice( indexGender, 1)
                                indexGender--
                            }
                        }
                    }
                }




                // general
                if ( general_array.length !== general_array_length_all && showGeneral === "true" ) {

                    for ( let indexGeneral = 0; indexGeneral < datasFiltered[indexCountry].general.length; indexGeneral++ ) {

                        for (let type in datasFiltered[indexCountry].general[indexGeneral].data) {

                            if ( general_array.indexOf(type) < 0 ) {

                                datasFiltered[indexCountry].general[indexGeneral].data[type] = undefined

                            }
                        }
                    }
                }



                // genre
                if ( gender_array.length !== gender_array_length_all && showGender === "true" ) {

                    for ( let indexGender = 0; indexGender < datasFiltered[indexCountry].gender.length; indexGender++ ) {

                        for (let indexData = 0; indexData < datasFiltered[indexCountry].gender[indexGender].data.length; indexData++ ) {

                            if ( gender_array.indexOf(datasFiltered[indexCountry].gender[indexGender].data[indexData].type) < 0 ) {

                                datasFiltered[indexCountry].gender[indexGender].data.splice( indexData, 1)
                                // vu que l'on boucle sur le meem tableau on enlève 1 à l'index car ons upprime un éléménet
                                // sinon ça décale tout !
                                indexData--

                            }
                        }
                    }
                }




                // supériorité genre
                if ( isGenderCompare === "true" && showGender === "true" ) {

                    for ( let indexGender = 0; indexGender < datasFiltered[indexCountry].gender.length; indexGender++ ) {

                        for (let indexData = 0; indexData < datasFiltered[indexCountry].gender[indexGender].data.length; indexData++ ) {


                            let f = datasFiltered[indexCountry].gender[indexGender].data[indexData].data.f
                            let m = datasFiltered[indexCountry].gender[indexGender].data[indexData].data.m


                            let second = compareSexe === "f" ? "m" : "f"
                            let query = compareSexe + ' ' + compareOperation + ' ' + second


                            if ( !eval(query) ) {

                                datasFiltered[indexCountry].gender[indexGender].data.splice( indexData, 1)
                                indexData--

                            }
                        }
                    }
                }



                // if empty remove
                // gender

                if ( showGender === "true" ) {

                    for (let indexData = 0; indexData < datasFiltered[indexCountry]['gender'].length; indexData++ ) {

                        if ( datasFiltered[indexCountry]['gender'][indexData].data.length === 0 ) {

                            datasFiltered[indexCountry]['gender'].splice(indexData, 1)
                            indexData--

                        }
                    }

                    if ( datasFiltered[indexCountry]['gender'].length === 0 ) {

                        datasFiltered[indexCountry].gender = undefined

                    }
                }


                //general

                if ( showGeneral === "true" ) {

                    if ( datasFiltered[indexCountry].general.length === 0 ) {

                        datasFiltered[indexCountry].general = undefined

                    }
                }



                // si les deux vide on enlève
                if (datasFiltered[indexCountry].general === undefined && datasFiltered[indexCountry].gender === undefined ) {

                    datasFiltered.splice(indexCountry, 1)
                    indexCountry--

                }
            }


            let datasFilteredJSON = JSON.stringify({data: datasFiltered})

            res.json(datasFilteredJSON)
        })
}