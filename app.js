let isGiftOpened = false;

window.onload = function() {
    initWebsite();
};

function initWebsite() {
    if (typeof BIRTHDAY_DATA === 'undefined') return;

    // Menyiapkan Musik
    const audioSource = document.getElementById('bg-music-source');
    const audio = document.getElementById('bg-music');
    if (audioSource && audio && BIRTHDAY_DATA.musicUrl) {
        audioSource.src = BIRTHDAY_DATA.musicUrl;
        audio.load();
    }

    // Menyiapkan Foto & Isi Jurnal
    document.getElementById('profile-img').src = BIRTHDAY_DATA.profileImage;
    document.getElementById('letter-title').innerText = BIRTHDAY_DATA.journalLetter.title;
    document.getElementById('letter-body').innerText = BIRTHDAY_DATA.journalLetter.body;
    document.getElementById('letter-sender').innerText = BIRTHDAY_DATA.journalLetter.sender;

    // Menyiapkan Galeri Polaroid
    const polaroidContainer = document.getElementById('polaroid-gallery');
    if (polaroidContainer) {
        polaroidContainer.innerHTML = '';
        BIRTHDAY_DATA.polaroids.forEach(item => {
            const card = document.createElement('div');
            card.className = `polaroid-card bg-white p-4 pb-6 rounded-sm shadow-xl transform ${item.rotate} hover:rotate-0 transition-all duration-300 hover:scale-105 hover:z-20 border border-stone-200`;
            card.innerHTML = `
                <div class="overflow-hidden aspect-square mb-3 bg-stone-100">
                    <img src="${item.image}" alt="Memory" class="w-full h-full object-cover">
                </div>
                <p class="font-handwriting text-center text-stone-700 text-xl">${item.caption}</p>
            `;
            polaroidContainer.appendChild(card);
        });
    }

    startCountdown();
}

function handleLogin(e) {
    if (e) e.preventDefault();

    const nameInput = document.getElementById('username').value.trim().toLowerCase();
    const passInput = document.getElementById('password').value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-message');

    if (nameInput === BIRTHDAY_DATA.targetName.toLowerCase() && passInput === BIRTHDAY_DATA.secretPassword.toLowerCase()) {
        if (errorMsg) errorMsg.classList.add('hidden');

        // Memutar musik saat tombol diklik
        const audio = document.getElementById('bg-music');
        if (audio) {
            audio.currentTime = 0;
            audio.play().then(() => {
                updateMusicUI(true);
            }).catch(err => {
                console.log("Autoplay terhalang: ", err);
                updateMusicUI(false);
            });
        }

        const loginSection = document.getElementById('login-section');
        const mainContent = document.getElementById('main-content');

        loginSection.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            loginSection.classList.add('hidden');
            mainContent.classList.remove('hidden');
            triggerHeartConfetti();
        }, 500);
    } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
    }
}

function startCountdown() {
    const targetTime = new Date(BIRTHDAY_DATA.targetDate).getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetTime - now;

        if (difference < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown-timer').innerHTML = "<span class='font-serif italic text-rose-600 text-lg'>🎉 Hari Bahagia Telah Tiba! 🎉</span>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('cd-days').innerText = String(days).padStart(2, '0');
        document.getElementById('cd-hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

function triggerHeartConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 80,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#fda4af', '#f43f5e', '#fecdd3']
        });
    }
}

function openGift() {
    if (isGiftOpened) return;
    isGiftOpened = true;
    
    const giftBox = document.getElementById('gift-icon');
    giftBox.classList.add('animate-bounce');
    
    setTimeout(() => {
        document.getElementById('gift-message').innerHTML = `
            <div class="bg-rose-100 border border-rose-300 text-rose-800 p-4 rounded-xl text-sm font-serif italic shadow-inner">
                🎁 "Kejutan terindah dalam hidup adalah kehadiran orang-orang baik seperti Caca. Semoga harimu menyenangkan!"
            </div>
        `;
        triggerHeartConfetti();
    }, 600);
}

function sendWhatsAppMessage(e) {
    if (e) e.preventDefault();
    const text = document.getElementById('reply-text').value.trim();
    if (!text) return;

    const encoded = encodeURIComponent(`Halo! Ini pesan balasan ulang tahun dari Caca:\n\n"${text}"`);
    window.open(`https://wa.me/${BIRTHDAY_DATA.whatsappNumber}?text=${encoded}`, '_blank');
}

function toggleMusic() {
    const audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play();
        updateMusicUI(true);
    } else {
        audio.pause();
        updateMusicUI(false);
    }
}

function updateMusicUI(isPlaying) {
    const btnText = document.getElementById('music-text');
    if (btnText) {
        btnText.innerText = isPlaying ? "Matikan Musik" : "Putar Musik";
    }
}

function openJournalModal() {
    const modal = document.getElementById('journal-modal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
}

function closeJournalModal() {
    const modal = document.getElementById('journal-modal');
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
}