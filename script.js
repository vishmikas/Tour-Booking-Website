window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash');
        const main = document.getElementById('main-content');
        const nav = document.getElementById('navbar');

        if(splash) {
            splash.style.transition = "1s ease";
            splash.style.opacity = "0";
            setTimeout(() => {
                splash.style.display = "none";
                main.classList.remove('hidden');
                nav.classList.remove('hidden');
                main.classList.add('fade-in');
            }, 1000);
        }
    }, 2000);
});

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

const countUp = () => {
    const counters = document.querySelectorAll('.stat-number');
    const animationDuration = 3000;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / (animationDuration / 16);

        const updateCount = () => {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 16);
            } else {
                counter.innerText = target + (target === 100 ? "%" : "+");
            }
        };

        updateCount();
    });
};


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });


observer.observe(document.querySelector('.about-stats'));
(function() {
    emailjs.init("6gcvUPLj0lYV2TCJS");
})();

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        cust_name: document.getElementById('cust_name').value,
        cust_phone: document.getElementById('cust_phone').value,
        cust_email: document.getElementById('cust_email').value,
        service_type: document.getElementById('service_type').value,
        tour_date: document.getElementById('tour_date').value,
        tour_details: document.getElementById('tour_details').value
    };

    const myPhone = "94713598786"; 
    const waMsg = `*New Booking Request*%0A` +
                  `------------------%0A` +
                  `*Name:* ${formData.cust_name}%0A` +
                  `*Service:* ${formData.service_type}%0A` +
                  `*Date:* ${formData.tour_date}%0A` +
                  `*Details:* ${formData.tour_details}`;
    
    const waURL = `https://wa.me/${myPhone}?text=${waMsg}`;


    emailjs.send("service_iwmzjhn", "template_x04cvln", formData)
        .then(() => console.log("Agency Email Sent"))
        .catch(err => {
            console.error("Agency Email Fail:", err);
            alert("Failed to send agency email. Please try again.");
        });

    emailjs.send("service_iwmzjhn", "template_nxqdbro", formData)
        .then(() => console.log("Customer Email Sent"))
        .catch(err => {
            console.error("Customer Email Fail:", err);
            alert("Failed to send confirmation email. Please try again.");
        });

    alert("Success! Your booking request has been sent via email. Opening WhatsApp for instant confirmation.");
    window.open(waURL, '_blank');
});

window.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('gallery-track');
    const items = Array.from(track.children);
    
    track.innerHTML = '';

    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    items.forEach(item => track.appendChild(item.cloneNode(true)));
    
    items.forEach(item => track.appendChild(item.cloneNode(true)));
});

const reviewForm = document.getElementById('review-form');
const reviewWall = document.getElementById('review-wall');

window.addEventListener('DOMContentLoaded', () => {
    const savedReviews = JSON.parse(localStorage.getItem('misty_reviews')) || [];
    savedReviews.forEach(rev => addReviewToWall(rev));
    updateAverage();
});

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (!selectedRating) {
        alert('Please select a rating.');
        return;
    }

    const newReview = {
        name: document.getElementById('rev_name').value,
        rating: selectedRating.value,
        comment: document.getElementById('rev_comment').value,
        date: new Date().toLocaleDateString()
    };

    addReviewToWall(newReview);


    saveReview(newReview);

 
    updateAverage();


    reviewForm.reset();


    document.querySelectorAll('.star-rating input').forEach(input => input.checked = false);
});

function addReviewToWall(rev) {
    const starString = "★".repeat(rev.rating) + "☆".repeat(5 - rev.rating);
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
        <div class="avatar">${rev.name.charAt(0).toUpperCase()}</div>
        <h4>${rev.name}</h4>
        <div class="stars">${starString}</div>
        <p>"${rev.comment}"</p>
        <small>${rev.date}</small>
    `;
    reviewWall.prepend(card);
}

function saveReview(rev) {
    let reviews = JSON.parse(localStorage.getItem('misty_reviews')) || [];
    reviews.push(rev);
    localStorage.setItem('misty_reviews', JSON.stringify(reviews));
}

function updateAverage() {
    const reviews = JSON.parse(localStorage.getItem('misty_reviews')) || [];
    const count = reviews.length;
    document.getElementById('review-count').innerText = count;

    if (count === 0) {
        document.getElementById('avg-rating').innerText = '0.0';
        return;
    }

    const sum = reviews.reduce((s, r) => s + parseInt(r.rating), 0);
    const avg = sum / count;
    document.getElementById('avg-rating').innerText = avg.toFixed(1);
}