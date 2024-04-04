import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AllNewApplicationsMain from '../admin/AllNewApplicationsMain';

test('should render AllNewApplicationsMain Component', () => {
    render(
        <Router>
            <AllNewApplicationsMain />
        </Router>
    );
    const AllNewApplicationsMainElement = screen.getByTestId('all-new-applications-main');
    expect(AllNewApplicationsMainElement).toBeInTheDocument();
});
