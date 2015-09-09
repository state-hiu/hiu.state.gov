---
layout: wrapper_text
---

# Developer

## Open Source Software

### CyberGIS

[CyberGIS Guides](https://github.com/state-hiu/cybergis-guides) - Guides for enterprise deployment of open source Web GIS systems

[CyberGIS Client](https://github.com/state-hiu/cybergis-client) - Client side code for CyberGIS (abstraction layer for OpenLayers, OL3, and Leaflet). Includes source code and examples.

[CyberGIS Scripts](https://github.com/state-hiu/cybergis-scripts) - Scripts used in the CyberGIS

[CyberGIS OSM Mappings](https://github.com/state-hiu/cybergis-osm-mappings) - Mappings from OSM Key-Value structure to table/shapefile schema. Used in GeoGig and GeoSHAPE.

[CyberGIS Commons](https://github.com/state-hiu/cybergis-osm-mappings) - This repository contains a set of Java classes and methods commonly used in the CyberGIS.

### Imagery to the Crowd

[MapGive](https://github.com/state-hiu/Mapgive) - Source code for MapGive website

[ittc-fabric](https://github.com/state-hiu/ittc-fabric) - Fabric scripts for doing automated tasks with ITTC infrastructure.

[ittc-server-django](https://github.com/state-hiu/ittc-server-django) - TileJet based server for in-memory caching of tiles

## APIs

HIU has a distributed infrastucture so there is no one domain for APIs.  GeoNode, a core part of HIU's infrastructure, supports 3 APIs: (1) CSW, (2) OGC, and (3) internal GeoNode API.  Each HIU instance of GeoNode can be interfaced using all of those APIs.

If you are starting off, we'd suggest you take a look at State GeoNode's API ([http://geonode.state.gov/about/api/](http://geonode.state.gov/about/api/)).

## Science and Technology (S&T) Programs

{% for program in site.categories.programs %}
  {% include listitem_program.html %}
{% endfor %}

## Websites

### State GeoNode

Primary open geographic data platform of the U.S. Department of State. The State GeoNode is a digital service provided by the U.S. Department of State for publishing open geographic data produced by or compiled by the U.S. Government to the public, U.S. Government decision-makers, and partners on complex emergencies, natural disasters, and diplomatic activities world-wide.

[http://geonode.state.gov](http://geonode.state.gov)

### Ebola GeoNode

This is a partnership platform for sharing geospatial data, analysis and maps related to the Ebola emergency response. The platform is intended to minimize the time that GIS analysts spend locating up-to-date data. Users are able to make maps on the fly, view metadata, and access the reports behind GIS layers. Curators are working to ensure that the layers are recent, clean, useful, and legally and technically open.

[http://ebolageonode.org](http://ebolageonode.org)

### Cusco GeoNode

The Cusco GeoNode is a geospatial platform provided by the U.S. Department of State, Humanitarian Information Unit as part of the Secondary Cities project. The Cusco GeoNode is used for collaborating on and sharing geospatial data among the US Government and partners in Peru. Learn more on the about page.

[http://cuscogeonode.state.gov](http://cuscogeonode.state.gov)

### OSMGeoWeek

Website for OpenStreetMap events for National Geography Awareness week.

[http://osmgeoweek.org](http://osmgeoweek.org)


## Contact

If you have questions about HIU S&T programs, please contact HIU at **[HIU_DEV@state.gov](mailto:HIU_DEV@state.gov)**.

