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
        var clientLang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
        if(clientLang == "ja"){
          setLang("ja");
        }else{
          setLang("en");
        }
        setLang("ja");
        $('#ja_button').click(function(){
          setLang("ja")
          $('#philosophyMainButton').show();
        });
        $('#en_button').click(function(){
          setLang("en")
          $('#philosophyMainButton').hide();
        });
    });

    function setLang(lang) {
        console.log('lang=' + lang);

        i18next.use(i18nextXHRBackend).init({
            backend: {
                loadPath: 'locales/{{lng}}/string.json'
            },
            debug: false,
            defaultLng: 'ja',
            fallbackLng: false,
            lng: lang,
        }, function (err, t) {
            jqueryI18next.init(i18next, $);
            $('[data-i18n]').localize();
        });
    }

})();
