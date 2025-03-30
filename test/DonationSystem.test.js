const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonationSystem", function () {
    let DonationSystem;
    let donationSystem;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        // 获取测试账户
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // 部署合约
        DonationSystem = await ethers.getContractFactory("DonationSystem");
        donationSystem = await DonationSystem.deploy();
        await donationSystem.deployed();
    });

    describe("部署", function () {
        it("应该正确设置合约拥有者", async function () {
            expect(await donationSystem.owner()).to.equal(owner.address);
        });

        it("初始余额应该为0", async function () {
            expect(await donationSystem.totalBalance()).to.equal(0);
        });
    });

    describe("捐赠功能", function () {
        it("应该能够接收捐赠", async function () {
            const donationAmount = ethers.utils.parseEther("1.0");
            await donationSystem.connect(addr1).donate({ value: donationAmount });
            
            expect(await donationSystem.totalBalance()).to.equal(donationAmount);
            expect(await donationSystem.getDonationCount()).to.equal(1);
            
            const donation = await donationSystem.getDonation(0);
            expect(donation[0]).to.equal(addr1.address);
            expect(donation[1]).to.equal(donationAmount);
        });

        it("不应该接受0金额的捐赠", async function () {
            await expect(
                donationSystem.connect(addr1).donate({ value: 0 })
            ).to.be.revertedWith("Donation amount must be greater than 0");
        });
    });

    describe("发放功能", function () {
        beforeEach(async function () {
            // 先进行一笔捐赠
            const donationAmount = ethers.utils.parseEther("1.0");
            await donationSystem.connect(addr1).donate({ value: donationAmount });
        });

        it("合约拥有者应该能够发放资金", async function () {
            const distributionAmount = ethers.utils.parseEther("0.5");
            await donationSystem.connect(owner).distribute(addr2.address, distributionAmount);
            
            expect(await donationSystem.totalBalance()).to.equal(
                ethers.utils.parseEther("0.5")
            );
            expect(await donationSystem.getDistributionCount()).to.equal(1);
            
            const distribution = await donationSystem.getDistribution(0);
            expect(distribution[0]).to.equal(addr2.address);
            expect(distribution[1]).to.equal(distributionAmount);
        });

        it("非合约拥有者不应该能够发放资金", async function () {
            const distributionAmount = ethers.utils.parseEther("0.5");
            await expect(
                donationSystem.connect(addr1).distribute(addr2.address, distributionAmount)
            ).to.be.revertedWith("Only owner can call this function");
        });

        it("不应该发放超过余额的金额", async function () {
            const distributionAmount = ethers.utils.parseEther("2.0");
            await expect(
                donationSystem.connect(owner).distribute(addr2.address, distributionAmount)
            ).to.be.revertedWith("Insufficient balance");
        });
    });

    describe("查询功能", function () {
        beforeEach(async function () {
            // 进行多笔捐赠
            const donationAmount = ethers.utils.parseEther("1.0");
            await donationSystem.connect(addr1).donate({ value: donationAmount });
            await donationSystem.connect(addr2).donate({ value: donationAmount });
        });

        it("应该能够正确查询捐赠记录", async function () {
            expect(await donationSystem.getDonationCount()).to.equal(2);
            
            const donation1 = await donationSystem.getDonation(0);
            expect(donation1[0]).to.equal(addr1.address);
            
            const donation2 = await donationSystem.getDonation(1);
            expect(donation2[0]).to.equal(addr2.address);
        });

        it("查询不存在的捐赠记录应该失败", async function () {
            await expect(
                donationSystem.getDonation(2)
            ).to.be.revertedWith("Index out of bounds");
        });
    });

    describe("所有权管理", function () {
        it("合约拥有者应该能够转移所有权", async function () {
            await donationSystem.connect(owner).transferOwnership(addr1.address);
            expect(await donationSystem.owner()).to.equal(addr1.address);
        });

        it("非合约拥有者不应该能够转移所有权", async function () {
            await expect(
                donationSystem.connect(addr1).transferOwnership(addr2.address)
            ).to.be.revertedWith("Only owner can call this function");
        });
    });
}); 