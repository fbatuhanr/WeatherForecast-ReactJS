import React, {useRef, useState} from 'react';

import axios from 'axios';

import Select from 'react-select';

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {apiURL} from "../config/api";

const InputBar = (props) => {

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

            let config = {
                headers: {
                    'X-RapidAPI-Key': '2c3b4556d2mshca925566ecbe76ap13f707jsn4dc6d2c0f27a',
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                },
                params: {
                    minPopulation: '25000',
                    namePrefix: value
                },
            }
            axios
                .get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', config)
                .then(response => {
                    response.data.data.forEach(data => {
                        let newOptionData = { value: data.city, label: data.city };
                        setOptions(current => [...current, newOptionData]);
                    });
                })
                .catch(error =>{
                    console.log('Hata');
                    setOptions([]);
                });

        }, 3000)

        setInputKeyTimer(newInputKeyTimer);
    };
    const handleTypeSelect = (e) => {
        setSelectedOption(e.value);
    };


    return(
        <Container className="m-2">
            <Row>
                <Col xs={{span:6, offset:3}}>
                    <Row>
                        <Form className="d-flex">
                            <Col xs={9}>
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
                            <Col xs={1}>
                                <Form.Check
                                    className="fahrenheit-switch mt-2"
                                    type="switch"
                                    id="custom-switch"
                                    label="°F"
                                    ref={unitRef}
                                />
                            </Col>
                            <Col xs={2} className="d-grid">
                                <Button
                                    className="rounded-pill ms-2"
                                    variant="outline-primary"
                                    onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default InputBar;