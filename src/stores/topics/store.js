const state = {
  allTopics: []
};

export const store = {
  setAllTopics(topics) {
    state.allTopics = topics;
  }
};

export const selectors = {
  getAllTopics() {
    return state.allTopics;
  }
};

