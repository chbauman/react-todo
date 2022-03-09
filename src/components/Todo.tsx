import { Button, ButtonGroup, Col, Dropdown, Row } from "react-bootstrap";
import {
  globalTodoHandler,
  Todo,
  TodoGroup,
  TodoGroupAndGroups,
} from "./TodoGroup";
import "./todo.css";
import { GroupSelect } from "./GroupSelect";
import { StayOpenDropdown } from "../util/util";

export const noSpaceStyle = { margin: 0, padding: 0 };

const getTextCompNew = (props: any) => {
  const text = props.todo.text;
  const groupsNotShown = props.currentGroup.groupList;

  const labelStyle = {
    fontSize: "12px",
    marginBottom: 0,
    paddingBottom: 0,
  };
  const label = (
    <>
      {props.currParentGroups.map((el: TodoGroup, idx: number) => {
        const onClick = () => {
          const subGroups = props.currParentGroups.slice(0, idx);
          props.setGroup({
            todo: el,
            groupList: groupsNotShown.concat(subGroups),
          });
        };
        const className = idx === 0 ? "mb-0" : "ms-1 mb-0";
        return (
          <div
            key={el.id}
            className={"group-list float-start " + className}
            onClick={onClick}
            style={labelStyle}
          >
            {el.name + " / "}
          </div>
        );
      })}
    </>
  );

  return (
    <div>
      {label}
      <br></br>
      <div
        className="textdiv mb-2"
        style={{ paddingTop: 0, marginTop: "-10px" }}
      >
        {text}
      </div>
    </div>
  );
};

export function TodoComponent(props: {
  todo: Todo;
  currParentGroups: TodoGroup[];
  setGroup: (grp: TodoGroupAndGroups) => void;
  currentGroup: TodoGroupAndGroups;
}) {
  // Handle text
  const groupCrumbs = getTextCompNew(props);

  // Define buttons
  const onDone = () => {
    globalTodoHandler.setToDone(props.todo.id);
  };
  const doneButt = props.todo.done ? null : (
    <Button size="sm" onClick={onDone}>
      Done
    </Button>
  );
  const deleteCallback = () => {
    globalTodoHandler.deleteTodo(props.todo.id);
  };
  const changeGroupCb = (newGroupId: string | null) => {
    if (newGroupId) {
      globalTodoHandler.changeItemGroup(props.todo.id, newGroupId);
    } else {
      console.log("no new group");
    }
  };
  const changeContentCallback = () => {
    console.log("Not implemented!");
  };
  const ddItems = (
    <>
      <Dropdown.Item className="d-flex flex-row">
        <div id="change-group-label">Change Group</div>
        <div className="ms-2" style={{ minWidth: 100 }}>
          <GroupSelect
            onChangeCB={changeGroupCb}
            id="change-group"
          ></GroupSelect>
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={changeContentCallback}>
        Edit Content
      </Dropdown.Item>
      <Dropdown.Item onClick={deleteCallback}>Delete</Dropdown.Item>
    </>
  );

  const stayOpenDD = (
    <StayOpenDropdown title="Edit" size="sm">
      {ddItems}
    </StayOpenDropdown>
  );

  const buttGroup = (
    <ButtonGroup>
      {doneButt}
      {stayOpenDD}
    </ButtonGroup>
  );

  return (
    <>
      <Row>
        <Col md={9}>{groupCrumbs}</Col>
        <Col md={3}>{buttGroup}</Col>
      </Row>
    </>
  );
}
