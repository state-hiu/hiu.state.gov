# Notes

## Uploading Products

### Step 1: Create Product abstract

<img src="{{ site.baseurl }}/assets/img/repo_location.png">

log into github and navigate into the _post directory inside products https://github.com/state-hiu/hiu.state.gov/tree/gh-pages/products/_posts

- create a new product post (tip copy the text of an existing post then edit). The format for the filename of the post is YYYY-MM-DD-title.

- In the post there are keys that need to be filled inbetween the three dashes:

#### keys

layout: product
category: products
title: insert title of product in qoutes
region_id: choices include - AF,
region_title: choices include - Africa,
date_published: yyyy-mm-dd
pdf: in qoutes insert the thumbnail image file name that was uploaded
thumbnail: in qoutes insert the thumbnail image file name that was uploaded
featured: true or false 
lat: (longitude where the post will show up on the web map)
lon: (longitude where the post will show up on the web map)
keywords:

- below the keys and after the three dashes you insert the abstract text.

- You can now save the product post by committing it

### Step 2: Upload Product thumbnail and pdf

log into the Amazon Web Services (AWS) console as hiu-website-user. One you are logged in go inside S3.

#### Upload thumbnail

go inside the hiu-thumbnails S3 bucket, then go inside the products directory. Here are where all of the images are stored upload a .jpg or .png file. It can be any size, just make sure it has the same width as height. thumbnails of 300px and 150px will automatically be created and saved inside the resized directory.

#### Upload pdf

go inside the hiu-products S3 bucket. Here are where all of the product pdfs are stored. Upload your product pdf here.

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
