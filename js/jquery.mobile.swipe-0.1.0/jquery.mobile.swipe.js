(function($) {
    $.widget('mobile.swipe', $.mobile.widget, {
        options: {
            startSlide: 0,
            speed: 300,
            auto: null,
            continuous: true,
            disableScroll: false,
            stopPropagation: false
        },

        styles: {
            swipe: {
                'overflow': 'hidden',
                'visibility': 'hidden',
                'position': 'relative'
            },
            swipeWrap: {
                'overflow': 'hidden',
                'position': 'relative'
            },
            div: {
                'float': 'left',
                'width': '100%',
                'position': 'relative'
            },
        },

        _create: function() {
            var _options = this.options;
            var $elem = this.element;
            var $wrap = $('<div class="swipe-wrap"></div>').css(this.styles.swipeWrap);
            $elem.addClass('swipe').css(this.styles.swipe);
            $elem.children().css(this.styles.div).wrapAll($wrap);
            $elem.closest('[data-role="page"]').on('pageshow', function() {
                Swipe($elem[0], _options);
            });
        },

        _init: function() {
        },
    });
}(jQuery));
