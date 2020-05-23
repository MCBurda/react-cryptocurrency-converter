import React from 'react';
import Header from './Header';
import IndividualDisplay from './IndividualDisplay';


class ConvertX extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: 0,
            convertInto: "USD",
            isSelected: false,
            cryptocurrencies: [],
            apiValues: {
                selectedPrice: 0,
                selected24Change: 0,
                convertIntoPrice: 0,
                convertInto24Change: 0
            }
        };
    }

    
    selectedCrypto = this.props.match.params.id;

    componentDidMount() {
        const cryptocurrencies = this.props.cryptocurrencies;
        fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + this.selectedCrypto + "," + this.state.convertInto + "&tsyms=USD&extraParams=ITU-React-App&api_key=2177ce3aa5d8e41ccf48871cba2cea32a3ffcbb9e59dc6011de5fa6f8ec1b5fb")
        .then(res => {return res.json()})
        .then(data => {
            console.log(data);
            this.setState({
                cryptocurrencies: cryptocurrencies,
                apiValues:{
                    selectedPrice:data.RAW[this.selectedCrypto].USD.PRICE,
                    selected24Change:data.RAW[this.selectedCrypto].USD.CHANGEPCT24HOUR,
                    convertIntoPrice:data.RAW[this.state.convertInto].USD.PRICE,
                    convertInto24Change:data.RAW[this.state.convertInto].USD.CHANGEPCT24HOUR      
                }
            }, () => {console.log(this.state)})
        }).catch(err => {console.log(err)}); 
        
        
    }
    
    ChangeConversion = (event) => {
        event.persist();
        event.preventDefault()
        fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + this.selectedCrypto + "," + event.target.value + "&tsyms=USD&extraParams=ITU-React-App&api_key=2177ce3aa5d8e41ccf48871cba2cea32a3ffcbb9e59dc6011de5fa6f8ec1b5fb")
            .then(res => {return res.json()})
            .then(data => {
                console.log(data);
                this.setState({
                    convertInto: event.target.value,
                    apiValues:{
                        selectedPrice:data.RAW[this.selectedCrypto].USD.PRICE,
                        selected24Change:data.RAW[this.selectedCrypto].USD.CHANGEPCT24HOUR,
                        convertIntoPrice:data.RAW[event.target.value].USD.PRICE,
                        convertInto24Change:data.RAW[event.target.value].USD.CHANGEPCT24HOUR      
                    }
                })
            });  
    } 

    ConvertTo = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.setState({inputValue:event.target.value}, () => {console.log(this.state)});
        }
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

    render () {
        
        
        return (
        <div>
            <Header heading="Convert Currencies" subHeading="Enter the amount that you would like to convert and choose a currency that it should be converted into."></Header>
            
            
            <div className="row justify-content-center">
                <div className="col-5 cryptoInput">
                    <div className="row justify-content-center form-group">
                        <div className="col-8">
                            <form>
                                <label className="tickerLabels" htmlFor="originalAmount">Original Amount:</label>
                                <input className="form-control" onKeyDown={this.ConvertTo} id="originalAmount" placeholder={(this.state.inputValue === "") ? "Enter Amount" : String(this.state.inputValue)}></input>
                            </form>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-8 cryptoBox">
                            <IndividualDisplay selectedCrypto={this.selectedCrypto} selectedPrice={this.state.apiValues.selectedPrice} selected24Change={this.state.apiValues.selected24Change} ></IndividualDisplay>
                        </div>
                    </div>
                    
                </div>

                <div className="col-2">
                    <h3 id="equalsSign">=</h3>
                </div>
                
                <div className="col-5 cryptoInput">
                    <div className="row justify-content-center form-group">
                        <div className="col-8">
                            <form>
                                <label className="tickerLabels" htmlFor="convertedAmount">Converted Amount:</label>
                                <input className="form-control" value={((this.state.inputValue * this.state.apiValues.selectedPrice ) / this.state.apiValues.convertIntoPrice) || 0 } readOnly id="convertedAmount" placeholder="Select an option below"></input>
                                
                            </form>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-8 cryptoBox">
                            <IndividualDisplay selectedCrypto={this.state.convertInto} selectedPrice={this.state.apiValues.convertIntoPrice} selected24Change={this.state.apiValues.convertInto24Change} ></IndividualDisplay>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <form>
                            <select id="convertIntoDropdown" onChange={this.ChangeConversion} defaultValue="USD" className="form-control filterCrypto">
                                <option className="" value="USD" disabled>Choose a Currency:</option>
                                {this.state.cryptocurrencies.map( (ticker) => {
                                    if(ticker !== this.selectedCrypto)  {
                                        return (
                                            <option key={ticker} className="" value={ticker} >{ticker}</option>
                                        )
                                    }
                                    else {
                                        return;
                                    }
                                }
                                )}
                            </select>
                        </form>
                    </div>
                </div>
            </div>
                     
            
        </div>    
      );
    }
  }
  
  export default ConvertX;
