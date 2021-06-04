import { Container } from "react-bootstrap";
import "./App.css";
import PendingTodos from "./components/PendingTodos";
import TodoComponent, { Todo } from "./components/Todo";

const initTodos: Todo[] = [{ id: 0, text: "First todo", done: null }];

function App() {
  return (
    <Container>
      <PendingTodos todoList={initTodos}></PendingTodos>
      <TodoComponent todo={initTodos[0]}></TodoComponent>
    </Container>
  );
}

export default App;
