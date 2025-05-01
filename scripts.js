// Глобальные переменные
let isTelegramMenuOpen = false;

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

// Определение ОС
function detectOS() {
    const userAgent = window.navigator.userAgent;
    let osName = 'Unknown OS';
    let osIcon = '';

    if (userAgent.indexOf('Windows') !== -1) {
        osName = 'Windows';
        osIcon = 'https://img.icons8.com/color/48/000000/windows-10.png';
    } else if (userAgent.indexOf('Mac') !== -1) {
        osName = 'MacOS';
        osIcon = 'https://img.icons8.com/color/48/000000/mac-os.png';
    } else if (userAgent.indexOf('Linux') !== -1) {
        osName = 'Linux';
        osIcon = 'https://img.icons8.com/color/48/000000/linux.png';
    } else if (userAgent.indexOf('Android') !== -1) {
        osName = 'Android';
        osIcon = 'https://img.icons8.com/color/48/000000/android-os.png';
    } else if (userAgent.indexOf('iOS') !== -1 || userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) {
        osName = 'iOS';
        osIcon = 'https://img.icons8.com/color/48/000000/ios-logo.png';
    }

    const osIconElement = document.getElementById('os-icon');
    if (osIconElement) {
        osIconElement.style.backgroundImage = `url('${osIcon}')`;
    }

    const osNameElement = document.getElementById('os-name');
    if (osNameElement) {
        osNameElement.textContent = osName;
    }
}

