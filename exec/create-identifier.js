import { agent } from './setup.js';
export async function createDID(test) {
    const identifier = await agent.didManagerCreate({ alias: `localhost:3000:${test}`, provider: "did:web:localhost:3000" });
    console.log(`New identifier created`);
    console.log(JSON.stringify(identifier, null, 2));
}
//main().catch(console.log)
