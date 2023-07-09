import React, {useRef, useState} from 'react';

import axios from 'axios';

import Select from 'react-select';

import { Button, Col, Container, Form, Row } from "react-bootstrap";

import {cityApiUrlHeaders, cityApiURL} from "../config/api";

const SelectableInputBar = (props) => {

    const inputRef = useRef(null);
    const unitRef = useRef(null);
    const [inputKeyTimer, setInputKeyTimer] = useState(null)

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    const handleSubmit = () => props.input(selectedOption, unitRef.current.checked);


    const handleInputChange = value => {

        clearTimeout(inputKeyTimer);

        if (value.trim().length === 0){
            props.input(null);
            setOptions([]);
            return;
        }

        const newInputKeyTimer = setTimeout(() => {
            axios
                .get(cityApiURL(value), cityApiUrlHeaders)
                .then(response => {
                    console.log('Rapidapi Sorgu!');
                    response.data.data.forEach(data => {
                        let newOptionData = { value: data.city, label: data.city };
                        setOptions(current => [...current, newOptionData]);
                    });
                })
                .catch(error =>{
                    console.log('Hata');
                    setOptions([]);
                });

        }, 2000)

        setInputKeyTimer(newInputKeyTimer);
    };
    const handleTypeSelect = (e) => {
        if(e == null || e.value == '') {
            setSelectedOption("");
            return;
        }
        setSelectedOption(e.value);
    };


    return(
        <Container fluid="xs">
            <Row>
                <Col md={{span:8, offset:2}} xs={{span:10, offset:1}} className="mt-3 mb-4">
                    <Row>
                        <Form className="d-flex">
                            <Col md={8} xs={7}>
                                <Select
                                    className="basic-single me-2 rounded-pill"
                                    classNamePrefix="select"
                                    name="cities"

                                    options={options}
                                    defaultValue={options[0]}

                                    isDisabled={isDisabled}
                                    isLoading={isLoading}
                                    isClearable={isClearable}
                                    isRtl={isRtl}
                                    isSearchable={isSearchable}

                                    ref={inputRef}
                                    onInputChange={handleInputChange}
                                    onChange={handleTypeSelect}
                                    value={options.find(function (option) {
                                        return option.value === selectedOption;
                                    })}
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