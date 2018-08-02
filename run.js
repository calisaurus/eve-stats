console.log("EVE Stats")
const { fetch, write } = require('promise-path')
const fs = require('fs')

async function run() {
  //check to see if ora-page-one.json already exists
  let filename = './ora-page-one.json'
  if (fs.existsSync(filename)) {
    console.log(`Skipping ${filename}`)
  } else {
    const apiContents = await fetch({
      url: 'https://zkillboard.com/api/kills/regionID/12000001/page/1/',
      headers: {
        'User-Agent': `Cali Stats Bot`
      }
    })
    await write('ora-page-one.json', JSON.stringify(JSON.parse(apiContents), null, 2))
    console.log('Wrote data to file', apiContents.length, "bytes")
  }


}

run()
