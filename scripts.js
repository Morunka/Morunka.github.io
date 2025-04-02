// Прелоадер
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    if (preloader && body) {
        preloader.classList.add('hidden');
        body.classList.add('loaded');
    }
    
    // Запускаем часы и дату
    updateClock();
    setInterval(updateClock, 1000);
    
    // Определяем ОС и браузер пользователя
    detectOS();
    detectBrowser();
});

// Функция обновления времени и даты
function updateClock() {
    const now = new Date();
    
    // Обновляем время
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Обновляем дату
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        dateElement.textContent = `${day}/${month}/${year}`;
    }
}

// Функция для определения операционной системы
function detectOS() {
    const userAgent = navigator.userAgent;
    const osIcon = document.getElementById('os-icon');
    
    if (!osIcon) return;
    
    if (/Android/i.test(userAgent)) {
        osIcon.style.backgroundImage = "url('Android.png')";
        return "Android";
    } else if (/iPhone|iPad|iPod/i.test(userAgent) || /Mac OS/i.test(userAgent)) {
        osIcon.style.backgroundImage = "url('Apple.jpg')";
        return "Apple";
    } else if (/Win/i.test(userAgent)) {
        osIcon.style.backgroundImage = "url('Windows.png')";
        return "Windows";
    } else if (/Linux/i.test(userAgent)) {
        osIcon.style.backgroundImage = "url('Linux.png')";
        return "Linux";
    } else {
        osIcon.textContent = "Unknown Operation System";
        osIcon.style.backgroundImage = "none";
        osIcon.style.width = "auto";
        osIcon.style.height = "auto";
        osIcon.style.color = "white";
        osIcon.style.fontSize = "12px";
        osIcon.style.fontFamily = "'Orbitron', sans-serif";
        return "Unknown";
    }
}

// Функция для определения браузера
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browserName = "Unknown Browser";
    
    if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Mozilla Firefox";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        browserName = "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
        browserName = "Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
        browserName = "Microsoft Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Google Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari";
    } else if (userAgent.indexOf("YaBrowser") > -1) {
        browserName = "Yandex Browser";
    }
    
    const browserNameElement = document.getElementById('browser-name');
    if (browserNameElement) {
        browserNameElement.textContent = browserName;
    }
    
    return browserName;
}

