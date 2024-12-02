import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); // Ajuste para o conteúdo correto
  expect(linkElement).toBeInTheDocument(); // Verifica se o link está no documento
});
