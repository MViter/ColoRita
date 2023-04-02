import React from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-tippy/dist/tippy.css';
import {
	StyledInput,
	InputContainer,
} from '../styles.js';
import { getTextColor } from '../utils';

const ColorFormInput = ({ id, onChange, onInput, value, color }) => {
    return (<InputContainer>
        <label htmlFor={id} className='text'>{id.toUpperCase()}:{' '}</label>
        <StyledInput
            type='number'
            className='text'
            id={id}
            value={value}
            color={getTextColor(color)}
            onChange={onChange}
            onInput={onInput}
            data-testid={`${id}-input`}
        />
    </InputContainer>)
}

export default ColorFormInput 