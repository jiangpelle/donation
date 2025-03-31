import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import DonationContract from '../contracts/contracts/DonationSystem.sol/DonationSystem.json';

const Web3Context = createContext();

export function Web3Provider({ children }) {
    const [account, setAccount] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                setIsConnected(true);
                setProvider(provider);

                // 获取当前网络
                const network = await provider.getNetwork();
                const chainId = network.chainId;

                // 根据网络选择合约地址
                let contractAddress;
                if (chainId === 11155111) { // Sepolia
                    contractAddress = "YOUR_SEPOLIA_CONTRACT_ADDRESS"; // 部署到 Sepolia 后替换
                } else if (chainId === 31337) { // Hardhat
                    contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Hardhat 本地网络的合约地址
                } else {
                    throw new Error('不支持的网络，请切换到 Sepolia 测试网或本地 Hardhat 网络');
                }

                const contract = new ethers.Contract(
                    contractAddress,
                    DonationContract.abi,
                    signer
                );
                setContract(contract);
            } else {
                alert('请安装 MetaMask!');
            }
        } catch (error) {
            console.error('连接钱包失败:', error);
            alert('连接钱包失败，请重试');
        }
    };

    const disconnectWallet = async () => {
        try {
            if (provider) {
                // 清除账户状态
                setAccount('');
                setIsConnected(false);
                setContract(null);
                setProvider(null);
            }
        } catch (error) {
            console.error('断开钱包连接失败:', error);
            alert('断开钱包连接失败，请重试');
        }
    };

    useEffect(() => {
        // 检查是否已经连接
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    // 用户断开了钱包连接
                    disconnectWallet();
                } else {
                    // 用户切换了账户
                    setAccount(accounts[0]);
                }
            });

            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }
    }, []);

    return (
        <Web3Context.Provider value={{ account, isConnected, contract, connectWallet, disconnectWallet }}>
            {children}
        </Web3Context.Provider>
    );
}

export function useWeb3() {
    return useContext(Web3Context);
} 