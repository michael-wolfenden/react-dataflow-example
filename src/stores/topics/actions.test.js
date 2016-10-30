jest.disableAutomock();
let uut;
const mockRedditService = {getDefaultSubreddits: jest.fn()};
const mockStore = {store: {topicsFetched: jest.fn()}};

describe('stores/topics/actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.setMock('../../services/reddit', mockRedditService);
    jest.setMock('./store', mockStore);
    uut = require('./actions');
  });

  describe('fetchPosts', () => {
    it('gets default subreddit from the service', async() => {
      expect(mockRedditService.getDefaultSubreddits).not.toHaveBeenCalled();
      expect(mockStore.store.topicsFetched).not.toHaveBeenCalled();

      await uut.fetchPosts();

      expect(mockRedditService.getDefaultSubreddits).toHaveBeenCalledTimes(1);
      expect(mockStore.store.topicsFetched).toHaveBeenCalledTimes(1);
    });

    it('is async', async() => {
      mockRedditService.getDefaultSubreddits.mockReturnValue(Promise.resolve('hello'));
      await uut.fetchPosts();
      expect(mockStore.store.topicsFetched).toHaveBeenCalledWith('hello');
    });
  });
});
