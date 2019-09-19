// tslint:disable:no-unused-expression

// https://stackoverflow.com/questions/45466040/verify-that-an-exception-is-thrown-using-mocha-chai-and-async-await


import { join, resolve } from 'path';
import { keyStore, identityName, channel, chaincode, networkProfile, identityId, identityOrg } from './env';
import {expect} from 'chai-as-promised';
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
import { sha1 } from 'sha1';



describe('CHAINCODE TEST SERIES', () => {

  /** Change this number to the number of organisations participating in the local market */
  const numberOfOrganisations = 6;

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

  /** Object which will store the fingerprints for the respective organisations */
  let fingerprint: {[k: string]: string} = {};

  let bids = new Array<FullBid>(numberOfOrganisations-2);
  let asks = new Array<FullAsk>(numberOfOrganisations-2);
  let auction: Auction;

  
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

  });

  it('should create a LMO, public GRID, and a number of MarketParticipants before the unit tests can start', async () => {
    
    /** Creates a Market instance ... may already be invoked via a hurl command */
    const market = new Market({
      id: 'MKT',
      gridBuyPrice: 25,
      gridSellPrice: 5,
      auctionTime: 900000
    });
    console.log(`creating market instance '${market.id}' as ORG 1 (LMO)`);
    // await energymarketCtrl.org1.createMarket(market).catch(ex => ex.responses[0].error.message);

    debugger;

    const grid = new Grid({
      id: 'GRID',
      gridBuyPrice: 25,
      gridSellPrice: 5
    })
    console.log(`creating Public Grid: ${grid.toJSON()} `);
    let res = await energymarketCtrl.org2.createGrid(grid).catch(ex => ex.responses[0].error.message);
    console.log(res);

    /** Create a MarketParticipant with id PAR1 which is part of org3 */
    const par1 = new MarketParticipant({
      id: 'PAR1',
      is: ParticipantType.prosumer
    });
    await energymarketCtrl.org3.createMarketParticipant(par1).catch(ex => ex.responses[0].error.message);

    /** Create a MarketParticipant with id PAR2 which is part of org4 */
    const par2 = new MarketParticipant({
      id: 'PAR2',
      is: ParticipantType.prosumer
    });
    await energymarketCtrl.org4.createMarketParticipant(par2).catch(ex => ex.responses[0].error.message);

    /** Create a MarketParticipant with id PAR2 which is part of org4 */
    const par3 = new MarketParticipant({
      id: 'PAR3',
      is: ParticipantType.consumer
    });
    await energymarketCtrl.org5.createMarketParticipant(par3).catch(ex => ex.responses[0].error.message);

    /** Create a MarketParticipant with id PAR2 which is part of org4 */
    const par4 = new MarketParticipant({
      id: 'PAR4',
      is: ParticipantType.producer
    });
    await energymarketCtrl.org6.createMarketParticipant(par4).catch(ex => ex.responses[0].error.message);

    let savedMARKET = await energymarketCtrl.org1.getAllMarkets().catch(ex => ex.responses[0].error.message).then(markets => new Market(markets[0]));
    let savedGRID = await energymarketCtrl.org2.getAllGrids().catch(ex => ex.responses[0].error.message).then(grid => new Grid(grid[0]));
    let savedPAR = await energymarketCtrl.org3.getAllMarketParticipants().catch(ex => ex.responses[0].error.message).then(participants => participants.map(p => new MarketParticipant(p)));

    fingerprint.lmo = savedMARKET.fingerprint;
    fingerprint.grid = savedGRID.fingerprint;
    fingerprint.par1 = savedPAR[0].fingerprint;
    fingerprint.par2 = savedPAR[1].fingerprint;
    fingerprint.par3 = savedPAR[2].fingerprint;
    fingerprint.par4 = savedPAR[3].fingerprint;
    // for(let i=3; i<=numberOfOrganisations; i++){fingerprint['org' + i] = savedPAR[i-3].fingerprint;};

    expect(savedPAR).to.be.an('array').lengthOf(4);
    expect(savedMARKET.id).to.eql(market.id);
    expect(savedGRID.id).to.eql(grid.id);
  });



  it('UNIT TEST 1: a market participant of type PROSUMER places multiple buy and sell orders which are registered successfully on the ledger', async () => {

    /** Creates an Auction instance */
    auction = new Auction({
      id: 'AUC1',
      start: Date.now(),
      end: (Date.now() + 1000000)
    });
    await energymarketCtrl.org1.createAuction(auction).catch(ex => ex.responses[0].error.message);
    let savedAuction = await energymarketCtrl.org1.getAuctionById(auction.id).catch(ex => ex.responses[0].error.message).then(auction => new Auction(auction));
    expect(savedAuction.id).to.eql(auction.id);
    
    /** Creates a number of buy orders */
    let numberOfBids = 2;                             // = numberOfOrganisations - 2;
    // let bids = new Array<FullBid>(numberOfBids);   // has been declared globally
    for (let i=0; i<numberOfBids; i++) {
      bids[i] = new FullBid({ 
        id: `BID_${auction.id}_${identityOrg[2]}`,    // removed i to only have PAR1
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR1'                                // removed i to only have PAR1
      });
    }

    /** Place the bids as PAR1 who belongs to org3 */
    for(const bid of bids){
      let publicBid = new Bid({id: bid.id, auctionId: bid.auctionId, sender: bid.sender});
      /** Invokes the 'public' transaction */
      await energymarketCtrl['org3'].placeBid(publicBid);
      /** Invokes the 'private' transaction */
      await energymarketCtrl['org3']
        .$config({transient: { bid: bid.toJSON() }})
        .sendBidPrivateDetails()
        .catch(ex => ex.responses[0].error.message);
    }

    /** Creates a number of sell orders */
    let numberOfAsks = 2;
    // let asks = new Array<FullAsk>(numberOfAsks)      // has been declared globally
    for (let i=0; i<numberOfAsks; i++) {
      asks[i] = new FullAsk({ 
        id: `ASK_${auction.id}_${identityOrg[2]}`,      // removed i to only have PAR1
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 20) + 5,
        sender: 'PAR1'                                  // removed i to only have PAR1
      });
    }

    /** Place the asks as PAR1 who belongs to org3 */
    for (const ask of asks) { 
      let publicAsk = new Ask({id: ask.id, auctionId: ask.auctionId, sender: ask.sender});
      /** Invokes the 'public' transaction */
      await energymarketCtrl['org3'].placeAsk(publicAsk);
      /** Invokes the 'private' transaction */
      await energymarketCtrl['org3']
        .$config({transient: { ask: ask.toJSON() }})
        .sendAskPrivateDetails()
        .catch(ex => ex.responses[0].error.message);
    };

    /** Retrieve the buy and sell orders from the ledger */
    let placedBids = await energymarketCtrl.org1.getBidsByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(bids => bids.map(bid => new Bid(bid)));
    let placedAsks = await energymarketCtrl.org1.getAsksByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(asks => asks.map(ask => new Ask(ask)));;
    /** Print orders for illustration purposes */
    console.log(`Array of placed bids: ${placedBids}`);
    console.log(`Array of placed asks: ${placedAsks}`);

    /** Test if the returned arrays have the correct length */
    expect(placedBids).to.be.an('array').lengthOf(2);
    expect(placedAsks).to.be.an('array').lengthOf(2);

    /** Check ID of retrieved orders to test if the content of the orders has been stored correctly */
    [0,1].forEach( index => {
      expect(placedBids[index].id).to.be.eql(bids[index].id);
      expect(placedAsks[index].id).to.be.eql(asks[index].id);
    });

  })



  it('UNIT TEST 2: PAR1 and PAR2 both try to access the private information of the orders placed by PAR1 for AUC1', async () => {

    /** Invoke transaction as PAR1 belonging to org3 */
    let resPAR1 = await energymarketCtrl.org3.getBidPrivateDetails(bids[0].id).catch(ex => ex.responses[0].error.message).then(details => new BidPrivateDetails(details));

    /** Invoke transaction as PAR2 belonging to org4 */
    let resPAR2 = await energymarketCtrl.org4.getBidPrivateDetails(bids[0].id).catch(ex => ex.responses[0].error.message).then(details => new BidPrivateDetails(details));

    /** First expect formulated as positive */
    expect(resPAR1.id).to.eql(bids[0].id);
    /** Second expect formulated as negative */
    expect(resPAR2.id).to.not.eql(bids[0].id);
    
  });



  it('UNIT TEST 3: PAR1 sends its actual smart meter consumption and makes sure it is successfully stored on the ledger', async () => {

    /** Calculate the sum of all bids and asks placed by PAR1 for AUC1 */
    let bidAmount = bids.filter(bid => bid.sender === 'PAR1').reduce((acc,bid) => acc + bid.amount, 0);
    let askAmount = asks.filter(ask => ask.sender === 'PAR1').reduce((acc,ask) => acc + ask.amount, 0);

    /** Create a smart meter reading where the actual consumption and or production differs slightly from the submitted numbers */
    let reading = new SmartMeterReading({
      id: 'READ_AUC1_org3',
      auctionPeriod: auction.id,
      consumed: bidAmount + Math.floor(Math.random() * bidAmount/10) - Math.floor(Math.random() * bidAmount/10),
      produced: askAmount + Math.floor(Math.random() * askAmount/10) - Math.floor(Math.random() * askAmount/10)
    });

    let res = await energymarketCtrl['org3'].sendReading(reading).catch(ex => ex.responses[0].error.message);

    let savedPAR = await energymarketCtrl.org1.getMarketParticipantById('PAR1').catch(ex => ex.responses[0].error.message).then(participant => new MarketParticipant(participant));
    
    expect(savedPAR.readings).to.be.an('array').lengthOf(1);
  });



  it('UNIT TEST 4: 4 market participants each place 2 oders, the market is cleared, readings sumbitted, and market settled', async () => {

    /** Creates an Auction instance */
    auction = new Auction({
      id: 'AUC2',
      start: Date.now(),
      end: (Date.now() + 1000000)
    });
    await energymarketCtrl.org1.createAuction(auction).catch(ex => ex.responses[0].error.message);

    let numberOfBids = 2;
    for (let i=0; i<numberOfBids; i++) {
      bids[i] = new FullBid({ 
        id: `BID_${i}_${auction.id}_PAR1_org3`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR1'
      });
    }

    for (let i=0; i<numberOfBids; i++) {
      bids[i] = new FullBid({ 
        id: `BID_${i}_${auction.id}_PAR3_org5`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR3'
      });
    }

    let numberOfAsks = 2;
    for (let i=0; i<numberOfAsks; i++) {
      asks[i] = new FullAsk({ 
        id: `ASK_${i}_${auction.id}_PAR2_org4`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR2'
      });
    }

    for (let i=0; i<numberOfAsks; i++) {
      asks[i] = new FullAsk({ 
        id: `ASK_${i}_${auction.id}_PAR4_org6`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR4'
      });
    }

    /** Place the bids as the "rightful" organisation */
    for(const bid of bids){
      /** The bid is split in its 'public' and its 'private' part */
      let publicBid = new Bid({id: bid.id, auctionId: bid.auctionId, sender: bid.sender});
      /** Public transaction: bid.id.substring(16,) = orgX */
      await energymarketCtrl[bid.id.substring(16,)].placeBid(publicBid);
      /** Private transaction */
      await energymarketCtrl[bid.id.substring(16,)]      //[Object.keys(fingerprint).find(key => fingerprint[key] === bid.sender)]
        .$config({transient: { bid: bid.toJSON() }})
        .sendBidPrivateDetails()
        .catch(ex => ex.responses[0].error.message);
    }

    /** Same for the asks */
    for (const ask of asks) { 
      let publicAsk = new Ask({id: ask.id, auctionId: ask.auctionId, sender: ask.sender});
      await energymarketCtrl[ask.id.substring(16,)].placeAsk(publicAsk);
      await energymarketCtrl[ask.id.substring(16,)]
        .$config({transient: { ask: ask.toJSON() }})
        .sendAskPrivateDetails()
        .catch(ex => ex.responses[0].error.message);
    }

    /** Retrieve all orders for AUC2 from the ledger */
    let placedBids = await energymarketCtrl.org1.getBidsByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(bids => bids.map(bid => new Bid(bid)));
    let placedAsks = await energymarketCtrl.org1.getAsksByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(asks => asks.map(ask => new Ask(ask)));;
    
    /** Make sure all orders have been placed successfully */
    expect(placedBids).to.be.an('array').lengthOf(4);
    expect(placedAsks).to.be.an('array').lengthOf(4);


    /******************/
    /** CLEAR AUCTION */
    /******************/

    let bidPrivateDetails = bids.map(bid => new BidPrivateDetails({id: bid.id, price: bid.price, amount: bid.amount}));
    let askPrivateDetails = asks.map(ask => new AskPrivateDetails({id: ask.id, price: ask.price, amount: ask.amount}));
 
    /** Invoke the clearAuction transaction as LMO (org1) */
    let response = await energymarketCtrl.org1
      .$config({transient: { bids: JSON.stringify(bidPrivateDetails) , asks: JSON.stringify(askPrivateDetails) }})
      .clearAuction(auction.id)
      .catch(ex => ex.responses[0].error.message)
      .then(auction => new Auction(auction));
    console.log(response);

    /** Retrieve cleared auction from ledger */
    let clearedAuction = await energymarketCtrl.org1.getAuctionById(auction.id).catch(ex => ex.responses[0].error.message).then(auction => new Auction(auction));
    
    /** Filter the successfull bids */
    let successfulBids = await energymarketCtrl.org1.getBidsByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(bids => bids.map(bid => new Bid(bid)));
    successfulBids = successfulBids.filter(bid => bid.successful == true);
    let successfulAsks = await energymarketCtrl.org1.getAsksByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(asks => asks.map(ask => new Ask(ask)));;
    successfulAsks = successfulAsks.filter(ask => ask.successful == true);
    
    /** Make sure all successful bids have prices equal or higher than the MCP */
    for(let successfulBid of successfulBids){
      let index = bids.findIndex(bid => bid.id == successfulBid.id);
      expect(bids[index].price).to.be.at.least(clearedAuction.mcp);
      bids[index].successful = true;
      if(successfulBid.unmatchedDemand){bids[index].unmatchedAmount = successfulBid.unmatchedDemand}
    };
    /** Make sure all successful asks have prices equal or lower than the MCP */
    for(let successfulAsk of successfulAsks){
      let index = asks.findIndex(ask => ask.id == successfulAsk.id);
      expect(asks[index].price).to.be.at.most(clearedAuction.mcp);
      asks[index].successful = true;
      if(successfulAsk.unmatchedSupply){asks[index].unmatchedAmount = successfulAsk.unmatchedSupply}
    }

    /************************/
    /** SEND METER READINGS */
    /************************/

    /** Create a Smart Meter Reading for every participant which can differ up to 10% from actual consumption/production */
    let numberOfReadings = numberOfOrganisations - 2;
    let readings = new Array<SmartMeterReading>(numberOfReadings);
    for (let i=0; i<numberOfReadings; i++) {
      let bidAmount = bids.filter(bid => bid.sender === `PAR${(i+1)}`).reduce((acc,bid) => acc + bid.amount, 0);
      let askAmount = asks.filter(ask => ask.sender === `PAR${(i+1)}`).reduce((acc,ask) => acc + ask.amount, 0);
      readings[i] = new SmartMeterReading({
        id: `READ_${auction.id}_PAR${(i+1)}_${identityOrg[i+2]}`,
        auctionPeriod: auction.id,
        consumed: bidAmount + Math.floor(Math.random() * bidAmount/10) - Math.floor(Math.random() * bidAmount/10),
        produced: askAmount + Math.floor(Math.random() * askAmount/10) - Math.floor(Math.random() * askAmount/10)
      });
    }

    /** Invoke sendReading transaction for every participant */
    for (let i=3; i<=numberOfOrganisations; i++) { 
      let res = await energymarketCtrl['org' + i].sendReading(readings[i-3]).catch(ex => ex.responses[0].error.message); 
      console.log(res);
    }

    /** Make sure all reading have been successfully stored on the ledger */
    let savedPAR = await energymarketCtrl.org1.getAllMarketParticipants().catch(ex => ex.responses[0].error.message).then(participants => participants.map(p => new MarketParticipant(p)));
    savedPAR.forEach(participant => expect(participant.readings).to.be.an('array').lengthOf(1));


    /*******************/
    /** SETTLE AUCTION */
    /*******************/

    /** Update private details */
    bidPrivateDetails = bids.map(bid => new BidPrivateDetails({id: bid.id, price: bid.price, amount: bid.amount, unmatchedAmount: bid.unmatchedAmount}));
    askPrivateDetails = asks.map(ask => new AskPrivateDetails({id: ask.id, price: ask.price, amount: ask.amount, unmatchedAmount: ask.unmatchedAmount}));
   
    /** Invoke the settleAuction transaction as LMO (org1) */
    let res = await energymarketCtrl.org1
      .$config({transient: { bids: JSON.stringify(bidPrivateDetails) , asks: JSON.stringify(askPrivateDetails) }})
      .settleAuction(auction.id)
      .catch(ex => ex.responses[0].error.message);
    console.log(res);
    
    /** Retrieve instances from the ledger */
    let savedAuction = await energymarketCtrl.org1.getAuctionById(auction.id).catch(ex => ex.responses[0].error.message).then(auction => new Auction(auction));
    console.log(savedAuction);
    let savedMARKET = await energymarketCtrl.org1.getAllMarkets().catch(ex => ex.responses[0].error.message).then(markets => new Market(markets[0]));
    console.log(savedMARKET);
    let savedGRID = await energymarketCtrl.org2.getAllGrids().catch(ex => ex.responses[0].error.message).then(grid => new Grid(grid[0]));
    console.log(savedGRID);
    savedPAR = await energymarketCtrl.org3.getAllMarketParticipants().catch(ex => ex.responses[0].error.message).then(participants => participants.map(p => new MarketParticipant(p)));

    /** Calculate some values to compare with expected behaviour */
    let sumDemand = savedAuction.matchedAmount + savedAuction.unmatchedDemand;
    let sumSupply = savedAuction.matchedAmount + savedAuction.unmatchedSupply;
    let sumBids = bids.reduce( (acc, bid) => acc += bid.amount, 0);
    let sumAsks = asks.reduce( (acc, ask) => acc += ask.amount, 0);

    /** Retrieve orders from the ledger */
    successfulBids = await energymarketCtrl.org1.getBidsByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(bids => bids.map(bid => new Bid(bid)));
    successfulBids = successfulBids.filter(bid => bid.successful == true);
    successfulAsks = await energymarketCtrl.org1.getAsksByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(asks => asks.map(ask => new Ask(ask)));;
    successfulAsks = successfulAsks.filter(ask => ask.successful == true);
    
    /** Make sure the auction has been settled correctly */
    savedPAR.forEach(participant => expect(participant).to.have.deep.property('id'));
    expect(savedPAR).to.be.an('array').lengthOf(numberOfOrganisations - 2);
    expect(sumDemand).to.be.eql(sumBids);
    expect(sumSupply).to.be.eql(sumAsks);

    /** Test if the incentives for accurate bidding are implemented correctly */
    let bidAmount = bids.filter(bid => bid.sender === 'PAR1').reduce((acc,bid) => acc + bid.amount, 0);
    let diff = bidAmount - readings[0].consumed;
    if( diff > 0 ) {
      expect(savedPAR[0].coinBalance).to.be.eql( - (bidAmount * savedAuction.mcp) + ( diff * savedGRID.gridSellPrice ) )
    } else {
      expect(savedPAR[0].coinBalance).to.be.eql( - (bidAmount * savedAuction.mcp) + ( diff * savedGRID.gridBuyPrice ) )
    }

  });



  it('UNIT TEST 5: Same as UNIT TEST 4 until clearAuction and test hash function', async () => {

    /** Creates an Auction instance */
    auction = new Auction({
      id: 'AUC3',
      start: Date.now(),
      end: (Date.now() + 1000000)
    });
    await energymarketCtrl.org1.createAuction(auction).catch(ex => ex.responses[0].error.message);

    let numberOfBids = 2;
    for (let i=0; i<numberOfBids; i++) {
      bids[i] = new FullBid({ 
        id: `BID_${i}_${auction.id}_PAR1_org3`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR1'
      });
    }

    for (let i=0; i<numberOfBids; i++) {
      bids[i] = new FullBid({ 
        id: `BID_${i}_${auction.id}_PAR3_org5`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR3'
      });
    }

    let numberOfAsks = 2;
    for (let i=0; i<numberOfAsks; i++) {
      asks[i] = new FullAsk({ 
        id: `ASK_${i}_${auction.id}_PAR2_org4`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR2'
      });
    }

    for (let i=0; i<numberOfAsks; i++) {
      asks[i] = new FullAsk({ 
        id: `ASK_${i}_${auction.id}_PAR4_org6`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR4'
      });
    }

    /** Place the bids as the "rightful" organisation */
    for(const bid of bids){
      /** The bid is split in its 'public' and its 'private' part */
      let publicBid = new Bid({id: bid.id, auctionId: bid.auctionId, sender: bid.sender});
      /** Public transaction: bid.id.substring(16,) = orgX */
      await energymarketCtrl[bid.id.substring(16,)].placeBid(publicBid);
      /** Private transaction */
      await energymarketCtrl[bid.id.substring(16,)]      //[Object.keys(fingerprint).find(key => fingerprint[key] === bid.sender)]
        .$config({transient: { bid: bid.toJSON() }})
        .sendBidPrivateDetails()
        .catch(ex => ex.responses[0].error.message);
    }

    /** Same for the asks */
    for (const ask of asks) { 
      let publicAsk = new Ask({id: ask.id, auctionId: ask.auctionId, sender: ask.sender});
      await energymarketCtrl[ask.id.substring(16,)].placeAsk(publicAsk);
      await energymarketCtrl[ask.id.substring(16,)]
        .$config({transient: { ask: ask.toJSON() }})
        .sendAskPrivateDetails()
        .catch(ex => ex.responses[0].error.message);
    }

    /** Retrieve all orders for AUC3 from the ledger */
    let placedBids = await energymarketCtrl.org1.getBidsByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(bids => bids.map(bid => new Bid(bid)));
    let placedAsks = await energymarketCtrl.org1.getAsksByAuctionId(auction.id).catch(ex => ex.responses[0].error.message).then(asks => asks.map(ask => new Ask(ask)));;
    
    /** Make sure all orders have been placed successfully */
    expect(placedBids).to.be.an('array').lengthOf(4);
    expect(placedAsks).to.be.an('array').lengthOf(4);


    /******************/
    /** CLEAR AUCTION */
    /******************/

    let bidPrivateDetails = bids.map(bid => new BidPrivateDetails({id: bid.id, price: bid.price, amount: bid.amount}));
    let askPrivateDetails = asks.map(ask => new AskPrivateDetails({id: ask.id, price: ask.price, amount: ask.amount}));
 
    /** Invoke the clearAuction transaction as LMO (org1) */
    const res = await energymarketCtrl.org1
      .$config({transient: { bids: JSON.stringify(bidPrivateDetails) , asks: JSON.stringify(askPrivateDetails) }})
      .clearAuction(auction.id)
      .catch(ex => ex.responses[0].error.message)

    /** Retrieve cleared auction from ledger */
    let clearedAuction = await energymarketCtrl.org1.getAuctionById(auction.id).catch(ex => ex.responses[0].error.message).then(auction => new Auction(auction));
    expect(clearedAuction.mcp).to.exist;

    /** Make sure the hased values match the input values */
    bidPrivateDetails.forEach( (bid, index) => expect(sha1(bid)).to.eql(res.privateBidsHashes[index]));

  });



  it('UNIT TEST 6: auctions of variable durations', async () => {

    /** Creates an Auction instance of 15 minutes */
    auction = new Auction({
      id: 'AUC4',
      start: Date.now(),
      end: (Date.now() + 900000)
    });
    await energymarketCtrl.org1.createAuction(auction).catch(ex => ex.responses[0].error.message);

    /** Creates an Auction instance of 1 minute */
    auction = new Auction({
      id: 'AUC5',
      start: Date.now(),
      end: (Date.now() + 60000)
    });
    await energymarketCtrl.org1.createAuction(auction).catch(ex => ex.responses[0].error.message);

    /** Retrieve the created auction instance from the ledger */
    let auc4 = await energymarketCtrl.org1.getAuctionById('AUC4').catch(ex => ex.responses[0].error.message).then(auction => new Auction(auction));
    let auc5 = await energymarketCtrl.org1.getAuctionById('AUC5').catch(ex => ex.responses[0].error.message).then(auction => new Auction(auction));

    /** Test auction durations */
    expect(auc4.end - auc4.start).to.eql(900000);
    expect(auc5.end - auc5.start).to.eql(60000);

  });



  it('UNIT TEST 7: try to place order on closed auction AUC1 is expected to fail', async () => {

    let bid = new FullBid({ 
      id: `BID_test_AUC1_PAR1_org3`, 
      auctionId: 'AUC1', 
      amount: Math.floor(Math.random() * 100) + 1, 
      price: Math.floor(Math.random() * 21) + 5,
      sender: 'PAR1'
    });

   
    let publicBid = new Bid({id: bid.id, auctionId: bid.auctionId, sender: bid.sender});
      /** Promis is expected to be rejected */
      await expect(energymarketCtrl[bid.id.substring(16,)].placeBid(publicBid)).to.be.rejected;
      /** Private transaction also expected to be rejected */
      await expect(energymarketCtrl[bid.id.substring(16,)]      //[Object.keys(fingerprint).find(key => fingerprint[key] === bid.sender)]
        .$config({transient: { bid: bid.toJSON() }})
        .sendBidPrivateDetails()
        .catch(ex => ex.responses[0].error.message)).to.be.rejected;

  });

  it('UNIT TEST 8: try to clear auction while it is still OPEN is expected to fail', async () => {

    /** Creates an Auction instance of 15 minutes */
    auction = new Auction({
      id: 'AUC6',
      start: Date.now(),
      end: (Date.now() + 900000)
    });
    await energymarketCtrl.org1.createAuction(auction).catch(ex => ex.responses[0].error.message);

    /** Create empty arrays of orders for testing */
    let bidPrivateDetails = new Array<BidPrivateDetails>();
    let askPrivateDetails = new Array<AskPrivateDetails>();

    /** LMO tries to invoke the clear auction transaction but Promise is expected to be rejected */
    await expect(energymarketCtrl.org1
      .$config({transient: { bids: JSON.stringify(bidPrivateDetails) , asks: JSON.stringify(askPrivateDetails) }})
      .clearAuction(auction.id)
      .catch(ex => ex.responses[0].error.message)).to.be.rejected;

  });



  it('UNIT TEST 9: not all market participants send their smart meter readings and settleAuction is expected to fail', async () => {

    let numberOfBids = 2;
    for (let i=0; i<numberOfBids; i++) {
      bids[i] = new FullBid({ 
        id: `BID_${i}_${auction.id}_PAR1_org3`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR1'
      });
    }

    for (let i=0; i<numberOfBids; i++) {
      bids[i] = new FullBid({ 
        id: `BID_${i}_${auction.id}_PAR3_org5`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR3'
      });
    }

    let numberOfAsks = 2;
    for (let i=0; i<numberOfAsks; i++) {
      asks[i] = new FullAsk({ 
        id: `ASK_${i}_${auction.id}_PAR2_org4`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR2'
      });
    }

    for (let i=0; i<numberOfAsks; i++) {
      asks[i] = new FullAsk({ 
        id: `ASK_${i}_${auction.id}_PAR4_org6`, 
        auctionId: auction.id, 
        amount: Math.floor(Math.random() * 100) + 1, 
        price: Math.floor(Math.random() * 21) + 5,
        sender: 'PAR4'
      });
    }

    /** Place the bids as the "rightful" organisation */
    for(const bid of bids){
      /** The bid is split in its 'public' and its 'private' part */
      let publicBid = new Bid({id: bid.id, auctionId: bid.auctionId, sender: bid.sender});
      /** Public transaction: bid.id.substring(16,) = orgX */
      await energymarketCtrl[bid.id.substring(16,)].placeBid(publicBid);
      /** Private transaction */
      await energymarketCtrl[bid.id.substring(16,)]      //[Object.keys(fingerprint).find(key => fingerprint[key] === bid.sender)]
        .$config({transient: { bid: bid.toJSON() }})
        .sendBidPrivateDetails()
        .catch(ex => ex.responses[0].error.message);
    }

    /** Same for the asks */
    for (const ask of asks) { 
      let publicAsk = new Ask({id: ask.id, auctionId: ask.auctionId, sender: ask.sender});
      await energymarketCtrl[ask.id.substring(16,)].placeAsk(publicAsk);
      await energymarketCtrl[ask.id.substring(16,)]
        .$config({transient: { ask: ask.toJSON() }})
        .sendAskPrivateDetails()
        .catch(ex => ex.responses[0].error.message);
    }


    /******************/
    /** CLEAR AUCTION */
    /******************/

    let bidPrivateDetails = bids.map(bid => new BidPrivateDetails({id: bid.id, price: bid.price, amount: bid.amount}));
    let askPrivateDetails = asks.map(ask => new AskPrivateDetails({id: ask.id, price: ask.price, amount: ask.amount}));
 
    /** Invoke the clearAuction transaction as LMO (org1) */
    let response = await energymarketCtrl.org1
      .$config({transient: { bids: JSON.stringify(bidPrivateDetails) , asks: JSON.stringify(askPrivateDetails) }})
      .clearAuction(auction.id)
      .catch(ex => ex.responses[0].error.message)
      .then(auction => new Auction(auction));
    console.log(response);

    
    /************************/
    /** SEND METER READINGS */
    /************************/

    /** Create a Smart Meter Reading for every participant which can differ up to 10% from actual consumption/production
     * BUT NOT FOR PAR4
     */
    let numberOfReadings = numberOfOrganisations - 3;   // changed to -3 in order to neglect PAR4
    let readings = new Array<SmartMeterReading>(numberOfReadings);
    for (let i=0; i<numberOfReadings; i++) {
      let bidAmount = bids.filter(bid => bid.sender === `PAR${(i+1)}`).reduce((acc,bid) => acc + bid.amount, 0);
      let askAmount = asks.filter(ask => ask.sender === `PAR${(i+1)}`).reduce((acc,ask) => acc + ask.amount, 0);
      readings[i] = new SmartMeterReading({
        id: `READ_${auction.id}_PAR${(i+1)}_${identityOrg[i+2]}`,
        auctionPeriod: auction.id,
        consumed: bidAmount + Math.floor(Math.random() * bidAmount/10) - Math.floor(Math.random() * bidAmount/10),
        produced: askAmount + Math.floor(Math.random() * askAmount/10) - Math.floor(Math.random() * askAmount/10)
      });
    }

    /** Invoke sendReading transaction for every participant */
    for (let i=3; i<numberOfOrganisations; i++) {         // changed <= into < in order to neglect PAR4
      let res = await energymarketCtrl['org' + i].sendReading(readings[i-3]).catch(ex => ex.responses[0].error.message); 
      console.log(res);
    }


    /*******************/
    /** SETTLE AUCTION */
    /*******************/

    /** Update private details */
    bidPrivateDetails = bids.map(bid => new BidPrivateDetails({id: bid.id, price: bid.price, amount: bid.amount, unmatchedAmount: bid.unmatchedAmount}));
    askPrivateDetails = asks.map(ask => new AskPrivateDetails({id: ask.id, price: ask.price, amount: ask.amount, unmatchedAmount: ask.unmatchedAmount}));
   
    /** LMO tries to invoke settleAuction transaction but Promise is expected to be rejected*/
    await expect(energymarketCtrl.org1
      .$config({transient: { bids: JSON.stringify(bidPrivateDetails) , asks: JSON.stringify(askPrivateDetails) }})
      .settleAuction(auction.id)
      .catch(ex => ex.responses[0].error.message)).to.be.rejected;

  });



  it('UNIT TEST 10: market participant tries placing order in the name of another market participant', async () => {

    /** Creates an Auction instance */
    auction = new Auction({
      id: 'AUC7',
      start: Date.now(),
      end: (Date.now() + 900000)
    });
    await energymarketCtrl.org1.createAuction(auction).catch(ex => ex.responses[0].error.message);

    let bid = new FullBid({ 
      id: `BID_1_AUC1_PAR1_org3`, 
      auctionId: 'AUC7', 
      amount: Math.floor(Math.random() * 100) + 1, 
      price: Math.floor(Math.random() * 21) + 5,
      sender: 'PAR1'
    });

    let publicBid = new Bid({id: bid.id, auctionId: bid.auctionId, sender: bid.sender});
    /** PAR2 (org4) tries to place the bid in PAR1's name but Promises are rejected */
    await expect(energymarketCtrl.org4.placeBid(publicBid)).to.be.rejected;
    await expect(energymarketCtrl.org4
      .$config({transient: { bid: bid.toJSON() }})
      .sendBidPrivateDetails()
      .catch(ex => ex.responses[0].error.message)).to.be.rejected;

  });



  it('UNIT TEST 11: market participant tries sending smart meter reading in the name of another participant', async () => {

    /** Create a test reading with ID of PAR1 */
    let reading = new SmartMeterReading({
        id: 'READ_AUC7_PAR1_org3',
        auctionPeriod: auction.id,
        consumed: 100,
        produced: 0
      });

    /** PAR2 (org4) tries to send it as PAR1 */
    let res = await energymarketCtrl.org4.sendReading(reading).catch(ex => ex.responses[0].error.message);

    /** Retrieve participant PAR1 and PAR2 from the ledger */
    let par1 = await energymarketCtrl.org1.getMarketParticipantById('PAR1').catch(ex => ex.responses[0].error.message).then(participant => new MarketParticipant(participant));
    let par2 = await energymarketCtrl.org1.getMarketParticipantById('PAR2').catch(ex => ex.responses[0].error.message).then(participant => new MarketParticipant(participant));

    /** Expect the last element of the readings array to NOT BE the above reading */
    expect(par1.readings[par1.readings.length -1].auctionPeriod).not.to.eql(auction.id);
    /** Expect to find the above reading within PAR2's readings array*/
    expect(par2.readings[par2.readings.length -1].auctionPeriod).to.eql(auction.id);

  });

  

  it('UNIT TEST 12: a market participant tries invoking the clearMarket transaction', async () => {

    /** Creates an Auction instance of 1 millisecond */
    auction = new Auction({
      id: 'AUC8',
      start: Date.now(),
      end: (Date.now() + 1)
    });
    await energymarketCtrl.org1.createAuction(auction).catch(ex => ex.responses[0].error.message);

    /** Create empty arrays of orders for testing */
    let bidPrivateDetails = new Array<BidPrivateDetails>();
    let askPrivateDetails = new Array<AskPrivateDetails>();

    /** LMO tries to invoke the clear auction transaction but Promise is rejected */
    await expect(energymarketCtrl.org2
      .$config({transient: { bids: JSON.stringify(bidPrivateDetails) , asks: JSON.stringify(askPrivateDetails) }})
      .clearAuction(auction.id)
      .catch(ex => ex.responses[0].error.message)).to.be.rejected;

  });

});