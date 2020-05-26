import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';


class CurrencyConverter extends React.Component {

    render () {

        // The Link tag acts as an <a> tag in HTML, linking to another URL (path in this case), where the Switch tag (in the App.js component) will render the right route
        return (
        <div>
            <Header heading="Convert Currencies" subHeading="Choose a currency that you own and find out how many units of a different currency you could buy."></Header>

            <div className="row my-3 dropdown justify-content-center">
                <button className="filterCrypto btn btn-secondary dropdown-toggle" type="button" id="cryptoDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Choose a currency:
                </button>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {this.props.cryptocurrencies.map( (ticker) => {
                        return(
                            <Link key={ticker} className="currencyOptions dropdown-item" to={{pathname:`/currency-converter/${ticker}`}}>{ticker}</Link>
                        )
                    }
                    )}
                </div>
            </div>
            
        </div>
      );
    }
  }
  
  export default CurrencyConverter;



