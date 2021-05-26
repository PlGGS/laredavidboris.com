<?php 
// navbar should always be shrunken (this should be enabled for all non-main pages)
$navbarShrink = true;
include $_SERVER["DOCUMENT_ROOT"]."/header.php"; 
if(!isset($addJs)) {
    $addJs = [];
}
array_push($addJs, "documents");
?>

    <section id="documents" class="content-section text-center article">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto d-documents">
            <?php include $_SERVER["DOCUMENT_ROOT"].'/breadcrumbs.php'; ?>
            
            <h2>Documents</h2>
            <!--<hr>
            <h6>Reprehenderit id duis aliquip ut incididunt magna incididunt.</h6>
            <p>Ut Lorem est laboris aliqua Lorem mollit. Eiusmod adipisicing excepteur sunt nulla est dolore adipisicing anim laboris culpa ad aute dolor mollit. Nostrud ea excepteur velit qui. Aliquip non aute excepteur excepteur ullamco consectetur velit qui mollit. Sint exercitation et velit id culpa fugiat. Lorem pariatur reprehenderit id nulla tempor duis cillum veniam. Officia commodo proident et sit fugiat aliquip culpa.</p>
            <div class="d-doc">
              <span class="d-title">Pariatur amet aliqua reprehenderit</span>
              <i class="fa fa-download" aria-hidden="true"></i>
            </div>

            <div class="d-doc">
              <a href="/documents/docs/asdad.pdf"><span class="d-title">Pariatur amet aliqua reprehenderit Ea tempor labore consequat ea anim et Lorem consequat aliquip laborum anim.</span></a>
              <a href="/documents/download/asdad.pdf"><i class="fa fa-download" aria-hidden="true"></i></a>
            </div>
            <hr>-->

            <?php 
            include $_SERVER["DOCUMENT_ROOT"]."/documents/fx.php"; 
            echo docs_get_html();
            ?>

          </div>
        </div>
      </div>
    </section>

<?php include $_SERVER["DOCUMENT_ROOT"]."/footer.php"; ?>