webpackJsonp([2],{26:function(module,exports,__webpack_require__){eval('\n/* styles */\n__webpack_require__(45)\n\nvar Component = __webpack_require__(3)(\n  /* script */\n  __webpack_require__(29),\n  /* template */\n  __webpack_require__(41),\n  /* scopeId */\n  "data-v-c5c7334e",\n  /* cssModules */\n  null\n)\n\nmodule.exports = Component.exports\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdnVlL2FsbHNsaWRlcy52dWU/ODdlMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiIyNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyogc3R5bGVzICovXG5yZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/bWluaW1pemUhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXI/aWQ9ZGF0YS12LWM1YzczMzRlJnNjb3BlZD10cnVlIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9hbGxzbGlkZXMudnVlXCIpXG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpKFxuICAvKiBzY3JpcHQgKi9cbiAgcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1lczIwMTUscHJlc2V0c1tdPXN0YWdlLTIhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL2FsbHNsaWRlcy52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP2lkPWRhdGEtdi1jNWM3MzM0ZSEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1sb2FkZXI/cmF3JmVuZ2luZT1wdWchLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vYWxsc2xpZGVzLnZ1ZVwiKSxcbiAgLyogc2NvcGVJZCAqL1xuICBcImRhdGEtdi1jNWM3MzM0ZVwiLFxuICAvKiBjc3NNb2R1bGVzICovXG4gIG51bGxcbilcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdnVlL2FsbHNsaWRlcy52dWVcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMiJdLCJzb3VyY2VSb290IjoiIn0=')},29:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\nvar _vuex = __webpack_require__(2);\n\nexports.default = {\n  data: function data() {\n    return {\n      slidelist: [],\n      searchtxt: ''\n    };\n  },\n\n  watch: {},\n  computed: {},\n  methods: _extends({}, (0, _vuex.mapMutations)(['coverloading']), {\n    isSearched: function isSearched(itm) {\n      if (this.searchtxt.trim() === '') return true;\n      var stxt = this.searchtxt.trim().toLowerCase();\n      if (itm.slidename) {\n        if (itm.slidename.toLowerCase().indexOf(stxt) >= 0) return true;\n      }\n      if (itm.owner) {\n        if (itm.owner.toLowerCase().indexOf(stxt) >= 0) return true;\n      }\n      return false;\n    },\n    loadData: function loadData() {\n      var _this = this;\n\n      this.coverloading(true);\n      $.ajax({\n        url: '/bulletscreen/api/slides'\n      }).done(function (d) {\n        if (d.status === 'OK') {\n          (function () {\n            var tahead = [];\n            d.data.forEach(function (val, index, arr) {\n              _this.cleanData(arr, index);\n              if (tahead.indexOf(val.owner) === -1) tahead.push(val.owner);\n              if (tahead.indexOf(val.slidename) === -1) tahead.push(val.slidename);\n            }, _this);\n            _this.slidelist = d.data;\n            $('#search-input').typeahead({\n              source: tahead\n            });\n          })();\n        } else {\n          swal('Oops...', d.message, 'error');\n        }\n      }).always(function () {\n        _this.coverloading(false);\n      });\n    },\n    cleanData: function cleanData(arr, index) {\n      var val = arr[index];\n      if (!val.owner) val.owner = '無名氏';\n      if (!val.slidename) val.slidename = '未命名';\n    },\n    formatDate: function formatDate(d) {\n      moment.locale('zh-tw');\n      return moment(d).format('MM/DD/YYYY, a hh:mm');\n    },\n    autoWHClass: function autoWHClass(w, h) {\n      if (w / h > 4 / 3) {\n        return 'autoHeight';\n      }\n      return 'autoWidth';\n    }\n  }),\n  created: function created() {\n    var _this2 = this;\n\n    Vue.nextTick(function () {\n      _this2.loadData();\n      $.material.init();\n    });\n    Cookies.set('f', this.$route.path);\n  }\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vYWxsc2xpZGVzLnZ1ZT9jYzhjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQ0E7Ozt3QkFFQTs7aUJBRUE7aUJBRUE7QUFIQTtBQUlBOztTQUVBO1lBRUE7QUFDQSxpREFDQTt5Q0FDQTsrQ0FDQTt1Q0FDQTt5QkFDQTttRUFDQTtBQUNBO3FCQUNBOytEQUNBO0FBQ0E7YUFDQTtBQUNBOztBQUNBOzt3QkFDQTs7YUFFQTtBQURBLDJCQUVBOztBQUNBO3lCQUNBO3NEQUNBO21DQUNBO29FQUNBO3dFQUNBO0FBQ0E7Z0NBQ0E7O3NCQUdBO0FBRkE7O2VBR0E7cUNBQ0E7QUFDQTs0QkFDQTsyQkFDQTtBQUNBO0FBQ0E7OENBQ0E7b0JBQ0E7a0NBQ0E7MENBQ0E7QUFDQTt1Q0FDQTtvQkFDQTs4QkFDQTtBQUNBOzRDQUNBOzs7QUFDQTthQUNBO0FBRUE7OztBQUNBOzs2QkFDQTthQUNBO2lCQUNBO0FBQ0E7aUNBQ0E7QUFDQTtBQW5FQSIsImZpbGUiOiIyOS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZSBsYW5nPVwicHVnXCI+XHJcbiAgLmNvbnRhaW5lci1mbHVpZFxyXG4gICAgLndlbGwud2VsbC1zbVxyXG4gICAgICBoMiDlhajpg6jnmoTnsKHloLFcclxuICAgICAgcC50ZXh0LW11dGVkIOacieS4u+S6uueahOewoeWgseWPquacieacrOS6uuaJjeWPr+S7peS/ruaUueWtmOaqlOOAglxyXG4gICAgICAgIGJyXHJcbiAgICAgICAgfCDmspLmnInkuLvkurrnmoTnsKHloLHlpKflrrbpg73lj6/ku6Xkv67mlLnlrZjmqpTjgIJcclxuICAgICAgLmRpdmlkZS1saW5lXHJcbiAgICAgIC5yb3dcclxuICAgICAgICAuY29sLXNtLTYuY29sLXhzLTEyLmNvbC1zbS1vZmZzZXQtNlxyXG4gICAgICAgICAgLmZvcm0tZ3JvdXAubGFiZWwtZmxvYXRpbmdcclxuICAgICAgICAgICAgbGFiZWwuY29udHJvbC1sYWJlbChmb3I9XCJzZWFyY2gtaW5wdXRcIikgU2VhcmNoLi4uXHJcbiAgICAgICAgICAgIC5pbnB1dC1ncm91cFxyXG4gICAgICAgICAgICAgIGlucHV0I3NlYXJjaC1pbnB1dCh0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdi1tb2RlbD1cInNlYXJjaHR4dFwiKVxyXG4gICAgICAgICAgICAgIHNwYW4uaW5wdXQtZ3JvdXAtYnRuXHJcbiAgICAgICAgICAgICAgICBidXR0b24uYnRuLmJ0bi1mYWIuYnRuLWZhYi1taW5pKHR5cGU9XCJidXR0b25cIilcclxuICAgICAgICAgICAgICAgICAgLmZhLmZhLXNlYXJjaFxyXG4gICAgICAgIC5jb2wteHMtMTJcclxuICAgICAgICAgIC5saXN0LWdyb3VwXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24tZ3JvdXAobmFtZT1cImZhZGVcIiBtb2RlPVwib3V0LWluXCIgdGFnPVwiZGl2XCIpXHJcbiAgICAgICAgICAgICAgLmxpc3QtZ3JvdXAtaXRlbSh2LWZvcj0naXRtIGluIHNsaWRlbGlzdCcgdi1iaW5kOmtleT0naXRtLl9pZCcgdi1zaG93PSdpc1NlYXJjaGVkKGl0bSknKVxyXG4gICAgICAgICAgICAgICAgcm91dGVyLWxpbmsuaW1nLWZsZXgodi1iaW5kOnRvPVwiJy9zbGlkZS8nK2l0bS5faWRcIilcclxuICAgICAgICAgICAgICAgICAgLmltZy1mbGV4LWNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgICAgIGltZyh2LWlmPVwiaXRtLnBhZ2VzLmxlbmd0aCA+IDAgJiYgaXRtLnBhZ2VzWzBdLmJnXCIgdi1iaW5kOnNyYz1cIml0bS5wYWdlc1swXS5iZy5zcmNcIiB2LWJpbmQ6Y2xhc3M9XCJhdXRvV0hDbGFzcyhpdG0ucGFnZXNbMF0uYmcud2lkdGgsIGl0bS5wYWdlc1swXS5iZy5oZWlnaHQpXCIpXHJcbiAgICAgICAgICAgICAgICAuY29udGV4dC1mbGV4XHJcbiAgICAgICAgICAgICAgICAgIGg0XHJcbiAgICAgICAgICAgICAgICAgICAgfOewoeWgseWQjeeose+8miB7e2l0bS5zbGlkZW5hbWV9fVxyXG4gICAgICAgICAgICAgICAgICBoNS50ZXh0LW11dGVkXHJcbiAgICAgICAgICAgICAgICAgICAgfOaTgeacieiAhe+8miB7e2l0bS5vd25lcn19XHJcbiAgICAgICAgICAgICAgICAgIC50ZXh0LW11dGVkXHJcbiAgICAgICAgICAgICAgICAgICAgfOabtOaWsOaZgumWk++8miB7e2Zvcm1hdERhdGUoaXRtLmNkYXRlKX19XHJcbiAgICAgICAgICAgICAgICAgIC50ZXh0LW11dGVkXHJcbiAgICAgICAgICAgICAgICAgICAgfOW7uueri+aZgumWk++8miB7e2Zvcm1hdERhdGUoaXRtLmNyZWF0ZWRhdGUpfX1cclxuICAgICAgICAgICAgICAgICAgLnRleHQtbXV0ZWRcclxuICAgICAgICAgICAgICAgICAgICB8UGFnZVZpZXdz77yaXHJcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5iYWRnZSB7e2l0bS5wdmlldyB8fCAwfX1cclxuICAgICAgICAgICAgICAgICAgLnRleHQtbXV0ZWRcclxuICAgICAgICAgICAgICAgICAgICB85LiK5qyh6KKr54CP6Ka95pmC6ZaT77yaIHt7Zm9ybWF0RGF0ZShpdG0ubGRhdGUpfX1cclxuPC90ZW1wbGF0ZT5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgbWFwTXV0YXRpb25zIH0gZnJvbSAndnVleCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNsaWRlbGlzdDogW10sXHJcbiAgICAgIHNlYXJjaHR4dDogJycsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgd2F0Y2g6IHtcclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICAuLi5tYXBNdXRhdGlvbnMoWydjb3ZlcmxvYWRpbmcnXSksXHJcbiAgICBpc1NlYXJjaGVkKGl0bSkge1xyXG4gICAgICBpZiAodGhpcy5zZWFyY2h0eHQudHJpbSgpID09PSAnJykgcmV0dXJuIHRydWU7XHJcbiAgICAgIGNvbnN0IHN0eHQgPSB0aGlzLnNlYXJjaHR4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKGl0bS5zbGlkZW5hbWUpIHtcclxuICAgICAgICBpZiAoaXRtLnNsaWRlbmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc3R4dCkgPj0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0bS5vd25lcikge1xyXG4gICAgICAgIGlmIChpdG0ub3duZXIudG9Mb3dlckNhc2UoKS5pbmRleE9mKHN0eHQpID49IDApIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBsb2FkRGF0YSgpIHtcclxuICAgICAgdGhpcy5jb3ZlcmxvYWRpbmcodHJ1ZSk7XHJcbiAgICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2J1bGxldHNjcmVlbi9hcGkvc2xpZGVzJyxcclxuICAgICAgfSkuZG9uZSgoZCkgPT4ge1xyXG4gICAgICAgIGlmIChkLnN0YXR1cyA9PT0gJ09LJykge1xyXG4gICAgICAgICAgY29uc3QgdGFoZWFkID0gW107XHJcbiAgICAgICAgICBkLmRhdGEuZm9yRWFjaCgodmFsLCBpbmRleCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYW5EYXRhKGFyciwgaW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAodGFoZWFkLmluZGV4T2YodmFsLm93bmVyKSA9PT0gLTEpIHRhaGVhZC5wdXNoKHZhbC5vd25lcik7XHJcbiAgICAgICAgICAgIGlmICh0YWhlYWQuaW5kZXhPZih2YWwuc2xpZGVuYW1lKSA9PT0gLTEpIHRhaGVhZC5wdXNoKHZhbC5zbGlkZW5hbWUpO1xyXG4gICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICB0aGlzLnNsaWRlbGlzdCA9IGQuZGF0YTtcclxuICAgICAgICAgICQoJyNzZWFyY2gtaW5wdXQnKS50eXBlYWhlYWQoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHRhaGVhZCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKCdPb3BzLi4uJywgZC5tZXNzYWdlLCAnZXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb3ZlcmxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjbGVhbkRhdGEoYXJyLCBpbmRleCkge1xyXG4gICAgICBjb25zdCB2YWwgPSBhcnJbaW5kZXhdO1xyXG4gICAgICBpZiAoIXZhbC5vd25lcikgdmFsLm93bmVyID0gJ+eEoeWQjeawjyc7XHJcbiAgICAgIGlmICghdmFsLnNsaWRlbmFtZSkgdmFsLnNsaWRlbmFtZSA9ICfmnKrlkb3lkI0nO1xyXG4gICAgfSxcclxuICAgIGZvcm1hdERhdGUoZCkge1xyXG4gICAgICBtb21lbnQubG9jYWxlKCd6aC10dycpO1xyXG4gICAgICByZXR1cm4gbW9tZW50KGQpLmZvcm1hdCgnTU0vREQvWVlZWSwgYSBoaDptbScpO1xyXG4gICAgfSxcclxuICAgIGF1dG9XSENsYXNzKHcsIGgpIHtcclxuICAgICAgaWYgKHcgLyBoID4gNCAvIDMpIHsgcmV0dXJuICdhdXRvSGVpZ2h0JzsgfVxyXG4gICAgICByZXR1cm4gJ2F1dG9XaWR0aCc7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3JlYXRlZCgpIHtcclxuICAgIFZ1ZS5uZXh0VGljaygoKSA9PiB7XHJcbiAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgJC5tYXRlcmlhbC5pbml0KCk7XHJcbiAgICB9KTtcclxuICAgIENvb2tpZXMuc2V0KCdmJywgdGhpcy4kcm91dGUucGF0aCk7XHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5kaXZpZGUtbGluZSB7XHJcbiAgaGVpZ2h0OiAxcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZGRkZDtcclxufVxyXG4ubGlzdC1ncm91cCAubGlzdC1ncm91cC1pdGVtIHtcclxuICBwYWRkaW5nOiAxMHB4IDE1cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5saXN0LWdyb3VwIC5saXN0LWdyb3VwLWl0ZW0ge1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgfVxyXG59XHJcbi5pbWctZmxleCB7XHJcbiAgZGlzcGxheTpibG9jaztcclxuICB3aWR0aDozMDBweDtcclxuICBoZWlnaHQ6MjI1cHg7XHJcbiAgcGFkZGluZzo1cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXNocmluazogMDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjYWNhO1xyXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAycHggM3B4IDAgcmdiYSgwLDAsMCwuMiksIDAgNnB4IDIwcHggMCByZ2JhKDAsMCwwLC4xOSk7XHJcbiAgYm94LXNoYWRvdzogMCAycHggM3B4IDAgcmdiYSgwLDAsMCwuMiksIDAgNnB4IDIwcHggMCByZ2JhKDAsMCwwLC4xOSk7XHJcbn1cclxuLmltZy1mbGV4LWNvbnRhaW5lciB7XHJcbiAgd2lkdGg6MTAwJTtcclxuICBoZWlnaHQ6MTAwJTtcclxuICBiYWNrZ3JvdW5kOiNkZGRkZGQ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbi5jb250ZXh0LWZsZXgge1xyXG4gIHdpZHRoOjEwMCU7XHJcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbn1cclxuLmF1dG9IZWlnaHQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogYXV0bztcclxufVxyXG4uYXV0b1dpZHRoIHtcclxuICB3aWR0aDogYXV0bztcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFsbHNsaWRlcy52dWU/MmMxMDYxMmIiXSwic291cmNlUm9vdCI6IiJ9")},36:function(module,exports,__webpack_require__){eval('exports = module.exports = __webpack_require__(0)();\n// imports\n\n\n// module\nexports.push([module.i, ".divide-line[data-v-c5c7334e]{height:1px;width:100%;background-color:#ddd}.list-group .list-group-item[data-v-c5c7334e]{padding:10px 15px;background-color:#fff;border:1px solid #ddd;display:flex;align-items:stretch;justify-content:flex-start}@media (max-width:768px){.list-group .list-group-item[data-v-c5c7334e]{flex-wrap:wrap;justify-content:center}}.img-flex[data-v-c5c7334e]{display:block;width:300px;height:225px;padding:5px;display:flex;flex-shrink:0;border:1px solid #cccaca;-webkit-box-shadow:0 2px 3px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);box-shadow:0 2px 3px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}.img-flex-container[data-v-c5c7334e]{width:100%;height:100%;background:#ddd;display:flex;align-items:center;justify-content:center}.context-flex[data-v-c5c7334e]{width:100%;margin-left:20px}.autoHeight[data-v-c5c7334e]{width:100%;height:auto}.autoWidth[data-v-c5c7334e]{width:auto;height:100%}", ""]);\n\n// exports\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdnVlL2FsbHNsaWRlcy52dWU/MjJhYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOzs7QUFHQTtBQUNBLHVEQUF3RCxXQUFXLFdBQVcsc0JBQXNCLDhDQUE4QyxrQkFBa0Isc0JBQXNCLHNCQUFzQixhQUFhLG9CQUFvQiwyQkFBMkIseUJBQXlCLDhDQUE4QyxlQUFlLHdCQUF3QiwyQkFBMkIsY0FBYyxZQUFZLGFBQWEsWUFBWSxhQUFhLGNBQWMseUJBQXlCLDJFQUEyRSxtRUFBbUUscUNBQXFDLFdBQVcsWUFBWSxnQkFBZ0IsYUFBYSxtQkFBbUIsdUJBQXVCLCtCQUErQixXQUFXLGlCQUFpQiw2QkFBNkIsV0FBVyxZQUFZLDRCQUE0QixXQUFXLFlBQVk7O0FBRS82QiIsImZpbGUiOiIzNi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmRpdmlkZS1saW5lW2RhdGEtdi1jNWM3MzM0ZV17aGVpZ2h0OjFweDt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6I2RkZH0ubGlzdC1ncm91cCAubGlzdC1ncm91cC1pdGVtW2RhdGEtdi1jNWM3MzM0ZV17cGFkZGluZzoxMHB4IDE1cHg7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlcjoxcHggc29saWQgI2RkZDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6c3RyZXRjaDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH1AbWVkaWEgKG1heC13aWR0aDo3NjhweCl7Lmxpc3QtZ3JvdXAgLmxpc3QtZ3JvdXAtaXRlbVtkYXRhLXYtYzVjNzMzNGVde2ZsZXgtd3JhcDp3cmFwO2p1c3RpZnktY29udGVudDpjZW50ZXJ9fS5pbWctZmxleFtkYXRhLXYtYzVjNzMzNGVde2Rpc3BsYXk6YmxvY2s7d2lkdGg6MzAwcHg7aGVpZ2h0OjIyNXB4O3BhZGRpbmc6NXB4O2Rpc3BsYXk6ZmxleDtmbGV4LXNocmluazowO2JvcmRlcjoxcHggc29saWQgI2NjY2FjYTstd2Via2l0LWJveC1zaGFkb3c6MCAycHggM3B4IDAgcmdiYSgwLDAsMCwuMiksMCA2cHggMjBweCAwIHJnYmEoMCwwLDAsLjE5KTtib3gtc2hhZG93OjAgMnB4IDNweCAwIHJnYmEoMCwwLDAsLjIpLDAgNnB4IDIwcHggMCByZ2JhKDAsMCwwLC4xOSl9LmltZy1mbGV4LWNvbnRhaW5lcltkYXRhLXYtYzVjNzMzNGVde3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZDojZGRkO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uY29udGV4dC1mbGV4W2RhdGEtdi1jNWM3MzM0ZV17d2lkdGg6MTAwJTttYXJnaW4tbGVmdDoyMHB4fS5hdXRvSGVpZ2h0W2RhdGEtdi1jNWM3MzM0ZV17d2lkdGg6MTAwJTtoZWlnaHQ6YXV0b30uYXV0b1dpZHRoW2RhdGEtdi1jNWM3MzM0ZV17d2lkdGg6YXV0bztoZWlnaHQ6MTAwJX1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9taW5pbWl6ZSEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LWM1YzczMzRlJnNjb3BlZD10cnVlIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vc3JjL3Z1ZS9hbGxzbGlkZXMudnVlXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwic291cmNlUm9vdCI6IiJ9')},41:function(module,exports){eval('module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;\n  return _c(\'div\', {\n    staticClass: "container-fluid"\n  }, [_c(\'div\', {\n    staticClass: "well well-sm"\n  }, [_c(\'h2\', [_vm._v("全部的簡報")]), _vm._m(0), _c(\'div\', {\n    staticClass: "divide-line"\n  }), _c(\'div\', {\n    staticClass: "row"\n  }, [_c(\'div\', {\n    staticClass: "col-sm-6 col-xs-12 col-sm-offset-6"\n  }, [_c(\'div\', {\n    staticClass: "form-group label-floating"\n  }, [_c(\'label\', {\n    staticClass: "control-label",\n    attrs: {\n      "for": "search-input"\n    }\n  }, [_vm._v("Search...")]), _c(\'div\', {\n    staticClass: "input-group"\n  }, [_c(\'input\', {\n    directives: [{\n      name: "model",\n      rawName: "v-model",\n      value: (_vm.searchtxt),\n      expression: "searchtxt"\n    }],\n    staticClass: "form-control",\n    attrs: {\n      "id": "search-input",\n      "type": "text"\n    },\n    domProps: {\n      "value": _vm._s(_vm.searchtxt)\n    },\n    on: {\n      "input": function($event) {\n        if ($event.target.composing) { return; }\n        _vm.searchtxt = $event.target.value\n      }\n    }\n  }), _vm._m(1)])])]), _c(\'div\', {\n    staticClass: "col-xs-12"\n  }, [_c(\'div\', {\n    staticClass: "list-group"\n  }, [_c(\'transition-group\', {\n    attrs: {\n      "name": "fade",\n      "mode": "out-in",\n      "tag": "div"\n    }\n  }, _vm._l((_vm.slidelist), function(itm) {\n    return _c(\'div\', {\n      directives: [{\n        name: "show",\n        rawName: "v-show",\n        value: (_vm.isSearched(itm)),\n        expression: "isSearched(itm)"\n      }],\n      key: itm._id,\n      staticClass: "list-group-item"\n    }, [_c(\'router-link\', {\n      staticClass: "img-flex",\n      attrs: {\n        "to": \'/slide/\' + itm._id\n      }\n    }, [_c(\'div\', {\n      staticClass: "img-flex-container"\n    }, [(itm.pages.length > 0 && itm.pages[0].bg) ? _c(\'img\', {\n      class: _vm.autoWHClass(itm.pages[0].bg.width, itm.pages[0].bg.height),\n      attrs: {\n        "src": itm.pages[0].bg.src\n      }\n    }) : _vm._e()])]), _c(\'div\', {\n      staticClass: "context-flex"\n    }, [_c(\'h4\', [_vm._v("簡報名稱： " + _vm._s(itm.slidename))]), _c(\'h5\', {\n      staticClass: "text-muted"\n    }, [_vm._v("擁有者： " + _vm._s(itm.owner))]), _c(\'div\', {\n      staticClass: "text-muted"\n    }, [_vm._v("更新時間： " + _vm._s(_vm.formatDate(itm.cdate)))]), _c(\'div\', {\n      staticClass: "text-muted"\n    }, [_vm._v("建立時間： " + _vm._s(_vm.formatDate(itm.createdate)))]), _c(\'div\', {\n      staticClass: "text-muted"\n    }, [_vm._v("PageViews："), _c(\'span\', {\n      staticClass: "badge"\n    }, [_vm._v(_vm._s(itm.pview || 0))])]), _c(\'div\', {\n      staticClass: "text-muted"\n    }, [_vm._v("上次被瀏覽時間： " + _vm._s(_vm.formatDate(itm.ldate)))])])], 1)\n  }))], 1)])])])])\n},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;\n  return _c(\'p\', {\n    staticClass: "text-muted"\n  }, [_vm._v("有主人的簡報只有本人才可以修改存檔。"), _c(\'br\'), _vm._v("沒有主人的簡報大家都可以修改存檔。")])\n},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;\n  return _c(\'span\', {\n    staticClass: "input-group-btn"\n  }, [_c(\'button\', {\n    staticClass: "btn btn-fab btn-fab-mini",\n    attrs: {\n      "type": "button"\n    }\n  }, [_c(\'div\', {\n    staticClass: "fa fa-search"\n  })])])\n}]}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdnVlL2FsbHNsaWRlcy52dWU/MWEzYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0IsbUJBQW1CLGFBQWEsMEJBQTBCO0FBQzFFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQywrQkFBK0IsYUFBYSwwQkFBMEI7QUFDdkU7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDLGFBQWEsYUFBYSwwQkFBMEI7QUFDckQ7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSCxDQUFDIiwiZmlsZSI6IjQxLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyLWZsdWlkXCJcbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwid2VsbCB3ZWxsLXNtXCJcbiAgfSwgW19jKCdoMicsIFtfdm0uX3YoXCLlhajpg6jnmoTnsKHloLFcIildKSwgX3ZtLl9tKDApLCBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImRpdmlkZS1saW5lXCJcbiAgfSksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwicm93XCJcbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTYgY29sLXhzLTEyIGNvbC1zbS1vZmZzZXQtNlwiXG4gIH0sIFtfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgbGFiZWwtZmxvYXRpbmdcIlxuICB9LCBbX2MoJ2xhYmVsJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNvbnRyb2wtbGFiZWxcIixcbiAgICBhdHRyczoge1xuICAgICAgXCJmb3JcIjogXCJzZWFyY2gtaW5wdXRcIlxuICAgIH1cbiAgfSwgW192bS5fdihcIlNlYXJjaC4uLlwiKV0pLCBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwXCJcbiAgfSwgW19jKCdpbnB1dCcsIHtcbiAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICB2YWx1ZTogKF92bS5zZWFyY2h0eHQpLFxuICAgICAgZXhwcmVzc2lvbjogXCJzZWFyY2h0eHRcIlxuICAgIH1dLFxuICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcImlkXCI6IFwic2VhcmNoLWlucHV0XCIsXG4gICAgICBcInR5cGVcIjogXCJ0ZXh0XCJcbiAgICB9LFxuICAgIGRvbVByb3BzOiB7XG4gICAgICBcInZhbHVlXCI6IF92bS5fcyhfdm0uc2VhcmNodHh0KVxuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiaW5wdXRcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykgeyByZXR1cm47IH1cbiAgICAgICAgX3ZtLnNlYXJjaHR4dCA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gIH0pLCBfdm0uX20oMSldKV0pXSksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiY29sLXhzLTEyXCJcbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibGlzdC1ncm91cFwiXG4gIH0sIFtfYygndHJhbnNpdGlvbi1ncm91cCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJuYW1lXCI6IFwiZmFkZVwiLFxuICAgICAgXCJtb2RlXCI6IFwib3V0LWluXCIsXG4gICAgICBcInRhZ1wiOiBcImRpdlwiXG4gICAgfVxuICB9LCBfdm0uX2woKF92bS5zbGlkZWxpc3QpLCBmdW5jdGlvbihpdG0pIHtcbiAgICByZXR1cm4gX2MoJ2RpdicsIHtcbiAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgICB2YWx1ZTogKF92bS5pc1NlYXJjaGVkKGl0bSkpLFxuICAgICAgICBleHByZXNzaW9uOiBcImlzU2VhcmNoZWQoaXRtKVwiXG4gICAgICB9XSxcbiAgICAgIGtleTogaXRtLl9pZCxcbiAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtZ3JvdXAtaXRlbVwiXG4gICAgfSwgW19jKCdyb3V0ZXItbGluaycsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcImltZy1mbGV4XCIsXG4gICAgICBhdHRyczoge1xuICAgICAgICBcInRvXCI6ICcvc2xpZGUvJyArIGl0bS5faWRcbiAgICAgIH1cbiAgICB9LCBbX2MoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcImltZy1mbGV4LWNvbnRhaW5lclwiXG4gICAgfSwgWyhpdG0ucGFnZXMubGVuZ3RoID4gMCAmJiBpdG0ucGFnZXNbMF0uYmcpID8gX2MoJ2ltZycsIHtcbiAgICAgIGNsYXNzOiBfdm0uYXV0b1dIQ2xhc3MoaXRtLnBhZ2VzWzBdLmJnLndpZHRoLCBpdG0ucGFnZXNbMF0uYmcuaGVpZ2h0KSxcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwic3JjXCI6IGl0bS5wYWdlc1swXS5iZy5zcmNcbiAgICAgIH1cbiAgICB9KSA6IF92bS5fZSgpXSldKSwgX2MoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRleHQtZmxleFwiXG4gICAgfSwgW19jKCdoNCcsIFtfdm0uX3YoXCLnsKHloLHlkI3nqLHvvJogXCIgKyBfdm0uX3MoaXRtLnNsaWRlbmFtZSkpXSksIF9jKCdoNScsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQtbXV0ZWRcIlxuICAgIH0sIFtfdm0uX3YoXCLmk4HmnInogIXvvJogXCIgKyBfdm0uX3MoaXRtLm93bmVyKSldKSwgX2MoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQtbXV0ZWRcIlxuICAgIH0sIFtfdm0uX3YoXCLmm7TmlrDmmYLplpPvvJogXCIgKyBfdm0uX3MoX3ZtLmZvcm1hdERhdGUoaXRtLmNkYXRlKSkpXSksIF9jKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LW11dGVkXCJcbiAgICB9LCBbX3ZtLl92KFwi5bu656uL5pmC6ZaT77yaIFwiICsgX3ZtLl9zKF92bS5mb3JtYXREYXRlKGl0bS5jcmVhdGVkYXRlKSkpXSksIF9jKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LW11dGVkXCJcbiAgICB9LCBbX3ZtLl92KFwiUGFnZVZpZXdz77yaXCIpLCBfYygnc3BhbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcImJhZGdlXCJcbiAgICB9LCBbX3ZtLl92KF92bS5fcyhpdG0ucHZpZXcgfHwgMCkpXSldKSwgX2MoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQtbXV0ZWRcIlxuICAgIH0sIFtfdm0uX3YoXCLkuIrmrKHooqvngI/opr3mmYLplpPvvJogXCIgKyBfdm0uX3MoX3ZtLmZvcm1hdERhdGUoaXRtLmxkYXRlKSkpXSldKV0sIDEpXG4gIH0pKV0sIDEpXSldKV0pXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygncCcsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LW11dGVkXCJcbiAgfSwgW192bS5fdihcIuacieS4u+S6uueahOewoeWgseWPquacieacrOS6uuaJjeWPr+S7peS/ruaUueWtmOaqlOOAglwiKSwgX2MoJ2JyJyksIF92bS5fdihcIuaykuacieS4u+S6uueahOewoeWgseWkp+WutumDveWPr+S7peS/ruaUueWtmOaqlOOAglwiKV0pXG59LGZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ3NwYW4nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXAtYnRuXCJcbiAgfSwgW19jKCdidXR0b24nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1mYWIgYnRuLWZhYi1taW5pXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiXG4gICAgfVxuICB9LCBbX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJmYSBmYS1zZWFyY2hcIlxuICB9KV0pXSlcbn1dfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci5qcz9pZD1kYXRhLXYtYzVjNzMzNGUhLi9+L3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWxvYWRlci5qcz9yYXcmZW5naW5lPXB1ZyEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vc3JjL3Z1ZS9hbGxzbGlkZXMudnVlXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwic291cmNlUm9vdCI6IiJ9')},45:function(module,exports,__webpack_require__){eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(36);\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar update = __webpack_require__(1)(\"85847588\", content, true);\n// Hot Module Replacement\nif(false) {\n // When the styles change, update the <style> tags\n if(!content.locals) {\n   module.hot.accept(\"!!./../../node_modules/css-loader/index.js?minimize!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c5c7334e&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./allslides.vue\", function() {\n     var newContent = require(\"!!./../../node_modules/css-loader/index.js?minimize!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c5c7334e&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./allslides.vue\");\n     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n     update(newContent);\n   });\n }\n // When the module is disposed, remove the <style> tags\n module.hot.dispose(function() { update(); });\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdnVlL2FsbHNsaWRlcy52dWU/NDZhMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDIiwiZmlsZSI6IjQ1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bWluaW1pemUhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LWM1YzczMzRlJnNjb3BlZD10cnVlIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9hbGxzbGlkZXMudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjg1ODQ3NTg4XCIsIGNvbnRlbnQsIHRydWUpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9taW5pbWl6ZSEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtYzVjNzMzNGUmc2NvcGVkPXRydWUhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2FsbHNsaWRlcy52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9taW5pbWl6ZSEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtYzVjNzMzNGUmc2NvcGVkPXRydWUhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2FsbHNsaWRlcy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtc3R5bGUtbG9hZGVyIS4vfi9jc3MtbG9hZGVyP21pbmltaXplIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtYzVjNzMzNGUmc2NvcGVkPXRydWUhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9zcmMvdnVlL2FsbHNsaWRlcy52dWVcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMiJdLCJzb3VyY2VSb290IjoiIn0=")}});