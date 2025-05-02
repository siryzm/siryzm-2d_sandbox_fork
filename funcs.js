// converting celcius to kelvin
const ctok = (temp) => {
return (temp+273.15);
};

// calculating convective available energy (CAPE)
const get_cape = function(T_parcel,T_env){
let cape = 0;

for (let i = 0; i < T_parcel.length; i++) {
let T_parcel_K = ctok(T_parcel[i]);
let T_env_K = ctok(T_env[i]);

let buoyancy = ((T_parcel_K-T_env_K)/T_env_K);
if (buoyancy < 0){continue};

    cape += buoyancy;
};

return cape;
};

// calculating precipitable water (PWAT)
const get_pwat = function(dewpoint){
var pwat = (.1*Math.exp((17.269*dewpoint)/(237.3+dewpoint)));
var pwat_inches = ((pwat*10)/2.54);

return pwat_inches;
};

// new code

// getting relative humidity for wet-bulb
const get_rh_wb = (temp,dew) => {
return (100*(Math.exp((17.625*dew)/(243.04+dew))/Math.exp((17.625*temp)/(243.04+temp))));
};

// getting wet-bulb
const get_wb = (temp,dew) => {
var rh = get_rh_wb(temp,dew);
return (temp*Math.atan(.151977*Math.sqrt(rh+8.313659))
       +Math.atan(temp+rh)
        -Math.atan(rh-1.676331)
        +(.00391838*Math.pow(rh,1.5)*Math.atan(.023101*rh))
        -4.686035);
};