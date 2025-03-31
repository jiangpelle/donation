import React from 'react';
import { Link } from 'react-router-dom';
import ChainHeartLogo from './ChainHeartLogo';

function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <ChainHeartLogo className="w-10 h-10" />
      <span className="text-xl font-bold">
        <span className="text-purple-600">Chain</span>
        <span className="text-red-500">Heart</span>
      </span>
    </Link>
  );
}

export default Logo; 