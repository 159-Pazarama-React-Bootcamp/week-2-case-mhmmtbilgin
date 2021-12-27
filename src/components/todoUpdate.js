import React from "react";
import "../App.css";
import { inject, observer } from "mobx-react";

class TodoUpdate extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <div className="todo">
          <div className="todo__header">
            <span className="todo__title">To Do List Güncelle</span>
          </div>
          <form>
            <div className="todo__list">
              <span>Görev:</span>
              <input
                type="text"
                placeholder="Update..."
                defaultValue={
                  this.props.TodoStore.appState.content
                    ? this.props.TodoStore.appState.content
                    : ""
                }
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default inject("TodoStore")(observer(TodoUpdate));
