var mapData;
var mapDataCombined;
var mapDataCallback;
var markers = {};
var cursorPos = {x:0,y:0};
var scrollingPageSince = 0;
var googleMap;
var showingListing = false;

$(function() {
  $(window).scroll(function() {
    if(showingListing !== false) {
      return
    }
    var scrollTop = $(window).scrollTop()
    var offsetTop = $("div.mapBox").offset().top;
    var listingHeight = $("div.listingList").height();
    var mapHeight = $("div.map").height();
    var fixed = $("div.map").hasClass("fixed")

    //console.log(scrollTop, offsetTop, listingHeight, fixed)

    // If scrolled down on or past the listings
    if(scrollTop >= offsetTop - 100) {
        // if currently on the listings
        if(scrollTop < offsetTop + listingHeight - mapHeight - 16 - 100) {
            if(!fixed) {
                $("div.map").addClass("fixed");
                setMapWidth()
            }
            $("div.map").css("margin-top", 0)
        // if past the listings
        } else {
            if(fixed) {
                $("div.map").removeClass("fixed");
            }
            // (the 16 is the margin-bottom on a listing element)
            $("div.map").css("margin-top", listingHeight - $("div.map").height() - 16 +"px")
        }
    // if before the listings
    } else {
        if(fixed) {
            $("div.map").removeClass("fixed")
        }
        $("div.map").css("margin-top", 0)
    }
  })

  // to set the map to the right position in case the user is already scrolled down when loading
  $(window).scroll();

  // make sure everything is set right
  $(window).resize(function() {
      setMapWidth()
      $(window).scroll();
  })

  // give .map the with of its container since width: 100% doesn't work because its "fixed"
  function setMapWidth() {
      $("div.map").width($("div.mapBox").width())
  }


  getMapData(function(data) {
    
    data.sale = data.sale.filter((entry) => entry.hidden != "yes" && entry.hidden != "true" && entry.hidden != "hidden");
    data.rent = data.rent.filter((entry) => entry.hidden != "yes" && entry.hidden != "true" && entry.hidden != "hidden");
    console.log('data', data)
    mapData = data;
    mapDataCombined = mapData.sale.concat(mapData.rent);
    listListings(mapData)
    if(mapDataCallback) {
      mapDataCallback()
    }
  })

  $(document).on("mousemove", function(e) {
    cursorPos.x = e.pageX
    cursorPos.y = e.pageY - $(window).scrollTop()
  })

  var scrollTimeout;

  // this big function is just so that when you scroll OVER the map, it doesn't zoom in, but when you start scrolling when on the map, it does
  $(window).scroll(function(e) {
    var timeoutTime = 300;

    var mapBounds = {
      left: $("div.map").offset().left,
      right: $("div.map").offset().left+$("div.map").width(),
      top: $("div.map").offset().top,
      bottom: $("div.map").offset().top+$("div.map").height()
    }
    //console.log(cursorPos, mapBounds)
    if(cursorPos.y + $(window).scrollTop() > mapBounds.top
      && cursorPos.y + $(window).scrollTop() < mapBounds.bottom
      && cursorPos.x > mapBounds.left
      && cursorPos.x < mapBounds.right) {
        //console.log("inside")
        if(scrollingPageSince + timeoutTime > Date.now()) {
          clearTimeout(scrollTimeout)
          scrollTimeout = setTimeout(function() {
            $("div.scrollBlock").hide()
          },timeoutTime)
          scrollingPageSince = Date.now();
        } else {
        }
    } else {
      $("div.scrollBlock").show()
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(function() {
        $("div.scrollBlock").hide()
      },timeoutTime)
      scrollingPageSince = Date.now();
    }
  })

  // LISTING INFO
  var listingInfoCloseTimeout = 0;
  $("div.listingInfo span.l-close").click(function() {
    closeListingInfo()
    window.history.go(-1);
  })

  function closeListingInfo() {
    if(listingInfoCloseTimeout + 1200 < Date.now()) {
      showingListing = false;
      $("div.listingInfo").css("opacity",0);
      setTimeout(function() {
        $("div.listingInfo").hide()
      }, 500);
      $("body").css("overflow","auto")
      $(window).resize();
      listingInfoCloseTimeout = Date.now();
    }
  }

  window.onpopstate = function(event) {
    console.log("POPSTATE")
    /*if(!event.state || event.state.id == "listings") {
      $("div.listingInfo span.l-close").click();
    } else {
      $("div.listing[data-id="+event.state.id+"]").click()
    }*/
    // only trigger when cause of event was external browser button
    if(event.explicitOriginalTarget == window || event.srcElement == window) {
      if(!event.state || event.state.id == "listings") {
        closeListingInfo();
      } else {
        showListing(event.state.id, true);
      }
    }
  }
})

