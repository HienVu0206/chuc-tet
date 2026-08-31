const bgMusic = document.getElementById('bg-music');

// Bước 1: Mở hộp quà
function openGift() {
    // Phát nhạc
    bgMusic.play().catch(e => console.log("Audio play failed, user interaction needed", e));
    
    // Ẩn màn 1, Hiện màn 2
    document.getElementById('screen-1').classList.remove('active');
    document.getElementById('screen-2').classList.add('active');
}

// Bước 2: Thổi nến & Pháo giấy
function blowCandles() {
    // Tắt nến
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => flame.classList.add('extinguished'));

    // Bắn pháo giấy (Sử dụng Canvas Confetti)
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4d6d', '#ffb3c6', '#ffb703']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4d6d', '#ffb3c6', '#ffb703']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // Sau 2 giây thì chuyển sang Màn 3
    setTimeout(() => {
        document.getElementById('screen-2').classList.remove('active');
        document.getElementById('screen-3').classList.add('active');
        
        // Bắt đầu gõ chữ lời chúc
        typeMessage();
        
        // Bắt đầu trình chiếu ảnh
        startCarousel();
    }, 2000);
}

// Logic Trình chiếu ảnh (Carousel)
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
let slideInterval;

const captions = [
    "Nụ cười làm tim anh xao xuyến rộn ràng... 💖",
    "Cùng nhau lưu giữ những khoảnh khắc đẹp nhất... 🥰",
    "Góc nghiêng thần thánh của cô gái anh yêu... ✨",
    "Công chúa nhỏ của anh luôn xinh đẹp rạng ngời... 👑",
    "Tuổi mới hãy luôn hạnh phúc và nắm tay anh thật chặt nhé! 🤝"
];

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
    document.getElementById('slide-caption').innerText = captions[currentSlide];
}

function nextSlide() {
    showSlide(currentSlide + 1);
    resetInterval();
}

function prevSlide() {
    showSlide(currentSlide - 1);
    resetInterval();
}

function startCarousel() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 3500); // Đổi ảnh mỗi 3.5 giây
}

function resetInterval() {
    clearInterval(slideInterval);
    startCarousel();
}

// Logic Hiệu ứng gõ chữ (Typewriter)
const text = "Chúc mừng sinh nhật Thảo thối của Hiển! 💖 Cảm ơn em vì đã luôn ở bên, thấu hiểu và yêu thương anh. Chúc cô gái của anh một tuổi mới thật nhiều niềm vui, luôn xinh đẹp, hạnh phúc và bớt 'thối' đi một chút nhé 😂. Dù thế nào thì anh vẫn luôn yêu em rất nhiều! Happy Birthday my love! 🎉🎂";
const typewriterElement = document.getElementById('typewriter');
let i = 0;

function typeMessage() {
    if (i < text.length) {
        typewriterElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeMessage, 60); // Tốc độ gõ 60ms/ký tự
    }
}
