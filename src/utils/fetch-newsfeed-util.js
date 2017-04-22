import P from 'bluebird';
import FeedMe from 'feedme';
import http from 'http';
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
    const feedEndpoint = `//finance.yahoo.com/rss/headline?s=${symbol}`;
    http.get(feedEndpoint, function(res) {
      var parser = new FeedMe();
      parser.on('title', function(title) {
        console.log('title of feed is', title);
      });
      parser.on('item', function(item) {
        console.log();
        console.log('news:', item.title);
        console.log(item.description);
      });
      res.pipe(parser);
    });
  });
}
