let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "LatemarLatemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (card) {
  console.log(card);
});

//Definición de variables
//Modales:
const editModal = document.querySelector("#edit-popup");
console.log(editModal);
const addModal = document.querySelector("#new-card-popup");
console.log(addModal);
const imageModal = document.querySelector("#image-popup");
console.log(imageModal);
//Buttons
const editButton = document.querySelector(".profile__edit-button");
console.log(editButton);
const addButton = document.querySelector(".profile__add-button");
console.log(addButton);
const closeEditSectionButton = editModal.querySelector(".popup__close");
console.log(closeEditSectionButton);
const closeAddSectionButton = addModal.querySelector(".popup__close");
console.log(closeAddSectionButton);
const popupCloseButton = imageModal.querySelector(".popup__close");
console.log(popupCloseButton);
//Forms
const editForm = editModal.querySelector("#edit-profile-form");
console.log(editForm);
const cardForm = addModal.querySelector("#new-card-form");
console.log(cardForm);
//Other elements
const cardsSection = document.querySelector(".cards__list");
console.log(cardsSection);
//popup image elements
const popupImage = imageModal.querySelector(".popup__image");
console.log(popupImage);
const popupCaption = imageModal.querySelector(".popup__caption");
console.log(popupCaption);
popupCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});
//Functions
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

function fillProfileForm() {
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  console.log(profileName);
  console.log(profileDescription);

  const nameInput = editModal.querySelector(".popup__input_type_name");
  const descriptionInput = editModal.querySelector(
    ".popup__input_type_description",
  );

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = editModal.querySelector(".popup__input_type_name");
  const descriptionInput = editModal.querySelector(
    ".popup__input_type_description",
  );

  let nameValue = nameInput.value;
  let descriptionValue = descriptionInput.value;

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  closeModal(editModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = addModal.querySelector(".popup__input_type_card-name");
  const linkInput = addModal.querySelector(".popup__input_type_url");

  let titleValue = titleInput.value;
  let linkValue = linkInput.value;
  renderCard(titleValue, linkValue, cardsSection);
  closeModal(addModal);
}

function renderCard(name, link, container) {
  const newCard = getCardElement(name, link);
  container.prepend(newCard);
}

function getCardElement(name, link) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  if (name === "") {
    cardTitle.textContent = "Sin título";
  }
  if (link === "") {
    cardImage.src = "../images/placeholder.jpg";
  }
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function (evt) {
    handleCardDelete(evt);
  });
  //Se usa función arrow para no perder el contexto de las variables name y link (por medio de un closure)
  cardImage.addEventListener("click", () => {
    console.log(name + " nombre en cardImage.addEventListener");
    console.log(link + " link en cardImage.addEventListener");
    handleImageClick(name, link);
  });

  return cardElement;
}

function handleCardDelete(evt) {
  const cardToDelete = evt.target.closest(".card");
  cardToDelete.remove();
}

function handleImageClick(name, link) {
    console.log(name + " nombre en handleImageClick");
    console.log(link + " link en handleImageClick");  
  popupCaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
  openModal(imageModal);
}
//Detectores de eventos
editButton.addEventListener("click", function (modal) {
  handleOpenEditModal();
});

closeEditSectionButton.addEventListener("click", function (modal) {
  closeModal(editModal);
});

addButton.addEventListener("click", function (modal) {
  openModal(addModal);
});

closeAddSectionButton.addEventListener("click", function (modal) {
  closeModal(addModal);
});

editForm.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
});

cardForm.addEventListener("submit", function (evt) {
  handleCardFormSubmit(evt);
});
//Render de las cartas
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsSection);
});
