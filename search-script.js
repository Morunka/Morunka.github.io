const tabsKey = 'myTabs';

function loadTabs() {
  const container = document.getElementById('tabsContainer');
  container.innerHTML = '';
  const tabs = JSON.parse(localStorage.getItem(tabsKey)) || [];
  const tabsHeader = document.getElementById('tabsHeader');

  if (tabs.length === 0) {
    tabsHeader.style.display = 'none';
  } else {
    tabsHeader.style.display = 'block';
  }

  tabs.forEach((tab, index) => {
    let domain;
    try {
      domain = new URL(tab.url).hostname;
    } catch {
      console.warn(`Пропущен некорректный URL: ${tab.url}`);
      return;
    }

    const div = document.createElement('div');
    div.className = 'tab';
    div.dataset.index = index;

    const favicon = document.createElement('img');
    favicon.src = `https://www.google.com/s2/favicons?domain=${domain}`;
    favicon.width = 16;
    favicon.height = 16;
    favicon.style = 'vertical-align: middle; margin-right: 5px;';

    const link = document.createElement('a');
    link.href = tab.url;
    link.target = '_blank';
    link.textContent = tab.name;
    link.className = 'link';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.title = 'Редактировать вкладку';
    editBtn.className = 'edit-tab';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.title = 'Удалить вкладку';
    deleteBtn.className = 'delete-tab';

    div.appendChild(favicon);
    div.appendChild(link);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    container.appendChild(div);

    // Обработчик удаления
    deleteBtn.onclick = () => {
      tabs.splice(index, 1);
      localStorage.setItem(tabsKey, JSON.stringify(tabs));
      loadTabs();
    };

    // Обработчик редактирования
    editBtn.onclick = () => {
      // Заменим содержимое див на форму редактирования
      div.innerHTML = '';

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = tab.name;
      nameInput.className = 'tab-edit-name search-style';

      const urlInput = document.createElement('input');
      urlInput.type = 'text';
      urlInput.value = tab.url;
      urlInput.className = 'tab-edit-url search-style';

      const saveBtn = document.createElement('button');
      saveBtn.textContent = '💾 Сохранить';

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = '✖ Отмена';

      div.appendChild(nameInput);
      div.appendChild(urlInput);
      div.appendChild(saveBtn);
      div.appendChild(cancelBtn);

      saveBtn.onclick = () => {
        const newName = nameInput.value.trim();
        const newUrl = urlInput.value.trim();

        if (!newName || !newUrl) {
          return;
        }

        try {
          new URL(newUrl);
        } catch {
          return;
        }

        tabs[index] = { name: newName, url: newUrl };
        localStorage.setItem(tabsKey, JSON.stringify(tabs));
        loadTabs();
      };

      cancelBtn.onclick = () => {
        loadTabs();
      };
    };
  });
}

function addTab() {
  const nameInput = document.getElementById('tabName');
  const urlInput = document.getElementById('tabUrl');
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();

  if (!name || !url) {
    return;
  }

  try {
    new URL(url);
  } catch {
    return;
  }

  const tabs = JSON.parse(localStorage.getItem(tabsKey)) || [];
  tabs.push({ name, url });
  localStorage.setItem(tabsKey, JSON.stringify(tabs));

  nameInput.value = '';
  urlInput.value = '';
  loadTabs();
}

window.onload = loadTabs;

function toggleAddTab() {
  const section = document.getElementById('addTabSection');
  const button = document.getElementById('toggleAddTabBtn');

  const isHidden = section.style.display === 'none' || section.style.display === '';
  section.style.display = isHidden ? 'block' : 'none';
  button.textContent = isHidden ? 'Close tab menu' : 'Open tab menu';
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