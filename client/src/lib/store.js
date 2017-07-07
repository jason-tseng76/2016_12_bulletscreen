/* global Vue, Vuex */
const store = new Vuex.Store({
  state: {
    filebrowserStore: { status: 'none', dir: '', api: '', selected_path: '', binding: '' },
    coverloadingStatus: false,
    user: { email: '' },
  },
  mutations: {
    filebrowser(state, param) {
      state.filebrowserStore = param;
    },
    coverloading(state, param) {
      state.coverloadingStatus = param;
    },
    setUser(state, param) {
      state.user = param;
    },
  },
});

module.exports = store;
