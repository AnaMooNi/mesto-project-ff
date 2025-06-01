// Открытие Попап
const openPoup = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};

// Закрытие Попап
const closePoup = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

// ЗАкрытие на Esc
const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePoup(popup);
  }
};

export { openPoup, closePoup};