function listListings(data) {
  // To save whether the window was scrolled to the hash before adding the listings push everything down
  var urlHash = window.location.hash;
  var scrolledToHash = false;
  if(urlHash && urlHash != "" && urlHash.charAt(0) == "#" && urlHash.charAt(1) != "!") {
    if(Math.abs($(urlHash).offset().top - $(window).scrollTop()) < 50) {
      scrolledToHash = true;
    }
  }

  data = data.sale.concat(data.rent)

  for(let i in data) {
    if(typeof data[i].name == "string" && typeof data[i].price == "string" && typeof data[i].address == "string") {
      var elem = createListingElem(data[i])
      $("div.listingList").append(elem)
    }
  } 

  // reCalculate map position
  $(window).resize()
  if(scrolledToHash) {
    setTimeout(function() {
      $(window).scrollTop($(urlHash).offset().top);
    });
  }

  function createListingElem(data) {
    //var elem = $(`<div data-id="`+data.id+`" class="listing">`+data.name+`</div>`);
    // THE OLD STYLE
    /*var elem = $(`
    <div data-id="`+data.id+`" class="listing" data-listingtype="`+data.listingType+`">
            <div class="l-title">
                <span class="l-type">`+data.listingType.capitalize()+`</span>
                <span class="l-title">`+data.name+`</span>
                <span class="l-price">$`+parseInt(data.price).toLocaleString()+`</span>
            </div>
            <div class="row">
                <div class="col-5 col-md-5 l-image">
                    <img src="/photos/thumbnail/`+data.id+`-0.jpg">
                </div>
                <div class="col-7 col-md-7 l-info">
                    <!--<span class="l-info"><i class="fa fa-info" aria-hidden="true"></i> <b class="d-none d-sm-inline-block d-md-none d-lg-inline-block">Type:</b> `+data.type+`</span>
                    <span class="l-info"><i class="fa fa-bed" aria-hidden="true"></i> <b class="d-none d-sm-inline-block d-md-none d-lg-inline-block">Bedrooms:</b> `+data.bedrooms+`</span>
                    <span class="l-info"><i class="fa fa-bath" aria-hidden="true"></i> <b class="d-none d-sm-inline-block d-md-none d-lg-inline-block">Bathrooms:</b> `+data.baths+`</span>
                    <span class="l-info"><i class="fa fa-square-o" aria-hidden="true"></i> <b class="d-none d-sm-inline-block d-md-none d-lg-inline-block">Square Footage:</b> `+data["square footage"]+`</span>
                    <span class="l-info"><i class="fa fa-calendar" aria-hidden="true"></i> <b class="d-none d-sm-inline-block d-md-none d-lg-inline-block">List Date:</b> `+data["list date"]+`</span>
-->                </div>
            </div>
        </div>`)

    var infoList = elem.find("div.l-info");

    if(data.type && typeof data.type == "string") {
      infoList.append('<span class="l-info"><i class="fa fa-info" aria-hidden="true"></i> <b class="d-none d-sm-inline-block d-md-none d-lg-inline-block">Type:</b> '+data.type+'</span>')
    }
    if(data.bedrooms && typeof data.bedrooms == "string") {
      infoList.append('<span class="l-info"><i class="fa fa-bed" aria-hidden="true"></i> <b class="d-none d-sm-inline-block d-md-none d-lg-inline-block">Bedrooms:</b> '+data.bedrooms+'</span>')
    }
    if(data.baths && typeof data.baths == "string") {
      infoList.append('<span class="l-info"><i class="fa fa-bath" aria-hidden="true"></i> <b class="d-none d-sm-inline-block d-md-none d-lg-inline-block">Bathrooms:</b> '+data.baths+'</span>')
    }
    if(data["square footage"] && typeof data["square footage"] == "string") {
      infoList.append('<span class="l-info"><i class="fa fa-square-o" aria-hidden="true"></i> <b class="d-none d-sm-inline-block d-md-none d-lg-inline-block">Square Footage:</b> '+data["square footage"]+'</span>')
    }
    if(data["list date"] && typeof data["list date"] == "string") {
      var date = new Date(data["list date"]/1000)
      date = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
      infoList.append('<span class="l-info"><i class="fa fa-calendar" aria-hidden="true"></i> <b class="d-none d-sm-inline-block d-md-none d-lg-inline-block">List Date:</b> '+date+'</span>')
    }*/

    var elem = $(`<div data-id="`+data.id+`" data-listingtype="`+data.listingType+`" class="listing new" style="background-image: url(/photos/thumbnail/`+data.id+`-0.jpg)">
    <div class="l-top-info">
      <span class="l-listingType">`+data.listingType.capitalize()+`</span>
      <span class="l-name">`+data.name+`</span>
      </div>
      <div class="l-info">
        <div class="l-infoRow">
          <span class="l-price">$`+parseInt(data.price).toLocaleString()+`</span
          >`+((typeof data.bedrooms == "string")?`<span class="l-bedrooms l-predot"><b>`+parseInt(data.bedrooms)+`</b> bds</span>`:"")
          +((typeof data.baths == "string")?`<span class="l-baths l-predot"><b>`+parseInt(data.baths)+`</b> ba</span>`:"")
          +((typeof data["square footage"] == "string")?`<span class="square-footage l-predot"><b>`+parseInt(data["square footage"])+`</b> ft<span class="exponent">2</span></span>`:"")+`
        </div>
        <span class="l-address">`+data.address+`</span>
      </div>
    </div>`);

    if(data["square footage"] === undefined || data["square footage"] == "") {
      elem.find("span.square-footage").remove();
    }

    var hovered = false;

    elem.on("mouseover", function() {
      hovered = true;
      markers[data.id].setOpacity(1)
      markers[data.id].setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(function() {
        markers[data.id].setAnimation(null)
      },650)

    })
    
    elem.on("mouseleave", function() {
      hovered = false;
      markers[data.id].setOpacity(0.8)
    })

    elem.on("click", function() {
      showListing(data.id);
    })

    return elem;
  }

  // open listing if id in hash (example: url.com/#![id])
  var hashId = window.location.hash;
  if(hashId.charAt(1) == "!") {
    hashId = hashId.substring(2);
  } else { hashId = false }
  if(hashId) {
    history.replaceState({id: "listings"}, "", "#listings");
    $("div.listing[data-id="+hashId+"]").click();
  }
}



