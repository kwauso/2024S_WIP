import { agent } from './setup.js';
async function main() {
    const identifier = await agent.didManagerDelete({ did: 'did:web:test' });
    console.log(`Identifier has deleted.`);
}
main().catch(console.log);
