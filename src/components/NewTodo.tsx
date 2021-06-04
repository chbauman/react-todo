import { useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import CompHeader from "./CompHeader";
import { Todo } from "./Todo";

export default function NewTodo(props: {
  addNewCallbackRef: { current: (t: Todo) => void };
}) {
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
            onClick={() =>
              props.addNewCallbackRef.current({
                text: (inputRef.current as any).value,
                id: 4,
                done: null,
              })
            }
          >
            Add
          </Button>
        </div>
      </Row>
    </Col>
  );
}
