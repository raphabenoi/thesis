import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';

/** yup helps checking types */
import * as yup from 'yup';

import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

/** Import all the model files */
import { Ask } from './models/ask.model';
import { Auction } from './models/auction.model';
import { Bid } from './models/bid.model';
import { Market } from './models/market.model';
import { MarketParticipant } from './models/marketParticipant.model';

/** Import the API decorators which make it easier to create a REST API later on
 * @remarks find the documentation {@link https://medium.com/worldsibu/automatically-generate-a-nodejs-api-backend-for-hyperledger-fabric-with-convector-3ee7f3318230 | here}
 */
import { GetById, GetAll, Create, Service } from '@worldsibu/convector-rest-api-decorators';
import { toASCII } from 'punycode';
import { debug } from 'util';

@Controller('energymarket')
export class EnergymarketController extends ConvectorController<ChaincodeTx> {

  /*****************************************************************
   * FUNCTIONS REGARDING MARKET PARTICIPANTS * * * * * * * * * * * * 
   *****************************************************************/

  /** Create a new 'MarketParticipant' */
  @Create('MarketParticipant')
  @Invokable()
  public async createMarketParticipant(
    @Param(MarketParticipant)
    marketParticipant: MarketParticipant
  ) {
    /** Saves the new 'MarketParticipant' to state */
    await marketParticipant.save();
  }

  /** Gets all 'MarketParticipant' instances */
  @GetAll('MarketParticipant')
  @Invokable()
  public async getAllMarketParticipants()
  {
    const storedMarketParticipants = await MarketParticipant.getAll<MarketParticipant>();
    return storedMarketParticipants;
  }

  /** Gets 'MarketParticipant' with the passed 'id' */
  @GetById('MarketParticipant')
  @Invokable()
  public async getMarketParticipantById(
    @Param(yup.string())
    marketParticipantId: string
  )
  {
    const marketParticipant = await MarketParticipant.getOne(marketParticipantId);
    return marketParticipant;
  }



  /*****************************************************************
   * FUNCTIONS REGARDING AUCTIONS  * * * * * * * * * * * * * * * * *
   *****************************************************************/

  /** Create a new 'Auction' instance */
  @Create('Auction')
  @Invokable()
  public async createAuction(
    @Param(Auction)
    auction: Auction
    ) {
    /** 
     * @todo Make sure no 'Auction' existis with the same (or overlapping) time period 
     * @todo Restdrict the creation of an 'Auction' instance to 'LocalMarketOperator'
    */
    await auction.save();
  }

  /** Gets all 'Auction' instances */
  @GetAll('Auction')
  @Invokable()
  public async getAllAuctions()
  {
    const storedAuctions = await Auction.getAll<Auction>();
    return storedAuctions;
  }

  /** Gets 'Auction' with the passed 'id' */
  @GetById('Auction')
  @Invokable()
  public async getAuctionById(
    @Param(yup.string())
    auctionId: string
  )
  {
    const auction = await Auction.getOne(auctionId);
    return auction;
  }



  /*****************************************************************
   * FUNCTIONS REGARDING MARKET  * * * * * * * * * * * * * * * * * *
   *****************************************************************/

  /** Create a new 'Market' instance. Normally only one 'Market' */
  @Create('Market')
  @Invokable()
  public async createMarket(
    @Param(Market)
    market: Market
    ) {
    /** 
     * @todo Make sure no other 'Market' instance exists 
     * @todo Restrict creation of this instance to 'LocalMarketOperator' admin
    */
    await market.save();
  }

  /** Gets all 'Market' instances. Should only be one. So no '@GetById' is necessary */
  @GetAll('Market')
  @Invokable()
  public async getAllMarkets()
  {
    const storedMarkets = await Market.getAll<Market>();
    return storedMarkets;
  }



  /*****************************************************************
   * FUNCTIONS REGARDING BIDS  * * * * * * * * * * * * * * * * * * *
   *****************************************************************/
  
