# Master Thesis
**Project Name: `hypenergy`**

This repositpry containts the code for my Master's thesis: the implementation of a decentralised application called **hypenergy**, a peer-to-peer marketplace for community-based local electricity markets.

## Prerequisites (must be installed)
* Node version 8.15.0
* Docker 18.09.2 (make sure installation contains docker-compose)
* npm 6.4.1
* nvm can be used to install and switch between different node versions


## Start

Install dependencies (from the root of the project)
`npm i`
Create a new development blockchain network and install the chaincode on all peers (from the root of your project)
`npm start`
Create a market by invoking the createMarket transaction (if timeout, try again)
`hurl invoke energymarket energymarket_createMarket "{\"id\":\"MKT\",\"auctionTime\":900000,\"gridBuyPrice\":25,\"gridSellPrice\":5}" -o org1 -u user1`
Run the tests
`npm run test`

