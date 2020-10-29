import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Debe renderizar Correctamente', () => {
  const { findByText } = render(<App />);
  const linkElement = findByText(/Gifthub/i);
  expect(linkElement).toBeInTheDocument;
});
