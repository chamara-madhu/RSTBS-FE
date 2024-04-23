import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PendingPaymentApprovalsMain from '../admin/PendingPaymentApprovalsMain';

test('should render PendingPaymentApprovalsMain Component', () => {
    render(
        <Router>
            <PendingPaymentApprovalsMain />
        </Router>
    );
    const PendingPaymentApprovalsMainElement = screen.getByTestId('pending-payment-approvals-main');
    expect(PendingPaymentApprovalsMainElement).toBeInTheDocument();
});
