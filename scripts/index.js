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

initialCards.forEach(function(card) {
    console.log(card);
});

const editButton = document.querySelector('.profile__edit-button');
console.log(editButton);
const editModal = document.querySelector('#edit-popup');
console.log(editModal);
const closeEditSectionButton = editModal.querySelector('.popup__close');
console.log(closeEditSectionButton);

function openModal(modal){
  modal.classList.add('popup_is-opened');
}

function closeModal(modal){
  modal.classList.remove('popup_is-opened');
}

function fillProfileForm(){
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  console.log(profileName);
  console.log(profileDescription);

  const nameInput = editModal.querySelector('.popup__input_type_name');
  const descriptionInput = editModal.querySelector('.popup__input_type_description');

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;  
}

function handleOpenEditModal(){
  fillProfileForm();
  openModal(editModal);
}

editButton.addEventListener('click', function(modal) {
  handleOpenEditModal();
});

closeEditSectionButton.addEventListener('click', function(modal) {
  closeModal(editModal);
});

const editForm = editModal.querySelector('#edit-profile-form');

function handleProfileFormSubmit(evt){
  evt.preventDefault();

  const nameInput = editModal.querySelector('.popup__input_type_name');
  const descriptionInput = editModal.querySelector('.popup__input_type_description');

  let nameValue = nameInput.value;
  let descriptionValue = descriptionInput.value;

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');  

  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  closeModal(editModal);
}

editForm.addEventListener('submit', function(evt) {
  handleProfileFormSubmit(evt);
});