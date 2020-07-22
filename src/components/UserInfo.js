
export default class UserInfo {
    constructor({ userName, userAbout }) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);        
    }

    getUserInfo() {
        const user = {};
        user.name = this._userName.textContent;
        user.about = this._userAbout.textContent;
        return user
    }

    setUserInfo({ name, about }) {        
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    }
}