const request = require( 'request' );
const cheerio = require( 'cheerio' );
const jsonfile = require('jsonfile');

request( "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", function ( error, response, html ) {
  if ( !error && response.statusCode === 200 ) {

    const $ = cheerio.load( html );
    const siteHeading = $( '.quick-links' );

    // console.log( siteHeading.html() );
    // console.log( siteHeading.text() );
    const output = siteHeading.toArray();
    console.log( output );
    // const $ = cheerio.load( html );
    // let list = [];
    // let result = $( '.quick-links' ).children().text().split(/^/);

    // $( '.sidebar' ).each( ( i, el ) => {
    //   const item = $( el ).text();
    //   list.push( item );
    //   console.log( result );
    // })

    // let data = {};

    // data.heading = result;
    // jsonfile.writeFile( 'data.json', siteHeading );
  } else {
    // throw an error
  }
})