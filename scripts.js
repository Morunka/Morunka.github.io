// Прелоадер
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    preloader.classList.add('hidden');
    body.classList.add('loaded');
});

// Загружаем данные о разрабатываемой игре
fetch('DevelopingGameProc.txt')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        const gameData = {};
        lines.forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                gameData[key.trim()] = value.trim().replace(/"/g, '');
            }
        });

        document.getElementById('game-name').textContent = gameData.GameName || 'Не указано';
        document.getElementById('game-dev-progress').textContent = `Прогресс: ${gameData['Game%Dev'] || '0%'}`;
        document.getElementById('game-version').textContent = `Версия: ${gameData.GameVersion || 'Не указана'}`;
    })
    .catch(error => {
        console.error('Ошибка загрузки данных:', error);
        document.getElementById('game-name').textContent = 'Ошибка загрузки';
        document.getElementById('game-dev-progress').textContent = 'Прогресс: -';
        document.getElementById('game-version').textContent = 'Версия: -';
    });

// Элементы
const aboutBtn = document.getElementById('about-btn');
const description = document.getElementById('description');
const linksBtn = document.getElementById('links-btn');
const links = document.getElementById('links');
const telegramBtn = document.getElementById('telegram-btn');
const docsBtn = document.getElementById('docs-btn');
const docs = document.getElementById('docs');
const devBtn = document.getElementById('dev-btn');
const dev = document.getElementById('dev');
const teamBtn = document.getElementById('team-btn');
const team = document.getElementById('team');
const extensionsBtn = document.getElementById('extensions-btn');
const extensions = document.getElementById('extensions');
const linksRow = document.querySelector('.links-row');
const body = document.body;

// Логика кнопки "О студии"
aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (body.classList.contains('links-active')) {
        body.classList.remove('links-active');
        linksBtn.classList.remove('active');
        linksRow.classList.remove('telegram-active');
        telegramBtn.classList.remove('back');
        links.classList.add('hide');
    }
    if (body.classList.contains('docs-active')) {
        body.classList.remove('docs-active');
        docsBtn.classList.remove('active');
        docs.classList.add('hide');
    }
    if (body.classList.contains('dev-active')) {
        body.classList.remove('dev-active');
        devBtn.classList.remove('active');
        dev.classList.add('hide');
    }
    if (body.classList.contains('team-active')) {
        body.classList.remove('team-active');
        teamBtn.classList.remove('active');
        team.classList.add('hide');
    }
    if (body.classList.contains('extensions-active')) {
        body.classList.remove('extensions-active');
        extensionsBtn.classList.remove('active');
        extensions.classList.add('hide');
    }
    body.classList.toggle('active');
    aboutBtn.classList.toggle('active');
    if (!body.classList.contains('active')) {
        description.classList.add('hide');
    } else {
        description.classList.remove('hide');
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
    if (body.classList.contains('docs-active')) {
        body.classList.remove('docs-active');
        docsBtn.classList.remove('active');
        docs.classList.add('hide');
    }
    if (body.classList.contains('dev-active')) {
        body.classList.remove('dev-active');
        devBtn.classList.remove('active');
        dev.classList.add('hide');
    }
    if (body.classList.contains('team-active')) {
        body.classList.remove('team-active');
        teamBtn.classList.remove('active');
        team.classList.add('hide');
    }
    if (body.classList.contains('extensions-active')) {
        body.classList.remove('extensions-active');
        extensionsBtn.classList.remove('active');
        extensions.classList.add('hide');
    }
    body.classList.toggle('links-active');
    linksBtn.classList.toggle('active');
    if (!body.classList.contains('links-active')) {
        linksRow.classList.remove('telegram-active');
        telegramBtn.classList.remove('back');
        links.classList.add('hide');
    } else {
        links.classList.remove('hide');
    }
});

