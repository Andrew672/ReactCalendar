import React from 'react';

interface SubmitButtonProps {
    label: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => (
    <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    >
        {label}
    </button>
);
