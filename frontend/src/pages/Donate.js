import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

function DonationModal({ isOpen, onClose, beneficiary }) {
    const [step, setStep] = useState(1);
    const [selectedCrypto, setSelectedCrypto] = useState('ETH');
    const [amount, setAmount] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [donorInfo, setDonorInfo] = useState({
        name: '',
        email: '',
        message: ''
    });
    const { isConnected, connectWallet, disconnectWallet, contract, account } = useWeb3();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const cryptoOptions = [
        { value: 'BTC', label: 'Bitcoin (BTC)', icon: '₿' },
        { value: 'ETH', label: 'Ethereum (ETH)', icon: 'Ξ' },
        { value: 'SEPOLIA_ETH', label: 'Sepolia ETH', icon: 'Ξ' },
        { value: 'USDT', label: 'Tether (USDT)', icon: '₮' },
        { value: 'USDC', label: 'USD Coin (USDC)', icon: '$' },
        { value: 'BNB', label: 'Binance Coin (BNB)', icon: 'B' },
        { value: 'SOL', label: 'Solana (SOL)', icon: 'S' }
    ];

    const mockAddresses = {
        BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        ETH: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        SEPOLIA_ETH: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        USDT: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    };

    // 处理模态框关闭
    const handleClose = () => {
        if (isConnected) {
            disconnectWallet();
        }
        onClose();
        setStep(1);
        setAmount('');
        setDonorInfo({
            name: '',
            email: '',
            message: ''
        });
    };

    // 验证捐赠金额
    const validateAmount = () => {
        if (!amount) {
            setError('请输入捐赠金额');
            return false;
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            setError('请输入有效的捐赠金额');
            return false;
        }

        // 根据选择的加密货币设置不同的最小金额
        const minAmounts = {
            BTC: 0.0001,
            ETH: 0.0001,
            SEPOLIA_ETH: 0.0001,
            USDT: 1,
            USDC: 1,
            BNB: 0.01,
            SOL: 0.1
        };

        if (amountNum < minAmounts[selectedCrypto]) {
            setError(`最小捐赠金额为 ${minAmounts[selectedCrypto]} ${selectedCrypto}`);
            return false;
        }

        setError('');
        return true;
    };

    // 处理下一步
    const handleNextStep = () => {
        if (step === 1 && !validateAmount()) {
            return;
        }
        setStep(step + 1);
    };

    const handleDonate = async () => {
        try {
            setLoading(true);
            setError('');

            if (!window.ethereum) {
                throw new Error('请安装 MetaMask 钱包');
            }

            if (!amount || parseFloat(amount) <= 0) {
                throw new Error('请输入有效的捐赠金额');
            }

            // 将ETH金额转换为Wei
            const amountWei = ethers.utils.parseEther(amount);

            // 创建 provider 和 signer
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // 发送交易
            const tx = await signer.sendTransaction({
                to: account,  // 转给自己
                value: amountWei
            });

            // 等待交易确认
            await tx.wait();

            // 保存捐赠信息到数据库（这里只是模拟）
            console.log('捐赠信息:', {
                donor: isAnonymous ? '匿名捐赠者' : donorInfo.name,
                email: donorInfo.email,
                message: donorInfo.message,
                amount: amount,
                crypto: selectedCrypto,
                timestamp: new Date().toISOString(),
                fromAddress: account,
                toAddress: account,
                txHash: tx.hash
            });

            // 关闭模态框并重置表单
            handleClose();
            
            // 显示成功消息
            alert('捐赠成功！感谢您的善举。');
        } catch (error) {
            console.error('捐赠失败:', error);
            setError(error.message || '捐赠失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 overflow-hidden">
                {/* 模态框头部 */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            {step === 1 && '选择捐赠方式'}
                            {step === 2 && '填写捐赠信息'}
                            {step === 3 && '确认捐赠'}
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            ✕
                        </button>
                    </div>
                    {/* 进度条 */}
                    <div className="flex items-center mt-6">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex-1 flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    step >= s ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                    {s}
                                </div>
                                {s < 3 && (
                                    <div className={`flex-1 h-1 ${
                                        step > s ? 'bg-purple-600' : 'bg-gray-200'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 步骤1：选择加密货币和金额 */}
                {step === 1 && (
                    <div className="p-6">
                        <div className="space-y-6">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    选择加密货币
                                </label>
                                <select
                                    value={selectedCrypto}
                                    onChange={(e) => setSelectedCrypto(e.target.value)}
                                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    {cryptoOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.icon} {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    捐赠金额
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                            setError('');
                                        }}
                                        className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="0.0"
                                        step="0.000000000000000001"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <span className="text-gray-500">{selectedCrypto}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 步骤2：填写捐赠人信息 */}
                {step === 2 && (
                    <div className="p-6">
                        <div className="space-y-6">
                            <div className="flex items-center mb-6">
                                <input
                                    type="checkbox"
                                    id="anonymous"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="anonymous" className="ml-2 text-gray-700">
                                    匿名捐赠
                                </label>
                            </div>
                            {!isAnonymous && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            姓名
                                        </label>
                                        <input
                                            type="text"
                                            value={donorInfo.name}
                                            onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                                            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                            placeholder="请输入您的姓名"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            电子邮箱
                                        </label>
                                        <input
                                            type="email"
                                            value={donorInfo.email}
                                            onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                                            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                            placeholder="请输入您的邮箱"
                                        />
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    留言（选填）
                                </label>
                                <textarea
                                    value={donorInfo.message}
                                    onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="写下您想说的话..."
                                    rows="3"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* 步骤3：确认捐赠 */}
                {step === 3 && (
                    <div className="p-6">
                        <div className="space-y-6">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                                    {error}
                                </div>
                            )}
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    确认捐赠信息
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">捐赠金额</span>
                                        <span className="font-medium">{amount} {selectedCrypto}</span>
                                    </div>
                                    {isConnected && (
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">收款地址（测试模式）</span>
                                            <span className="font-medium font-mono text-sm">{account}</span>
                                        </div>
                                    )}
                                    {!isAnonymous && (
                                        <>
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-500">捐赠人</span>
                                                <span className="font-medium">{donorInfo.name}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-500">联系邮箱</span>
                                                <span className="font-medium">{donorInfo.email}</span>
                                            </div>
                                        </>
                                    )}
                                    {donorInfo.message && (
                                        <div className="py-2 border-b border-gray-100">
                                            <span className="text-gray-500 block mb-2">留言</span>
                                            <p className="text-gray-700">{donorInfo.message}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <p className="text-gray-500 text-center">
                                    请确认以上信息无误，然后点击下方按钮完成捐赠
                                </p>
                                {!isConnected ? (
                                    <button
                                        onClick={connectWallet}
                                        className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
                                    >
                                        <img
                                            src="/metamask-fox.svg"
                                            alt="MetaMask"
                                            className="w-6 h-6 mr-2"
                                        />
                                        连接 MetaMask
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleDonate}
                                        disabled={loading}
                                        className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
                                    >
                                        {loading ? '处理中...' : '确认捐赠'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* 底部按钮 */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                上一步
                            </button>
                        )}
                        {step < 3 && (
                            <button
                                onClick={handleNextStep}
                                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors ml-auto"
                            >
                                下一步
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Donate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [beneficiary, setBeneficiary] = useState(null);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        location: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // 模拟从后端获取项目数据
        const mockBeneficiaries = {
            1: {
                id: 1,
                name: '儿童教育基金会',
                description: '为贫困地区儿童提供教育资源',
                mission: '致力于为中国贫困地区的儿童提供优质教育资源，帮助他们获得平等的教育机会，实现梦想。我们相信教育是改变命运的力量，每个孩子都应该有机会接受良好的教育。',
                category: 'education',
                location: '北京市海淀区中关村大街1号',
                logo: '📚',
                taxId: '91110108MA12345678',
                website: 'www.edu-foundation.org',
                email: 'contact@edu-foundation.org',
                phone: '010-12345678',
                whyDonate: '您的每一笔捐赠都将直接用于改善贫困地区儿童的教育条件。我们会定期发布项目进展报告，让您了解捐赠资金的使用情况。通过区块链技术，所有捐赠记录都将被永久保存，确保资金使用透明公开。',
                achievements: [
                    '已帮助超过10000名贫困儿童完成学业',
                    '在50个贫困县建立了图书馆',
                    '培训了1000名乡村教师'
                ]
            },
            2: {
                id: 2,
                name: '环境保护组织',
                description: '致力于全球环境保护事业',
                category: 'environment',
                location: '上海市浦东新区',
                logo: '🌍'
            },
            3: {
                id: 3,
                name: '医疗援助基金会',
                description: '为贫困地区提供医疗援助',
                category: 'health',
                location: '广州市天河区',
                logo: '🏥'
            },
            4: {
                id: 4,
                name: '动物保护协会',
                description: '保护濒危物种和野生动物',
                category: 'animals',
                location: '成都市武侯区',
                logo: '🐘'
            },
            5: {
                id: 5,
                name: '难民援助组织',
                description: '为全球难民提供人道主义援助',
                category: 'humanitarian',
                location: '深圳市南山区',
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
                navigate('/donate', { replace: true });
            }
        }
    }, [id, navigate]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredBeneficiaries = beneficiaries.filter(b => {
        const matchesSearch = (
            b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const matchesCategory = !filters.category || b.category === filters.category;
        const matchesLocation = !filters.location || b.location.includes(filters.location);
        return matchesSearch && matchesCategory && matchesLocation;
    });

    // 如果有特定项目ID，显示组织详情页面
    if (beneficiary) {
        return (
            <div className="max-w-4xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* 组织头部信息 */}
                    <div className="p-8 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="text-5xl mr-6">{beneficiary.logo}</div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {beneficiary.name}
                                    </h1>
                                    <p className="text-gray-500 mt-2">
                                        {beneficiary.location}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">组织识别号</p>
                                <p className="font-mono text-gray-900">{beneficiary.taxId}</p>
                            </div>
                        </div>
                    </div>

                    {/* 组织使命 */}
                    <div className="p-8 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            使命宣言
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {beneficiary.mission}
                        </p>
                    </div>

                    {/* 为什么向我们捐赠 */}
                    <div className="p-8 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            为什么向我们捐赠？
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            {beneficiary.whyDonate}
                        </p>
                        <div className="bg-purple-50 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">
                                我们的成就
                            </h3>
                            <ul className="space-y-3">
                                {beneficiary.achievements.map((achievement, index) => (
                                    <li key={index} className="flex items-center text-gray-700">
                                        <span className="text-purple-600 mr-3">✓</span>
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 捐赠和分享按钮 */}
                    <div className="p-8 border-b border-gray-100">
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex-1 bg-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
                            >
                                立即捐赠
                            </button>
                            <button
                                onClick={() => {
                                    const url = window.location.href;
                                    navigator.clipboard.writeText(url);
                                    alert('链接已复制到剪贴板');
                                }}
                                className="px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-colors"
                            >
                                分享
                            </button>
                        </div>
                    </div>

                    {/* 联系方式 */}
                    <div className="p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            联系方式
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    官方网站
                                </h3>
                                <a
                                    href={`https://${beneficiary.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-700"
                                >
                                    {beneficiary.website}
                                </a>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    电子邮箱
                                </h3>
                                <a
                                    href={`mailto:${beneficiary.email}`}
                                    className="text-purple-600 hover:text-purple-700"
                                >
                                    {beneficiary.email}
                                </a>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    联系电话
                                </h3>
                                <p className="text-gray-900">{beneficiary.phone}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    办公地址
                                </h3>
                                <p className="text-gray-900">{beneficiary.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 捐赠模态框 */}
                <DonationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    beneficiary={beneficiary}
                />
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

            <div className="max-w-4xl mx-auto mb-12 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="col-span-1 sm:col-span-3">
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
                    <div>
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                            <option value="">所有类别</option>
                            <option value="education">教育援助</option>
                            <option value="health">医疗援助</option>
                            <option value="environment">环境保护</option>
                            <option value="humanitarian">人道主义</option>
                            <option value="animals">动物保护</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            placeholder="输入地区筛选..."
                            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
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
                        <p className="text-gray-600 mb-4">{beneficiary.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{beneficiary.location}</span>
                            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                                {beneficiary.category === 'education' && '教育援助'}
                                {beneficiary.category === 'health' && '医疗援助'}
                                {beneficiary.category === 'environment' && '环境保护'}
                                {beneficiary.category === 'humanitarian' && '人道主义'}
                                {beneficiary.category === 'animals' && '动物保护'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBeneficiaries.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        未找到匹配的项目，请尝试其他搜索条件
                    </p>
                </div>
            )}
        </div>
    );
}

export default Donate; 