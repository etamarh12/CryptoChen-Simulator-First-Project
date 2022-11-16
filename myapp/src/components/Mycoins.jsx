import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context'
import axios from 'axios';
import '../App';
import '../Coin.css';
import '../App.css';

export default function Mycoins() {
  const { user } = useContext(Context);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'http://localhost:3001/api/users/getCoins/' + user.email
      )
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error));
  }, );

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = Object.keys(coins).filter(coin =>
    coin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>

      {filteredCoins.map(coin => {
        return (
          <div className='my_coins_view'>{coin}: {coins[coin.toUpperCase()]}</div>

        );
      })}
    </div>
  );
}