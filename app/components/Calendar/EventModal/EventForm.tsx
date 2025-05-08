'use client';

import React, { useState, useEffect } from 'react';
import { useSnack } from '@/app/providers/SnackProvider';
import { EventIconPicker } from '@/app/components/Calendar/EventModal/EventIconPicker';
import { EventPreview } from '@/app/components/Calendar/EventModal/EventPreview';
import { iconOptions } from '@/app/components/Calendar/EventModal/iconOptions';
import { EventsService} from "@/app/services/EventService";
import {ModalFooter} from "@/app/components/ui/ModalFooter";
import { ColorPickerPreview } from '@/app/components/ui/ColorPickerPreview';



interface EventFormProps {
    defaultDates?: { start: string; end: string };
    initialData?: {
        title: string;
        start: string;
        end: string;
        description: string;
        icon: any;
        color: string;
        filename: string;
    };
    onClose: () => void;
    onSubmit?: (_data: any) => void;
}

export const EventForm: React.FC<EventFormProps> = ({
                                                        defaultDates,
                                                        initialData,
                                                        onClose,
                                                        onSubmit,
                                                    }) => {
    const { createSnack } = useSnack();
    const [selectedIcon, setSelectedIcon] = useState('calendar');
    const [showIconModal, setShowIconModal] = useState(false);
    const [title, setTitle] = useState('');
    const [filename, setFilename] = useState('');
    const [color, setColor] = useState('#3B82F6');
    const [start, setStart] = useState(defaultDates?.start || '');
    const [end, setEnd] = useState(defaultDates?.end || '');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            const iconKey = iconOptions.find(opt => opt.icon === initialData.icon)?.key;
            setSelectedIcon(iconKey || 'calendar');
            setColor(initialData.color || '#3B82F6');
            setStart(defaultDates?.start || initialData.start || '');
            setEnd(defaultDates?.end || initialData.end || '');
            setDescription(initialData.description || '');
        }
    }, [initialData, defaultDates]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isEditing = !!initialData;

        const startDate = new Date(start);
        const endDate = new Date(end);

        if (endDate <= startDate) {
            createSnack("La date de fin doit être postérieure à la date de début.", 'error');
            return;
        }

        const message = isEditing
            ? 'Événement modifié avec succès.'
            : 'Événement créé avec succès.';
        const eventData = {
            title,
            start,
            end,
            description,
            icon: selectedIcon,
            color,
            filename,
        };

        try {
            let submittedData;

            if (isEditing && initialData?.filename) {
                await EventsService.updateEvent(initialData.filename, eventData);
                submittedData = { ...eventData, filename: initialData.filename }; // 💡 on conserve le filename
            } else {
                const newFilename = await EventsService.createEvent(eventData);
                submittedData = { ...eventData, filename: newFilename };
                setFilename(newFilename);
            }
            onSubmit?.(submittedData);
            onClose();
            createSnack(message, 'success');
        } catch {
            createSnack("Erreur lors de la création de l'événement", 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                    name="title"
                    required
                    placeholder="Ex: Réunion, Anniversaire..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Début</label>
                    <input
                        name="start"
                        type="datetime-local"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                    <input
                        name="end"
                        type="datetime-local"
                        required
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        disabled={!start}
                        min={start}
                        className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm transition
      ${!start ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'}
    `}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Décris ton événement ici..."
                    className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                />
            </div>

            {/* Icône */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icône</label>
                <button
                    type="button"
                    onClick={() => setShowIconModal(true)}
                    className="flex items-center gap-3 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-100 transition"
                >
                    {React.createElement(iconOptions.find(opt => opt.key === selectedIcon)?.icon!, {
                        className: 'w-5 h-5 text-blue-600',
                    })}
                    <span>{iconOptions.find(opt => opt.key === selectedIcon)?.name}</span>
                </button>
            </div>

            {showIconModal && (
                <EventIconPicker
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                    onClose={() => setShowIconModal(false)}
                />
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
                <ColorPickerPreview color={color} onChange={setColor} />
            </div>

            <EventPreview selectedIcon={selectedIcon} title={title} color={color} />

            <ModalFooter
                onClose={onClose}
                submitLabel={initialData ? 'Modifier l’événement' : 'Créer l’événement'}
            />
        </form>
    );
};
