var time_counter

// time_counter max is how long it takes. how about 500 steps.
//
// if sign == 1 rotate CW
// else sign == 0  rotate CCW
function getNextLeft(sign,prev){
  var next = new THREE.Vector3();
  if(sign){
    // coming from center

  }
  else{
    // coming from right
  }
  return next;
}
function getNextCenter(sign,prev){
  var next = new THREE.Vector3();
  if(sign){
    // coming from right

  }
  else{
    // coming from left
  }
  return next;
}
function getNextRight(sign,prev){
  var next = new THREE.Vector3();

  if(sign){
    // coming from left
    // pos+= veloc * dt
    next.y = prev.y;
    next.x =14.1421356* Math.cos(110/180*3.141592 - 0.5*time_counter/40*3.141592/180)
    next.z = 14.1421356*Math.sin(110/180*3.141592 - 0.5*time_counter/40*3.141592/180)
  }
  else{
    // coming from center
  }
  return next;
}

export getNextLeft;
export getNextRight;
export getNextCenter;

// module.exports = {
//   getNextLeft: getNextLeft,
//   getNextRight: getNextRight,
//   getNextCenter: getNextCenter,
// }
