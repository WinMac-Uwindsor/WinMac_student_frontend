import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleAlertDialog } from "../constants";


function MyBookings(e) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  console.log("username",username)

  const [details, setDetails] = useState([]);

  useEffect(() => {
    if(username === null){
      navigate('/login')
    }else{
      console.log(" hello");
    bookings(username);}

  },[]);

  function bookings(username){
    // setLoading(true);
    // First API call to get event IDs
    fetch("https://acservices-winmac.onrender.com/winmac/eventBook/myBookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    })
      .then((response) => {response.json(); console.log("response of bookings is :"+response.json)})
      .then((data) => {
        
        console.log("Data.Data: " + data.data);
        console.log("Data.Data.length: " + data.data.length);
        // Array to store all the API call promises
        const promises = [];
        
        // Loop over the event IDs and make API calls for each one
        data.data.forEach((eventId) => {
          console.log("eventID: " + eventId);
          // setLoading(true);
          const promise = fetch(
            "https://acservices-winmac.onrender.com/winmac/eventList/eventDetails",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ event_id: eventId }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              // setLoading(false);
              return data.data[0];
            })
            .catch((error) => {
              setLoading(false);
              console.error(
                `Error fetching data for event ${eventId}:`,
                error
              );
              
              handleAlertDialog(`Error fetching data for event ${eventId}:`+ error);
              return null;
            });
          promises.push(promise);
        });
        // Wait for all the API calls to complete
        Promise.all(promises).then((eventDetails) => {
          // Remove null values from the array
          const filteredDetails = eventDetails.filter((detail) => detail);
          // Update the details state with the new data
          setDetails(filteredDetails);
        });
        // setLoading(false);
      })
      .catch((error) => {
        // setLoading(false);
        console.error("Error fetching event IDs:", error);
      });
  }

  function cancelBooking(id) {
    // setLoading(true);
    console.log("id: "+id+" type: "+typeof(id));
    axios
      .post("https://acservices-winmac.onrender.com/winmac/eventBook/removeEvent", {"username": username, "eventBooked": id})
      .then((response) => {
       
        console.log("cancel success",response.data);
        bookings();
        // setLoading(false);
      })
      .catch((error) => {
        // setLoading(false);
        console.error("Error canceling booking:", error);
      });
  }
  console.log("deatils length: " + details.length);

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
      {details.length > 0 &&
        details.map((item, index) => (
          <Card sx={{ maxWidth: 700 }} className="event" key={index}>
            <CardHeader
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
              </Typography>
            </CardContent>{" "}
              <div>
                <Button
                  onClick={() => cancelBooking(item.event_id)}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
                </Button>{" "}
              </div>
          </Card>
        ))}
    </div>
  );

}

export default MyBookings;
             
