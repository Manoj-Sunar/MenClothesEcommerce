import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
        bgcolor:'rgba(0, 0, 0, 0.8)'
      }}
    >
      <CircularProgress 
        size={80}
        thickness={4}
        sx={{
          animation: 'spin 1.5s linear infinite'
        }}
      />
    </Box>
  );
};

export default LoadingComponent;




