import { Fragment } from "react";
import { Alert, Button, ButtonGroup } from "react-bootstrap";

const noSpaceStyle = { margin: 0, padding: 0 };

export type Todo = {
  id: number;
  text: string;
  done: Date | null;
};

export default function TodoComponent(props: { todo: Todo }) {
  const doneButt = props.todo.done ? null : <Button>Done</Button>;
  const buttGroup = (
    <ButtonGroup>
      {doneButt}
      <Button variant="danger">Delete</Button>
    </ButtonGroup>
  );
  return (
    <Fragment>
      <Alert variant="info" style={noSpaceStyle}>
        {props.todo.text}
        {buttGroup}
      </Alert>
    </Fragment>
  );
}
