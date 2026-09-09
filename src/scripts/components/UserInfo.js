class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameSelector.textContent,
      job: this._userJobSelector.textContent,
    };
    return userInfo;
  }

  setUserInfo({ name, job }) {
    this._userNameSelector.textContent = name;
    this._userJobSelector.textContent = job;
  }
}

export default UserInfo;