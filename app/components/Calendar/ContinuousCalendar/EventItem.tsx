import React from 'react';
import { Pencil, Trash } from 'lucide-react';
import { CalendarEvent } from './Calendar';

interface EventItemProps {
    event: CalendarEvent;
    onEdit: () => void;
    onDelete: () => void;
}

export const EventItem = (props: EventItemProps) => {
    return (
        <li className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow hover:shadow-md transition flex flex-col gap-2">
            {/* Ligne icône + titre */}
            <div className="flex items-start gap-3">
                <div
                    className="flex items-center justify-center w-10 h-10 rounded-full shadow shrink-0"
                    style={{ backgroundColor: props.event.color }}
                >
                    {React.createElement(props.event.icon, { className: 'w-5 h-5 text-white' })}
                </div>
                <div className="text-sm">
                    <p className="font-semibold text-blue-800 text-base">{props.event.title}</p>
                    <p className="text-slate-600">
                        {new Date(props.event.start).toLocaleString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}{' '}
                        →{' '}
                        {new Date(props.event.end).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-slate-700 text-sm ml-[52px]">{props.event.description}</p>

            {/* Actions */}
            <div className="mt-2 flex justify-center gap-3">
                <button
                    onClick={props.onEdit}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
                    title="Modifier"
                >
                    <Pencil className="w-5 h-5" />
                </button>
                <button
                    onClick={props.onDelete}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-200 text-slate-700 hover:bg-red-200 hover:text-red-600 transition"
                    title="Supprimer"
                >
                    <Trash className="w-5 h-5" />
                </button>
            </div>
        </li>
    );
};