// Логика кнопки "Документы"
docsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (body.classList.contains('active')) {
        body.classList.remove('active');
        aboutBtn.classList.remove('active');
        description.classList.add('hide');
    }
    if (body.classList.contains('links-active')) {
        body.classList.remove('links-active');
        linksBtn.classList.remove('active');
        linksRow.classList.remove('telegram-active');
        telegramBtn.classList.remove('back');
        links.classList.add('hide');
    }
    if (body.classList.contains('dev-active')) {
        body.classList.remove('dev-active');
        devBtn.classList.remove('active');
        dev.classList.add('hide');
    }
    if (body.classList.contains('team-active')) {
        body.classList.remove('team-active');
        teamBtn.classList.remove('active');
        team.classList.add('hide');
    }
    if (body.classList.contains('extensions-active')) {
        body.classList.remove('extensions-active');
        extensionsBtn.classList.remove('active');
        extensions.classList.add('hide');
    }
    body.classList.toggle('docs-active');
    docsBtn.classList.toggle('active');
    if (!body.classList.contains('docs-active')) {
        docs.classList.add('hide');
    } else {
        docs.classList.remove('hide');
    }
});

// Логика кнопки "Разработка"
devBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (body.classList.contains('active')) {
        body.classList.remove('active');
        aboutBtn.classList.remove('active');
        description.classList.add('hide');
    }
    if (body.classList.contains('links-active')) {
        body.classList.remove('links-active');
        linksBtn.classList.remove('active');
        linksRow.classList.remove('telegram-active');
        telegramBtn.classList.remove('back');
        links.classList.add('hide');
    }
    if (body.classList.contains('docs-active')) {
        body.classList.remove('docs-active');
        docsBtn.classList.remove('active');
        docs.classList.add('hide');
    }
    if (body.classList.contains('team-active')) {
        body.classList.remove('team-active');
        teamBtn.classList.remove('active');
        team.classList.add('hide');
    }
    if (body.classList.contains('extensions-active')) {
        body.classList.remove('extensions-active');
        extensionsBtn.classList.remove('active');
        extensions.classList.add('hide');
    }
    body.classList.toggle('dev-active');
    devBtn.classList.toggle('active');
    if (!body.classList.contains('dev-active')) {
        dev.classList.add('hide');
    } else {
        dev.classList.remove('hide');
    }
});

