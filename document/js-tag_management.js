-----------------------------------------------------
JS
-----------------------------------------------------
Master admin -> Tag management
-----------------------------------------------------

CSS - Master Global Get

// Make sure jquery exists before running our code
nd.auto.require(['jquery'], function ($) {
    if ($('[href*="/templateEditor.css"]').length !== 0) return;

    // file folder path update as required
    var folderPath = '/js/_ND';
    var fallBackTempPath = '//nd-auto-styles-temp-production.s3.amazonaws.com/4224e7c4d625d2dfc9c44af068271322ec3082e5';

    // array of scripts we need to get
    // remove items not required
    var NDSiteScripts = [
        '/masterGlobal.min.js',
        '/menuImages.min.js'
    ];

    var NDSite = function (response, textStatus) {
        // run custom css plugins/code here
        if (!NDCSS) {
            console.error('NDCSS is undefined');
            return;
        }

        // JS Grouping
        $(window).trigger('resize');

        // New car menu images
        NDCSS.MenuImages.init({
          selector: '#primary-menu .dropdown.new-cars .dropdown-menu',
          placeholder: '/images/no-images/no-image-16-9.png'
        });

        // Save animation for sidebar
        $('body').on('click', '.save-vehicle', function () {
          $('body').addClass('vehicle-saved');
          $('.row-qyzx7').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
            setTimeout(function () {
              $('body').removeClass('vehicle-saved');
            }, 500);
          });
        });

        // Window animation when toggling footer info
        $('#pre-footer-wrap .toggle-company').click(function () {

          setTimeout(function () {
            $('html, body').animate({
              scrollTop: $(document).height() - $(window).height()
            });
          }, 500);

        });

    };

    var failFunction = function (jqXHR, textStatus, errorThrown) {
        // do something if we fail!!
        if (textStatus == 'timeout')
            console.log('The server is not responding');

        if (textStatus == 'error')
            console.log(errorThrown);
    };

    var retryFallBackPath = function (input) {
        return $.getScript(input);
    };

    /**
     * Gets multiple scripts from the same place
     * @array {array} an array of the files to get
     * @path {string} path to the directory of the scripts
     */
    var getMultiScripts = function (array, path) {
        var _arr = array.map(function (src) {
            var input = (path || fallBackTempPath + folderPath) + src;
            // fallback to temp folder if no path is provided
            return $.getScript(input)
            .fail(function() {
                return retryFallBackPath(fallBackTempPath + folderPath + src);
            });
        });

        _arr.push($.Deferred(function (deferred) {
            $(deferred.resolve);
        }));

        return $.when.apply($, _arr);
    };

    var doneGetTimestamp = function (response, textStatus) {
        getMultiScripts(NDSiteScripts, '//d2638j3z8ek976.cloudfront.net/global-css-files/' + response.trim() + folderPath)
            .done(NDSite)
            .fail(failFunction);
    };

    /**
     * Gets the timestamp of the cloudfront global CSS files
     */
    $.get('/api/css/timestamp')
    .done(doneGetTimestamp)
    .fail(failFunction);
});

-----------------------------------------------------
CSS  - Jump second button

// require V10 scripts default ones jquery and script loader
nd.auto.require(['jquery', 'externalScriptsLoader'], function($, externalScriptsLoader) {
    // uncomment the below to import a external script
    // externalScriptsLoader.loadScriptAfterAllRequireScripts('SCRIPT_SRC');
    // check we are not in the editor before running anything
    if ($('[href*="/templateEditor.css"]').length === 0) {
        var scriptName = 'Jump Second Button';
        console.log('CSS - ' + scriptName);
        var checkDiv = setInterval(function(){
			if ( $('.js-has-second-button .text__inner').length ) {
                $( ".js-has-second-button" ).each(function() {
        			$(this).next('.button').appendTo('.js-has-second-button .text__inner');
        		});
				clearInterval(checkDiv);
			}
		}, 300);
    }
});
