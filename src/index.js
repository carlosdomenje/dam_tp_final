var express = require('express');


var app = express();

var PORT = 3000;

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//ruteo dispositivo
var routerDisp = require('./routes/dispositivo');
//ruteo medicion
var routerMedicion = require('./routes/medicion');
//ruteo logs
var routerLogs = require('./routes/logs');
//ruteo electrovalvulas
var routerEl = require('./routes/electrovalvulas');


app.use(express.json());


app.use('/api/dispositivo', routerDisp);

app.use('/api/medicion', routerMedicion);

app.use('/api/logs', routerLogs);

app.use('/api/electrovalvulas', routerEl);

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});