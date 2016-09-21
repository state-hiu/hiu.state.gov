# Notes

## Parsing Metadata Services

### CSW

### WMS

## uploading thumbnails

Images for products are uploaded in the hiu-thumbnails S3 bucket under the products folder. This will fire off a lamda function that creates a 150px and 300px thumbnails and saves them in the resized folder in products.

- The lambda function code was taken from https://github.com/ysugimoto/aws-lambda-image

- The Using AWS Lambda with Amazon S3 tutorial http://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html was followed to configure everything in preperation for the lambda function


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
