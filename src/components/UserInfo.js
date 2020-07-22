
export default class UserInfo {
    constructor({ userName, userAbout }) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);        
    }

    getUserInfo() {
        this._user = {};
        this._user.name = this._userName.textContent;
        this._user.about = this._userAbout.textContent;
        return this._user
    }

    setUserInfo({ name, about }) {            
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    }
}