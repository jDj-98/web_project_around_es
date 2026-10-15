class Api {
  constructor(baseUrl, { config }) {
    this._baseUrl = baseUrl;
    this._config = config.headers;
  }

  static getAllData(requests) {
    return Promise.all(requests);
  }

  _checkResponse(response) {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return response;
  }

  getApiUserInfo() {
    return fetch(this._baseUrl, {
      headers: {
        authorization: this._config.authorization,
      },
    })
      .then((res) => this._checkResponse(res))
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.error("Error al obtener el usuario:", error);
        throw error;
      });
  }

  getInitialCards() {
    return fetch(this._baseUrl, {
      headers: {
        authorization: this._config.authorization,
      },
    })
      .then((res) => this._checkResponse(res))
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.error("Error al obtener las tarjetas:", error);
        throw error;
      });
  }

  updateUserInfo(userData) {
    {
      return fetch(this._baseUrl, {
        method: "PATCH",
        headers: {
          authorization: this._config.authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.name,
          about: userData.about,
        }),
      })
        .then((res) => this._checkResponse(res))
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((error) => {
          console.error("Error al actualizar el usuario:", error);
          throw error;
        });
    }
  }

  addNewCard(cardData) {
    return fetch(this._baseUrl, {
      method: "POST",
      headers: {
        authorization: this._config.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
      .then((res) => this._checkResponse(res))
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.error("Error al crear la tarjeta:", error);
        throw error;
      });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._config.authorization,
      },
    })
      .then((res) => this._checkResponse(res))
      .catch((error) => {
        console.error("Error al dar like:", error);
        throw error;
      });
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._config.authorization,
      },
    })
      .then((res) => this._checkResponse(res))
      .catch((error) => {
        console.error("Error al quitar el like:", error);
        throw error;
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._config.authorization,
      },
    })
      .then((res) => this._checkResponse(res))
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
        throw error;
      });
  }

  updateProfilePicture(avatarUrl) {
    return fetch(this._baseUrl, {
      method: "PATCH",
      headers: {
        authorization: this._config.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: avatarUrl }),
    })
      .then((res) => this._checkResponse(res))
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error al actualizar la foto de perfil:", error);
        throw error;
      });
  }
}

export default Api;
