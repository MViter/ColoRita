import { getRGBAColorString } from './utils'

const baseURL = `https://www.thecolorapi.com`

export async function client(url) {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => Promise.reject(error));
  }
  
export async function getColorInfo(color) {
  return await client(`${baseURL}/id?rgb=${getRGBAColorString(color)}`);
}

export async function getColorSchema(color, count = 6) {
    const colorToRequest = getRGBAColorString(color)

    return await client(`${baseURL}/scheme?rgb=${colorToRequest}mode=triad&count=${count}`);
}

