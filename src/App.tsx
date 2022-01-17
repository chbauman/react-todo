import { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import { djangoInterface } from "./backendInterface/djangoInterface";
import { Login } from "./components/Login";
import { NewGroup, NewTodo } from "./components/NewTodo";
import PendingTodos from "./components/PendingTodos";
import { RegisterPage } from "./components/Register";
import { globalTodoHandler, TodoGroupAndGroups } from "./components/TodoGroup";
import { Credentials } from "./util/types";

const FullApp = () => {
  const initUser = djangoInterface.getUser();
  const [isLoggedIn, setLoggedIn] = useState<string | null>(initUser);
  const [creatingAccount, setCreatingAccount] = useState<boolean>(false);

  if (creatingAccount) {
    return (
      <RegisterPage
        setCreatingAccount={setCreatingAccount}
        setLoggedIn={setLoggedIn}
      ></RegisterPage>
    );
  }

  if (isLoggedIn !== null) {
    const logout = () => setLoggedIn(null);
    return <App userName={isLoggedIn} logout={logout}></App>;
  }
  const login = async (credentials: Credentials) => {
    const loginSuccessful = await djangoInterface.loginUser(credentials);
    if (loginSuccessful) {
      setLoggedIn(credentials.username);
    }
  };
  return (
    <Login setLogin={login} setCreatingAccount={setCreatingAccount}></Login>
  );
};

const App = ({
  userName,
  logout,
}: {
  userName: string;
  logout: VoidFunction;
}) => {
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
      {getNav(group, wrappedSetGroup, userName, logout)}
      <NewTodo></NewTodo>
      <NewGroup></NewGroup>
      <PendingTodos
        setGroup={wrappedSetGroup}
        currentGroup={group}
      ></PendingTodos>
    </Container>
  );
};

const getNav = (
  group: TodoGroupAndGroups,
  setGroup: any,
  userName: string,
  logout: VoidFunction
) => {
  const currName = group.todo.name;
  const groupList = group.groupList;

  return (
    <Navbar bg="light" expand="md">
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
                key={`nav-${el.id}`}
                onClick={onClick}
              >{`${el.name} /`}</Nav.Link>
            );
          })}
          <Nav.Link onClick={() => console.log("Ignoring your stupid click!")}>
            {currName}
          </Nav.Link>
        </Nav>
        <Nav>User: {userName}</Nav>
        <Button onClick={logout}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default FullApp;
