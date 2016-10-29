beforeEach(() => {
  jest.disableAutomock();
  jest.clearAllMocks();
  jest.resetModules();
});

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

    it('sets loading false when setAllTopics', () => {
      expect(uut.selectors.isLoading()).toEqual(true);
      uut.store.setAllTopics(['a', 'b']);
      expect(uut.selectors.isLoading()).toEqual(false);
    });
  });

  it('isLoading flag', () => {
    expect(uut.selectors.isLoading()).toEqual(true);
  });
});
