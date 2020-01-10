
//---------------------------------------------------------------------------------------
//Most basic conversion Betaflight <--> Race flight.
//Matches intial slope perfectly (1st & 2nd derivative) and max deg/s

//Race flight --> Betaflight
var rcConvert1 = function(rcRate_rf, expo_rf, superRate_rf, expo_otx,fittype) {

    if (expo_otx==0){
        rcRate = (rcRate_rf*(superRate_rf + 100)*(expo_rf*superRate_rf - 100*superRate_rf + 10000))/200000000;
        superRate = -(superRate_rf*(expo_rf - 100))/10000;
        expo = (10000*expo_rf + 100*expo_rf*superRate_rf + expo_rf*superRate_rf**2 - 100*superRate_rf**2)/((superRate_rf + 100)*(expo_rf*superRate_rf - 100*superRate_rf + 10000));
    } else if (expo_otx<0){
        rcRate = (rcRate_rf*(superRate_rf + 100)*(expo_rf*superRate_rf - 100*superRate_rf - 10000*expo_otx + 200*expo_otx*superRate_rf + 40000*expo_otx**2 - 2*expo_rf*expo_otx*superRate_rf + 10000))/(200000000*(2*expo_otx - 1)**2);
        superRate = -(30000*expo_otx - 100*superRate_rf + expo_rf*superRate_rf + 200*expo_otx*superRate_rf - 2*expo_rf*expo_otx*superRate_rf)/(10000*(2*expo_otx - 1)**2);
        expo = (10000*expo_rf + 1000000*expo_otx - 20000*expo_rf*expo_otx + 100*expo_rf*superRate_rf + 10000*expo_otx*superRate_rf + expo_rf*superRate_rf**2 + 200*expo_otx*superRate_rf**2 + 40000*expo_otx**2*superRate_rf + 4000000*expo_otx**2 - 100*superRate_rf**2 - 200*expo_rf*expo_otx*superRate_rf - 2*expo_rf*expo_otx*superRate_rf**2)/((superRate_rf + 100)*(expo_rf*superRate_rf - 100*superRate_rf - 10000*expo_otx + 200*expo_otx*superRate_rf + 40000*expo_otx**2 - 2*expo_rf*expo_otx*superRate_rf + 10000));
    } else {
        rcRate = (rcRate_rf*(superRate_rf + 100)*(10000*expo_otx + 100*superRate_rf - expo_rf*superRate_rf - 10000))/(200000000*(expo_otx - 1));
        superRate = (superRate_rf*(expo_rf - 100))/(10000*(expo_otx - 1));
        expo = -(10000*expo_rf - 1000000*expo_otx + 100*expo_rf*superRate_rf - 10000*expo_otx*superRate_rf + expo_rf*superRate_rf**2 - 100*superRate_rf**2)/((superRate_rf + 100)*(10000*expo_otx + 100*superRate_rf - expo_rf*superRate_rf - 10000));
    }

    if (rcRate<0 || rcRate>12.6142 || superRate<0 || superRate>1 || expo<0 || expo>1){
        return rcConvert11(rcRate_rf, expo_rf, superRate_rf, expo_otx,1);
    } else {
        return [rcRate,superRate,expo]
    } 
}

