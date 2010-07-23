/*
 * jQuery css3 lightbox
 * http://github.com/zaius/css3-lightbox
 * David Kelso 2010, david at kelso dot id dot au
 */

(function ($) {
  var default_options = {
    type: 'text',
    width: 400,
    height: 300,
    spinner: {
      speed: 100,
      segments: 8
    },
    css: { 
      shadow: {
        'background-color': 'black',
        'opacity': 0.8,
        'position': 'fixed',
        'left': 0, 'top': 0, 'bottom': 0, 'right': 0,
        'z-index': 1000
      },
      modal: {
        'background-color': 'black',
        'color': 'white',
        'padding': 10,
        'position': 'fixed',
        'z-index': 1001,
        'border': '5px solid white',
        'border-radius': 10, '-moz-border-radius': 10, '-webkit-border-radius': 10,
        'box-shadow': '0 0 10px #fff', '-moz-box-shadow': '0 0 10px #fff', '-webkit-box-shadow': '0 0 10px #fff'
      },
      close_button: {
        'cursor': 'pointer',
        'position': 'absolute',
        'top': -10, 'right': -10,
        'width': 20, 'height': 18,
        'border-radius': 20, '-moz-border-radius': 20, '-webkit-border-radius': 20,
        'box-shadow': '5px 5px 5px #000', '-moz-box-shadow': '5px 5px 5px #000', '-webkit-box-shadow': '5px 5px 5px #000',
        'border': '2px solid white',
        'background': 'black',
        'color': 'white',
        'font-family': 'sans-serif',
        'font-size': 14,
        'font-weight': 'bold',
        'padding': '2px 0 0 0px',
        'margin': 0,
        'text-align': 'center'
      },
      spinner: { 
        'width': 200, 'height': 200,
        'position': 'absolute'
      },
      spinner_ball: {
        'position': 'absolute',
        'width': 5,
        'height': 5,
        'background-color': 'white',
        'border-radius': 5, '-moz-border-radius': 5, '-webkit-border-radius': 5,
        'box-shadow': '0 0 2px #000', '-moz-box-shadow': '0 0 2px #000', '-webkit-box-shadow': '0 0 2px #000'
      }
    }
  };

  var set_dynamic_css = function(options) {
    var dynamic_css = {
      modal: {
        'width': options.width, 
        'height': options.height,
        'left': ($(window).width() - options.width) / 2,
        'top': ($(window).height() - options.height) / 2
      },
      spinner: {
        'left': (options.width - options.css.spinner.width) / 2,
        'top': (options.height - options.css.spinner.height) / 2
      }
    };

    $.extend(true, options.css, dynamic_css);
  };


  var show = function(options) {
    options = $.extend(true, {}, default_options, options);
    set_dynamic_css(options);

    var shadow = $('<div />', { css: options.css.shadow});
    var modal = $('<div />', { css: options.css.modal});
    var spinner = $('<div />', { css: options.css.spinner});
    var close = $('<div />', { text: 'X', css: options.css.close_button});

    // Spinner setup
    var spinner_balls = [];
    var size = Math.min(options.css.spinner.width, options.css.spinner.height);
    for (var i = 0; i < options.spinner.segments; i++) {
      options.css.spinner_ball.top = size / 2 + 25 * Math.sin(Math.PI * 2 * i / options.spinner.segments);
      options.css.spinner_ball.left = size / 2 + 25 * Math.cos(Math.PI * 2 * i / options.spinner.segments);
      spinner_balls.push($('<div />', { css: options.css.spinner_ball}));
    }
    $.each(spinner_balls, function() { spinner.append(this); });

    var spinning = true;
    var fade = function(i) {
      if (!spinning) return;
      spinner_balls[i].stop(true, true).fadeTo(0, 1).
        fadeOut(options.spinner.segments * options.spinner.speed);

      setTimeout(function() {
        fade((i + 1) % options.spinner.segments)
      }, options.spinner.speed);
    };
    
    var start_spinner = function() { modal.append(spinner); fade(0); }
    var stop_spinner = function() { spinner.remove(); spinning = false; }


    // Would probably be nice to do some fading here. Couldn't be bothered.
    var packup = function() { 
      modal.remove();
      shadow.remove();
    }

    shadow.click(packup);
    close.click(packup);

    modal.append(close);
    $('body').append(shadow).append(modal);

    if (options.type == 'text') {
      modal.append($('<div />', { text: options.text }));
    }
    else if (options.type == 'div') {
      var el = options.element.clone();
      modal.append(el);
      el.show();
    }
    else if (options.type == 'iframe') {
      start_spinner();
      var iframe = $('<iframe />', {
        src: options.url,
        css: {'width': 0, 'height': 0, 'border': 'none'},
        load: function() { 
          stop_spinner();
          iframe.width('100%').height('100%');
        }
      });
      modal.append(iframe);
    } else if (options.type == 'ajax') {
      start_spinner();
      $.get(options.url, function(data) {
        stop_spinner();
        var content = $('<div />', {
          html: data,
          css: { 'overflow-y': 'scroll', 'height': options.height}
        });
        modal.append(content);
      });
    } else {
      throw('unsupported lightbox type');
    }
  };

  $.extend({ lightbox: show });
})(jQuery);
