/*eslint-disable camelcase*/
jest.disableAutomock();
let uut;
const mockFetch = jest.fn();
const subreddit1 = {display_name: 'hello', public_description: 'blabla', url: 'url1'};
const subreddit2 = {display_name: 'world', public_description: 'blabla2', url: 'url2'};
const data = {
  data: {
    children: [
      {data: subreddit1},
      {data: subreddit2}
    ]
  }
};

describe('services/reddit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    global.fetch = mockFetch;
    uut = require('./reddit');
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  describe('getDefaultSubreddits', () => {
    it('fetches from reddit the default subreddits', async() => {
      expect(mockFetch).not.toHaveBeenCalled();
      mockFetch.mockReturnValue({ok: true, json: () => Promise.resolve(data)});

      await uut.getDefaultSubreddits();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch.mock.calls[0][0]).toEqual('https://www.reddit.com/subreddits/default.json');
    });

    it('returns list of default subreddits', async() => {
      mockFetch.mockReturnValue({ok: true, json: () => Promise.resolve(data)});

      const result = await uut.getDefaultSubreddits();
      expect(result).toEqual([
        {title: 'hello', description: 'blabla', url: 'url1'},
        {title: 'world', description: 'blabla2', url: 'url2'}]);
    });

    it('throws when result is not ok', async() => {
      mockFetch.mockReturnValue({ok: false});
      expect(uut.getDefaultSubreddits()).toThrow();
    });

    it('throws when result has no children', async() => {
      mockFetch.mockReturnValue({ok: true, json: () => Promise.resolve({})});
      expect(uut.getDefaultSubreddits()).toThrow();
    });

    it('returns subreddits sorted by subscribers', () => {
      // we know how to continue this...
    });
  });
});
