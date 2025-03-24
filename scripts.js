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
const linksBtn = document.getElementById('links-btn');
const links = document.getElementById('links');
const telegramBtn = document.getElementById('telegram-btn');
const linksRow = document.querySelector('.links-row');
const body = document.body;

aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (body.classList.contains('links-active')) {
        body.classList.remove('links-active');
        linksBtn.classList.remove('active');
        linksRow.classList.remove('telegram-active');
        telegramBtn.classList.remove('back');
        links.classList.add('hide');
    }
    body.classList.toggle('active');
    aboutBtn.classList.toggle('active');
    if (!body.classList.contains('active')) {
        description.classList.add('hide');
    }
});

// Логика кнопки "Связи"
linksBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (body.classList.contains('active')) {
        body.classList.remove('active');
        aboutBtn.classList.remove('active');
        description.classList.add('hide');
    }
    body.classList.toggle('links-active');
    linksBtn.classList.toggle('active');
    if (!body.classList.contains('links-active')) {
        linksRow.classList.remove('telegram-active');
        telegramBtn.classList.remove('back');
        links.classList.add('hide');
    }
});

// Логика кнопки Telegram
telegramBtn.addEventListener('click', (e) => {
    e.preventDefault();
    linksRow.classList.toggle('telegram-active');
    telegramBtn.classList.toggle('back');
});

// Добавляем обработчики для проверки кликабельности иконок
const youtubeBtn = document.querySelector('.youtube');
const kogamaBtn = document.querySelector('.kogama');

youtubeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!linksRow.classList.contains('telegram-active')) {
        window.location.href = youtubeBtn.getAttribute('href');
    }
});

kogamaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!linksRow.classList.contains('telegram-active')) {
        window.location.href = kogamaBtn.getAttribute('href');
    }
});
