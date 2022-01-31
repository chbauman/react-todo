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
import { delayAtLeast } from "./util/util";

type AppState = "initialized" | "login" | "load-data" | "create-account";
type AppStateData = {
  state: AppState;
  userName: string | null;
};

/** The main app. */
const FullApp = () => {
  const initUser = djangoInterface.getUser();

  let initState: AppState = "initialized";
  if (initUser === null) {
    initState = "login";
  } else if (!globalTodoHandler.initialized) {
    initState = "load-data";
  }
  const [stateAndUsername, setState] = useState<AppStateData>({
    state: initState,
    userName: initUser,
  });
  const setLoggedIn = (userName: string | null) =>
    setState({ state: "initialized", userName: userName });
  const optionalUserName = stateAndUsername.userName;
  const setCreatingAccount = () => {
    const nextState: AppStateData = {
      state: "create-account",
      userName: null,
    };
    setState(nextState);
  };
  const creatingAccount = stateAndUsername.state === "create-account";

  // Return create account component
  if (creatingAccount) {
    return (
      <RegisterPage
        setCreatingAccount={setCreatingAccount}
        setLoggedIn={setLoggedIn}
      ></RegisterPage>
    );
  }

  // Return login component if user is not logged in
  if (optionalUserName === null) {
    const login = async (credentials: Credentials) => {
      const loginSuccessful = await djangoInterface.loginUser(credentials);
      if (loginSuccessful) {
        setLoggedIn(credentials.username);
      }
    };
    return (
      <Login setLogin={login} setCreatingAccount={setCreatingAccount}></Login>
    );
  }

  // Load data from server if todo handler is not initialized
  if (!globalTodoHandler.initialized) {
    const loadUserData = async () => {
      await delayAtLeast(() => djangoInterface.loadUserData(), 400);
      globalTodoHandler.initialized = true;
      setState({ ...stateAndUsername, state: "initialized" });
    };
    loadUserData();
    return (
      <Container>
        <h2>Loading...</h2>
      </Container>
    );
  }

  // Return app component if user is logged in
  const logout = () => {
    djangoInterface.logout();
    setLoggedIn(null);
  };
  return <App userName={optionalUserName} logout={logout}></App>;
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

/** Defines the navigation bar. */
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
        <Button onClick={() => djangoInterface.save()}>Save</Button>
        <Nav>User: {userName}</Nav>
        <Button onClick={logout}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default FullApp;
