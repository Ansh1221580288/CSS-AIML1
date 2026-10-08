// Main Interactive Logic for Arzoo's Birthday Surprise

document.addEventListener('DOMContentLoaded', () => {
    // Safely run all initializations
    safeRun(initAudioControls, "Audio Controls");
    safeRun(initTabNavigation, "Tab Navigation");
    safeRun(initCanvasParticles, "Canvas Particles");
    safeRun(initGiftUnwrap, "Gift Unwrap");
    safeRun(initCakeLogic, "Cake Logic");
    safeRun(initLetterLogic, "Letter Logic");
    safeRun(initWishBuilder, "Wish Builder");
    safeRun(initHeartCursor, "Heart Cursor");
    safeRun(initFortuneWheel, "Fortune Wheel Game");
    safeRun(initBalloonsGame, "Pop Balloons Game");
    safeRun(initCatchHeartsGame, "Catch Hearts Game");
    safeRun(initComplimentGenerator, "Compliment Generator");
    safeRun(initLoveQuiz, "Reel Love Quiz");
});

function safeRun(fn, name) {
    try {
        fn();
    } catch (err) {
        console.warn(`[Surprise Website] ${name} notice:`, err);
    }
}

// 1. Audio Controls
function initAudioControls() {
    const musicBtn = document.getElementById('music-toggle');
    const songPlayBtn = document.getElementById('play-song-btn');
    const vinylDisc = document.getElementById('vinyl-disc');
    const audioEl = document.getElementById('ehsaan-song-audio');

    function toggleSong() {
        if (!audioEl) return;

        if (audioEl.paused) {
            audioEl.play().then(() => {
                if (musicBtn) {
                    musicBtn.classList.add('playing');
                    musicBtn.innerHTML = `<i class="fas fa-pause"></i> Pause Song 🎵`;
                }
                if (songPlayBtn) {
                    songPlayBtn.innerHTML = `<i class="fas fa-pause"></i> Pause Song 🎵`;
                }
                if (vinylDisc) vinylDisc.classList.add('playing');
            }).catch(e => console.log('Audio playback info:', e));
        } else {
            audioEl.pause();
            if (musicBtn) {
                musicBtn.classList.remove('playing');
                musicBtn.innerHTML = `<i class="fas fa-music"></i> Play Song 🎵`;
            }
            if (songPlayBtn) {
                songPlayBtn.innerHTML = `<i class="fas fa-play"></i> Play Song Track 🎵`;
            }
            if (vinylDisc) vinylDisc.classList.remove('playing');
        }
    }

    if (audioEl) {
        audioEl.addEventListener('play', () => {
            if (vinylDisc) vinylDisc.classList.add('playing');
            if (musicBtn) {
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = `<i class="fas fa-pause"></i> Pause Song 🎵`;
            }
        });

        audioEl.addEventListener('pause', () => {
            if (vinylDisc) vinylDisc.classList.remove('playing');
            if (musicBtn) {
                musicBtn.classList.remove('playing');
                musicBtn.innerHTML = `<i class="fas fa-music"></i> Play Song 🎵`;
            }
        });
    }

    if (musicBtn) musicBtn.addEventListener('click', toggleSong);
    if (songPlayBtn) songPlayBtn.addEventListener('click', toggleSong);
}

// 2. Navigation Tabs Handler
function initTabNavigation() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const headerOffset = 90;
                const elementPosition = targetEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 3. Canvas Background Engine
function initCanvasParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = 75;

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 0.5,
            color: Math.random() > 0.4 ? 'rgba(255, 75, 139, ' : 'rgba(255, 202, 40, ',
            alpha: Math.random(),
            speedY: - (Math.random() * 0.5 + 0.2),
            speedX: Math.random() * 0.4 - 0.2,
            type: Math.random() > 0.7 ? 'heart' : 'star'
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            if (p.y < -10) p.y = height + 10;
            if (p.x < 0 || p.x > width) p.speedX *= -1;

            ctx.beginPath();
            ctx.fillStyle = p.color + p.alpha + ')';
            if (p.type === 'heart') {
                drawHeart(ctx, p.x, p.y, p.radius * 3);
            } else {
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        requestAnimationFrame(draw);
    }

    function drawHeart(ctx, x, y, size) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
        ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
    }

    draw();
}

