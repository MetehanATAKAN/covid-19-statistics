import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { requestData } from '../redux/actions';
import Loading from '../components/Loading';
import './countryInfo.css';
import { Chart } from "react-google-charts";
import Error404 from './error/404';
import CountryInfoTable from './CountryInfoTable';

const CountryInfo = () => {

  const dispatch = useDispatch();
  const { country } = useParams();

  const { data, loading, error } = useSelector(state => state.app);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [chartWidth, setChartWidth] = useState(windowWidth * 0.4);

  const [switchKey, setSwitchKey] = useState(1);

  const [dataMillion, setDataMillion] = useState([]);
  const [dataPeople, setDataPeople] = useState([]);
  const [dataToday, setDataToday] = useState([]);
  const [dataTotal, setDataTotal] = useState([]);

  const options = {
    width: windowWidth > 992 ? chartWidth : windowWidth * 0.8,
    height: 400,
    legend: { position: "none" },
    backgroundColor: 'transparent',
  };

  const optionsMillion = {
    title: "Per Million Statistics",
    ...options
  }
  const optionsPeople = {
    title: "Per People Statistics",
    ...options
  }
  const optionsToday = {
    title: "Today Statistics",
    ...options
  }
  const optionsTotal = {
    title: "Total Statistics",
    ...options
  }

  useEffect(() => {
    if (data) {
      setDataMillion([
        [
          "Element",
          "Number of People",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["Active Per One Million ", data.activePerOneMillion, "#179dd3", null],
        ["Recovered Per One Million", data.recoveredPerOneMillion, "#179dd3", null],
        ["Critical Per One Million", data.criticalPerOneMillion, "#179dd3", null],
        ["Cases Per One Million", data.casesPerOneMillion, "color: #179dd3", null],
        ["Deaths Per One Million", data.deathsPerOneMillion, "color: #179dd3", null],
        ["Tests Per One Million", data.testsPerOneMillion, "color: #179dd3", null],
      ]);
      setDataPeople([
        [
          "Element",
          "Number of People",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["One Case Per People ", data.oneCasePerPeople, "#179dd3", null],
        ["One Death Per People", data.oneDeathPerPeople, "#179dd3", null],
        ["One Test Per People", data.oneTestPerPeople, "#179dd3", null]
      ])
      setDataToday([
        [
          "Element",
          "Number of People",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["Today Deaths", data.todayDeaths, "#179dd3", null],
        ["Today Recovered", data.todayRecovered, "#179dd3", null],
        ["Today Cases", data.todayCases, "#179dd3", null]
      ])
      setDataTotal([
        [
          "Element",
          "Number of People",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["Deaths", data.deaths, "#179dd3", null],
        ["Recovered", data.recovered, "#179dd3", null],
        ["Cases", data.cases, "#179dd3", null],
      ])
    }
  }, [data])

  useEffect(() => {
    dispatch(requestData(country));
  }, [country, dispatch])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setChartWidth(windowWidth * 0.4);
  }, [windowWidth]);


  return (
    <>
      {
        data && dataMillion.length > 0 && (
          <div className='covid-country-infos container'>
            <div className='header'>
              <span className='flag'> <img src={data.countryInfo.flag} alt="flag" width={80} height={50} /> </span>
              <span className='country-name'> {`${data.country} - ${data.countryInfo.iso3}`} </span>
            </div>

            <div className='country-information'>
              <div className='card-info'>
                <div className='label'>{data.continent}</div>
                <div className='value'>Continent</div>
              </div>
              <div className='card-info'>
                <div className='label'>{data.population}</div>
                <div className='value'>Population</div>
              </div>
              <div className='card-info'>
                <div className='label'>{data.countryInfo.lat}</div>
                <div className='value'>Latitude</div>
              </div>
              <div className='card-info'>
                <div className='label'>{data.countryInfo.long}</div>
                <div className='value'>Longitude</div>
              </div>
            </div>

            <div className='country-information'>
              <div className='card-info'>
                <div className='label'>{data.tests}</div>
                <div className='value'>Tests</div>
              </div>
              <div className='card-info'>
                <div className='label'>{data.active}</div>
                <div className='value'>Active</div>
              </div>
              <div className='card-info'>
                <div className='label'>{data.critical}</div>
                <div className='value'>Critical</div>
              </div>
              <div className='card-info'>
                <div className='label'>{data.deaths}</div>
                <div className='value'>Deaths</div>
              </div>
            </div>
            <div className='switch-container'>
              <div className='switch'>
                <span onClick={() => setSwitchKey(1)} className={`item1 item ${switchKey === 1 && 'active-item'}`}>Chart</span>
                <span onClick={() => setSwitchKey(2)} className={`item2 item ${switchKey === 2 && 'active-item'}`}>Table</span>
              </div>
            </div>

            {
              switchKey === 1
                ? <>
                  <div className='card'>
                    <div className='card-info'>
                      <div >
                        <Chart
                          chartType="BarChart"
                          width={'100%'}
                          data={dataMillion}
                          options={optionsMillion}
                        />
                      </div>
                      <div>
                        <Chart
                          chartType="BarChart"
                          width={'100%'}
                          data={dataPeople}
                          options={optionsPeople}
                        />
                      </div>
                    </div>
                  </div>


                  <div className='card'>
                    <div className='card-info'>
                      <div >
                        <Chart
                          chartType="BarChart"
                          width={'100%'}
                          data={dataToday}
                          options={optionsToday}
                        />
                      </div>
                      <div>
                        <Chart
                          chartType="BarChart"
                          width={'100%'}
                          data={dataTotal}
                          options={optionsTotal}
                        />
                      </div>
                    </div>
                  </div>
                </>
                : <CountryInfoTable data={data} />
            }
          </div>
        )
      }
      {
        loading && !data && <Loading />
      }
      {
        error && <Error404 />
      }
    </>
  )
}

export default CountryInfo