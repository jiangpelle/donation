const hre = require("hardhat");

async function main() {
    console.log("开始部署捐赠系统智能合约...");

    const DonationSystem = await hre.ethers.getContractFactory("DonationSystem");
    const donationSystem = await DonationSystem.deploy();
    await donationSystem.deployed();

    console.log("捐赠系统智能合约已部署到地址:", donationSystem.address);
    console.log("合约拥有者地址:", await donationSystem.owner());

    // 保存合约地址到前端配置
    const fs = require("fs");
    const contractsDir = "./frontend/src/contracts";
    
    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    const contractConfig = {
        address: donationSystem.address,
        abi: JSON.parse(donationSystem.interface.format("json"))
    };

    fs.writeFileSync(
        contractsDir + "/contract-config.json",
        JSON.stringify(contractConfig, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 