// 4. Gift Unwrap
function initGiftUnwrap() {
    const giftWrapper = document.getElementById('gift-wrapper');
    if (giftWrapper) {
        giftWrapper.addEventListener('click', () => {
            audio.playSparkle();
            triggerConfetti();
            document.getElementById('cake-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// 5. Confetti Cannon
function triggerConfetti() {
    audio.playFanfare();
    const count = 150;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        if (window.confetti) {
            window.confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }
    }

    if (window.confetti) {
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }
}

// 6. Cake Logic
function initCakeLogic() {
    const candles = document.querySelectorAll('.candle');
    const blowBtn = document.getElementById('blow-candles-btn');
    const wishBanner = document.getElementById('wish-banner');

    function blowCandle(candle) {
        if (!candle.classList.contains('blown')) {
            candle.classList.add('blown');
            audio.playBlow();
            checkAllBlown();
        }
    }

    candles.forEach(candle => {
        candle.addEventListener('click', () => blowCandle(candle));
    });

    if (blowBtn) {
        blowBtn.addEventListener('click', () => {
            candles.forEach(c => blowCandle(c));
        });
    }

    function checkAllBlown() {
        const allBlown = Array.from(candles).every(c => c.classList.contains('blown'));
        if (allBlown && wishBanner) {
            wishBanner.style.display = 'block';
            triggerConfetti();
        }
    }
}

// 7. Letter Logic
function initLetterLogic() {
    const seal = document.getElementById('envelope-seal');
    const letterBox = document.getElementById('letter-content');
    let hasTyped = false;

    const messageText = `Dearest Arzoo, ✨

On this super special day, I wanted to create something as magical, bright, and unforgettable as you are. 💖

Your smile has a way of lighting up every room, and your presence brings so much warmth and happiness to everyone around you. 

May your birthday be filled with endless laughter, sweet surprises, love, and every single dream of your heart coming true! 🌟

Happy Birthday, Arzoo! You are truly one in a million. 🎉🎂✨`;

    if (seal && letterBox) {
        seal.addEventListener('click', () => {
            audio.playSparkle();
            seal.style.transform = 'scale(0) rotate(180deg)';
            setTimeout(() => {
                seal.style.display = 'none';
                letterBox.style.display = 'block';
                if (!hasTyped) {
                    hasTyped = true;
                    typeText(letterBox, messageText);
                }
            }, 300);
        });
    }
}

function typeText(container, text) {
    container.innerHTML = '';
    let i = 0;
    const speed = 35;

    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            container.innerHTML += char === '\n' ? '<br>' : char;
            if (i % 3 === 0) audio.playTypewriter();
            i++;
            setTimeout(type, speed);
        } else {
            container.innerHTML += '<span class="typing-cursor"></span>';
        }
    }
    type();
}

// 8. Heart Cursor Sparkle Trail
function initHeartCursor() {
    window.addEventListener('click', (e) => {
        audio.playSparkle();
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.className = 'cursor-heart-particle';
            const icons = ['💖', '✨', '🌸', '💘', '💝', '👑'];
            heart.innerText = icons[Math.floor(Math.random() * icons.length)];
            heart.style.left = (e.clientX + (Math.random() * 30 - 15)) + 'px';
            heart.style.top = (e.clientY + (Math.random() * 30 - 15)) + 'px';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 1200);
        }
    });
}

// 9. Fortune Wheel Game
function initFortuneWheel() {
    const canvas = document.getElementById('wheel-canvas');
    const spinBtn = document.getElementById('spin-wheel-btn');
    const resultBox = document.getElementById('wheel-result');
    if (!canvas || !spinBtn) return;

    const ctx = canvas.getContext('2d');
    const segments = [
        '💖 Special Warm Hug',
        '🍫 Infinite Chocolates',
        '☕ Coffee & Cute Chat',
        '👑 Royalty Treatment',
        '🎶 Dedicated Song',
        '✨ All Dreams Granted'
    ];
    const colors = ['#ff4b8b', '#9d4edd', '#ffca28', '#ec407a', '#7209b7', '#4cc9f0'];
    const numSegments = segments.length;
    const arc = Math.PI * 2 / numSegments;
    let currentRotation = 0;
    let isSpinning = false;

    function drawWheel() {
        ctx.clearRect(0, 0, 300, 300);
        const radius = 145;
        const centerX = 150;
        const centerY = 150;

        for (let i = 0; i < numSegments; i++) {
            const angle = i * arc;
            ctx.beginPath();
            ctx.fillStyle = colors[i];
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + arc);
            ctx.lineTo(centerX, centerY);
            ctx.fill();

            // Text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle + arc / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Outfit, sans-serif';
            ctx.fillText(segments[i], radius - 12, 4);
            ctx.restore();
        }
    }

    drawWheel();

    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        if (resultBox) resultBox.style.display = 'none';

        const extraRounds = 5 + Math.floor(Math.random() * 5);
        const winningIndex = Math.floor(Math.random() * numSegments);
        const stopAngle = (numSegments - winningIndex) * (360 / numSegments) - (360 / (numSegments * 2));
        const totalDegrees = extraRounds * 360 + stopAngle;

        currentRotation += totalDegrees;
        canvas.style.transform = `rotate(${currentRotation}deg)`;

        let tickCount = 0;
        const tickInterval = setInterval(() => {
            audio.playWheelTick();
            tickCount++;
            if (tickCount > 25) clearInterval(tickInterval);
        }, 120);

        setTimeout(() => {
            isSpinning = false;
            clearInterval(tickInterval);
            triggerConfetti();
            audio.playChime();
            if (resultBox) {
                resultBox.style.display = 'block';
                resultBox.innerHTML = `🎉 You Won: <strong>${segments[winningIndex]}</strong>! ✨💖`;
            }
        }, 4000);
    });
}

