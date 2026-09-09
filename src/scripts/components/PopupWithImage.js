import { popups } from "../utils/constants.js"
import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popUpSelector, srcValue, nameValue) {
    super(popUpSelector);
    this._srcValue = srcValue;
    this._nameValue = nameValue;
  }

  open(srcValue = this._srcValue, nameValue = this._nameValue) {
    this._popUpSelector.querySelector(".popup__caption").textContent = nameValue;
    this._popUpSelector.querySelector(".popup__image").src = srcValue;
    this._popUpSelector.querySelector(".popup__image").alt = nameValue;
    super.open();
  }
}

export default PopupWithImage;