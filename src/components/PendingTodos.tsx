import { MutableRefObject, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CompHeader from "./CompHeader";
import TodoComponent from "./Todo";
import { globalTodoHandler, Todo } from "./TodoGroup";

export default function PendingTodos(props: {
  todoList: Todo[];
  addNewCBRef: MutableRefObject<any>;
}) {
  // Hack for enforcing re-render when todos change
  const [dummy, setDummy] = useState<number>(0);
  const reRender = () => setDummy(dummy + 1);
  globalTodoHandler.registerOnChanged("pending", reRender);

  const todoDict = globalTodoHandler.getTodoList();
  const todoList = Object.keys(todoDict).map((key) => todoDict[key]);

  return (
    <Col>
      <CompHeader text={"TODO:"}></CompHeader>
      {todoList.map((el) => {
        const todo = el.todo;
        console.assert(todo.done === null, "found a bug!");
        return (
          <Row key={todo.id}>
            <TodoComponent todo={todo} groups={el.groupList}></TodoComponent>
          </Row>
        );
      })}
    </Col>
  );
}
