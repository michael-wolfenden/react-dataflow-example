import * as redditService from '../../services/reddit';
import * as store from './store';

export async function fetchTopics() {
  const subreddits = await redditService.getDefaultSubreddits();
  store.setAllTopics(subreddits);
}
