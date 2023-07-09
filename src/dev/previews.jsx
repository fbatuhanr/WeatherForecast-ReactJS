import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import App from "../App";
import WeatherWidget from "../components/WeatherWidget";
import SelectableInputBar from "../components/SelectableInputBar";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/WeatherWidget">
                <WeatherWidget/>
            </ComponentPreview>
            <ComponentPreview path="/SelectableInputBar">
                <SelectableInputBar/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews