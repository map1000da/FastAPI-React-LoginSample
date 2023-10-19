import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./componets/Login.js";
import Profile from "./componets/Profile.js";
import { RequireToken } from "./componets/Auth.js";

function App() {
  return (
    <div className="vh-100 gradient-custom">
      <div className="container">
        <h1 className="page-header text-center">
          React and FastAPI Login with PyJWT
        </h1>

        <BrowserRouter>
          <p>
            <Link to="/" className="btn btn-success">
              Login
            </Link>{" "}
            |{" "}
            <Link to="/profile" className="btn btn-success">
              Profile
            </Link>{" "}
          </p>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/profile"
              element={
                //ログインできている=tokenがある状態 のときだけProfile画面に行く
                <RequireToken>
                  <Profile />
                </RequireToken>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
