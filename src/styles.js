import React from 'react'
// import { styled, setup } from 'goober';
import styled from 'styled-components'
import { Tooltip } from 'react-tippy';

// setup(React.createElement);

export const HeaderTitle = styled.h3` {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 16px;
  font-size: 44px;
  line-height: 1;
  color: black;
  padding-top: 20px;
  
  @media (max-width: 630px) {
    font-size: 22px;
    padding-top: 5px;
    margin-top: 5px;
  }
}`

export const TextDescription = styled("h5")` {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  max-width: 16em;
  color: black;
  @media (max-width: 630px) {
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
  }
}`

export const AppContent = styled("div")` {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 1px solid red;
}`

export const PaletteContainer = styled("span")` {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 630px) {
    margin-top: 0;
  }
}`

export const StyledTooltip = styled(Tooltip)`
  padding: 0;
  margin: 0;
  height: 20px !important;
`

export const StyledSchema = styled('div') ` {
  width: 100px;
  height: 100px;
  background-color: ${props => props.bgColor};
  border: 1px solid black;
}
`

export const ColorHandlersContainer = styled('div') `{
  display: flex;
  flex-direction: column;
}`

// export const StyledButton = styled.button `{
//   max-width: 100px;
//   margin-top: 20px;
//   background-color: ${props => props.bgColor};
// }`

export const ColorSchemaContainer = styled('div') `{
  position: absolute;
  height: 200px;
  top: 20px;
  right: 20px;
  display: contents;

  @media (max-width: 630px) {
    position: relative;
    display: flex;
    flex-direction: column;
    height: auto;
    display: contents;
  }
}`

export const ColorInputContainer = styled('div') `{
    position: absolute;
    top: 20px;
    left: 20px;

    @media (max-width: 630px) {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 200px;
    }
}`

export const StyledForm = styled('form')`{
  display: flex;
  flex-direction: column;
}`

export const StyledButton = styled('button')`{
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  background-color: ${props => props.bgColor};
  border: 1px solid ${props => props.color};
  border-radius: 8px;
  box-sizing: border-box;
  color: ${props => props.color};
  cursor: pointer;
  display: inline-block;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  margin: 8px;
  outline: none;
  padding: 5px 5px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s,-ms-transform .1s,-webkit-transform .1s,transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: auto;

&:focus-visible {
  box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
  transition: box-shadow .2s;
}

&:active {
  background-color: #F7F7F7;
  border-color: #000000;
  transform: scale(.96);
}

&:disabled {
  border-color: #DDDDDD;
  color: #DDDDDD;
  cursor: not-allowed;
  opacity: 1;
}
}`

export const CenteredContainer = styled('div') ` {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media (min-width: 630px) {
    margin-top: 0;
  }
}`

export const StyledInput = styled('input') `{
  width: 60px;
  font-size: 16px;
  color: ${props => props.color};
  border: none;
  border-bottom: 1px solid ${props => props.color};
  outline: none;
  background: transparent;
}`

export const InputContainer = styled('div') `{
  display: flex;
}`

export const ImageContainer = styled('div') `{
  width: 100px;
  height: 200px;
  color: lightgrey;
}`
