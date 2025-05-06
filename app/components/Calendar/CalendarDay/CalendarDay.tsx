import React from 'react';
import { monthNames } from '@/app/services/utils'; // ajusté en fonction du nouveau chemin
import {
    CalendarDays, PartyPopper, Briefcase, Heart, GraduationCap, Dumbbell, LucideIcon
} from 'lucide-react';

export interface CalendarEvent {
    title: string;
    start: string;
    end: string;
    description: string;
    icon: LucideIcon;
    color: string;
}

interface CalendarDayProps {
    index: number;
    day: number;
    month: number;
    year: number;
    isToday: boolean;
    isNewMonth: boolean;
    onClick: (day: number, month: number, year: number) => void;
    dayRefCallback: (el: HTMLDivElement | null) => void;
    events: CalendarEvent[];
    onQuickAdd: (day: number, month: number, year: number) => void;
}

export const iconOptions = [
    { key: 'calendar', icon: CalendarDays },
    { key: 'birthday', icon: PartyPopper },
    { key: 'work', icon: Briefcase },
    { key: 'love', icon: Heart },
    { key: 'study', icon: GraduationCap },
    { key: 'sport', icon: Dumbbell },
];

export const CalendarDay: React.FC<CalendarDayProps> = ({
                                                            index,
                                                            day,
                                                            month,
                                                            year,
                                                            isToday,
                                                            isNewMonth,
                                                            onClick,
                                                            dayRefCallback,
                                                            events,
                                                            onQuickAdd,
                                                        }) => (
    <div
        key={`${month}-${day}`}
        ref={dayRefCallback}
        data-month={month}
        data-day={day}
        onClick={() => onClick(day, month, year)}
        className="relative z-10 m-[-0.5px] group aspect-square w-full grow cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-cyan-400 sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40"
    >
        <span className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${isToday ? 'bg-blue-500 font-semibold text-white' : ''} ${month < 0 ? 'text-slate-400' : 'text-slate-800'}`}>
            {day}
        </span>

        {isNewMonth && (
            <span className="absolute bottom-0.5 left-0 w-full truncate px-1.5 text-sm font-semibold text-slate-300 sm:bottom-0 sm:text-lg lg:bottom-2.5 lg:left-3.5 lg:-mb-1 lg:w-fit lg:px-0 lg:text-xl 2xl:mb-[-4px] 2xl:text-2xl">
                {monthNames[month]}
            </span>
        )}

        {events.length > 0 && (
            <div className="absolute top-7 left-1 right-1 flex flex-col gap-1 z-20 sm:top-8 lg:top-10">
                {events.slice(0, 3).map((e, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium shadow-sm truncate`}
                        style={{ backgroundColor: e.color }}
                    >
                        {React.createElement(e.icon, { className: "w-4 h-4" })}
                        <span className="truncate">{e.title}</span>
                    </div>
                ))}
                {events.length > 3 && (
                    <span className="text-[10px] text-gray-400 font-medium">+{events.length - 3} autres</span>
                )}
            </div>
        )}

        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(day, month, year);
            }}
            className="absolute right-2 top-2 rounded-full opacity-0 transition-all focus:opacity-100 group-hover:opacity-100"
            title="Ajouter un événement"
        >
            <svg className="size-6 scale-90 text-blue-500 transition-all hover:scale-100 group-focus:scale-100" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2a1 1 0 0 1 1 1v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 1 1-2 0v-8H3a1 1 0 1 1 0-2h8V3a1 1 0 0 1 1-1z" clipRule="evenodd" />
            </svg>
        </button>
    </div>
);
