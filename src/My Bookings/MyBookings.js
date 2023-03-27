import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import BlueCard from "../constants";

function MyBookings() {
  const username = localStorage.getItem('username');

  console.log("username",username)

  const [details, setDetails] = useState([]);

  useEffect(() => {
    bookings(username);
  },[]);

  function bookings(username){
    // First API call to get event IDs
    fetch("https://acservices-winmac.onrender.com/winmac/eventBook/myBookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data.Data: " + data.data);
        console.log("Data.Data.length: " + data.data.length);
        // Array to store all the API call promises
        const promises = [];
        // Loop over the event IDs and make API calls for each one
        data.data.forEach((eventId) => {
          console.log("eventID: " + eventId);
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
              return data.data[0];
            })
            .catch((error) => {
              console.error(
                `Error fetching data for event ${eventId}:`,
                error
              );
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
      })
      .catch((error) => {
        console.error("Error fetching event IDs:", error);
      });
  }

  function cancelBooking(id) {
    console.log("id: "+id+" type: "+typeof(id));
    axios
      .post("https://acservices-winmac.onrender.com/winmac/eventBook/removeEvent", {"username": username, "eventBooked": id})
      .then((response) => {
        console.log("cancel success",response.data);
        bookings(username);
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
      });
  }
  console.log("deatils length: " + details.length);


  return (
    <div>
      <br/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <br />
        {details.length > 0 &&
          details.map((item, index) => (
            <Card
              key={index}
              sx={{
                width: "50%",
                bgcolor: "#fff",
                my: 2,
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid #000000",
                minHeight: "45vh",

              }}
            >
              <CardContent
                sx={{
                  padding: "1.5rem",
                  backgroundImage: "white",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "1rem",
                    
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Date of Event:</span>{" "}
                  {item.date}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Time of Event:</span>{" "}
                  {item.time}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Location of Event:</span>{" "}
                  {item.location}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Event Description:</span>{" "}
                  {item.Desc}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "black",
                  height: "60px",
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  px: "1.5rem",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>PRESENTER:</span>{" "}
                  {item.Presenter.toUpperCase()}
                </Typography>
                <Button
                  onClick={() => cancelBooking(item.event_id, username)}
                  type="submit"
                  variant="contained"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "&:hover" ? "black" : "inherit",
                    backgroundColor: "&:hover" ? "white" : "transparent",
                    borderRadius: "10px",
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Card>
          ))}
      </div>{" "}
    </div>
  );

}

export default MyBookings;
             