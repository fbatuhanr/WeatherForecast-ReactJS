import React, {useRef} from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const InputBar = (props) => {

    const inputRef = useRef(null);
    const unitRef = useRef(null);
    const handleSubmit = () => props.input(inputRef.current.value, unitRef.current.checked);
    const handleInputChange = event => {
        if (event.target.value.trim().length == 0) props.input(null);
    };

    return(
        <Container className="m-2">
            <Row>
                <Col>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 rounded-pill"
                            aria-label="Search"
                            ref={inputRef}
                            onChange={handleInputChange}
                        />
                        <Form.Check className="fahrenheit-switch"
                            type="switch"
                            id="custom-switch"
                            label="°F"
                            ref={unitRef}
                        />
                        <Button
                            className="rounded-pill"
                            variant="outline-primary"
                            onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default InputBar;