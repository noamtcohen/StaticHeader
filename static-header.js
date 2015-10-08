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
                // Do something to each element here.
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

