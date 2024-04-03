import React from 'react'
import './error.css';
import { useNavigate} from 'react-router-dom';

const Error404 = () => {

    const navigate = useNavigate();

  return (
    <div className='error-page'>
        <div className='error-tab'>
            <div className='status'> 404 </div>
            <div className='message'>Sorry we couldnt find this page</div>
            <button onClick={()=>navigate('/')}>Back to homepage</button>
        </div>
    </div>
  )
}

export default Error404