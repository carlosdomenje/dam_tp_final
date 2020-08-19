var express = require('express');
var routerEl = express.Router();
var pool = require('../../mysql');

//Espera recibir por parámetro un id de electrovalvula y devuelve su última medición
routerEl.get('/:idElectrovalvula', function(req, res) {
    pool.query('Select nombre from Electrovalvulas where electrovalvulaId=?', [req.params.idElectrovalvula], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result[0]);
    });
});



module.exports = routerEl;