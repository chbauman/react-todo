import { Col, Row } from "react-bootstrap";
import TodoComponent, { Todo } from "./Todo";

export default function PendingTodos(props: { todoList: Todo[] }) {
  return (
    <Col>
      <Row>TODO:</Row>
      {props.todoList.map((el) => {
        console.assert(el.done === null, "found a bug!");
        return (
          <Row>
            <TodoComponent todo={el}></TodoComponent>
          </Row>
        );
      })}
    </Col>
  );
}
