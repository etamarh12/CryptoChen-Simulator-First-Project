import React, { useContext, useState } from 'react'
import { Context } from '../src/context/Context'
import './Coin.css';
import axios from "axios"

const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  const { user, dispatch } = useContext(Context);
  const [ammount, setAmmount] = useState(0);
  const [error, setError] = useState("");
  var CurrectcoinValue = 0;

  const onAmmountChange = (e) => {
    setAmmount(e.target.value);
  };
  const onButtonClick = () => {
    try {
      const wallet = user.wallet;
      const totalPrchase = ammount * price;
      const totalWallet = wallet - totalPrchase;
      if (totalPrchase > wallet) {
        alert("Purchase not completed - You dont have enough money");
      } else if (ammount < 1) {
        alert("Purchase not completed - You cannot buy lower than zero");
      } else {
      updateWallet(totalWallet);
      findAndUpdateLocalCoin(symbol, ammount);
      dispatch({ type: "CHANGE_WALLET", wallet: totalWallet });
      setCoin(symbol, ammount);
      alert("Purchase completed");
    }
    } catch {
    alert("Login please!");
  }
};
const ButtonClick = () => {
  if (!user) {
    alert("Login please!")
    return;
  }
  findAndGetSymbolValue(symbol);
  const totalSell = ammount * price; 
  if (ammount > CurrectcoinValue || CurrectcoinValue === 0) {
    alert("Sell not completed - You dont have enough coins");
  } else if (ammount < 1) {
    alert("Purchase not completed - You cannot sell lower than zero");
  } else {
    const updatedWallet = user.wallet + totalSell;
    const totalAmmount = ammount - ammount - ammount;
    findAndUpdateLocalCoin(symbol, totalAmmount);
    dispatch({ type: "CHANGE_WALLET", wallet: updatedWallet });
    updateWallet(updatedWallet);
    setCoin(symbol, totalAmmount); 
    alert("Sell completed");
  }
};

const updateWallet = async (totalWallet) => {
  user.wallet = totalWallet;
  setError(false);
  try {
    setError(false);
    const res = await axios.patch("http://localhost:3001/api/users/updateWallet", {
      email: user.email,
      wallet: totalWallet
    });
    res.data && window.location.replace("/home");
  } catch (err) {
    setError(true);
  }
};

const setCoin = async (symbol, ammount) => {
  symbol = symbol.toUpperCase();
  setError(false);
  try {
    setError(false);
    const res = await axios.patch("http://localhost:3001/api/users/setCoin", {
      email: user.email,
      symbol, ammount
    });
    res.data && window.location.replace("/home");
    console.log(error)
  } catch (err) {
    setError(true);
  }
};
function findAndGetSymbolValue(symbol) {
  switch (symbol) {
    case "btc":
      CurrectcoinValue = user.BTC
      break;
    case "eth":
      CurrectcoinValue = user.ETH
      break;
    case "usdt":
      CurrectcoinValue = user.USDT
      break;
    case "usdc":
      CurrectcoinValue = user.USDC
      break;
    case "bnb":
      CurrectcoinValue = user.BNB
      break;
    case "xrp":
      CurrectcoinValue = user.XRP
      break;
    case "busd":
      CurrectcoinValue = user.BUSD
      break;
    case "ada":
      CurrectcoinValue = user.ADA
      break;
    case "sol":
      CurrectcoinValue = user.SOL
      break;
    case "doge":
      CurrectcoinValue = user.DOGE
      break;
      case "matic":
        CurrectcoinValue = user.MATIC 
        break;
    default:
      CurrectcoinValue = 0
  }
}
function findAndUpdateLocalCoin(symbol, newCoinAmmount) {
  switch (symbol) {
    case "btc":
      user.BTC = Number(user.BTC)+Number(newCoinAmmount)
      break;
    case "eth":
      user.ETH = Number(user.ETH)+Number(newCoinAmmount)
      break;
    case "usdt":
      user.USDT = Number(user.USDT)+Number(newCoinAmmount)
      break;
    case "usdc":
      user.USDC = Number(user.USDC)+Number(newCoinAmmount)
      break;
    case "bnb":
      user.BNB = Number(user.BNB)+Number(newCoinAmmount)
      break;
    case "xrp":
      user.XRP = Number(user.XRP)+Number(newCoinAmmount)
      break;
    case "busd":
      user.BUSD = Number(user.BUSD)+Number(newCoinAmmount)
      break;
    case "ada":
      user.ADA = Number(user.ADA)+Number(newCoinAmmount)
      break;
    case "sol":
      user.SOL = Number(user.SOL)+Number(newCoinAmmount)
      break;
    case "doge":
      user.DOGE = Number(user.DOGE)+Number(newCoinAmmount)
      break;
      case "matic":
        user.MATIC = Number(user.MATIC)+Number(newCoinAmmount)
        break;
    default:
  }
}
return (
  <div className='coin-container' >
    <div className='coin-row'>
      <div className='coin'>
        <a href='https://www.coinbase.com/explore'>
        <img src={image} alt='crypto'/>
        </a>
        <h1 >{name}</h1>
        <p className='coin-symbol'>{symbol}</p>
      </div>
      <div className='coin-data'>
        <p className='coin-price'>${price}</p>
        <p className='coin-volume'>${volume.toLocaleString()}</p>
        {priceChange < 0 ? (
          <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
        ) : (
          <p className='coin-percent green'>{priceChange.toFixed(2)}%</p>
        )}
        <p className='coin-marketcap'>
          ${marketcap.toLocaleString()}
        </p>
        <input type="number" className="buyInput" value={ammount} onChange={onAmmountChange}></input>
        <button className='buybtn' onClick={onButtonClick}>Buy</button>
        <button className='sellbtn' onClick={ButtonClick}>Sell</button>
      </div>
    </div>
  </div>
);
};

export default Coin;