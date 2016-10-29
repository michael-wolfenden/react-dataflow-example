beforeEach(() => {
  jest.disableAutomock();
  jest.clearAllMocks();
  jest.resetModules();
});

describe('store/topics/actions', () => {
  let uut, store, mockRedditService;
  beforeEach(() => {
    mockRedditService = {
      getDefaultSubreddits: jest.fn()
    };
    jest.setMock('../../services/reddit', mockRedditService);
    uut = require('./actions');
    store = require('./store');
  });

  describe('fetchTopics', () => {

    it('gets default subreddits and saves in the store', async() => {
      expect(mockRedditService.getDefaultSubreddits).not.toHaveBeenCalled();

      const result = ['a', 'b'];
      mockRedditService.getDefaultSubreddits.mockReturnValue(result);
      await uut.fetchTopics();

      expect(mockRedditService.getDefaultSubreddits).toHaveBeenCalledTimes(1);
      expect(store.selectors.getAllTopics()).toEqual(['a', 'b']);
    });

    it('swallows errors', async() => {
      mockRedditService.getDefaultSubreddits.mockImplementation(() => {
        throw Error('error!');
      });

      await uut.fetchTopics();
    });
  });
});
