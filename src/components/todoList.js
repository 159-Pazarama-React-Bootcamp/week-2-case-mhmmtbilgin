import React from "react";
import todoService from "../services/todoService";
import "../App.css";
import ReactModal from "react-modal";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Formik } from "formik";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isModalOpen: false,
    };
  }
  openModal() {
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  componentDidMount() {
    todoService.getTodo().then((res) => {
      this.setState({ todos: res.data });
    });
  }
  deleteTodo(id) {
    todoService.deleteTodo(id).then((res) => {
      this.setState({
        todos: this.state.todos.filter((todo) => todo.id !== id),
      });
    });
  }
  sendId(id) {
    todoService.getTodoById(id).then((res) => {
      const todoData = {
        id: res.data.id,
        content: res.data.content,
      };
      this.props.TodoStore.setContent(todoData);
    });
  }

  render() {
    const name = localStorage.getItem("name");
    const addTodo = (values) => {
      if (values.content.length > 2) {
        todoService
          .createTodo(values)
          .then((res) => {
            alert(res.data.content + " Görevi Eklendi");
            window.location.reload(false);
          })
          .catch((error) => {
            alert("Hata :" + error);
          });
      } else {
        alert("Minimum 3 Karakter girmelisiniz.");
      }
    };
    return (
      <div className="main">
        <div className="todo">
          <div className="todo__header">
            <span className="todo__title">To Do List </span>
            <h2>{name}</h2>
            <button className="form-btn" onClick={() => this.openModal()}>
              ekle
            </button>
            <ReactModal
              isOpen={this.state.isModalOpen}
              className={"todo__react-modal"}
            >
              <div className="todo__modal">
                <span
                  className="todo__close-modal"
                  onClick={() => this.closeModal()}
                >
                  Modal'ı Kapat X
                </span>
                <h1 id="heading">To do Gir</h1>
                <div className="todo__modal-item">
                  <Formik
                    initialValues={{
                      content: "",
                    }}
                    onSubmit={addTodo}
                  >
                    {({ values, handleChange, handleSubmit, handleBlur }) => (
                      <div className="form-group">
                        <input
                          name="content"
                          value={values.content}
                          onChange={handleChange("content")}
                          onBlur={handleBlur}
                          className="form-input"
                          type={"text"}
                        />

                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="form-btn"
                        >
                          Ekle
                        </button>
                      </div>
                    )}
                  </Formik>
                </div>
              </div>
            </ReactModal>
          </div>
          <div className="todo__list">
            {this.state.todos.map((todo) => (
              <div className="todo__item" key={todo.id}>
                <span
                  onClick={() => this.deleteTodo(todo.id)}
                  className="todo__delete"
                >
                  {" "}
                  Sil{" "}
                </span>
                <Link to={"/update"}>
                  {" "}
                  <span
                    className="todo__update"
                    onClick={() => this.sendId(todo.id)}
                  >
                    {" "}
                    Güncelle{" "}
                  </span>
                </Link>
                <span className="todo__content">{todo.content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ReactModal.setAppElement(document.getElementById("root"));
export default inject("TodoStore")(observer(TodoList));
