import { agent } from './setup.js'

async function main() {
  const identifier = await agent.didManagerDelete({ did: 'did:web:test' })
  console.log(`Identifier has deleted.`)
}


//This is for delete all DID.
async function delete_all() {
  const identifiers = await agent.didManagerFind()
  try {
    identifiers.map((id) => {
      const _identifier = agent.didManagerDelete({ did: `did:web:${id["alias"]}` })
      console.log(`Identifier has deleted.`)
    })
  } catch (err){
    console.error(err);
  }
}

delete_all().catch(console.log)