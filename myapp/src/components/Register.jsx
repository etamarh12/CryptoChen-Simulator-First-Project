import axios from "axios"
import { useState } from "react"
import "./register.css"
export default function Register() {
  const [date, setdate] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [wallet, setWallet] = useState("")
  const [error, setError] = useState("");
  const hamdleSubmit = async (e) => {
    setError(false);
    try {
      setError(false);
      e.preventDefault();
      if (date < 1) {
        alert("wrong date !")
        window.location.replace("/register");
      } else if (wallet < 1) {
        alert("wallet cant be zero or lower than zero !")
        window.location.replace("/register");
      } else {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        date,
        password,
        email,
        wallet
      });
      res.data && window.location.replace("/login")
    }
    } catch (err) {
      setError(true);
    }
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={hamdleSubmit}>
        <label className="lable">Date :</label>
        <input type="Number"
          className="registerInput"
          placeholder="Example : 30121995"
          onChange={e => setdate(e.target.value)}
        />
        <label className="lable">Email :</label>
        <input type="text" className="registerInput" placeholder="Enter your email ..."
          onChange={e => setEmail(e.target.value)} />
        <label className="lable">Password :</label>
        <input type="text" className="registerInput" placeholder="Enter your password ..."
          onChange={e => setPassword(e.target.value)} />
        <label className="lable">Wallet :</label>
        <input type="number" className="registerInput" placeholder="Wallet ammount $"
          onChange={e => setWallet(e.target.value)} />
        <button className="registerButton" type="submit" >Register</button>
        {error && <span>this user already exist!</span>}
      </form>
      <a href="/Login">
        <button className="ref-Login">Have an Account ?</button>
      </a>
    </div>
  )
}