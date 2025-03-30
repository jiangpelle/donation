import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function Navbar() {
    const { account, isConnected, connectWallet, disconnectWallet } = useWeb3();

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-primary-600">
                                捐赠系统
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/donate"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                            >
                                捐赠
                            </Link>
                            <Link
                                to="/distribute"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                            >
                                发放
                            </Link>
                            <Link
                                to="/records"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
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
                                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
                                >
                                    断开连接
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={connectWallet}
                                className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
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