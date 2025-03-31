import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import Logo from './Logo';

function Navbar() {
    const { isConnected, account, connectWallet, disconnectWallet } = useWeb3();

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Logo />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/donate"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-purple-600"
                            >
                                捐赠
                            </Link>
                            <Link
                                to="/distribution"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-purple-600"
                            >
                                申请援助
                            </Link>
                            <Link
                                to="/records"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-purple-600"
                            >
                                记录
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {isConnected ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    {account.slice(0, 6)}...{account.slice(-4)}
                                </span>
                                <button
                                    onClick={disconnectWallet}
                                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                                >
                                    断开连接
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={connectWallet}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                            >
                                连接钱包
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 