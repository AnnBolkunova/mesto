import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._form = this._popup.querySelector('.popup__form')
    }

    open(deleteCardFromServer) {
        super.open();
        this._deleteCardFromServer = deleteCardFromServer;
    }

    _handleDeleteElement = (evt) => {
        evt.preventDefault();
        this._deleteCardFromServer();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleDeleteElement)
    }
}