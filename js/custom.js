
// $(function() {}) is triggered when the HTML if fully rendered and used to ensure that all referenced objects in the code exist
$(function() {
    var smallContactShown = true
    // triggered when scrolling obviously
    $(window).scroll(function() {
        // when scrolled less than half a page down set opacity equal to how far down the page they are
        if($(window).scrollTop() < $(window).height()/2) {
            if(!smallContactShown) {
                $("div.sneaky-contact").show()
                smallContactShown = true;
            }
            $("div.sneaky-contact").css("opacity",1-$(this).scrollTop()/$(window).height()*2)
            
        }
        // otherwise hide it so you cannot click on it when it is hidden
        else {
            if(smallContactShown) {
                $("div.sneaky-contact").hide().css("opacity",0)
                smallContactShown = false;
            }
        }
    })



})
$(function() {

    $(window).resize(function() {
        setFooter();
    })

    function setFooter() {
        console.log($("footer").offset().top + $("footer").height(), $(window).height())
        if($("div.footer-placer").offset().top + $("footer").height() < $(window).height()) {
            $("footer").css("position","fixed").css("bottom","0px").css("width", "100vw")
        } else {
            $("footer").css("position","static").css("width","auto")
        }
        $("footer").css("visibility","visible")
    }

    setFooter();
})

// NAVBAR
$(function() {
    var menuCooldown = 0;
    var hideTimeout;
    $(document).click(function(e) {
        if(menuCooldown + 300 < Date.now()) {
            hideCustomMenu(true);
        }
    })

    $("button.navbar-custom-toggle").click(function(e) {
        if($("div.navbar-custom").hasClass("open")) {
            hideCustomMenu(true)
        } else {
            menuCooldown = Date.now()
            showCustomMenu();
        }
    })
    $("button.navbar-custom-toggle, div.navbar-custom").mouseover(function() {
        if(!$("div.navbar-custom").hasClass("open")) {
            $("button.navbar-custom-toggle").addClass("hover")
            setTimeout(function() {
                $("button.navbar-custom-toggle").removeClass("hover")
            }, 600)
        }
        showCustomMenu()
    })

    $("button.navbar-custom-toggle, div.navbar-custom").mouseleave(function() {
        hideCustomMenu()
    })

    function showCustomMenu() {
        clearTimeout(hideTimeout)
        var height = $("div.navbar-custom ul").children().length * 40 + 2 + "px"
        $("div.navbar-custom").css("opacity",1).css("height",height).addClass("open")
    }

    /*function showCustomMenu() {
        var height = $("div.navbar-custom ul").children().length * 40 + 2 + "px"
        $("div.navbar-custom").css("opacity",1).css("height",height).addClass("open")
    }*/

    function hideCustomMenu(skiptimeout = false) {
        hideTimeout = setTimeout(function() {
            $("div.navbar-custom").css("opacity",0).css("height","0px").removeClass("open")
        },(skiptimeout)?1:500);
    }

    // To make the ripple effect continue after the mouse has left the button
    /*$("button.navbar-custom-toggle").mouseover(function() {

    })*/

    /*function hideCustomMenu() {
        $("div.navbar-custom").css("opacity",0).css("height","0px").removeClass("open")
    }*/
})