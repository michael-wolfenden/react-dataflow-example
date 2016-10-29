// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, {Component} from 'react';
import autobind from 'react-autobind';
import {connect} from 'remx/react';
import './TopicsScreen.css';

import ListView from '../components/ListView';

import * as topicsActions from '../stores/topics/actions';
import {selectors as topicsSelectors} from '../stores/topics/store';

class TopicsScreen extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    topicsActions.fetchTopics();
  }

  render() {
    if (topicsSelectors.isLoading()) {
      return this.renderLoading();
    } else {
      return this.renderTopics();
    }
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderTopics() {
    return (
      <div className="TopicsScreen">
        <h3>Choose 3 topics of interest</h3>
        <ListView
          rowsIdArray={[1, 2, 3]}
          rowsById={{1: 'a', 2: 'b', 3: 'c'}}
          renderRow={this.renderRow}
        />
      </div>
    );
  }

  renderRow(topicUrl, topic) {
    return (
      <p>{topic}</p>
    );
  }
}

export default connect(TopicsScreen);
