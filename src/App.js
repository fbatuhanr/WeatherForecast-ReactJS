import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchBar from "./components/SearchBar";
import Widget from "./components/Widget";

import {useEffect, useState} from "react";
import axios from "axios";
import {Container, Row, Col} from "react-bootstrap";

function App() {

    const [city,setCity] = useState(null);
    const sendCity = (data) => {
        setCity(data);
    }

    useEffect(() => {

    },[city])

    return (
        <div>
        <SearchBar sendCity={sendCity}/>
            {city && <Widget city={city}/>}
        </div>
  );
}

export default App;
