import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function DonateList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 模拟数据，实际项目中应该从后端获取
  const beneficiaries = [
    {
      id: 1,
      name: '儿童教育基金会',
      description: '为贫困地区儿童提供教育资源',
      category: 'education',
      logo: '📚'
    },
    {
      id: 2,
      name: '环境保护组织',
      description: '致力于全球环境保护事业',
      category: 'environment',
      logo: '🌍'
    },
    {
      id: 3,
      name: '医疗援助基金会',
      description: '为贫困地区提供医疗援助',
      category: 'health',
      logo: '🏥'
    },
    {
      id: 4,
      name: '动物保护协会',
      description: '保护濒危物种和野生动物',
      category: 'animals',
      logo: '🐘'
    },
    {
      id: 5,
      name: '难民援助组织',
      description: '为全球难民提供人道主义援助',
      category: 'humanitarian',
      logo: '🏠'
    }
  ];

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'education', name: '教育' },
    { id: 'environment', name: '环境' },
    { id: 'health', name: '医疗' },
    { id: 'animals', name: '动物保护' },
    { id: 'humanitarian', name: '人道主义' }
  ];

  const filteredBeneficiaries = beneficiaries.filter(beneficiary => {
    const matchesSearch = beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beneficiary.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || beneficiary.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto pt-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          选择援助对象
        </h1>
        <p className="text-xl text-gray-600">
          选择您想要支持的公益项目，让爱心传递更有意义
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索公益项目..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 项目列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeneficiaries.map(beneficiary => (
          <Link
            key={beneficiary.id}
            to={`/donate/${beneficiary.id}`}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{beneficiary.logo}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {beneficiary.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {beneficiary.description}
            </p>
            <div className="flex items-center text-purple-600 font-medium">
              了解更多
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* 空状态 */}
      {filteredBeneficiaries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            未找到匹配的项目
          </h3>
          <p className="text-gray-600">
            请尝试使用不同的搜索关键词或筛选条件
          </p>
        </div>
      )}
    </div>
  );
}

export default DonateList; 