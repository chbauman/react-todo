import { Button, ButtonGroup } from "react-bootstrap";
import { globalTodoHandler, Todo, TodoGroup } from "./TodoGroup";

export const noSpaceStyle = { margin: 0, padding: 0 };

const styles = {
  fontSize: "20px",
  borderStyle: "solid",
  margin: "3px",
  padding: "3px",
  borderRadius: "5px",
};

export default function TodoComponent(props: {
  todo: Todo;
  groups: TodoGroup[];
}) {
  // Handle text
  const text = props.todo.text;
  const groupString = props.groups.map((el) => el.name).join(" > ");
  const textEl = `${groupString} > ${text}`;

  // Define buttons
  const onDone = () => {
    globalTodoHandler.setToDone(props.todo.id);
  };
  const doneButt = props.todo.done ? null : (
    <Button onClick={onDone}>Done</Button>
  );
  const buttGroup = (
    <ButtonGroup>
      {doneButt}
      <Button
        variant="danger"
        onClick={() => globalTodoHandler.deleteTodo(props.todo.id)}
      >
        Delete
      </Button>
    </ButtonGroup>
  );

  return (
    <div className="w-100 d-flex justify-content-between" style={styles}>
      {textEl}
      {buttGroup}
    </div>
  );
}
