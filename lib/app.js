
  var goToProduct = function (obj) {

          //console.log('go to product launched!')

          var hash = document.location.hash;

          if (obj) {
            hash = obj.getAttribute("href");
            // if goToProduct was clicked with an obj that means the link for a new product pin was clicked
            // Google Analytics code 
            ga("send", "event", { eventCategory: "product", eventAction: "click new product pin - preview", eventLabel: hash, transport: "beacon" });
          }
          
          //console.log('what is the hash? ');
          //console.log(hash);


          if (hash) {

          //console.log('hash exists!')
          /*$('.nav-tabs a[href='+hash.replace(prefix,"")+']').tab('show');*/
          hash = hash.slice(1).split(',');
          region_hash = hash[0].replace(",", "");
          /*console.log('region_hash! ');
          console.log(region_hash);*/

            if (hash.length == 1) {
              document.getElementById(region_hash).click();
            } else if (hash.length > 1) {
              product_hash = hash[1].replace("#", "");

              //console.log('hash greater than 1!')
              
              /*something like this can work for a product
              $('a[href="#NEA#U1283"').trigger("click");*/
              document.getElementById(region_hash).click();

              setTimeout(function(){ 

                /*triggering modal*/
                document.getElementById('modal#'+region_hash+','+product_hash).click();
                /*this below works manually
                document.getElementById('modal#NEA#U1283').click();

                made the query more specific so it would just call the 
                thumbnail modal and not trigger two modals, thus closing it 
                immediatly after it opened*/
                $('description-image.a[href="#'+region_hash+','+product_hash+'"]').trigger("click");

                document.location.hash = '#' + region_hash + ',' + product_hash

                // Google Analytics code
                ga("send", "event", { eventCategory: "product", eventAction: "link - preview", eventLabel: document.location.hash, transport: "beacon" });

              }, 1500);
              
            }

        }

      }


  /*manages Prev and Next buttons on modals */
  var addButtons = function( jpegDisplayNumber, dropdownCount, dropdown, modal) {
      /*console.log('jpegDisplayNumber');
      console.log(jpegDisplayNumber);*/
      if (jpegDisplayNumber == dropdownCount) {
          /*display prev button only*/
          $('.close').after('<button type="button" class="btn btn-default btn-next" style="float: right;margin-right: 5px;">Next Page</button><button type="button" class="btn btn-default btn-prev" style="float: right;margin-right: 5px;">Prev Page</button>');

          $('.modal-footer').prepend('<button type="button" class="btn btn-default btn-prev">Prev Page</button><button type="button" class="btn btn-default btn-next">Next Page</button>');

          $('.btn-next').prop("disabled", true);

          /*adding modal header text, ex. Page 1 of X*/
          $('.modal-header .btn-prev').after('<span class="modal-header-text" style="float: right;margin-right: 8px;margin-top: 8px;">Page '+(jpegDisplayNumber-1)+' of '+(dropdownCount-1)+'</span>');

          /*adding modal header text, ex. Page 1 of X*/
          $('.modal-footer .btn-prev').before('<span class="modal-footer-text" style="margin-right: 8px;margin-top: 8px;">Page '+(jpegDisplayNumber-1)+' of '+(dropdownCount-1)+'</span>');

          $( ".btn-prev" ).on( "click", function() {
                console.log( 'activate prev button only' );
                  console.log( 'jpegDisplayNumber valx1' );
                console.log(jpegDisplayNumber);
                jpegDisplayNumber--;
                  console.log( 'jpegDisplayNumber valx2' );
                console.log(jpegDisplayNumber);
                  console.log( 'dropdown val' );
                console.log($(dropdown).find("li"));
                modal.find('#modal-img').attr("src",$(dropdown).find("li").eq(jpegDisplayNumber-1).find("a").attr("href"));
                $('.btn-prev,.btn-next').remove();
                $('.modal-header-text,.modal-footer-text').remove();
                  
                addButtons( jpegDisplayNumber, dropdownCount, dropdown, modal);
              });
          /*console.log('why would this run');
          jpegDisplayNumber = 2;*/
          return 'final page';
        } else {
            if ((jpegDisplayNumber-1) == 1) {
                /*display next button only*/
                $('.close').after('<button type="button" class="btn btn-default btn-next" style="float: right;margin-right: 5px;">Next Page</button><button type="button" class="btn btn-default btn-prev" style="float: right;margin-right: 5px;">Prev Page</button>');

                $('.modal-footer').prepend('<button type="button" class="btn btn-default btn-prev">Prev Page</button><button type="button" class="btn btn-default btn-next">Next Page</button>');

                $('.btn-prev').prop("disabled", true);

                /*adding modal header text, ex. Page 1 of X*/
                $('.modal-header .btn-prev').after('<span class="modal-header-text" style="float: right;margin-right: 8px;margin-top: 8px;">Page '+(jpegDisplayNumber-1)+' of '+(dropdownCount-1)+'</span>');

                /*adding modal header text, ex. Page 1 of X*/
                $('.modal-footer .btn-prev').before('<span class="modal-footer-text" style="margin-right: 8px;margin-top: 8px;">Page '+(jpegDisplayNumber-1)+' of '+(dropdownCount-1)+'</span>');

                $( ".btn-next" ).on( "click", function() {
                  /*console.log( 'jpegDisplayNumber val' );
                  console.log(jpegDisplayNumber);
                  console.log( 'jpegDisplayNumberConst val' );
                  console.log(jpegDisplayNumber);
                  console.log( $(dropdown).find("li").eq(2).find("a").attr("href"));*/

                  jpegDisplayNumber++;
                  /*however since it you are finding the right length in the array and the array starts at zero
                  you need to subtract 1 again
                  switch out img with next img*/
                  modal.find('#modal-img').attr("src",$(dropdown).find("li").eq(jpegDisplayNumber-1).find("a").attr("href"));
                  $('.btn-prev,.btn-next').remove();
                  $('.modal-header-text,.modal-footer-text').remove();
                  
                  addButtons( jpegDisplayNumber, dropdownCount, dropdown, modal);
                });
                return 'next';
            } else {
                /*display next & prev button*/
                $('.close').after('<button type="button" class="btn btn-default btn-next" style="float: right;margin-right: 5px;">Next Page</button><button type="button" class="btn btn-default btn-prev" style="float: right;margin-right: 5px;">Prev Page</button>');

                $('.modal-footer').prepend('<button type="button" class="btn btn-default btn-prev">Prev Page</button><button type="button" class="btn btn-default btn-next">Next Page</button>');

                /*adding modal header text, ex. Page 1 of X*/
                $('.modal-header .btn-prev').after('<span class="modal-header-text" style="float: right;margin-right: 8px;margin-top: 8px;">Page '+(jpegDisplayNumber-1)+' of '+(dropdownCount-1)+'</span>');

                /*adding modal header text, ex. Page 1 of X*/
                $('.modal-footer .btn-prev').before('<span class="modal-footer-text" style="margin-right: 8px;margin-top: 8px;">Page '+(jpegDisplayNumber-1)+' of '+(dropdownCount-1)+'</span>');

                $( ".btn-prev" ).on( "click", function() {
                  console.log( 'activate prev button only' );
                  jpegDisplayNumber--;
                  modal.find('#modal-img').attr("src",$(dropdown).find("li").eq(jpegDisplayNumber-1).find("a").attr("href"));
                  $('.btn-prev,.btn-next').remove();
                  $('.modal-header-text,.modal-footer-text').remove();

                  addButtons( jpegDisplayNumber, dropdownCount, dropdown, modal);
                });

                /*console.log( 'jpegDisplayNumber val2' );
                console.log(jpegDisplayNumber);*/

                $( ".btn-next" ).on( "click", function() {
                  console.log( 'activate next button only' );
                  jpegDisplayNumber++;
                  modal.find('#modal-img').attr("src",$(dropdown).find("li").eq(jpegDisplayNumber-1).find("a").attr("href"));
                  $('.btn-prev,.btn-next').remove();
                  $('.modal-header-text,.modal-footer-text').remove();
                  /*$('.btn-prev').remove();*/
                  
                  addButtons( jpegDisplayNumber, dropdownCount, dropdown, modal);
                });

                /*jpegDisplayNumber++;*/
                return 'next';
            }
        }
    }


