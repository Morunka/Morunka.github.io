// Прелоадер
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    preloader.classList.add('hidden');
    body.classList.add('loaded');
});

// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
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
    const logo = document.querySelector('h1');
    const easterEgg = document.querySelector('.easter-egg');

    // Глобальные переменные для пагинации и списка игр
    let currentGames = [];
    let currentPage = 1;
    const gamesPerPage = 3;

    // Функция для проверки, есть ли открытые страницы
    function isAnyPageOpen() {
        return (
            body.classList.contains('active') ||
            body.classList.contains('links-active') ||
            body.classList.contains('docs-active') ||
            body.classList.contains('dev-active') ||
            body.classList.contains('team-active') ||
            body.classList.contains('extensions-active') ||
            body.classList.contains('games-active') ||
            body.classList.contains('utils-active')
        );
    }

    // Открываем страницу "О студии" по умолчанию
    body.classList.add('active');
    aboutBtn.classList.add('active');
    description.classList.remove('hide');

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
                        const gameId = game.Link.match(/\/game\/\d+\/(\d+)/)?.[1];
                        if (gameId) {
                            backgroundImage = `https://cdn.kogama.com/game-thumbnails/${gameId}.jpg`;
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

        let filteredGames = currentGames.filter(game => {
            const matchesCategory = category === 'horror' ? (game.Tags || []).some(tag => tag.toLowerCase() === 'horror') : !(game.Tags || []).some(tag => tag.toLowerCase() === 'horror');
            const matchesYear = year ? (game.Year || '').toString().includes(year) : true;
            const matchesEngine = engine ? (game.Engine || '') === engine : true;
            return matchesCategory && matchesYear && matchesEngine;
        });

        if (sortValue === 'name-asc') {
            filteredGames.sort((a, b) => (a.Name || '').localeCompare(b.Name || ''));
        } else if (sortValue === 'name-desc') {
            filteredGames.sort((a, b) => (b.Name || '').localeCompare(a.Name || ''));
        } else if (sortValue === 'year-desc') {
            filteredGames.sort((a, b) => parseInt(b.Year || 0) - parseInt(a.Year || 0));
        } else if (sortValue === 'year-asc') {
            filteredGames.sort((a, b) => parseInt(a.Year || 0) - parseInt(b.Year || 0));
        }

        currentPage = 1;
        displayGames(filteredGames);
    }

    // Функция для загрузки игр
    function loadGames(file) {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Файл ${file} не найден`);
                return response.text();
            })
            .then(data => {
                console.log('Сырые данные GamesList.txt:', data); // Отладка
                const gamesData = [];
                let currentGame = {};
                const lines = data.split('\n').filter(line => line.trim() !== '');
                lines.forEach((line, index) => {
                    console.log(`Строка ${index}:`, line); // Отладка
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

                console.log('Загруженные игры:', gamesData); // Отладка
                currentGames = gamesData;
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
                { name: 'UNMiner Tool', link: 'https://telegra.ph/How-to-user-UNMiner-Tool-03-25' },
                { name: 'TS3-Music-Downloader', link: 'https://telegra.ph/How-to-use-TS3-Music-Downloader-03-25' }
            ];
            utilsData.forEach(util => {
                const utilItem = document.createElement('div');
                utilItem.classList.add('utils-item');
                utilItem.innerHTML = `<p><a href="${util.link}" class="extension-link">${util.name}</a></p>`;
                utilsList.appendChild(utilItem);
            });
        } else {
            utilsList.innerHTML = '<p>Пока здесь ничего нет.</p>';
        }
    }

    // Пасхалка: клик на логотип
    logo.addEventListener('click', () => {
        easterEgg.classList.toggle('active');
    });

    // Логика кнопок
    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('active')) {
            return;
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
        if (body.classList.contains('utils-active')) {
            body.classList.remove('utils-active');
            utilsBtn.classList.remove('active');
            utils.classList.add('hide');
        }
        body.classList.add('active');
        aboutBtn.classList.add('active');
        description.classList.remove('hide');
    });

    linksBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('links-active')) {
            return;
        }
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
        body.classList.add('links-active');
        linksBtn.classList.add('active');
        links.classList.remove('hide');
    });

    docsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('docs-active')) {
            return;
        }
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
        body.classList.add('docs-active');
        docsBtn.classList.add('active');
        docs.classList.remove('hide');
    });

    devBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('dev-active')) {
            return;
        }
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
        body.classList.add('dev-active');
        devBtn.classList.add('active');
        dev.classList.remove('hide');
    });

    teamBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('team-active')) {
            return;
        }
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
        body.classList.add('team-active');
        teamBtn.classList.add('active');
        team.classList.remove('hide');
        fetch('./BRC-Team.txt')
            .then(response => {
                if (!response.ok) throw new Error('Файл BRC-Team.txt не найден');
                return response.text();
            })
            .then(data => {
                console.log('Сырые данные BRC-Team.txt:', data); // Отладка
                const teamList = document.getElementById('team-list');
                teamList.innerHTML = '';
                const members = [];
                let currentMember = {};
                const lines = data.split('\n').filter(line => line.trim() !== '');
                lines.forEach((line, index) => {
                    console.log(`Строка ${index}:`, line); // Отладка
                    const [key, value] = line.split('=');
                    if (key && value) {
                        const trimmedKey = key.trim();
                        const trimmedValue = value.trim().replace(/"/g, '');
                        if (trimmedKey === 'Name') {
                            if (Object.keys(currentMember).length > 0) {
                                members.push(currentMember);
                            }
                            currentMember = { Name: trimmedValue };
                        } else if (trimmedKey === 'Role') {
                            currentMember.Role = trimmedValue;
                        } else if (trimmedKey === 'Contact') {
                            currentMember.Contact = trimmedValue;
                        }
                    }
                });
                if (Object.keys(currentMember).length > 0) {
                    members.push(currentMember);
                }

                console.log('Загруженные члены команды:', members); // Отладка
                if (members.length === 0) {
                    teamList.innerHTML = '<p>Команда пуста</p>';
                    return;
                }

                members.forEach(member => {
                    const memberDiv = document.createElement('div');
                    memberDiv.classList.add('team-member');
                    memberDiv.innerHTML = `
                        <h3>${member.Name || 'Не указано'}</h3>
                        <p>${member.Role || 'Роль не указана'}</p>
                        <a href="${member.Contact || '#'}" class="contact-icon" aria-label="Contact ${member.Name || 'член команды'}"></a>
                    `;
                    teamList.appendChild(memberDiv);
                });
            })
            .catch(error => {
                console.error('Ошибка загрузки данных команды:', error);
                document.getElementById('team-list').innerHTML = '<p>Ошибка загрузки данных команды</p>';
            });
    });

    extensionsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('extensions-active')) {
            return;
        }
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
        body.classList.add('extensions-active');
        extensionsBtn.classList.add('active');
        extensions.classList.remove('hide');
    });

    gamesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('games-active')) {
            return;
        }
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
        body.classList.add('games-active');
        gamesBtn.classList.add('active');
        games.classList.remove('hide');
        loadGames('GamesList.txt');
    });

    utilsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('utils-active')) {
            return;
        }
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
        body.classList.add('utils-active');
        utilsBtn.classList.add('active');
        utils.classList.remove('hide');
        displayUtils('our');
    });

    telegramBtn.addEventListener('click', (e) => {
        e.preventDefault();
        linksRow.classList.toggle('telegram-active');
        telegramBtn.classList.toggle('back');
        if (linksRow.classList.contains('telegram-active')) {
            links.classList.add('telegram-active');
        } else {
            links.classList.remove('telegram-active');
        }
    });

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

    yearFilter.addEventListener('input', filterAndSortGames);
    engineFilter.addEventListener('change', filterAndSortGames);
    sortGames.addEventListener('change', filterAndSortGames);

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

    // Кнопки прокрутки
    document.querySelector('.scroll-up').addEventListener('click', () => {
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    });

    document.querySelector('.scroll-down').addEventListener('click', () => {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    });
});
