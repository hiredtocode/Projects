const reverseString = function(string) {
  let split = string.split( "" );
  let result = [];
  console.log( split );
  split.forEach(x => result.unshift(x));
  console.log( result );
  return result.join().replace(/,/g, "");
}

console.log( reverseString("Hello") );

module.exports = reverseString