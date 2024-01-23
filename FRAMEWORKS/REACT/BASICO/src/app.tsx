import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./login";
import { ListPage, MyContextProvider } from "./list";
import { DetailPage } from "./detail";

export const App = () => {
  return (
    <MyContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
    </MyContextProvider>
  );
};