  /** Transaction that places a new bid */
  @Create('Bid')
  @Invokable()
  public async placeBid(
    @Param(Bid)
    bid: Bid
    ) {
    /** Get the 'Auction' instance on which the sender is bidding */
    const auction = await Auction.getOne(bid.auctionId);
    const txTimestamp = this.tx.stub.getTxDate().getTime();

    /** Check if 'Auction' is still 'OPEN' for new bids */
    if (txTimestamp >= auction.end) {
      /** If it is the first bid after the 'Auction' has ended it changes the 'status' to 'CLOSED' */
      if(auction.status === 0) {
        auction.status = 1;
        await auction.save();
      }

      throw new Error("The auction is already closed and does not accept new bids")
    }

    /** If 'Auction' still 'OPEN' save the bid */
    if (txTimestamp < auction.end) {
      /** Get the 'MarketParticipant' invoking this transaction */
      const bidder = await MarketParticipant.getOne(this.sender);

      /** Check if bidder has enough coins plus a buffer of 10€
       * @todo Make the buffer a variable. Maybe store it in the 'Market'
       * @todo Change buffer to -1000 !!!
       */
      if ((bidder.coinBalance + 1000) < (bid.amount * bid.price)) {
        throw new Error("Bidder does not have enough coins to place this bid")
      } else {
        /** Freeze the coins relative to the bid size */
        bidder.coinBalance =- (bid.amount * bid.price);
        bidder.frozenCoins += (bid.amount * bid.price);

        /** Adds (or overwrites) the sender of the bid as the identity invoking the transaction */
        bid.sender = this.sender;
      }

      /** Update bidder and save the newly placed bid */
      await bidder.save();
      await bid.save();
      return bid;
    }
  }

  /** Gets all 'Bid' instances.
   * @todo Restrict the returned bids placed by the sender of this transaction
  */
  @GetAll('Bid')
  @Invokable()
  public async getAllBids()
  {
    const storedBids = await Bid.getAll<Bid>();
    return storedBids;
  }

  /** Gets 'Bid' with the passed 'id'
   * @todo Restrict the invocktion of this function only to those where bid.sender == this.sender
   */
  @GetById('Bid')
  @Invokable()
  public async getBidById(
    @Param(yup.string())
    bidId: string
  )
  {
    const bid = await Bid.getOne(bidId);
    return bid;
  }

  /** Returns all bids for a specific 'Auction'
   * @param auctionId the ID of the auction
  */
  @Service()
  @Invokable()
  public async getBidsByAuctionId(
    @Param(yup.string())
    auctionId: string
  )
  {
    const allBids = await Bid.getAll<Bid>();
    const bids = allBids.filter(bid => bid.auctionId === auctionId);
    return bids;
  }


  /*****************************************************************
   * FUNCTIONS REGARDING ASKS  * * * * * * * * * * * * * * * * * * *
   *****************************************************************/
  
  /** Transaction that places a new ask */
  @Create('Ask')
  @Invokable()
  public async placeAsk(
    @Param(Ask)
    ask: Ask
    ) {
    /** Get the 'Auction' instance on which the sender is askding */
    const auction = await Auction.getOne(ask.auctionId);
    const txTimestamp = this.tx.stub.getTxDate().getTime();
    
    /** Check if 'Auction' is still 'OPEN' for new asks */
    if (txTimestamp >= auction.end) {

      /** If it is the first ask after the 'Auction' has ended it changes the 'status' to 'CLOSED' */
      if(auction.status === 0) {
        auction.status = 1;
        await auction.save();
      }

      throw new Error("The auction is already closed and does not accept new asks")
    }

    /** If 'Auction' still 'OPEN' save the ask */
    if (txTimestamp < auction.end) {

      /** Adds (or overwrites) the sender of the ask as the identity invoking the transaction */
      ask.sender = this.sender;
      
      /** Save the newly placed ask */
      await ask.save();
    }
  }

  /** Gets all 'Ask' instances.
   * @todo Restrict the returned asks placed by the sender of this transaction
  */
  @GetAll('Ask')
  @Invokable()
  public async getAllAsks()
  {
    const storedAsks = await Ask.getAll<Ask>();
    return storedAsks;
  }

