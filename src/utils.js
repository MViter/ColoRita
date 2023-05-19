// See http://www.w3.org/TR/AERT#color-contrast
export const getBrightness = ({ r, g, b }) => (r * 299 + g * 587 + b * 114) / 1000
export const getRGBAColorString = (color) => {
    const { r = 0, g = 0, b = 0, a = 1 } = color
    const res = `rgba(${r}, ${g}, ${b}, ${a})`

    return res
}
export const getTextColor = color => getBrightness(color) > 128 || color.a < 0.5 ? "#000" : "#FFF"
export const RGBAToHexA = (rgba, forceRemoveAlpha = false) => {
    if (rgba.includes('#')) return rgba

    const res =  "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
      .split(',') // splits them at ","
      .filter((string, index) => !forceRemoveAlpha || index !== 3)
      .map(string => parseFloat(string)) // Converts them to numbers
      .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
      .map(number => number.toString(16)) // Converts numbers to hex
      .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
      .join("") // Puts the array to togehter to a string

      // console.log('RGBAToHexA ', res)

      return res
  }

export const hexToRGB = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

export const setTextColor = (textColor) => {
    const textElements = document.querySelectorAll("[class*=text]")
    textElements.forEach(el => {
      el.style.color = textColor
    })
}

export const getTooltipInfo = (data) => {
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
}
