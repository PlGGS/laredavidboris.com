<?php 
// navbar should always be shrunken (this should be enabled for all non-main pages)
$addJs = ["test"];
$navbarShrink = true;
include $_SERVER["DOCUMENT_ROOT"]."/header.php"; 
?>
    <section id="error-404" class="content-section text-center article">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <?php include $_SERVER["DOCUMENT_ROOT"].'/breadcrumbs.php'; ?>
                    <h1>Article doesn't exist</h1>
                    <p class="text-center">Feel free to keep browsing this website or <a href="/#contact">contact me</a> if you got here because of a bad link on this website.</p>
                    <!--<button class="btn btn-default">Go Back</button>-->
                </div>
            </div>
        </div>
    </section>
<?php
array_push($addJs, '
    <script>
    $(function() {
        if(history.length !== 0) {
            $("div.row div.col-lg-8").append(\'<button onClick="history.go(-1);" class="btn btn-default">Go Back</button>\');
        }
    })
    </script>');
    ?>

<?php include $_SERVER["DOCUMENT_ROOT"]."/footer.php"; ?>