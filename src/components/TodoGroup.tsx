import { Fragment } from "react";
import TodoComponent, { Todo } from "./Todo";
import { Row } from "react-bootstrap";

export default function TodoGroup(props: { todos: Todo[] }) {
  return (
    <Fragment>
      {props.todos.map((el) => (
        <Row>
          <TodoComponent todo={el}></TodoComponent>
        </Row>
      ))}
    </Fragment>
  );
}
