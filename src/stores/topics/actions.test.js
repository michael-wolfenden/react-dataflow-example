jest.mock('../../services/reddit', () => ({}), {virtual: true});
const uut = require('./actions');

describe('store/topics/actions', () => {
  describe('fetchTopics', () => {
    it('gets default subreddits and saves in the store', async() => {
      expect(await uut.fetchTopics()).toBe('hello');
    });
  });
});
