import Popup from "./Popup"

export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector)
        this._form = this._popup.querySelector('.popup__form')
    }

    getFormSubmitHandler(callback) {
        this._addFormSubmitHandler = callback
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._addFormSubmitHandler()
        })
    }
} 