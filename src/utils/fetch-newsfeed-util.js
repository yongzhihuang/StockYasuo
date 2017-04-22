import P from 'bluebird';
import RSSToJson from 'rss-to-json';
import { map } from 'lodash';


export default function(stockList) {
  const listOfStocks = [];
  map(stockList, function mapStocksToFetch(symbol) {
    listOfStocks.push(fetchSingleNewsfeed(symbol));
  });
  return P.all(listOfStocks);
}


function fetchSingleNewsfeed(symbol) {
  return new P(function(resolve, reject) {
    const feedEndpoint = `http://www.penta-code.com/api/financenews.php?symbol=${symbol}`;
    RSSToJson.load(feedEndpoint, function(err, rss){
      if (err) {
        reject(`error getting news for ${symbol}`);
      }

      resolve({
        symbol,
        news: rss.items
      });
    });
  });
}