//Betaflight --> Race flight
var rcConvert2 = function(rcRate, superRate, expo, expo_otx,fittype) {

    rcRate=amplifiedRcRate(rcRate);
    superRate=clamp(superRate,0.000001,1);

    if (expo_otx==0){
        rcRate_rf = -(100*rcRate*(expo + superRate - expo*superRate + ((expo - 1)*(superRate - 1)*(3*superRate - expo + expo*superRate + 1))**(1/2) - 1))/(superRate*(superRate - 1));
        superRate_rf = (50*expo + 50*superRate - 50*expo*superRate + 50*((expo - 1)*(superRate - 1)*(3*superRate - expo + expo*superRate + 1))**(1/2) - 50)/((expo - 1)*(superRate - 1));
        expo_rf = 50*expo + 50*superRate - 50*expo*superRate - 50*((expo - 1)*(superRate - 1)*(3*superRate - expo + expo*superRate + 1))**(1/2) + 50;
    } else if (expo_otx<0){
        rcRate_rf = (100*rcRate*(2*expo_otx - 1)*(expo + 2*expo_otx + superRate - 2*expo*expo_otx - expo*superRate - 2*expo_otx*superRate + ((expo - 1)*(superRate - 1)*(8*expo_otx - expo + 3*superRate + 4*expo*expo_otx + expo*superRate - 12*expo_otx*superRate - 4*expo*expo_otx**2 + 12*expo_otx**2*superRate + 4*expo_otx**2 - 4*expo*expo_otx*superRate + 4*expo*expo_otx**2*superRate + 1))**(1/2) + 2*expo*expo_otx*superRate - 1))/((superRate - 1)*(3*expo_otx + superRate - 4*expo_otx*superRate + 4*expo_otx**2*superRate));
        superRate_rf = -(50*expo + 100*expo_otx + 50*superRate - 100*expo*expo_otx - 50*expo*superRate - 100*expo_otx*superRate + 50*((expo - 1)*(superRate - 1)*(8*expo_otx - expo + 3*superRate + 4*expo*expo_otx + expo*superRate - 12*expo_otx*superRate - 4*expo*expo_otx**2 + 12*expo_otx**2*superRate + 4*expo_otx**2 - 4*expo*expo_otx*superRate + 4*expo*expo_otx**2*superRate + 1))**(1/2) + 100*expo*expo_otx*superRate - 50)/((2*expo_otx - 1)*(expo - 1)*(superRate - 1));
        expo_rf = 50*expo + 100*expo_otx + 50*superRate - 100*expo*expo_otx - 50*expo*superRate - 100*expo_otx*superRate - 50*((expo - 1)*(superRate - 1)*(8*expo_otx - expo + 3*superRate + 4*expo*expo_otx + expo*superRate - 12*expo_otx*superRate - 4*expo*expo_otx**2 + 12*expo_otx**2*superRate + 4*expo_otx**2 - 4*expo*expo_otx*superRate + 4*expo*expo_otx**2*superRate + 1))**(1/2) + 100*expo*expo_otx*superRate + 50;
    } else {
        rcRate_rf = -(100*rcRate*(expo + superRate - expo*superRate + ((expo - 1)*(superRate - 1)*(3*superRate - expo + expo*superRate + 1))**(1/2) - 1))/(superRate*(superRate - 1));
        superRate_rf = (50*expo + 50*superRate - 50*expo*superRate + 50*((expo - 1)*(superRate - 1)*(3*superRate - expo + expo*superRate + 1))**(1/2) - 50)/((expo - 1)*(superRate - 1));
        expo_rf = 50*expo + 50*expo_otx + 50*superRate - 50*expo*expo_otx - 50*expo*superRate - 50*expo_otx*superRate + 50*expo_otx*((expo - 1)*(superRate - 1)*(3*superRate - expo + expo*superRate + 1))**(1/2) - 50*((expo - 1)*(superRate - 1)*(3*superRate - expo + expo*superRate + 1))**(1/2) + 50*expo*expo_otx*superRate + 50;
    }

    if (rcRate_rf<=0 || rcRate_rf>2500 || superRate_rf<0 || expo_rf<0 || expo_rf>100){
        return rcConvert22(rcRate_rf, expo_rf, superRate_rf, expo_otx,1);
    } else {
        return [rcRate_rf,superRate_rf,expo_rf]
    }

}

