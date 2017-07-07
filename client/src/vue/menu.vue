<template>
  <div class="navbar navbar-default" v-if="showmenu">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="javascript:void(0)"><img src="/bulletscreen/img/mtitle.png" /></a>
      </div>
      <div class="navbar-collapse collapse navbar-responsive-collapse">
        <ul class="nav navbar-nav navbar-right" v-if="user.email !== ''">
          <li><router-link to="/all">所有列表</router-link></li>
          <li><router-link to="/new">新簡報</router-link></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><!--<span class="badge">42</span>--><i class="fa fa-user" aria-hidden="true"></i><b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><router-link to="/my">我的頁面</router-link></li>
              <li class="divider"></li>
              <li><router-link to="/logout">登出</router-link></li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right" v-else>
          <li><router-link to="/all">所有列表</router-link></li>
          <li><router-link to="/new">新簡報</router-link></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user" aria-hidden="true"></i><b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><router-link to="/">登入</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
    showmenu() {
      const path = this.$route.path;
      if (path === '/') { return false; }
      return true;
    },
  },
};
</script>
<style scoped>
.navbar {
  margin-bottom: 20px;
}
.navbar-brand > img {
  height: 100%;
}
.fa-user {
  margin-right: 5px;
  font-size: 20px;
}
@media (min-width: 768px) {
  .navbar-nav .dropdown-menu {
    margin-top: -15px;
  }
}
</style>
