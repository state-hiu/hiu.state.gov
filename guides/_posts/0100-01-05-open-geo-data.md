---
layout: guide
category: guides
title: "Publishing Open Geospatial Data"
description: "This guide provides instructions for how to publish open geospatial data to [Data.gov](http://www.data.gov/) and [Humanitarian Data Exchange](https://data.hdx.rwlabs.org/) (HDX) using [GeoNode](http://geonode.org/), specifically [State GeoNode](http://geonode.state.gov/).  State GeoNode is a digital service provided by the U.S. Department of State for publishing open geographic data produced by or compiled by the U.S. Government to the public, U.S. Government decision-makers, and partners on complex emergencies, natural disasters, and diplomatic activities world-wide."
version: 1.0
date_published: 2015-10-13
featured: false
keywords:
  - cybergis
  - geonode
  - opendata
---
# [Guides]({{ site.baseurl }}/guides) / [{{ page.title }} ({{ page.version }})]({{ site.baseurl }}{{ page.url | remove: '.html' }})

## Description

This guide provides instructions for how to publish open geospatial data to [Data.gov](http://www.data.gov/) and [Humanitarian Data Exchange](https://data.hdx.rwlabs.org/) (HDX) using [GeoNode](http://geonode.org/), specifically [State GeoNode](http://geonode.state.gov).  State GeoNode is a digital service provided by the U.S. Department of State for publishing open geographic data produced by or compiled by the U.S. Government to the public, U.S. Government decision-makers, and partners on complex emergencies, natural disasters, and diplomatic activities world-wide.

### Bugs

If you find bugs in this guide, please get in contact with us at [HIU_DEV@state.gov](mailto:HIU_DEV@state.gov).

## Workflow

### Step 1: Pre-processing / Naming Convention

Before you upload any data to [State GeoNode](http://geonode.state.gov), you'll need to choose a good filename.  The standard naming convention for HIU is:

```
Region_Name_Date_Organization.shp
```

This naming convention is similar to the naming convention for final products, but not exactly the same.

**Region**

For `Region`, if just one country, use the country's short name.  If two countries, use both country names, such as `SyriaTurkey_`.  If more than two countries, use a sub-region name that makes sense and follows some standard understanding, such as `WestAfrica_`, `Global_`, or `EurasiaOceania_`.  Stay away from complex concepts, such as `TheLevant_`.  

For example:

```
Syria_IDPSites_2015LateJun_HIU_DoS.shp
EurasiaOceania_LSIB_Lines_Detailed_2015.shp
Syria_RefugeeSites_2015Jun11_HIU_USDoS.shp
```

**Date**

For `Date`, you don't need to include the full ISO numeric representation.  If the data is generalized to `Late June` then say late june, instead of picking a specific date.  Within GeoNode, you'll still need to select a specific publish date, but that does not need to correspond exactly with the filename.

**Pro Tip**

You can rename all the component files of a shapefile at once (`.shp`, `.shx`, `.dbf`, etc.).  Simply select all the files and click `F2` on your keyboard.  Once you rename one of the files, all the component files will update too.

### Step 2: Zip Shapefile

Once you have a good filename, zip the shapefile components into one `.zip` file (not `.shp.zip`).  Only include a `.shp.xml` metadata file if you've inspected it to ensure that it does not contain `lineage` data that can leak protected network information.  You can easily edit metadata in GeoNode, so it most cases the initial upload won't need to include an ArcCatalog managed `.shp.xml`.

### Step 3: Upload Shapefile

Once a file has been zipped properly, upload the `.zip` file to [State GeoNode](http://geonode.state.gov).  GeoNode will automatically unzip the file and parse each component.  Start at [http://geonode.state.gov/layers/upload](http://geonode.state.gov/layers/upload) or relevant url.  Once uploaded, click the "Edit Metadata" once it is visible.

### Step 4: Edit Metadata

GeoNode has an easy to use metadata editor.  The key metadata fields to focus on are:

- Title (In most cases keep the same as filename)
- Abstract (Be explicit about classification and licensing restrictions even if there are none).
- Date
- Category
- Regions
- Keywords

Also include the following, if you're sure of the correct values:

- License
- Maintenance/Update frequency

Make sure to save your changes and double check the layer from it's detail page.

### Step 5: Update Data.Gov

Data.Gov automatically harvests from GeoNode every 24 hours, so no additional work is required.  The harvest description is at [http://catalog.data.gov/harvest/geonode-state-csw](http://catalog.data.gov/harvest/geonode-state-csw).

### Step 6: Update HDX

[Humanitarian Data Exchange](https://data.hdx.rwlabs.org/) (HDX) contains a strict subset of the datasets on [State GeoNode](http://geonode.state.gov) under the [us-state-hiu](https://data.hdx.rwlabs.org/organization/us-state-hiu) organization.  The datasets are curated and only include the most recent datasets, instead of the full take.

Once data has been uploaded to [State GeoNode](http://geonode.state.gov/), update the API links for resources.  **DO NOT** delete any datsets on HDX, except in very unique circumstances.  Simply click update on a resource and paste in the new download url for shapefile, KML, GeoJSON, etc.
