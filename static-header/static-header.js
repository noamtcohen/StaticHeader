/**
 * Created by noamc on 10/8/15.
 */
(function($){
    var PLUGIN_NAME = "staticHeader";

    $(window).resize(function(){
        $(".static-header-wrapper").each(function(){
            resize.apply(this);
        })
    });

    $.fn[PLUGIN_NAME] = function(methodOrOptions) {
        this.each(function() {
            if (methods[methodOrOptions]) {
                return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
                return init.apply(this, arguments);
            } else {
                $.error('Method ' + methodOrOptions + ' does not exist on ' + PLUGIN_NAME + " plugin");
            }
        });
        return this;
    };

    var methods = {
        destroy:function(){
            var $wrapper = findWrapper.apply(this);

            var $tbl = $wrapper.find(".static-header-thead-wrapper table").detach();
            var $tbody = $wrapper.find(".static-header-tbody-wrapper table tbody").detach();

            $tbl.append($tbody);

            $tbl.removeData('static-header-init');

            $tbl.find(".cell-wrapper").contents().unwrap();
            $tbl.find(".content-wrapper").contents().unwrap();

            $wrapper.replaceWith($tbl);

            return this;
        }
    };

    function init(options) {
        var settings = $.extend({
            overflow:{
                maxHeight: 300
            }
        }, options );

        if(wasInit.apply(this))
            return;

        wrapTmp.apply(this);
        wrapCells.apply(this);
        wrapMain.apply(this);

        var $thead = $(this).find("thead").detach();
        var $tbody = $(this).find("tbody").detach();

        cloneTable.apply(this);

        appendScroller.apply(this)

        var $headTbl = $(this).parent().find("table:first");
        var $bodyTbl = $(this).parent().find("table:nth-child(2)");

        $headTbl.append($thead);
        $bodyTbl.append($tbody);

        $headTbl.wrap('<div class="static-header-thead-wrapper"></div>');
        $bodyTbl.wrap('<div class="static-header-tbody-wrapper"></div>');
        $bodyTbl.parent().css(settings.overflow);

        setScrollEvent.apply(this);

        wrapTmp.apply(this,[{unwrap:true}]);

        resize.apply(this);

        return this;
    }

    function wrapCells(){
        $(this).find("td").wrapInner(function(){
            return "<div class='cell-wrapper' style='width:"+$(this).width()+"px'><div class='content-wrapper'></div></div></div>";
        });
    }

    function wrapMain(){
        $(this).wrap('<div class="static-header-wrapper"></div>');
    }

    function resize(){
        var $wrapper = findWrapper.apply(this);
        $wrapper.find(".static-header-scroll-content").width($wrapper.find("table:first").width());

        var $tds = $wrapper.find("td");
        for(var i=0;i<$tds.length;i++){
            $tds.eq(i).find(".content-wrapper").width($tds.eq(i).width());
        }
    }

    function findWrapper(){
        if($(this).hasClass("static-header-wrapper"))
            return $(this);
        else
            return $(this).parents(".static-header-wrapper:first");
    }

    function wasInit(){
        if($(this).data("static-header-init"))
            return true;

        $(this).data("static-header-init",{});
        return false;
    }

    function setInitFlag(){
        $(this).data("static-header-init",{});
    }

    function wrapTmp(arg){
        if(arg && arg.unwrap)
            $(this).parents('.static-header-tmp-wrapper:first').contents().unwrap();
        else
            $(this).wrap("<div class='static-header-tmp-wrapper' style='width:0px;'></div>");
    }

    function cloneTable(){
        $(this).parent().append($(this).clone());
    }

    function appendScroller(){
        $(this).parent().append('<div class="static-header-scroller"><div class="static-header-scroll-content">&nbsp;</div></div>');
    }

    function setScrollEvent(){
        var $wrapper = $(this).parent().parent();
        $wrapper.find(".static-header-scroller").on("scroll",function(){
            var scrollLeft = $(this).scrollLeft();

            $wrapper.find(".static-header-thead-wrapper").scrollLeft(scrollLeft);
            $wrapper.find(".static-header-tbody-wrapper").scrollLeft(scrollLeft);
        });
    }
}(jQuery));

