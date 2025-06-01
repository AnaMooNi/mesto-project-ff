// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу
import './pages/index.css';
import { createCard, toggleLike } from './components/card.js';
import { initialCards } from './components/cards.js';
import { openPoup, closePoup} from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {config, checkResponse, getUserInfo, getInitialCards, editProfile, addNewCard, deleteCard, updateAvatar} from './components/api.js';

const placesList = document.querySelector('.places__list');

//DOM узлы
const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupAddCard = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');
const popupImagePic = popupImage.querySelector('.popup__image');
const popupImageName = popupImage.querySelector('.popup__caption');

const popupAvatarEdit = document.querySelector('.popup_type_avatar');

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileImage = document.querySelector('.profile__image');

const formEditElement = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const editAvatarForm = document.forms['avatar'];

const jobInput = document.forms['edit-profile'].elements.description;
const nameInput = document.forms['edit-profile'].elements.name;

//Bалидация
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

let userId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    userId = userData._id;

    cards.forEach((card) => renderCard(card, userId));
  })
  .catch((error) => {
    console.error(error);
  });

function renderCard(cardContent, userId) {
  const cardElement = createCard(cardContent, toggleLike, showImagePopup, userId, handleCardDelete);
  placesList.appendChild(cardElement);
}

//Функция клика по карточке
function showImagePopup(image) {
  popupImagePic.src = image.src;
  popupImagePic.alt = image.alt;
  popupImageName.textContent = image.alt;

  openPoup(popupImage);
}

const fillEditFormInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

//Обработчик 'формы' редактирования аватара
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();

  showLoading(true, popupAvatarEdit.querySelector('.popup__button'));

  updateAvatar(editAvatarForm.elements['link'].value)
    .then((res) => {
      profileImage.setAttribute(
        'style',
        `background-image: url('${res.avatar}')`
      );
      closePoup(popupAvatarEdit);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      showLoading(false, popupAvatarEdit.querySelector('.popup__button'));
    });
}
editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit);

//Обработчик 'формы' редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  showLoading(true, popupProfileEdit.querySelector('.popup__button'));

  editProfile(nameInput.value, jobInput.value)
    .then((updatedProfile) => {
      profileName.textContent = updatedProfile.name;
      profileDescription.textContent = updatedProfile.about;

      closePoup(popupProfileEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      showLoading(false, popupProfileEdit.querySelector('.popup__button'));
    });
}
formEditElement.addEventListener('submit', handleEditFormSubmit);

//Добавление карточки
function addCard(newCardContent, userId) {
  const cardElement = createCard(
    newCardContent,
    toggleLike,
    showImagePopup,
    userId,
    handleCardDelete
  );
  placesList.prepend(cardElement);
}

//Обработчик 'формы' карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputCardTitle = addCardForm.elements['place-name'].value;
  const inputCardImage = addCardForm.elements['link'].value;
  const newCardContent = {
    name: inputCardTitle,
    link: inputCardImage,
  };
  addCardForm.addEventListener('submit', handleAddCardSubmit);

  showLoading(true, popupAddCard.querySelector('.popup__button'));

  addNewCard(inputCardTitle, inputCardImage)
    .then((newCard) => {
      addCard(newCard, userId);
      closeModal(popupAddCard);
      addCardForm.reset();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      showLoading(false, popupAddCard.querySelector('.popup__button'));
    });
}

//Удаление карточки
function handleCardDelete(cardId, cardElement) {
  return deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error(error);
    });
}

editButton.addEventListener('click', () => {
  clearValidation(formEditElement, validationConfig); 
  fillEditFormInputs(); 
  openPoup(popupProfileEdit);
});

addCardButton.addEventListener('click', () => {
  clearValidation(addCardForm, validationConfig); //очистка валидации
  openPoup(popupAddCard);
});

profileImage.addEventListener('click', () => {
  clearValidation(editAvatarForm, validationConfig);
  openPoup(popupAvatarEdit);
});

//Закрытие модальных окон на крестик
closeButtons.forEach((button) => { 
    button.addEventListener('click', (evt) => { 
      const pop = evt.target.closest('.popup'); 
      closePoup(pop); 
    }); 
}); 


enableValidation(validationConfig);