function highlightListing(id) {
  $("div.listing[data-id="+id+"]").addClass("highlighted")
}
function unhighlightListing(id) {
  $("div.listing[data-id="+id+"]").removeClass("highlighted")
}
function scrollToListing(id) {
  var offTop = $("div.listing[data-id="+id+"]").offset().top
  var windowHeight = $(window).height()
  var listingHeight = $("div.listing[data-id="+id+"]").height()
  var scrollPos = $(window).scrollTop();

  var maxPos = $("div.listingList").offset().top + $("div.listingList").height() + 0*$("div.listing[data-id="+id+"]").height() - $(window).height() - 16 + 50;
  var minPos = $("div.mapBox").offset().top - 100 + 1;
  var target = offTop - windowHeight/2 + listingHeight/2 

  target = (target>maxPos)?maxPos:target
  target = (target<minPos)?minPos:target

  $('html, body').animate({scrollTop: target}, Math.abs(scrollPos-target)*3)
}
function showListing(id, noPushHistory = false) {
  zoomToHouse(id);
  var data = getListingData(id);
  if(showingListing === false) {
    $("div.map").addClass("fixed").css("margin-top", "0px");
    showingListing = id;
    $("div.listingInfo").show()
    setTimeout(function() {
      $("div.listingInfo").css("opacity",1)
    });
    $("body").css("overflow", "hidden");
    //$("a.l-mortgage-calculator").attr("onclick", "javascript:window.open('http://www4.featuredwebsite.com//templates/_includes/content/listing_link.asp?link=mortgage_calc&PurchasePriceDollars="+parseInt(data.price)+"&master_css=http://blake.strempfer.works/css/mortgage-calc.css&calculator_js=http://blake.strempfer.works/js/mortgage-calc.js&calculator_css=http://blake.strempfer.works/css/mortgage-calc.css&BGColor=#FFFFFF','_blank','width=585,scrollbars=yes,resizable=yes,height=400'); return false;")
    $("a.l-mortgage-calculator").attr("onclick", "javascript:window.open('/mortgage-calculator/?price=" + parseInt(data.price) + "&rate=4&term=30&taxes=" + parseInt(data.taxes) +"','_blank','width=840,scrollbars=yes,resizable=yes,height=480'); return false;")

    $("div.listingInfoBox span.l-title").text(data.name)
    $("div.listingInfoBox span.l-listingType").attr("data-type",data.listingType);
    $("div.listingInfoBox span.l-price span.l-price-number").text(parseInt(data.price).toLocaleString())
    $("div.listingInfoBox span.l-address").text(data.address);
    $("div.listingInfoBox div.l-address").off("click").on("click", function() {
      window.open("https://maps.google.com/?q="+data.address, '_blank');
    })

    $("div.l-slideshow").empty();
    $.get("/list-photos.php?id="+showingListing, function(photos) {
      photos = JSON.parse(photos)
      for(let i in photos) {
        photos[i] = "/photos/thumbnail/"+photos[i]
      }
      $("div.l-slideshow").simpleSlideshow(photos);
    })

    var infodata = $.extend({}, data)
    delete infodata.listingType
    delete infodata.id
    delete infodata.name
    delete infodata.price
    delete infodata.info
    delete infodata.location
    delete infodata.address
    delete infodata.gx_media_links
    delete infodata.hidden
    if(typeof infodata["list date"] == "string") {
      infodata["list date"] = new Date(infodata["list date"]/1000)
      infodata["list date"] = (infodata["list date"].getMonth() + 1) + "/" + infodata["list date"].getDate() + "/" + infodata["list date"].getFullYear()
    }

    $("div.listingInfoBox ul.l-data").empty();
    for(let i in infodata) {
      // if it has actually a value
      if(typeof infodata[i] == "string") {
        if(!isNaN(infodata[i]) && infodata[i] == parseInt(infodata[i])) {
          infodata[i] = parseInt(infodata[i])
        }
        $("div.listingInfoBox ul.l-data").append('<li><span class="ll-title">'+i.replace("mls#", "MLS#").capitalizeAll()+'</span><span class="ll-value">'+infodata[i]+'</span></li>')
      }
    }

    $("div.listingInfoBox span.l-info").text((data.info !== undefined && typeof data.info == "string")?data.info:"");

    if(!noPushHistory) {
      // CHANGE URL TO LISTING
      history.pushState({id: showingListing}, "", "#!"+showingListing)
    }
  }
}

