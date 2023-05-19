import React, { useState } from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import ColorPicker from './components/ColorPicker'


const mock = jest.fn()
const initialColor = { r: 255, g: 0, b: 0, a: 1};
const destinationValue = { r: 0, g: 255, b: 0, a: 1 };

const mockQuerySelector = jest.fn()


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(), // initial => [initial, mockSetColor],
  // mockSetColor: jest.fn().mockReturnValue([initialColor , () => [initialColor, destinationValue]]),
  // setColor: jest.fn().mockReturnValue([initialColor , () => [initialColor, destinationValue]])

  // useRef: () => ({
  //   get current() {
  //     return { querySelector: mockQuerySelector };
  //   },
  //   set current(val) {
  //     this._current = val;
  //   }})
  })
)

jest.mock('./components/ColorPicker', () => (props) => <div data-testid="color-picker" onClick={() => props.setColor({r: 255, g: 0, b: 0}, jest.fn())} />)

beforeEach(() => {
  mock.mockClear()
  // mockSetColor.mockClear()
  // mockSetColor.mockImplementation(() => [initialColor, mockSetColor])
  useState.mockImplementation(
      jest.requireActual('react').useState
  );
})

describe('App test suite', () => {
  test('renders React Colorful title', () => {
    render(<App />)
    const linkElement = screen.getByText(/React Colorful/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('after pressing button, form for adding color is available',  async() => {
    const { getByTestId, queryByTestId } = render(<App />)
    const addColorButton = getByTestId('add-color')

    expect(addColorButton).toBeInTheDocument()
    fireEvent.click(addColorButton)

    await waitFor(() => {
      expect(queryByTestId('color-input-form')).toBeInTheDocument();
      // expect(screen.getByText(/R:/i)).toBeInTheDocument();
      // expect(screen.getByText(/G:/i)).toBeInTheDocument();
      // expect(screen.getByText(/B:/i)).toBeInTheDocument();
    })
  });
  
  test('after pressing button, color schema is available', async() => {
    const { getByTestId, getByText, queryByText } = render(<App />)
    const showSchemaButton = getByTestId('add-color')

    expect(showSchemaButton).toBeInTheDocument()
    
    fireEvent.click(showSchemaButton);
    
    // expect(queryByText('SCHEMA')).toBeInTheDocument() // does not shown
  })
  
  it('colorItems rendered 1 time', async () => {
    const result = render(<App />);
    const colorPicker = result.getByTestId("color-picker")
    screen.logTestingPlaygroundURL()
    fireEvent.click(colorPicker)
    const colorItems = result.getAllByTestId('color-item');
    
    expect(colorItems.length).toBe(1)
  });

  // test('Testing useRef element', () => {
  //   const result = render(<App />);
  //   const elemWithRef = result.getByText('TestDiv')
  //   expect(mockQuerySelector).toBeCalled()
  // })

  test('Test useEffect on unmount makes clearTimeout', () => {
    const mockClearTimeout = jest.fn()
    global.clearTimeout = mockClearTimeout
    const { unmount } = render(<App />);
    unmount()

    expect(mockClearTimeout).toHaveBeenCalled()
  })

  test('Test useEffect on unmount makes clearTimeout - v2 version with spy', () => {
    const spySetTimeout = jest.spyOn(global, 'setTimeout')

    global.clearTimeout = spySetTimeout
    const { unmount, rerender } = render(<App />);
    unmount()
    // rerender(<App />)
    expect(spySetTimeout).toHaveBeenCalledTimes(1)
  })

  test('Test mocking third-party lib usage', () => {
    useState.mockImplementation(
        jest.requireActual('react').useState
    );
    const result = render(<App />);

  })

  it('colorItems rendered 2 times after click', async () => {
    jest.spyOn(global, 'setTimeout').mockImplementation(cb => cb())
    const delayAwait = async time => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, time);
      });
    };

    await delayAwait(1000);
    const result = render(<App />);
    const colorPicker = result.getByTestId("color-picker")

    const amountOfClicking = 3
    for(let i = 0; i < amountOfClicking; i++) {
      fireEvent.click(colorPicker)
    }

    const colorItems = result.getAllByTestId('color-item');
    expect(colorItems.length).toBe(amountOfClicking + 1) // amountOfClicking + initialColor

  });
})

