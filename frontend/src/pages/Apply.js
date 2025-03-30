import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

const Apply = () => {
  const { account, connectWallet } = useWeb3();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            申请援助
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            填写以下信息，我们将尽快与您联系
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    为什么选择 ChainHeart？
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <span className="text-purple-600 mr-3">✓</span>
                      99% 的机构选择自动转换加密货币为现金
                    </li>
                    <li className="flex items-center">
                      <span className="text-purple-600 mr-3">✓</span>
                      轻松将捐赠表单嵌入您的网站
                    </li>
                    <li className="flex items-center">
                      <span className="text-purple-600 mr-3">✓</span>
                      丰富的资源库帮助您管理大额加密货币捐赠
                    </li>
                  </ul>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      姓名
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      电子邮箱
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                      组织/机构名称
                    </label>
                    <input
                      type="text"
                      name="organization"
                      id="organization"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      联系电话
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      申请说明
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      提交申请
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            值得信赖的合作伙伴
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl mb-4">📈</div>
              <h3 className="text-lg font-medium text-gray-900">收入增长</h3>
              <p className="mt-2 text-gray-500">
                使用加密货币捐赠后，收入同比增长超过100%
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl mb-4">💎</div>
              <h3 className="text-lg font-medium text-gray-900">专业支持</h3>
              <p className="mt-2 text-gray-500">
                我们的团队提供全方位的加密货币捐赠支持
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl mb-4">🔒</div>
              <h3 className="text-lg font-medium text-gray-900">安全可靠</h3>
              <p className="mt-2 text-gray-500">
                采用最先进的区块链技术，确保资金安全
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply; 