function zoomToHouse(id) {
  var data = getListingData(id)
  googleMap.setCenter({lat: parseFloat(data.location.split(",")[0]), lng: parseFloat(data.location.split(",")[1])});
  animateMapZoomTo(googleMap, 13);
}

function getListingData(id) {
  return mapDataCombined.find(x => x.id == id)
}

function animateMapZoomTo(map, targetZoom) {
  var currentZoom = arguments[2] || map.getZoom();
  if (currentZoom != targetZoom) {
      google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
          animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
      });
      setTimeout(function(){ map.setZoom(currentZoom) }, 80);
  }
}

function initMap() {
    // if map data already loaded, add markers. Otherwise create function that can be called by loader to add markers later
    if(!mapData) {
      mapDataCallback = function() {
        console.log("mapDataCallback")
        addMarkers()
      }
    } else {
      addMarkers()
    }

    function addMarkers() {
      for(let i in mapData.sale) {
        addMarker(mapData.sale[i])
      }
      for(let i in mapData.rent) {
        addMarker(mapData.rent[i])
      }
    }

    function addMarker(data) {
      var image = 'img/map-marker.svg';
      var saleMarker = 'img/map2-marker-s.svg';
      var rentMarker = 'img/map2-marker-r.svg';
    
      var myLatLng = new google.maps.LatLng(data.location.split(",")[0], data.location.split(",")[1]);
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: (data.listingType == "sale")?saleMarker:rentMarker,
        opacity: 0.8
      });

      markers[data.id] = marker

      marker.addListener("mouseover", function() {
        if(showingListing === false) {
          highlightListing(data.id)
        }
      })

      marker.addListener("mouseout", function() {
        unhighlightListing(data.id)
      })
    
      // click: scroll to listing
      marker.addListener("click",function() {
        if(showingListing === false) {
          scrollToListing(data.id)
        }
      })

      marker.addListener("dblclick", function() {
        if(showingListing === false) {
          scrollToListing(data.id);
          showListing(data.id);
        }
      })
    }

  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 7,

    // The latitude and longitude to center the map (always required)
    center: new google.maps.LatLng(42.6634535, -87.1261128),

    // Disables the default Google Maps UI components
    disableDefaultUI: true,
    scrollwheel: true,
    draggable: true,

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles: [{
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 29
      }, {
        "weight": 0.2
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 18
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 21
      }]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "elementType": "labels.text.fill",
      "stylers": [{
        "saturation": 36
      }, {
        "color": "#000000"
      }, {
        "lightness": 70
      }]
    }, {
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 19
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }, {
        "weight": 1.2
      }]
    }]
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById('mainMap');

  // Create the Google Map using out element and options defined above
  map = new google.maps.Map(mapElement, mapOptions);
  googleMap = map;

  // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
  /*var image = 'img/map-marker.svg';
  var saleMarker = 'img/map-marker-sale.png';
  var rentMarker = 'img/map-marker-rent.png';
  var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image
  });

  var myLatLng = new google.maps.LatLng(42.606876, -88.120375);
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: saleMarker
  });

  // click: scroll to listing
  beachMarker.addListener("click",function() {
      alert("clock")
  })*/

  // doubleclick: scroll to listing and open info

}




String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.capitalizeAll = function(){
  return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
 };