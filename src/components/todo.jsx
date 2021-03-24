import React, { Component } from "react";

class Todo extends Component {
  state = {
    value: this.props.todo_data.value,
  };
  styles = {
    fontSize: "20px",
  };

  render() {
    console.log("todo_props", this.props);
    return (
      <React.Fragment>
        <span style={this.styles}>{this.renderText()}</span>
        <button
          className="btn btn-secondary btn-sm m-2"
          onClick={() => {
            this.props.onDelete(this.props.todo_data.text);
          }}
        >
          Done
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => {
            this.props.onDelete(this.props.todo_data.id);
          }}
        >
          Delete
        </button>
        <br></br>
      </React.Fragment>
    );
  }

  renderText() {
    return this.state.value;
  }
}

export default Todo;