//Race flight --> Betaflight, iterative
var rcConvert11 = function(rcRate_rf, expo_rf, superRate_rf, expo_otx,fittype) {
    var error_1=0;
    var error_2=-1;
    var rcRate_f=1;
    var super_f=0;
    diffType=0;
    var w, dr, drmax1;
    var drmax2=-1;
    switch (fittype){
            case '3':
            rscale=1.1;
            break
            case '4':
            rscale=2;
            break
            case '5':
            rscale=2;
            diffType=1;
            break
            default:
            rscale=1.0;
    }
    
    for (var expo_i = 0.00; expo_i < 1; expo_i+=0.01){
        
            if (expo_otx==0){
                rcRate_MAX = rscale*(rcRate_rf*(expo_rf - 100))/(100*(200*expo_i - 200));
                rcRate_MIN = (2-rscale)*(rcRate_rf*(expo_rf - 100))/(100*(200*expo_i - 200));
            } else if (expo_otx<0){
                rcRate_MAX = -rscale*(rcRate_rf*(expo_rf - 100))/(20000*(2*expo_otx - 1)*(expo_i - 1));
                rcRate_MIN = -(2-rscale)*(rcRate_rf*(expo_rf - 100))/(20000*(2*expo_otx - 1)*(expo_i - 1));
            } else {
                rcRate_MAX = -rscale*(rcRate_rf*(expo_rf - 100))/(20000*(expo_i - 1)*(expo_otx - 1));
                rcRate_MIN = -(2-rscale)*(rcRate_rf*(expo_rf - 100))/(20000*(expo_i - 1)*(expo_otx - 1));
            }
            rcRate_MAX=Math.round(100*natural2StandardRcRate(rcRate_MAX))/100;
            rcRate_MAX=clamp(rcRate_MAX,0.01,3.0);
            rcRate_MIN=Math.round(100*natural2StandardRcRate(rcRate_MIN))/100;
            rcRate_MIN=clamp(rcRate_MIN,0.01,rcRate_MAX);

            for (var rcRate=rcRate_MIN; rcRate<=rcRate_MAX; rcRate+=0.01){

                rcRate_u=amplifiedRcRate(rcRate);
                superRate = Math.round(100*(1-(20000*rcRate_u)/(rcRate_rf*(superRate_rf + 100))))/100;

                for (var superOffset=-0.05; superOffset<=0.12; superOffset+=0.01){
                    if (superRate+superOffset<1 && superRate+superOffset>=0){
                        error_1=0;
                        drmax1=0;

                        if (diffType==0){
                            for (var p=0.01; p<=1+.0005; p+=0.01){
                                w=(fittype==1)?(1-p)**2/p:(1);
                                dr=Math.abs(bfcalc(expo_otx_calc(p,expo_otx), rcRate, expo_i, superRate+superOffset)-rfcalc(p, rcRate_rf, expo_rf, superRate_rf));
                                error_1 +=  w*dr;
                            }
                        } else {
                            var dr_sgn, dr_sgn_last=0, dr_last=-1;
                            for (var p=0.01; p<=1+.0005; p+=0.01){
                                dr=Math.abs(bfcalc(expo_otx_calc(p,expo_otx), rcRate, expo_i, superRate+superOffset)-rfcalc(p, rcRate_rf, expo_rf, superRate_rf));
                                if (dr>drmax1)
                                    drmax1=dr;
                                dr_sgn=Math.sign(dr-dr_last);
                                if (dr_last != -1 && dr_sgn_last != dr_sgn && dr_sgn == -1){
                                    for (var pp=Math.min(p-0.02+0.005,0.005); pp<Math.min(p+0.01,1); pp+=0.005){
                                        drr=Math.abs(bfcalc(expo_otx_calc(pp,expo_otx), rcRate, expo_i, superRate+superOffset)-rfcalc(pp, rcRate_rf, expo_rf, superRate_rf));
                                        if (drr>drmax1)
                                            drmax1=drr;
                                    }
                                }
                                dr_last=dr;
                                dr_sgn_last=dr_sgn;
                            }
                            /*if (Math.round(100*rcRate)/100==2.3 && Math.round(100*expo_i)/100==.8){
                                console.log(superRate+superOffset)
                                console.log(drmax1)
                            }*/
                        }

                        if (diffType==0 && ( error_2==-1 || error_1 < error_2 )){
                            expo=expo_i;
                            rcRate_f=rcRate_u;
                            super_f=superRate+superOffset;
                            error_2=error_1;
                        } else if (diffType==1 && (drmax2==-1 || drmax1 < drmax2)){
                            expo=expo_i;
                            rcRate_f=rcRate_u;
                            super_f=superRate+superOffset;
                            drmax2=drmax1;
                        }
                    }
                }
            }
            if (rscale==1)
                break
    }
    
    return [rcRate_f,super_f,expo]
}

