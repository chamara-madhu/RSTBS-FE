import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUpLoginMain from '../login-sign-up/SignUpLoginMain';

test('should render SignUpLoginMain Component', () => {
    render(
        <Router>
            <SignUpLoginMain />
        </Router>
    );
    const SignUpLoginMainElement = screen.getByTestId('signup-login-main');
    expect(SignUpLoginMainElement).toBeInTheDocument();
});
