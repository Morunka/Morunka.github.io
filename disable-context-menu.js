// Скрипт для отключения контекстного меню на чёрных полях игры
// Добавьте этот скрипт в вашу игру

// Функция для отключения контекстного меню
function disableContextMenu() {
    // Отключаем контекстное меню на всем документе
    document.addEventListener('contextmenu', function(event) {
        // Предотвращаем появление контекстного меню
        event.preventDefault();
        return false;
    });
    
    // Дополнительно отключаем контекстное меню на всех элементах
    document.addEventListener('DOMContentLoaded', function() {
        // Получаем все элементы на странице
        const elements = document.getElementsByTagName('*');
        
        // Добавляем обработчик для каждого элемента
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('contextmenu', function(event) {
                event.preventDefault();
                return false;
            });
        }
    });
}

// Вызываем функцию при загрузке страницы
window.addEventListener('load', disableContextMenu);

// Также вызываем функцию сразу, на случай если страница уже загружена
disableContextMenu();

// Для игр на Scratch или Kogama, добавьте этот код в начало вашего проекта
// и убедитесь, что он выполняется до загрузки игрового контента 