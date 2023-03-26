import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BummyCore = await ethers.getContractFactory("BummyCore");
  const BummyCoreInterface = await ethers.getContractFactory(
    "BummyCoreInterface"
  );
  const BummyInfo = await ethers.getContractFactory("BummyInfo");
  const BummyInfoInterface = await ethers.getContractFactory(
    "BummyInfoInterface"
  );

  const BummyCoreNFT = await BummyCore.deploy();
  const BummyCoreInterfaceDeploy = await BummyCoreInterface.deploy();
  const BummyInfoDeploy = await BummyInfo.deploy(
    deployer.address,
    BummyCoreNFT.address
  );

  console.log(
    "Token address:",
    BummyCoreNFT.address,
    BummyCoreInterfaceDeploy.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
