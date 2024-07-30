//This is for CLI usage. To use, enter "node exec/list-identifierd" in terminal.

import { agent } from './setup.js'

async function listDID() {
  const identifiers = await agent.didManagerFind()
  console.log(`There are ${identifiers.length} identifiers`)
  try {
    identifiers.map((id) => {
      console.log(id)
      console.log('..................')
    })
  } catch (err){
    console.error(err);
  }
}

listDID().catch(console.log)