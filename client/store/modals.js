export const state = () => ({
  modals: {},
});

export const getters = {};

export const mutations = {
  initModalsList(state, payload) {
    state.modals = payload;
  },

  closeModal(state, constantName) {
    state.modals[constantName] = false;
  },

  openModal(state, constantName) {
    state.modals[constantName] = true;
  },
};

export const actions = {};
