import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { indigo } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { bgcolor } from "@mui/system";
import { handleAlertDialog } from "../constants";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

import { UserContext } from "../App";
import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "../Navbar.css";
import "./DashBoard.css";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  countByRoles,
  topCompaniesByStudents,
  studentsPlaced,
  scrappedData,
} from "../JsonData/VisualizationData";



function DashBoard() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  useEffect(() => {
    if(username === null){
      navigate('/login')
    }
  }, []);

  function getRandomColors(length) {
    const colors = [];
    for (let i = 0; i < length; i++) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      colors.push(`rgba(${red}, ${green}, ${blue}, 0.2)`);
    }
    return colors;
  }
  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    );
  }
  const data = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  Object.keys(studentsPlaced[0]).forEach((company, index) => {
    const numPositions = Object.values(studentsPlaced[0][company]).reduce(
      (a, b) => a + b
    );
    const color = `hsl(${(index * 50) % 360}, 70%, 50%)`;
    data.labels.push(company);
    data.datasets[0].data.push(numPositions);
    data.datasets[0].backgroundColor.push(color);
  });

  const countByRolesData = {
    labels: countByRoles.map((e) =>
      e.job_titles
        
    ),
    datasets: [
      {
        label: "",
        backgroundColor: getRandomColors(countByRoles.length),
        borderColor: "rgb(255, 99, 132)",
        data: countByRoles.map((e) => e.company),
        fill: true,
      },
    ],
  };
  

  console.log("username",username)

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 0.5fr)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Item>
          <Bar data={countByRolesData} />
        </Item>
       

        <Item>
          <Doughnut data={data} />
        </Item>
        
      </Box>
      {/* <Pie data={data} /> */}
      {/* <div className="rowC"> */}
      {/* <Box sx={{ width: "150vh" }} options={{ responsive: true, maintainAspectRatio: false }}>
        <Line data={data} />
       
      </Box>
      <Box sx={{  width: "80vh" }} options={{ responsive: true, maintainAspectRatio: false }}>

      <Pie data={data} />
      </Box>
      
      <Box sx={{  width: "80vh", }} options={{ responsive: true, maintainAspectRatio: false }}>

<Bar data={data} />
</Box> */}
      {/* </div> */}
      <TableContainer component={Paper} sx={{padding:"50px" , borderRadius:"20px"}}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#2196f3" }}>
              <TableCell sx={{ color: "#fff" }}>Company</TableCell>
              <TableCell sx={{ color: "#fff" }}>Job Title</TableCell>
              <TableCell sx={{ color: "#fff" }}>Skills</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scrappedData.map((item, index) => (
              <TableRow
                key={item.job_titles}
                sx={{ background: index % 2 === 0 ? "#f2f2f2" : "#fff" }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  {item.company.toUpperCase()}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {item.job_titles.toUpperCase()}
                </TableCell>
                <TableCell>{item.skills}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     
     
    </>
  );
}

export default DashBoard;