//Betaflight --> Betaflight, iterative
//Example: rcConvert12(0.95, 0.61, 0.31, -0.16,-0.2,'3'), gives closest betaflight fit for -.16 open-tx expo to -.2 expo
var rcConvert12 = function(rcRate_fixed, superRate_fixed, expo_fixed, expo_otx_fixed,expo_otx,fittype) {
    var error_1=0;
    var error_2=-1;
    var rcRate_f=1;
    var super_f=0;
    diffType=0;
    var w, dr, drmax1;
    var drmax2=-1;
    switch (fittype){
            case '3':
            rscale=1.1;
            break
            case '4':
            rscale=2;
            break
            case '5':
            rscale=2;
            diffType=1;
            break
            default:
            rscale=1.0;
    }

    
    for (var expo_i = 0.00; expo_i < 1; expo_i+=0.01){

            rcRate_u=amplifiedRcRate(rcRate_fixed);
            superRate_fixed=clamp(superRate_fixed,0.000001,1);
        
            kotx_fixed=(expo_otx_fixed<=0)?(1-2*expo_otx_fixed):(1-expo_otx_fixed);
            kotx_new=(expo_otx<=0)?(1-2*expo_otx):(1-expo_otx);
            rcRate_MAX = rscale*rcRate_u*(1-expo_i)*kotx_fixed/kotx_new;
            rcRate_MIN = (2-rscale)*rcRate_u*(1-expo_i)*kotx_fixed/kotx_new; //
        
            rcRate_MAX=Math.round(100*natural2StandardRcRate(rcRate_MAX))/100;
            rcRate_MAX=clamp(rcRate_MAX,0.01,3.0);
            rcRate_MIN=Math.round(100*natural2StandardRcRate(rcRate_MIN))/100;
            rcRate_MIN=clamp(rcRate_MIN,0.01,rcRate_MAX);

            for (var rcRate=rcRate_MIN; rcRate<=rcRate_MAX; rcRate+=0.01){

                rcRate_u=amplifiedRcRate(rcRate);
                superRate = updateSuperRate(rcRate,updateMaxdeg(amplifiedRcRate(rcRate_fixed),superRate_fixed));

                for (var superOffset=-0.05; superOffset<=0.12; superOffset+=0.01){
                    if (superRate+superOffset<1 && superRate+superOffset>=0){
                        error_1=0;
                        drmax1=0;

                        if (diffType==0){
                            for (var p=0.01; p<=1+.0005; p+=0.01){
                                w=(fittype==1)?(1-p)**2/p:(1);
                                dr=Math.abs(bfcalc(expo_otx_calc(p,expo_otx), rcRate, expo_i, superRate+superOffset)-bfcalc(expo_otx_calc(p,expo_otx_fixed), rcRate_fixed, expo_fixed, superRate_fixed));
                                error_1 +=  w*dr;
                            }
                        } else {
                            var dr_sgn, dr_sgn_last=0, dr_last=-1;
                            for (var p=0.01; p<=1+.0005; p+=0.01){
                                dr=Math.abs(bfcalc(expo_otx_calc(p,expo_otx), rcRate, expo_i, superRate+superOffset)-bfcalc(expo_otx_calc(p,expo_otx_fixed), rcRate_fixed, expo_fixed, superRate_fixed));
                                if (dr>drmax1)
                                    drmax1=dr;
                                dr_sgn=Math.sign(dr-dr_last);
                                if (dr_last != -1 && dr_sgn_last != dr_sgn && dr_sgn == -1){
                                    for (var pp=Math.min(p-0.02+0.005,0.005); pp<Math.min(p+0.01,1); pp+=0.005){
                                        drr=Math.abs(bfcalc(expo_otx_calc(pp,expo_otx), rcRate, expo_i, superRate+superOffset)-bfcalc(expo_otx_calc(p,expo_otx_fixed), rcRate_fixed, expo_fixed, superRate_fixed));
                                        if (drr>drmax1)
                                            drmax1=drr;
                                    }
                                }
                                dr_last=dr;
                                dr_sgn_last=dr_sgn;
                            }
                            /*if (Math.round(100*rcRate)/100==2.3 && Math.round(100*expo_i)/100==.8){
                                console.log(superRate+superOffset)
                                console.log(drmax1)
                            }*/
                        }

                        if (diffType==0 && ( error_2==-1 || error_1 < error_2 )){
                            expo=expo_i;
                            rcRate_f=rcRate_u;
                            super_f=superRate+superOffset;
                            error_2=error_1;
                        } else if (diffType==1 && (drmax2==-1 || drmax1 < drmax2)){
                            expo=expo_i;
                            rcRate_f=rcRate_u;
                            super_f=superRate+superOffset;
                            drmax2=drmax1;
                        }
                    }
                }
            }
            if (rscale==1)
                break
    }
    
    return [rcRate_f,super_f,expo]
}

