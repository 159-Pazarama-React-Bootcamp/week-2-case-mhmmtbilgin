import { observable, action, makeAutoObservable } from "mobx";

class TodoStore {
  appState = null;

  constructor() {
    makeAutoObservable(this, {
      appState: observable, // kullanici tarafindan state degisirse observable ile baglanti kurulan,
      // componentler tekrar render edilir.
      setContent: action, // action ile bu metotlara istedigimiz yerden ulasabiliriz
      getContent: action, // action ile bu metotlara istedigimiz yerden ulasabiliriz
    });
  }

  setContent = (appState) => {
    try {
      localStorage.setItem("content", JSON.stringify(appState));
      //localStorage.setItem('appState',appState);
      this.getContent();
    } catch (e) {
      console.log(e);
    }
  };

  getContent = () => {
    try {
      const todoContent = JSON.parse(localStorage.getItem("content"));
      if (todoContent) {
        this.appState = todoContent;
      } else {
        this.appState = null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  removeToken = () => {
    localStorage.removeItem("content");
    this.appState = null;
  };
}

export default new TodoStore();
