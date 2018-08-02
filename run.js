console.log("EVE Stats")
const { fetch } = require('promise-path')

let promise = (async () => {
  const apiContents = await fetch({
    url: 'https://zkillboard.com/api/kills/regionID/12000001/page/1/',
    headers: {
      'User-Agent': `Cali Stats Bot`
    }
  })
  console.log('Remote file:', apiContents)
})()
