import { agent } from './setup.js'
import { VerifiableCredential } from '@veramo/core'

export async function createVC(issuer_name:string, subject_name:string, age:number, gender:string) : Promise<VerifiableCredential>{
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