// <!--start script slider-->

$(document).ready(function () {

    //Owl Home page banner
    var owl = $('.outer-div .owl-carousel').owlCarousel({
        items: 1,
        dots: true,
        loop: true,
        center: true,
        navigation: false,
        dotsContainer: "#topBannerDotts",
        autoplayHoverPause: true,
        autoplay: true,
        autoplayTimeout: 6000,
        responsiveClass: true,
        responsive: {
            991: {
                dots: true
            }
        },
        startPosition: randomPosition()

    });
    $('.owl-dot').click(function () {
        owl.trigger('to.owl.carousel', [$(this).index(), 300]);
    });

    //Random index generator

    function randomPosition() {
        var r_hb = $('#topBannerDotts h5').length;
        var randomize = null;

        randomize = 1

        if (randomize != 0) {
            return (Math.floor(Math.random() * r_hb));
        } else {
            return 0;
        }
    }

    //Sort random function
    function random(owlSelector) {
        owlSelector.children().sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).each(function () {
            $(this).appendTo(owlSelector);
        });
    }

    $("#store-entry").owlCarousel({
        navigation: true,
        pagination: false,
        items: 6,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 3,
            },
            767: {
                items: 4,
            },
            979: {
                items: 6,
            }
        },

        navigationText: [
            " ",
            " "
        ],
        beforeInit: function (elem) {
            random(elem);
        }
    });
});

// <!--end script slider-->
