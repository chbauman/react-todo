import { useRef, useState } from "react";
import Select from "react-select";
import { Button, Col, Row } from "react-bootstrap";
import CompHeader from "./CompHeader";
import { globalTodoHandler } from "./TodoGroup";

export default function NewTodo() {
  const inputRef = useRef(null);
  const groupRef = useRef<string | null>(null);
  const onGroupChange = (newGroupId: string | null) => {
    groupRef.current = newGroupId;
  };

  return (
    <Row>
      <Col>
        <CompHeader text={"New task:"}></CompHeader>
        <Row>
          <div className="input-group row">
            <input
              type="text"
              className="col-xs-6 form-control"
              id="newTodo"
              placeholder="Task XYZ"
              ref={inputRef}
            ></input>
            <GroupSelect onChangeCB={onGroupChange} />
            <Button
              onClick={() => {
                const inputEl = inputRef.current as unknown as HTMLInputElement;
                const txt = inputEl.value;
                if (txt !== "") {
                  globalTodoHandler.addTodo(inputEl.value, groupRef.current);
                  inputEl.value = "";
                }
              }}
            >
              Add
            </Button>
          </div>
        </Row>
      </Col>
    </Row>
  );
}

type GroupSelectOption = { value: string; label: string };

export const GroupSelect = ({ onChangeCB }: { onChangeCB: any }) => {
  const datalist = globalTodoHandler.getAllGroups();
  const options = datalist.map((el) => {
    return { value: el.id, label: el.name };
  });

  const [selectedOption, setSelectedOption] =
    useState<GroupSelectOption | null>(null);
  const onChange = (el: GroupSelectOption | null) => {
    setSelectedOption(el);
    onChangeCB(el?.value);
  };

  return (
    <Select
      defaultValue={selectedOption}
      onChange={onChange}
      options={options}
    />
  );
};
