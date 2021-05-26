    <!-- Footer -->
    <div class="footer-placer"></div>
    <footer style="visibility: hidden">
      <div class="container text-center">
      <div class="row">
        <!--<div class="col-0"></div>
        <div class="f-articles col-0 col-md-8">
          <h4>Articles</h4>
          <ul class="f-articles">
            <li><a href="/buying-a-home">Buying A Home</a></li>
            <li><a href="/buying-a-home">Buying A Home</a></li>
            <li><a href="/buying-a-home">Buying A Home</a></li>
            <li><a href="/buying-a-home">Buying A Home</a></li>
            <li><a href="/buying-a-home">Buying A Home</a></li>
            <li><a href="/buying-a-home">Buying A Home</a></li>
          </ul>
        </div>
        <div class="f-articles col-0 col-md-4">
          <h4>Main</h4>
          <ul class="f-main">
            <li><a href="/#listings">Listings</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#contact">Contact</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </div>-->
        <div class="f-pages col-12">

            <a href="/#listings">Listings</a>
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
            <a href="/property-management/">Property Management</a>
            <a href="/leasing-services/">Leasing Services</a>
            <a href="/documents/">Documents</a>
            <a href="/admin/">Admin</a>
        </div>
        <p class="f-copyright col-12">&copy; Lincoln and Associates Real Estate LLC & Sebastian Strempfer <?php echo date("Y"); ?></p>
      </div>
      </div>
    </footer>

    <!-- Bootstrap core JavaScript -->
    <script src="/vendor/jquery/jquery.min.js"></script>
    <script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for this template -->
    <script src="/js/grayscale.min.js"></script>

    <!-- Custom scripts made by Sebastian Strempfer :) -->
    <script src="/js/custom.js"></script>
    <!-- <script src="/js/listings.js"></script> -->

    <?php
    if(isset($addJs)) {
        foreach($addJs as $js) {
          if(strpos($js, '<script>') !== false) {
            echo $js;
          } else {
            echo '<script src="/js/'.$js.'.js"></script>';
          }
        }
    }
    ?>

    <!-- Google Maps API Key - Use your own API key to enable the map feature. More information on the Google Maps API can be found at https://developers.google.com/maps/ -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB0s_ZX9Wtps9vtgMxd1iSwK3nd6pLVVt8&sensor=false&callback=initMap"></script>

  </body>

</html>