// 10. Pop Balloons Game
function initBalloonsGame() {
    const area = document.getElementById('balloons-area');
    const scoreEl = document.getElementById('balloon-score');
    if (!area) return;

    let score = 0;
    const target = 8;
    const colors = ['#ff4b8b', '#9d4edd', '#ffca28', '#4cc9f0', '#f72585', '#7209b7'];

    function spawnBalloon() {
        if (score >= target) return;

        const b = document.createElement('div');
        b.className = 'floating-balloon';
        const color = colors[Math.floor(Math.random() * colors.length)];
        b.style.backgroundColor = color;
        b.style.left = Math.random() * 80 + 10 + '%';
        b.style.animationDuration = (Math.random() * 4 + 5) + 's';
        b.innerText = '🎈';

        b.addEventListener('click', () => {
            audio.playPop();
            b.remove();
            score++;
            if (scoreEl) scoreEl.innerText = `${score} / ${target}`;
            if (score === target) {
                triggerConfetti();
                area.innerHTML = `
                    <div style="text-align: center; color: var(--accent-gold); padding: 50px 20px; animation: popIn 0.5s ease;">
                        <h3 style="font-size: 2rem;">👑 You Unlocked Your Birthday Crown! 👑</h3>
                        <p style="font-size: 1.2rem; color: #fff; margin-top: 8px;">You are officially the Queen of the Day! ✨</p>
                    </div>
                `;
            }
        });

        area.appendChild(b);

        b.addEventListener('animationend', () => {
            if (b.parentNode) {
                b.remove();
                spawnBalloon();
            }
        });
    }

    for (let i = 0; i < 5; i++) {
        setTimeout(spawnBalloon, i * 1000);
    }
}

// 11. Catch Falling Hearts Game
function initCatchHeartsGame() {
    const area = document.getElementById('catch-hearts-area');
    const scoreEl = document.getElementById('catch-score');
    if (!area) return;

    let score = 0;
    const targetScore = 10;
    let spawnTimer = null;

    function spawnHeart() {
        if (score >= targetScore) return;

        const h = document.createElement('div');
        h.className = 'falling-heart-item';
        const heartTypes = ['💖', '💗', '💘', '💝', '✨', '🌹'];
        h.innerText = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        h.style.left = Math.random() * 85 + 5 + '%';
        h.style.animationDuration = (Math.random() * 2 + 2.5) + 's';

        h.addEventListener('click', () => {
            audio.playChime();
            h.remove();
            score++;
            if (scoreEl) scoreEl.innerText = `${score} / ${targetScore}`;

            if (score === targetScore) {
                triggerConfetti();
                area.innerHTML = `
                    <div style="text-align: center; color: var(--accent-gold); padding: 60px 20px; animation: popIn 0.5s ease;">
                        <h3 style="font-size: 2rem;">💖 100% Love & Smiles Collected! 💖</h3>
                        <p style="font-size: 1.2rem; color: #fff; margin-top: 10px;">You have captured all the happiness in the universe today! ✨</p>
                    </div>
                `;
                clearInterval(spawnTimer);
            }
        });

        area.appendChild(h);

        h.addEventListener('animationend', () => {
            if (h.parentNode) h.remove();
        });
    }

    spawnTimer = setInterval(spawnHeart, 900);
}

// 12. Compliment Generator
function initComplimentGenerator() {
    const btn = document.getElementById('new-compliment-btn');
    const textEl = document.getElementById('compliment-text');
    if (!btn || !textEl) return;

    const compliments = [
        "Your laugh is literally the sweetest melody in the room! 🎶",
        "The world is 100x brighter and kinder because you are in it. ✨",
        "Your elegance, grace, and smile are truly unmatched! 🌸",
        "You possess a magical vibe that makes everyone feel loved and special. 💖",
        "Everything about you is breathtakingly wonderful! 👑",
        "If happiness had a face, it would definitely be your warm smile! 😊"
    ];

    btn.addEventListener('click', () => {
        audio.playSparkle();
        const rand = compliments[Math.floor(Math.random() * compliments.length)];
        textEl.style.opacity = 0;
        setTimeout(() => {
            textEl.innerText = rand;
            textEl.style.opacity = 1;
        }, 200);
    });
}

