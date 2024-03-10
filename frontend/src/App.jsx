import React from "react";
import Form from "./components/Form";
import LogIn from "./components/LogIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/logIn" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
