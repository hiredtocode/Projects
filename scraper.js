const puppeteer = require( 'puppeteer' );

async function scrape( url ) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto( url );

    await page.waitForXPath( '//*[@id="Description"]' );
    const [el] = await page.$x( '//*[@id="Description"]' );
    const txt = await el.getProperties( 'textContent' );
    const rawTxt = await txt.jsonValue();

    console.log( { rawTxt } );

    await browser.close();
  } catch ( err ) {
    console.log( err );
  }
}

scrape( "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" );

