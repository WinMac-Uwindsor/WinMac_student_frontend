import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { indigo } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { handleAlertDialog } from "../constants";


export default function Login() {
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (password.trim() === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    loginUser(username, password);
  };
  
  function loginUser(username, password){
    axios
    .post("https://acservices-winmac.onrender.com/winmac/auth/login", {"username": username, "password": password})
    .then((response) => {
      if(response.data.message==='login successful'){
        console.log("login success",response.data);
        localStorage.setItem('username',username);
        navigate('/DashBoard');
      }
      else{
        console.log("Error logging-in",response.data);
        handleAlertDialog(response.data['error']);
      }
    })
    .catch((error) => {
      handleAlertDialog(error);
      console.error("Error loggin in:", error);
    });
  }

  return (
    <Box
      sx={{
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ bgcolor: indigo[500] }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            error={usernameError}
            helperText={usernameError ? "Username is required" : ""}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            error={passwordError}
            helperText={passwordError ? "Password is required" : ""}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}