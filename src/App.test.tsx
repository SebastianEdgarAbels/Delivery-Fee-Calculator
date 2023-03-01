import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Wolt', () => {
  render(<App />);
  const h1Element = screen.getByText(/Test/i);
  expect(h1Element).toBeInTheDocument();
});
test('renders Number of Items', () => {
  render(<App />);
  const thirdLabelElement = screen.getByText(/Number of Items/i);
  expect(thirdLabelElement).toBeInTheDocument();
});
