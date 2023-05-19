import React, { useState } from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ColorFormInput  from './ColorFormInput';

const mockOnChange = jest.fn()

test('verify ColorFormInput mock function should be called', () => {
    const id = 'r'
    const { getByTestId } = render(<ColorFormInput id={id} onChange={mockOnChange} onInput={mockOnChange} value={255} color={{ r: 255, g: 0, b: 0, a: 1 }} />)

    expect(getByTestId(`${id}-input`)).toBeInTheDocument()
})

test('verify ColorFormInput mock function should be called', () => {
    const id = 'r'
    const { getByLabelText } = render(<ColorFormInput id={id} onChange={mockOnChange} onInput={mockOnChange} value={255} color={{ r: 255, g: 0, b: 0, a: 1 }} />)

    expect(getByLabelText(`${id.toUpperCase()}:`)).toBeInTheDocument()
})