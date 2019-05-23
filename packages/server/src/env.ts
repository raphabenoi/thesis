import * as dotenv from 'dotenv';
dotenv.config();

const homedir = require('os').homedir();

// export const chaincode = process.env.CHAINCODE || 'person';
export const chaincode = process.env.CHAINCODE || 'energymarket';
export const channel = process.env.CHANNEL || 'ch1';

// Automatically extract credentials by the user id
// If no .env config is found, fallback to Hurley defaults
export const identityId = process.env.IDENTITYID || 'gov';
export const identityName = process.env.IDENTITY || 'admin';
export const identityOrg = process.env.ORG || 'org1';

export const keyStore = process.env.KEYSTORE || `/${homedir}/hyperledger-fabric-network/.hfc-${identityOrg}`;
export const networkProfile = process.env.NETWORKPROFILE || `/${homedir}/hyperledger-fabric-network/network-profiles/${identityOrg}.network-profile.yaml`;

export const port = process.env.PORT || 8000;

// Default to common values
// export const couchDBView = process.env.COUCHDBVIEW || 'ch1_person';
export const couchDBView = process.env.COUCHDBVIEW || 'ch1_energymarket';
export const couchDBProtocol = process.env.COUCHDB_PROTOCOL || 'http';
export const couchDBHost = process.env.COUCHDB_HOST || 'localhost';
export const couchDBPort = process.env.COUCHDB_PORT || 5084;
