const   express = require('express'),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        app = express(),
        port = process.env.PORT || 3000,
        host  = '127.0.0.1';    

let routes = require('./api/routes/femmeRoute'),
    Countries = require('./api/models/femmeModel');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/ecv-api");
        
        
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); 

app.listen(port, host, function () {
    console.log('Femme app listening on : ' + host + ':' + port)
})

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found!'})
});
