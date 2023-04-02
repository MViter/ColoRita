import React, { useState, useEffect, useRef, useCallback } from 'react'
import { TextDescription, StyledButton, CenteredContainer } from './styles.js';
import { useBodyBackground } from "./hooks"
import ColorItem from './components/ColorItem'
import ColorPicker from './components/ColorPicker'
import MultipleColorsShema from './components/MultipleColorsShema'
import ColorForm from './components/ColorForm'
import { getRGBAColorString, getTextColor, RGBAToHexA} from './utils'

// https://github.com/omgovich/react-colorful
// https://www.thecolorapi.com/docs#colors-color-identification-get
// https://goober.js.org/

function App() {
  const initialColor = { r: 255, g: 255, b: 255, a: 1 }
  const [colors, setColors] = useState([initialColor])
  const [showSchema, setShowScema] = useState(false)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const count = useRef()

  const setColor = useCallback(color => {
    clearTimeout(count.current)
    count.current = setTimeout(() => {
      setColors([...colors, color])
    }, 500)
  }, [colors])

  useEffect(() => {
    return () => clearTimeout(count.current)
  }, [])

  useBodyBackground(getRGBAColorString(colors[colors.length - 1]), getTextColor(colors[colors.length - 1]))

  // console.log('Re-render App');

  const switchShowScema = () => setShowScema(!showSchema)

  const switchShowCustomInput = () => setShowCustomInput(!showCustomInput)

  return (
    <div className="main-app">
      <div className="app-content">
        <CenteredContainer>
          <ColorPicker color={colors[colors.length - 1]} setColor={setColor} />
          <StyledButton className="button-text" onClick={switchShowScema} bgColor={RGBAToHexA(getRGBAColorString(colors[colors.length - 1]))} data-testid="show-schema">Show color schema</StyledButton>
          <StyledButton className="button-text" onClick={switchShowCustomInput} bgColor={RGBAToHexA(getRGBAColorString(colors[colors.length - 1]))} data-testid="add-color">Add custom color</StyledButton>
          {showSchema && <MultipleColorsShema color={colors[colors.length - 1]} />}
          {showCustomInput && <ColorForm setColor={setColor} color={colors[colors.length - 1]} />}
          <TextDescription className="text">
            Your colors:
          </TextDescription>
        </CenteredContainer>
        <div className="colors">
          {
            colors.map((c, index) => <ColorItem index={index} color={c} key={index} />)
          }
        </div>
        
      </div>
    </div>
  )
}


export default App
