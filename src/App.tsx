import { useRef } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import NewTodo from "./components/NewTodo";
import PendingTodos from "./components/PendingTodos";
import { Todo } from "./components/TodoGroup";

const initTodos: Todo[] = [
  { id: "first", text: "First todo", done: null, parentId: null, type: "todo" },
];

function App() {
  const addNewCBRef = useRef();

  return (
    <Container>
      <NewTodo></NewTodo>
      <PendingTodos
        todoList={initTodos}
        addNewCBRef={addNewCBRef}
      ></PendingTodos>
    </Container>
  );
}

export default App;
