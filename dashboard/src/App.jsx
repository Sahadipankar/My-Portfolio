import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/login" />
        <Route path="/forgot/password" />
        <Route path="/reset/password/:token" />
        <Route path="/manage/skills" />
        <Route path="/manage/timeline" />
        <Route path="/manage/projects" />
        <Route path="/view/project/:id" />
        <Route path="/update/project/:id" />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App