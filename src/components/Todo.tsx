import { Fragment } from "react";
import { Alert } from "react-bootstrap";

export type Todo = {
  id: number;
  text: string;
  done: Date | null;
};

export default function TodoComponent(props: { todo: Todo }) {
  return (
    <Fragment>
      <Alert variant="info">{props.todo.text}</Alert>
    </Fragment>
  );
}
