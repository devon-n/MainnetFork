// Run ```ganache-cli -f {INFURA_URL} -u {ADDRESS_TO_DUPLICATE}``` to fork mainnet

const Web3 = require('web3')
const daiAbi = require('./abi.json')

const recipientAddress = '0xF3203287d39Fbe511268caB4Db5b4EC50f9a9a5E'
const unlockedAddress = '0x075e72a5eDf65F0A5f44699c7654C1a76941Ddc8'
const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

const web3 = new Web3('http://localhost:8545')
const dai = new web3.eth.Contract(daiAbi, daiAddress)

const amountToSend = 10**8

async function main() {

    let unlockedBalance = await dai.methods.balanceOf(unlockedAddress).call()
    let recipientBalance = await dai.methods.balanceOf(recipientAddress).call()

    console.log(`Unlocked balance: ${unlockedBalance}`)
    console.log(`Unlocked balance: ${recipientBalance}`)

    await dai.methods.transfer(recipientAddress, amountToSend).send({ from: unlockedAddress })

    unlockedBalance = await dai.methods.balanceOf(unlockedAddress).call()
    recipientBalance = await dai.methods.balanceOf(recipientAddress).call()

    console.log(`Unlocked balance: ${unlockedBalance}`)
    console.log(`Unlocked balance: ${recipientBalance}`)

}

main()