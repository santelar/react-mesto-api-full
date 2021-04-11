export const baseUrl = 'https://api.santelar.nomoredomains.icu';

//export const baseUrl = 'http://localhost:3001';

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  setToken(token) {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    }
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserData() {
    return fetch(`${this._url}/users/me`,
      {
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
  }

  getInitialData() {
    return Promise.all([this.getUserData(), this.getCards()]);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  editProfile(name, job) {
    return fetch(`${this._url}/users/me`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: job
        })
      })
      .then(res => this._checkResponse(res))
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`,
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`,
      {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
  }

  uploadAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: url
        })
      })
      .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`,
      {
        method: isLiked ? "PUT" : "DELETE",
        headers: this._headers
      })
      .then(res => this._checkResponse(res))
  }
}

const api = new Api({
  url: baseUrl,
  headers: {
    "Content-Type": "application/json",
  }
});

export default api;
