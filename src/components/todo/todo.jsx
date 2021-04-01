import React, { Component, Button } from "react";

class Todo extends Component {
  state = {
    value: this.props.todo_data.value,
  };
  styles = {
    fontSize: "20px",
    "border-style": "solid",
    margin: "3px",
    padding: "3px",
    "border-radius": "5px",
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={this.styles}>
          <span className="btn-group col-md-9 col-lg-9 col-sm-9 col-xs-9">
            {this.renderText()}
          </span>
          <div className="btn-group col-md-3 col-lg-3 col-sm-3 col-xs-3">
            <button
              className="btn-sm btn-secondary"
              onClick={() => {
                this.props.onDelete(this.props.todo_data.text);
              }}
            >
              Done<span className="glyphicon glyphicon-ok"></span>
            </button>
            <button
              className="btn-sm btn-danger"
              onClick={() => {
                this.props.onDelete(this.props.todo_data.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderText() {
    return this.state.value;
  }
}

export default Todo;
