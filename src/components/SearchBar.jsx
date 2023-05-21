import React, {useRef} from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const SearchBar = (props) => {

    const inputRef = useRef(null);
    const onClick = () => {
        props.sendCity(inputRef.current.value);
    }
    const handleChange = event => {
        if (event.target.value.trim().length == 0)
            props.sendCity(null);
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
                            onChange={handleChange}
                        />
                        <Button
                            className="rounded-pill"
                            variant="outline-primary"
                            onClick={onClick}>
                            Search
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default SearchBar;