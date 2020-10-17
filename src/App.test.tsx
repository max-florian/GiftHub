import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Debe renderizar Correctamente', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Gifthub/i);
  expect(linkElement).toBeInTheDocument;
});
