import { MutableRefObject, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CompHeader from "./CompHeader";
import TodoComponent, { Todo } from "./Todo";

export default function PendingTodos(props: {
  todoList: Todo[];
  addNewCBRef: MutableRefObject<any>;
}) {
  const [currTodos, setCurrTodos] = useState<Todo[]>(props.todoList);

  const addPendingTodoCB = (newTodo: Todo) => {
    console.log("setting todos");

    const myClonedArray = [];
    currTodos.forEach((val) => myClonedArray.push(Object.assign({}, val)));
    myClonedArray.push(newTodo);
    setCurrTodos(myClonedArray);
  };

  props.addNewCBRef.current = addPendingTodoCB;

  return (
    <Col>
      <CompHeader text={"TODO:"}></CompHeader>
      {currTodos.map((el) => {
        console.assert(el.done === null, "found a bug!");
        return (
          <Row key={el.id}>
            <TodoComponent todo={el}></TodoComponent>
          </Row>
        );
      })}
    </Col>
  );
}
