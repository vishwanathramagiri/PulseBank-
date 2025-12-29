
import React from 'react';
import { UserRole } from '../types';

interface Props {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Navbar: React.FC<Props> = ({ role, setRole }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRole('GUEST')}>
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-md">
              P
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Pulse<span className="text-red-600">Bank</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setRole('DONOR')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${role === 'DONOR' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:text-red-600'}`}
            >
              Donor Portal
            </button>
            <button 
              onClick={() => setRole('HOSPITAL')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${role === 'HOSPITAL' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:text-red-600'}`}
            >
              Hospital Dashboard
            </button>
            <button 
              onClick={() => setRole('ADMIN')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${role === 'ADMIN' ? 'bg-red-600 text-white hover:bg-red-700' : 'text-slate-600 hover:text-red-600'}`}
            >
              System Admin
            </button>
          </div>

          <div className="md:hidden">
             {/* Mobile menu could go here */}
             <span className="text-xs font-mono bg-slate-100 p-1 rounded">V1.0</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
