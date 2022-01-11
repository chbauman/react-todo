import { useRef, useState } from "react";
import Select from "react-select";
import { Button, Col, Form, Row } from "react-bootstrap";
import CompHeader from "./CompHeader";
import { globalTodoHandler } from "./TodoGroup";
import { useRegisteredRerender } from "../hooks/registerRerender";

/** Component for adding a new group. */
export function NewGroup() {
  const handleInput = (input: string, groupId: string | null) =>
    globalTodoHandler.addGroup(input, groupId);

  return useNewTodoComp("New Group:", handleInput, "new-group");
}

/** Component for adding a new Todo. */
export function NewTodo() {
  const handleInput = (input: string, groupId: string | null) =>
    globalTodoHandler.addTodo(input, groupId);

  return useNewTodoComp("New task:", handleInput, "new-todo");
}

const useNewTodoComp = (
  title: string,
  handleInput: (input: string, groupId: string | null) => void,
  id: string
) => {
  const inputRef = useRef(null);
  const groupRef = useRef<string | null>(null);
  const onGroupChange = (newGroupId: string | null) => {
    groupRef.current = newGroupId;
  };

  useRegisteredRerender(id);

  const onAdd = () => {
    const inputEl = inputRef.current as unknown as HTMLInputElement;
    const txt = inputEl.value;
    if (txt !== "") {
      handleInput(inputEl.value, groupRef.current);
      inputEl.value = "";
    }
  };

  return (
    <>
      <Row className="mt-2">
        <Col>
          <CompHeader text={title}></CompHeader>
        </Col>
      </Row>
      <Row>
        <Form.Group as={Col} md={8} controlId={"text-" + id}>
          <Form.Control type="text" placeholder="Task XYZ" ref={inputRef} />
        </Form.Group>
        <Form.Group as={Col} md={3} controlId={"group-select-" + id}>
          <GroupSelect onChangeCB={onGroupChange} />
        </Form.Group>
        <Form.Group as={Col} md={1} controlId={"submit-" + id}>
          <Button onClick={onAdd}>Add</Button>
        </Form.Group>
      </Row>
    </>
  );
};

type GroupSelectOption = { value: string; label: string };

export const GroupSelect = ({ onChangeCB }: { onChangeCB: any }) => {
  const datalist = globalTodoHandler.getAllGroups();
  const options = datalist.map((el) => {
    return { value: el.id, label: el.name };
  });

  useRegisteredRerender("groups-selection");

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
