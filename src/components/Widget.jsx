import React, {useEffect, useState} from 'react';
import {Container,Row,Col,Card} from "react-bootstrap";

import apiKey from "../api/api";
import axios from "axios";

const Widget = ({city}) => {

    const [data, setData] = useState(null);
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&units=metric&q="+city;

    axios
        .get("./Temp_RefValues.json")
        .then((response)=> {
            console.log("sorgu");
            setData(response.data);
        });

    return (
        <Container fluid={"md"}>
            <div className="d-flex flex-row justify-content-center align-items-center">
                <div className="weather__card">
                    <Row className="justify-content-center align-items-center">
                        <Col>
                            <h2>{data && data.main.temp}</h2>
                        </Col>
                        <Col>
                            <img src="https://svgur.com/i/oKG.svg"/>
                        </Col>
                        <Col>
                            <h5>Tuesday, 10 AM</h5>
                            <h3>{data && data.name}</h3>
                            <span className="weather__description">{data && data.weather[0].main}</span>
                        </Col>
                    </Row>
                    <div className="weather__status d-flex flex-row justify-content-center align-items-center mt-3">
                        <div className="p-4 d-flex justify-content-center align-items-center">
                            <img src="https://svgur.com/i/oHw.svg"/>
                                <span>{data && data.main.humidity}%</span>
                        </div>
                        <div className="p-4 d-flex justify-content-center align-items-center">
                            <img src="https://svgur.com/i/oH_.svg"/>
                                <span>{data && data.main.pressure} mB</span>
                        </div>
                        <div className="p-4 d-flex justify-content-center align-items-center">
                            <img src="https://svgur.com/i/oKS.svg"/>
                                <span>{data && data.wind.speed+" km/h"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Widget;