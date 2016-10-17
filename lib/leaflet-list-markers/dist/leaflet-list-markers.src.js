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

//add layer group
var tempLayerGroup = L.layerGroup();


function createPopUp(currentFeature) {

	console.log('create popup clicked');

	//var popUps = document.getElementsByClassName('mapboxgl-popup');
	//if (popUps[0]) popUps[0].remove();


	console.log('create popup func coords');
	console.log(currentFeature.feature.geometry.coordinates[1]);

	var title = currentFeature.feature.properties.title
	var lon = currentFeature.feature.geometry.coordinates[0];
	var lat = currentFeature.feature.geometry.coordinates[1];

	//var coords = L.latlng(lat,lon);

	var popup = new L.popup()
	      .setLatLng([lat, lon])
	      .setContent('<div class="title">'+title+'</div>')
	      .openOn(map);

}


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
		maxItems: 20,
		collapsed: false,		
		label: 'title',
		itemIcon: '',
		itemArrow: '&#10148;',	//visit: http://character-code.com/arrows-html-codes.php
		maxZoom: 9,
		position: 'bottomleft'
		//TODO autocollapse
	},

	initialize: function(options) {
		L.Util.setOptions(this, options);
		this._container = null;
		this._list = null;
		this._layer = this.options.layer || new L.LayerGroup();
	},

	onAdd: function (map) {

		this._map = map;
	
		var container = this._container = L.DomUtil.create('div', 'list-markers');

		this._list = L.DomUtil.create('ul', 'list-markers-ul', container);

		this._initToggle();

		//whenever the map is moved it updates the list
		console.log('onAdd called');
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

	    tempLayerGroup.addLayer(layer);


	    //console.log(currentID);

	    

/*
	    var region = document.getElementById('region');
	    var region = region.appendChild(document.createElement('div'));
	    region.className = 'region-class';
	    region.innerHTML = activeLayer;
*/

		var titleContent = '<div>'+layer.feature.properties.title+'</div>';

	    var descriptionContent = '<div class="container2">'+'<div class="description-image">'+
	    '<a class="listitem-thumbnail" data-toggle="modal" data-target="#myModal" data-title="'+ layer.feature.properties.title +'"'+
	    ' data-img="'+layer.feature.properties.product_jpg+'"'+
	    ' >'+
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
          '<li><a href="'+layer.feature.properties.product_pdf+'">PDF</a></li>'+
          '<li><a href="'+layer.feature.properties.product_jpg+'">JPG</a></li>'+
        '</ul>'+
        '</div></div></div>';


		if (layer.feature.properties.region_id == activeLayer) {

		    var productListings = document.getElementById(activeLayer+'-listings');
		    var productListings = productListings.appendChild(document.createElement('div'));
		    productListings.className = 'item';
		    productListings.title = currentFeature;
		    productListings.id = 'item-' + currentID;

		    // Create a new link with the class 'title' for each store
		    // and fill it with the store address

		    console.log('active layer is');
		    console.log(activeLayer);

		    if (activeLayer == 'global') {
		    	console.log('global layer yay!');
		    	var link = productListings.appendChild(document.createElement('div'));
		    	link.className = 'title-global';
		    } else {
		    	var link = productListings.appendChild(document.createElement('a'));
		    	link.href = '#';
		    	link.className = 'title';
		    }
		    
		    link.id = currentID;
		    link.dataPosition = currentID;
		    link.innerHTML = titleContent;

		    // Create a new div with the class 'details' for each store
		    // and fill it with the city and phone number
		    var details = productListings.appendChild(document.createElement('div'));
		    details.innerHTML = descriptionContent;
		    /*
		    if (prop.phone) {
		      details.innerHTML += ' &middot; ' + prop.phoneFormatted;
		    }
	    */

	    link.addEventListener('click', function(e){
	        // Update the currentFeature to the store associated with the clicked link
	        var clickedListing = tempLayerGroup.getLayer(this.dataPosition);

	        console.log('link id: ');
	        console.log(this.id);

	        activeListingID = this.id;

	        //console.log('data position');
	        //console.log(this.dataPosition);

	        //console.log('display clickedListing');
	        //console.log(clickedListing);

	        //console.log('clickedListing val2');
	        //console.log(clickedListing);
	        
	        // 1. Fly to the point
	        flyToStore(clickedListing);

	        // 2. Close all other popups and display popup for clicked store
	        // can't create popup in moveend function or else it will keep on re-creating 
	        // the popup everytime the map is moved
	        createPopUp(clickedListing);
	        
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

		        var activeListing = document.getElementById(activeListingID);

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

	    	});
		});

	    }

		var li = L.DomUtil.create('li', 'list-markers-li'),
			a = L.DomUtil.create('a', '', li),
			icon = this.options.itemIcon ? '<img src="'+this.options.itemIcon+'" />' : '',
			that = this;

		a.href = '#';
		L.DomEvent
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
			}, this);			

			
		
		//console.log('_createItem',layer.options);

		if( layer.options.hasOwnProperty(this.options.label) )
		{
			a.innerHTML = icon+'<span>'+layer.options[this.options.label]+'</span> <b>'+this.options.itemArrow+'</b>';
			//TODO use related marker icon!
			//TODO use template for item
		}
		else
			console.log("propertyName '"+this.options.label+"' not found in marker");

		return li;
	},

	_updateList: function() {

		console.log('updateList begins');

		//whenever the map is moved it empties the current list
		$( '.product-listings').empty();
		$( '.AF-listings').empty();
		$( '.EAP-listings').empty();
		$( '.EUR-listings').empty();
		$( '.NEA-listings').empty();
		$( '.SCA-listings').empty();
		$( '.WHA-listings').empty();
		$( '.global-listings').empty();

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
			if(layer instanceof L.Marker)
				//console.log(that._map.getBounds());
				//if( that._map.getBounds().contains(layer.getLatLng()) )
				if( bounds.contains(layer.getLatLng()) )
					if(++n < that.options.maxItems)
						that._list.appendChild( that._createItem(layer) );
		});

		console.log('update ended and selectedID is');
		console.log(selectedID);

		$('.item[id="'+selectedID+'"]').addClass('active');

		console.log('parent class');
		console.log($('.item[id="'+selectedID+'"]').parent().attr('class'));

		var parentClass = $('.item[id="'+selectedID+'"]').parent().attr('class');

		$('.'+parentClass).prepend($('.item[id="'+selectedID+'"]'));

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

		if (this.options.collapsed)
		{
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
			this._map.setView(latlng, Math.min(this._map.getZoom(), this.options.maxZoom) );
		else
			this._map.panTo(latlng);    
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
