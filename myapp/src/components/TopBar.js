import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import "./TopBar.css"
import axios from "axios"
export default function TopBar() {

  var { user, dispatch } = useContext(Context);
  const hamdleSubmit = async () => {
    try {
      const res = await axios.patch("http://localhost:3001/api/users/setWallet", {
        email: user.email
      });
      res.data && window.location.replace("/home");
    } catch (err) {
    }
  }
  const handleLogout = () => {
    if (window.confirm("are you sure you want to logout?") === true) {
      dispatch({ type: "LOGOUT" });
      window.location.replace("/home");
    }
  };
  const Reset = () => {
    alert("As default your coins & money in your bank will be reset and you will get 1000$ into your bank")
    if (window.confirm("Are you sure you want to reset?") === true) {
      hamdleSubmit();
      dispatch({ type: "LOGOUT" });
      alert("Reset success")
    }
  };
  const ResetAlert = () => {
    if (window.confirm("Login required") === true) {
    }
  }

  return (
    <div className='total-top-bar'>
      <div className="top">
        <div className='topLeft'>{(user ? user.wallet.toFixed(3) + "$ in your bank" : "Login required")}</div>
        <div className='topCenter'>
          <ul className="topList">
            <li className='topListItem'>
              <Link to="/home" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            </li>
            {user && (
              <li className='topListItem'>
                <Link to="/my-coins" style={{ color: "inherit", textDecoration: "none" }}>MyCoins</Link>
              </li>)
            }
            {!user && (
              <li className='topListItem'>
                <li style={{ color: "inherit", textDecoration: "none" }} onClick={ResetAlert}>Reset</li>
              </li>)
            }
            {!user && (
              <li className='topListItem'>
                <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>Login</Link>
              </li>)
            }
            {!user && (
              <li className='topListItem'>
                <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>Register</Link>
              </li>)
            }
            {user && (
              <li className='topListItem' onClick={handleLogout}>Logout</li>
            )
            }
            {user && (
              <li className='topListItem' onClick={Reset}>Reset</li>
            )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}