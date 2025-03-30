import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

function ApplyAid() {
  const { isConnected, connectWallet } = useWeb3();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: 实现表单提交逻辑
    setTimeout(() => {
      setLoading(false);
      alert('申请已提交，我们会尽快与您联系！');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto text-center pt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">连接钱包</h2>
        <p className="text-gray-600 mb-8">
          请先连接您的加密货币钱包以提交申请
        </p>
        <button
          onClick={connectWallet}
          className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
        >
          连接钱包
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          申请援助
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          填写以下信息，我们的团队将尽快与您联系，帮助您完成援助申请流程
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 左侧表单 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                姓名
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                电子邮箱
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                组织/机构名称
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                联系电话
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                申请说明
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              {loading ? '提交中...' : '提交申请'}
            </button>
          </form>
        </div>

        {/* 右侧信息 */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              申请流程
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">提交申请</h3>
                  <p className="text-gray-600">
                    填写基本信息并提交申请表单
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">初步审核</h3>
                  <p className="text-gray-600">
                    我们的团队将审核您的申请信息
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">联系沟通</h3>
                  <p className="text-gray-600">
                    我们会通过邮件或电话与您联系
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold mr-4">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">完成申请</h3>
                  <p className="text-gray-600">
                    确认信息并完成援助申请流程
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              申请要求
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <span className="text-purple-600 mr-3">✓</span>
                提供真实有效的个人信息
              </li>
              <li className="flex items-center">
                <span className="text-purple-600 mr-3">✓</span>
                说明具体的援助需求
              </li>
              <li className="flex items-center">
                <span className="text-purple-600 mr-3">✓</span>
                提供必要的证明材料
              </li>
              <li className="flex items-center">
                <span className="text-purple-600 mr-3">✓</span>
                遵守平台规则和流程
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyAid; 