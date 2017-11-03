import { extendObservable } from 'mobx';
var axios = require("axios");

export default class UserStore {
  constructor() {
    extendObservable(this, {
      user: null,
      get retrieveUser() {
        return this.user
      }
    })
    axios.post('/getUser').then((success) => {
      this.user = success.data // when updated all observers will rerender comps
    })
  }

  submitLogin(username, password) {
    return new Promise((resolve, reject) => {
      axios.post('/login', {
        username: username,
        password: password,
      }).then((res) => {
        if (res.data) {
          this.user = res.data;
        }
        resolve(res.data);
      });
    });
  }

  logOut() {
    return new Promise((resolve, reject) => {
      axios.post('/logout').then((res) => {
        this.user = null;
        resolve(res.data);
      })
    }
    )
  }

} 