---
layout: guide
category: guides
title: "Publishing Products"
description: "This guide provides instructions for how to publish products to the HIU website." 
version: 1.1
date_published: 2016-10-17
featured: false
keywords:
  -  site
---
# [Guides]({{ site.baseurl }}/guides) / [{{ page.title }} ({{ page.version }})]({{ site.baseurl }}{{ page.url | remove: '.html'}})

## Description

This guide provides instructions for how to publish products to the HIU Website.

### Bugs

If you find bugs in this guide, please get in contact with us at [HIU_DEV@state.gov](mailto:HIU_DEV@state.gov).

## Workflow

## Step 1: Pre-processing / Naming Convention

Before you upload any products to the HIU website, you'll need to choose a good filename.  The standard naming convention for HIU is:

```
Region_Name_Date_Organization_ID.pdf
```

This naming convention is similar to the naming convention for datasets, but not exactly the same.

**Region**

For `Region`, if just one country, use the country's short name.  If two countries, use both country names, such as `SyriaTurkey_`.  If more than two countries, use a sub-region name that makes sense and follows some standard understanding, such as `WestAfrica_`, `Global_`, or `EurasiaOceania_`.  Stay away from complex concepts, such as `TheLevant_`.  

For example:

```
Worldwide_LimitedAidAccess_2015Aug18_HIU_U1277.pdf
Africa_EbolaDiseaseWithoutBorders_2014Aug28_HIU_U1078.pdf
Syria_ConflictWithoutBorders_Displacement_2015Aug27_HIU_U1283.pdf
```

**Date**

For `Date`, generally pick the date the final product was published (rather than the last date of the underlying data used).  Date should be the format of `YEARMonthDate` with `Year` as 4 digits, `Month` in 3-letter shorthand, and `Date` as padded day of the month.

Thumbnails follow very similar naming convention.

## Step 2: Upload Products

Upload products to the product repository. Upload a pdf and a jpg version using the same filename (make the pdf and jpg filename lowercase). For the public HIU website, products are hosted on AWS S3.  That is `https://s3.amazonaws.com/hiu-products/`. Log into the Amazon Web Services (AWS) console as the hiu-website-user.

If a product has more than one page then you need to upload a seperate jpg for each page. For each addional page add an underscore, pg, underscore, and the page number to the file name. (ex. BurundiDisplacement_2016Jan06_HIU_U1337_pg_2.jpg)

## Step 3: Upload Thumbnails

Upload thumbnails to the hiu-thumbnail S3 bucket inside the products directory. That is `https://s3.amazonaws.com/hiu-thumbnails/products/`. Here are where all of the images are stored Upload a .jpg. It must be of any size 600px or greater, and has to have the same width as height. thumbnails of 600px, 300px, and 150px will automatically be created and saved inside the resized directory.

## Step 4: Create Post

Add a post to [_posts]({{ site.code }}/tree/{{ site.branch }}/products/_posts).  Include all the relevant information.  The abstract should be added after the second `---` and after all the other variables.

**layout, category**

The layout should always be `product` and the category should always be `products`.

**title**

Generally speaking, the title should be the same name as on the actual product.

**region_id**

choices include - AF, EAP, EUR, NEA, SCA, WHA

**region_title**

choices include - Africa, East Asia and the Pacific, Europe, Near East, South and Central Asia, Western Hemisphere

**date_published**

format in yyyy-mm-dd

**product_pdf**

In quotes insert the product pdf file name that was uploaded.

**product_jpg**

In quotes insert the product jpg file name that was uploaded.

**(optional) product_jpg_pg#**

If a product has more than one page then you need to create additional lines for each page.

**thumbnail**

In quotes insert the thumbnail image file name that was uploaded.

**(optional) twitter_pic**

An optional picture to use for twitter.

**featured**

true or false

**lat**

The latitude where the post will show up on the web map.

**lon**

The longitude where the post will show up on the web map.

**keywords**

Check the existing list of keywords to minimize duplication and redundancy. Make sure you pick the correct mixed case format as well.

**tweet**

Insert the message that will auto-fill when a user chooses to share the product on twitter. 255 characters or less.

For example:

```
---
layout: product
category: products
title: "Yemen: Humanitarian Overview"
region_id: "NEA"
region_title: "Middle East"
date_published: 2015-07-07
product_pdf: "Yemen_HumanitarianOverview_2015Jul17_HIU_U1254.pdf"
product_jpg: "Yemen_HumanitarianOverview_2015Jul17_HIU_U1254.jpg"
thumbnail: "Yemen_HumanitarianOverview_2015Jul17_HIU_U1254.jpg"
featured: true
lat: 15.342
lon: 44.201
keywords:
  - Yemen
  - Middle East
  - Refugees
  - Displaced
  - Conflict
  - WASH
  - Food Security
  - Internally Displaced Persons (IDPs)
tweet: "The humanitarian crisis in Yemen continues to deteriorate with an estimated 21.1 million in need of assistance."
---
The humanitarian crisis in Yemen continues to deteriorate with an estimated 21.1 million, 80% of the population, in need of assistance. This map depicts key humanitarian issues in Yemen, specifically providing an overview for population in need, food security, health, water and sanitation, and displacement.
```

## Step 5: Double-check

Double check that the product is now visible on the site.
