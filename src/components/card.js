//Удаление карточки
export const deleteCard = (evt) => {
    const card = evt.target.closest('.card');
    card.remove(); 
}

//Лайк карточки
export const toggleLike = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
}

//Создание карточки
export function addCard(item, deleteCard, toggleLike, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', toggleLike);

    const cardImg = cardElement.querySelector('.card__image');
    cardImg.addEventListener('click', handleImageClick);
  
    return cardElement;
  };