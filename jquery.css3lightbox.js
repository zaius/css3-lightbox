/*
 * jQuery css3 lightbox
 * http://github.com/zaius/css3-lightbox
 * David Kelso 2010, david at kelso dot id dot au
 */

(function ($) {
  var default_options = {
    width: 400,
    height: 300,
    css: {
      shadow: {
        'background-color': '#777',
        'opacity': 0.7,
        'cursor': 'pointer',
        'position': 'fixed',
        'left': 0, 'top': 0, 'bottom': 0, 'right': 0,
        'z-index': 1000
      },
      modal: {
        'background-color': 'black',
        'color': 'white',
        'position': 'fixed',
        'z-index': 1001,
        'border': '10px solid white',
        'box-shadow': '0 0 15px #444', '-moz-box-shadow': '0 0 15px #444', '-webkit-box-shadow': '0 0 15px #444'
      },
      content: {
        'overflow-y': 'auto',
        'padding': 10,
      },
      close_button: {
        'cursor': 'pointer',
        'position': 'absolute',
        'top': -20, 'right': -20,
        'width': 20, 'height': 18,
        'border-radius': 20, '-moz-border-radius': 20, '-webkit-border-radius': 20,
        'box-shadow': '5px 5px 5px #444', '-moz-box-shadow': '5px 5px 5px #444', '-webkit-box-shadow': '5px 5px 5px #444',
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

  var shadow, modal, content, spinner, close;

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
      },
      content: {
        'height': options.height - options.css.content.padding * 2,
        'width': options.width - options.css.content.padding * 2
      }
    };

    $.extend(true, options.css, dynamic_css);
  };

  var spinning = true;
  var start_spinner = function(options) {
    // Spinner setup
    var spinner_balls = [];
    var size = Math.min(options.css.spinner.width, options.css.spinner.height);
    var segments = 8;
    var speed = 100;
    for (var i = 0; i < segments; i++) {
      options.css.spinner_ball.top = size / 2 + 25 * Math.sin(Math.PI * 2 * i / segments);
      options.css.spinner_ball.left = size / 2 + 25 * Math.cos(Math.PI * 2 * i / segments);
      options.css.opacity = (7 - i) / segments;
      spinner_balls.push($('<div />', { css: options.css.spinner_ball }));
    }
    $.each(spinner_balls, function() {
      spinner.append(this);
      // spinner.fadeTo(();
    });

    var fade = function(i) {
      if (!spinning) return;
      spinner_balls[i].stop(true, true).fadeTo(0, 1).
        fadeOut(segments * speed * 2);

      setTimeout(function() {
        fade((i + 1) % segments)
      }, speed);
    };

    modal.append(spinner);
    fade(0);
  }

  var stop_spinner = function() {
    spinner.remove();
    spinning = false;
  }

  var lightbox = {
    new: function(options) {
      options = $.extend(true, {}, default_options, options);
      set_dynamic_css(options);

      shadow = $('<div />', { css: options.css.shadow });
      modal = $('<div />', { css: options.css.modal });
      content = $('<div />', { css: options.css.content });
      spinner = $('<div />', { css: options.css.spinner });
      close = $('<div />', { css: options.css.close_button, text: 'x' });



      // Would probably be nice to do some fading here. Couldn't be bothered.
      var packup = function() {
        modal.remove();
        shadow.remove();
      }

      shadow.click(packup);
      close.click(packup);

      modal.append(close);
      $('body').append(shadow).append(modal);

      start_spinner(options);
    },

    set_content: function(data) {
      if (typeof(data) == 'string') {
        stop_spinner();

        content.html(data);
        modal.append(content);
      } else {
        // Data is a html element, e.g. iframe, img. Don't need to wrap it
        data.width('100%');
        data.height('100%');
        modal.append(data);
        data.hide();

        data.load(function() {
          stop_spinner();
          data.show();
        });
      }
    }
  };
  $.extend({ lightbox: lightbox });
})(jQuery);
