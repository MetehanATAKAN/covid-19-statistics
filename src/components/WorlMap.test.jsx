import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import WorldMap from './WorldMap';
import store from '../redux';
import { createMemoryHistory } from 'history';

describe('WorldMap component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WorldMap />
        </MemoryRouter>
      </Provider>
    );
  });

  it('displays COVID-19 STATISTICS heading', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WorldMap />
        </MemoryRouter>
      </Provider>
    );
    const headingElement = screen.queryByText('COVID-19 STATISTICS');
    expect(headingElement).toBeInTheDocument();
  });

  it('navigates to country page when clicked on a country', async () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WorldMap />
        </MemoryRouter>
      </Provider>
    );
    const map = screen.getByTestId('world-map');

    fireEvent.click(map)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });

  });
});
