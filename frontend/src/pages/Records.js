import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

function Records() {
  const { isConnected, connectWallet } = useWeb3();
  const [donations, setDonations] = useState([]);
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('donations');

  useEffect(() => {
    // TODO: 实现获取记录的逻辑
    setLoading(false);
  }, []);

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">连接钱包</h2>
        <p className="text-gray-600 mb-8">
          请先连接您的加密货币钱包以查看记录
        </p>
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          连接钱包
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">交易记录</h2>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('donations')}
              className={`${
                activeTab === 'donations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              捐赠记录
            </button>
            <button
              onClick={() => setActiveTab('distributions')}
              className={`${
                activeTab === 'distributions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              发放记录
            </button>
          </nav>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        ) : activeTab === 'donations' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
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
                {donations.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      暂无捐赠记录
                    </td>
                  </tr>
                ) : (
                  donations.map((donation, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donation.donor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donation.amount} ETH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(donation.timestamp * 1000).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
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
                {distributions.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      暂无发放记录
                    </td>
                  </tr>
                ) : (
                  distributions.map((distribution, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {distribution.beneficiary}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {distribution.amount} ETH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(distribution.timestamp * 1000).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          区块链记录说明
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 text-blue-600 text-xl mr-3">🔍</div>
            <div>
              <h4 className="font-medium text-gray-900">公开透明</h4>
              <p className="text-gray-600">
                所有交易记录都在区块链上公开，任何人都可以查看和验证
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 text-blue-600 text-xl mr-3">🔒</div>
            <div>
              <h4 className="font-medium text-gray-900">不可篡改</h4>
              <p className="text-gray-600">
                区块链上的记录一旦确认就无法更改，确保数据真实可靠
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 text-blue-600 text-xl mr-3">📊</div>
            <div>
              <h4 className="font-medium text-gray-900">实时更新</h4>
              <p className="text-gray-600">
                所有交易都会实时记录在区块链上，确保信息及时准确
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Records; 