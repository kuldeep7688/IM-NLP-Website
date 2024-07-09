// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import InteractWithModel from "./pages/InteractionWithModel";
import ModelNames from "./pages/ModelNames";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interactwithmodel" element={<InteractWithModel />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/modelnames" element={<ModelNames />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
