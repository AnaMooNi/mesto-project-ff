// Открытие Попап
export const openPopup = (modal) => {
  modal.classList.add('popup_is-opened'); // добавить класс открытия попапа
  document.addEventListener('keydown', handleEscKeyUp); // добавить слушатель на кнопку Escape
  modal.addEventListener('click', closePopupOverlay);
};

// Закрытие Попап
export const closePopup = (modal) => {
  modal.classList.remove('popup_is-opened'); // удалить класс открытия попапа
  document.removeEventListener('keydown', handleEscKeyUp); // удалить слушатель на кнопку Escape
  modal.removeEventListener('click', closePopupOverlay);
 };

// ЗАкрытие на Esc
 const handleEscKeyUp = (e) => {
    if (e.key === 'Escape') {
      const popup = document.querySelector('.popup_is-opened'); // находим открытый попап
      closePopup(popup);
    }
  };

//Закрытие на оверлей
 const closePopupOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
    };
  };

