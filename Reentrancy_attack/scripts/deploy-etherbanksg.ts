import { ethers } from "hardhat";
import { join } from "path";
import { writeFileSync } from "fs";
async function main() {
  const addressBook: { [key: string]: string | string[] } = {};
  //* deploy EtherBank contract
  const EtherBankSG = await ethers.getContractFactory("EtherBankSG");
  const etherBankSG = await EtherBankSG.deploy();

  await etherBankSG.deployed();
  addressBook.EtherBank = etherBankSG.address;

  console.log("EtherBank deployed to:", etherBankSG.address);

  const [deployer, signer1, signer2] = await ethers.getSigners();

  //* Deployer deposits 1 ether
  await etherBankSG.deposit({ value: ethers.utils.parseEther("1") });
  await etherBankSG
    .connect(signer1)
    .deposit({ value: ethers.utils.parseEther("1") });
  await etherBankSG
    .connect(signer2)
    .deposit({ value: ethers.utils.parseEther("1") });

  console.log(
    "Balance of EtherBank:",
    (await etherBankSG.getBalance()).toString()
  );

  //* Make etherBank addressBook.json
  writeFileSync(
    join(__dirname, "addresssBook.json"),
    JSON.stringify(etherBankSG.address, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
