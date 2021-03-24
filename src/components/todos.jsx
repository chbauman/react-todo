import React, { Component } from "react";
import Todo from "./todo";

class Todos extends Component {
  render() {
    const { todos, onAdd, onDelete, onDone } = this.props;
    return (
      <div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            New Task:
          </label>
          <div>
            <input
              type="text"
              class="form-control"
              id="staticEmail"
              placeholder="Task XYZ"
            ></input>
          </div>
          <div>
            <button onClick={onAdd} className="btn btn-primary btn-sm m-2">
              Add
            </button>
          </div>
        </div>
        <br></br>
        {todos.map((c) => (
          <Todo
            key={c.id}
            todo_data={c}
            onDone={onDone}
            onDelete={onDelete}
          ></Todo>
        ))}
      </div>
    );
  }
}

export default Todos;
