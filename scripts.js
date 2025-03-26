window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    if (preloader && body) {
        preloader.classList.add('hidden');
        body.classList.add('loaded');
    }
});

document.addEventListener('DOMContentLoaded', () => {
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

    let currentCategory = 'horror';
    let gamesData = [];
    let filteredGames = [];
    let currentPage = 1;
    const gamesPerPage = 5;
    let currentUtilsCategory = 'our';

    if (!aboutBtn || !description || !linksBtn || !links || !docsBtn || !docs || !devBtn || !dev || !teamBtn || !team || !extensionsBtn || !extensions || !gamesBtn || !games || !horrorBtn || !othersBtn || !gamesList || !yearFilter || !engineFilter || !sortGames || !prevPageBtn || !nextPageBtn || !pageInfo || !utilsBtn || !utils || !ourUtilsBtn || !otherUtilsBtn || !utilsList || !body || !logo) {
        console.error('Один или несколько элементов не найдены в HTML');
        return;
    }

    let clickCount = 0;
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5 && easterEgg) {
            easterEgg.classList.add('active');
            console.log('Пасхалка активирована');
            setTimeout(() => {
                easterEgg.classList.remove('active');
                console.log('Пасхалка скрыта');
            }, 2500);
        }
    });

    const closeOtherMenus = (activeClass) => {
        const menuClasses = ['active', 'links-active', 'docs-active', 'dev-active', 'team-active', 'extensions-active', 'games-active', 'utils-active'];
        menuClasses.forEach(cls => {
            if (cls !== activeClass) {
                body.classList.remove(cls);
            }
        });

        const containers = [description, links, docs, dev, team, extensions, games, utils];
        containers.forEach(container => {
            container.classList.add('hide');
            container.classList.remove('show');
        });

        if (linksRow) {
            linksRow.classList.remove('telegram-active');
            const telegramLinks = linksRow.querySelector('.telegram-links');
            if (telegramLinks) {
                telegramLinks.style.display = 'none';
                links.style.width = '320px';
                links.style.height = '70px';
                links.style.minHeight = '70px';
                links.style.padding = '15px';
            }
        }
        if (telegramBtn) telegramBtn.classList.remove('back');

        const buttons = [aboutBtn, linksBtn, docsBtn, devBtn, teamBtn, extensionsBtn, gamesBtn, utilsBtn];
        buttons.forEach(btn => btn.classList.remove('active'));
    };

    const openAboutSection = () => {
        closeOtherMenus('active');
        body.classList.add('active');
        aboutBtn.classList.add('active');
        description.classList.remove('hide');
        description.classList.add('show');
    };

    openAboutSection();

    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('active')) return;
        openAboutSection();
    });

    linksBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('links-active')) return;
        closeOtherMenus('links-active');
        body.classList.add('links-active');
        linksBtn.classList.add('active');
        links.classList.remove('hide');
        links.classList.add('show');
    });

    if (telegramBtn && linksRow) {
        telegramBtn.addEventListener('click', (e) => {
            e.preventDefault();
            linksRow.classList.toggle('telegram-active');
            telegramBtn.classList.toggle('back');
            const telegramLinks = linksRow.querySelector('.telegram-links');
            if (telegramLinks) {
                telegramLinks.style.display = linksRow.classList.contains('telegram-active') ? 'flex' : 'none';
            }
        });
    }

    docsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('docs-active')) return;
        closeOtherMenus('docs-active');
        body.classList.add('docs-active');
        docsBtn.classList.add('active');
        docs.classList.remove('hide');
        docs.classList.add('show');
    });

    devBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('dev-active')) return;
        closeOtherMenus('dev-active');
        body.classList.add('dev-active');
        devBtn.classList.add('active');
        dev.classList.remove('hide');
        dev.classList.add('show');

        const devInfo = document.querySelector('.dev-info');
        if (devInfo) {
            devInfo.innerHTML = `
                <h2>Разработка</h2>
                <p>Мы занимаемся разработкой игр, приложений и утилит.</p>
                <a href="#" class="more-btn">Подробнее</a>
            `;
        }
    });

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
                    console.log('Содержимое BRC-Team.txt:', data);
                    const members = data.split('\n\n').map(member => {
                        const lines = member.split('\n').map(line => line.trim()).filter(line => line);
                        const memberData = {};
                        lines.forEach(line => {
                            const [key, ...valueParts] = line.split('=');
                            const value = valueParts.join('=').trim().replace(/^"|"$/g, '');
                            memberData[key.trim()] = value || 'Не указано';
                        });
                        return memberData;
                    }).filter(member => member.Username);
                    console.log('Обработанные участники:', members);

                    if (members.length === 0) {
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
                    joinDiv.innerHTML = 'Если хотите присоединиться к нам, пишите <a href="https://t.me/MEOW_MUR920">@MEOW_MUR920</a> в телеграм для уточнения деталей!';
                    teamList.appendChild(joinDiv);
                })
                .catch(error => {
                    console.error('Ошибка загрузки команды:', error);
                    teamList.innerHTML = '<p>Ошибка загрузки команды: ' + error.message + '</p>';
                    const joinDiv = document.createElement('p');
                    joinDiv.classList.add('team-join');
                    joinDiv.innerHTML = 'Если хотите присоединиться к нам, пишите <a href="https://t.me/MEOW_MUR920">@MEOW_MUR920</a> в телеграм для уточнения деталей!';
                    teamList.appendChild(joinDiv);
                });
        }
    });

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
            extensionsList.innerHTML = `
                <p>Все расширения ниже подходят для использования в TurboWarp и PenguinMod</p>
                <a href="https://t.me/By_ROlil_Studio/5" class="telegram-link">BRC-Extension</a>
                <a href="https://t.me/By_ROlil_Studio/6" class="telegram-link">BRC-Extension 2</a>
            `;
        }
    });

    const loadGames = () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        fetch('./BRC-Games.txt', { signal: controller.signal })
            .then(response => {
                clearTimeout(timeoutId);
                if (!response.ok) throw new Error('Файл BRC-Games.txt не найден');
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
                }).filter(game => game.GameName);
                filterAndSortGames();
            })
            .catch(error => {
                console.error('Ошибка загрузки игр:', error);
                gamesList.innerHTML = '<p>Ошибка загрузки игр: ' + error.message + '</p>';
            });
    };

    const filterAndSortGames = () => {
        filteredGames = gamesData.filter(game => {
            const matchesCategory = currentCategory === 'horror' ? game.GameCategory === 'Horror' : game.GameCategory !== 'Horror';
            const matchesYear = yearFilter.value ? game.GameYear === yearFilter.value : true;
            const matchesEngine = engineFilter.value !== 'all' ? game.GameEngine === engineFilter.value : true;
            return matchesCategory && matchesYear && matchesEngine;
        });

        const sortValue = sortGames.value;
        filteredGames.sort((a, b) => {
            if (sortValue === 'name-asc') return a.GameName.localeCompare(b.GameName);
            if (sortValue === 'name-desc') return b.GameName.localeCompare(a.GameName);
            if (sortValue === 'year-asc') return a.GameYear - b.GameYear;
            if (sortValue === 'year-desc') return b.GameYear - a.GameYear;
            return 0;
        });

        currentPage = 1;
        displayGames();
    };

    const displayGames = () => {
        const start = (currentPage - 1) * gamesPerPage;
        const end = start + gamesPerPage;
        const paginatedGames = filteredGames.slice(start, end);

        gamesList.innerHTML = '';
        if (paginatedGames.length === 0) {
            gamesList.innerHTML = '<p>Игры отсутствуют</p>';
        } else {
            paginatedGames.forEach(game => {
                const cleanGameName = (game.GameName || 'Не указано').replace(/["':]/g, '');
                const gameCard = document.createElement('div');
                gameCard.classList.add('game-card');
                gameCard.style.backgroundImage = `url('${game.GameImage || ''}')`;
                gameCard.innerHTML = `
                    <div class="game-header">
                        <h3 class="game-title">${cleanGameName}</h3>
                        <div class="game-meta">
                            <span class="game-version">${game.GameVersion || 'Не указано'}</span>
                            <span class="game-engine">${game.GameEngine || 'Не указано'}</span>
                        </div>
                    </div>
                    <p class="game-description">${game.GameDesc || 'Описание отсутствует'}</p>
                    <div class="game-footer">
                        <a href="${game.GameLink || '#'}" class="game-play-btn">Играть</a>
                        <span class="game-year">${game.GameYear || 'Не указано'}</span>
                    </div>
                `;
                gamesList.appendChild(gameCard);
            });
        }

        const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
        pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        gamesList.classList.add('fade-in');
    };

    gamesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('games-active')) return;
        closeOtherMenus('games-active');
        body.classList.add('games-active');
        gamesBtn.classList.add('active');
        games.classList.remove('hide');
        games.classList.add('show');
        loadGames();
    });

    horrorBtn.addEventListener('click', () => {
        if (currentCategory === 'horror') return;
        currentCategory = 'horror';
        horrorBtn.classList.add('active');
        othersBtn.classList.remove('active');
        filterAndSortGames();
    });

    othersBtn.addEventListener('click', () => {
        if (currentCategory === 'others') return;
        currentCategory = 'others';
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

    const loadUtils = () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        fetch('./BRC-Utils.txt', { signal: controller.signal })
            .then(response => {
                clearTimeout(timeoutId);
                if (!response.ok) throw new Error('Файл BRC-Utils.txt не найден');
                return response.text();
            })
            .then(data => {
                const utilsData = data.split('\n\n').map(item => {
                    const lines = item.split('\n').map(line => line.trim()).filter(line => line);
                    const utilData = {};
                    lines.forEach(line => {
                        const [key, ...valueParts] = line.split('=');
                        const value = valueParts.join('=').trim().replace(/^"|"$/g, '');
                        utilData[key.trim()] = value || 'Не указано';
                    });
                    return utilData;
                }).filter(item => item.UtilName);
                displayUtils(utilsData);
            })
            .catch(error => {
                console.error('Ошибка загрузки утилит:', error);
                utilsList.innerHTML = '<p>Ошибка загрузки утилит: ' + error.message + '</p>';
            });
    };

    const displayUtils = (utilsData) => {
        utilsList.innerHTML = '';
        if (currentUtilsCategory === 'our') {
            const ourUtils = utilsData.filter(item => item.UtilType === 'Our');
            if (ourUtils.length === 0) {
                utilsList.innerHTML = '<p>Утилиты отсутствуют</p>';
            } else {
                ourUtils.forEach(item => {
                    const cleanUtilName = (item.UtilName || 'Не указано').replace(/["':]/g, '');
                    const utilItem = document.createElement('div');
                    utilItem.classList.add('utils-item');
                    utilItem.innerHTML = `
                        <p>${cleanUtilName}</p>
                        <a href="${item.UtilLink || '#'}" class="telegram-link">Скачать</a>
                    `;
                    utilsList.appendChild(utilItem);
                });
            }
        } else {
            utilsList.innerHTML = `
                <p class="other-utils-text">
                    Мы рекомендуем вам следующие утилиты: 
                    <a href="https://example.com/notepad" class="telegram-link">Notepad++</a>
                    <a href="https://example.com/vscode" class="telegram-link">VS Code</a>
                    <a href="https://example.com/audacity" class="telegram-link">Audacity</a>
                </p>
            `;
        }
        utilsList.classList.add('fade-in');
    };

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

    const scrollUpBtn = document.querySelector('.scroll-up');
    const scrollDownBtn = document.querySelector('.scroll-down');

    if (scrollUpBtn && scrollDownBtn) {
        scrollUpBtn.addEventListener('click', () => {
            window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        });

        scrollDownBtn.addEventListener('click', () => {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        });
    }
});
