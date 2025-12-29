
import React from 'react';
import { BloodInventory } from '../types';

interface Props {
  data: BloodInventory;
}

const BloodTypeCard: React.FC<Props> = ({ data }) => {
  const isCritical = data.units <= data.criticalLevel;
  
  return (
    <div className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
      isCritical ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-2xl font-bold ${isCritical ? 'text-red-700' : 'text-slate-800'}`}>
          {data.type}
        </span>
        <div className={`w-3 h-3 rounded-full ${isCritical ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-extrabold text-slate-900">{data.units} <span className="text-sm font-normal text-slate-500">Units</span></p>
        <p className="text-xs text-slate-500">Threshold: {data.criticalLevel} units</p>
      </div>
      {isCritical && (
        <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-red-600">
          ⚠️ Critical Stock
        </div>
      )}
    </div>
  );
};

export default BloodTypeCard;
