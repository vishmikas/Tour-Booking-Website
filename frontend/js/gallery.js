function filterGallery(category, btnElement) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            item.style.opacity = '0';
            setTimeout(() => item.style.opacity = '1', 50);
        } else {
            item.style.display = 'none';
        }
    });
}

let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');

function moveSlide(direction) {
    if(slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
}

setInterval(() => {
    moveSlide(1);
}, 6000);

function submitReview(e) {
    e.preventDefault();
    alert("Thank you! Your review has been submitted for moderation.");
    document.getElementById('reviewForm').reset();
}