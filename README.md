# Master Thesis
**Project Name: `hypenergy`**

This repositpry containts the code for my Master's thesis: the implementation of a decentralised application called **hypenergy**, a peer-to-peer marketplace for community-based local electricity markets.

* The full thesis can be downloaded [here](https://github.com/raphmc/thesis//tree/master/thesis/thesis.pdf).
* The chaincode describing the transaction logic can be found in: [`packages/energymarket-cc/src`](https://github.com/raphmc/thesis/tree/master/packages/energymarket-cc/src).
* Test scripts and unit tests can be found in: [`packages/energymarket-cc/tests`](https://github.com/raphmc/thesis/tree/master/packages/energymarket-cc/tests)


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