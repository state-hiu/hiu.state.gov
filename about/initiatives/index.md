---
layout: wrapper_text
---
# [About Us]({{ site.baseurl }}/about) / Initiatives
<hr>

<div id="featured" class="tab-pane active">
    {% for program in site.categories.programs reversed %}
      {% if program.featured == true %}
        {% include main/listitem_program.html %}
      {% endif %}
    {% endfor %}
  </div>

<!--
<div><h1 class="page-title">{{ page.title }}</h1></div>
<ul class="nav nav-tabs" style="padding: 10px 10px 0px 10px;">
  <li class="active"><a href="#featured" data-toggle="tab">Featured</a></li>
  <li><a href="#all" data-toggle="tab">All</a></li>
</ul>
<div class="tab-content" style="padding: 10px;">
  <div id="featured" class="tab-pane active">
    {% for program in site.categories.programs reversed %}
      {% if program.featured == true %}
        {% include main/listitem_program.html %}
      {% endif %}
    {% endfor %}
  </div>
  <div id="all" class="tab-pane">
    {% for program in site.categories.programs reversed %}
      {% include main/listitem_program.html %}
    {% endfor %}
  </div>
</div>
-->