/* ==========================================================================
   KONFIGURASI DATA WEBSITE ULANG TAHUN CACA
   ========================================================================== */

const appData = {
    // 1. KREDENSIAL LOGIN
    username: "caca",
    password: "cumi", 

    // 2. TANGGAL TARGET HITUNG MUNDUR ULANG TAHUN (Format: YYYY-MM-DDTHH:mm:ss)
    targetDate: "2026-11-04T00:00:00",

    // 3. NOMOR WHATSAPP TUJUAN (Awali dengan kode negara tanpa tanda '+', contoh: 628...)
    whatsappNumber: "6282384613484",

    // 4. GALERI FOTO POLAROID
    photos: [
        { 
            url: "aca1.jpeg", 
            caption: "Blonde ✨" 
        },
        { 
            url: "aca2.jpeg", 
            caption: "Senyum 🌸" 
        },
        { 
            url: "aca3.jpeg", 
            caption: "Jutek 🎉" 
        }
    ],

    // 5. KATA-KATA KEJUTAN (KOTAK HADIAH)
    giftMessages: [
        "✨ Selamat! Kamu mendapatkan pelukan hangat dan doa terbaik hari ini!",
        "🎁 Kejutan! Semoga semua keinginanmu di tahun ini dikabulkan!",
        "🌸 Hadiah terbaik adalah senyumanmu. Tetaplah bersinar!"
    ],

    // 6. ISI SURAT SPESIAL
    letter: {
        title: "Selamat Ulang Tahun Caca!",
        body: `Happy birthday, Aca! 🥳🎉

        Semoga di umur yang baru ini makin banyak hal baik yang datang ke Aca. Semoga apa yang Aca semogakan bisa satu-satu terwujud, dimudahkan dalam segala urusan, dan tentunya sehat selalu.

        Makasih juga udah jadi teman yang asik dan seru selama ini walaupun kita baru kenal ya hehe. Semoga kita tetap bisa temenan, ngobrol random, ketawa-ketawa, dan saling support terus ya.

        Pokoknya selamat ulang tahun, Aca! Semoga hari ini menyenangkan 😂`,
        sender: "~ Dari Toddlermu ✨"
    }
};