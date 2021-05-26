<?php

$addJs = ["mapData", "listings"];
$indexFile = true;
include "header.php"; 
?>

    <!-- Intro Header -->
    <header class="masthead" style="background: url('/img/bg.jpg') no-repeat bottom center scroll; background-size: cover;">
      <div class="intro-body" style="position: relative;">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <h1 class="brand-heading">David Boris</h1>
              <p class="intro-text">Licensed Real Estate Managing Broker and Realtor.</p>
              <a href="#listings" class="btn btn-circle js-scroll-trigger">
                <i class="fa fa-angle-double-down animated"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="sneaky-contact">
      <a href="tel:708-220-6849"><i class="fa fa-phone" aria-hidden="true"></i>708-220-6849</a></br>
      <a href="mailto:lincolnre@comcast.net"><i class="fa fa-envelope" aria-hidden="true"></i>LincolnRE@comcast.net</a>
    </div>

    <!-- Listings Section -->
    <section id="listings" class="listings-section content-section">
      <div class="container">
        <div class="col-lg-12 mx-auto">
          <h2>Listings</h2>
          <?php include("index-listings.php"); ?>
        </div>
      </div>
    </section>
	
	<!-- About Section -->
    <section id="about" class="content-section text-center">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h2>About Dave</h2>
            <p>
            <img class="about-dave-img" src="img/dave-smile.jpg" alt="David Boris smiling" height="125px">
            Hello! I am David L. Boris, managing broker and owner of Lincoln & Associates Real Estate, LLC. 
			I have been an Illinois realtor for over 30 years, servicing both residential and commercial buyers, 
			sellers, and tenant relationships. I live in Downers Grove with my wife, Sharon, and my two sons, 
			Blake and Nathan. I've been a member of the National, State, and Local Realtor Associations since 
			1987 and have been a licensed broker by U.S. Housing & Urban Development since 1996, and I have held 
			a State of Illinois Real Estate License since 1987. My one simple goal when assisting my clients is to 
			treat them as I would treat myself. Please contact me below if you have any questions!
			</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="content-section text-center">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h2>Contact David Boris</h2>
            <p>Feel free to text or call <a href="tel:708-220-6849">708-220-6849</a> for a free one-on-one consultation,<br> or email <a href="mailto:lincolnre@comcast.net">LincolnRE@comcast.net</a> today.</p>
            <ul class="list-inline banner-social-buttons">
              <!--<li class="list-inline-item">
                <a href="https://twitter.com/plggs" class="btn btn-default btn-lg">
                  <i class="fa fa-twitter fa-fw"></i>
                  <span class="network-name">Twitter</span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://github.com/plggs" class="btn btn-default btn-lg">
                  <i class="fa fa-github fa-fw"></i>
                  <span class="network-name">Github</span>
                </a>
              </li>-->
            </ul>
          </div>
        </div>
        
      </div>
    </section>

<?php include "footer.php"; ?>
