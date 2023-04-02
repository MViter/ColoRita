import { getRGBAColorString } from './utils'

export async function client(url) {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => Promise.reject(error));
  }
  
export async function getColorInfo(color) {
  return await client(`https://www.thecolorapi.com/id?rgb=${getRGBAColorString(color)}`);
}

export async function getColorSchema(color) {
    const colorToRequest = getRGBAColorString(color)

    return await client(`https://www.thecolorapi.com/scheme?rgb=${colorToRequest}mode=triad&count=6`);
}

