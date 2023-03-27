import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { indigo } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { useState } from "react";

export default function MayBeShowNavbar({children}) {

    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
      console.log('this is location',location)
        if(location.pathname === '/login'){
            setShowNavbar(false)
        }
        else{
            setShowNavbar(true)
        }
     
    }, [location])
    
  
  return (
   <>
        {showNavbar && children}
   </>
  )
}