$('#myModal').on('show.bs.modal', function (event) {

  var jpegDisplayNumber = 2;
  var button = $(event.relatedTarget);  /*Button that triggered the modal*/
  var title = button.data('title');  /*Extract info from data-* attributes*/
  /*console.log('title-data: ');
  console.log(title);*/
  var img = button.data('img')  /*Extract info from data-* attributes*/
  /*console.log('img-data: ');
  console.log(img);*/
   /*If necessary, you could initiate an AJAX request here (and then do the updating in a callback).*/

  window.location.hash = button.data('href');

   /*Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.*/
  var modal = $(this)
  modal.find('.modal-title').text(title);
  modal.find('#modal-img').attr("src",img);

  /*need a list of all the pages in a product; actually I do not, just parse based on what is in the download button!
  if list is 2, then just add a next button*/
  /*console.log('display modal parents id');
  console.log(button.closest(".item"));*/
  var item = button.closest(".item")
  var dropdown = item.find(".dropdown");
  /*console.log('display assoc dropdown');
  console.log(dropdown);*/

  /*look through the dropdown menu's items from the item that got clicked to populate*/
  var dropdownMenu = item.find(".dropdown-menu");
  /*console.log('dropdownMenu inner html');
  console.log(dropdownMenu.html());*/

  modal.find('#modal-dropdownfill').html(dropdownMenu.html());

  /*console.log('dropdown li count');
  console.log($(dropdown).find("li").length);*/

  var dropdownCount = $(dropdown).find("li").length

  if (dropdownCount > 2) {
      addButtons( jpegDisplayNumber, dropdownCount, dropdown, modal);
  }

  //send google analytics info
  //console.log('modal is being fired, send out google analytic ping');
  var match = button.data('href');
  //console.log('match: ');
  //console.log(match);

  //send and event instead of a pageview

  ga("send", "event", { eventCategory: "product", eventAction: "click - preview", eventLabel: match, transport: "beacon" });

  //ga('send', 'pageview', location.pathname + match);

})

