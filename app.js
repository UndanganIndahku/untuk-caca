/* ==========================================================================
   LOGIKA INTERAKTIF WEBSITE ULANG TAHUN CACA
   ========================================================================== */

let isCandleLit = true;
let isMusicPlaying = false;

// INISIALISASI SAAT HALAMAN DIMUAT
window.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    startCountdown();
    loadLetterContent();
});

// HANDLER LOGIN
function handleLogin(event) {
    event.preventDefault();
    const userIn = document.getElementById('username').value.trim();
    const passIn = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error-message');

    if (userIn.toLowerCase() === appData.username && passIn === appData.password) {
        // Login Berhasil
        document.getElementById('login-section').classList.add('hidden');
        const mainContent = document.getElementById('main-content');
        mainContent.classList.remove('hidden');
        
        // Trigger Confetti Awal Login
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Auto play musik latar
        toggleMusic(true);
    } else {
        errorMsg.classList.remove('hidden');
    }
}

// KONTROL PEMUTAR MUSIK
function toggleMusic(forcePlay = false) {
    const music = document.getElementById('bg-music');
    const musicText = document.getElementById('music-text');
    const musicIcon = document.getElementById('music-icon');

    if (!isMusicPlaying || forcePlay) {
        music.play().then(() => {
            isMusicPlaying = true;
            musicText.innerText = "Hentikan Musik";
            musicIcon.classList.add('animate-spin');
        }).catch(e => {
            console.log("Autoplay diblokir oleh browser atau file audio tidak ditemukan:", e);
        });
    } else {
        music.pause();
        isMusicPlaying = false;
        musicText.innerText = "Putar Musik";
        musicIcon.classList.remove('animate-spin');
    }
}

// TIUP / PADAMKAN LILIN KUE ULANG TAHUN
function extinguishCandle() {
    if (!isCandleLit) return;

    const flame = document.getElementById('flame');
    const smoke = document.getElementById('smoke');
    const blowBtnText = document.getElementById('blow-btn-text');
    const wishMsg = document.getElementById('wish-message');

    // Matikan Api & Munculkan Efek Asap
    flame.style.display = 'none';
    smoke.classList.add('smoke-active');
    isCandleLit = false;

    blowBtnText.innerText = "Lilin Telah Dipadamkan ✨";
    wishMsg.classList.remove('hidden');

    // Efek Confetti Meriah saat Lilin Padam
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// RENDER GALERI POLAROID DARI DATA.JS
function renderGallery() {
    const gallery = document.getElementById('polaroid-gallery');
    if (!gallery) return;

    gallery.innerHTML = appData.photos.map((item) => `
        <div class="journal-paper tape-effect p-3.5 rounded-2xl polaroid-card cursor-pointer" onclick="triggerPhotoConfetti()">
            <div class="overflow-hidden rounded-xl bg-stone-100 aspect-square">
                <img src="${item.url}" alt="${item.caption}" class="w-full h-full object-cover hover:scale-110 transition duration-500" onerror="this.src='https://placehold.co/400x400/f87171/ffffff?text=Caca'">
            </div>
            <p class="font-handwriting text-xl text-stone-700 mt-3 font-semibold">${item.caption}</p>
        </div>
    `).join('');
}

function triggerPhotoConfetti() {
    confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 }
    });
}

// BUKA KOTAK HADIAH
function openGift() {
    const giftIcon = document.getElementById('gift-icon');
    const giftMsg = document.getElementById('gift-message');
    
    giftIcon.innerHTML = `<i class="fa-solid fa-box-open text-rose-500 text-5xl animate-pulse"></i>`;
    
    const randomMsg = appData.giftMessages[Math.floor(Math.random() * appData.giftMessages.length)];
    
    giftMsg.innerHTML = `
        <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold leading-relaxed animate-bounce">
            ${randomMsg}
        </div>
    `;

    confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 }
    });
}

// HITUNG MUNDUR (COUNTDOWN TIMER)
function startCountdown() {
    const target = new Date(appData.targetDate).getTime();

    function update() {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            document.getElementById('cd-days').innerText = "00";
            document.getElementById('cd-hours').innerText = "00";
            document.getElementById('cd-minutes').innerText = "00";
            document.getElementById('cd-seconds').innerText = "00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cd-days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('cd-hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('cd-minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('cd-seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    update();
    setInterval(update, 1000);
}

// MEMUAT ISI SURAT KE DALAM MODAL
function loadLetterContent() {
    document.getElementById('letter-title').innerText = appData.letter.title;
    document.getElementById('letter-body').innerText = appData.letter.body;
    document.getElementById('letter-sender').innerText = appData.letter.sender;
}

// MODAL SURAT JURNAL
function openJournalModal() {
    const modal = document.getElementById('journal-modal');
    const inner = modal.querySelector('div');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        inner.classList.remove('scale-95');
        inner.classList.add('scale-100');
    }, 10);
}

function closeJournalModal() {
    const modal = document.getElementById('journal-modal');
    const inner = modal.querySelector('div');
    modal.classList.add('opacity-0');
    inner.classList.remove('scale-100');
    inner.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// KIRIM PESAN VIA WHATSAPP
function sendWhatsAppMessage(e) {
    e.preventDefault();
    const text = document.getElementById('reply-text').value;
    const phone = appData.whatsappNumber;
    const encodedText = encodeURIComponent(`Halo! Ini balasan dari Caca:\n\n"${text}"`);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
}