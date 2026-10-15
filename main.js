/* ==========================================================
   RuangRupa Store - js/main.js
   Berisi:
   1. Data produk (satu sumber data untuk katalog dan detail)
   2. Fungsi bantu (format rupiah)
   3. Fitur katalog: tampil produk, pencarian, filter kategori
   4. Fitur halaman detail: tampil produk sesuai ?produk=<slug>
      dan daftar produk terkait
   ========================================================== */

/* ----------------------------------------------------------
   1. DATA PRODUK
   Setiap produk adalah sebuah objek di dalam array.
   "slug" dipakai sebagai alamat produk: detail.html?produk=<slug>
   ---------------------------------------------------------- */
const produkList = [
  {
    slug: "tote-bag-kanvas-natural",
    nama: "Tote Bag Kanvas Natural",
    kategori: "Tas",
    unggulan: true,
    harga: 89000,
    gambar: "assets/images/tote-bag.jpg",
    ringkas: "Kanvas tebal dengan tali panjang, muat untuk laptop dan buku harian.",
    deskripsi: "Tote bag berbahan kanvas tebal berwarna natural dengan jahitan rapi di bagian tali dan dasar. Bentuknya sederhana sehingga mudah dipadukan dengan pakaian apa pun, cocok untuk kuliah, bekerja, atau berbelanja.",
    bahan: "Kanvas katun tebal",
    ukuran: "38 x 40 cm, tali 60 cm",
    warna: "Natural, dengan aksen hijau sage",
    keunggulan: ["Muat laptop 14 inci dan buku", "Tali kuat dengan jahitan ganda", "Mudah dicuci dan cepat kering"]
  },
  {
    slug: "tumbler-keramik-sage",
    nama: "Tumbler Keramik Sage",
    kategori: "Tumbler",
    unggulan: true,
    harga: 125000,
    gambar: "assets/images/tumbler.jpg",
    ringkas: "Tumbler 350 ml berwarna hijau sage yang menjaga minuman tetap nyaman.",
    deskripsi: "Tumbler dengan warna hijau sage yang lembut dan tutup rapat untuk menemani aktivitas harian. Ukurannya pas di tangan dan masuk ke tempat minum pada kebanyakan tas.",
    bahan: "Keramik dengan lapisan glasir dan tutup silikon",
    ukuran: "Kapasitas 350 ml, tinggi 16 cm",
    warna: "Hijau sage",
    keunggulan: ["Tutup rapat untuk dibawa bepergian", "Permukaan glasir mudah dibersihkan", "Tidak menyerap bau minuman"]
  },
  {
    slug: "gantungan-kunci-kayu",
    nama: "Gantungan Kunci Kayu",
    kategori: "Aksesori",
    unggulan: false,
    harga: 25000,
    gambar: "assets/images/gantungan-kunci.jpg",
    ringkas: "Gantungan kunci kayu dengan ukiran sederhana, ringan dan mudah dibawa.",
    deskripsi: "Gantungan kunci berbahan kayu dengan ukiran ikon sederhana. Ringan, tidak mengganggu di saku, dan bisa menjadi hadiah kecil yang manis.",
    bahan: "Kayu dengan cincin logam",
    ukuran: "Panjang total 9 cm",
    warna: "Cokelat muda",
    keunggulan: ["Ringan dan tidak mudah bising", "Ukiran halus dengan tepi tumpul", "Cocok sebagai hadiah kecil"]
  },
  {
    slug: "buku-catatan-kraft",
    nama: "Buku Catatan Kraft",
    kategori: "Alat Tulis",
    unggulan: true,
    harga: 45000,
    gambar: "assets/images/buku-catatan.jpg",
    ringkas: "Sampul kraft dengan kertas polos tebal untuk menulis dan membuat sketsa.",
    deskripsi: "Buku catatan bersampul kraft dengan lembar polos yang cukup tebal untuk pulpen gel dan pensil. Pas untuk mencatat ide, membuat daftar tugas, atau menggambar sketsa ringan.",
    bahan: "Sampul kraft, isi kertas polos 100 gsm",
    ukuran: "A5 (14,8 x 21 cm), 80 halaman",
    warna: "Cokelat kraft dengan aksen sage",
    keunggulan: ["Kertas tidak mudah tembus tinta gel", "Jilidan kuat dan bisa dibuka rata", "Ringan untuk dibawa setiap hari"]
  },
  {
    slug: "pulpen-gel-pastel",
    nama: "Set Pulpen Gel Pastel",
    kategori: "Alat Tulis",
    unggulan: false,
    harga: 38000,
    gambar: "assets/images/pulpen-gel.jpg",
    ringkas: "Satu set pulpen gel warna pastel dengan tinta halus dan cepat kering.",
    deskripsi: "Set pulpen gel dengan warna-warna pastel yang menenangkan untuk mencatat, menandai, dan menghias jurnal. Tinta mengalir halus dan cukup cepat kering sehingga tulisan tidak mudah belepotan.",
    bahan: "Badan plastik, tinta gel",
    ukuran: "Isi 4 pulpen, ujung 0,5 mm",
    warna: "Sage, krem, cokelat muda, dan terakota",
    keunggulan: ["Tulisan halus dan rapi", "Warna pastel mudah dipadukan", "Praktis dibawa dalam satu set"]
  },
  {
    slug: "vas-keramik-mini",
    nama: "Vas Keramik Mini",
    kategori: "Dekorasi Meja",
    unggulan: true,
    harga: 75000,
    gambar: "assets/images/vas-keramik.jpg",
    ringkas: "Vas kecil bernuansa tanah untuk setangkai bunga kering di meja kerja.",
    deskripsi: "Vas keramik berukuran kecil dengan warna tanah yang hangat. Cocok diisi setangkai bunga kering atau daun segar untuk memberi suasana tenang di meja kerja atau rak buku.",
    bahan: "Keramik dengan glasir doff",
    ukuran: "Tinggi 12 cm, diameter 8 cm",
    warna: "Cokelat muda",
    keunggulan: ["Ukuran kecil, hemat tempat", "Glasir doff terlihat lembut", "Dasar rata sehingga stabil"]
  },
  {
    slug: "pouch-linen-serbaguna",
    nama: "Pouch Linen Serbaguna",
    kategori: "Aksesori",
    unggulan: false,
    harga: 55000,
    gambar: "assets/images/pouch-linen.jpg",
    ringkas: "Pouch linen dengan resleting untuk alat tulis, kabel, atau perlengkapan kecil.",
    deskripsi: "Pouch berbahan linen yang lembut dengan resleting halus. Bisa dipakai sebagai tempat alat tulis, kabel charger, atau perlengkapan kecil lain agar isi tas tetap rapi.",
    bahan: "Linen campuran dengan lapisan dalam kain",
    ukuran: "20 x 12 cm",
    warna: "Hijau sage",
    keunggulan: ["Resleting lancar dan kuat", "Lapisan dalam melindungi isi", "Muat banyak perlengkapan kecil"]
  },
  {
    slug: "lilin-aromaterapi",
    nama: "Lilin Aromaterapi",
    kategori: "Gaya Hidup",
    unggulan: false,
    harga: 68000,
    gambar: "assets/images/lilin.jpg",
    ringkas: "Lilin dalam wadah kaca dengan aroma lembut untuk menemani waktu santai.",
    deskripsi: "Lilin dalam wadah kaca dengan aroma lembut yang tidak terlalu menyengat. Cocok dinyalakan saat membaca, bekerja malam, atau sekadar bersantai di rumah.",
    bahan: "Lilin wax dalam wadah kaca",
    ukuran: "Berat 120 gram, diameter 7 cm",
    warna: "Krem dengan label sage",
    keunggulan: ["Aroma lembut dan tidak menyengat", "Wadah kaca bisa dipakai ulang", "Cocok sebagai hadiah"]
  }
];

