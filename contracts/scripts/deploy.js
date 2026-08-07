const hre = require("hardhat");
async function main() {
 const AutoChain = await hre.ethers.getContractFactory("AutoChain");
 const autoChain = await AutoChain.deploy();
 await autoChain.waitForDeployment();
 console.log(`AutoChain contract déployé sur : ${await autoChain.getAddress()}`);
}
main().catch((error) => {
 console.error(error);
 process.exitCode = 1;
});