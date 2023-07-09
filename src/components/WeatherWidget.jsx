import React, {useEffect, useState} from 'react';
import axios from "axios";

import {Container,Row,Col,Card} from "react-bootstrap";

import {weatherApiURL} from "../config/api";

/**
 * @param data
 * @param data.main.temp
 * @param data.main.humidity
 * @param data.main.pressure
 * @param data.weather
 * @param data.wind
 */

const WeatherWidget = ({city, isFahrenheit}) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get(weatherApiURL(city, isFahrenheit))
            .then((response)=> {
                console.log('Openweathermap Sorgu!');
                setData(response.data);
            });

    },[city, isFahrenheit])

    return (
        <Container fluid={"md"}>
            <div className="d-flex flex-row justify-content-center align-items-center">
                <div className="weather__card">
                    <Row className="justify-content-center align-items-center">
                        <Col>
                            {
                                data &&
                                <Row>
                                    <Col xs={9}><h2>{data.main.temp.toFixed(0)}</h2></Col>
                                    <Col xs={3}><h4>{isFahrenheit ? '°F' : '°C'}</h4></Col>
                                </Row>
                            }
                        </Col>
                        <Col>
                            {
                                data
                                    ? <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}/>
                                    : <img src="https://svgur.com/i/oKG.svg"/>
                            }
                        </Col>
                        <Col>
                            <h5>
                                {
                                    data &&
                                    timeConverter(data.dt)
                                }
                            </h5>
                            <h3>
                                {
                                    data &&
                                    data.name
                                }
                            </h3>
                            <span className="weather__description">
                                {
                                    data &&
                                    toTitleCase(data.weather[0].description)
                                }
                            </span>
                        </Col>
                    </Row>
                    <div className="weather__status d-flex flex-row justify-content-center align-items-center mt-3">
                        <div className="p-4 d-flex justify-content-center align-items-center">
                            <img src="https://svgur.com/i/oHw.svg"/>
                            <span>
                                    {
                                        data &&
                                        `${data.main.humidity} %`
                                    }
                                </span>
                        </div>
                        <div className="p-4 d-flex justify-content-center align-items-center">
                            <img src="https://svgur.com/i/oH_.svg"/>
                            <span>
                                    {
                                        data &&
                                        `${data.main.pressure} mB`
                                    }
                                </span>
                        </div>
                        <div className="p-4 d-flex justify-content-center align-items-center">
                            <img src="https://svgur.com/i/oKS.svg"/>
                            <span>
                                    {
                                        data &&
                                        `${data.wind.speed} km/h`
                                    }
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );

    function toTitleCase(str) {
        const titleCase = str
            .toLowerCase()
            .split(' ')
            .map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');

        return titleCase;
    }
    
    function timeConverter(UNIX_timestamp){

        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return `${a.getDate()} ${months[a.getMonth()]} ${a.getFullYear()}`;
    }
};

export default WeatherWidget;