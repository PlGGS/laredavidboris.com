<?php
session_start();
//echo password_hash($_POST["password"], PASSWORD_DEFAULT);
if($_POST["password"] && password_verify($_POST["password"], '$2y$10$83ppQwd9IbPiMDX8CDx/mu1d/6GN2FwxJ9CNDvxTG0t8KHw5VKcn2')) {
    $_SESSION["in"] = true;
}
if(isset($_GET["logout"])) {
    $_SESSION["in"] = false;
}

$addJs = ["jquery-sortable", "mapData", "admin"];
$navbarShrink = true;
include $_SERVER["DOCUMENT_ROOT"]."/header.php"; 
?>

<?php if($_SESSION["in"]): ?>

    <div class="container admin">
        <div class="row">
            <div class="col-lg-12 mx-auto">
                
                <h2 class="text-center">Admin Panel</h2>
                <div class="a-toplinks">
                    <?php if(isset($_GET["photos"]) || isset($_GET["documents"])) { echo '<a href="/admin/" style="float: left; margin-left:0"><button class="btn btn-default">Back</button></a>'; } ?>
                    <a class="a-toplinks a-maplink" target="_blank" href="https://docs.google.com/document/d/1_P_jf8zmUuXEyDlVax4NSMo71HiT4ubVLrVnPSTK2Mw/edit?usp=sharing"><button class="btn btn-default">How To Edit Listings</button></a>
                    <a class="a-toplinks a-maplink" target="_blank" href="https://www.google.com/maps/d/edit?mid=176bl0Fgs94AgtUCb-uJUpuyz9IA&ll=42.20730046225121%2C-87.94405454999998&z=9"><button class="btn btn-default">Edit Listings</button></a>
                    <a class="a-toplinks a-logout" href="?logout=logout"><button class="btn btn-default">Logout</button></a>
                </div>
                <?php if(isset($_GET["photos"])): ?>
                <div class="row">
                    <div class="col-6">
                        <div class="a-listings">
                        </div>
                    </div>

                    <div class="a-images col-6">
                        <div class="a-upload">
                            <input type="file" id="multiFiles" name="files[]" accept=".jpg" multiple="multiple"/>
                            <button id="upload">Upload</button>
                            <span class="a-warning">Images will be automatically cut to a 4:3 format and resized to 500x375 for better usability and loading speed. (Original images are still saved too)</span>
                        </div>
                        <ol class='a-images'>
                            <!--<li class="a-image">
                                <img src="/photos/thumbnail/123-0.jpg">
                                <div class="a-info">
                                    <span class="a-oname-title">Original Name</span>
                                    <span class="a-oname">Original Name</span>
                                    <span class="a-name-title">Current Name</span>
                                    <span class="a-name">Original Name</span>
                                </div>
                            </li>
                            <li>Second</li>
                            <li>Third</li>-->
                        </ol>
                    </div>
                </div>
                <?php elseif(isset($_GET["documents"])): 
                array_push($addJs, "jquery-sortable", "documents"); ?>
                <div class="d-documents d-documents-admin row">
                    <div class="d-docs-area col-8">
                        <ol class="d-docs">
                            <?php 
                            include $_SERVER["DOCUMENT_ROOT"]."/documents/fx.php"; 
                            echo docs_get_html(true);
                            /*echo docs_get_html(true);
                            echo docs_get_html(true);
                            echo docs_get_html(true);
                            echo docs_get_html(true);
                            echo docs_get_html(true);
                            echo docs_get_html(true);
                            echo docs_get_html(true);
                            echo docs_get_html(true);
                            echo docs_get_html(true);*/
                            ?>
                        </ol>
                    </div>
                    <div class="d-elems col-4">
                        <span style="font-size: 12px; display: block; margin-bottom: 8px; line-height: 14px;">Click buttons below to add those elements after the currently selected one</span>
                        <div class="d-add-elem">
                            <button class="btn btn-default d-add-heading">Heading</button>
                            <button class="btn btn-default d-add-text">Text</button>
                            <button class="btn btn-default d-add-line">Line</button>
                            <button class="btn btn-default d-add-doc">Document</button>
                        </div>
                        <textarea class="d-text" style="display: none"></textarea>
                        <div class="d-upload" style="display: none">
                            <span>no file</span>
                            <input type="file" id="docUpload" name="files[]" accept=".pdf" />
                            <button id="upload">Upload</button>
                        </div>
                        <button class="btn btn-default d-delete" style="display: none">Delete</button>
                        <button class="btn btn-default d-save" style="display: none">Save</button>
                    </div>
                </div>
                <?php else: ?>
                <div class="row">
                    <div class="col-6 a-bigbutton">
                        <a href="?photos">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Photos</h5>
                                <p class="card-text">Edit the photos of a listing.</p>
                            </div>
                        </div>
                        </a>
                    </div>
                    <div class="col-6 a-bigbutton">
                        <a href="?documents">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Documents</h5>
                                <p class="card-text">Add or remove documents shown on the /documents page</p>
                            </div>
                        </div>
                        </a>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

<script src="/js/admin.js"></script>

<?php else: ?>

<section id="login" class="content-section text-center">
    <div class="container">
    <div class="row">
        <div class="col-lg-8 mx-auto">
        <?php include $_SERVER["DOCUMENT_ROOT"].'/breadcrumbs.php'; ?>
        
        <h2>Admin Login</h2>

        <form action="#" method="post" style="max-width: 300px; display: block; margin: auto">
            <div class="form-group">
                <input type="password" name="password" class="form-control" id="password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-default" style="float: right;">Login</button>
        </form>

        </div>
    </div>
    </div>
</section>

<?php endif; ?>
<?php include $_SERVER["DOCUMENT_ROOT"]."/footer.php"; ?>