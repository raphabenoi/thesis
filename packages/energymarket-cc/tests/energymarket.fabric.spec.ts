// tslint:disable:no-unused-expression
import { join, resolve } from 'path';
import { keyStore, identityName, channel, chaincode, networkProfile, identityId, identityOrg } from './env';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { ClientFactory, ConvectorControllerClient, FlatConvectorModel, BaseStorage } from '@worldsibu/convector-core';
import 'mocha';

import { EnergymarketController } from '../src';
import { Ask, AskPrivateDetails, FullAsk } from '../src/models/ask.model';
import { Auction } from '../src/models/auction.model';
import { Bid, BidPrivateDetails, FullBid } from '../src/models/bid.model';
import { Market } from '../src/models/market.model';
import { Grid } from '../src/models/grid.model';
import { MarketParticipant, ParticipantType, SmartMeterReading } from '../src/models/marketParticipant.model';
import { ENGINE_METHOD_ALL } from 'constants';
//import { debug } from 'util';
import { read, access } from 'fs';
import { stringify } from 'querystring';
// import { parentPort } from 'worker_threads';

describe('Energymarket', () => {

  /** Change this number to the number of organisations participating in the local market */
  const numberOfOrganisations = 4;

  const homedir = require('os').homedir();

  

  /** Declare two empty objects */
  const adapter: {[k: string]: FabricControllerAdapter} = {};
  const energymarketCtrl: {[k: string]: ConvectorControllerClient<EnergymarketController>} = {};

  /**********************/
  /** GLOBAL VARIABLES **/
  /**********************/

  /** Create an array looking like ["org1", "org2", ...] */
  let identityOrg = new Array<string>(numberOfOrganisations);
  for(let i=0; i<numberOfOrganisations; i++){identityOrg[i] = "org" + (i+1);};

  /** This array will be used as IDs for market participants: ["PAR_org1", "PAR_org2", ...] */
  const identityId:string[] = identityOrg.map(org => org = "PAR_" + org );

  /** Object which will store the fingerprints for the respective organisations */
  let fingerprint: {[k: string]: string} = {};

  let bids = new Array<FullBid>(numberOfOrganisations-2);
  let asks = new Array<FullAsk>(numberOfOrganisations-2)

  // let adapter: MockControllerAdapter;
  // let energymarketCtrl: ConvectorControllerClient<EnergymarketController>;
  
  before(async () => {
    /** Array containing the Paths to the key for every organisation */
    const keyStore:string[] = identityOrg.map(org => org = `/${homedir}/hyperledger-fabric-network/.hfc-${org}`);
    /** Array containting the Paths to all network profiles for every organisation */
    const networkProfile:string[] = identityOrg.map(org => org = `/${homedir}/hyperledger-fabric-network/network-profiles/${org}.network-profile.yaml`);

    /** Some constants that are necessary for instantiating the FabricAdapter but are equal for all organisations */
    const chaincode = 'energymarket';
    const channel = 'ch1';
    const identityName = 'user1';   // the identity of the person in the orgaisation making the call (admin or user1, ...)
    const port = 8000;
    const couchDBView = 'ch1_energymarket';
    const couchDBProtocol = 'http';
    const couchDBHost = 'localhost';
    const couchDBPort = 5084;

    // /** Create an blockchain adapter for every organisation to make calls from different "perspectives" */
    // let adapter_org1 = new FabricControllerAdapter({
    //   txTimeout: 300000,
    //   user: "user1",
    //   channel: "ch1",
    //   chaincode: "energymarket",
    //   keyStore: `/${homedir}/hyperledger-fabric-network/.hfc-${identityOrg}`,
    //   networkProfile: `/${homedir}/hyperledger-fabric-network/network-profiles/${identityOrg}.network-profile.yaml`
    //   // userMspPath: keyStore
    // });

    /** Create a Fabric adapter and controller and fill the above objects  */
    for(let i=0; i<numberOfOrganisations; i++){
      adapter['org'+(i+1)] = new FabricControllerAdapter({
        txTimeout: 300000,
        user: identityName,
        channel: channel,
        chaincode: chaincode,
        keyStore: resolve(__dirname, keyStore[i]),
        networkProfile: resolve(__dirname, networkProfile[i])
        // userMspPath: keyStore
      });
      await adapter['org'+(i+1)].init();
      energymarketCtrl['org'+(i+1)] = ClientFactory(EnergymarketController, adapter['org'+(i+1)]);
      };

    /** In case not a "real" blockchain should be used uncomment the following: */
    // adapter = new MockControllerAdapter();
    // energymarketCtrl = ClientFactory(EnergymarketController, adapter);

    // await adapter.init([
    //   {
    //     version: '*',
    //     controller: 'EnergymarketController',
    //     name: join(__dirname, '..')
    //   }
    // ]);
  });

  it('should create a LMO, public GRID, and a number of MarketParticipants', async () => {

    const lmo = new MarketParticipant({
      id: 'LMO',
      is: ParticipantType.lmo,
    });
    console.log(`creating Local Market Operator: ${lmo.toJSON()} `);
    await energymarketCtrl.org1.createMarketParticipant(lmo).catch(ex => ex.responses[0].error.message);

    const grid = new Grid({
      id: "GRID",
      gridBuyPrice: 25,
      gridSellPrice: 5
    })
    console.log(`creating Public Grid: ${grid.toJSON()} `);
    await energymarketCtrl.org2.createGrid(grid).catch(ex => ex.responses[0].error.message);

    for(let i=3; i<=(numberOfOrganisations); i++){
      const marketParticipant = new MarketParticipant({
        id: "PAR_" + identityOrg[i-1],
        is: ParticipantType.prosumer
      });
      await energymarketCtrl['org' + i].createMarketParticipant(marketParticipant).catch(ex => ex.responses[0].error.message);
    }

    let savedLMO = await energymarketCtrl.org1.getMarketParticipantById(lmo.id).catch(ex => ex.responses[0].error.message).then(lmo => new MarketParticipant(lmo));
    let savedGRID = await energymarketCtrl.org2.getAllGrids().catch(ex => ex.responses[0].error.message).then(grid => new Grid(grid[0]));
    let savedPAR = await energymarketCtrl.org3.getAllMarketParticipants().catch(ex => ex.responses[0].error.message).then(participants => participants.map(p => new MarketParticipant(p)).filter(p => p.id !== 'LMO'));

    fingerprint.lmo = savedLMO.fingerprint;
    fingerprint.grid = savedGRID.fingerprint;
    for(let i=3; i<=numberOfOrganisations; i++){fingerprint['org' + i] = savedPAR[i-3].fingerprint;};
    // let numberOfReadings = numberOfOrganisations - 2;
    // let readings = new Array<SmartMeterReading>(numberOfReadings);
    // for (let i=0; i<numberOfReadings; i++) {
    //   readings[i] = new SmartMeterReading('AUC' + (i+1).toString());
    //   readings[i].auctionPeriod = (i+1).toString();
    //   readings[i].consumed = Math.floor(Math.random() * 100) + 1;
    //   readings[i].produced = Math.floor(Math.random() * 100) + 1;
    // }
    // console.log(readings);

    // await energymarketCtrl.createMarketParticipant(participant);
    // let savedParticipant = await adapter.getById<MarketParticipant>(participant.id);
    // console.log(savedParticipant);

    // for (const reading of readings) { await energymarketCtrl.sendReading(reading, participant.id) };
    // // await energymarketCtrl.sendReading(data, participant.id);
    // savedParticipant = await adapter.getById<MarketParticipant>(participant.id);
    // console.log(savedParticipant);

    debugger;

    expect(savedPAR).to.be.an('array').lengthOf(numberOfOrganisations-2);
    expect(savedLMO.id).to.eql(lmo.id);
    expect(savedGRID.id).to.eql(grid.id);
  });
  
  // it('should create a market', async () => {
  //   for(let i=1; i<=numberOfOrganisations; i++){
  //     const market = new Market({
  //       id: "MARKETT_" + identityOrg[i-1],
  //       gridBuyPrice: 28,
  //       gridSellPrice: 5,
  //       auctionTime: 900000
  //     });
      
  //     await energymarketCtrl['org' + i].createMarket(market);
  //   };
  //   const savedMarket = await energymarketCtrl.org1.getAllMarkets().then(market => market.map(market => new Market(market)));
  //   console.log(savedMarket);
  //   debugger;

  //   let signingIdentity = adapter.org1.user.getSigningIdentity();
  //   let identity = adapter.org1.user.getIdentity();

  //   expect(savedMarket[0].id).to.exist;
  //   expect(savedMarket[numberOfOrganisations].id).to.exist;
  // });

  // it('should register a market participant for every organisation, an auction, a bid and an ask', async () => {

  //   const participant = new MarketParticipant({
  //     id: "B6:0B:37:7C:DF:D2:7A:08:0B:98:BF:52:A4:2C:DC:4E:CC:70:91:E1",
  //     name: "Anton",
  //     is: 1,
  //     coinBalance: 100000000000
  //   });
  //   console.log(participant);

  //   await energymarketCtrl.createMarketParticipant(participant);
    

  //   const auction = new Auction({
  //     id: uuid(),
  //     start: Date.now(),
  //     end: (Date.now() + 100000),
  //   });

  //   await energymarketCtrl.createAuction(auction);
  //   let savedAuction = await adapter.getById<Auction>(auction.id);
  //   console.log(savedAuction);

  //   let numberOfBids = 10;
  //   let bids = new Array<Bid>(numberOfBids)
  //   for (let i=0; i<numberOfBids; i++) {
  //     bids[i] = new Bid({ id: uuid(), auctionId: auction.id, amount: Math.floor(Math.random() * 100) + 1, price: Math.floor(Math.random() * 20) + 5});
  //   }
  //   for (const bid of bids) { await energymarketCtrl.placeBid(bid)};
  //   // await Promise.all(bids.map(bid => energymarketCtrl.placeBid(bid)));
  //   let savedBids = await energymarketCtrl.getAllBids().then(bids => bids.map(bid => new Bid(bid)));
    
  //   // const bid = new Bid({
  //   //   id: uuid(),
  //   //   auctionId: auction.id,
  //   //   amount: 20,
  //   //   price: 10,
  //   //   sender: "this is the string of the sender",
  //   // })

  //   // const bid2 = new Bid({
  //   //   id: uuid(),
  //   //   auctionId: auction.id,
  //   //   amount: 30,
  //   //   price: 15,
  //   //   sender: "another sender"
  //   // })
    
  //   // await energymarketCtrl.placeBid(bid);
  //   // await energymarketCtrl.placeBid(bid2);
  
  //   let numberOfAsks = 10;
  //   let asks = new Array<Ask>(numberOfAsks)
  //   for (let i=0; i<numberOfAsks; i++) {
  //     asks[i] = new Ask({ id: uuid(), auctionId: auction.id, amount: Math.floor(Math.random() * 100) + 1, price: Math.floor(Math.random() * 20) + 5});
  //   }
  //   for (const ask of asks) { await energymarketCtrl.placeAsk(ask)};
  //   let savedAsks = await energymarketCtrl.getAllAsks().then(asks => asks.map(ask => new Ask(ask)));

  //   // const ask = new Ask({
  //   //   id: uuid(),
  //   //   auctionId: auction.id,
  //   //   amount: 50,
  //   //   price: 15,
  //   //   sender: "sender",
  //   // })

  //   // const ask2 = new Ask({
  //   //   id: uuid(),
  //   //   auctionId: auction.id,
  //   //   amount: 10,
  //   //   price: 20,
  //   //   sender: "sender",
  //   // })

  //   // await energymarketCtrl.placeAsk(ask);
  //   // await energymarketCtrl.placeAsk(ask2);

    

  //   /** Clear the auction */
  //   await energymarketCtrl.clearAuction(auction.id).catch(ex => ex.responses[0].error.message);

  //   // let numberOfReadings = 10;
  //   // let readings = new Array<SmartMeterReading>(numberOfReadings);
  //   // for (let i=0; i<numberOfReadings; i++) {
  //   //   readings[i] = new SmartMeterReading('AUC' + (i+1).toString());
  //   //   readings[i].auctionPeriod = (i+1).toString();
  //   //   readings[i].consumed = Math.floor(Math.random() * 100) + 1;
  //   //   readings[i].produced = Math.floor(Math.random() * 100) + 1;
  //   // }
  //   // console.log(readings);
  //   // for (const reading of readings) { await energymarketCtrl.sendReading(reading, participant.id) };



  //   savedAuction = await adapter.getById<Auction>(auction.id);
  //   console.log(savedAuction);
  //   savedBids = await energymarketCtrl.getAllBids().then(bids => bids.map(bid => new Bid(bid)));
  //   console.log(savedBids);
  //   savedAsks = await energymarketCtrl.getAllAsks().then(asks => asks.map(ask => new Ask(ask)));
  //   console.log(savedAsks);
  //   const savedParticipant = await adapter.getById<MarketParticipant>(participant.id);
  //   console.log(savedParticipant);

  //   let sumDemand = savedAuction.matchedAmount + savedAuction.unmatchedDemand;
  //   let sumSupply = savedAuction.matchedAmount + savedAuction.unmatchedSupply;
  //   let sumBids = bids.reduce( (acc, bid) => acc += bid.amount, 0);
  //   let sumAsks = asks.reduce( (acc, ask) => acc += ask.amount, 0);

  //   let edge: number;
  //   for (const element of [...savedBids, ...savedAsks]) {
  //     if (element.unmatchedAmount) {edge = element.price};
  //   }
  //   console.log(`Bid or Ask on the edge is ${edge} and a MCP of ${savedAuction.mcp}`);

  //   // expect(savedAuction.matchedAmount).to.be.eql(30);
  //   expect(edge).to.be.eql(savedAuction.mcp);
  //   expect(savedAuction.mcp).to.exist;
  //   expect(savedParticipant.id).to.exist;
  //   expect(savedBids).to.be.an('array').that.has.lengthOf(numberOfBids);
  //   savedBids.forEach(element => expect(element).to.have.deep.property('id'));
  //   // expect(savedBids[1]).to.have.property('successful', true);
  //   expect(savedAsks).to.be.an('array').that.has.lengthOf(numberOfAsks);
  //   savedAsks.forEach(element => expect(element).to.have.property('id'));
  //   expect(savedAsks[0]).to.have.deep.property('unmatchedAmount');
  //   expect(sumDemand).to.be.eql(sumBids);
  //   expect(sumSupply).to.be.eql(sumAsks);
  // });


  it('should create an energy auction', async () => {
    const auction = new Auction({
      id: 'AUC1',
      start: Date.now(),
      end: (Date.now() + 1000000),
    });
    await energymarketCtrl.org1.createAuction(auction).catch(ex => ex.responses[0].error.message);
    let savedAuction = await energymarketCtrl.org1.getAuctionById(auction.id).catch(ex => ex.responses[0].error.message).then(auction => new Auction(auction));
    expect(savedAuction.id).to.eql(auction.id);
  });

  it('should place bids and ask from different participants', async () => {

    /** get the first auction from the ledger */
    const auction = await energymarketCtrl.org1.getAllAuctions().catch(ex => ex.responses[0].error.message).then(auctions => auctions.map(auction => new Auction(auction))[0]);

    let numberOfBids = numberOfOrganisations - 2;
    // let bids = new Array<FullBid>(numberOfBids);
    for (let i=0; i<numberOfBids; i++) {
      bids[i] = new FullBid({ 
        id: `BID_${auction.id}_${identityOrg[i+2]}`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR_org' + (i+3)
      });
    }

    /** place the bids as the "rightful" organisation */
    for(const bid of bids){
      /** use the controller which matches with 'bid.sender' */
      await energymarketCtrl[bid.sender.substring(4,)]      //[Object.keys(fingerprint).find(key => fingerprint[key] === bid.sender)]
        .$config({transient: { bid: bid.toJSON() }})
        .placeBid()
        .catch(ex => ex.responses[0].error.message);
    }

    
    let numberOfAsks = numberOfOrganisations - 2;
    // let asks = new Array<FullAsk>(numberOfAsks)
    for (let i=0; i<numberOfAsks; i++) {
      asks[i] = new FullAsk({ 
        id: `ASK_${auction.id}_${identityOrg[i+2]}`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 20) + 5,
        sender: 'PAR_org' + (i+3)
      });
    }
    for (const ask of asks) { 
      await energymarketCtrl[ask.sender.substring(4,)]
        .$config({transient: { ask: ask.toJSON() }})
        .placeAsk()
        .catch(ex => ex.responses[0].error.message);
    };

    let placedBids = await energymarketCtrl.org1.getBidsByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(bids => bids.map(bid => new Bid(bid)));
    let placedAsks = await energymarketCtrl.org1.getAsksByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(asks => asks.map(ask => new Ask(ask)));;
    
    expect(placedBids).to.be.an('array').lengthOf(numberOfBids);
    expect(placedAsks).to.be.an('array').lengthOf(numberOfAsks);
    placedBids.forEach( (bid, iterator) => expect(bid.id).to.eql(bids[iterator]) ); 
    placedAsks.forEach( (ask, iterator) => expect(ask.id).to.eql(asks[iterator]) );

    /** Clear the auction */
    const bidPrivateDetails = bids.map(bid => new BidPrivateDetails({id: bid.id, price: bid.price, amount: bid.amount}));
    const askPrivateDetails = asks.map(ask => new AskPrivateDetails({id: ask.id, price: ask.price, amount: ask.amount}));
    const clearedAuction = await energymarketCtrl.org1
    .$config({transient: { bids: JSON.stringify(bidPrivateDetails) , asks: JSON.stringify(askPrivateDetails) }})
    .clearAuction(auction.id)
    .catch(ex => ex.responses[0].error.message);
    expect(clearedAuction.mcp).to.exist;
    
    let successfulBids = await energymarketCtrl.org1.getBidsByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(bids => bids.map(bid => new Bid(bid)));
    successfulBids = successfulBids.filter(bid => bid.successful == true);
    let successfulAsks = await energymarketCtrl.org1.getAsksByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(asks => asks.map(ask => new Ask(ask)));;
    successfulAsks = successfulAsks.filter(ask => ask.successful == true);
    
    /** Make sure all successful bids have prices equal or higher than the MCP */
    for(let successfulBid of successfulBids){
      let bid = bids.find(bid => bid.id == successfulBid.id);
      expect(bid.price).to.be.at.least(auction.mcp);
      bid.successful = true;
    };
    /** Make sure all successful asks have prices equal or lower than the MCP */
    for(let successfulAsk of successfulAsks){
      let ask = asks.find(ask => ask.id == successfulAsk.id);
      expect(ask.price).to.be.at.most(auction.mcp);
      ask.successful = true;
    }

  });

    
    // let fullSuccessfulBids = new Array<FullBid>();
    // for(const successfulBid of successfulBids) {
    //   const bidPrivateRaw = await adapter.stub.getPrivateData(successfulBid.sender, successfulBid.id);
    //   const bidPrivate = new BidPrivateDetails(JSON.parse(bidPrivateRaw.toString('utf8')));
    //   let bidMerged = new FullBid({
    //     id: successfulBid.id,
    //     auctionId: successfulBid.auctionId,
    //     sender: successfulBid.sender,
    //     successful: successfulBid.successful,
    //     unmatchedAmount: bidPrivate.unmatchedAmount,
    //     amount: bidPrivate.amount,
    //     price: bidPrivate.price
    //   })
    //   fullSuccessfulBids.push(bidMerged);
    // }

    // let fullSuccessfulAsks = new Array<FullAsk>();
    // for(const successfulAsk of successfulAsks) {
    //   const askPrivateRaw = await adapter.stub.getPrivateData(successfulAsk.sender, successfulAsk.id);
    //   const askPrivate = new AskPrivateDetails(JSON.parse(askPrivateRaw.toString('utf8')));
    //   let askMerged = new FullAsk({
    //     id: successfulAsk.id,
    //     auctionId: successfulAsk.auctionId,
    //     sender: successfulAsk.sender,
    //     successful: successfulAsk.successful,
    //     unmatchedAmount: askPrivate.unmatchedAmount,
    //     amount: askPrivate.amount,
    //     price: askPrivate.price
    //   })
    //   fullSuccessfulAsks.push(askMerged);
    // }
    
  it('send smart meter reading for all market participants', async () => {

    /** get the first auction from the ledger */
    const auction = await energymarketCtrl.org1.getAllAuctions().catch(ex => ex.responses[0].error.message).then(auctions => auctions.map(auction => new Auction(auction))[0]);

    let numberOfReadings = numberOfOrganisations - 2;
    let readings = new Array<SmartMeterReading>(numberOfReadings);
    for (let i=0; i<numberOfReadings; i++) {
      let bidAmount = bids.filter(bid => bid.sender === fingerprint[i+3]).reduce((acc,bid) => acc + bid.amount, 0);
      let askAmount = asks.filter(ask => ask.sender == fingerprint[i+3]).reduce((acc,ask) => acc + ask.amount, 0);
      readings[i] = new SmartMeterReading({
        id: auction.id,
        auctionPeriod: auction.id,
        consumed: bidAmount + Math.floor(Math.random() * bidAmount/10) - Math.floor(Math.random() * bidAmount/10),
        produced: askAmount + Math.floor(Math.random() * askAmount/10) - Math.floor(Math.random() * askAmount/10)
      });
    }

    for (let i=3; i<=numberOfOrganisations; i++) { await energymarketCtrl['org' + i].sendReading(readings[i-3]).catch(ex => ex.responses[0].error.message); }

    let savedPAR = await energymarketCtrl.org1.getAllMarketParticipants().catch(ex => ex.responses[0].error.message).then(participants => participants.map(p => new MarketParticipant(p)).filter(p => p.id !== 'LMO'));
    savedPAR.forEach(participant => expect(participant.readings).to.be.an('array').lengthOf(1));

  });


  it('send smart meter reading for all market participants', async () => {

    /** get the first auction from the ledger */
    const auction = await energymarketCtrl.org1.getAllAuctions().catch(ex => ex.responses[0].error.message).then(auctions => auctions.map(auction => new Auction(auction))[0]);

    await energymarketCtrl.org1.escrowAuction(auction.id).catch(ex => ex.responses[0].error.message);
    
    let savedAuction = await energymarketCtrl.org1.getAuctionById(auction.id).catch(ex => ex.responses[0].error.message);
    console.log(savedAuction);
    // let savedMarket= await adapter.getById<Market>('MKT');
    // console.log(savedMarket);
    // let savedGrid = await adapter.getById<Grid>('GRID');
    // console.log(savedGrid);
    // let savedBids = await energymarketCtrl.getAllBids().then(bids => bids.map(bid => new Bid(bid)));
    // console.log(savedBids);
    // let savedAsks = await energymarketCtrl.getAllAsks().then(asks => asks.map(ask => new Ask(ask)));
    // console.log(savedAsks);
    // savedParticipants = await energymarketCtrl.getAllMarketParticipants().then(participant => participant.map(participant => new MarketParticipant(participant)));
    // console.log(savedParticipants);

    let sumDemand = savedAuction.matchedAmount + savedAuction.unmatchedDemand;
    let sumSupply = savedAuction.matchedAmount + savedAuction.unmatchedSupply;
    let sumBids = bids.reduce( (acc, bid) => acc += bid.amount, 0);
    let sumAsks = asks.reduce( (acc, ask) => acc += ask.amount, 0);
    // let sumBids = bid.amount;
    // let sumAsks = ask.amount;

    // let edge: number;
    // for (const element of [...savedBids, ...savedAsks]) {
    //   if (element.unmatchedAmount) {edge = element.price};
    // }
    // console.log(`Bid or Ask on the edge is ${edge} and a MCP of ${savedAuction.mcp}`);

    let successfulBids = await energymarketCtrl.org1.getBidsByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(bids => bids.map(bid => new Bid(bid)));
    successfulBids = successfulBids.filter(bid => bid.successful == true);
    let successfulAsks = await energymarketCtrl.org1.getAsksByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(asks => asks.map(ask => new Ask(ask)));;
    successfulAsks = successfulAsks.filter(ask => ask.successful == true);

    let savedPAR = await energymarketCtrl.org1.getAllMarketParticipants().catch(ex => ex.responses[0].error.message).then(participants => participants.map(p => new MarketParticipant(p)).filter(p => p.id !== 'LMO'));

    // fullSuccessfulBids = new Array<FullBid>();
    // for(const successfulBid of successfulBids) {
    //   const bidPrivateRaw = await adapter.stub.getPrivateData(successfulBid.sender, successfulBid.id);
    //   const bidPrivate = new BidPrivateDetails(JSON.parse(bidPrivateRaw.toString('utf8')));
    //   let bidMerged = new FullBid({
    //     id: successfulBid.id,
    //     auctionId: successfulBid.auctionId,
    //     sender: successfulBid.sender,
    //     successful: successfulBid.successful,
    //     unmatchedAmount: bidPrivate.unmatchedAmount,
    //     amount: bidPrivate.amount,
    //     price: bidPrivate.price
    //   })
    //   fullSuccessfulBids.push(bidMerged);
    // }

    // fullSuccessfulAsks = new Array<FullAsk>();
    // for(const successfulAsk of successfulAsks) {
    //   const askPrivateRaw = await adapter.stub.getPrivateData(successfulAsk.sender, successfulAsk.id);
    //   const askPrivate = new AskPrivateDetails(JSON.parse(askPrivateRaw.toString('utf8')));
    //   let askMerged = new FullAsk({
    //     id: successfulAsk.id,
    //     auctionId: successfulAsk.auctionId,
    //     sender: successfulAsk.sender,
    //     successful: successfulAsk.successful,
    //     unmatchedAmount: askPrivate.unmatchedAmount,
    //     amount: askPrivate.amount,
    //     price: askPrivate.price
    //   })
    //   fullSuccessfulAsks.push(askMerged);
    // }


    debugger;
    
    // expect(edge).to.be.eql(savedAuction.mcp);
    expect(savedAuction.mcp).to.exist;
    savedPAR.forEach(participant => expect(participant).to.have.deep.property('id'));
    expect(savedPAR).to.be.an('array').lengthOf(numberOfOrganisations - 2);
    expect(sumDemand).to.be.eql(sumBids);
    expect(sumSupply).to.be.eql(sumAsks);
    
    // expect(savedAuction.matchedAmount).to.be.eql(50);
    // expect(savedMarket.energyBalance).to.be.eql(0);
    // expect(savedMarket.coinBalance).to.be.eql(200);
    // expect(savedGrid.energyBalance).to.be.eql(0);
    // expect(savedGrid.energyBalance).to.be.eql(0);
    // expect(savedParticipants[0].coinBalance).to.be.eql(-450);
    // expect(savedParticipants[1].coinBalance).to.be.eql(250);
  });


  // it('should test the private bid placement', async () => {

  //   const bidTransientInput = new FullBid({
  //     id: "BID1",
  //     auctionId: "AUC1",
  //     sender: "A",
  //     amount: 10,
  //     price: 20
  //   })

  //   await energymarketCtrl
  //     .$config({transient: { bid: bidTransientInput.toJSON() }})
  //     .placeBid();


  //   const askTransientInput = new FullAsk({
  //     id: "ASK1",
  //     auctionId: "AUC1",
  //     sender: "B",
  //     amount: 15,
  //     price: 10
  //   })

  //   await energymarketCtrl
  //   .$config({transient: { ask: askTransientInput.toJSON() }})
  //   .placeAsk();


  //   const bid = await adapter.getById<Bid>(bidTransientInput.id);
  //   const bidPrivateRaw = await adapter.stub.getPrivateData('A', bidTransientInput.id);
  //   const bidPrivate = new BidPrivateDetails(JSON.parse(bidPrivateRaw.toString('utf8')));

  //   const ask = await adapter.getById<Ask>(askTransientInput.id);
  //   const askPrivateRaw = await adapter.stub.getPrivateData('B', askTransientInput.id);
  //   const askPrivate = new AskPrivateDetails(JSON.parse(askPrivateRaw.toString('utf8')));

  //   expect(bid.id).to.eql('BID1');
  //   expect(bidPrivate.id).to.eql('BID1');
  //   expect(bidPrivate.amount).to.eql(10);
  //   expect(bidPrivate.price).to.eql(20);
    

  //   expect(ask.id).to.eql('ASK1');
  //   expect(askPrivate.id).to.eql('ASK1');
  //   expect(askPrivate.amount).to.eql(15);
  //   expect(askPrivate.price).to.eql(10);
   
  // });


});