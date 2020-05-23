import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PriceDisplays from './components/PriceDisplays';
import CurrencyConverter from './components/CurrencyConverter';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ConvertX from './components/ConvertX';

class App extends React.Component {

  render () {

    var cryptocurrencies = ["BTC","ETH","LTC","XRP","USD","EUR","DAI","XLM","CRO","MKR","MANA","LINK","DGB","DOGE","THETA","REP","TZC"]

    return (
      <Router>
        <div className="App container-flex">
          <Navbar></Navbar>
          <Switch>
            <Route path="/react-cryptocurrency-converter" exact render={() => <PriceDisplays cryptocurrencies={cryptocurrencies}/>} />
            <Route path="/" exact render={() => <PriceDisplays cryptocurrencies={cryptocurrencies}/>} />
            <Route path="/currency-converter" exact render={() => <CurrencyConverter cryptocurrencies={cryptocurrencies} />} />
            <Route path="/currency-converter/:id" render={(props) => <ConvertX cryptocurrencies={cryptocurrencies} {...props}/>}></Route>
          </Switch>
        
        </div>
      </Router>
    );
  }
}

export default App;