//Betaflight --> Race flight, iterative
var rcConvert22 = function(rcRate, superRate, expo, expo_otx,fittype) {

    rcRate_u=amplifiedRcRate(rcRate);
    superRate=clamp(superRate,0.000001,1);

    var error_1=0;
    var error_2=-1;
    var rcRate_rf_f=1;
    var super_f=0;
    diffType=0;
    var w, dr, drmax1;
    var drmax2=-1;
    
    
    switch (fittype){
            case '3':
            rscale=1.1;
            break
            case '4':
            rscale=2;
            break
            case '5':
            rscale=2;
            diffType=1;
            break
            default:
            rscale=1.0;
    }
    
    
    for (var expo_rf_i = 0.00; expo_rf_i < 100; expo_rf_i+=1){

        if (expo_otx==0){
            rcRate_rf_MAX = rscale*(20000*rcRate_u*(expo - 1))/(expo_rf_i - 100);
            rcRate_rf_MIN = (2-rscale)*(20000*rcRate_u*(expo - 1))/(expo_rf_i - 100);
        } else if (expo_otx<0){
            rcRate_rf_MAX = -rscale*(20000*rcRate_u*(2*expo_otx - 1)*(expo - 1))/(expo_rf_i - 100);
            rcRate_rf_MIN = -(2-rscale)*(20000*rcRate_u*(2*expo_otx - 1)*(expo - 1))/(expo_rf_i - 100);
        } else {
            rcRate_rf_MAX = -rscale*(20000*rcRate_u*(expo - 1)*(expo_otx - 1))/(expo_rf_i - 100);
            rcRate_rf_MIN = -(2-rscale)*(20000*rcRate_u*(expo - 1)*(expo_otx - 1))/(expo_rf_i - 100);
        }
        rcRate_rf_MAX=Math.round(clamp(rcRate_rf_MAX,1,2500));
        rcRate_rf_MIN=Math.round(clamp(rcRate_rf_MIN,1,rcRate_rf_MAX));
        
        for (var rcRate_rf=rcRate_rf_MIN; rcRate_rf<=rcRate_rf_MAX; rcRate_rf+=1){
            
            superRate_rf = Math.round(-(100*(rcRate_rf + (200*rcRate_u)/(superRate - 1)))/rcRate_rf);

            for (var superOffset=-14; superOffset<=5; superOffset+=1){
                if (superRate_rf+superOffset>0){
                    error_1=0;
                    drmax1=0;
                    if (diffType==0){
                        for (var p=0.01; p<=1+.0005; p+=0.01){
                            w=(fittype==1)?(1-p)**2/p:(1);
                            dr=Math.abs(bfcalc(expo_otx_calc(p,expo_otx), rcRate, expo, superRate)-rfcalc(p, rcRate_rf, expo_rf_i, superRate_rf+superOffset));
                            error_1 +=  w*dr;
                        }
                    } else {
                        var dr_sgn, dr_sgn_last=0, dr_last=-1;
                        for (var p=0.01; p<=1+.0005; p+=0.01){
                            dr=Math.abs(bfcalc(expo_otx_calc(p,expo_otx), rcRate, expo, superRate)-rfcalc(p, rcRate_rf, expo_rf_i, superRate_rf+superOffset));
                            if (dr>drmax1)
                                drmax1=dr;
                            dr_sgn=Math.sign(dr-dr_last);
                            if (dr_last != -1 && dr_sgn_last != dr_sgn && dr_sgn == -1){
                                for (var pp=p-0.02+0.005; pp<p+0.01; pp+=0.005){
                                    drr=Math.abs(bfcalc(expo_otx_calc(pp,expo_otx), rcRate, expo, superRate)-rfcalc(pp, rcRate_rf, expo_rf_i, superRate_rf+superOffset));
                                    if (drr>drmax1)
                                        drmax1=drr;
                                }
                            }
                            dr_last=dr;
                            dr_sgn_last=dr_sgn;
                        }
                        /*if (expo_rf_i==66 && superRate_rf+superOffset == 114 && rcRate_rf==631){
                            console.log(rcRate)
                            console.log(drmax1)
                        }*/
                    }
                    if (diffType==0 && ( error_2==-1 || error_1 < error_2 )){
                        expo_rf=expo_rf_i;
                        rcRate_rf_f=rcRate_rf;
                        super_f=superRate_rf+superOffset;
                        error_2=error_1;
                    } else if (diffType==1 && (drmax2==-1 || drmax1 < drmax2)){
                        expo_rf=expo_rf_i;
                        rcRate_rf_f=rcRate_rf;
                        super_f=superRate_rf+superOffset;
                        drmax2=drmax1;
                    }
                }

            }
            if (rscale==1)
                break
        }
    }

    return [rcRate_rf_f,super_f,expo_rf]
}