$('#myModal').on('hidden.bs.modal', function () {
    /* do something…
    console.log('modal is closing');*/
    $('.btn-prev,.btn-next').remove();
    $('.modal-header-text,.modal-footer-text').remove();
})


    L.TopoJSON = L.GeoJSON.extend({  
      addData: function(jsonData) {    
        if (jsonData.type === "Topology") {
          for (key in jsonData.objects) {
            geojson = topojson.feature(jsonData, jsonData.objects[key]);
            L.GeoJSON.prototype.addData.call(this, geojson);
          }
        }    
        else {
          L.GeoJSON.prototype.addData.call(this, jsonData);
        }
      }  
    });


    jQuery(document).ready(function($){
      var path = window.location.href.split("/").pop();

      /*console.log(path);

      It won't work because all of the products need to load first
      based on link it can look-up region and preload region first*/

    });

    /*Sets a window activeListingID variable, the leaflet-list-markers.src.js script uses
    this to keep a product item selected*/

    window.activeListingID = 'none';

    /*This resets the activeListingID if the home tab is selected*/
    $('#home').click(function() {
      activeListingID = 'none1';
    });

    window.selectedID = 'none';

    window.leftLayer = true;

    /*if you run these commands in the console, it will open the right tab and populate it
    window.clickTab('NEA')
    window.sidebar.open('NEA')*/

    /*commenting out closure for now
    (function(){

    var map = L.map('map').setView([0, 30], 3);

    L.mapbox.accessToken = 'pk.eyJ1IjoiaGl1IiwiYSI6InJWNGZJSzgifQ.xK1ndT3W8XL9lwVZrT6jvQ';

    need to make map a window variable to make it seen in leaflet-list-markers.src.js
    probably because all of this in inside of its own contained function*/
    window.map = L.map('map', {
        attributionControl: {collapsed: true},
        maxBounds:[ [-85, -180], [90, 180] ],
        maxBoundsViscosity: 1.0,
        minZoom: 3
      }).setView([20, 0], 3);

    /*Use styleLayer to add a Mapbox style created in Mapbox Studio*/
    var baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/hiu/cit0gm97500012ypfwnzijj6o/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGl1IiwiYSI6InJWNGZJSzgifQ.xK1ndT3W8XL9lwVZrT6jvQ',{
    /*var baseLayer = L.tileLayer('api.mapbox.com/styles/v1/hiu/ciyd2k8k300352sqs2vytdguw/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGl1IiwiYSI6InJWNGZJSzgifQ.xK1ndT3W8XL9lwVZrT6jvQ',{*/
      minZoom: 1,
      maxZoom: 5,
      scrollWheelZoom: true,
      zoomControl: false,
      attribution: 'Names and boundary representation are not necessarily authoritative'
    }).addTo(map);

