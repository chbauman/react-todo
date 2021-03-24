import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const { counters, onReset, onAdd, onIncrement, onDelete } = this.props;
    return (
      <div>
        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>

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
        {counters.map((c) => (
          <Counter
            key={c.id}
            selected={true}
            counter={c}
            onIncrement={onIncrement}
            onDelete={onDelete}
          >
            <h2>Counter {c.id}</h2>
          </Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
