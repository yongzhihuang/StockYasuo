import React, { Component } from 'react';
import './StockListPage.css';
import StockList from '../../components/StockList/StockList';
import Newsfeed from '../../components/Newsfeed/Newsfeed';


class StockListPage extends Component {
 render() {
   return (
     <div className="stocklist-page">
       <StockList />

       <Newsfeed />
     </div>
   );
 }
}
export default StockListPage;
