import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ColorItem from './ColorItem';

describe('ColorItem component', () => {
  const mockOnSelect = jest.fn();
  const testColor = {r: 255, g: 0, b: 0, a: 1, name: 'red' }
  const defaultProps = {
    color: testColor,
    onSelect: mockOnSelect,
  };

  beforeEach(() => {
    render(<ColorItem {...defaultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(screen.getByTestId('color-item')).toBeInTheDocument();
  });

//   test('popover responds to hover', async () => {
//     const { container, getByTestId } = render(<ColorItem {...defaultProps} />);
//     let colorItem = container.firstChild;
  
//     // tooltip is hidden
//     const nullTooltip = screen.queryByText(/Some unexisted test/i);
//     expect(nullTooltip).not.toBeInTheDocument();
  
//     // tooltip appears upon mouseover
//     fireEvent.focus(colorItem)
//     fireEvent.focusIn(colorItem)
//    // .click(colorItem);
//     const popoverTextFragment = screen.queryByText(/Color: /i);
//     expect(popoverTextFragment).toBeInTheDocument();
  
//     // tooltip disappears when mouse out
//     fireEvent.unhover(colorItem);
//     await waitForElementToBeRemoved(() =>
//      expect(popoverTextFragment).not.toBeInTheDocument()
//     );
//   });
});
