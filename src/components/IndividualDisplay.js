import React from 'react';
import NumberFormat from 'react-number-format';


class IndividualDisplay extends React.Component {
    
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
                <div className="row justify-content-center">
                    <div className="col-5 pl-0 pr-2 cryptoDirectionDiv">
                        <i className={this.PriceIndicator(this.props.selected24Change)}></i>
                    </div>
                    <div className="col-7 px-0">
                        <h1 className="cryptoTickers">{this.props.selectedCrypto}</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <p className="col-6 cryptoPriceChanges" ><NumberFormat value={this.props.selected24Change} displayType={'text'} decimalScale={3} thousandSeparator={true} suffix={'%'} /></p>
                    <p className="col-6 cryptoPrices" ><NumberFormat value={this.props.selectedPrice} displayType={'text'} decimalScale={3} thousandSeparator={true} prefix={'$'} /></p>
                </div>
            </div>
      );
    }
  }
  
  export default IndividualDisplay;
