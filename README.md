## React Cryptocurrency Dashboard and Converter

Using HTML, Bootstrap 4, and the JavaScript React framework, I built a small web-app that allows users to track a dashboard of cryptocurrencies, convert money between currencies, and view a 30-day conversion rate history of a selected cryptocurrency pair. The project accesses several endpoints of the CryptoCompare Api (https://www.cryptocompare.com/), in order to display the data to the user.

The application is broked down into 10+ components, which are displayed based on the user's URL destination. This is achieved through the use of the react-router-dom library: https://knowbody.github.io/react-router-docs/

## Use Case:

The unique value proposition of the application is that, instead of just showing the two USD denominated prices of two currencies and letting the user calculate the exchange rate, it shows the 30-day history of one currencies USD price divided by the other one. This allows users to see how the conversion-rate has developed in the last 30-days and base their conversions on the trend they see. This is not possible on most cryptocurrencies exchanges, which will only display the price development histories of specific trading pairs, instead of allowing users to freely choose and inspect their own choice of pair.

The app is hosted via github pages and can be accessed via the following link: https://mcburda.github.io/react-cryptocurrency-converter/

## The following React libraries were used in its creation:

- react-plotly.js/factory
- react-router-dom
- react-number-format
- react-async
