[hiu.state.gov](hiu.state.gov)
================
(trigger re-build)
## Description

The U.S. Department of State Humanitarian Information Unit's new public-facing website, hiu.state.gov.

## Installation

Site is tested and built using Ubuntu 16.04. To install locally, the [jekyll](https://jekyllrb.com/) static site generator is required.

### re-build

## Gulp.js

[Gulp](https://gulpjs.com/) is a toolkit for automating painful or time-consuming tasks in your development workflow.

(note, gulp is not active now, need to re-implement)
If updated app.js javascript file (`lib/app.js`) , run gulp to minify and strip out comments:

```
gulp
```

## Implemented Leaflet Extensions

### leaflet-ajax

Allows you to call JSON via an Ajax call with a jsonp fallback. (https://github.com/calvinmetcalf/leaflet-ajax)

### leaflet-list-markers

A Leaflet Control for listing visible markers/features in a interactive box. (https://github.com/stefanocudini/leaflet-list-markers)

Heavy customization was done to the leaflet-list-markers.src.js file. The code builds the product entries that get added to the sidebar. A minimized file will need to get built.

### leaflet-markercluster

Marker Clustering plugin for Leaflet. ver 1.0.3 (https://github.com/Leaflet/Leaflet.markercluster)

Only the MarkCluster.Default.css file is modified for customized style.

### leaflet-sidebar-v2

A responsive sidebar with tabs for Leaflet, OpenLayers, Google Maps, ... (https://github.com/Turbo87/sidebar-v2)

Both the leaflet-sidebar.js and leaflet-sidebar.css files are heavily customized.

## Implemented Search (used in Products Page)

### fuse.js
Lightweight fuzzy-search Javascript library.  (http://fusejs.io/) 

### Elasticlunr.js 
Lightweight full-text search engine in Javascript for browser search and offline search. (http://elasticlunr.com/)
This was also tested, but fuse.js was preferred due to its capabilities for fuzzy search and was faster.

### CSS

multiple libraries are used, however Sass/SCSS is mainly used along with bootstrap. Jekyll provides [built-in support for Sass](https://jekyllrb.com/docs/assets/). The Bootstrap partials are in the _sass directory. The main Sass/SCSS file is named main.scss and is in the css directory. Jekyll automatically processes it and puts it in the site's destination folder.

## Analytics

Google Analytics is used to track page views and events.

Each tracked event has the following components:

- Category:
A category is a name that you supply as a way to group objects that you want to track. We are tracking 'product'

- Action:
Typically, you will use the action parameter to name the type of event or interaction you want to track for a particular web object. These are the following actions we are tracking: 'download - JPG', download - 'PDF', 'click - preview', 'link - preview', and 'click new product pin - preview'

- Label:
This is the url fragment of the product. It is in the following format: '# + 'region code' + ',' + 'product id'

For more information on how Google Analytics Events work, go [here](https://support.google.com/analytics/answer/1033068)

## Other Notes

- This site uses reverse proxies configured on the server (we use NGINX in production) to redirect the JPG and PDF product URLs to the S3 bucket where HIU products are stored.

#### The events page is depreciated at this time

## Contributing

HIU is currently accepting pull requests for this repository.

## License
This project constitutes a work of the United States Government and is not subject to domestic copyright protection under 17 USC § 105.

However, because the project utilizes code licensed from contributors and other third parties, it therefore is licensed under the MIT License. http://opensource.org/licenses/mit-license.php. Under that license, permission is granted free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the conditions that any appropriate copyright notices and this permission notice are included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
