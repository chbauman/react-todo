import React, { Component } from "react";
import Todo from "./todo";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  new_task_style = {
    margin: "5px",
  };
  render() {
    const { todos, onAdd, onDelete, onDone } = this.props;
    return (
      <div>
        <div className="input-group row" stype={this.new_task_style}>
          <label
            htmlFor="newTodo"
            className="col-md-3 col-lg-3 col-sm-3 col-xs-3 col-form-label"
          >
            New Task:
          </label>
          <input
            type="text"
            className="col-md-6 col-lg-6 col-sm-6 col-xs-6 form-control"
            id="newTodo"
            placeholder="Task XYZ"
            ref={this.myRef}
          ></input>
          <button
            onClick={() => onAdd(this.myRef)}
            className="col-md-3 col-lg-3 col-sm-3 col-xs-3 btn btn-primary"
          >
            Add
          </button>
        </div>
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
