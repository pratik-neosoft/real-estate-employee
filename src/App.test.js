import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const MockApp = () => {
  return (
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  )
}

test('renders learn react link', () => {
  render(<MockApp />);
  const linkElement = screen.getByText(/Logger search/i);
  expect(linkElement).toBeInTheDocument();
});
