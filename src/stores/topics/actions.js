import * as redditService from '../../services/reddit';
import * as topicsStore from './store';

export async function fetchPosts() {
  const subreddits = await redditService.getDefaultSubreddits();
  topicsStore.store.topicsFetched(subreddits);
}
