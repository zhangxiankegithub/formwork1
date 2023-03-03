(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            window.clientWidth = docEl.clientWidth;
            window.clientHeight = docEl.clientHeight;
            if (!window.clientWidth) return;
            var aspectRatio = window.clientWidth / window.clientHeight;
            
            if (aspectRatio > 1920 / (!window.screenRatio?1080:1440)) {
                docEl.style.fontSize = 100 * (window.clientHeight / (!window.screenRatio?1080:1440)) + 'px';
                window.base = 100 * (window.clientHeight / (!window.screenRatio?1080:1440));
                
            } else {
                docEl.style.fontSize = 100 * (window.clientWidth / 1920) + 'px';
                window.base = 100 * (window.clientWidth / 1920);
                if (window.location.href.indexOf('edit') > -1) {
                    docEl.style.fontSize = 100 * ((window.clientWidth - 340) / 1920) + 'px';
                    window.base = 100 * ((window.clientWidth - 340) / 1920);
                }
            }
            
            var isMobile = {
                Android: function () {
                    return navigator.userAgent.match(/Android/i) ? true : false;
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i) ? true : false;
                },
                any: function () {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
                }
            };
        };
    try {
        recalc();
    } catch (e) {
    }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window);

