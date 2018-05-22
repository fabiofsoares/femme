'use strict';
let mongoose = require('mongoose'),
    Countries = mongoose.model('Countries');


exports.hello = function(req, res) {
    res.send('Hello World!') 
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

            let namesJSON = JSON.stringify({status: 'success', data: names})

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

            let sourcesJSON = JSON.stringify({status: 'success', data: sourcesOrdered})

            res.json(sourcesJSON)

        })
}

exports.c_data = function(req, res) {

    let datasFilteredJSON;

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

                    datasFilteredJSON = JSON.stringify({status: 'empty', data: null})

                }

                else {

                    datasFilteredJSON = JSON.stringify({status: 'success', data: datasFiltered})

                }
            }

            res.json(datasFilteredJSON)
        })
}

exports.getAll = function(req, res) {
    Countries.find({}, function(err, countries) {
        if (err){
            res.send(err);
        }            
        res.json(countries);
    }); 
};

exports.getCountry = function(req, res) {    
    Countries.findOne({name: req.params.country}, function(err,country) { 
        if (err){
            res.send(err);
        }        
        res.json(country);    
    });
};

exports.getCountryType = function(req, res) {
    let query;
    
    if(req.params.type === 'gender'){
        query = Countries.find(
            { name : req.params.country },           
            { gender : { $elemMatch: { year : req.params.year }},  name : req.params.country }
        )
    }else{
        query = Countries.find(
            { name : req.params.country },
            { general : { $elemMatch: { year : req.params.year }}, name : req.params.country }
        )      
         
    } 
    query.exec(function (err,country) {
        if (err){
            res.send(err);
        }
        res.json(country);
    });
};

exports.admin = function(req, res) {
    res.sendFile('views/admin.html', { root: 'api'})
}

exports.newCountry = function(req, res) {    
    let item = {
        name : req.body.name        
    }    
    let newCountry = new Countries(item);
    newCountry.save(function(err, country) {
      if (err){
        res.send(err);
      }        
      res.redirect('/');
    });    
}

exports.addGender = function(req, res){
    let id = req.body.id,
    item = {
        year: req.body.year,
        data: [
            {
                type: 'victimization',
                source: req.body.source_0,
                data:{
                        m: req.body.dataM_0,
                        f: req.body.dataF_0
                    }
            },
            {
                type: 'health_care',
                source: req.body.source_1,
                data:{
                        m: req.body.dataM_1,
                        f: req.body.dataF_1
                    }
            },
            {
                type: 'primary_school',
                source: req.body.source_2,
                data:{
                        m: req.body.dataM_2,
                        f: req.body.dataF_2
                    }
            },
            {
                type: 'secondary_school',
                source: req.body.source_3,
                data:{
                        m: req.body.dataM_3,
                        f: req.body.dataF_3
                    }
            },
            {
                type: 'higher_education',
                source: req.body.source_4,
                data:{
                        m: req.body.dataM_4,
                        f: req.body.dataF_4
                    }
            },
            {
                type: 'salary',
                source: req.body.source_5,
                data:{
                        m: req.body.dataM_5,
                        f: req.body.dataF_5
                    }
            },
            {
                type: 'unemployment',
                source: req.body.source_6,
                data:{
                        m: req.body.dataM_6,
                        f: req.body.dataF_6
                    }
            },
            {
                type: 'work_time',
                source: req.body.source_7,
                data:{
                        m: req.body.dataM_7,
                        f: req.body.dataF_7
                    }
            },
            {
                type: 'occupational_integration',
                source: req.body.source_8,
                data:{
                        m: req.body.dataM_8,
                        f: req.body.dataF_8
                    }
            },
            {
                type: 'poverty',
                source: req.body.source_9,
                data:{
                        m: req.body.dataM_9,
                        f: req.body.dataF_9
                    }
            },
            {
                type: 'population_percent',
                source: req.body.source_10,
                data:{
                        m: req.body.dataM_10,
                        f: req.body.dataF_10
                    }
            },
            {
                type: 'politic',
                source: req.body.source_11,
                data:{
                        m: req.body.dataM_11,
                        f: req.body.dataF_11
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
        year: req.body.year,
        source : req.body.source,
        data : {
            area : req.body.area,
            population : req.body.population,
            pib : req.body.pib,
            ppa : req.body.ppa,
            idh : req.body.idh,
            country_unemployment : req.body.country_unemployment
        }
    };
    Countries.findById(id, function(err, country){
        if(err){
            console.error('error, country not found !');
        }
        country.general.push(item);
        country.save();
        res.redirect('/admin');
    })
}

exports.deleteCountry = function(req, res){
    var id = req.body.id;    
    Countries.findByIdAndRemove(id).exec();
    res.redirect('/admin');
}

exports.updateCountry = function(req, res){
    let id = req.body.id;
    Countries.findById(id, function(err, country) {
        if (err) {
            console.error('error, country not found');
        }    
        country.name = req.body.name;
        country.save();
    })
    res.redirect('/admin');
}


exports.updateGender = function(req, res){
    let id = req.body.id,
        year = req.body.year;

    Countries.find( { name : req.params.country }, 
        { gender : { $elemMatch: { year : req.params.year }}});
    
    query.exec(function (err,country) {
        if (err) {
            console.error('error, country/year not found');
        }
        for(var i = 0; i < 12; i++){
            country.data[i].source = req.body.source_+i;
            country.data[i].data.m = req.body.dataM_+i;
            country.data[i].data.f = req.body.dataF_+i;
        }    
        country.save();
        res.redirect('/admin');         
    
    });
    
}

exports.updateGeneral = function(req, res){
   
         
    let query = Countries.find(
            { _id : req.body.id },
            { general : { $elemMatch: { year : req.body.year }} }
        ) 
        query.exec(function (err,country) {
            if (err){
                res.send(err);
            }
            for (var key in country) {
                console.log(country[key])             
                
            }
            //res.json(country.year);
        });
   
    
   /*  query.exec(function (err,country) {
        if (err) {
            console.error('error, country/year not found');
        }
        /* country.general.data.area = req.body.area;  
        country.general.data.population = req.body.population;  
        country.general.data.pib = req.body.pib;  
        country.general.data.ppa = req.body.ppa;  
        country.general.data.idh = req.body.idh;  
        country.general.data.country_unemployment = req.body.country_unemployment;  
        
        country.save(); */
       /*  console.log(query.general)
        res.redirect('/admin');      */   
    
   // });     
}