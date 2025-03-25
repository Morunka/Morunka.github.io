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
const gamesBtn = document.getElementById('games-btn');
const games = document.getElementById('games');
const horrorBtn = document.getElementById('horror-btn');
const othersBtn = document.getElementById('others-btn');
const gamesList = document.getElementById('games-list');
const yearFilter = document.getElementById('year-filter');
const engineFilter = document.getElementById('engine-filter');
const sortGames = document.getElementById('sort-games');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const utilsBtn = document.getElementById('utils-btn');
const utils = document.getElementById('utils');
const ourUtilsBtn = document.getElementById('our-utils-btn');
const otherUtilsBtn = document.getElementById('other-utils-btn');
const utilsList = document.getElementById('utils-list');
const linksRow = document.querySelector('.links-row');
const body = document.body;

// Глобальные переменные для пагинации и списка игр
let currentGames = [];
let currentPage = 1;
const gamesPerPage = 3;

// Функция для извлечения года из строки
function getYear(yearStr) {
    if (yearStr.length == 4 && !isNaN(yearStr)) {
        return yearStr;
    } else {
        const parts = yearStr.split(' ');
        if (parts.length >= 3) {
            return parts[2];
        } else {
            return yearStr;
        }
    }
}

// Функция для отображения игр на текущей странице
function displayGames(gamesData) {
    gamesList.innerHTML = '';
    const start = (currentPage - 1) * gamesPerPage;
    const end = start + gamesPerPage;
    const paginatedGames = gamesData.slice(start, end);

    if (paginatedGames.length === 0) {
        gamesList.innerHTML = '<p>Упс.. По вашему запросу ничего не было найдено.</p>';
    } else {
        paginatedGames.forEach(game => {
            let backgroundImage = game.Image;
            if (!backgroundImage) {
                if (game.Link.includes('kogama.com')) {
                    const gameId = game.Link.match(/\/play\/(\d+)\//)?.[1];
                    if (gameId) {
                        backgroundImage = `https://www.kogama.com/static/img/game_thumbnails/${gameId}.jpg`;
                    }
                }
            }
            if (!backgroundImage) {
                backgroundImage = 'https://via.placeholder.com/600x200?text=No+Image';
            }

            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');
            gameCard.style.backgroundImage = `url('${backgroundImage}')`;
            gameCard.innerHTML = `
                <div class="game-header">
                    <h3 class="game-title">${game.Name}</h3>
                    <div class="game-meta">
                        <span class="game-version">v${game.Version || 'N/A'}</span>
                        <span class="game-engine">${game.Engine || 'N/A'}</span>
                    </div>
                </div>
                <p class="game-description">${game.Desc || 'Описание отсутствует'}</p>
                <div class="game-footer">
                    <a href="${game.Link || '#'}" class="game-play-btn">Играть</a>
                    <span class="game-year">${game.Year || 'N/A'}</span>
                </div>
            `;
            gamesList.appendChild(gameCard);
        });
    }

    // Обновляем информацию о страницах
    const totalPages = Math.ceil(gamesData.length / gamesPerPage);
    pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Функция для фильтрации и сортировки игр
function filterAndSortGames() {
    const year = yearFilter.value.trim();
    const engine = engineFilter.value;
    const category = horrorBtn.classList.contains('active') ? 'horror' : 'others';
    const sortValue = sortGames.value;

    // Фильтрация
    let filteredGames = currentGames.filter(game => {
        const matchesCategory = category === 'horror' ? game.Tags.includes('Horror') : !game.Tags.includes('Horror');
        const matchesYear = year ? getYear(game.Year) === year : true;
        const matchesEngine = engine ? game.Engine === engine : true;
        return matchesCategory && matchesYear && matchesEngine;
    });

    // Если поле года пустое, показываем все игры в зависимости от категории
    if (!year) {
        filteredGames = currentGames.filter(game => {
            const matchesCategory = category === 'horror' ? game.Tags.includes('Horror') : !game.Tags.includes('Horror');
            const matchesEngine = engine ? game.Engine === engine : true;
            return matchesCategory && matchesEngine;
        });
    }

    // Сортировка
    if (sortValue === 'name-asc') {
        filteredGames.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortValue === 'name-desc') {
        filteredGames.sort((a, b) => b.Name.localeCompare(a.Name));
    } else if (sortValue === 'year-desc') {
        filteredGames.sort((a, b) => parseInt(getYear(b.Year)) - parseInt(getYear(a.Year)));
    } else if (sortValue === 'year-asc') {
        filteredGames.sort((a, b) => parseInt(getYear(a.Year)) - parseInt(getYear(b.Year)));
    }

    // Сбрасываем страницу на первую после фильтрации/сортировки
    currentPage = 1;
    displayGames(filteredGames);
}

// Функция для загрузки игр
function loadGames(file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const gamesData = [];
            let currentGame = {};
            const lines = data.split('\n').filter(line => line.trim() !== '');
            lines.forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    const trimmedKey = key.trim();
                    const trimmedValue = value.trim().replace(/"/g, '');
                    if (trimmedKey === 'Name') {
                        if (Object.keys(currentGame).length > 0) {
                            gamesData.push(currentGame);
                        }
                        currentGame = { Name: trimmedValue };
                    } else if (trimmedKey === 'Tags') {
                        currentGame.Tags = trimmedValue.split(',').map(tag => tag.trim());
                    } else if (trimmedKey === 'Desc') {
                        currentGame.Desc = trimmedValue;
                    } else if (trimmedKey === 'Year') {
                        currentGame.Year = trimmedValue;
                    } else if (trimmedKey === 'Link') {
                        currentGame.Link = trimmedValue;
                    } else if (trimmedKey === 'Image') {
                        currentGame.Image = trimmedValue;
                    } else if (trimmedKey === 'Engine') {
                        currentGame.Engine = trimmedValue;
                    } else if (trimmedKey === 'Version') {
                        currentGame.Version = trimmedValue;
                    }
                }
            });
            if (Object.keys(currentGame).length > 0) {
                gamesData.push(currentGame);
            }

            currentGames = gamesData;
            currentPage = 1;
            filterAndSortGames();
        })
        .catch(error => {
            console.error(`Ошибка загрузки данных из ${file}:`, error);
            gamesList.innerHTML = '<p>Ошибка загрузки игр</p>';
        });
}

