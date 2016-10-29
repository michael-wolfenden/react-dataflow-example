jest.disableAutomock();
jest.clearAllMocks();

describe('stores/topics/store', () => {
  let uut;

  beforeEach(() => {
    uut = require('./store');
  });

  describe('holds all topics', () => {
    it('starts with empty list', () => {
      expect(uut.selectors.getAllTopics()).toEqual([]);
    });

    it('can be set', () => {
      uut.store.setAllTopics(['a', 'b']);
      expect(uut.selectors.getAllTopics()).toEqual(['a', 'b']);
    });

    it('getTopicsByUrl', () => {

    });
  });
});
