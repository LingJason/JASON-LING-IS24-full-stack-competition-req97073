import React from "react";
import Home from "./components/Home";
import CreateEditProduct from "./components/CreateEditProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEditProduct />} />
          <Route path="/edit" element={<CreateEditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
