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