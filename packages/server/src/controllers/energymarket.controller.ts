
import { Router, Request, Response } from 'express';
// import { PersonControllerBackEnd, InitServerIdentity } from '../convector';
import { EnergymarketControllerBackEnd } from '../convector';
// import { Person, Attribute } from 'person-cc';
import {
    EnergymarketController,
    Ask,
    AskPrivateDetails,
    FullAsk,
    Auction,
    Bid,
    BidPrivateDetails,
    FullBid,
    Grid,
    Market,
    MarketParticipant,
    SmartMeterReading,
    ParticipantType
} from 'energymarket-cc'
import { identityId } from '../env';
import { read } from 'fs';

const router: Router = Router();

// Check if the server identity has been enrolled successfully
// InitServerIdentity();

/** Create a new Market */
router.post('/market', async (req: Request, res: Response) => {
    try {
        const { id, gridBuyPrice, gridSellPrice } = req.body;
        const marketToCreate = new Market({ id, gridBuyPrice, gridSellPrice });
        await EnergymarketControllerBackEnd.createMarket(marketToCreate)
        res.status(201).send();
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get market */
router.get('/market', async (req: Request, res: Response) => {
    try {
        /** gets all market instances, but normally only one */
        const marketArray = await EnergymarketControllerBackEnd.getAllMarkets()
        /** only takes the first one */
        const marketToReturn = new Market(marketArray[0]);
        res.send(marketToReturn.toJSON());
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Create a new Grid */
router.post('/grid', async (req: Request, res: Response) => {
    try {
        const { id, gridBuyPrice, gridSellPrice } = req.body;
        const gridToCreate = new Grid({ id, gridBuyPrice, gridSellPrice });
        await EnergymarketControllerBackEnd.createGrid(gridToCreate)
        res.status(201).send();
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get grid */
router.get('/grid', async (req: Request, res: Response) => {
    try {
        /** gets all grid instances, but normally only one */
        const gridArray = await EnergymarketControllerBackEnd.getAllGrids()
        /** only takes the first one */
        const gridToReturn = new Grid(gridArray[0]);
        res.send(gridToReturn.toJSON());
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});


/** Create a new Auction */
router.post('/auction', async (req: Request, res: Response) => {
    try {
        const { id, start, end } = req.body;
        const auctionToCreate = new Auction({ id, start, end });
        await EnergymarketControllerBackEnd.createAuction(auctionToCreate)
        res.status(201).send();
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
     }
});

/** Get Auction by 'id' */
router.get('/auction/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        /** gets all grid instances, but normally only one */
        const auctionToReturn = await EnergymarketControllerBackEnd.getAuctionById(id);
        res.send(auctionToReturn.toJSON());
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get all Auctions */
router.get('/auction', async (req: Request, res: Response) => {
    try {
        /** gets all auction instances*/
        const auctionsToReturn = await EnergymarketControllerBackEnd.getAllAuctions();
        res.send(JSON.stringify(auctionsToReturn));
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});


/** Create a new MarketParticipant */
router.post('/marketParticipant', async (req: Request, res: Response) => {
    try {
        let { id, name, is, coinBalance, energyBalance } = req.body;
        if(is == "consumer") { 
            is = ParticipantType.consumer;
        } else if(is == "producer") { 
            is = ParticipantType.producer;
        } else if(is == "prosumer") {
            is = ParticipantType.prosumer;
        } else { throw new Error("participant type could not be processed correctly")}
        const marketParticipantToCreate = new MarketParticipant({ id, fingerprint, is, coinBalance, energyBalance });
        await EnergymarketControllerBackEnd.createMarketParticipant(marketParticipantToCreate)
        res.status(201).send();
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get MarketParticipant by 'id' */
router.get('/marketParticipant/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        /** gets MarketParticipant by id */
        const marketParticipantToReturn = await EnergymarketControllerBackEnd.getMarketParticipantById(id);
        res.send(marketParticipantToReturn.toJSON());
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get all MarketParticipants */
router.get('/marketParticipant', async (req: Request, res: Response) => {
    try {
        /** gets all marketParticipant instances */
        const marketParticipantsToReturn = await EnergymarketControllerBackEnd.getAllMarketParticipants();
        res.send(JSON.stringify(marketParticipantsToReturn));
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});


/** Place a new Bid */
router.post('/bid', async (req: Request, res: Response) => {
    try {
        const { id, auctionId, amount, price, sender } = req.body;
        const bid = new FullBid({ id, auctionId, amount, price, sender });
        await EnergymarketControllerBackEnd
            .$config({transient: { bid: bid.toJSON() }})
            .placeBid();
        res.status(201).send();
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get Bids by 'id' */
router.get('/bid/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        /** gets Bid by auctionId */
        const bidToReturn = await EnergymarketControllerBackEnd.getBidById(id);
        res.send(bidToReturn.toJSON());
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get Bids by 'auctionId' */
router.get('/bid/:id', async (req: Request, res: Response) => {
    try {
        const { auctionId } = req.params;
        /** gets Bid by auctionId */
        const bidsToReturn = await EnergymarketControllerBackEnd.getBidsByAuctionId(auctionId);
        res.send(JSON.stringify(bidsToReturn));
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get all Bids */
router.get('/bid', async (req: Request, res: Response) => {
    try {
        /** gets all Bid instances */
        const bidsToReturn = await EnergymarketControllerBackEnd.getAllBids();
        res.send(JSON.stringify(bidsToReturn));
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});


/** Place a new Ask */
router.post('/ask', async (req: Request, res: Response) => {
    try {
        const { id, auctionId, amount, price, sender } = req.body;
        const ask = new FullAsk({ id, auctionId, amount, price, sender });
        await EnergymarketControllerBackEnd
            .$config({transient: { ask: ask.toJSON() }})
            .placeAsk();
        res.status(201).send();
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get Asks by 'id' */
router.get('/ask/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        /** gets Ask by auctionId */
        const askToReturn = await EnergymarketControllerBackEnd.getAskById(id);
        res.send(askToReturn.toJSON());
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get Asks by 'auctionId' */
router.get('/ask/:id', async (req: Request, res: Response) => {
    try {
        const { auctionId } = req.params;
        /** gets Ask by auctionId */
        const asksToReturn = await EnergymarketControllerBackEnd.getAsksByAuctionId(auctionId);
        res.send(JSON.stringify(asksToReturn));
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

/** Get all Asks */
router.get('/ask', async (req: Request, res: Response) => {
    try {
        /** gets all Ask instances */
        const asksToReturn = await EnergymarketControllerBackEnd.getAllAsks();
        res.send(JSON.stringify(asksToReturn));
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});


/** Clear Auction */
router.post('/clearAuction/:id', async (req: Request, res: Response) => {
    try {
        const { auctionId } = req.params;
        const clearedAuction = await EnergymarketControllerBackEnd.clearAuction(auctionId);
        res.status(201).send(clearedAuction.toJSON());
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});


/** Send SmartMeter Reading for participantId*/
router.post('/smartMeter/:id', async (req: Request, res: Response) => {
    try {
        const { participantId } = req.params;
        const { auctionPeriod, consumed, produced } = req.body;
        const reading = new SmartMeterReading({auctionPeriod, consumed, produced});
        const participantWithReading = await EnergymarketControllerBackEnd.sendReading(reading, participantId);
        res.status(201).send(participantWithReading.toJSON());
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});


/** Escrow Auction */
router.post('/clearAuction/:id', async (req: Request, res: Response) => {
    try {
        const { auctionId } = req.params;
        const escrowedAuction = await EnergymarketControllerBackEnd.escrowAuction(auctionId);
        res.status(201).send(JSON.stringify(escrowedAuction));
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

export const EnergymarketExpressController: Router = router;