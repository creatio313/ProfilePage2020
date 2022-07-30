/**
 * ブラウザがIEである場合、Chromeのダウンロードサイトにリダイレクトさせる
 */
document.addEventListener('DOMContentLoaded', function(){
 /**
  * クライアントのブラウザを取得する
  * @type {String}
  */
 var userAgent = window.navigator.userAgent.toLowerCase();
 /**
  * ブラウザがIEである場合
  * @param  {String} userAgent 使用されているブラウザの文字列
  */
 if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
   //自ページを非表示にする
   document.body.style.display = 'none';
   //Chromeのダウンロードサイトにリダイレクトさせる
   location.href = 'https://www.google.co.jp/chrome/';
 }
}, false);

(function () {
    $(function () {
      /** 多言語対応 */
      var clientLang = "ja"
      /** Cookie読み取り */
      if(getCookie("lang")){
        clientLang = getCookie("lang");
      }else{
        clientLang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
      }
      /** 言語判定・設定 */
      if(clientLang.indexOf("ja") != -1){
        setLang("ja");
      }else{
        setLang("en");
      }

      /** 画面のフェードイン */
      $("body").fadeIn(700);

      /** ボタンクリック時に言語を変更する */
      $('#ja_button').on('click',(function(){
        document.cookie = "lang=ja";
        setLang("ja");
        $('#philosophyMainButton').show();
      }));
      $('#en_button').on('click',(function(){
        document.cookie = "lang=en";
        setLang("en")
        $('#philosophyMainButton').hide();
      }));
    });

    /** 言語変換関数 */
    function setLang(lang) {

      i18next.use(i18nextXHRBackend).init({
        backend:{loadPath: 'locales/{{lng}}/string.json'},
        debug: false,
        defaultLng: 'ja',
        fallbackLng: false,
        lng: lang,
      }, function (err, t) {
        jqueryI18next.init(i18next, $);
        $('[data-i18n]').localize();
      });
    }
    /** Cookie取得関数 */
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
})();
