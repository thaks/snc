window.theme = window.theme || {};
theme.roarAdminJs = (function() {
  var is_editor = isEditor();
  
  function isEditor() {
    return (window !== window.parent && window.top.location.pathname.indexOf('/admin') >= 0 && window.top.location.pathname.indexOf('/editor') >= 0) ? true : false;
  }
  
  function themeActions() {
    var $document = $(top.document);
    var $actions = $document.find('.te-panel__footer .ui-action-list').first();

    if ($actions.find('li .roaradmin-theme_help').length == 0 ) {
      $actions.prepend('<li class="theme-editor-action-list__item--separator"></li>');
      $actions.prepend('<li class="ui-action-list__item"><a href="https://roartheme.ticksy.com/" class="ui-action-list-action roaradmin-theme_help" rel="noopener noreferrer" target="_blank"><span class="ui-action-list-action__text">Expert theme help</span></a></li>');
    }
  }
  
  function styleSheet() {
    var $document = $(top.document);
    
    if (!$document.find('#roar-admin-stylesheet').length) {
      $document.find('head').first().append('<style id="roar-admin-stylesheet" type="text/css">.theme-setting--wrapper{position:relative}.theme-setting--wrapper:before{content:"";position:absolute;top:0;left:0;bottom:0;border-left:3px solid #5c6ac4;border-radius:50px 0 0 50px}.theme-setting--wrapper .theme-setting--wrapper:before{display:none}.next-card__section .theme-setting--wrapper:before,.theme-editor-action-list .theme-setting--wrapper:before{left:-20px}.theme-setting--inner{margin-top:15px}.theme-setting--group .next-card__header{padding-bottom:20px}.theme-setting--group .next-card__header+.theme-setting--inner{margin-top:0}.theme-setting--group .next-card__header+.theme-setting--inner .next-card__section{padding-top:0}.theme-setting--group .theme-setting--header .ui-subheading{position:relative;cursor:pointer}.theme-setting--group.theme-setting--off .next-card__header{padding-bottom:1.6rem}.theme-setting--group>.theme-setting--inner{display:none}.theme-setting--on>.theme-setting--inner{display:block}.theme-setting--group .theme-setting--header .ui-subheading:after{content:"";position:absolute;right:0;top:50%;margin-top:-3px;border-left:3px solid transparent;border-right:3px solid transparent;border-top:6px solid}.theme-setting--group.theme-setting--on .theme-setting--header .ui-subheading:after{transform:rotate(180deg)}.theme-editor-action-list .theme-setting--group{margin:40px 0 20px}.theme-editor-action-list .theme-setting--group:after{content:"";position:absolute;top:-20px;left:-20px;right:-20px;border-top:1px solid #ebeef0}.theme-setting--off>.theme-setting--true{display:none}.theme-setting--off>.theme-setting--false{display:block}.theme-setting--on>.theme-setting--true{display:block}.theme-setting--on>.theme-setting--false{display:none}</style>');
    }
  }
  
  function triggerChange($input) {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    
    if (typeof MutationObserver == 'undefined') {
      return false;
    }

    var trackChange = function(element) {
      var observer = new MutationObserver(function(mutations, observer) {
        if(mutations[0].attributeName == "value") {
          $(element).trigger("change");
        }
      });
      observer.observe(element, {
        attributes: true
      });
    }

    trackChange($input[0]);
  }
  
  function buildCheck($this, str) {
    var res = str.split("|");

    var id = res[0];
    var name = '[settings]['+ id +']';
    var value = JSON.parse(res[1]);
    var $setting = $this.closest('.theme-setting');
    
    // if in Blocks
    var $input = $this.closest('.ui-accordion__panel').find('input[type="checkbox"][name$="'+ name +'"]');
    
    // else in Sections
    if (!$input.length) {
      $input = $this.closest('.theme-editor__card').find('input[type="checkbox"][name$="'+ name +'"]');
    }
    
    // else in Theme settings
    if (!$input.length) {
      name = 'settings['+ id +']';
      $input = $this.closest('.theme-editor__card').find('input[type="checkbox"][name$="'+ name +'"]');
    }

    if (!$input.length) {
      return false;
    }

    // Prepare HTML
    var $parent = $input.closest('.theme-setting');
    var $wrapper = $parent.parent();
    if (!$wrapper.hasClass('theme-setting--wrapper')) {
      $parent.wrap('<div class="theme-setting--wrapper theme-setting--check"></div>');
      $wrapper = $parent.parent();
      
      $wrapper.append('<div class="theme-setting--true"></div><div class="theme-setting--false"></div>');
      
      if ($input.is(':checked')) {
        $wrapper.removeClass('theme-setting--off').addClass('theme-setting--on');
      }
      else {
        $wrapper.removeClass('theme-setting--on').addClass('theme-setting--off');
      }
    }
    
    var $true = $wrapper.find('.theme-setting--true');
    var $false = $wrapper.find('.theme-setting--false');
    
    if (value == true) {
      $true.append($setting);
    }
    else {
      $false.append($setting);
    }
    
    $this.remove();

    // Events
    $input.off('change');
    $input.on('change', function() {
      if ($input.is(':checked')) {
        $wrapper.removeClass('theme-setting--off').addClass('theme-setting--on');
      }
      else {
        $wrapper.removeClass('theme-setting--on').addClass('theme-setting--off');
      }
    });
    $input.on('change', function() {
      if ($input.is(':checked') == value) {
        $setting.show();
      }
      else {
        $setting.hide();
      }
    });
  }
  
  function buildGroup($this, str) {
    var value = JSON.parse(str);
    var name = '.theme-setting';
    var $header = $this.closest(name);
    
    if ($header.hasClass('theme-setting--header')) {
      
      // if in Sections
      var $next = $header.next(name);
      
      // else if Theme settings
      if (!$next.length) {
        name = '.next-card__section';
        $next = $header.next(name);
      }
      
      if (!$next.length) {
        return false;
      }
      
      // Prepare HTML
      var $wrapper = $header.parent();
      if (!$wrapper.hasClass('theme-setting--wrapper')) {
        $header.wrap('<div class="theme-setting--wrapper theme-setting--group"></div>');
        $wrapper = $header.parent();
        
        if (value == true) {
          $wrapper.removeClass('theme-setting--on').addClass('theme-setting--off');
        }
        else {
          $wrapper.removeClass('theme-setting--off').addClass('theme-setting--on');
        }
      }
      
      var $inner = $('<div class="theme-setting--inner"></div>');
      $wrapper.append($inner);
      
      for (var i = 0; i < 100; i++) {
        if ($next && !$next.hasClass('theme-setting--header')) {
          var $tmp = $next.next(name);
          $next.appendTo($inner);
          
          $next = $tmp;
        }
        else {
          break;
        }
      }
      
      $this.remove();

      // Events
      $header.off('click');
      $header.on('click', function() {
        if ($wrapper.hasClass('theme-setting--off')) {
          $wrapper.removeClass('theme-setting--off').addClass('theme-setting--on');
        }
        else {
          $wrapper.removeClass('theme-setting--on').addClass('theme-setting--off');
        }
      });
    }
  }
  
  function buildImage($this, str) {
    var res = str.split("|");

    var id = res[0];
    var name = '[settings]['+ id +']';
    var value = JSON.parse(res[1]);
    var $setting = $this.closest('.theme-setting');
    
    // if in Blocks
    var $input = $this.closest('.ui-accordion__panel').find('input[type="hidden"][name$="'+ name +'"]');
    
    // else in Sections
    if (!$input.length) {
      $input = $this.closest('.theme-editor__card').find('input[type="hidden"][name$="'+ name +'"]');
    }
    
    // else in Theme settings
    if (!$input.length) {
      name = 'settings['+ id +']';
      $input = $this.closest('.theme-editor__card').find('input[type="hidden"][name$="'+ name +'"]');
    }

    if (!$input.length) {
      return false;
    }

    // Prepare HTML
    var $parent = $input.closest('.theme-setting');
    var $wrapper = $parent.parent();
    if (!$wrapper.hasClass('theme-setting--wrapper')) {
      $parent.wrap('<div class="theme-setting--wrapper theme-setting--image"></div>');
      $wrapper = $parent.parent();
      
      $wrapper.append('<div class="theme-setting--true"></div><div class="theme-setting--false"></div>');
      
      if ($input.val() == '') {
        $wrapper.removeClass('theme-setting--on').addClass('theme-setting--off');
      }
      else {
        $wrapper.removeClass('theme-setting--off').addClass('theme-setting--on');
      }
    }
    
    var $true = $wrapper.find('.theme-setting--true');
    var $false = $wrapper.find('.theme-setting--false');
    
    if (value == true) {
      $true.append($setting);
    }
    else {
      $false.append($setting);
    }
    
    $this.remove();

    // Events
    var $btnRemove = $input.closest('.theme-setting').find('.js-image-picker-remove-button');
    $btnRemove.off('click');
    $btnRemove.on('click', function(evt) {
      $wrapper.removeClass('theme-setting--on').addClass('theme-setting--off');
    });
    
    var $btnImage = $(top.document).find('#image_picker_overlay .js-btn-primary');
    $btnImage.on('click', function(evt) {
      if ($input.val() == '') {
        $wrapper.removeClass('theme-setting--on').addClass('theme-setting--off');
      }
      else {
        $wrapper.removeClass('theme-setting--off').addClass('theme-setting--on');
      }
    });
    /*
    triggerChange($input);
    $input.on('change', function() {
      if ($input.val() == '') {
        $wrapper.removeClass('theme-setting--on').addClass('theme-setting--off');
      }
      else {
        $wrapper.removeClass('theme-setting--off').addClass('theme-setting--on');
      }
    });
    */
  }

  function themeSettings() {
    var $document = $(top.document);
    var $triggers = $document.find('.theme-setting a[href*="#roarJs-"]');
    
    $triggers.each(function() {
      var $this = $(this);
      var href = $this.attr('href');

      var term = "https://#roarJs-";
      if (href.indexOf(term) > -1 ) {
        var str = href.replace(term, "");
        var func = str.split(":"); 

        switch(func[0]) {
          case 'check':
            buildCheck($this, func[1]);
            break;

          case 'group':
            buildGroup($this, func[1]);
            break;

          case 'image':
            buildImage($this, func[1]);
            break;
        }
      }
    });
  }

  return {
    init: function() {
      if (is_editor) {
        $('html').addClass('theme-editor');
        
        styleSheet();
        themeActions();
        themeSettings();
      }
    },
    refresh: function() {
      if (is_editor) {
        themeSettings();
      }
    },
  };
})();

theme.roarAdminJs.init();