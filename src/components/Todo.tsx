import { Breadcrumb, Button, ButtonGroup } from "react-bootstrap";
import {
  globalTodoHandler,
  Todo,
  TodoGroup,
  TodoGroupAndGroups,
} from "./TodoGroup";

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
  currParentGroups: TodoGroup[];
  setGroup: (grp: TodoGroupAndGroups) => void;
  currentGroup: TodoGroupAndGroups;
}) {
  // Handle text
  const text = props.todo.text;
  const groupsNotShown = props.currentGroup.groupList;

  // Define breadcrumbs to choose group
  const groupCrumbs = (
    <Breadcrumb>
      {props.currParentGroups.map((el, idx) => {
        const onClick = () => {
          const subGroups = props.currParentGroups.slice(0, idx);
          console.log(subGroups);
          props.setGroup({
            todo: el,
            groupList: groupsNotShown.concat(subGroups),
          });
        };
        return (
          <Breadcrumb.Item key={el.id} onClick={onClick}>
            {el.name}
          </Breadcrumb.Item>
        );
      })}
      <Breadcrumb.Item active>{text}</Breadcrumb.Item>
    </Breadcrumb>
  );

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
      {groupCrumbs}
      {buttGroup}
    </div>
  );
}
