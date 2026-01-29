function selectPackage(packageName, cardId) {
    
    const allCards = document.querySelectorAll('.pkg-card');
    allCards.forEach(card => card.classList.remove('selected'));

    const selectedCard = document.getElementById(cardId);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        
        document.querySelectorAll('.select-btn').forEach(btn => btn.innerText = "Select This");
        selectedCard.querySelector('.select-btn').innerText = "Selected ✓";
    }

    const serviceSelect = document.getElementById('serviceType');
    const displayBox = document.getElementById('displaySelection');

    serviceSelect.value = packageName;

    displayBox.innerHTML = `Selected: <br><span style="font-size:1.2rem">${packageName}</span>`;
    displayBox.style.background = "#fff8e1";
    displayBox.style.borderColor = "#ffd54f";

    if (window.innerWidth < 900) {
        document.querySelector('.booking-form-box').scrollIntoView({ behavior: 'smooth' });
    }
}

function handleBooking(e) {
    e.preventDefault();
    const service = document.getElementById('serviceType').value;
    alert(`Inquiry Sent for: ${service}. We will contact you shortly via WhatsApp!`);
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (type === 'station') {
        selectPackage('Station Transfer', 'pkg-station');
    } else if (type === 'sightseeing') {
        selectPackage('Tea Tour', 'pkg-tea');
    } else if (type === 'safari') {
        selectPackage('Highland Safari', 'pkg-safari');
    }
};