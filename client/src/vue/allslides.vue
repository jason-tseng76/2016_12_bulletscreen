<template lang="pug">
  .container-fluid
    .well.well-sm
      h2 全部的簡報
      p.text-muted 有主人的簡報只有本人才可以修改存檔。
        br
        | 沒有主人的簡報大家都可以修改存檔。
      .divide-line
      .row
        .col-sm-6.col-xs-12.col-sm-offset-6
          .form-group.label-floating
            label.control-label(for="search-input") Search...
            .input-group
              input#search-input(type="text" class="form-control" v-model="searchtxt")
              span.input-group-btn
                button.btn.btn-fab.btn-fab-mini(type="button")
                  .fa.fa-search
        .col-xs-12
          .list-group
            transition-group(name="fade" mode="out-in" tag="div")
              .list-group-item(v-for='itm in slidelist' v-bind:key='itm._id' v-show='isSearched(itm)')
                router-link.img-flex(v-bind:to="'/slide/'+itm._id")
                  .img-flex-container
                    img(v-if="itm.pages.length > 0 && itm.pages[0].bg" v-bind:src="itm.pages[0].bg.src" v-bind:class="autoWHClass(itm.pages[0].bg.width, itm.pages[0].bg.height)")
                .context-flex
                  h4
                    |簡報名稱： {{itm.slidename}}
                  h5.text-muted
                    |擁有者： {{itm.owner}}
                  .text-muted
                    |更新時間： {{formatDate(itm.cdate)}}
                  .text-muted
                    |建立時間： {{formatDate(itm.createdate)}}
                  .text-muted
                    |PageViews：
                    span.badge {{itm.pview || 0}}
                  .text-muted
                    |上次被瀏覽時間： {{formatDate(itm.ldate)}}
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      slidelist: [],
      searchtxt: '',
    };
  },
  watch: {
  },
  computed: {
  },
  methods: {
    ...mapMutations(['coverloading']),
    isSearched(itm) {
      if (this.searchtxt.trim() === '') return true;
      const stxt = this.searchtxt.trim().toLowerCase();
      if (itm.slidename) {
        if (itm.slidename.toLowerCase().indexOf(stxt) >= 0) return true;
      }
      if (itm.owner) {
        if (itm.owner.toLowerCase().indexOf(stxt) >= 0) return true;
      }
      return false;
    },
    loadData() {
      this.coverloading(true);
      $.ajax({
        url: '/bulletscreen/api/slides',
      }).done((d) => {
        if (d.status === 'OK') {
          const tahead = [];
          d.data.forEach((val, index, arr) => {
            this.cleanData(arr, index);
            if (tahead.indexOf(val.owner) === -1) tahead.push(val.owner);
            if (tahead.indexOf(val.slidename) === -1) tahead.push(val.slidename);
          }, this);
          this.slidelist = d.data;
          $('#search-input').typeahead({
            source: tahead,
          });
        } else {
          swal('Oops...', d.message, 'error');
        }
      }).always(() => {
        this.coverloading(false);
      });
    },
    cleanData(arr, index) {
      const val = arr[index];
      if (!val.owner) val.owner = '無名氏';
      if (!val.slidename) val.slidename = '未命名';
    },
    formatDate(d) {
      moment.locale('zh-tw');
      return moment(d).format('MM/DD/YYYY, a hh:mm');
    },
    autoWHClass(w, h) {
      if (w / h > 4 / 3) { return 'autoHeight'; }
      return 'autoWidth';
    },
  },
  created() {
    Vue.nextTick(() => {
      this.loadData();
      $.material.init();
    });
    Cookies.set('f', this.$route.path);
  },
};
</script>
<style scoped>
.divide-line {
  height: 1px;
  width: 100%;
  background-color: #dddddd;
}
.list-group .list-group-item {
  padding: 10px 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
}
@media (max-width: 768px) {
  .list-group .list-group-item {
    flex-wrap: wrap;
    justify-content: center;
  }
}
.img-flex {
  display:block;
  width:300px;
  height:225px;
  padding:5px;
  display: flex;
  flex-shrink: 0;
  border: 1px solid #cccaca;
  -webkit-box-shadow: 0 2px 3px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19);
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19);
}
.img-flex-container {
  width:100%;
  height:100%;
  background:#dddddd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.context-flex {
  width:100%;
  margin-left: 20px;
}
.autoHeight {
  width: 100%;
  height: auto;
}
.autoWidth {
  width: auto;
  height: 100%;
}
</style>
