'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res) {
    response.ok("Aplikasi REST API ku berjalan!",res)
};

// Menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function(req,res) {
    connection.query('SELECT * FROM Mahasiswa', function(error, rows, fields) {
        if(error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

// Menampilkan semua data mahasiswa berdasarkan id
exports.tampilkanberdasarkanid = function(req,res) {
    let id = req.params.id;
    connection.query('SELECT * FROM Mahasiswa WHERE id_mahasiswa = ?', [id],
        function(error, rows, fields) {
            if(error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
};