import { openModal, closeModal } from "./Utils.js";
class Card {
  constructor(name, imgLink, cardSelector, handleCardClick) {
    this._name = name;
    this._imgLink = imgLink;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButton(evt) {
    const cardToDelete = evt.target.closest(".card");
    cardToDelete.remove();
  }

  _handleImageButton() {
    this._handleCardClick(this._name, this._imgLink);
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", (evt) =>
      this._handleLikeButton(evt),
    );
    this._cardDeleteButton.addEventListener("click", (evt) =>
      this._handleDeleteButton(evt),
    );
    this._cardImageButton.addEventListener("click", () =>
      this._handleImageButton(),
    );
  }

  getView() {
    //Crear el contenedor de la tarjeta
    this._cardElement = this._getTemplate();
    //Seleccionar los elementos de la tarjeta
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button",
    );
    this._cardImageButton = this._cardElement.querySelector(".card__image");
    //Crear los event listeners de la tarjeta
    this._setEventListeners();
    //Llenar la tarjeta con los datos
    const cardTitle = this._cardElement.querySelector(".card__title");
    const cardImage = this._cardElement.querySelector(".card__image");

    cardTitle.textContent = this._name || "Sin título";
    cardImage.src = this._imgLink || "../images/placeholder.jpg";
    cardImage.alt = this._name || "Sin título";

    return this._cardElement;
  }
}
export default Card;
