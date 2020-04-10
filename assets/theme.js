function onYouTubeIframeAPIReady () {
  theme.SlideshowVideo.loadVideos ();
}
(window.theme = window.theme || {}), (theme.Sections = function () {
  (this.constructors = {}), (this.instances = []), $ (document)
    .on ('shopify:section:load', this._onSectionLoad.bind (this))
    .on ('shopify:section:unload', this._onSectionUnload.bind (this))
    .on ('shopify:section:select', this._onSelect.bind (this))
    .on ('shopify:section:deselect', this._onDeselect.bind (this))
    .on ('shopify:block:select', this._onBlockSelect.bind (this))
    .on ('shopify:block:deselect', this._onBlockDeselect.bind (this));
}), (theme.Sections.prototype = _.assignIn ({}, theme.Sections.prototype, {
  _createInstance: function (e, t) {
    var i = $ (e),
      s = i.attr ('data-section-id'),
      o = i.attr ('data-section-type');
    if (((t = t || this.constructors[o]), !_.isUndefined (t))) {
      var a = _.assignIn (new t (e), {id: s, type: o, container: e});
      this.instances.push (a);
    }
  },
  _onSectionLoad: function (t) {
    var e = $ ('[data-section-id]', t.target)[0];
    if (e) {
      this._createInstance (e);
      var i = _.find (this.instances, function (e) {
        return e.id === t.detail.sectionId;
      });
      !_.isUndefined (i) && _.isFunction (i.onLoad) && i.onLoad (t);
    }
  },
  _onSectionUnload: function (i) {
    this.instances = _.filter (this.instances, function (e) {
      var t = e.id === i.detail.sectionId;
      return t && _.isFunction (e.onUnload) && e.onUnload (i), !t;
    });
  },
  _onSelect: function (t) {
    var e = _.find (this.instances, function (e) {
      return e.id === t.detail.sectionId;
    });
    !_.isUndefined (e) && _.isFunction (e.onSelect) && e.onSelect (t);
  },
  _onDeselect: function (t) {
    var e = _.find (this.instances, function (e) {
      return e.id === t.detail.sectionId;
    });
    !_.isUndefined (e) && _.isFunction (e.onDeselect) && e.onDeselect (t);
  },
  _onBlockSelect: function (t) {
    var e = _.find (this.instances, function (e) {
      return e.id === t.detail.sectionId;
    });
    !_.isUndefined (e) && _.isFunction (e.onBlockSelect) && e.onBlockSelect (t);
  },
  _onBlockDeselect: function (t) {
    var e = _.find (this.instances, function (e) {
      return e.id === t.detail.sectionId;
    });
    !_.isUndefined (e) &&
      _.isFunction (e.onBlockDeselect) &&
      e.onBlockDeselect (t);
  },
  register: function (e, i) {
    (this.constructors[e] = i), $ ('[data-section-type=' + e + ']').each (
      function (e, t) {
        this._createInstance (t, i);
      }.bind (this)
    );
  },
})), (window.slate = window.slate || {}), (slate.rte = {
  wrapTable: function (e) {
    e.$tables.wrap ('<div class="' + e.tableWrapperClass + '"></div>');
  },
  wrapIframe: function (e) {
    e.$iframes.each (function () {
      $ (this).wrap (
        '<div class="' + e.iframeWrapperClass + '"></div>'
      ), (this.src = this.src);
    });
  },
}), (window.slate = window.slate || {}), (slate.a11y = {
  pageLinkFocus: function (e) {
    var t = 'js-focus-hidden';
    e
      .first ()
      .attr ('tabIndex', '-1')
      .focus ()
      .addClass (t)
      .one ('blur', function () {
        e.first ().removeClass (t).removeAttr ('tabindex');
      });
  },
  focusHash: function () {
    var e = window.location.hash;
    e && document.getElementById (e.slice (1)) && this.pageLinkFocus ($ (e));
  },
  bindInPageLinks: function () {
    $ ('a[href*=#]').on (
      'click',
      function (e) {
        this.pageLinkFocus ($ (e.currentTarget.hash));
      }.bind (this)
    );
  },
  trapFocus: function (t) {
    var e = t.namespace ? 'focusin.' + t.namespace : 'focusin';
    t.$elementToFocus || (t.$elementToFocus = t.$container), t.$container.attr (
      'tabindex',
      '-1'
    ), t.$elementToFocus.focus (), $ (document).off ('focusin'), $ (
      document
    ).on (e, function (e) {
      t.$container[0] === e.target ||
        t.$container.has (e.target).length ||
        t.$container.focus ();
    });
  },
  removeTrapFocus: function (e) {
    var t = e.namespace ? 'focusin.' + e.namespace : 'focusin';
    e.$container &&
      e.$container.length &&
      e.$container.removeAttr ('tabindex'), $ (document).off (t);
  },
}), (theme.Images = {
  preload: function (e, t) {
    'string' == typeof e && (e = [e]);
    for (var i = 0; i < e.length; i++) {
      var s = e[i];
      this.loadImage (this.getSizedImageUrl (s, t));
    }
  },
  loadImage: function (e) {
    new Image ().src = e;
  },
  switchImage: function (e, t, i) {
    var s = this.imageSize (t.src), o = this.getSizedImageUrl (e.src, s);
    i ? i (o, e, t) : (t.src = o);
  },
  imageSize: function (e) {
    var t = e.match (
      /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/
    );
    return null !== t ? (void 0 !== t[2] ? t[1] + t[2] : t[1]) : null;
  },
  getSizedImageUrl: function (e, t) {
    if (null === t) return e;
    if ('master' === t) return this.removeProtocol (e);
    var i = e.match (/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
    if (null === i) return null;
    var s = e.split (i[0]), o = i[0];
    return this.removeProtocol (s[0] + '_' + t + o);
  },
  removeProtocol: function (e) {
    return e.replace (/http(s)?:/, '');
  },
}), (theme.Currency = {
  formatMoney: function (e, t) {
    'string' == typeof e && (e = e.replace ('.', ''));
    var i = '', s = /\{\{\s*(\w+)\s*\}\}/, o = t || '${{amount}}';
    function a (e, t, i, s) {
      if (((i = i || ','), (s = s || '.'), isNaN (e) || null === e)) return 0;
      var o = (e = (e / 100).toFixed (t)).split ('.');
      return (
        o[0].replace (/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + i) +
        (o[1] ? s + o[1] : '')
      );
    }
    switch (o.match (s)[1]) {
      case 'amount':
        i = a (e, 2);
        break;
      case 'amount_no_decimals':
        i = a (e, 0);
        break;
      case 'amount_with_comma_separator':
        i = a (e, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        i = a (e, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        i = a (e, 0, ' ');
        break;
      case 'amount_with_apostrophe_separator':
        i = a (e, 2, "'");
    }
    return o.replace (s, i);
  },
}), (slate.Variants = (function () {
  function e (e) {
    (this.$container = e.$container), (this.product =
      e.product), (this.singleOptionSelector =
      e.singleOptionSelector), (this.originalSelectorId =
      e.originalSelectorId), (this.enableHistoryState =
      e.enableHistoryState), (this.currentVariant = this._getVariantFromOptions ()), $ (
      this.singleOptionSelector,
      this.$container
    ).on ('change', this._onSelectChange.bind (this));
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    _getCurrentOptions: function () {
      var e = _.map ($ (this.singleOptionSelector, this.$container), function (
        e
      ) {
        var t = $ (e), i = t.attr ('type'), s = {};
        return 'radio' === i || 'checkbox' === i
          ? !!t[0].checked &&
              ((s.value = t.val ()), (s.index = t.data ('index')), s)
          : ((s.value = t.val ()), (s.index = t.data ('index')), s);
      });
      return (e = _.compact (e));
    },
    _getVariantFromOptions: function () {
      var e = this._getCurrentOptions (), t = this.product.variants;
      return _.find (t, function (t) {
        return e.every (function (e) {
          return _.isEqual (t[e.index], e.value);
        });
      });
    },
    _onSelectChange: function () {
      var e = this._getVariantFromOptions ();
      this.$container.trigger ({type: 'variantChange', variant: e}), e &&
        (this._updateMasterSelect (e), this._updateImages (
          e
        ), this._updatePrice (e), this._updateSKU (
          e
        ), (this.currentVariant = e), this.enableHistoryState &&
          this._updateHistoryState (e));
    },
    _updateImages: function (e) {
      var t = e.featured_image || {},
        i = this.currentVariant.featured_image || {};
      e.featured_image &&
        t.src !== i.src &&
        this.$container.trigger ({type: 'variantImageChange', variant: e});
    },
    _updatePrice: function (e) {
      (e.price === this.currentVariant.price &&
        e.compare_at_price === this.currentVariant.compare_at_price) ||
        this.$container.trigger ({type: 'variantPriceChange', variant: e});
    },
    _updateSKU: function (e) {
      e.sku !== this.currentVariant.sku &&
        this.$container.trigger ({type: 'variantSKUChange', variant: e});
    },
    _updateHistoryState: function (e) {
      if (history.replaceState && e) {
        var t =
          window.location.protocol +
          '//' +
          window.location.host +
          window.location.pathname +
          '?variant=' +
          e.id;
        window.history.replaceState ({path: t}, '', t);
      }
    },
    _updateMasterSelect: function (e) {
      $ (this.originalSelectorId, this.$container).val (e.id);
    },
  })), e;
}) ()), (theme.Drawers = (function () {
  function e (e, t, i) {
    var s = {
      close: '.js-drawer-close',
      open: '.js-drawer-open-' + t,
      openClass: 'js-drawer-open',
      dirOpenClass: 'js-drawer-open-' + t,
    };
    if (
      ((this.nodes = {
        $parent: $ ('html').add ('body'),
        $page: $ ('#PageContainer'),
      }), (this.config = $.extend (
        s,
        i
      )), (this.position = t), (this.$drawer = $ ('#' + e)), !this.$drawer
        .length)
    )
      return !1;
    (this.drawerIsOpen = !1), this.init ();
  }
  return (e.prototype.init = function () {
    $ (this.config.open).on (
      'click',
      $.proxy (this.open, this)
    ), this.$drawer.on ('click', this.config.close, $.proxy (this.close, this));
  }), (e.prototype.open = function (e) {
    var t = !1;
    return e ? e.preventDefault () : (t = !0), e &&
      e.stopPropagation &&
      (e.stopPropagation (), (this.$activeSource = $ (e.currentTarget))), this
      .drawerIsOpen && !t
      ? this.close ()
      : (this.$drawer.prepareTransition (), this.nodes.$parent.addClass (
          this.config.openClass + ' ' + this.config.dirOpenClass
        ), (this.drawerIsOpen = !0), slate.a11y.trapFocus ({
          $container: this.$drawer,
          namespace: 'drawer_focus',
        }), this.config.onDrawerOpen &&
          'function' == typeof this.config.onDrawerOpen &&
          (t || this.config.onDrawerOpen ()), this.$activeSource &&
          this.$activeSource.attr ('aria-expanded') &&
          this.$activeSource.attr (
            'aria-expanded',
            'true'
          ), this.bindEvents (), this);
  }), (e.prototype.close = function () {
    this.drawerIsOpen &&
      ($ (document.activeElement).trigger (
        'blur'
      ), this.$drawer.prepareTransition (), this.nodes.$parent.removeClass (
        this.config.dirOpenClass + ' ' + this.config.openClass
      ), (this.drawerIsOpen = !1), slate.a11y.removeTrapFocus ({
        $container: this.$drawer,
        namespace: 'drawer_focus',
      }), this.unbindEvents ());
  }), (e.prototype.bindEvents = function () {
    this.nodes.$parent.on (
      'keyup.drawer',
      $.proxy (function (e) {
        return 27 !== e.keyCode || (this.close (), !1);
      }, this)
    ), this.nodes.$page.on ('touchmove.drawer', function () {
      return !1;
    }), this.nodes.$page.on (
      'click.drawer',
      $.proxy (function () {
        return this.close (), !1;
      }, this)
    );
  }), (e.prototype.unbindEvents = function () {
    this.nodes.$page.off ('.drawer'), this.nodes.$parent.off ('.drawer');
  }), e;
}) ()), (theme.Search = (function () {
  var c = {
    search: '.header__search, .mobile-header__search',
    searchInput: '.search__input',
    searchToggle: '.search__toggle',
    searchScreen: '.search__fullscreen',
    searchAjax: '.search__ajax.no-js',
    searchResults: '.search__results',
  },
    l = {};
  function e () {
    $ (document).off ('click', c.searchToggle), $ (
      document
    ).on ('click', c.searchToggle, function (e) {
      e.preventDefault ();
      var t = $ ('body'),
        i = $ (this).closest ('.header__search'),
        s = $ ('.search__label-text', i);
      i.hasClass ('opened')
        ? (t.removeClass ('search-opened'), i.removeClass ('opened'))
        : (t.addClass ('search-opened'), i.addClass ('opened'), $ (
            c.searchInput,
            i
          ).val (''), $ (c.searchResults, i).empty (), $ (
            c.searchInput,
            i
          ).focus ()), s.length &&
        '0' == s.attr ('data-first_time') &&
        (s.attr ('data-first_time', '1'), (function (e) {
          if (void 0 === $.fn.typed) return;
          var t = '^800 ' + $ ('.search__label-text', e).data ('typedtext'),
            i = $ ('.search__label-text', e).data ('typedtext_2');
          $ ('.search__label-text', e).typed ({
            strings: [t, i],
            typeSpeed: 30,
            backSpeed: 20,
          }), $ ('.search__label', e).on ('click', function () {
            $ (this).fadeOut (200, function () {
              $ (this).addClass ('hide');
            }), $ (c.searchInput, e).focus ();
          });
        }) (i));
    }), $ (document).keyup (function (e) {
      if (27 == e.keyCode) {
        var t = $ (c.search);
        t.hasClass ('opened') &&
          ($ ('body').removeClass ('search-opened'), t.removeClass ('opened'));
      }
    }), $ (document).mouseup (function (e) {
      var t = $ (c.searchToggle), i = $ (c.searchScreen);
      if (
        !t.is (e.target) &&
        0 === t.has (e.target).length &&
        !i.is (e.target) &&
        0 === i.has (e.target).length
      ) {
        var s = $ (c.search);
        s.hasClass ('opened') &&
          ($ ('body').removeClass ('search-opened'), s.removeClass ('opened'));
      }
    });
  }
  return {
    init: function () {
      $ (c.search).length &&
        ($ (c.searchAjax).each (function () {
          var s = $ (this),
            o = s.find (c.searchInput),
            e = null,
            a = s.data ('limit'),
            n = s.data ('featured'),
            r = s.data ('featured_limit');
          o.off ('keyup'), o.on ('keyup', function () {
            clearTimeout (e), (e = setTimeout (function () {
              var t = o.val ();
              if (1 < t.length)
                if (t in l) {
                  var e = l[t];
                  $ (c.searchResults).html (e.html), $ (e.html).find (
                    '.not__found'
                  ).length && !$ (e.html).find ('.featured_title').length
                    ? s.closest (c.searchScreen).removeClass ('searching')
                    : s.closest (c.searchScreen).addClass ('searching');
                } else {
                  $ (c.searchResults).empty ();
                  var i = {
                    view: 'search',
                    type: 'product',
                    searched_limit: a,
                    featured: n,
                    featured_limit: r,
                    q: '*' + t + '*',
                    cache: !1,
                  };
                  $.ajax ({
                    url: '/search',
                    data: i,
                    dataType: 'html',
                    type: 'GET',
                    beforeSend: function () {
                      s.addClass ('loading').addClass ('searching');
                    },
                    complete: function () {
                      s.removeClass ('loading');
                    },
                    success: function (e) {
                      setTimeout (function () {
                        $ (c.searchResults).html (
                          e
                        ), $ (e).find ('.not__found').length && !$ (e).find ('.featured_title').length ? s.closest (c.searchScreen).removeClass ('searching') : s.closest (c.searchScreen).addClass ('searching'), (l[t] = {found: !0, html: e});
                      }, 650);
                    },
                  });
                }
              else $ (c.searchResults).empty ();
            }, 500));
          }), s.removeClass ('no-js');
        }), e ());
    },
  };
}) ()), (theme.CurrencyPicker = (function () {
  var o = {
    selector: '.money',
    container: '.currency__picker',
    currency: '.currency__picker .ml__switcher',
    currencyPicker: '.currency__picker .currency',
    currencyActive: '.currency__picker .currency.active',
    currencyCurrent: '.currency__picker .ml__current',
    currencyNotification: '.currency__notification',
  },
    a = {
      currency_format: '',
      shop_currency: '',
      default_currency: '',
      money_with_currency_format: '',
      money_format: '',
      auto_switch: 'true',
      original_price: 'true',
    };
  function n () {
    if ('false' == a.original_price) return !1;
    var i = Currency.currentCurrency,
      e = Currency.cookie.read (),
      s = a.shop_currency;
    e && (i = e), $ (o.selector).each (function () {
      var e = $ (this);
      if ((e.removeAttr ('data-currency-default'), s != i)) {
        var t = e.attr ('data-currency-' + s);
        'USD' == s && (t += ' USD'), e.attr ('data-currency-default', t);
      }
    });
  }
  function r () {
    $ (o.currencyNotification).length &&
      $ (o.currency).length &&
      $ (o.container).hasClass ('ml__js') &&
      (Currency.currentCurrency != a.shop_currency
        ? $ (o.currencyNotification).each (function () {
            var e = $ (this),
              t = e.data ('html'),
              i = '<strong>' + Currency.currentCurrency + '</strong>';
            (t = t.replace (
              new RegExp ('{{ current_currency }}', 'g'),
              i
            )), e.html (t), e.hasClass ('loaded') || e.addClass ('loaded').slideDown ();
          })
        : $ (o.currencyNotification).removeClass ('loaded').slideUp ());
  }
  function e () {
    var e = $ (o.container);
    (a.currency_format = e
      .find ('.currency_format')
      .val ()), (a.shop_currency = e
      .find ('.shop_currency')
      .val ()), (a.default_currency = e
      .find ('.default_currency')
      .val ()), (a.money_with_currency_format = e
      .find ('.money_with_currency_format')
      .val ()), (a.money_format = e
      .find ('.money_format')
      .val ()), (a.auto_switch = e
      .find ('.auto_switch')
      .val ()), (a.original_price = e
      .find ('.original_price')
      .val ()), (Currency.format = a.currency_format);
    var t = a.shop_currency;
    (Currency.moneyFormats[t].money_with_currency_format =
      a.money_with_currency_format), (Currency.moneyFormats[t].money_format =
      a.money_format);
    var i = a.default_currency, s = Currency.cookie.read ();
    $ ('.money .money').each (function () {
      $ (this).parents ('.money').removeClass ('money');
    }), $ (o.selector).each (function () {
      var e = $ (this);
      if (void 0 === e.attr ('data-currency-' + a.shop_currency)) {
        var t = e.text ();
        e.attr ('data-currency-' + a.shop_currency, t);
      }
    }), null == s
      ? t !== i
          ? Currency.convertAll (t, i, o.selector)
          : (Currency.currentCurrency = i)
      : $ (o.currency).length &&
          0 === $ (o.currency + ' .currency[data-code=' + s + ']').size ()
          ? ((Currency.currentCurrency = t), Currency.cookie.write (t))
          : s === t
              ? (Currency.currentCurrency = t)
              : Currency.convertAll (t, s, o.selector), $ (o.currency).off (
      'click',
      '.currency:not(.active)'
    ), $ (o.currency).on ('click', '.currency:not(.active)', function () {
      var e = $ (this).data ('code');
      Currency.convertAll (
        Currency.currentCurrency,
        e,
        o.selector
      ), $ (o.currencyPicker).removeClass ('active'), $ (this).addClass ('active'), $ (o.currencyCurrent).text (Currency.currentCurrency).attr ('data-code', Currency.currentCurrency), n (), r ();
    });
    window.selectCallback;
    $ (o.currencyPicker).removeClass ('active'), $ (
      o.currency + ' .currency[data-code=' + Currency.currentCurrency + ']'
    ).addClass ('active'), $ (o.currencyCurrent)
      .text (Currency.currentCurrency)
      .attr ('data-code', Currency.currentCurrency), n (), (function () {
      if ('false' == a.auto_switch) return;
      null == Currency.cookie.read () &&
        $.getJSON ('//ipinfo.io/json', function (e) {
          var t = JSON.parse (JSON.stringify (e, null, 2));
          void 0 !== t.country &&
            $.getJSON (
              '//restcountries.eu/rest/v1/alpha/' + t.country,
              function (e) {
                var t = e.currencies[0];
                $ (o.currencyPicker + '[data-code="' + t + '"]').trigger (
                  'click'
                );
              }
            );
        });
    }) (), r ();
  }
  return {
    init: function () {
      
     // console.log($ (o.currency).hasClass ('ml__js'));
      $ (o.currency).length &&
        ($ (o.container).hasClass ('ml__js')
          ? e ()
          : ($ (o.currency).off ('click', '.currency:not(.active)'), $ (
              o.currency
            ).on ('click', '.currency:not(.active)', function () {
              var e = $ (this).data ('code'),
                t = window.location,
                i = t.pathname + t.search + t.hash,
                s = document.createElement ('form');
              s.setAttribute (
                'action',
                '/cart/update'
              ), s.setAttribute ('method', 'POST'), s.setAttribute ('style', 'display:none');
              var o = document.createElement ('input');
              o.setAttribute (
                'type',
                'hidden'
              ), o.setAttribute ('name', 'form_type'), o.setAttribute ('value', 'currency');
              var a = document.createElement ('input');
              a.setAttribute (
                'type',
                'hidden'
              ), a.setAttribute ('name', 'currency'), a.setAttribute ('value', e);
              var n = document.createElement ('input');
              n.setAttribute (
                'type',
                'hidden'
              ), n.setAttribute ('name', 'return_to'), n.setAttribute ('value', i), s.appendChild (o), s.appendChild (a), s.appendChild (n), $ (s).appendTo ('body').submit ();
            })));
    },
    convert: function (e) {
      $ (o.currency).length &&
        $ (o.container).hasClass ('ml__js') &&
        ($ (e).each (function () {
          var e = $ (this);
          if (void 0 === e.attr ('data-currency-' + a.shop_currency)) {
            var t = e.text ();
            e.attr ('data-currency-' + a.shop_currency, t);
          }
        }), Currency.convertAll (
          a.shop_currency,
          $ (o.currencyActive).attr ('data-code'),
          e,
          a.currency_format
        ), n ());
    },
    convertAll: function () {
      $ (o.currency).length &&
        $ (o.container).hasClass ('ml__js')&&
        ($ (o.selector).each (function () {
          var e = $ (this);
          if (void 0 === e.attr ('data-currency-' + a.shop_currency)) {
            var t = e.text ();
            e.attr ('data-currency-' + a.shop_currency, t);
          }
        }), Currency.convertAll (
          a.shop_currency,
          $ (o.currencyActive).attr ('data-code'),
          o.selector
        ), n ());
    },
  };
}) ()), (theme.LanguagePicker = (function () {
  var r = {
    language: '.language__picker .ml__switcher',
    languagePicker: '.language__picker .language',
    languageCurrent: '.language__picker .ml__current',
    selector: '#weketing_google_translate_element',
  };
  function c (e) {
    $ (r.selector + ' .goog-te-combo').val (e);
    var t, i = document.getElementsByClassName ('goog-te-combo')[0];
    document.createEvent
      ? ((t = document.createEvent ('HTMLEvents')).initEvent (
          'change',
          !0,
          !0
        ), i.dispatchEvent (t))
      : (((t = document.createEventObject ()).eventType =
          'change'), i.fireEvent ('on' + t.eventType, t));
  }
  function e () {
    if (!$ (r.language).hasClass ('skip')) {
      $ (r.language).addClass ('skip');
      var e = weketingJS.settingsJS[8];
      if ('yes' == e.enable) {
        for (
          var t = e.default_language,
            i = e.custom_languages,
            s = weketingSGT.languages (),
            o = localStorage.getItem ('roarStorage_language'),
            a = 0;
          a < i.length - 1;
          a++
        )
          if (i[a] == t) {
            i.pop ();
            break;
          }
        for (a = 0; a < i.length; a++)
          if (i[a] == o) {
            t = o;
            break;
          }
        for (a = 0; a < i.length; a++) {
          var n =
            '<li><a href="javascript:void(0);" class="language active notranslate" data-code="' +
            t +
            '">' +
            s[t] +
            '</a></li>';
          i[a] != t &&
            (n =
              '<li><a href="javascript:void(0);" class="language notranslate" data-code="' +
              i[a] +
              '">' +
              s[i[a]] +
              '</a></li>'), $ (r.language).append (n);
        }
        $ (r.language).closest ('.language__picker').removeClass ('hide'), $ (
          r.languageCurrent
        ).text (s[t]), c (t);
      }
    }
  }
  return {
    init: function () {
      $ (r.language).length &&
        $ (r.selector).length &&
        ('undefined' != typeof weketingJS && void 0 !== weketingJS.settingsJS[8]
          ? e ()
          : $ (r.selector).bind ('google_translate', function () {
              e ();
            }), $ (document).off (
          'click',
          r.languagePicker + ':not(.active)'
        ), $ (document).on (
          'click',
          r.languagePicker + ':not(.active)',
          function () {
            var e = $ (this).data ('code');
            if ('' != e) {
              var t = $ (this).text ();
              $ (r.languagePicker).removeClass ('active'), $ (
                r.languagePicker + '[data-code="' + e + '"]'
              ).addClass ('active'), $ (r.languageCurrent).text (
                t
              ), localStorage.setItem ('roarStorage_language', e), c (e);
            }
          }
        ));
    },
  };
}) ()), (theme.MiniCart = (function () {
  var a = {
    headerSticky: '.header-sticky__placeholder',
    headerCart: '.header__cart .cart__link',
    miniCart: '.minicart',
    miniCartAgree: '.minicart .cart__agree',
    miniCartCheckout: '.minicart .btn-checkout',
    miniCartRemove: '.minicart .item__remove',
    miniCartClose: '.minicart .cart__close, .minicart__overlay',
  };
  function o (e) {
    return void 0 === e && (e = 0), $ (a.miniCart).addClass (
      'loading'
    ), $.get ('/search', function (o) {
      $ (a.miniCart).each (function () {
        var e = $ (this), t = '';
        e.hasClass ('minicart-frame')
          ? (t = '.minicart-frame')
          : e.hasClass ('minicart-sidebar') && (t = '.minicart-sidebar');
        var i = $ (o).find (a.miniCart + t);
        e.removeClass ('loading').html (i.html ());
        var s = e.prev ();
        s.html (
          i.prev ().html ()
        ), s.addClass ('anim'), setTimeout (function () {
          s.removeClass ('anim');
        }, 2e3);
      }), 0 < e && $ ('.product__' + e + ' .addcart_btn').removeClass ('added');
    });
  }
  return {
    init: function () {
      $ (document).off ('click', a.headerCart), $ (
        document
      ).on ('click', a.headerCart, function (e) {
        var t = $ (this).parent ().find (a.miniCart);
        t.length &&
          t.hasClass ('minicart-sidebar') &&
          ($ (a.miniCart).each (function () {
            t.attr ('id') != $ (this).attr ('id') &&
              $ (this).removeClass ('opened');
          }), t.hasClass ('opened')
            ? t.removeClass ('opened')
            : (t.addClass ('opened'), $ ('body').addClass (
                'cart-opened'
              ), theme.MiniCart.anim ()), e.preventDefault ());
      }), $ (document).off ('change', a.miniCartAgree), $ (
        document
      ).on ('change', a.miniCartAgree, function (e) {
        $ (this).is (':checked')
          ? ($ (a.miniCartAgree).prop ('checked', !0), $ (
              a.miniCartCheckout
            ).removeClass ('btn-disabled'))
          : ($ (a.miniCartAgree).prop ('checked', !1), $ (
              a.miniCartCheckout
            ).addClass ('btn-disabled'));
      }), $ (document).off ('click', a.miniCartCheckout), $ (
        document
      ).on ('click', a.miniCartCheckout, function (e) {
        if ($ (a.miniCartAgree).length) {
          var t = $ (a.miniCartAgree);
          if (!t.is (':checked')) {
            var i = t.data ('message');
            alert (i), e.preventDefault ();
          }
        }
      }), $ (document).off ('click', a.miniCartRemove), $ (
        document
      ).on ('click', a.miniCartRemove, function (e) {
        e.preventDefault ();
        var t = $ (this), i = t.attr ('href'), s = t.data ('product_id');
        $ (a.miniCart).addClass ('loading'), $.post (i, function () {
          o (s);
        });
      }), $ (document).off ('click', a.miniCartClose), $ (
        document
      ).on ('click', a.miniCartClose, function () {
        $ (a.miniCart)
          .removeClass ('loading')
          .removeClass ('opened'), $ ('body').removeClass ('cart-opened');
      });
    },
    update: o,
    open: function () {
      if ($ (a.miniCart).length) {
        if (
          $ (a.headerSticky).length &&
          $ (a.headerSticky).hasClass ('stick')
        ) {
          var e = $ (a.headerSticky).find (a.headerCart);
          if (e.length) {
            var t = e.closest ('.header__cart').find (a.miniCart);
            if (
              t.length &&
              t.hasClass ('minicart-sidebar') &&
              !t.hasClass ('opened')
            )
              return e.trigger ('click'), !1;
          }
        }
        $ (a.headerCart).each (function () {
          var e = $ (this);
          if (e.is (':visible')) {
            var t = e.closest ('.header__cart').find (a.miniCart);
            if (
              t.length &&
              t.hasClass ('minicart-sidebar') &&
              !t.hasClass ('opened')
            )
              return e.trigger ('click'), !1;
          }
        });
      }
    },
    anim: function () {
      var e = new TimelineLite (),
        t = $ ('.minicart .cart__content'),
        i = $ ('.minicart .cart__item'),
        s = $ ('.minicart .cart__total'),
        o = $ ('.minicart .cart__actions'),
        a = $ ('.minicart .cart__empty'),
        n = $ ('.minicart .cart__return');
      theme.settings.rtl
        ? (e.fromTo (
            t,
            0.5,
            {autoAlpha: 0},
            {autoAlpha: 1, ease: Power4.easeIn},
            0.1
          ), e.staggerFromTo (
            i,
            0.5,
            {opacity: 0, skewX: -20, x: -60},
            {opacity: 1, skewX: 0, x: 0},
            0.1,
            0.2
          ), e.fromTo (
            s,
            0.8,
            {opacity: 0, x: -80},
            {opacity: 1, x: 0},
            0.2
          ), e.fromTo (
            o,
            0.8,
            {opacity: 0, x: -80},
            {opacity: 1, x: 0},
            0.3
          ), e.fromTo (
            a,
            0.8,
            {opacity: 0, x: -80},
            {opacity: 1, x: 0},
            0.2
          ), e.fromTo (n, 0.8, {opacity: 0, x: -80}, {opacity: 1, x: 0}, 0.3))
        : (e.fromTo (
            t,
            0.5,
            {autoAlpha: 0},
            {autoAlpha: 1, ease: Power4.easeIn},
            0.1
          ), e.staggerFromTo (
            i,
            0.5,
            {opacity: 0, skewX: 20, x: 60},
            {opacity: 1, skewX: 0, x: 0},
            0.1,
            0.2
          ), e.fromTo (
            s,
            0.8,
            {opacity: 0, x: 80},
            {opacity: 1, x: 0},
            0.2
          ), e.fromTo (
            o,
            0.8,
            {opacity: 0, x: 80},
            {opacity: 1, x: 0},
            0.3
          ), e.fromTo (
            a,
            0.8,
            {opacity: 0, x: 80},
            {opacity: 1, x: 0},
            0.2
          ), e.fromTo (n, 0.8, {opacity: 0, x: 80}, {opacity: 1, x: 0}, 0.3));
    },
  };
}) ()), (function () {
  var e = $ ('.return-link');
  function i (e) {
    var t = document.createElement ('a');
    return (t.ref = e), t.hostname;
  }
  document.referrer &&
    e.length &&
    window.history.length &&
    e.one ('click', function (e) {
      e.preventDefault ();
      var t = i (document.referrer);
      return i (window.location.href) === t && history.back (), !1;
    });
}) (), (theme.SlideshowSection = (function () {
  function e (e) {
    var t = (this.$container = $ (e)),
      i = (this.sectionId = t.attr ('data-section-id')),
      s = (this.slideshow = '#Slideshow-' + i);
    $ ('.slideshow__video', s).each (function () {
      var e = $ (this);
      theme.SlideshowVideo.init (
        e
      ), theme.SlideshowVideo.loadVideo (e.attr ('id'));
    }), this.beforeInit (), this.init ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    beforeInit: function () {
      var e = 0.01 * window.innerHeight;
      document.documentElement.style.setProperty (
        '--vh',
        e + 'px'
      ), window.addEventListener ('resize', function () {
        var e = 0.01 * window.innerHeight;
        document.documentElement.style.setProperty ('--vh', e + 'px');
      });
    },
    init: function () {
      var a = $ (this.slideshow),
        e = a.data ('autoplay'),
        t = a.data ('speed'),
        o = a.find ('.slideshow__image'),
        n = new Flickity (this.slideshow, {
          rightToLeft: theme.settings.rtl,
          bgLazyLoad: 1,
          imagesLoaded: !0,
          accessibility: !0,
          prevNextButtons: !0,
          pageDots: !0,
          contain: !0,
          wrapAround: !0,
          setGallerySize: !1,
          autoPlay: !!e && t,
          arrowShape: {x0: 10, x1: 60, y1: 50, x2: 60, y2: 45, x3: 15},
          on: {
            ready: function () {
              var e = new TimelineLite (),
                t = a.find ('.flickity-slider'),
                i = a.find ('.slider-content-wrapper'),
                s = a.find ('.flickity-button svg'),
                o = a.find ('.flickity-page-dots');
              e.fromTo (
                t,
                2,
                {scale: 1.2},
                {ease: Power4.easeInOut, scale: 1},
                0
              ), e.fromTo (
                i,
                2.4,
                {opacity: 0},
                {ease: Power4.easeInOut, opacity: 1},
                1
              ), e.fromTo (
                [s, o],
                2,
                {opacity: 0},
                {ease: Power4.easeInOut, opacity: 1},
                1.3
              );
            },
          },
        });
      n.on ('scroll', function () {
        n.slides.forEach (function (e, t) {
          var i = o[t], s = 0;
          i &&
            ((s = 0 === t
              ? Math.abs (n.x) > n.slidesWidth
                  ? n.slidesWidth +
                      n.x +
                      n.slides[n.slides.length - 1].outerWidth +
                      e.target
                  : e.target + n.x
              : t === n.slides.length - 1 &&
                  Math.abs (n.x) + n.slides[t].outerWidth < n.slidesWidth
                  ? e.target - n.slidesWidth + n.x - n.slides[t].outerWidth
                  : e.target + n.x), void 0 === window.mobileCheck ||
              window.mobileCheck () ||
              theme.settings.rtl ||
              (i.style.transform = 'translateX(' + -0.5 * s + 'px)'));
        });
      });
    },
    onSelect: function () {
      void 0 !== theme.roarAdminJs && theme.roarAdminJs.refresh ();
    },
  })), e;
}) ()), (theme.Slideshow = (function () {
  this.$slideshow = null;
  var h = {
    wrapper: 'slideshow-wrapper',
    slideshow: 'slideshow',
    currentSlide: 'slick-current',
    video: 'slideshow__video',
    videoBackground: 'slideshow__video--background',
    closeVideoBtn: 'slideshow__video-control--close',
    pauseButton: 'slideshow__pause',
    isPaused: 'is-paused',
  };
  function e (e) {
    (this.$slideshow = $ (e)), (this.$wrapper = this.$slideshow.closest (
      '.' + h.wrapper
    )), (this.$pause = this.$wrapper.find ('.' + h.pauseButton));
    var t = this.$slideshow.data ('arrows') || !1,
      i = this.$slideshow.data ('dots') || !1,
      s = this.$slideshow.data ('autoplay') || !1,
      o = parseInt (this.$slideshow.data ('speed')) || 7e3,
      a = parseInt (this.$slideshow.data ('per_view')) || 1;
    (this.settings = {
      mediaQueryMediumUp: 'screen and (min-width: 768px)',
      mediaQuerySmall: 'screen and (max-width: 767px)',
      arrows: t,
      dots: i,
      autoplay: s,
      speed: o,
      per_view: a,
      sliderImagesActive: !1,
    }), this.initBreakpoints ();
  }
  function p (e) {
    return e.find ('.' + h.video).length;
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    initBreakpoints: function () {
      var e = this;
      enquire.register (e.settings.mediaQuerySmall, {
        match: function () {
          e.settings.sliderImagesActive &&
            e.destroyImageSlider (), e.initImageSlider ();
        },
      }), enquire.register (e.settings.mediaQueryMediumUp, {
        match: function () {
          e.settings.sliderImagesActive &&
            e.destroyImageSlider (), e.initImageSlider (!1);
        },
      });
    },
    destroyImageSlider: function () {
      $ (this.$slideshow).slick (
        'unslick'
      ), (this.settings.sliderImagesActive = !1);
    },
    initImageSlider: function (e) {
      void 0 === e && (e = !0);
      var t = {
        rtl: theme.settings.rtl,
        accessibility: !0,
        arrows: this.settings.arrows,
        dots: this.settings.dots,
        fade: !this.settings.per_view,
        speed: 1e3,
        delay: 1600,
        draggable: !0,
        autoplay: this.settings.autoplay,
        autoplaySpeed: this.settings.speed,
        slidesToShow: this.settings.per_view,
        slidesToScroll: 1,
        prevArrow: '<button class="slick-prev" type="button"><svg class="svg-icon"><use xlink:href="#global__symbols-prev"></use></svg></button>',
        nextArrow: '<button class="slick-next" type="button"><svg class="svg-icon"><use xlink:href="#global__symbols-next"></use></svg></button>',
      };
      1 == e &&
        ((t.fade = !1), (t.draggable = !0), (t.slidesToShow = 1), (t.arrows = !1), (t.dots = !0)), this.$slideshow.on (
        'beforeChange',
        function (e, t, i, s, o) {
          var a = t.$slider,
            n = a.find ('.' + h.currentSlide),
            r = a.find ('.slick-slide[data-slick-index="' + s + '"]');
          if (p (n)) {
            var c = n.find ('.' + h.video), l = c.attr ('id');
            theme.SlideshowVideo.pauseVideo (l), c.attr ('tabindex', '-1');
          }
          if (p (r)) {
            var d = r.find ('.' + h.video), u = d.attr ('id');
            d.hasClass (h.videoBackground)
              ? theme.SlideshowVideo.playVideo (u)
              : d.attr ('tabindex', '0');
          }
          n.removeClass ('slick-anim'), a
            .find ('.slick-slide[data-slick-index="' + o + '"]')
            .addClass ('slick-anim'), a
            .find ('.slick-arrow')
            .addClass ('disabled');
        }.bind (this)
      ), this.$slideshow.on (
        'afterChange',
        function (e, t, i) {
          t.$slider.find ('.slick-arrow').removeClass ('disabled');
        }.bind (this)
      ), this.$slideshow.on (
        'init',
        function (e, t) {
          var i = t.$slider,
            s = t.$list,
            o = this.$wrapper,
            a = this.settings.autoplay;
          s.removeAttr ('aria-live'), o.on ('focusin', function (e) {
            o.has (e.target).length &&
              (s.attr ('aria-live', 'polite'), a && i.slick ('slickPause'));
          }), o.on ('focusout', function (e) {
            if (o.has (e.target).length && (s.removeAttr ('aria-live'), a)) {
              if ($ (e.target).hasClass (h.closeVideoBtn)) return;
              i.slick ('slickPlay');
            }
          }), t.$dots &&
            t.$dots.on ('keydown', function (e) {
              37 === e.which &&
                i.slick (
                  'slickPrev'
                ), 39 === e.which && i.slick ('slickNext'), (37 !== e.which && 39 !== e.which) || t.$dots.find ('.slick-active button').focus ();
            });
          i.find ('.' + h.currentSlide).addClass ('slick-anim');
          var n = new TimelineLite (),
            r = i,
            c = i.find ('.slideshow__text-text'),
            l = i.find ('.slick-arrow svg'),
            d = i.find ('.slick-dots');
          n.fromTo (
            r,
            2,
            {scale: 1.2},
            {ease: Power4.easeInOut, scale: 1},
            0
          ), n.fromTo (
            c,
            2.4,
            {opacity: 0},
            {ease: Power4.easeInOut, opacity: 1},
            1
          ), n.fromTo (
            [l, d],
            2,
            {opacity: 0},
            {ease: Power4.easeInOut, opacity: 1},
            1.3
          );
        }.bind (this)
      ), this.$slideshow.slick (t), this.$pause.on (
        'click',
        this.togglePause.bind (this)
      ), (this.settings.sliderImagesActive = !0);
    },
    togglePause: function () {
      var e = '#Slideshow-' + this.$pause.data ('id');
      this.$pause.hasClass (h.isPaused)
        ? (this.$pause.removeClass (h.isPaused), $ (e).slick ('slickPlay'))
        : (this.$pause.addClass (h.isPaused), $ (e).slick ('slickPause'));
    },
  })), e;
}) ()), (theme.SlideshowVideo = (function () {
  var r = !1,
    c = !1,
    i = !1,
    l = !1,
    s = !1,
    d = {},
    u = [],
    a = {
      ratio: 16 / 9,
      playerVars: {
        iv_load_policy: 3,
        modestbranding: 1,
        autoplay: 0,
        controls: 0,
        showinfo: 0,
        wmode: 'opaque',
        branding: 0,
        autohide: 0,
        rel: 0,
      },
      events: {
        onReady: function (e) {
          e.target.setPlaybackQuality ('hd1080');
          var t = g (e);
          switch (((function () {
            if (i) return;
            $ (window).width () < 750
              ? (l = !0)
              : void 0 !== window.mobileCheck &&
                  window.mobileCheck () &&
                  (l = !0);
            l && p (!1);
            i = !0;
          }) (), $ ('#' + t.id).attr ('tabindex', '-1'), v (), t.type)) {
            case 'background-chrome':
            case 'background':
              e.target.mute (), t.$parentSlide
                .closest ('.' + h.slickSlide)
                .hasClass (h.currentSlide) && o (t.id);
          }
          t.$parentSlide.addClass (h.loaded);
        },
        onStateChange: function (e) {
          var t = g (e);
          switch (e.data) {
            case 0:
              !(function (e) {
                switch (e.type) {
                  case 'background':
                    u[e.id].seekTo (0);
                    break;
                  case 'background-chrome':
                    u[e.id].seekTo (0), n (e.id);
                    break;
                  case 'chrome':
                    n (e.id);
                }
              }) (t);
              break;
            case 1:
              m (t);
              break;
            case 2:
              f (t);
          }
        },
      },
    },
    h = {
      playing: 'video-is-playing',
      paused: 'video-is-paused',
      loading: 'video-is-loading',
      loaded: 'video-is-loaded',
      slideshowWrapper: 'slideshow-wrapper',
      slide: 'slideshow__slide',
      slideBackgroundVideo: 'slideshow__slide--background-video',
      slideDots: 'slick-dots',
      videoChrome: 'slideshow__video--chrome',
      videoBackground: 'slideshow__video--background',
      playVideoBtn: 'slideshow__video-control--play',
      closeVideoBtn: 'slideshow__video-control--close',
      currentSlide: 'slick-current',
      slickSlide: 'slick-slide',
      slickClone: 'slick-cloned',
      supportsAutoplay: 'autoplay',
      supportsNoAutoplay: 'no-autoplay',
    };
  function o (e, t) {
    var i, s, o = d[e], a = u[e], n = d[e].$parentSlide;
    if (l) m (o);
    else if (t || (r && c))
      return n.removeClass (h.loading), m (o), void a.playVideo ();
    r ||
      ((s = n), (i = a).playVideo (), (function (e) {
        var t, i, s = $.Deferred ();
        return (t = setInterval (function () {
          e.getCurrentTime () <= 0 ||
            ((c = !0), clearInterval (t), clearTimeout (i), s.resolve ());
        }, 500)), (i = setTimeout (function () {
          clearInterval (t), s.reject ();
        }, 4e3)), s;
      }) (i)
        .then (function () {
          p (!0);
        })
        .fail (function () {
          p (!1), i.stopVideo ();
        })
        .always (function () {
          (r = !0), s.removeClass (h.loading);
        }));
  }
  function p (e) {
    var t = e ? h.supportsAutoplay : h.supportsNoAutoplay;
    $ (document.documentElement).addClass (t), e || (l = !0), (r = !0);
  }
  function m (e) {
    var t = e.$parentSlideshowWrapper, i = e.$parentSlide;
    if ((i.removeClass (h.loading), 'background' !== e.status)) {
      switch (($ ('#' + e.id).attr ('tabindex', '0'), e.type)) {
        case 'chrome':
        case 'background-chrome':
          t.removeClass (h.paused).addClass (h.playing), i
            .removeClass (h.paused)
            .addClass (h.playing);
      }
      i.find ('.' + h.closeVideoBtn).focus ();
    }
  }
  function f (e) {
    var t = e.$parentSlideshowWrapper, i = e.$parentSlide;
    'background-chrome' !== e.type
      ? ('closed' !== e.status &&
          'background' !== e.type &&
          (t.addClass (h.paused), i.addClass (h.paused)), 'chrome' === e.type &&
          'closed' === e.status &&
          (t.removeClass (h.paused), i.removeClass (h.paused)), t.removeClass (
          h.playing
        ), i.removeClass (h.playing))
      : n (e.id);
  }
  function n (e) {
    var t,
      i,
      s = d[e],
      o = s.$parentSlideshowWrapper,
      a = s.$parentSlide,
      n = [h.pause, h.playing].join (' ');
    switch (($ ('#' + s.id).attr ('tabindex', '-1'), (s.status =
      'closed'), s.type)) {
      case 'background-chrome':
        u[e].mute (), (t = e), (i = $ ('#' + t)
          .addClass (h.videoBackground)
          .removeClass (h.videoChrome)), d[t].$parentSlide.addClass (
          h.slideBackgroundVideo
        ), (d[t].status = 'background'), _ (i);
        break;
      case 'chrome':
        u[e].stopVideo (), f (s);
    }
    o.removeClass (n), a.removeClass (n);
  }
  function g (e) {
    return d[e.target.a.id];
  }
  function t (t) {
    var e, i = d[t];
    switch ((i.$parentSlide.addClass (h.loading), (i.status =
      'open'), i.type)) {
      case 'background-chrome':
        (e = t), $ ('#' + e)
          .removeAttr ('style')
          .removeClass (h.videoBackground)
          .addClass (h.videoChrome), d[e].$parentSlideshowWrapper
          .removeClass (h.slideBackgroundVideo)
          .addClass (h.playing), d[e].$parentSlide
          .removeClass (h.slideBackgroundVideo)
          .addClass (h.playing), (d[e].status = 'open'), u[t].unMute (), o (
          t,
          !0
        );
        break;
      case 'chrome':
        o (t, !0);
    }
    $ (document).on ('keydown.videoPlayer', function (e) {
      27 === e.keyCode && n (t);
    });
  }
  function v () {
    $ ('.' + h.videoBackground).each (function (e, t) {
      _ ($ (t));
    });
  }
  function _ (e) {
    var t = e.closest ('.' + h.slide);
    if (!t.hasClass (h.slickClone)) {
      var i = t.width (), s = e.width (), o = e.height ();
      i / a.ratio < o
        ? ((s = Math.ceil (o * a.ratio)), e
            .width (s)
            .height (o)
            .css ({left: (i - s) / 2, top: 0}))
        : ((o = Math.ceil (i / a.ratio)), e
            .width (i)
            .height (o)
            .css ({
              left: 0,
              top: (o - o) / 2,
            })), e.prepareTransition ().addClass (h.loaded);
    }
  }
  function y () {
    $ (document).on ('click.videoPlayer', '.' + h.playVideoBtn, function (e) {
      t ($ (e.currentTarget).data ('controls'));
    }), $ (document).on ('click.videoPlayer', '.' + h.closeVideoBtn, function (
      e
    ) {
      n ($ (e.currentTarget).data ('controls'));
    }), $ (window).on (
      'resize.videoPlayer',
      $.debounce (250, function () {
        s && v ();
      })
    );
  }
  return {
    init: function (e) {
      if (
        e.length &&
        ((d[e.attr ('id')] = {
          id: e.attr ('id'),
          videoId: e.data ('id'),
          type: e.data ('type'),
          status: 'chrome' === e.data ('type') ? 'closed' : 'background',
          videoSelector: e.attr ('id'),
          $parentSlide: e.closest ('.' + h.slide),
          $parentSlideshowWrapper: e.closest ('.' + h.slideshowWrapper),
          controls: 'background' === e.data ('type') ? 0 : 1,
          slideshow: e.data ('slideshow'),
        }), !s)
      ) {
        var t = document.createElement ('script');
        t.src = 'https://www.youtube.com/iframe_api';
        var i = document.getElementsByTagName ('script')[0];
        i.parentNode.insertBefore (t, i);
      }
    },
    loadVideos: function () {
      for (var e in d)
        if (d.hasOwnProperty (e)) {
          var t = $.extend ({}, a, d[e]);
          (t.playerVars.controls = t.controls), (u[e] = new YT.Player (e, t));
        }
      y (), (s = !0);
    },
    loadVideo: function (e) {
      if (s) {
        var t = $.extend ({}, a, d[e]);
        (t.playerVars.controls = t.controls), (u[e] = new YT.Player (
          e,
          t
        )), y ();
      }
    },
    playVideo: function (e) {
      (i || l) && e && 'function' == typeof u[e].playVideo && o (e);
    },
    pauseVideo: function (e) {
      u[e] && 'function' == typeof u[e].pauseVideo && u[e].pauseVideo ();
    },
    removeEvents: function () {
      $ (document).off ('.videoPlayer'), $ (window).off ('.videoPlayer');
    },
  };
}) ()), (function () {
  var e = $ ('#BlogTagFilter');
  e.length &&
    e.on ('change', function () {
      location.href = $ (this).val ();
    });
}) (), (window.theme = theme || {}), (theme.customerTemplates = (function () {
  function t () {
    $ ('#RecoverPasswordForm').toggleClass ('hide'), $ (
      '#CustomerLoginForm'
    ).toggleClass ('hide');
  }
  return {
    init: function () {
      var e;
      '#recover' === window.location.hash && t (), $ (document).off (
        'click',
        '#RecoverPassword'
      ), $ (document).on ('click', '#RecoverPassword', function (e) {
        e.preventDefault (), t ();
      }), $ (document).off ('click', '#HideRecoverPasswordLink'), $ (
        document
      ).on ('click', '#HideRecoverPasswordLink', function (e) {
        e.preventDefault (), t ();
      }), $ ('.reset-password-success').length &&
        $ ('#ResetSuccess').removeClass ('hide'), (e = $ ('#AddressNewForm'))
        .length &&
        (Shopify &&
          new Shopify.CountryProvinceSelector (
            'AddressCountryNew',
            'AddressProvinceNew',
            {hideElement: 'AddressProvinceContainerNew'}
          ), $ ('.address-country-option').each (function () {
          var e = $ (this).data ('form-id'),
            t = 'AddressCountry_' + e,
            i = 'AddressProvince_' + e,
            s = 'AddressProvinceContainer_' + e;
          new Shopify.CountryProvinceSelector (t, i, {hideElement: s});
        }), $ ('.address-new-toggle').on ('click', function () {
          e.toggleClass ('hide');
        }), $ ('.address-edit-toggle').on ('click', function () {
          var e = $ (this).data ('form-id');
          $ ('#EditAddress_' + e).toggleClass ('hide');
        }), $ ('.address-delete').on ('click', function () {
          var e = $ (this),
            t = e.data ('form-id'),
            i = e.data ('confirm-message');
          confirm (i || 'Are you sure you wish to delete this address?') &&
            Shopify.postLink ('/account/addresses/' + t, {
              parameters: {_method: 'delete'},
            });
        }));
    },
  };
}) ()), (theme.Cart = (function () {
  function e (e) {
    var t = (this.$container = $ (e)).attr ('data-section-id');
    (this.settings = {
      namespace: '#CartSection-' + t,
      sectionId: t,
    }), (this.selectors = {
      quantity: '.item__qty-' + t,
      agree: '#cart__agree-' + t,
      checkout: '.cart__checkout-' +
        t +
        ' [name="checkout"], .cart__checkout-' +
        t +
        ' [name="goto_pp"], .cart__checkout-' +
        t +
        ' [name="goto_gc"]',
      remove: '.item__remove-' + t,
      update: '.cart__update-' + t,
    }), this._qtyCart (), this._checkoutCart (), this._removeCart (), this._updateCart (), this._productsSlider ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    _removeCart: function () {
      var s = this;
      $ (document).off ('click', s.selectors.remove), $ (
        document
      ).on ('click', s.selectors.remove, function (e) {
        e.preventDefault ();
        var t = $ (this).attr ('href'), i = $ (s.settings.namespace);
        i.addClass ('loading'), $.post (t, function () {
          $.get ('/cart?view=popup', function (e) {
            i.html (
              $ (e).find (s.settings.namespace).html ()
            ), setTimeout (function () {
              i.removeClass ('loading'), theme.MiniCart.update ();
              var e = new theme.Sections ();
              e.register (
                'cart-gift-popup',
                theme.CartGift
              ), e.register ('shipping-calculator-popup', theme.ShippingCalculator);
            }, 100);
          });
        });
      });
    },
    _updateCart: function () {
      var s = this;
      $ (document).off ('click', s.selectors.update), $ (
        document
      ).on ('click', s.selectors.update, function (e) {
        e.preventDefault ();
        var t = $ (this).closest ('form'), i = $ (s.settings.namespace);
        return $.ajax ({
          type: 'POST',
          url: '/cart/update.js',
          async: !0,
          cache: !1,
          data: t.serialize (),
          dataType: 'json',
          beforeSend: function () {
            i.addClass ('loading');
          },
          success: function (e) {
            $.get ('/cart?view=popup', function (e) {
              i.html (
                $ (e).find (s.settings.namespace).html ()
              ), setTimeout (function () {
                i.removeClass ('loading'), theme.MiniCart.update ();
                var e = new theme.Sections ();
                e.register (
                  'cart-gift-popup',
                  theme.CartGift
                ), e.register ('shipping-calculator-popup', theme.ShippingCalculator);
              }, 100);
            });
          },
        }), !1;
      });
    },
    _qtyCart: function () {
      $ (document).off ('click', this.selectors.quantity + ' .plus'), $ (
        document
      ).on ('click', this.selectors.quantity + ' .plus', function () {
        var e = $ (this).parent ().find ('.qty'), t = parseInt (e.val ());
        (t += 1), e.val (t);
      }), $ (document).off ('click', this.selectors.quantity + ' .minus'), $ (
        document
      ).on ('click', this.selectors.quantity + ' .minus', function () {
        var e = $ (this).parent ().find ('.qty'), t = parseInt (e.val ());
        0 < t && (--t, e.val (t));
      });
    },
    _checkoutCart: function () {
      var s = this;
      $ (s.selectors.agree).length &&
        ($ (document).off ('click', s.selectors.checkout), $ (
          document
        ).on ('click', s.selectors.checkout, function () {
          if ($ (s.selectors.agree).length) {
            var e = $ (this), t = $ (s.selectors.agree);
            if (!t.is (':checked')) {
              var i = t.data ('message');
              return alert (i), !1;
            }
            e.submit ();
          }
        }), $ (document).on ('change', s.selectors.agree, function (e) {
          $ (this).is (':checked')
            ? $ (s.selectors.checkout).removeClass ('btn-disabled')
            : $ (s.selectors.checkout).addClass ('btn-disabled');
        }));
    },
    _productsSlider: function () {
      new theme.Sections ().register (
        'products-slider-sub',
        theme.ProductsSlider
      );
    },
    _lineItem: function () {
      theme.CurrencyPicker.convertAll (), theme.roarJs.initReviews ();
      var e = new theme.Sections ();
      e.register ('line_item', theme.LineItem), e.register (
        'countdown-timer',
        theme.CountdownTimer
      );
    },
    onLoad: function () {
      this._lineItem ();
    },
    onUnload: function () {
      this.$container.off (this.settings.namespace);
    },
  })), e;
}) ()), (theme.ShippingCalculator = (function () {
  function ShippingCalculator (e) {
    var t = (this.$container = $ (e)).attr ('data-section-id');
    (this.selectors = {
      shipping_btn: '#cart__shipping-btn-' + t,
      shipping_calculator: '#shipping__calculator-' + t,
      get_rates: '#shipping__calculator-btn-' + t,
      response: '#shipping__calculator-response-' + t,
      template: '<p id ="shipping-rates-feedback-' +
        t +
        '" class="shipping-rates-feedback"></p>',
      address_country: 'address_country-' + t,
      address_province: 'address_province-' + t,
      address_zip: 'address_zip-' + t,
      address_province_label: 'address_province_label-' + t,
      address_province_container: 'address_province_container-' + t,
    }), (this.strings = {
      submitButton: theme.strings.shippingButton,
      submitButtonDisabled: theme.strings.shippingButtonDisabled,
      customerIsLoggedIn: theme.settings.customerIsLoggedIn,
      moneyFormat: theme.settings.moneyFormat,
    }), this._init ();
  }
  return (ShippingCalculator.prototype = _.assignIn (
    {},
    ShippingCalculator.prototype,
    {
      _disableButtons: function () {
        var e = this.selectors, t = this.strings;
        $ (e.get_rates)
          .text (t.submitButtonDisabled)
          .attr ('disabled', 'disabled')
          .addClass ('disabled');
      },
      _enableButtons: function () {
        var e = this.selectors, t = this.strings;
        $ (e.get_rates)
          .removeAttr ('disabled')
          .removeClass ('disabled')
          .text (t.submitButton);
      },
      _render: function (e) {
        var t = this.selectors,
          i = (this.strings, $ (t.template)),
          s = $ (t.response);
        if (s.length) {
          if (e.success)
            if ((i.addClass ('success'), e.rates)) {
              i.append (e.rates);
              var o = e.rates;
              if (o[0]) {
                var a = o[0];
                i.append (
                  'Rates start at <span class="money">' + a.price + '</span>.'
                );
              }
            } else i.append ('We do not ship to this destination.');
          else i.addClass ('error'), i.append (e.errorFeedback);
          i.appendTo (s), theme.CurrencyPicker.convert (t.response + ' .money');
        }
      },
      _formatRate: function (e) {
        this.selectors;
        var t = this.strings;
        if ('function' == typeof Shopify.formatMoney)
          return Shopify.formatMoney (e, t.moneyFormat);
        'string' == typeof e && (e = e.replace ('.', ''));
        var i = '', s = /\{\{\s*(\w+)\s*\}\}/, o = t.moneyFormat;
        function a (e, t) {
          return void 0 === e ? t : e;
        }
        function n (e, t, i, s) {
          if (
            ((t = a (t, 2)), (i = a (i, ',')), (s = a (s, '.')), isNaN (e) ||
              null == e)
          )
            return 0;
          var o = (e = (e / 100).toFixed (t)).split ('.');
          return (
            o[0].replace (/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + i) +
            (o[1] ? s + o[1] : '')
          );
        }
        switch (o.match (s)[1]) {
          case 'amount':
            i = n (e, 2);
            break;
          case 'amount_no_decimals':
            i = n (e, 0);
            break;
          case 'amount_with_comma_separator':
            i = n (e, 2, '.', ',');
            break;
          case 'amount_no_decimals_with_comma_separator':
            i = n (e, 0, '.', ',');
        }
        return o.replace (s, i);
      },
      _onCartShippingRatesUpdate: function (e, t) {
        var i = this.selectors;
        this.strings;
        this._enableButtons ();
        var s = '';
        if (
          (t.zip && (s += t.zip + ', '), t.province &&
            (s += t.province + ', '), (s += t.country), e.length)
        )
          for (var o = 0; o < e.length; o++)
            e[o].price = this._formatRate (e[o].price);
        this._render ({rates: e, address: s, success: !0}), $ (
          i.response
        ).fadeIn ();
      },
      _pollForCartShippingRatesForDestination: function (s) {
        var o = this,
          a = (this.selectors, this.strings, function () {
            $.ajax ('/cart/async_shipping_rates', {
              dataType: 'json',
              success: function (e, t, i) {
                200 === i.status
                  ? o._onCartShippingRatesUpdate (e.shipping_rates, s)
                  : setTimeout (a, 500);
              },
              error: function (e, t) {
                o._onError (e, t, o);
              },
            });
          });
        return a;
      },
      _fullMessagesFromErrors: function (e) {
        this.selectors, this.strings;
        var s = [];
        return $.each (e, function (i, e) {
          $.each (e, function (e, t) {
            s.push (i + ' ' + t);
          });
        }), s;
      },
      _onError: function (XMLHttpRequest, textStatus, self) {
        var selectors = self.selectors, strings = self.strings;
        self._enableButtons ();
        var feedback = '',
          data = eval ('(' + XMLHttpRequest.responseText + ')');
        (feedback = data.message
          ? data.message + '(' + data.status + '): ' + data.description
          : 'Error : ' +
              self._fullMessagesFromErrors (data).join ('; ') +
              '.'), 'Error : country is not supported.' === feedback &&
          (feedback = 'We do not ship to this destination.'), self._render ({
          rates: [],
          errorFeedback: feedback,
          success: !1,
        }), $ (selectors.response).show ();
      },
      _getCartShippingRatesForDestination: function (e) {
        var i = this;
        this.selectors, this.strings;
        $.ajax ({
          type: 'POST',
          url: '/cart/prepare_shipping_rates',
          data: $.param ({shipping_address: e}),
          success: i._pollForCartShippingRatesForDestination (e),
          error: function (e, t) {
            i._onError (e, t, i);
          },
        });
      },
      _init: function () {
        var t = this, i = this.selectors, e = this.strings;
        if ($ (i.shipping_calculator).length) {
          new Shopify.CountryProvinceSelector (
            i.address_country,
            i.address_province,
            {hideElement: i.address_province_container}
          );
          var s = $ ('#' + i.address_country),
            o = $ ('#' + i.address_province_label).get (0);
          'undefined' != typeof Countries &&
            (Countries.updateProvinceLabel (
              s.val (),
              o
            ), s.change (function () {
              Countries.updateProvinceLabel (s.val (), o);
            })), $ (i.get_rates).off ('click'), $ (
            i.get_rates
          ).click (function () {
            t._disableButtons (), $ (i.response).empty ().hide ();
            var e = {};
            (e.zip =
              $ ('#' + i.address_zip).val () ||
              ''), (e.country = $ ('#' + i.address_country).val () || ''), (e.province = $ ('#' + i.address_province).val () || ''), t._getCartShippingRatesForDestination (e);
          }), e.customerIsLoggedIn &&
            $ (i.get_rates + ':eq(0)').trigger ('click'), $ (
            i.shipping_btn
          ).off ('click'), $ (i.shipping_btn).click (function () {
            $ (i.shipping_calculator).slideToggle ();
          });
        }
      },
    }
  )), ShippingCalculator;
}) ()), (theme.CartGift = (function () {
  function e (e) {
    var t = (this.$container = $ (e)).attr ('data-section-id');
    (this.selectors = {
      gift: '#gift__wrapping-' + t,
      namespace: '#CartSection-' + t,
      redirect: !0,
    }), this.init ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    check: function () {
      var e = this.selectors;
      if ($ (e.gift).length)
        switch ($ (e.gift).data ('gift_case')) {
          case 1:
            this.remove ();
            break;
          case 2:
          case 3:
          case 3:
            this.set ();
        }
    },
    set: function () {
      var i = this.selectors;
      if ($ (i.gift).length) {
        var e = $ (i.gift).data ('product_id'), t = new Object ();
        t[e] = 1;
        var s = new Object ();
        s['gift-wrapping'] = !0;
        var o = new Object ();
        (o.updates = t), (o.attributes = s), $.ajax ({
          type: 'POST',
          url: '/cart/update.js',
          data: o,
          dataType: 'json',
          beforeSend: function () {
            i.redirect || $ (i.namespace).addClass ('loading');
          },
          success: function () {
            if (i.redirect) location.href = '/cart';
            else {
              var t = $ (i.namespace);
              $.get ('/cart?view=popup', function (e) {
                t.html (
                  $ (e).find (i.namespace).html ()
                ), setTimeout (function () {
                  t.removeClass (
                    'loading'
                  ), theme.MiniCart.update (), new theme.Sections ().register ('shipping-calculator-popup', theme.ShippingCalculator);
                }, 100);
              });
            }
          },
        });
      }
    },
    remove: function () {
      var i = this.selectors;
      if ($ (i.gift).length) {
        var e = $ (i.gift).data ('product_id'), t = new Object ();
        t[e] = 0;
        var s = new Object ();
        s['gift-wrapping'] = '';
        var o = new Object ();
        (o.updates = t), (o.attributes = s), $.ajax ({
          type: 'POST',
          url: '/cart/update.js',
          data: o,
          dataType: 'json',
          beforeSend: function () {
            i.redirect || $ (i.namespace).addClass ('loading');
          },
          success: function () {
            if (i.redirect) location.href = '/cart';
            else {
              var t = $ (i.namespace);
              $.get ('/cart?view=popup', function (e) {
                t.html (
                  $ (e).find (i.namespace).html ()
                ), setTimeout (function () {
                  t.removeClass (
                    'loading'
                  ), theme.MiniCart.update (), new theme.Sections ().register ('shipping-calculator-popup', theme.ShippingCalculator);
                }, 100);
              });
            }
          },
        });
      }
    },
    init: function () {
      var e = this, t = this.selectors;
      $ (t.gift).length &&
        (0 == $ (t.gift).data ('redirect') &&
          (this.selectors.redirect = !1), e.check (), $ (document).off (
          'change',
          t.gift
        ), $ (document).on ('change', t.gift, function () {
          $ (this).is (':checked') ? e.set () : e.remove ();
        }));
    },
  })), e;
}) ()), (theme.Filters = (function () {
  var i = 'sort_by',
    s = 'limit',
    o = 'view',
    d = 'constraint',
    a = '#PerPage',
    e = '#DefaultPerPage',
    n = '#SortBy',
    t = '#DefaultSortBy',
    r = '.shop__view',
    c = '#site-pagination a.btn',
    l = '#site-pagination .loadmore',
    u = '.advanced-filter .filter',
    h = '.site-widget.filtering .clear';
  function p (e) {
    var t = (this.$container = $ (e));
    (this.$limitSelect = $ (a, t)), (this.$sortSelect = $ (
      n,
      t
    )), (this.$selects = $ (a, t).add (
      $ (n, t)
    )), (this.defaultLimit = this._getDefaultLimitValue ()), (this.defaultSort = this._getDefaultSortValue ()), this._resizeSelect (
      this.$selects
    ), this.$selects.removeClass ('hidden'), this.$limitSelect.on (
      'change',
      this._onLimitChange.bind (this)
    ), this.$sortSelect.on ('change', this._onSortChange.bind (this)), $ (
      document
    ).on ('change', u, this._onFilterChange.bind (this)), $ (document).on (
      'click',
      h,
      this._onFilterClear.bind (this)
    ), $ (document).on ('click', c, this._onPageClick.bind (this)), $ (
      document
    ).on ('click', l, this._onLoadMoreClick.bind (this)), $ (document).on (
      'click',
      r,
      this._onViewClick.bind (this)
    ), this._onLoadMoreInfinite (
      l
    ), this._initFiltersHtml (), this._initFiltersActive (), this._filterClearAll ();
  }
  return (p.prototype = _.assignIn ({}, p.prototype, {
    _initFiltersHtml: function () {
      $ ('.shop__filtering').length &&
        $ ('.shop__filtering-inner')
          .empty ()
          .append ($ ('.site-sidebar').html ());
    },
    _initFiltersActive: function () {
      if ($ ('.filters__active').length) {
        var i = $ ('.filters__active .clear_nav').empty ();
        $ ('.site-sidebar .site-widget.filtering').each (function () {
          var e = $ (this);
          if (e.find ('.filter-tag.active').length) {
            var t = e.find ('.filter-tag.active label').clone ();
            i.append (t);
          } else if (
            e.find ('.filter-tag select').length &&
            '' != e.find ('.filter-tag select').val ()
          ) {
            t =
              '<label for="' +
              e.find ('.filter-tag input').attr ('id') +
              '">' +
              e.find ('.filter-tag select').val () +
              '</label>';
            i.append (t);
          }
        }), i.find ('label').length
          ? $ ('.filters__active').show ()
          : $ ('.filters__active').hide ();
      }
    },
    _filterClearAll: function () {
      var e = this;
      $ ('.filters__active').length &&
        $ ('.filters__active').on ('click', '.clear_all', function () {
          delete Shopify.queryParams[d], e._filterAjaxClick (!0);
        });
    },
    _onFilterClear: function (e) {
      var i = [];
      Shopify.queryParams[d] && (i = Shopify.queryParams[d].split ('+'));
      var t = $ (e.currentTarget).closest ('.site-widget.filtering'),
        s = t.find ('select');
      0 < s.length &&
        s.find ('option').each (function () {
          var e = $ (this).val ();
          if (e) {
            var t = i.indexOf (e);
            0 <= t && i.splice (t, 1);
          }
        });
      var o = t.find ('input');
      0 < o.length &&
        o.each (function () {
          var e = $ (this).val ();
          if (e) {
            var t = i.indexOf (e);
            0 <= t && i.splice (t, 1);
          }
        }), i.length
        ? (Shopify.queryParams[d] = i.join ('+'))
        : delete Shopify.queryParams[d], this._filterAjaxClick (!0);
    },
    _onFilterChange: function (e) {
      var t = $ (e.currentTarget),
        i = t.closest ('.advanced-filter'),
        s = t.closest ('.filter-tag'),
        o = i.data ('multi_choice'),
        a = [];
      if (
        (Shopify.queryParams[d] &&
          (a = Shopify.queryParams[d].split ('+')), 0 == o &&
          !s.hasClass ('active'))
      ) {
        var n = i.find ('.active input');
        0 < n.length &&
          n.each (function () {
            var e = $ (this).val ();
            if (e) {
              var t = a.indexOf (e);
              0 <= t && a.splice (t, 1);
            }
          });
      }
      var r = i.find ('select');
      0 < r.length &&
        r.find ('option').each (function () {
          var e = $ (this).val ();
          if (e) {
            var t = a.indexOf (e);
            0 <= t && a.splice (t, 1);
          }
        });
      var c = t.val ();
      if (c) {
        var l = a.indexOf (c);
        0 <= l ? a.splice (l, 1) : a.push (c);
      }
      a.length
        ? (Shopify.queryParams[d] = a.join ('+'))
        : delete Shopify.queryParams[d], this._filterAjaxClick (!0);
    },
    _onViewClick: function (e) {
      e.preventDefault ();
      var t = $ (e.currentTarget), i = $ (r), s = t.data ('view');
      'grid' == s && (s = s + '-' + t.data ('per_row')), (Shopify.queryParams[
        o
      ] = s), this._filterAjaxClick (), i.removeClass ('active'), t.addClass (
        'active'
      );
    },
    _onLoadMoreInfinite: function (e) {
      var t = $ (e).closest ('.ajax_load_button');
      if (t.hasClass ('ajax_load_hidden')) {
        var i = '#site-primary .products', s = Math.abs (0);
        $ (window).scroll (function () {
          $ (i).length &&
            $ ('#site-pagination').find ('a.next').length &&
            $ (i).offset ().top +
              $ (i).outerHeight () -
              $ (window).scrollTop () -
              s <
              $ (window).height () &&
            0 == parseInt ($ (e).attr ('data-processing')) &&
            $ (e).trigger ('click');
        });
      }
    },
    _onLoadMoreClick: function (e) {
      e.preventDefault ();
      var t = '#site-pagination .loadmore',
        i = '#site-pagination .ajax_load_button',
        s = '#site-primary .products .product',
        o = '#site-pagination';
      if (1 != parseInt ($ (t).attr ('data-processing')))
        if ($ (o).find ('a.next').length) {
          $ (t).attr ('data-processing', 1);
          var a = $ (o).find ('a.next').attr ('href'),
            n = $ (t).data ('no_more');
          $ (i).addClass ('loading'), $.get (a, function (e) {
            $ (o)
              .empty ()
              .html ($ (e).find (o).html ()), $ (e).find (s).each (function () {
              $ (s).last ().after ($ (this));
            }), $ (i).removeClass (
              'loading'
            ), $ (t).attr ('data-processing', 0), 0 == $ (o).find ('a.next').length && ($ (i).addClass ('ajax_load_finished').removeClass ('ajax_load_hidden'), $ (t).show ().html (n).addClass ('disabled').prop ('disabled', !0));
          });
        } else {
          n = $ (t).attr ('data-no-more');
          $ (i)
            .addClass ('ajax_load_finished')
            .removeClass ('ajax_load_hidden'), $ (t)
            .show ()
            .html (n)
            .addClass ('disabled')
            .prop ('disabled', !0);
        }
    },
    _onPageClick: function (e) {
      e.preventDefault ();
      var t = $ (e.currentTarget).attr ('href');
      this._filterGetContent (t);
    },
    _onSortChange: function (e) {
      var t = this.$sortSelect.val () || this.defaultSort;
      (Shopify.queryParams[
        i
      ] = t), this._filterAjaxClick (), this._resizeSelect ($ (e.target));
    },
    _onLimitChange: function (e) {
      var t = this.$limitSelect.val () || this.defaultLimit;
      (Shopify.queryParams[
        s
      ] = t), this._filterAjaxClick (), this._resizeSelect ($ (e.target));
    },
    _getDefaultLimitValue: function () {
      return $ (e, this.$container).val ();
    },
    _getDefaultSortValue: function () {
      return $ (t, this.$container).val ();
    },
    _resizeSelect: function (e) {
      e.each (function () {
        var e = $ (this),
          t = e.find ('option:selected').text (),
          i = $ ('<span>').html (t);
        i.appendTo ('body');
        var s = i.width ();
        i.remove (), e.width (s + 3);
      });
    },
    _filterAjaxClick: function (e) {
      void 0 === e && (e = !1), delete Shopify.queryParams.page;
      var t = this._filterCreateUrl ();
      this._filterGetContent (t, e);
    },
    _filterCreateUrl: function () {
      var e = $.param (Shopify.queryParams).replace (/%2B/g, '+');
      return location.pathname + '?' + e;
    },
    _filterGetContent: function (i, s) {
      void 0 === s && (s = !1);
      var o = '#site-primary .products',
        a = '#site-primary .product-found',
        n = '#site-primary .products .product',
        r = '#site-pagination',
        c = '#site-secondary .site-sidebar',
        l = this;
      $ ('body').removeClass ('sidebar-open'), $ (
        '.shop__filtering'
      ).slideUp ();
      var e = 40;
      $ ('#shopify-section-header-sticky').length &&
        $ ('#shopify-section-header-sticky').is (':visible')
        ? (e += $ ('#shopify-section-header-sticky').outerHeight ())
        : $ ('#shopify-section-header-mobile').length &&
            $ ('#shopify-section-header-mobile').is (':visible') &&
            (e += $ ('#shopify-section-header-mobile').outerHeight ()), $ (
        'html, body'
      ).animate (
        {scrollTop: $ ('#site-primary').offset ().top - e},
        1200
      ), $.ajax ({
        type: 'GET',
        url: i,
        beforeSend: function () {
          $ ('body').addClass ('loading');
        },
        complete: function () {
          $ ('body').removeClass ('loading');
        },
        success: function (e) {
          $.fn.countdown &&
            $ (o).find ('.product__countdown .is-countdown').each (function () {
              $ (this).countdown ('destroy');
            }), $ (r).empty ().html ($ (e).find (r).html ()), s &&
            ($ (c).empty ().html ($ (e).find (c).html ()), $ (
              '#site-primary .shop__filtering-inner'
            )
              .empty ()
              .append ($ (c).html ()), new theme.Sections ().register (
              'sidebar-sticky',
              theme.SidebarSticky
            ));
          $ (o).empty ().attr ('class', $ (e).find (o).attr ('class')), 0 <
            $ (e).find (n).length
            ? $ (e).find (n).each (function () {
                $ (o).append ($ (this));
              })
            : $ (o).append ($ (e).find ('#site-primary .no-products')), $ (a)
            .empty ()
            .html ($ (e).find (a).html ()), l._initFiltersActive ();
          var t = $ (e).filter ('title').text ();
          History.pushState ({param: Shopify.queryParams}, t, i);
        },
      });
    },
    _lineItem: function () {
      theme.CurrencyPicker.convertAll (), theme.roarJs.initReviews ();
      var e = new theme.Sections ();
      e.register ('line_item', theme.LineItem), e.register (
        'countdown-timer',
        theme.CountdownTimer
      );
    },
    onLoad: function () {
      this._lineItem ();
    },
    onUnload: function () {
      this.$limitSelect.off (
        'change',
        this._onLimitChange
      ), this.$sortSelect.off ('change', this._onSortChange), $ (document).off (
        'click',
        r,
        this._onViewClick
      ), $ (document).off ('click', c, this._onPageClick), $ (document).off (
        'click',
        l,
        this._onLoadMoreClick
      );
    },
  })), p;
}) ()), (theme.SidebarSticky = (function () {
  function e (e) {
    (this.$container = $ (e)).attr ('data-section-id');
    (this.settings = {
      selector: '#site-secondary .site-sidebar',
      primary: '#site-primary',
      toggle: '#site-secondary .site-widget__toggle',
    }), this.init (), this.update ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    init: function (e) {
      var t = $ (this.settings.selector);
      if (!($ (window).width () < 992)) {
        var i = 40, s = $ (this.settings.primary);
        $ ('.site-header').hasClass ('header-sticky') && (i = 60);
        var o = t.outerHeight () - s.outerHeight ();
        o < -100
          ? t.stick_in_parent ({offset_top: i})
          : 100 < o && s.stick_in_parent ({offset_top: i}), $ (
          window
        ).resize (function () {
          $ (window).width () < 992
            ? (t.trigger ('sticky_kit:detach'), s.trigger ('sticky_kit:detach'))
            : t.outerHeight () < s.outerHeight ()
                ? t.stick_in_parent ({offset_top: i})
                : s.stick_in_parent ({offset_top: i});
        });
      }
    },
    update: function () {
      $ (this.settings.toggle).on ('change', function () {
        $ (document.body).trigger ('sticky_kit:recalc');
      });
    },
  })), e;
}) ()), (theme.HeaderMobile = (function () {
  function e (e) {
    (this.$container = $ (e)).attr ('data-section-id');
    (this.selectors = {
      headerFixed: '.header__mobile.is-fixed',
      navOpenIcon: '.mobile-nav__open',
      navCloseIcon: '.mobile-nav__close',
      navWrapper: '.mobile-header__nav .mobile__menu',
      megaMenu: '#phantom__menu',
    }), this._initHeaderFixed (), this._initMenu (), this._productsSlider (), theme.Search.init (), theme.MiniCart.init ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    _animMenu: function () {
      var e = new TimelineLite (),
        t = $ ('.mobile__menu .listitem-0'),
        i = $ ('.mobile__menu .listitem-0 > .listitem > .site-nav__link');
      theme.settings.rtl
        ? (e.fromTo (
            t,
            0.1,
            {autoAlpha: 0},
            {autoAlpha: 1},
            0
          ), e.staggerFromTo (
            i,
            2,
            {opacity: 0, y: 150, x: -30, rotation: -10},
            {opacity: 1, y: 0, x: 0, rotation: 0, ease: Power4.easeInOut},
            0.08,
            -0.8
          ))
        : (e.fromTo (
            t,
            0.1,
            {autoAlpha: 0},
            {autoAlpha: 1},
            0
          ), e.staggerFromTo (
            i,
            2,
            {opacity: 0, y: 150, x: 30, rotation: 10},
            {opacity: 1, y: 0, x: 0, rotation: 0, ease: Power4.easeInOut},
            0.08,
            -0.8
          ));
    },
    _initHeaderFixed: function () {
      if ($ (this.selectors.headerFixed).length) {
        var t = $ (this.selectors.headerFixed), i = t.parent ();
        function e () {
          if (t.is (':visible')) {
            var e = t.outerHeight ();
            t.addClass ('finished'), i.css ('height', e);
          }
        }
        e (), $ (window).resize (function () {
          e ();
        });
        var s = 10;
        $ (i).offset ().top;
        function o () {
          var e = $ (window).scrollTop ();
          $ (i).offset ().top + s <= e
            ? $ (t).removeClass ('unstick').addClass ('stick')
            : $ (t).removeClass ('stick').addClass ('unstick');
        }
        o (), $ (window).scroll (function () {
          o ();
        });
      }
    },
    _initMenu: function () {
      if (void 0 === $.fn.roarmenu) return !1;
      var t = this, e = t.selectors;
      if ($ (e.navWrapper).hasClass ('has-megamenu') && $ (e.megaMenu).length) {
        var i = $ ($ (e.megaMenu).val ());
        i.find ('.product__form').remove (), i
          .find ('.site-nav__dropdown:not(.drilldown)')
          .removeAttr ('class')
          .removeAttr ('style'), i
          .find ('.drilldown')
          .removeAttr ('class')
          .addClass ('drilldown'), i
          .find ('.text-left')
          .removeClass ('text-left'), i
          .find ('.text-center')
          .removeClass ('text-center'), i
          .find ('.text-right')
          .removeClass ('text-right'), $ (e.navWrapper)
          .find ('.listitem-1')
          .remove (), $ (e.navWrapper + ' .listitem-0').prepend (
          i.find ('.site-nav__items > .site-nav__item').removeAttr ('class')
        );
      }
      $ (e.navWrapper).length &&
        $ (e.navWrapper).roarmenu ({
          navbar: {
            add: !0,
            close: 'mobile-nav__close',
            title: 'Menu',
            titleLink: 'anchor',
          },
        }), $ (document).off ('click', e.navOpenIcon), $ (
        document
      ).on ('click', e.navOpenIcon, function (e) {
        e.preventDefault (), $ ('body').addClass ('menu-opened'), t._animMenu ();
      }), $ (document).off ('click', e.navCloseIcon), $ (
        document
      ).on ('click', e.navCloseIcon, function (e) {
        e.preventDefault (), $ ('body').removeClass ('menu-opened');
      });
    },
    _productsSlider: function () {
      new theme.Sections ().register (
        'products-slider-sub',
        theme.ProductsSlider
      );
    },
    _lineItem: function () {
      theme.CurrencyPicker.convertAll (), theme.roarJs.initReviews ();
      var e = new theme.Sections ();
      e.register ('line_item', theme.LineItem), e.register (
        'countdown-timer',
        theme.CountdownTimer
      );
    },
    onLoad: function () {
      this._lineItem ();
    },
  })), e;
}) ()), (theme.HeaderSection = (function () {
  function e (e) {
    (this.$container = $ (e)).attr ('data-section-id');
    this._initElements (), this._initSticky ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    _initElements: function () {
      theme.Search.init (), theme.CurrencyPicker.init (), theme.LanguagePicker.init (), theme.MiniCart.init (), new theme.Sections ().register (
        'mega-menu',
        theme.MegaMenu
      );
    },
    _initSticky: function () {
      var t = '#shopify-section-header-sticky',
        e = '#shopify-section-header',
        i = '#shopify-section-header-topbar';
      if ($ (t).length) {
        var s,
          o =
            $ (e).offset ().top +
            $ (e).outerHeight () +
            $ (i).outerHeight () +
            200;
        $ (window).scroll (function () {
          var e = $ (this).scrollTop ();
          $ (t).is (':visible') &&
            (e < o
              ? $ (t).hasClass ('stick') &&
                  ($ (t)
                    .removeClass ('stick')
                    .removeClass ('sticky-hide')
                    .addClass ('unstick'), e)
              : $ (t).hasClass ('stick') ||
                  ($ (t).removeClass ('unstick').addClass ('stick'), e));
        }), (s = $ (window).scrollTop ()), $ (e).offset ().top +
          $ (e).outerHeight () +
          $ (i).outerHeight () +
          200 <=
          s && $ (t).addClass ('stick');
      }
    },
  })), e;
}) ()), (theme.MegaMenu = (function () {
  function e () {
    this._initMenu (), this._navigationInit (), this._productsSlider ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    _initMenu: function () {
      var t,
        i = '#phantom__menu',
        e = '.header__menu',
        s = '.header__menu-left',
        o = '.header__menu-right';
      $ (i).length &&
        $ (e).length &&
        $ (e).each (function () {
          var e = $ (i).val ();
          $ (this).empty ().append (e);
        }), $ (i).length &&
        $ (s).length &&
        ((t = $ ($ (i).val ()))
          .find ('.site-nav__items > .site-nav__item')
          .each (function () {
            $ (this).hasClass ('pull-right') && $ (this).remove ();
          }), $ (s).each (function () {
          var e = t.clone ();
          $ (this).empty ().append (e);
        }));
      $ (i).length &&
        $ (o).length &&
        ((t = $ ($ (i).val ()))
          .find ('.site-nav__items > .site-nav__item')
          .each (function () {
            $ (this).hasClass ('pull-right') || $ (this).remove ();
          }), $ (o).each (function () {
          var e = t.clone ();
          $ (this).empty ().append (e);
        }));
    },
    _navigationInit: function () {
      var e = [
        '.site-navigation .site-nav__items > .site-nav--has-dropdown',
        '.my-account-has-drop',
        '.currency__picker .has-drop',
        '.language__picker .has-drop',
      ].join (', ');
      $ (e)
        .mouseenter (function (e) {
          $ (this)
            .closest ('.site-header-main, .header-sticky__placeholder')
            .attr (
              'data-sticky',
              'visible'
            ), $ ('.site-overlay').addClass ('visible');
        })
        .mouseleave (function (e) {
          $ ('.site-overlay').removeClass (
            'visible'
          ), $ (this).closest ('.site-header-main, .header-sticky__placeholder').removeAttr ('data-sticky', 'visible');
        });
    },
    _productsSlider: function () {
      new theme.Sections ().register (
        'products-slider-sub',
        theme.ProductsSlider
      );
    },
    _lineItem: function () {
      theme.CurrencyPicker.convertAll (), theme.roarJs.initReviews ();
      var e = new theme.Sections ();
      e.register ('line_item', theme.LineItem), e.register (
        'countdown-timer',
        theme.CountdownTimer
      );
    },
    onLoad: function () {
      this._lineItem ();
    },
  })), e;
}) ()), (theme.VerticalMenu = (function () {
  function e () {
    this.init ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    init: function () {
      var t = '.phantom__menu-vertical .site-nav__vertical',
        e = '.header__menu-vertical';
      $ (t).length &&
        $ (e).length &&
        $ (e).each (function () {
          var e = $ (t).clone ();
          $ (this).empty ().append (e);
        });
    },
  })), e;
}) ()), (theme.Maps = (function () {
  var d = 19,
    t = null,
    i = [],
    o = {
      addressNoResults: theme.strings.addressNoResults,
      addressQueryLimit: theme.strings.addressQueryLimit,
      addressError: theme.strings.addressError,
      authError: theme.strings.authError,
    },
    e = '[data-section-type="map"]',
    s = '[data-map]',
    a = '[data-map-overlay]',
    n = 'map-section--load-error',
    r = 'map-section__error errors text-center';
  function c (e) {
    (this.$container = $ (e)), (this.$map = this.$container.find (
      s
    )), (this.key = this.$map.data ('api-key')), void 0 !== this.key &&
      ('loaded' === t
        ? this.createMap ()
        : (i.push (this), 'loading' !== t &&
            ((t = 'loading'), void 0 === window.google &&
              $.getScript (
                'https://maps.googleapis.com/maps/api/js?key=' + this.key
              ).then (function () {
                (t = 'loaded'), $.each (i, function (e, t) {
                  t.createMap ();
                });
              }))));
  }
  return (window.gm_authFailure = function () {
    Shopify.designMode &&
      ($ (e).addClass (n), $ (s).remove (), $ (a).after (
        '<div class="' + r + '">' + theme.strings.authError + '</div>'
      ));
  }), (c.prototype = _.assignIn ({}, c.prototype, {
    createMap: function () {
      var e, i, t, s, l = this.$map;
      return ((e = l), (i = $.Deferred ()), (t = new google.maps
        .Geocoder ()), (s = e.data ('address-setting')), t.geocode (
        {address: s},
        function (e, t) {
          t !== google.maps.GeocoderStatus.OK && i.reject (t), i.resolve (e);
        }
      ), i)
        .then (
          function (e) {
            var t = [];
            (t[0] = {}), (t[1] = {}), (t[2] = {});
            var i = [];
            (i[0] = {}), (i[1] = {}), (i[2] = {}), (i[3] = {}), (i[4] = {}), (i[5] = {}), (i[6] = {}), (i[7] = {}), (i[8] = {}), (i[9] = {}), (i[10] = {}), (i[11] = {}), (i[12] = {});
            var s = [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{visibility: 'off'}],
              },
              {
                featureType: 'road.local',
                elementType: 'labels.icon',
                stylers: [{visibility: 'off'}],
              },
              {
                featureType: 'road.arterial',
                elementType: 'labels.icon',
                stylers: [{visibility: 'off'}],
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{visibility: 'off'}],
              },
              {
                featureType: 'transit',
                elementType: 'geometry.fill',
                stylers: [
                  {hue: '#dadeef'},
                  {visibility: 'on'},
                  {lightness: 1},
                  {saturation: 7},
                ],
              },
              {elementType: 'labels', stylers: [{saturation: -100}]},
              {
                featureType: 'poi',
                elementType: 'geometry.fill',
                stylers: [
                  {hue: '#dadeef'},
                  {visibility: 'on'},
                  {lightness: 20},
                  {saturation: 7},
                ],
              },
              {
                featureType: 'landscape',
                stylers: [
                  {hue: '#dadeef'},
                  {visibility: 'on'},
                  {lightness: 20},
                  {saturation: 20},
                ],
              },
              {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [
                  {hue: '#dadeef'},
                  {visibility: 'on'},
                  {lightness: 1},
                  {saturation: 7},
                ],
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                  {hue: '#dadeef'},
                  {visibility: 'on'},
                  {lightness: 1},
                  {saturation: 7},
                ],
              },
              i[0],
              i[1],
              i[2],
              i[3],
              i[4],
              i[5],
              i[6],
              i[7],
              i[8],
              i[9],
              i[10],
              i[11],
              i[12],
              t[0],
              t[1],
              t[2],
            ],
              o = new google.maps.StyledMapType (s, {name: 'Styled Map'}),
              a = {
                center: e[0].geometry.location,
                zoom: d,
                mapTypeControlOptions: {
                  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
                },
                scrollwheel: !1,
                panControl: !1,
                zoomControl: 1,
                disableDoubleClickZoom: 1,
                zoomControlOptions: {
                  style: google.maps.ZoomControlStyle.LARGE,
                  position: google.maps.ControlPosition.LEFT_CENTER,
                },
                mapTypeControl: !1,
                scaleControl: !1,
                streetViewControl: !1,
                fullscreenControlOptions: {
                  position: google.maps.ControlPosition.RIGHT_BOTTOM,
                },
              },
              n = (this.map = new google.maps.Map (l[0], a));
            n.mapTypes.set ('map_style', o), n.setMapTypeId ('map_style');
            var r = (this.center = n.getCenter ()),
              c = new google.maps.OverlayView ();
            (c.draw = function () {
              var e = this.div_;
              e ||
                (((e = this.div_ = $ (
                  '<div><div class="animated-dot"><div class="pin"></div><div class="pulse"></div></div></div>'
                )[0]).style.position =
                  'absolute'), (e.style.paddingLeft = '0px'), (e.style.cursor =
                  'pointer'), this.getPanes ().overlayImage.appendChild (e));
            }), c.setMap (n), google.maps.event.addDomListener (
              window,
              'resize',
              $.debounce (250, function () {
                google.maps.event.trigger (
                  n,
                  'resize'
                ), n.setCenter (r), l.removeAttr ('style');
              })
            );
          }.bind (this)
        )
        .fail (function () {
          var e;
          switch (status) {
            case 'ZERO_RESULTS':
              e = o.addressNoResults;
              break;
            case 'OVER_QUERY_LIMIT':
              e = o.addressQueryLimit;
              break;
            case 'REQUEST_DENIED':
              e = o.authError;
              break;
            default:
              e = o.addressError;
          }
          Shopify.designMode &&
            l
              .parent ()
              .addClass (n)
              .html ('<div class="' + r + '">' + e + '</div>');
        });
    },
    onUnload: function () {
      0 !== this.$map.length &&
        google.maps.event.clearListeners (this.map, 'resize');
    },
  })), c;
}) ()), (theme.Product = (function () {
  function e (e) {
    var t = (this.$container = $ (e)), i = t.attr ('data-section-id');
    (this.settings = {
      mediaQueryLargeUp: 'screen and (min-width: 992px)',
      mediaQueryMedium: 'screen and (max-width: 991px)',
      mediaQueryMediumUp: 'screen and (min-width: 768px)',
      mediaQuerySmall: 'screen and (max-width: 767px)',
      enableHistoryState: t.data ('enable-history-state') || !1,
      namespace: '.ProductSection-' + i,
      sectionId: i,
      sectionType: t.data ('section-type'),
      zoomEnabled: !1,
      sliderThumbsActive: !1,
      sliderImagesActive: !1,
      swatchColor: t.data ('product_swatch_color'),
      swatchColorAdvanced: t.data ('product_swatch_color_advanced'),
      swatchSize: t.data ('product_swatch_size'),
    }), (this.selectors = {
      container: t,
      inComing: '.InComing-' + i,
      addToCart: '.AddToCart-' + i,
      addToCartText: '.AddToCartText-' + i,
      comparePrice: '.ComparePrice-' + i,
      originalPrice: '.ProductPrice-' + i,
      SKU: '.product-single__sku',
      originalSelectorId: '.ProductSelect-' + i,
      productImage: '.ProductImage-' + i,
      productImages: '.product-single__photos-' + i,
      productImageWraps: '.product-single__photo-' + i,
      productVideo: '.product-single__video-' + i,
      productVideoWrap: '.product-single__video-wrapper',
      productPrices: '.product-single__price-' + i,
      productThumbImages: '.product-single__thumbnail--' + i,
      productThumbs: '.product-single__thumbnails-' + i,
      productNav: '.product-single__nav-' + i,
      singleOptionSelector: '.single-option-selector-' + i,
      singleOptionSelectorId: '.single-option-selector-' + i,
      singleOptionSwatches: 'tawcvs-swatches-' + i,
      sizeChart: '.sizechart_btn',
      productContent: '.product-single__content',
      productQuantity: '.product-form__item--quantity',
      productTabs: '.product-single__tabs',
      productReviews: '.product-single__review',
      productGalleryTrigger: '.product-single__photo.photoswipe-enabled',
      productVideoTrigger: '.product-single__show-video',
      recentlyViewed: '.recently-viewed-' + i,
      cartAgree: '#product-cart__agree-' + i,
      cartCheckout: '#product-buy__1click-' + i,
      stockCountdown: '#product-single__stock-' + i,
      visitorCounter: '#product-single__visitor-' + i,
      totalSold: '#product-single__sold-' + i,
    }), $ ('.ProductJson-' + i, t).html () &&
      ((this.productSingleObject = JSON.parse (
        $ ('.ProductJson-' + i, t).html ()
      )), (this.productSwatchSingleObject = JSON.parse (
        $ ('.ProductSwatchJson-' + i, t).html ()
      )), (this.productMoreSingleObject = JSON.parse (
        $ ('.ProductMoreJson-' + i, t).html ()
      )), (this.settings.zoomEnabled = $ (
        this.selectors.productImageWraps
      ).hasClass (
        'zoom-enabled'
      )), this._updateProductObject (), this._initBreakpoints (), this._initVariants (), this._initSwatches (), this._initImageSwitch (), this._initReviews (), this._initQuantity (), this._productInView (), 'product-template' ==
        this.settings.sectionType &&
        (this._initGalleryZoom (), this._initVideoZoom (), this._initTabs (), this._stickyDetails (), this._recordRecentlyViewed (), this._sizeChart (), this._checkoutCart (), this._initStockCountdown (), this._visitorCounter (), this._totalSold (), this._productNav (), this._productsSlider ()));
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    _initBreakpoints: function () {
      var e = this;
      enquire.register (e.settings.mediaQueryMedium, {
        match: function () {
          e.settings.sliderThumbsActive &&
            e._destroyThumbnailSlider (), e._initThumbnailSlider ();
        },
      }), enquire.register (e.settings.mediaQueryLargeUp, {
        match: function () {
          e.settings.sliderThumbsActive &&
            e._destroyThumbnailSlider (), e._initThumbnailSlider (!1);
        },
      }), enquire.register (e.settings.mediaQuerySmall, {
        match: function () {
          e.settings.sliderImagesActive &&
            e._destroyImageSlider (), e._initImageSlider (), e.settings
            .zoomEnabled &&
            $ (e.selectors.productImageWraps).each (function () {
              $ (this).trigger ('zoom.destroy');
            });
        },
      }), enquire.register (e.settings.mediaQueryMediumUp, {
        match: function () {
          e.settings.sliderImagesActive &&
            e._destroyImageSlider (), e._initImageSlider (!1), e.settings
            .zoomEnabled &&
            $ (e.selectors.productImageWraps).each (function () {
              var e, t;
              (e = this), (t = $ (e).data ('zoom')), $ (e).zoom ({
                duration: 500,
                url: t,
                onZoomIn: function () {
                  $ (this).addClass ('active');
                },
                onZoomOut: function () {
                  $ (this).removeClass ('active');
                },
              });
            });
        },
      });
    },
    _productNav: function () {
      if ($ (this.selectors.productNav).length) {
        function e () {
          var e = o.offset ().top / 3,
            t = a.offset ().top - 400,
            i = $ (window).scrollTop ();
          e < i ? s.addClass ('visible') : s.removeClass ('visible'), t < i &&
            s.removeClass ('visible');
        }
        var s = $ (this.selectors.productNav),
          o = s,
          a = $ ('.product-template__end');
        e (), $ (window).scroll (e), $ (window).resize (e);
      }
    },
    _productInView: function () {
      if ('undefined' == typeof ScrollReveal || 0 == theme.settings.animation)
        return !1;
      (window.sr = ScrollReveal ()), sr.reveal (
        '.product-single__inview:not(.no-anim)',
        {
          mobile: !0,
          beforeReveal: function (t) {
            (t.visuelRevealTL = new TimelineLite ()), $ (t).addClass (
              'anim'
            ), t.visuelRevealTL
              .fromTo (
                t,
                2,
                {y: 40, opacity: 0},
                {ease: Power4.easeInOut, y: 0, opacity: 1},
                0
              )
              .call (function (e) {
                $ (t).removeClass ('anim').addClass ('no-anim');
              });
          },
        }
      );
    },
    _updateProductObject: function () {
      var s = this;
      $.each (s.productMoreSingleObject.variants, function (i, e) {
        $.each (e, function (e, t) {
          s.productSingleObject.variants[i][e] = t;
        });
      });
    },
    _totalSold: function () {
      if ($ (this.selectors.totalSold).length) {
        var e = $ (this.selectors.totalSold),
          t = e.data ('qty_min'),
          i = e.data ('qty_max'),
          s = e.data ('time_min'),
          o = e.data ('time_max');
        (t = Math.ceil (t)), (i = Math.floor (i)), (s = Math.ceil (
          s
        )), (o = Math.floor (o));
        var a = Math.floor (Math.random () * (i - t + 1)) + t;
        (a = parseInt (a)) <= t && (a = t), i < a && (a = i), e.html (
          e.html ().replace ('/count/', a)
        );
        var n = Math.floor (Math.random () * (o - s + 1)) + s;
        (n = parseInt (n)) <= s && (n = s), o < n && (n = o), e.html (
          e.html ().replace ('/time/', n)
        ), e.show (), e.find ('img').first ().length &&
          setInterval (function () {
            e
              .find ('img')
              .first ()
              .fadeIn (function () {
                $ (this).css ('visibility', 'visible');
              })
              .delay (1600)
              .fadeIn (function () {
                $ (this).css ('visibility', 'hidden');
              })
              .delay (400);
          }, 2e3);
      }
    },
    _visitorCounter: function () {
      if ($ (this.selectors.visitorCounter).length) {
        var e = $ (this.selectors.visitorCounter),
          t = e.data ('max'),
          i = e.data ('interval'),
          s = 1,
          o = t;
        (s = Math.ceil (s)), (o = Math.floor (o));
        var a = Math.floor (Math.random () * (o - s + 1)) + s,
          n = ['1', '2', '4', '3', '6', '10', '-1', '-3', '-2', '-4', '-6'],
          r = '',
          c = '',
          l = ['10', '20', '15'],
          d = ((r = ''), (c = ''), '');
        setInterval (function () {
          (r = Math.floor (
            Math.random () * n.length
          )), (c = n[r]), (a = parseInt (a) + parseInt (c)) <= 1 && ((d = Math.floor (Math.random () * l.length)), (a += l[d]));
          (a < 1 || t < a) &&
            (a =
              Math.floor (Math.random () * (o - s + 1)) +
              s), e.find ('strong').first ().text (parseInt (a)), e.show ();
        }, 1e3 * i);
      }
    },
    _initStockCountdown: function () {
      if ($ (this.selectors.stockCountdown).length) {
        var t = $ (this.selectors.stockCountdown);
        if (t.hasClass ('is-fake')) {
          var i = 60,
            e = t.data ('min'),
            s = t.data ('max'),
            o = d (e, s),
            a = null,
            n = null,
            r = 1,
            c = 1.7,
            l = 3;
          function d (e, t) {
            return Math.floor (Math.random () * (t - e + 1) + e);
          }
          function u () {
            var e = 100 * o / i;
            t.find ('.progress-bar span').css ('width', e + '%');
          }
          t
            .find ('.stock-countdown-message')
            .first ()
            .html (
              theme.strings.onlyLeft.replace ('{{ count }}', o)
            ), (a = setTimeout (function () {
            --o < r &&
              (o = d (
                e,
                s
              )), t.find ('.stock-countdown-message strong').text (o), u (), o < e && clearTimeout (a);
          }, 1e3 * l)), (n = setInterval (function () {
            --o < r &&
              (o = d (
                e,
                s
              )), t.find ('.stock-countdown-message strong').text (o), u (), o < e && clearInterval (n);
          }, 6e4 * c)), t.hasClass ('is-visible') && t.removeClass ('hide');
        }
      }
    },
    _updateStockCountdown: function (e) {
      var t = $ (this.selectors.stockCountdown);
      t.hasClass ('is-fake')
        ? t.removeClass ('hide')
        : (t
            .find ('.stock-countdown-message')
            .first ()
            .html (theme.strings.onlyLeft.replace ('{{ count }}', e)), t
            .find ('.progress-bar span')
            .first ()
            .css ('width', '100%'), t.removeClass (
            'hide'
          ), setTimeout (function () {
            t.find ('.progress-bar span').first ().css ('width', '28%');
          }, 500));
    },
    _checkoutCart: function () {
      var s = this;
      $ (s.selectors.cartAgree).length &&
        ($ (document).on (
          'DOMNodeInserted',
          s.selectors.cartCheckout,
          function () {
            var t = $ (this);
            setTimeout (function () {
              var e = t.find ('.shopify-payment-button__button');
              e.length &&
                (t.hide (), setTimeout (function () {
                  $ (s.selectors.cartAgree).is (':checked')
                    ? e.removeClass ('btn-disabled')
                    : e.addClass ('btn-disabled'), t.fadeIn ();
                }, 300));
            }, 0);
          }
        ), $ (document).on ('change', s.selectors.cartAgree, function (e) {
          var t = $ (this),
            i = $ (s.selectors.cartCheckout).find (
              '.shopify-payment-button__button'
            );
          t.is (':checked')
            ? i.removeClass ('btn-disabled')
            : i.addClass ('btn-disabled');
        }));
    },
    _pauseVideo: function () {
      var e = $ (this.selectors.productVideoWrap).find ('video')[0];
      e && e.played && (e.pause (), e.load ()), $ (
        this.selectors.productVideo
      ).removeClass ('played');
    },
    _playVideo: function (e) {
      var t = this, i = $ (t.selectors.productVideoWrap).find ('video')[0];
      if (i) {
        i.play ();
        var s = 1;
        i.addEventListener (
          'ended',
          function () {
            s < 2
              ? (i.play (), s++)
              : $ (
                  t.selectors.productThumbImages +
                    "[data-thumbnail_id='" +
                    e +
                    "']"
                )[0].click ();
          },
          !1
        );
      }
      $ (t.selectors.productVideo).addClass ('played');
    },
    _initImageSlider: function (e) {
      void 0 === e && (e = !0);
      var t = this,
        i = {
          rtl: theme.settings.rtl,
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: !0,
          dots: !0,
          arrows: !0,
          prevArrow: '<button class="slick-prev" type="button"><svg class="svg-icon"><use xlink:href="#global__symbols-prev2"></use></svg></button>',
          nextArrow: '<button class="slick-next" type="button"><svg class="svg-icon"><use xlink:href="#global__symbols-next2"></use></svg></button>',
          asNavFor: t.selectors.productThumbs,
        };
      if (
        (0 == e
          ? 1 == $ (t.selectors.productImages).data ('center_mode') &&
              ((i.centerMode = !0), (i.centerPadding =
                '25%'), (i.fade = !1), (i.arrows = !0))
          : ((i.slidesToShow = 1), (i.fade = !1), (i.dots = !0), (i.arrows = !1)), $ (
          t.selectors.productImages
        )
          .closest ('.product-single__photos')
          .find ('.carousel-status').length)
      ) {
        var o = $ (t.selectors.productImages)
          .closest ('.product-single__photos')
          .find ('.carousel-status');
        $ (t.selectors.productImages).on ('beforeChange', function (
          e,
          t,
          i,
          s
        ) {
          o.html (
            '<span>' + (s + 1) + '</span>/<span>' + t.$slides.length + '</span>'
          );
        });
      }
      theme.settings.animation &&
        $ (t.selectors.productImages).on ('init', function (e, t) {
          var i = new TimelineLite (), s = t.$slider, o = s.parent ();
          i.fromTo (
            s,
            1,
            {opacity: 0},
            {ease: Power4.easeInOut, opacity: 1},
            0
          ), i.fromTo (o, 2, {scale: 1.1, opacity: 0}, {ease: Power4.easeInOut, scale: 1, opacity: 1}, 0.3);
        }), (t.settings.sliderImagesActive = !0), $ (
        t.selectors.productImages
      ).slick (i);
    },
    _initThumbnailSlider: function (e) {
      void 0 === e && (e = !0);
      var t = this, i = !1;
      0 == e &&
        1 == $ (t.selectors.productThumbs).data ('vertical') &&
        (i = !0);
      var s = {
        rtl: theme.settings.rtl,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: i,
        verticalSwiping: i,
        asNavFor: t.selectors.productImages,
        focusOnSelect: !0,
        arrows: !1,
      };
      theme.settings.animation &&
        $ (t.selectors.productThumbs).on ('init', function (e, t) {
          var i = new TimelineLite (), s = t.$slider;
          i.fromTo (
            s.find ('.slick-list'),
            1.4,
            {y: 20, opacity: 0},
            {
              ease: Power4.easeInOut,
              y: 0,
              opacity: 1,
              onStart: function () {
                setTimeout (function () {
                  s.addClass ('shadow');
                }, 600);
              },
            },
            1
          );
        }), (t.settings.sliderThumbsActive = !0), $ (
        t.selectors.productThumbs
      ).slick (s);
    },
    _destroyImageSlider: function () {
      $ (this.selectors.productImages).slick (
        'unslick'
      ), (this.settings.sliderImagesActive = !1);
    },
    _destroyThumbnailSlider: function () {
      $ (this.selectors.productThumbs).slick (
        'unslick'
      ), (this.settings.sliderThumbsActive = !1);
    },
    _initImageSwitch: function () {
      if ($ (this.selectors.productThumbImages).length) {
        $.fn.visible = function (e) {
          var t = $ (this),
            i = $ (window),
            s = i.scrollTop (),
            o = s + i.height (),
            a = t.offset ().top,
            n = a + t.height ();
          return (!0 === e ? a : n) <= o && s <= (!0 === e ? n : a);
        };
        var n = this;
        $ (document).off ('click', n.selectors.productThumbImages), $ (
          document
        ).on ('click', n.selectors.productThumbImages, function (e) {
          e.preventDefault ();
        }), $ (n.selectors.productThumbs).on ('beforeChange', function (
          e,
          t,
          i,
          s
        ) {
          var o = $ (n.selectors.productThumbs).find ('.slick-slide').eq ([s]);
          if (o.find ('.product-single__thumbnail').length) {
            var a = o.find ('.product-single__thumbnail').data ('thumbnail_id');
            $ (n.selectors.productVideo).data ('thumbnail_prev', a), $ (
              n.selectors.productVideoWrap
            ).hide (), $ (n.selectors.productImages).show (), n._pauseVideo ();
          }
        }), $ (n.selectors.productVideo).on ('click', function () {
          var e = $ (this), t = e.data ('thumbnail_prev');
          e.hasClass ('played')
            ? $ (
                n.selectors.productThumbImages +
                  "[data-thumbnail_id='" +
                  t +
                  "']"
              )[0].click ()
            : ($ (n.selectors.productThumbs)
                .find ('.slick-slide')
                .removeClass ('slick-current'), $ (
                n.selectors.productImages
              ).hide (), $ (
                n.selectors.productVideoWrap
              ).show (), n._playVideo (t));
        }), $ (window).scroll (function (e) {
          $ (n.selectors.productImageWraps).each (function (e, t) {
            var i = $ (t);
            i.visible (!0) && i.addClass ('come-in');
          });
        });
      }
    },
    _switchImage: function (e) {
      'product-quickview' != this.settings.sectionType
        ? $ (this.selectors.productThumbImages).length &&
            $ (
              this.selectors.productThumbImages +
                "[data-thumbnail_id='" +
                e.id +
                "']"
            )[0].click ()
        : $ (this.selectors.productImage, this.selectors.container)
            .attr ('data-bgset', theme.roarJs.bgSet (e))
            .removeClass ('lazyloaded')
            .addClass ('lazyload');
    },
    _initVideoZoom: function () {
      var s = this, o = $ ('.pswp')[0];
      $ (document).off ('click', s.selectors.productVideoTrigger), $ (
        document
      ).on ('click', s.selectors.productVideoTrigger, function (e) {
        e.preventDefault ();
        $ (this).parent ();
        var t,
          i = new PhotoSwipe (
            o,
            PhotoSwipeUI_Default,
            ((t = []).push ({
              html: $ (
                s.selectors.productVideoWrap + ' .product-single__video'
              ).html (),
            }), t),
            {
              index: 0,
              closeOnScroll: !1,
              bgOpacity: 0.1,
              tapToClose: !0,
              tapToToggleControls: !1,
            }
          );
        i.init (), $ ('body').addClass ('blurred'), $ ('.pswp__item').fadeTo (1e3, 1), i.listen (
          'close',
          function () {
            $ ('.pswp__item .pswp__video').each (function () {
              $ (this).attr ('src', $ (this).attr ('src'));
            }), $ ('.pswp__item').fadeOut ('slow', 0), $ ('body').removeClass (
              'blurred'
            );
          }
        );
      });
    },
    _initGalleryZoom: function () {
      var o = this, a = $ ('.pswp')[0];
      $ (document).off ('click', o.selectors.productGalleryTrigger), $ (
        document
      ).on ('click', o.selectors.productGalleryTrigger, function (e) {
        e.preventDefault ();
        $ (this).parent ();
        var s,
          t = {
            index: $ (this).data ('index'),
            closeOnScroll: !1,
            bgOpacity: 0.1,
            tapToClose: !0,
            tapToToggleControls: !1,
          },
          i = new PhotoSwipe (
            a,
            PhotoSwipeUI_Default,
            ((s = []), $ (
              o.selectors.productImages +
                ' .product-single__photo-container:not(.slick-cloned) .feature-row__image'
            ).each (function () {
              var e = $ (this).data ('large_image'),
                t = $ (this).data ('large_image_width'),
                i = $ (this).data ('large_image_height');
              s.push ({src: e, w: t, h: i, title: !1});
            }), s),
            t
          );
        i.init (), i.listen ('imageLoadComplete', function (e, t) {
          $ ('.pswp__item').fadeTo (1e3, 1), $ ('body').addClass ('blurred');
        }), i.listen ('close', function (e, t) {
          $ ('.pswp__item').fadeOut (
            'slow',
            0
          ), $ ('body').removeClass ('blurred');
        });
      });
    },
    _initQuantity: function () {
      var i = this;
      function s (e) {
        var t = 0;
        $ (e)
          .closest (i.selectors.productContent)
          .find (i.selectors.productQuantity + ' .quantity')
          .each (function () {
            t += parseInt ($ (this).val ());
          }), 0 < t
          ? $ (i.selectors.addToCart).prop ('disabled', !1)
          : $ (i.selectors.addToCart).prop ('disabled', !0);
      }
      $ (document).off ('click', i.selectors.productQuantity + ' .plus'), $ (
        document
      ).on ('click', i.selectors.productQuantity + ' .plus', function () {
        var e = $ (this)
          .closest (i.selectors.productQuantity)
          .find ('.quantity'),
          t = parseInt (e.val ());
        (t += 1), e.val (t), s (this);
      }), $ (document).off (
        'click',
        i.selectors.productQuantity + ' .minus'
      ), $ (document).on (
        'click',
        i.selectors.productQuantity + ' .minus',
        function () {
          var e = $ (this)
            .closest (i.selectors.productQuantity)
            .find ('.quantity'),
            t = parseInt (e.val ());
          0 < t && (--t, e.val (t), s (this));
        }
      );
    },
    _stickyDetails: function () {
      var e = $ (this.selectors.productContent);
      !e.data ('sticky') ||
        $ (window).width () < 992 ||
        e.each (function () {
          var e = $ (this).parent (),
            t = $ (this),
            i = e.closest ('.product-single').find ('.product-single__photos'),
            s = t.outerHeight () - i.outerHeight ();
          s < -100
            ? t.stick_in_parent ({offset_top: 20})
            : 100 < s && i.stick_in_parent ({offset_top: 20}), $ (
            window
          ).resize (function () {
            $ (window).width () < 992
              ? (t.trigger ('sticky_kit:detach'), i.trigger (
                  'sticky_kit:detach'
                ))
              : t.outerHeight () < i.outerHeight ()
                  ? t.stick_in_parent ({offset_top: 20})
                  : i.stick_in_parent ({offset_top: 20});
          });
        });
    },
    _initTabs: function () {
      var a = $ (this.selectors.productTabs), n = '.product-tabs__title';
      (a.hasClass ('tabs-layout-tabs') ||
        a.hasClass ('tabs-layout-accordion')) &&
        ($ (document).off ('click', n), $ (document).on ('click', n, function (
          e
        ) {
          e.preventDefault ();
          var t = $ (this),
            i = t.attr ('href'),
            s = $ (n, a),
            o = $ ('.product-tabs__panel', a);
          $ ('.product-tabs', a).is (':visible')
            ? (s.removeClass ('active'), o.removeClass ('active'), t.addClass (
                'active'
              ), $ (i).addClass ('active'))
            : (t.hasClass ('active')
                ? (t.removeClass ('active'), $ (i).removeClass ('active'))
                : (s.removeClass ('active'), o.removeClass (
                    'active'
                  ), t.addClass ('active'), $ (i).addClass (
                    'active'
                  )), o.each (function () {
                $ (this).hasClass ('active')
                  ? $ (this).slideDown (250)
                  : $ (this).slideUp (250);
              }));
        }));
    },
    _initReviews: function () {
      if (!$ (this.selectors.productTabs).length) return !1;
      var i = this.selectors.productTabs;
      $ (document).off ('click', this.selectors.productReviews), $ (
        document
      ).on ('click', this.selectors.productReviews, function () {
        if (
          $ (i).hasClass ('tabs-layout-tabs') ||
          $ (i).hasClass ('tabs-layout-accordion')
        ) {
          var e = $ (i + ' #tab-reviews').prev ();
          $ ('.product-tabs', i).is (':visible') &&
            (e = $ (i + ' .reviews_tab .product-tabs__title')), e.hasClass (
            'active'
          ) || e.trigger ('click');
        }
        var t = $ (i + ' #tab-reviews').parent ();
        $ ('.product-tabs', i).is (':visible') &&
          (t = $ (i)), setTimeout (function () {
          $ ('html, body').animate ({scrollTop: t.offset ().top}, 500, 'swing');
        }, 250);
      });
    },
    _initSwatches: function () {
      var c = this;
      var e,
        o = this.productSingleObject,
        t = this.productSwatchSingleObject,
        s = new Array ();
      if (
        ('1' == this.settings.swatchSize && s.push ('Size'), s.push (
          'size'
        ), '1' == this.settings.swatchColor &&
          (s.push ('Color'), s.push ('Colour'), s.push ('color'), s.push (
            'colour'
          )), 0 < s.length)
      ) {
        var a = !1,
          n = 0,
          r = theme.settings.assetUrl.substring (
            0,
            theme.settings.assetUrl.lastIndexOf ('?')
          ),
          l = theme.settings.assetUrl.substring (
            theme.settings.assetUrl.lastIndexOf ('?'),
            theme.settings.assetUrl.length
          );
        for (i = 0; i < o.options.length; i++) {
          var d = '', u = '', h = '', p = '', m = '', f = '', g = ' img';
          if (
            ((d = 'object' == typeof o.options[i]
              ? o.options[i].name
              : o.options[i]), (a = !1), -1 < s.indexOf (d))
          ) {
            (a = !0), (n = i);
            var v = d.toLowerCase ();
            if ((/color|colour/i.test (v) && !0, a)) {
              var _ = new Array ();
              for (j = 0; j < o.variants.length; j++) {
                var y = o.variants[j],
                  w = ((e = y.options[n]), String (e)
                    .replace (/&/g, '&amp;')
                    .replace (/</g, '&lt;')
                    .replace (/>/g, '&gt;')
                    .replace (/"/g, '&quot;')),
                  b = w
                    .toLowerCase ()
                    .replace (/[^a-z0-9 -]/g, '')
                    .replace (/\s+/g, '-')
                    .replace (/-+/g, '-');
                c.settings.sectionId;
                _.indexOf (w) < 0 &&
                  ('color' != v && 'colour' != v
                    ? ((f = '<i>' + w + '</i>'), (g = ''))
                    : (f = '1' == this.settings.swatchColorAdvanced
                        ? null !== t[b] && void 0 !== t[b] && '' != t[b]
                            ? ((g =
                                ' img swatch_color_advanced'), '<i style="background-image:url(' +
                                r +
                                t[b] +
                                '.png' +
                                l +
                                ');"></i>')
                            : null !== y.featured_image
                                ? ((g =
                                    ' img swatch_color_advanced'), '<i style="background-image:url(' +
                                    theme.Images.getSizedImageUrl (
                                      y.featured_image.src,
                                      '100x'
                                    ) +
                                    ');"></i>')
                                : '<i style="background-color:' +
                                    w +
                                    ';background-image:url(' +
                                    r +
                                    b +
                                    '.png' +
                                    l +
                                    ');"></i>'
                        : '<i style="background-color:' +
                            w +
                            ';background-image:url(' +
                            r +
                            b +
                            '.png' +
                            l +
                            ');"></i>'), (h =
                    h +
                    '<div class="swatch-element ' +
                    v +
                    b +
                    ' available"><label class="swatch-label' +
                    g +
                    ($ (c.selectors.singleOptionSelectorId + '-' + n).val () ==
                      w
                      ? ' selected'
                      : '') +
                    '" title="' +
                    w +
                    '"><input class="swatch-radio swatch-' +
                    c.settings.sectionId +
                    '-' +
                    n +
                    '-' +
                    b +
                    '" type="radio" value="' +
                    w +
                    '" data-value="' +
                    w +
                    '" data-poption="' +
                    n +
                    '" name="option-' +
                    n +
                    '">' +
                    f +
                    '<span class="soldout-image"></span></label></div>'), _.push (
                    w
                  ));
              }
              (u =
                '<div class="' +
                c.selectors.singleOptionSwatches +
                ' wrapper-swatches swatch ' +
                v +
                '" data-attribute_name="attribute_pa_' +
                v +
                '">' +
                h +
                '</div>'), (p = $ (
                c.selectors.singleOptionSelectorId + '-' + n
              )), (m = $ (c.selectors.variationSelector + '-' + n)), '' != u &&
                (p.after (u), p.hide (), p
                  .closest ('.variation-select')
                  .addClass ('variation-select-hidden'), m.addClass (
                  'hide-choose-option'
                ));
            }
          }
        }
      }
      var C = '', k = '.' + c.selectors.singleOptionSwatches + ' .swatch-radio';
      0 <
        $ ('.' + c.selectors.singleOptionSwatches, c.selectors.container)
          .length &&
        ((C = $ (k)).unbind ('click'), C.on ('click', function () {
          var e = $ (this)
            .closest ('.selector-wrapper')
            .find ('.single-option-selector')
            .first (),
            t = $ (this).data ('poption'),
            s = $ (this).data ('value');
          s != e.val () &&
            (e.val (s).trigger ('change'), e
              .closest ('.selector-wrapper')
              .find ('.swatch-label')
              .removeClass ('selected'), e
              .closest ('.selector-wrapper')
              .find ('.option-select-value')
              .html (s), $ (this)
              .closest ('.swatch-label')
              .addClass ('selected')), (function (a, n, r) {
            if (1 < a.options.length)
              for (i = 0; i < a.options.length; i++)
                i != n &&
                  $ (
                    c.selectors.singleOptionSelectorId + '-' + i + ' option',
                    c.selectors.container
                  ).each (function () {
                    var e = 'unavailable', t = $ (this).attr ('value');
                    for (j = 0; j < a.variants.length; j++) {
                      var s = a.variants[j];
                      if (s.options[n] == r && s.options[i] == t) {
                        e = 1 == s.available ? 'available' : 'sold_out';
                        break;
                      }
                    }
                    var o =
                      '.swatch-' +
                      c.settings.sectionId +
                      '-' +
                      i +
                      '-' +
                      t
                        .toLowerCase ()
                        .replace (/[^a-z0-9 -]/g, '')
                        .replace (/\s+/g, '-')
                        .replace (/-+/g, '-');
                    $ (o, c.selectors.container)
                      .closest ('.swatch-element')
                      .removeClass ('available')
                      .removeClass ('sold_out')
                      .removeClass ('unavailable')
                      .addClass (e);
                  });
            else
              for (i = 0; i < a.options.length; i++)
                $ (
                  c.selectors.singleOptionSelectorId + '-' + i + ' option',
                  c.selectors.container
                ).each (function () {
                  var e = 'unavailable', t = $ (this).attr ('value');
                  for (j = 0; j < a.variants.length; j++) if (
                      a.variants[j].options[i] == t
                    ) {
                      e = a.variants[j].available ? 'available' : 'sold_out';
                      break;
                    }
                  var s =
                    '.swatch-' +
                    c.settings.sectionId +
                    '-' +
                    i +
                    '-' +
                    t
                      .toLowerCase ()
                      .replace (/[^a-z0-9 -]/g, '')
                      .replace (/\s+/g, '-')
                      .replace (/-+/g, '-');
                  $ (s, c.selectors.container)
                    .closest ('.swatch-element')
                    .removeClass ('available')
                    .removeClass ('sold_out')
                    .removeClass ('unavailable')
                    .addClass (e);
                });
          }) (o, t, s);
        })), $ (k, c.selectors.container)
        .closest ('.selector-wrapper')
        .find ('.swatch-label.selected .swatch-radio')
        .trigger ('click');
    },
    _initVariants: function () {
      var e = {
        $container: this.$container,
        enableHistoryState: this.$container.data ('enable-history-state') || !1,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId,
        product: this.productSingleObject,
      };
      (this.variants = new slate.Variants (e)), this.$container.on (
        'variantChange' + this.settings.namespace,
        this._updateAddToCart.bind (this)
      ), this.$container.on (
        'variantImageChange' + this.settings.namespace,
        this._updateImages.bind (this)
      ), this.$container.on (
        'variantPriceChange' + this.settings.namespace,
        this._updatePrice.bind (this)
      ), this.$container.on (
        'variantSKUChange' + this.settings.namespace,
        this._updateSKU.bind (this)
      );
    },
    _updateAddToCart: function (e) {
      var t = e.variant;
      t
        ? ($ (this.selectors.productPrices).removeClass (
            'visibility-hidden'
          ), t.available
            ? ($ (this.selectors.addToCart, this.selectors.container).prop (
                'disabled',
                !1
              ), t.inventory_quantity <= 0 &&
                'shopify' == t.inventory_management
                ? $ (
                    this.selectors.addToCartText,
                    this.selectors.container
                  ).text (theme.strings.preOrder)
                : $ (
                    this.selectors.addToCartText,
                    this.selectors.container
                  ).text (theme.strings.addToCart), $ (
                this.selectors.productQuantity
              ).removeClass ('btn-disabled'), $ (
                this.selectors.inComing,
                this.selectors.container
              ).addClass ('hide'), 0 < t.inventory_quantity &&
                'shopify' == t.inventory_management
                ? this._updateStockCountdown (t.inventory_quantity)
                : $ (this.selectors.stockCountdown).removeClass ('hide'), $ (
                this.selectors.totalSold
              ).removeClass ('hide'))
            : ($ (this.selectors.addToCart, this.selectors.container).prop (
                'disabled',
                !0
              ), $ (
                this.selectors.addToCartText,
                this.selectors.container
              ).text (theme.strings.soldOut), $ (
                this.selectors.productQuantity
              ).addClass ('btn-disabled'), t.incoming
                ? $ (this.selectors.inComing, this.selectors.container)
                    .html (
                      theme.strings.inComing.replace (
                        '{{ date }}',
                        t.next_incoming_date
                      )
                    )
                    .removeClass ('hide')
                : $ (
                    this.selectors.inComing,
                    this.selectors.container
                  ).addClass ('hide'), $ (
                this.selectors.stockCountdown
              ).addClass ('hide'), $ (this.selectors.totalSold).addClass (
                'hide'
              )))
        : ($ (this.selectors.addToCart, this.selectors.container).prop (
            'disabled',
            !0
          ), $ (this.selectors.addToCartText, this.selectors.container).text (
            theme.strings.unavailable
          ), $ (this.selectors.productQuantity).addClass ('btn-disabled'), $ (
            this.selectors.productPrices
          ).addClass ('visibility-hidden'), $ (
            this.selectors.inComing,
            this.selectors.container
          ).addClass ('hide'), $ (this.selectors.stockCountdown).addClass (
            'hide'
          ), $ (this.selectors.totalSold).addClass ('hide'));
    },
    _updateImages: function (e) {
      var t = e.variant;
      this._switchImage (t.featured_image);
    },
    _updatePrice: function (e) {
      var t = e.variant;
      $ (this.selectors.originalPrice, this.selectors.container).html (
        '<span class="money">' +
          theme.Currency.formatMoney (t.price, theme.settings.moneyFormat) +
          '</span>'
      ), t.compare_at_price > t.price
        ? $ (this.selectors.comparePrice, this.selectors.container)
            .html (
              '<span class="money">' +
                theme.Currency.formatMoney (
                  t.compare_at_price,
                  theme.settings.moneyFormat
                ) +
                '</span>'
            )
            .removeClass ('hide')
        : $ (this.selectors.comparePrice, this.selectors.container).addClass (
            'hide'
          ), theme.CurrencyPicker.convert (
        this.selectors.productPrices + ' .money'
      );
    },
    _updateSKU: function (e) {
      var t = e.variant;
      $ (this.selectors.SKU).html (t.sku);
    },
    _recordRecentlyViewed: function () {
      var t = 'roarStorage_recentlyViewed',
        i = localStorage.getItem (t) || '[]';
      try {
        i = JSON.parse (i);
      } catch (e) {
        localStorage.removeItem (t), (i = JSON.parse ('[]'));
      }
      var e = this.productSingleObject.id;
      i.includes (e) || i.unshift (e);
      try {
        localStorage.setItem (t, JSON.stringify (i.slice (0, 180)));
      } catch (e) {}
    },
    _sizeChart: function () {
      var t = $ ('body'), i = $ ('.sizechart-modal');
      $ (document).off ('click', this.selectors.sizeChart), $ (
        document
      ).on ('click', this.selectors.sizeChart, function (e) {
        e.preventDefault (), i.addClass ('opened'), t.addClass ('sizechart-opened');
      }), $ (document).off (
        'click',
        '.sizechart_overlay, .sizechart_close'
      ), $ (
        document
      ).on ('click', '.sizechart_overlay, .sizechart_close', function (e) {
        e.preventDefault (), i.removeClass ('opened'), t.removeClass ('sizechart-opened');
      }), $ (document).keyup (function (e) {
        '27' == e.which &&
          (i.removeClass ('opened'), t.removeClass ('sizechart-opened'));
      }), $ ('body').append (i);
    },
    _productsSlider: function () {
      new theme.Sections ().register (
        'products-slider-sub',
        theme.ProductsSlider
      );
    },
    _lineItem: function () {
      theme.CurrencyPicker.convertAll (), theme.roarJs.initReviews ();
      var e = new theme.Sections ();
      e.register ('line_item', theme.LineItem), e.register (
        'countdown-timer',
        theme.CountdownTimer
      );
    },
    onLoad: function () {
      this._lineItem ();
    },
    onUnload: function () {
      this.$container.off (this.settings.namespace);
    },
  })), e;
}) ()), (theme.LineItem = (function () {
  function e (e) {
    var t = (this.$container = $ (e)), i = t.attr ('data-section-id');
    (this.settings = {
      enableHistoryState: !1,
      namespace: '.ProductSection-' + i,
      sectionId: i,
      swatchColor: !0,
      swatchColorAdvanced: !0,
      swatchSize: !0,
    }), (this.selectors = {
      container: t,
      productImage: '.ProductImage-' + i,
      productColor: '.ProductColor-' + i,
      addToCart: '.AddToCart-' + i,
      addToCartText: '.AddToCartText-' + i,
      comparePrice: '.ComparePrice-' + i,
      originalPrice: '.ProductPrice-' + i,
      productPrices: '.product-single__price-' + i,
      originalSelectorId: '.ProductSelect-' + i,
      singleOptionSelector: '.single-option-selector-' + i,
      singleOptionSelectorId: '.single-option-selector-' + i,
      singleOptionSwatches: 'tawcvs-swatches-' + i,
    }), $ ('.ProductJson-' + i, t).html () &&
      (t.data ('section-state') ||
        ((this.productSingleObject = JSON.parse (
          $ ('.ProductJson-' + i, t).html ()
        )), (this.productSwatchSingleObject = JSON.parse (
          $ ('.ProductSwatchJson-' + i, t).html ()
        )), (this.productMoreSingleObject = JSON.parse (
          $ ('.ProductMoreJson-' + i, t).html ()
        )), this._updateProductObject (), this._initVariants (), this._initSwatches (), t.data (
          'section-state',
          !0
        )));
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    _updateProductObject: function () {
      var s = this;
      $.each (s.productMoreSingleObject.variants, function (i, e) {
        $.each (e, function (e, t) {
          s.productSingleObject.variants[i][e] = t;
        });
      });
    },
    _initSwatches: function () {
      var c = this;
      var e,
        o = this.productSingleObject,
        t = this.productSwatchSingleObject,
        s = new Array ();
      if (
        ('1' == this.settings.swatchSize && s.push ('Size'), s.push (
          'size'
        ), '1' == this.settings.swatchColor &&
          (s.push ('Color'), s.push ('Colour'), s.push ('color'), s.push (
            'colour'
          )), 0 < s.length)
      ) {
        var a = !1,
          n = 0,
          r = theme.settings.assetUrl.substring (
            0,
            theme.settings.assetUrl.lastIndexOf ('?')
          ),
          l = theme.settings.assetUrl.substring (
            theme.settings.assetUrl.lastIndexOf ('?'),
            theme.settings.assetUrl.length
          );
        for (i = 0; i < o.options.length; i++) {
          var d = '', u = '', h = '', p = '', m = '', f = '', g = ' img';
          if (
            ((d = 'object' == typeof o.options[i]
              ? o.options[i].name
              : o.options[i]), (a = !1), -1 < s.indexOf (d))
          ) {
            (a = !0), (n = i);
            var v = d.toLowerCase ();
            if ((/color|colour/i.test (v) && !0, a)) {
              var _ = new Array ();
              for (j = 0; j < o.variants.length; j++) {
                var y = o.variants[j],
                  w = ((e = y.options[n]), String (e)
                    .replace (/&/g, '&amp;')
                    .replace (/</g, '&lt;')
                    .replace (/>/g, '&gt;')
                    .replace (/"/g, '&quot;')),
                  b = w
                    .toLowerCase ()
                    .replace (/[^a-z0-9 -]/g, '')
                    .replace (/\s+/g, '-')
                    .replace (/-+/g, '-');
                c.settings.sectionId;
                _.indexOf (w) < 0 &&
                  ('color' != v && 'colour' != v
                    ? ((f = '<i>' + w + '</i>'), (g = ''))
                    : (f = '1' == this.settings.swatchColorAdvanced
                        ? null !== t[b] && void 0 !== t[b] && '' != t[b]
                            ? ((g =
                                ' img swatch_color_advanced'), '<i style="background-image:url(' +
                                r +
                                t[b] +
                                '.png' +
                                l +
                                ');"></i>')
                            : null !== y.featured_image
                                ? ((g =
                                    ' img swatch_color_advanced'), '<i style="background-image:url(' +
                                    theme.Images.getSizedImageUrl (
                                      y.featured_image.src,
                                      '100x'
                                    ) +
                                    ');"></i>')
                                : '<i style="background-color:' +
                                    w +
                                    ';background-image:url(' +
                                    r +
                                    b +
                                    '.png' +
                                    l +
                                    ');"></i>'
                        : '<i style="background-color:' +
                            w +
                            ';background-image:url(' +
                            r +
                            b +
                            '.png' +
                            l +
                            ');"></i>'), (h =
                    h +
                    '<div class="swatch-element ' +
                    v +
                    b +
                    ' available"><label class="swatch-label' +
                    g +
                    ($ (c.selectors.singleOptionSelectorId + '-' + n).val () ==
                      w
                      ? ' selected'
                      : '') +
                    '" title="' +
                    w +
                    '"><input class="swatch-radio swatch-' +
                    c.settings.sectionId +
                    '-' +
                    n +
                    '-' +
                    b +
                    '" type="radio" value="' +
                    w +
                    '" data-value="' +
                    w +
                    '" data-poption="' +
                    n +
                    '" name="option-' +
                    n +
                    '">' +
                    f +
                    '<span class="soldout-image"></span></label></div>'), _.push (
                    w
                  ));
              }
              (u =
                '<div class="' +
                c.selectors.singleOptionSwatches +
                ' wrapper-swatches swatch ' +
                v +
                '" data-attribute_name="attribute_pa_' +
                v +
                '">' +
                h +
                '</div>'), (p = $ (
                c.selectors.singleOptionSelectorId + '-' + n,
                c.selectors.container
              )), (m = $ (
                c.selectors.variationSelector + '-' + n,
                c.selectors.container
              )), '' != u &&
                (p.after (u), p.hide (), p
                  .closest ('.variation-select')
                  .addClass ('variation-select-hidden'), m.addClass (
                  'hide-choose-option'
                ));
            }
          }
        }
      }
      var C = '', k = '.' + c.selectors.singleOptionSwatches + ' .swatch-radio';
      0 <
        $ ('.' + c.selectors.singleOptionSwatches, c.selectors.container)
          .length &&
        ((C = $ (k)).unbind ('click'), C.on ('click', function () {
          var e = $ (this)
            .closest ('.selector-wrapper')
            .find ('.single-option-selector')
            .first (),
            t = $ (this).data ('poption'),
            s = $ (this).data ('value');
          s != e.val () &&
            (e.val (s).trigger ('change'), e
              .closest ('.selector-wrapper')
              .find ('.swatch-label')
              .removeClass ('selected'), e
              .closest ('.selector-wrapper')
              .find ('.option-select-value')
              .html (s), $ (this)
              .closest ('.swatch-label')
              .addClass ('selected')), (function (a, n, r) {
            if (1 < a.options.length)
              for (i = 0; i < a.options.length; i++)
                i != n &&
                  $ (
                    c.selectors.singleOptionSelectorId + '-' + i + ' option',
                    c.selectors.container
                  ).each (function () {
                    var e = 'unavailable', t = $ (this).attr ('value');
                    for (j = 0; j < a.variants.length; j++) {
                      var s = a.variants[j];
                      if (s.options[n] == r && s.options[i] == t) {
                        e = 1 == s.available ? 'available' : 'sold_out';
                        break;
                      }
                    }
                    var o =
                      '.swatch-' +
                      c.settings.sectionId +
                      '-' +
                      i +
                      '-' +
                      t
                        .toLowerCase ()
                        .replace (/[^a-z0-9 -]/g, '')
                        .replace (/\s+/g, '-')
                        .replace (/-+/g, '-');
                    $ (o, c.selectors.container)
                      .closest ('.swatch-element')
                      .removeClass ('available')
                      .removeClass ('sold_out')
                      .removeClass ('unavailable')
                      .addClass (e);
                  });
            else
              for (i = 0; i < a.options.length; i++)
                $ (
                  c.selectors.singleOptionSelectorId + '-' + i + ' option',
                  c.selectors.container
                ).each (function () {
                  var e = 'unavailable', t = $ (this).attr ('value');
                  for (j = 0; j < a.variants.length; j++) if (
                      a.variants[j].options[i] == t
                    ) {
                      e = a.variants[j].available ? 'available' : 'sold_out';
                      break;
                    }
                  var s =
                    '.swatch-' +
                    c.settings.sectionId +
                    '-' +
                    i +
                    '-' +
                    t
                      .toLowerCase ()
                      .replace (/[^a-z0-9 -]/g, '')
                      .replace (/\s+/g, '-')
                      .replace (/-+/g, '-');
                  $ (s, c.selectors.container)
                    .closest ('.swatch-element')
                    .removeClass ('available')
                    .removeClass ('sold_out')
                    .removeClass ('unavailable')
                    .addClass (e);
                });
          }) (o, t, s);
        })), $ (k, c.selectors.container)
        .closest ('.selector-wrapper')
        .find ('.swatch-label.selected .swatch-radio')
        .trigger ('click');
    },
    _initVariants: function () {
      var e = {
        $container: this.$container,
        enableHistoryState: !1,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId,
        product: this.productSingleObject,
      };
      (this.variants = new slate.Variants (e)), this.$container.on (
        'variantChange' + this.settings.namespace,
        this._updateAddToCart.bind (this)
      ), this.$container.on (
        'variantImageChange' + this.settings.namespace,
        this._updateImages.bind (this)
      ), this.$container.on (
        'variantPriceChange' + this.settings.namespace,
        this._updatePrice.bind (this)
      );
    },
    _updateAddToCart: function (e) {
      var t = e.variant;
      t
        ? ($ (this.selectors.productPrices).removeClass (
            'visibility-hidden'
          ), t.available
            ? ($ (this.selectors.addToCart, this.selectors.container).prop (
                'disabled',
                !1
              ), t.inventory_quantity <= 0 &&
                'shopify' == t.inventory_management
                ? $ (
                    this.selectors.addToCartText,
                    this.selectors.container
                  ).text (theme.strings.preOrder)
                : $ (
                    this.selectors.addToCartText,
                    this.selectors.container
                  ).text (theme.strings.addToCart))
            : ($ (this.selectors.addToCart, this.selectors.container).prop (
                'disabled',
                !0
              ), $ (
                this.selectors.addToCartText,
                this.selectors.container
              ).text (theme.strings.soldOut)))
        : ($ (this.selectors.addToCart, this.selectors.container).prop (
            'disabled',
            !0
          ), $ (this.selectors.addToCartText, this.selectors.container).text (
            theme.strings.unavailable
          ), $ (this.selectors.productPrices).addClass ('visibility-hidden'));
    },
    _updateImages: function (e) {
      var t = e.variant;
      this._switchImage (t.featured_image), this._switchColor (t);
    },
    _updatePrice: function (e) {
      var t = e.variant;
      $ (this.selectors.originalPrice, this.selectors.container).html (
        '<span class="money">' +
          theme.Currency.formatMoney (t.price, theme.settings.moneyFormat) +
          '</span>'
      ), t.compare_at_price > t.price
        ? $ (this.selectors.comparePrice, this.selectors.container)
            .html (
              '<span class="money">' +
                theme.Currency.formatMoney (
                  t.compare_at_price,
                  theme.settings.moneyFormat
                ) +
                '</span>'
            )
            .removeClass ('hide')
        : $ (this.selectors.comparePrice, this.selectors.container).addClass (
            'hide'
          ), theme.CurrencyPicker.convert (
        this.selectors.productPrices + ' .money'
      );
    },
    _switchImage: function (e) {
      $ (this.selectors.productImage)
        .attr ('data-bgset', theme.roarJs.bgSet (e))
        .removeClass ('lazyloaded')
        .addClass ('lazyload');
    },
    _switchColor: function (e) {
      var t = $ (this.selectors.productColor + ' .swatch-item');
      t.length &&
        (t.removeClass ('active'), t.each (function () {
          $ (this).data ('variant_id') == e.id && $ (this).addClass ('active');
        }));
    },
    onUnload: function () {
      this.$container.off (this.settings.namespace);
    },
  })), e;
}) ()), (theme.Instagram = (function () {
  function e (e) {
    var t = (this.$container = $ (e)), i = t.attr ('data-section-id');
    (this.settings = {
      template: '<div class="item"><a href="{{href}}" target="_blank"><span class="meta d-flex align-items-center justify-content-center"><span class="likes">{{likes}}</span><span class="comments">{{comments}}</span></span><img class="lazyload" src="{{src}}" data-srcset="{{srcset}}" /></a></div>',
      accessToken: t.data ('access_token'),
      count: t.data ('count'),
      selector: '#instagram-' + i,
    }), '' != this.settings.accessToken &&
      0 != this.settings.count &&
      this.init ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    init: function (e) {
      var r = this, t = r._buildUrl ();
      $.get (t, function (e) {
        if ('object' == typeof e && 200 == e.meta.code && 0 < e.data.length) {
          var t = e.data, s = '';
          for ((i = 0), (len = t.length); i < len; i++) {
            var o = t[i],
              a = o.images.thumbnail.url,
              n =
                o.images.thumbnail.url +
                ' 150w, ' +
                o.images.low_resolution.url +
                ' 320w, ' +
                o.images.standard_resolution.url +
                ' 480w';
            s += r._makeTemplate (r.settings.template, {
              href: o.link,
              src: a,
              srcset: n,
              likes: o.likes.count,
              comments: o.comments.count,
            });
          }
          $ (r.settings.selector).append (s);
        }
      });
    },
    _buildUrl: function () {
      var e;
      return (e = 'https://api.instagram.com/v1/users/self/media/recent'), (e +=
        '?access_token=' + this.settings.accessToken), (e +=
        '&count=' + this.settings.count);
    },
    _makeTemplate: function (e, t) {
      var i, s, o, a, n;
      for ((s = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/), (i = e); s.test (i); )
        (a = i.match (s)[1]), (n = null != (o = this._getObjectProperty (t, a))
          ? o
          : ''), (i = i.replace (s, function () {
          return '' + n;
        }));
      return i;
    },
    _getObjectProperty: function (e, t) {
      var i, s;
      for (s = (t = t.replace (/\[(\w+)\]/g, '.$1')).split ('.'); s.length; ) {
        if (((i = s.shift ()), !(null != e && i in e))) return null;
        e = e[i];
      }
      return e;
    },
  })), e;
}) ()), (theme.CountdownTimer = (function () {
  function e (e) {
    var t = (this.$container = $ (e)).attr ('data-section-id');
    (this.settings = {
      selector: '.countdown-' + t + ':not(.is-countdown)',
    }), this.regional (), this.init ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    regional: function () {
      if (void 0 === $.fn.countdown) return !1;
      ($.countdown.regionalOptions.roar = {
        labels: [
          'Years',
          'Months',
          'Weeks',
          theme.strings.days,
          theme.strings.hours,
          theme.strings.minutes,
          theme.strings.seconds,
        ],
        labels1: [
          'Year',
          'Month',
          'Week',
          theme.strings.day,
          theme.strings.hour,
          theme.strings.minute,
          theme.strings.second,
        ],
        compactLabels: ['y', 'm', 'w', 'd'],
        whichLabels: null,
        digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        timeSeparator: ':',
        isRTL: theme.settings.rtl,
      }), $.countdown.setDefaults ($.countdown.regionalOptions.roar);
    },
    init: function (e) {
      if (void 0 === $.fn.countdown) return !1;
      $ (this.settings.selector).each (function () {
        var e = $ (this);
        if ('' != e.data ('end_date')) {
          var t = e.data ('end_date').split ('-'),
            i = new Date (t[2], parseInt (t[0]) - 1, t[1]);
          new Date ();
          e.countdown ({
            until: i,
            alwaysExpire: !0,
            onExpiry: function () {
              e.hide ();
            },
          });
        }
      });
    },
  })), e;
}) ()), (theme.NewsletterPopup = (function () {
  function e (e) {
    var t = (this.$container = $ (e)).attr ('data-section-id');
    (this.settings = {selector: '#newsletter-popup-' + t}), this.init ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    init: function (e) {
      try {
        var t = $ (this.settings.selector),
          o = t.data ('period'),
          i = t.data ('delay'),
          s = t.data ('version');
        if (
          0 < o &&
          document.cookie.match (
            /^(.*;)?\s*roarStorage_newsletter\s*=\s*[^;]+(.*)?$/
          )
        )
          return;
        function a () {
          $ (document.body)
            .removeClass ('newsletter-opened')
            .removeClass ('newsletter2-opened'), $ (
            document.body
          ).trigger ('roarNewsletter_closed', [t]);
        }
        $ (window).on ('load', function () {
          setTimeout (function () {
            'popup2' == s
              ? $ (document.body).addClass ('newsletter2-opened')
              : $ (document.body).addClass ('newsletter-opened');
          }, 1e3 * i);
        }), $ (document.body).on ('roarNewsletter_closed', function (e, t) {
          var i = new Date (), s = i.getTime ();
          i.setTime (
            i.getTime () + 24 * o * 60 * 60 * 1e3
          ), (document.cookie = 'roarStorage_newsletter=' + s + ';expires=' + i.toGMTString () + ';path=/');
        }), $ (
          document.body
        ).on (
          'click',
          '.newsletter-popup-section .close_icon, .newsletter-popup2-section .close_icon, .newsletter-popup-backdrop',
          function (e) {
            e.preventDefault (), a ();
          }
        ), $ (document).on ('keyup', function (e) {
          27 === e.keyCode && a ();
        });
      } catch (e) {
        return;
      }
    },
  })), e;
}) ()), (theme.LookbookSection = (function () {
  function e (e) {
    var t = (this.$container = $ (e)).attr ('data-section-id');
    (this.settings = {init: !1}), (this.selectors = {
      lookbookId: '#lookbook__id-' + t + ' .roarlookbook',
      lookbookContent: '#lookbook__content-' + t,
    }), this.init ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    init: function (e) {
      var t = this;
      $ (document).on ('DOMNodeInserted', t.selectors.lookbookId, function () {
        if (0 == t.settings.init) {
          t.settings.init = !0;
          var e = $ (this);
          setTimeout (function () {
            e
              .closest ('.slideshow__slide')
              .addClass (
                'slide-active'
              ), e.find ('.media__blank-preview').append ($ (t.selectors.lookbookContent));
          }, 0);
        }
      });
    },
    onLoad: function () {
      roarLookbook.buildLookbook ();
    },
  })), e;
}) ()), (theme.ProductsSlider = (function () {
  function ProductsSlider (e) {
    var t = (this.$container = $ (e)).attr ('data-section-id');
    (this.settings = {
      finished: !1,
      cache: {},
      grid_num: 4,
      grid_row: 1,
      max_pages: 1,
      next_page: 1,
      cat_id: !1,
      storage_id: !1,
      storage_data: [],
      atts: {},
    }), (this.selectors = {
      slider: '.slick-slider-' + t + ':not(.slick-initialized)',
    }), this._initSlider ();
  }
  return (ProductsSlider.prototype = _.assignIn ({}, ProductsSlider.prototype, {
    _isEditor: function () {
      return (
        window !== window.parent &&
        0 <= window.top.location.pathname.indexOf ('/admin') &&
        0 <= window.top.location.pathname.indexOf ('/editor')
      );
    },
    _initSlider: function (evt) {
      var self = this, that = $ (self.selectors.slider);
      if (
        ((self.settings.atts = eval (
          '({' + that.data ('atts') + '})'
        )), (self.settings.max_pages = that.data (
          'max_pages'
        )), (self.settings.cat_id = that.data (
          'cat_id'
        )), (self.settings.storage_id = that.data (
          'storage_id'
        )), (self.settings.storage_data = []), void 0 !==
          self.settings.cat_id || void 0 !== self.settings.storage_id)
      ) {
        var parent = that.closest ('.products-slider');
        if (
          ((self.settings.grid_num = that.data (
            'grid_num'
          )), (self.settings.grid_row = that.data ('grid_row')), void 0 !==
            self.settings.storage_id && self.settings.storage_id.length)
        ) {
          var storageName = 'roarStorage_' + self.settings.storage_id,
            items = localStorage.getItem (storageName) || '[]';
          try {
            items = JSON.parse (items);
          } catch (e) {
            localStorage.removeItem (storageName), (items = JSON.parse ('[]'));
          }
          var productId = 0;
          (productId = void 0 !== window.ShopifyAnalytics
            ? window.ShopifyAnalytics.meta.product.id
            : weketingShop.productJson.id), items.includes (productId) &&
            items.splice (
              items.indexOf (productId),
              1
            ), (self.settings.storage_data = items);
          var howManyToShow = Math.min (self.settings.storage_data.length, 180);
          howManyToShow &&
            (howManyToShow <= self.settings.grid_num * self.settings.grid_row &&
              $ ('.slick-arrows', parent).remove (), self._buildSlider ());
        }
        self.settings.max_pages < 2 ||
          ($ ('.slick-prev', parent).off ('click').on ('click', function (e) {
            e.preventDefault (), self._isEditor () || ((self.settings.next_page = self.settings.next_page - 1), self.settings.next_page <= 0 && (self.settings.next_page = self.settings.max_pages), self._buildSlider ());
          }), $ ('.slick-next', parent)
            .off ('click')
            .on ('click', function (e) {
              e.preventDefault (), self._isEditor () || ((self.settings.next_page = self.settings.next_page + 1), self.settings.next_page > self.settings.max_pages && (self.settings.next_page = 1), self._buildSlider ());
            }), $ (window).scroll (function () {
            var e = $ ('.slick-arrows', parent),
              t = $ ('.slick-prev', parent),
              i = $ ('.slick-next', parent),
              s = $ (window).height () / 2,
              o = ($ (window).outerWidth (!0), parent.outerWidth (!0)),
              a = $ (window).scrollTop (),
              n = parent.offset ().top - s,
              r = parent.offset ().left - 50,
              c = o + parent.offset ().left + 50 - i.outerWidth (),
              l = t.outerHeight (),
              d = n + (parent.height () - l),
              u = 'left';
            theme.settings.rtl &&
              (u =
                'right'), $ (window).width () <= 1024 && ((r += 35), (c -= 35)), t.css (u, r + 'px'), i.css (u, c + 'px'), a < n || d < a ? e.removeClass ('show-arrow') : e.addClass ('show-arrow');
          }));
      }
    },
    _buildSlider: function () {
      var e = this, t = !1, i = 1e3;
      void 0 === e.settings.cache[e.settings.next_page] &&
        ((t = void 0 !== e.settings.cat_id
          ? e._ajaxCollection ()
          : e._ajaxStorage ()), (i = 0));
      var s = $ (e.selectors.slider).closest ('.products-slider');
      s.addClass ('loading'), $.when (t).done (function () {
        setTimeout (function () {
          e._buildProducts (), e._lineItem ();
        }, i), setTimeout (function () {
          s.removeClass ('loading');
        }, i + 250);
      });
    },
    _ajaxCollection: function () {
      var i = this, s = $ (i.selectors.slider).closest ('.products-slider');
      if (!s.hasClass ('loading') && !s.hasClass ('finished')) {
        i = this;
        return $.ajax ({
          url: '/collections/' + i.settings.cat_id,
          type: 'GET',
          dataType: 'html',
          data: {
            view: 'custom',
            limit: i.settings.grid_num + '*' + i.settings.grid_row,
            page: i.settings.next_page,
            type: i.settings.atts.image_ratio +
              '*' +
              1 * i.settings.atts.image_ratio_crop +
              '*' +
              1 * i.settings.atts.image_second +
              '*' +
              i.settings.atts.image_overlay +
              '*' +
              i.settings.atts.product_hover +
              '*' +
              1 * i.settings.atts.vendor +
              '*' +
              1 * i.settings.atts.review +
              '*' +
              1 * i.settings.atts.quickview +
              '*' +
              1 * i.settings.atts.wishlist +
              '*' +
              1 * i.settings.atts.compare,
            cache: !1,
          },
          success: function (e) {
            if ($ (e).find ('.product').length) {
              if (
                ((i.settings.cache[i.settings.next_page] = e), 0 ==
                  $ (e).data ('is_next'))
              ) {
                i.settings.finished = !0;
                for (var t = 1; t <= i.settings.next_page; t++)
                  void 0 === i.settings.cache[t] && (i.settings.finished = !1);
              }
              i._buildProducts ();
            } else i.settings.finished = !0;
            i.settings.finished && s.addClass ('finished');
          },
        });
      }
    },
    _ajaxStorage: function () {
      var i = this, s = $ (i.selectors.slider).closest ('.products-slider');
      if (!s.hasClass ('loading') && !s.hasClass ('finished')) {
        var e = (i = this).settings.grid_num * i.settings.grid_row,
          t = (i.settings.next_page - 1) * e,
          o = i.settings.storage_data
            .splice (t, e)
            .map (function (e) {
              return 'id:' + e;
            })
            .join (' OR ');
        return $.ajax ({
          url: '/search',
          data: {view: 'viewed', type: 'product', q: o},
          dataType: 'html',
          type: 'GET',
          success: function (e) {
            if ($ (e).find ('.product').length) {
              if (
                ((i.settings.cache[i.settings.next_page] = e), s
                  .closest ('.products-slider_hide')
                  .removeClass ('hide'), 0 == i.settings.storage_data.length)
              ) {
                i.settings.finished = !0;
                for (var t = 1; t <= i.settings.next_page; t++)
                  void 0 === i.settings.cache[t] && (i.settings.finished = !1);
              }
              i._buildProducts ();
            } else i.settings.finished = !0;
            i.settings.finished && s.addClass ('finished');
          },
        });
      }
    },
    _buildProducts: function () {
      var e = $ (this.selectors.slider).closest ('.products-slider'),
        t = $ (this.settings.cache[this.settings.next_page]),
        i = e.find ('.products');
      $.fn.countdown &&
        i.find ('.product__countdown .is-countdown').each (function () {
          $ (this).countdown ('destroy');
        }), i.empty (), 0 < t.find ('.product').length &&
        (t
          .find ('.product__image')
          .removeClass ('lazyloaded')
          .removeClass ('lazyloading')
          .addClass ('lazyload'), t.find ('.product').each (function () {
          i.append ($ (this));
        }));
    },
    _lineItem: function () {
      theme.CurrencyPicker.convertAll (), theme.roarJs.initReviews (), theme.roarJs.splitText (), theme.roarJs.animationProduct ();
      var e = new theme.Sections ();
      e.register ('line_item', theme.LineItem), e.register (
        'countdown-timer',
        theme.CountdownTimer
      );
    },
    onLoad: function () {
      this._lineItem ();
    },
  })), ProductsSlider;
}) ()), (theme.ProductTabs = (function () {
  function e (e) {
    (this.$container = $ (e)).attr ('data-section-id');
    (this.selectors = {
      container: '.tabs__container',
      title: '.tabs__title',
      panel: '.tabs__panel',
    }), this._initTabs (), this._productsSlider ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    _initTabs: function (e) {
      var r = this;
      $ (document).off ('click', r.selectors.title), $ (document).on (
        'click',
        r.selectors.title,
        function (e) {
          e.preventDefault ();
          var t = $ (this),
            i = t.closest (r.selectors.container),
            s = $ (t.attr ('href')),
            o = s.find ('.slick-slider'),
            a = i.find (r.selectors.title),
            n = i.find (r.selectors.panel);
          a.removeClass ('active'), n.removeClass ('active'), t.addClass (
            'active'
          ), s.addClass ('active'), o.hasClass ('slick-initialized') &&
            o.slick ('setPosition');
        }
      );
    },
    _productsSlider: function () {
      new theme.Sections ().register (
        'products-slider-sub',
        theme.ProductsSlider
      );
    },
    _lineItem: function () {
      theme.CurrencyPicker.convertAll (), theme.roarJs.initReviews ();
      var e = new theme.Sections ();
      e.register ('line_item', theme.LineItem), e.register (
        'countdown-timer',
        theme.CountdownTimer
      );
    },
    onLoad: function () {
      this._lineItem ();
    },
  })), e;
}) ()), (theme.RichBanner = (function () {
  function e (e) {
    var t = (this.$container = $ (e)),
      i = (this.sectionId = t.attr ('data-section-id'));
    (this.selectors = {
      bannerId: '#shopify-section-' + i,
      bannerNamspace: '#rich-banners-' + i,
      bannerAnime: '#rich-banners-' + i + ' .has--anime-fx',
      bannerTilter: '#rich-banners-' + i + ' .has--tilt-effect',
      bannerSlider: '#rich-banners-' +
        i +
        ' .rich-banner--group.is-slick_slider',
    }), (this.settings = {
      mediaQueryMediumUp: 'screen and (min-width: 768px)',
      mediaQuerySmall: 'screen and (max-width: 767px)',
      sliderActive: !1,
    }), this._initBreakpoints (), this._initAnime (), this._initTilter ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    _initBreakpoints: function () {
      var e = this;
      enquire.register (this.settings.mediaQuerySmall, {
        match: function () {
          e.settings.sliderActive && e._destroySlider (), e._initSlider ();
        },
      }), enquire.register (this.settings.mediaQueryMediumUp, {
        match: function () {
          e.settings.sliderActive && e._destroySlider (), e._initSlider (!1);
        },
      });
    },
    _destroySlider: function () {
      var e = this;
      $ (e.selectors.bannerSlider).each (function () {
        $ (this)
          .find ('.rich-banner--slider.slick-initialized')
          .slick ('unslick'), (e.settings.sliderActive = !1);
      });
    },
    _initSlider: function (s) {
      var o = this;
      $ (o.selectors.bannerSlider).each (function () {
        var e = $ (this);
        void 0 === s && (s = !0);
        var t = e.find ('.rich-banner--slider:not(.slick-initialized)'),
          i = {
            rtl: theme.settings.rtl,
            dots: !1,
            arrows: !0,
            slidesToScroll: 1,
            slidesToShow: e.data ('per_slide'),
            autoplay: e.data ('autoplay'),
            autoplaySpeed: e.data ('interval'),
            variableWidth: e.data ('variable_width'),
            centerMode: e.data ('variable_width'),
            appendArrows: $ ('.slick-arrows', t.parent ()),
            prevArrow: '<button class="slick-prev" type="button"><svg class="svg-icon"><use xlink:href="#global__symbols-prev"></use></svg></button>',
            nextArrow: '<button class="slick-next" type="button"><svg class="svg-icon"><use xlink:href="#global__symbols-next"></use></svg></button>',
          };
        1 == s &&
          (i.slidesToShow = e.data (
            'per_slide_mb'
          )), t.slick (i), (o.settings.sliderActive = !0);
      });
    },
    _initTilter: function () {
      $ (this.selectors.bannerTilter).each (function () {
        var e = $ (this);
        e.on ('mousemove', function (e) {
          var t = $ (this).offset ().left,
            i = $ (this).offset ().top,
            s = e.pageX - t,
            o = e.pageY - i,
            a = $ (this).width () / 2 - s,
            n = $ (this).height () / 2 - o;
          $ (this).css (
            'transform',
            'perspective(500px) rotateX(' +
              n / 40 +
              'deg) rotateY(' +
              -a / 40 +
              'deg) translateZ(10px)'
          );
          Math.sign (a), Math.abs (a);
          $ (this).removeClass ('tilt-leave');
        }), e.on ('mouseleave', function () {
          $ (this).addClass ('tilt-leave');
        });
      });
    },
    _initAnime: function () {
      $ (this.selectors.bannerAnime).each (function () {
        var e = $ (this), t = e.data ('fx'), i = e.data ('fx_type');
        t &&
          ('dominos' == i
            ? anime
                .timeline ({loop: !0})
                .add ({
                  targets: e.find ('.fx__dominos .letter').toArray (),
                  rotateY: [-90, 0],
                  duration: 1300,
                  delay: function (e, t) {
                    return 45 * t;
                  },
                })
                .add ({
                  targets: e.find ('.fx__dominos').toArray (),
                  opacity: 0,
                  duration: 1e3,
                  easing: 'easeOutExpo',
                  delay: 1e3,
                })
            : 'vertical-lines' == i
                ? anime
                    .timeline ({loop: !0})
                    .add ({
                      targets: e
                        .find ('.fx__vertical-lines .letter')
                        .toArray (),
                      scale: [0.3, 1],
                      opacity: [0, 1],
                      translateZ: 0,
                      easing: 'easeOutExpo',
                      duration: 600,
                      delay: function (e, t) {
                        return 70 * (t + 1);
                      },
                    })
                    .add ({
                      targets: e.find ('.fx__vertical-lines .line').toArray (),
                      scaleX: [0, 1],
                      opacity: [0.5, 1],
                      easing: 'easeOutExpo',
                      duration: 700,
                      offset: '-=875',
                      delay: function (e, t, i) {
                        return 80 * (i - t);
                      },
                    })
                    .add ({
                      targets: e.find ('.fx__vertical-lines').toArray (),
                      opacity: 0,
                      duration: 1e3,
                      easing: 'easeOutExpo',
                      delay: 1e3,
                    })
                : 'fading' == i
                    ? anime
                        .timeline ({loop: !0})
                        .add ({
                          targets: e.find ('.fx__fading .letter').toArray (),
                          opacity: [0, 1],
                          easing: 'easeInOutQuad',
                          duration: 2250,
                          delay: function (e, t) {
                            return 150 * (t + 1);
                          },
                        })
                        .add ({
                          targets: e.find ('.fx__fading').toArray (),
                          opacity: 0,
                          duration: 1e3,
                          easing: 'easeOutExpo',
                          delay: 1e3,
                        })
                    : 'intro' == i
                        ? anime
                            .timeline ({loop: !0})
                            .add ({
                              targets: e.find ('.fx__intro .letter').toArray (),
                              translateX: [40, 0],
                              translateZ: 0,
                              opacity: [0, 1],
                              easing: 'easeOutExpo',
                              duration: 1200,
                              delay: function (e, t) {
                                return 500 + 30 * t;
                              },
                            })
                            .add ({
                              targets: e.find ('.fx__intro .letter').toArray (),
                              translateX: [0, -30],
                              opacity: [1, 0],
                              easing: 'easeInExpo',
                              duration: 1100,
                              delay: function (e, t) {
                                return 100 + 30 * t;
                              },
                            })
                        : 'surprising' == i
                            ? anime
                                .timeline ({loop: !0})
                                .add ({
                                  targets: e
                                    .find ('.fx__surprising .word')
                                    .toArray (),
                                  scale: [14, 1],
                                  opacity: [0, 1],
                                  easing: 'easeOutCirc',
                                  duration: 800,
                                  delay: function (e, t) {
                                    return 800 * t;
                                  },
                                })
                                .add ({
                                  targets: e
                                    .find ('.fx__surprising')
                                    .toArray (),
                                  opacity: 0,
                                  duration: 1e3,
                                  easing: 'easeOutExpo',
                                  delay: 1e3,
                                })
                            : anime
                                .timeline ({loop: !0})
                                .add ({
                                  targets: e
                                    .find ('.fx__typing .line')
                                    .toArray (),
                                  scaleY: [0, 1],
                                  opacity: [0.5, 1],
                                  easing: 'easeOutExpo',
                                  duration: 700,
                                })
                                .add ({
                                  targets: e
                                    .find ('.fx__typing .line')
                                    .toArray (),
                                  translateX: [
                                    0,
                                    e
                                      .find ('.fx__typing .letters')
                                      .first ()
                                      .width (),
                                  ],
                                  easing: 'easeOutExpo',
                                  duration: 700,
                                  delay: 100,
                                })
                                .add ({
                                  targets: e
                                    .find ('.fx__typing .letter')
                                    .toArray (),
                                  opacity: [0, 1],
                                  easing: 'easeOutExpo',
                                  duration: 600,
                                  offset: '-=775',
                                  delay: function (e, t) {
                                    return 34 * (t + 1);
                                  },
                                })
                                .add ({
                                  targets: e.find ('.fx__typing').toArray (),
                                  opacity: 0,
                                  duration: 1e3,
                                  easing: 'easeOutExpo',
                                  delay: 1e3,
                                }));
      });
    },
    _lineItem: function () {
      theme.CurrencyPicker.convertAll (), theme.roarJs.initReviews ();
      var e = new theme.Sections ();
      e.register ('line_item', theme.LineItem), e.register (
        'countdown-timer',
        theme.CountdownTimer
      );
    },
    onLoad: function () {
      this._lineItem ();
    },
    onUnload: function (e) {
      this.$container.off (this.bannerNamspace);
    },
  })), e;
}) ()), (theme.CollectionsSlider = (function () {
  function e (e) {
    var t = (this.$container = $ (e)),
      i = (this.sectionId = t.attr ('data-section-id'));
    (this.selectors = {
      container: '#CollectionsSlider-' + i,
      carousel: '#CollectionsSlider-' + i + ' .slider_large',
      carousel_small: '#CollectionsSlider-' + i + ' .slider_small',
      carousel_content: '#CollectionsSlider-' + i + ' .slider_content-wrapper',
    }), this.beforeInit (), this.init ();
  }
  return (e.prototype = _.assignIn ({}, e.prototype, {
    beforeInit: function () {
      var e = 0.01 * window.innerHeight;
      if (
        (document.documentElement.style.setProperty (
          '--vh',
          e + 'px'
        ), window.addEventListener ('resize', function () {
          var e = 0.01 * window.innerHeight;
          document.documentElement.style.setProperty ('--vh', e + 'px');
        }), void 0 === Flickity.prototype._createPrevNextCells)
      ) {
        function i (e, t, i) {
          e &&
            e.getCellElements ().forEach (function (e) {
              e.classList[t] (i);
            });
        }
        Flickity.createMethods.push (
          '_createPrevNextCells'
        ), (Flickity.prototype._createPrevNextCells = function () {
          this.on ('select', this.setPrevNextCells);
        }), (Flickity.prototype.setPrevNextCells = function () {
          i (this.previousSlide, 'remove', 'is-previous'), i (
            this.nextSlide,
            'remove',
            'is-next'
          );
          var e = fizzyUIUtils.modulo (
            this.selectedIndex - 1,
            this.slides.length
          ),
            t = fizzyUIUtils.modulo (
              this.selectedIndex + 1,
              this.slides.length
            );
          (this.previousSlide = this.slides[e]), (this.nextSlide = this.slides[
            t
          ]), i (this.previousSlide, 'add', 'is-previous'), i (
            this.nextSlide,
            'add',
            'is-next'
          );
        });
      }
    },
    init: function () {
      var s = this,
        a = $ (s.selectors.carousel),
        i = $ (s.selectors.carousel_small),
        e = ($ (s.selectors.carousel_content), Math.floor (
          i.find ('.slideshow__slide').length
        ) - 1),
        o = a.data ('autoplay'),
        t = a.data ('speed'),
        n = a.find ('.slideshow__image'),
        r = i.find ('.slideshow__image');
      theme.settings.rtl && (e = 1);
      var c = new Flickity (s.selectors.carousel_content, {
        rightToLeft: theme.settings.rtl,
        prevNextButtons: !0,
        pageDots: !0,
        wrapAround: !0,
        autoPlay: !!o && t,
        draggable: !1,
        setGallerySize: !1,
        sync: s.selectors.carousel,
        arrowShape: 'M3.1,28.9 28.6,3.4 32.9,7.7 14.7,25.9 68.1,25.9 68.1,32 14.7,32 32.9,50.2 28.6,54.5 z',
        on: {ready: function () {}},
      }),
        l = new Flickity (s.selectors.carousel_small, {
          rightToLeft: theme.settings.rtl,
          bgLazyLoad: 1,
          imagesLoaded: !0,
          prevNextButtons: !1,
          pageDots: !1,
          wrapAround: !0,
          autoPlay: !!o && t,
          draggable: !1,
          setGallerySize: !1,
          initialIndex: e,
          on: {
            ready: function () {
              var e = new TimelineLite (), t = i.find ('.flickity-slider');
              e.fromTo (
                t,
                2,
                {scale: 1.2},
                {ease: Power4.easeInOut, scale: 1},
                0
              );
            },
          },
        });
      l.on ('scroll', function () {
        l.slides.forEach (function (e, t) {
          var i = r[t], s = 0;
          i &&
            ((s = 0 === t
              ? Math.abs (l.x) > l.slidesWidth
                  ? l.slidesWidth +
                      l.x +
                      l.slides[l.slides.length - 1].outerWidth +
                      e.target
                  : e.target + l.x
              : t === d.slides.length - 1 &&
                  Math.abs (l.x) + l.slides[t].outerWidth < l.slidesWidth
                  ? e.target - l.slidesWidth + l.x - l.slides[t].outerWidth
                  : e.target + l.x), void 0 === window.mobileCheck ||
              window.mobileCheck () ||
              theme.settings.rtl ||
              (i.style.transform = 'translateX(' + -0.5 * s + 'px)'));
        });
      });
      var d = new Flickity (s.selectors.carousel, {
        rightToLeft: theme.settings.rtl,
        bgLazyLoad: 1,
        imagesLoaded: !0,
        accessibility: !1,
        prevNextButtons: !1,
        pageDots: !1,
        contain: !0,
        wrapAround: !0,
        setGallerySize: !1,
        sync: s.selectors.carousel_content,
        autoPlay: !!o && t,
        arrowShape: {x0: 10, x1: 60, y1: 50, x2: 60, y2: 45, x3: 15},
        on: {
          ready: function () {
            var e = new TimelineLite (),
              t = a.find ('.flickity-slider'),
              i = a.find ('.slider-content-wrapper'),
              s = a.find ('.flickity-button svg'),
              o = a.find ('.flickity-page-dots');
            e.fromTo (
              t,
              2,
              {scale: 1.2},
              {ease: Power4.easeInOut, scale: 1},
              0
            ), e.fromTo (
              i,
              2.4,
              {opacity: 0},
              {ease: Power4.easeInOut, opacity: 1},
              1
            ), e.fromTo (
              [s, o],
              2,
              {opacity: 0},
              {ease: Power4.easeInOut, opacity: 1},
              1.3
            );
          },
        },
      });
      $ (document).on (
        'click',
        s.selectors.carousel_content + ' .flickity-prev-next-button.previous',
        function () {
          l.previous ();
        }
      ), $ (document).on (
        'click',
        s.selectors.carousel_content + ' .flickity-prev-next-button.next',
        function () {
          l.next ();
        }
      );
      var u = null, h = null;
      d.on ('dragMove', function (e, t, i) {
        (u =
          d.selectedIndex), (h = s.getSwipeDirection (i)), o && l.stopPlayer ();
      }), d.on ('dragEnd', function (e) {
        d.selectedIndex !== u && ('left' === h ? l.next () : l.previous ());
      }), $ (s.selectors.container).on ('mouseenter', function () {
        d.stopPlayer (), l.stopPlayer (), c.stopPlayer ();
      }), d.on ('scroll', function () {
        d.slides.forEach (function (e, t) {
          var i = n[t], s = 0;
          i &&
            ((s = 0 === t
              ? Math.abs (d.x) > d.slidesWidth
                  ? d.slidesWidth +
                      d.x +
                      d.slides[d.slides.length - 1].outerWidth +
                      e.target
                  : e.target + d.x
              : t === d.slides.length - 1 &&
                  Math.abs (d.x) + d.slides[t].outerWidth < d.slidesWidth
                  ? e.target - d.slidesWidth + d.x - d.slides[t].outerWidth
                  : e.target + d.x), void 0 === window.mobileCheck ||
              window.mobileCheck () ||
              theme.settings.rtl ||
              (i.style.transform = 'translateX(' + -0.5 * s + 'px)'));
        });
      });
    },
    getSwipeDirection: function (e) {
      return 0 < e.x ? 'right' : 'left';
    },
    onSelect: function () {
      void 0 !== theme.roarAdminJs && theme.roarAdminJs.refresh ();
    },
    onLoad: function () {},
    onUnload: function (e) {},
  })), e;
}) ());
var roarLookbook = {
  getSizedImageUrl: function (e, t) {
    if (
      (((s = document.createElement ('a')).href = e), 'cdn.shopify.com' !=
        s.hostname)
    )
      return e;
    if (null == t) return e;
    if ('master' == t) return roarLookbook.removeProtocol (e);
    var i = e.match (/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
    if (null == i) return null;
    var s = e.split (i[0]), o = i[0];
    return roarLookbook.removeProtocol (s[0] + '_' + t + o);
  },
  removeProtocol: function (e) {
    return e.replace (/http(s)?:/, '');
  },
  isProductUrl: function (e) {
    var t = window.location.hostname, i = document.createElement ('a');
    return (i.href = e), i.hostname == t;
  },
  isImageUrl: function (s) {
    return new Promise (function (e, t) {
      var i = new Image ();
      $ (i)
        .load (function () {
          e (!0);
        })
        .error (function () {
          e (!1);
        })
        .attr ('src', s);
    });
  },
  buildLookbook: function () {
    $ ('.roarlookbook').each (function (e) {
      var t = $ (this);
      if (!t.hasClass ('roarlookbook_init')) {
        var i = t.find ('.image-preview');
        roarLookbook.isImageUrl (i.attr ('src')).then (function () {
          var e = t.find ('.media__blank-preview');
          t.addClass ('roarlookbook_init'), e.addClass ('sfx-fadeIn');
        });
      }
    });
  },
  resetHotspots: function (s) {
    var e = $ ('.hotspot', s), o = s.attr ('data-lookbook');
    e.each (function () {
      var e = $ (this), t = e.attr ('data-id'), i = $ ('#' + o + '-' + t, s);
      i.fadeOut ('fast', function () {
        i.remove (), e.removeClass ('hotspot_init');
      });
    });
  },
  hotspotPopup: function () {
    $ ('.roarlookbook').on ('click', '.hotspot', function (e) {
      var c = $ (this);
      if (c.hasClass ('hotspot_init')) {
        l = c.closest ('.roarlookbook');
        roarLookbook.resetHotspots (l);
      } else {
        var l = c.closest ('.roarlookbook'),
          t = c.attr ('data-id'),
          i = c.closest ('.roarlookbook').attr ('data-lookbook') + '-' + t,
          d =
            '#' + c.closest ('.roarlookbook').attr ('data-lookbook') + '-' + t,
          s = c.attr ('data-title'),
          o = c.attr ('data-image'),
          a = c.attr ('data-price'),
          n = c.attr ('data-url'),
          r = '';
        if ('' == s && '' == n) return !1;
        if (
          (c.addClass ('hotspot_loading'), roarLookbook.resetHotspots (l), (r +=
            '<div id="' +
            i +
            '" class="hotspot-widget hotspot-loading">'), (r +=
            '<div class="hotspot-content">'), (r +=
            '<span class="hotspot-close">×</span>'), (r +=
            '<div class="hotspot-inner">'), '' != o)
        ) {
          var u =
            '<img src="' +
            roarLookbook.getSizedImageUrl (o, '80x') +
            '" src="' +
            roarLookbook.getSizedImageUrl (o, '300x') +
            '" data-srcset="' +
            roarLookbook.getSizedImageUrl (o, '300x') +
            ' 1x, ' +
            roarLookbook.getSizedImageUrl (o, '600x') +
            ' 2x" alt="" />';
          r += '' != n ? '<a href="' + n + '">' + u + '</a>' : u;
        }
        if (
          ('' != s &&
            ((r += '<h3>'), (r += '' != n
              ? '<a href="' + n + '">' + s + '</a>'
              : s), (r += '</h3>')), '' != a &&
            ((r +=
              '<div class="price"><span class="money">' +
              a +
              '</span></div>'), roarLookbook.isProductUrl (n) &&
              ((r += '<div class="hotspot-btns">'), (r +=
                '<div class="hotspot-btn"><a href="' +
                n +
                '">' +
                theme.apps.details +
                '</a></div>'), (r +=
                '<div class="hotspot-btn"><a class="roar_add_to_cart" href="' +
                n +
                '?add-to-cart=true">' +
                theme.apps.buyNow +
                '</a></div>'), (r += '</div>'))), (r += '</div>'), (r +=
            '</div>'), (r += '</div>'), $ (d).length || l.append (r), $ (
            d
          ).find ('img').length)
        ) {
          var h = $ (d).find ('img');
          h
            .attr ('src', h.attr ('data-src'))
            .removeAttr ('data-src')
            .attr ('srcset', h.attr ('data-srcset'))
            .removeAttr ('data-srcset');
        }
        roarLookbook.isImageUrl (o).then (function () {
          setTimeout (function () {
            var e = $ (d),
              t = c.offset ().left,
              i = c.offset ().top,
              s = e.outerWidth (),
              o = e.outerHeight (),
              a = l.offset ().left,
              n = l.offset ().top,
              r = (l.outerWidth (), 'hotspot-right');
            s + 5 < t
              ? ((t = t - s - 5), (r = 'hotspot-left'))
              : (t =
                  t +
                  c.outerWidth () +
                  5), (i = i + c.outerHeight () / 2 - o / 2), e.css ({left: t - a, top: i - n}).removeClass ('hotspot-left').removeClass ('hotspot-right').addClass (r), c.removeClass ('hotspot_loading').addClass ('hotspot_init'), e.removeClass ('hotspot-loading').fadeIn ('fast');
          }, 600);
        });
      }
    }), $ (document).on ('click', '.hotspot-close', function (e) {
      var t = $ (this).closest ('.hotspot-widget'),
        i = t.attr ('id').split ('-')[1];
      $ ('.roarlookbook .hotspot[data-id="' + i + '"]').removeClass (
        'hotspot_init'
      ), t.fadeOut ('fast', function () {
        t.remove ();
      });
    }), $ ('.roarlookbook').on ('click', '.image-preview', function (e) {
      var t = $ (this).closest ('.roarlookbook');
      roarLookbook.resetHotspots (t);
    }), $ (window).resize (function (e) {
      $ ('.roarlookbook .hotspot_init').length &&
        $ ('.roarlookbook .hotspot_init').each (function () {
          $ (this).removeClass ('hotspot_init').trigger ('click');
        });
    });
  },
  addToCart: function () {
    $ (document).on ('click', '.roar_add_to_cart', function (e) {
      e.preventDefault ();
      var t = $ (this), i = t.closest ('.roarlookbook'), s = t.attr ('href');
      $.ajax ({
        type: 'GET',
        url: s,
        beforeSend: function () {},
        success: function (e) {
          $ (e)
            .find ('form[action="/cart/add"]')
            .appendTo (i)
            .submit ()
            .remove ();
        },
        dataType: 'html',
      });
    });
  },
  init: function () {
    $ ('.roarlookbook').length &&
      (roarLookbook.buildLookbook (), roarLookbook.hotspotPopup (), roarLookbook.addToCart ());
  },
};
(theme.roarJs = (function () {
  function t () {
    (function (e) {
      try {
        for (
          var t = e + '=', i = document.cookie.split (';'), s = 0;
          s < i.length;
          s++
        ) {
          for (var o = i[s]; ' ' == o.charAt (0); )
            o = o.substring (1, o.length);
          if (0 == o.indexOf (t)) return o.substring (t.length, o.length);
        }
        return null;
      } catch (e) {
        return null;
      }
    }) ('roarStorage_isAnAdult')
      ? $ ('#age__check').remove ()
      : $ ('#age__check').show (), $ (document).off (
      'click',
      '#age__check .btn-birthdate'
    ), $ (document).on ('click', '#age__check .btn-birthdate', function () {
      var e = new Date ();
      e.setTime (e.getTime () + 12096e5);
      var t = '; expires=' + e.toGMTString ();
      (document.cookie =
        'roarStorage_isAnAdult=true;' +
        t +
        '; path=/'), $ ('#age__check').remove ();
    });
  }
  function o () {
    $ (document).off (
      'click',
      '.sidebar__btn, .sidebar__close, .sidebar__overlay'
    ), $ (
      document
    ).on (
      'click',
      '.sidebar__btn, .sidebar__close, .sidebar__overlay',
      function () {
        var e, t, i;
        $ ('body').hasClass ('sidebar-open')
          ? $ ('body').removeClass ('sidebar-open')
          : ($ ('body').addClass (
              'sidebar-open'
            ), (e = new TimelineLite ()), (t = $ (
              '.site-sidebar .widget-area'
            )), (i = $ ('.site-sidebar .site-widget')), theme.settings.rtl
              ? (e.fromTo (
                  t,
                  1,
                  {autoAlpha: 0},
                  {autoAlpha: 1, ease: Power0.easeInOut},
                  0.1
                ), e.staggerFromTo (
                  i,
                  0.5,
                  {opacity: 0, skewX: -10, x: 40},
                  {opacity: 1, skewX: 0, x: 0},
                  0.1,
                  0.2
                ))
              : (e.fromTo (
                  t,
                  1,
                  {autoAlpha: 0},
                  {autoAlpha: 1, ease: Power0.easeInOut},
                  0.1
                ), e.staggerFromTo (
                  i,
                  0.5,
                  {opacity: 0, skewX: 10, x: -40},
                  {opacity: 1, skewX: 0, x: 0},
                  0.1,
                  0.2
                )));
      }
    ), $ (document).off ('click', '.filters__btn'), $ (
      document
    ).on ('click', '.filters__btn', function () {
      $ ('.shop__filtering').slideToggle ();
    });
  }
  function p (e, t, i) {
    void 0 === i && (i = !1), $ ('.alert-message').remove ();
    var s =
      '<div class="alert alert-' +
      ('check' == e ? 'success' : 'error') +
      ' alert-message"><div class="alert__icon"><i class="ris ri-' +
      e +
      '"></i></div><div class="alert__content">' +
      t +
      '</div></div>';
    1 == i &&
      (s =
        '<div class="alert alert-message cart_message"><div class="alert__background" style="background-image:url(' +
        e +
        ');"></div><div class="alert__description">' +
        t +
        '</div></div>'), $ ('body').append (s);
  }
  function a () {
    $ (document).off ('click', '.addcompare_btn'), $ (
      document
    ).on ('click', '.addcompare_btn', function (e) {
      e.preventDefault ();
      var t = $ (this),
        i = 'roarStorage_compare',
        s = localStorage.getItem (i) || '[]';
      try {
        s = JSON.parse (s);
      } catch (e) {
        localStorage.removeItem (i), (s = JSON.parse ('[]'));
      }
      var o = t.data ('product_id');
      s.includes (o) ||
        s.unshift (
          o
        ), 50 <= s.length && p ('alert', theme.strings.compareLimit);
      try {
        localStorage.setItem (i, JSON.stringify (s.slice (0, 50)));
      } catch (e) {}
      var a = s
        .map (function (e) {
          return 'id:' + e;
        })
        .join (' OR ');
      $.ajax ({
        url: '/search',
        data: {view: 'compare', type: 'product', q: a},
        dataType: 'html',
        type: 'GET',
        beforeSend: function () {
          t.removeClass ('added').addClass ('adding');
        },
        complete: function () {
          t.removeClass ('adding');
        },
        success: function (e) {
          !(function (e) {
            $ ('body').addClass ('compare-opened');
            var t = $ ('.compare__modal');
            t.removeClass ('opened'), t
              .find ('.compare__content')
              .empty ()
              .html (e), t.addClass ('opened'), $ (
              '.compare__list tr'
            ).each (function () {
              $ (this).css ('height', $ (this).outerHeight ());
            }), $ ('.compare__list').clone ().appendTo ('.compare__left'), $ (
              '.compare__left td'
            ).remove ();
          }) (e), t
            .addClass ('added')
            .find ('.tooltip')
            .text (t.data ('added'));
        },
      });
    });
  }
  function n () {
    var o = ['/cart?', '/search?', '/collections/'];
    $ (document).ajaxComplete (function (e, t, i) {
      if (
        (function (e, t) {
          for (var i = 0; i < t.length; i++)
            if (e.match (('.*' + t[i].trim () + '.*').replace (' ', '.*')))
              return !0;
          return !1;
        }) (i.url, o)
      ) {
        theme.CurrencyPicker.convertAll (), theme.roarJs.initReviews (), theme.roarJs.splitText (), theme.roarJs.animationProduct ();
        var s = new theme.Sections ();
        s.register ('line_item', theme.LineItem), s.register (
          'countdown-timer',
          theme.CountdownTimer
        );
      }
    });
  }
  function r () {
    var e = $ ('.progress-section'), t = $ ('.progress-page');
    if (t.length && e.length) {
      e.append (t), $ ('.scrolltotop').on ('click', function () {
        return $ ('html, body').animate ({scrollTop: 0}, 800), !1;
      }), $ (window).scroll (function () {
        300 <= $ (window).scrollTop ()
          ? t.addClass ('is-active')
          : t.removeClass ('is-active');
      });
      var i = 0;
      $ (window).scroll (function () {
        var e = $ (window).scrollTop ();
        i < e
          ? t.addClass ('is-visible')
          : e < i && t.removeClass ('is-visible'), (i = e);
      });
      var s = document.querySelector ('.progress-page path'),
        o = s.getTotalLength ();
      (s.style.transition = s.style.WebkitTransition =
        'none'), (s.style.strokeDasharray =
        o +
        ' ' +
        o), (s.style.strokeDashoffset = o), s.getBoundingClientRect (), (s.style.transition = s.style.WebkitTransition =
        'stroke-dashoffset 10ms linear');
      function a () {
        var e = $ (window).scrollTop (),
          t = $ (document).height () - $ (window).height (),
          i = o - e * o / t;
        s.style.strokeDashoffset = i;
      }
      a (), $ (window).scroll (a);
    }
  }
  function e () {
    function o (e) {
      var a = this,
        n = $ (window),
        r = n.scrollTop (),
        c = !0,
        l = n.width (),
        d = n.height (),
        u = null,
        h = null,
        p = null,
        t = !1;
      function m (e) {
        (r = n.scrollTop ()), (a.allowScrollUpdate = !0);
      }
      function f (e) {
        return e && '[object Function]' === {}.toString.call (e);
      }
      (a.init = function (e) {
        return (a.options = $.extend (
          {
            target: null,
            tween: null,
            ease: Linear.easeNone,
            min: 0,
            max: 1,
            minSize: 0,
            speed: 0.3,
            defaultProgress: 1,
            debug: !1,
            onMin: null,
            onMax: null,
            onOutside: null,
            onInside: null,
            onUpdate: null,
          },
          e
        )), null === a.options.target || a.options.target.length < 1
          ? (console.warn ('Extra Scroll Animator: no target specified'), !1)
          : null === a.options.tween
              ? (console.warn ('Extra Scroll Animator: no tween specified'), !1)
              : ((a.allowScrollUpdate = !0), a.update (), void a.repaint ());
      }), (a.updatePosition = function (e) {
        if (c) {
          var t,
            i,
            s = void 0 !== e && e ? 0 : a.options.speed,
            o = a.options.target.data ('coords');
          if (o)
            (t = 1 - (r - o.max) / (o.min - o.max)) <= 0 && !0 !== u
              ? ((u = !0), f (a.options.onMin) &&
                  a.options.onMin (), a.options.target.trigger (
                  'extra:scrollanimator:min'
                ))
              : 0 < t && !1 !== u && (u = !1), 1 <= t && !0 !== h
              ? ((h = !0), f (a.options.onMax) &&
                  a.options.onMax (), a.options.target.trigger (
                  'extra:scrollanimator:max'
                ))
              : t <= 1 && !1 !== h && (h = !1), (!0 !== u && !0 !== h) ||
              !1 === p
              ? t <= 1 &&
                  0 <= t &&
                  !0 !== p &&
                  ((p = !0), f (a.options.onInside) &&
                    a.options.onInside (), a.options.target.trigger (
                    'extra:scrollanimator:inside'
                  ))
              : ((p = !1), f (a.options.onOutside) &&
                  a.options.onOutside (), a.options.target.trigger (
                  'extra:scrollanimator:outside'
                )), !1 === p && (t = h ? 1 : 0), (t = Math.max (
              0,
              Math.min (t)
            )), (i = t), !0 === a.options.debug &&
              console.log (i), TweenLite.to (a.options.tween, s, {
              progress: t,
              ease: a.options.ease,
            });
        }
      }), (a.update = function () {
        (l = n.width ()), (d = n.height ());
        var e = {},
          t = a.options.target.offset ().top,
          i = a.options.target.height (),
          s = a.options.min,
          o = a.options.max;
        (e.min = t - d + d * s), (e.max =
          t - d + i + d * o), a.options.target.data (
          'coords',
          e
        ), a.options.tween.paused (!0), a.options.tween.progress (
          a.options.defaultProgress
        ), l < a.options.minSize
          ? n.off ('scroll', m)
          : (n.on ('scroll', m), a.updatePosition (!0)), f (
          a.options.onUpdate
        ) &&
          a.options.onUpdate (
            e
          ), a.options.target.trigger ('extra:scrollanimator:update', [e]);
      }), n.on ('extra:resize', a.update), n.on (
        'extra:scrollanimator:resize',
        a.update
      ), n.on (
        'extra:scrollanimator:tick',
        a.updatePosition
      ), (a.repaint = function () {
        c &&
          (a.allowScrollUpdate &&
            (a.updatePosition (), (a.allowScrollUpdate = !1)), window.requestAnimationFrame (
            a.repaint
          ));
      }), a.init (e), (a.updateTween = function (e) {
        a.options.tween &&
          a.options.tween.kill (), (a.options.tween = e), a.options.tween.paused (
          !0
        ), a.options.tween.progress (
          a.options.defaultProgress
        ), (a.allowScrollUpdate = !0), a.update ();
      }), (a.pause = function () {
        t ||
          (n.off ('scroll', m), n.off (
            'extra:resize',
            a.update
          ), (t = !(c = !1)));
      }), (a.resume = function () {
        t &&
          (l < a.options.minSize
            ? n.off ('scroll', m)
            : n.on ('scroll', m), n.on (
            'extra:resize',
            a.update
          ), (t = !(c = !0)), a.repaint ());
      }), (a.destroy = function () {
        (c = !1), n.off ('scroll', m), n.off ('extra:resize', a.update), n.off (
          'extra:scrollanimator:tick',
          a.updatePosition
        ), a.options.tween &&
          (a.options.tween.paused (!0), a.options.tween.progress (
            a.options.defaultProgress
          ), a.options.tween.kill ()), (a.allowScrollUpdate = !1);
      });
    }
    (window.initPrllx = function (e) {
      if ($ ('.site-main .article__image').length) {
        $ ('.site-main').find ('.article__image').each (function () {
          var e, t = $ (this), i = t.children (), s = t.find ('.prllx');
          i.width ();
          (e = new TimelineLite ({onUpdate: function () {}}))
            .set (s, {y: -1 * s.attr ('data-prllx')})
            .to (
              s,
              1,
              {
                y: s.attr ('data-prllx'),
                overwrite: 'all',
                ease: Power0.easeNone,
              },
              '-=0.5'
            ), new o ({target: t, tween: e, defaultProgress: 0, speed: 0, min: -0.2, max: 1.3}), t.on (
            'extra:scrollanimator:update',
            function (e) {
              e.stopPropagation ();
            }
          );
        });
      }
    }), (window.initSkrollr = function () {
      if (
        0 == $ ('.site-main .skrollable').length ||
        'undefined' == typeof skrollr
      )
        return !1;
      $ ('.section__bground.skrollable')
        .css ('height', '120%')
        .closest ('.container-section')
        .addClass ('overflow-hidden');
      skrollr.init ({
        forceHeight: !1,
        smoothScrolling: !1,
        mobileCheck: function () {
          return !1;
        },
      });
    }), $ (window).on ('load', function () {
      void 0 === window.mobileCheck ||
        window.mobileCheck () ||
        (window.initPrllx (), window.initSkrollr ());
    });
  }
  function i () {
    if (void 0 === window.mobileCheck) return !1;
    992 < $ (window).width () &&
      !window.mobileCheck () &&
      0 < $ ('.products-grid.layout-2').length &&
      $ (
        '.products-grid.layout-2 .category__title:not(.split-text), .products-grid.layout-2 .product__link:not(.split-text), .product-single__notify label:not(.split-text)'
      ).each (function () {
        var e = $ (this);
        new SplitText (e, {type: 'lines'});
        e.addClass ('split-text').find ('div').wrapInner ('<span></span>');
      });
  }
  function s (e) {
    if (0 == theme.settings.animation) return !1;
    var t = new TimelineLite (),
      i = $ ('.product-single__title', e),
      s = $ ('.product-single .product__labels', e),
      o = $ ('.product-single .sidebar-container', e),
      a = $ ('.product-single__top .box-share-master-container', e),
      n = $ ('.product-single__right, .product-single__tools', e),
      r = $ ('.product-single__nav', e),
      c = $ ('.product-single__middle', e),
      l = $ ('.product-single__bottom', e);
    t.fromTo (
      i,
      1.6,
      {y: 100, opacity: 0},
      {ease: Power4.easeInOut, y: 0, opacity: 1},
      0.7
    ), t.fromTo (
      c,
      2,
      {y: 40, opacity: 0},
      {ease: Power4.easeInOut, y: 0, opacity: 1},
      0.8
    ), t.fromTo (
      l,
      2,
      {y: 40, opacity: 0},
      {ease: Power4.easeInOut, y: 0, opacity: 1},
      1
    ), t.fromTo (
      [s, a, n, r, o],
      2,
      {opacity: 0},
      {ease: Power4.easeInOut, opacity: 1},
      0.7
    );
  }
  function c () {
    if ('undefined' == typeof ScrollReveal || 0 == theme.settings.animation)
      return !1;
    (window.sr = ScrollReveal ()), sr.reveal (
      '.products-grid .product:not(.active)',
      {
        opacity: 0,
        viewFactor: 0.2,
        afterReveal: function (e) {
          if (void 0 === window.mobileCheck || 0 == theme.settings.animation)
            return !1;
          e.classList.add ('active');
          var t = $ (e).find (
            '.product__link div span, .category__title div span'
          ),
            i = $ (e).find ('.product__review, .more-products'),
            s = $ (e).find ('.product__price');
          (e.visuelRevealTL = new TimelineLite ()), 992 < $ (window).width () &&
            !window.mobileCheck () &&
            0 < $ ('.products-grid.layout-2').length &&
            (e.visuelRevealTL.fromTo (
              t,
              1,
              {ease: Power4.easeOut, x: 30, y: 100, skewX: 60, opacity: 0},
              {ease: Power4.easeOut, x: 0, y: 0, skewX: 0, opacity: 1},
              0
            ), null !== i &&
              e.visuelRevealTL.fromTo (
                i,
                2,
                {y: 10, opacity: 0},
                {ease: Power4.easeOut, y: 0, opacity: 1},
                0.4
              ), null !== s &&
              e.visuelRevealTL.fromTo (
                s,
                2,
                {y: 10},
                {ease: Power4.easeOut, y: 0, opacity: 1},
                0.2
              ));
        },
        beforeReveal: function (e) {
          e.classList.add ('active');
          var t = $ (e).find ('.product__image, .category__image');
          null !== t &&
            ((e.visuelRevealTL = new TimelineLite ()), e.visuelRevealTL.fromTo (
              t,
              2,
              {scale: 1.1},
              {ease: Power4.easeOut, scale: 1},
              0
            ));
        },
      },
      150
    );
  }
  function l () {
    !(function () {
      if (
        'undefined' == typeof ParallaxScroll ||
        void 0 === window.mobileCheck ||
        window.mobileCheck () ||
        0 == theme.settings.animation
      )
        return;
      ParallaxScroll.init ();
    }) (), e (), (function () {
      if (void 0 === $.fn.imagesLoaded || 0 == theme.settings.animation) return;
      $ ('.page-header-bg').imagesLoaded ({background: !0}, function () {
        $ ('.page-header-bg-wrapper').addClass ('loaded');
        var e = new TimelineLite (),
          t = $ ('.site-header__main'),
          i = $ ('.site-header__top'),
          s = $ ('.page-title'),
          o = $ ('.term-description'),
          a = $ ('.breadcrumbs'),
          n = $ ('.page-categories, .page-meta_list'),
          r = $ ('.page-delimiter'),
          c = $ ('.back-btn svg'),
          l = $ ('.content-area'),
          d = $ ('.site-pagination'),
          u = $ ('#site-footer'),
          h = $ ('body');
        h.addClass (
          'run-anim'
        ), e.fromTo ([t, i], 1, {autoAlpha: 0, opacity: 0}, {ease: Power4.easeInOut, autoAlpha: 1, opacity: 1}, 0.2).call (function (e) {
          h.removeClass ('run-anim');
        }), e.fromTo (
          s,
          1.2,
          {y: 100, opacity: 0},
          {ease: Power4.easeInOut, y: 0, opacity: 1},
          0.3
        ), e.fromTo (o, 1.4, {scale: 1.4, opacity: 0}, {ease: Power4.easeInOut, scale: 1, opacity: 1}, 0.2), e.fromTo (c, 1, {x: 20, opacity: 0}, {ease: Power4.easeInOut, x: 0, opacity: 1}, 0.5), $ ('body').hasClass ('template-collection') ? e.fromTo (a, 1.2, {y: 40, opacity: 0}, {ease: Power4.easeInOut, y: 0, opacity: 1}, 0.25) : $ ('body').hasClass ('template-product') ? e.fromTo (a, 1.2, {y: 40, opacity: 0}, {ease: Power4.easeInOut, y: 0, opacity: 1}, 0.6) : e.fromTo (a, 1.2, {y: 40, opacity: 0}, {ease: Power4.easeInOut, y: 0, opacity: 1}, 0.25), e.fromTo (n, 1.4, {y: -40, opacity: 0}, {ease: Power4.easeInOut, y: 0, opacity: 1}, 0.25), e.fromTo (r, 1, {opacity: 0, width: 0}, {opacity: 1, width: 70}, 0.8), e.fromTo ([l, d], 1, {opacity: 0}, {opacity: 1}, 0.8), e.fromTo (u, 1, {opacity: 0}, {opacity: 1}, 1.5);
      });
    }) (), s ($ ('.product-template__container')), (function () {
      if (
        0 == $ ('.blog-main .article__listing').length ||
        'undefined' == typeof ScrollReveal ||
        0 == theme.settings.animation
      )
        return;
      (window.sr = ScrollReveal ()), sr.reveal (
        '.blog-main .article__listing',
        {opacity: 0, duration: 1600, mobile: !0, viewFactor: 0}
      );
    }) (), i (), c ();
  }
  return {
    init: function () {
      var i, s;
      function e () {
        var e = $ ('.page-header').outerHeight (),
          t = $ (window).height (),
          i = $ ('#site-footer').height ();
        0 < t - e - i &&
          $ ('#site-content').css ({'min-height': t - e - i - 1}), $ (
          '#site-container'
        ).css ({'margin-bottom': i - 1});
      }
      $ ('#site-loader').length &&
        (NProgress.configure ({
          template: '<div class="bar" role="bar"></div>',
          parent: '#site-loader',
          showSpinner: !1,
          easing: 'ease',
          minimum: 0.3,
          speed: 500,
        }), NProgress.start (), $ (window).on ('pagehide', function (e) {
          e.persisted &&
            ($ ('#site-container')
              .addClass ('loading')
              .removeClass ('loaded'), $ ('#site-loader').removeClass (
              'loaded'
            ));
        }), $ (window).load (function (e) {
          $ ('#site-container')
            .addClass ('loaded')
            .removeClass (
              'loading'
            ), $ ('#site-loader').addClass ('loaded'), NProgress.done ();
        })), t (), (function () {
        if (0 == $ ('.social-sharing').length || void 0 === $.fn.socialShare)
          return;
        $ ('.social-sharing').each (function () {
          var e = $ (this);
          e.socialShare ({
            name: e.data ('name'),
            title: e.data ('title'),
            mediaUrl: e.data ('share_img'),
            social: e.data ('share_elem'),
            animation: 'launchpadReverse',
            blur: !0,
          });
        });
      }) (), l (), $ (
        'body'
      ).on ('click', '.barberry-show-categories', function (e) {
        e.preventDefault ();
        var t = $ (this), i = t.closest ('.page-categories-wrapper');
        if (t.hasClass ('opened')) {
          var s = new TimelineLite (),
            o = i.find ('.barberry-categories'),
            a = i.find ('.barberry-categories .category_item');
          s.fromTo (
            o,
            1,
            {'max-height': 1e3, autoAlpha: 1},
            {autoAlpha: 0, 'max-height': 0, ease: Power3.easeInOut},
            0
          ), setTimeout (function () {
            t.removeClass ('opened'), o.removeClass ('opened');
          }, 700);
        } else {
          (s = new TimelineLite ()), (o = i.find (
            '.barberry-categories'
          )), (a = i.find ('.barberry-categories .category_item'));
          s.fromTo (
            o,
            1,
            {'max-height': 0, autoAlpha: 0},
            {'max-height': 1e3, autoAlpha: 1, ease: Power4.easeIn},
            0
          ), s.staggerFromTo (
            a,
            1,
            {opacity: 0, scale: 2, skewX: 30},
            {opacity: 1, scale: 1, skewX: 0, ease: Power4.easeOut},
            0.1,
            0.3
          ), setTimeout (function () {
            o.addClass ('opened'), t.addClass ('opened');
          }, 500);
        }
      }), roarLookbook.init (), $ (
        '.lookbook-section.is-slick_slider .lookbook-listing'
      ).length &&
        $ (
          '.lookbook-section.is-slick_slider .lookbook-listing'
        ).each (function () {
          var t = $ (this),
            i = {
              rtl: theme.settings.rtl,
              centerMode: !0,
              centerPadding: '20%',
              slidesToShow: 1,
              appendArrows: $ ('.slick-arrows', t.parent ()),
              prevArrow: '<button class="slick-prev" type="button"><svg class="svg-icon"><use xlink:href="#global__symbols-prev"></use></svg></button>',
              nextArrow: '<button class="slick-next" type="button"><svg class="svg-icon"><use xlink:href="#global__symbols-next"></use></svg></button>',
            },
            s = t.find ('.lookbook__item').length,
            o = setInterval (function () {
              var e = t.find ('img.image-preview').length;
              s <= e &&
                (t.imagesLoaded (function () {
                  setTimeout (function () {
                    t.slick (i);
                  }, 500);
                }), clearInterval (o));
            }, 300);
        }), $ ('[data-roarslider]').each (function () {
        var t = $ (this), e = 'revapi' + t.data ('roarslider');
        document.addEventListener (
          e,
          function (e) {
            t.addClass ('loaded');
          },
          !1
        );
      }), $ (document).off ('click', '.section__anchor'), $ (
        document
      ).on ('click', '.section__anchor', function (e) {
        e.preventDefault ();
        var t = $ (this).closest ('.container-section'),
          i = t.offset ().top + t.outerHeight ();
        $ ('.header-sticky__placeholder').length &&
          !$ ('.header-sticky__placeholder').hasClass ('hide') &&
          (i -= $ (
            '.header-sticky__placeholder'
          ).outerHeight ()), $ ('html, body').animate ({scrollTop: i}, 500, 'swing');
      }), (s = [
        {},
        {
          movement: {
            imgWrapper: {
              translation: {x: 10, y: 10, z: 30},
              rotation: {x: 0, y: -10, z: 0},
              reverseAnimation: {duration: 200, easing: 'easeOutQuad'},
            },
            lines: {
              translation: {x: 10, y: 10, z: [0, 70]},
              rotation: {x: 0, y: 0, z: -2},
              reverseAnimation: {duration: 2e3, easing: 'easeOutExpo'},
            },
            caption: {
              rotation: {x: 0, y: 0, z: 2},
              reverseAnimation: {duration: 200, easing: 'easeOutQuad'},
            },
            overlay: {
              translation: {x: 10, y: -10, z: 0},
              rotation: {x: 0, y: 0, z: 2},
              reverseAnimation: {duration: 2e3, easing: 'easeOutExpo'},
            },
            shine: {
              translation: {x: 100, y: 100, z: 0},
              reverseAnimation: {duration: 200, easing: 'easeOutQuad'},
            },
          },
        },
        {
          movement: {
            imgWrapper: {
              rotation: {x: -5, y: 10, z: 0},
              reverseAnimation: {duration: 900, easing: 'easeOutCubic'},
            },
            caption: {
              translation: {x: 30, y: 30, z: [0, 40]},
              rotation: {x: [0, 15], y: 0, z: 0},
              reverseAnimation: {duration: 1200, easing: 'easeOutExpo'},
            },
            overlay: {
              translation: {x: 10, y: 10, z: [0, 20]},
              reverseAnimation: {duration: 1e3, easing: 'easeOutExpo'},
            },
            shine: {
              translation: {x: 100, y: 100, z: 0},
              reverseAnimation: {duration: 900, easing: 'easeOutCubic'},
            },
          },
        },
        {
          movement: {
            imgWrapper: {
              rotation: {x: -5, y: 10, z: 0},
              reverseAnimation: {duration: 50, easing: 'easeOutQuad'},
            },
            caption: {
              translation: {x: 20, y: 20, z: 0},
              reverseAnimation: {duration: 200, easing: 'easeOutQuad'},
            },
            overlay: {
              translation: {x: 5, y: -5, z: 0},
              rotation: {x: 0, y: 0, z: 6},
              reverseAnimation: {duration: 1e3, easing: 'easeOutQuad'},
            },
            shine: {
              translation: {x: 50, y: 50, z: 0},
              reverseAnimation: {duration: 50, easing: 'easeOutQuad'},
            },
          },
        },
        {
          movement: {
            imgWrapper: {
              translation: {x: 0, y: -8, z: 0},
              rotation: {x: 3, y: 3, z: 0},
              reverseAnimation: {duration: 1200, easing: 'easeOutExpo'},
            },
            lines: {
              translation: {x: 15, y: 15, z: [0, 15]},
              reverseAnimation: {duration: 1200, easing: 'easeOutExpo'},
            },
            overlay: {
              translation: {x: 0, y: 8, z: 0},
              reverseAnimation: {duration: 600, easing: 'easeOutExpo'},
            },
            caption: {
              translation: {x: 10, y: -15, z: 0},
              reverseAnimation: {duration: 900, easing: 'easeOutExpo'},
            },
            shine: {
              translation: {x: 50, y: 50, z: 0},
              reverseAnimation: {duration: 1200, easing: 'easeOutExpo'},
            },
          },
        },
        {
          movement: {
            lines: {
              translation: {x: -5, y: 5, z: 0},
              reverseAnimation: {duration: 1e3, easing: 'easeOutExpo'},
            },
            caption: {
              translation: {x: 15, y: 15, z: 0},
              rotation: {x: 0, y: 0, z: 3},
              reverseAnimation: {
                duration: 1500,
                easing: 'easeOutElastic',
                elasticity: 700,
              },
            },
            overlay: {
              translation: {x: 15, y: -15, z: 0},
              reverseAnimation: {duration: 500, easing: 'easeOutExpo'},
            },
            shine: {
              translation: {x: 50, y: 50, z: 0},
              reverseAnimation: {duration: 500, easing: 'easeOutExpo'},
            },
          },
        },
        {
          movement: {
            imgWrapper: {
              translation: {x: 5, y: 5, z: 0},
              reverseAnimation: {duration: 800, easing: 'easeOutQuart'},
            },
            caption: {
              translation: {x: 10, y: 10, z: [0, 50]},
              reverseAnimation: {duration: 1e3, easing: 'easeOutQuart'},
            },
            shine: {
              translation: {x: 50, y: 50, z: 0},
              reverseAnimation: {duration: 800, easing: 'easeOutQuart'},
            },
          },
        },
        {
          movement: {
            lines: {
              translation: {x: 40, y: 40, z: 0},
              reverseAnimation: {duration: 1500, easing: 'easeOutElastic'},
            },
            caption: {
              translation: {x: 20, y: 20, z: 0},
              rotation: {x: 0, y: 0, z: -5},
              reverseAnimation: {duration: 1e3, easing: 'easeOutExpo'},
            },
            overlay: {
              translation: {x: -30, y: -30, z: 0},
              rotation: {x: 0, y: 0, z: 3},
              reverseAnimation: {duration: 750, easing: 'easeOutExpo'},
            },
            shine: {
              translation: {x: 100, y: 100, z: 0},
              reverseAnimation: {duration: 750, easing: 'easeOutExpo'},
            },
          },
        },
      ]), (i = 0), [].slice
        .call (document.querySelectorAll ('.tilter'))
        .forEach (function (e, t) {
          (i = t % 30 == 0 ? i + 1 : i), new TiltFx (e, s[i - 1]);
        }), $ ('.slick__gallery').each (function () {
        $ (this).slick ({
          rtl: theme.settings.rtl,
          prevArrow: '<button class="slick-prev" type="button"><svg class="svg-icon"><use xlink:href="#global__symbols-prev"></use></svg></button>',
          nextArrow: '<button class="slick-next" type="button"><svg class="svg-icon"><use xlink:href="#global__symbols-next"></use></svg></button>',
        });
      }), $ ('.soundcloud__audio').each (function () {
        var t = $ (this),
          e = {
            async: !0,
            crossDomain: !0,
            url: 'https://soundcloud.com/oembed',
            method: 'GET',
            headers: {},
            data: {format: 'json', url: t.data ('video')},
          };
        $.ajax (e).done (function (e) {
          t.replaceWith (e.html);
        });
      }), o (), $ (document).off ('click', '.header__toggle'), $ (
        document
      ).on ('click', '.header__toggle', function () {
        $ (this).toggleClass (
          'active'
        ), $ ('.collection-header ul').slideToggle ();
      }), (function () {
        if (!$ ('.quickview_btn').length) return;
        $ (document).off ('click', '.quickview_btn'), $ (
          document
        ).on ('click', '.quickview_btn', function (e) {
          e.preventDefault ();
          var t = $ (this),
            i = t.data ('collection_handle'),
            s = t.data ('product_handle');
          t
            .closest ('.product__item')
            .find ('.product__image')
            .css ('background-image')
            .replace (/^url\(['"](.+)['"]\)/, '$1');
          $.ajax ({
            url: '/collections/' +
              i +
              '/products/' +
              s +
              '?view=quickview&cache=false',
            beforeSend: function () {
              t.addClass ('adding');
            },
            complete: function () {
              t.removeClass ('adding');
            },
            success: function (e) {
              $ ('.cd-quick-view .cd-content')
                .empty ()
                .html (e), setTimeout (function () {
                $ ('.cd-quick-view').addClass ('opened');
              }, 300), setTimeout (function () {
                $ ('body').addClass ('blurred').addClass ('quickview-opened');
              }, 500), theme.roarJs.productInfoAnimation (
                $ ('.cd-quick-view')
              ), new theme.Sections ().register (
                'product-quickview',
                theme.Product
              ), Shopify.PaymentButton.init ();
            },
          });
        }), $ (document).off ('click', '.cd-close, .cd-overlay'), $ (
          document
        ).on ('click', '.cd-close, .cd-overlay', function () {
          $ ('body')
            .removeClass ('blurred')
            .removeClass (
              'quickview-opened'
            ), $ ('.cd-quick-view').removeClass ('opened');
        }), $ (document).keyup (function (e) {
          '27' == e.which &&
            $ ('.cd-quick-view').hasClass ('opened') &&
            $ ('.cd-close').trigger ('click');
        });
      }) (), (function () {
        if (!$ ('.product__colors .swatch-item').length) return;
        $ (document).off ('click', '.product__colors .swatch-item'), $ (
          document
        ).on ('click', '.product__colors .swatch-item', function (e) {
          e.preventDefault ();
          var t = $ (this);
          if (!t.hasClass ('active')) {
            var i = t
              .closest ('.product__item')
              .find ('.product__image-featured'),
              s = t.data ('bgset');
            i
              .attr ('data-bgset', s)
              .removeClass ('lazyloaded')
              .addClass ('lazyload'), t
              .closest ('.product__colors')
              .find ('.swatch-item')
              .removeClass ('active'), t.addClass ('active');
          }
        });
      }) (), $ (document).off (
        'click',
        '.addcart_btn:not(.added), .product-form__cart-submit'
      ), $ (
        document
      ).on (
        'click',
        '.addcart_btn:not(.added), .product-form__cart-submit',
        function (e) {
          e.preventDefault ();
          var i = $ (this), t = i.closest ('form'), a = $ ('body');
          return 1 != theme.settings.cartAjax
            ? t.submit ()
            : $.ajax ({
                type: 'POST',
                url: '/cart/add.js',
                async: !0,
                cache: !1,
                data: t.serialize (),
                dataType: 'json',
                beforeSend: function () {
                  i.addClass ('adding');
                },
                success: function (o) {
                  if ('redirect' == theme.settings.afterAddition)
                    return !(window.location = '/cart');
                  theme.MiniCart.update ().promise ().done (function () {
                    var e = 0;
                    i.hasClass ('progress-btn') &&
                      (e = 500), i.addClass ('active'), setTimeout (function () {
                      i
                        .removeClass ('adding')
                        .text (i.data ('added'))
                        .addClass ('added'), e &&
                        setTimeout (function () {
                          i.removeClass ('active').removeClass ('added');
                        }, 2e3);
                    }, e);
                    var s = theme.settings.afterAddition, t = 0;
                    e &&
                      (t =
                        e +
                        800), (a.hasClass ('compare-opened') || a.hasClass ('quickview-opened')) && ((t = 0), (s = 'message')), setTimeout (function () {
                      switch (s) {
                        case 'minicart':
                          theme.MiniCart.open ();
                          break;
                        case 'message':
                          var e = o;
                          if (void 0 !== e.id) {
                            var t = theme.Images.getSizedImageUrl (
                              e.image,
                              '200x'
                            ),
                              i = e.title;
                            p (
                              t,
                              theme.strings.productAdded.replace (
                                '{{ product_name }}',
                                i
                              ),
                              !0
                            );
                          } else {
                            p ('alert', e.message + ': ' + e.description);
                          }
                      }
                    }, t);
                  });
                },
              }), !1;
        }
      ), $ (document).off ('click', '.product-form__cart-submit--grouped'), $ (
        document
      ).on ('click', '.product-form__cart-submit--grouped', function (e) {
        e.preventDefault ();
        var t = $ (this),
          i = t
            .closest ('.product-single__content')
            .find ('.product-single__grouped .product-form__input');
        return i.length &&
          ((Shopify.queue = []), i.each (function () {
            0 < parseInt ($ (this).val ()) &&
              Shopify.queue.push ({
                variantId: $ (this).data ('variant_id'),
                quantity: parseInt ($ (this).val ()),
              });
          }), (Shopify.moveAlong = function () {
            if (Shopify.queue.length) {
              var e = Shopify.queue.shift ();
              Shopify.addItem (
                e.variantId,
                e.quantity,
                e.properties,
                Shopify.moveAlong
              );
            } else
              t.removeClass ('adding'), theme.MiniCart.update (), 'redirect' ==
                theme.settings.afterAddition
                ? (location.href = '/cart')
                : 'minicart' == theme.settings.afterAddition &&
                    theme.MiniCart.open ();
          }), (Shopify.addItem = function (e, t, i, s) {
            var o = {quantity: t, id: e};
            0 != i && (o.properties = i), $.ajax ({
              type: 'POST',
              url: '/cart/add.js',
              dataType: 'json',
              data: o,
              success: function () {
                'function' == typeof s && s ();
              },
              error: function () {},
            });
          }), Shopify.queue.length &&
            (t.addClass ('adding'), Shopify.moveAlong ())), !1;
      }), $ (document).off (
        'click',
        '.products-grid .product .options_btn'
      ), $ (
        document
      ).on ('click', '.products-grid .product .options_btn', function (e) {
        e.preventDefault (), $ (this).closest ('.product').addClass ('opened');
      }), $ (document).off ('click', '.products-grid .product .close_btn'), $ (
        document
      ).on ('click', '.products-grid .product .close_btn', function (e) {
        e.preventDefault (), $ (this).closest ('.product').removeClass ('opened');
      }), (function () {
        if (!$ ('.addwishlist_btn').length) return;
        $ (document).off ('click', '.addwishlist_btn:not(.added)'), $ (
          document
        ).on ('click', '.addwishlist_btn:not(.added)', function (e) {
          e.preventDefault ();
          var i = $ (this), t = parseInt (i.data ('customer_id'));
          if (0 < t) {
            var s = i.data ('shop_domain'),
              o = parseInt (i.data ('product_id')),
              a = i.data ('product_handle');
            if (s.length && a.length && o) {
              var n = document.createElement ('form');
              n.setAttribute ('action', '/contact'), n.setAttribute (
                'method',
                'POST'
              ), n.setAttribute ('style', 'display:none');
              var r = document.createElement ('input');
              r.setAttribute ('type', 'hidden'), r.setAttribute (
                'name',
                'customer'
              ), r.setAttribute ('value', t);
              var c = document.createElement ('input');
              c.setAttribute ('type', 'hidden'), c.setAttribute (
                'name',
                'shop'
              ), c.setAttribute ('value', s);
              var l = document.createElement ('input');
              l.setAttribute ('type', 'hidden'), l.setAttribute (
                'name',
                'id'
              ), l.setAttribute ('value', o);
              var d = document.createElement ('input');
              d.setAttribute ('type', 'hidden'), d.setAttribute (
                'name',
                'handle'
              ), d.setAttribute ('value', a);
              var u = document.createElement ('input');
              u.setAttribute ('type', 'hidden'), u.setAttribute (
                'name',
                'action'
              ), u.setAttribute ('value', 'add_wishlist'), n.appendChild (
                r
              ), n.appendChild (c), n.appendChild (l), n.appendChild (
                d
              ), n.appendChild (u), $ ('body').append (n);
              var h = $ (n).serialize ();
              $.ajax ({
                type: 'POST',
                url: '/a/wishlist',
                async: !0,
                cache: !1,
                data: h,
                dataType: 'json',
                beforeSend: function () {
                  i.addClass ('adding');
                },
                complete: function () {
                  i.removeClass ('adding');
                },
                success: function (e) {
                  if (
                    (p ('check', theme.strings.wishlistAdded), i
                      .addClass ('added')
                      .find ('.tooltip')
                      .text (i.data ('added')), $ (n).remove (), 1 == e.code)
                  ) {
                    var t = parseInt (e.json);
                    t
                      ? $ ('.wishlist__count').removeClass ('hide').text (t)
                      : $ ('.wishlist__count').addClass ('hide').text (0);
                  }
                },
              });
            }
          } else window.location = '/account/login';
        });
      }) (), (function () {
        if (!$ ('.removewishlist_btn').length) return;
        $ (document).off ('click', '.removewishlist_btn'), $ (
          document
        ).on ('click', '.removewishlist_btn', function () {
          var i = $ (this), e = parseInt (i.data ('customer_id'));
          if (0 < e) {
            var t = i.data ('shop_domain'),
              s = parseInt (i.data ('product_id'));
            if (t.length && s) {
              var o = document.createElement ('form');
              o.setAttribute ('action', '/contact'), o.setAttribute (
                'method',
                'POST'
              ), o.setAttribute ('style', 'display:none');
              var a = document.createElement ('input');
              a.setAttribute ('type', 'hidden'), a.setAttribute (
                'name',
                'customer'
              ), a.setAttribute ('value', e);
              var n = document.createElement ('input');
              n.setAttribute ('type', 'hidden'), n.setAttribute (
                'name',
                'shop'
              ), n.setAttribute ('value', t);
              var r = document.createElement ('input');
              r.setAttribute ('type', 'hidden'), r.setAttribute (
                'name',
                'product'
              ), r.setAttribute ('value', s);
              var c = document.createElement ('input');
              c.setAttribute ('type', 'hidden'), c.setAttribute (
                'name',
                'action'
              ), c.setAttribute ('value', 'remove_wishlist'), o.appendChild (
                a
              ), o.appendChild (n), o.appendChild (r), o.appendChild (c), $ (
                'body'
              ).append (o);
              var l = $ (o).serialize ();
              $.ajax ({
                type: 'POST',
                url: '/a/wishlist',
                async: !0,
                cache: !1,
                data: l,
                dataType: 'json',
                beforeSend: function () {
                  $ ('.wishlist__table').addClass ('loading');
                },
                complete: function () {
                  $ ('.wishlist__table').removeClass ('loading');
                },
                success: function (e) {
                  if (($ (o).remove (), 1 == e.code)) {
                    var t = parseInt (e.json);
                    t
                      ? i.closest ('tr').slideUp ('fast', function () {
                          $ (
                            this
                          ).remove (), p ('check', theme.strings.wishlistRemoved), $ ('.wishlist__count').removeClass ('hide').text (t);
                        })
                      : location.reload ();
                  }
                },
              });
            }
          } else window.location = '/account/login';
        });
      }) (), (function () {
        if (!$ ('.page-wishlist .ajax_load_button .loadmore').length) return;
        $ (document).off (
          'click',
          '.page-wishlist .ajax_load_button .loadmore'
        ), $ (
          document
        ).on (
          'click',
          '.page-wishlist .ajax_load_button .loadmore',
          function () {
            var t = '.page-wishlist .ajax_load_button .loadmore',
              i = '.page-wishlist .ajax_load_button',
              s = '.page-wishlist .wishlist__item',
              o = '.page-wishlist .pagination';
            if ($ (o).find ('a.next').length) {
              $ (t).attr ('data-processing', 1);
              var e = $ (o).find ('a.next').attr ('href'),
                a = $ (t).data ('no_more');
              $ (i).addClass ('loading'), $.get (e, function (e) {
                $ (o)
                  .empty ()
                  .html (
                    $ (e).find (o).html ()
                  ), $ (e).find (s).each (function () {
                  $ (s).last ().after ($ (this));
                }), $ (i).removeClass (
                  'loading'
                ), $ (t).attr ('data-processing', 0), 0 == $ (o).find ('a.next').length && ($ (i).addClass ('ajax_load_finished').removeClass ('ajax_load_hidden'), $ (t).show ().html (a).addClass ('disabled').prop ('disabled', !0));
              });
            } else {
              a = $ (t).attr ('data-no-more');
              $ (i)
                .addClass ('ajax_load_finished')
                .removeClass ('ajax_load_hidden'), $ (t)
                .show ()
                .html (a)
                .addClass ('disabled')
                .prop ('disabled', !0);
            }
          }
        );
      }) (), (function () {
        var t = 'roarStorage_compare', i = localStorage.getItem (t) || '[]';
        try {
          i = JSON.parse (i);
        } catch (e) {
          localStorage.removeItem (t), (i = JSON.parse ('[]'));
        }
        i.length &&
          $ ('.addcompare_btn').each (function () {
            var e = $ (this), t = e.data ('product_id');
            i.includes (t) &&
              e.addClass ('added').find ('.tooltip').text (e.data ('added'));
          }), $ (document).off ('click', '.compare__close'), $ (
          document
        ).on ('click', '.compare__close', function () {
          $ ('body').removeClass (
            'compare-opened'
          ), $ ('.compare__modal').removeClass ('opened');
        }), $ (document).keyup (function (e) {
          '27' == e.which &&
            $ ('.compare__modal').hasClass ('opened') &&
            $ ('.compare__close').trigger ('click');
        });
      }) (), a (), $ (document).off ('click', '.removecompare_btn'), $ (
        document
      ).on ('click', '.removecompare_btn', function (e) {
        e.preventDefault ();
        var t,
          i = (t = $ (this)).data ('product_id'),
          s = '.product__' + i,
          o = 'roarStorage_compare',
          a = localStorage.getItem (o) || '[]';
        try {
          a = JSON.parse (a);
        } catch (e) {
          localStorage.removeItem (o), (a = JSON.parse ('[]'));
        }
        a.includes (i) && a.splice (a.indexOf (i), 1);
        try {
          localStorage.setItem (o, JSON.stringify (a.slice (0, 50)));
        } catch (e) {}
        a.length
          ? $ ('.compare__list ' + s).remove ()
          : $ ('.compare__close').trigger (
              'click'
            ), (t = $ (s + ' .addcompare_btn')).removeClass ('added').find ('.tooltip').text (t.data ('tooltip'));
      }), $ (document).off ('click', '.alert-message'), $ (
        document
      ).on ('click', '.alert-message', function () {
        $ (this).hide ();
        var e = 0, t = theme.settings.afterAddition;
        $ ('body').hasClass ('quickview-opened') &&
          ((t = 'message'), (e = 300), $ ('.cd-quick-view .cd-close').trigger (
            'click'
          )), $ (this).hasClass ('cart_message') &&
          'message' == t &&
          setTimeout (function () {
            theme.MiniCart.open ();
          }, e);
      }), $ (document).off ('click', '.password-login'), $ (
        document
      ).on ('click', '.password-login', function (e) {
        e.preventDefault (), $ ('body').addClass ('password-opened'), setTimeout (function () {
          $ ('.password-modal input').focus ();
        }, 250);
      }), $ (document).off (
        'click',
        '.password-modal .modal__close, .password__overlay'
      ), $ (
        document
      ).on (
        'click',
        '.password-modal .modal__close, .password__overlay',
        function () {
          $ ('body').removeClass ('password-opened');
        }
      ), $ (document).keyup (function (e) {
        27 == e.keyCode && $ ('body').removeClass ('password-opened');
      }), $ ('.password-modal').find ('.errors').length &&
        ($ ('body').addClass ('password-opened'), setTimeout (function () {
          $ ('.password-modal input').focus ();
        }, 250)), n (), $ ('#site-footer').hasClass ('is-reveal') &&
        (e (), $ (window).resize (function () {
          e ();
        })), r ();
    },
    bgSet: function (t) {
      if (t) {
        var i = t.width / t.height, s = '';
        return [
          180,
          360,
          540,
          720,
          900,
          1080,
          1296,
          1512,
          1728,
          1950,
          2048,
        ].forEach (function (e) {
          t.width > e &&
            (s +=
              theme.Images.getSizedImageUrl (t.src, e + 'x') +
              ' ' +
              e +
              'w ' +
              Math.round (e / i) +
              'h,');
        }), (s +=
          theme.Images.getSizedImageUrl (t.src, 'master') +
          ' ' +
          t.width +
          'w ' +
          t.height +
          'h');
      }
    },
    backHistory: function () {
      history.go (-1);
    },
    initReviews: function () {
      'undefined' != typeof jQuery &&
        'undefined' != typeof SPR &&
        (SPR.registerCallbacks (), SPR.initRatingHandler (), SPR.initDomEls (), SPR.loadProducts (), SPR.loadBadges ());
    },
    splitText: i,
    animationProduct: c,
    productInfoAnimation: s,
  };
}) ()), $ (document).ready (function () {
  var e = new theme.Sections ();
  e.register (
    'cart-template',
    theme.Cart
  ), e.register ('cart-gift', theme.CartGift), e.register ('shipping-calculator', theme.ShippingCalculator), e.register ('collection-template', theme.Filters), e.register ('sidebar-sticky', theme.SidebarSticky), e.register ('product-template', theme.Product), e.register ('header-mobile', theme.HeaderMobile), e.register ('header-section', theme.HeaderSection), e.register ('map', theme.Maps), e.register ('slideshow-section', theme.SlideshowSection), e.register ('line_item', theme.LineItem), e.register ('instagram', theme.Instagram), e.register ('countdown-timer', theme.CountdownTimer), e.register ('products-slider', theme.ProductsSlider), e.register ('product-tabs', theme.ProductTabs), e.register ('newsletter-popup', theme.NewsletterPopup), e.register ('lookbook-section', theme.LookbookSection), e.register ('rich-banner', theme.RichBanner), e.register ('collections-slider', theme.CollectionsSlider);
}), (theme.init = function () {
  theme.roarJs.init (), theme.customerTemplates.init (), $ (
    'a[href="#"]'
  ).on ('click', function (e) {
    e.preventDefault ();
  });
}), $ (theme.init), $ (
  '#shopify-product-reviews'
).on ('DOMSubtreeModified', function () {
  var e = $ (this);
  !e.hasClass ('customized') &&
    e.find ('.spr-reviews').length &&
    (e.addClass ('customized'), setTimeout (function () {
      e.find ('.spr-header').append (e.find ('.spr-reviews'));
    }, 300));
});
