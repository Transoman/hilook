global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
noUiSlider = require('nouislider'),
select2 = require('select2-browserify');


jQuery(document).ready(function($) {
  // Toggle search form
  var searchToggle = function() {

    var searchForm = $('.small-search__form');
    var searchInput = searchForm.find('input');
    var searchSubmitBtn = searchForm.find('button[type="submit"]');
    var matchWidth = window.matchMedia('(max-width: 1259px)');

    var mediaChecker = function() {
      if (matchWidth.matches) {
        toggle();
      }
      else {
        searchForm.removeClass('is-active');
      }
    }

    var toggle = function() {
      $('.small-search__toggle').click(function(e) {
        e.preventDefault();

        if (searchForm.hasClass('is-active')) {
          searchForm.removeClass('is-active');
        }
        else {
          searchForm.addClass('is-active');
          setTimeout(function() {
            searchInput.focus();
          }, 200);
        }

      });

      searchSubmitBtn.click(function(e) {
        e.preventDefault();

        if (searchInput.val() == '') {
          searchForm.removeClass('is-active');
          setTimeout(function() {
            searchInput.focus();
          }, 200);
        }
        else {
          searchForm.submit();
        }
      });
    }

    matchWidth.addListener(mediaChecker);
    mediaChecker();

  };

  searchToggle();

  // Toggle mobile menu
  var menuToggle = function() {

    $('.nav-toggle').on('click', function (e) {
      e.preventDefault();
      $('.mobile-menu').addClass('is-active');
      $('.mobile-menu-overlay').addClass('is-active');
    });

    $('.mobile-menu__close').click(function(e) {
      e.preventDefault();
      $('.mobile-menu').removeClass('is-active');
      $('.mobile-menu-overlay').removeClass('is-active');
    });

    $('.mobile-menu-overlay').click(function(e) {
      e.preventDefault();
      $('.mobile-menu').removeClass('is-active');
      $('.mobile-menu-overlay').removeClass('is-active');
    });

    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        $('.mobile-menu').removeClass('is-active');
        $('.mobile-menu-overlay').removeClass('is-active');
      }
    };
  };

  menuToggle();

  // Price range
  var priceRange = function() {
    var range = document.querySelector('.filter__price-range');

    if (range) {
      var minInput = document.querySelector('.filter__input-price--from');
      var maxInput = document.querySelector('.filter__input-price--to');
      var minPrice =  parseInt(minInput.getAttribute('min'));
      var maxPrice = parseInt(maxInput.getAttribute('max'));
      noUiSlider.create(range, {
        range: {
          'min': minPrice,
          'max': maxPrice
        },
        start: [minPrice, maxPrice],
        connect: true,
        pips: {
          mode: 'range',
          density: 100
        }
      });

      range.noUiSlider.on('update', function(values) {
        minInput.value = Math.floor(values[0]);
        maxInput.value = Math.floor(values[1]);
      });

      minInput.addEventListener('change', function() {
        range.noUiSlider.set([this.value, null]);
      });

      maxInput.addEventListener('change', function() {
        range.noUiSlider.set([null, this.value]);
      });
    }
  };

  priceRange();

  $('.select2').select2();

  var sidebarToggle = function() {
    var btnOpen = $('.sidebar-open');
    var btnClose = $('.sidebar__close');
    var sidebar = $('.sidebar');

    btnOpen.click(function(e) {
      e.preventDefault();
      sidebar.addClass('is-active');
    });

    btnClose.click(function(e) {
      e.preventDefault();
      sidebar.removeClass('is-active');
    });

    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        sidebar.removeClass('is-active');
      }
    };
  }

  sidebarToggle();

  var showSidebarToggle = function () {
    var sidebarBtn = $('.sidebar-open');
    if ($('.catalog-menu').length) {
      $(window).scroll(function() {
        if ($(this).scrollTop() > $('.catalog-menu').offset().top - 200) {
          sidebarBtn.addClass('is-active');
        } else {
          sidebarBtn.removeClass('is-active');
        }
        // if ($(this).scrollTop() > $('.newsletter').offset().top - 800) {
        //     sidebarBtn.addClass('invisible');
        // } else {
        //     sidebarBtn.removeClass('invisible');
        // }
      });
    }
  }
  showSidebarToggle();
  $(window).bind('resize', function() {
    showSidebarToggle();
  });

  // Modal
  // $('.modal').popup({
  //   transition: 'all 0.3s',
  //   onclose: function() {
  //     $(this).find('label.error').remove();
  //   }
  // });

  // SVG
  svg4everybody({});

});