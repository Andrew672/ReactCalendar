import React from 'react';
import { X } from 'lucide-react';
import { iconOptions } from './iconOptions';

interface EventIconPickerProps {
    selectedIcon: string;
    setSelectedIcon: (key: string) => void;
    onClose: () => void;
}

export const EventIconPicker = (props: EventIconPickerProps) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl relative">
            <button
                onClick={props.onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
            >
                <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choisis une icône</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {iconOptions.map(({ key, icon: Icon }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => {
                            props.setSelectedIcon(key);
                            props.onClose();
                        }}
                        className={`flex flex-col items-center justify-center rounded-lg p-3 border transition hover:bg-slate-100
            ${props.selectedIcon === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    >
                        <Icon className="w-6 h-6 mb-1 text-gray-700" />
                    </button>
                ))}
            </div>
        </div>
    </div>
);
