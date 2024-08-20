import React, { useState } from "react";
import { login } from "../API/endpoints";

const NewLogin = () => {
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleErrors = async () => {
    const newError = {};
    let isValid = true;
    if (!loginPayload.email.trim()) {
      newError.email = "Email is required";
      isValid = false;
    }
    if (!loginPayload.password.trim()) {
      newError.password = "Password is required";
      isValid = false;
    }
    console.log(Object.keys(newError), "Object.keys(newError)");
    if (Object.keys(newError).length == 0) {
      const res = await login(loginPayload);
      if (res.data.token && res.status == 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        alert(res.data.message);
      } else {
        alert("Login unSuccessfull");
      }
    }
    setErrors(newError);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>newLogin</h1>
      <div>
        <input
          placeholder="email"
          value={loginPayload.email}
          onChange={(e) => {
            setLoginPayload({ ...loginPayload, email: e.target.value });
            setErrors({ ...errors, email: "" });
          }}
        ></input>
        {errors.email && (
          <span style={{ color: "red", display: "block" }}>{errors.email}</span>
        )}
      </div>
      <div>
        <input
          placeholder="password"
          type="password"
          value={loginPayload.password}
          onChange={(e) => {
            setLoginPayload({
              ...loginPayload,
              password: e.target.value,
            });
            setErrors({ ...errors, password: "" });
          }}
        ></input>
        {errors.password && (
          <span style={{ color: "red", display: "block" }}>
            {errors.password}
          </span>
        )}
      </div>

      <button
        onClick={() => {
          handleErrors();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default NewLogin;
