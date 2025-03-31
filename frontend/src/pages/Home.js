import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function Home() {
  const { isConnected } = useWeb3();

  return (
    <div className="max-w-7xl mx-auto pt-20">
      {/* Hero Section */}
      <div className="text-center py-20 bg-purple-50 rounded-3xl shadow-lg mb-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="text-purple-600">Chain</span>
          <span className="text-red-500 text-5xl sm:text-6xl md:text-7xl">Heart</span>
          <div className="block text-2xl sm:text-3xl md:text-4xl mt-2">
            <span className="text-purple-600">链</span>
            <span className="text-red-500 text-3xl sm:text-4xl md:text-5xl">心</span>
          </div>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-8">
          用区块链技术连接全球爱心，让每一份善意都能精准送达
        </p>
        <div className="mt-8">
          {!isConnected && (
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/donate"
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
              >
                我要捐赠
              </Link>
              <Link
                to="/distribution"
                className="inline-block bg-white text-purple-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border border-purple-200"
              >
                申请援助
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-4xl mb-6">🔗</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">区块链技术</h3>
          <p className="text-gray-600">
            利用区块链技术确保每一笔捐赠都公开透明，全程可追溯
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-4xl mb-6">❤️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">慈善之心</h3>
          <p className="text-gray-600">
            连接全球爱心人士，让每一份善意都能精准送达需要帮助的人
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-4xl mb-6">🌍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">全球连接</h3>
          <p className="text-gray-600">
            支持多种加密货币，让全球爱心人士都能参与慈善事业
          </p>
        </div>
      </div>

      {/* User Roles Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">参与方式</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-purple-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">捐赠者</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center">
                <span className="text-purple-600 mr-3">✓</span>
                使用加密货币进行捐赠
              </li>
              <li className="flex items-center">
                <span className="text-purple-600 mr-3">✓</span>
                追踪捐赠资金流向
              </li>
              <li className="flex items-center">
                <span className="text-purple-600 mr-3">✓</span>
                获得区块链捐赠证书
              </li>
            </ul>
            <Link
              to="/donate"
              className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              开始捐赠
            </Link>
          </div>
          <div className="bg-purple-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">受助者</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center">
                <span className="text-purple-600 mr-3">✓</span>
                提交援助申请
              </li>
              <li className="flex items-center">
                <span className="text-purple-600 mr-3">✓</span>
                接收加密货币援助
              </li>
              <li className="flex items-center">
                <span className="text-purple-600 mr-3">✓</span>
                查看援助记录
              </li>
            </ul>
            <Link
              to="/distribution"
              className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              申请援助
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">平台数据</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">0 ETH</div>
            <div className="text-gray-600">总捐赠金额</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-gray-600">捐赠人数</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-gray-600">受助人数</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 rounded-3xl shadow-xl p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          加入 ChainHeart 社区
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          用区块链传递爱心，让每一份善意都能精准送达
        </p>
        <div className="space-x-6">
          <Link
            to="/donate"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-colors shadow-lg"
          >
            我要捐赠
          </Link>
          <Link
            to="/distribution"
            className="inline-block bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors shadow-lg"
          >
            申请援助
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home; 