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
console.log(editModal);
const addModal = document.querySelector("#new-card-popup");
console.log(addModal);
const imageModal = document.querySelector("#image-popup");
console.log(imageModal);
//Todos los popups
const popups = document.querySelectorAll(".popup");
console.log(popups);
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
const editSubmitButton = editModal.querySelector(".popup__button_edit");
console.log(editSubmitButton);
const cardSubmitButton = addModal.querySelector(".popup__button_add");
console.log(cardSubmitButton);
//Forms
const editForm = editModal.querySelector("#edit-profile-form");
console.log(editForm);
const cardForm = addModal.querySelector("#new-card-form");
console.log(cardForm);
//Form inputs
const editInputs = editForm.querySelectorAll(".popup__input");
console.log(editInputs);
const cardInputs = cardForm.querySelectorAll(".popup__input");
console.log(cardInputs);
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

//Definición de los objetos para la clase FormValidator
const editConfig = {
  inputs: editInputs,
  submitButton: editSubmitButton,
};

const cardConfig = {
  inputs: cardInputs,
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
validateEditForm();
validateCardForm();
//Functions
//Función que renderiza una tarjeta usando la clase Card.
function renderCard(name, link, container) {
  const cardInstance = new Card(
    name,
    link,
    "#card-template",
    popupCaption,
    popupImage,
    imageModal,
  ).getView();

  container.prepend(cardInstance);
}
//Render de las cartas
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsSection);
});

function handleOpenEditModal() {
  fillProfileForm();
  resetFormErrors(editInputs, editForm, editSubmitButton);
  openModal(editModal);
}

//Función que resetea los mensajes de error al abrir un popup
function resetFormErrors(inputs, form, button) {
  inputs.forEach((input) => {
    hideInputError(input, form, button);
  });
  toggleButtonState(inputs, button);
}

//forEach que valida en tiempo real el input del popup de nueva tarjeta.
cardInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage, cardForm);
    } else {
      hideInputError(input, cardForm);
    }
    toggleButtonState(cardInputs, cardSubmitButton);
  });
});
//Detectores de eventos
editButton.addEventListener("click", function (modal) {
  handleOpenEditModal();
});

closeEditSectionButton.addEventListener("click", function (modal) {
  closeModal(editModal);
});

addButton.addEventListener("click", function (modal) {
  resetFormErrors(cardInputs, cardForm, cardSubmitButton);
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

//Recorrer los popups para agregar un event listener que cierre el popup en cuestión al hacer click fuera del contenido del mismo
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});
//Valida si un modal está abierto para cerrar con la tecla esc
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
});

//Funciones para validar el formulario de edición del perfil, también se define un forEach para validar
//en tiempo real cada input del formulario
//Funcion que muestra el mensaje de error debajo del input correspondiente, y agrega la clase de error al input.
function showInputError(element, errorMessage, form) {
  const errorElement = form.querySelector(
    `.popup__input-error_type_${element.id}`,
  );
  element.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}
//Funcion que oculta el mensaje de error debajo del input correspondiente, y quita la clase de error al input.
function hideInputError(element, form) {
  const errorElement = form.querySelector(
    `.popup__input-error_type_${element.id}`,
  );
  element.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
}

//Funcion que activa o desactiva el botón submitt en los formularios
function toggleButtonState(inputs, button) {
  const allValid = Array.from(inputs).every((input) => input.validity.valid);
  button.disabled = !allValid;
}

//Función que llena el formulario de edición del perfil con los datos actuales del perfil,
//se llama dentro de la función handleOpenEditModal para que se ejecute cada vez que se abre el popup de edición.
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

//Función que maneja el submit del formulario de edición del perfil,
//actualiza el nombre y la descripción del perfil con los valores ingresados en el formulario, y luego cierra el modal de edición.
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

//Función que maneja el submit del formulario de nueva tarjeta, crea una nueva tarjeta con los valores ingresados en el formulario,
//la agrega a la sección de tarjetas, y luego cierra el modal de nueva tarjeta.
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = addModal.querySelector(".popup__input_type_card-name");
  const linkInput = addModal.querySelector(".popup__input_type_url");

  let titleValue = titleInput.value;
  let linkValue = linkInput.value;
  renderCard(titleValue, linkValue, cardsSection);
  closeModal(addModal);
}

export {
  showInputError,
  hideInputError,
  toggleButtonState,
  renderCard,
  validateEditForm,
  validateCardForm,
  handleProfileFormSubmit,
  handleCardFormSubmit,
};
