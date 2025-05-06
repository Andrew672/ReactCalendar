
import React from 'react';
import { Select } from '../Select/Select';

interface CalendarHeaderProps {
    selectedMonth: number;
    setSelectedMonth: (month: number) => void;
    year: number;
    setYear: (year: number | ((prev: number) => number)) => void;
    monthOptions: { name: string; value: string }[];
    scrollToToday: () => void;
    openModal: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
                                                                  selectedMonth,
                                                                  setSelectedMonth,
                                                                  year,
                                                                  setYear,
                                                                  monthOptions,
                                                                  scrollToToday,
                                                                  openModal,
                                                              }) => {
    return (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2 sm:gap-3">
                <Select
                    name="month"
                    value={`${selectedMonth}`}
                    options={monthOptions}
                    onChange={(e) => {
                        const m = parseInt(e.target.value);
                        setSelectedMonth(m);
                        scrollToToday();
                    }}
                />
                <button
                    onClick={() => {
                        setYear(new Date().getFullYear());
                        scrollToToday();
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 lg:px-5 lg:py-2.5"
                >
                    Aujourd'hui
                </button>
                <button
                    type="button"
                    onClick={openModal}
                    className="whitespace-nowrap rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 sm:rounded-xl lg:px-5 lg:py-2.5"
                >
                    + Ajouter un événement
                </button>
            </div>

            <div className="flex items-center gap-3">
                <button onClick={() => setYear((y) => y - 1)} className="rounded-full border p-2 hover:bg-slate-100">←</button>
                <h1 className="text-lg font-semibold">{year}</h1>
                <button onClick={() => setYear((y) => y + 1)} className="rounded-full border p-2 hover:bg-slate-100">→</button>
            </div>
        </div>
    );
};
