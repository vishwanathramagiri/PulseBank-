
import React from 'react';
import { BloodGroup } from '../types';

const BloodTypeBadge: React.FC<{ type: BloodGroup }> = ({ type }) => {
  const getColors = (t: BloodGroup) => {
    if (t.includes('O')) return 'bg-red-100 text-red-700 border-red-200';
    if (t.includes('AB')) return 'bg-purple-100 text-purple-700 border-purple-200';
    if (t.includes('A')) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold border ${getColors(type)}`}>
      {type}
    </span>
  );
};

export default BloodTypeBadge;
