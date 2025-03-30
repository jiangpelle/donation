import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function Donate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isConnected, connectWallet } = useWeb3();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [beneficiary, setBeneficiary] = useState(null);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // 模拟从后端获取项目数据
        const mockBeneficiaries = {
            1: {
                id: 1,
                name: '儿童教育基金会',
                description: '为贫困地区儿童提供教育资源',
                category: 'education',
                logo: '📚'
            },
            2: {
                id: 2,
                name: '环境保护组织',
                description: '致力于全球环境保护事业',
                category: 'environment',
                logo: '🌍'
            },
            3: {
                id: 3,
                name: '医疗援助基金会',
                description: '为贫困地区提供医疗援助',
                category: 'health',
                logo: '🏥'
            },
            4: {
                id: 4,
                name: '动物保护协会',
                description: '保护濒危物种和野生动物',
                category: 'animals',
                logo: '🐘'
            },
            5: {
                id: 5,
                name: '难民援助组织',
                description: '为全球难民提供人道主义援助',
                category: 'humanitarian',
                logo: '🏠'
            }
        };

        // 设置所有项目列表
        setBeneficiaries(Object.values(mockBeneficiaries));

        // 如果有ID，设置特定项目
        if (id) {
            const beneficiaryData = mockBeneficiaries[id];
            if (beneficiaryData) {
                setBeneficiary(beneficiaryData);
            } else {
                // 如果找不到项目，重定向到捐赠列表页面
                navigate('/donate', { replace: true });
            }
        }
    }, [id, navigate]);

    const handleDonate = async () => {
        if (!isConnected) {
            alert('请先连接钱包以进行捐赠');
            return;
        }
        try {
            setLoading(true);
            // TODO: 实现捐赠逻辑
            alert('捐赠功能即将实现');
        } catch (error) {
            console.error('捐赠失败:', error);
            alert('捐赠失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    const filteredBeneficiaries = beneficiaries.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 如果有特定项目ID，显示捐赠表单
    if (beneficiary) {
        return (
            <div className="max-w-2xl mx-auto pt-20">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-4">{beneficiary.logo}</div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            捐赠给 {beneficiary.name}
                        </h2>
                        <p className="text-gray-600">{beneficiary.description}</p>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                捐赠金额 (ETH)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="0.0"
                                    step="0.000000000000000001"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-gray-500">ETH</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                捐赠说明
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center">
                                    <span className="text-purple-600 mr-3">✓</span>
                                    最小捐赠金额：0.001 ETH
                                </li>
                                <li className="flex items-center">
                                    <span className="text-purple-600 mr-3">✓</span>
                                    捐赠将直接发送到 ChainHeart 智能合约
                                </li>
                                <li className="flex items-center">
                                    <span className="text-purple-600 mr-3">✓</span>
                                    所有捐赠记录将在区块链上永久保存
                                </li>
                                <li className="flex items-center">
                                    <span className="text-purple-600 mr-3">✓</span>
                                    捐赠完成后可以获得区块链捐赠证书
                                </li>
                                <li className="flex items-center">
                                    <span className="text-purple-600 mr-3">✓</span>
                                    您可以在记录页面追踪资金流向
                                </li>
                            </ul>
                        </div>

                        {!isConnected ? (
                            <button
                                onClick={connectWallet}
                                className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
                            >
                                连接钱包
                            </button>
                        ) : (
                            <button
                                onClick={handleDonate}
                                disabled={loading || !amount || parseFloat(amount) < 0.001}
                                className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                            >
                                {loading ? '处理中...' : '确认捐赠'}
                            </button>
                        )}
                    </div>
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
                                    利用区块链技术确保每一笔捐赠都公开透明，全程可追溯
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 text-2xl mr-4">❤️</div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">慈善之心</h4>
                                <p className="text-gray-600">
                                    连接全球爱心人士，让每一份善意都能精准送达需要帮助的人
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 text-2xl mr-4">📜</div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">捐赠证书</h4>
                                <p className="text-gray-600">
                                    获得区块链捐赠证书，永久记录您的善举
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 如果没有特定项目ID，显示项目列表
    return (
        <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    选择捐赠项目
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    选择一个您想要支持的项目，开始您的慈善之旅
                </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="搜索项目..."
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-400">🔍</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBeneficiaries.map((beneficiary) => (
                    <div
                        key={beneficiary.id}
                        onClick={() => navigate(`/donate/${beneficiary.id}`)}
                        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 cursor-pointer hover:shadow-xl transition-shadow"
                    >
                        <div className="text-4xl mb-4">{beneficiary.logo}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {beneficiary.name}
                        </h3>
                        <p className="text-gray-600">{beneficiary.description}</p>
                    </div>
                ))}
            </div>

            {filteredBeneficiaries.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        未找到匹配的项目，请尝试其他搜索关键词
                    </p>
                </div>
            )}
        </div>
    );
}

export default Donate; 