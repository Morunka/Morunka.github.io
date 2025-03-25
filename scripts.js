// Прелоадер
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    if (preloader && body) {
        preloader.classList.add('hidden');
        body.classList.add('loaded');
    }
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
    let currentUtilsCategory = 'our';

    // Проверка на существование элементов
    if (!aboutBtn || !description || !linksBtn || !links || !docsBtn || !docs || !devBtn || !dev || !teamBtn || !team || !extensionsBtn || !extensions || !gamesBtn || !games || !horrorBtn || !othersBtn || !gamesList || !yearFilter || !engineFilter || !sortGames || !prevPageBtn || !nextPageBtn || !pageInfo || !utilsBtn || !utils || !ourUtilsBtn || !otherUtilsBtn || !utilsList || !body || !logo) {
        console.error('Один или несколько элементов не найдены в HTML');
        return;
    }

    // Пасхалка
    let clickCount = 0;
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5 && easterEgg) {
            easterEgg.classList.add('active');
        }
    });

    // Автоматическое открытие вкладки "О компании", если ничего не открыто
    const isAnyMenuOpen = () => {
        const menuClasses = ['active', 'links-active', 'docs-active', 'dev-active', 'team-active', 'extensions-active', 'games-active', 'utils-active'];
        return menuClasses.some(cls => body.classList.contains(cls));
    };

    if (!isAnyMenuOpen()) {
        aboutBtn.click();
    }

    // Функция для закрытия всех меню, кроме указанного
    const closeOtherMenus = (activeClass) => {
        const menuClasses = ['active', 'links-active', 'docs-active', 'dev-active', 'team-active', 'extensions-active', 'games-active', 'utils-active'];
        menuClasses.forEach(cls => {
            if (cls !== activeClass) {
                body.classList.remove(cls);
            }
        });

        // Скрываем все контейнеры
        description.classList.add('hide');
        links.classList.add('hide');
        if (linksRow) linksRow.classList.remove('telegram-active');
        if (telegramBtn) telegramBtn.classList.remove('back');
        docs.classList.add('hide');
        dev.classList.add('hide');
        team.classList.add('hide');
        extensions.classList.add('hide');
        games.classList.add('hide');
        utils.classList.add('hide');

        // Убираем активное состояние у всех кнопок
        aboutBtn.classList.remove('active');
        linksBtn.classList.remove('active');
        docsBtn.classList.remove('active');
        devBtn.classList.remove('active');
        teamBtn.classList.remove('active');
        extensionsBtn.classList.remove('active');
        gamesBtn.classList.remove('active');
        utilsBtn.classList.remove('active');
    };

    // Кнопка "О компании"
    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('active')) {
            return;
        }
        closeOtherMenus('active');
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
        closeOtherMenus('links-active');
        body.classList.add('links-active');
        linksBtn.classList.add('active');
        links.classList.remove('hide');
    });

    // Исправляем подменю Telegram
    if (telegramBtn && linksRow) {
        telegramBtn.addEventListener('click', (e) => {
            e.preventDefault();
            linksRow.classList.toggle('telegram-active');
            telegramBtn.classList.toggle('back');
            const telegramLinks = document.querySelector('.telegram-links');
            if (telegramLinks) {
                telegramLinks.style.display = linksRow.classList.contains('telegram-active') ? 'flex' : 'none';
            } else {
                console.warn('Элемент .telegram-links не найден, создаём его');
                const telegramLinksDiv = document.createElement('div');
                telegramLinksDiv.classList.add('telegram-links');
                telegramLinksDiv.innerHTML = `
                    <a href="https://t.me/By_RORlil" class="telegram-link">Канал студии</a>
                    <a href="https://t.me/MorunkaBot" class="telegram-link">Бот студии</a>
                    <a href="https://t.me/MEOW_MUR920" class="telegram-link">Создатель</a>
                `;
                linksRow.appendChild(telegramLinksDiv);
                telegramLinksDiv.style.display = 'flex';
            }
        });
    } else {
        console.warn('Элементы telegramBtn или linksRow не найдены');
    }

    // Кнопка "Документы"
    docsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('docs-active')) {
            return;
        }
        closeOtherMenus('docs-active');
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
        closeOtherMenus('dev-active');
        body.classList.add('dev-active');
        devBtn.classList.add('active');
        dev.classList.remove('hide');
        fetch('./DevelopingGameProc.txt')
            .then(response => {
                if (!response.ok) throw new Error('Файл DevelopingGameProc.txt не найден');
                return response.text();
            })
            .then(data => {
                const lines = data.split('\n').map(line => line.trim()).filter(line => line);
                const gameData = {};
                lines.forEach(line => {
                    const [key, ...valueParts] = line.split('=');
                    const value = valueParts.join('=').trim().replace(/^"|"$/g, '');
                    gameData[key.trim()] = value || 'Не указано';
                });
                const devInfo = document.querySelector('.dev-info');
                if (devInfo) {
                    devInfo.innerHTML = `
                        <h2>${gameData.GameName || 'Не указано'}</h2>
                        <p>Прогресс: ${gameData['Game%Dev'] || 'Не указано'}</p>
                        <p>Версия: ${gameData.GameVersion || 'Не указано'}</p>
                        ${gameData.GameMoreLink ? `<a href="${gameData.GameMoreLink}" class="more-btn">Подробнее</a>` : ''}
                    `;
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки данных разработки:', error);
                const devInfo = document.querySelector('.dev-info');
                if (devInfo) {
                    devInfo.innerHTML = '<p>Ошибка загрузки данных разработки</p>';
                }
            });
    });

    // Кнопка "Команда"
    teamBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('team-active')) {
            return;
        }
        closeOtherMenus('team-active');
        body.classList.add('team-active');
        teamBtn.classList.add('active');
        team.classList.remove('hide');
        const teamList = document.querySelector('.team-list');
        if (teamList) {
            teamList.innerHTML = ''; // Очищаем список перед добавлением
            fetch('./BRC-Team.txt')
                .then(response => {
                    if (!response.ok) throw new Error('Файл BRC-Team.txt не найден');
                    return response.text();
                })
                .then(data => {
                    const members = data.split('\n\n').map(member => {
                        const lines = member.split('\n').map(line => line.trim()).filter(line => line);
                        const memberData = {};
                        lines.forEach(line => {
                            const [key, ...valueParts] = line.split('=');
                            const value = valueParts.join('=').trim().replace(/^"|"$/g, '');
                            memberData[key.trim()] = value || 'Не указано';
                        });
                        return memberData;
                    });
                    if (members.length === 0) {
                        teamList.innerHTML = '<p>Команда отсутствует</p>';
                        return;
                    }
                    members.forEach((member, index) => {
                        const cleanUsername = (member.Username || 'Не указано').replace(/["':]/g, '');
                        const memberDiv = document.createElement('div');
                        memberDiv.classList.add('team-member');
                        memberDiv.innerHTML = `
                            <h3>${cleanUsername}</h3>
                            <p class="team-role">${member.UserDesc || 'Не указано'}</p>
                            <a href="${member.UserTelegramContact || '#'}" class="contact-icon"></a>
                        `;
                        teamList.appendChild(memberDiv);
                        if (index < members.length - 1) {
                            const divider = document.createElement('hr');
                            divider.classList.add('team-divider');
                            teamList.appendChild(divider);
                        }
                    });
                    // Добавляем надпись только один раз
                    const joinDiv = document.createElement('div');
                    joinDiv.classList.add('team-join');
                    joinDiv.innerHTML = 'Если хотите присоединиться к нам, пишите <a href="https://t.me/MEOW_MUR920">@MEOW_MUR920</a> в телеграм для уточнения деталей!';
                    teamList.appendChild(joinDiv);
                })
                .catch(error => {
                    console.error('Ошибка загрузки команды:', error);
                    teamList.innerHTML = '<p>Ошибка загрузки команды: файл не найден или повреждён</p>';
                });
        }
    });

    // Кнопка "Расширения"
    extensionsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('extensions-active')) {
            return;
        }
        closeOtherMenus('extensions-active');
        body.classList.add('extensions-active');
        extensionsBtn.classList.add('active');
        extensions.classList.remove('hide');
        const extensionsList = document.querySelector('.extensions-list');
        if (extensionsList) {
            extensionsList.innerHTML = '';

            const header = document.createElement('p');
            header.textContent = 'Все расширения ниже подходят для использования в TurboWarp и PenguinMode';
            header.style.color = 'white';
            header.style.fontFamily = "'Russo One', sans-serif";
            header.style.fontSize = '14px';
            header.style.textAlign = 'center';
            header.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.5)';
            header.style.marginBottom = '15px';
            extensionsList.appendChild(header);

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
        }
    });

    // Загрузка игр
    const loadGames = (file) => {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Файл ${file} не найден`);
                return response.text();
            })
            .then(data => {
                const games = data.split('\n\n').map(game => {
                    const lines = game.split('\n').map(line => line.trim()).filter(line => line);
                    const gameData = {};
                    lines.forEach(line => {
                        const [key, ...valueParts] = line.split('=');
                        const value = valueParts.join('=').trim().replace(/^"|"$/g, '');
                        gameData[key.trim()] = value || 'Не указано';
                    });
                    return gameData;
                });
                gamesData = games;
                applyFilters();
            })
            .catch(error => {
                console.error('Ошибка загрузки игр:', error);
                if (gamesList) {
                    gamesList.innerHTML = `<p>Ошибка загрузки игр: ${error.message}</p>`;
                }
            });
    };

    // Применение фильтров и сортировки
    const applyFilters = () => {
        filteredGames = gamesData;

        const year = yearFilter.value;
        if (year) {
            filteredGames = filteredGames.filter(game => game.Year && game.Year.includes(year));
        }

        const engine = engineFilter.value;
        if (engine && engine !== 'all') {
            filteredGames = filteredGames.filter(game => game.Engine === engine);
        }

        if (sortGames.value === 'name-asc') {
            filteredGames.sort((a, b) => (a.Name || '').localeCompare(b.Name || ''));
        } else if (sortGames.value === 'name-desc') {
            filteredGames.sort((a, b) => (b.Name || '').localeCompare(a.Name || ''));
        } else if (sortGames.value === 'year-asc') {
            filteredGames.sort((a, b) => (a.Year || '').localeCompare(b.Year || ''));
        } else if (sortGames.value === 'year-desc') {
            filteredGames.sort((a, b) => (b.Year || '').localeCompare(a.Year || ''));
        }

        currentPage = 1;
        displayGames();
    };

    // Отображение игр
    const displayGames = () => {
        if (!gamesList) return;
        gamesList.classList.remove('fade-in');
        void gamesList.offsetWidth; // Перезапускаем анимацию
        gamesList.classList.add('fade-in');

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
        closeOtherMenus('games-active');
        body.classList.add('games-active');
        gamesBtn.classList.add('active');
        games.classList.remove('hide');
        currentPage = 1;
        loadGames(currentCategory === 'horror' ? './HorrorGames.txt' : './OthersGames.txt');
    });

    // Переключение категорий игр
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

    // Загрузка утилит
    const loadUtils = () => {
        utilsList.classList.remove('fade-in');
        void utilsList.offsetWidth; // Перезапускаем анимацию
        utilsList.classList.add('fade-in');

        utilsList.innerHTML = '';

        const ourUtilsData = [
            { name: 'UNMiner Tool', link: 'https://github.com/Morunka/UNMiner-Tool' },
            { name: 'TS3-Music-Downloader', link: 'https://github.com/Morunka/TS3-Music-Downloader' }
        ];

        const otherUtilsData = [
            { name: 'Utility1', link: 'https://example.com/utility1' },
            { name: 'Utility2', link: 'https://example.com/utility2' },
            { name: 'Utility3', link: 'https://example.com/utility3' }
        ];

        if (currentUtilsCategory === 'our') {
            if (ourUtilsData.length === 0) {
                utilsList.innerHTML = '<p>Утилиты не найдены</p>';
            } else {
                ourUtilsData.forEach(utility => {
                    const utilItem = document.createElement('div');
                    utilItem.classList.add('utils-item');
                    utilItem.innerHTML = `
                        <a href="${utility.link}" class="telegram-link">${utility.name}</a>
                    `;
                    utilsList.appendChild(utilItem);
                });
            }
        } else {
            const otherUtilsText = document.createElement('p');
            otherUtilsText.classList.add('other-utils-text');
            otherUtilsText.innerHTML = otherUtilsData.map(utility => `<a href="${utility.link}" class="telegram-link">${utility.name}</a>`).join(' ');
            utilsList.appendChild(otherUtilsText);
        }
    };

    // Кнопка "Утилиты"
    utilsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('utils-active')) {
            return;
        }
        closeOtherMenus('utils-active');
        body.classList.add('utils-active');
        utilsBtn.classList.add('active');
        utils.classList.remove('hide');
        loadUtils();
    });

    // Переключение категорий утилит
    ourUtilsBtn.addEventListener('click', () => {
        if (currentUtilsCategory === 'our') return;
        currentUtilsCategory = 'our';
        ourUtilsBtn.classList.add('active');
        otherUtilsBtn.classList.remove('active');
        loadUtils();
    });

    otherUtilsBtn.addEventListener('click', () => {
        if (currentUtilsCategory === 'other') return;
        currentUtilsCategory = 'other';
        otherUtilsBtn.classList.add('active');
        ourUtilsBtn.classList.remove('active');
        loadUtils();
    });

    // Кнопки прокрутки
    const scrollTopBtn = document.getElementById('scroll-top');
    const scrollBottomBtn = document.getElementById('scroll-bottom');

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        console.warn('Кнопка scroll-top не найдена');
    }

    if (scrollBottomBtn) {
        scrollBottomBtn.addEventListener('click', () => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    } else {
        console.warn('Кнопка scroll-bottom не найдена');
    }
});
