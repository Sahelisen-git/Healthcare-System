import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/PopUp.css'
const PopUp = () => {
  return (
    <div className="popup">
          <div className="popcontainer">
              <div className="warning">
                  Please Wait...
              </div>
                    <CircularProgress />
                </div>
    </div>
  )
}

export default PopUp