export default class Api {
  constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;        
  }
  
  _response(res) {
      if (res.ok) {
          console.log(res.json())
          return res.json()
      }
      return Promise.reject(`Что то пошло не так: ${res.status}`)      
  }

  getInitialCard() {                        //GET-запрос карточек
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers})
    .then(this._response)
    .catch(err => console.error(`Ошибка: ${err}`))
}

  getUserData() {  // PATCH-запрос на обновление дангных пользователя с сервера
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name,
              about
          })
      })
      .then(this._response);
  }
}
