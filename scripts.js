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
    const linksRow = document.querySelector('.links-row');
    const logo = document.querySelector('h1');
    const easterEgg = document.querySelector('.easter-egg');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchEngines = document.querySelectorAll('.search-engine');

    let currentCategory = 'horror';
    let gamesData = [];
    let filteredGames = [];
    let currentPage = 1;
    const gamesPerPage = 5;
    let currentUtilsCategory = 'our';
    let selectedEngine = 'brave';

    // Проверка на существование элементов
    if (!aboutBtn || !description || !linksBtn || !links || !docsBtn || !docs || !devBtn || !dev || !teamBtn || !team || !extensionsBtn || !extensions || !gamesBtn || !games || !horrorBtn || !othersBtn || !gamesList || !yearFilter || !engineFilter || !sortGames || !prevPageBtn || !nextPageBtn || !pageInfo || !utilsBtn || !utils || !ourUtilsBtn || !otherUtilsBtn || !utilsList || !body || !logo || !searchInput || !searchBtn) {
        console.error('Один или несколько элементов не найдены в HTML');
        return;
    }

    // Анимация логотипа (голограмма)
    let logoMove = 0;
    setInterval(() => {
        logoMove = (logoMove + 0.05) % 10;
        logo.style.transform = `translateY(${Math.sin(logoMove) * 2}px)`;
    }, 50);

    // Пасхалка
    let clickCount = 0;
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5 && easterEgg) {
            easterEgg.classList.add('active');
            console.log('Пасхалка активирована');
            setTimeout(() => easterEgg.classList.remove('active'), 2500);
        }
    });

    // Функция для закрытия всех меню
    const closeOtherMenus = (activeClass) => {
        const menuClasses = ['active', 'links-active', 'docs-active', 'dev-active', 'team-active', 'extensions-active', 'games-active', 'utils-active'];
        menuClasses.forEach(cls => {
            if (cls !== activeClass) body.classList.remove(cls);
        });

        const containers = [description, links, docs, dev, team, extensions, games, utils];
        containers.forEach(container => {
            container.classList.add('hide');
            container.classList.remove('show');
        });

        if (linksRow) linksRow.classList.remove('telegram-active');
        if (telegramBtn) telegramBtn.classList.remove('back');
        const telegramLinks = linksRow?.querySelector('.telegram-links');
        if (telegramLinks) telegramLinks.style.display = 'none';

        const buttons = [aboutBtn, linksBtn, docsBtn, devBtn, teamBtn, extensionsBtn, gamesBtn, utilsBtn];
        buttons.forEach(btn => btn.classList.remove('active'));
    };

    // Функция для открытия раздела "О студии"
    const openAboutSection = () => {
        closeOtherMenus('active');
        body.classList.add('active');
        aboutBtn.classList.add('active');
        description.classList.remove('hide');
        description.classList.add('show');
    };

    // Открываем "О студии" сразу после загрузки
    openAboutSection();

    // Кнопка "О студии"
    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('active')) return;
        openAboutSection();
    });

    // Кнопка "Связи"
    linksBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('links-active')) return;
        closeOtherMenus('links-active');
        body.classList.add('links-active');
        linksBtn.classList.add('active');
        links.classList.remove('hide');
        links.classList.add('show');
        links.style.width = '450px'; // Увеличенная ширина
        links.style.height = '70px';
        links.style.padding = '10px';
    });

    // Подменю Telegram
    if (telegramBtn && linksRow) {
        const telegramLinks = linksRow.querySelector('.telegram-links');
        if (telegramLinks) telegramLinks.style.display = 'none';

        telegramBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = linksRow.classList.contains('telegram-active');
            linksRow.classList.toggle('telegram-active');
            telegramBtn.classList.toggle('back');
            if (telegramLinks) {
                if (isActive) {
                    telegramLinks.style.display = 'none';
                    links.style.width = '450px';
                    links.style.height = '70px';
                    links.style.minHeight = '70px';
                    links.style.padding = '10px';
                } else {
                    telegramLinks.style.display = 'flex';
                    links.style.width = '650px';
                    links.style.height = 'auto';
                    links.style.minHeight = '200px';
                    links.style.padding = '20px';
                }
            }
        });
    }

    // Кнопка "Документы"
    docsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('docs-active')) return;
        closeOtherMenus('docs-active');
        body.classList.add('docs-active');
        docsBtn.classList.add('active');
        docs.classList.remove('hide');
        docs.classList.add('show');
    });

    // Кнопка "Разработка"
    devBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('dev-active')) return;
        closeOtherMenus('dev-active');
        body.classList.add('dev-active');
        devBtn.classList.add('active');
        dev.classList.remove('hide');
        dev.classList.add('show');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        fetch('./DevelopingGameProc.txt', { signal: controller.signal })
            .then(response => {
                clearTimeout(timeoutId);
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
                const devInfo = document.querySelector('.dev-info');
                if (devInfo) devInfo.innerHTML = `<p>Ошибка загрузки данных: ${error.message}</p>`;
            });
    });

    // Кнопка "Команда"
    teamBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('team-active')) return;
        closeOtherMenus('team-active');
        body.classList.add('team-active');
        teamBtn.classList.add('active');
        team.classList.remove('hide');
        team.classList.add('show');

        const teamList = document.querySelector('.team-list');
        if (teamList) {
            teamList.innerHTML = '';
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            fetch('./BRC-Team.txt', { signal: controller.signal })
                .then(response => {
                    clearTimeout(timeoutId);
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
                    if (members.length === 0 || !members[0].Username) {
                        teamList.innerHTML = '<p>Команда отсутствует</p>';
                    } else {
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
                    }
                    const joinDiv = document.createElement('p');
                    joinDiv.classList.add('team-join');
                    joinDiv.innerHTML = 'Хотите присоединиться? Пишите <a href="https://t.me/MEOW_MUR920">@MEOW_MUR920</a> в Telegram!';
                    teamList.appendChild(joinDiv);
                })
                .catch(error => {
                    teamList.innerHTML = `<p>Ошибка загрузки команды: ${error.message}</p>`;
                    const joinDiv = document.createElement('p');
                    joinDiv.classList.add('team-join');
                    joinDiv.innerHTML = 'Хотите присоединиться? Пишите <a href="https://t.me/MEOW_MUR920">@MEOW_MUR920</a> в Telegram!';
                    teamList.appendChild(joinDiv);
                });
        }
    });

    // Кнопка "Расширения"
    extensionsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('extensions-active')) return;
        closeOtherMenus('extensions-active');
        body.classList.add('extensions-active');
        extensionsBtn.classList.add('active');
        extensions.classList.remove('hide');
        extensions.classList.add('show');

        const extensionsList = document.querySelector('.extensions-list');
        if (extensionsList) {
            extensionsList.innerHTML = '<p style="color: white; font-family: \'Russo One\', sans-serif; font-size: 14px; text-align: center; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); margin-bottom: 15px;">Все расширения подходят для TurboWarp и PenguinMod</p>';
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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        fetch(file, { signal: controller.signal })
            .then(response => {
                clearTimeout(timeoutId);
                if (!response.ok) throw new Error(`Файл ${file} не найден`);
                return response.text();
            })
            .then(data => {
                gamesData = data.split('\n\n').map(game => {
                    const lines = game.split('\n').map(line => line.trim()).filter(line => line);
                    const gameData = {};
                    lines.forEach(line => {
                        const [key, ...valueParts] = line.split('=');
                        const value = valueParts.join('=').trim().replace(/^"|"$/g, '');
                        gameData[key.trim()] = value || 'Не указано';
                    });
                    return gameData;
                });
                applyFilters();
            })
            .catch(error => {
                if (gamesList) gamesList.innerHTML = `<p>Ошибка загрузки игр: ${error.message}</p>`;
            });
    };

    // Применение фильтров и сортировки
    const applyFilters = () => {
        filteredGames = gamesData;

        const year = yearFilter.value;
        if (year) filteredGames = filteredGames.filter(game => game.Year && game.Year.includes(year));

        const engine = engineFilter.value;
        if (engine && engine !== 'all') filteredGames = filteredGames.filter(game => game.Engine === engine);

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
        void gamesList.offsetWidth;
        gamesList.classList.add('fade-in');

        gamesList.innerHTML = '';
        const start = (currentPage - 1) * gamesPerPage;
        const end = start + gamesPerPage;
        const paginatedGames = filteredGames.slice(start, end);

        if (paginatedGames.length === 0) {
            gamesList.innerHTML = '<p>Игры не найдены</p>';
            prevPageBtn.disabled = true;
            nextPageBtn.disabled = true;
            pageInfo.textContent = 'Страница 0 из 0';
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

            const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
            pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === totalPages;
        }
    };

    // Кнопка "Игры"
    gamesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('games-active')) return;
        closeOtherMenus('games-active');
        body.classList.add('games-active');
        gamesBtn.classList.add('active');
        games.classList.remove('hide');
        games.classList.add('show');
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
        void utilsList.offsetWidth;
        utilsList.classList.add('fade-in');

        utilsList.innerHTML = '';

        const ourUtilsData = [
            { name: 'UNMiner Tool', link: 'https://telegra.ph/How-to-user-UNMiner-Tool-03-25' },
            { name: 'TS3-Music-Downloader', link: 'https://telegra.ph/How-to-use-TS3-Music-Downloader-03-25' }
        ];

        const otherUtilsData = [
            { name: 'WorldVector', link: 'https://worldvectorlogo.com/' },
            { name: 'ApihostVoice', link: 'https://apihost.ru/voice' },
            { name: 'Apihost', link: 'https://apihost.ru/' },
            { name: 'Onedrive', link: 'https://onedrive.live.com/' },
            { name: 'DeepL', link: 'https://www.deepl.com' },
            { name: 'Convertio', link: 'https://convertio.co' },
            { name: 'TGStatBRC', link: 'https://tgstat.com/ru/channel/@By_RORlil#' },
            { name: 'TGStat', link: 'https://tgstat.com' },
            { name: 'LinuxArchDownload', link: 'https://archlinux.org/download/' },
            { name: 'Pixabay', link: 'https://pixabay.com/illustrations' },
            { name: 'MSKLC', link: 'https://www.microsoft.com/en-us/download/details.aspx?id=102134' },
            { name: 'HTMLIQTest', link: 'https://www.w3schools.com/html' },
            { name: 'InfinityFree', link: 'https://dash.infinityfree.com' },
            { name: 'PCMan', link: 'https://www.thepcmanwebsite.com' },
            { name: 'Github', link: 'https://github.com' },
            { name: 'WindowsThemesDownload', link: 'https://windd.info' },
            { name: 'WindowsThemes', link: 'https://windd.info/themes/free.html' },
            { name: 'SoftPortal', link: 'https://www.softportal.com' },
            { name: 'GameJolt', link: 'https://gamejolt.com' },
            { name: 'PenguinModeDesktop', link: 'https://github.com/PenguinMod/penguinmod.github.io' },
            { name: 'Node.js', link: 'https://nodejs.org/uk' },
            { name: 'GeminiGoogleAI', link: 'https://ai.google.dev/gemini-api' },
            { name: 'VPNFreePro', link: 'https://chromewebstore.google.com/detail/vpn-freepro-бесплатный-vp/bibjcjfmgapbfoljiojpipaooddpkpai' },
            { name: 'Stylish', link: 'https://chromewebstore.google.com/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe' },
            { name: 'GeminiAPIKeys', link: 'https://aistudio.google.com/apikey' },
            { name: 'Scratch', link: 'https://scratch.mit.edu/projects/editor/' },
            { name: 'TurboWarp', link: 'https://turbowarp.org/editor' },
            { name: 'PenguinMode', link: 'https://studio.penguinmod.com/editor.html' },
            { name: 'DinoMode', link: 'https://dinosaurmod.github.io/' },
            { name: 'XAIStatus', link: 'https://status.x.ai/' },
            { name: 'PublichVectors', link: 'https://publicdomainvectors.org' },
            { name: 'HowToInstallLinuxArch', link: 'https://www.youtube.com/watch?v=n2oLwVWxPp4' }
        ];

        if (currentUtilsCategory === 'our') {
            ourUtilsData.forEach(utility => {
                const utilItem = document.createElement('div');
                utilItem.classList.add('utils-item');
                utilItem.innerHTML = `<a href="${utility.link}" class="telegram-link">${utility.name}</a>`;
                utilsList.appendChild(utilItem);
            });
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
        if (body.classList.contains('utils-active')) return;
        closeOtherMenus('utils-active');
        body.classList.add('utils-active');
        utilsBtn.classList.add('active');
        utils.classList.remove('hide');
        utils.classList.add('show');
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
    const scrollStep = 300;
    const scrollTopBtn = document.querySelector('.scroll-up');
    const scrollBottomBtn = document.querySelector('.scroll-down');

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 0) {
                window.scrollTo({
                    top: Math.max(0, currentScroll - scrollStep),
                    behavior: 'smooth'
                });
            }
        });
    }

    if (scrollBottomBtn) {
        scrollBottomBtn.addEventListener('click', () => {
            const currentScroll = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            if (currentScroll < maxScroll) {
                window.scrollTo({
                    top: Math.min(maxScroll, currentScroll + scrollStep),
                    behavior: 'smooth'
                });
            }
        });
    }

    // Поиск
    searchEngines.forEach(engine => {
        engine.addEventListener('click', () => {
            searchEngines.forEach(e => e.classList.remove('active'));
            engine.classList.add('active');
            selectedEngine = engine.dataset.engine;
        });
    });

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            let url;
            switch (selectedEngine) {
                case 'brave': url = `https://search.brave.com/search?q=${encodeURIComponent(query)}`; break;
                case 'google': url = `https://www.google.com/search?q=${encodeURIComponent(query)}`; break;
                case 'yandex': url = `https://yandex.com/search/?text=${encodeURIComponent(query)}`; break;
            }
            window.open(url, '_blank');
        }
    });
});
