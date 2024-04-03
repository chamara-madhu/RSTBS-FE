import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SeasonTicketMain from '../passenger/SeasonTicketMain';
import 'jest-canvas-mock';

jest.mock('jspdf-html2canvas', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => {
    return {
      then: jest.fn(),
    };
  }),
}));

describe('SeasonTicketMain Component', () => {
  test('should render SeasonTicketMain component', () => {
    render(
      <Router>
        <SeasonTicketMain />
      </Router>
    );

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();

    const headingElement = screen.getByText('Online application for season ticket');
    expect(headingElement).toBeInTheDocument();
  });
});
