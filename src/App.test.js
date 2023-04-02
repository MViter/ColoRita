import { render, screen, waitFor } from '@testing-library/react';
// import user from '@testing-library/user-event'
import fireEvent from '@testing-library/user-event'
import App from './App';
import ColorInput  from './components/ColorForm';
import { jest} from '@jest/globals';

test('renders React Colorful title', () => {
  render(<App />);
  const linkElement = screen.getByText(/React Colorful/i);
  expect(linkElement).toBeInTheDocument();
});

test('after pressing button, form for adding color is available', async() => {
  const { getByTestId, getByText } = render(<App />)
  
  fireEvent.click(getByTestId('add-color'));
  
  await waitFor(() => {
    expect(getByTestId('color-input-form')).toBeInTheDocument();
    expect(getByText('R:')).toBeInTheDocument();
    expect(getByText('G:')).toBeInTheDocument();
    expect(getByText('B:')).toBeInTheDocument();
  });
});

test('after pressing button, color schema is available', async() => {
  const { getByTestId, getByText } = render(<App />)
  
  fireEvent.click(getByTestId('show-schema'));
  
  await waitFor(() => {
    expect(getByText('SCHEMA:')).toBeInTheDocument();
  })
})

