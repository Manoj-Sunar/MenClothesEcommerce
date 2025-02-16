import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Alert = ({ message, onClose }) => {
  const alertStyle = {
    
  };

  const closeIconStyle = {
    marginLeft: 'auto',
    cursor: 'pointer',
  };

  return (
    <Box sx={{display:'flex',alignItems:'center'}}>
      <Typography variant="body1">{message}</Typography>
      {/* <CloseIcon onClick={onClose} style={closeIconStyle} /> */}
    </Box>
  );
};

const AlertMessage = ({status,msg}) => {


  const [showAlert, setShowAlert] = useState(status&&status);


  const transitionStyles = {
    entering: { transform: 'translateX(-300%)' },
    entered: { transform: 'translateX(0)', transition: 'transform 0.3s ease-out' },
    exiting: { transform: 'translateX(0)' },
    exited: { transform: 'translateX(-300%)', transition: 'transform 0.3s ease-out' },
  };


  useEffect(()=>{
      setTimeout(()=>{
         setShowAlert(false);
      },3000);

  },[])


  return (
      <>
       {
        showAlert? <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#ff7043',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            width:'300px',
            zIndex: 1000,
    
        }}>
        
    
          <CSSTransition in={showAlert} timeout={300} unmountOnExit>
            {(state) => (
              <div style={transitionStyles[state]}>
                <Alert message={msg&&msg}  />
              </div>
            )}
          </CSSTransition>
        </div>:""
       }
      
      
      </>
  );
};

export default AlertMessage;
