import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Credentials } from "../util/types";

/** Login component. */
export const Login = ({
  setLogin,
  setCreatingAccount,
}: {
  setLogin: (c: Credentials) => void;
  setCreatingAccount: (b: boolean) => void;
}) => {
  const [cred, setCred] = useState<Credentials>({ password: "", username: "" });

  return (
    <Container>
      <h5>Login</h5>
      <Form>
        <Form.Group controlId="formUser">
          <Form.Label>Enter username:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e: any) =>
              setCred({ ...cred, username: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Enter password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e: any) =>
              setCred({ ...cred, password: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Button onClick={() => setLogin(cred)}>Login</Button>
      </Form>
      <Button onClick={() => setCreatingAccount(true)}>
        Create new account.
      </Button>
    </Container>
  );
};
