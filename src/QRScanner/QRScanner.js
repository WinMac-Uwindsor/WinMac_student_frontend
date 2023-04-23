import React, {useState, useRef, useEffect} from 'react';
// import {Container, Card, CardContent,  TextField, Button} from '@mui/material';
import './QRScanner.css';
import QrReader from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { handleAlertDialog } from "../constants";



function QRScanner() { 
  var o=0;
  const username = localStorage.getItem('username');

  console.log("username",username)

  const navigate = useNavigate();
  useEffect(() => {
    if(username === null){
      navigate('/login')
    }
  }, []);
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [scanResultFile, setScanResultFile] = useState('');
    const [scanResultWebCam, setScanResultWebCam] =  useState('');
    // const classes = useStyles();
  
  
    const handleErrorWebCam = (error) => {
      console.log(error);
    }

    function web(){
      if(o===0){
        handleScanWebCam();
        o=1;
      }
    }
    const handleScanWebCam = (result) => {
      if (result){
        
          setScanResultWebCam(result);
          console.log(result);
          Attend(result);
          navigate('/MyAttendance');
           
          sleep(1000);
      }
     }

     
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

     function Attend(id) {
      console.log("id: "+id+" type: "+typeof(id));
      axios
        .post("https://acservices-winmac.onrender.com/winmac/eventAttend/attended", {"username": username, "eventAttended": id})
        .then((response) => {
          console.log("Event Attended",response.data);
        })
        .catch((error) => {
          console.error("Error updating attendance:", error);
        });
    }


  return (
    <div className="conatiner">
          <div>
              {/* <h2 className="title">Generate QR Code </h2> */}
              <div className="body">
                          {/* <TextField label="Enter Event ID here" onChange={(e) => setText(e.target.value)}/> */}
                          {/* <Button className="btn" variant="contained" onClick={() => generateQrCode()}>Generate</Button> */}
                          {/* <Button  variant="contained"  onClick={}>Generate</Button> */}
                            {/* <br/> */}
                            {/* <br/> */}
                            {/* <br/> */}
                            {/* {imageUrl ? ( */}
                              {/* <a href={imageUrl} download> */}
                                  {/* <img src={imageUrl} alt="img"/> */}
                              {/* </a>) : null} */}
                        {/* <Button className="btn" variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button> */}
                        {/* <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />
                        <h3>Scanned Code: {scanResultFile}</h3> */}
                      {/* </Grid> */}
                      {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}> */}
                         {/* <h3>Qr Code Scan by Web Cam</h3> */}
                         <QrReader
                         delay={300}
                         style={{width: '70%'}}
                         onError={handleErrorWebCam}
                         
                         onScan={web()}
                         />
                         {/* <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
                 </div>
              {/* <h2 className="title">Tap QR to Download</h2> */}
          </div>
    </div>
  );
}


export default QRScanner;
