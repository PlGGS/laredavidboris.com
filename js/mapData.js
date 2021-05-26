function getMapData(callback) {
    $.get("https://www.google.com/maps/d/kml?mid=176bl0Fgs94AgtUCb-uJUpuyz9IA&forcekml=1&cid=mp", function(data) {
        data = xmlToJson(data)
        data = data.kml.Document.Folder;

        console.log(data)

        var sale = data.find(x => x.name == "Sale")
        var rent = data.find(x => x.name == "Rent")

        sale = (sale)?sale.Placemark:[]
        rent = (rent)?rent.Placemark:[]

        // make sure it is an actual array since when there is only one listing, it will only return that object
        sale = (Array.isArray(sale))?sale:[sale];
        rent = (Array.isArray(rent))?rent:[rent];

        sale = reformatData(sale,"sale")
        rent = reformatData(rent,"rent")

        console.log(sale,rent)

        callback({sale:sale,rent:rent})
    })
}

function reformatData(data, type) {
    var out = []
    for(let i in data) {
	if(data[i].ExtendedData.Data) { 
        data[i].data = data[i].ExtendedData.Data

        out.push({
          name: data[i].name,
          listingType: type
        })
        // give every listing a unique idea. (isn't really necessary anymore since it should already have one from the maps)
        out[out.length-1].id = ObjectID()

        for(let j in data[i].data) {
            out[out.length-1][data[i].data[j]["@attributes"].name.toLowerCase()] = data[i].data[j].value
        } 
        out[out.length - 1].id = parseInt(out[out.length - 1].id)
        }
    }
    return out
}

function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	// If just one text node inside
	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
		obj = xml.childNodes[0].nodeValue;
	}
	else if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if(nodeName !== "#text") {
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
            }
        }
		}
	}
	return obj;
}


var ObjectID;
(function() {
  var id = 0;

  function generateId() { return id++; };

  ObjectID = function() {
      var newId = generateId();
      return newId;
  };
})();
