const main = require('../vue/main.vue');
// const my = require('../vue/my.vue');
// const slideEdit = require('../vue/slideEdit.vue');
//const allslides = require('../vue/allslides.vue');


const routes = [
  {
    path: '/',
    component: main,
    name: 'main',
  },
  {
    path: '/my',
    component: (resolve) => { require(['../vue/my.vue'], resolve); },
    name: 'my',
  },
  {
    path: '/all',
    component: (resolve) => { require(['../vue/allslides.vue'], resolve); },
    name: 'all',
  },
  {
    path: '/slide/:id',
    component: (resolve) => { require(['../vue/slideEdit.vue'], resolve); },
    name: 'slide_edit',
  },
];
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'open',
  base: '/bulletscreen',
});

router.beforeEach((to, from, next) => {
  if (to.path === '/new') {
    $.ajax({
      url: '/bulletscreen/api/newslide',
      method: 'POST',
      dataType: 'json',
    }).done((d) => {
      if (d.status === 'OK') {
        if (from.path.indexOf('/slide/') === 0) {
          window.location.href = `/bulletscreen/slide/${d.data._id}`;
        } else {
          next({ path: `/slide/${d.data._id}` });
        }
      } else {
        swal('Oops...', '老實說我不知道發生什麼事', 'error');
        next(false);
      }
    });
    return;
  }
  if (to.path.indexOf('/logout') === 0) {
    signOut();
    return;
  }
  next();
});

module.exports = router;
