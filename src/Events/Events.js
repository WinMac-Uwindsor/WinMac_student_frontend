import Button from "@mui/material/Button";
import "./Events.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import React, { useState, useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";

const Events = (props) => {
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");

  console.log("username", username);

  const [data, setData] = useState([]);

  useEffect(() => {
    list();
  }, []);

  function list() {
    setLoading(true);
    axios
      .get("https://acservices-winmac.onrender.com/winmac/eventList")
      .then((response) => {
        setLoading(false);
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Retry after some time", error);
      });
  }
  function book(id, username) {
    console.log("id: " + id + " type: " + typeof id);
    setLoading(true);
    axios
      .post("https://acservices-winmac.onrender.com/winmac/eventBook/book", {
        username: username,
        eventBooked: id,
      })
      .then((response) => {
        setLoading(false);
        console.log("cancel success", response.data);
        list();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error canceling booking:", error);
      });
  }

  console.log("data: ", data.data);

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <br />
        {data.length > 0 &&
          data.data.map((item, index) => (
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
                  onClick={() => book(item.event_id, username)}
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
                  Book
                </Button>
              </Box>
            </Card>
          ))}
      </div>{" "}
    </div>
  );
};

export default Events;
