const puppeteer = require( 'puppeteer' );

( async () => {
  try {
    const browser = await puppeteer.launch( { headless: true } );
    const page = await browser.newPage();
    await page.setViewport({})

  } catch ( err ) {
    console.log( err )
  }
} )();