//Importamos las clases y constantes necesarias para la construcción de la aplicación
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/utils/Api.js";
import {
  editInputs,
  editButton,
  editSubmitButton,
  cardInputs,
  addButton,
  cardSubmitButton,
  editForm,
  cardForm,
  profileName,
  profileJob,
  imagePopup,
  linkValue,
  titleValue,
  nameInputSelector,
  jobInputSelector,
  editPopup,
  addPopup,
  editProfilePicturePopupSelector,
  editProfilePictureButton,
  deleteConfirmPopup,
  deleteCardPopupButton,
  editProfilePictureInputs,
} from "../scripts/utils/constants.js";
//Empezamos definiendo los objetos de las clases que se requeriran para la construcción de las secciones
// `UserInfo` espera un objeto con `userNameSelector` y `userJobSelector`

const api = new Api("https://around-api.es.tripleten-services.com/v1", {
  config: {
    headers: {
      authorization: "3cdca451-44ea-404c-8b9c-d81b671760ad",
    },
  },
});

const userInfoObject = new UserInfo({
  userNameSelector: profileName,
  userJobSelector: profileJob,
});

const imagePopupObject = new PopupWithImage(imagePopup, linkValue, titleValue);
const editFormPopupObject = new PopupWithForm(editPopup, (formValues) => {
  return api
    .updateUserInfo({ name: formValues.name, about: formValues.description })
    .then((userData) => {
      userInfoObject.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
      editFormPopupObject.close();
    })
    .catch((err) => {
      console.error(`Error al actualizar la información del usuario: ${err}`);
    });
});
const cardFormPopupObject = new PopupWithForm(addPopup, (formValues) => {
  const cardData = {
    name: formValues["place-name"],
    link: formValues.link,
  };
  return api.addNewCard(cardData).then((savedCardData) => {
    const newCardElement = createCard(savedCardData);
    cardList.addItem(newCardElement);
    cardFormPopupObject.close();
  });
});
const confirmDeleteCardPopup = new Popup(deleteConfirmPopup);

const editProfilePicturePopup = new PopupWithForm(
  editProfilePicturePopupSelector,
  (formValues) => {
    const newAvatarUrl = formValues["link"];
    return api
      .updateProfilePicture(newAvatarUrl)
      .then((userData) => {
        const profileImage = document.querySelector(".profile__image");
        profileImage.src = userData.avatar;
        editProfilePicturePopup.close();
      })
      .catch((err) => {
        console.error(`Error al actualizar la imagen de perfil: ${err}`);
      });

  },
);
//Agregamos los event listeners a los popups
editProfilePicturePopup.setEventListeners();
confirmDeleteCardPopup.setEventListeners();
imagePopupObject.setEventListeners();
editFormPopupObject.setEventListeners();
cardFormPopupObject.setEventListeners();

//Luego, definimos la funcion que renderizará las tarjetas
//Función que renderiza una tarjeta usando la clase Card.
let pendingCardToDelete = null;
let currentUserId = null;

deleteCardPopupButton.addEventListener("click", () => {
  if (!pendingCardToDelete) return;

  const cardToDelete = pendingCardToDelete;
  api
    .deleteCard(cardToDelete.id)
    .then(() => {
      cardToDelete.element.remove();
      pendingCardToDelete = null;
      confirmDeleteCardPopup.close();
    })
    .catch((err) => {
      console.error(`Error al eliminar la tarjeta: ${err}`);
    });
});

const createCard = (cardData) => {
  const cardOwnerId =
    typeof cardData.owner === "string" ? cardData.owner : cardData.owner?._id;
  const canDeleteCard = cardOwnerId === currentUserId;
  const cardInstance = new Card(
    cardData.name,
    cardData.link,
    "#card-template",
    cardData.isLiked,
    cardData._id,
    (name, link) => imagePopupObject.open(link, name),
    (isLiked, cardId) => {
      return isLiked ? api.likeCard(cardId) : api.dislikeCard(cardId);
    },
    canDeleteCard
      ? (cardId, cardElement) => {
          pendingCardToDelete = { id: cardId, element: cardElement };
          confirmDeleteCardPopup.open();
        }
      : null,
  );

  return cardInstance.getView();
};

let cardList;
Api.getAllData([api.getApiUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    currentUserId = userData._id;
    userInfoObject.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    document.querySelector(".profile__image").src = userData.avatar;

    cardList = new Section(
      {
        items: cardsData,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          cardList.addItem(cardElement);
        },
      },
      ".cards__list",
    );
    cardList.renderItems();
  })
  .catch((error) => {
    console.error("Error al cargar el perfil y las tarjetas:", error);
  });

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

const profileImageConfig = {
  inputs: editProfilePictureInputs,
  customButton: editProfilePictureButton,
  submitButton: editProfilePicturePopupSelector.querySelector(".popup__button"),
};

//validacion de los formularios por medio de la clase FormValidator
const editFormValidator = new FormValidator(editConfig, editForm);
editFormValidator.setEventListeners();

const cardFormValidator = new FormValidator(cardConfig, cardForm);
cardFormValidator.setEventListeners();

const profileImageValidator = new FormValidator(
  profileImageConfig,
  editProfilePicturePopupSelector.querySelector("#edit-pic-profile-form"),
);
profileImageValidator.setEventListeners();

//Abrir el modal de edición de perfil al hacer click en el botón de editar
const openEditForm = () => {
  const profileImage = document.querySelector(".profile__image");
  api.getApiUserInfo().then((userData) => {
    userInfoObject.setUserInfo({
      name: userData.name,
      job: userData.about,
    });

    // Rellenar los inputs del formulario de edición con los valores actuales
    nameInputSelector.value = userData.name;
    jobInputSelector.value = userData.about;
    profileImage.src = userData.avatar;
    editFormPopupObject.open();
  });
};

const openCardForm = () => {
  cardFormValidator.resetFormErrors(cardInputs, cardForm, cardSubmitButton);
  cardFormPopupObject.open();
};
const openEditProfilePictureForm = () => {
  console.log("Abriendo el popup de edición de imagen de perfil");
  editProfilePicturePopup.open();
};
//Declaramos los event listeners para los botones de abrir los modales
editButton.addEventListener("click", openEditForm);
addButton.addEventListener("click", openCardForm);
editProfilePictureButton.addEventListener("click", openEditProfilePictureForm);
