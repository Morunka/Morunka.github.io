// Прелоадер
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    preloader.classList.add('hidden');
    body.classList.add('loaded');
    adjustContentPosition(); // Вызываем при загрузке
});

// Функция для автоматического расчета позиции
function adjustContentPosition() {
    const headerContainer = document.querySelector('.header-container');
    const descriptionContainer = document.querySelector('.description-container');
    const linksContainer = document.querySelector('.links-container');
    const footer = document.querySelector('.footer');

    // Получаем высоту окна и элементов
    const windowHeight = window.innerHeight;
    const headerHeight = headerContainer.offsetHeight;
    const footerHeight = footer.offsetHeight;

    // Вычисляем доступное пространство между заголовком и футером
    const availableSpace = windowHeight - headerHeight - footerHeight;

    // Позиция заголовка в активном состоянии (10% от верха или 5% на мобильных)
    const headerActiveTop = window.innerWidth <= 768 ? windowHeight * 0.05 : windowHeight * 0.1;

    // Позиция контента: середина оставшегося пространства
    const contentTop = headerActiveTop + headerHeight + (availableSpace - headerHeight - footerHeight) / 2;

    // Устанавливаем позицию для описания и ссылок
    descriptionContainer.style.top = `${contentTop}px`;
    linksContainer.style.top = `${contentTop}px`;

    // Начальная позиция заголовка
    headerContainer.style.top = `${(windowHeight - headerHeight) / 2}px`;
}

// Пересчитываем позицию при изменении размера окна
window.addEventListener('resize', adjustContentPosition);

// Логика кнопки "О студии"
const aboutBtn = document.getElementById('about-btn');
const description = document.getElementById('description');
const linksBtn = document.getElementById('links-btn');
const links = document.getElementById('links');
const body = document.body;

aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (body.classList.contains('links-active')) {
        body.classList.remove('links-active');
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
        links.classList.add('hide');
    }
});
