import { agent } from './setup.js';
export async function listDID() {
    const identifiers = await agent.didManagerFind();
    //console.log(`There are ${identifiers.length} identifiers`)
    //if (identifiers.length > 0) {
    try {
        identifiers.map((id) => {
            //console.log(id)
            //console.log(id["alias"])
            //console.log('..................')
        });
    }
    catch (err) {
        console.error(err);
    }
}
export async function listDID_by_alias() {
    const identifiers = await agent.didManagerFind();
    console.log(`There are ${identifiers.length} identifiers`);
    try {
        identifiers.map((id) => {
            //console.log(id)
            //console.log(id["alias"])
            //console.log('..................')
        });
    }
    catch (err) {
        console.error(err);
    }
}
//main().catch(console.log)
