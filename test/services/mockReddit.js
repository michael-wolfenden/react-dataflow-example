export default class MockRedditService {

  getDefaultSubreddits = async function() {};
  getPostsFromSubreddit = async function() {};

  reset() {
    this.getDefaultSubreddits = jest.fn();
    this.getPostsFromSubreddit = jest.fn();
  }

  addDefaultSubbredditReturn(value) {
    this.getDefaultSubreddits.mockReturnValueOnce(value);
  }

  addPostsfromSubbredditReturn(value) {
    this.getPostsFromSubreddit.mockReturnValueOnce(value);
  }
}