// Определение браузера
function detectBrowser() {
    const userAgent = window.navigator.userAgent;
    let browserName = 'Unknown Browser';
    let browserIcon = '';

    if (userAgent.indexOf('Firefox') !== -1) {
        browserName = 'Firefox';
        browserIcon = 'https://img.icons8.com/color/48/000000/firefox.png';
    } else if (userAgent.indexOf('SamsungBrowser') !== -1) {
        browserName = 'Samsung Browser';
        browserIcon = 'https://img.icons8.com/color/48/000000/samsung.png';
    } else if (userAgent.indexOf('Opera') !== -1 || userAgent.indexOf('OPR') !== -1) {
        browserName = 'Opera';
        browserIcon = 'https://img.icons8.com/color/48/000000/opera.png';
    } else if (userAgent.indexOf('Brave') !== -1) {
        browserName = 'Brave';
        browserIcon = 'https://img.icons8.com/color/48/000000/brave-web-browser.png';
    } else if (userAgent.indexOf('Edg') !== -1) {
        browserName = 'Edge';
        browserIcon = 'https://img.icons8.com/color/48/000000/ms-edge-new.png';
    } else if (userAgent.indexOf('Chrome') !== -1) {
        browserName = 'Chrome';
        browserIcon = 'https://img.icons8.com/color/48/000000/chrome.png';
    } else if (userAgent.indexOf('Safari') !== -1) {
        browserName = 'Safari';
        browserIcon = 'https://img.icons8.com/color/48/000000/safari.png';
    }

    // Обновляем название и иконку браузера
    const browserNameElement = document.getElementById('browser-name');
    if (browserNameElement) {
        browserNameElement.textContent = browserName;
    }

    const browserIconElement = document.getElementById('browser-icon');
    if (browserIconElement) {
        browserIconElement.style.backgroundImage = `url('${browserIcon}')`;
    }
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
            if (easterEgg) {
            easterEgg.classList.add('active');
                setTimeout(() => {
                    easterEgg.classList.remove('active');
                    // Сбрасываем счетчик после показа пасхалки
                    clickCount = 0;
                }, 2500);
            }
        }
    });

    // Функция для закрытия всех меню
    const closeOtherMenus = (activeClass) => {
        const menuClasses = ['active', 'links-active', 'docs-active', 'dev-active', 'team-active', 'extensions-active', 'games-active', 'utils-active'];
        
        // Удаляем все классы активности, кроме текущего
        menuClasses.forEach(cls => {
            if (cls !== activeClass) {
                body.classList.remove(cls);
            }
        });

        // Получаем все контейнеры
        const containers = [description, links, docs, dev, team, extensions, games, utils];
        
        // Скрываем все контейнеры
        containers.forEach(container => {
            if (!container) return; // Проверка на существование контейнера
            
            container.style.visibility = 'hidden';
            container.style.opacity = '0';
            container.style.top = '120%';
        });
        
        // Если у нас открыто телеграм-меню, запоминаем его состояние
        if (activeClass === 'links-active') {
            // Если открываем связи и было открыто телеграм-меню
            if (isTelegramMenuOpen) {
                setTimeout(() => {
                    linksRow.classList.add('telegram-active');
                    telegramBtn.classList.add('back');
                    links.style.width = '450px';
                    links.style.height = '320px';
                    
                    // Скрываем основные иконки
                    const mainIcons = document.querySelectorAll('.link-icon:not(.telegram)');
                    mainIcons.forEach(icon => {
                        icon.style.opacity = '0';
                        icon.style.display = 'none';
                    });
                }, 100);
            } else {
                // Если телеграм-меню было закрыто
                setTimeout(() => {
                    linksRow.classList.remove('telegram-active');
                    telegramBtn.classList.remove('back');
                    links.style.width = '450px';
                    links.style.height = '150px';
                    
                    // Показываем основные иконки
                    const mainIcons = document.querySelectorAll('.link-icon:not(.telegram)');
                    mainIcons.forEach(icon => {
                        icon.style.display = 'inline-block';
                        icon.style.opacity = '1';
                    });
                }, 100);
            }
        } else {
            // Если мы не открываем связи, закрываем телеграм-меню, если оно было открыто
            if (linksRow.classList.contains('telegram-active')) {
                linksRow.classList.remove('telegram-active');
                telegramBtn.classList.remove('back');
            }
        }
        
        // Убираем активный класс со всех кнопок
        const buttons = [aboutBtn, linksBtn, docsBtn, devBtn, teamBtn, extensionsBtn, gamesBtn, utilsBtn];
        buttons.forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
    };

    // Функция для открытия разделов
    const openSection = (section, button, activeClass) => {
        // Сначала закрываем все меню
        closeOtherMenus(activeClass);
        
        // Добавляем класс активности на body
        body.classList.add(activeClass);
        
        // Добавляем класс активности на кнопку
        if (button) {
            button.classList.add('active');
        }
        
        // Показываем нужный контейнер
        if (section) {
            // Сначала устанавливаем свойства
            section.style.visibility = 'visible';
            section.style.opacity = '1';
            section.style.top = '50%';
            
            // Устанавливаем специфичные параметры для различных контейнеров
            if (section === links) {
                // Если открываем связи, учитываем состояние телеграм-меню
                if (isTelegramMenuOpen) {
                    section.style.width = '450px';
                    section.style.height = '320px';
                    
                    // Обновляем вид кнопки и ряда
                    linksRow.classList.add('telegram-active');
                    telegramBtn.classList.add('back');
                } else {
                    section.style.width = '450px';
                    section.style.height = '150px';
                }
            } else if (section === games) {
                // Если открываем игры, загружаем актуальные данные
                loadGames(currentCategory === 'horror' ? './HorrorGames.txt' : './OthersGames.txt');
            } else if (section === utils) {
                // Если открываем утилиты, загружаем актуальные данные
                loadUtils();
            } else if (section === team) {
                // Если открываем команду, загружаем информацию о членах команды
                loadTeamMembers();
            }
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
        if (body.classList.contains('links-active')) {
            // Если уже активно - закрываем
            closeOtherMenus('');
            return;
        }
        
        openSection(links, linksBtn, 'links-active');
    });

    // Функция для работы подменю Telegram
    function toggleTelegramMenu() {
        const linksRow = document.querySelector('.links-row');
        const telegramIcon = document.querySelector('.telegram');
        const linksContainer = document.querySelector('.links-container');
        
        if (linksRow.classList.contains('telegram-active')) {
            // Закрываем подменю Telegram
            linksRow.classList.remove('telegram-active');
            telegramIcon.classList.remove('back');
            // Проверяем что нужный контейнер открыт
            if (!document.body.classList.contains('links-active')) {
                linksContainer.classList.add('hide');
            }
            
            // Восстанавливаем видимость других иконок и их обычные стили
            setTimeout(() => {
                const links = document.querySelectorAll('.link-icon:not(.telegram)');
                links.forEach(link => {
                    link.style.display = 'inline-block';
                    // Сбрасываем все инлайн стили, которые могли повлиять на анимацию
                    link.style.transition = '';
                    link.style.transform = '';
                });
            }, 300);
    } else {
            // Открываем подменю Telegram
            linksRow.classList.add('telegram-active');
            telegramIcon.classList.add('back');
            linksContainer.classList.remove('hide');
            // Скрываем другие иконки
            const links = document.querySelectorAll('.link-icon:not(.telegram)');
            links.forEach(link => {
                link.style.display = 'none';
            });
        }
    }

    // Кнопка "Документы"
    docsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('docs-active')) {
            // Если уже активно - закрываем
            closeOtherMenus('');
            return;
        }
        
        openSection(docs, docsBtn, 'docs-active');
    });

    // Кнопка "Разработка"
    devBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('dev-active')) {
            // Если уже активно - закрываем
            closeOtherMenus('');
            return;
        }
        
        openSection(dev, devBtn, 'dev-active');

        // Загружаем информацию о разрабатываемой игре
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
                console.error(`Ошибка загрузки информации о разрабатываемой игре: ${error.message}`);
                const devInfo = document.querySelector('.dev-info');
                if (devInfo) {
                    devInfo.innerHTML = `
                        <h2>Информация о разработке</h2>
                        <p>Не удалось загрузить данные о разрабатываемой игре.</p>
                    `;
                }
            });
    });

    // Функция загрузки команды
    async function loadTeamMembers() {
        const teamList = document.querySelector('.team-list');
        if (teamList) {
            teamList.innerHTML = '';
            try {
                // Упрощенный вариант разбора файла команды
                console.log('Загрузка данных команды...');
                
                const response = await fetch('BRC-Team.txt');
                if (!response.ok) {
                    throw new Error('Не удалось загрузить файл команды');
                }
                
                const data = await response.text();
                
                console.log(`Данные команды: ${data}`);
                
                // Разбиваем файл на блоки, основываясь на встрече строки Username=
                const members = [];
                const lines = data.split('\n');
                let currentMember = null;
                
                for (let line of lines) {
                    line = line.trim();
                    
                    // Пропускаем пустые строки
                    if (!line) continue;
                    
                    // Если строка начинается с Username=, это начало нового блока
                    if (line.startsWith('Username=')) {
                        // Если у нас уже есть данные о предыдущем участнике, добавляем его
                        if (currentMember && currentMember.Username) {
                            members.push(currentMember);
                        }
                        
                        // Создаем нового участника
                        currentMember = {};
                        
                        // Извлекаем значение Username
                        const value = line.substring('Username='.length).trim();
                        currentMember.Username = value.replace(/^"/, '').replace(/"$/, '');
                        
                    } else if (currentMember && line.indexOf('=') !== -1) {
                        // Обрабатываем другие свойства участника
                        const equalPos = line.indexOf('=');
                        const key = line.substring(0, equalPos).trim();
                        let value = line.substring(equalPos + 1).trim();
                        value = value.replace(/^"/, '').replace(/"$/, '');
                        currentMember[key] = value;
                    }
                }
                
                // Добавляем последнего участника, если он есть
                if (currentMember && currentMember.Username) {
                    members.push(currentMember);
                }
                
                if (members.length === 0) {
                    throw new Error('Нет данных об участниках команды');
                }
                
                console.log(`Найдено ${members.length} участников команды:`, members);
                
                // Создаем карточки участников
                members.forEach((memberData, index) => {
                            const memberDiv = document.createElement('div');
                            memberDiv.classList.add('team-member');
                            memberDiv.innerHTML = `
                        <h3>${memberData.Username || 'Не указано'}</h3>
                        <p class="team-role">${memberData.UserDesc || 'Не указано'}</p>
                        <a href="${memberData.UserTelegramContact || '#'}" class="contact-icon" target="_blank" title="Написать в Telegram"></a>
                            `;
                            teamList.appendChild(memberDiv);
                    
                    // Добавляем разделитель между участниками, кроме последнего
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
        if (body.classList.contains('team-active')) {
            // Если уже активно - закрываем
            closeOtherMenus('');
            return;
        }
        
        openSection(team, teamBtn, 'team-active');
    });

    // Кнопка "Расширения"
    extensionsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (body.classList.contains('extensions-active')) {
            // Если уже активно - закрываем
            closeOtherMenus('');
            return;
        }
        
        openSection(extensions, extensionsBtn, 'extensions-active');
    });

    // Загрузка игр
    const loadGames = (file) => {
        // Показываем сообщение о загрузке с белым текстом
        gamesList.innerHTML = '<p style="color: white; text-align: center; font-family: \'Russo One\', sans-serif; margin: 20px 0;">Загрузка игр...</p>';
        
        console.log(`Загрузка игр из файла: ${file}`);
        
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
                
                console.log(`Данные игр: ${data}`);
                
                // Разбиваем файл на блоки, основываясь на встрече строки Name=
                const games = [];
                const lines = data.split('\n');
                let currentGame = null;
                
                for (let line of lines) {
                    line = line.trim();
                    
                    // Пропускаем пустые строки
                    if (!line) continue;
                    
                    // Если строка начинается с Name=, это начало нового блока
                    if (line.startsWith('Name=')) {
                        // Если у нас уже есть данные о предыдущей игре, добавляем её
                        if (currentGame && currentGame.Name) {
                            games.push(currentGame);
                        }
                        
                        // Создаем новую игру
                        currentGame = {};
                        
                        // Извлекаем значение Name
                        const value = line.substring('Name='.length).trim();
                        currentGame.Name = value.replace(/^"/, '').replace(/"$/, '');
                        
                    } else if (currentGame && line.indexOf('=') !== -1) {
                        // Обрабатываем другие свойства игры
                        const equalPos = line.indexOf('=');
                        const key = line.substring(0, equalPos).trim();
                        let value = line.substring(equalPos + 1).trim();
                        value = value.replace(/^"/, '').replace(/"$/, '');
                        currentGame[key] = value;
                    }
                }
                
                // Добавляем последнюю игру, если она есть
                if (currentGame && currentGame.Name) {
                    games.push(currentGame);
                }
                
                if (games.length === 0) {
                    throw new Error('Не удалось найти данные об играх в файле');
                }
                
                console.log(`Найдено ${games.length} игр:`, games);
                
                gamesData = games;
                applyFilters();
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
        if (body.classList.contains('games-active')) {
            // Если уже активно - закрываем
            closeOtherMenus('');
            return;
        }
        
        openSection(games, gamesBtn, 'games-active');
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
        if (body.classList.contains('utils-active')) {
            // Если уже активно - закрываем
            closeOtherMenus('');
            return;
        }
        
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
        // Определяем размер прокрутки в зависимости от направления
        const verticalScrollStep = window.innerHeight * (direction === 'up' ? 0.5 : 0.5); // 50% высоты экрана
        const horizontalScrollStep = window.innerWidth * 0.5; // 50% ширины экрана
        
        // Определяем текущую позицию прокрутки
        const currentVerticalScroll = window.scrollY;
        const currentHorizontalScroll = window.scrollX;
        
        // Проверяем, если есть горизонтальная прокрутка
        const hasHorizontalScroll = document.body.scrollWidth > window.innerWidth;
        
        // Если пользователь уже находится у нижней границы страницы и хочет прокрутить вниз,
        // или у верхней границы и хочет прокрутить вверх, и при этом есть горизонтальная прокрутка,
        // прокручиваем страницу горизонтально
        const isAtBottom = currentVerticalScroll + window.innerHeight >= document.body.scrollHeight - 50;
        const isAtTop = currentVerticalScroll <= 50;
        
        if ((isAtBottom && direction === 'down' || isAtTop && direction === 'up') && hasHorizontalScroll) {
            // Прокрутка вправо/влево в зависимости от текущего положения
            if (direction === 'down') {
                // Прокрутка вправо
            window.scrollTo({
                    left: currentHorizontalScroll + horizontalScrollStep,
                behavior: 'smooth'
        });
    } else {
                // Прокрутка влево
                window.scrollTo({
                    left: Math.max(0, currentHorizontalScroll - horizontalScrollStep),
                    behavior: 'smooth'
                });
            }
        } else {
            // Обычная вертикальная прокрутка
            if (direction === 'up') {
                // Вверх
            window.scrollTo({
                    top: Math.max(0, currentVerticalScroll - verticalScrollStep),
                behavior: 'smooth'
            });
            } else {
                // Вниз
                window.scrollTo({
                    top: currentVerticalScroll + verticalScrollStep,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Обработчики для кнопок скроллинга
    const scrollUpBtn = document.querySelector('.scroll-up');
    const scrollDownBtn = document.querySelector('.scroll-down');
    
    if (scrollUpBtn && scrollDownBtn) {
        scrollUpBtn.addEventListener('click', () => scrollPage('up'));
        scrollDownBtn.addEventListener('click', () => scrollPage('down'));
    }

    // Анимация логотипа - исправленная версия
    let logoAnimationId;
    
    const startLogoAnimation = () => {
        // Останавливаем предыдущую анимацию если она уже запущена
        if (logoAnimationId) {
            clearInterval(logoAnimationId);
        }
        
        // Запускаем новую анимацию
        logoAnimationId = setInterval(() => {
            if (logo) {
                logo.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px) scale(1)`;
            }
        }, 50);
    };
    
    // Запускаем анимацию
    startLogoAnimation();
    
    // Останавливаем анимацию, если страница неактивна
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (logoAnimationId) {
                clearInterval(logoAnimationId);
                logoAnimationId = null;
            }
    } else {
            startLogoAnimation();
        }
    });

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

    // Адаптация интерфейса под мобильные устройства
    const adjustForMobile = () => {
        // Проверка ширины экрана
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        const header = document.querySelector('.header-container');
        const browserContainer = document.querySelector('.browser-container');
        const osContainer = document.querySelector('.os-browser-container');
        const clockContainer = document.querySelector('.clock-container');
        
        if (isMobile) {
            // Перемещаем индикатор даты, ОС и браузера для мобильных
            if (header && browserContainer && osContainer && clockContainer) {
                // Выравниваем элементы в шапке для мобильных
                header.style.display = 'flex';
                header.style.flexDirection = 'column';
                header.style.alignItems = 'center';
                
                // Сбрасываем позиционирование
                browserContainer.style.position = 'relative';
                browserContainer.style.right = 'auto';
                browserContainer.style.top = 'auto';
                browserContainer.style.transform = 'none';
                
                osContainer.style.position = 'relative';
                osContainer.style.right = 'auto';
                osContainer.style.top = 'auto';
                osContainer.style.transform = 'none';
                
                clockContainer.style.position = 'relative';
                clockContainer.style.right = 'auto';
                clockContainer.style.margin = '5px 0';
            }
            
            // Настраиваем размеры контейнеров для мобильных
            const containers = document.querySelectorAll('.description-container, .links-container, .docs-container, .dev-container, .team-container, .extensions-container, .games-container, .utils-container');
            containers.forEach(container => {
                // Увеличиваем максимальную ширину для мобильных
                container.style.maxWidth = isSmallMobile ? '95%' : '90%';
            });
        } else {
            // Возвращаем стандартные настройки для десктопа
            if (browserContainer && osContainer && clockContainer) {
                browserContainer.style.position = '';
                browserContainer.style.right = '';
                browserContainer.style.top = '';
                browserContainer.style.transform = '';
                
                osContainer.style.position = '';
                osContainer.style.right = '';
                osContainer.style.top = '';
                osContainer.style.transform = '';
                
                clockContainer.style.position = '';
                clockContainer.style.right = '';
                clockContainer.style.margin = '';
            }
        }
    };
    
    // Вызываем функцию адаптации при загрузке и изменении размера
    window.addEventListener('load', adjustForMobile);
    window.addEventListener('resize', adjustForMobile);

    // Обработчик для кнопки телеграма
    telegramBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Переключаем состояние для использования при переключении вкладок
        isTelegramMenuOpen = !isTelegramMenuOpen;
        // Вызываем функцию переключения меню телеграма
        toggleTelegramMenu();
    });

    // Функция для улучшения горизонтальной прокрутки
    function setupHorizontalScroll() {
        // Определяем минимальную ширину сайта
        const minWidth = 1200; // Уменьшаем минимальную ширину
        
        // Функция для проверки и предотвращения наложений
        function checkOverlaps() {
            // Получаем все рекламные блоки
            const adBlocks = document.querySelectorAll('.ad-container');
            // Получаем все активные/видимые меню
            const menus = document.querySelectorAll('.description-container, .links-container, .docs-container, .dev-container, .team-container, .extensions-container, .games-container, .utils-container');
            
            let visibleMenu = null;
            
            // Находим видимое меню
            menus.forEach(menu => {
                const visibility = window.getComputedStyle(menu).visibility;
                const opacity = parseFloat(window.getComputedStyle(menu).opacity);
                
                if (visibility === 'visible' && opacity > 0) {
                    visibleMenu = menu;
                }
            });
            
            // Если нет видимого меню, не нужно ничего делать
            if (!visibleMenu) return;
            
            // Получаем размеры видимого меню
            const menuRect = visibleMenu.getBoundingClientRect();
            
            // Проверяем наложения с каждым рекламным блоком
            adBlocks.forEach(adBlock => {
                const adRect = adBlock.getBoundingClientRect();
                
                // Проверка наложения
                if (!(menuRect.right < adRect.left ||
                      menuRect.left > adRect.right ||
                      menuRect.bottom < adRect.top ||
                      menuRect.top > adRect.bottom)) {
                    
                    // Определяем, с какой стороны смещать рекламу
                    if (adBlock.classList.contains('clip-ad')) {
                        // Левый блок - смещаем влево
                        adBlock.style.left = (menuRect.left - adRect.width - 20) + 'px';
                    } else {
                        // Правый блок - смещаем вправо
                        adBlock.style.right = (window.innerWidth - menuRect.right - adRect.width - 20) + 'px';
                    }
                }
            });
        }
        
        // Проверяем и устанавливаем минимальную ширину
        function checkWidth() {
            // Получаем реальную ширину окна
            const windowWidth = window.innerWidth;
            
            // Получаем необходимую ширину для контента
            const headerWidth = document.querySelector('.header-container')?.offsetWidth || 0;
            const contentWidth = Math.max(minWidth, headerWidth);
            
            // Устанавливаем минимальную ширину для body и html
            document.body.style.minWidth = contentWidth + 'px';
            document.documentElement.style.minWidth = contentWidth + 'px';
            
            // Центрируем поисковую строку
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer) {
                searchContainer.style.left = '50%';
                searchContainer.style.transform = 'translateX(-50%)';
            }
            
            // Проверяем наложения после загрузки страницы
            checkOverlaps();
        }
        
        // Вызываем функцию при загрузке и изменении размера окна
        window.addEventListener('load', () => {
            checkWidth();
            setTimeout(checkWidth, 500);
        });
        
        window.addEventListener('resize', checkWidth);
        
        // Проверяем при изменении активного меню
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', () => {
                setTimeout(checkWidth, 300);
                setTimeout(checkOverlaps, 500);
            });
        });
    }

    setupHorizontalScroll();

    // Функция для улучшения адаптивности сайта на всех разрешениях экрана
    function setupAdaptiveLayout() {
        // Определяем минимальную ширину в зависимости от размера экрана
        function setAdaptiveWidth() {
            const windowWidth = window.innerWidth;
            
            // Устанавливаем соответствующую минимальную ширину
            if (windowWidth >= 1600) {
                document.body.style.minWidth = '1000px';
            } else if (windowWidth >= 1200) {
                document.body.style.minWidth = '1000px';
            } else if (windowWidth >= 1000) {
                document.body.style.minWidth = '1000px';
            } else {
                document.body.style.minWidth = windowWidth + 'px';
            }
            
            // Проверяем положение даты последнего обновления
            const lastUpdate = document.querySelector('.last-update');
            if (lastUpdate) {
                // На маленьких экранах размещаем дату внизу
                if (windowWidth < 768) {
                    lastUpdate.style.top = 'auto';
                    lastUpdate.style.bottom = '10px';
                } else {
                    lastUpdate.style.top = '10px';
                    lastUpdate.style.bottom = 'auto';
                }
            }
            
            // Подстраиваем положение рекламных блоков
            adjustAdPositions(windowWidth);
            
            // Дополнительные проверки на наложения
            checkOverlaps();
        }
        
        // Функция для подстройки позиций рекламных блоков
        function adjustAdPositions(windowWidth) {
            const leftAd = document.querySelector('.clip-ad');
            const rightAd = document.querySelector('.telegram-api-ad');
            const bottomRightAd = document.querySelector('.brave-ad');
            
            // Определяем отступы в зависимости от размера экрана
            let leftMargin, rightMargin;
            
            if (windowWidth >= 1600) {
                leftMargin = rightMargin = 80;
            } else if (windowWidth >= 1200) {
                leftMargin = rightMargin = 50; 
            } else if (windowWidth >= 1000) {
                leftMargin = rightMargin = 30;
            } else {
                leftMargin = rightMargin = 20;
            }
            
            // Применяем отступы
            if (leftAd) {
                leftAd.style.left = leftMargin + 'px';
            }
            
            if (rightAd) {
                rightAd.style.right = rightMargin + 'px';
            }
            
            if (bottomRightAd) {
                bottomRightAd.style.right = rightMargin + 'px';
            }
        }
        
        // Функция для проверки и предотвращения наложений между контейнерами
        function checkOverlaps() {
            // Получаем все активные меню
            const activeMenus = document.querySelectorAll('.description-container, .links-container, .docs-container, .dev-container, .team-container, .extensions-container, .games-container, .utils-container');
            
            // Получаем рекламные блоки
            const adBlocks = document.querySelectorAll('.ad-container');
            
            // Для каждого активного меню проверяем перекрытие с рекламой
            activeMenus.forEach(menu => {
                // Проверяем только видимые меню
                if (window.getComputedStyle(menu).visibility === 'visible') {
                    const menuRect = menu.getBoundingClientRect();
                    
                    adBlocks.forEach(ad => {
                        const adRect = ad.getBoundingClientRect();
                        
                        // Если есть перекрытие, корректируем позиции
                        if (!(menuRect.right < adRect.left || 
                              menuRect.left > adRect.right ||
                              menuRect.bottom < adRect.top ||
                              menuRect.top > adRect.bottom)) {
                              
                            // Если это левая реклама
                            if (ad.classList.contains('clip-ad')) {
                                ad.style.left = Math.max(20, menuRect.left - adRect.width - 20) + 'px';
                            } else {
                                // Если это правая реклама
                                ad.style.right = Math.max(20, window.innerWidth - menuRect.right - adRect.width - 20) + 'px';
                            }
                        }
                    });
                }
            });
        }
        
        // Настраиваем размеры при загрузке и изменении размера окна
        window.addEventListener('load', setAdaptiveWidth);
        window.addEventListener('resize', setAdaptiveWidth);
        
        // Проверяем наложения при открытии меню
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', () => {
                setTimeout(checkOverlaps, 400);
            });
        });
        
        // Первичный вызов
        setAdaptiveWidth();
    }
    
    // Вызываем функцию адаптивности
    setupAdaptiveLayout();

    // Улучшенная функция определения мобильных устройств
    function setupMobileSupport() {
        // Функция для определения мобильного устройства
        function isMobile() {
            // Проверяем через userAgent
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileDeviceRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
            const isMobileDevice = mobileDeviceRegex.test(userAgent);
            
            // Проверяем через размер экрана
            const isSmallScreen = window.innerWidth < 1000;
            
            // Проверяем по касаниям (сенсорный экран)
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            // Возвращаем результат
            return isMobileDevice || (isSmallScreen && isTouchDevice);
        }
        
        // Функция для проверки параметра в URL
        function getURLParameter(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }
        
        const mobileWarning = document.getElementById('mobileWarning');
        const closeWarning = document.getElementById('closeWarning');
        const desktopVersionLink = document.getElementById('desktopVersionLink');
        
        // Проверяем, не была ли уже выбрана десктопная версия или закрыто предупреждение
        const desktopParam = getURLParameter('desktop');
        const warningClosed = localStorage.getItem('byrolil_mobile_warning_closed');
        
        // Активируем мобильную версию сайта
        function activateMobileVersion() {
            // Добавляем класс для мобильного отображения
            document.body.classList.add('mobile-version');
            
            // Обеспечиваем правильные мета-теги для мобильной версии
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
            
            // Упрощаем интерфейс для мобильной версии
            simplifyInterface();
        }
        
        // Упрощение интерфейса для мобильных устройств
        function simplifyInterface() {
            // Переносим рекламные блоки вниз страницы
            const adContainers = document.querySelectorAll('.ad-container');
            const footer = document.querySelector('.footer');
            
            if (adContainers.length && footer) {
                adContainers.forEach(ad => {
                    footer.parentNode.insertBefore(ad, footer);
                });
            }
        }
        
        // Если это мобильное устройство и не выбрана десктопная версия, показываем предупреждение или активируем мобильную версию
        if (isMobile() && desktopParam !== 'true') {
            // Если пользователь уже закрывал предупреждение, сразу активируем мобильную версию
            if (warningClosed === 'true') {
                activateMobileVersion();
                mobileWarning.style.display = 'none';
            } else {
                // Иначе показываем предупреждение
                mobileWarning.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Блокируем прокрутку
                
                // Обновляем ссылку на десктопную версию
                const currentURL = window.location.href.split('?')[0];
                desktopVersionLink.href = currentURL + '?desktop=true';
                
                // Обработчик закрытия предупреждения
                closeWarning.addEventListener('click', function() {
                    mobileWarning.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    localStorage.setItem('byrolil_mobile_warning_closed', 'true');
                    
                    // Активируем мобильную версию
                    activateMobileVersion();
                });
            }
        } else {
            // Если не мобильное устройство или выбрана десктопная версия
            mobileWarning.style.display = 'none';
            document.body.classList.add('desktop-version');
        }
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', function() {
            if (isMobile() && desktopParam !== 'true') {
                document.body.classList.add('mobile-version');
                document.body.classList.remove('desktop-version');
            } else {
                document.body.classList.remove('mobile-version');
                document.body.classList.add('desktop-version');
            }
        });
    }
    
    // Вызываем функцию для поддержки мобильных устройств
    setupMobileSupport();
});
