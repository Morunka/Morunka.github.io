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