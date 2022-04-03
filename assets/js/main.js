var html = $('html');
var body = $('body');

$(function () {
    'use strict';
    tagFeed();
    parallax();
    loadMore();
    video();
    offCanvas();
});

var lastScrollY = 0;
var ticking = false;

function update() {
    if ((window.innerHeight + window.scrollY + 50) >= document.body.offsetHeight) {
        body.addClass('portal-hidden');
    } else {
        body.removeClass('portal-hidden');
    }

    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
    }
}

function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
}

window.addEventListener('scroll', onScroll, false);

function tagFeed() {
    'use strict';
    var count = $('.tag-feed').attr('data-count');

    $('.tag-feed').owlCarousel({
        dots: false,
        nav: true,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: count > 1 ? 2 : count,
            },
            1200: {
                items: count > 2 ? 3 : count,
            },
            1920: {
                items: count > 3 ? 4 : count,
            },
            2560: {
                items: count > 4 ? 5 : count,
            },
        }
    });
}

function parallax() {
    var image = $('.jarallax-img');
    if (!image) return;

    var options = {
        disableParallax: /iPad|iPhone|iPod|Android/,
        disableVideo: /iPad|iPhone|iPod|Android/,
        speed: 0.1,
    };

    image.imagesLoaded(function () {
        image.parent().jarallax(options).addClass('initialized');
    });
}

function loadMore() {
    'use strict';
    var wrapper = $('.post-feed');
    var button = $('.pagination');
    var content, link, page;

    button.on('click', function () {
        $.get($(this).attr('data-url'), function (data) {
            content = $(data).find('.post-feed > *');
            link = $(data).find('.pagination').attr('data-url');
            page = $(data).find('.page-number').text();

            wrapper.append(content);

            button.attr('data-url', link);
            button.find('.page-number').text(page);

            if (link) {
                button.attr('data-url', link);
            } else {
                button.remove();
            }
        });
    });
}

function video() {
    'use strict';
    $('.post-content').fitVids();
}

function offCanvas() {
    'use strict';
    var burger = jQuery('.burger');
    var canvasClose = jQuery('.canvas-close');

    burger.on('click', function () {
        html.toggleClass('canvas-opened');
        html.addClass('canvas-visible');
        dimmer('open', 'medium');
    });

    canvasClose.on('click', function () {
        if (html.hasClass('canvas-opened')) {
            html.removeClass('canvas-opened');
            dimmer('close', 'medium');
        }
    });

    jQuery('.dimmer').on('click', function () {
        if (html.hasClass('canvas-opened')) {
            html.removeClass('canvas-opened');
            dimmer('close', 'medium');
        }
    });

    jQuery(document).keyup(function (e) {
        if (e.keyCode == 27 && html.hasClass('canvas-opened')) {
            html.removeClass('canvas-opened');
            dimmer('close', 'medium');
        }
    });
}

function dimmer(action, speed) {
    'use strict';
    var dimmer = jQuery('.dimmer');

    switch (action) {
        case 'open':
            dimmer.fadeIn(speed);
            break;
        case 'close':
            dimmer.fadeOut(speed);
            break;
    }
}
