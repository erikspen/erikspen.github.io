

var setRates = function(a){
    $('#bfRate1').val(a[1]).change();
    $('#bfSuper1').val(a[2]).change();
    $('#bfExpo1').val(a[3]).change();
    $('#otxNegExpo1').val(a[4]).change();
    $('#bfRate2').val(a[5]).change();
    $('#bfSuper2').val(a[6]).change();
    $('#bfExpo2').val(a[7]).change();
    $('#otxNegExpo2').val(a[8]).change();
    $('#bfRate3').val(a[9]).change();
    $('#bfSuper3').val(a[10]).change();
    $('#bfExpo3').val(a[11]).change();
    $('#otxNegExpo3').val(a[12]).change();
    return null
}

var setPilotRates = function(val){
    doDraw=false;
    $('#rate_choices').find('span').hide();
    switch (val){
        case '1': //default
        $('#value1').show();
        setRates( 
            [1,
            1.0,0.7,0,0,
            1.0,0.7,0,0,
            1.0,0.7,0,0]);
        break
        case '2': //holdox
        $('#value2').show();
        setRates( 
            [1,
            2.04,0,0.45,0,
            2.04,0,0.45,0,
            2.04,0,0.61,0]);
        break
        case '30': //sfpv old
        $('#value30').show();
        setRates( 
            [1,
            0.86,0.63,0.0,0,
            0.86,0.63,0.0,0,
            0.73,0.50,0.00,0]);
        break
        case '3': //sfpv new
        $('#value3').show();
        setRates( 
            [1,
            1.75,0.38,0.47,0,
            1.75,0.38,0.47,0,
            1.27,0.43,0.04,0]);
        break
        case '4': //hoopes
        $('#value4').show();
        setRates( 
            [1,
            0.8,0.66,0,0,
            0.8,0.64,0,0,
            0.8,0.61,0,0]);
        break

        case '5': //minchan (converted)
        $('#value5').show();
        setRates( 
            [1,
            .94,0.67,0.02,0,
            .94,0.67,0.02,0,
            0.89,0.47,0.15,0]);
        break

        case '6': //vanover (converted)
        $('#value6').show();
        setRates( 
            [1,
            1.0,0.59,0.01,0,
            1.0,0.59,0.01,0,
            1.0,0.59,0.10,0]);
        break

        case '7': //headsup fpv
        $('#value7').show();
        setRates( 
            [1,
            0.8,0.7,0.00,0,
            0.8,0.7,0.00,0,
            0.8,0.7,0.00,0]);
        break

        case '8': //Nytfury FPV
        $('#value8').show();
        setRates( 
            [1,
            0.92,0.56,0.28,0,
            0.92,0.56,0.28,0,
            0.63,0.39,0.07,0]);
        break
        case '109': //my rates 1
        $('#value109').show();
        setRates( 
            [0,
            0.95,0.63,0.31,-0.2, 
            0.95,0.61,0.31,-0.16, 
            0.49,0.75,0.0,-0.3]); //-25% throttle
        break
        case '110': //my rates 2
        $('#value110').show();
        setRates( 
            [0,
            0.69,0.75,0.0,-0.4, 
            0.69,0.74,0.0,-0.35, 
            0.49,0.80,0.0,-0.45]); //-20% throttle
    }
    doDraw=true;
    drawChart();
}