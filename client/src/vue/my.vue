<template lang="pug">
  .container-fluid
    .well.well-sm
      h2 你的所有簡報都在這
      p.text-muted 要砍掉就滑鼠移上去，有按鈕給你砍。
        br
        | 要新增就自己按右上角，或有一個很大的加號的那個。
        br
        | 要進入就直接圖片上點下去。
      .divide_line
      .row.pflex
        .punit(v-for="(pitem, key) in project_list" @mouseenter="unitMOver" @mouseleave="unitMOut" v-bind:key="pitem._id")
          .punit_cover(@click="$router.push('/slide/'+pitem._id)")
            img.punit_cover_img(v-if="pitem.pages.length > 0" v-bind:src="pitem.pages[0].bg.src" v-bind:class="autoWHClass(pitem.pages[0].bg.width, pitem.pages[0].bg.height)")
          .punit_hidden
            .punit_context
              h4 {{!pitem.slidename ? '未命名' : pitem.slidename}}
              .punit_date.text-muted {{formatDate(pitem.ldate)}}
              .btn-group.btn-group-justified.btn-group-xs.btn-group-raised
                a.btn.btn-danger(href="javascript:void(0)" @click="delClick(pitem._id)")
                  i.fa.fa-times
                  |刪除
        .punit(@click="$router.push('/new')")
          .punit_add
            p
              i.fa.fa-plus
            p.text_mute 新增
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      project_list: [],
      delpop: false,
    };
  },
  methods: {
    ...mapMutations(['coverloading']),
    delClick(id) {
      this.delpop = true;
      // BtnLoading($event.target, true);
      swal({
        title: '確定?',
        text: '刪錯了不要哭喔',
        type: 'warning',
        showCancelButton: true,
        // confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: '不要囉嗦',
        // confirmButtonClass: 'btn btn-info btn-raised',
        cancelButtonText: '對不起我錯了',
        //cancelButtonClass: 'btn btn-raised'
      }).then(() => {
        this.delpop = false;
        $.ajax({
          url: '/bulletscreen/api/slide',
          method: 'DELETE',
          dataType: 'json',
          data: { id },
        }).done(() => {
          this.project_list.forEach((val, index, ar) => {
            if (val._id === id) {
              ar.splice(index, 1);
            }
          });
        });
      }, () => {
        this.delpop = false;
        $(this.$el).find('.punit_hidden').removeClass('punit_active');
      });
    },
    readData() {
      this.coverloading(true);
      $.ajax({
        url: '/bulletscreen/api/my',
        method: 'GET',
        dataType: 'json',
      }).done((d) => {
        if (d.status === 'OK') {
          this.project_list = d.data;
        } else {
          this.$router.replace('/');
        }
      }).fail(() => {
        swal('Oops...', '老實說我真的不知道發生什麼事', 'error');
      }).always(() => {
        this.coverloading(false);
      });
    },
    formatDate(d) {
      moment.locale('zh-tw');
      return moment(d).format('MM/DD/YYYY, a hh:mm');
    },
    autoWHClass(w, h) {
      if (w < h) { return 'autoHeight'; }
      return 'autoWidth';
    },
    unitMOver($event) {
      const dom = $($event.target);
      dom.find('.punit_hidden').addClass('punit_active');
    },
    unitMOut($event) {
      const dom = $($event.target);
      setTimeout(() => {
        if (!this.delpop) { dom.find('.punit_hidden').removeClass('punit_active'); }
      }, 100);
    },
  },
  created() {
    Cookies.set('f', this.$route.path);
    this.readData();
  },
};

</script>
<style scoped>
.pflex {
  display: flex;
  justify-content: center;
  align-content: space-around;
  flex-wrap:wrap;
}
.punit {
  position: relative;
  width: 300px;
  height: 300px;
  -webkit-box-shadow: 0 2px 3px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19);
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19);
  overflow: hidden;
  margin: 10px 10px;
}
.punit_context {
  position: relative;
  padding: 2px 10px;
  background-color: #ffffff;
}
.punit_hidden.punit_active {
  bottom: 0;
}
.punit_date {
  text-align: right;
}
.punit_hidden {
  position: absolute;
  bottom: -100%;
  transition: .5s;
  width: 300px;
}
.punit_cover {  
  width: 300px;
  height: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.punit_add {
  width: 300px;
  height: 300px;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap:wrap;
  cursor: pointer;
  color:#666666;
  font-size: 40px;
}
.punit_add .text_mute {
  font-size: 20px;
}
.punit_add > p {
  width: 100%;
  text-align: center;
  margin:0;
}
.autoHeight {
  width: 100%;
  height: auto;
}
.autoWidth {
  width: auto;
  height: 100%;
}
.divide_line {
  height: 2px;
  width: 100%;
  background-color: #dddddd;
}
</style>
