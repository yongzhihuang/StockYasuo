import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './ListPicker.css';

import * as listPickerActions from '../../actions/list-picker-actions';

class ListPicker extends Component {
  componentWillMount() {
    this.props.actions.getLists();
  }
  render() {
    if (!this.props.lists) {
      return null;
    }

    const listPickerOptionsDOM = this.props.lists.map(list => <option value={list}>{list}</option>)

    return (
      <div className="list-picker">
        <select>
          {listPickerOptionsDOM}
        </select>
        <div className="btn-normal">+</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
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

