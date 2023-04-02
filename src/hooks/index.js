import { useEffect, useState, useRef } from "react"
import { getColorInfo, getColorSchema } from "../client"
import { setTextColor } from '../utils'

export const useBodyBackground = (color, textColor) => {
  useEffect(() => {
    document.body.style.backgroundColor = color
    setTextColor(textColor)
  }, [color, textColor]);
};

export function useGetColorInfoQuery(color) {
  const [data, setData] = useState()

  useEffect(() => {
   getColorInfo(color)
      .then((data) => {
          // console.log('useGetColorInfoQuery -> ', data)
          setData(data)
      })
      .catch((error) => console.log(error))
    }, [color])

  return data
}

export function useGetColorSchemaQuery(color) {
  const [data, setData] = useState()
  // console.log('useGetColorSchemaQuery ', color)

  useEffect(() => {
    getColorSchema(color)
      .then((data) => {
          // console.log('useGetColorSchemaQuery -> ', data)
          setData(data)
      })
      .catch((error) => console.log(error))
  }, [color])

  return data
}