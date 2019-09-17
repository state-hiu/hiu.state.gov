/**
 * @name Sidebar
 * @class L.Control.Sidebar
 * @extends L.Control
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @see L.control.sidebar
 */
leafletSidebar = L.Control.extend({
        includes: L.Mixin.Events,

        options: {
            position: 'topleft'
        },

        initialize: function (id, options) {

            var i, child;

            L.Util.setOptions(this, options);

            // Find sidebar HTMLElement
            window.map._sidebar = L.DomUtil.get(id);

            //console.log('sidebar is: ');
            //console.log(window.map._sidebar);

            //Attach .sidebar-left/right class
            L.DomUtil.addClass(window.map._sidebar, 'sidebar-' + this.options.position);

            // Attach touch styling if necessary
            if (L.Browser.touch)
                L.DomUtil.addClass(window.map._sidebar, 'leaflet-touch');

            // Find sidebar > div.sidebar-content
            for (i = window.map._sidebar.children.length - 1; i >= 0; i--) {
                child = window.map._sidebar.children[i];
                if (child.tagName == 'DIV' &&
                        L.DomUtil.hasClass(child, 'sidebar-content'))
                    this._container = child;
                    //console.log('printing this._container: ');
                    //console.log(this._container);
            }

            //console.log('this._container');
            //console.log(this._container);

            this._sidebarcontent = window.map._sidebar.querySelectorAll('.sidebar-content');



            // Find sidebar ul.sidebar-tabs > li, sidebar .sidebar-tabs > ul > li
            this._tabitems = window.map._sidebar.querySelectorAll('ul.sidebar-tabs > li, .sidebar-tabs > ul > li');

            for (i = this._tabitems.length - 1; i >= 0; i--) {
                this._tabitems[i]._sidebar = this;
            }

            //console.log('this._tabitems');
            //console.log(this._tabitems);

            this._headercontaindivs = window.map._sidebar.querySelectorAll('.header-contain-div');

            for (i = this._headercontaindivs.length - 1; i >= 0; i--) {
                this._headercontaindivs[i]._sidebar = this;
            }

            //console.log('this._headercontaindivs');
            //console.log(this._headercontaindivs);

            // Find sidebar > div.sidebar-content > div.sidebar-pane
            this._panes = [];
            this._closeButtons = [];

            for (i = this._container.children.length - 1; i >= 0; i--) {
                child = this._container.children[i];

                if (child.tagName == 'DIV' &&
                    L.DomUtil.hasClass(child, 'sidebar-container')) {
                    this._panes.push(child);

                    var closeButtons = child.querySelectorAll('.sidebar-close');

                    for (var j = 0, len = closeButtons.length; j < len; j++) {
                        this._closeButtons.push(closeButtons[j]);
                        //console.log('sel something');
                    }

                }
            }

            //console.log('this._panes');
            //console.log(this._panes);
            //console.log('this._closeButtons');
            //console.log(this._closeButtons);
            
    },

    onAdd: function (map) {

        //console.log('onAdd function is happening');

        var container = L.DomUtil.get('sidebar');

        // ... initialize other DOM elements, add listeners, etc.

        var i, child;

        //this._map = window.map;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            var sub = child.querySelector('a');

            //console.log('child');
            //console.log(child);

            //console.log('sub');
            //console.log(sub);

            if (sub.hasAttribute('href') && sub.getAttribute('href').slice(0,1) == '#') {
                L.DomEvent
                    //.on(sub, 'click', L.DomEvent.preventDefault )
                    //in order to have urls change in address bar, do not use preventDefault
                    //using getWheelData because it seems harmless
                    //.on(sub, 'click', L.DomEvent.disableClickPropogation)
                    //on is Alias to addEventListener
                    .on(sub, 'click', this._onClick, child);
            }
        }

        for (i = this._closeButtons.length - 1; i >= 0; i--) {
            child = this._closeButtons[i];
            L.DomEvent
                .on(child, 'click', L.DomEvent.stopPropagation )
                .on(child, 'click', this._onCloseClick, this);
        }


/*
        container.addEventListener('mouseover', function () {
            console.log('mouseover event');
            //window.map.dragging.disable();
        });

        container.addEventListener('mouseout', function () {
            console.log('mouseout event');
            window.map.dragging.enable();
        });
*/

        //This disables being able to scroll the map on the container div
        L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);


        //http://gis.stackexchange.com/questions/104507/disable-panning-dragging-on-leaflet-map-for-div-within-map
        L.DomEvent.on(container, 'mouseover', function () {
             map.dragging.disable();
        });

        L.DomEvent.on(container, 'mouseout', function () {
            map.dragging.enable();
        });

        //You also need to stop propagation on click, so when a use clicks on a product
        //leaflet doesn't interfere with opening the pop-ups and zooming into them
        //but then again if you stop propagation the modals won't work
        //_fakeStop works better than stopPropagation in this case
        //https://github.com/Turbo87/leaflet-sidebar/issues/31
        L.DomEvent.on(container, 'click', L.DomEvent._fakeStop);


        return container;
    },
    //@deprecated - Please use remove() instead of removeFrom(), as of Leaflet 0.8-dev, the removeFrom() has been replaced with remove()
    //Removes this sidebar from the map.
    //@param {L.Map} map
    //@returns {Sidebar}
    removeFrom: function(map) {
        console.log('removeFrom() has been deprecated, please use remove() instead as support for this function will be ending soon.');         
        this.remove(map);
    },
    //Remove this sidebar from the map.
    //@param {L.Map} map
    //@returns {Sidebar}
    remove: function (map) {
        var i, child;

        this._map = null;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            L.DomEvent.off(child.querySelector('a'), 'click', this._onClick);
        }

        for (i = this._closeButtons.length - 1; i >= 0; i--) {
            child = this._closeButtons[i];
            L.DomEvent.off(child, 'click', this._onCloseClick, this);
        }

        return this;
    },
    //Open sidebar (if necessary) and show the specified tab.
    //@param {string} id - The id of the tab to show (without the # character)
    open: function(id) {
        var i, child, firstChild;

        // hide old active contents and show new content
        for (i = this._panes.length - 1; i >= 0; i--) {
            child = this._panes[i];
            firstChild = child.querySelector('.header-contain-div');
            //console.log('child: ');
            //console.log(child);
            //console.log('firstChild: ');
            //console.log(firstChild);
            if (child.id == id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');

            if (L.DomUtil.hasClass(firstChild, 'collapsed')) {
                this.fire('opening');
                L.DomUtil.removeClass(firstChild, 'collapsed');
            }

        }

        // remove old active highlights and set new highlight
        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            if (child.querySelector('a').hash == '#' + id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        this.fire('content', { id: id });

        // open sidebar (if necessary)
        if (L.DomUtil.hasClass(window.map._sidebar, 'collapsed')) {
            this.fire('opening');
            L.DomUtil.removeClass(window.map._sidebar, 'collapsed');
        }

        if (L.DomUtil.hasClass(this._sidebarcontent[0], 'collapsed')) {
            this.fire('opening');
            L.DomUtil.removeClass(this._sidebarcontent[0], 'collapsed');
        }

        return this;
    },
    //Close the sidebar (if necessary).
    close: function() {
        console.log('close function is happening');
        // remove old active highlights
        for (var i = this._tabitems.length - 1; i >= 0; i--) {
            var child = this._tabitems[i];
            if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        
        for (i = this._panes.length - 1; i >= 0; i--) {
            child = this._panes[i];
            firstChild = child.querySelector('.header-contain-div');

            if (!L.DomUtil.hasClass(firstChild, 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(firstChild, 'collapsed');
            }
       
        }
        
        // close sidebar
        if (!L.DomUtil.hasClass(window.map._sidebar, 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(window.map._sidebar, 'collapsed');
        }

        if (!L.DomUtil.hasClass(this._sidebarcontent[0], 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(this._sidebarcontent[0], 'collapsed');
        }

        return this;
    },
    //@private
    _onClick: function() {
        //console.log('click event from sidebar.js');
        //var region = $(this).attr('id');
        //clickTab(region);
        if (L.DomUtil.hasClass(this, 'active')) {
            sidebar.close();
        } else if (!L.DomUtil.hasClass(this, 'disabled')) {
            sidebar.open(this.querySelector('a').hash.slice(1));
        }
    },
    //@private
    _onCloseClick: function () {
        this.close();
    },


});
