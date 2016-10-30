import * as redditService from '../../services/reddit';
import * as topics from './store';

export async function fetchTopics() {
  try {
    const subreddits = await redditService.getDefaultSubreddits();
    topics.store.topicsLoaded(subreddits);
  } catch (e) {
    console.error(e.message);
  }
}
