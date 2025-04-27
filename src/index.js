// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу
import { initialCards } from './components/cards.js';
import { addCard, toggleLike, deleteCard } from './components/card.js';
import './pages/index.css';
import { openPopup, closePopup } from './components/modal.js';

//DOM узлы

const cardsContainer = document.querySelector('.places__list');

const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const popupAddCard = document.querySelector('.popup_type_new-card');

const closeButtons = document.querySelectorAll('.popup__close');

const formAddElement = popupAddCard.querySelector('.popup__form');
const cardNameInput = formAddElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = formAddElement.querySelector('.popup__input_type_url');

const popupContent = popupEditProfile.querySelector('.popup__content');
const formEditElement = popupContent.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const imageInPopup = popupImage.querySelector('.popup__image');
const captionInPopup = popupImage.querySelector('.popup__caption');
 
//Открытие модального окна редактора профиля
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
 });
 
//Открытие модального окна добавления карточки
addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard)
 });

//Открытие модального окна картинки
const openImg = () => {
  captionInPopup.textContent = document.querySelector('.card__title').textContent;
  imageInPopup.src = document.querySelector('.card__image').src;
  popupImage.alt = document.querySelector('.card__image').alt
  openPopup(popupImage);
  };

//Закрытие модальных окон на крестик
closeButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const pop = evt.target.closest('.popup');
      closePopup(pop);
    });
});

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  if ((nameInput.value.length > 0) && (jobInput.value.length > 0)) {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  evt.target.reset();
  };
  closePopup(popupEditProfile) ;
};

formEditElement.addEventListener('submit', handleFormSubmit);

//Добавление карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCardElem = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
const newCard = addCard (newCardElem ,deleteCard, toggleLike, openImg);
  cardsContainer.prepend(newCard);
  evt.target.reset();
  closePopup(popupAddCard);
};

formAddElement.addEventListener('submit', handleAddCardSubmit);

//Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardElement = addCard(card, deleteCard, toggleLike, openImg);
  cardsContainer.append(cardElement);
});



