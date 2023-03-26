import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./complaint.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

export default function Complaints() {
  const [loading,setLoading] = useState(false);
  const username = localStorage.getItem('username');

  console.log("username",username)

  const [details, setDetails] = useState([]);

  useEffect(() => {
    getComplsints();
  },[]);

  const complaintRef = useRef(null);
  const [complaint, setComplaint] = useState("");

  function getComplsints() {
    setLoading(true);
    fetch("https://acservices-winmac.onrender.com/winmac/support/myTickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log("Length send by server: " + data.data.length);
        setDetails(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(`Error fetching data for event ${username}:`, error);
        return null;
      });
  }

  function handleFormSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const complaintField = document.querySelector("#complaint-field");
    const complaintMessage = complaintField.value;
    console.log(complaintMessage);
    setComplaint("");
    axios
      .post("https://acservices-winmac.onrender.com/winmac/support/newTicket", {
        username: username,
        message: complaintMessage,
      })
      .then((response) => {
        setLoading(false);
        console.log("complaint adding success", response.data);
        getComplsints();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error adding complaint:", error);
      });
  }

  function deleteComplaint(id) {
    console.log("id: " + id);
    setLoading(true);
    axios
      .post("https://acservices-winmac.onrender.com/winmac/support/deleteTicket", {
        event_id: id,
      })
      .then((response) => {
        setLoading(false);
        console.log("cancel success", response.data);
        getComplsints();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error canceling booking:", error);
      });
  }

  console.log("length: " + details.length);
  console.log("Details: " + details);

  return (
    (loading)?<Box
    sx={{
      marginTop: 6,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <CircularProgress/></Box>:
    <div>
      <br />
      <form className="form" onSubmit={handleFormSubmit}>
        <TextField
          ref={complaintRef}
          id="complaint-field"
          label="Complaint"
          value={complaint}
          onChange={(event) => setComplaint(event.target.value)}
          multiline
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{backgroundColor : "black"}}>
          Submit
        </Button>
      </form>
      <br />
      <br />
      {details.length > 0 &&
        details.map((item, index) => (
          <Card sx={{ maxWidth: 700 }} className="event" key={index}>
            <CardHeader subheader={"Ticket No.: " + item._id} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {"Complaint: " + item.message}
              </Typography>
            </CardContent>{" "}
            <div>
              <Button
                onClick={() => deleteComplaint(item._id)}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        ))}
    </div>
  );
}