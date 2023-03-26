import Button from "@mui/material/Button";
import "./Events.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleAlertDialog } from "../constants";



const Events = (props) => {
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  console.log("username",username)

  const [data, setData] = useState([]);

  useEffect(() => {
    if(username === null){
      navigate('/login')
    }
    else{
    list();}
  }, []);

  function list(){
    setLoading(true);
    axios.get("https://acservices-winmac.onrender.com/winmac/eventList").then((response) => {
      setData(response.data);
      setLoading(false);
      console.log(response.data);
    }).catch((error) => {
      setLoading(false);
      handleAlertDialog(error);
      console.error("Error canceling booking:", error);
    });
  }
  function book(id,username) {
    console.log("id: "+id+" type: "+typeof(id));
    setLoading(true);
    axios
      .post("https://acservices-winmac.onrender.com/winmac/eventBook/book", {"username": username, "eventBooked": id})
      .then((response) => {
        console.log("cancel success",response.data);
        list();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        handleAlertDialog(error);
        console.error("Error canceling booking:", error);
      });
  }

  console.log("data: ", data.data);

  return (
    (loading)?<Box
    sx={{
      marginTop: 6,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <CircularProgress/></Box>:<div>
      <br/> 
      {data.length > 0 &&
        data.data.map((item, index) => (
          <Card sx={{ maxWidth: 345, mx: "auto" }}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={item.title}
            subheader={"By: " + item.Presenter}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Date of Event: {item.date}
              <br />
              Time of Event: {item.time}
              <br />
              Location of Event: {item.location}
              <br />
              Event Description: {item.Desc}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button
              onClick={() => book(item.event_id, username)}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, marginLeft: 15 }}
            >
              Book
            </Button>{" "}
          </CardActions>
        </Card>
        ))}
    </div>
  );
};

export default Events;
