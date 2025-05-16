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

  // Вызов при загрузке
  managePageIcon();
  
  // Слушатели изменения размера
  window.addEventListener('resize', managePageIcon);  