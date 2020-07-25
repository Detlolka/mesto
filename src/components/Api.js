export default class Api {
  constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;        
  }
  
  _response(res) {
      if (res.ok) {          
          return res.json()
      }
      return Promise.reject(`Что то пошло не так: ${res.status}`)      
  }

  getInitialCards() {                        //GET-запрос карточек
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers})
    .then(this._response)    
}

  createCard (name, link) {  // POST-запрос на добавление карточки
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })      
    })
    .then(this._response)
  }

  removeCard(cardId) { // DELETE - запрос на удаление карточки
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._response);
  }

  likeCard(cardId) {  // PUT-запрос на лайк
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._response);
  }

  dislikeCard(cardId) {  // DELETE- запрос на лайк
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._response);
  }
  

  getUserInfo() {     // GET-запрос на получение данных пользователя
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers  
    })
    .then(this._response)    
  }

  changeUserInfo(name, about) {  // PATCH-запрос на обновление даннных пользователя с сервера
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name,
            about
        })        
    })
    .then(this._response)   
 }

  changeAvatar(avatar) {  // PATCH - запрос на обновление аватарки
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._response);
  }


}





