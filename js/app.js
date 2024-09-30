// Fungsi untuk menampilkan notifikasi SweetAlert
function showMessage(message, type = 'success') {
    if (type === 'success') {
        // Tampilkan popup notifikasi dengan SweetAlert
        Swal.fire({
            title: 'Success!',
            text: 'Data berhasil disimpan!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } else if (type === 'error') {
        // Tampilkan popup notifikasi error jika diperlukan
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Event listener untuk menyimpan data saat form disubmit
document.getElementById('inputForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Ambil nilai input dari form
    const noSurat = document.getElementById('noSurat').value;
    const tanggalMasuk = document.getElementById('tanggalMasuk').value;
    const pengirim = document.getElementById('pengirim').value;
    const perihal = document.getElementById('perihal').value;

    // Buat object data surat
    const dataSurat = {
        noSurat,
        tanggalMasuk,
        pengirim,
        perihal
    };

    // Simpan data ke localStorage
    let dataList = JSON.parse(localStorage.getItem('dataSurat')) || [];
    dataList.push(dataSurat);
    localStorage.setItem('dataSurat', JSON.stringify(dataList));

    // Tampilkan data yang disimpan
    displayData();

    // Reset form setelah data disimpan
    document.getElementById('inputForm').reset();

    // Tampilkan pesan sukses
    showMessage('Data berhasil diinput!');

});

// Fungsi untuk menampilkan data yang disimpan
function displayData() {
    const output = document.getElementById('output');
    const dataList = JSON.parse(localStorage.getItem('dataSurat')) || [];

    output.innerHTML = '<h2>Data Surat Masuk</h2>';
    dataList.forEach((data, index) => {
        output.innerHTML += `
            <p><strong>Surat ${index + 1}</strong></p>
            <p>No Surat: ${data.noSurat}</p>
            <p>Tanggal Masuk: ${data.tanggalMasuk}</p>
            <p>Pengirim: ${data.pengirim}</p>
            <p>Perihal: ${data.perihal}</p>
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData('${data.noSurat}')">Hapus</button>
            <hr>
        `;
    });
}

// Fungsi untuk menghapus data berdasarkan noSurat
function deleteData(noSurat) {
    // Tampilkan popup konfirmasi sebelum menghapus data
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Data tidak dapat dikembalikan setelah dihapus!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Jika pengguna menekan "Ya, hapus!"
            
            // Ambil data dari localStorage
            let dataList = JSON.parse(localStorage.getItem('dataSurat')) || [];

            // Filter data untuk menghapus data dengan noSurat yang cocok
            const updatedDataList = dataList.filter((data) => data.noSurat !== noSurat);

            // Simpan kembali data yang sudah dihapus ke localStorage
            localStorage.setItem('dataSurat', JSON.stringify(updatedDataList));

            // Tampilkan data yang diperbarui
            displayData();

            // Tampilkan pesan sukses penghapusan
            Swal.fire(
                'Dihapus!',
                'Data berhasil dihapus.',
                'success'
            );
        }
    });
}

// Fungsi untuk mengisi form dengan data yang ingin diedit
function editData(index) {
    const dataList = JSON.parse(localStorage.getItem('dataSurat')) || [];
    const data = dataList[index];

    // Isi form dengan data yang ingin diedit
    document.getElementById('noSurat').value = data.noSurat;
    document.getElementById('tanggalMasuk').value = data.tanggalMasuk;
    document.getElementById('pengirim').value = data.pengirim;
    document.getElementById('perihal').value = data.perihal;

    // Hapus data lama dari array
    dataList.splice(index, 1);
    localStorage.setItem('dataSurat', JSON.stringify(dataList));

    // Tampilkan notifikasi popup bahwa data siap diedit
    Swal.fire({
        title: 'Edit Data',
        text: 'Data siap untuk diedit. Silakan simpan perubahan!',
        icon: 'info',
        confirmButtonText: 'OK'
    });
}

// Event listener untuk pencarian surat
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Ambil nilai input pencarian
    const searchNoSurat = document.getElementById('searchNoSurat').value.trim().toLowerCase();
    const searchPengirim = document.getElementById('searchPengirim').value.trim().toLowerCase();

    // Ambil data dari localStorage
    const dataList = JSON.parse(localStorage.getItem('dataSurat')) || [];

    // Fungsi untuk memeriksa apakah 4 karakter pertama cocok
    const isMatch = (input, dataField) => {
        if (input === "") return true; // Jika input kosong, lewati pencocokan
        return dataField.toLowerCase().startsWith(input.slice(0, 4)); // Cocokkan 4 karakter pertama
    };

    // Filter data berdasarkan input pencarian
    const filteredData = dataList.filter((data) => {
        const noSuratMatch = searchNoSurat === "" || data.noSurat.toLowerCase().includes(searchNoSurat);
        const pengirimMatch = searchPengirim === "" || data.pengirim.toLowerCase().includes(searchPengirim);

        // Hanya tampilkan data jika kedua input cocok atau salah satu input kosong
        return noSuratMatch && pengirimMatch;
    });

    // Tampilkan hasil pencarian
    displaySearchResult(filteredData);
});

// Fungsi untuk menampilkan hasil pencarian
function displaySearchResult(dataList) {
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = '<h2>Hasil Pencarian</h2>';

    if (dataList.length > 0) {
        dataList.forEach((data, index) => {
            searchResult.innerHTML += `
                <p><strong>Surat ${index + 1}</strong></p>
                <p>No Surat: ${data.noSurat}</p>
                <p>Tanggal Masuk: ${data.tanggalMasuk}</p>
                <p>Pengirim: ${data.pengirim}</p>
                <p>Perihal: ${data.perihal}</p>
                <button onclick="editData(${index})">Edit</button>
                <button onclick="deleteData('${data.noSurat}')">Hapus</button>
                <hr>
            `;
        });
    } else {
        searchResult.innerHTML += '<p>Tidak ada data yang sesuai dengan pencarian Anda.</p>';
    }
}

// Tampilkan data saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayData);
