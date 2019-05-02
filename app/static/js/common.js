global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
noUiSlider = require('nouislider'),
select2 = require('select2-browserify');


jQuery(document).ready(function($) {
  // Toggle search form
  var searchToggle = function() {
    $('.small-search__toggle').click(function(e) {
      e.preventDefault();
  
      var input = $('.small-search__form input');
      $('.small-search__form').toggleClass('is-active');
      setTimeout(function() {
        input.focus();
      }, 200);
    });
  
    $('.small-search__form button[type="submit"]').click(function(e) {
      e.preventDefault();
  
      var input = $('.small-search__form input');
  
      if (input.val() == '') {
        $('.small-search__form').toggleClass('is-active');
        setTimeout(function() {
          input.focus();
        }, 200);
      }
      else {
        $('.small-search__form').submit();
      }
    });
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