import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { TextDescription, StyledButton, CenteredContainer, MainAppContainer, ColorItemsContainer } from './styles.js';
import { useBodyBackground } from "./hooks"
import ColorItem from './components/ColorItem'
import ColorPicker from './components/ColorPicker'
import MultipleColorsShema from './components/MultipleColorsShema'
// import ColorForm from './components/ColorForm'
import { getRGBAColorString, getTextColor, RGBAToHexA} from './utils'

// for named export
const ColorForm = lazy(() => import('./components/ColorForm')
    .then(module => ({ default: module.ColorForm })))

// https://github.com/omgovich/react-colorful
// https://www.thecolorapi.com/docs#colors-color-identification-get
// https://goober.js.org/

function App() {
  const initialColor = { r: 255, g: 255, b: 255, a: 1 }
  const [colors, setColors] = useState([initialColor])
  const [showSchema, setShowSchema] = useState(false)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [showConvert, switchShowConvert] = useState(false)
  const count = useRef()
  const testRef = useRef()

  const setColor = useCallback((color, callback) => {
    clearTimeout(count.current)
    console.log('SET COLOR')
    count.current = setTimeout(() => {
      setColors([...colors, color])
      console.log('colors -> ', colors)
      callback?.('message from callback')
    }, 500)
  }, [colors])

  useEffect(() => {
    const tmp = testRef.current.querySelector('div')
    console.log('tmp -> ', tmp);
    return () => clearTimeout(count.current)
  }, [])

  useBodyBackground(getRGBAColorString(colors[colors.length - 1]), getTextColor(colors[colors.length - 1]))

  // console.log('Re-render App');

  const switchShowSchema = () => setShowSchema(!showSchema)

  const switchShowCustomInput = () => setShowCustomInput(!showCustomInput)

  const closeAll = () => {
    setShowSchema(false)
    setShowCustomInput(false)
    switchShowConvert(false)
  }

  return (
    <MainAppContainer>
        <CenteredContainer>
          <ColorPicker color={colors[colors.length - 1]} setColor={setColor}>
            {[
                {title: 'title1', content: 'Content1', item: 'item1'},
                {title: 'title2', content: 'Content2', item: 'item2'},
                {title: 'title3', content: 'Content3', item: 'item3'},
                {title: 'title4', content: 'Content4', item: 'item4'},
            ]}
          </ColorPicker>
          <StyledButton className="button-text" onClick={closeAll} bgColor={RGBAToHexA(getRGBAColorString(colors[colors.length - 1]))} data-testid="close-all">Close All</StyledButton>

          <StyledButton className="button-text" onClick={switchShowSchema} bgColor={RGBAToHexA(getRGBAColorString(colors[colors.length - 1]))} data-testid="show-schema">Show color schema</StyledButton>
          <StyledButton className="button-text" onClick={switchShowCustomInput} bgColor={RGBAToHexA(getRGBAColorString(colors[colors.length - 1]))} data-testid="add-color">Add custom color</StyledButton>
          <StyledButton className="button-text" onClick={switchShowConvert} bgColor={RGBAToHexA(getRGBAColorString(colors[colors.length - 1]))} data-testid="convert-color">Convert color</StyledButton>
          <StyledButton className="button-text" onClick={switchShowConvert} bgColor={RGBAToHexA(getRGBAColorString(colors[colors.length - 1]))} data-testid="convert-color">Get your mood color by ChatGPT</StyledButton>

          {showSchema && <MultipleColorsShema color={colors[colors.length - 1]} />}
          {showCustomInput && <Suspense fallback={'Loading ...'}><ColorForm setColor={setColor} color={colors[colors.length - 1]}/></Suspense>}
          {showConvert && <Suspense fallback={'Loading ...'}><ColorForm setColor={setColor} color={colors[colors.length - 1]} isConvert={true}/></Suspense>}

          <TextDescription className="text">
            Your colors:
          </TextDescription>
        </CenteredContainer>
        <ColorItemsContainer>
          {
            colors.map((c, index) => <ColorItem index={index} color={c} key={index} />)
          }
        </ColorItemsContainer>
        <div ref={testRef}><div style={{ height: '100px', width: '100px'}}>TestDiv</div></div>
    </MainAppContainer>
  )
}


export default App
