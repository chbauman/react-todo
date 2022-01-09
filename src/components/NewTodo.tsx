import { useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import CompHeader from "./CompHeader";
import { globalTodoHandler } from "./TodoGroup";

export default function NewTodo() {
  const inputRef = useRef(null);

  return (
    <Col>
      <CompHeader text={"New task:"}></CompHeader>
      <Row>
        <div className="input-group row">
          <input
            type="text"
            className="col-md-6 col-lg-6 col-sm-6 col-xs-6 form-control"
            id="newTodo"
            placeholder="Task XYZ"
            ref={inputRef}
          ></input>
          <Button
            onClick={() => {
              const inputEl = inputRef.current as unknown as HTMLInputElement;
              const txt = inputEl.value;
              if (txt !== "") {
                globalTodoHandler.addTodo(inputEl.value);
                inputEl.value = "";
              }
            }}
          >
            Add
          </Button>
        </div>
      </Row>
    </Col>
  );
}
