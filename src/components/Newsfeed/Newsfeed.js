import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flattenDeep } from 'lodash';
import sentiment from 'sentiment';
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

  constructNewsFeedListDOM(newsfeed) {
    const newsfeedDOM = this.constructDigestFeed(newsfeed).map((item, idx) => {
      const sentimentScore = sentiment(item.description).score;
      let sentimentImage = <img src="http://i.imgur.com/Mvfi7LJ.png" alt="Positive Sentiment" />;
      if (sentimentScore <= 0) {
        sentimentImage = <img src="http://i.imgur.com/ZF3svKf.png" alt="Negative Sentiment" />
      }
      return (
        <li key={idx}>
          <div className="newsfeed-item" dangerouslySetInnerHTML={{__html: item.description.replace('href=', 'target="blank" href=')}}/>
          <div className="sentiment">{sentimentImage}</div>
        </li>
      );
    });

    return newsfeedDOM;
  }

  render() {
    if (!this.props.newsfeed) {
      return null;
    }

    return (
      <div className="newsfeed">
        <ul>
          {this.constructNewsFeedListDOM(this.props.newsfeed)}
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

