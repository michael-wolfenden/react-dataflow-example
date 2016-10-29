jest.disableAutomock();
jest.clearAllMocks();

describe('store/topics/actions', () => {
  const mockRedditService = {
    getDefaultSubreddits: jest.fn()
  };
  const mockStore = {
    setAllTopics: jest.fn()
  };
  jest.setMock('../../services/reddit', mockRedditService);
  jest.setMock('./store', mockStore);
  const uut = require('./actions');

  describe('fetchTopics', () => {
    it('gets default subreddits and saves in the store', async() => {
      expect(mockRedditService.getDefaultSubreddits).not.toHaveBeenCalled();
      expect(mockStore.setAllTopics).not.toHaveBeenCalled();

      const result = [];
      mockRedditService.getDefaultSubreddits.mockReturnValue(result);
      await uut.fetchTopics();

      expect(mockRedditService.getDefaultSubreddits).toHaveBeenCalledTimes(1);
      expect(mockStore.setAllTopics).toHaveBeenCalledTimes(1);
      expect(mockStore.setAllTopics).toHaveBeenCalledWith(result);
    });

    it('prints errors to console', async() => {
      const origConsole = console.error;
      console.error = jest.fn();
      mockRedditService.getDefaultSubreddits.mockImplementation(() => {
        throw Error('error!');
      });

      await uut.fetchTopics();

      expect(console.error).toHaveBeenCalledWith('error!');
      console.error = origConsole;
    });
  });
});
