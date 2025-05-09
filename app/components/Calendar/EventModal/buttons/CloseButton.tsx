import React from 'react';

interface CloseButtonProps {
    onClick: () => void;
    label?: string;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
                                                            onClick,
                                                            label = 'Annuler',
                                                        }) => (
    <button
        type="button"
        onClick={onClick}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
    >
        {label}
    </button>
);
