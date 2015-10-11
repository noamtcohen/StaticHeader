/**
 * Created by noamc on 10/8/15.
 */
(function($){
    var PLUGIN_NAME = "staticHeader";

    var methods = {
        init : function(options) {
            var settings = $.extend({
                // These are the defaults.
            }, options );

            return this.each(function() {
                $(this).wrap('<div class="static-header-wrapper"></div>');

                var $thead = $(this).find("thead").detach();
                var $tbody = $(this).find("tbody").detach();

                $(this).parent().append($(this).clone());

                var $headTbl = $(this).parent().find("table:first");
                var $bodyTbl = $(this).parent().find("table:nth-child(2)");

                $headTbl.append($thead);
                $bodyTbl.append($tbody);

                $headTbl.wrap('<div class="static-header-thead-wrapper"></div>');
                $bodyTbl.wrap('<div class="static-header-tbody-wrapper"></div>');
            });
        },
        distroy : function( ) {    }
    };

    $.fn[PLUGIN_NAME] = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.'+PLUGIN_NAME);
        }
    };
}(jQuery));

