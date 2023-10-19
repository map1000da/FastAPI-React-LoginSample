import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken, fetchToken } from "./Auth";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  //submitボタンが押されたときの処理
  const handleSubmit = () => {
    if (username.length === 0) {
      alert("Usename has left Blank");
    } else if (password.length === 0) {
      alert("password has left Blank");
    } else {
      console.log("success");
      axios
        .post("http://localhost:8000/login", {
          username: username,
          password: password,
        })
        .then(function (response) {
          //通信が成功したときの処理
          console.log(response);
          if (response.data["message" == "login failed"]) {
            alert("Login failed");
          } else {
            if (response.data.token) {
              setToken(response.data.token);
              navigate("/profile");
            }
          }
        })
        .catch(function (error) {
          //通信が失敗したときの処理
          console.log(error, "error");
        });
    }
  };

  return (
    <div>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <div>
                    <label className="form-label">Your User Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="usename"
                      id="username"
                      value={username}
                      onChange={onChangeUsername}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Your Password</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="password"
                      id="password"
                      value={password}
                      onChange={onChangePassword}
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <input
                      type="button"
                      className="btn btn-success btn-lg"
                      name="submit"
                      id="submit"
                      value="Login"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
