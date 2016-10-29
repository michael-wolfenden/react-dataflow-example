import * as redditService from '../../services/reddit';

export async function fetchTopics() {
  const subredditUrls = await redditService.getDefaultSubreddits();
  console.log(subredditUrls);
}
