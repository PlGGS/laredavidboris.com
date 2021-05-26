var mapData;
var photos = {};
var editingId;
var changing = false;

$.get("list-photos.php", function(data) {
    data = JSON.parse(data)
    for(let i in data) {
        var tmp = data[i].split("-");
        if(tmp.length == 2 && !isNaN(tmp[0])) {
            if(photos[tmp[0]] === undefined) {
                photos[tmp[0]] = {}
            }
            photos[tmp[0]][tmp[1].split(".")[0]] = tmp[1].split(".")[1]
            photos[tmp[0]] = sortObject(photos[tmp[0]])
        }
    }
    console.log(photos)
})

$(function() {
    // if it is the photo management page
    if($("div.a-images").length !== 0) {
        getMapData(function(data) {
            console.log(data)
            data = data.sale.concat(data.rent)
            mapData = data;

            for(let i in data) {
                console.log(data[i].name, data[i].id, photos[data[i].id], photos)
                let elem = $('<div data-id="'+data[i].id+'" class="a-listing">'+data[i].name
                    +((photos.length !== 0)?'<b>'+((photos[data[i].id])?Object.keys(photos[data[i].id]).length:'0')+'</b>':'')
                    +(typeof data[i].hidden == "string" && (/^(true|yes|hidden)$/.test(data[i].hidden.toLowerCase()))?'<i title="You can change this on the google map">Hidden</i>':'')
                    +'</div>');
                $("div.a-listings").append(elem);
                elem.click(function() {
                    $("div.a-listings div").css("background-color", "white");
                    elem.css("background-color", "#D0F8E9");
                    editListing(data[i].id);
                })
            }
            $(window).resize();
        })
        $("ol.a-images").sortable({"onDrop":function($item, container, _super, event) {
            $item.removeClass(container.group.options.draggedClass).removeAttr("style")
            $("body").removeClass(container.group.options.bodyClass)

            movePhoto();
        }});
    }
})

function movePhoto(deleteId = undefined) {
    if(changing) {
        return
    }
    var changes = []
    for(let i in photos[editingId]) {
        changes.push([editingId+"-"+i+"."+photos[editingId][i], (i == deleteId)?"":editingId+"-"+i+"."+photos[editingId][i]+".tmp"])
    }
    var count = 0;
    $("ol.a-images li").each(function() {
        changes.push([editingId+"-"+$(this).attr("data-id")+"."+photos[editingId][$(this).attr("data-id")]+".tmp", editingId+"-"+count+"."+photos[editingId][$(this).attr("data-id")]]);

        $(this).find("span.a-number").text(count)
        $(this).find("span.a-name").text(editingId+"-"+count+"."+photos[editingId][$(this).attr("data-id")]);
        $(this).attr("data-id", count)

        count++;
    })

    count = 0
    photos[editingId] = {}
    $("ol.a-images li").each(function() {
        photos[editingId][count] = $(this).attr("data-extension")
        count++
    })

    changing = true

    $.post("rename-photos.php", {changes: changes}, function() {
        changing = false
    })

    console.log(changes)
}

function deletePhoto(id) {

    movePhoto(id)
}

function editListing(id) {
    $("ol.a-images").empty();
    $("div.a-upload").show();
    editingId = id;
    
    for(let i in photos[id]) {
        $("ol.a-images").append(imageElem(id+"-"+i+"."+photos[id][i],i))
    }

    $(window).resize();
}

function imageElem(name,id) {
    var elem = $(`
    <li data-id="`+id+`" data-extension="`+name.split(".")[name.split(".").length - 1]+`" class="a-image">
        <img src="/photos/thumbnail/`+name+`?t=`+Date.now()+`">
        <div class="a-info">
            <span class="a-name-title">Current Name</span>
            <span class="a-name">`+name+`</span>
            <span class="a-number-title">Number</span>
            <span class="a-number">`+id+`</span>
        </div>
        <div class="a-delete">x</div>
    </li>`);

    elem.find("div.a-delete").click(function() {
        elem.remove();
        deletePhoto(id);
    })

    return elem
}

function sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

$(document).ready(function(){
    $('#upload').on('click', function () {
        if(editingId || editingId === 0) {} else {return}
        var form_data = new FormData();
        var ins = document.getElementById('multiFiles').files.length;
        for (var x = 0; x < ins; x++) {
            form_data.append("files[]", document.getElementById('multiFiles').files[x]);
        }
        $("div.a-upload").append("<div class='a-upload-loading'><div class='fa fa-spinner fa-spin'></div></div>")
        $.ajax({
            url: 'file-upload.php?id='+editingId, // point to server-side PHP script 
            dataType: 'text', // what to expect back from the PHP script
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (response) {
                //$('#msg').html(response); // display success response from the PHP script
                refreshAll();
                $("div.a-upload-loading").remove();
            },
            error: function (response) {
                $("div.a-upload-loading").remove();
                //$('#msg').html(response); // display error response from the PHP script
            }
        });
    });
});

function refreshAll() {
    $.get("list-photos.php", function(data) {
        data = JSON.parse(data)
        for(let i in data) {
            var tmp = data[i].split("-");
            if(tmp.length == 2 && !isNaN(tmp[0])) {
                if(photos[tmp[0]] === undefined) {
                    photos[tmp[0]] = {}
                }
                photos[tmp[0]][tmp[1].split(".")[0]] = tmp[1].split(".")[1]
                photos[tmp[0]] = sortObject(photos[tmp[0]])
            }
        }
        console.log(photos)

        editListing(editingId);
    })
}