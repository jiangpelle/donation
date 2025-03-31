import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Logo() {
    return (
        <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
                <span className="text-purple-600">Chain</span>
                <span className="text-red-500">Heart</span>
            </span>
        </Link>
    );
}

export default Logo; 