// 13. Instagram Reel Story Style Quiz (Questions 1 to 4)
function initLoveQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const questions = [
        {
            q: "1. Aapko sunne mein kis era ke songs sabse pyaare lagte hain?",
            opts: ["Pop / Trending 🎧", "80s Era Retro Songs 🎶", "Rock / Metal 🎸", "Hip Hop 🎤"],
            ans: 1,
            feedback: "Bilkul sahi! 80s ke songs ki baat hi alag hoti hai, ekdum magical aur sukoon bhari! ✨"
        },
        {
            q: "2. Aapki zindagi mein sabse khoobsurat aur favorite insaan kaun hain?",
            opts: ["Aapki Pyari Mom 👩‍👧💖", "Main (Me) 🙈", "Koi Celebrity ✨", "Pata Nahi 🤫"],
            ans: 0,
            feedback: "Aww, Mom sabse special hoti hain! Unka pyaar hi sabse bada hota hai. 🥰"
        },
        {
            q: "3. Mera birthday kab hota hai, kya aapko yaad hai?",
            opts: ["19th December 🎂", "10th August 🎈", "15th January 🎉", "25th November 🎁"],
            ans: 0,
            feedback: "Sahi pakde! 19th December ko yaad rakhne ke liye thank you! 🎂✨"
        },
        {
            q: "4. Kya aapke dil mein mere liye bhi thodi si jagah hai?",
            opts: ["Haan, aap mere liye bohot special ho 💖", "Ek bohot achhe dost ki tarah 🌸", "Aap guess karke batao 🙈"],
            ans: 0,
            isSpecial: true,
            feedback: "Aapka har jawab mere liye bohot khaas aur Anmol hai! 💖✨"
        }
    ];

    let qIdx = 0;

    function renderQuestion() {
        if (qIdx >= questions.length) {
            triggerConfetti();
            container.innerHTML = `
                <div style="text-align: center; color: var(--accent-gold); padding: 25px;">
                    <h3 style="font-size: 2.2rem;">🏆 Reel Story Completed! 👑</h3>
                    <p style="color: #fff; font-size: 1.2rem; margin-top: 12px;">Aapne saare sawalon ke bohot pyaare aur khoobsurat jawabe diye! Happy Birthday Arzoo! 💖✨</p>
                </div>
            `;
            return;
        }

        const item = questions[qIdx];
        let optsHtml = item.opts.map((opt, i) => `<button class="quiz-opt-btn" data-idx="${i}">${opt}</button>`).join('');

        container.innerHTML = `
            <div class="quiz-question">${item.q}</div>
            <div class="quiz-options">${optsHtml}</div>
            <div class="quiz-feedback" id="quiz-feedback" style="display:none;"></div>
        `;

        const optBtns = container.querySelectorAll('.quiz-opt-btn');
        const feedbackEl = container.querySelector('#quiz-feedback');

        optBtns.forEach(b => {
            b.addEventListener('click', () => {
                const selectedIdx = parseInt(b.getAttribute('data-idx'));

                if (item.isSpecial || selectedIdx === item.ans) {
                    audio.playChime();
                    triggerConfetti();
                    b.classList.add('correct');
                } else {
                    audio.playPop();
                    b.classList.add('wrong');
                    optBtns[item.ans].classList.add('correct');
                }

                feedbackEl.style.display = 'block';
                feedbackEl.innerText = item.feedback;

                optBtns.forEach(btn => btn.disabled = true);

                setTimeout(() => {
                    qIdx++;
                    renderQuestion();
                }, 2200);
            });
        });
    }

    renderQuestion();
}

// 14. Custom Wish Builder
function initWishBuilder() {
    const inputName = document.getElementById('input-name');
    const inputMsg = document.getElementById('input-msg');
    const previewName = document.getElementById('preview-name');
    const previewMsg = document.getElementById('preview-msg');

    if (inputName && previewName) {
        inputName.addEventListener('input', (e) => {
            previewName.innerText = e.target.value || 'Arzoo';
        });
    }

    if (inputMsg && previewMsg) {
        inputMsg.addEventListener('input', (e) => {
            previewMsg.innerText = e.target.value || 'Wishing you a day full of joy, magic, and sweet memories!';
        });
    }
}
