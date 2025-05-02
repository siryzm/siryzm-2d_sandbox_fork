const gradients = {
  temps: [
    { value: -30, color: [161, 194, 161] },
    { value: -20, color: [119, 120, 120] },
    { value: -10, color: [193, 201, 209] },
    { value: 0, color: [205, 113, 119] },
    { value: 10, color: [199, 4, 237] },
    { value: 20, color: [20, 9, 210] },
    { value: 30, color: [0, 229, 221] },
    { value: 40, color: [0, 174, 99] },
    { value: 50, color: [132, 193, 0] },
    { value: 60, color: [255, 226, 0] },
    { value: 70, color: [255, 143, 0] },
    { value: 80, color: [255, 0, 0] },
    { value: 90, color: [150, 0, 0] },
    { value: 100, color: [200, 0, 145] },
    { value: 110, color: [230, 105, 245] },
    { value: 120, color: [255, 255, 255] }
  ],

  dews: [
    { value: -20, color: [134, 99, 72] },
    { value: -10, color: [121, 92, 68] },
    { value: 0, color: [99, 81, 64] },
    { value: 10, color: [77, 66, 55] },
    { value: 20, color: [135, 130, 121] },
    { value: 30, color: [190, 190, 190] },
    { value: 40, color: [202, 235, 202] },
    { value: 50, color: [95, 196, 95] },
    { value: 60, color: [97, 163, 175] },
    { value: 70, color: [103, 102, 154] },
    { value: 80, color: [155, 105, 124] }
  ],

  rainfall: [
    { value: 0, color: [74, 209, 247] },
    { value: 0.1, color: [105, 159, 208] },
    { value: 0.25, color: [59, 74, 172] },
    { value: 0.5, color: [59, 247, 74] },
    { value: 1, color: [59, 179, 70] },
    { value: 1.5, color: [59, 134, 67] },
    { value: 2, color: [247, 248, 59] },
    { value: 3, color: [250, 222, 136] },
    { value: 4, color: [247, 172, 59] },
    { value: 5, color: [247, 59, 59] },
    { value: 6, color: [190, 59, 59] },
    { value: 8, color: [153, 59, 59] },
    { value: 10, color: [247, 59, 247] },
    { value: 15, color: [153, 115, 228] },
    { value: 20, color: [224, 224, 224] }
  ],

  winds: [
    { value: 0, color: [0,136,255] },
    { value: 5, color: [0,255,255] },
    { value: 10, color: [0,255,128] },
  //  { value: 15, color: [0,255,128] },
    { value: 20, color: [0,255,64] },
    { value: 25, color: [63,254,0] },
  //  { value: 30, color: [63,254,0] },
  //  { value: 35, color: [63,254,0] },
    { value: 40, color: [191,254,0] },
  //  { value: 45, color: [191,254,0] },
    { value: 50, color: [255,128,0] },
  //  { value: 55, color: [255,128,0] },
    { value: 60, color: [255,0,0] },
  //  { value: 65, color: [255,0,0] },
    { value: 70, color: [255,0,255] },
  ]
};

const lerp_rgb = (c1,c2,t) => {
var inverse = (1-t);

return `rgb(${[Math.round((c1[0]*inverse)+(c2[0]*t)),
        Math.round((c1[1]*inverse)+(c2[1]*t)),
        Math.round((c1[2]*inverse)+(c2[2]*t)),
        ].join(',')})`
};

const get_gradient = (range,value) => {
var min = range[0];
var max = range[range.length-1];
      
if (value <= min.value) return `rgb(${min.color.join(',')})`;
if (value >= max.value) return `rgb(${max.color.join(',')})`;
      
for (let i = 0; (i < (range.length-1)); i++) {
var curr = range[i];
var next = range[i+1];
      
if ((value >= curr.value) && (value <= next.value)) {
var t = ((value-curr.value)/(next.value-curr.value));
return lerp_rgb(curr.color,next.color,t)}
}};