tips for creating geojson layer:

Three shapefiles were created for large, medium, and small labels. 

Each of these shapefiles were shaped as geojson. The geojson crs line was deleted, ex:

"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

then the files was pretty printed using json lint.