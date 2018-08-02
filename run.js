console.log("EVE Stats")
const { fetch, write, read } = require('promise-path')
const fs = require('fs')
const zeropad = require('./zeropad')

const esiCache = {}

async function lookupESIName(id) {
  let esiData = esiCache[id]
  if (!esiData) {
    console.log('Looking up ESI data for type:', id)
    const apiContents = await fetch({
      url: `https://esi.tech.ccp.is/v3/universe/types/${id}/`,
      headers: {
        'User-Agent': `Cali Stats Bot`
      }
    })
    esiData = JSON.parse(apiContents)
    esiCache[id] = esiData
  }
  else {
    console.log('Found cached ESI data for type:', id, ':', esiData.name)
  }
  return esiData.name
}

async function run() {
  const pages = []
  while (pages.length < 40) {
    let startTime = Date.now()
    let pageData = await downloadPage(pages.length +1)
    console.log('That took', (Date.now()-startTime)/1000, 'seconds')
    pages.push(pageData)
  }

  const kills = []
  pages.forEach(page => {
    page.forEach(kill => {
      const killDetails = {
        killmail_id: kill.killmail_id,
        killmail_time: kill.killmail_time,
        ship_type_id: kill.victim.ship_type_id
      }
      kills.push(killDetails)
    })
  })

  console.log('Total ship kills:', kills.length)
  await write('all-kills.json', JSON.stringify(kills, null, 2))

  const filteredKills = kills.filter(kill => kill.ship_type_id !== 670 && kill.ship_type_id !== 33328)

  const unprocessedKills = [].concat(filteredKills)
  while (unprocessedKills.length > 0) {
    const kill = unprocessedKills.pop()
    kill.ship_name = await lookupESIName(kill.ship_type_id)
  }

  console.log('Filtered ship kills:', filteredKills.length)
  await write('all-kills-filtered.json', JSON.stringify(filteredKills, null, 2))
}

async function downloadPage(number) {
  //check to see if ora-page-one.json already exists
  let filename = `./ora-page-${zeropad(number)}.json`
  if (fs.existsSync(filename)) {
    console.log(`Already cached ${filename}`)
    const contents = await read(filename, 'utf8')
    return JSON.parse(contents)
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
