# Master Thesis
**Project Name: `hypenergy`**

This repositpry containts the code for my Master's thesis: the implementation of a decentralised application called **hypenergy**, a peer-to-peer marketplace for community-based local electricity markets.

* The full thesis can be downloaded [here](https://github.com/raphmc/thesis/raw/master/thesis/thesis.pdf).
* The chaincode describing the transaction logic can be found in: [`packages/energymarket-cc/src`](../packages/energymarket-cc/src).
* Test scripts and unit tests can be found in: [`packages/energymarket-cc/tests`](../packages/energymarket-cc/tests)


## Prerequisites
* `Node 8.15.0` (support for `node 10.x.x` was announced and could also work now)
* `Docker 18.09.2` (make sure installation contains docker-compose)
* `npm 6.4.1`
* `nvm` can be used to install and switch between different node versions


## Start

* Install dependencies (from the root of the project)  
`npm i`
* Create a new development blockchain network and install the chaincode on all peers (from the root of your project)  
`npm start`
* Create a market by invoking the createMarket transaction (if timeout, try again)  
`hurl invoke energymarket energymarket_createMarket "{\"id\":\"MKT\",\"auctionTime\":900000,\"gridBuyPrice\":25,\"gridSellPrice\":5}" -o org1 -u user1`
* Run tests  
`npm run test`


## Play Around

* Check out the ledger: [`http://localhost:5084`](http://localhost:5084)
* A debugger can be connected at [`http://localhost:8888`](http://localhost:8888)


## Figures

### A community-based local electricity market:
![Community-Based LEM](https://github.com/raphmc/thesis/raw/master/thesis/figures/LEMcommunity.png)  

### The three layers of a local electricity market:
![Three Layers of a LEM](https://github.com/raphmc/thesis/raw/master/thesis/figures/LEMlayers.png)  

### This simplified class diagram describes the chaincode model:
![Model-Controller Class Diagram](https://github.com/raphmc/thesis/raw/master/thesis/figures/classdiagram.png)  

### The architecture model for the decentralized application:
![Architecture Model](https://github.com/raphmc/thesis/raw/master/thesis/figures/blockchainnetwork.png)  

### The functional flow for an exemplary trading period:
![Functional Flow](https://github.com/raphmc/thesis/raw/master/thesis/figures/functionalflow.png)  

### The transaction flow for an exemplary bid transaction:
![Bid Transaction Flow](https://github.com/raphmc/thesis/raw/master/thesis/figures/bidtransactionflow.png)



