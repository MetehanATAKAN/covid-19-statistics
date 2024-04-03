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
    width: windowWidth > 992 ? chartWidth :windowWidth*0.8 ,
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
        ["Active Per One Million ", data.activePerOneMillion, "#b87333", null],
        ["Recovered Per One Million", data.recoveredPerOneMillion, "#b87333", null],
        ["Critical Per One Million", data.criticalPerOneMillion, "#b87333", null],
        ["Cases Per One Million", data.casesPerOneMillion, "color: #b87333", null],
        ["Deaths Per One Million", data.deathsPerOneMillion, "color: #b87333", null],
        ["Tests Per One Million", data.testsPerOneMillion, "color: #b87333", null],
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
        ["One Case Per People ", data.oneCasePerPeople, "#b87333", null],
        ["One Death Per People", data.oneDeathPerPeople, "#b87333", null],
        ["One Tes Per People", data.oneTestPerPeople, "#b87333", null]
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
        ["Today Deaths", data.todayDeaths, "#b87333", null],
        ["Today Recovered", data.todayRecovered, "#b87333", null],
        ["Today Cases", data.todayCases, "#b87333", null]
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
        ["Deaths", data.deaths, "#b87333", null],
        ["Recovered", data.recovered, "#b87333", null],
        ["Cases", data.cases, "#b87333", null],
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
    setChartWidth(windowWidth * 0.4); // Adjust multiplier as needed
  }, [windowWidth]);

 
  return (
    <>
      {
        data && dataMillion.length>0 && (
          <div className='covid-country-infos container'>
            <div className='country-other-info'>
              <div className='country-info card'>
                <div>
                  <span> <img src={data.countryInfo.flag} alt="flag" width={80} height={50} /> </span>
                  <span> {`${data.country} - ${data.countryInfo.iso3}`} </span>
                </div>
                <div>
                  <span> Continent </span>
                  <span> {data.continent} </span>
                </div>
                <div>
                  <span> Population </span>
                  <span> {data.population} </span>
                </div>
                <div>
                  <span> Latitude </span>
                  <span> {data.countryInfo.lat} </span>
                </div>
                <div>
                  <span> Longitude </span>
                  <span> {data.countryInfo.long} </span>
                </div>
              </div>
              <div className='country-info card'>
                <h3> General Information </h3>
              <div>
                  <span> Tests </span>
                  <span> {data.tests} </span>
                </div>
              <div>
                  <span> Active </span>
                  <span> {data.active} </span>
                </div>
                <div>
                  <span> Critical </span>
                  <span> {data.critical} </span>
                </div>
                <div>
                  <span> Deaths </span>
                  <span> {data.deaths} </span>
                </div>
              </div>
            </div>
             
            <div className='switch-container'>
              <div className='switch'>
                <span onClick={()=> setSwitchKey(1)} className={`item1 item ${switchKey === 1 && 'active-item'}`}>Chart</span>
                <span onClick={()=> setSwitchKey(2)} className={`item2 item ${switchKey === 2 && 'active-item'}`}>Table</span>
              </div>
            </div>

            {
              switchKey === 1
              ?<>
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
              :<CountryInfoTable data={data}/>
            }
          </div>
        )
      }
      {
        loading && !data && <Loading />
      }
      {
        error && <Error404/>
      }
    </>
  )
}

export default CountryInfo