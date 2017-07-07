<template lang="pug">
  .container-fluid
    .well.well-sm
      .form-group.top_formgroup
        label.control-label(for="slidename") 請在此設定簡報名稱
        input.form-control#slidename(type="text" placeholder="未命名的簡報" v-model="slidename")
      .row
        .col-sm-12
          .btn-toolbar(role="tollbar")
            .btn-group.btn-group-xs.btn-group-raised
              a.btn(href="javascript:void(0)" @click="saveClick" v-bind:class="isSaveEnabled ? '':'disabled'")
                i.fa.fa-cloud
                |存檔
              .btn-group.btn-group-xs
                a.btn.dropdown-toggle(data-toggle="dropdown") 
                  i.fa.fa-plus
                  | 新增頁面
                ul.dropdown-menu
                  li
                    a(href="javascript:void(0)" @click="uploadClick")
                      i.fa.fa-upload
                      |上傳圖檔
                  li.hasPopover(data-toggle="popover" data-trigger="hover" data-placement="right" data-container="body" title="" data-content="請copy圖檔後，直接在頁面上Ctrl+V貼上就好")
                    a(href="javascript:void(0)")
                      i.fa.fa-clipboard
                      |貼上圖檔
                  li
                    a(href="javascript:void(0)" @click="uploadPDFClick")
                      i.fa.fa-file-pdf-o
                      |上傳PDF
                  li
                    a(href="javascript:void(0)" @click="popupYoutube")
                      i.fa.fa-youtube
                      |加入YouTube
              a.btn(href="javascript:void(0)" @click="delSlideClick" v-bind:class="selectedId==='' ? 'disabled':''")
                i.fa.fa-times
                |刪除選取的
              input#f0_ufile(type="file" name="files" multiple="multiple" @change="ufileChanged" accept=".jpg,.png|image/*")
              input#fpdf_ufile(type="file" name="files" @change="uPDFChanged" accept=".pdf")
            .btn-group.btn-group-xs.btn-group-raised
              a.btn(href="javascript:void(0)" @click="playClick")
                i.fa.fa-play
                |普雷
              a.btn(href="javascript:void(0)" @click="qrClick")
                i.fa.fa-qrcode
                |QRCode
              a.btn#copy_btn(href="javascript:void(0)")
                i.fa.fa-mobile
                |複製QRCode的網址
            .btn-group.btn-group-xs.btn-group-raised
              a.btn(href="javascript:void(0)" @click="delProjectClick" v-bind:class="isDelProjectEnabled ? '':'disabled'")
                i.fa.fa-trash-o
                |我受不了了我要砍了這個簡報!!
      .row
        .col-sm-12#editpanel
          #left_panel
            transition-group#sortable(name="expend" mode="out-in" tag="div")
              .thum_unit(v-for="(page, key) in pages" v-bind:key="page._id" v-bind:class="page._id === selectedId ? 'thum_active' : ''" @click="selectedId = page._id")
                .thum_inner
                  .slidelayer(v-if="page.bg" v-bind:key="page._id")
                    img.thum_bg_img(v-bind:src="page.bg.src" v-if="page.bg._upload === 3" v-bind:class="autoWHClass(page.bg.width, page.bg.height)" v-bind:key="page._id")
                  .slidelayer(v-for="(layer, key, index) in page.layers" v-bind:key="layer._id")
                    img.fullbox(v-if="layer.type==='youtube'" v-bind:src="'https://img.youtube.com/vi/'+layer.data.id+'/default.jpg'")
          #right_panel
            #sedit
              .fullbox(v-if="selectedId != ''")
                .editlayer.flex-center-center(v-if="previewPage.bg")
                  img.preview_bg_img(v-bind:src="previewPage.bg.src" v-bind:class="autoWHClass(previewPage.bg.width, previewPage.bg.height)")
                .editlayer(v-for="layer in previewPage.layers")
                  .fullbox(v-if="layer.type==='youtube'" v-html="embedYoutube(layer.data.id)")
      bscreen(v-bind:fullscreen="fullscreen" v-bind:pages="pages" v-bind:selectedId="selectedId" v-bind:projectId="projectId" v-on:fscreenchange="fscreenchange")
    div#youtube-fill
      .well.well-sm
        button.close(type="button" @click="youtubeCancel") 
          |× Close
        .row
          .col-xs-12
            h3 設定影片網址
            .form-group.top_formgroup
              label.control-label(for="youtbe-url") 請在此設定影片網址
              input.form-control#youtbe-url(type="text" placeholder="影片網址" v-model="youtubeFillUrl")
            #youtube-preview
            .btn-group.btn-group-justified.btn-group-raised
              a.btn.disabled#youtubefill-confirmbtn(@click="youtubeConfirm") 確定
              a.btn.btn-warning(@click="youtubeCancel") 取消
