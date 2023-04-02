import { render, screen, waitFor } from '@testing-library/react';
// import user from '@testing-library/user-event'
import fireEvent from '@testing-library/user-event'
import App from './App';
import ColorInput  from './components/ColorForm';
import { jest} from '@jest/globals';
import { getTextColor } from './utils'

test('check getTextColor return expected value', () => {
  const color = { r: '255', g: '0', b: '130' }
  const expected = getTextColor(color)
  expect(getTextColor(color)).toBe(expected)
});