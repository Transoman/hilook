global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
noUiSlider = require('nouislider'),
popup = require('jquery-popup-overlay'),
Imask = require('imask'),
select2 = require('select2-browserify'),
Swiper = require('swiper'),
fancybox = require('@fancyapps/fancybox');


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
        if ($(this).scrollTop() > $('.question, .footer').offset().top - 600) {
            sidebarBtn.addClass('invisible');
        } else {
            sidebarBtn.removeClass('invisible');
        }
      });
    }
  }
  showSidebarToggle();
  $(window).bind('resize', function() {
    showSidebarToggle();
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // SVG
  svg4everybody({});

  function new_map( $el ) {

    // var
    var $markers = $el.find('.marker');


    // vars
    var args = {
      zoom		: 16,
      center		: new google.maps.LatLng(0, 0),
      mapTypeId	: google.maps.MapTypeId.ROADMAP,
      // disableDefaultUI: true,
      styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    };

    // create map
    var map = new google.maps.Map( $el[0], args);


    // add a markers reference
    map.markers = [];


    // add markers
    $markers.each(function(){

      add_marker( $(this), map );

    });
    // center map
    center_map( map );

    // return
    return map;

  }

  function createPopupClass() {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content The bubble div.
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    function Popup(position, content) {
      this.position = position;
  
      content.classList.add('popup-bubble');
  
      // This zero-height div is positioned at the bottom of the bubble.
      var bubbleAnchor = document.createElement('div');
      bubbleAnchor.classList.add('popup-bubble-anchor');
      bubbleAnchor.appendChild(content);
  
      // This zero-height div is positioned at the bottom of the tip.
      this.containerDiv = document.createElement('div');
      this.containerDiv.classList.add('popup-container');
      this.containerDiv.appendChild(bubbleAnchor);
  
      // Optionally stop clicks, etc., from bubbling up to the map.
      google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }
    // ES5 magic to extend google.maps.OverlayView.
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);
  
    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    };
  
    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    };
  
    /** Called each frame when the popup needs to draw itself. */
    Popup.prototype.draw = function() {
      var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
  
      // Hide the popup when it is far out of view.
      var display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
          'block' :
          'none';
  
      if (display === 'block') {
        this.containerDiv.style.left = divPosition.x + 'px';
        this.containerDiv.style.top = divPosition.y + 'px';
      }
      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    };
  
    return Popup;
  }

  /*
  *  add_marker
  *
  *  This function will add a marker to the selected Google Map
  *
  *  @type	function
  *  @date	8/11/2013
  *  @since	4.3.0
  *
  *  @param	$marker (jQuery element)
  *  @param	map (Google Map object)
  *  @return	n/a
  */

  function add_marker( $marker, map ) {

    // var
    var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

    // create marker
    var marker = new google.maps.Marker({
      position	: latlng,
      map			: map,
    });

    var Popup = createPopupClass();
    var popup = new Popup(
      latlng,
      document.querySelector('.map-content'));
    popup.setMap(map);

    // add to array
    map.markers.push( marker );

    // if marker contains HTML, add it to an infoWindow
    if( $marker.html() )
    {
      // create info window
      var infowindow = new google.maps.InfoWindow({
        content		: $marker.html()
      });

      // show info window when marker is clicked
      google.maps.event.addListener(marker, 'click', function() {

        infowindow.open( map, marker );

      });
    }

  }

  /*
  *  center_map
  *
  *  This function will center the map, showing all markers attached to this map
  *
  *  @type	function
  *  @date	8/11/2013
  *  @since	4.3.0
  *
  *  @param	map (Google Map object)
  *  @return	n/a
  */

  function center_map( map ) {

    // vars
    var bounds = new google.maps.LatLngBounds();

    // loop through all markers and create bounds
    $.each( map.markers, function( i, marker ){

      var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

      bounds.extend( latlng );

    });

    // only 1 marker?
    if( map.markers.length == 1 )
    {
      // set center of map
      map.setCenter( bounds.getCenter() );
      map.setZoom( 14 );
    }
    else
    {
      // fit to bounds
      map.fitBounds( bounds );
    }

  }
  var map = null;

  $('.map').each(function() {
    map = new_map( $(this) );
  });

  var inputMask = function() {
    var inputs = $('input[type="tel"]');
    var maskOptions = {
      mask: '+{7} (000) 000-00-00'
    };

    if (inputs.length) {
      inputs.each(function(i, el) {
        new IMask(el, maskOptions);
      });
    }
    
  };

  inputMask();

  var getProductName = function() {
    var productName;
    $('.product-order_open').click(function() {
      productName = $(this).parents('.product-card').find('.product-card__title').text();
      $('#product-order input[name="product_name"]').val(productName);
    });
  };

  getProductName();

  $('.ajax-form').submit(function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    ajaxSend($('.ajax-form'), data);
  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

  // Sliders
  var productGallery = function() {
    var productThumbItem = $('.product-thumb-slider__item');

    var productThumbSlider = new Swiper('.product-thumb-slider', {
      slidesPerView: 4,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        992: {
          slidesPerView: 5,
          spaceBetween: 30
        },
        767: {
          slidesPerView: 4,
          spaceBetween: 30
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });

    var productSlider = new Swiper('.product-slider', {
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    });

    productThumbItem.click(function(e) {
      var activeIndex = productThumbSlider.clickedIndex;
      productSlider.slideTo(activeIndex);
      productThumbItem.removeClass('active');
      $(this).addClass('active');
    });

    productSlider.on('slideChange', function() {
      var currentItem = productSlider.activeIndex;
      productThumbItem.removeClass('active');
      productThumbSlider.slideTo(currentItem);
      $(productThumbSlider.$wrapperEl).children().eq(currentItem).addClass('active');
    });

    $().fancybox({
      selector : '[data-fancybox="gallery"]',
      thumbs   : false,
      hash     : false,
      loop: true,
      beforeClose : function(instance) {
        if ($('.product-slider').length) {
          productSlider.slideTo( instance.currIndex);
        }
      }
    });
  }

  productGallery();

});