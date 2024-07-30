import { agent } from './setup.js'

export async function createDID(test: string) {
  const identifier = await agent.didManagerCreate({ alias: `${test}` })
  console.log(`New identifier created`)
  console.log(JSON.stringify(identifier, null, 2))
}

//main().catch(console.log)