# PROJET API FEMME

1. npm install
2. npm run server

## MongoDB
N'oublie de pas d'importer le nouveau fichier 'countries.json' sur la base de donnée et de configurer le fichier 'server.js' pour pointer ta base de donnée

## Routes  
1. /

    hello world (home page)

2. /countries
    
    retour de tous les données de la base
    

3. /country_name
    
    retour de tous les données du pays
    

4. /country_name/type (in consctuction)
   
   retour les donnes "statical" ou "general" du pays
   

5. /country_name/type/date (in consctuction)
    
    retour les donnes "statical" ou "general" du pays selon l'annee 
    



## Notes MongoDB

START :
\MongoDB\Server\3.6\bin
$ mongod

Import :
mongoimport --db <DB NAME> --collection <COLLECTION NAME> --type json --file <JSON FILE>
