import React, { Component } from "react";
import Todo from "./todo";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    const { todos, onAdd, onDelete, onDone } = this.props;
    return (
      <div>
        <div class="form-group row">
          <label htmlFor="newTodo" className="col-sm-2 col-form-label">
            New Task:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              id="newTodo"
              placeholder="Task XYZ"
              ref={this.myRef}
            ></input>
          </div>
          <div>
            <button
              onClick={() => onAdd(this.myRef)}
              className="btn btn-primary btn-sm m-2"
            >
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
