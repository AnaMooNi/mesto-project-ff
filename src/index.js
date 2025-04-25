// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу
import { initialCards } from './components/cards.js';
import { addCard, toggleLike, deleteCard } from './components/card.js';
import './pages/index.css';
import { openPopup, closePopup } from './components/modal.js';

const cardsContainer = document.querySelector('.places__list');


initialCards.forEach((card) => {
  const cardElement = addCard(card, deleteCard, toggleLike);
  cardsContainer.append(cardElement);
});



