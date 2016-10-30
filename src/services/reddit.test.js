jest.disableAutomock();
let uut;

describe('services/reddit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    uut = require('./reddit');
  });

  describe('getDefaultSubreddits', () => {
    it('fetches from reddit the default subreddits, returns list', () => {
      expect(uut.getDefaultSubreddits).toBeInstanceOf(Function);
      // we know how to test this TDD. just don't forget to ALWAYS keep refactoring.
    });
  });
});
