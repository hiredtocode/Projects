const repeatString = function ( string, x ) {
  let value = "";
  if ( x < 0 ) {
    return "ERROR";
  } else if ( x === 0 ) {
    return value;
  } else ( x > 0 )
    for ( let i = 0; i < x; i++ ) {
      value += string;
    }
  
  return value;
}
console.log( repeatString("Hi", 3) );

module.exports = repeatString