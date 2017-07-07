function BtnLoading(target, bol) {
  if (bol) {
    $(target).addClass('disabled').append("<i class='fa fa-circle-o-notch fa-spin' style='margin-left:5px'></i>");
  } else {
    $(target).removeClass('disabled').children('i.fa-spin').remove();
  }
}
window.BtnLoading = BtnLoading;

const ContextMenu = {
  onContextmenu(e) {
    e.preventDefault();
    $('.context_menu .dropdown-menu').hide();
    $('.context_menu').css({
      left: e.pageX, top: e.pageY,
    }).show();
  },
  onDocumentClick() {
    $('.context_menu').hide();
  },
  init() {
    $('.context_menu li').on('mouseenter', (e) => {
      const target = $(e.currentTarget);
      target.parent().children('.dropdown-menu').hide();
      const sub = target.children('a').attr('data-target');
      if (sub) {
        $(sub).css({
          left: target.width() - 5, top: target.position().top - 10,
        }).show();
      }
    }).on('click', (e) => {
      const target = $(e.currentTarget);
      if (target.hasClass('disabled')) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  },
  on() {
    $(document).on('contextmenu', this.onContextmenu)
      .on('click', this.onDocumentClick);
  },
  off() {
    $(document).off('contextmenu', this.onContextmenu)
      .off('click', this.onDocumentClick);
  },
};
window.ContextMenu = ContextMenu;

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  $.ajax({
    url: '/bulletscreen/api/signout',
  }).done(() => {
    auth2.signOut().then(() => {
      window.location.href = '/bulletscreen';
    });
  });
}
window.signOut = signOut;

function checkRenderButton() {
  if ($('.abcRioButton').css('width')) {
    $('.abcRioButton').css('width', '100%');
  } else {
    setTimeout(checkRenderButton, 30);
  }
}
function onFailure(error) {
  if (error.error === 'popup_closed_by_user') { return; }
  swal(
    '登入錯誤...',
    error.reason,
    'error',
    );
}
function onSignIn(googleUser) {
  const idToken = googleUser.getAuthResponse().id_token;
  swal({
    title: 'Please Wait',
    text: '登入驗證中',
    type: 'info',
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  const request = $.ajax({
    url: '/bulletscreen/api/auth',
    method: 'GET',
    data: {
      t: idToken,
    },
    dataType: 'json',
  });
  request.done((msg) => {
    const app = window.app;
    if (msg.status === 'OK') {
      swal.close();
      if (Cookies.get('f')) {
        app.$router.push(Cookies.get('f'));
        Cookies.remove('f');
      } else {
        app.$router.push('/my');
      }
    } else {
      swal({
        title: 'Oops...',
        text: msg.message,
        type: 'error',
        allowOutsideClick: false,
      });
    }
  });
}

function renderButton() {
  try {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email openid',
      height: 37,
      longtitle: true,
      onsuccess: onSignIn,
      onfailure: onFailure,
    });
  } catch (e) {
    setTimeout(renderButton, 30);
    return 0;
  }
  setTimeout(checkRenderButton, 30);
  return 1;
}
window.renderButton = renderButton;

function onReady() {
  $.material.init();
  gapi.load('auth2', () => {
    gapi.auth2.init({
      client_id: '198094167552-efpmn3jjatrhjkcf2vo3bf13p7toq1rh.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
    }).then(() => {
      if (window.location.href.indexOf('/logout') > 0) {
        signOut();
      }
    });
  });
  ContextMenu.init();
}
$(onReady);

const ascii = `
                       :|
                   ◎   :|
                   々  :|
                       :|
                   ＿＿ノ
                    | |   
                    ヽ二二 ヽ -―- ､ 
                   ＿____／ ／"￣ヽヽ＿＿＿＿   
                        /  /     | |       
                       |  |／⌒彡 | |
                      .＼ヽ冫、 ）＿ ＼＼ 
                        .＼＼:::::::: ＼＼       
    ∧＿∧                   .＼＼:::::::: ＼＼     
 （ ；´∀｀）   ／￣￣￣￣       ＼＼:::::::: ＼ヽ      
 （       ） ＜ 看什麼看啦..      ＼＼_:::::＿） ）      
  ｜  ｜  |    ＼＿＿＿＿            ヽ-二二-―'       
  （_＿）＿）
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`;
console.log(ascii);
