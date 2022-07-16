import React from 'react';
import { render, screen } from '@testing-library/react';
import TemplateComponent from './TemplateComponent';

test('renders learn react link', () => {
  render(<TemplateComponent message="templateComponent!" />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
