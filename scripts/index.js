// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

const cardsContainer = document.querySelector('.places__list');

function addCard(item, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove(); 
}

initialCards.forEach((card) => {
  const cardElement = addCard(card, deleteCard);
  cardsContainer.append(cardElement);
});


