import { useState } from "react";
import "./App.css";
import Post from "./Post";
import Header from "./Header";
import {Routes, Route} from 'react-router-dom';
import Layout from "./layout";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={ <Home/>}/>
     <Route path="/login" element={<Login/>}/>
         </Route>
      </Routes>
    </>
  );
}

export default App;
