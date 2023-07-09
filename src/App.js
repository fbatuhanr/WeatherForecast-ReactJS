import {useState} from "react";

import SelectableInputBar from "./components/SelectableInputBar";
import WeatherWidget from "./components/WeatherWidget";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

    const [inputData, setInputData] = useState({city:null, isFahrenheit:false});
    const input = (cityData, unitData) => {
        setInputData({city:cityData, isFahrenheit: unitData});
    }

    return (
        <div>
        <SelectableInputBar input={input}/>
        {
            inputData.city &&
            <WeatherWidget
                city={inputData.city}
                isFahrenheit={inputData.isFahrenheit}
            />
        }
        </div>
  );
}

export default App;
