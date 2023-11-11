const headerEl = document.querySelector('header');
const btnShowMenu = document.querySelector('.btn-show-menu');
btnShowMenu.addEventListener('click', () => {
  headerEl.classList.toggle('show-mobile')
});
