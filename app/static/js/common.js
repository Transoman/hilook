global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody');


jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('open');
  });

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