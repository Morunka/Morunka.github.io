const newLinkText = document.getElementById('newLinkText')
const pageLinkText = document.getElementById('pageLinkText')
const newLinkButton = document.getElementById('newLinkButton')

const currentUrl = window.location.pathname;
const fileName = currentUrl.split('/').pop();
const pageLink = '/' + fileName

newLinkText.textContent = newLink
newLinkText.href = newLink

pageLinkText.textContent = pageLink

newLinkButton.addEventListener('click', function() {
window.location.href = newLink
})

setTimeout(function() {
window.location.href = newLink;
}, 0);