'use client';

import React, { useState } from 'react';
import { Block } from '@uiw/react-color';

interface ColorPickerPreviewProps {
    color: string;
    onChange: (hex: string) => void;
}

export const ColorPickerPreview = (props: ColorPickerPreviewProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block">
            {/* Bouton aperçu */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm hover:bg-gray-50 transition"
            >
        <span
            className="w-5 h-5 rounded-full border"
            style={{ backgroundColor: props.color }}
        />
                <span className="text-gray-800 font-mono">{props.color.toUpperCase()}</span>
            </button>

            {/* Color Picker */}
            {isOpen && (
                <div className="absolute z-50 mt-2">
                    <Block
                        color={props.color}
                        colors={[
                            '#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4',
                            '#555555', '#dce775', '#ff8a65', '#ba68c8', '#3B82F6',
                        ]}
                        onChange={(clr) => {
                            props.onChange(clr.hex);
                            setIsOpen(false);
                        }}
                    />

                </div>
            )}
        </div>
    );
};
