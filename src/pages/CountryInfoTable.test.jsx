import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryInfoTable from './CountryInfoTable';

describe('CountryInfoTable Component', () => {
  const testData = {
    activePerOneMillion: 100,
    recoveredPerOneMillion: 200,
    criticalPerOneMillion: 50,
    casesPerOneMillion: 500,
    deathsPerOneMillion: 20,
    testsPerOneMillion: 1100,
    oneCasePerPeople: 30,
    oneDeathPerPeople: 15,
    oneTestPerPeople: 5,
    todayDeaths: 6,
    todayRecovered: 10,
    todayCases: 60,
    cases: 1000,
    deaths: 120,
    recovered: 600,
  };

  it('renders with correct data', () => {
    render(<CountryInfoTable data={testData} />);
    
    expect(screen.getByText(/Active Per One Million/i)).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    
    expect(screen.getByText(/Recovered Per One Million/i)).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    
    expect(screen.getByText(/Critical Per One Million/i)).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    
    expect(screen.getByText(/Cases Per One Million/i)).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    
    expect(screen.getByText(/Deaths Per One Million/i)).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    
    expect(screen.getByText(/Tests Per One Million/i)).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    
    expect(screen.getByText(/One Case Per People/i)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    
    expect(screen.getByText(/One Death Per People/i)).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    
    expect(screen.getByText(/One Test Per People/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    
    expect(screen.getByText(/Today Deaths/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    
    expect(screen.getByText(/Today Recovered/i)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    
    expect(screen.getByText(/Today Cases/i)).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    
    expect(screen.getAllByText(/Cases/i)).toHaveLength(3);
    expect(screen.getByText('1000')).toBeInTheDocument();
    
    expect(screen.getAllByText(/Deaths/i)).toHaveLength(3);
    expect(screen.getByText('100')).toBeInTheDocument();
    
    expect(screen.getAllByText(/Recovered/i)).toHaveLength(3);
    expect(screen.getByText('500')).toBeInTheDocument();
  });
});
