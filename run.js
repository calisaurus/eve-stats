console.log("EVE Stats")
const { fetch, write } = require('promise-path')

let promise = (async () => {
  const apiContents = await fetch({
    url: 'https://zkillboard.com/api/kills/regionID/12000001/page/1/',
    headers: {
      'User-Agent': `Cali Stats Bot`
    }
  })
  await write('ora-page-one.json', JSON.stringify(JSON.parse(apiContents), null, 2))
  console.log('Wrote data to file', apiContents.length,"bytes")
})()
