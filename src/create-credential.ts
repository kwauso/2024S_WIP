import { agent } from './setup.js'

async function main() {
  const identifier = await agent.didManagerGetByAlias({ alias: 'default' })

  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: identifier.did },
      credentialSubject: {
        id: 'did:web:did-vc.com',
        givenName: "taro",
        familyName: "yamada",
        age: "22",
        gender: "male",
        issuanceDate: "20XX/xx/xx"
      },
    },
    proofFormat: 'jwt',
  })
  console.log(`New credential created`)
  console.log(JSON.stringify(verifiableCredential, null, 2))
}

main().catch(console.log)