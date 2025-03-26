/* Стили для контейнеров */
.description-container,
.links-container,
.docs-container,
.dev-container,
.team-container,
.extensions-container,
.games-container,
.utils-container {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    top: 60%;
    visibility: hidden;
    transition: opacity 0.3s ease, top 0.3s ease, visibility 0.3s ease;
}

/* Состояние при открытии */
.description-container.show,
.links-container.show,
.docs-container.show,
.dev-container.show,
.team-container.show,
.extensions-container.show,
.games-container.show,
.utils-container.show {
    opacity: 1;
    top: 50%;
    visibility: visible;
}

/* Состояние при закрытии */
.description-container.hide,
.links-container.hide,
.docs-container.hide,
.dev-container.hide,
.team-container.hide,
.extensions-container.hide,
.games-container.hide,
.utils-container.hide {
    opacity: 0;
    top: 60%;
    visibility: hidden;
}
