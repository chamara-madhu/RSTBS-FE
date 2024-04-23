import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingHistoryMain from '../passenger/BookingHistoryMain';

test('should render BookingHistoryMain Component', () => {
    render(
        <Router>
            <BookingHistoryMain />
        </Router>
    );
    const BookingHistoryMainElement = screen.getByTestId('booking-history-main');
    expect(BookingHistoryMainElement).toBeInTheDocument();
});
