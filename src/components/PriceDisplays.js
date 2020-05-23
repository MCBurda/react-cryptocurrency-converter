import React from 'react';
import Async from 'react-async';
import DisplayNavigation from './DisplayNavigation';
import Header from './Header';
import LoadingDisplay from './Loading';
import ErrorDisplay from './Error';
import IndividualDisplay from './IndividualDisplay';


class PriceDisplays extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchValue: "",
            filterOperation: 0
        };
    }

    PriceIndicator = (priceChange) => {
        if (priceChange < 0) {
            return "cryptoDirectionDown fa fa-caret-down";
        }
        else if (priceChange === 0) {
            return "cryptoDirectionNone fa fa-minus";
        }
        else if (priceChange > 0) {
            return "cryptoDirectionUp fa fa-caret-up";
        }
        else {
            console.log("Error. PriceIndicator function failed.")
            return "";
        }
    } 
    
    displaySearch = (searchTerm) => {
        this.setState({searchValue:searchTerm});
    }

    displayFilter = (filterValue) => {
        this.setState({filterOperation:filterValue});
    }

    setKeys = (data) => {
        var filteredKeys = Object.keys(data).filter(keys => keys.includes(this.state.searchValue.toUpperCase())); 
        return this.filterKeys(data, filteredKeys, this.state.filterOperation);
    }

    filterKeys = (data, filteredKeys, operation) => {
        var keys = filteredKeys;
        if (operation === 1) { // Ascending filter in DisplayNavigation.js
            keys = keys.sort();
        }
        else if (operation === 2) { // Descending filter in DisplayNavigation.js
            keys = keys.sort();
            keys = keys.reverse();
        }
        else if (operation === 3) { // % Gain filter in DisplayNavigation.js
            var obj = [];
            keys.map((key, index) => obj[index] = [[key],data[key].USD.CHANGEPCT24HOUR]);
            obj.sort(function(a, b){
                return b[1] - a[1];
            })
            
            obj.map((entry, index) => keys[index] = entry[0]);
        }
        else if (operation === 4) { // % Lost filter in DisplayNavigation.js
            var obj = [];
            keys.map((key, index) => obj[index] = [[key],data[key].USD.CHANGEPCT24HOUR]);
            obj.sort(function(a, b){
                return a[1] - b[1];
            })
            
            obj.map((entry, index) => keys[index] = entry[0]);
        }
        return keys;
    }

    stringifyAPI = (tickerArray) => {
        var apiString = "";
        tickerArray.forEach((ticker, index) => {
            if (index === (tickerArray.length - 1)) {
                apiString = apiString + ticker;
            }
            else {
                apiString = apiString + ticker + ",";
            }
            });
        return apiString;
    }

    render () {


    const loadPairs = () =>
        fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + this.stringifyAPI(this.props.cryptocurrencies) + "&tsyms=USD&extraParams=ITU-React-App&api_key=2177ce3aa5d8e41ccf48871cba2cea32a3ffcbb9e59dc6011de5fa6f8ec1b5fb")
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json());  
        // 
      return (
        <div>
            <Header heading="Global Prices" subHeading="Track the different markets where cryptocurrencies are trading in one dashboard:"></Header>
            <div className="row justify-content-center">
                <DisplayNavigation searchCallback={this.displaySearch} filterCallback={this.displayFilter}></DisplayNavigation>

                <Async promiseFn={loadPairs}>
                {( {data, err, isLoading}) => {
                    if (isLoading) 
                    return(
                        <LoadingDisplay></LoadingDisplay>
                    ) 

                    if (err) 
                    return (
                        <ErrorDisplay errorMessage={err.message}></ErrorDisplay>
                    ) 

                    if (data) {
                        var outputData = this.setKeys(data.RAW);

                        return(
                            outputData.map((key) => (
                            <div key={key} className="cryptoBox col-4 col-sm-3 col-lg-2">
                                <IndividualDisplay selectedCrypto={key} selectedPrice={data.RAW[key].USD.PRICE} selected24Change={data.RAW[key].USD.CHANGEPCT24HOUR} ></IndividualDisplay>
                            </div>
                            ))
                    )
                    }
                    }
                }
                </Async>
            </div>
        </div>
    )
  }
}
  

export default PriceDisplays;