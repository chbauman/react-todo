import { Col, Row } from "react-bootstrap";
import { useRegisteredRerender } from "../hooks/registerRerender";
import CompHeader from "./CompHeader";
import TodoComponent from "./Todo";
import {
  globalTodoHandler,
  TodoAndGroups,
  TodoGroupAndGroups,
} from "./TodoGroup";

const compareDates = (a: Date | null, b: Date | null) => {
  // Compare two dates (could be of any type supported by the convert
  // function above) and returns:
  //  -1 : if a < b
  //   0 : if a = b
  //   1 : if a > b
  // NaN : if a or b is an illegal date or null
  if (a === null || b === null) {
    return NaN;
  }
  const aNum = a.valueOf();
  const bNum = b.valueOf();
  const aLarger = Number(aNum > bNum);
  const bLarger = Number(aNum < bNum);
  return isFinite(aNum) && isFinite(bNum) ? aLarger - bLarger : NaN;
};

export default function PendingTodos(props: {
  setGroup: (grp: TodoGroupAndGroups) => void;
  currentGroup: TodoGroupAndGroups;
}) {
  useRegisteredRerender("pending");

  const todoDict = globalTodoHandler.getTodoList();
  const todoList = Object.keys(todoDict).map((key) => todoDict[key]);

  const completed = todoList.filter((el) => el.todo.done !== null);
  const openTodos = todoList.filter((el) => el.todo.done === null);
  openTodos.sort((a, b) => -compareDates(a.todo.createdAt, b.todo.createdAt));
  completed.sort((a, b) => -compareDates(a.todo.done, b.todo.done));

  const todoMapper = (el: TodoAndGroups) => {
    const todo = el.todo;
    return (
      <Row key={todo.id}>
        <TodoComponent
          todo={todo}
          currParentGroups={el.groupList}
          setGroup={props.setGroup}
          currentGroup={props.currentGroup}
        ></TodoComponent>
      </Row>
    );
  };

  return (
    <Row>
      <Col md={8}>
        <CompHeader text={"Open tasks:"}></CompHeader>
        {openTodos.map(todoMapper)}
      </Col>
      <Col md={4}>
        <CompHeader text={"Completed:"}></CompHeader>
        {completed.map(todoMapper)}
      </Col>
    </Row>
  );
}
