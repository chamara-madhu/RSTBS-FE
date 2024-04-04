import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReviewNewApplicationMain from '../admin/ReviewNewApplicationMain';

test('should render ReviewNewApplicationMain Component', async () => {
    render(
        <Router>
            <ReviewNewApplicationMain />
        </Router>
    );
    
    await waitFor(() => {
        const ReviewNewApplicationMainElement = screen.getByTestId('review-new-application-main');
        expect(ReviewNewApplicationMainElement).toBeInTheDocument();
    });
});
