import logo from "./logo.svg";
import "./App.css";
import { Switch } from "@mui/material";
import DashBoard from "./DashBoard/DashBoard";
import MyBookings from "./My Bookings/MyBookings";
import MyAttendance from "./MyAttendance/MyAttendance";
import Support from "./Support/Support";
import Events from "./Events/Events";
import Navbar from "./Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Login/Login";
import QRScanner from "./QRScanner/QRScanner";
import MayBeShowNavbar from "./Login/MayBeShowNavbar";

function App() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
      <MayBeShowNavbar>
        <Navbar />
      </MayBeShowNavbar>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<DashBoard />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/MyAttendance" element={<MyAttendance />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/QRScanner" element={<QRScanner />} />

        <Route path="/*" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
