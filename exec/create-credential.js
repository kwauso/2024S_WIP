import { agent } from './setup.js';
export async function createVC(issuer_name, subject_name, age, gender) {
    const identifier = await agent.didManagerGetByAlias({ alias: `${issuer_name}` });
    const subject_identifier = await agent.didManagerGetByAlias({ alias: `${subject_name}` });
    const verifiableCredential = await agent.createVerifiableCredential({
        credential: {
            issuer: { id: identifier.did },
            credentialSubject: {
                id: subject_identifier.did,
                name: subject_name,
                age: age,
                gender: gender
            },
        },
        proofFormat: 'jwt',
    });
    return verifiableCredential;
}
//main().catch(console.log)
