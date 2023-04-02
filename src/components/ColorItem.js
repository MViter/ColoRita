import React, { useMemo } from 'react'
import { getRGBAColorString} from '../utils.js'
import 'react-tooltip/dist/react-tooltip.css'
import { useGetColorInfoQuery } from '../hooks/index.js'
import 'react-tippy/dist/tippy.css'
import { StyledTooltip } from '../styles.js'

// Why this is not visible in App file?
// export default function ColorItem ({ key, color }) {
//   return (<span id="my-anchor-element" key={index} className="color-item" style={{ backgroundColor: getRGBAColorString(color) }} />)
// }

function ColorItem({ index, color = {} }) {
  const data = useGetColorInfoQuery(color)

  // console.log('render ColorItem, data -> ', data)

  const tooltipContent = useMemo(() => {
    // console.log('ColorItem, tooltipContent re-calculating')
    return !data ? null : (<div>
        Color name: <strong>{data.name.value}</strong><br />
        Color hex: <strong>{data.hex.value}</strong><br />
        Color clean hex: <strong>{data.hex.clean}</strong><br />
        Color closest hex: <strong>{data.name.closest_named_hex}</strong><br />
        Distance: <strong>{data?.name?.distance}</strong><br />
        Is exact color name: <strong>{data?.name?.exact_match_name === false ? 'No' : 'Yes'}</strong><br />
        Contrast: <strong>{data?.contrast?.value}</strong><br /><br />

        Color models:
        RGB: <strong>{data?.rgb?.value}</strong><br />
        HEX: <strong>{data?.hex?.value}</strong><br />
        HSL: <strong>{data?.hsl?.value}</strong><br />
        HSV: <strong>{data?.hsv?.value}</strong><br /> 
        Color sample:<br /> 
        <img src={data?.image?.named} alt={data?.name?.value} width="50" height="50" />
    </div>)
}, [data])

  const colorElement = <span id="my-anchor-element" key={index} className="color-item" style={{ backgroundColor: getRGBAColorString(color) }} />
  
  return data ? (<>
    <StyledTooltip 
      anchorSelect="#my-anchor-element"
      allowHTML={true}
      html={tooltipContent}
      position="bottom"
      animation="fade"
      arrow="true"
    >
      {colorElement}
    </StyledTooltip> 
  </>) : colorElement
}

// export default ColorItem // see with console.log() uncommented

export default React.memo(ColorItem)