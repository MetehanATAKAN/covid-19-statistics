import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Error404 from './404';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders error page with correct content', () => {
    render(
        <Router>
            <Error404 />
        </Router>
    );

    const statusElement = screen.getByText(/404/i);
    const messageElement = screen.getByText(/Sorry we couldnt find this page/i);
    const backButton = screen.getByText(/Back to homepage/i);

    expect(statusElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
});

test('clicking on back button navigates to homepage', () => {
    render(
        <Router>
            <Error404 />
        </Router>
    );

    const backButton = screen.getByText(/Back to homepage/i);
    fireEvent.click(backButton);

});