//Button callbacks, error calcs (extra, not used)
var convertRoll = function(){
    var curveFunc;
    var fittype=$('#r2b')[0].value;
    if (fittype==0){
        curveFunc=rcConvert1;
    } else {
        curveFunc=rcConvert11;
    }
    toBf = curveFunc(rfRateSet[0], rfRateSet[1], rfRateSet[2], clamp(parseFloat($('#otxNegExpo1').val(), 10),-1,0.999),fittype);
    $('#bfRate1').val(clamp(natural2StandardRcRate(toBf[0]),0,2.40)).change();
    $('#bfExpo1').val(clamp(Math.round(toBf[2]*100)/100,-0.01,1)).change();
    $('#bfSuper1').val(clamp(Math.round(toBf[1]*100)/100,0,1)).change();
    $('#bfRateSlider1').val(clamp(natural2StandardRcRate(toBf[0]),0,2.40)).change();
    $('#bfExpoSlider1').val(clamp(toBf[2],-0.01,1)).change();
    $('#bfSuperSlider1').val(clamp(toBf[1],0,1)).change();
    drawChart(0);
}

var convertPitch = function(){
    var curveFunc;
    var fittype=$('#r2b')[0].value;
    if (fittype==0){
        curveFunc=rcConvert1;
    } else {
        curveFunc=rcConvert11;
    }
    toBf = curveFunc(rfRateSet[0], rfRateSet[1], rfRateSet[2], clamp(parseFloat($('#otxNegExpo2').val(), 10),-1,0.999),fittype);
    $('#bfRate2').val(clamp(natural2StandardRcRate(toBf[0]),0,2.40)).change();
    $('#bfExpo2').val(clamp(Math.round(toBf[2]*100)/100,-0.01,1)).change();
    $('#bfSuper2').val(clamp(Math.round(toBf[1]*100)/100,0,1)).change();
    $('#bfRateSlider2').val(clamp(natural2StandardRcRate(toBf[0]),0,2.40)).change();
    $('#bfExpoSlider2').val(clamp(toBf[2],-0.01,1)).change();
    $('#bfSuperSlider2').val(clamp(toBf[1],0,1)).change();
    drawChart(0);
}

