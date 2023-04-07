import { ethers } from "hardhat";
import { join } from "path";
import { writeFileSync } from "fs";
async function main() {
  const addressBook: { [key: string]: string | string[] } = {};
  //* deploy EtherBank contract
  const EtherBank = await ethers.getContractFactory("EtherBank");
  const etherBank = await EtherBank.deploy();

  await etherBank.deployed();

  console.log("EtherBank deployed to:", etherBank.address);
  addressBook.EtherBank = etherBank.address;
  const [deployer, signer1, signer2] = await ethers.getSigners();

  //* Deployer deposits 1 ether
  await etherBank.deposit({ value: ethers.utils.parseEther("1") });
  await etherBank
    .connect(signer1)
    .deposit({ value: ethers.utils.parseEther("1") });
  await etherBank
    .connect(signer2)
    .deposit({ value: ethers.utils.parseEther("1") });

  console.log(
    "Balance of EtherBank:",
    (await etherBank.getBalance()).toString()
  );
  //* Make etherBank addressBook.json
  writeFileSync(
    join(__dirname, "addressBook.json"),
    JSON.stringify(addressBook, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
