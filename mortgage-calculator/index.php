<!DOCTYPE html>
<html>
    <head>
        <title>Mortgage Calculator - David Boris</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="Sebastian Strempfer">
        <meta name="theme-color" content="#ffffff">

        
        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css">

        <!-- <link href='https://fonts.googleapis.com/css?family=Cabin:700' rel='stylesheet' type='text/css'> -->
        <link rel="stylesheet" href="/css/mortgage-calculator.css">
        <link rel="shortcut icon" href="/favicon.ico" />
    </head>
    <body>
        <h3>Mortgage Calculator</h3>

        <div class="content">
            <div class="row calc">
                <form class="col s12 m6">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="price" type="text" class="validate dollarSign" value="$<?php echo 0+$_GET["price"]; ?>">
                            <label for="price">Home Price</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="downpayment" type="text" class="validate dollarSign" value="$<?php echo 0+$_GET["downpayment"]; ?>">
                            <label for="downpayment">Downpayment</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="rate" type="text" class="validate" value="<?php echo $_GET["rate"]; ?>">
                            <label for="rate">Interest Rate (percent)</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="term" type="text" class="validate" value="<?php echo $_GET["term"]; ?>">
                            <label for="term">Loan Term (years)</label>
                        </div>
                    </div>
                    <div class="row">
                        <h6 style="text-align: center;">Additional Payments</h6>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="taxes" type="text" class="validate dollarSign" value="$<?php echo 0+$_GET["taxes"]; ?>">
                            <label for="taxes">Property Taxes</label>
                            <span class="helper-text">Twice Per Year</span>
                        </div>
                        <div class="input-field col s6">
                            <input id="insurance" type="text" class="validate dollarSign" value="$<?php echo 0+$_GET["insurance"]; ?>">
                            <label for="insurance">Homeowners Insurance</label>
                            <span class="helper-text">Per Year</span>
                        </div>
                    </div>
                </form>
                <div class="col s12 m6 info">
                    <span class="monthly"><span>$0</span>/month</span>
                    <span class="total"><span>$0</span> Mortgage Total</span>
                    <span class="interest"><span>$0</span> Interest</span>
                </div>
                <div class="col s12 hide-on-small-only" style="text-align: center;">
                    <div class="chart">
                        <div class="render">
                            <svg style="overflow: hidden" width="400" height="260">
                                <g>
                                    <title>Layer 1</title>
                                    <!-- <rect id="svg_1" height="64" width="102" y="106.449997" x="54.5" stroke-width="1.5" stroke="#000" fill="#fff"/> -->
                                </g>
                            </svg>
                        </div>
                        <div class="linebox">
                            <div class="line"></div>
                            <div class="ldot principal"></div>
                            <div class="ldot remaining"></div>
                            <div class="ldot interest"></div>
                            <span class="dragme">Drag Me!</span>
                        </div>
                    </div>
                    <div class="legend">
                        <span class="time"><span class="year">Year <span>0</span>, </span>Month <span class="month">0</span></span>
                        <span class="leg principal">
                            Principal Paid ~$<span></span>
                        </span>
                        <span class="leg interest">
                            Interest Paid ~$<span></span>
                        </span>
                        <span class="leg remaining">
                            Remaining ~$<span></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <script src="/vendor/jquery/jquery.min.js"></script>
        <!-- Compiled and minified JavaScript -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script>
        <script src="fit-curve.web.js"></script>
        <script src="mortgage-calculator.js"></script>

        <!-- <g fill-rule='evenodd'><g fill='#bab7b3' fill-opacity='0.4'><path opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/><path d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z' /></g></g>
 -->
    </body>
</html> 