import { openModal, closeModal } from "./Utils.js";
class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
  }

  setEventListeners() {
    this._validateForm();
  }

  _validateForm() {
    //forEach que valida en tiempo real el input del popup de edición.
    this._selectors.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage, this._form);
        } else {
          this._hideInputError(input, this._form);
        }
        this._toggleButtonState(
          this._selectors.inputs,
          this._selectors.submitButton,
        );
      });
      this._selectors.customButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        this._resetFormErrors(this._selectors.inputs, this._form, this._selectors.submitButton);
      });
    });
  }

  //Funciones para validar el formulario de edición del perfil, también se define un forEach para validar
  //en tiempo real cada input del formulario
  //Funcion que muestra el mensaje de error debajo del input correspondiente, y agrega la clase de error al input.
  _showInputError(element, errorMessage) {
    const errorElement = this._form.querySelector(
      `.popup__input-error_type_${element.id}`,
    );
    element.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  }
  //Funcion que oculta el mensaje de error debajo del input correspondiente, y quita la clase de error al input.
  _hideInputError(element) {
    const errorElement = this._form.querySelector(
      `.popup__input-error_type_${element.id}`,
    );
    element.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = "";
  }
  //Funcion que activa o desactiva el botón submitt en los formularios
  _toggleButtonState(inputs, button) {
    const allValid = Array.from(inputs).every((input) => input.validity.valid);
    button.disabled = !allValid;
  }

  //Función que resetea los mensajes de error al abrir un popup
  _resetFormErrors(inputs, form, button) {
    inputs.forEach((input) => {
      this._hideInputError(input, form);
    });
    this._toggleButtonState(inputs, button);
  }
}
export default FormValidator;
