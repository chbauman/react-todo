import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import { NewGroup, NewTodo } from "./components/NewTodo";
import PendingTodos from "./components/PendingTodos";
import { globalTodoHandler, TodoGroupAndGroups } from "./components/TodoGroup";

const App = () => {
  // Group that is currently focused, only sub-elements should be shown
  // in the lists. Choose the root initially.
  const initGroup = globalTodoHandler.root;
  const [group, setGroup] = useState<TodoGroupAndGroups>({
    todo: initGroup,
    groupList: [],
  });
  const wrappedSetGroup = (group: TodoGroupAndGroups) => {
    setGroup(group);
    globalTodoHandler.setGroupAsSelected(group);
  };

  return (
    <Container>
      {getNav(group, wrappedSetGroup)}
      <NewTodo></NewTodo>
      <NewGroup></NewGroup>
      <PendingTodos
        setGroup={wrappedSetGroup}
        currentGroup={group}
      ></PendingTodos>
    </Container>
  );
};

const getNav = (group: TodoGroupAndGroups, setGroup: any) => {
  const currName = group.todo.name;
  const groupList = group.groupList;
  return (
    <Navbar bg="light" expand="lg" className="mb-2">
      <Navbar.Brand href="/">{currName}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {groupList.map((el, idx) => {
            const onClick = () => {
              const subGroups = groupList.slice(0, idx);
              setGroup({ todo: el, groupList: subGroups });
            };
            return (
              <Nav.Link
                key={el.id}
                onClick={onClick}
              >{`${el.name} /`}</Nav.Link>
            );
          })}
          <Nav.Link onClick={() => console.log("Ignoring your stupid click!")}>
            {currName}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default App;