// Функция для создания уменьшенной версии изображения Google
function createSmallGoogleIcon() {
    // Создаем новое изображение
    const img = new Image();
    img.onload = function() {
        // Создаем канвас для уменьшенного изображения
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Устанавливаем размер канваса (меньше оригинала)
        canvas.width = 24;
        canvas.height = 24;
        
        // Очищаем канвас
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Рисуем изображение в меньшем размере
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        
        // Получаем data URL
        const smallImageUrl = canvas.toDataURL('image/png');
        
        // Применяем к кнопке Google
        const googleButton = document.querySelector('[data-engine="google"]');
        if (googleButton) {
            googleButton.style.backgroundImage = `url('${smallImageUrl}')`;
            console.log('Применено уменьшенное изображение Google');
        }
    };
    
    // Загружаем оригинальное изображение
    img.src = './Google.jpg';
    img.onerror = function() {
        console.error('Не удалось загрузить изображение Google.jpg');
    };
}

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

    let currentCategory = 'horror';
    let gamesData = [];
    let filteredGames = [];
    let currentPage = 1;
    const gamesPerPage = 5;
    let currentUtilsCategory = 'our';

    // Сохранение состояния телеграм-меню
    let isTelegramMenuOpen = false;

    // Проверка на существование элементов
    if (!aboutBtn || !description || !linksBtn || !links || !docsBtn || !docs || !devBtn || !dev || !teamBtn || !team || !extensionsBtn || !extensions || !gamesBtn || !games || !horrorBtn || !othersBtn || !gamesList || !yearFilter || !engineFilter || !sortGames || !prevPageBtn || !nextPageBtn || !pageInfo || !utilsBtn || !utils || !ourUtilsBtn || !otherUtilsBtn || !utilsList || !body || !logo) {
        console.error('Один или несколько элементов не найдены в HTML');
        return;
    }

    // Пасхалка
    let clickCount = 0;
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            const easterEgg = document.querySelector('.easter-egg');
            easterEgg.classList.add('active');
            setTimeout(() => {
                easterEgg.classList.remove('active');
            }, 2500);
        }
    });

    // Функция для закрытия всех меню
    const closeOtherMenus = (activeClass) => {
        const menuClasses = ['active', 'links-active', 'docs-active', 'dev-active', 'team-active', 'extensions-active', 'games-active', 'utils-active'];
        menuClasses.forEach(cls => {
            if (cls !== activeClass) {
                body.classList.remove(cls);
            }
        });

        const containers = [description, links, docs, dev, team, extensions, games, utils];
        containers.forEach(container => {
            if (container === links) {
                // Для контейнера связей только добавляем класс hide, не трогая telegram-active
                container.classList.add('hide');
                container.classList.remove('show');
            } else {
            container.classList.add('hide');
            container.classList.remove('show');
            }
        });

        // Не меняем состояние телеграм-меню, оно должно сохраняться при любых переключениях

        const buttons = [aboutBtn, linksBtn, docsBtn, devBtn, teamBtn, extensionsBtn, gamesBtn, utilsBtn];
        buttons.forEach(btn => btn.classList.remove('active'));
    };

    // Функция для открытия раздела "О студии"
    const openSection = (section, button, activeClass) => {
        closeOtherMenus(activeClass);
        body.classList.add(activeClass);
        button.classList.add('active');
        
        // Скрываем все контейнеры
        [description, links, docs, dev, team, extensions, games, utils].forEach(cont => {
            cont.classList.remove('show');
            cont.classList.add('hide');
        });
        
        // Показываем нужный контейнер
        section.classList.remove('hide');
        // Мы не добавляем show для секций description и links,
        // так как у них собственная анимация через visibility и opacity
        if (section !== description && section !== links) {
            section.classList.add('show');
        }
    };

    // Открываем "О студии" сразу после загрузки
    openSection(description, aboutBtn, 'active');

    // При загрузке страницы активировать раздел "О студии"
    window.addEventListener('load', function() {
        openSection(description, aboutBtn, 'active');
        
        // Выравниваем кнопки категорий утилит по левому краю
        if (document.querySelector('.utils-header')) {
            document.querySelector('.utils-header').style.justifyContent = 'flex-start';
        }
    });

    // Обновленный обработчик для кнопки "О студии"
    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('active')) return;
        openSection(description, aboutBtn, 'active');
    });

    // Кнопка "Связи"
    linksBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('links-active')) return;
        
        openSection(links, linksBtn, 'links-active');
        
        // Применяем текущие размеры контейнера в зависимости от состояния телеграм-меню
        const isTelegramActive = linksRow.classList.contains('telegram-active');
        
        if (isTelegramActive) {
            // Если телеграм-меню открыто, устанавливаем размеры для открытого меню
            links.style.width = '450px';
            links.style.height = '300px';
            links.style.padding = '15px';
            // Убеждаемся, что кнопка телеграма отображается правильно
            telegramBtn.classList.add('back');
        } else {
            // Если телеграм-меню закрыто, устанавливаем обычные размеры
            links.style.width = '450px';
            links.style.height = '150px';
            links.style.padding = '15px';
        }
    });

    // Обновляем обработчик для телеграм кнопки
        telegramBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = linksRow.classList.contains('telegram-active');
        
        // Переключаем состояние
            linksRow.classList.toggle('telegram-active');
            telegramBtn.classList.toggle('back');
        
                if (isActive) {
            // Закрываем подменю
            links.style.width = '450px';
            links.style.height = '150px';
            links.style.padding = '15px';
            
            // Делаем плавный переход для отображения основных кнопок
            setTimeout(() => {
                // Показываем основные кнопки
                const mainIcons = document.querySelectorAll('.link-icon:not(.telegram)');
                mainIcons.forEach(icon => {
                    icon.style.display = 'inline-block';
                    icon.style.opacity = '0';
                    // Анимируем появление кнопок
                    setTimeout(() => {
                        icon.style.opacity = '1';
                        icon.style.transition = 'opacity 0.3s ease';
                    }, 50);
                });
            }, 100);
                } else {
            // Скрываем основные кнопки
            const mainIcons = document.querySelectorAll('.link-icon:not(.telegram)');
            mainIcons.forEach(icon => {
                icon.style.opacity = '0';
                icon.style.transition = 'opacity 0.3s ease';
            });
            
            // После анимации скрытия скрываем их полностью
            setTimeout(() => {
                mainIcons.forEach(icon => {
                    icon.style.display = 'none';
                });
                
                // Открываем подменю
                links.style.width = '450px';
                links.style.height = '320px';
                links.style.padding = '15px';
            }, 300);
        }
    });

    // Кнопка "Документы"
    docsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('docs-active')) return;
        openSection(docs, docsBtn, 'docs-active');
    });

    // Кнопка "Разработка"
    devBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('dev-active')) return;
        openSection(dev, devBtn, 'dev-active');

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
                console.error('Ошибка загрузки данных разработки:', error);
                const devInfo = document.querySelector('.dev-info');
                if (devInfo) {
                    devInfo.innerHTML = '<p>Ошибка загрузки данных разработки: ' + error.message + '</p>';
                }
            });
    });

    // Загрузка команды
    async function loadTeamMembers() {
        const teamList = document.querySelector('.team-list');
        if (teamList) {
            teamList.innerHTML = '';
            try {
                const response = await fetch('BRC-Team.txt');
                const data = await response.text();
                
                // Разбиваем файл на блоки по пустой строке
                const members = data.split('\n\n').filter(block => block.trim());
                
                members.forEach((memberBlock, index) => {
                    // Разбиваем блок на строки
                    const lines = memberBlock.split('\n');
                        const memberData = {};
                    
                    // Извлекаем данные каждого члена команды
                        lines.forEach(line => {
                        const equalPos = line.indexOf('=');
                        if (equalPos !== -1) {
                            const key = line.substring(0, equalPos).trim();
                            let value = line.substring(equalPos + 1).trim();
                            // Убираем кавычки вокруг значения, если они есть
                            value = value.replace(/^"/, '').replace(/"$/, '');
                            memberData[key] = value;
                        }
                    });

                    // Создаем карточку участника
                            const memberDiv = document.createElement('div');
                            memberDiv.classList.add('team-member');
                            memberDiv.innerHTML = `
                        <h3>${memberData.Username || 'Не указано'}</h3>
                        <p class="team-role">${memberData.UserDesc || 'Не указано'}</p>
                        <a href="${memberData.UserTelegramContact || '#'}" class="contact-icon" target="_blank" title="Написать в Telegram"></a>
                            `;
                            teamList.appendChild(memberDiv);

                            if (index < members.length - 1) {
                                const divider = document.createElement('hr');
                                divider.classList.add('team-divider');
                                teamList.appendChild(divider);
                            }
                        });
                
                    const joinDiv = document.createElement('p');
                    joinDiv.classList.add('team-join');
                    joinDiv.innerHTML = 'Если хотите присоединиться к нам, пишите <a href="https://t.me/MEOW_MUR920">@MEOW_MUR920</a> в телеграм для уточнения деталей!';
                    teamList.appendChild(joinDiv);
            } catch (error) {
                    console.error('Ошибка загрузки команды:', error);
                    teamList.innerHTML = '<p>Ошибка загрузки команды: ' + error.message + '</p>';
            }
        }
    }

    // Обновляем обработчик для команды
    teamBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('team-active')) return;
        openSection(team, teamBtn, 'team-active');
        loadTeamMembers();
    });

    // Кнопка "Расширения"
    extensionsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('extensions-active')) return;
        openSection(extensions, extensionsBtn, 'extensions-active');
    });

    // Загрузка игр
    const loadGames = (file) => {
        // Показываем сообщение о загрузке с белым текстом
        gamesList.innerHTML = '<p style="color: white; text-align: center; font-family: \'Russo One\', sans-serif; margin: 20px 0;">Загрузка игр...</p>';
        
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Файл ${file} не найден`);
                return response.text();
            })
            .then(data => {
                // Проверяем, что данные не пустые
                if (!data || data.trim() === '') {
                    throw new Error('Файл игр пустой');
                }
                
                const games = data.split('\n\n').filter(block => block.trim()).map(game => {
                    const lines = game.split('\n').map(line => line.trim()).filter(line => line);
                    const gameData = {};
                    lines.forEach(line => {
                        const equalPos = line.indexOf('=');
                        if (equalPos !== -1) {
                            const key = line.substring(0, equalPos).trim();
                            let value = line.substring(equalPos + 1).trim();
                            // Убираем кавычки вокруг значения, если они есть
                            value = value.replace(/^"/, '').replace(/"$/, '');
                        gameData[key.trim()] = value || 'Не указано';
                        }
                    });
                    return gameData;
                });
                
                // Проверяем, что есть данные после парсинга
                if (games.length === 0) {
                    throw new Error('Не удалось найти данные об играх в файле');
                }
                
                gamesData = games;
                applyFilters();
                
                // Логируем для отладки
                console.log(`Загружено ${games.length} игр из ${file}`);
            })
            .catch(error => {
                console.error('Ошибка загрузки игр:', error);
                gamesList.innerHTML = `<p style="color: white; text-align: center; font-family: 'Russo One', sans-serif; margin: 20px 0;">Ошибка загрузки игр: ${error.message}</p>`;
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

    // Отображение игр - упрощенная версия
    const displayGames = () => {
        if (!gamesList) return;

        // Очищаем содержимое
        gamesList.innerHTML = '';
        
        const start = (currentPage - 1) * gamesPerPage;
        const end = start + gamesPerPage;
        const paginatedGames = filteredGames.slice(start, end);

        if (paginatedGames.length === 0) {
            gamesList.innerHTML = '<p style="color: white; text-align: center; font-family: \'Russo One\', sans-serif; margin: 20px 0;">Игры не найдены</p>';
            prevPageBtn.disabled = true;
            nextPageBtn.disabled = true;
            pageInfo.textContent = 'Страница 0 из 0';
        } else {
            paginatedGames.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.classList.add('game-card');
                gameCard.style.backgroundImage = `url(${game.Image})`;
                
                // Создаем заголовок игры
                const gameHeader = document.createElement('div');
                gameHeader.classList.add('game-header');
                
                const gameTitle = document.createElement('h3');
                gameTitle.classList.add('game-title');
                gameTitle.textContent = game.Name;
                
                const gameMeta = document.createElement('div');
                gameMeta.classList.add('game-meta');
                
                const gameVersion = document.createElement('span');
                gameVersion.classList.add('game-version');
                gameVersion.textContent = `v${game.Version}`;
                
                const gameEngine = document.createElement('span');
                gameEngine.classList.add('game-engine');
                gameEngine.textContent = game.Engine;
                
                gameMeta.appendChild(gameVersion);
                gameMeta.appendChild(gameEngine);
                
                gameHeader.appendChild(gameTitle);
                gameHeader.appendChild(gameMeta);
                
                // Создаем описание игры
                const gameDesc = document.createElement('p');
                gameDesc.classList.add('game-description');
                gameDesc.textContent = game.Desc;
                
                // Создаем подвал игры
                const gameFooter = document.createElement('div');
                gameFooter.classList.add('game-footer');
                
                const gamePlayBtn = document.createElement('a');
                gamePlayBtn.classList.add('game-play-btn');
                gamePlayBtn.href = game.Link;
                gamePlayBtn.textContent = 'Играть';
                
                const gameYear = document.createElement('span');
                gameYear.classList.add('game-year');
                gameYear.textContent = game.Year;
                
                gameFooter.appendChild(gamePlayBtn);
                gameFooter.appendChild(gameYear);
                
                // Собираем все вместе
                gameCard.appendChild(gameHeader);
                gameCard.appendChild(gameDesc);
                gameCard.appendChild(gameFooter);
                
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
        openSection(games, gamesBtn, 'games-active');
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
            { name: 'VPNFreePro', link: 'https://chromewebstore.google.com/detail/vpn-freepro-%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D1%8B%D0%B9-vp/bibjcjfmgapbfoljiojpipaooddpkpai' },
            { name: 'Stylish', link: 'https://chromewebstore.google.com/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe' },
            { name: 'GeminiAPIKeys', link: 'https://aistudio.google.com/apikey' },
            { name: 'Scratch', link: 'https://scratch.mit.edu/projects/editor/' },
            { name: 'TurboWarp', link: 'https://turbowarp.org/editor' },
            { name: 'PenguinMode', link: 'https://studio.penguinmod.com/editor.html' },
            { name: 'DinoMode', link: 'https://dinosaurmod.github.io/' },
            { name: 'XAIStatus', link: 'https://status.x.ai/' },
            { name: 'PublichVectors', link: 'https://publicdomainvectors.org' },
            { name: 'HowToInstallLinuxArch', link: 'https://www.youtube.com/watch?v=n2oLwVWxPp4' },
            { name: 'Steam', link: 'https://store.steampowered.com/' },
            { name: 'DownloadTheSIms3GoldEdition', link: 'TS3-DownLink.txt' },
            { name: 'DownloadSimcity5Xatab', link: 'SimCity5-DownLink.txt' },
            { name: 'DownloadTerraria', link: 'Terraria-DownLink.txt' },
            { name: 'DownloadTheSims3AddonLoader', link: 'Sims3AddonLoader.exe' },
            { name: 'MyAccountGoogle', link: 'https://myaccount.google.com/' }
        ];

        const ourUtilsData = [
            { name: 'UNMiner Tool', link: 'https://telegra.ph/How-to-user-UNMiner-Tool-03-25' },
            { name: 'TS3-Music-Downloader', link: 'https://telegra.ph/How-to-use-TS3-Music-Downloader-03-25' }
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
            const otherUtilsText = document.createElement('div');
            otherUtilsText.classList.add('other-utils-text');
            
            otherUtilsData.forEach(utility => {
                const link = document.createElement('a');
                link.href = utility.link;
                link.textContent = utility.name;
                otherUtilsText.appendChild(link);
            });
            
            utilsList.appendChild(otherUtilsText);
        }
    };

    // Кнопка "Утилиты"
    utilsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('utils-active')) return;
        openSection(utils, utilsBtn, 'utils-active');
        
        // Выравниваем кнопки категорий по левому краю
        if (document.querySelector('.utils-header')) {
            document.querySelector('.utils-header').style.justifyContent = 'flex-start';
        }
        
        loadUtils();
    });

    // Переключение категорий утилит
    ourUtilsBtn.addEventListener('click', () => {
        if (currentUtilsCategory === 'our') return;
        currentUtilsCategory = 'our';
        ourUtilsBtn.classList.add('active');
        otherUtilsBtn.classList.remove('active');
        
        // Выравниваем кнопки по левому краю
        document.querySelector('.utils-header').style.justifyContent = 'flex-start';
        
        loadUtils();
    });

    otherUtilsBtn.addEventListener('click', () => {
        if (currentUtilsCategory === 'other') return;
        currentUtilsCategory = 'other';
        otherUtilsBtn.classList.add('active');
        ourUtilsBtn.classList.remove('active');
        
        // Выравниваем кнопки по левому краю
        document.querySelector('.utils-header').style.justifyContent = 'flex-start';
        
        loadUtils();
    });

    // Функция для скроллинга
    const scrollPage = (direction) => {
        const scrollStep = direction === 'up' ? 300 : 150; // Для вниз прокручиваем меньше
        const currentScroll = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        
        if (direction === 'up') {
            // Вверх
            window.scrollTo({
                top: Math.max(0, currentScroll - scrollStep),
                behavior: 'smooth'
        });
    } else {
            // Вниз - всегда добавляем к текущей позиции
            window.scrollTo({
                top: currentScroll + scrollStep,
                behavior: 'smooth'
            });
        }
    };

    // Обработчики для кнопок скроллинга
    document.querySelector('.scroll-up').addEventListener('click', () => scrollPage('up'));
    document.querySelector('.scroll-down').addEventListener('click', () => scrollPage('down'));

    // Анимация логотипа
    let logoAnimation = setInterval(() => {
        logo.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px) scale(1)`;
    }, 50);

    // Поисковая система
    let currentSearchEngine = 'google';
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    const searchEngines = {
        google: 'https://www.google.com/search?q=',
        brave: 'https://search.brave.com/search?q=',
        yandex: 'https://yandex.ru/search/?text='
    };

    // Объект с путями к изображениям поисковых систем
    const searchEngineIcons = {
        'google': './Google.jpg',
        'brave': './Brave.png',
        'yandex': './Yandex.png'
    };

    // Применяем иконки поисковых систем
    document.querySelectorAll('.search-engine-btn').forEach(btn => {
        const engine = btn.dataset.engine;
        if (engine && searchEngineIcons[engine]) {
            btn.style.backgroundImage = `url('${searchEngineIcons[engine]}')`;
            btn.style.backgroundSize = 'cover';
            btn.style.backgroundPosition = 'center';
            console.log(`Установлен фон для ${engine}: url('${searchEngineIcons[engine]}')`);
        }
    });

    // Проверка загрузки иконок после загрузки страницы
    window.addEventListener('load', function() {
        setTimeout(() => {
            // Установка изображений для кнопок поисковых систем
            document.querySelectorAll('.search-engine-btn').forEach(btn => {
                const engine = btn.dataset.engine;
                if (engine && searchEngineIcons[engine]) {
                    btn.style.backgroundImage = `url('${searchEngineIcons[engine]}')`;
                }
            });
            
            // Устанавливаем Google как поисковую систему по умолчанию
            const googleButton = document.querySelector('[data-engine="google"]');
            if (googleButton) {
                googleButton.classList.add('active');
                currentSearchEngine = 'google';
            }
        }, 300);
    });

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            window.open(searchEngines[currentSearchEngine] + encodeURIComponent(query), '_blank');
        }
    });

    // Обработчики для рекламных блоков
    const telegramApiAd = document.querySelector('.telegram-api-ad');
    if (telegramApiAd) {
        telegramApiAd.addEventListener('click', () => {
            window.open('https://github.com/Morunka/Telegram-API-TurboWarp-Pack-Edition', '_blank');
        });
    }

    const braveAd = document.querySelector('.brave-ad');
    if (braveAd) {
        braveAd.addEventListener('click', () => {
            window.open('https://brave.com', '_blank');
        });
    }

    const clipAd = document.querySelector('.clip-ad');
    if (clipAd) {
        clipAd.addEventListener('click', () => {
            window.open('https://t.me/BRSTasks', '_blank');
        });
    }

    // Устанавливаем одинаковый размер для всех кнопок
    document.querySelectorAll('.search-engine-btn').forEach(btn => {
        btn.style.width = '30px';
        btn.style.height = '30px';
    });
    
    // Добавляем обработчики клика для кнопок поисковых систем
    document.querySelectorAll('.search-engine-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const engine = btn.dataset.engine;
            if (engine) {
                // Обновляем текущую поисковую систему
                currentSearchEngine = engine;
                
                // Убираем активный класс у всех кнопок
                document.querySelectorAll('.search-engine-btn').forEach(b => {
                    b.classList.remove('active');
                });
                
                // Добавляем активный класс выбранной кнопке
                btn.classList.add('active');
            }
        });
    });
});
