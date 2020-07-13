import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PriceDisplays from './components/PriceDisplays';
import CurrencyConverter from './components/CurrencyConverter';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ConvertX from './components/ConvertX';

class App extends React.Component {
  constructor(props){
    super(props);
    // This is a list of cryptocurrencies that is passed throughout the apps components to have a single point of truth
    // You may change these, in order to display other currencies
    this.state = {
      cryptocurrencies: ["BTC","ETH","LTC","XRP","USD","EUR","DAI","XLM","CRO","MKR","MANA","LINK","DGB","DOGE","THETA","REP","TZC","STX","WAX"],
      tickerValidation: ""
    };
  }

  addCurrencies = (value) => {
    fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + value + "&tsyms=USD&extraParams=ITU-React-App&api_key=2177ce3aa5d8e41ccf48871cba2cea32a3ffcbb9e59dc6011de5fa6f8ec1b5fb")
            .then(res => {return res.json()})
            .then(data => {
              if (this.state.cryptocurrencies.includes(value)) {
                this.setState({
                  tickerValidation: "is-invalid"
                });
              }
              else {
                var responseKeys = Object.keys(data);
                if (responseKeys[0] === "RAW") {
                  var list = this.state.cryptocurrencies;
                  list.push(value);
                  this.setState({
                    cryptocurrencies:list,
                    tickerValidation: "is-valid"
                  });
                }
                else {
                  this.setState({
                    tickerValidation: "is-invalid"
                  });
                }
              }
            })
  }

  clearValidation = () => {
    this.setState({tickerValidation:""});
  }

  render () {

    // This is a list of cryptocurrencies that is passed throughout the apps components to have a single point of truth
    // You may change these, in order to display other currencies

    // The Switch tag allows us to route users to different components, based on the URL they visit
    return (
      <Router>
        <div className="App container-flex">
          <Navbar></Navbar>
          <Switch>
            <Route path="/react-cryptocurrency-converter" exact render={() => <PriceDisplays clearValidation={this.clearValidation} tickerValidation={this.state.tickerValidation} addCurrencies={this.addCurrencies} cryptocurrencies={this.state.cryptocurrencies}/>} />
            <Route path="/" exact render={() => <PriceDisplays clearValidation={this.clearValidation} tickerValidation={this.state.tickerValidation} addCurrencies={this.addCurrencies}  cryptocurrencies={this.state.cryptocurrencies}/>} />
            <Route path="/currency-converter" exact render={() => <CurrencyConverter cryptocurrencies={this.state.cryptocurrencies} />} />
            <Route path="/currency-converter/:id" render={(props) => <ConvertX cryptocurrencies={this.state.cryptocurrencies} {...props}/>}></Route>
            <Route render={() => <PriceDisplays clearValidation={this.clearValidation} tickerValidation={this.state.tickerValidation} addCurrencies={this.addCurrencies} cryptocurrencies={this.state.cryptocurrencies}/>} />
          </Switch>
        
        </div>
      </Router>
    );
  }
}

export default App;
