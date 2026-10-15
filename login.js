/* ==========================================================
   RuangRupa Store - js/login.js
   Validasi form login dengan JavaScript vanilla.

   Aturan validasi:
   1. Username atau email tidak boleh kosong.
   2. Jika yang diisi berupa email (mengandung tanda @), formatnya harus benar.
   3. Password tidak boleh kosong.
   4. Password minimal 8 karakter.

   PENTING: website ini statis dan tidak punya backend, jadi tidak ada proses
   login yang sebenarnya. Kode ini hanya memeriksa isi form di browser.
   ========================================================== */

/* ----------------------------------------------------------
   1. PENGATURAN DAN ELEMEN HALAMAN
   ---------------------------------------------------------- */

// Pola (regular expression) sederhana untuk memeriksa format email:
// teks, lalu @, lalu teks, lalu titik, lalu teks. Tidak boleh ada spasi.
const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Panjang minimum password
const PANJANG_MIN_PASSWORD = 8;

// Mengambil elemen-elemen HTML yang akan dipakai, lewat atribut id-nya
const formLogin = document.getElementById("formLogin");
const inputIdentitas = document.getElementById("identitas");
const inputPassword = document.getElementById("password");
const areaPesan = document.getElementById("pesanLogin");

/* ----------------------------------------------------------
   2. FUNGSI VALIDASI
   Fungsi ini hanya memeriksa dan mengembalikan daftar kesalahan.
   Jika daftar kosong, artinya semua input valid.
   ---------------------------------------------------------- */
function validasiLogin(identitas, password) {
  const daftarGalat = [];

  // trim() membuang spasi di awal dan akhir, supaya "   " dianggap kosong
  const identitasBersih = identitas.trim();

  // Aturan 1 dan 2: periksa username atau email
  if (identitasBersih === "") {
    daftarGalat.push({
      kolom: "identitas",
      pesan: "Username atau email tidak boleh kosong."
    });
  } else if (identitasBersih.includes("@") && !POLA_EMAIL.test(identitasBersih)) {
    // Mengandung @ berarti dianggap email, jadi formatnya diperiksa
    daftarGalat.push({
      kolom: "identitas",
      pesan: "Format email tidak valid. Contoh yang benar: nama@contoh.com."
    });
  }

  // Aturan 3 dan 4: periksa password (tidak di-trim, spasi dihitung sebagai karakter)
  if (password === "") {
    daftarGalat.push({
      kolom: "password",
      pesan: "Password tidak boleh kosong."
    });
  } else if (password.length < PANJANG_MIN_PASSWORD) {
    daftarGalat.push({
      kolom: "password",
      pesan: "Password minimal " + PANJANG_MIN_PASSWORD + " karakter."
    });
  }

  return daftarGalat;
}

/* ----------------------------------------------------------
   3. FUNGSI TAMPILAN
   ---------------------------------------------------------- */

// Menampilkan Bootstrap Alert di area pesan.
// jenis: "danger" (merah, untuk kesalahan) atau "success" (hijau, untuk berhasil)
function tampilkanAlert(jenis, isiHtml) {
  areaPesan.innerHTML =
    '<div class="alert alert-' + jenis + ' mb-4" role="alert">' + isiHtml + "</div>";
}

// Menghapus tanda merah (is-invalid) dari kedua kolom
function hapusTandaKolom() {
  [inputIdentitas, inputPassword].forEach(function (kolom) {
    kolom.classList.remove("is-invalid");
    kolom.removeAttribute("aria-invalid");
  });
}

/* ----------------------------------------------------------
   4. EVENT: SAAT FORM DIKIRIM (SUBMIT)
   ---------------------------------------------------------- */
formLogin.addEventListener("submit", function (event) {
  // Mencegah perilaku bawaan browser (memuat ulang halaman dan mengirim form).
  // Dipanggil di awal agar halaman tidak pernah dimuat ulang, karena tidak ada
  // backend yang menerima data dan pesan di bawah akan hilang kalau halaman dimuat ulang.
  event.preventDefault();

  // Ambil isi kolom lalu periksa
  const daftarGalat = validasiLogin(inputIdentitas.value, inputPassword.value);

  hapusTandaKolom();

  if (daftarGalat.length > 0) {
    // ---- Ada input yang tidak valid ----
    // Beri tanda merah pada kolom yang salah
    const kolomInput = { identitas: inputIdentitas, password: inputPassword };
    daftarGalat.forEach(function (galat) {
      kolomInput[galat.kolom].classList.add("is-invalid");
      kolomInput[galat.kolom].setAttribute("aria-invalid", "true");
    });

    // Susun pesan kesalahan menjadi daftar di dalam Alert merah
    const daftarPesan = daftarGalat
      .map(function (galat) {
        return "<li>" + galat.pesan + "</li>";
      })
      .join("");
    tampilkanAlert(
      "danger",
      '<p class="fw-semibold mb-1">Periksa kembali isian kamu:</p><ul class="mb-0 ps-3">' + daftarPesan + "</ul>"
    );

    // Pindahkan kursor ke kolom pertama yang salah
    kolomInput[daftarGalat[0].kolom].focus();
    return;
  }

  // ---- Semua input valid ----
  // Pesan sengaja tidak menyatakan pengguna sudah masuk, karena tidak ada autentikasi.
  tampilkanAlert(
    "success",
    '<p class="fw-semibold mb-1">Validasi berhasil.</p>' +
      '<p class="mb-0">Isian username atau email dan password sudah sesuai aturan. ' +
      "Website ini bersifat statis tanpa backend, jadi belum ada proses login yang sebenarnya.</p>"
  );
});

/* ----------------------------------------------------------
   5. EVENT: SAAT PENGGUNA MENGETIK LAGI
   Tanda merah pada kolom hilang begitu pengguna mulai memperbaiki isiannya.
   ---------------------------------------------------------- */
[inputIdentitas, inputPassword].forEach(function (kolom) {
  kolom.addEventListener("input", function () {
    kolom.classList.remove("is-invalid");
    kolom.removeAttribute("aria-invalid");
  });
});
