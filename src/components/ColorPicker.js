import React from 'react'
import { RgbaColorPicker } from "react-colorful";
import { HeaderTitle, PaletteContainer } from '../styles.js';

const ColorPicker = ({ color, setColor }) => {
    return (<PaletteContainer>
        <HeaderTitle className="text">React Colorful 🎨</HeaderTitle>
        <RgbaColorPicker data-testid="color-picker" color={color} onChange={setColor} />
    </PaletteContainer>)
}

export default ColorPicker