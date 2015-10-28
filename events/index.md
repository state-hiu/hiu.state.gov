---
layout: wrapper_text
---

# Events

## Current Events

{% for event in site.categories.events %}
  {% if event.archived == false %}
    {% include listitem_event.html %}
  {% endif %}
{% endfor %}

## Archived

{% for event in site.categories.events %}
  {% if event.archived == true %}
    {% include listitem_event.html %}
  {% endif %}
{% endfor %}


---
layout: wrapper_text
title: Events
---
{% assign count_current = 0 %}
{% assign count_archived = 0 %}
{% for event in site.categories.events %}
  {% if event.archived == true %}
    {% assign count_archived = count_archived | plus: 1 %}
  {% else %}
    {% assign count_current = count_current | plus: 1 %}
  {% endif %}
{% endfor %}

<div><h2 class="page-title">{{ page.title }}</h2></div>
<ul class="nav nav-tabs" style="padding: 10px 10px 0px 10px;">
  <li class="active"><a href="#featured" data-toggle="tab">Current ({{ count_featured }})</a></li>
  <li><a href="#all" data-toggle="tab">All ({{ site.categories.products | size }}) </a></li>
</ul>
<div class="tab-content" style="padding: 10px;">
  <div id="featured" class="tab-pane active">
    {% for product in site.categories.products %}
      {% if product.featured == true %}
        {% capture thecycle %}{% cycle 'odd', 'even' %}{%endcapture%}
        {% if thecycle == 'odd' %}
          {% include listitem_product.html param='odd' %}
        {% else %}
          {% include listitem_product.html param='even' %}
        {% endif %}
      {% endif %}
    {% endfor %}
  </div>
  <div id="all" class="tab-pane">
    {% for product in site.categories.products %}
      {% include listitem_related_product.html %}
    {% endfor %}
  </div>
</div>
