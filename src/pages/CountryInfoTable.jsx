import React, { useEffect, useState } from 'react'

const CountryInfoTable = ({data}) => {
    console.log(data);
    const [countryInformation, setCountryInformation] = useState([]);
    
    useEffect(() => {
      setCountryInformation([
        {value:data.activePerOneMillion,label:'Active Per One Million'},
        {value:data.recoveredPerOneMillion,label:'Recovered Per One Million'},
        {value:data.criticalPerOneMillion,label:'Critical Per One Million'},
        {value:data.casesPerOneMillion,label:'Cases Per One Million'},
        {value:data.deathsPerOneMillion,label:'Deaths Per One Million'},
        {value:data.testsPerOneMillion,label:'Tests Per One Million'},
        {value:data.oneCasePerPeople,label:'One Case Per People'},
        {value:data.oneDeathPerPeople,label:'One Death Per People'},
        {value:data.oneTestPerPeople,label:'One Test Per People'},
        {value:data.todayDeaths,label:'Today Deaths'},
        {value:data.todayRecovered,label:'Today Recovered'},
        {value:data.todayCases,label:'Today Cases'},
        {value:data.cases,label:'Cases'},
        {value:data.deaths,label:'Deaths'},
        {value:data.recovered,label:'Recovered'},
      ])
    }, [data])
    
    
  return (
    <div>
        <table>
            <tr>
                <th>Statistic Name</th>
                <th>Result</th>
            </tr>
            {
                countryInformation?.map(item =>(
                    <tr> 
                        <td>{item.label} </td>
                        <td>{item.value} </td>
                    </tr>
                    
                ))
            }
        </table>
    </div>
  )
}

export default CountryInfoTable