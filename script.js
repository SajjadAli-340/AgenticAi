// Count numbers up from 0 to their data-target value
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1500;
    const start = performance.now();

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// Reveal elements (and start counters) when they scroll into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        const counter = entry.target.querySelector(".counter");
        if (counter) animateCounter(counter);
        observer.unobserve(entry.target);
    });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.12}s`;
    observer.observe(el);
});
