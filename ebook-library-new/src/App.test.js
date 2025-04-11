import { render, screen } from '@testing-library/react';
import App from './App';

test('renders eBook Library heading', () => {
  render(<App />);
  const heading = screen.getByText(/eBook Library/i);
  expect(heading).toBeInTheDocument();
});
