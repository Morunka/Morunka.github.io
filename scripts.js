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
    const body = document.body;
    const linksRow = document.getElementById('links-row');
    const logo = document.querySelector('h1');
    const easterEgg = document.querySelector('.easter-egg');

    let currentCategory = 'horror';
    let gamesData = [];
    let filteredGames = [];
    let currentPage = 1;
    const gamesPerPage = 5;

    // Пасхалка
    let clickCount = 0;
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            easterEgg.classList.add('active');
        }
    });

    // Кнопка "О студии"
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

    // Кнопка "Связи"
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

    telegramBtn.addEventListener('click', (e) => {
        e.preventDefault();
        linksRow.classList.toggle('telegram-active');
        telegramBtn.classList.toggle('back');
    });

    // Кнопка "Документы"
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

    // Кнопка "Разработка"
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
        fetch('./DevelopingGameProc.txt')
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n').map(line => line.trim()).filter(line => line);
                const gameData = {};
                lines.forEach(line => {
                    const [key, value] = line.split(': ').map(item => item.trim());
                    gameData[key] = value;
                });
                const devInfo = document.querySelector('.dev-info');
                devInfo.innerHTML = `
                    <h2>${gameData.Name}</h2>
                    <p>Прогресс: ${gameData.Progress}</p>
                    <p>Дата: ${gameData.Date}</p>
                `;
            })
            .catch(error => {
                console.error('Ошибка загрузки данных разработки:', error);
                const devInfo = document.querySelector('.dev-info');
                devInfo.innerHTML = '<p>Ошибка загрузки данных разработки</p>';
            });
    });

    // Кнопка "Команда"
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
        const teamList = document.querySelector('.team-list');
        teamList.innerHTML = '';
        fetch('./BRC-Team.txt')
            .then(response => response.text())
            .then(data => {
                const members = data.split('\n\n').map(member => {
                    const lines = member.split('\n').map(line => line.trim()).filter(line => line);
                    const memberData = {};
                    lines.forEach(line => {
                        const [key, value] = line.split(': ').map(item => item.trim());
                        memberData[key] = value;
                    });
                    return memberData;
                });
                if (members.length === 0) {
                    teamList.innerHTML = '<p>Команда отсутствует</p>';
                    return;
                }
                members.forEach((member, index) => {
                    const memberDiv = document.createElement('div');
                    memberDiv.classList.add('team-member');
                    memberDiv.innerHTML = `
                        <h3>${member.Username}</h3>
                        <p class="team-role">${member.UserDesc}</p>
                        <a href="${member.UserTelegramContact}" class="contact-icon"></a>
                    `;
                    teamList.appendChild(memberDiv);
                    if (index < members.length - 1) {
                        const divider = document.createElement('hr');
                        divider.classList.add('team-divider');
                        teamList.appendChild(divider);
                    }
                });
                const joinDiv = document.createElement('div');
                joinDiv.classList.add('team-join');
                joinDiv.innerHTML = 'Хотите присоединиться? <a href="https://t.me/MEOW_MUR920">Напишите нам!</a>';
                teamList.appendChild(joinDiv);
            })
            .catch(error => {
                console.error('Ошибка загрузки команды:', error);
                teamList.innerHTML = '<p>Ошибка загрузки команды</p>';
            });
    });

    // Кнопка "Расширения"
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
        const extensionsList = document.querySelector('.extensions-list');
        extensionsList.innerHTML = '';

        // Добавляем надпись
        const header = document.createElement('p');
        header.textContent = 'Все расширения ниже подходят для использования в TurboWarp и PenguinMode';
        header.style.color = 'white';
        header.style.fontFamily = "'Russo One', sans-serif";
        header.style.fontSize = '14px';
        header.style.textAlign = 'center';
        header.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.5)';
        header.style.marginBottom = '15px';
        extensionsList.appendChild(header);

        // Добавляем кнопки
        const extensionsData = [
            { name: 'Telegram API Pack Edition', link: 'https://github.com/Morunka/Telegram-API-TurboWarp-Pack-Edition' },
            { name: 'Scratch API', link: 'https://github.com/Morunka/Files/blob/main/ScratchAPI-TW.js' },
            { name: 'Gemini API', link: 'https://github.com/Morunka/Files/blob/main/GeMiniAPI-TW.js' }
        ];
        extensionsData.forEach(ext => {
            const extLink = document.createElement('a');
            extLink.href = ext.link;
            extLink.classList.add('telegram-link');
            extLink.textContent = ext.name;
            extensionsList.appendChild(extLink);
        });
    });

    // Загрузка игр
    const loadGames = (file) => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                const games = data.split('\n\n').map(game => {
                    const lines = game.split('\n').map(line => line.trim()).filter(line => line);
                    const gameData = {};
                    lines.forEach(line => {
                        const [key, value] = line.split(': ').map(item => item.trim());
                        gameData[key] = value;
                    });
                    return gameData;
                });
                gamesData = games;
                applyFilters();
            })
            .catch(error => {
                console.error('Ошибка загрузки игр:', error);
                gamesList.innerHTML = '<p>Ошибка загрузки игр</p>';
            });
    };

    // Применение фильтров и сортировки
    const applyFilters = () => {
        filteredGames = gamesData;

        const year = yearFilter.value;
        if (year) {
            filteredGames = filteredGames.filter(game => game.Year.includes(year));
        }

        const engine = engineFilter.value;
        if (engine) {
            filteredGames = filteredGames.filter(game => game.Engine === engine);
        }

        if (sortGames.value === 'name-asc') {
            filteredGames.sort((a, b) => a.Name.localeCompare(b.Name));
        } else if (sortGames.value === 'name-desc') {
            filteredGames.sort((a, b) => b.Name.localeCompare(a.Name));
        } else if (sortGames.value === 'year-asc') {
            filteredGames.sort((a, b) => a.Year.localeCompare(b.Year));
        } else if (sortGames.value === 'year-desc') {
            filteredGames.sort((a, b) => b.Year.localeCompare(a.Year));
        }

        currentPage = 1;
        displayGames();
    };

    // Отображение игр
    const displayGames = () => {
        gamesList.innerHTML = '';
        const start = (currentPage - 1) * gamesPerPage;
        const end = start + gamesPerPage;
        const paginatedGames = filteredGames.slice(start, end);

        if (paginatedGames.length === 0) {
            gamesList.innerHTML = '<p>Игры не найдены</p>';
        } else {
            paginatedGames.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.classList.add('game-card');
                gameCard.style.backgroundImage = `url(${game.Image})`;
                gameCard.innerHTML = `
                    <div class="game-header">
                        <h3 class="game-title">${game.Name}</h3>
                        <div class="game-meta">
                            <span class="game-version">v${game.Version}</span>
                            <span class="game-engine">${game.Engine}</span>
                        </div>
                    </div>
                    <p class="game-description">${game.Desc}</p>
                    <div class="game-footer">
                        <a href="${game.Link}" class="game-play-btn">Играть</a>
                        <span class="game-year">${game.Year}</span>
                    </div>
                `;
                gamesList.appendChild(gameCard);
            });
        }

        const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
        pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    };

    // Кнопка "Игры"
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
        currentPage = 1;
        loadGames(currentCategory === 'horror' ? './HorrorGames.txt' : './OthersGames.txt');
    });

    // Переключение категорий
    horrorBtn.addEventListener('click', () => {
        if (currentCategory === 'horror') return;
        currentCategory = 'horror';
        horrorBtn.classList.add('active');
        othersBtn.classList.remove('active');
        loadGames('./HorrorGames.txt');
    });

    othersBtn.addEventListener('click', () => {
        if (currentCategory === 'others') return;
        currentCategory = 'others';
        othersBtn.classList.add('active');
        horrorBtn.classList.remove('active');
        loadGames('./OthersGames.txt');
    });

    // Фильтры и сортировка
    yearFilter.addEventListener('input', applyFilters);
    engineFilter.addEventListener('change', applyFilters);
    sortGames.addEventListener('change', applyFilters);

    // Пагинация
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayGames();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayGames();
        }
    });

    // Кнопка "Утилиты"
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
        const utilsList = document.querySelector('.utils-list');
        utilsList.innerHTML = '';

        const utilsData = [
            { name: 'UNMiner Tool', link: 'https://github.com/Morunka/UNMiner-Tool' },
            { name: 'TS3-Music-Downloader', link: 'https://github.com/Morunka/TS3-Music-Downloader' }
        ];
        utilsData.forEach(utility => {
            const utilItem = document.createElement('div');
            utilItem.classList.add('utils-item');
            utilItem.innerHTML = `
                <a href="${utility.link}" class="telegram-link">${utility.name}</a>
            `;
            utilsList.appendChild(utilItem);
        });
    });

    // Кнопки прокрутки
    const scrollTopBtn = document.getElementById('scroll-top');
    const scrollBottomBtn = document.getElementById('scroll-bottom');

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollBottomBtn.addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
});
