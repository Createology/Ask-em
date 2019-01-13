import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
  Container
} from "reactstrap";

export default class AddSurveys extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container className="nav">
        <Form>
          <Row>
            <Col>
              <Row>
                <h1>Suervey Info</h1>
              </Row>
              <Row>
                <Col>
                  <Label for="survey name">Survey name</Label>
                  <Input placeholder="Enter survey name ..." />
                </Col>
                <Col>
                  <Label for="survey Owner">Survey Owner</Label>
                  <Input placeholder="Enter survey Owner ..." />
                </Col>
                <Col>
                  <Label for="survey Title">Survey Title</Label>
                  <Input placeholder="Enter survey Title ..." />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Button color="link">Add</Button>
          </Row>
          <br />
          <Row>
            <Col>
              <Row>
                <h1>Qustion</h1>
              </Row>
              <Row>
                <Col>
                  <Label for="exampleEmail">Plain Text (Static)</Label>
                  <Input placeholder="Enter your Qustion here ..." />
                </Col>
              </Row>
              <Row>
                <Button color="link">Add</Button>
              </Row>
              <br />
              <h3>Cohices</h3>
              <Form>
                <Row>
                  <Col>
                    <Label for="exampleEmail">Cohice 1</Label>
                    <Input placeholder="Enter your Cohice ..." />
                  </Col>
                  <Col>
                    <Label for="exampleEmail">Cohice 2</Label>
                    <Input placeholder="Enter your Cohice ..." />
                  </Col>
                  <Col>
                    <Label for="exampleEmail">Cohice 3</Label>
                    <Input placeholder="Enter your Cohice ..." />
                  </Col>
                  <Col>
                    <Label for="exampleEmail">Cohice 4</Label>
                    <Input placeholder="Enter your Cohice ..." />
                  </Col>
                </Row>
                <Row>
                  <Button color="link">Add</Button>
                </Row>
              </Form>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Row>
                <h1>Smart Qustion</h1>
              </Row>
              <Row>
                <Col>
                  <Label for="smartqustion">Smart Qustion</Label>
                  <Input placeholder="Enter your Smart Qustion ..." />
                </Col>
              </Row>
              <Row>
                <Button color="link">Add</Button>
              </Row>
            </Col>
          </Row>
          <br />
        </Form>
      </Container>
    );
  }
}
