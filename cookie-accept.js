jQuery(document).ready(function(){
    let cookieAcceptedName = 'cookie-accept';
    let cookieAcceptedText = 'Используя данный сайт, вы даете согласие на использование файлов cookie, помогающих нам сделать его удобнее для вас';
    let cookieAcceptedBtn = 'Принять';

    const cookieDoc = {
        get: (name) => {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        },
        set: (name, value) => {
            document.cookie = name + '=' + encodeURIComponent(value) + '; path=/';
        },
        destroy: (name) => {
            cookieDoc.set(name, "", {
                'max-age': -1
            })
        }
    };

    function testCookie(){
        let cookieAccept = cookieDoc.get(cookieAcceptedName);
        if(!cookieAccept || typeof cookieAccept == "undefined"){
            let style = '',
                html = '';

            // HTML block
            html += '<div class="cookieAccepted">';
            html += '<div class="cookieAcceptedContent">';
            html += '<div class="message">' + cookieAcceptedText + '</div>';
            html += '<div class="btn btnAcceptCookie">' + cookieAcceptedBtn + '</div>';
            html += '</div>';
            html += '</div>';

            // STYLE var
            style += '.cookieAccepted{ position: fixed; width: 100%; bottom: 0; padding: 30px; background-color: #000; z-index: 10000; transition: 0.3s; }',
            style += '.cookieAccepted .cookieAcceptedContent{ margin: 0 auto; max-width: 998px; display: flex; align-items: center; justify-content: space-between; column-gap: 30px; }',
            style += '.cookieAccepted .message{ font-size: 1.3em; color: #fff; }',
            style += '.cookieAccepted .btn{ margin: 0; width: 100%; max-width: 230px; }',

            // STYLE media
            style += '@media (max-width: 567px){',
            style += '.cookieAccepted .cookieAcceptedContent{ display: block; }',
            style += '.cookieAccepted .message{ text-align: center; }',
            style += '.cookieAccepted .btn{ margin: 30px auto 0; }',
            style += '}',

            // STYLE block
            style = '<style>' + style + '</style>',

            jQuery('BODY').append(html);
            jQuery('BODY').append(style);
        } else {
            console.log('User cookie accepted');
        }
    }

    testCookie();

    jQuery('.btnAcceptCookie').on('click', function(e){
        cookieDoc.set(cookieAcceptedName, 1);

        jQuery('.cookieAccepted').animate({
            opacity: 0
        }, 500, function() {
            jQuery("#cookieAccepted").hide();
            jQuery('.cookieAccepted').remove();
        });

        return false;
    });

});
