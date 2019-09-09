import { Request, Response } from 'express';
import { EnergymarketControllerClient } from '../../../smartContractControllers';
import { Models } from '../../../smartContractModels';

export class Controller {

  async energymarket_getAllMarketParticipants(req: Request, res: Response): Promise<void> {
    let cntrl = await EnergymarketControllerClient.init();
    let result = await cntrl.getAllMarketParticipants();
    res.status(200).json(result);
  }

  async energymarket_getAllAuctions(req: Request, res: Response): Promise<void> {
    let cntrl = await EnergymarketControllerClient.init();
    let result = await cntrl.getAllAuctions();
    res.status(200).json(result);
  }

  async energymarket_getAllMarkets(req: Request, res: Response): Promise<void> {
    let cntrl = await EnergymarketControllerClient.init();
    let result = await cntrl.getAllMarkets();
    res.status(200).json(result);
  }

  async energymarket_getAllGrids(req: Request, res: Response): Promise<void> {
    let cntrl = await EnergymarketControllerClient.init();
    let result = await cntrl.getAllGrids();
    res.status(200).json(result);
  }

  async energymarket_getAllBids(req: Request, res: Response): Promise<void> {
    let cntrl = await EnergymarketControllerClient.init();
    let result = await cntrl.getAllBids();
    res.status(200).json(result);
  }

  async energymarket_getAllAsks(req: Request, res: Response): Promise<void> {
    let cntrl = await EnergymarketControllerClient.init();
    let result = await cntrl.getAllAsks();
    res.status(200).json(result);
  }


  async energymarket_getMarketParticipantById(req: Request, res: Response) {
    let cntrl = await EnergymarketControllerClient.init();
    let result = await cntrl.getMarketParticipantById(req.params.id);
    if (!result) {
      return res.status(404);
    }
    res.json(result);
  }

  async energymarket_getAuctionById(req: Request, res: Response) {
    let cntrl = await EnergymarketControllerClient.init();
    let result = await cntrl.getAuctionById(req.params.id);
    if (!result) {
      return res.status(404);
    }
    res.json(result);
  }

  async energymarket_getBidById(req: Request, res: Response) {
    let cntrl = await EnergymarketControllerClient.init();
    let result = await cntrl.getBidById(req.params.id);
    if (!result) {
      return res.status(404);
    }
    res.json(result);
  }

  async energymarket_getAskById(req: Request, res: Response) {
    let cntrl = await EnergymarketControllerClient.init();
    let result = await cntrl.getAskById(req.params.id);
    if (!result) {
      return res.status(404);
    }
    res.json(result);
  }

  async energymarket_createMarketParticipant(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let modelRaw = req.body;
      let model = new Models.MarketParticipant(modelRaw);
      let result = await cntrl.createMarketParticipant(model);
      res.json(result);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_createAuction(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let modelRaw = req.body;
      let model = new Models.Auction(modelRaw);
      let result = await cntrl.createAuction(model);
      res.json(result);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_createMarket(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let modelRaw = req.body;
      let model = new Models.Market(modelRaw);
      let result = await cntrl.createMarket(model);
      res.json(result);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_createGrid(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let modelRaw = req.body;
      let model = new Models.Grid(modelRaw);
      let result = await cntrl.createGrid(model);
      res.json(result);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_placeBid(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let modelRaw = req.body;
      let model = new Models.Bid(modelRaw);
      let result = await cntrl.placeBid(model);
      res.json(result);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_placeAsk(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let modelRaw = req.body;
      let model = new Models.Ask(modelRaw);
      let result = await cntrl.placeAsk(model);
      res.json(result);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_getBidsByAuctionId(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let params = req.body;
      
      let returnObject = await cntrl.getBidsByAuctionId(params.auctionId);
      if (returnObject === undefined) {
        return res.status(404);
      }
      res.json(returnObject);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_getAsksByAuctionId(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let params = req.body;
      
      let returnObject = await cntrl.getAsksByAuctionId(params.auctionId);
      if (returnObject === undefined) {
        return res.status(404);
      }
      res.json(returnObject);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_sendReading(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let params = req.body;
      
      let returnObject = await cntrl.sendReading(params.reading,params.participantId);
      if (returnObject === undefined) {
        return res.status(404);
      }
      res.json(returnObject);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_clearAuction(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let params = req.body;
      
      let returnObject = await cntrl.clearAuction(params.auctionId);
      if (returnObject === undefined) {
        return res.status(404);
      }
      res.json(returnObject);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_settleAuction(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let params = req.body;
      
      let returnObject = await cntrl.settleAuction(params.auctionId);
      if (returnObject === undefined) {
        return res.status(404);
      }
      res.json(returnObject);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_buyFromGrid(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let params = req.body;
      
      let returnObject = await cntrl.buyFromGrid(params.buyerId,params.amount);
      if (returnObject === undefined) {
        return res.status(404);
      }
      res.json(returnObject);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }

  async energymarket_transferCoins(req: Request, res: Response) {
    try {
      let cntrl = await EnergymarketControllerClient.init();
      let params = req.body;
      
      let returnObject = await cntrl.transferCoins(params.from,params.to,params.amount);
      if (returnObject === undefined) {
        return res.status(404);
      }
      res.json(returnObject);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex.stack);
    }
  }


}
export default new Controller();
