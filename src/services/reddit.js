// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service.
// More importantly, these are the boundary objects, implementing the interface for all external dependencies.
// These can include http requests, db (both local and remote), and even static UI operations.
// These all should be PLUGINS to the application.

import _ from 'lodash';

const REDDIT_ENDPOINT = 'https://www.reddit.com';

export async function getDefaultSubreddits() {
  const url = `${REDDIT_ENDPOINT}/subreddits/default.json`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`RedditService getDefaultSubreddits failed, HTTP status ${response.status}`);
  }
  const data = await response.json();
  const children = _.get(data, 'data.children');
  if (!children) {
    throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
  }
  const sortedBySubscribers = _.orderBy(children, 'data.subscribers', 'desc');
  return _.map(sortedBySubscribers, (subreddit) => {
    // abstract away the specifics of the reddit API response and take only the fields we care about
    return {
      title: _.get(subreddit, 'data.display_name'),
      description: _.get(subreddit, 'data.public_description'),
      url: _.get(subreddit, 'data.url')
    };
  });
}
