import { Box } from "@mui/material";
import React from "react";
import Login from "./src/pages/LoginPage/index";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
export default App;
