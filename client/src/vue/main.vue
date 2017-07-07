<template>
  <div id="mcontainer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <div class="left_box col-sm-4 col-md-4">
            <h1>米蘭亂彈<p class="lead">V1.0.1</p></h1>
            <p class="lead">簡報亂入系統</p>
            <p>2017/03/17 - 草率上線</p>
          </div>
          <div class="right_box col-sm-6 col-md-5">
            <div class="panel panel-primary">
              <div class="panel-heading">
                <img src="/bulletscreen/img/mtitle.png" />
              </div>
              <div class="panel-body">
                <h3>你可以</h3>
                <p>在沒有登入的狀況下直接建立一個新的簡報，我們會給你一個很難記的網址，而且我不想去串短網址的API，所以如果你忘了網址，就幫不了你。<br>
                而且系統無聊的時候也會定期清掉沒有主人的簡報。</p>
                <router-link to="/new" class="btn btn-default btn-lg btn-block btn-raised">建立新的簡報</router-link>
                <div class="divide_line"></div>
                <h3>或是</h3>
                <p>登入Google帳號，你所建立過的簡報都會出現在你的頁面裡。</p>
                <div id="my-signin2"></div>
                <p>自己看著辦囉。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global Vue, $, renderButton */
export default {
  data() {
    return {};
  },
  methods: {
  },
  created() {
    Vue.nextTick(() => {
      $.material.init();
      try {
        renderButton();
      } catch (e) { console.log(e); }
    });
  },
};
</script>
<style scoped>
#mcontainer {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#mcontainer > .container-fluid {
  width: inherit;
}
.left_box {
  text-align: right;
}
#my-signin2 {
  margin:10px 0;
}
.panel {

}
.panel-heading img {
  width: 100%;
  max-width: 388px;
}
.divide_line {
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
}
</style>
