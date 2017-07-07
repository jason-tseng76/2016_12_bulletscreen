const gulp = require('gulp');
const fs = require('fs-extra');
const uglify = require('gulp-uglify');
const request = require('request');
const async = require('async');

const jscdns = [
  // jquery
  'https://code.jquery.com/jquery-3.1.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-fullscreen-plugin/1.1.4/jquery.fullscreen-min.js',
  // js cookies
  'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/latest/js.cookie.min.js',
  // bootstrap
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.10/js/ripples.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.10/js/material.js',
  // 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.10/js/material.min.js',
  // Vue
  'https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.1/vue.min.js',
  'https://unpkg.com/vue-router/dist/vue-router.js',
  'https://unpkg.com/vuex',
  // sweetalert2
  'https://cdn.jsdelivr.net/sweetalert2/6.3.1/sweetalert2.min.js',
  // memont.js
  'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment-with-locales.min.js',
  // sortable
  'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.5.1/Sortable.min.js',
  // clipboard
  'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.16/clipboard.min.js',
  // socket.io
  'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js',
  // jquery-toast-plugin http://kamranahmed.info/toast#toast-timer
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.1/jquery.toast.min.js',
  // Bootstrap typeahead
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js',
];
const csscdns = [
  // fonts
  // 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  // 'https://fonts.googleapis.com/icon?family=Material+Icons',
  // bootstrap
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.10/css/bootstrap-material-design.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.10/css/ripples.css',
  // 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.10/css/ripples.min.css',
  // sweetalert2
  'https://cdn.jsdelivr.net/sweetalert2/6.3.1/sweetalert2.min.css',
  // jquery-toast-plugin http://kamranahmed.info/toast#toast-timer
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.1/jquery.toast.min.css',
];
gulp.task('remote', () => {
  let jsbody = '';
  async.eachSeries(jscdns, (item, cb) => {
    if (item.indexOf('http') === 0) {
      request.get(item, (err, res, body) => {
        jsbody += `\n${body}`;
        cb();
      });
    } else {
      fs.readFile(item,'utf8', (err, body) => {
        if (err) throw err;
        jsbody += `\n${body}`;
        cb();
      });
    }
  }, () => {
    fs.ensureFileSync('./dist/vendor.js');
    fs.writeFileSync('./dist/vendor.js', jsbody);
    gulp.src('./dist/*.js')
        .pipe(uglify({ preserveComments: 'license' }))
        .pipe(gulp.dest('../server/public/bulletscreen/js'));
    console.log('js done');
  });
  let cssbody = '';
  async.eachSeries(csscdns, (item, cb) => {
    if (item.indexOf('http') === 0) {
      request.get(item, (err, res, body) => {
        cssbody += `\n${body}`;
        cb();
      });
    } else {
      fs.readFile(item,'utf8', (err, body) => {
        if (err) throw err;
        cssbody += `\n${body}`;
        cb();
      });
    }
  }, () => {
    fs.ensureFileSync('./dist/vendor.css');
    fs.writeFileSync('./dist/vendor.css', cssbody);
    gulp.src('./dist/*.css')
        //.pipe(uglify())
        .pipe(gulp.dest('../server/public/bulletscreen/css'));
    //fs.writeFileSync('../server/public/bulletscreen/css/vendor.css', cssbody);
    console.log('css done');
  });
});
gulp.task('default', ['remote']);
