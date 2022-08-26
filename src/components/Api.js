export default class Api {
    constructor(apiData) {
        this._url = apiData.url;
        this._headers = apiData.headers;
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then((res) => {
                return this._getResponseData(res)
            })
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then((res) => {
                return this._getResponseData(res)
            })
    }

    updateProfileInfo({ name, job }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
            .then((res) => {
                return this._getResponseData(res)
            })
    }

    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                return this._getResponseData(res)
            })
    }

    deleteCardFromServer(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => {
                return this._getResponseData(res)
            })
    }

    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then((res) => {
                return this._getResponseData(res)
            })
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => {
                return this._getResponseData(res)
            })
    }

    updateAvatar(item) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: item.url
            })
        })
            .then((res) => {
                return this._getResponseData(res)
            })
    }

    _getResponseData(res) {

        if (res.ok) {
            return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
    }
} 