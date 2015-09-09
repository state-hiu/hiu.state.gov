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
