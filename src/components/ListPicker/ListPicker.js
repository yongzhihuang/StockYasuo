import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './ListPicker.css';

import * as listPickerActions from '../../actions/list-picker-actions';
import * as stockListActions from '../../actions/stock-list-actions';
import * as newsfeedActions from '../../actions/newsfeed-actions';

class ListPicker extends Component {
  constructor(props) {
    super(props);
    this.onSelectList = this.onSelectList.bind(this);
    this.state = {
      selectedList: 'owned'
    }
  }

  componentWillMount() {
    this.props.actions.getLists();
  }

  onAddList() {
    const listName = prompt('What do you want to name this list?');
    if (listName) {
      this.props.actions.addList(listName);
      this.props.actions.fetchStockList(listName);
      window.localStorage.selectedList = listName;
      window.location.reload();
    }
  }

  onSelectList(e) {
    const selectedList = e.target.value;
    window.localStorage.selectedList = selectedList;
    this.props.actions.setActiveList(selectedList);
    this.props.actions.fetchStockList(selectedList);
    const currentStocks = localStorage[selectedList];
    if (!currentStocks) {
      this.props.actions.fetchNewsfeed();
      return;
    }
    this.props.actions.fetchNewsfeed(currentStocks.split(','));
  }

  render() {
    if (!this.props.lists) {
      return null;
    }

    const listPickerOptionsDOM = this.props.lists.map((list, idx) => {
      if (list === window.localStorage.selectedList) {
        return <option selected key={idx} value={list}>{list}</option>;
      }
      return <option key={idx} value={list}>{list}</option>;
    });

    return (
      <div className="list-picker">
        <select onChange={this.onSelectList}>
          {listPickerOptionsDOM}
        </select>
        <div className="btn-normal" onClick={this.onAddList.bind(this)}>+</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.fetchLists.lists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...listPickerActions,
      ...stockListActions,
      ...newsfeedActions
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPicker);