  /** Gets 'Ask' with the passed 'id'
   * @todo Restrict the invocktion of this function only to those where ask.sender == this.sender
   */
  @GetById('Ask')
  @Invokable()
  public async getAskById(
    @Param(yup.string())
    askId: string
  )
  {
    const ask = await Ask.getOne(askId);
    return ask;
  }

  /** Returns all asks for a specific 'Auction'
   * @param auctionId the ID of the auction
  */
  @Service()
  @Invokable()
  public async getAsksByAuctionId(
    @Param(yup.string())
    auctionId: string
  )
  {
    const allAsks = await Ask.getAll<Ask>();
    const asks = allAsks.filter(ask => ask.auctionId === auctionId);
    return asks;
  }


  /*****************************************************************
   * CLEAR AUCTION FUNCTION  * * * * * * * * * * * * * * * * * * * *
   *****************************************************************/

  /** Transaction that clears the passed 'Auction' */
  @Service()
  @Invokable()
  public async clearAuction(
    @Param(yup.string())
    auctionId: string
    ):Promise<Auction> {

    /** Get the 'Auction' instance on which the sender is askding */
    const auction = await Auction.getOne(auctionId);
    
    /** @todo Uncomment next line and remove the other one! */
    // const txTimestamp = this.tx.stub.getTxDate().getTime();
    const txTimestamp = (Date.now() + 30000000);

    /** If 'Auction' still 'OPEN' throw an error */
    if (txTimestamp <= auction.end) {
      throw new Error("Auction is still 'OPEN' and cannot be cleared yet. Try again once 'txTimestamp' > 'auction.end'");
    }
    
    /** Check if 'Auction' is 'CLOSED and can be cleared */
    if (txTimestamp > auction.end) {
      
      /** Get all bids related to the specified 'auctionId' */
      const bids = <Bid[]>(await Bid.query(Bid,
        {
          "selector": {
            "type": "de.rli.hypenergy.bid",
            "auctionId": auctionId
          }
        }));

      /** Get all asks related to the specified 'auctionId' */
      const asks = <Ask[]>(await Ask.query(Ask,
        {
          "selector": {
            "type": "de.rli.hypenergy.ask",
            "auctionId": auctionId
          }
        }));

      /** Go through all bids and asks and find the lowest price */
      let lowestPrice = [...bids, ...asks].reduce(function (acc, element) {
        if (element.price < acc) { acc = element.price }
        return acc;
      }, 9999999);

      /** Go through all bids and asks and find the highest price */
      let highestPrice = [...bids, ...asks].reduce(function (acc, element) {
        if (element.price > acc) { acc = element.price }
        return acc;
      }, 0); // can certainly be done more elegantly :)

      /** Create an Array where all amounts are summed up per price point */
      let demandCurve = new Array(30).fill(0);
      bids.map((bid) => demandCurve[bid.price] += bid.amount);

      /** Create an Array where all amounts are summed up per price point
       * @remark if a decimal point is allowed for bids -> array length = 300
       */
      let supplyCurve = new Array(30).fill(0);
      asks.map((ask) => supplyCurve[ask.price] += ask.amount);

      /** Create an actual curve by adding up amounts from previous price points
       * for supplyCurve starting at 'lowestPrice':  /
       * for demandCurve starting at 'highestPrice': \
       */
      let _highestPrice = highestPrice;
      for (let i = lowestPrice; i <= highestPrice; i++ ) {
        supplyCurve[i] += supplyCurve[i-1];
        demandCurve[_highestPrice-1] += demandCurve[_highestPrice];
        _highestPrice--;
      }

      debugger;

      /** Find the intersection of the two curves 
       * @todo what happens with the difference between produced amounts and consumed amounts at MCP?
       */
      for (let i = lowestPrice; i <= highestPrice; i++ ) {
        /** Go to the point where the supply equals or outpasses the demand */
        if (supplyCurve[i] >= demandCurve[i] && supplyCurve[i] != 0) {
          /** Make sure neither demand at this point nor supply one price point earlier are zero (= no match situation) */
          if (supplyCurve[i-1] != 0 && demandCurve[i] != 0) {
            /** If demand at this price point is smaller than supply one price point earlier -> reduce i */
            if (demandCurve[i] < supplyCurve[i-1]) {
              i--;
            }
            /** Set i as the new market clearing price for this auction
             * @todo emit new event that MCP has been found */
            auction.mcp = i;
            auction.status = 2;   /** Set AuctionStatus to 'CLEARED' */

            /** If demand != supply -> there is an amount that will not be satisfied at the given MCP */
            auction.matchedAmount = Math.min(supplyCurve[i], demandCurve[i]);
            auction.unmatchedDemand = demandCurve[lowestPrice] - auction.matchedAmount;
            auction.unmatchedSupply = supplyCurve[highestPrice] - auction.matchedAmount;
            
            /** Save the updated 'Auction' instance */
            auction.save();
            debugger;
            return auction;
          }
        }
      }
      /** If no match could be found (no asks or no intersection) set MCP = -1 (serves as check later)
       * @remark MCP is not equal to gridBuyPrice since demand should pay gridBuyPrice while supply feeds in at gridSellPrice!
       */
      auction.mcp = -1;
      auction.status = 2;   /** Set AuctionStatus to 'CLEARED' */
      auction.matchedAmount = 0;  /** No intersection has been found -> no match  */
      auction.unmatchedDemand = demandCurve[lowestPrice] - auction.matchedAmount;
      auction.unmatchedSupply = supplyCurve[highestPrice] - auction.matchedAmount;
      auction.save();
      return auction;
    }
  }

  
  /*****************************************************************
   * ESCROW AUCTION FUNCTION * * * * * * * * * * * * * * * * * * * *
   *****************************************************************/

