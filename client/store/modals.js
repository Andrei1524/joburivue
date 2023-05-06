export const state = () => ({
  modals: {},
});

export const getters = {};

export const mutations = {
  initModalsList(state, payload) {
    state.modals = payload;
  },

  closeModal(state, constantName) {
    state.modals[constantName] = {
      open: false,
      data: null,
    };
  },

  openModal(state, payload) {
    state.modals[payload.constantName] = {
      open: payload.open,
      data: payload.data,
    };
  },
};

export const actions = {};
