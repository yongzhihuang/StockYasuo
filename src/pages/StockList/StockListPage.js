import React, { Component } from 'react';
import './StockListPage.css';
import StockList from '../../components/StockList/StockList';

class StockListPage extends Component {
 render() {
   return (
     <div className="stocklist-page">
       <StockList />
     </div>
   );
 }
}
export default StockListPage;
