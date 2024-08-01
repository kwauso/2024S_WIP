import { agent } from './setup.js'

export async function createDID(test: string) {
  const alias = "www.hi-lite.jp"+test;
  const identifier = await agent.didManagerCreate({ alias: alias, provider: "did:web:www.hi-lite.js"})
  console.log(`New identifier created`)
  console.log(JSON.stringify(identifier, null, 2))
}

//main().catch(console.log):