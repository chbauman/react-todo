import React, { Component } from "react";
import Navbar from "./navbar";
import Counters from "./counters";

class App extends Component {
  state = {
    counters: [{ id: 0, value: 4 }],
    id_count: 0,
  };

  constructor(props) {
    super(props);
    console.log("constructor");
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);

    this.setCountersState = this.setNewState.bind(this);
  }

  handleDelete(counterID) {
    const counters = this.state.counters.filter((c) => c.id !== counterID);
    this.setNewState(counters, null);
  }

  handleIncrement(counter) {
    const counters = [...this.state.counters];
    const idx = counters.indexOf(counter);
    counters[idx] = { ...counter };
    counters[idx].value++;
    this.setNewState(counters, null);
  }

  setNewState(new_counters, new_id_count) {
    if (new_id_count === null) {
      new_id_count = this.state.id_count;
    }
    this.setState({ counters: new_counters, id_count: new_id_count });
  }

  handleReset() {
    const cs = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setNewState(cs, null);
  }

  handleAdd() {
    const new_ref_count = this.state.id_count + 1;
    const counters_new = [
      ...this.state.counters,
      { id: new_ref_count, value: 3 },
    ];
    this.setNewState(counters_new, new_ref_count);
  }

  render() {
    return (
      <div>
        <Navbar
          counters={this.state.counters.filter((c) => c.value > 0).length}
        ></Navbar>
        <main className="Container">
          <Counters
            onReset={this.handleReset}
            onAdd={this.handleAdd}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            counters={this.state.counters}
          />
        </main>
      </div>
    );
  }
}

export default App;
