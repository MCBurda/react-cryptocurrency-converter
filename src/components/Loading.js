import React from 'react';
import loadingGif from '../images/coinspining.gif';


class Loading extends React.Component {

    render () {

      return (
        <div className="row justify-content-center">
            <img id="spinningCrypto" title="Spinning cryptocurrency" src={loadingGif} alt="spinning purple coin"></img><p className="appSubHeading">Loading...</p>
        </div>
      );
    }
  }
  
  export default Loading;

