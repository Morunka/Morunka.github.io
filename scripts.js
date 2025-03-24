// Прелоадер
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    preloader.classList.add('hidden');
    body.classList.add('loaded');
});

// Логика кнопки "О студии"
const aboutBtn = document.getElementById('about-btn');
const description = document.getElementById('description');
const body = document.body;

aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('active');
    aboutBtn.classList.toggle('active');
    if (description.style.display === 'block') {
        description.style.opacity = '0';
        setTimeout(() => { description.style.display = 'none'; }, 1000);
    } else {
        description.style.display = 'block';
        setTimeout(() => { description.style.opacity = '1'; }, 10);
    }
});
