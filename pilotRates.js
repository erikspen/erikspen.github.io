

var setRates = function(a){
    if(a[0]==0){
        checkBox.checked=false;
    } else {
        checkBox.checked=true;
    }
    checkboxCallback();
    $('#bfRate1').val(a[1]).change();
    $('#bfSuper1').val(a[2]).change();
    $('#bfExpo1').val(a[3]).change();
    $('#otxNegExpo1').val(a[4]).change();
    $('#bfSuper2').val(a[5]).change();
    $('#otxNegExpo2').val(a[6]).change();
    $('#bfRate3').val(a[7]).change();
    $('#bfSuper3').val(a[8]).change();
    $('#bfExpo3').val(a[9]).change();
    $('#otxNegExpo3').val(a[10]).change();
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
            0.7,0,
            1.0,0.7,0,0]);
        break
        case '2': //holdox
        $('#value2').show();
        setRates( 
            [1,
            2.04,0,0.45,0,
            0,0,
            2.04,0,0.61,0]);
        break
        case '30': //sfpv old
        $('#value30').show();
        setRates( 
            [1,
            0.86,0.63,0.0,0,
            0.63,0,
            0.73,0.50,0.00,0]);
        break
        case '3': //sfpv new
        $('#value3').show();
        setRates( 
            [1,
            1.75,0.38,0.47,0,
            0.38,0,
            1.27,0.43,0.04,0]);
        break
        case '4': //hoopes
        $('#value4').show();
        setRates( 
            [1,
            0.8,0.66,0,0,
            0.64,0,
            0.8,0.61,0,0]);
        break

        case '5': //minchan (converted)
        $('#value5').show();
        setRates( 
            [1,
            .94,0.67,0.02,0,
            0.67,0,
            0.89,0.47,0.15,0]);
        break

        case '6': //vanover (converted)
        $('#value6').show();
        setRates( 
            [1,
            1.04,0.67,0.00,0,
            0.67,0,
            1.04,0.67,0.00,0]);
        break

        case '7': //headsup fpv
        $('#value7').show();
        setRates( 
            [1,
            0.8,0.7,0.00,0,
            0.7,0,
            0.8,0.7,0.00,0]);
        break

        case '8': //Nytfury FPV
        $('#value8').show();
        setRates( 
            [1,
            0.92,0.56,0.28,0,
            0.56,0,
            0.63,0.39,0.07,0]);
        break

        /*
        case '9': //JohnEFly
        $('#value9').show();
        setRates( 
            [1,
            1,0.55,0.1,0,
            0.55,0,
            1,0.7,0,0]);
        break
        case '10': //gabe b.
        $('#value10').show();
        setRates( 
            [1,
            0.71,0.73,0.1,0,
            0.73,0,
            0.71,0.73,0,0]);
        break
        case '11': //noical
        $('#value11').show();
        setRates( 
            [1,
            1.55,0.42,0.23,0,
            0.42,0,
            1.55,0.42,0.23,0]);
        break
        */

        /*case '100': //my rates
        $('#value100').show();
        setRates( 
            [0,
            1.59,0.40,0.5,-0.3, 
            0.36,-.26,
            0.86,0.59,0.2,-0.3]);*/
        /*case '100': //my rates
        $('#value100').show();
        setRates( 
            [0,
            1.62,0.41,0.48,-0.25, 
            0.37,-.21,
            0.78,0.56,0.2,-0.3]);*/
        /*case '100': //my rates
        $('#value100').show();
        setRates( 
            [0,
            1.11,0.59,0.25,-0.25, 
            0.56,-.21,
            0.63,0.65,0.03,-0.25]);*/
        /*case '100': //my rates
        $('#value100').show();
        setRates( 
            [0,
            1.12,0.59,0.25,-0.25, 
            0.56,-.21,
            0.92,0.34,0.18,-0.25]);*/
            /*
        case '100': //my rates, high yaw
        $('#value100').show();
            setRates( 
            [0,
            1.63,0.32,0.46,-0.15, 
            0.30,-.13,
            1.13,0.46,0.20,-0.22]);
        break
        case '101': //my rates
        $('#value101').show();
        setRates( 
            [0,
            1.64,0.28,0.41,-0.15, 
            0.24,-.12,
            0.89,0.38,0.22,-0.32]);
        break
        case '102': //my rates
        $('#value102').show();
        setRates( 
            [0,
            0.91,0.62,0.0,-0.15, 
            0.47,-.11,
            0.91,0.62,0.0,-0.22]);
        break
        case '103': //my rates
        $('#value103').show();
        setRates( 
            [0,
            0.59,0.74,0.0,-0.4, 
            0.66,-.35,
            0.67,0.71,0.0,-0.4]);
        break
        case '104': //my rates
        $('#value104').show();
        setRates( 
            [0,
            1.48,0.36,0.41,-0.22, 
            0.27,-.15,
            0.67,0.71,0.0,-0.4]);
        break
        case '105': //my rates
        $('#value105').show();
        setRates( 
            [0,
            .53,0.8,0.0,-.22, 
            0.77,-.17,
            0.4,0.86,0.0,-0.4]);
        break
        case '106': //my rates
        $('#value106').show();
        setRates( 
            [0,
            1.71,0.37,0.70,-0.32, 
            0.35,-.27,
            0.32,0.89,0.0,-0.5]);
        break
        case '107': //my rates
        $('#value107').show();
        setRates( 
            [0,
            1.76,0.34,0.66,-0.2, 
            0.27,-.15,
            0.34,0.82,0.0,-0.5]);
        break
        case '108': //my rates
        $('#value108').show();
        setRates( 
            [0,
            1.72,0.33,0.61,-0.2, 
            0.31,-.15,
            0.49,0.75,0.0,-0.3]);
        break
        */
        case '109': //my rates 1
        $('#value109').show();
        setRates( 
            [0,
            0.95,0.63,0.31,-0.2, 
            0.61,-.16,
            0.49,0.75,0.0,-0.3]); //-25% throttle
        break
        case '110': //my rates 2
        $('#value110').show();
        setRates( 
            [0,
            0.69,0.75,0.0,-0.4, 
            0.74,-.35,
            0.49,0.80,0.0,-0.45]); //-20% throttle
    }
    doDraw=true;
    drawChart();
}