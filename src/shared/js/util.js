window.Util = {};

window.Util.debounce = (callback, interval) => {
  let debounceTimeout = null;
  return () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(callback, interval);
  };
};


window.Util.registerWindowResize = (() => {
  const resizeHandlers = [];
  return (callback) => {
    resizeHandlers.push(callback);
    if (resizeHandlers.length === 1) {
      $(window).on('resize', () => {
        resizeHandlers.forEach((handler) => {
          handler();
        });
      });
    }
  };
})();


// make all grids within a module same height
window.Util.adjustGridHeight = (moduleSelector, itemSelector, mobileBreakPoint) => {
  const $modules = $(moduleSelector);
  const adjust = (items) => {
    let height = 0;
    items.css('height', 'auto');

    // no need to adjust height on mobile
    if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >
      (mobileBreakPoint || 739)) {
      items.each((index, el) => {
        height = Math.max(height, $(el).outerHeight());
      });

      items.css('height', height);
    }
  };

  $modules.each((i, e) => {
    const $items = $(e).find(itemSelector);
    window.Util.registerWindowResize(window.Util.debounce($.proxy(adjust, null, $items), 250));
    adjust($items);
  });
};

// trim text block to the required line number
window.Util.trimText = (textBlockSelector, maxLine) => {
  const $textBlocks = $(textBlockSelector);

  const trim = (blocks) => {
    blocks.each((index, block) => {
      const $block = $(block);
      let text = $block.html();

      // Get the computed line height of the content part
      const lineHeight = Math.round(parseFloat(window.getComputedStyle(block).lineHeight));
      // Force the line height to be an integer to solve the IE/FF floating number issue
      $block.css('line-height', `${lineHeight}px`);


      // Repeatedly trim the text from the end, stop once the content length meets the requirement
      while ($block.height() > lineHeight * maxLine) {
        // Trim non-html tag words/symbols
        const trimmedText = text.replace(/((\s)*([a-zA-Z0-9\-&;]+|\W))(?=(<[^>]*>)*$)/, '');

        // Don't continue if for any reason the text is not trimmed after the regex match
        if (trimmedText === text) {
          break;
        }
        text = trimmedText;

        // Update the content with trimmed text plus tail
        $block.html(`${text}...`);
      }
    });
  };
  window.Util.registerWindowResize(window.Util.debounce($.proxy(trim, null, $textBlocks), 250));
  trim($textBlocks);
};

window.Util.dispatchEvent = (el, eventName, customData) => {
  let event;
  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, true);
  } else if (document.createEventObject) { // IE < 9
    event = document.createEventObject();
    event.eventType = eventName;
  }
  event.eventName = eventName;
  event.customData = customData;
  if (el.dispatchEvent) {
    el.dispatchEvent(event);
  } else if (el.fireEvent && window.htmlEvents[`on${eventName}`]) { // IE < 9
    el.fireEvent(`on${event.eventType}`, event); // can trigger only real event (e.g. 'click')
  } else if (el[eventName]) {
    el[eventName]();
  } else if (el[`on${eventName}`]) {
    el[`on${eventName}`]();
  }
};

window.Util.getUrlParameter = (paramName, noDecode) => {
  const sPageURL =
    noDecode ? window.location.search.substring(1) :
    decodeURIComponent(window.location.search.substring(1));
  let sParameterName;
  let i;
  const sURLVariables = sPageURL.split('&');

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === paramName) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }

  return undefined;
};

window.Util.createCarousel = (params) => {
  params.selector.slick($.extend({}, {
    autoplay: false,
    autoplaySpeed: 5000,
    touchThreshold: 100,
    pauseOnHover: true,
    cssEase: 'ease',
    dotsClass: 'slick-dots hero-carousel__btn-dots',
    prevArrow: '<i class="slick-prev carousel-control__prev-btn"><svg class="icon icon-chevron-left">\n' +
      '              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-right"></use>\n' +
      '            </svg></i>',
    nextArrow: '<i class="slick-next carousel-control__next-btn"><svg class="icon icon-chevron-right">\n' +
      '              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-right"></use>\n' +
      '            </svg></i>',
  }, params));
};

window.Util.setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

window.Util.getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/* eslint-disable */
Array.prototype.stableSort = function (cmp) {
  cmp = !!cmp ? cmp : (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
  let stabilizedThis = this.map((el, index) => [el, index]);
  let stableCmp = (a, b) => {
    let order = cmp(a[0], b[0]);
    if (order != 0) return order;
    return a[1] - b[1];
  }
  stabilizedThis.sort(stableCmp);
  for (let i = 0; i < this.length; i++) {
    this[i] = stabilizedThis[i][0];
  }
  return this;
}
/* eslint-enable */


window.Util.trackPageView = (link = window.location.href, name) => {
  if (window.fa) {
    window.fa(
      'send',
      'fht_page_view',
      encodeURIComponent(link),
    );
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      pageview: name || link,
    });
  }
};

window.Util.trackEvent = (tagName, tagGroup) => {
  $.get(`${window.apiRoot}sCRM?type=${tagName}`);
};

window.Util.supportTouch = () => 'ontouchstart' in document.documentElement;

window.Util.fixViewportSize = () => {
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const viewport = document.querySelector('meta[name=viewport]');

  viewport.setAttribute('content', `height=${viewHeight}px, width=${viewWidth}px, initial-scale=1.0, maximum-scale=1.0, user-scalable=0`);
};

window.Util.dynamicViewportSize = () => {
  document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
};

window.Util.inWeChat = () => !!window.wx;