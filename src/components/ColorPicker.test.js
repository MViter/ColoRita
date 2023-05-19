import React, { useState } from 'react'
import { render, screen, waitFor, fireEvent, getByText } from '@testing-library/react';
// import user from '@testing-library/user-event'
//import fireEvent from '@testing-library/user-event'
import ColorPicker  from './ColorPicker';
import App from '../App';
// import '@testing-library/jest-dom/extend-expect';
// import { RgbaColorPicker } from "react-colorful";


// const mock = jest.fn()
// const mockSetColor = jest.fn()
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn(() => [{}, () => []])
// }))


// beforeEach(() => {
//     mock.mockClear()
//     mockSetColor.mockClear()
//     useState.mockImplementation(() => [{}, mockSetColor])
// })

// describe('ColorPicker suite', () => {
//   test('snapshop test of the ColorPicker', () => {
//     // useState.mockImplementation(() => [changedColor, mockSetColor])
//     const { getByText, queryByText, baseElement } = render(<ColorPicker color={'#00FF00'} setColor={mock}/>)
//     expect(queryByText('erterer')).not.toBeInTheDocument()
//     expect(baseElement).toMatchSnapshot()
//   })

//   test('verify ColorPicker is in document', () => {
//     const { getByTestId } = render(<ColorPicker color={'#00FF00'} setColor={mock}/>)
//     expect(getByTestId('color-picker')).toBeInTheDocument()
//   })

//   test('verify setColor will be called on ColorPicker change', () => {
//     // useState.mockImplementation(() => [changedColor, mockSetColor])
    
//     // const { baseElement, getByTestId } = render(<ColoPicker color={'#00FF00'} setColor={mock}/>)
//     const { getByTestId } = render(<App color={'#00FF00'} setColor={mock}/>)
//     fireEvent.change(getByTestId('color-picker'), { target: {r: 255, g: 23, b: 23, a: 1}});
//     expect(mockSetColor).toHaveBeenCalledWith({"a": "1", "b": "", "g": "", "r": correctValue2})
//   })
// })

jest.mock("react-colorful", () => {
  return {
      RgbaColorPicker: ({ onChange }) => (<div onClick={() => onChange({ r: 255, g: 0, b: 0, a: 1 })}>ColorPicker!</div>), 
  };
});

describe('ColorPicker component', () => {
  const mockOnSelect = jest.fn();
  const colors = [
    { id: '1', color: '#000000', name: 'Black' },
    { id: '2', color: '#FFFFFF', name: 'White' },
  ];
  const initialValue = { r: 0, g: 100, b: 100, a: 1 };
  const destinationValue = { r: 233, g: 23, b: 222, a: 1 };
  const defaultProps = {
    colors,
    onSelect: mockOnSelect,
  };

  beforeEach(() => {
    // render(<ColorPicker {...defaultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it('renders without crashing', () => {
  //   expect(screen.getByTestId('color-picker')).toBeInTheDocument();
  // });

  it('calls the onSelect function when a color item is clicked', async () => {
    const handleChange = jest.fn((destinationValue) => destinationValue);
    const result = render(<ColorPicker color={initialValue} setColor={handleChange} />);

    // const saturation = result.container.querySelector(".react-colorful__saturation .react-colorful__interactive");

    screen.logTestingPlaygroundURL()

    fireEvent.click(result.getByText('ColorPicker!'))
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // it("Accepts an additional `className`", () => {
  //   const result = render(<RgbaColorPicker className="custom-picker" />);
  
  //   const hasClass = result.container.firstChild.classList.contains("custom-picker");
    
  //   expect(hasClass).toBe(true);
  // });

  // it("Renders proper alpha color picker markup", () => {
  //   const result = render(<RgbaColorPicker color="rgba(255, 0, 0, 0.5)" />);
  //   screen.logTestingPlaygroundURL();
  //   expect(result.container.firstChild).toMatchSnapshot();
  // });

  // it("Triggers `onChange` after a touch interaction", async () => {
  //   const handleChange = jest.fn(() => destinationValue);
  //   const result = render(<RgbaColorPicker color={initialValue} onChange={handleChange} />);
  //   const saturation = result.container.querySelector(".react-colorful__saturation .react-colorful__interactive");

  //   fireEvent.mouseDown(saturation, { pageX: 0, pageY: 0 })
  //   fireEvent.mouseMove(saturation, { pageX: 10, pageY: 10 })
  
  //   expect(handleChange).toHaveReturnedWith(destinationValue);
  // });
})