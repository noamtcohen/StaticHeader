/**
 * Created by noamc on 10/8/15.
 */
(function($){
    var PLUGIN_NAME = "staticHeader";

    $(window).resize(function(){
        $(".static-header-wrapper").each(function(){
            methods.resize.apply(this);
        })
    });

    var methods = {
        init : function(options) {
            var settings = $.extend({
                overflow:{
                    maxHeight: 300
                }
            }, options );

            if($(this).data("static-header-init"))
                return;
            $(this).data("static-header-init",{});

            $(this).wrap("<div class='static-header-tmp-wrapper' style='width:0px;'></div>");

            $(this).find("td").wrapInner(function(){
                return "<div class='cell-wrapper'><div style='width:"+$(this).width()+"px'></div></div>";
            });

            $(this).wrap('<div class="static-header-wrapper"></div>');

            var $thead = $(this).find("thead").detach();
            var $tbody = $(this).find("tbody").detach();



            $(this).parent().append($(this).clone());

            $(this).parent().append('<div class="static-header-scroller"><div class="static-header-scroll-content">&nbsp;</div></div>');
            var $headTbl = $(this).parent().find("table:first");
            var $bodyTbl = $(this).parent().find("table:nth-child(2)");

            $headTbl.attr("data-static-header-options",JSON.stringify(options));

            $headTbl.append($thead);
            $bodyTbl.append($tbody);

            $headTbl.wrap('<div class="static-header-thead-wrapper"></div>');
            $bodyTbl.wrap('<div class="static-header-tbody-wrapper"></div>');

            var $mainWrapper = $(this).parent().parent();

            $mainWrapper.find(".static-header-tbody-wrapper").css(settings.overflow);

            $mainWrapper.find(".static-header-scroller").on("scroll",function(){
                var scrollLeft = $(this).scrollLeft();

                $mainWrapper.find(".static-header-thead-wrapper").scrollLeft(scrollLeft);
                $mainWrapper.find(".static-header-tbody-wrapper").scrollLeft(scrollLeft);
                });


            $(this).parents('.static-header-tmp-wrapper:first').contents().unwrap();

            methods.resize.apply(this);

            return this;
        },
        resize : function( ) {
            var $wrapper = methods.findWrapper.apply(this);
            $wrapper.find(".static-header-scroll-content").width($wrapper.find("table:first").width());
        },
        destroy:function(){
            var $wrapper = methods.findWrapper.apply(this);

            var $tbl = $wrapper.find(".static-header-thead-wrapper table").detach();
            var $tbody = $wrapper.find(".static-header-tbody-wrapper table tbody").detach();

            $tbl.append($tbody);

            $tbl.removeData('static-header-init');

            $tbl.find(".cell-wrapper").contents().unwrap();
            $wrapper.replaceWith($tbl);

            return this;
        },
        findWrapper:function(){
            if($(this).hasClass("static-header-wrapper"))
                return $(this);
            else
                return $(this).parents(".static-header-wrapper:first");
        }
    };

    $.fn[PLUGIN_NAME] = function(methodOrOptions) {
        this.each(function() {
            if (methods[methodOrOptions]) {
                return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + methodOrOptions + ' does not exist on ' + PLUGIN_NAME + " plugin");
            }
        });
        return this;
    };
}(jQuery));

