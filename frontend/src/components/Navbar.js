import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import Logo from './Logo';

function Navbar() {
    const { isConnected, account, connectWallet, disconnectWallet } = useWeb3();

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Logo />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/donate"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            捐赠
                        </Link>
                        <Link
                            to="/distribution"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            申请援助
                        </Link>
                        <Link
                            to="/records"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            记录
                        </Link>
                        {isConnected ? (
                            <div className="flex items-center space-x-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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