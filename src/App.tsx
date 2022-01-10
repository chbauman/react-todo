import { Container } from "react-bootstrap";
import "./App.css";
import NewTodo from "./components/NewTodo";
import PendingTodos from "./components/PendingTodos";

function App() {
  return (
    <Container>
      <NewTodo></NewTodo>
      <PendingTodos></PendingTodos>
    </Container>
  );
}

export default App;
