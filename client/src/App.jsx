import { useState } from "react";
import "./App.css";
import Post from "./Post";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./userContext";
import { CreatePost } from "./pages/CreatePost";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
 
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
