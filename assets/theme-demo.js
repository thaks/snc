$(document).ready(function() {
  
  function roarThemeDemoInit() {
    if (document.cookie.match(/^(.*;)?\s*roarStorage_themedemo\s*=\s*[^;]+(.*)?$/)) {
      return;
    }
    
    $(window).load(function(evt) {
      setTimeout(function() {
        $('.roar_themedemo-wrapper').addClass('active');
      }, 3000);
    });
  }
  roarThemeDemoInit();
  
  $('.roar_themedemo-icon').on('click', function() {
    $('.roar_themedemo-wrapper').toggleClass('active');
    
    if (document.cookie.match(/^(.*;)?\s*roarStorage_themedemo\s*=\s*[^;]+(.*)?$/)) {
      return;
    }
    
    var date = new Date(),
        value = date.getTime();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    document.cookie = 'roarStorage_themedemo=' + value + ';expires=' + date.toGMTString() + ';path=/';
  });
  $('.roar_themedemo-box').on('click', function(evt) {
    var $this = $(this);
    var $html = $('html');
    var $box = $('.roar_themedemo-box');
    
    if (!$this.hasClass('active')) {
      $box.removeClass('active');
      $this.addClass('active');
      $html.toggleClass('is-boxed');
      
      /*
      if ($this.hasClass('boxed')) {
        $('.roar_themedemo-boxed').removeClass('hide');
      }
      else {
        $('.roar_themedemo-boxed').addClass('hide');
      }
      */
    }
  });
  $('.roar_themedemo-rtl').on('click', function(evt) {
    var $this = $(this);
    var $body = $('body');
    var cssUrl = theme.settings.rtlCss;
    
    if ($this.hasClass('active')) {
      $this.removeClass('active');
      $body.removeClass('is-rtl');
      $('link[href*="theme-rtl.scss.css"]').remove();
    }
    else {
      $this.addClass('active');
      $body.addClass('is-rtl');
      $('head').append(cssUrl);
    }
  });
  $('.roar_themedemo-menu').on('click', function(evt) {
    var $this = $(this);
    var $header_sticky = $('.header-sticky__placeholder');
    
    if ($this.hasClass('active')) {
      $this.removeClass('active');
      $header_sticky.addClass('hide');
    }
    else {
      $this.addClass('active');
      $header_sticky.removeClass('hide');
    }
  });
});