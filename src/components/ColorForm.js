import React, { useState, memo } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-tippy/dist/tippy.css';
import {
	ColorInputContainer,
	StyledForm,
	StyledButton,
} from '../styles.js';
import {
	getRGBAColorString,
	getTextColor, RGBAToHexA,
} from '../utils';
import ColorFormInput from './ColorFormInput'

const initialColor = { r: '', g: '', b: '', a: 1};

export const ColorForm = React.memo(({ color: parentColor, setColor: setParentColor, isConvert = false}) => {
	const [color, setColor] = useState(initialColor);
	const [convertedHexResult, setConvertedResult] = useState(null)
	function handleColorChange(e) {
		setColor({ ...color, [`${e.target.id}`]: +e.target.value });
	}

	function validateColor(e) {
		if (+e.target.value > 255 || +e.target.value < 0) {
			let el = document.querySelector(`#${e.target.id}`)
			el.value = color[e.target.id]
			setColor({ ...color })
		}
	}

	function onSubmit(e) {
		e.preventDefault()
		setParentColor(color, (arg1) => {
			console.log(arg1)
		})
		if (isConvert) {
			const result = RGBAToHexA(getRGBAColorString(color), true)
			setConvertedResult(result)
		}
	}

	return (
		<ColorInputContainer>
			<StyledForm
				onSubmit={onSubmit}
				data-testid='color-input-form'
			>
				<p className='text'>{isConvert ? 'Convert' : 'Enter'} RGB color:</p>
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
			{isConvert && convertedHexResult}
		</ColorInputContainer>
	);
})

// export default MultipleColorsShema // see with console.log() uncommented

// export default ColorForm;
// React.memo(ColorForm);

