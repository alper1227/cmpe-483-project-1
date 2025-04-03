
const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const MyContract = await ethers.getContractFactory("MyContract");
  
  // Deploy the contract
  const myContract = await MyContract.deploy();
  await myContract.waitForDeployment();

  console.log("MyContract deployed to:", await myContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
