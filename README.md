# hypenergy - energymarket

This project is called **hypenergy** and currently contains the chaincode called **energymarket**.

## Start

```
# Install dependencies - From the root of the project
npm i
# Create a new development blockchain network  - From the root of your project
npm run env:restart
# Install your smart contract
npm run cc:start -- energymarket
# Make a testing call to create a record in the ledger
# Beware that the first call may fail with a timeout! Just happens the first time
hurl invoke energymarket energymarket_create "{\"name\":\"my first request\",\"id\":\"0001\",\"created\":0,\"modified\":0}"
```

## About Hurley

You may as well install **Hurley** globally for easier and more flexible management. 

`npm i -g @worldsibu/hurley`

Since with Hurley globally you have control over everything, some things that you can do, for example, is installing a Convector Smart Contract with a different name than the one you used for your project.

```
# Use the same package
# Install a new chaincode with the same source code but the name 'anothernameforyourcc'
hurl install anothernameforyourcc node
```

Other complex tasks you may need is installing to a different channel.

```
# Use the same package
# Be sure you started your environment with more than one channel running 'hurl new --channels 2'. Otherwise this will throw an error.
hurl install anothernameforyourcc node --channel ch2
```

---

If you don't want to, don't worries! This project works right away.

## Start - if you have Hurley globally

### Bring your project to life 

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
hurl new
```

###  Install and upgrade chaincodes

```
# Package your smart contract's code  - From the root of your project
npm run cc:package -- energymarket org1
# Install to your blockchain - From the root of your project
hurl install energymarket node -P ./chaincode-energymarket
# Install in debug mode, this will run the chaincode server locally so you can debug
hurl install energymarket node -P ./chaincode-energymarket --debug

# Upgrade your existing chaincode - From the root of your project
hurl upgrade energymarket node 1.2 -P ./chaincode-energymarket
```

## Start - if you don't have Hurley globally

### Bring your project to life 

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
npm run env:restart
```

###  Install and upgrade chaincodes

```
# Install to your blockchain - From the root of your project
npm run cc:start -- energymarket

# Upgrade your existing chaincode - From the root of your project
npm run cc:upgrade -- energymarket 1.2
```

## Tests

```
npm run test
```

> Check all the information to work with Convector <a href="https://worldsibu.github.io/convector" target="_blank">in the DOCS site</a>.

## Collaborate to the Convector Suite projects

* <a href="https://discord.gg/twRwpWt" target="_blank">Discord chat with the community</a>
* <a href="https://github.com/worldsibu" target="_blank">Convector projects</a>
#master_thesis
