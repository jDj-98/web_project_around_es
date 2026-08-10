import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./Utils.js";

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
//Definición de selectores de elementos HTML
//Modales:
const editModal = document.querySelector("#edit-popup");
const addModal = document.querySelector("#new-card-popup");
const imageModal = document.querySelector("#image-popup");
//Todos los popups
const popups = document.querySelectorAll(".popup");
//Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeEditSectionButton = editModal.querySelector(".popup__close");
const closeAddSectionButton = addModal.querySelector(".popup__close");
const popupCloseButton = imageModal.querySelector(".popup__close");
const editSubmitButton = editModal.querySelector(".popup__button_edit");
const cardSubmitButton = addModal.querySelector(".popup__button_add");
//Forms
const editForm = editModal.querySelector("#edit-profile-form");
const cardForm = addModal.querySelector("#new-card-form");
//Form inputs
const editInputs = editForm.querySelectorAll(".popup__input");
const cardInputs = cardForm.querySelectorAll(".popup__input");
//Other elements
const cardsSection = document.querySelector(".cards__list");
//popup image elements
const popupImage = imageModal.querySelector(".popup__image");
const popupCaption = imageModal.querySelector(".popup__caption");
popupCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});

//Functions
function handleCardClick(name, imgLink) {
  //Valida si un modal está abierto para cerrar con la tecla esc
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const openPopup = document.querySelector(".popup_is-opened");
      if (openPopup) {
        closeModal(openPopup);
      }
    }
  });
  //Recorrer los popups para agregar un event listener que cierre el popup en cuestión al hacer click fuera del contenido del mismo
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  });
  popupCaption.textContent = name;
  popupImage.src = imgLink;
  popupImage.alt = name;
  openModal(imageModal);
}

//Función que renderiza una tarjeta usando la clase Card.
function renderCard(name, link, container) {
  const cardInstance = new Card(
    name,
    link,
    "#card-template",
    handleCardClick,
  ).getView();

  container.prepend(cardInstance);
}

//Definición de los objetos para la clase FormValidator
const editConfig = {
  inputs: editInputs,
  customButton: editButton,
  submitButton: editSubmitButton,
};

const cardConfig = {
  inputs: cardInputs,
  customButton: addButton,
  submitButton: cardSubmitButton,
};

//validacion de los formularios por medio de la clase FormValidator
function validateEditForm() {
  const editFormValidator = new FormValidator(
    editConfig,
    editForm,
  ).setEventListeners();
}

function validateCardForm() {
  const cardFormValidator = new FormValidator(
    cardConfig,
    cardForm,
  ).setEventListeners();
}
//Llamado a las funciones que declaran las clases de validación de los formularios
validateEditForm();
validateCardForm();

//Render de las cartas
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsSection);
});

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

function handleOpenEditModal() {
  //Valida si un modal está abierto para cerrar con la tecla esc
  document.addEventListener("keydown", handleEscClose);
  fillProfileForm();
  openModal(editModal);
}

function handleOpenAddModal() {
  //Valida si un modal está abierto para cerrar con la tecla esc
  document.addEventListener("keydown", handleEscClose);
  fillAddCardForm();
  openModal(addModal);
}

//Detectores de eventos
editButton.addEventListener("click", function (modal) {
  handleOpenEditModal();
});

addButton.addEventListener("click", function (modal) {
  handleOpenAddModal();
});

closeEditSectionButton.addEventListener("click", function (modal) {
  closeModal(editModal);
  document.removeEventListener("keydown", handleEscClose);
});

closeAddSectionButton.addEventListener("click", function (modal) {
  closeModal(addModal);
  document.removeEventListener("keydown", handleEscClose);
});

editForm.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
});

cardForm.addEventListener("submit", function (evt) {
  handleCardFormSubmit(evt);
});

//Función que llena el formulario de edición del perfil con los datos actuales del perfil,
//se llama dentro de la función handleOpenEditModal para que se ejecute cada vez que se abre el popup de edición.
function fillProfileForm() {
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const nameInput = editModal.querySelector(".popup__input_type_name");
  const descriptionInput = editModal.querySelector(
    ".popup__input_type_description",
  );

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}
function fillAddCardForm() {
  const titleInput = addModal.querySelector(".popup__input_type_card-name");
  const linkInput = addModal.querySelector(".popup__input_type_url");

  titleInput.value = "";
  linkInput.value = "";
}
//Función que maneja el submit del formulario de edición del perfil,
//actualiza el nombre y la descripción del perfil con los valores ingresados en el formulario, y luego cierra el modal de edición.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = editModal.querySelector(".popup__input_type_name");
  const descriptionInput = editModal.querySelector(
    ".popup__input_type_description",
  );

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  closeModal(editModal);
}

//Función que maneja el submit del formulario de nueva tarjeta, crea una nueva tarjeta con los valores ingresados en el formulario,
//la agrega a la sección de tarjetas, y luego cierra el modal de nueva tarjeta.
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = addModal.querySelector(".popup__input_type_card-name");
  const linkInput = addModal.querySelector(".popup__input_type_url");

  const titleValue = titleInput.value;
  const linkValue = linkInput.value;
  renderCard(titleValue, linkValue, cardsSection);
  closeModal(addModal);
}

export {
  renderCard,
  validateEditForm,
  validateCardForm,
  handleProfileFormSubmit,
  handleCardFormSubmit,
};
