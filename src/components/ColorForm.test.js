import React, { useState } from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import user from '@testing-library/user-event'
//import fireEvent from '@testing-library/user-event'
import ColorForm  from './ColorForm';

const c1 = { r: 255, g: 255, b: 255, a: 1}
const c2 = { r: 20, g: 230, b: 40, a: 1}
const c3 = { r: 255, g: 255, b: 0, a: 1}
const changedColor = { r: 0, g: 255, b: 40, a: 1}
const initialColor = {
    r: '',
    g: '',
    b: '',
    a: '1',
};
// const colors = [c1, c2]
// const mockCallback = jest.fn(color => [...colors, color]);
// [c3, changedColor].forEach(c => mockCallback(c));
const mock = jest.fn()
const mockSetColor = jest.fn()

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(() => [initialColor, () => []])
}))

beforeEach(() => {
    mock.mockClear()
    mockSetColor.mockClear()
    useState.mockImplementation(() => [initialColor, mockSetColor])
})

describe('ColorForm suite', () => {

test('verify ColorInput mock function should be called', () => {
    const { getByTestId } = render(<ColorForm color={'#00FF00'} setColor={mock}/>)

    fireEvent.click(getByTestId('submit-color'));
    expect(mock).toHaveBeenCalledWith({
		r: '',
		g: '',
		b: '',
		a: '1',
	})
  })
  
  // const mockCallback = jest.fn(x => 42 + x);
  
  // test('forEach mock function', () => {
  //   [0, 1].forEach(e => mockCallback.apply(e));
  
  //   // The mock function was called twice
  //   expect(mockCallback.mock.calls).toHaveLength(3);
  
  //   // The first argument of the first call to the function was 0
  //   expect(mockCallback.mock.calls[0][0]).toBe(0);
  
  //   // The first argument of the second call to the function was 1
  //   expect(mockCallback.mock.calls[1][0]).toBe(1);
  
  //   // The return value of the first call to the function was 42
  //   expect(mockCallback.mock.results[0].value).toBe(42);
  // });
  
  
//   test('forEach mock function', () => {
    
//   });
  test('verify ColorInput correct format color setting', () => {
    const { getByTestId } = render(<ColorForm color={'#00FF00'} setColor={mock}/>)
  
    fireEvent.click(getByTestId('submit-color'));
    expect(mock).toHaveBeenCalled()
  })

  test('verify handleColorChange works correctly', () => {
    // useState.mockImplementation(() => [changedColor, mockSetColor])
    const { getByTestId } = render(<ColorForm color={'#00FF00'} setColor={mock}/>)
    // debug()
    fireEvent.change(getByTestId('r-input'), { target: {value: '255', id: 'r'}});
    expect(mockSetColor).toHaveBeenCalledWith({"a": "1", "b": "", "g": "", "r": 255})
  })

  test('verify validateColor works correctly', () => {
    // useState.mockImplementation(() => [changedColor, mockSetColor])
    const { getByTestId } = render(<ColorForm color={'#00FF00'} setColor={mock}/>)
    // debug()
    const incorrectMaxValue = 777777 // more than 255
    const incorrectMinValue = -10 // less than 0
    const correctValue1 = 255
    const correctValue2 = 233
    fireEvent.change(getByTestId('r-input'), { target: {value: correctValue1, id: 'r'}});
    fireEvent.input(getByTestId('r-input'), { target: {value: incorrectMaxValue, id: 'r'}})
    fireEvent.input(getByTestId('r-input'), { target: {value: incorrectMinValue, id: 'r'}})
    // check that after setting incorrect value, it should be reverted to the previous correct one
    expect(mockSetColor).toHaveBeenCalledWith({"a": "1", "b": "", "g": "", "r": correctValue1})

    fireEvent.input(getByTestId('r-input'), { target: {value: correctValue2, id: 'r'}})
    // check that after setting correct value, it should setted
    expect(mockSetColor).toHaveBeenCalledWith({"a": "1", "b": "", "g": "", "r": correctValue2})
  })

  test('snapshop test of the form', () => {
     // useState.mockImplementation(() => [changedColor, mockSetColor])
     const { getByText, queryByText, baseElement } = render(<ColorForm color={'#00FF00'} setColor={mock}/>)
     //  expect(getByText('erterer')).not.toBeInTheDocument() -> will not work - with not
    expect(queryByText('erterer')).not.toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })
})