/* ----------------------------------------------------------
   2. FUNGSI BANTU
   ---------------------------------------------------------- */

// Mengubah angka 89000 menjadi teks "Rp89.000"
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

/* ----------------------------------------------------------
   3. FITUR KATALOG
   ---------------------------------------------------------- */

// Membuat HTML satu kartu produk dari satu objek produk.
// Template literal (tanda ` `) memudahkan menyisipkan data dengan ${...}
function buatKartuProduk(produk) {
  // Label "Unggulan" hanya muncul jika produk.unggulan bernilai true
  const labelUnggulan = produk.unggulan
    ? '<span class="badge badge-brown">Unggulan</span>'
    : "";

  return `
    <div class="col-12 col-sm-6 col-lg-3">
      <article class="card product-card h-100">
        <img src="${produk.gambar}" class="card-img-top" alt="${produk.nama}"
             width="600" height="600" loading="lazy"
             onerror="this.onerror=null; this.src='assets/images/hero.svg';">
        <div class="card-body d-flex flex-column">
          <div class="mb-2 d-flex gap-2 flex-wrap">
            <span class="badge badge-sage">${produk.kategori}</span>
            ${labelUnggulan}
          </div>
          <h3 class="h5 card-title">${produk.nama}</h3>
          <p class="card-text small flex-grow-1">${produk.ringkas}</p>
          <p class="product-price mb-3">${formatRupiah(produk.harga)}</p>
          <a href="detail.html?produk=${produk.slug}" class="btn btn-sage w-100">Lihat Detail</a>
        </div>
      </article>
    </div>`;
}

