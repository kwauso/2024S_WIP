import { agent } from './setup.js';
export async function createVC(alias, age, gender) {
    const identifier = await agent.didManagerGetByAlias({ alias: `${alias}` });
    const verifiableCredential = await agent.createVerifiableCredential({
        credential: {
            issuer: { id: identifier.did },
            credentialSubject: {
                id: `did:web:${alias}`,
                name: alias,
                age: age,
                gender: gender
            },
        },
        proofFormat: 'jwt',
    });
    return verifiableCredential;
}
//main().catch(console.log)
