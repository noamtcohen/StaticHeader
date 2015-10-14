/**
 * Created by noamc on 10/8/15.
 */
(function($){
    var PLUGIN_NAME = "staticHeader";

    $(window).resize(function(){
        methods.resize();
    });

    var methods = {
        init : function(options) {
            var settings = $.extend({
                bodyCss:{
                    height:300
                }
            }, options );

            this.each(function() {
                if($(this).data("static-header-init"))
                    return;
                $(this).data("static-header-init",{});

                $(this).find("td").wrapInner(function(){
                    return "<div class='cell-wrapper' style='width:"+$(this).width()+"px'></div>";
                });

                $(this).wrap('<div class="static-header-wrapper"></div>');

                var $thead = $(this).find("thead").detach();
                var $tbody = $(this).find("tbody").detach();

                $(this).parent().append($(this).clone());

                $(this).parent().append('<div class="static-header-scroller"><div class="static-header-scroll-content">&nbsp;</div></div>');
                var $headTbl = $(this).parent().find("table:first");
                var $bodyTbl = $(this).parent().find("table:nth-child(2)");

                $headTbl.append($thead);
                $bodyTbl.append($tbody);

                $headTbl.wrap('<div class="static-header-thead-wrapper"></div>');
                $bodyTbl.wrap('<div class="static-header-tbody-wrapper"></div>');

                var $mainWrapper = $(this).parent().parent();

                $mainWrapper.find(".static-header-tbody-wrapper").css(settings.bodyCss);

                $mainWrapper.find(".static-header-scroller").on("scroll",function(){
                    var scrollLeft = $(this).scrollLeft();

                    $mainWrapper.find(".static-header-thead-wrapper").scrollLeft(scrollLeft);
                    $mainWrapper.find(".static-header-tbody-wrapper").scrollLeft(scrollLeft);
                });
            });

            methods.resize();

            return this;
        },
        resize : function( ) {
            $(".static-header-wrapper").each(function(){
                var bodyTblWidth = $(this).find(".static-header-tbody-wrapper table").width();
                $(this).find(".static-header-thead-wrapper table").width(bodyTblWidth);
                $(this).find(".static-header-scroll-content").width(bodyTblWidth);
                $(this).find(".static-header-scroller").width($(this).find(".static-header-tbody-wrapper").width())
            });
        },
        destroy:function(){
            this.each(function() {
                var $wrapper;
                if($(this).hasClass("static-header-wrapper"))
                    $wrapper = $(this);
                else
                    $wrapper= $(this).parents(".static-header-wrapper:first");

                var $tbl = $wrapper.find(".static-header-thead-wrapper table").detach();
                var $tbody = $wrapper.find(".static-header-tbody-wrapper table tbody").detach();

                $tbl.append($tbody);

                $tbl.removeData('static-header-init');

                $tbl.find(".cell-wrapper").contents().unwrap();
                $wrapper.replaceWith($tbl);
            });
            return this;
        }
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

