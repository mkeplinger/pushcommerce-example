<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="static/ico/favicon.png">

    <!-- Bootstrap core CSS -->
    <title>ShopConnector Minimalistic Prototype</title>
    <link rel="stylesheet" type="text/css" href="static/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="static/css/style.css">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="/static/js/html5shiv.js"></script>
      <script src="/static/js/respond.min.js"></script>
    <![endif]-->

  </head>
<!-- NAVBAR
================================================== -->
  <body>
    <div class="navbar-wrapper">
      <div class="container">

        <div class="navbar navbar-inverse navbar-static-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">ShopConnector Prototype</a>
            </div>
            <div class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">Categories <b class="caret"></b></a>
                  <ul class="dropdown-menu">
                    <script class="collection-template" type="text/x-shop-connector-template">
                    {{#foreach collections}}
                      <li><a href="#">{{ title }}</a></li>
                    {{/foreach}}
                    </script>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>


    <!-- Carousel
    ================================================== -->
    <div id="myCarousel" class="carousel slide">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <script id='products-carousel-indicator' class="frontpage-template" type="text/x-shop-connector-template">
        {{#foreach products}}
        <li data-target="#myCarousel" data-slide-to="{{ $index }}" class="{{#if $first}}active{{/if}}"></li>
        {{/foreach}}
        </script>
      </ol>
      <div class="carousel-inner">
        <script id='products-carousel' class="frontpage-template" type="text/x-shop-connector-template">
          {{#foreach products}}
          <div class="item {{#if $first}}active{{/if}}">
            <div class="img" style="background-image:url({{ featured_image }})"></div>
            <div class="container">
              <div class="carousel-caption">
                <h1>{{ name }}</h1>
                <p>{{{ body_html }}}...</p>
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



    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="container marketing">

      <!-- Three columns of text below the carousel -->
      <div class="row">

        <script class="collection-template" type="text/x-shop-connector-template">
        {{#foreach collections}}
          <div class="col-lg-4">
            <img class="img-circle" src="{{#if image}}{{image}}{{else}}static/img/no-image.jpg{{/if}}" width="193px" height="185px">
            <h2>{{ title }}</h2>
            <div class="collection-body">
            	{{{limit body_html 30}}}
            </div>
            <p><a class="btn btn-default" href="#">View details &raquo;</a></p>
          </div><!-- /.col-lg-4 -->
        {{/foreach}}
        </script>
        
      </div><!-- .row -->




      <!-- FOOTER -->
      <footer>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p>&copy; 2013 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>

    </div><!-- /.container -->


    <script type="text/javascript" src="static/shopify-connector/shopify-connector.js"></script>
    <script type="text/javascript" src="static/shopify-connector/src/helpers.js"></script>
    <script type="text/javascript" src="static/js/shop.js"></script>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="static/js/libs/jquery.js"></script>
    <script src="static/js/libs/holder.js"></script>
    <script src="static/bootstrap/js/bootstrap.min.js"></script>
  </body>
</html>
