import React from 'react';


class Header extends React.Component {
    render() {
        const heading = this.props.heading;
        const subHeading = this.props.subHeading;
        
        return (
            <div className="row justify-content-center">
                <h1 className="col-10 appHeading">{heading}</h1>
                <p className="col-10 appSubHeading">{subHeading}</p>
            </div>
        ); 
    }
}


export default Header;
