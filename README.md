# 基于智能合约的捐赠与发放系统

这是一个基于以太坊区块链的智能合约系统，用于管理慈善捐赠和资金发放。该系统确保资金流向的透明性和可追踪性，让捐赠者能够清楚地了解他们的资金使用情况。

## 主要功能

1. 捐赠管理
   - 接收捐赠资金
   - 记录捐赠者信息、金额和时间戳
   - 自动更新资金池余额

2. 资金发放
   - 向受益人发放资金
   - 记录受益人信息、发放金额和时间戳
   - 确保发放金额不超过可用余额

3. 查询功能
   - 查询资金池当前余额
   - 查询捐赠记录
   - 查询发放记录

4. 安全特性
   - 所有权管理
   - 资金余额检查
   - 事件日志记录

## 技术规格

- 智能合约语言：Solidity ^0.8.0
- 区块链平台：以太坊
- 开发框架：Hardhat/Truffle（推荐）

## 合约接口

### 主要函数

- `donate()`: 接收捐赠资金
- `distribute(address beneficiary, uint256 amount)`: 向受益人发放资金
- `getDonationCount()`: 获取捐赠记录数量
- `getDistributionCount()`: 获取发放记录数量
- `getDonation(uint256 index)`: 获取特定捐赠记录
- `getDistribution(uint256 index)`: 获取特定发放记录
- `transferOwnership(address newOwner)`: 转移合约所有权

### 事件

- `DonationReceived`: 捐赠接收事件
- `DistributionMade`: 资金发放事件
- `OwnershipTransferred`: 所有权转移事件

## 部署说明

1. 克隆项目代码
2. 安装依赖：
   ```bash
   npm install
   ```
3. 编译合约：
   ```bash
   npx hardhat compile
   ```
4. 部署合约：
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

## 使用说明

1. 捐赠：调用 `donate()` 函数并发送 ETH
2. 发放：合约所有者调用 `distribute()` 函数指定受益人和金额
3. 查询：使用相应的查询函数获取所需信息

## 安全考虑

- 合约部署后需要仔细验证所有权设置
- 建议在测试网络上充分测试后再部署到主网
- 定期检查合约余额和交易记录
- 确保受益人地址正确性

## 许可证

MIT License 