// Menyaring produk berdasarkan kategori dan kata kunci pencarian.
// Fungsi ini hanya menghitung, tidak mengubah tampilan, sehingga mudah diuji.
function saringProduk(daftar, kategori, kataKunci) {
  const kunci = kataKunci.trim().toLowerCase();

  return daftar.filter(function (produk) {
    // Cocok kategori jika "Semua" atau sama dengan kategori produk
    const cocokKategori = kategori === "Semua" || produk.kategori === kategori;

    // Cocok pencarian jika kata kunci ada di nama, kategori, atau deskripsi singkat
    const teksProduk = (produk.nama + " " + produk.kategori + " " + produk.ringkas).toLowerCase();
    const cocokKunci = kunci === "" || teksProduk.includes(kunci);

    return cocokKategori && cocokKunci;
  });
}

// Menyiapkan seluruh fitur katalog. Hanya berjalan jika halaman punya #daftarProduk.
function mulaiKatalog() {
  const wadahProduk = document.getElementById("daftarProduk");
  if (!wadahProduk) {
    return; // Bukan halaman katalog, hentikan
  }

  const formCari = document.getElementById("formCari");
  const kolomCari = document.getElementById("kolomCari");
  const tombolFilter = document.getElementById("filterKategori");
  const pesanKosong = document.getElementById("pesanKosong");
  const infoHasil = document.getElementById("infoHasil");

  // Status yang sedang aktif
  let kategoriAktif = "Semua";

  // Menampilkan ulang produk sesuai status (kategori + kata kunci)
  function perbaruiTampilan() {
    const hasil = saringProduk(produkList, kategoriAktif, kolomCari.value);

    // Gabungkan semua kartu menjadi satu teks HTML lalu tempel ke halaman
    wadahProduk.innerHTML = hasil.map(buatKartuProduk).join("");

    // Tampilkan pesan jika tidak ada produk yang cocok
    pesanKosong.classList.toggle("d-none", hasil.length > 0);

    // Perbarui teks jumlah hasil
    infoHasil.textContent = "Menampilkan " + hasil.length + " dari " + produkList.length + " produk";
  }

  // Memberi tanda tombol kategori yang sedang aktif
  function tandaiTombolAktif() {
    const semuaTombol = tombolFilter.querySelectorAll("button");
    semuaTombol.forEach(function (tombol) {
      const aktif = tombol.dataset.kategori === kategoriAktif;
      tombol.classList.toggle("btn-sage", aktif);
      tombol.classList.toggle("btn-outline-sage", !aktif);
      tombol.setAttribute("aria-pressed", aktif ? "true" : "false");
    });
  }

  // Pencarian: jalan setiap kali pengguna mengetik
  kolomCari.addEventListener("input", perbaruiTampilan);

  // Tekan Enter di kolom cari: cegah halaman dimuat ulang
  formCari.addEventListener("submit", function (event) {
    event.preventDefault();
    perbaruiTampilan();
  });

  // Filter: satu pendengar klik di wadah tombol (event delegation)
  tombolFilter.addEventListener("click", function (event) {
    const tombol = event.target.closest("button");
    if (!tombol) {
      return;
    }
    kategoriAktif = tombol.dataset.kategori;
    tandaiTombolAktif();
    perbaruiTampilan();
  });

  // Jika datang dari halaman lain dengan ?kategori=..., aktifkan filter itu
  const parameter = new URLSearchParams(window.location.search);
  const kategoriDariUrl = parameter.get("kategori");
  const kategoriValid = produkList.some(function (produk) {
    return produk.kategori === kategoriDariUrl;
  });
  if (kategoriValid) {
    kategoriAktif = kategoriDariUrl;
  }

  // Tampilan awal
  tandaiTombolAktif();
  perbaruiTampilan();
}

