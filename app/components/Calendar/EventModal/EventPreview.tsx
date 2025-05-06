import React from 'react';
import { iconOptions } from './iconOptions';

interface Props {
    selectedIcon: string;
    title: string;
    color: string;
}

export const EventPreview: React.FC<Props> = ({ selectedIcon, title, color }) => {
    const Icon = iconOptions.find(opt => opt.key === selectedIcon)?.icon;
    return (
        <div className="mt-4 text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">Aperçu</label>
            <div className="m-auto w-40 h-40 rounded-2xl border border-gray-200 bg-white shadow relative p-2 flex flex-col items-start justify-start gap-1">
                <span className="text-sm font-semibold text-slate-800">14</span>
                {(title || selectedIcon) && (
                    <div
                        className="mt-1 w-full truncate rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1"
                        style={{ backgroundColor: color || '#ccc', color: '#1e293b' }}
                    >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span className="truncate">{title || 'Événement'}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
