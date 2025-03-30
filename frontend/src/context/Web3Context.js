import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import DonationSystem from '../contracts/DonationSystem.json';

const Web3Context = createContext();

export function Web3Provider({ children }) {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        initializeWeb3();
    }, []);

    const initializeWeb3 = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
                
                const contract = new ethers.Contract(
                    contractAddress,
                    DonationSystem.abi,
                    signer
                );

                setProvider(provider);
                setContract(contract);
            } catch (error) {
                console.error('Error initializing Web3:', error);
            }
        } else {
            console.error('Please install MetaMask!');
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                setAccount(accounts[0]);
                setIsConnected(true);
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        }
    };

    const disconnectWallet = () => {
        setAccount('');
        setIsConnected(false);
    };

    return (
        <Web3Context.Provider value={{
            account,
            contract,
            provider,
            isConnected,
            connectWallet,
            disconnectWallet
        }}>
            {children}
        </Web3Context.Provider>
    );
}

export function useWeb3() {
    return useContext(Web3Context);
} 