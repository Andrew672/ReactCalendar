import React from 'react';
import { CalendarEvent } from './Calendar';
import { X, Calendar } from 'lucide-react';
import { EventItem } from './EventItem';

interface EventPanelProps {
    selectedDate: { day: number; month: number; year: number };
    events: CalendarEvent[];
    onEdit: (event: CalendarEvent) => void;
    onDelete: (event: CalendarEvent) => void;
    onClose: () => void;
}

export const EventPanel: React.FC<EventPanelProps> = ({
                                                          selectedDate,
                                                          events,
                                                          onEdit,
                                                          onDelete,
                                                          onClose,
                                                      }) => {
    const filteredEvents = events.filter((e) => {
        const d = new Date(e.start);
        return (
            d.getDate() === selectedDate.day &&
            d.getMonth() === selectedDate.month &&
            d.getFullYear() === selectedDate.year
        );
    });

    return (
        <div className={`
      w-[350px] relative rounded-l-2xl bg-white shadow-xl overflow-y-auto no-scrollbar p-5 flex flex-col border-l border-slate-200
      transition-all duration-300 ease-in-out opacity-100 translate-x-0
    `}>
            {/* Fermer */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white rounded-full shadow-md p-1 text-slate-500 hover:text-slate-700 z-10"
                title="Fermer"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Titre */}
            <div className="mb-4 flex items-center gap-2 text-slate-800 font-semibold text-lg pr-10">
                <Calendar className="text-blue-500 w-6 h-6" />
                <span>
          Événements du {new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
        </span>
            </div>

            {/* Liste des événements */}
            <ul className="space-y-3">
                {filteredEvents.map((event, i) => (
                    <EventItem
                        key={i}
                        event={event}
                        onEdit={() => onEdit(event)}
                        onDelete={() => onDelete(event)}
                    />
                ))}
            </ul>

            {/* Aucun événement */}
            {filteredEvents.length === 0 && (
                <p className="text-slate-500 mt-2 italic">Aucun événement pour cette journée.</p>
            )}
        </div>
    );
};
