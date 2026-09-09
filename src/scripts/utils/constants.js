//Definición de selectores de elementos HTML
//Modales:
export const editPopup = document.querySelector("#edit-popup");
export const addPopup = document.querySelector("#new-card-popup");
export const imagePopup = document.querySelector("#image-popup");
//Todos los popups
export const popups = document.querySelectorAll(".popup");
//Buttons
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const closeEditSectionButton = editPopup.querySelector(".popup__close");
export const closeAddSectionButton = addPopup.querySelector(".popup__close");
export const popupCloseButton = imagePopup.querySelector(".popup__close");
export const editSubmitButton = editPopup.querySelector(".popup__button_edit");
export const cardSubmitButton = addPopup.querySelector(".popup__button_add");
//Forms
export const editForm = editPopup.querySelector("#edit-profile-form");
export const cardForm = addPopup.querySelector("#new-card-form");
//Form inputs
export const editInputs = editForm.querySelectorAll(".popup__input");
export const cardInputs = cardForm.querySelectorAll(".popup__input");
//Other elements
export const cardsSection = document.querySelector(".cards__list");
//popup image elements
export const popupImage = imagePopup.querySelector(".popup__image");
export const popupCaption = imagePopup.querySelector(".popup__caption");
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");

export const titleInputSelector = addPopup.querySelector(
  ".popup__input_type_card-name",
);
export const linkInputSelector = addPopup.querySelector(
  ".popup__input_type_url",
);

export const titleValue = titleInputSelector.value;
export const linkValue = linkInputSelector.value;

export const nameInputSelector = editPopup.querySelector(
  ".popup__input_type_name",
);
export const jobInputSelector = editPopup.querySelector(
  ".popup__input_type_description",
);

export let initialCards = [
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
