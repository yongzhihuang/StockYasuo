import P from 'bluebird';
import axios from 'axios';
import { get, map } from 'lodash';

export default function(stockList) {
  const listOfStocks = [];
  map(stockList, function mapStocksToFetch(symbol) {
    listOfStocks.push(fetchSingleStock(symbol));
  });
  return P.all(listOfStocks);
}

export function fetchSingleStock(symbol) {
  return new P(function(resolve, reject) {
    const ApiEndpoint = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${symbol}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;
    return axios.get(ApiEndpoint)
    .then((result) => {
      if (result.status === 200) {
        resolve(get(result, 'data.query.results.quote'));
      }
      resolve({});
    })
    .catch((error) => {
      console.error(error);
      reject(`Error, failed to retrieve symbol ${symbol}`);
    });
  });
}
