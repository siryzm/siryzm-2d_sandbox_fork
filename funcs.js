// constants
var min_temp = -50;
var max_temp = 50;
var temp_range = (max_temp-min_temp);

var skew_angle = -16.5;

var min_pressure = 100;
var max_pressure = 1000;

var gravity = 9.807; // (m/s^2)
var mass = .0289644; // molar mass kg/mol
var gas_constant = 8.31432; // gas constant J(mol*K)
var sea_lapse = (6.5/1000); // sea lapse in km
var sea_pa = 101325; // sea level pa
var seatemp_k = 288.15; // sea level temp in kelvin

// converting celcius to kelvin
const ctok = (temp) => {
return (temp+273.15);
};

// calculating convective available energy (CAPE)
const get_cape = (T_parcel,T_env,T_sfc_env) => {
let cape = 0;
let cinh = 0;

for (let i = 0; i < T_parcel.length; i++) {
let buoyancy = (((ctok(T_parcel[i])-ctok(T_env[i]))/ctok(T_sfc_env))*2.333);

    cape += ((buoyancy > 0) && buoyancy || 0);
    cinh += ((buoyancy < 0) && buoyancy || 0);
};

return [(cape*sim_res_y),(cinh*sim_res_y)];
};

// calculating precipitable water (PWAT)
const get_pwat = (dewpoint) => {
var pwat = (.1*Math.exp((17.269*dewpoint)/(237.3+dewpoint)));
var pwat_inches = ((pwat*10)/2.54);

return pwat_inches;
};

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

// converting degrees to radians
const toRadians = (deg) => {
return (deg*(Math.PI/180));
};

// getting pressure at height (in pa)
const get_pressure = (height) => {
var exp = ((gravity*mass)/(gas_constant*sea_lapse));
return (sea_pa*Math.pow((1-(sea_lapse*height)/seatemp_k),exp));
};

// rounding number
const round_number = (number) => {
var pos = (pos || 10);
return Number((Math.round(number*pos)/pos).toPrecision(3));
}

// getting vapor pressure
const vapor_pressure = (temperature) => {
return (6.112*Math.exp((17.67*temperature)/(temperature+243.5)));
};
      
const get_rh = (temp,dewPoint) => {
let vp_temp = vapor_pressure(temp);
let vp_dew = vapor_pressure(dewPoint);
return Math.max(0,((100*vp_dew)/vp_temp));
};