// Функция для отображения утилит
function displayUtils(category) {
    utilsList.innerHTML = '';
    if (category === 'our') {
        const utilsData = [
            { name: 'UNMiner Tool' },
            { name: 'TS3-Music-Downloader' }
        ];
        utilsData.forEach(util => {
            const utilItem = document.createElement('div');
            utilItem.classList.add('utils-item');
            utilItem.innerHTML = `<p>${util.name}</p>`;
            utilsList.appendChild(utilItem);
        });
    } else {
        utilsList.innerHTML = '<p>Пока здесь ничего нет.</p>';
    }
}

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
    if (body.classList.contains('games-active')) {
        body.classList.remove('games-active');
        gamesBtn.classList.remove('active');
        games.classList.add('hide');
    }
    if (body.classList.contains('utils-active')) {
        body.classList.remove('utils-active');
        utilsBtn.classList.remove('active');
        utils.classList.add('hide');
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
    if (body.classList.contains('games-active')) {
        body.classList.remove('games-active');
        gamesBtn.classList.remove('active');
        games.classList.add('hide');
    }
    if (body.classList.contains('utils-active')) {
        body.classList.remove('utils-active');
        utilsBtn.classList.remove('active');
        utils.classList.add('hide');
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
    if (body.classList.contains('games-active')) {
        body.classList.remove('games-active');
        gamesBtn.classList.remove('active');
        games.classList.add('hide');
    }
    if (body.classList.contains('utils-active')) {
        body.classList.remove('utils-active');
        utilsBtn.classList.remove('active');
        utils.classList.add('hide');
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
    if (body.classList.contains('games-active')) {
        body.classList.remove('games-active');
        gamesBtn.classList.remove('active');
        games.classList.add('hide');
    }
    if (body.classList.contains('utils-active')) {
        body.classList.remove('utils-active');
        utilsBtn.classList.remove('active');
        utils.classList.add('hide');
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
    if (body.classList.contains('games-active')) {
        body.classList.remove('games-active');
        gamesBtn.classList.remove('active');
        games.classList.add('hide');
    }
    if (body.classList.contains('utils-active')) {
        body.classList.remove('utils-active');
        utilsBtn.classList.remove('active');
        utils.classList.add('hide');
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
                        if (trimmedKey === 'Username') {
                            if (Object.keys(currentMember).length > 0) {
                                members.push(currentMember);
                            }
                            currentMember = { Username: trimmedValue };
                        } else if (trimmedKey === 'UserDesc') {
                            currentMember.Description = trimmedValue || 'Описание отсутствует';
                        } else if (trimmedKey === 'UserTelegramContact') {
                            currentMember.Telegram = trimmedValue;
                        }
                    }
                });
                if (Object.keys(currentMember).length > 0) {
                    members.push(currentMember);
                }

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
    if (body.classList.contains('games-active')) {
        body.classList.remove('games-active');
        gamesBtn.classList.remove('active');
        games.classList.add('hide');
    }
    if (body.classList.contains('utils-active')) {
        body.classList.remove('utils-active');
        utilsBtn.classList.remove('active');
        utils.classList.add('hide');
    }
    body.classList.toggle('extensions-active');
    extensionsBtn.classList.toggle('active');
    if (!body.classList.contains('extensions-active')) {
        extensions.classList.add('hide');
    } else {
        extensions.classList.remove('hide');
    }
});

