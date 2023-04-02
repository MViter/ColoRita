import React, { useState } from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import user from '@testing-library/user-event'
//import fireEvent from '@testing-library/user-event'
import ColorPicker  from './ColorPicker';
import App from '../App';

const mock = jest.fn()
const mockSetColor = jest.fn()
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(() => [{}, () => []])
}))


beforeEach(() => {
    mock.mockClear()
    mockSetColor.mockClear()
    useState.mockImplementation(() => [{}, mockSetColor])
})

describe('ColorPicker suite', () => {
  test('snapshop test of the ColorPicker', () => {
    // useState.mockImplementation(() => [changedColor, mockSetColor])
    const { getByText, queryByText, baseElement } = render(<ColorPicker color={'#00FF00'} setColor={mock}/>)
    expect(queryByText('erterer')).not.toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })

  test('verify ColorPicker is in document', () => {
    const { getByTestId } = render(<ColorPicker color={'#00FF00'} setColor={mock}/>)
    expect(getByTestId('color-picker')).toBeInTheDocument()
  })

  test('verify setColor will be called on ColorPicker change', () => {
    // useState.mockImplementation(() => [changedColor, mockSetColor])
    
    // const { baseElement, getByTestId } = render(<ColoPicker color={'#00FF00'} setColor={mock}/>)
    const { getByTestId } = render(<App color={'#00FF00'} setColor={mock}/>)
    fireEvent.change(getByTestId('color-picker'), { target: {r: 255, g: 23, b: 23, a: 1}});
    expect(mockSetColor).toHaveBeenCalledWith({"a": "1", "b": "", "g": "", "r": correctValue2})
  })
})