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
        .then(this._getResponseData);
    }

    updateProfileInfo(name, job) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
        .then(this._getResponseData);
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
        .then(this._getResponseData);
    }

    deleteCardFromServer(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._getResponseData);
    }

    putLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._getResponseData);
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._getResponseData);
    }

    updateAvatar(item) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: item.link
            })
        })
        .then(this._getResponseData);
    }

    _getResponseData(res) {
        console.log(res)
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }
} 