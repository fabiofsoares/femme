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
mongoimport --db ecv-api --collection countries --type json --file <JSON FILE>



## todo charline 
- OK    : grosse requete country + filtre en / 
- OK    : enlever toutes les ID dans les renvoie de données
- OK    : gestion des erreurs messages personnalisés + renvoyer code HTTP
- OK    : wrapper
- OK    : 404 -> proposition de routes
- OK    : premiere requete / 
- OK    : repasser les requêtes en paramètres !!
- OK    : Token
- OK    : User login + register + update + delete + add adresse
- OK    : CORS ? -> avec l'enregistrement des users
- Autocomplétion ?
- heroku 
- HTTPS /!\ : let's encrypt >>> pour avoir un certificat https
- Cross Site Request Forgery CSRF : voir si plugin


## todo Fabio 
OK put
OK put-general
OK put-gender
- update-general  
- update-gender  
- cache : sur 2 ou 3 des routes > si pas de cache on le spécifie aussi
- à vérifier avec le cache control
+++ ETag > forcer à enlever le cache si la ressource à été modifiée


## mel : 
- remplir 5 pays minimun
- https://www.scaleway.com/
- heroku ?


## todo Global : 
- renvoyer données triées avec status + message si erreur et data si ok 
- OK    : écrire routes dans /
- OK    : écrire routes dans 404
