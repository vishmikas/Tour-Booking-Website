
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

class ReviewManager {
    constructor() {
        this.storageKey = 'mistymount_reviews';
        this.initializeDefaultReviews();
    }

    initializeDefaultReviews() {
        const existingReviews = this.getReviews();
        if (existingReviews.length === 0) {
            const defaultReviews = [
                {
                    id: 1,
                    name: "Alex M.",
                    country: "United Kingdom",
                    rating: 5,
                    text: "The station pickup was a lifesaver! The driver was waiting for us at Nanu Oya with a sign. The van was clean and the drive to our hotel was smooth.",
                    date: new Date('2025-01-15').toISOString()
                },
                {
                    id: 2,
                    name: "Priya S.",
                    country: "India",
                    rating: 5,
                    text: "We booked the Horton Plains safari. The driver picked us up at 5am sharp. He knew exactly where to stop for the best photos. Highly recommended!",
                    date: new Date('2025-01-20').toISOString()
                },
                {
                    id: 3,
                    name: "James K.",
                    country: "Australia",
                    rating: 5,
                    text: "Excellent tea tour experience! The guide was very knowledgeable about the tea-making process. The factory visit and tasting session were highlights of our trip.",
                    date: new Date('2025-01-22').toISOString()
                },
                {
                    id: 4,
                    name: "Maria L.",
                    country: "Spain",
                    rating: 4,
                    text: "Great service overall. The driver was punctual and friendly. The vehicle was comfortable. Would definitely use their services again!",
                    date: new Date('2025-01-25').toISOString()
                }
            ];
            this.saveReviews(defaultReviews);
        }
    }

    getReviews() {
        try {
            const reviews = localStorage.getItem(this.storageKey);
            return reviews ? JSON.parse(reviews) : [];
        } catch (error) {
            console.error('Error getting reviews:', error);
            return [];
        }
    }

    saveReviews(reviews) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(reviews));
            return true;
        } catch (error) {
            console.error('Error saving reviews:', error);
            return false;
        }
    }

    addReview(name, country, rating, text) {
        const reviews = this.getReviews();
        const newReview = {
            id: Date.now(),
            name: name,
            country: country || "Anonymous",
            rating: parseInt(rating),
            text: text,
            date: new Date().toISOString()
        };
        
        reviews.unshift(newReview);
        
        this.saveReviews(reviews);
        return newReview;
    }

    getReviewsSorted() {
        const reviews = this.getReviews();
        return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    getAverageRating() {
        const reviews = this.getReviews();
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    }

    getTotalCount() {
        return this.getReviews().length;
    }
}

const reviewManager = new ReviewManager();

let currentSlide = 0;
let slides = [];

function loadReviews() {
    const reviews = reviewManager.getReviewsSorted();
    const carouselContainer = document.querySelector('.testimonial-carousel');
    
    if (!carouselContainer) return;

    carouselContainer.innerHTML = '';

    if (reviews.length === 0) {
        carouselContainer.innerHTML = `
            <div class="testimonial-slide active">
                <div class="stars">★★★★★</div>
                <p class="review-text">"Be the first to share your experience with Misty Mount Travels!"</p>
                <div class="reviewer">
                    <div class="avatar">?</div>
                    <div>
                        <strong>Your Name Here</strong><br>
                        <small>Your Country</small>
                    </div>
                </div>
            </div>
        `;
    } else {
        reviews.forEach((review, index) => {
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            const initial = review.name.charAt(0).toUpperCase();
            
            const slideHTML = `
                <div class="testimonial-slide ${index === 0 ? 'active' : ''}">
                    <div class="stars">${stars}</div>
                    <p class="review-text">"${review.text}"</p>
                    <div class="reviewer">
                        <div class="avatar">${initial}</div>
                        <div>
                            <strong>${review.name}</strong><br>
                            <small>${review.country}</small>
                        </div>
                    </div>
                </div>
            `;
            carouselContainer.insertAdjacentHTML('beforeend', slideHTML);
        });
    }

    slides = document.querySelectorAll('.testimonial-slide');
    currentSlide = 0;
}

function moveSlide(direction) {
    if(slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
}

let autoRotate = setInterval(() => {
    moveSlide(1);
}, 6000);

function manualSlide(direction) {
    clearInterval(autoRotate);
    moveSlide(direction);
    autoRotate = setInterval(() => moveSlide(1), 6000);
}

function submitReview(e) {
    e.preventDefault();
    
    const form = document.getElementById('reviewForm');
    const rating = form.querySelector('input[name="rating"]:checked');
    const name = form.querySelector('#reviewName').value;
    const country = form.querySelector('#reviewCountry').value;
    const reviewText = form.querySelector('#reviewText').value;

    if (!rating) {
        alert("Please select a rating!");
        return;
    }

    if (name.trim() === '' || reviewText.trim() === '') {
        alert("Please fill in your name and review!");
        return;
    }

    const newReview = reviewManager.addReview(
        name.trim(),
        country.trim() || "Traveler",
        rating.value,
        reviewText.trim()
    );

    alert("Thank you for your review! Your feedback has been published.");
    
    form.reset();

    loadReviews();

    const reviewsSection = document.querySelector('.reviews-section');
    if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
    
    const totalReviews = reviewManager.getTotalCount();
    const avgRating = reviewManager.getAverageRating();
    console.log(`Total Reviews: ${totalReviews}, Average Rating: ${avgRating}★`);
});