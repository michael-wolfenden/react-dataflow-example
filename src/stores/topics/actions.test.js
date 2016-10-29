jest.disableAutomock();
const redditService = {
  getDefaultSubreddits: jest.fn()
};
jest.setMock('../../services/reddit', redditService);
const uut = require('./actions');

describe('store/topics/actions', () => {
  describe('fetchTopics', () => {
    it('gets default subreddits and saves in the store', async() => {
      expect(redditService.getDefaultSubreddits).not.toHaveBeenCalled();
      await uut.fetchTopics();
      expect(redditService.getDefaultSubreddits).toHaveBeenCalledTimes(1);
    });
  });
});

//import * as TestUtils from 'a-wix-react-native-commons/TestUtils';
//
//describe('stores/session/actions', () => {
//  const mockSessionStore = {};
//  mockSessionStore.store = TestUtils.spy('updateSession');
//  const mockPostsActions = TestUtils.spy('fetchPosts');
//
//  const uut = TestUtils.proxyquire('src/stores/session/actions', {
//    './store': mockSessionStore,
//    '../posts/actions': mockPostsActions
//  });
//
//  describe('updateSession', () => {
//    it('saves session to store and calls fetchPosts', TestUtils.asyncSpec(() => {
//      TestUtils.expectNoMethodsToHaveBeenCalled(mockSessionStore);
//      TestUtils.expectNoMethodsToHaveBeenCalled(mockPostsActions);
//
//      const newSession = {};
//      uut.updateSession(newSession);
//
//      expect(mockSessionStore.store.updateSession).toHaveBeenCalledTimes(1);
//      expect(mockSessionStore.store.updateSession).toHaveBeenCalledWith(newSession);
//      expect(mockPostsActions.fetchPosts).toHaveBeenCalledTimes(1);
//    }));
//
//  });
//});
