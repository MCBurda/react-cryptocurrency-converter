import React from 'react';

class DisplayNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputField:""
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

    render() {

        return (
            <div className="row my-3 justify-content-center">
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