/* ----------------------------------------------------------
   4. FITUR HALAMAN DETAIL
   Alamat halaman: detail.html?produk=tumbler-keramik-sage
   Bagian "?produk=..." dibaca, lalu dicocokkan dengan slug di produkList.
   ---------------------------------------------------------- */

// Mencari produk berdasarkan slug.
// Jika slug kosong atau tidak dikenal, pakai produk pertama (Tote Bag) sebagai bawaan.
function cariProduk(slug) {
  const ditemukan = produkList.find(function (produk) {
    return produk.slug === slug;
  });
  return ditemukan || produkList[0];
}

// Memilih produk terkait: kategori yang sama didahulukan, sisanya menyusul.
// Produk yang sedang dibuka tidak ikut ditampilkan.
function cariProdukTerkait(produkAktif, jumlah) {
  const lain = produkList.filter(function (produk) {
    return produk.slug !== produkAktif.slug;
  });
  const sekategori = lain.filter(function (produk) {
    return produk.kategori === produkAktif.kategori;
  });
  const beda = lain.filter(function (produk) {
    return produk.kategori !== produkAktif.kategori;
  });
  return sekategori.concat(beda).slice(0, jumlah);
}

// Mengisi halaman detail. Hanya berjalan jika halaman punya #namaProduk.
function mulaiDetail() {
  const judulProduk = document.getElementById("namaProduk");
  if (!judulProduk) {
    return; // Bukan halaman detail, hentikan
  }

  // Ambil nilai parameter "produk" dari alamat halaman
  const parameter = new URLSearchParams(window.location.search);
  const produk = cariProduk(parameter.get("produk"));

  // Isi teks dasar. textContent dipakai karena hanya menyisipkan teks biasa.
  document.title = produk.nama + " | RuangRupa Store";
  judulProduk.textContent = produk.nama;
  document.getElementById("breadcrumbProduk").textContent = produk.nama;
  document.getElementById("hargaProduk").textContent = formatRupiah(produk.harga);
  document.getElementById("deskripsiProduk").textContent = produk.deskripsi;
  document.getElementById("bahanProduk").textContent = produk.bahan;
  document.getElementById("ukuranProduk").textContent = produk.ukuran;
  document.getElementById("warnaProduk").textContent = produk.warna;
  document.getElementById("badgeKategori").textContent = produk.kategori;

  // Badge "Unggulan" tampil hanya jika produk.unggulan bernilai true
  document.getElementById("badgeUnggulan").classList.toggle("d-none", !produk.unggulan);

  // Gambar besar, lengkap dengan teks alternatif dan gambar cadangan
  const gambar = document.getElementById("gambarProduk");
  gambar.src = produk.gambar;
  gambar.alt = produk.nama;
  gambar.onerror = function () {
    gambar.onerror = null; // cegah perulangan jika gambar cadangan juga gagal
    gambar.src = "assets/images/hero.svg";
  };

  // Daftar keunggulan: satu <li> untuk setiap item di array produk.keunggulan
  document.getElementById("keunggulanProduk").innerHTML = produk.keunggulan
    .map(function (butir) {
      return '<li class="d-flex gap-2 mb-2"><i class="bi bi-check-circle-fill text-sage" aria-hidden="true"></i><span>' + butir + "</span></li>";
    })
    .join("");

  // Produk terkait: empat kartu, memakai ulang buatKartuProduk() dari katalog
  document.getElementById("produkTerkait").innerHTML = cariProdukTerkait(produk, 4)
    .map(buatKartuProduk)
    .join("");
}

// Jalankan setelah seluruh HTML selesai dibaca browser.
// Masing-masing fungsi berhenti sendiri jika halamannya bukan halaman yang dimaksud.
document.addEventListener("DOMContentLoaded", function () {
  mulaiKatalog();
  mulaiDetail();
});
