import React, {useRef, useState} from 'react';

import axios from 'axios';

import Select, {components} from 'react-select';
import AsyncSelect from 'react-select/async';
import { AsyncPaginate } from 'react-select-async-paginate';


import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";

import {cityApiUrlHeaders, cityApiURL} from "../config/api";

const SelectableInputBar = (props) => {

    const inputRef = useRef(null);
    const unitRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState("");


    const noOptionsMessage = (props) => {
        return (
            <components.NoOptionsMessage {...props}>
                <i>The cities will be appear here</i>
            </components.NoOptionsMessage>
        );
    };
    const loadingMessage = (props) => {
        return (
            <components.LoadingMessage {...props}>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </components.LoadingMessage>
        );
    };
    const loadOptions = (inputValue) => {

        if (inputValue.trim().length === 0) return {options:[]};

        return axios
            .get(cityApiURL(inputValue), cityApiUrlHeaders)
            .then(response => {
                return {
                    options: response.data.data.map(city=>{
                        return {
                            label: city.name,
                            value: city.name
                        }
                    })
                }
            })
            .catch(error => {
                console.log('Hata');
                return {options:[]};
            });
    }
    const handleOnChange = (searchData) => {
        console.log(searchData)

        if(searchData == null || searchData.value == '') {
            setSelectedOption("");
            return;
        }
        setSelectedOption(searchData.value);
    }

    const handleSubmit = () => props.input(selectedOption, unitRef.current.checked);


    return(
        <Container fluid="xs">
            <Row>
                <Col md={{span:8, offset:2}} xs={{span:10, offset:1}} className="mt-3 mb-4">
                    <Row>
                        <Form className="d-flex">
                            <Col md={8} xs={7}>

                                <AsyncPaginate
                                    className="me-2"
                                    placeholder="Type a city name"
                                    debounceTimeout={1000}
                                    onChange={handleOnChange}
                                    loadOptions={loadOptions}
                                    components={{ loadingMessage, noOptionsMessage }}
                                />
                            </Col>
                            <Col md={1} xs={2}>
                                <Form.Check
                                    className="fahrenheit-switch mt-2"
                                    type="switch"
                                    id="custom-switch"
                                    label="°F"
                                    ref={unitRef}
                                />
                            </Col>
                            <Col md={3} xs={3} className="d-grid">
                                <Button
                                    className="rounded-pill ms-2"
                                    variant="outline-primary"
                                    onClick={handleSubmit}
                                    disabled={!selectedOption}>
                                    Forecast!
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default SelectableInputBar;