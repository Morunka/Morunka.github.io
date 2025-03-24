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
    const descriptionHeight = descriptionContainer.offsetHeight;
    const linksHeight = linksContainer.offsetHeight;

    // Позиция заголовка в неактивном состоянии (чуть выше центра)
    const headerDefaultTop = windowHeight * 0.4 - headerHeight / 2;

    // Позиция заголовка в активном состоянии (10% от верха или 5% на мобильных)
    const headerActiveTop = window.innerWidth <= 768 ? windowHeight * 0.05 : windowHeight * 0.1;

    // Доступное пространство между нижней границей заголовка (в активном состоянии) и футером
    const availableSpace = windowHeight - headerActiveTop - headerHeight - footerHeight;

    // Позиция контента: учитываем высоту текущего активного контейнера
    let contentHeight = 0;
    if (body.classList.contains('active')) {
        contentHeight = descriptionHeight;
    } else if (body.classList.contains('links-active')) {
        contentHeight = linksHeight;
    }

    // Позиция контента: середина доступного пространства с учетом высоты контента
    const contentTop = headerActiveTop + headerHeight + (availableSpace - contentHeight) / 2;

    // Устанавливаем позиции
    if (!body.classList.contains('active') && !body.classList.contains('links-active')) {
        headerContainer.style.top = `${headerDefaultTop}px`;
    } else {
        headerContainer.style.top = `${headerActiveTop}px`;
    }
    descriptionContainer.style.top = `${contentTop}px`;
    linksContainer.style.top = `${contentTop}px`;
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
        linksBtn.classList.remove('active');
        links.classList.add('hide');
    }
    body.classList.toggle('active');
    aboutBtn.classList.toggle('active');
    if (!body.classList.contains('active')) {
        description.classList.add('hide');
    }
    adjustContentPosition();
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
    adjustContentPosition();
});
