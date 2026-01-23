document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById('stationModal');
    const modalClose = document.getElementById('modalClose');

    if (modal) {
        const openModal = () => {
            modal.classList.add('active');
        };

        setTimeout(() => {
            openModal();
        }, 3000);

        if (modalClose) {
            modalClose.addEventListener('click', () => modal.classList.remove('active'));
        }
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .section-header, .trust-card, .map-frame, .wwd-item, .about-container');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});