</template>
<script>
// convert pdf to jpg
// gm convert -density 300 2017_03_21.pdf -resize 1440x1080 -quality 100 +adjoin f-%02d.jpg
import { mapMutations } from 'vuex';

const bscreen = require('./bscreen.vue');

let _this;

function genId() {
  return `${Date.now() % 100000}_${Math.round(Math.random() * 10000)}`;
}

export default {
  data() {
    return {
      projectId: '',
      slidename: '',
      pages: [],
      owner: '',
      selectedFiles: [],
      selectedId: '',
      anychanges: false,
      inited: false,
      fullscreen: false,
      clientUrl: '',
      youtubeFillUrl: '',
    };
  },
  components: {
    bscreen,
  },
  computed: {
    previewPage() {
      return this.getPageById(this.selectedId);
    },
    isSaveEnabled() {
      if ((this.owner === '' || this.owner === undefined) && this.anychanges) return true;
      if (Cookies.get('email') === this.owner && this.anychanges) return true;
      return false;
    },
    isDelProjectEnabled() {
      if (this.owner === '' || this.owner === undefined) return true;
      if (Cookies.get('email') === this.owner) return true;
      return false;
    },
  },
  watch: {
    pages() {
      Vue.nextTick(() => {
        this.checkResize();
      });
      this.nextUpload();
      if (this.selectedId === '' && this.pages.length > 0) { this.selectedId = this.pages[0]._id; }
      if (this.inited) { this.anychanges = true; }
    },
    slidename() {
      if (this.inited) { this.anychanges = true; }
    },
    youtubeFillUrl(val) {
      const vId = this.getYoutTubeId(val);
      if (vId !== '') {
        const embed = this.embedYoutube(vId);
        $(this.$el).find('#youtube-preview').html(embed);
        $(this.$el).find('#youtubefill-confirmbtn').removeClass('disabled');
      } else {
        $(this.$el).find('#youtube-preview').empty();
        $(this.$el).find('#youtubefill-confirmbtn').addClass('disabled');
      }
    },
  },
  methods: {
    ...mapMutations(['coverloading']),
    ufileChanged(e) {
      const files = e.target.files || e.dataTransfer.files;
      // files不是array，不能用forEach
      for (let i = 0; i < files.length; i += 1) {
        const p = {
          _id: genId(),
          bg: {
            file: files[i],
            _upload: 0,
            src: '',
          },
        };
        this.pages.push(p);
      }
      $('#f0_ufile').val('');
    },
    uPDFChanged(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.doUploadPDF(files[0]);
      $('#fpdf_ufile').val('');
    },
    playClick() {
      this.fullscreen = true;
    },
    fscreenchange(val) {
      this.fullscreen = val;
    },
    saveClick(e) {
      BtnLoading(e.target, true);
      this.anychanges = false;
      const upages = [];
      this.pages.forEach((val) => {
        if (val.bg) {
          if (val.bg._upload >= 2) {
            upages.push({
              bg: {
                src: val.bg.src,
                width: val.bg.width,
                height: val.bg.height,
              },
            });
          }
        } else {
          upages.push({
            layers: val.layers,
          });
        }
      });
      $.ajax({
        url: '/bulletscreen/api/slide',
        method: 'POST',
        data: {
          id: this.projectId,
          owner: this.owner,
          slidename: this.slidename,
          pages: JSON.stringify(upages),
        },
        dataType: 'json',
      }).done((d) => {
        if (d.status !== 'OK') {
          swal('Oops...', d.message, 'error');
          this.anychanges = true;
        }
      }).fail(() => {
        swal('Oops...', '其實我真的不知道發生什麼事', 'error');
        this.anychanges = true;
      }).always(() => {
        BtnLoading(e.target, false);
        if (!this.anychanges) {
          this.anychanges = true;
          Vue.nextTick(() => { this.anychanges = false; });
        }
      });
    },
    uploadClick() {
      $('#f0_ufile').click();
    },
    uploadPDFClick() {
      $('#fpdf_ufile').click();
    },
    qrClick() {
      // let url = 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=';
      // url += encodeURIComponent(this.clientUrl);
      const url = `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${encodeURIComponent(this.clientUrl)}`;
      swal({
        title: '手機亂入用的QRCode',
        text: '快掃',
        imageUrl: url,
        imageWidth: 500,
        imageHeight: 'auto',
      });
    },
    checkRoute() {
      const id = this.$route.params.id;
      if (id) {
        this.projectId = id;
        const loc = window.location;
        this.clientUrl = `http://${loc.hostname}/bulletscreen/client/${this.projectId}`;
        this.loadDetail(id);
      } else { this.$router.replace('/'); }
    },
    loadDetail(id) {
      this.coverloading(true);
      $.ajax({
        url: '/bulletscreen/api/slide',
        method: 'GET',
        data: { id },
        dataType: 'json',
      }).done((d) => {
        if (d.data.length === 0) { return _this.$router.push('/'); }
        this.slidename = d.data[0].slidename || '';
        this.owner = d.data[0].owner;
        d.data[0].pages.forEach((val) => {
          if (val.bg) {
            const p = {
              _id: genId(),
              bg: {
                src: val.bg.src,
                width: val.bg.width,
                height: val.bg.height,
                _upload: 3,
              },
            };
            this.pages.push(p);
          }
          if (val.layers) {
            const layers = [];
            val.layers.forEach((layer) => {
              // layer._id = genId();
              const ilayer = { ...layer, _id: genId() };
              layers.push(ilayer);
            });
            this.pages.push({
              _id: genId(),
              layers,
            });
          }
        });
        return setTimeout(() => {
          this.inited = true;
          if (this.owner === '' || this.owner === undefined) {
            $.toast({
              text: '這是無主人的簡報，所以你可以亂改',
              allowToastClose: false,
              icon: 'info',
              position: 'bottom-center',
              loader: false,
              loaderBg: '#9EC600',
            });
          } else if (this.owner !== Cookies.get('email')) {
            $.toast({
              text: '這不是你的簡報，你可以改但無法存檔喔',
              allowToastClose: false,
              icon: 'info',
              position: 'bottom-center',
              loader: false,
              loaderBg: '#9EC600',
            });
          }
        }, 30);
      }).fail(() => {
        swal('Oops...', '其實我真的不知道發生什麼事', 'error');
      }).always(() => {
        this.coverloading(false);
      });
    },
    delSlideClick() {
      let nex = -1;
      this.pages.forEach((val, index, ar) => {
        if (val._id === this.selectedId) {
          nex = index + 1;
          if (nex >= ar.length) nex = index - 1;
          this.selectedId = (nex >= 0 ? this.pages[nex]._id : '');
          // Vue.nextTick(() => {
          ar.splice(index, 1);
          // });
        }
      }, this);
    },
    delProjectClick() {
      swal({
        title: '確定?',
        text: '刪錯了不要哭喔',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '不要囉嗦',
        cancelButtonText: '對不起我錯了',
      }).then(() => {
        $.ajax({
          url: '/bulletscreen/api/slide',
          method: 'DELETE',
          dataType: 'json',
          data: { id: this.projectId },
        }).done((d) => {
          if (d.status !== 'OK') {
            swal('Oops...', d.message, 'error');
            return;
          }
          this.anychanges = false;
          if (Cookies.get('f')) {
            this.$router.replace(Cookies.get('f'));
          } else if (Cookies.get('email')) {
            this.$router.replace('/my');
          } else {
            this.$router.replace('/');
          }
        });
      }, () => {
      });
    },
    autoWHClass(w, h) {
      if (w / h > 4 / 3) { return 'autoHeight'; }
      return 'autoWidth';
    },
    getPageById(pid) {
      let obj = {};
      const index = this.pages.findIndex(val => val._id === pid);
      if (index >= 0) obj = this.pages[index];
      return obj;
    },
    initSortable() {
      if (!document.getElementById('left_panel') || !document.getElementById('copy_btn')) {
        return setTimeout(this.initSortable, 10);
      }
      const el = document.getElementById('sortable');
      Sortable.create(el, {
        sort: true,
        animation: 150,
        draggable: '.thum_unit',
        onEnd: this.onSortableEnd,
      });
      const clipboard = new Clipboard('#copy_btn', {
        text: () => {
          const clientUrl = this.clientUrl;
          return clientUrl;
        },
      });
      clipboard.on('success', () => {
        swal('網址已經複製', '這個網址是亂入用的網址<br>現在你可以把這個網址丟給別人了', 'success');
      });
      return 1;
    },
    onSortableEnd(e) {
      if (e.oldIndex === e.newIndex) return;
      const p = this.pages[e.oldIndex];
      this.pages.splice(e.oldIndex, 1);
      this.pages.splice(e.newIndex, 0, p);
    },
    checkResize() {
      const dom = this.$el;
      if ($(dom).find('#left_panel').length === 0) { return setTimeout(this.checkResize, 10); }
      $(dom).find('#left_panel').css({
        height: $(window).innerHeight() - $(dom).find('#editpanel').offset().top - 35 - 40,
      });
      const rightPanel = $(dom).find('#right_panel');
      rightPanel.css({
        height: $(dom).find('#left_panel').height(),
        width: $(dom).find('#editpanel').width() - $(dom).find('#left_panel').width(),
      });
      if (rightPanel.width() / rightPanel.height() > 4 / 3) {
        $(dom).find('#sedit').css({
          width: (rightPanel.height() * 0.9 * 4) / 3,
          height: rightPanel.height() * 0.9,
        });
      } else {
        $(dom).find('#sedit').css({
          width: rightPanel.width() * 0.9,
          height: (rightPanel.width() * 0.9 * 3) / 4,
        });
      }
      const leftWidth = $(dom).find('#left_panel').width();
      $('.thum_unit').css({
        width: leftWidth * 0.8, height: (leftWidth * 0.8 * 3) / 4,
      });
      for (let i = 0; i < $('.thum_unit').length; i += 1) {
        if ($('.thum_unit').eq(i).hasClass('expend-leave-active')) {
          $('.thum_unit').eq(i).css({
            height: 0,
            transition: '.3s',
          });
        }
      }
      // 調整youtube preview畫面的大小
      const yPreviewWidth = $(dom).find('#youtube-preview').width();
      $(dom).find('#youtube-preview').css({
        height: (yPreviewWidth * 3) / 4,
      });
      return 1;
    },
    nextUpload() {
      this.pages.forEach((val) => {
        if (val.bg) {
          if (val.bg._upload === 0) {
            this.doUpload(val._id);
          }
        }
      });
    },
    ajaxUpload(uploadURL, formdata, onprogress) {
      const ajax = $.ajax({
        xhr() {
          const xhr = $.ajaxSettings.xhr();
          if (onprogress) {
            if (xhr.upload) xhr.upload.addEventListener('progress', onprogress, false);
          }
          return xhr;
        },
        url: uploadURL,
        type: 'POST',
        dataType: 'json',
        data: formdata,
        contentType: false,
        processData: false,
      });
      return ajax;
    },
    doUploadPDF(file) {
      swal({
        title: '要有耐心',
        text: '檔案處理中，如果真的等超久，那應該就是掛了',
        type: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      const uploadURL = '/bulletscreen/api/upload';
      const formdata = new FormData();
      formdata.append('file', file, file.name);
      formdata.append('id', this.projectId);
      this.ajaxUpload(uploadURL, formdata).done((d) => {
        swal.close();
        d.forEach((val) => {
          const picurl = `${val.path}/${val.new_name}`;
          const page = {
            _id: genId(),
            bg: {
              _upload: 2,
              src: picurl,
            },
          };
          this.pages.push(page);
          page.bg.img = new Image();
          page.bg.img.onload = () => {
            page.bg._upload = 3;
            page.bg.width = page.bg.img.width;
            page.bg.height = page.bg.img.height;
            page.bg.img = null;
            Vue.nextTick(() => {
              this.checkResize();
            });
          };
          page.bg.img.src = page.bg.src;
        });
        if (d.length > 0) {
          $.toast({
            text: '新增了頁面',
            allowToastClose: false,
            icon: 'info',
            position: 'bottom-center',
            loader: false,
            loaderBg: '#9EC600',
          });
        }
      });
    },

    doUpload(pid) {
      const uploadURL = '/bulletscreen/api/upload';
      const formdata = new FormData();
      const page = this.getPageById(pid);
      formdata.append('file', page.bg.file, page.bg.file.name);
      formdata.append('id', this.projectId);

      // 把該page的file上傳狀態改成1 (正在上傳)
      page.bg._upload = 1;
      this.ajaxUpload(uploadURL, formdata, (event) => {
        let percent = 0;
        const position = event.loaded || event.position;
        const total = event.total;
        if (event.lengthComputable) {
          percent = Math.ceil((position / total) * 100);
        }
        page.bg._percent = percent;
      }).done((pdata) => {
        const picurl = `${pdata[0].path}/${pdata[0].new_name}`;
        page.bg._upload = 2;
        page.bg.src = picurl;
        page.bg.img = new Image();
        page.bg.img.onload = () => {
          page.bg._upload = 3;
          page.bg.width = page.bg.img.width;
          page.bg.height = page.bg.img.height;
          page.bg.img = null;
          Vue.nextTick(() => {
            this.checkResize();
            $.toast({
              text: '新增了頁面',
              allowToastClose: false,
              icon: 'info',
              position: 'bottom-center',
              loader: false,
              loaderBg: '#9EC600',
            });
          });
        };
        page.bg.img.src = page.bg.src;
      });
    },

    // 支援直接copy and paste圖片
    initPaste() {
      $(document).on('paste', (e) => {
        const orgEvent = e.originalEvent;
        if (!orgEvent.clipboardData) { orgEvent.clipboardData = window.clipboardData; }
        for (let i = 0; i < orgEvent.clipboardData.items.length; i += 1) {
          const val = orgEvent.clipboardData.items[i];
          if (val.kind === 'file' && val.type === 'image/png') {
            this.newPasteImg(val);
          }
        }
      });
    },
    newPasteImg(val) {
      const page = {
        _id: genId(),
        bg: {
          _upload: 0,
          width: 0,
          height: 0,
          src: '',
          file: val.getAsFile(),
        },
      };
      this.pages.push(page);
      this.doUpload(page._id);
    },
    embedYoutube(vId) {
      const embed = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vId}?contorls=0&rel=0&showinfo=0" frameborder="0" allowfullscreen></iframe>`;
      return embed;
    },
    getYoutTubeId(val) {
      const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (val.match(p)) {
        return val.match(p)[1];
      }
      return '';
    },
    youtubeConfirm() {
      const vId = this.getYoutTubeId(this.youtubeFillUrl);
      if (vId !== '') {
        const layer = {
          type: 'youtube',
          _id: genId(),
          data: {
            id: vId,
          },
        };
        const page = {
          _id: genId(),
          layers: [layer],
        };
        this.pages.push(page);
      }
      this.youtubeCancel();
    },
    popupYoutube() {
      this.youtubeFillUrl = '';
      $(this.$el).find('#youtube-fill').css({ display: 'flex', opacity: 0 });
      $(this.$el).find('#youtube-fill').animate({ opacity: 1 });
      this.checkResize();
    },
    youtubeCancel() {
      $(this.$el).find('#youtube-fill').fadeOut();
      $(this.$el).find('#youtube-preview').empty();
    },
  },
  created() {
    _this = this;
    this.checkRoute();

    Vue.nextTick(() => {
      $(window).on('resize', this.checkResize);
      this.checkResize();
      this.initSortable();
      this.initPaste();
      $.material.init();
      // $('#paste_li').popover();
      $('.hasPopover').popover();
    });
  },
  beforeDestroy() {
    $(document).off('paste');
    $(window).off('resize', this.checkResize);
  },
  beforeRouteLeave(to, from, next) {
    if (!this.anychanges) {
      next();
    } else {
      swal({
        title: '確定離開這個頁面?',
        text: '如果你沒存檔的話就沒了喔',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '是的，離開',
      }).then(() => {
        next();
      }, () => {
        next(false);
      });
    }
  },
};

/* function isImage(f) {
  if (f.type.indexOf('image') < 0) return false;
  return true;
}*/
</script>
<style scoped lang="sass" src="../css/slideEdit.sass"></style>
