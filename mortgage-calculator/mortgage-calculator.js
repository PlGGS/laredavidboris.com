var canvasHeight = 260;
var canvasWidth = 400;
var dragMeIsHidden = false;

$(function() {
    var price = getUrlParameter("price")
    var tax = getUrlParameter("tax")
    var insurance = getUrlParameter("insurance")

    $("div.chart").height(canvasHeight)
    $("div.chart").width(canvasWidth)

    $(document).on('change', 'div.calc input', function() {
        $(this).val($(this).val().replace(/[^(0-9|\.)]/g, '').replace(".","d").replace(/\./g, "").replace("d", "."));
    })
    $(document).on('change', '.dollarSign', function () {
        var n = $(this).val().replace(/[^(0-9|\.)]/g, '')
        $(this).val("$" + ((n == "") ? "0" : n.replace(/^0+/, '')));
    });

    $(document).on('keyup', 'input', function() {
        var data = {
            price: parseFloat(0+$("input#price").val().replace("$", "")),
            downpayment: parseFloat(0+$("input#downpayment").val().replace("$", "")),
            rate: parseFloat(0+$("input#rate").val().replace("$", "")),
            term: parseFloat(0+$("input#term").val().replace("$", "")),
            taxes: parseFloat(0+$("input#taxes").val().replace("$", "")),
            insurance: parseFloat(0+$("input#insurance").val().replace("$", ""))
        }
        // taxes are collected twice annually
        data.additional = (isNaN(parseFloat(data.taxes)) ? 0 : parseFloat(data.taxes))/6 + (isNaN(parseFloat(data.insurance)) ? 0 : parseFloat(data.insurance))/12
        data.principal = data.price - data.downpayment
        data.go = (data.price !== "" && data.principal >= 0 && data.term != 0 && data.rate !== "" && data.term !== "")
        console.log(data)

        var downPercent = parseInt(data.downpayment / data.price * 100)
        $("label[for=downpayment]").html("Downpayment" + ((data.downpayment != "") ? (" - " + (isNaN(downPercent) ?"&#10718;":downPercent)+"%"):""));

        if(data.go) {
            $("div.info span.monthly span").text("$" + numberWithCommas(Math.round((principalToMonthly(data.principal, data.term * 12, data.rate / 100) + data.additional) * 100) / 100));
            $("div.info span.total span").text("$" + numberWithCommas(Math.round((principalToTotal(data.principal, data.term * 12, data.rate / 100)) * 100) / 100));
            $("div.info span.interest span").text("$" + numberWithCommas(Math.round((principalToTotal(data.principal, data.term * 12, data.rate / 100) - data.principal) * 100) / 100));
            drawData(principalToData(data.principal, data.term*12, data.rate/100))
        }
    })

    $("input#price").keyup();
    /*var bezier = fitCurve([[0,0],[10,10],[40,20],[90,30],[160,40]], 1)
    for(let i in bezier) {
        //bezier[i] = bezier[i].map(function(elem) { return [(elem[0]*10), (elem[1]*10)]})
        $("svg").append('<path stroke-width="3" d="M ' + bezier[i][0].join(" ") + ' C ' + bezier[i][1].join(" ") + ' ' + bezier[i][2].join(" ") + ' ' + bezier[i][3].join(" ") +'" stroke="#000" fill="transparent"/>')
    }
    $("div.chart").html($("div.chart").html());*/
})

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function numberWithCommas(x, decimal = true) {
    x = (decimal) ? x.toFixed(2) : x
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Get calculate monthly payment
 *
 * @param {Integer} p - Principial, the amount you need to borrow
 * @param {Integer} n - mortgage term: how many months
 * @param {Float} r - interest rate
 * @returns {Float} Monthly Payment
 */
function principalToMonthly(p, n, r) {
    var o = (r == 0)?p/n:(r/12*p*Math.pow(1+r/12, n))/(Math.pow(1+r/12, n) - 1)
    return isNaN(o) ? 0 : o
}
function principalToTotal(p, n, r) {
    var o = principalToMonthly(p, n, r)*n
    return isNaN(o) ? 0 : o
}
function totalToPrincipal(t, n, r) {
    var o = monthlyToPrincipal(t/n, n, r)
    return isNaN(o) ? 0 : o
}
function monthlyToPrincipal(m, n, r) {
    if(r == 0) {
        return m*n
    }
    var o = (m*(Math.pow(1+r/12, n)-1))/(r/12*Math.pow(1+r/12, n))
    return isNaN(o) ? 0 : o
}

// this uses way to many quadratics. find better formulas
function principalToData(p, n, r) {
    var init = p;
    var m = principalToMonthly(p, n, r)
    var t = principalToTotal(p, n, r)
    console.log(m,t)
    var paid = 0, interest = 0;
    var data = []
    for(let i=0; i<=n; i++) {
        data.push({
            remaining: p,
            principal: paid,
            interest: interest
        })

        var prev_paid = paid;
        var prev_t = t;
        t -= m;
        p = (t > 0 && n-i-1 > 0)?totalToPrincipal(t, n-i-1, r):0
        paid = init - p;
        interest += (prev_t - t) - (paid - prev_paid)
        //console.log(t,p,paid,interest, data)
    }
    console.log(data)
    return data
}

function drawData(data) {
    var widthMulti = canvasWidth / (data.length - 1)
    var maximum = Math.max(data[0].remaining, data[data.length - 1].interest)
    var heightMulti = (maximum == 0)?0:canvasHeight / maximum
    var remaining = data.map(function (month, i) { return [i * widthMulti, canvasHeight - month.remaining * heightMulti] })
    var principal = data.map(function (month, i) { return [i * widthMulti, canvasHeight - month.principal * heightMulti] })
    var interest = data.map(function (month, i) { return [i * widthMulti, canvasHeight - month.interest * heightMulti] })


    console.log(remaining, principal, interest)
    var bezier = fitCurve(remaining, 1)
    $("svg").empty();
    for (let i in bezier) {
        $("svg").append('<path stroke-width="3" d="M ' + bezier[i][0].join(" ") + ' C ' + bezier[i][1].join(" ") + ' ' + bezier[i][2].join(" ") + ' ' + bezier[i][3].join(" ") + '" stroke="#f00" fill="transparent"/>')
    }
    var bezier = fitCurve(principal, 1)
    for (let i in bezier) {
        $("svg").append('<path stroke-width="3" d="M ' + bezier[i][0].join(" ") + ' C ' + bezier[i][1].join(" ") + ' ' + bezier[i][2].join(" ") + ' ' + bezier[i][3].join(" ") + '" stroke="#0f0" fill="transparent"/>')
    }
    var bezier = fitCurve(interest, 1)
    for (let i in bezier) {
        $("svg").append('<path stroke-width="3" d="M ' + bezier[i][0].join(" ") + ' C ' + bezier[i][1].join(" ") + ' ' + bezier[i][2].join(" ") + ' ' + bezier[i][3].join(" ") + '" stroke="#00f" fill="transparent"/>')
    }
    $("div.render").html($("div.render").html());

    var pos = Math.round(($("div.linebox").offset().left + 12 - $("div.chart").offset().left) / $("div.chart").width() * (data.length - 1))
    $("div.ldot.principal").css("top", dotPos(principal, pos, $("div.chart").height()) - 6)
    $("div.ldot.remaining").css("top", dotPos(remaining, pos, $("div.chart").height()) - 6)
    $("div.ldot.interest").css("top", dotPos(interest, pos, $("div.chart").height()) - 6)

    if (data.length <= 13) {
        $("span.time span.year").hide()
    } else {
        $("span.time span.year").show()
    }
    $("span.time span.year span").text(Math.floor((pos - 1) / 12 + 1))
    $("span.time span.month").text((pos - 1) % 12 + 1)

    $("div.legend span.principal span").text(numberWithCommas(data[pos].principal))
    $("div.legend span.remaining span").text(numberWithCommas(data[pos].remaining))
    $("div.legend span.interest span").text(numberWithCommas(data[pos].interest))

    var dragStart = {

    }
    $("div.linebox").off("mousedown")
    $("div.linebox").mousedown(function(e) {
        console.log(e, e.originalEvent.layerX)
        dragStart = {
            x: e.originalEvent.layerX,
            y: e.originalEvent.layerY
        }

        $(document).on("mousemove.dragline", function(e) {
            if(!dragMeIsHidden) {
                $("span.dragme").hide();
            }

            //console.log(e)
            var pos = (e.originalEvent.clientX - $("div.chart").offset().left + 12 - dragStart.x) / $("div.chart").width()
            pos = Math.round(pos * (data.length - 1))
            var cpos = pos / (data.length - 1) * canvasWidth
            cpos = (cpos > canvasWidth)?canvasWidth:(cpos<0)?0:cpos;
            $("div.linebox").css("margin-left", cpos)

            //console.log(dotPos(principal, pos, $("div.chart").height()), principal, pos, $("div.chart").height())
            pos = (pos>=data.length)?data.length-1:(pos<0)?0:pos;
            $("div.ldot.principal").css("top", dotPos(principal, pos, $("div.chart").height()) - 6)
            $("div.ldot.remaining").css("top", dotPos(remaining, pos, $("div.chart").height()) - 6)
            $("div.ldot.interest").css("top", dotPos(interest, pos, $("div.chart").height()) - 6)

            if(data.length <= 13) {
                $("span.time span.year").hide()
            } else {
                $("span.time span.year").show()
            }
            $("span.time span.year span").text(Math.floor((pos-1)/12+1))
            $("span.time span.month").text((pos-1) % 12 + 1)

            $("div.legend span.principal span").text(numberWithCommas(data[pos].principal))
            $("div.legend span.remaining span").text(numberWithCommas(data[pos].remaining))
            $("div.legend span.interest span").text(numberWithCommas(data[pos].interest))
        })

        $(document).one("mouseup", function() {
            $(document).off("mousemove.dragline")
        })
    })

    function dotPos(data, x, height) {
        return data[x][1]/canvasHeight*height
    }
}

//console.log(drawData(principalToData(100000, 120, 0.05)))

//console.log(monthlyPayment(100000, 12*10, .05), totalPayment(100000, 12*10, 0.05))
