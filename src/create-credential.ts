import { agent } from './setup.js'
import { VerifiableCredential } from '@veramo/core'

export async function createVC(alias:string, age:number, gender:string) : Promise<VerifiableCredential>{
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