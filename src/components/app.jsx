import React, { Component } from "react";
import Navbar from "./navbar";
import Counters from "./counters";
import Todos from "./todos";

class App extends Component {
  state = {
    todos: [{ id: 0, value: "First task" }],
    todo_ref_count: 0,
    counters: [{ id: 0, value: 4 }],
    id_count: 0,
  };

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);

    this.addNewTodo = this.addNewTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    this.setCountersState = this.setNewState.bind(this);
  }

  handleDelete(counterID) {
    const counters = this.state.counters.filter((c) => c.id !== counterID);
    this.setNewState(counters, null, null);
  }

  handleIncrement(counter) {
    const counters = [...this.state.counters];
    const idx = counters.indexOf(counter);
    counters[idx] = { ...counter };
    counters[idx].value++;
    this.setNewState(counters, null, null);
  }

  setNewState(
    new_counters,
    new_id_count,
    new_todos,
    new_todo_rec_count = null
  ) {
    if (new_id_count === null) {
      new_id_count = this.state.id_count;
    }
    if (new_todo_rec_count === null) {
      new_todo_rec_count = this.state.todo_ref_count;
    }
    if (new_todos === null) {
      new_todos = [...this.state.todos];
    }
    if (new_counters === null) {
      new_counters = [...this.state.counters];
    }
    this.setState({
      counters: new_counters,
      id_count: new_id_count,
      todos: new_todos,
      todo_ref_count: new_todo_rec_count,
    });
  }

  handleReset() {
    const cs = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setNewState(cs, null, null);
  }

  handleAdd() {
    const new_ref_count = this.state.id_count + 1;
    const counters_new = [
      ...this.state.counters,
      { id: new_ref_count, value: 3 },
    ];
    this.setNewState(counters_new, new_ref_count, null);
  }

  addNewTodo(ref) {
    const txt = ref.current.value;
    if (!txt || txt === "") {
      return;
    }
    const new_id = this.state.todo_ref_count + 1;
    const new_todo = { id: new_id, value: txt };
    const new_todos = [new_todo, ...this.state.todos];
    ref.current.value = "";
    this.setNewState(null, null, new_todos, new_id);
  }

  deleteTodo(todoID) {
    const rem_todos = this.state.todos.filter((c) => c.id !== todoID);
    this.setNewState(null, null, rem_todos);
  }

  render() {
    return (
      <div>
        <Navbar
          counters={this.state.counters.filter((c) => c.value > 0).length}
        ></Navbar>
        <main className="container">
          <Todos
            onAdd={this.addNewTodo}
            onDelete={this.deleteTodo}
            todos={this.state.todos}
          ></Todos>
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
