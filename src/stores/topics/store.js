import * as remx from 'remx';

const state = remx.state({
  loading: true,
  allTopics: []
});

export const store = remx.setters({
  topicsLoaded(topics) {
    state.allTopics = topics;
    state.loading = false;
  }
});

export const selectors = remx.getters({
  isLoading() {
    return state.loading;
  },

  getAllTopics() {
    return state.allTopics;
  }
});
