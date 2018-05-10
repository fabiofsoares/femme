const   express = require('express'),
        app = express(),
        port = process.env.PORT || 3000,
        host  = '127.0.0.1',
        routes = require('./api/routes/femmeRoute');


routes(app); 
       
app.listen(port, host, function () {
    console.log('Femme app listening on : ' + host + ':' + port)
})


