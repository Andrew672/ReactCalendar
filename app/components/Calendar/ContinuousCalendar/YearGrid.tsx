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

export const YearGrid: React.FC<YearGridProps> = ({
                                                      calendarDays,
                                                      year,
                                                      today,
                                                      events,
                                                      onDayClick,
                                                      onQuickAdd,
                                                      dayRefs,
                                                  }) => {
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
        weeks.push(calendarDays.slice(i, i + 7));
    }

    return (
        <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
            {weeks.map((week, wi) => (
                <div key={wi} className="flex">
                    {week.map(({ month, day }, di) => {
                        const index = wi * 7 + di;
                        const isToday =
                            today.getFullYear() === year &&
                            today.getMonth() === month &&
                            today.getDate() === day;

                        const isNewMonth =
                            index === 0 || calendarDays[index - 1].month !== month;

                        const dayEvents = events.filter((e) => {
                            const eventDate = new Date(e.start);
                            return (
                                eventDate.getDate() === day &&
                                eventDate.getMonth() === month &&
                                eventDate.getFullYear() === year
                            );
                        });

                        return (
                            <CalendarDay
                                key={`${month}-${day}`}
                                index={index}
                                day={day}
                                month={month}
                                year={year}
                                isToday={isToday}
                                isNewMonth={isNewMonth}
                                onClick={onDayClick}
                                dayRefCallback={(el) => (dayRefs.current[index] = el)}
                                events={dayEvents}
                                onQuickAdd={onQuickAdd}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
