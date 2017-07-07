/* global Vue, $, ContextMenu, Cookies */
import { mapState, mapMutations } from 'vuex';

require('./lib/g.js');
require('./css/g.css');

const coverLoading = require('./vue/coverloading.vue');
const topmenu = require('./vue/menu.vue');
const router = require('./lib/router.js');
const store = require('./lib/store.js');

const components = {
  'cover-loading': coverLoading,
  topmenu,
};

window.swal.setDefaults({ allowOutsideClick: false });

const app = new Vue({
  el: '#wrapper',
  data: {
  },
  components,
  watch: {
    $route() {
      this.checkRoute();
    },
  },
  computed: {
    ...mapState(['coverloadingStatus']),
  },
  methods: {
    ...mapMutations(['setUser']),
    checkRoute() {
      if (Cookies.get('email')) { this.setUser({ email: Cookies.get('email') }); }
      const path = this.$route.path;
      if (path === '') { ContextMenu.off(); } else { ContextMenu.off(); }
    },
  },
  store,
  router,
  mounted() {
    this.checkRoute();
  },
});

window.app = app;
