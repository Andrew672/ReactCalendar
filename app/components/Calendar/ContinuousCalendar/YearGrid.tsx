import React from 'react';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { CalendarEvent } from './Calendar';

interface CalendarDayData {
    month: number;
    day: number;
}

interface YearGridProps {
    calendarDays: CalendarDayData[];
    year: number;
    today: Date;
    events: CalendarEvent[];
    onDayClick: (day: number, month: number, year: number) => void;
    onQuickAdd: (day: number, month: number, year: number) => void;
    dayRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const YearGrid = (props: YearGridProps) => {
    const weeks = [];
    for (let i = 0; i < props.calendarDays.length; i += 7) {
        weeks.push(props.calendarDays.slice(i, i + 7));
    }

    return (
        <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
            {weeks.map((week, wi) => (
                <div key={wi} className="flex">
                    {week.map(({ month, day }, di) => {
                        const index = wi * 7 + di;
                        const isToday =
                            props.today.getFullYear() === props.year &&
                            props.today.getMonth() === month &&
                            props.today.getDate() === day;

                        const isNewMonth =
                            index === 0 || props.calendarDays[index - 1].month !== month;

                        const dayEvents = props.events.filter((e) => {
                            const eventDate = new Date(e.start);
                            return (
                                eventDate.getDate() === day &&
                                eventDate.getMonth() === month &&
                                eventDate.getFullYear() === props.year
                            );
                        });

                        return (
                            <CalendarDay
                                key={`${month}-${day}`}
                                index={index}
                                day={day}
                                month={month}
                                year={props.year}
                                isToday={isToday}
                                isNewMonth={isNewMonth}
                                onClick={props.onDayClick}
                                dayRefCallback={(el) => (props.dayRefs.current[index] = el)}
                                events={dayEvents}
                                onQuickAdd={props.onQuickAdd}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
