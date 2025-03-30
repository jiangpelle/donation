const hre = require("hardhat");

async function main() {
    console.log("开始部署捐赠系统智能合约...");

    const DonationSystem = await hre.ethers.getContractFactory("DonationSystem");
    const donationSystem = await DonationSystem.deploy();
    await donationSystem.deployed();

    console.log("捐赠系统智能合约已部署到地址:", donationSystem.address);
    console.log("合约拥有者地址:", await donationSystem.owner());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 