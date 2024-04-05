import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CountryInfo from './CountryInfo';

// Mock Redux store
const mockStore = configureStore([]);

describe('CountryInfo component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      app: {
        data: {
          country: 'Test Country',
          countryInfo: {
            flag: 'test_flag_url',
            iso3: 'TST',
            lat: 0,
            long: 0
          },
          continent: 'Test Continent',
          population: 1000000,
          tests: 10000,
          active: 1000,
          critical: 100,
          deaths: 100,
          todayDeaths: 10,
          todayRecovered: 20,
          todayCases: 30,
          cases: 1000,
          recovered: 500
        },
        loading: false,
        error: null
      }
    });
  });

  test('renders country information correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/test-country']}>
            <Routes>
          <Route path="/:country" element={<CountryInfo />}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Test Country - TST/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Continent/i)).toBeInTheDocument();
    expect(screen.getByText(/Population/i)).toBeInTheDocument();
    expect(screen.getByText(/Latitude/i)).toBeInTheDocument();
    expect(screen.getByText(/Longitude/i)).toBeInTheDocument();
    expect(screen.getByText(/Tests/i)).toBeInTheDocument();
    expect(screen.getByText(/Active/i)).toBeInTheDocument();
    expect(screen.getByText(/Critical/i)).toBeInTheDocument();
    expect(screen.getByText(/Deaths/i)).toBeInTheDocument();


    expect(screen.getByText(/Chart/i)).toBeInTheDocument();
    expect(screen.getByText(/Table/i)).toBeInTheDocument();
  });

  test('renders loading spinner when loading data', async () => {
    store = mockStore({
      app: {
        data: null,
        loading: true,
        error: null
      }
    });

    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/test-country']}>
                <Routes>
                    <Route path="/:country" element={<CountryInfo />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders error message when there is an error', async () => {
    store = mockStore({
      app: {
        data: null,
        loading: false,
        error: 'Error fetching data'
      }
    });

    render(
        <Provider store={store}>
        <MemoryRouter initialEntries={['/test-country']}>
            <Routes>
                <Route path="/:country" element={<CountryInfo />} />
            </Routes>
        </MemoryRouter>
    </Provider>
    );

    expect(screen.getByText(/Sorry we couldnt find this page/i)).toBeInTheDocument();
  });
});