var convertYaw = function(){
    var curveFunc;
    var fittype=$('#r2b')[0].value;
    if (fittype==0){
        curveFunc=rcConvert1;
    } else {
        curveFunc=rcConvert11;
    }
    toBf = curveFunc(rfRateSet[0], rfRateSet[1], rfRateSet[2], clamp(parseFloat($('#otxNegExpo3').val(), 10),-1,0.999),fittype);
    $('#bfRate3').val(clamp(natural2StandardRcRate(toBf[0]),0,2.40)).change();
    $('#bfExpo3').val(clamp(Math.round(toBf[2]*100)/100,-0.01,1)).change();
    $('#bfSuper3').val(clamp(Math.round(toBf[1]*100)/100,0,1)).change();
    $('#bfRateSlider3').val(clamp(natural2StandardRcRate(toBf[0]),0,2.40)).change();
    $('#bfExpoSlider3').val(clamp(toBf[2],-0.01,1)).change();
    $('#bfSuperSlider3').val(clamp(toBf[1],0,1)).change();
    drawChart(0);
} 

//to raceflight
var convertRoll2RF = function(){
    var curveFunc;
    var fittype=$('#b2r')[0].value;
    if (fittype==0){
        curveFunc=rcConvert2;
    } else {
        curveFunc=rcConvert22;
    }
    toRf = curveFunc(parseFloat($('#bfRate1').val(), 10), parseFloat($('#bfSuper1').val(), 10), parseFloat($('#bfExpo1').val(), 10), clamp(parseFloat($('#otxNegExpo1').val(), 10),-1,0.999),fittype);
    $('#rfRate').val(Math.round(toRf[0])).change();
    $('#rfSuper').val(Math.round(toRf[1])).change();
    $('#rfExpo').val(Math.round(toRf[2])).change();
    drawChart(0);
}

var convertPitch2RF = function(){
    var curveFunc;
    var fittype=$('#b2r')[0].value;
    if (fittype==0){
        curveFunc=rcConvert2;
    } else {
        curveFunc=rcConvert22;
    }
    toRf = curveFunc(parseFloat($('#bfRate2').val(), 10), parseFloat($('#bfSuper2').val(), 10), parseFloat($('#bfExpo2').val(), 10), clamp(parseFloat($('#otxNegExpo2').val(), 10),-1,0.999),fittype);
    $('#rfRate').val(Math.round(toRf[0])).change();
    $('#rfSuper').val(Math.round(toRf[1])).change();
    $('#rfExpo').val(Math.round(toRf[2])).change();
    drawChart(0);
}

var convertYaw2RF = function(){
    var curveFunc;
    var fittype=$('#b2r')[0].value;
    if (fittype==0){
        curveFunc=rcConvert2;
    } else {
        curveFunc=rcConvert22;
    }
    toRf = curveFunc(parseFloat($('#bfRate3').val(), 10), parseFloat($('#bfSuper3').val(), 10), parseFloat($('#bfExpo3').val(), 10), clamp(parseFloat($('#otxNegExpo3').val(), 10),-1,0.999),fittype);
    $('#rfRate').val(Math.round(toRf[0])).change();
    $('#rfSuper').val(Math.round(toRf[1])).change();
    $('#rfExpo').val(Math.round(toRf[2])).change();
    drawChart(0);
}

//fit error calc
var rollError = function(dp){
    if (!dp)
        dp=.0005;
    var errorSum=0
    var error_i;
    var rcRate=parseFloat($('#bfRate1').val(), 10);
    var expo=parseFloat($('#bfExpo1').val(), 10);
    var superRate=parseFloat($('#bfSuper1').val(), 10);
    var expo_otx=clamp(parseFloat($('#otxNegExpo1').val(), 10),-1,0.999);

    max_error=0;
    for (var p=0.0; p<=1; p+=dp){
        error_i =  Math.abs(bfcalc(expo_otx_calc(p,expo_otx),rcRate , expo, superRate)-rfcalc(p, rfRateSet[0], rfRateSet[1], rfRateSet[2]));
        errorSum += error_i;
        if (error_i>max_error)
            max_error=error_i;
    }
    if (dp==.0005){
        console.log('Average error over 2000 pts:')
        console.log(errorSum*dp)
        console.log('Maximum error over 2000 pts:')
        console.log(max_error)
    }
    return max_error
}

