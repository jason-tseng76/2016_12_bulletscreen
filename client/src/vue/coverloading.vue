<template lang="pug">
  div
    transition(name="fade")
      div(v-if="coverloadingStatus")
        .doloading
          i.fa.fa-circle-o-notch.fa-spin
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['coverloadingStatus']),
  },
  watch: {
    coverloadingStatus(val) {
      if (val) {
        $(window).on('resize', this.onResize);
        this.onResize();
      } else {
        $(window).off('resize', this.onResize);
      }
    },
  },
  methods: {
    onResize() {
      const dom = this.$el;
      if ($(dom).find('.doloading').length > 0) {
        const h = $(dom).find('.doloading').height();
        if (h === 0) {
          setTimeout(this.onResize, 30);
        } else {
          $(dom).find('.doloading').css({ 'line-height': `${h}px` });
        }
      } else {
        setTimeout(this.onResize, 10);
      }
    },
  },
  mounted() {
    if (this.coverloadingStatus) {
      $(window).on('resize', this.onResize);
      this.onResize();
    }
  },
};
</script>
<style scoped>
.doloading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 28px;
  text-align: center;
  background-color: rgba(255,255,255,.7);
}
</style>
