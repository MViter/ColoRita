import React, { useMemo, useRef } from 'react'
import { getRGBAColorString, getTooltipInfo } from '../utils.js'
import 'react-tooltip/dist/react-tooltip.css'
import { useGetColorInfoQuery } from '../hooks/index.js'
import 'react-tippy/dist/tippy.css'
import { StyledTooltip, ColorItemContainer } from '../styles.js'

// Why this is not visible in App file?
// export default function ColorItem ({ key, color }) {
//   return (<span id="my-anchor-element" key={index} className="color-item" style={{ backgroundColor: getRGBAColorString(color) }} />)
// }

function ColorItem({ index, color = {} }) {
  const tippyRef = useRef();
  const data = useGetColorInfoQuery(color)

  // console.log('render ColorItem, data -> ', data)

  const tooltipContent = useMemo(() => {
    // console.log('ColorItem, tooltipContent re-calculating')
    return getTooltipInfo(data)
}, [data])

  const colorElement = <ColorItemContainer data-testid="color-item" id="color-element" key={index} style={{ backgroundColor: getRGBAColorString(color) }} />

  return data ? (<>
    <StyledTooltip 
      anchorSelect="#color-element"
      allowHTML={true}
      html={tooltipContent}
      position="bottom"
      animation="fade"
      arrow="true"
      data-testid="color-item-tooltip"
      ref={tippyRef}
    >
      {colorElement}
    </StyledTooltip> 
  </>) : colorElement
}

// export default ColorItem // see with console.log() uncommented

export default React.memo(ColorItem)