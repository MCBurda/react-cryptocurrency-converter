import React from 'react';

class DisplayNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputField:"",
        }
    }

    inputChange = (value) => {
        this.setState({inputField:value.target.value});
    }

    handleFilter = (value) => {
        this.props.filterCallback(Number(value.target.value));
    }

    handleSearch = () => {
        this.props.searchCallback(this.state.inputField);
    }

    enterSearch = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.handleSearch()
        }
    }

    tickerValue = (event) => {
        if (event.target.value === "") {
            this.props.clearValidation();
        }
    }

    enterTicker = (event) => {
        event.persist();
        if (event.key === 'Enter') {
            event.preventDefault(); // This is important, since upon hitting the enter key most forms submit and reload the page. We dont want that. 
            this.props.validateTicker(event.target.value)
        }
        if (event.target.id === 'tickerButton' || event.target.id === 'tickerIcon') {
            event.preventDefault();
            var field = document.querySelector('#tickerInput').value
            this.props.validateTicker(field)
        }

    }

    render() {

        return (
            <div className="row my-3 justify-content-center">
                <form className="needs-validation" noValidate>
                    <div className="input-group mt-1 pr-2">
                        <input className={"form-control " + String(this.props.tickerValidation)} onKeyUp={this.tickerValue} onKeyDown={this.enterTicker} id="tickerInput" placeholder="Add a new Ticker"></input>
                        <div className="input-group-append">
                            <button  id="tickerButton" type="button" onClick={this.enterTicker} className="btn btn-link text-info"><i id="tickerIcon" className="fa fa-arrow-right"></i></button>
                        </div>
                        <div className="valid-tooltip">
                            Your ticker has been added.
                        </div>
                        <div className="invalid-tooltip">
                            Error, ticker not found or already displayed!
                        </div>
                    </div>
                </form>
                <form>
                    <select id="cryptoFilter" onChange={this.handleFilter} defaultValue="0" className="form-control filterCrypto">
                        <option className="" value="0" disabled>Choose a filter:</option>
                        <option className="" value="1" >Ascending by Name</option>
                        <option className="" value="2" >Descending by Name</option>
                        <option className="" value="3" >Largest % gain</option>
                        <option className="" value="4" >Largest % decline</option>

                    </select>
                </form>
                <div>
                    <form>
                        <div className="input-group mb-0 border rounded-pill pr-4 m-1 searchBar">
                            <div className="input-group-prepend border-0">
                                <button id="searchButton" type="button" onClick={this.handleSearch} className="btn btn-link text-info"><i id="searchIcon" className="fa fa-search"></i></button>
                            </div>
                            <input id="searchBarInput" type="search" onKeyDown={this.enterSearch} onChange={this.inputChange} placeholder="Search" aria-describedby="button-addon4" className="form-control bg-none border-0"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default DisplayNavigation;