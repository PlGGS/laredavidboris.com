<?php 
// remove this when done to prevent possible error messages from appearing on website
//error_reporting(E_ALL); 
include_once "functions.php";
?>
<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Sebastian Strempfer">
    <meta name="theme-color" content="#000000">

    <title>David Boris</title>

    <!-- Bootstrap core CSS -->
    <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template -->
    <link href="/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Cabin:700' rel='stylesheet' type='text/css'>

    <!-- Custom styles for this template -->
    <link href="/css/grayscale.css" rel="stylesheet">

    <!-- Custom styles for this website -->
    <link href="/css/custom.css" rel="stylesheet">

    <link rel="shortcut icon" href="<?php echo CacheBuster("/favicon.ico"); ?>" />

    
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,500,600" rel="stylesheet">
  </head>

  <body id="page-top">

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top <?php if($navbarShrink) { echo "navbar-shrink-permanent"; } ?>" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger d-none d-md-block" href="<?php if(!$indexFile) { echo "/"; } ?>#page-top">Lincoln and Associates Real Estate LLC</a>
        <a class="navbar-brand js-scroll-trigger d-block d-md-none" href="<?php if(!$indexFile) { echo "/"; } ?>#page-top">L & A Real Estate LLC</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="<?php if(!$indexFile) { echo "/"; } ?>#listings">Listings</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="<?php if(!$indexFile) { echo "/"; } ?>#about">About</a>
            </li>
			      <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="<?php if(!$indexFile) { echo "/"; } ?>#contact">Contact</a>
            </li>
            <li class="nav-item d-none d-lg-block navbar-custom-toggle-li">
              <button class="navbar-custom-toggle" type="button"><span class="navbar-dot"></span><span class="navbar-dot"></span><span class="navbar-dot"></span></button>
            </li> 
            <div class="mobile-only-menu d-block d-lg-none">
              <hr>
              <?php
              // write links to articles into variable since they have to be printed twice
              $articlesHtml = '
              <li class="nav-item">
                <a class="nav-link" href="/property-management/">Property Management</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/leasing-services/">Leasing Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/documents/">Documents</a>
              </li>
              ';
              echo $articlesHtml;
              ?>
            </div>
          </ul>
        </div>
        <div class="navbar-custom">
          <ul class="navbar-nav ml-auto">
            <?php echo $articlesHtml; ?>
          </ul>
        </div>
      </div>
    </nav>
