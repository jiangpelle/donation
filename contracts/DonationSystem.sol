// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationSystem {
    // 捐赠记录结构
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    // 发放记录结构
    struct Distribution {
        address beneficiary;
        uint256 amount;
        uint256 timestamp;
    }

    // 合约拥有者地址
    address public owner;

    // 捐赠记录数组
    Donation[] public donations;
    
    // 发放记录数组
    Distribution[] public distributions;
    
    // 当前资金池余额
    uint256 public totalBalance;

    // 事件声明
    event DonationReceived(address indexed donor, uint256 amount);
    event DistributionMade(address indexed beneficiary, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // 修饰器
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // 构造函数
    constructor() {
        owner = msg.sender;
    }

    // 接收捐赠
    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        
        donations.push(Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        }));
        
        totalBalance += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    // 发放资金
    function distribute(address beneficiary, uint256 amount) external onlyOwner {
        require(beneficiary != address(0), "Invalid beneficiary address");
        require(amount > 0, "Distribution amount must be greater than 0");
        require(amount <= totalBalance, "Insufficient balance");
        
        distributions.push(Distribution({
            beneficiary: beneficiary,
            amount: amount,
            timestamp: block.timestamp
        }));
        
        totalBalance -= amount;
        payable(beneficiary).transfer(amount);
        emit DistributionMade(beneficiary, amount);
    }

    // 查询捐赠记录数量
    function getDonationCount() external view returns (uint256) {
        return donations.length;
    }

    // 查询发放记录数量
    function getDistributionCount() external view returns (uint256) {
        return distributions.length;
    }

    // 查询特定捐赠记录
    function getDonation(uint256 index) external view returns (address, uint256, uint256) {
        require(index < donations.length, "Index out of bounds");
        Donation memory donation = donations[index];
        return (donation.donor, donation.amount, donation.timestamp);
    }

    // 查询特定发放记录
    function getDistribution(uint256 index) external view returns (address, uint256, uint256) {
        require(index < distributions.length, "Index out of bounds");
        Distribution memory distribution = distributions[index];
        return (distribution.beneficiary, distribution.amount, distribution.timestamp);
    }

    // 转移合约所有权
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
} 