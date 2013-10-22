<?php include("inc/header.php"); ?>
<?php $collection = $_SERVER['QUERY_STRING']; ?>
    <script type="text/x-shopify-connector-template" data-src="/api/v1/collection/<?php echo $collection  ?>/">
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
        <h1>{{ title }}</h1>
      </div>
    </div>
    </script>

    <!-- Products in <?php echo $_SERVER['QUERY_STRING'] ?>
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="container marketing">

      <!-- Three columns of text below the carousel -->
      <div class="row">
        <script type="text/x-shopify-connector-template" data-src="/api/v1/collection/<?php echo $collection  ?>/">
        {{#foreach products}}
          <div class="col-lg-4 {{#ifDivisibleBy $index 3}}clear{{/ifDivisibleBy}}">
            <img class="img-circle" src="{{#if featured_image}}{{featured_image}}{{else}}static/img/no-image.jpg{{/if}}" width="193px" height="185px">
            <h2>{{ name }}</h2>
            <div class="collection-body">
                {{{nohtml body_html 30}}}
            </div>
            <p><a class="btn btn-default" href="product.php?{{ handle }}">View details &raquo;</a></p>
          </div><!-- /.col-lg-4 -->
        {{/foreach}}
        </script>
      </div><!-- .row -->
    </div><!-- /.container -->

<?php include("inc/footer.php"); ?>