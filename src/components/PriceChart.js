import React from 'react';
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

class PriceChart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            XAxisData:[],
            YAxisData:[]
        }
    }

    componentDidMount = () => {
        this.getGraphData();
    }


    // Update the State with the new graph data values, if the component updates with new props from CurrencyConverter 
    componentDidUpdate = (prevProps) => {
        if (this.props.selectedCrypto !== prevProps.selectedCrypto || this.props.convertCrypto !== prevProps.convertCrypto) {
            this.getGraphData();    
        }
    }

    componentWillUnmount = () => {

    }

    getGraphData = () => {
        
        fetch("https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + this.props.selectedCrypto + "&tsym=" + this.props.convertCrypto + "&limit=30&extraParams=ITU-React-App&api_key=2177ce3aa5d8e41ccf48871cba2cea32a3ffcbb9e59dc6011de5fa6f8ec1b5fb")
        .then(res => {return res.json()}) // If the asyc resolves as true, I apply another asyc function (json()) to structure my data and wait till that resolves as well
        .then(data => {
            
            var XArray = []
            var YArray = []

            data["Data"]["Data"].forEach((dataEntry) => {

                let unix_timestamp = dataEntry["time"];

                var date = new Date(unix_timestamp * 1000);

                XArray.push(date)

                YArray.push(dataEntry["close"])
            })

            this.setState({
                XAxisData: XArray,
                YAxisData: YArray
            })

    }).catch(res => {console.log("Error getting API data:" + res)})}


    render() {
        return (
            <div className="row justify-content-center">
                <Plot
                    data={[
                    {
                        x: this.state.XAxisData,
                        y: this.state.YAxisData,
                        type: 'scatter',
                        mode: 'lines+markers',
                        text: this.props.convertCrypto,
                        marker: {
                            color: 'purple',
                            size: 8
                        },
                        line: {
                            color: 'purple',
                            width: 1
                        }
                    },
                    ]}
                    layout={ 
                        {
                            width: 800, 
                            height: 400, 
                            title: '30-Day Chart - Amount of ' +  this.props.convertCrypto + ' for 1 ' + this.props.selectedCrypto,
                            font: "Assistant, sans-serif"
                        } 
                    }
                />
            </div>
        ); 
    }
}

export default PriceChart;