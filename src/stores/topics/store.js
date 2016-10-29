const state = {
  loading: true,
  allTopics: []
};

export const store = {
  setAllTopics(topics) {
    state.allTopics = topics;
    state.loading = false;
  }
};

export const selectors = {
  isLoading() {
    return state.loading;
  },

  getAllTopics() {
    return state.allTopics;
  }
};

