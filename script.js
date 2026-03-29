// Set the start date for the timer: April 10, 2025 at 8:30 PM
const startDate = new Date("April 10, 2025 20:30:00").getTime();

function updateTimer() {
    const now = new Date().getTime();
    let difference = now - startDate;

    // If the date hasn't happened yet, it counts down. If it has, it counts up!
    const isFuture = difference < 0;
    difference = Math.abs(difference);

    // Time calculations
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update the DOM
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    const timerText = document.querySelector('.timer-text');
    if (isFuture) {
        timerText.innerText = "Counting down the moments until our special day.";
        document.querySelector('.timer-section .section-title').innerText = "Time Until April 10";
    } else {
        timerText.innerText = "Every second with you is a blessing.";
        document.querySelector('.timer-section .section-title').innerText = "Time We've Spent Together";
    }
}

// Update the timer every second
setInterval(updateTimer, 1000);
updateTimer(); // Initial call

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Media files array
const mediaFiles = [
    { type: 'video', src: 'imgs/ECFT0526.MP4' },
    { type: 'video', src: 'imgs/B165.mp4' },
    { type: 'image', src: 'imgs/IMG_9361.jpeg' },
    { type: 'image', src: 'imgs/IMG_9484.JPG' },
    { type: 'image', src: 'imgs/IMG_9485.JPG' },
    { type: 'image', src: 'imgs/IMG_9486.JPG' },
    { type: 'image', src: 'imgs/IMG_9488.JPG' },
    { type: 'image', src: 'imgs/IMG_9489.JPG' },
    { type: 'video', src: 'imgs/TQDV4911.MP4' }
];

const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const closeLightbox = document.querySelector('.close-lightbox');

// Populate gallery
mediaFiles.forEach((media) => {
    const item = document.createElement('div');
    item.className = 'gallery-item fade-in';

    if (media.type === 'image') {
        item.innerHTML = `<img src="${media.src}" alt="Our Memory" loading="lazy">`;
    } else {
        item.innerHTML = `
            <video muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()">
                <source src="${media.src}">
            </video>
            <div class="play-icon"><i class="fa-solid fa-play"></i></div>
        `;
    }

    // Add click event for lightbox
    item.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        // Add a small delay for the animation
        setTimeout(() => lightbox.classList.add('active'), 10);

        if (media.type === 'image') {
            lightboxContent.innerHTML = `<img src="${media.src}" alt="Our Memory">`;
        } else {
            lightboxContent.innerHTML = `
                <video controls autoplay>
                    <source src="${media.src}">
                </video>
            `;
        }
    });

    galleryGrid.appendChild(item);
    observer.observe(item); // Observe dynamically added elements
});

// Close lightbox
closeLightbox.addEventListener('click', closeLightboxHandler);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxHandler();
    }
});

function closeLightboxHandler() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxContent.innerHTML = ''; // Clear content to stop videos
    }, 300); // Wait for transition
}

// Floating hearts canvas effect
const canvas = document.getElementById('heart-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
}

resizeCanvas();

const heartsArray = [];

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 12 + 4; // Smaller sizes
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.color = `hsla(${Math.random() * 30 + 330}, 100%, 80%, ${Math.random() * 0.4 + 0.1})`; // Very soft pinks/whites, low opacity
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        // Horizontal drift
        this.x += Math.sin(this.y * 0.01) * 0.5;

        // Reset if it goes off screen (top or sides)
        if (this.y < 0 - this.size || this.x < 0 - this.size || this.x > canvas.width + this.size) {
            this.y = canvas.height + this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Draw a heart shape
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);

        // top left curve
        ctx.bezierCurveTo(
            this.x, this.y,
            this.x - this.size / 2, this.y,
            this.x - this.size / 2, this.y + topCurveHeight
        );

        // bottom left
        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
            this.x, this.y + (this.size + topCurveHeight) / 1.5,
            this.x, this.y + this.size
        );

        // bottom right
        ctx.bezierCurveTo(
            this.x, this.y + (this.size + topCurveHeight) / 1.5,
            this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2,
            this.x + this.size / 2, this.y + topCurveHeight
        );

        // top right curve
        ctx.bezierCurveTo(
            this.x + this.size / 2, this.y,
            this.x, this.y,
            this.x, this.y + topCurveHeight
        );

        ctx.closePath();
        ctx.fill();
    }
}

function initHearts() {
    // Number of hearts depends on screen width, max 60
    const heartCount = Math.min(Math.floor(window.innerWidth / 25), 60);
    for (let i = 0; i < heartCount; i++) {
        heartsArray.push(new Heart());
    }
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < heartsArray.length; i++) {
        heartsArray[i].update();
        heartsArray[i].draw();
    }
    requestAnimationFrame(animateHearts);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    // Re-distribute hearts
    heartsArray.forEach(heart => {
        if (heart.y > canvas.height) heart.y = canvas.height + Math.random() * 100;
        if (heart.x > canvas.width) heart.x = Math.random() * canvas.width;
    });
});

initHearts();
animateHearts();

// Entry Popup Logic
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add('locked');

    const submitBtn = document.getElementById('submit-answer');
    const dateInput = document.getElementById('date-answer');
    const errorMessage = document.getElementById('error-message');
    const popupContent = document.querySelector('.popup-content');
    const entryPopup = document.getElementById('entry-popup');

    if (!submitBtn || !dateInput || !errorMessage || !popupContent || !entryPopup) return;

    const checkAnswer = () => {
        const answer = dateInput.value.trim();
        if (answer === "18/02/2024" || answer === "18-02-2024" || answer === "18/2/2024") {
            // Correct answer
            entryPopup.style.opacity = '0';
            entryPopup.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                entryPopup.style.display = 'none';
                document.body.classList.remove('locked');
            }, 500);
        } else {
            // Incorrect answer
            popupContent.classList.remove('error-shake');
            void popupContent.offsetWidth; // Trigger reflow to restart animation
            popupContent.classList.add('error-shake');
            errorMessage.classList.add('show');
        }
    };

    submitBtn.addEventListener('click', checkAnswer);
    dateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});
