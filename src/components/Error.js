import React from 'react';


class Error extends React.Component {

    render () {

      return (
        <div className="row justify-content-center">
            <p className="appSubHeading">`There was an issue ${this.props.errorMessage}`</p>
        </div>
      );
    }
  }
  
  export default Error;

