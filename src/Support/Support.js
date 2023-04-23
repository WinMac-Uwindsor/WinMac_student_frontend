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
import CircularProgress from "@mui/material/CircularProgress";
import { handleAlertDialog } from "../constants";

export default function Complaints() {
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");

  console.log("username", username);

  const [details, setDetails] = useState([]);

  useEffect(() => {
    getComplsints();
  }, []);

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
        details.length=0;
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
      .post(
        "https://acservices-winmac.onrender.com/winmac/support/deleteTicket",
        {
          event_id: id,
        }
      )
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

  return loading ? (
    <Box
      sx={{
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "black" }}
        >
          Submit
        </Button>
      </form>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
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
                minHeight: "23vh",
              }}
            >
              {" "}
              {/* <CardHeader subheader={"Ticket No.: " + item._id} /> */}
              <CardContent
                sx={{
                  padding: "1.5rem",
                  backgroundImage: "white",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Ticket No:</span>{" "}
                  {item._id}
                </Typography>
                {/* <CardContent>
              <Typography variant="body2" color="text.secondary">
                {"Complaint: " + item.message}
              </Typography>
            </CardContent>{" "} */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  <span sx={{ fontWeight: "bold" }}>Complaint:</span>{" "}
                  {item.message}
                </Typography>
                {/* <Button
                onClick={() => deleteComplaint(item._id)}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cancel
              </Button> */}
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
                  <Button
                    onClick={() => deleteComplaint(item._id)}
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
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
