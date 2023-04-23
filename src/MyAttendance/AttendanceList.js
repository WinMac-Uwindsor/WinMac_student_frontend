import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";


 function AttendedList(props){

    const details = props.details;
    const loading = props.loading;

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
        </Box>) :(
            
        <div  style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
            {details.length > 0 &&
          details.map((item, index) => (
            <Card
              key={index}
              sx={{
                width: "150%",
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
              </Box>
            </Card>
          ))}
        </div>
    );
 }
 export default AttendedList;