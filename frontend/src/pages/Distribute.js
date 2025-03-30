import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

function Distribute() {
    const { contract, isConnected, account } = useWeb3();
    const [beneficiary, setBeneficiary] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        if (contract) {
            loadBalance();
        }
    }, [contract]);

    const loadBalance = async () => {
        try {
            const balance = await contract.totalBalance();
            setBalance(ethers.utils.formatEther(balance));
        } catch (err) {
            console.error('Error loading balance:', err);
        }
    };

    const handleDistribute = async (e) => {
        e.preventDefault();
        if (!isConnected) {
            setError('请先连接钱包');
            return;
        }

        try {
            setLoading(true);
            setError('');
            setSuccess('');

            if (!ethers.utils.isAddress(beneficiary)) {
                throw new Error('无效的受益人地址');
            }

            const amountWei = ethers.utils.parseEther(amount);
            const tx = await contract.distribute(beneficiary, amountWei);
            await tx.wait();

            setSuccess('发放成功！');
            setBeneficiary('');
            setAmount('');
            loadBalance();
        } catch (err) {
            setError(err.message || '发放失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        发放资金
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>当前可用余额: {balance} ETH</p>
                    </div>
                    <form onSubmit={handleDistribute} className="mt-5">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="beneficiary" className="block text-sm font-medium text-gray-700">
                                    受益人地址
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="beneficiary"
                                        value={beneficiary}
                                        onChange={(e) => setBeneficiary(e.target.value)}
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="0x..."
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                    发放金额
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="number"
                                        id="amount"
                                        step="0.000000000000000001"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300"
                                        placeholder="0.0"
                                        required
                                    />
                                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        ETH
                                    </span>
                                </div>
                            </div>
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}
                        {success && (
                            <p className="mt-2 text-sm text-green-600">{success}</p>
                        )}
                        <div className="mt-5">
                            <button
                                type="submit"
                                disabled={loading || !isConnected}
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                                    loading || !isConnected
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-primary-600 hover:bg-primary-700'
                                }`}
                            >
                                {loading ? '处理中...' : '确认发放'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Distribute; 