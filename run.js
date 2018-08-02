console.log("EVE Stats")
const { fetch, write } = require('promise-path')
const fs = require('fs')
const zeropad = require('./zeropad')

async function run() {
  const pages = []
  while (pages.length < 40) {
    let pageData = await downloadPage(pages.length +1)
    pages.push(pageData)
  }

}

async function downloadPage(number) {
  //check to see if ora-page-one.json already exists
  let filename = `./ora-page-${zeropad(number)}.json`
  if (fs.existsSync(filename)) {
    console.log(`Skipping ${filename}`)
  } else {
    const apiContents = await fetch({
      url: `https://zkillboard.com/api/kills/regionID/12000001/page/${number}/`,
      headers: {
        'User-Agent': `Cali Stats Bot`
      }
    })
    const pageData = JSON.parse(apiContents)
    await write(filename, JSON.stringify(pageData, null, 2))
    console.log('Wrote data to file', filename, apiContents.length, "bytes")
    return pageData
  }
}

run()
