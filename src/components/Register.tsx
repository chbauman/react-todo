import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { djangoInterface } from "../backendInterface/djangoInterface";
import { AccountDetails } from "../util/types";

/** Register new user page. */
export const RegisterPage = ({
  setCreatingAccount,
  setLoggedIn,
}: {
  setCreatingAccount: (b: boolean) => void;
  setLoggedIn: (s: string | null) => void;
}) => {
  const [accDet, setAccDet] = useState<AccountDetails>({
    password: "",
    username: "",
    email: "",
    lastname: "",
  });

  const onRegister = async () => {
    const userOrNull = await djangoInterface.createAccountAndLogin(accDet);
    if (userOrNull !== null) {
      setCreatingAccount(false);
      setLoggedIn(userOrNull);
    } else {
      console.log("Account creation failed!");
    }
  };

  return (
    <Container>
      <h5>Create Account</h5>
      <Form>
        <Form.Group controlId="formUser">
          <Form.Label>Username: *</Form.Label>
          <Form.Control
            type="text"
            onChange={(e: any) =>
              setAccDet({ ...accDet, username: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email: *</Form.Label>
          <Form.Control
            type="email"
            onChange={(e: any) =>
              setAccDet({ ...accDet, email: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e: any) =>
              setAccDet({ ...accDet, lastname: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password: *</Form.Label>
          <Form.Control
            type="password"
            onChange={(e: any) =>
              setAccDet({ ...accDet, password: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Button onClick={onRegister}>Create</Button>
      </Form>
      <Button onClick={() => setCreatingAccount(false)}>Back to Login</Button>
    </Container>
  );
};
