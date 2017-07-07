<template lang="pug">
div
  #fscreen(v-bind:style="fscreenStyle")
    #fslide
      .fslide_unit(v-for="(page,index) in pages" v-bind:key="page._id")
        .fslide-layer.fullbox.flex-center-center(v-if="page.bg")
          img.thum_bg_img(v-bind:src="page.bg.src" v-if="page.bg._upload === 3" v-bind:class="autoWHClass(page.bg.width, page.bg.height)" v-bind:key="page._id")
        .fslide-layer.fullbox(v-for="layer in page.layers")
          .fullbox(v-if="layer.type==='youtube'" v-html="embedYoutube(layer.data.id, index)")
      .fslide-sensor.flex-center-center#sensorleft(@click="leftClick")
        i.fa.fa-chevron-left
      .fslide-sensor.flex-center-center#sensorright(@click="rightClick")
        i.fa.fa-chevron-right
    #fires
      span.fs_bullet(v-for="(funit,key) in fires" v-bind:key="funit._id" v-bind:style="{color:funit.color, left:funit.left+'px', top:funit.top+'px'}") {{funit.text}}
</template>
<script>
let fireTimer = 0;
let socket;
let currentSlideIndex = 0;
let lastSlideIndex = 0;
let pageSize = 0;
let _this;

function genId() {
  return `${Date.now() % 100000}_${Math.round(Math.random() * 10000)}`;
}
function moveSlides() {
  const sw = $(window).innerWidth();
  if (lastSlideIndex === currentSlideIndex) return;
  _this.currentSlideIndex = currentSlideIndex;
  if (currentSlideIndex > lastSlideIndex) {
    $('.fslide_unit').eq(currentSlideIndex).css({
      top: 0, left: sw, display: 'block',
    }).animate({ left: 0 });
    $('.fslide_unit').eq(lastSlideIndex).animate({ left: -sw });
  } else {
    $('.fslide_unit').eq(currentSlideIndex).css({
      top: 0, left: -sw, display: 'block',
    }).animate({ left: 0 });
    $('.fslide_unit').eq(lastSlideIndex).animate({ left: sw });
  }
}
function nextSlide() {
  lastSlideIndex = currentSlideIndex;
  currentSlideIndex += 1;
  if (currentSlideIndex >= pageSize) { currentSlideIndex = pageSize - 1; }
  moveSlides();
}
function prevSlide() {
  lastSlideIndex = currentSlideIndex;
  currentSlideIndex -= 1;
  if (currentSlideIndex < 0) { currentSlideIndex = 0; }
  moveSlides();
}
function onDocumentKeydown(e) {
  if (e.keyCode === 37 || e.keyCode === 38) prevSlide();
  if (e.keyCode === 39 || e.keyCode === 40) nextSlide();
}

