import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SeasonTicketReSubmissionMain from './SeasonTicketReSubmissionMain';

test('should render SeasonTicketReSubmissionMain Component', async () => {
    render(
        <Router>
            <SeasonTicketReSubmissionMain />
        </Router>
    );
    const SeasonTicketReSubmissionMainElement = await screen.findByTestId('season-ticket-resubmission-main');
    expect(SeasonTicketReSubmissionMainElement).toBeInTheDocument();
});
