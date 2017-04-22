import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flattenDeep } from 'lodash';
import './Newsfeed.css';

import * as newsfeedActions from '../../actions/newsfeed-actions';

class Newsfeed extends Component {
  componentWillMount() {
    this.props.actions.fetchNewsfeed();
  }

  constructDigestFeed(newsfeedList) {
    // returns an array with first 2 items of each entry
    const digestFeed = [];
    newsfeedList.forEach((item) => {
      digestFeed.push(item.news.splice(0,2));
    });

    return flattenDeep(digestFeed);
  }

  render() {
    if (!this.props.newsfeed) {
      return null;
    }

    // const newsfeedList = this.constructDigestFeed(this.props.newsfeed).map((item, idx) => <li key={idx}><a href={item.link} target="blank">{item.title}</a></li>);
    const newsfeedList = this.constructDigestFeed(this.props.newsfeed).map((item, idx) => <li key={idx}><div className="newsfeed-item" dangerouslySetInnerHTML={{__html: item.description}}/></li>);
    return (
      <div className="newsfeed">
        <ul>
          {newsfeedList}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newsfeed: state.newsfeed.newsfeed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(newsfeedActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);