export default {
  props: ['pages', 'selectedId', 'projectId', 'fullscreen'],
  data() {
    return {
      currentSlideIndex: 0,
      fires: [],
    };
  },
  computed: {
    fscreenStyle() {
      if (this.fullscreen) return { display: 'flex' };
      return { display: 'none' };
    },
  },
  watch: {
    pages(val) {
      pageSize = val.length;
    },
    fullscreen(val) {
      if (val) {
        $(document).on('fullscreenchange', this.onFullScreenChange);
        $('#fscreen').fullScreen(true);
      }
    },
    projectId(val) {
      if (val) { this.initSocket(val); }
    },
  },
  methods: {
    leftClick() {
      prevSlide();
    },
    rightClick() {
      nextSlide();
    },
    initSocket(id) {
      socket = io({ path: '/bulletscreen/socket.io' });
      socket.on('connect', () => {
        console.log('socket.io connected');
        socket.emit('_id', id);
      });
      socket.on('msg', (data) => {
        if (data.type === 'bullet') {
          this.fireAtOnce(data.str, data.color);
        }
      });
      fireTimer = setInterval(this.onFireTimer, 20);
    },
    fireAtOnce(str, color) {
      const sw = $(window).innerWidth();
      const fire = {
        top: -1,
        left: sw,
        color,
        text: str,
        _id: genId(),
      };
      this.fires.push(fire);
    },
    onFireTimer() {
      this.fires.forEach((val, index) => {
        this.moveFireUnit(index);
      }, this);
    },
    moveFireUnit(index) {
      const bulletSpeed = 2;
      const sh = $(window).innerHeight();
      const val = this.fires[index];
      const dom = $('.fs_bullet').eq(index);
      const vx = val.left - bulletSpeed;
      val.left = vx;
      if (val.top < 0) { val.top = Math.random() * (sh - dom.height()); }
      if (val.left <= -dom.width()) { this.fires.splice(index, 1); }
    },
    onFullScreenChange() {
      const isfulls = !!$('#fscreen').fullScreen();
      this.$emit('fscreenchange', isfulls);

      if (isfulls) {
        currentSlideIndex = this.getPageIndex(this.selectedId);
        lastSlideIndex = currentSlideIndex;
        this.currentSlideIndex = currentSlideIndex;

        // const sw = $(window).width();
        // const sh = $(window).height();
        const sw = screen.width;
        const sh = screen.height;
        if (sw / sh > 4 / 3) {
          $('#fslide').css({
            width: (sh * 4) / 3,
            height: sh,
          });
        } else {
          $('#fslide').css({
            width: sw,
            height: (sw * 3) / 4,
          });
        }
        $('.fslide_unit').eq(currentSlideIndex).css({
          display: 'block', top: 0, left: 0,
        });
        $(document).on('keydown', onDocumentKeydown);
        // $(document).on('click', nextSlide);
      } else {
        this.currentSlideIndex = -1;
        $(document).off('fullscreenchange', this.onFullScreenChange);
        $('.fslide_unit').hide();
        $(document).off('keydown', onDocumentKeydown);
        // $(document).off('click', nextSlide);
      }
    },
    getPageIndex(pid) {
      return this.pages.findIndex(val => val._id === pid);
    },
    autoWHClass(w, h) {
      if (w / h > 4 / 3) { return 'autoHeight'; }
      return 'autoWidth';
    },
    embedYoutube(vId, index) {
      // 暫時不想用youtube api的解法...
      if (index !== this.currentSlideIndex) return '';
      const embed = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vId}?contorls=0&rel=0&showinfo=0&modestbranding=0&disablekb=1" frameborder="0" allowfullscreen></iframe>`;
      return embed;
    },
  },
  created() {
    _this = this;
    if (this.projectId) { this.initSocket(this.projectId); }
    pageSize = this.pages.length;
  },
  beforeDestroy() {
    clearInterval(fireTimer);
  },
};
</script>
<style scoped>
.autoHeight {
  width: 100%;
  height: auto;
}
.autoWidth {
  width: auto;
  height: 100%;
}
#fscreen {
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  /*display: none;*/
  align-items: center;
  justify-content: center;
}
#fslide {
  position: relative;
  background-color: #ffffff;
  overflow: hidden;
}
.fslide_unit {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
}
.fslide-layer {
  position: absolute;
  top: 0;
  left: 0;
}
.fires {
  position: absolute;
  left: 0;
  top: 0;
}
.fs_bullet {
  position: absolute;
  text-shadow:1px 1px 1px #000000;
  white-space: nowrap;
  font-size: 40px;
}
.fullbox {
  width: 100%;
  height: 100%;
}
.flex-center-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fslide-sensor {
  position: absolute;
  height: 100%;
  width: 20%;
  top: 0;
  cursor: pointer;
  background-color: #000000;
  opacity: 0;
  transition: .5s;
}
.fslide-sensor > i {
  color: white;
  font-size: 60px;
}
.fslide-sensor:hover {
  opacity: .2;
}
#sensorleft {
  left: 0;
}
#sensorright {
  right: 0;
}
</style>
