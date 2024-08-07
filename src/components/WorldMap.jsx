import React, { useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography,Graticule,ZoomableGroup,Sphere  } from 'react-simple-maps';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dataSuccess } from '../redux/actions';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const WorldMap = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    
    const handleSelectCountry = (name) => {
        navigate(`/${name}`);
    }

    useEffect(() => {
      dispatch(dataSuccess(null))
    }, [dispatch])
    
    return (
        <>
            <h1> COVID-19 STATISTICS </h1>
            <div style={{height:'30px',color:'#179dd3'}}> {content} </div>
            <div>
                <ComposableMap
                width={window.innerWidth}
                height={window.innerHeight}
                projectionConfig={{ scale: 200 }}
                data-testid="world-map"
                 >
                    <ZoomableGroup center={[0, 0]}>
                    <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                   <Graticule stroke="#f0eef2" />
                    <Geographies geography={geoUrl}>
                        {
                            ({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        stroke='#fff'
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => handleSelectCountry(geo.properties.name)}
                                        onMouseEnter={() => {
                                            const { name } = geo.properties;
                                            setContent(name);
                                        }}
                                        onMouseLeave={() => setContent('')}
                                        colorRendering={'red'}
                                        style={{
                                            hover: {
                                                fill: '#179dd3',
                                                outline: 'none',
                                                cursor:'pointer'
                                            },
                                            default:{
                                                fill:'#83cbe6'
                                            }
                                        }}
                                    />
                                ))
                        }
                    </Geographies >
                    </ZoomableGroup>
                </ComposableMap >
            </div>
        </>
    )
}

export default WorldMap