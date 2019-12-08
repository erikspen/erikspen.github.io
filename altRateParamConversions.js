
//Open TX expo function
var expo_otx_calc = function(rcCommand, expo_otx){
    if(expo_otx < 0){
        rcCommand = 1+expo_otx*(1-rcCommand)**3-(1-rcCommand)*(1+expo_otx)
    } else if(expo_otx > 0){
        rcCommand = expo_otx*rcCommand**3+rcCommand*(1-expo_otx)
    }
    return rcCommand
}

var updateRcRateNaturalScaling = function(expo_otx, Slope, Maxdeg, Shape){
    if (Maxdeg==0)
        return 0
    kotx=(expo_otx<=0)?(1-2*expo_otx):(1-expo_otx);
    minRcRate=Slope/kotx;
    maxRcRate=Maxdeg/200;
    rcRate = minRcRate*Shape+(1-Shape)*maxRcRate;
    return rcRate
}

var natural2StandardRcRate = function(rcRate){
    if (rcRate>2){
        rcRate=2+(rcRate-2)/15.54;
    }
    return Math.round(100*rcRate)/100;
}

var unAmplifiedRcRate = function(rcRate){
    if(rcRate > 2.0)
        rcRate = (50*rcRate)/777 + 1454/777;
    return Math.round(100*rcRate)/100
}

var amplifiedRcRate = function(rcRate){
    if(rcRate > 2.0)
        rcRate =rcRate+(rcRate-2)*14.54;
    return rcRate
}

var updateSuperRate = function(rcRate,Maxdeg){
    //must be real rcRate
    superRate = Math.max(0,1-200*rcRate/Maxdeg);
    return Math.round(100*superRate)/100
}

var updateExpo = function(rcRate,expo_otx,Slope){
    //must be real rcRate
    kotx=(expo_otx<=0)?(1-2*expo_otx):(1-expo_otx);
    expo = 1-Slope/(rcRate*kotx);
    return Math.round(100*expo)/100
}

var updateExpo_otx = function(rcRate,expo,Slope){
    //must be real rcRate
    expo_otx = 1-Slope/(rcRate*(1-expo));
    expo_otx = (expo_otx>0)?(expo_otx):(0.5*expo_otx);
    return Math.round(100*expo_otx)/100
}

var updateSlope = function(rcRate,expo,expo_otx){
    //must be real rcRate
    kotx=(expo_otx<=0)?(1-2*expo_otx):(1-expo_otx);
    Slope = rcRate*(1-expo)*kotx;
    return Slope
}

var updateMaxdeg = function(rcRate,superRate){
    //must be real rcRate
    Maxdeg = rcRate*200/(1-superRate);
    return Maxdeg
}

var updateShape = function(rcRate,expo_otx,Slope,Maxdeg){
    //must be real rcRate
    kotx=(expo_otx<=0)?(1-2*expo_otx):(1-expo_otx);
    minRcRate=Slope/kotx;
    maxRcRate=Maxdeg/200;
    Shape =(rcRate-maxRcRate)/(minRcRate-maxRcRate);
    return Shape
}
