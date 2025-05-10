import React from 'react';
import { X, LucideIcon } from 'lucide-react';

interface ModalHeaderProps {
    title: string;
    icon?: LucideIcon;
    onClose: () => void;
    className?: string;
}

export const ModalHeader = (props: ModalHeaderProps) => {
    return (
        <div className={`bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 ${props.className}`}>
            <div className="flex items-center justify-between text-white">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    {props.icon && <props.icon className="w-5 h-5" />}
                    {props.title}
                </h2>
                <button onClick={props.onClose} className="hover:text-slate-100 transition-colors" title="Fermer">
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
