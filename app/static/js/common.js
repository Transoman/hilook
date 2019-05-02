global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody');


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