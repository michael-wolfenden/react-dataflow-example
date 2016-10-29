import * as testUtils from './../../testutils';
//import * as uut from './../../../src/stores/topics/actions';
const uut = testUtils.requireAbsolute('src/stores/topics/actions');

describe('store/topics/actions', () => {
  describe('fetchTopics', () => {
    it('gets default subreddits and saves in the store', testUtils.asyncSpec(async() => {
      uut.fetchTopics();
    }));
  });
});