  /** Transaction that clears the passed 'Auction' */
  @Service()
  @Invokable()
  public async escrowAuction(
    @Param(yup.string())
    auctionId: string
  ):Promise<Auction> {

    /** Get the 'Auction' instance on which the sender is askding */
    const auction = await Auction.getOne(auctionId);
    
    /** @todo Include some type of check to see if escrow already allowed to be called */
    // const txTimestamp = this.tx.stub.getTxDate().getTime();

    /** Get all bids related to the specified 'auctionId' */
    const bids = <Bid[]>(await Bid.query(Bid,
      {
        "selector": {
          "type": "de.rli.hypenergy.bid",
          "auctionId": auctionId
        }
      }));

    /** Get all asks related to the specified 'auctionId' */
    const allAsks = await Ask.getAll<Ask>();
    const asks = allAsks.filter(ask => ask.auctionId === auctionId);




    return auction;
  }






  /*****************************************************************
   * TRANSFER FUNCTION * * * * * * * * * * * * * * * * * * * * * * *
   *****************************************************************/

   /** Transaction that transfers coins from one participant to the other 
    * @todo Maybe make it a private transaction only invokable by the Escrow function
   */
   @Service()
   @Invokable()
   public async transferCoins(
    @Param(yup.string())
    from: string,
    @Param(yup.string())
    to: string,
    @Param(yup.number())
    amount: number
  ) {
    /** Get the 2 relevant 'MarketParticipants' */
    const fromParticipant = await MarketParticipant.getOne(from);
    const toParticipant = await MarketParticipant.getOne(to);

    if (!fromParticipant.id) {
      throw new Error(`Source participant ${from} doesn't exist`);
    }
    
    if (!toParticipant.id) {
      throw new Error(`Destination participant ${to} doesn't exist`);
    }

    /** @remark since the escrow function will be calling this it is not possible to check it like this! */
    /**
    if (fromParticipant.id != this.sender) {
      throw new Error(`Permission denied! Only the owner can transfer coins`)
    }
    */

    /** @todo should not be possible for participants to invoke this transaction outisde the escrow function */
    if(fromParticipant.coinBalance < amount || fromParticipant.frozenCoins < amount) {
      throw new Error(`Participant ${from} doesn't have enough coins`)
    }

    fromParticipant.coinBalance -= amount;
    toParticipant.coinBalance += amount;

    await Promise.all([fromParticipant.save(), toParticipant.save()]);
  }






}