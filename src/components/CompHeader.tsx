import { Row } from "react-bootstrap";

export default function CompHeader(props: { text: string }) {
  return (
    <Row>
      <h4>{props.text}</h4>
    </Row>
  );
}
