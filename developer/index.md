---
layout: wrapper_text
---

# Developer

## Open Source Software

### CyberGIS

{% for repo in site.categories.repos reversed %}
  {% if repo.keywords contains 'cybergis' %}
    [{{repo.title }}]({{ repo.refurl }}) - {{ repo.description }}
  {% endif %}
{% endfor %}

### Imagery to the Crowd

[MapGive](https://github.com/state-hiu/Mapgive) - Source code for MapGive website

[ittc-fabric](https://github.com/state-hiu/ittc-fabric) - Fabric scripts for doing automated tasks with ITTC infrastructure.

[ittc-server-django](https://github.com/state-hiu/ittc-server-django) - TileJet based server for in-memory caching of tiles

## APIs

HIU has a distributed infrastucture so there is no one domain for APIs.  GeoNode, a core part of HIU's infrastructure, supports 3 APIs: (1) CSW, (2) OGC, and (3) internal GeoNode API.  Each HIU instance of GeoNode can be interfaced using all of those APIs.

If you are starting off, we'd suggest you take a look at State GeoNode's API ([http://geonode.state.gov/about/api/](http://geonode.state.gov/about/api/)).

## [Science and Technology (S&T) Programs]({{ site.baseurl }}/programs)

{% for program in site.categories.programs reversed %}
  {% include listitem_program.html %}
{% endfor %}

## [Websites]({{ site.baseurl }}/websites)

{% for website in site.categories.websites reversed %}
  {% include listitem_website.html %}
{% endfor %}

## Contact

If you have questions about HIU S&T programs, please contact HIU at **[HIU_DEV@state.gov](mailto:HIU_DEV@state.gov)**.

