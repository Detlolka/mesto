
export default class UserInfo {
    constructor(userName, userAbout, avatar, id = "null") {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
        this._avatarProfile = document.querySelector(avatar);        
        this._user = {
            _id: id,
            name: this._userName.textContent,
            about: this._userAbout.textContent,
            avatar: this._avatarProfile.src 
        }        
    }

    getUserInfo() {                    
        return this._user
    }

    setUserInfo({name, about, _id, avatar }) {
        if (name) {
            this._user.name = name            
            this._userName.textContent = name;
        }
        if (about) {
            this._user.about = about;
            this._userAbout.textContent = about;
        }
        if (avatar) {
            this._user.avatar = avatar;      
            this._avatarProfile.src = avatar;
        }
        if (_id) {
            this._user._id = _id;
        }              
    }
}