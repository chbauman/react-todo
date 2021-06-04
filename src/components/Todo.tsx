import { Button, ButtonGroup } from "react-bootstrap";

export const noSpaceStyle = { margin: 0, padding: 0 };

export type Todo = {
  id: string;
  text: string;
  done: Date | null;
};

const styles = {
  fontSize: "20px",
  borderStyle: "solid",
  margin: "3px",
  padding: "3px",
  borderRadius: "5px",
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
    <div className="w-100 d-flex justify-content-between" style={styles}>
      {props.todo.text}
      {buttGroup}
    </div>
  );
}