var yawError = function(dp){
    if (!dp)
        dp=.0005;
    var errorSum=0
    var error_i;
    var rcRate=parseFloat($('#bfRate3').val(), 10);
    var expo=parseFloat($('#bfExpo3').val(), 10);
    var superRate=parseFloat($('#bfSuper3').val(), 10);
    var expo_otx=clamp(parseFloat($('#otxNegExpo3').val(), 10),-1,0.999);

    max_error=0;
    for (var p=0.0; p<=1; p+=dp){
        error_i =  Math.abs(bfcalc(expo_otx_calc(p,expo_otx), rcRate , expo, superRate)-rfcalc(p, rfRateSet[0], rfRateSet[1], rfRateSet[2]));
        errorSum += error_i;
        if (error_i>max_error)
            max_error=error_i;
    }
    if (dp==.0005){
        console.log('Average error over 2000 pts:')
        console.log(errorSum/2000)
        console.log('Maximum error over 2000 pts:')
        console.log(max_error)
    }
    return max_error
}

//OpenTX open adds little to nothing, contrary to what I once thought.  This function converts from one OpenTX setting to another,
//showing that almost any (reasonable) Open-Tx expo setting can be closely matched to another that does not use expo.
var changeExpo = function(oex1,oex2,oex3){


    bfRate = clamp(parseFloat($('#bfRate1').val(), 10),0,2.40);
    bfExpo = clamp(parseFloat($('#bfExpo1').val(), 10),-0.01,1);
    bfSuper = clamp(parseFloat($('#bfSuper1').val(), 10),0,1);
    otxNegExpo = clamp(parseFloat($('#otxNegExpo1').val(), 10),-1,0.999);

    console.log('----Middle fit (average error) is best----')
    console.log('Roll>>>')
    newRates=rcConvert12(bfRate, bfSuper, bfExpo, otxNegExpo,oex1,'3')
    console.log(newRates)
    newRates=rcConvert12(bfRate, bfSuper, bfExpo, otxNegExpo,oex1,'4')
    console.log(newRates)
    newRates=rcConvert12(bfRate, bfSuper, bfExpo, otxNegExpo,oex1,'5')
    console.log(newRates)

    bfRate = clamp(parseFloat($('#bfRate2').val(), 10),0,2.40);
    bfExpo = clamp(parseFloat($('#bfExpo2').val(), 10),-0.01,1);
    bfSuper = clamp(parseFloat($('#bfSuper2').val(), 10),0,1);
    otxNegExpo = clamp(parseFloat($('#otxNegExpo2').val(), 10),-1,0.999);

    console.log('Pitch>>>')
    newRates=rcConvert12(bfRate, bfSuper, bfExpo, otxNegExpo,oex1,'3')
    console.log(newRates)
    newRates=rcConvert12(bfRate, bfSuper, bfExpo, otxNegExpo,oex1,'4')
    console.log(newRates)
    newRates=rcConvert12(bfRate, bfSuper, bfExpo, otxNegExpo,oex1,'5')
    console.log(newRates)

    bfRate = clamp(parseFloat($('#bfRate3').val(), 10),0,2.40);
    bfExpo = clamp(parseFloat($('#bfExpo3').val(), 10),-0.01,1);
    bfSuper = clamp(parseFloat($('#bfSuper3').val(), 10),0,1);
    otxNegExpo = clamp(parseFloat($('#otxNegExpo3').val(), 10),-1,0.999);

    console.log('Yaw>>>')
    newRates=rcConvert12(bfRate, bfSuper, bfExpo, otxNegExpo,oex1,'3')
    console.log(newRates)
    newRates=rcConvert12(bfRate, bfSuper, bfExpo, otxNegExpo,oex1,'4')
    console.log(newRates)
    newRates=rcConvert12(bfRate, bfSuper, bfExpo, otxNegExpo,oex1,'5')
    console.log(newRates)
}

