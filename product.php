<?php include("inc/header.php"); ?>
<?php $product = $_GET['product']; ?>
    <script type="text/x-shopify-connector-template" data-src="/api/v1/product/<?php echo $product  ?>/">
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

        <script type="text/x-shopify-connector-template" data-src="/api/v1/product/<?php echo $product  ?>/">

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">{{ title }}</h2>
            {{ body_html }}
          </div>
          <div class="col-md-5">
            <img class="featurette-image img-responsive" src="{{ featured_image }}"alt="{{ title }}">
          </div>
        </div>

        </script>

      </div><!-- .row -->
    </div><!-- /.container -->


<?php include("inc/footer.php"); ?>