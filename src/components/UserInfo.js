export default class UserInfo {
    constructor({userName, userAbout}) {
        this._userName = userName;
        this._userAbout = userAbout;             
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