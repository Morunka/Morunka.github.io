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

  manageUpLine();
  
  window.addEventListener('resize', manageUpLine);