/*
    var Labels = L.tileLayer('api.mapbox.com/styles/v1/hiu/ciua29cno001p2imv942m1kfv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGl1IiwiYSI6InJWNGZJSzgifQ.xK1ndT3W8XL9lwVZrT6jvQ', {
      pane: 'labels'
    }).addTo(map);
*/

    map.zoomControl.setPosition('topright');

    window.topoLayer; 

    window.topoData;

    window.globalTopoData;

    //$.getJSON('assets/data/bureau_outline_topojson5.json')
    //  .done(addTopoData);

    addTopoData();

    /*I'm still using panes, then binging the Labels (which are tooltips) to the pane
    This way the labels will stay below the cluster markers
    leafletjs.com/examples/map-panes/*/
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 550;
    map.getPane('labels').style.pointerEvents = 'none';

    map.createPane('regions');
    map.getPane('regions').style.zIndex = 500;
    //map.getPane('regions').style.pointerEvents = 'none';

    var geojsonMarkerOptions = {
        radius: 2,
        fillColor: "#ff7800",
        weight: 2,
        opacity: 0,
        fillOpacity: 0,
    };

    var leadersStyle = {
        color: "rgb(158,157,159)",
        weight: 2,
        opacity: 0.8
    };

    /*gis.stackexchange.com/questions/59571/how-to-add-text-only-labels-on-leaflet-map-with-no-icon*/
    function onEachFeatureLargeLabels(feature, layer) {
        /*layer.setStyle({'opacity' :'.5'});*/
        if (feature.properties && feature.properties.NAME) {
            if (feature.properties.Italics == "Y") {
              layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-large-country-italics-label", offset: [0, 0], direction: 'center', pane: 'labels' });
          } else {
              layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-large-country-label", offset: [0, 0], direction: 'center', pane: 'labels' });
          }
        }
    }

    function onEachFeatureMediumLabels(feature, layer) {
        if (feature.properties && feature.properties.NAME) {
            if (feature.properties.Italics == "Y") {
              if (feature.properties.direction == "right") {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-medium-country-italics-label", offset: [0, 0], direction: 'right', pane: 'labels' });
              } else if (feature.properties.direction == "left"){
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-medium-country-italics-label", offset: [0, 0], direction: 'left', pane: 'labels' });
              } else if (feature.properties.direction == "top"){
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-medium-country-italics-label", offset: [0, 0], direction: 'top', pane: 'labels' });
              } else if (feature.properties.direction == "bottom"){
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-medium-country-italics-label", offset: [0, 0], direction: 'bottom', pane: 'labels' });
              } else {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-medium-country-italics-label", offset: [0, 0], direction: 'center', pane: 'labels' });
              }
          } else {
              if (feature.properties.direction == "right") {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-medium-country-label", offset: [0, 0], direction: 'right', pane: 'labels' });
              } else if (feature.properties.direction == "left") {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-medium-country-label", offset: [0, 0], direction: 'left', pane: 'labels' });
              } else if (feature.properties.direction == "top") {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-medium-country-label", offset: [0, 0], direction: 'top', pane: 'labels' });
              } else if (feature.properties.direction == "bottom") {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-medium-country-label", offset: [0, 0], direction: 'bottom', pane: 'labels' });
              } else {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-medium-country-label", offset: [0, 0], direction: 'center', pane: 'labels' });
              }
          }
        }
    }

    function onEachFeatureSmallLabels(feature, layer) {
        if (feature.properties && feature.properties.NAME) {
            if (feature.properties.Italics == "Y") {
              if (feature.properties.direction == "right") {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-small-country-italics-label", offset: [0, 0], direction: 'right', pane: 'labels' });
              } else if (feature.properties.direction == "left"){
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-small-country-italics-label", offset: [0, 0], direction: 'left', pane: 'labels' });
              } else if (feature.properties.direction == "top"){
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-small-country-italics-label", offset: [0, 0], direction: 'top', pane: 'labels' });
              } else if (feature.properties.direction == "bottom"){
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-small-country-italics-label", offset: [0, 0], direction: 'bottom', pane: 'labels' });
              } else {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-small-country-italics-label", offset: [0, 0], direction: 'center', pane: 'labels' });
              }
          } else {
              if (feature.properties.direction == "right") {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-small-country-label", offset: [0, 0], direction: 'right', pane: 'labels' });
              } else if (feature.properties.direction == "left") {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-small-country-label", offset: [0, 0], direction: 'left', pane: 'labels' });
              } else if (feature.properties.direction == "top") {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-small-country-label", offset: [0, 0], direction: 'top', pane: 'labels' });
              } else if (feature.properties.direction == "bottom") {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-small-country-label", offset: [0, 0], direction: 'bottom', pane: 'labels' });
              } else {
                  layer.bindTooltip(feature.properties.NAME, {permanent: true, className: "my-small-country-label", offset: [0, 0], direction: 'center', pane: 'labels' });
              }
          }
        }
    }


    function onEachFeatureRegions(feature, layer) {
        if (feature.properties && feature.properties.REGION_NA) {
            /*layer.bindTooltip("my tooltip text").openTooltip();*/
            layer.bindTooltip(feature.properties.REGION_NA, {permanent: true, className: "my-region-label", offset: [0, 0], direction: 'center', pane: 'labels' });
        }
    }

    /*using leaflet-ajax to import geojson, github.com/calvinmetcalf/leaflet-ajax*/
    var RegionLabelsLayer = new L.GeoJSON.AJAX("assets/region_labels.geojson", {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: onEachFeatureRegions
        }).addTo(map);

    var LargeCountryLabelsLayer = new L.GeoJSON.AJAX("assets/country_labels_large.geojson", {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: onEachFeatureLargeLabels
        });

    var MediumCountryLabelsLayer = new L.GeoJSON.AJAX("assets/country_labels_medium.geojson", {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: onEachFeatureMediumLabels
        });

    var SmallCountryLabelsLayer = new L.GeoJSON.AJAX("assets/country_labels_small.geojson", {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: onEachFeatureSmallLabels
        });

    /*leader lines*/
    var LeadersLabelsLayer = new L.GeoJSON.AJAX("assets/leaders.geojson",{style:leadersStyle});

    var regionCountryLabelFontSize = 15;
    var largeCountryLabelFontSize = 13;
    var mediumCountryLabelFontSize = 9;
    var smallCountryLabelFontSize = 9;

    map.on('zoomend', function () {
      /*console.log('zoomend called');
      console.log(map.getZoom());*/

      var regionZoomLevel = regionCountryLabelFontSize + (map.getZoom() * 2);
      var largeZoomLevel = largeCountryLabelFontSize + map.getZoom();
      var mediumZoomLevel = mediumCountryLabelFontSize + map.getZoom();
      var smallZoomLevel = smallCountryLabelFontSize + map.getZoom();

      /*console.log('large label zoom level');
      console.log(largeZoomLevel);*/

      $('.my-region-label').css("font-size", regionZoomLevel + "px");
      $('.my-large-country-label').css("font-size", largeZoomLevel + "px");
      $('.my-medium-country-label').css("font-size", mediumZoomLevel + "px");
      $('.my-small-country-label').css("font-size", smallZoomLevel + "px");
      $('.my-small-country-italics-label').css("font-size", smallZoomLevel + "px");

      /*currently leaflet cannot detect if map is zooming in or out after zoomstart
      experimented with removing all layers at each zoomstart but did not like results
      map.on('zoomstart', function(event)
      {
        if (map.hasLayer(LargeCountryLabelsLayer)){
              map.removeLayer(LargeCountryLabelsLayer);
          }
        if (map.hasLayer(MediumCountryLabelsLayer)){
              map.removeLayer(MediumCountryLabelsLayer);
            }
        if (map.hasLayer(SmallCountryLabelsLayer)){
              map.removeLayer(SmallCountryLabelsLayer);
              map.removeLayer(LeadersLabelsLayer);
            }
      });*/

      if (map.getZoom() < 4 ) {

          map.removeLayer(RegionLabelsLayer);
          $('.my-region-label').css("font-size", "18px");
          RegionLabelsLayer.addTo(map);

          if (map.hasLayer(LargeCountryLabelsLayer)){
              map.removeLayer(LargeCountryLabelsLayer);
          } else {
              //console.log("layer already removed");
          }

      }
      if (map.getZoom() >= 4 ) {
          /*map.removeLayer(geojsonLayer);*/
          if (map.hasLayer(LargeCountryLabelsLayer)){
              //console.log("layer already added");
          } else {
              LargeCountryLabelsLayer.addTo(map);
              /*map.addLayer(geojsonLayer);*/
          }

      }

      if (map.getZoom() < 5 ) {

              map.removeLayer(MediumCountryLabelsLayer);
              map.removeLayer(SmallCountryLabelsLayer);
              map.removeLayer(LeadersLabelsLayer);

              //console.log('changing color of region label');
              $('.my-region-label').css("color", "rgb(158,157,158)");
              $('.my-large-country-label').css("color", "rgb(158,157,158)");
              $('.my-medium-country-label').css("color", "rgb(158,157,158)");
              $('.my-medium-country-italics-label').css("color", "rgb(158,157,158)");
              $('.my-small-country-label').css("color", "rgb(158,157,158)");
              $('.my-small-country-italics-label').css("color", "rgb(158,157,158)");

      }
      if (map.getZoom() >= 5 ) {
        if (map.hasLayer(MediumCountryLabelsLayer)){
              //console.log("layer already added");
          } else {
              MediumCountryLabelsLayer.addTo(map);
              SmallCountryLabelsLayer.addTo(map);
              LeadersLabelsLayer.addTo(map);
              //map.removeLayer(RegionLabelsLayer);
              $('.my-region-label').css("color", "rgb(145,144,146)");
              $('.my-large-country-label').css("color", "rgb(145,144,146)");
              $('.my-medium-country-label').css("color", "rgb(145,144,146)");
              $('.my-medium-country-italics-label').css("color", "rgb(145,144,146)");
              $('.my-small-country-label').css("color", "rgb(145,144,146)");
              $('.my-small-country-italics-label').css("color", "rgb(145,144,146)");
          }
      }

/*
      if (map.getZoom() < 6 ) {
        if (map.hasLayer(SmallCountryLabelsLayer)){
              map.removeLayer(SmallCountryLabelsLayer);
              map.removeLayer(LeadersLabelsLayer);

              map.removeLayer(RegionLabelsLayer);
              $('.my-region-label').css("font-size", "18px");
              RegionLabelsLayer.addTo(map);

              $('.my-region-label').css("color", "rgb(145,144,146)");
              $('.my-large-country-label').css("color", "rgb(145,144,146)");
              $('.my-medium-country-label').css("color", "rgb(145,144,146)");
              $('.my-medium-country-italics-label').css("color", "rgb(145,144,146)");
              $('.my-small-country-label').css("color", "rgb(145,144,146)");
              $('.my-small-country-italics-label').css("color", "rgb(145,144,146)");
          } else {
              console.log("layer already removed");
          }
      }
      if (map.getZoom() >= 6 ) {
        if (map.hasLayer(SmallCountryLabelsLayer)){
              console.log("layer already added");
          } else {
              SmallCountryLabelsLayer.addTo(map);
              LeadersLabelsLayer.addTo(map);
              map.removeLayer(RegionLabelsLayer);

              $('.my-region-label').css("color", "rgb(132,131,133)");
              $('.my-large-country-label').css("color", "rgb(132,131,133)");
              $('.my-medium-country-label').css("color", "rgb(132,131,133)");
              $('.my-medium-country-italics-label').css("color", "rgb(132,131,133)");
              $('.my-small-country-label').css("color", "rgb(132,131,133)");
              $('.my-small-country-italics-label').css("color", "rgb(132,131,133)");
          }
      }

      if (map.getZoom() < 6 ) {
        if (map.hasLayer(topoLayer)){
              //do nothing
          } else {
              addTopoData();
          }
      }
      if (map.getZoom() >= 6 ) {
        if (map.hasLayer(topoLayer)){
              topoLayer.clearLayers();
          }
      }
*/

    }); 

    /*var jsonTest = new L.GeoJSON.AJAX(["colleges.geojson","counties.geojson"],{onEachFeature:popUp}).addTo(m);

    var LargeCountryLabelsLayer = L.geoJSON().addTo(map);
    LargeCountryLabelsLayer.addData(geojsonLayer);

    taken from: leafletjs.com/examples/choropleth-example.html
    info box that contains title

    var info = L.control({position: 'bottomright'});*/

    /*window.sidebar = L.control.sidebar('sidebar', {position: 'topleft'}).addTo(map);
    map.addControl(new MyControl2('sidebar', {position: 'topleft'}));*/

    window.sidebar = new leafletSidebar('sidebar');
    map.addControl(sidebar);

    /*var sidebar2 = L.control.sidebar('sidebar', {position: 'topleft'}).addTo(map);
    window.sidebar = $('#sidebar').sidebar();
    var layerControl = L.control.layers({"baseLayer":baseLayer,"Labels":Labels}).addTo(map);
    map.addHash({lc:layerControl});
    map.addHash();*/

    window.newProducts = new L.markerClusterGroup({
      disableClusteringAtZoom: 4,
      iconCreateFunction: function(cluster) {
          var childCount = cluster.getChildCount();

        var c = ' marker-cluster-';
        if (childCount < 10) {
            c += 'small-orange';
        } else if (childCount < 100) {
            c += 'medium-orange';
        } else {
            c += 'large-orange';
        }

        return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
      }
    });

    window.AFmarkers = new L.MarkerClusterGroup();
    window.EAPmarkers = new L.MarkerClusterGroup();
    window.EURmarkers = new L.MarkerClusterGroup();
    window.NEAmarkers = new L.MarkerClusterGroup({
        maxClusterRadius:80
    });
    window.SCAmarkers = new L.MarkerClusterGroup({
        maxClusterRadius:80
    });
    window.WHAmarkers = new L.MarkerClusterGroup();

    window.markers2 = new L.MarkerClusterGroup();

    window.AFcount = 1;
    window.EAPcount = 1;
    window.EURcount = 1;
    window.NEAcount = 1;
    window.SCAcount = 1;
    window.WHAcount = 1;

    window.layerClicked = false;

    window.activeLayer = 'none';

    window.firstClick = true;

    /*This enables when a user clicks on part of the map that
    is not part of a layer, it will zoom back into the original extent*/
    map.on('click', function(e) {
        /*The TopoJson layer click function always fires first*/

        //console.log('map clicked');
        map.removeLayer(LargeCountryLabelsLayer);
        map.removeLayer(MediumCountryLabelsLayer);
        map.removeLayer(SmallCountryLabelsLayer);
        map.removeLayer(LeadersLabelsLayer);

        /*close all popups*/
        map.closePopup();

        /*clear topo layer before fly to prevent effect of it not rendering on the fly*/
        //topoLayer.clearLayers();


        /*map.setView([20, 0], 3, {animation: false});*/
        map.flyTo([20, 0], 3);
        /*console.log('map clicked');
        console.log(e);*/


        if(layerClicked !== true){
          /*$('.sidebar').css({ "height": "33%"});*/
          $('.sidebar').removeClass("sidebar-tall");
          activeLayer = 'none';

          sidebar.open('home');
        }

        layerClicked = false;

        $( '.product').remove();

        map.removeLayer(AFmarkers);
        map.removeLayer(EAPmarkers);
        map.removeLayer(EURmarkers);
        map.removeLayer(NEAmarkers);
        map.removeLayer(SCAmarkers);
        map.removeLayer(WHAmarkers);

        map.addLayer(newProducts);

        $('.hiu-tab').show();

        /*$('.item.active').removeClass('active');
        console.log('testing section');
        console.log($('.item.active'));*/
        
    });

    function addTopoData(){ 
      //tried to put topoJSON in a pane, but not working below
      //topoLayer = new L.TopoJSON(topoData, { pane: 'region' });
      var topoFunction = function (data) {
          topoData = data;
          topoLayer = new L.TopoJSON(topoData);
          topoLayer.addTo(map);
          topoLayer.eachLayer(handleLayer);
      };

      if (window.topoData != undefined) {
          topoFunction(topoData);
      } else {
          $.getJSON('assets/data/bureau_outline_topojson5.json')
            .done(topoFunction);
      }

      
    }

    function handleLayer(layer){  
        /*var randomValue = Math.random(),
        fillColor = colorScale(randomValue).hex();*/
        var fillColor;

        /*console.log(layer.feature.properties.RegBureau);*/

        switch (layer.feature.properties.RegBureau) {
         case "AF":
            fillColor = "#0A2E52";
            break;
         case "EAP":
            fillColor = "#0A2E52";
            break;
         case "EUR":
            fillColor = "#0A2E52";
            break;
         case "NEA":
            fillColor = "#0A2E52";
            break;
         case "SCA":
            fillColor = "#0A2E52";
            break;
         case "WHA":
            fillColor = "#0A2E52";
            break;
         default:
            fillColor = "#b3b3b3";
        }

        layer.setStyle({
            fillColor : fillColor,
            fillOpacity:0,
            color:fillColor,
            weight:0,
            opacity:0
            });

          layer.on({
            mouseover: enterLayer,
            mouseout: leaveLayer,
            click: clickLayer,
          });
    }

    function enterLayer(){  
        /*for IE, need to make this emulate the correct mousover behavior
        stackoverflow.com/questions/3686132/move-active-element-loses-mouseout-event-in-internet-explorer*/

        if (leftLayer == true) {
          /*console.log('inside function');
          var RegionName = this.feature.properties.RegBureau;
          $tooltip.text(RegionName).show();*/

          this.bringToFront();

          switch (this.feature.properties.RegBureau) {
             case "AF":
                fillColor = "#fc944f";
                break;
             case "EAP":
                fillColor = "#fced8d";
                break;
             case "EUR":
                fillColor = "#eeb3cb";
                break;
             case "NEA":
                fillColor = "#b8d773";
                break;
             case "SCA":
                fillColor = "#b5aed6";
                break;
             case "WHA":
                fillColor = "#a8c8e9";
                break;
             default:
                fillColor = "#b3b3b3";
          }

          this.setStyle({
            fillColor : fillColor,
            fillOpacity:0.5,
            color:fillColor,
            weight:0,
            opacity: 0
          });

          leftLayer = false;

        }
    }

    function leaveLayer(){  
        /*$tooltip.hide();
        console.log('leaveLayer called');*/

        switch (this.feature.properties.RegBureau) {
           case "USA":
              fillColor = "#b3b3b3";
              break;
           default:
              fillColor = "#0A2E52";
        }

        this.bringToBack();

        this.setStyle({
          fillColor : fillColor,
          fillOpacity:0,
          color: fillColor,
          weight:0,
          opacity:0
        });

        leftLayer = true;
    }

     /*Products GeoJSON
     old picture icon 
    var productIcon = L.icon({
        iconUrl: "assets/img/mapgive_blue_pt.png",
        iconSize: [30, 45],
        iconAnchor: [15, 40],
        popupAnchor: [0, 0]
    });
    */

    window.productIcon = L.divIcon({
        className: 'product-icon',
        html: '<div class="circleBase type1"></div>'
    });

    window.productIconNew = L.divIcon({
        className: 'product-icon',
        html: '<div class="circleBase type-new"></div>'
    });


    function getProducts(region_id,regionCoord,regionZoom) {

      var myLayer = L.featureGroup()

      $.ajax({
        dataType: "json",
        url: "products/products.json",
        success: function(response) {
            var products = L.geoJson(response, {
                zIndex: 100,
                onEachFeature: function(feature, layer) {
                    /*var title = layer.feature.properties.title;*/
                }
            });

            $('.product-listings').empty();

            //console.log('first click');
            //console.log(firstClick);

            //new idea: have ListMarkers called first, then in the ListMarkers code initialization 
            //create the clustergroups, this way maybe the leaflet-ids will be preserved

            //this must cause the updateList to be called
            if(firstClick == true){
              map.addControl( new L.Control.ListMarkers({layer: products}) );
              firstClick = false;
            }

            /*console.log('region id: ');
            console.log(region_id);*/

            //console.log('in between step');

            //window.map.setView(regionCoord,regionZoom);
            if (region_id == 'NEA') {
                //console.log('NEA region!');
                //map.fitBounds([[43.8415, 35.3892],[3.7555, -24.728]]);
                window.map.flyTo(regionCoord,regionZoom);
            } else {
                //console.log('flying to');
                window.map.flyTo(regionCoord,regionZoom);
            }

            //console.log('SCAmarkers layers 1');
            //console.log(SCAmarkers.getLayers());

            //This function highlights the item and brings it to the top of the list whenever a marker is clicked on
            var highlightItemOnMarkerClick = function (event) {

                //console.log('marker clicked');
                var clickedMarker = event.layer;
                //console.log('clickedMarker');
                //console.log(clickedMarker);
                selectedID = event.layer._leaflet_id;
                $('.item').removeClass('active');

                /*add the active class to item that matches leaflet id*/
                $('.item[id="item-' + selectedID + '"]').addClass('active');

                //this code is used to move the active div to the top of the sidebar
                var parentClass = $('.item[id="item-' + selectedID + '"]').parent().attr('class');
                $('.'+parentClass).prepend($('.item[id="item-' + selectedID + '"]'));

            }


            switch (region_id) {
                case "AF":
                  map.removeLayer(EAPmarkers);
                  map.removeLayer(EURmarkers);
                  map.removeLayer(NEAmarkers);
                  map.removeLayer(SCAmarkers);
                  map.removeLayer(WHAmarkers);
                  map.removeLayer(newProducts);
                  map.addLayer(AFmarkers);

                  AFmarkers.on('popupopen', function (event) {
                    highlightItemOnMarkerClick(event);
                  });

                  AFcount++;

                  break;
                case "EAP":
                  map.removeLayer(AFmarkers);
                  map.removeLayer(EURmarkers);
                  map.removeLayer(NEAmarkers);
                  map.removeLayer(SCAmarkers);
                  map.removeLayer(WHAmarkers);
                  map.removeLayer(newProducts);
                  map.addLayer(EAPmarkers);
                  /*
                  $( '.product').remove();
                  $( '#'+ region_id.toLowerCase() +'_label' ).append( "<center><p class='product' >" + EAPmarkers.getLayers().length + "&nbspProducts</p></center>" );
                  */

                  EAPmarkers.on('click', function (event) {
                    highlightItemOnMarkerClick(event);
                  });

                  EAPcount++;
                  break;
                case "EUR":
                  map.removeLayer(AFmarkers);
                  map.removeLayer(EAPmarkers);
                  map.removeLayer(NEAmarkers);
                  map.removeLayer(SCAmarkers);
                  map.removeLayer(WHAmarkers);
                  map.removeLayer(newProducts);
                  map.addLayer(EURmarkers);

                  EURmarkers.on('click', function (event) {
                    highlightItemOnMarkerClick(event);
                  });

                  EURcount++;
                  break;
                case "NEA":
                  map.removeLayer(AFmarkers);
                  map.removeLayer(EAPmarkers);
                  map.removeLayer(EURmarkers);
                  map.removeLayer(SCAmarkers);
                  map.removeLayer(WHAmarkers);
                  map.removeLayer(newProducts);
                  map.addLayer(NEAmarkers);

                  NEAmarkers.on('click', function (event) {
                    highlightItemOnMarkerClick(event);
                  });

                  NEAcount++;
                  break;
                case "SCA":
                  map.removeLayer(AFmarkers);
                  map.removeLayer(EAPmarkers);
                  map.removeLayer(EURmarkers);
                  map.removeLayer(NEAmarkers);
                  map.removeLayer(WHAmarkers);
                  map.removeLayer(newProducts);
                  map.addLayer(SCAmarkers);

                  SCAmarkers.on('popupopen', function (event) {
                    highlightItemOnMarkerClick(event);
                  });

                  SCAcount++;
                  break;
                case "WHA":
                  map.removeLayer(AFmarkers);
                  map.removeLayer(EAPmarkers);
                  map.removeLayer(EURmarkers);
                  map.removeLayer(NEAmarkers);
                  map.removeLayer(SCAmarkers);
                  map.removeLayer(newProducts);
                  map.addLayer(WHAmarkers);

                  WHAmarkers.on('click', function (event) {
                    highlightItemOnMarkerClick(event);
                  });

                  WHAcount++;
                  break;

                default:
            }
        }
      });

    }

    function clickTab(region) {
        //console.log('tab was clicked, region is: ');
        //console.log(region);

        var regionCoord;
        var regionZoom;

        /*close all popups*/
        map.closePopup();

        map.removeLayer(AFmarkers);
        map.removeLayer(EAPmarkers);
        map.removeLayer(EURmarkers);
        map.removeLayer(NEAmarkers);
        map.removeLayer(SCAmarkers);
        map.removeLayer(WHAmarkers);

        /*map.setView([20, 0], 3, {animation: false});*/

        switch (region) {
          case "AF":
            regionCoord = [-1, -3];
            regionZoom = 4;
            activeLayer = "AF";
            break;
          case "EAP":
            regionCoord = [25, 85];
            regionZoom = 4;
            activeLayer = "EAP";
            break;
          case "EUR":
            regionCoord = [51, 22];
            regionZoom = 4;
            activeLayer = "EUR";
            break;
          case "NEA":
            regionCoord = [28, 3];
            regionZoom = 4;
            activeLayer = "NEA";
            break;
          case "SCA":
            regionCoord = [35, 52.5];
            regionZoom = 4;
            activeLayer = "SCA";
            break;
          case "WHA":
            regionCoord = [5, -72];
            regionZoom = 4;
            activeLayer = "WHA";
            break;
          case "global":
            regionCoord = [20, 25];
            regionZoom = 3;
            activeLayer = "global";
            break;
          default:
            regionCoord = [14, -20];
            regionZoom = 3;
        }

        /*if (typeof(products) != "undefined") {
          console.log("products are defined");
          products.clearLayers();
        }*/

        getProducts(region,regionCoord,regionZoom);

        $('.sidebar').addClass("sidebar-tall");

        if ( region == 'home' ) {
          $('.sidebar').removeClass("sidebar-tall");
          map.addLayer(newProducts);
        }

        layerClicked = true;


    }

    /*if a tab is clicked on the sidebar*/
    $('a[role="tab"]').click(function () {
      /*console.log('click event1');
      console.log($(this).attr('id'));*/

      var region = $(this).attr('id');
      clickTab(region);

    })

    function clickLayer(e) {
        /*Assuming the clicked feature is a shape, not a point marker.*/

        //console.log('region layer clicked');
        //console.log(e);

        var regionCoord;
        var regionZoom;

        var continueFunction = true;

        /*console.log(this.feature.properties.RegBureau);*/

        switch (this.feature.properties.RegBureau) {
         case "AF":
            regionCoord = [-1, -3];
            regionZoom = 4;
            activeLayer = "AF";
            sidebar.open('AF');
            break;
         case "EAP":
            regionCoord = [25, 85];
            regionZoom = 4;
            activeLayer = "EAP";
            sidebar.open('EAP');
            break;
         case "EUR":
            regionCoord = [51, 22];
            regionZoom = 4;
            activeLayer = "EUR";
            sidebar.open('EUR');
            break;
         case "NEA":
            regionCoord = [28, 3];
            regionZoom = 4;
            activeLayer = "NEA";
            sidebar.open('NEA');
            break;
         case "SCA":
            regionCoord = [35, 52.5];
            regionZoom = 4;
            activeLayer = "SCA";
            sidebar.open('SCA');
            break;
         case "WHA":
            regionCoord = [5, -72];
            regionZoom = 4;
            activeLayer = "WHA";
            sidebar.open('WHA');
            break;
         case "USA":
            //do nothing and set flag to exit function
            continueFunction = false;
            break;
         default:
            regionCoord = [14, -20];
            regionZoom = 3;
        }
        
        /*map.fitBounds(this.getBounds());
        map.setView(regionCoord,regionZoom);
        window.map.setView([5, 70], 3);*/

        if (continueFunction == false) {
            console.log('continueFunction is false, exiting function');
            return;
        } else {

            //console.log(regionCoord);
            //console.log(regionZoom);

            getProducts(this.feature.properties.RegBureau,regionCoord,regionZoom);

            $('.sidebar').addClass("sidebar-tall");

            layerClicked = true;
        }

    }

