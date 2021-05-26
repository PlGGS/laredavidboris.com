/*
 * By Sebastian Strempfer
 * :)
 */ 

(function($) {

    $.fn.simpleSlideshow = function(img, options) {
        /// <summary>creates a slideshow in the selected div with images given as arguments</summary>
        /// <param name="img" type="array">Images</param>
        /// <param name="options" type="object">Options</param>
        /// <returns type="void"></returns>

        $(this).empty().append('<div class="sl-shadow sl-shadow-left"></div><div class="sl-slider"></div><div class="sl-shadow sl-shadow-right"></div><i class="fa fa-angle-left" aria-hidden="true"></i><i class="fa fa-angle-right" aria-hidden="true"></i>');
        var slider = $(this).find("div.sl-slider");
        var shadow = $(this).find("div.sl-shadow");
        var aleft = $(this).find(".fa-angle-left")
        var aright = $(this).find(".fa-angle-right")
        var that = this;

        var height = $(this).height();

        shadow.css({
         //   'position': 'absolute',
            'box-shadow': '0px 0px 10px 5px rgba(0,0,0,1)',
            'height': height,
            'position': 'relative',
            'z-index': '10'
        })

        $(this).css({
            'overflow': 'hidden',
            'background': 'transparent',
            'position': 'relative',
            'display': 'flex'
        })
        slider.css({
            'display': 'flex',
            'width': '100%',
            'height': height+24,
            'overflow-x': 'scroll',
            'overflow-y': 'hidden',
            'flex-direction':'row' 
        })

        aleft.add(aright).css({
            'position': 'absolute',
            'top': height/2 - 24,
            'font-size': '48px',
            'z-index': '11',
            'opacity': '.5',
            'transition': 'opacity 0.1s ease'
        })
        .mouseover( function() { $(this).css("opacity", 1) })
        .mouseleave(function() { $(this).css("opacity", 0.5) })
        aleft.css({
            'left': '16px'
        })
        aright.css({
            'right': '16px'
        })

        aleft.add(aright).click(function() {
            var pos = slider.scrollLeft() + slider.width()/2
            var currPos = 0;
            var elem
            var that = this;
            slider.find("img").each(function() {
                currPos += 4;
                currPos += $(this).width();
                currPos += 4;
                console.log(currPos, pos)
                if($(that).hasClass("fa-angle-left")) {
                    elem = $(this).prev();
                } else {
                    elem = $(this).next();
                }
                if(currPos > pos) {
                    return false;
                }

            })

            slider.animate({scrollLeft: elem.position().left + slider.scrollLeft() - (slider.width() - elem.width()) / 2})
        })

        var leftShadow = $(this).find(".sl-shadow-left");
        var rightShadow = $(this).find(".sl-shadow-right");

        slider.mousewheel(function(event, delta) {

            let prevLeft = this.scrollLeft
            this.scrollLeft -= (delta * 30);

            leftShadow.css("opacity", (this.scrollLeft == 0)?0:1);
            rightShadow.css("opacity", (this.scrollLeft != 0 && Math.abs(prevLeft - this.scrollLeft) < Math.abs(delta * 30))?0:1);
          
            event.preventDefault();
      
        });

        slider.mousewheel();

        var imgObj = $('<img src="">');
        imgObj.css({
            'height': height,
            'margin': '0 4px'
        })

        if(img !== undefined && img.length > 0) {
            for(let i in img) {
                let timg = imgObj.clone()
                timg.attr("src", img[i])
                slider.append(timg);
            }
        } else {
            // add error
        }
    }

}(jQuery))