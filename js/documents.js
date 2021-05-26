$(function() {
    var selectedElemId;
    var uploadHandler = function(res) {};

    $("div.d-docs-area ol").sortable({
        onDrop: function($item, container, _super) {
            _super($item, container);

            updateNumbers();
        }
    });

    $("div.d-docs-area ol").on("click", "li", function() {
        editElement($(this).children().first())
    });
    closeEditElement();

    $("button.d-add-line").click(function() {
        addElement($("<li><hr></li>"))
    })
    $("button.d-add-heading").click(function() {
        addElement($("<li><h6>Heading</h6></li>"))
    })
    $("button.d-add-text").click(function() {
        addElement($("<li><p>Text</p></li>"))
    })
    $("button.d-add-doc").click(function() {
        addElement($(`<li><div class="d-doc" data-url="undefined">
        <a><span class="d-title">Document</span></a>
        <a><i class="fa fa-download" aria-hidden="true"></i></a>
      </div></li>`))
    })

    function updateNumbers() {
        var data = {};
        var i = 1;
        $("div.d-docs-area ol li").each(function() {
            data[$(this).children().first().attr("data-id")] = i;
            i++;
        })

        $.ajax({
            url: '/documents/update-numbers.php',
            method: 'post',
            data: data
        })
    }

    function editElement(elem) {
        closeEditElement();
        var type = elem.prop("tagName").toLowerCase().replace("6", "").replace("div", "doc");
        console.log(type)
        selectedElemId = elem.attr("data-id")
        if(selectedElemId === undefined || selectedElemId == "") { selectedElemId = undefined; return; }

        $("div.d-elems button.d-delete").show().click(function() {
            deleteElement(elem.attr("data-id"))
            elem.parent().remove();
            closeEditElement();
        });

        if(type == "hr") {

        }

        if(type == "doc") {
            $("div.d-elems div.d-upload").show();
            $("div.d-elems button.d-save").show();
            $("div.d-elems textarea").show().val(elem.find("span").text());
            $("div.d-elems div.d-upload span").text(elem.attr("data-url"));

            uploadHandler = function(res) {
                //elem.attr("data-url", res);
                $("div.d-elems div.d-upload span").text(res);
            }

            $("div.d-elems button.d-save").on("click", function() {
                updateElement({id: elem.attr("data-id"), text: $("div.d-elems textarea").val(), url: $("div.d-elems div.d-upload span").text()})
                elem.find("span").text($("div.d-elems textarea").val())
                elem.attr("data-url", $("div.d-elems div.d-upload span").text());
            });
        }

        if(type == "h" || type == "p") {
            $("div.d-elems button.d-save").show();
            $("div.d-elems textarea").show().val(elem.text());      

            $("div.d-elems button.d-save").on("click", function() {
                updateElement({id: elem.attr("data-id"), text: $("div.d-elems textarea").val()})
                elem.text($("div.d-elems textarea").val())
            });
        }
    }

    function updateElement(data) {
        $.ajax({
            url: "/documents/update-element.php",
            method: "post",
            data: data
        })
    }

    function closeEditElement() {
        $("div.d-elems button.d-delete").off("click");
        $("div.d-elems button.d-save").off("click");
        $("div.d-elems div.d-upload input").val("");
        $("div.d-elems textarea").val("");
        $("div.d-elems button.d-delete, div.d-elems button.d-save, div.d-elems textarea, div.d-elems div.d-upload").hide();
    }

    function deleteElement(id) {
        if(selectedElemId === id) {
            selectedElemId = undefined;
        }
        $.ajax({
            url: '/documents/delete-element.php',
            method: 'post',
            data: {id: id}
        }) 
    }

    function addElement(elem) {
        /*if(selectedElemId === undefined) {
            selectedElemId = $("div.d-docs-area ol").children();
            if(selectedElemId.length == 0) {
                selectedElemId = 0;
            } else {
                return;
            }
        }*/
        console.log("selected", selectedElemId)
        if(selectedElemId === undefined) {
            elem.insertAfter($("ol.d-docs").children().last());
        } else {
            elem.insertAfter($("li [data-id="+selectedElemId+"]").parent());
        }
        $("div.d-docs-area ol").sortable("refresh");
        elem = elem.children().first();
        var type = elem.prop("tagName").toLowerCase().replace("6", "").replace("div", "doc");
        $.ajax({
            url: '/documents/add-element.php',
            method: 'post',
            data: {
                'afterId': selectedElemId,
                'type': type,
                'text': (type == "p" || type == "h")?elem.text():((type == "doc")?elem.find("span").text():""),
                'url': (type == "doc")?elem.attr("data-url"):""
            },
            success:function(data) {
                elem.attr("data-id", data)
            }
        })
    }

    $('#upload').on('click', function () {
        var form_data = new FormData();
        var ins = document.getElementById('docUpload').files.length;
        for (var x = 0; x < ins; x++) {
            form_data.append("files[]", document.getElementById('docUpload').files[x]);
        }
        $("div.d-upload").append("<div class='a-upload-loading'><div class='fa fa-spinner fa-spin'></div></div>")
        $.ajax({
            url: '/documents/file-upload.php', // point to server-side PHP script 
            dataType: 'text', // what to expect back from the PHP script
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (response) {
                //$('#msg').html(response); // display success response from the PHP script
                uploadHandler(response);
                $("div.a-upload-loading").remove();
            },
            error: function (response) {
                $("div.a-upload-loading").remove();
                //$('#msg').html(response); // display error response from the PHP script
            }
        });
    });
})