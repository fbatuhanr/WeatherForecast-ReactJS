import {useState} from "react";

import InputBar from "./components/InputBar";
import Widget from "./components/Widget";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

    const [inputData, setInputData] = useState({city:null, isFahrenheit:false});
    const input = (cityData, unitData) => {
        setInputData({city:cityData, isFahrenheit: unitData});
    }

    return (
        <div>
        <InputBar input={input}/>
            {
                inputData.city &&
                <Widget
                    city={inputData.city}
                    isFahrenheit={inputData.isFahrenheit}
                />
            }
        </div>
  );
}

export default App;
