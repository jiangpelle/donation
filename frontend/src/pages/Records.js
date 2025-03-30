import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

function Records() {
    const { contract } = useWeb3();
    const [donations, setDonations] = useState([]);
    const [distributions, setDistributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (contract) {
            loadRecords();
        }
    }, [contract]);

    const loadRecords = async () => {
        try {
            setLoading(true);
            setError('');

            // 加载捐赠记录
            const donationCount = await contract.getDonationCount();
            const donationPromises = [];
            for (let i = 0; i < donationCount; i++) {
                donationPromises.push(contract.getDonation(i));
            }
            const donationResults = await Promise.all(donationPromises);
            const formattedDonations = donationResults.map(([donor, amount, timestamp]) => ({
                donor,
                amount: ethers.utils.formatEther(amount),
                timestamp: new Date(timestamp * 1000).toLocaleString()
            }));
            setDonations(formattedDonations);

            // 加载发放记录
            const distributionCount = await contract.getDistributionCount();
            const distributionPromises = [];
            for (let i = 0; i < distributionCount; i++) {
                distributionPromises.push(contract.getDistribution(i));
            }
            const distributionResults = await Promise.all(distributionPromises);
            const formattedDistributions = distributionResults.map(([beneficiary, amount, timestamp]) => ({
                beneficiary,
                amount: ethers.utils.formatEther(amount),
                timestamp: new Date(timestamp * 1000).toLocaleString()
            }));
            setDistributions(formattedDistributions);
        } catch (err) {
            setError('加载记录失败，请重试');
            console.error('Error loading records:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">加载中...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* 捐赠记录 */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        捐赠记录
                    </h3>
                </div>
                <div className="border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    捐赠者
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    金额
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    时间
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {donations.map((donation, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {donation.donor}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {donation.amount} ETH
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {donation.timestamp}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 发放记录 */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        发放记录
                    </h3>
                </div>
                <div className="border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    受益人
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    金额
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    时间
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {distributions.map((distribution, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {distribution.beneficiary}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {distribution.amount} ETH
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {distribution.timestamp}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Records; 