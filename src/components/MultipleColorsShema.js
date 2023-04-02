import React, { useEffect } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { useGetColorSchemaQuery } from '../hooks/index.js'
import 'react-tippy/dist/tippy.css'
import { TextDescription, ColorSchemaContainer, ImageContainer } from '../styles.js'
import { setTextColor, getTextColor } from '../utils'

function MultipleColorsShema({ color }) {
  const data = useGetColorSchemaQuery(color)
  useEffect(() => {
    setTextColor(getTextColor(color))
  }, [])

  // console.log('render MultipleColorsShema, data -> ', data)
  
  return <ColorSchemaContainer>
        <TextDescription className="text">SCHEMA:</TextDescription>
        <ImageContainer>
            <img src={data?.image?.named} />
        </ImageContainer>
    </ColorSchemaContainer>
}

// export default MultipleColorsShema // see with console.log() uncommented

export default MultipleColorsShema
React.memo(MultipleColorsShema)