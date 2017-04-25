import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './ListPicker.css';

import * as listPickerActions from '../../actions/list-picker-actions';

class ListPicker extends Component {
  componentWillMount() {
    this.props.actions.getLists();
  }

  onAddList() {
    const listName = prompt('What do you want to name this list?');
    if (listName) {
      this.props.actions.addList(listName);
    }
  }

  render() {
    if (!this.props.lists) {
      return null;
    }

    const listPickerOptionsDOM = this.props.lists.map((list, idx) => <option key={idx} value={list}>{list}</option>)

    return (
      <div className="list-picker">
        <select>
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
    actions: bindActionCreators(listPickerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPicker);

