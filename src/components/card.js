const cardTemplate = document.querySelector('#card-template').content;

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
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = item.name;
    cardImg.src = item.link;
    cardImg.alt = item.name;
  
    cardImg.addEventListener('click', () => handleImageClick(item.name, item.link));

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', toggleLike);
  
    return cardElement;
  };