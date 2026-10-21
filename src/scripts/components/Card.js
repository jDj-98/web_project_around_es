class Card {
  constructor(
    name,
    imgLink,
    cardSelector,
    isLiked,
    id,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  ) {
    this._name = name;
    this._imgLink = imgLink;
    this._cardSelector = cardSelector;
    this._isLiked = isLiked;
    this._id = id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }

  _handleLikeButton(evt) {
    const likeButton = evt.currentTarget;
    const isLikedNow = !this._isLiked;

    this._handleLikeClick(isLikedNow, this._id).then(() => {
      likeButton.classList.toggle("card__like-button_is-active");
    });
  }

  _handleDeleteButton(evt) {
    const cardToDelete = evt.target.closest(".card");
    this._handleDeleteClick(this._id, cardToDelete);
  }

  _handleImageButton() {
    this._handleCardClick(this._name, this._imgLink);
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", (evt) =>
      this._handleLikeButton(evt),
    );
    if (this._handleDeleteClick) {
      this._cardDeleteButton.addEventListener("click", (evt) =>
        this._handleDeleteButton(evt),
      );
    } else {
      this._cardDeleteButton.remove();
    }
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
    //Validar el estado de isLiked que viene del servidor
    if (this._isLiked) {
      this._cardLikeButton.classList.add("card__like-button_is-active");
    }
    //Llenar la tarjeta con los datos
    const cardTitle = this._cardElement.querySelector(".card__title");
    const cardImage = this._cardElement.querySelector(".card__image");

    cardTitle.textContent = this._name || "Sin título";
    cardImage.src = this._imgLink || "images/placeholder.jpg";
    cardImage.alt = this._name || "Sin título";

    return this._cardElement;
  }
}
export default Card;
