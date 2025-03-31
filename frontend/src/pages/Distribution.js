import React, { useState } from 'react';

function Distribution() {
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        email: '',
        phone: '',
        location: '',
        description: '',
        category: 'education'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            // TODO: 实现申请逻辑
            alert('申请功能即将实现');
        } catch (error) {
            console.error('申请失败:', error);
            alert('申请失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="max-w-4xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    申请援助
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    填写以下信息，申请 ChainHeart 平台的援助支持
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                申请人姓名
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                组织名称
                            </label>
                            <input
                                type="text"
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                所在地区
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                placeholder="例如：北京市海淀区"
                                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                援助类别
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="education">教育援助</option>
                                <option value="health">医疗援助</option>
                                <option value="environment">环境保护</option>
                                <option value="humanitarian">人道主义</option>
                                <option value="animals">动物保护</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            项目描述
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder="请详细描述您的援助需求..."
                            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <div className="bg-purple-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            申请说明
                        </h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center">
                                <span className="text-purple-600 mr-3">✓</span>
                                申请将通过智能合约进行审核
                            </li>
                            <li className="flex items-center">
                                <span className="text-purple-600 mr-3">✓</span>
                                审核结果将在区块链上永久记录
                            </li>
                            <li className="flex items-center">
                                <span className="text-purple-600 mr-3">✓</span>
                                您可以在记录页面追踪申请状态
                            </li>
                        </ul>
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

            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    为什么选择 ChainHeart？
                </h3>
                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 text-2xl mr-4">🔗</div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">区块链技术</h4>
                            <p className="text-gray-600">
                                利用区块链技术确保申请过程公开透明，全程可追溯
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="flex-shrink-0 text-2xl mr-4">⚡</div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">快速响应</h4>
                            <p className="text-gray-600">
                                智能合约自动审核，快速处理您的申请
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="flex-shrink-0 text-2xl mr-4">📜</div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">申请记录</h4>
                            <p className="text-gray-600">
                                所有申请记录将在区块链上永久保存
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Distribution; 