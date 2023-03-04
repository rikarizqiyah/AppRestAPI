'use strict';

exports.ok = function(values, res) {
    var data = {
        'status':200,
        'values':values
    };

     res.json(data);
     res.end();
};

// Response untuk nested MataKuliah
exports.oknested = function(values, res) {
    // Lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        // Tentukan key group
        if(akumulasikan[item.nama]) {
            // Buat variabel grup nama mahasiswa
            const group = akumulasikan[item.nama];
            // Cek jika isi array adalah MataKuliah
            if(Array.isArray(group.matakuliah)) {
                // Tambahkan value ke dalam grup MataKuliah
                group.matakuliah.push(item.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status':200,
        'values':hasil
    };

    res.json(data);
    res.end();
}