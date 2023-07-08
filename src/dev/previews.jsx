import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import App from "../App";
import Widget from "../components/Widget";
import InputBar from "../components/InputBar";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Widget">
                <Widget/>
            </ComponentPreview>
            <ComponentPreview path="/InputBar">
                <InputBar/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews