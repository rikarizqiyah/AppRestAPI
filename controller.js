'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API ku berjalan!", res)
};

// Menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function (req, res) {
    connection.query('SELECT * FROM Mahasiswa', function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

// Menampilkan semua data mahasiswa berdasarkan id
exports.tampilkanberdasarkanid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM Mahasiswa WHERE id_mahasiswa = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
};

// Menambahkan data mahasiswa
exports.tambahMahasiswa = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO Mahasiswa (nim,nama,jurusan) VALUES(?,?,?)', [nim, nama, jurusan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menambahkan data!", res)
            }
        }
    );
};

// Mengubah data berdasarkan id
exports.ubahMahasiswa = function (req, res) {
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE Mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim, nama, jurusan, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil ubah data", res)
            }
        }
    );
}

// Menghapus data berdasarkan id
exports.hapusMahasiswa = function (req, res) {
    var id = req.body.id_mahasiswa;
    connection.query('DELETE FROM Mahasiswa WHERE id_mahasiswa=?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil hapus data", res)
            }
        }
    );
}

// Menampilkan MataKuliah grup
exports.tampilgroupmatakuliah = function(req, res) {
    connection.query('SELECT c.id_mahasiswa, c.nim, c.nama, c.jurusan, b.matakuliah, b.sks FROM Krs a JOIN MataKuliah b ON a.id_matakuliah = b.id_matakuliah JOIN Mahasiswa c ON a.id_mahasiswa = c.id_mahasiswa ORDER BY c.id_mahasiswa',
        function(error, rows, fields) {
            if(error) {
                console.log(error);
            } else {
                response.oknested(rows, res);
            }
        }
    )
}