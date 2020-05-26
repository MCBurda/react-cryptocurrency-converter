import React from 'react';


class Attribution extends React.Component {
    render() {
        // Attribution to the CryptoCompare API and me :) 
        return (
            <div className="row justify-content-center">
                <p className="col-12 appSmallText mt-3 mb-0">Powered by CryptoCompare.com</p>
                <p className="col-12 appSmallText my-0">Developed by Maxwell Burda</p>
            </div>
        ); 
    }
}


export default Attribution;