// Логика кнопки "Игры"
gamesBtn.addEventListener('click', (e) => {
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
    if (body.classList.contains('extensions-active')) {
        body.classList.remove('extensions-active');
        extensionsBtn.classList.remove('active');
        extensions.classList.add('hide');
    }
    if (body.classList.contains('utils-active')) {
        body.classList.remove('utils-active');
        utilsBtn.classList.remove('active');
        utils.classList.add('hide');
    }
    body.classList.toggle('games-active');
    gamesBtn.classList.toggle('active');
    if (!body.classList.contains('games-active')) {
        games.classList.add('hide');
    } else {
        games.classList.remove('hide');
        loadGames('GamesList.txt');
    }
});

// Логика кнопки "Утилиты"
utilsBtn.addEventListener('click', (e) => {
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
    if (body.classList.contains('extensions-active')) {
        body.classList.remove('extensions-active');
        extensionsBtn.classList.remove('active');
        extensions.classList.add('hide');
    }
    if (body.classList.contains('games-active')) {
        body.classList.remove('games-active');
        gamesBtn.classList.remove('active');
        games.classList.add('hide');
    }
    body.classList.toggle('utils-active');
    utilsBtn.classList.toggle('active');
    if (!body.classList.contains('utils-active')) {
        utils.classList.add('hide');
    } else {
        utils.classList.remove('hide');
        displayUtils('our');
    }
});

// Логика кнопки Telegram
telegramBtn.addEventListener('click', (e) => {
    e.preventDefault();
    linksRow.classList.toggle('telegram-active');
    telegramBtn.classList.toggle('back');
});

// Логика кнопок категорий игр
horrorBtn.addEventListener('click', () => {
    horrorBtn.classList.add('active');
    othersBtn.classList.remove('active');
    filterAndSortGames();
});

othersBtn.addEventListener('click', () => {
    othersBtn.classList.add('active');
    horrorBtn.classList.remove('active');
    filterAndSortGames();
});

// Логика фильтров и сортировки
yearFilter.addEventListener('input', filterAndSortGames);
engineFilter.addEventListener('change', filterAndSortGames);
sortGames.addEventListener('change', filterAndSortGames);

// Логика пагинации
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        filterAndSortGames();
    }
});

nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(currentGames.length / gamesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        filterAndSortGames();
    }
});

// Логика кнопок категорий утилит
ourUtilsBtn.addEventListener('click', () => {
    ourUtilsBtn.classList.add('active');
    otherUtilsBtn.classList.remove('active');
    displayUtils('our');
});

otherUtilsBtn.addEventListener('click', () => {
    otherUtilsBtn.classList.add('active');
    ourUtilsBtn.classList.remove('active');
    displayUtils('other');
});
