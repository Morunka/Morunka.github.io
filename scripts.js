function fillProgress() {
    const bar = document.getElementById("progress-fill");
    let width = 0;
  
    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
      } else {
        width++;
        bar.style.width = width + "%";
      }
    }, 10); // скорость заполнения
  }

fetch("Coping/RacingCarsAdventures-game-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".Racing-Cars-Adventures-card").forEach(el => {
      el.innerHTML = html;
    });
  });

fetch("Coping/Ender.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".ender").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/page-read-only.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".page-read-only").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/Five-Nights-at-Stickmans2-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".Five-Nights-at-Stickmans2-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/Five-Nights-at-Stickmans-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".Five-Nights-at-Stickmans-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/Protect-Pikacky-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".Protect-Pikacky-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/Flash-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".Flash-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/UNMTool-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".UNMTool-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/TS3-MD-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".TS3-MD-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/Telegram-API-Pack-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".Telegram-API-Pack-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/Scratch-API-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".Scratch-API-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/GeMini-API-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".GeMini-API-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/Base-JS-PMP-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".Base-JS-PMP-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/BRS-News-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".BRS-News-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/IT-Sphere-News-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".IT-Sphere-News-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/BRS-Characters-News-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".BRS-Characters-News-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/BRS-FNaS-News-card.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".BRS-FNaS-News-card").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/new.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".new").forEach(el => {
      el.innerHTML = html;
    });
  });

  fetch("Coping/update.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".update").forEach(el => {
      el.innerHTML = html;
    });
  });

    fetch("Coping/google-analytics.html")
  .then(response => response.text())
  .then(html => {
    document.querySelectorAll(".google-analytics").forEach(el => {
      el.innerHTML = html;
    });
  });

  function manageUpLine() {
    const div = document.querySelector('.up-line');
    const screenIsSmall = window.innerWidth <= 870;
  
    if (div) {
      if (screenIsSmall) {
        div.style.display = 'none';
        div.style.position = '';
      } else {
        div.style.display = 'block';
        div.style.position = 'relative';
      }
    }
  }
  
  function managePageIcon() {
    const img = document.querySelector('.page-icon-container img');
    const screenIsSmall = window.innerWidth <= 1024;
  
    if (img) {
      if (screenIsSmall) {
        img.style.display = 'none';
      } else {
        img.style.display = 'block';
      }
    }
  }
  
  // Функция поисковика
  function search() {
    const query = document.getElementById('query').value.trim();
    const engine = document.getElementById('engine').value;
    if (query) {
      const url = engine + encodeURIComponent(query);
      window.open(url, '_blank');
    }
  }

  // Вызов при загрузке
  manageUpLine();
  managePageIcon();
  
  // Слушатели изменения размера
  window.addEventListener('resize', manageUpLine);
  window.addEventListener('resize', managePageIcon);  

// Выводим userAgent
  const userAgent = navigator.userAgent;

// Выводим операционную систему
  let os = "Unknown";
  if (userAgent.includes("Windows")) os = "Windows";
  if (userAgent.includes("Mac")) os = "macOS";
  if (userAgent.includes("Linux")) os = "Linux";
  if (userAgent.includes("Android")) os = "Android";
  if (userAgent.includes("Android")|("IPad")|("Mac")|("IPhone"));
// Выводим брауйзер
  let browser = "Unknown";
  if (userAgent.includes("Chrome") && !userAgent.includes("Edge") && !userAgent.includes("OPR")) browser = "Chrome";
  else if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
  else if (userAgent.includes("Edge")) browser = "Edge";
  else if (userAgent.includes("OPR") || userAgent.includes("Opera")) browser = "Opera";
// Выводим разрешение экрана
  const width = window.screen.width;
  const height = window.screen.height;
  const screensize = `${width} x ${height}`;
// Выводим язык
  const lang = navigator.language
// Выводим общую информацию
  const userinfo = userAgent
// Выводим пояс
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
// Выводим устройство
  let devicetype
  if (userAgent.includes("Mobile")) devicetype = "Mobile";
  else devicetype = "Desktop"
// Выводим скрипт
  const jsEnabled = true
// Выводим куки
  const cookiesEnabled = navigator.cookieEnabled
// Выводим LocalStorage
  const localStorageSupported = typeof localStorage !== "undefined";
// Показываем переменные в html
  document.getElementById("os-info").textContent = os;
  document.getElementById("browser-info").textContent = browser
  document.getElementById("screen-size").textContent = screensize
  document.getElementById("browser-lang").textContent = lang
  document.getElementById("time-zone").textContent = timezone
  document.getElementById("user-agent").textContent = userinfo
  document.getElementById("device-type").textContent = devicetype
  document.getElementById("cookies-info").textContent = cookiesEnabled
  document.getElementById("localstorage-info").textContent = localStorageSupported
  document.getElementById("js-info").textContent = jsEnabled
// Выводим и показываем IP (отдельно)
fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
  document.getElementById("ip-address").textContent = data.ip;
})
.catch(() => {
  document.getElementById("ip-address").textContent = "Не удалось получить IP";
});
// Кнопка скрытия/показа IP
let ipVisible = false;
function toggleIP() {
  const ip = document.getElementById("ip-address");
  const btn = event.target;
  ip.style.display = ipVisible ? "none" : "inline";
  btn.textContent = ipVisible ? "Показать" : "Скрыть";
  ipVisible = !ipVisible;
}