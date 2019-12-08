 //Calculate rate curves

 var clamp = function(n, minn, maxn) {
    if(isNaN(n))
            n=0.5;
    return Math.max(Math.min(maxn, n), minn)
}

// BF rate calculation function
var bfcalc = function(rcCommand, rcRate, expo, superRate) {

    rcCommand=clamp(rcCommand,0,1);
    var absRcCommand = Math.abs(rcCommand);

    if(rcRate > 2.0)
        rcRate = rcRate + (14.54 * (rcRate - 2.0))

    if(expo != 0)
        rcCommand = rcCommand * Math.abs(rcCommand)**3 * expo + rcCommand * (1.0 - expo)

    angleRate = 200.0 * rcRate * rcCommand;
    if(superRate != 0){
        rcSuperFactor = 1.0 / (clamp(1.0 - absRcCommand * (superRate), 0.01, 1.00))
        angleRate *= rcSuperFactor
    }

    return angleRate
}

//Race flight
var rfcalc = function(rcCommand, rcRate, expo, superRate) {

    rcCommand=clamp(rcCommand,0,1);
    angleRate = ((1 + 0.01 * expo * (rcCommand * rcCommand - 1.0)) * rcCommand)
    angleRate = (angleRate * (rcRate + (Math.abs(angleRate) * rcRate * superRate * 0.01)))

    return angleRate
}

// Curve derivates-----------------------------------------------------------


//First derivative, betaflight
var bfD1 = function(rcCommand, rcRate, expo, superRate, expo_otx) {

    rcCommand=clamp(rcCommand,0,1);
    var absRcCommand = Math.abs(rcCommand);

    if(rcRate > 2.0)
        rcRate = rcRate + (14.54 * (rcRate - 2.0))

    if (expo_otx==0){
        angleRateD1 = -(200*rcRate*(3*expo*superRate*rcCommand**4 - 4*expo*rcCommand**3 + expo - 1))/(rcCommand*superRate - 1)**2;
    } else if (expo_otx<0){
        angleRateD1 = (200*rcRate*((expo - 1)*(expo_otx - 3*expo_otx*(rcCommand - 1)**2 + 1) - 4*expo*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1)**3*(expo_otx - 3*expo_otx*(rcCommand - 1)**2 + 1)))/(superRate*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1) - 1) - (200*rcRate*superRate*((expo - 1)*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1) - expo*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1)**4)*(expo_otx - 3*expo_otx*(rcCommand - 1)**2 + 1))/(superRate*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1) - 1)**2;
    } else {
        angleRateD1 = (200*rcRate*superRate*((- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand)*(expo - 1) + expo*(- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand)**4)*(3*expo_otx*rcCommand**2 - expo_otx + 1))/(superRate*(rcCommand*(expo_otx - 1) - expo_otx*rcCommand**3) + 1)**2 - (200*rcRate*((expo - 1)*(3*expo_otx*rcCommand**2 - expo_otx + 1) + 4*expo*(- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand)**3*(3*expo_otx*rcCommand**2 - expo_otx + 1)))/(superRate*(- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand) + 1);
    }

    return angleRateD1
}

//Second derivative, betaflight
var bfD2 = function(rcCommand, rcRate, expo, superRate, expo_otx) {

    rcCommand=clamp(rcCommand,0,1);
    var absRcCommand = Math.abs(rcCommand);

    if(rcRate > 2.0)
        rcRate = rcRate + (14.54 * (rcRate - 2.0))

    if (expo_otx==0){
        angleRateD2 = -(400*rcRate*(superRate - expo*superRate + 6*expo*rcCommand**2 - 8*expo*rcCommand**3*superRate + 3*expo*rcCommand**4*superRate**2))/(rcCommand*superRate - 1)**3;
    } else if (expo_otx<0){
        angleRateD2 = (400*rcRate*superRate**2*((expo - 1)*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1) - expo*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1)**4)*(expo_otx - 3*expo_otx*(rcCommand - 1)**2 + 1)**2)/(superRate*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1) - 1)**3 - (400*rcRate*superRate*((expo - 1)*(expo_otx - 3*expo_otx*(rcCommand - 1)**2 + 1) - 4*expo*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1)**3*(expo_otx - 3*expo_otx*(rcCommand - 1)**2 + 1))*(expo_otx - 3*expo_otx*(rcCommand - 1)**2 + 1))/(superRate*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1) - 1)**2 - (200*rcRate*(12*expo*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1)**2*(expo_otx - 3*expo_otx*(rcCommand - 1)**2 + 1)**2 + 3*expo_otx*(2*rcCommand - 2)*(expo - 1) - 12*expo*expo_otx*(2*rcCommand - 2)*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1)**3))/(superRate*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1) - 1) + (600*expo_otx*rcRate*superRate*(2*rcCommand - 2)*((expo - 1)*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1) - expo*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1)**4))/(superRate*((expo_otx + 1)*(rcCommand - 1) - expo_otx*(rcCommand - 1)**3 + 1) - 1)**2;
    } else {
        angleRateD2 = (400*rcRate*superRate**2*((- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand)*(expo - 1) + expo*(- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand)**4)*(3*expo_otx*rcCommand**2 - expo_otx + 1)**2)/(superRate*(rcCommand*(expo_otx - 1) - expo_otx*rcCommand**3) + 1)**3 - (200*rcRate*(6*expo_otx*rcCommand*(expo - 1) - 12*expo*(- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand)**2*(3*expo_otx*rcCommand**2 - expo_otx + 1)**2 + 24*expo*expo_otx*rcCommand*(- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand)**3))/(superRate*(- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand) + 1) - (400*rcRate*superRate*((expo - 1)*(3*expo_otx*rcCommand**2 - expo_otx + 1) + 4*expo*(- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand)**3*(3*expo_otx*rcCommand**2 - expo_otx + 1))*(3*expo_otx*rcCommand**2 - expo_otx + 1))/(superRate*(rcCommand*(expo_otx - 1) - expo_otx*rcCommand**3) + 1)**2 + (1200*expo_otx*rcCommand*rcRate*superRate*((- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand)*(expo - 1) + expo*(- expo_otx*rcCommand**3 + (expo_otx - 1)*rcCommand)**4))/(superRate*(rcCommand*(expo_otx - 1) - expo_otx*rcCommand**3) + 1)**2;
    }

    return angleRateD2
}

//First derivative, rf
var rfD1 = function(rcCommand, rcRate, expo, superRate) {

    rcCommand=clamp(rcCommand,0,1);
    angleRateD1 = (rcRate*(3*expo*rcCommand**2-expo+100)*(100*rcCommand*superRate+expo*rcCommand**3*superRate-expo*rcCommand*superRate+5000))/500000;

    return angleRateD1
}

//Second derivative, rf
var rfD2 = function(rcCommand, rcRate, expo, superRate) {

    rcCommand=clamp(rcCommand,0,1);
    angleRateD2 = (rcRate*(15*superRate*expo**2*rcCommand**4-12*superRate*expo**2*rcCommand**2+superRate*expo**2+1200*superRate*expo*rcCommand**2+30000*expo*rcCommand-200*superRate*expo+10000*superRate))/500000;

    return angleRateD2
}
