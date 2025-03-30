import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import DonationContract from '../contracts/DonationContract.json';

const Web3Context = createContext();

export function Web3Provider({ children }) {
    const [account, setAccount] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                setIsConnected(true);
                setProvider(provider);

                const contractAddress = DonationContract.networks[31337].address;
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