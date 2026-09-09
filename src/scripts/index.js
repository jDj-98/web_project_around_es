//Importamos las clases y constantes necesarias para la construcción de la aplicación
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  initialCards,
  editInputs,
  editButton,
  editSubmitButton,
  cardInputs,
  addButton,
  cardSubmitButton,
  editForm,
  cardForm,
  cardsSection,
  profileName,
  profileJob,
  popups,
  imagePopup,
  linkValue,
  titleValue,
  titleInputSelector,
  linkInputSelector,
  popupCaption,
  popupImage,
  nameInputSelector,
  jobInputSelector,
  editPopup,
  addPopup,
} from "../scripts/utils/constants.js";
//Empezamos definiendo los objetos de las clases que se requeriran para la construcción de las secciones
// `UserInfo` espera un objeto con `userNameSelector` y `userJobSelector`
const userInfoObject = new UserInfo({
  userNameSelector: profileName,
  userJobSelector: profileJob,
});
const imagePopupObject = new PopupWithImage(imagePopup, linkValue, titleValue);
const editFormPopupObject = new PopupWithForm(editPopup, (formValues) => {
  userInfoObject.setUserInfo({
    name: formValues.name,
    job: formValues.description,
  });
  editFormPopupObject.close();
});
const cardFormPopupObject = new PopupWithForm(addPopup, (formValues) => {
  const cardData = {
    name: formValues.name,
    link: formValues.link,
  };
  const newCardElement = createCard(cardData);
  cardList.addItem(newCardElement);
  cardFormPopupObject.close();
});
imagePopupObject.setEventListeners();
editFormPopupObject.setEventListeners();
cardFormPopupObject.setEventListeners();

//Luego, definimos la funcion que renderizará las tarjetas
//Función que renderiza una tarjeta usando la clase Card.
const createCard = (cardData) => {
  const cardInstance = new Card(
    cardData.name,
    cardData.link,
    "#card-template",
    (name, link) => imagePopupObject.open(link, name),
  );

  return cardInstance.getView();
};
//También hacemos uso del objeto Section para renderizar las tarjetas iniciales.
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
    },
  },
  ".cards__list",
);
//Renderizamos las tarjetas iniciales
cardList.renderItems();

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
const editFormValidator = new FormValidator(editConfig, editForm);
editFormValidator.setEventListeners();

const cardFormValidator = new FormValidator(cardConfig, cardForm);
cardFormValidator.setEventListeners();

//Abrir el modal de edición de perfil al hacer click en el botón de editar
const openEditForm = () => {
  const currentUserData = userInfoObject.getUserInfo();
  editFormValidator.resetFormErrors(editInputs, editForm, editSubmitButton);
  // Rellenar los inputs del formulario de edición con los valores actuales
  nameInputSelector.value = currentUserData.name;
  jobInputSelector.value = currentUserData.job;
  editFormPopupObject.open();
};
const openCardForm = () => {
  cardFormValidator.resetFormErrors(cardInputs, cardForm, cardSubmitButton);
  cardFormPopupObject.open();
};
//Declaramos los event listeners para los botones de abrir los modales
editButton.addEventListener("click", openEditForm);
addButton.addEventListener("click", openCardForm);
