import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

function Donate() {
    const { contract, isConnected } = useWeb3();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleDonate = async (e) => {
        e.preventDefault();
        if (!isConnected) {
            setError('请先连接钱包');
            return;
        }

        try {
            setLoading(true);
            setError('');
            setSuccess('');

            const amountWei = ethers.utils.parseEther(amount);
            const tx = await contract.donate({ value: amountWei });
            await tx.wait();

            setSuccess('捐赠成功！');
            setAmount('');
        } catch (err) {
            setError(err.message || '捐赠失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        捐赠资金
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>请输入要捐赠的ETH金额</p>
                    </div>
                    <form onSubmit={handleDonate} className="mt-5">
                        <div className="flex rounded-md shadow-sm">
                            <input
                                type="number"
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
                                {loading ? '处理中...' : '确认捐赠'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Donate; 