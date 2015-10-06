# Notes

## Parsing Metadata Services

### CSW

### WMS

```
  $.ajax({
        dataType: "xml",
        url: "{{ site.geonodes[0].wms }}",
        success: function(response) {
            console.log("Response:", response);
            var geonode_features = [];
            var geonode_layers = $(response).find('Layer').each(function(){
                var b = $(this).children('EX_GeographicBoundingBox:first');
                if(b.length > 0)
                {
                    var g = buildBoundingBox(b);
                    var f =
                    {
                        "type": "Feature",
                        "properties":
                        {
                            "name": $(this).children('Name').text(),
                            "title": $(this).children('Title').text(),
                            "abstract": ellipsis($(this).children('Abstract').text().replace('\n',''), 100)
                        },
                        "geometry":
                        {
                            "type": "Polygon",
                            "coordinates":
                            [
                              [
                                  [g[0], g[1]],
                                  [g[2], g[1]],
                                  [g[2], g[3]],
                                  [g[0], g[3]]
                              ]
                            ]                        
                        }
                    };
                    geonode_features.push(f);
                }
            });
```
