import React, { useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-tippy/dist/tippy.css';
import {
	ColorInputContainer,
	StyledForm,
	StyledButton,
} from '../styles.js';
import {
	getRGBAColorString,
	getTextColor,
} from '../utils';
import ColorFormInput from './ColorFormInput'

const initialColor = { r: '', g: '', b: '', a: 1};

function ColorForm({ color: parentColor, setColor: setParentColor}) {
	const [color, setColor] = useState(initialColor);

	function handleColorChange(e) {
		console.log('onChange');
		setColor({ ...color, [`${e.target.id}`]: +e.target.value });
	}

	function validateColor(e) {
		console.log('onInput');
		if (+e.target.value > 255 || +e.target.value < 0) {
			let el = document.querySelector(`#${e.target.id}`)
			el.value = color[e.target.id]
			setColor({ ...color })
		}
	}

	function onSubmit(e) {
		e.preventDefault()
		setParentColor(color)
	}

	return (
		<ColorInputContainer>
			<StyledForm
				onSubmit={onSubmit}
				data-testid='color-input-form'
			>
				<p className='text'>Enter RGB color:</p>
				<ColorFormInput id='r' onChange={handleColorChange} onInput={validateColor} value={color.r} color={parentColor} />
				<ColorFormInput id='g' onChange={handleColorChange} onInput={validateColor} value={color.g} color={parentColor} />
				<ColorFormInput id='b' onChange={handleColorChange} onInput={validateColor} value={color.b} color={parentColor} />
				<StyledButton
					type='number'
					color={getTextColor(parentColor)}
					bgColor={getRGBAColorString(parentColor)}
					data-testid='submit-color'
				>
					Submit
				</StyledButton>
			</StyledForm>
		</ColorInputContainer>
	);
}

// export default MultipleColorsShema // see with console.log() uncommented

export default ColorForm;
React.memo(ColorForm);
