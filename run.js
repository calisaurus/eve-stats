console.log("EVE Stats")
const { fetch, write } = require('promise-path')
const fs = require('fs')
const zeropad = require('./zeropad')

async function run() {
  return downloadPage(1)
}

async function downloadPage(number) {
  //check to see if ora-page-one.json already exists
  let filename = `./ora-page-${number}.json`
  if (fs.existsSync(filename)) {
    console.log(`Skipping ${filename}`)
  } else {
    const apiContents = await fetch({
      url: `https://zkillboard.com/api/kills/regionID/12000001/page/${number}/`,
      headers: {
        'User-Agent': `Cali Stats Bot`
      }
    })
    await write(filename, JSON.stringify(JSON.parse(apiContents), null, 2))
    console.log('Wrote data to file', apiContents.length, "bytes")
  }
}

run()
