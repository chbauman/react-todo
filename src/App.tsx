import { useRef } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import NewTodo from "./components/NewTodo";
import PendingTodos from "./components/PendingTodos";
import { Todo } from "./components/Todo";

const initTodos: Todo[] = [{ id: "first", text: "First todo", done: null }];

function App() {
  const addNewCBRef = useRef();

  return (
    <Container>
      <NewTodo addNewCallbackRef={addNewCBRef as any}></NewTodo>
      <PendingTodos
        todoList={initTodos}
        addNewCBRef={addNewCBRef}
      ></PendingTodos>
    </Container>
  );
}

export default App;
