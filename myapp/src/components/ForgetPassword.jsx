import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../context/Context";
import "./ForgetPassword.css";

export default function ForgetPassword() {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const dateRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/forgetPassword", {
        email: emailRef.current.value,
        date: dateRef.current.value,
        password: passwordRef.current.value,
      });
      alert("Succes password changed !");
      window.location.replace("/login")
      console.log(res);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Forget Password</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="lable">Email :</label>
        <input type="text" className="loginInput" placeholder="Enter your Email ..."
          ref={emailRef} />
        <label className="lable">Date :</label>
        <input type="text" className="loginInput" placeholder="Enter your Date ..."
          ref={dateRef} />
        <label className="lable">New password :</label>
        <input type="text" className="loginInput" placeholder="Enter new Password ..."
          ref={passwordRef} />
        <button className="loginButton" disabled={isFetching}>Get my password back</button>
        {error && <span>Wrong email / date </span>}
      </form>
    </div>
  )
}
