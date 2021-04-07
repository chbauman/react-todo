import React, { useState } from "react";


const styles = {
  fontSize: "20px",
  borderStyle: "solid",
  margin: "3px",
  padding: "3px",
  borderRadius: "5px",
};

function Todo(props) {
  const [value, setValue] = useState(props.todo_data.value);

  return (
    <React.Fragment>
      <div className="row" style={styles} data-testid="todo">
        <span className="btn-group col-md-9 col-lg-9 col-sm-9 col-xs-9">
          {value}
        </span>
        <div className="btn-group col-md-3 col-lg-3 col-sm-3 col-xs-3">
          <button
            className="btn-sm btn-secondary"
            onClick={() => {
              props.onDelete(props.todo_data.text);
            }}
          >
            Done<span className="glyphicon glyphicon-ok"></span>
          </button>
          <button
            className="btn-sm btn-danger"
            onClick={() => {
              props.onDelete(props.todo_data.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Todo;