/*
    topoLayer.on("click", function (event) {
         Assuming the clicked feature is a shape, not a point marker.
        map.fitBounds(event.layer.getBounds());
        console.log(event.layer);
        getProducts(event.layer.feature.properties.RegBureau);
        map.setView(event.latlng, 5);
    });
*/






    /*enables hashes on tabs*/
    $(document).ready(function() {

        //console.log("document is ready");

        /*come up with unique ids for HIU products
        then store the ids under a new tag called data-product-id

        The pattern for the hash will be: /#regioncode/#data-product-id
        The code will parse the hash, based on the #regioncode, it will
        force a click for the regiontab
        based on the #data-product-id it will call $(link).click(function()

        Javascript to enable link to tab*/


        /*console.log('hash! ');
        console.log(hash);

        console.log('hash length: ');
        console.log(hash.length);*/

        goToProduct();


        /*insert new product labels*/

        function getArray(){
            return $.getJSON('products/products.json');
        }

        getArray().done( function(json) {
            //console.log('printing out json: ');
            //console.log(json);  /*show the json data in console*/

            var _len = json.length;
            var feature;

            var d = new Date();

            /*console.log("current date");
            console.log(d);*/

            var curr_date = d.getDate();
            
            var past_60_days = d.setDate(d.getDate()-60);

            /*console.log("past 60 days");
            console.log(past_60_days);*/

            /*loop through json and match today's date with match-date*/
            var jsonCount = 0;

            var newProductsJSON = [];

            features = json.features;

            for (var i in features) {

                //console.log('features[i]');
                //console.log(features[i]);

                //feature = json.features[i];

                //this._layer = this.options.layer || new L.LayerGroup();
                
                /*console.log('json properties');
                console.log(fixture.properties.date_published);*/

                var newDate = new Date(features[i].properties.date_published);

                if ( newDate > past_60_days) {

                    /*console.log('new date');
                    console.log(newDate);*/

                    jsonCount++;

                    /*add new to the product*/




                    /*add new to the region tab*/
                    var region_id = features[i].properties.region_id;

                    /*console.log('new product region id: ');
                    console.log(region_id);
                    console.log('region id length');
                    console.log($('#'+region_id+' .new-product').length);*/

                    /*stackoverflow.com/questions/7951505/about-jquery-append-and-how-to-check-if-an-element-has-been-appended*/
                    if($('#'+region_id+' .new-product').length <= 0) {
                        $('#'+region_id).append("<div class='new-product'>new</div>");
                    }

                    newProductsJSON.push(features[i]);

                }

            }

            /*
                //add to new products layer
                    var popupContent = '<div class="title">'+features[i].properties.title+'</div>';

                    var popupOptions = {keepInView: true,maxWidth: 200};

                    features[i].bindPopup(popupContent,popupOptions);

                    features[i].setIcon(productIcon);

                    newProducts.addLayer(features[i]);
                    */

                function onEachFeature(feature, layer) {
                    // does this feature have a property named popupContent?
                    if (feature.properties && feature.properties.title) {

                        //also add href in pop-up to open correct sidebar item?

                        //var popupContent = '<a href="http://www.google.com">'+feature.properties.title+'</a>';
                        var popupContent = '<a onClick="goToProduct(this)" href="#'+ feature.properties.region_id +',' + feature.properties.product_id + '" class="title">'+feature.properties.title+'</a>';
                        var popupOptions = {keepInView: true,maxWidth: 200};

                        layer.bindPopup(popupContent,popupOptions);
                        layer.setIcon(productIconNew);

                        //console.log('adding new products to newProducts');

                        //newProducts.addLayer(layer);
                    }

                }

                //console.log('newProductsJSON');
                //console.log(newProductsJSON);

                L.geoJSON(newProductsJSON, {
                    onEachFeature: onEachFeature
                });


                if (map.getZoom() < 4 ) {

                    //map.addLayer(newProducts);

                }

                

          });

    });
