// Core interfaces
import {
  createAgent,
  IDIDManager,
  IResolver,
  IDataStore,
  IDataStoreORM,
  IKeyManager,
  ICredentialPlugin
} from '@veramo/core';

// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager';

//Web did identity provider
import {WebDIDProvider} from '@veramo/did-provider-web';

// Core key manager plugin
import { KeyManager } from '@veramo/key-manager';

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';

// W3C Verifiable Credential plugin
import { CredentialPlugin } from '@veramo/credential-w3c';

// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { Resolver } from 'did-resolver';
import { getResolver as webDidResolver } from 'web-did-resolver';

// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } from '@veramo/data-store';

// TypeORM is installed with `@veramo/data-store`
import { DataSource } from 'typeorm';

// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = './database.sqlite'

// You will need to get a project ID from infura https://www.infura.io
//const INFURA_PROJECT_ID = '<your PROJECT_ID here>'

// This will be the secret key for the KMS (replace this with your secret key)
import { publicKey } from './key_config.js';

const dbConnection = new DataSource({
  type: 'sqlite',
  database: DATABASE_FILE,
  synchronize: false,
  migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities,
}).initialize()

export const agent = createAgent<
IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin
>({
plugins: [
  new KeyManager({
    store: new KeyStore(dbConnection),
    kms: {
      local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(publicKey))),
    },
  }),
  new DIDManager({
    store: new DIDStore(dbConnection),
    defaultProvider: 'did:web:www.hi-lite.jp',
    providers: {
      'did:web:www.hi-lite.jp': new WebDIDProvider({
        defaultKms: 'local'
      }),
    },
  }),
  new DIDResolverPlugin({
    resolver: new Resolver({
      ...webDidResolver(),
    }),
  }),
  new CredentialPlugin(),
],
});