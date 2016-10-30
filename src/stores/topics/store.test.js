jest.disableAutomock();
let uut;

describe('stores/topics/store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    uut = require('./store');
  });

  it('abides to store contract', () => {
    expect(uut.selectors).toBeInstanceOf(Object);
    expect(uut.store).toBeInstanceOf(Object);
  });

  it('initial state', () => {
    expect(uut.selectors.isLoading()).toBe(true);
    expect(uut.selectors.getAllTopics()).toEqual([]);
  });

  it('topicsFetched sets loading false', () => {
    uut.store.topicsFetched(['a', 'b']);
    expect(uut.selectors.isLoading()).toBe(false);
  });

  it('topicsFetched saves allTopics', () => {
    uut.store.topicsFetched(['a', 'b']);
    expect(uut.selectors.getAllTopics()).toEqual(['a', 'b']);
  });
});