// Логика кнопки "Команда"
teamBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (body.classList.contains('active')) {
        body.classList.remove('active');
        aboutBtn.classList.remove('active');
        description.classList.add('hide');
    }
    if (body.classList.contains('links-active')) {
        body.classList.remove('links-active');
        linksBtn.classList.remove('active');
        linksRow.classList.remove('telegram-active');
        telegramBtn.classList.remove('back');
        links.classList.add('hide');
    }
    if (body.classList.contains('docs-active')) {
        body.classList.remove('docs-active');
        docsBtn.classList.remove('active');
        docs.classList.add('hide');
    }
    if (body.classList.contains('dev-active')) {
        body.classList.remove('dev-active');
        devBtn.classList.remove('active');
        dev.classList.add('hide');
    }
    if (body.classList.contains('extensions-active')) {
        body.classList.remove('extensions-active');
        extensionsBtn.classList.remove('active');
        extensions.classList.add('hide');
    }
    body.classList.toggle('team-active');
    teamBtn.classList.toggle('active');
    if (!body.classList.contains('team-active')) {
        team.classList.add('hide');
    } else {
        team.classList.remove('hide');
        fetch('BRC-Team.txt')
            .then(response => response.text())
            .then(data => {
                console.log('Сырые данные из BRC-Team.txt:', data); // Логирование для отладки
                const teamList = document.getElementById('team-list');
                teamList.innerHTML = '';

                const members = [];
                let currentMember = {};
                const lines = data.split('\n').filter(line => line.trim() !== '');
                lines.forEach(line => {
                    const [key, value] = line.split('=');
                    if (key && value) {
                        const trimmedKey = key.trim();
                        const trimmedValue = value.trim().replace(/"/g, '');
                        console.log(`Ключ: ${trimmedKey}, Значение: ${trimmedValue}`); // Логирование для отладки
                        if (trimmedKey === 'Username') {
                            if (Object.keys(currentMember).length > 0) {
                                members.push(currentMember);
                            }
                            currentMember = { Username: trimmedValue };
                        } else if (trimmedKey === 'UserDesc') { // Изменено на UserDesc
                            currentMember.Description = trimmedValue || 'Описание отсутствует';
                        } else if (trimmedKey === 'UserTelegramContact') { // Изменено на UserTelegramContact
                            currentMember.Telegram = trimmedValue;
                        }
                    }
                });
                if (Object.keys(currentMember).length > 0) {
                    members.push(currentMember);
                }

                console.log('Итоговый массив members:', members); // Логирование для отладки

                if (members.length === 0) {
                    teamList.innerHTML = '<p>Данные о команде отсутствуют.</p>';
                } else {
                    members.forEach(member => {
                        const memberDiv = document.createElement('div');
                        memberDiv.classList.add('team-member');
                        const telegramUsername = member.Telegram ? member.Telegram.replace('https://t.me/', '').replace('@', '') : '';
                        const telegramLink = telegramUsername ? `https://t.me/${telegramUsername}` : '#';
                        memberDiv.innerHTML = `
                            <h3>${member.Username}</h3>
                            <p>${member.Description || 'Описание отсутствует'}</p>
                            <a href="${telegramLink}" class="contact-icon" aria-label="Telegram"></a>
                        `;
                        teamList.appendChild(memberDiv);
                    });
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки данных о команде:', error);
                const teamList = document.getElementById('team-list');
                teamList.innerHTML = '<p>Ошибка загрузки данных о команде</p>';
            });
    }
});

// Логика кнопки "Расширения"
extensionsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (body.classList.contains('active')) {
        body.classList.remove('active');
        aboutBtn.classList.remove('active');
        description.classList.add('hide');
    }
    if (body.classList.contains('links-active')) {
        body.classList.remove('links-active');
        linksBtn.classList.remove('active');
        linksRow.classList.remove('telegram-active');
        telegramBtn.classList.remove('back');
        links.classList.add('hide');
    }
    if (body.classList.contains('docs-active')) {
        body.classList.remove('docs-active');
        docsBtn.classList.remove('active');
        docs.classList.add('hide');
    }
    if (body.classList.contains('dev-active')) {
        body.classList.remove('dev-active');
        devBtn.classList.remove('active');
        dev.classList.add('hide');
    }
    if (body.classList.contains('team-active')) {
        body.classList.remove('team-active');
        teamBtn.classList.remove('active');
        team.classList.add('hide');
    }
    body.classList.toggle('extensions-active');
    extensionsBtn.classList.toggle('active');
    if (!body.classList.contains('extensions-active')) {
        extensions.classList.add('hide');
    } else {
        extensions.classList.remove('hide');
    }
});

// Логика кнопки Telegram
telegramBtn.addEventListener('click', (e) => {
    e.preventDefault();
    linksRow.classList.toggle('telegram-active');
    telegramBtn.classList.toggle('back');
});

// Обработчики для иконок
const gamejoltBtn = document.querySelector('.gamejolt');
const youtubeBtn = document.querySelector('.youtube');
const kogamaBtn = document.querySelector('.kogama');

gamejoltBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!linksRow.classList.contains('telegram-active')) {
        window.location.href = gamejoltBtn.getAttribute('href');
    }
});

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

// Логика кнопок скроллбара
const scrollUpBtn = document.querySelector('.scroll-up');
const scrollDownBtn = document.querySelector('.scroll-down');

scrollUpBtn.addEventListener('click', () => {
    window.scrollBy({
        top: -100,
        behavior: 'smooth'
    });
});

scrollDownBtn.addEventListener('click', () => {
    window.scrollBy({
        top: 100,
        behavior: 'smooth'
    });
});
