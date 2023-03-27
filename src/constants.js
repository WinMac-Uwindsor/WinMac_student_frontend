
import React from 'react';
import { Card, CardContent, Button } from '@mui/material';
export const handleAlertDialog = (message) => {
    window.alert(`${message}`);
  };


  const BlueCard = () => {
    return (
      <Card variant="outlined" style={{borderColor: 'blue'}}>
        <CardContent>
          <h2>Beautiful Card</h2>
          <p>This is a simple card with a blue border and a button at the bottom center.</p>
        </CardContent>
        <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '16px'}}>
          <Button variant="contained" color="primary">Click Me</Button>
        </div>
      </Card>
    );
  };
  
  export default BlueCard;