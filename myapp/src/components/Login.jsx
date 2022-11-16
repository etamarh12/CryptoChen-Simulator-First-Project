import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../context/Context";
import "./login.css";


export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/home");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login to CryptoChen</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="lable">Email :</label>
        <input type="text" className="loginInput" placeholder="Enter your Email ..."
          ref={userRef} />
        <label className="lable">Password :</label>
        <input type="text" className="loginInput" placeholder="Enter your password ..."
          ref={passwordRef} />
        <button className="loginButton" disabled={isFetching}>Login</button>
        {error && <span>Wrong email / password</span>}

      </form>
      <a href="/forgetPassword">
        <button className="ref-forgetPassword">Forget password?</button>
      </a>
      <a href="/Register">
        <button className="ref-Register">Create account</button>
      </a>
    </div>

  )
}
