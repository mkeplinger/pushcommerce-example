<?php include("inc/header.php"); ?>

    <!-- Carousel
    ================================================== -->
    <div id="myCarousel" class="carousel slide">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <script type="text/x-shopify-connector-template" data-src="/api/v1/collection/frontpage/">
        {{#foreach products}}
        <li data-target="#myCarousel" data-slide-to="{{ $index }}" class="{{#if $first}}active{{/if}}"></li>
        {{/foreach}}
        </script>
      </ol>
      <div class="carousel-inner">
        <script type="text/x-shopify-connector-template" data-src="/api/v1/collection/frontpage/">
          {{#foreach products}}
          <div class="item {{#if $first}}active{{/if}}">
            <div class="img" style="background-image:url({{ featured_image }})"></div>
            <div class="container">
              <div class="carousel-caption">
                <h1>{{ name }}</h1>
                <p>{{{ nohtml body_html 50}}}</p>
                <p><a class="btn btn-large btn-primary" href="#">Learn more</a></p>
              </div>
            </div>
          </div>
          {{/foreach}}
        </script>

      </div>
      <a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>
      <a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>
    </div><!-- /.carousel -->



    <!-- Collections
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="container marketing">

      <!-- Three columns of text below the carousel -->
      <div class="row">

        <script type="text/x-shopify-connector-template" data-src="/api/v1/collection/">
        {{#foreach collections}}
          <div class="col-lg-4 {{#ifDivisibleBy $index 3}}clear{{/ifDivisibleBy}}">
            <img class="img-circle" src="{{#if image}}{{image}}{{else}}static/img/no-image.jpg{{/if}}" width="193px" height="185px">
            <h2>{{ title }}</h2>
            <div class="collection-body">
            	{{{nohtml body_html 30}}}
            </div>
            <p><a class="btn btn-default" href="#">View details &raquo;</a></p>
          </div><!-- /.col-lg-4 -->
        {{/foreach}}
        </script>

      </div><!-- .row -->
    </div><!-- /.container -->

<?php include("inc/footer.php"); ?>