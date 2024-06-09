jQuery(document).ready(function($) {
    'use strict';

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    window.addEventListener('scroll', function() {
        var fixedNavBar = $('#fixed-navbar'),
            nav = $('.nav-sticky-top'),
            btn = $('.btn-nav');
        if (window.scrollY > 50) {
            fixedNavBar.addClass('sticky-top bg-white shadow slideInDown');
            nav.removeClass('nav-white');
            btn.removeClass('btn-white').addClass('btn-outline-primary');
        } else {
            fixedNavBar.removeClass('bg-white shadow slideInDown');
            nav.addClass('nav-white');
            btn.addClass('btn-white').removeClass('btn-outline-primary');
        }
    });

    /*=============================
        [01. Carousel]
    ===============================*/

    // carousel Show 1 item.
    $('.carousel-slider-1-items').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='bi bi-chevron-left'></i></button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='bi bi-chevron-right'></i></button>",
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    // carousel Show 2 item.
    $('.carousel-slider-2-items').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='bi bi-chevron-left'></i></button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='bi bi-chevron-right'></i></button>",
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    // carousel Show 3 item.
    $('.carousel-slider-3-items').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='bi bi-chevron-left'></i></button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='bi bi-chevron-right'></i></button>",
        responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    // carousel Show 4 item.
    $('.carousel-slider-4-items').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='bi bi-chevron-left'></i></button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='bi bi-chevron-right'></i></button>",
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    // carousel Show 5 item.
    $('.carousel-slider-5-items').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='bi bi-chevron-left'></i></button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='bi bi-chevron-right'></i></button>",
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // carousel Show 6 item.
    $('.carousel-slider-6-items').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='bi bi-chevron-left'></i></button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='bi bi-chevron-right'></i></button>",
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Single Prod
    // $('.carousel-slider-single').slick({
    //     dots: true,
    //     infinite: true,
    //     speed: 1000,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='bi bi-arrow-left'></i></button>",
    //     nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='bi bi-arrow-right'></i></button>",
    //     fade: true,
    //     asNavFor: '.carousel-slider-nav'
    // });

    // $('.carousel-slider-nav').slick({
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     asNavFor: '.carousel-slider-single',
    //     infinite: true,
    //     speed: 1000,
    //     prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='bi bi-arrow-left'></i></button>",
    //     nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='bi bi-arrow-right'></i></button>",
    //     dots: true,
    //     centerMode: true,
    //     focusOnSelect: true
    // });

    /*=================================
        [02. Home Slider & Animations]
    ===================================*/
    $('#home-slider-01').slick({
        autoplay: true,
        autoplaySpeed: 10000,
        dots: false,
        fade: true,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='bi bi-chevron-left'></i></button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='bi bi-chevron-right'></i></button>",
    });

    $('#home-slider-01').on('init', function(e, slick) {
        var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
    });

    $('#home-slider-01').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('div.slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
    });

    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    }

    $('.single-product-carousel-vertical').slick({
        slidesToShow: 1,
        arrows: false,
        asNavFor: '.silder-vertical-nav',
        // vertical: true,
        autoplay: false,
        // verticalSwiping: true,
        // centerMode: false
    });

    $('.silder-vertical-nav').slick({
        slidesToShow: 4,
        asNavFor: '.single-product-carousel-vertical',
        vertical: true,
        focusOnSelect: true,
        autoplay: false,
        arrows: false,
        verticalSwiping: true,
        centerMode: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.single-product-carousel-horizontal').slick({
        slidesToShow: 1,
        arrows: false,
        asNavFor: '.silder-horizontal-nav',
        autoplay: false
    });

    $('.silder-horizontal-nav').slick({
        slidesToShow: 4,
        asNavFor: '.single-product-carousel-horizontal',
        focusOnSelect: true,
        autoplay: false,
        arrows: false,
        centerMode: true
    });

    /*=============================
        [03. Header]
    ===============================*/
    $(document).on('click', '.toggle-menu, .close-menu', function() {
        $('.main-nav-d, .navbar-mobile').toggle();
    });

    $(document).on('click', '.btn-categories-toggle', function() {
        $('.categories-dropdown').slideToggle();
    });

    /*=============================
        [04. Cart]
    ===============================*/
    $(document).on('click', '.btn-cart-offcanvas', function(e) {
        e.preventDefault();

        $('.cart-offcanvas').addClass('show');
        $('.cart-ovelay').fadeIn();
    });

    $(document).on('click', '.close-cart-offcanvas, .cart-ovelay', function(e) {
        e.preventDefault();

        $('.cart-offcanvas').removeClass('show');
        $('.cart-ovelay').fadeOut();
    });

    $(document).on('click', '.btn-mins', function() {
        var input = $(this).parent().find('.form-control'),
            oldVal = Number(input.val());

        if (input.val() > 1) {
            input.val(oldVal - 1)
        }
        console.log(input.val())
    });

    $(document).on('click', '.btn-plus', function() {
        var input = $(this).parent().find('.form-control'),
            oldVal = Number(input.val());

        input.val(oldVal + 1)

        console.log(input.val())
    });

    $(document).on('click', '.calc-shipping-btn', function(e) {
        $('.calculate-shipping').toggle();
        e.preventDefault();
    });

    /*=============================
        [05. Helper]
    ===============================*/

    $(document).on('click', '.lc-btn-toggle', function(e) {
        // e.preventDefault();
        var toggleDiv = $(this).data('lc-toggle');

        $(toggleDiv).slideToggle();
    });

    $(document).on('click', '.lc-btn-accordion', function(e) {
        // e.preventDefault();
        var toggleDiv = $(this).data('accordion-content')
        parent = $(this).data('lc-accordion-parent');

        $(parent).find('.lc-accordion-content').slideUp();
        $(toggleDiv).slideDown();
    });

    setInterval(function() {
            $(".recent-purchase").toggleClass('show');
        },
        10000
    );

    $(document).on('click', '.purchase-close', function() {
        $(".recent-purchase").removeClass('show');
    });

    $(document).on('click', '.custom-order', function() {
        var tabID = $(this).data('bs-target');

        $('[data-bs-target]').removeClass('active');
        $("[data-bs-target='" + tabID + "']").addClass('active');

        $('.tab-pane').removeClass('show active');
        $(tabID).addClass('active show');
    });

    $(document).on('change', '.password-checkbox', function() {
        $('.change-password').toggleClass('hidden');
    });

    $(document).on('click', '.mobile-menu .nav-link', function(e) {
        e.preventDefault();
        var btn = $(this);

        btn.find('.arrow').toggleClass('rotate-90');
        btn.next('ul').slideToggle();
    });

    /*=============================
        [06. Plugins]
    ===============================*/

    var nonLinearStepSlider = document.getElementById('price-slider');

    if (nonLinearStepSlider) {

        noUiSlider.create(nonLinearStepSlider, {
            start: [0, 4000],
            step: 1,
            range: {
                'min': [0],
                // '10%': [500, 500],
                // '50%': [4000, 1000],
                'max': [10000]
            }
        });

        var nonLinearStepSliderValueElement = document.getElementById('slider-non-linear-step-value');

        nonLinearStepSlider.noUiSlider.on('update', function(values) {
            nonLinearStepSliderValueElement.innerHTML = values.join(' - ');
        });
    }

    $('.slider-zoom').zoom();

});

window.onload = function() {
    //hide the preloader
    var perloader = $(".perloader-wrapper");
    if (perloader.length > 0) {

        document.querySelector(".perloader-wrapper").style.display = "none";
    }
}