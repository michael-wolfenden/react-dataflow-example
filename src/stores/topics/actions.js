import * as redditService from '../../services/reddit';
import * as store from './store';

export async function fetchTopics() {
  try {
    const subreddits = await redditService.getDefaultSubreddits();
    store.setAllTopics(subreddits);
  } catch (e) {
    console.error(e.message);
  }
}
