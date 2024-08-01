import { agent } from './setup.js';
//This is for delete all DID.
async function delete_all() {
    const identifiers = await agent.didManagerFind();
    try {
        identifiers.map((id) => {
            agent.didManagerDelete({ did: `${id["did"]}` });
            console.log(`Identifier has deleted.`);
        });
    }
    catch (err) {
        console.error(err);
    }
}
delete_all().catch(console.log);
