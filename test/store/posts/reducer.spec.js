import Immutable from 'seamless-immutable';

describe('posts selectors', () => {

  let uut;
  let selectedTopics = [];

  const URL_A = 'urlA';
  const URL_B = 'urlB';
  const URL_C = 'urlC';
  const topicA = {
    "id": "topicIdA",
    "topicUrl": URL_A
  };
  const topicB = {
    "id": "topicIdB",
    "topicUrl": URL_B
  };
  const topicC = {
    "id": "topicIdC",
    "topicUrl": URL_C
  };
  const postsById = {
    topicIdA: topicA,
    topicIdB: topicB,
    topicIdC: topicC
  };

  beforeEach(() => {
    jest.setMock('../../../src/store/topics/reducer', {
      getSelectedTopicsByUrl: () => selectedTopics
    });
    uut = require('../../../src/store/posts/reducer');
  });

  it('should get the current filter from the state', () => {
    const state = {
      posts: {
        currentFilter: 'filter!'
      }
    };
    expect(uut.getCurrentFilter(state)).toEqual('filter!');
  });

  it('should get the current post from the state', () => {
    const state = {
      posts: {
        currentPostId: 12345,
        postsById: {
          12345: 'correct post',
          98765: 'incorrect post'
        }
      }
    };
    expect(uut.getCurrentPost(state)).toEqual('correct post');
  });

  it('should get the correct filtered posts when a filter is applied', () => {
    selectedTopics = {};

    const state = Immutable({
      posts: {
        currentFilter: URL_A,
        postsById
      }
    });
    expect(uut.getPosts(state)).toEqual([postsById, ['topicIdA']]);
  });

  it('should get the correct filtered posts when filter is all', () => {
    selectedTopics = {urlA: topicA, urlC: topicC};
    const state = Immutable({
      posts: {
        currentFilter: 'all',
        postsById
      }
    });
    expect(uut.getPosts(state)).toEqual([postsById, ['topicIdA', 'topicIdC']]);
  });



});