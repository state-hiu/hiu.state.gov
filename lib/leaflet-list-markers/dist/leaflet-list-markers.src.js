/* 
 * Leaflet List Markers v0.0.2 - 2014-06-12 
 * 
 * Copyright 2014 Stefano Cudini 
 * stefano.cudini@gmail.com 
 * http://labs.easyblog.it/ 
 * 
 * Licensed under the MIT license. 
 * 
 * Demo: 
 * http://labs.easyblog.it/maps/leaflet-list-markers/ 
 * 
 * Source: 
 * git@github.com:stefanocudini/leaflet-list-markers.git 
 * 
 */


var itemCount = 1;

var globalProductsExist = false;

function flyToStore(currentFeature) {
              console.log('flytostore called');
              map.flyTo(currentFeature._latlng, 9);
              //map.setView(currentFeature._latlng, 9);
            }

(function() {

L.Control.ListMarkers = L.Control.extend({

    includes: L.Mixin.Events,

    options: {      
        layer: false,
        maxItems: 500,
        collapsed: false,      
        label: 'title',
        itemIcon: '',
        itemArrow: '&#10148;',  //visit: http://character-code.com/arrows-html-codes.php
        maxZoom: 9,
        position: 'bottomleft'
        //TODO autocollapse
    },

    initialize: function(options) {
        L.Util.setOptions(this, options);
        this._container = null;
        this._list = null;
        this._layer = this.options.layer || new L.LayerGroup();

        //moved code below in this function from app.js
        //code is reading the product.json and importing all of the geojson 
        //the first time a tab is clicked

        /*console.log('what is a');
        console.log(this._layer);*/

        for (var i in this._layer._layers) {

            //if (featureCollection._layers[i].feature.properties.region_id === region_id) {

            /*console.log('what is i');
            console.log(i);*/

              var popupContent = '<div class="title">'+this._layer._layers[i].feature.properties.title+'</div>';

              var popupOptions = {keepInView: true,maxWidth: 200};

              //var altString = this._layer._layers[i].feature.properties.title;

              //console.log('step before new marker is created');

              /*inserting the title in the altString of the marker*/
              /*var marker = L.marker(new L.LatLng(this._layer._layers[i].feature.geometry.coordinates[1],this._layer._layers[i].feature.geometry.coordinates[0]), {
                                          icon: productIcon, alt: altString
                                      });*/

              this._layer._layers[i].bindPopup(popupContent,popupOptions);

              this._layer._layers[i].setIcon(productIcon);

              switch (this._layer._layers[i].feature.properties.region_id) {
                  case "AF":
                  if (AFcount == 1) {
                    AFmarkers.addLayer(this._layer._layers[i]);
                  }
                    break;
                  case "EAP":
                  if (EAPcount == 1) {
                    EAPmarkers.addLayer(this._layer._layers[i]);
                  }
                    break;
                  case "EUR":
                  if (EURcount == 1) {
                    EURmarkers.addLayer(this._layer._layers[i]);
                  }
                    break;
                  case "NEA":
                  if (NEAcount == 1) {
                    NEAmarkers.addLayer(this._layer._layers[i]);
                  }
                    break;
                  case "SCA":
                  if (SCAcount == 1) {
                    /*console.log('adding marker to SCA');
                    console.log(this._layer._layers[i]);*/
                    SCAmarkers.addLayer(this._layer._layers[i]);
                  }
                    break;
                  case "WHA":
                  if (WHAcount == 1) {
                    WHAmarkers.addLayer(this._layer._layers[i]);
                  }
                    break;
                  default:
              }
              //}
            }

    },

    onAdd: function (map) {

        this._map = map;

        var container = this._container = L.DomUtil.create('div', 'list-markers');

        this._list = L.DomUtil.create('ul', 'list-markers-ul', container);

        this._initToggle();

        //whenever the map is moved it updates the list
        //console.log('onAdd called');
        map.on('moveend', this._updateList, this);

        this._updateList();

        return container;

    },
    
    onRemove: function(map) {
        console.log('onRemove called');
        map.off('moveend', this._updateList, this);
        this._container = null;
        this._list = null;      
    },

    _createItem: function(layer) {

        //console.log('layer in view');
        //console.log(layer);

        var currentFeature = layer.feature.properties.title;

        var currentID = layer._leaflet_id;
        //console.log(currentID);

        //tempLayerGroup.addLayer(layer);

        var titleContent = '<div>'+layer.feature.properties.title+'</div>';

        var spanContent = '<span class="new-product">'+ ' new' +'</span>';

        //http://stackoverflow.com/questions/2352072/how-to-manipulate-html-within-a-jquery-variable
        var new_description = document.createElement('div');
        new_description.className = "container2";

        $(new_description).append('<div class="description-image">'+
        '<a class="listitem-thumbnail" data-toggle="modal" data-target="#myModal" data-title="'+ layer.feature.properties.title + '"' + 'data-href= "#' + layer.feature.properties.region_id + ',' + layer.feature.properties.product_id + '"' +
        ' data-img="'+layer.feature.properties.product_jpg+'" id="modal#'+ layer.feature.properties.region_id+','+layer.feature.properties.product_id +
        '">'+
        '<div id="img-container">'+
        '<img class="img-responsive" src="'+layer.feature.properties.thumbnail_300+
        '" width="150" height="150" style="border:1px solid #021a40;">'+
        '<div id="hover"><span id="preview" style="line-height: 150px;">Preview</span></div>'+
        '</a>'+
        '</div>'+
        '</div>'+
        '<div class="description-text">'+ 'Published date: <br>'+
        layer.feature.properties.date_published+'<br>'+
        '<div class="dropdown" style="display: inline-block;padding-top: 10px;">'+
        '<button class="btn btn-primary dropdown-toggle" style="padding: 3px 10px;" type="button" data-toggle="dropdown">Download'+
        '<span class="caret"></span></button>'+
        '<ul class="dropdown-menu">'+
          '<li><a class="pdf" onclick="ga(&apos;send&apos;, &apos;event&apos;, { eventCategory: &apos;product&apos;, eventAction: &apos;download - PDF&apos;, eventLabel: &apos;#'+layer.feature.properties.region_id+','+layer.feature.properties.product_id+'&apos;, transport: &apos;beacon&apos; });" href="'+layer.feature.properties.product_pdf+'">PDF</a></li>'+
          '<li><a class="jpg" onclick="ga(&apos;send&apos;, &apos;event&apos;, { eventCategory: &apos;product&apos;, eventAction: &apos;download - JPG&apos;, eventLabel: &apos;#'+layer.feature.properties.region_id+','+layer.feature.properties.product_id+'&apos;, transport: &apos;beacon&apos; });" href="'+layer.feature.properties.product_jpg+'">JPG</a></li>'+
        '</ul>'+ '<a href="https://twitter.com/intent/tweet?text='+ encodeURIComponent(layer.feature.properties.tweet) +'&via=StateHIU&url=https://hiu.state.gov/%23' + layer.feature.properties.region_id + '%2C' + layer.feature.properties.product_id + '" class="tweet" target="_blank"><img src="/assets/img/Twitter_Logo_Blue.png" style="width: 40px;margin-left:15px"></a>'+
        '</div></div>');

        if (layer.feature.properties.region_id == activeLayer) {

            var productListings = document.getElementById(activeLayer+'-listings');
            var productListings = productListings.appendChild(document.createElement('div'));
            productListings.className = 'item';
            productListings.title = currentFeature;
            productListings.id = 'item-' + currentID;

            // Create a new link with the class 'title' for each store
            // and fill it with the store address

            //console.log('active layer is');
            //console.log(activeLayer);

            if (activeLayer == 'global') {
                //global layers get a div instead of a link, because there is no where to zoom to with the map
                //var link = productListings.appendChild(document.createElement('div'));
                var link = productListings.appendChild(document.createElement('a'));
                //link.id = '#'+layer.feature.properties.region_id+','+layer.feature.properties.product_id;
                link.id = 'modal#'+ layer.feature.properties.region_id+','+layer.feature.properties.product_id;
                link.href = '#'+layer.feature.properties.region_id+','+layer.feature.properties.product_id;
                //link.title = 'sample';
                itemCount++;
                link.className = 'title global';
                link.setAttribute("data-toggle","modal");
                link.setAttribute("data-target","#myModal");
                link.setAttribute("data-title", layer.feature.properties.title);
                link.setAttribute("data-img", layer.feature.properties.product_jpg);
                link.setAttribute("data-href", '#'+layer.feature.properties.region_id+','+layer.feature.properties.product_id);

            } else {
                var link = productListings.appendChild(document.createElement('a'));
                //link.id = currentID;
                link.id = '#'+layer.feature.properties.region_id+','+layer.feature.properties.product_id;
                //link.href = '#id-'+itemCount;
                link.href = '#'+layer.feature.properties.region_id+','+layer.feature.properties.product_id;
                itemCount++;
                link.className = 'title';
                link.setAttribute("data-href", '#'+layer.feature.properties.region_id+','+layer.feature.properties.product_id);
            }
            
            link.dataPosition = currentID;
            //link.innerHTML = titleContent + spanContent;
            link.innerHTML = titleContent;


            var d = new Date();
            var curr_date = d.getDate();
            var past_60_days = d.setDate(d.getDate()-60);

            var newDate = new Date(layer.feature.properties.date_published);

            if ( newDate > past_60_days) {
                link.innerHTML = titleContent + spanContent;
            }

            var details = productListings.appendChild(document.createElement('div'));

            //details.innerHTML = descriptionContent;
            $(new_description).appendTo(details);

            //$(".title").append("<span>new</span");

            //console.log(layer.feature.properties.product_jpg_pg2);

            function ObjectLength( object ) {
                var length = 0;
                for( var key in object ) {
                    if( object.hasOwnProperty(key) ) {
                        ++length;
                    }
                }
                return length;
            };

            var moreThanOneJpegTest = function( object ) {
                var length = 0;
                var jpegArrayKeys = [];
                for( var key in object ) {
                    if( object.hasOwnProperty(key) ) {
                        //console.log('print key');
                        //console.log(key);
                        //console.log(key.indexOf("product_jpg"));
                        if( key.indexOf("product_jpg") > -1 ) {
                            ++length;
                            //console.log('it started with product_jpg!');
                            jpegArrayKeys.push(key);
                        }
                    }
                }
                //console.log('printing product jpg keys');
                jpegArrayKeys.sort();
                //console.log(jpegArrayKeys);
                
                return {
                    length: length,
                    jpegArrayKeys: jpegArrayKeys
                };
                //need to order javascript array keys
                
            };

            //console.log('more than 1 jpeg page test length');
            //console.log( ObjectLength(layer.feature.properties) );
            //console.log( moreThanOneJpegTest( layer.feature.properties ).length );
            var JpegLength = moreThanOneJpegTest( layer.feature.properties ).length
            var jpegArrayKeys = moreThanOneJpegTest( layer.feature.properties ).jpegArrayKeys
            //console.log(JpegLength);
           if ( JpegLength > 1) {
                //for (key in layer.feature.properties) {
                    //console.log('printing');
                    //console.log(layer.feature.properties[key]);
                    //console.log(key);
               // }
                //console.log('inner loop!!');

                //modify first JPG link text to say page 1 of x
                $( "div[title='"+currentFeature+"'] .dropdown-menu li:last-child a" ).text("JPG - page 1 of "+JpegLength);

                for (i = 1; i < JpegLength; i++) { 
                    /*console.log('printing JpegLength');
                    console.log(i);
                    console.log('printing jpegArrayKey');
                    console.log(jpegArrayKeys[i]);
                    console.log(layer.feature.properties[jpegArrayKeys[i]]);*/
                    $( "div[title='"+currentFeature+"'] .dropdown-menu" ).append('<li><a class="jpg" onclick="ga(&apos;send&apos;, &apos;event&apos;, { eventCategory: &apos;JPG Product Download&apos;, eventAction: &apos;click&apos;, eventLabel: event.target.href, transport: &apos;beacon&apos; });" href="'+layer.feature.properties[jpegArrayKeys[i]]+'">JPG - page '+(i+1)+' of '+JpegLength+'</a></li>');
                    //console.log(layer.feature.properties[moreThanOneJpegTest(layer.feature.properties.jpegArrayKeys[i])]);
                }
            }

            $(link).mouseover(function(){
                //console.log('link mouseover: ');
                
                //var clickedListing = tempLayerGroup.getLayer(this.dataPosition);
                //activeListingID = this.id;

                if ($(link).hasClass( "global" )) {
                    //console.log('has global class!');
                    //do nothing
                } else {
                    // make pin glow
                    //flyToStore(clickedListing);

                    switch (activeLayer) {
                     case "AF":
                        clickedListing = AFmarkers.getLayer(this.dataPosition);
                        var visibleOne = AFmarkers.getVisibleParent(clickedListing);
                        break;
                     case "EAP":
                        clickedListing = EAPmarkers.getLayer(this.dataPosition);
                        var visibleOne = EAPmarkers.getVisibleParent(clickedListing);
                        break;
                     case "EUR":
                        clickedListing = EURmarkers.getLayer(this.dataPosition);
                        var visibleOne = EURmarkers.getVisibleParent(clickedListing);
                        break;
                     case "NEA":
                        clickedListing = NEAmarkers.getLayer(this.dataPosition);
                        var visibleOne = NEAmarkers.getVisibleParent(clickedListing);
                        break;
                     case "SCA":
                        clickedListing = SCAmarkers.getLayer(this.dataPosition);
                        var visibleOne = SCAmarkers.getVisibleParent(clickedListing);
                        break;
                     case "WHA":
                        clickedListing = WHAmarkers.getLayer(this.dataPosition);
                        var visibleOne = WHAmarkers.getVisibleParent(clickedListing);
                        break;
                     default:
                        //unknown type
                    }

                    //http://leafletjs.com/reference.html#layergroup
                    //console.log(SCAmarkers.getLayers());

                    //the layer same layer within SCAmarkers is not matching the leaflet id for some reason
                    //console.log(SCAmarkers.getLayers());

                    //console.log('visibleOne: ');
                    //console.log(visibleOne);

                    /*
                    window.productIconGlow = L.divIcon({
                        className: 'marker-cluster marker-cluster-small glow1',
                        html: '<div><span>3</span></div>',
                        iconSize: L.point(40,40)
                    });
                    */

                    //If it is a single marker it will have _iconObj, if it is a cluster, it will have only _icon
                    if (visibleOne._iconObj) {
                        console.log(visibleOne._iconObj);
                        console.log(visibleOne._iconObj.options);
                        var classWGlow = visibleOne._iconObj.options.className + ' glow1';
                        window.productIconGlow = L.divIcon({
                            className: classWGlow,
                            html: visibleOne._iconObj.options.html,
                            iconSize: visibleOne._iconObj.options.iconSize
                        });
                    } else {
                        console.log('did selector work?');
                        console.log($(visibleOne._icon.className));

                        //only add glow2 class if doesn't exist
                        //if (visibleOne._icon.className.includes("glow2")) {
                        if (visibleOne._icon.className.indexOf("glow2") >= 0) {
                            console.log('has class glow2');
                            var classWGlow = visibleOne._icon.className;
                        } else {
                            var classWGlow = visibleOne._icon.className + ' glow2';
                        }
                        window.productIconGlow = L.divIcon({
                            className: classWGlow,
                            html: visibleOne._icon.innerHTML
                        });
                    }
                    visibleOne.setIcon(productIconGlow);
                }
            });

            $(link).mouseout(function(){
                //console.log('link mouseout: ');

                if ($(link).hasClass( "global" )) {
                    //console.log('has global class!');
                    //do nothing
                } else {
                    // make pin glow

                    switch (activeLayer) {
                     case "AF":
                        clickedListing = AFmarkers.getLayer(this.dataPosition);
                        var visibleOne = AFmarkers.getVisibleParent(clickedListing);
                        break;
                     case "EAP":
                        clickedListing = EAPmarkers.getLayer(this.dataPosition);
                        var visibleOne = EAPmarkers.getVisibleParent(clickedListing);
                        break;
                     case "EUR":
                        clickedListing = EURmarkers.getLayer(this.dataPosition);
                        var visibleOne = EURmarkers.getVisibleParent(clickedListing);
                        break;
                     case "NEA":
                        clickedListing = NEAmarkers.getLayer(this.dataPosition);
                        var visibleOne = NEAmarkers.getVisibleParent(clickedListing);
                        break;
                     case "SCA":
                        clickedListing = SCAmarkers.getLayer(this.dataPosition);
                        var visibleOne = SCAmarkers.getVisibleParent(clickedListing);
                        break;
                     case "WHA":
                        clickedListing = WHAmarkers.getLayer(this.dataPosition);
                        var visibleOne = WHAmarkers.getVisibleParent(clickedListing);
                        break;
                     default:
                        //unknown type
                  }
                    /*console.log('clickedListing leaflet id');
                    console.log(clickedListing._leaflet_id);

                    console.log('visibleOne after mouseout: ');
                    console.log(visibleOne);*/

                    //only delete glow2 class if doesn't exist
                    //if (visibleOne._icon.className.includes("glow2")) {
                    if (visibleOne._icon.className.indexOf("glow2") >= 0) {
                        console.log('get rid of glow2');
                        var classWithoutGlow = visibleOne._icon.className.replace("glow2", "");
                    } else {
                        var classWithoutGlow = visibleOne._icon.className;
                    }

                    if (visibleOne._iconObj) {
                        window.productIconNoGlow = L.divIcon({
                            className: visibleOne._iconObj.options.className,
                            html: visibleOne._iconObj.options.html,
                            iconSize: visibleOne._iconObj.options.iconSize
                        });
                    } else {
                        window.productIconNoGlow = L.divIcon({
                            className: classWithoutGlow,
                            html: visibleOne._icon.innerHTML
                        });
                    }
                    visibleOne.setIcon(productIconNoGlow);
                }
            });

            $(link).click(function(){
                //Update the currentFeature to the store associated with the clicked link

                console.log('calling link click');

                console.log('this.dataPosition: ');
                console.log(this.dataPosition);

                //LeafletID = event.layer._leaflet_id;

                

                var clickedListing;

                switch (activeLayer) {
                     case "AF":
                        clickedListing = AFmarkers.getLayer(this.dataPosition);
                        break;
                     case "EAP":
                        clickedListing = EAPmarkers.getLayer(this.dataPosition);
                        break;
                     case "EUR":
                        clickedListing = EURmarkers.getLayer(this.dataPosition);
                        break;
                     case "NEA":
                        clickedListing = NEAmarkers.getLayer(this.dataPosition);
                        break;
                     case "SCA":
                        clickedListing = SCAmarkers.getLayer(this.dataPosition);
                        break;
                     case "WHA":
                        clickedListing = WHAmarkers.getLayer(this.dataPosition);
                        break;
                     default:
                        //unknown type
                  }

                /*console.log('clickedListing: ');
                console.log(clickedListing);

                console.log('clickedListing._leaflet_id: ');
                console.log(clickedListing._leaflet_id);

                console.log('clicked link: ');
                console.log($(link));*/

                if ($(link).hasClass( "global" )) {
                    //console.log('has global class!');
                    /*remove the active class from all items*/
                    $('.item').removeClass('active');

                    /*add the active class to item that matches leaflet id*/
                    $('.item[id="item-' + this.dataPosition + '"]').addClass('active');

                    //this code is used to move the active div to the top of the sidebar
                    var parentClass = $('.item[id="item-' + this.dataPosition + '"]').parent().attr('class');
                    $('.'+parentClass).prepend($('.item[id="item-' + this.dataPosition + '"]'));
                } else {
                    // 1. Fly to the point
                    //flyToStore(clickedListing);

                    // 2. Close all other popups and display popup for clicked store
                    // can't create popup in moveend function or else it will keep on re-creating 
                    // the popup everytime the map is moved
                    //createPopUp(clickedListing);
                    //clickedListing.openPopup();

                    //https://github.com/Leaflet/Leaflet.markercluster/issues/180
                    //zoomToShowLayer(clickedListing);

                    //https://stackoverflow.com/questions/35772717/searching-markers-with-leaflet-control-search-from-drop-down-list/35793616#35793616
                    switch (activeLayer) {
                     case "AF":
                        AFmarkers.zoomToShowLayer(clickedListing, function() {
                          clickedListing.openPopup();
                        });
                        break;
                     case "EAP":
                        EAPmarkers.zoomToShowLayer(clickedListing, function() {
                          clickedListing.openPopup();
                        });
                        break;
                     case "EUR":
                        EURmarkers.zoomToShowLayer(clickedListing, function() {
                          clickedListing.openPopup();
                        });
                        break;
                     case "NEA":
                        NEAmarkers.zoomToShowLayer(clickedListing, function() {
                          clickedListing.openPopup();
                        });
                        break;
                     case "SCA":
                        SCAmarkers.zoomToShowLayer(clickedListing, function() {
                          clickedListing.openPopup();
                        });
                        break;
                     case "WHA":
                        WHAmarkers.zoomToShowLayer(clickedListing, function() {
                          clickedListing.openPopup();
                        });
                        break;
                     default:
                        //unknown type
                    }

                    /*remove the active class from all items*/
                    $('.item').removeClass('active');

                    /*add the active class to item that matches leaflet id*/
                    $('.item[id="item-' + this.dataPosition + '"]').addClass('active');

                    //this code is used to move the active div to the top of the sidebar
                    var parentClass = $('.item[id="item-' + this.dataPosition + '"]').parent().attr('class');
                    $('.'+parentClass).prepend($('.item[id="item-' + this.dataPosition + '"]'));

                    selectedID = this.dataPosition;

                }
                
                map.on('moveend', function() {
                    // 3. Highlight listing in sidebar (and remove highlight for all other listings)

                    /* be careful of this because it might remove active from the sidebar-container as well
                    this should be take care of because when the map pans it clears all
                    of the layers anyways
                    var activeItem = document.getElementsByClassName('active');

                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                      }
                      */

                    console.log('map panned, what is selected id?');
                    console.log(selectedID);

                    /*add the active class to item that matches leaflet id*/
                    $('.item[id="item-' + selectedID + '"]').addClass('active');

                    //this code is used to move the active div to the top of the sidebar
                    var parentClass = $('.item[id="item-' + selectedID + '"]').parent().attr('class');
                    $('.'+parentClass).prepend($('.item[id="item-' + selectedID + '"]'));

/*
                    var activeListing = document.getElementById(activeListingID);

                    if (activeListing) {
                        console.log('what is active listing');
                        console.log(activeListing);
                        console.log('activeListing retrieved: ');
                        console.log(activeListing);
                        console.log(activeListing.parentNode);

                        $('.item').removeClass('active');

                        selectedID = 'none';

                        activeListing.parentNode.classList.add('active');

                        selectedID = 'item-'+activeListing.id;

                        console.log('active listing is now selId: ');
                        console.log(selectedID);

                        var parentClass = $('.item[id="'+selectedID+'"]').parent().attr('class');

                        $('.'+parentClass).prepend($('.item[id="'+selectedID+'"]'));
                    }
*/

                });


            });

        /*end of this statement: if (layer.feature.properties.region_id == activeLayer) {*/
        }

        var li = L.DomUtil.create('li', 'list-markers-li'),
            a = L.DomUtil.create('a', '', li),
            //icon = this.options.itemIcon ? '<img src="'+this.options.itemIcon+'" />' : '',
            that = this;

        //a.href = '#';

        /*if ( layer.options.hasOwnProperty(this.options.label) )
        {
            a.innerHTML = icon+'<span>'+layer.options[this.options.label]+'</span> <b>'+this.options.itemArrow+'</b>';
            //TODO use related marker icon!
            //TODO use template for item
        }
        else {
            console.log("propertyName '"+this.options.label+"' not found in marker");
        }*/

        /*L.DomEvent
            .disableClickPropagation(a)
            .on(a, 'click', L.DomEvent.stop, this)
            .on(a, 'click', function(e) {
                this._moveTo( layer.getLatLng() );
            }, this)
            .on(a, 'mouseover', function(e) {
                that.fire('item-mouseover', {layer: layer });
            }, this)
            .on(a, 'mouseout', function(e) {
                that.fire('item-mouseout', {layer: layer });
            }, this); */

        return li;

    },

    _updateList: function() {

        //console.log('updateList called');

        //topoLayer had trouble redrawing after flyTo & panning, so I am clearing it and redrawing it after map moves
        //console.log('clearing layer after update map');
        //window.topoLayer.clearLayers();

        //addTopoData();

        //having trouble having to load topojson multiple times, does not seem to cache as well
        //if (map.getZoom() <= 6 ) {
            //$.getJSON('{{ site.baseurl }}/assets/data/bureau_outline_topojson5.json')
            //.done(addTopoData);
            //console.log('adding layer after update map');
            //addTopoData();
        //}

        //whenever the map is moved it empties the current list on the sidebar except global products
        $( '.product-listings').empty();
        $( '.AF-listings').empty();
        $( '.EAP-listings').empty();
        $( '.EUR-listings').empty();
        $( '.NEA-listings').empty();
        $( '.SCA-listings').empty();
        $( '.WHA-listings').empty();

        /*console.log ('global listing length');
        console.log ($( '.global-listings').length);
        console.log ($( '.global-listings'));
        console.log ($( '.global-listings').children().length);*/

        if ( $( '.global-listings').children().length > 1) {
            globalProductsExist = true;
        }

        //$( '.global-listings').empty();

        var that = this,
            n = 0;

        //http://stackoverflow.com/questions/35986279/shrink-leaflet-maps-bounds-by-some-padding-or-ratio
        //constricting bounds to not include the area under the sidebar!
        marginPoint = new L.Point(-350, 0);
        bounds = map.getPixelBounds();
        bottomLeft = bounds.getBottomLeft();
        topRight = bounds.getTopRight();

        bounds = new L.LatLngBounds(
          map.unproject(bottomLeft.subtract(marginPoint)),
          map.unproject(topRight)
        );

        //console.log('bounds');
        //console.log(bounds);

        //console.log('real bounds');
        //console.log(that._map.getBounds());

        this._list.innerHTML = '';

        this._layer.eachLayer(function(layer) {
            if(layer instanceof L.Marker) {
                //console.log(that._map.getBounds());
                //if( that._map.getBounds().contains(layer.getLatLng()) )
                if( bounds.contains(layer.getLatLng()) ) {
                    if(++n < that.options.maxItems) {
                        //console.log('layer is: ');
                        //console.log(layer.feature.properties.region_id);
                        //console.log(layer.feature.properties.title);
                        if (globalProductsExist == false) {
                            that._list.appendChild( that._createItem(layer) );
                        } else {
                            if (layer.feature.properties.region_id != 'global') {
                                console.log('creating item');
                                that._list.appendChild( that._createItem(layer) );
                            }
                        }
                        //debugger;
                    }
                }
            }
        });

        /*console.log ('global listing length2');
        console.log ($( '.global-listings').length);
        console.log ($( '.global-listings'));

        console.log('update ended and selectedID is');
        console.log(selectedID);*/

        $('.item[id="'+selectedID+'"]').addClass('active');

        //console.log('parent class');
        //console.log($('.item[id="'+selectedID+'"]').parent().attr('class'));

        var parentClass = $('.item[id="'+selectedID+'"]').parent().attr('class');

        $('.'+parentClass).prepend($('.item[id="'+selectedID+'"]'));


        //I'm not sure if this jquery call should go here, but propagation is
        //stopping the jquery function from listening outside of this leaflet control

        $(".tweet").on( "click", function() {
          //console.log('tweet clicked');

          var w = 550;
          var h = 420;
          var url = $(this).attr('href');
          var title = "Share a link on Twitter";

          var left = (screen.width/2)-(w/2);
          var top = (screen.height/2)-(h/2);

          window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
          return false;
        });

    },

    _initToggle: function () {

        /* inspired by L.Control.Layers */

        var container = this._container;

        //Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
        container.setAttribute('aria-haspopup', true);

        if (!L.Browser.touch) {
            L.DomEvent
                .disableClickPropagation(container);
                //.disableScrollPropagation(container);
        } else {
            L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
        }

        if (this.options.collapsed) {
            this._collapse();

            if (!L.Browser.android) {
                L.DomEvent
                    .on(container, 'mouseover', this._expand, this)
                    .on(container, 'mouseout', this._collapse, this);
            }

            var link = this._button = L.DomUtil.create('a', 'list-markers-toggle', container);
            link.href = '#';
            link.title = 'List Markers';

            if (L.Browser.touch) {
                L.DomEvent
                    .on(link, 'click', L.DomEvent.stop)
                    .on(link, 'click', this._expand, this);
            }
            else {
                L.DomEvent.on(link, 'focus', this._expand, this);
            }

            this._map.on('click', this._collapse, this);
            // TODO keyboard accessibility
        }
    },

    _expand: function () {
        this._container.className = this._container.className.replace(' list-markers-collapsed', '');
    },

    _collapse: function () {
        L.DomUtil.addClass(this._container, 'list-markers-collapsed');
    },

    _moveTo: function(latlng) {
        if(this.options.maxZoom)
            //this._map.setView(latlng, Math.min(this._map.getZoom(), this.options.maxZoom) );
            this._map.flyTo(latlng, Math.min(this._map.getZoom(), this.options.maxZoom) );
        else
            this._map.panTo(latlng);
            //this._map.flyTo(latlng); 
    }
});

L.control.listMarkers = function (options) {
    //return new L.Control.ListMarkers(options);
};

L.Map.addInitHook(function () {
    if (this.options.listMarkersControl) {
        this.listMarkersControl = L.control.listMarkers(this.options.listMarkersControl);
        //this.addControl(this.listMarkersControl);
    }
});

}).call(this);
