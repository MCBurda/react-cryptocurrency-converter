import React from 'react';
import Header from './Header';
import IndividualDisplay from './IndividualDisplay';
import Attribution from './Attribution';


class ConvertX extends React.Component {
    constructor(props){
        super(props);
        this.state = { // The apiValues state in this component is structured as an Object and is updated upon each API call
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

    // This variable holds the selected cryptocurrency to convert. It had been matched from the URL.
    selectedCrypto = this.props.match.params.id;

    componentDidMount() {
        // cryptocurrencies is the array that was also passed via the Link tag in the CurrencyConverter.js component.
        const cryptocurrencies = this.props.cryptocurrencies;
        fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + this.selectedCrypto + "," + this.state.convertInto + "&tsyms=USD&extraParams=ITU-React-App&api_key=2177ce3aa5d8e41ccf48871cba2cea32a3ffcbb9e59dc6011de5fa6f8ec1b5fb")
        .then(res => {return res.json()}) // If the asyc resolves as true, I apply another asyc function (json()) to structure my data and wait till that resolves as well
        .then(data => {
            this.setState({
                cryptocurrencies: cryptocurrencies, // I set it in the state, in order to prevent its garbage collection upon page reload. It is only passed on first visit to the page.
                apiValues:{
                    selectedPrice:data.RAW[this.selectedCrypto].USD.PRICE,
                    selected24Change:data.RAW[this.selectedCrypto].USD.CHANGEPCT24HOUR,
                    convertIntoPrice:data.RAW[this.state.convertInto].USD.PRICE,
                    convertInto24Change:data.RAW[this.state.convertInto].USD.CHANGEPCT24HOUR      
                }
            }, () => {console.log(this.state)})
        }).catch(err => {console.log(err)}); 
    }
    
    // This function runs upon selection of a new cryptocurrency from the select tag. It  
    ChangeConversion = (event) => {
        event.persist(); // This is necessary, in order to keep the event from being garbage collected and let it persist long enough to set state
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

    // This function sets the state with the amount that is entered into the input field of currency. Within the rendered JSX below the output value in the different currency is calculated as a placeholder in a readonly field.
    ConvertTo = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // This is important, since upon hitting the enter key most forms submit and reload the page. We dont want that. 
            this.setState({inputValue:event.target.value}, () => {console.log(this.state)});
        }
    }

    // Same function as before. Conditional formatting of the price displays to show upwards or downwards arrows with font awesome.
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
                     
            <Attribution></Attribution>
        </div>    
      );
    }
  }
  
  export default ConvertX;
