var express = require('express');
var routerLogs = express.Router();
var pool = require('../../mysql');

//Espera recibir por parámetro un id de electrovalvula y devuelve su última medición
routerLogs.get('/:idElectrovalvula', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaId=? order by fecha desc', [req.params.idElectrovalvula], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

//Espera recibir por parámetro un id de electrovalvula y devuelve su última medición
routerLogs.get('/ultimo/:idElectrovalvula', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaId=? order by fecha desc', [req.params.idElectrovalvula], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result[0]);
    });
});
//Espera recibir por parámetro un log y lo inserta en base de datos.
routerLogs.post('/agregar', function(req, res) {

    fecha = new Date(req.body.fecha);
    console.log(fecha);

    pool.query('Insert into Log_Riegos (apertura,fecha,electrovalvulaId) values (?,?,?)', [req.body.apertura, fecha, req.body.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = routerLogs;