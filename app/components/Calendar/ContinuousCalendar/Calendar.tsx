'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { daysOfWeek, monthNames, generateDaysInYear } from '@/app/services/utils';
import { CalendarHeader } from './CalendarHeader';
import { EventPanel } from './EventPanel';
import { YearGrid } from './YearGrid';
import { EventModal } from '../EventModal/EventModal';
import { CalendarDays, LucideIcon } from 'lucide-react';
import { iconOptions } from '../CalendarDay/CalendarDay';
import { useSnack } from '@/app/providers/SnackProvider';
import { mapApiEventToCalendarEvent } from './mapApiEvent';
import {EventsService} from "@/app/services/EventService";


export interface CalendarEvent {
    uid: string;
    title: string;
    start: string;
    end: string;
    description: string;
    icon: LucideIcon;
    color: string;
    filename: string;
}

interface ContinuousCalendarProps {
    onClick?: (_day: number, _month: number, _year: number) => void;
}

export const Calendar: React.FC<ContinuousCalendarProps> = ({ onClick }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number } | null>(null);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(0);
    const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
    const monthOptions = monthNames.map((m, i) => ({ name: m, value: `${i}` }));
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [defaultEventDate, setDefaultEventDate] = useState<{ start: string; end: string } | null>(null);
    const { createSnack } = useSnack();
    const [eventToEdit, setEventToEdit] = useState<CalendarEvent & { uid?: string } | null>(null);

    const calendarDays = useMemo(() => generateDaysInYear(year), [year]);

    const scrollToDay = (monthIndex: number, dayIndex: number) => {
        const target = dayRefs.current.find((ref) =>
            ref?.getAttribute('data-month') === `${monthIndex}` &&
            ref?.getAttribute('data-day') === `${dayIndex}`
        );
        if (!target) return;

        const container = document.querySelector('.calendar-container');
        const is2xl = window.matchMedia('(min-width: 1536px)').matches;
        const offsetFactor = is2xl ? 3 : 2.5;
        const offset = target.getBoundingClientRect().top - (container?.getBoundingClientRect().top ?? 0) - (container?.clientHeight ?? 0) / offsetFactor + target.clientHeight / 2;

        if (container) {
            container.scrollTo({ top: container.scrollTop + offset, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: window.scrollY + offset, behavior: 'smooth' });
        }
    };

    const handleAddEventForDay = (day: number, month: number, year: number) => {
        const start = new Date(year, month, day, 9, 0);
        const end = new Date(year, month, day, 10, 0);
        setDefaultEventDate({
            start: start.toISOString().slice(0, 16),
            end: end.toISOString().slice(0, 16),
        });
        setModalOpen(true);
    };

    const handleDayClick = (day: number, month: number, year: number) => {
        setSelectedDate({ day, month, year });
        if (onClick) onClick(day, month, year);
    };

    const handleEditEvent = (event: CalendarEvent & { uid?: string }) => {
        setEventToEdit(event);
        setDefaultEventDate({
            start: event.start.slice(0, 16),
            end: event.end.slice(0, 16),
        });
        setModalOpen(true);
    };

    const handleDeleteEvent = async (eventToDelete: CalendarEvent) => {
        if (!eventToDelete.filename) {
            createSnack("L'événement n'a pas de fichier associé.", 'error');
            return;
        }

        try {
            await EventsService.deleteEvent(eventToDelete.filename);
            setEvents((prev) => prev.filter((e) => e !== eventToDelete));
            createSnack(`Événement supprimé.`, 'success');
        } catch (error) {
            createSnack('Erreur de suppression.', 'error');
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await EventsService.getAllEvents();
                setEvents(data.map(mapApiEventToCalendarEvent));
            } catch {
                createSnack('Erreur lors de la récupération des événements.', 'error');
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        setIsPanelVisible(!!selectedDate);
        if (!selectedDate) {
            const timeout = setTimeout(() => setIsPanelVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [selectedDate]);

    useEffect(() => {
        const container = document.querySelector('.calendar-container');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const month = parseInt(entry.target.getAttribute('data-month')!, 10);
                        if (!isNaN(month)) setSelectedMonth(month);
                    }
                });
            },
            { root: container, rootMargin: '-75% 0px -25% 0px' }
        );
        dayRefs.current.forEach((ref) => {
            if (ref?.getAttribute('data-day') === '15') observer.observe(ref);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        scrollToDay(today.getMonth(), today.getDate());
    }, []);

    // @ts-ignore
    return (
        <div className="flex h-full transition-all duration-300 px-4">
            <div className={`transition-all duration-300 ${selectedDate ? 'flex-grow' : 'w-full'} pr-4`}>
                <div className="no-scrollbar calendar-container max-h-full overflow-y-scroll rounded-t-2xl bg-white pb-10 text-slate-800 shadow-xl">
                    <div className="sticky top-0 z-50 w-full bg-white px-5 pt-7 sm:px-8 sm:pt-8">
                        <CalendarHeader
                            selectedMonth={selectedMonth}
                            setSelectedMonth={setSelectedMonth}
                            year={year}
                            setYear={setYear}
                            monthOptions={monthOptions}
                            scrollToToday={() => scrollToDay(today.getMonth(), today.getDate())}
                            openModal={() => setModalOpen(true)}
                        />
                        <div className="grid grid-cols-7 text-center text-slate-500 font-semibold border-b border-slate-200 py-2">
                            {daysOfWeek.map((d) => <div key={d}>{d}</div>)}
                        </div>
                    </div>

                    <YearGrid
                        calendarDays={calendarDays}
                        year={year}
                        today={today}
                        events={events}
                        onDayClick={handleDayClick}
                        onQuickAdd={handleAddEventForDay}
                        dayRefs={dayRefs}
                    />

                    <EventModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setModalOpen(false);
                            setEventToEdit(null);
                        }}
                        defaultDates={defaultEventDate ?? undefined}
                        initialData={eventToEdit ?? undefined}
                        onSubmit={(data) => {
                            const iconComp = iconOptions.find(opt => opt.key === data.icon)?.icon ?? CalendarDays;

                            const finalData = {
                                ...data,
                                icon: iconComp,
                                uid: eventToEdit?.uid,
                            };

                            if (eventToEdit) {
                                setEvents(prev => prev.map(e => (e.uid === eventToEdit?.uid ? finalData : e)));
                            } else {
                                setEvents(prev => [...prev, finalData]);
                            }

                            setEventToEdit(null);
                            setModalOpen(false);
                        }}
                    />

                </div>
            </div>

            {isPanelVisible && selectedDate && (
                <EventPanel
                    selectedDate={selectedDate}
                    events={events}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                    onClose={() => setSelectedDate(null)}
                />
            )}
        </div>
    );
};
