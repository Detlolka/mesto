
export default class UserInfo {
    constructor({userName, userAbout}) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
        this._user = {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        }
        console.log(this._user);
                
    }

    getUserInfo() {        
        return this._user;        
    }

    setUserInfo({name, about}) {
       this._user = {name, about};
       this._userName = name.textContent;
       this._userAbout = about.textContent;
    }
}