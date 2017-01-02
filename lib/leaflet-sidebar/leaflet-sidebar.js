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

            console.log('sidebar is: ');
            console.log(window.map._sidebar);

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

            // Find sidebar ul.sidebar-tabs > li, sidebar .sidebar-tabs > ul > li
            this._tabitems = window.map._sidebar.querySelectorAll('ul.sidebar-tabs > li, .sidebar-tabs > ul > li');
            for (i = this._tabitems.length - 1; i >= 0; i--) {
                this._tabitems[i]._sidebar = this;
            }

            console.log('this._tabitems');
            console.log(this._tabitems);

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
            console.log('this._panes');
            console.log(this._panes);
            console.log('this._closeButtons');
            console.log(this._closeButtons);
    },

    onAdd: function (map) {

        console.log('onAdd function is happening');

        var container = L.DomUtil.get('sidebar');

        // ... initialize other DOM elements, add listeners, etc.

        var i, child;

        //this._map = window.map;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            var sub = child.querySelector('a');

            console.log('child');
            console.log(child);

            console.log('sub');
            console.log(sub);

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

        //You also need to stop propagation on click, so when a use clicks on a product
        //leaflet doesn't interfere with opening the pop-ups and zooming into them
        L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);

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
        var i, child;

        // hide old active contents and show new content
        for (i = this._panes.length - 1; i >= 0; i--) {
            child = this._panes[i];
            if (child.id == id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
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

        // close sidebar
        if (!L.DomUtil.hasClass(window.map._sidebar, 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(window.map._sidebar, 'collapsed');
        }

        return this;
    },
    //@private
    _onClick: function() {
        if (L.DomUtil.hasClass(this, 'active'))
            sidebar.close();
        else if (!L.DomUtil.hasClass(this, 'disabled'))
            sidebar.open(this.querySelector('a').hash.slice(1));
    },
    //@private
    _onCloseClick: function () {
        this.close();
    },


});



/**
 * @name Sidebar
 * @class L.Control.Sidebar
 * @extends L.Control
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @see L.control.sidebar
 */


L.Control.Sidebar = L.Control.extend( {
    includes: L.Mixin.Events,

    options: {
        position: 'topleft'
    },

    initialize: function (id, options) {
        var i, child;

        L.setOptions(this, options);

        // Find sidebar HTMLElement
        window.map._sidebar = L.DomUtil.get(id);

        // Attach .sidebar-left/right class
        //L.DomUtil.addClass(this._sidebar, 'sidebar-' + this.options.position);

        // Attach touch styling if necessary
        if (L.Browser.touch)
            L.DomUtil.addClass(this._sidebar, 'leaflet-touch');

        // Find sidebar > div.sidebar-content
        for (i = this._sidebar.children.length - 1; i >= 0; i--) {
            child = this._sidebar.children[i];
            if (child.tagName == 'DIV' &&
                    L.DomUtil.hasClass(child, 'sidebar-content'))
                this._container = child;
        }

        // Find sidebar ul.sidebar-tabs > li, sidebar .sidebar-tabs > ul > li
        this._tabitems = this._sidebar.querySelectorAll('ul.sidebar-tabs > li, .sidebar-tabs > ul > li');
        for (i = this._tabitems.length - 1; i >= 0; i--) {
            this._tabitems[i]._sidebar = this;
        }

        // Find sidebar > div.sidebar-content > div.sidebar-pane
        this._panes = [];
        this._closeButtons = [];
        for (i = this._container.children.length - 1; i >= 0; i--) {
            child = this._container.children[i];
            if (child.tagName == 'DIV' &&
                L.DomUtil.hasClass(child, 'sidebar-container')) {
                this._panes.push(child);


                var closeButtons = child.querySelectorAll('.sidebar-close');
                for (var j = 0, len = closeButtons.length; j < len; j++)
                    this._closeButtons.push(closeButtons[j]);
                    //console.log('sel something');
            }
        }
    },

    onAdd: function (map) {
                // create the control container with a particular class name
                //var container = L.DomUtil.create('div', 'search-container');

                var container = L.DomUtil.get('sidebar');
                // ... initialize other DOM elements, add listeners, etc.

                return container;
            },

    
     //Add this sidebar to the specified map.
     
     //@param {L.Map} map
     //@returns {Sidebar}
     
    addTo: function (map) {
        var i, child;

        this._map = window.map;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            var sub = child.querySelector('a');

            if (sub.hasAttribute('href') && sub.getAttribute('href').slice(0,1) == '#') {
                L.DomEvent
                    //.on(sub, 'click', L.DomEvent.preventDefault )
                    //in order to have urls change in address bar, do not use preventDefault
                    //using getWheelData because it seems harmless
                    //.on(sub, 'click', L.DomEvent.disableClickPropogation)
                    .on(sub, 'click', this._onClick, child);
            }
        }

        for (i = this._closeButtons.length - 1; i >= 0; i--) {
            child = this._closeButtons[i];
            L.DomEvent.on(child, 'click', this._onCloseClick, this);
        }

        return this;
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
        var i, child;

        // hide old active contents and show new content
        for (i = this._panes.length - 1; i >= 0; i--) {
            child = this._panes[i];
            if (child.id == id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
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
        if (L.DomUtil.hasClass(this._sidebar, 'collapsed')) {
            this.fire('opening');
            L.DomUtil.removeClass(this._sidebar, 'collapsed');
        }

        return this;
    },

     //Close the sidebar (if necessary).
    close: function() {
        // remove old active highlights
        for (var i = this._tabitems.length - 1; i >= 0; i--) {
            var child = this._tabitems[i];
            if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        // close sidebar
        if (!L.DomUtil.hasClass(this._sidebar, 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(this._sidebar, 'collapsed');
        }

        return this;
    },

    
     //@private
     
    _onClick: function() {
        if (L.DomUtil.hasClass(this, 'active'))
            this._sidebar.close();
        else if (!L.DomUtil.hasClass(this, 'disabled'))
            this._sidebar.open(this.querySelector('a').hash.slice(1));
    },


     //@private
     
    _onCloseClick: function () {
        this.close();
    }
});


 //Creates a new sidebar.
 
 //@example
 //var sidebar = L.control.sidebar('sidebar').addTo(map);
 
 //@param {string} id - The id of the sidebar element (without the # character)
 //@param {Object} [options] - Optional options object
 //@param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 //@returns {Sidebar} A new sidebar instance
/*
L.control.sidebar = function (id, options) {
    return new L.Control.Sidebar(id, options);
};
*/