---
layout: wrapper_text
---

<div class="row">

    <div class="col-md-8">

        <div class="content">
          <div class="posts">
            {% for post in site.categories.news limit:50 %}{% if post.archived %}{% else %}<a
            href="{% if post.external_url %}{{ post.external_url }}{% else %}{{ site.baseurl }}{{ post.url }}{% endif %}"
            class="post-excerpt{% if post.photo_url %} photo{% endif %}">
              <div class="c">
                <h3 class="text">{{ post.title }}</h3>
                  {% if post.photo_url %}
                    <br>
                    <img src="{{ post.photo_url }}" style="max-width: 200px;max-height: 200px;margin-bottom:10px;">
                  {% endif %}
                
                <div class="body">
                  <p>{% if post.description %}
                  {{ post.description | markdownify | strip_html }}
                  {% else %}
                  {{ post.excerpt | strip_html }}
                  {% endif %}
                  <info datetime="{{ page.date | date: "%Y-%m-%d" }}">
                    {{ post.date | date: "%b %Y" }}
                  </info>
                  </p>
                </div>

              </div>
            </a>{% endif %}<!-- post.archived -->{% endfor %}

            <div class="breaker"></div>

          </div>
        </div>

    </div>

    <div class="col-md-4">

<a class="twitter-timeline" data-height="900" data-theme="light" href="https://twitter.com/StateHIU">Tweets by StateHIU</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

    </div>

</div>
